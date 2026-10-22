"use server";

import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { signSession, verifySession } from "@/lib/auth/session";

export interface AdminSession {
  email: string;
  role: "founder" | "admin" | "employee";
  name: string;
  mustChangePassword?: boolean;
  authenticatedAt: string;
}

/**
 * Generate PBKDF2 password hash using standard Web Crypto API (Cloudflare Workers compatible)
 */
export async function hashPasswordWebCrypto(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const derivedHex = Array.from(new Uint8Array(derivedBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${saltHex}:${derivedHex}`;
}

/**
 * Verify PBKDF2 password hash using standard Web Crypto API (Cloudflare Workers compatible)
 */
export async function verifyPasswordWebCrypto(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split(":");
    if (parts.length !== 2) return false;
    const [saltHex, expectedHashHex] = parts;

    const salt = new Uint8Array(
      saltHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const derivedHex = Array.from(new Uint8Array(derivedBits))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return derivedHex === expectedHashHex;
  } catch (err) {
    console.warn("[VERIFY PASSWORD ERROR]", err);
    return false;
  }
}

export async function adminLoginAction(
  email: string,
  password?: string
): Promise<{
  success: boolean;
  requiresPasswordChange?: boolean;
  session?: AdminSession;
  error?: string;
}> {
  try {
    const normalizedEmail = email?.toLowerCase().trim();
    if (!normalizedEmail || !password || password.trim() === "") {
      return {
        success: false,
        error: "Please enter your administrator email and password.",
      };
    }

    const supabase = createServiceRoleClient();

    // 1. Fetch user from admin_users database table
    const { data: adminUser, error: dbError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    if (dbError || !adminUser) {
      return {
        success: false,
        error: "Access denied. Administrator account not found in database.",
      };
    }

    if (!adminUser.is_active) {
      return {
        success: false,
        error: "Administrator account is inactive. Please contact system support.",
      };
    }

    // 2. Verify password & detect temporary password
    let isValidPassword = false;
    let requiresPasswordChange = false;
    const cleanPassword = password.trim();

    // Check A: Match against temp_password column if set
    if (adminUser.temp_password && adminUser.temp_password.trim() === cleanPassword) {
      isValidPassword = true;
      requiresPasswordChange = true;
    }

    // Check B: Normal hashed or migrated password match
    const storedNormal = (adminUser.password_hash || adminUser.password || "").trim();
    if (!isValidPassword && storedNormal) {
      if (storedNormal.includes(":")) {
        isValidPassword = await verifyPasswordWebCrypto(cleanPassword, storedNormal);
      } else {
        // Upgrade legacy plain-text password to PBKDF2 hash on successful login
        if (cleanPassword === storedNormal) {
          isValidPassword = true;
          try {
            const upgradedHash = await hashPasswordWebCrypto(cleanPassword);
            await supabase
              .from("admin_users")
              .update({ password_hash: upgradedHash })
              .eq("id", adminUser.id);
          } catch (upgradeErr) {
            console.warn("[PASSWORD HASH UPGRADE ERROR]", upgradeErr);
          }
        }
      }
    }

    // Check C: Fallback check against Supabase Auth
    if (!isValidPassword) {
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: cleanPassword,
        });
        if (!authError) {
          isValidPassword = true;
        }
      } catch (authErr) {
        console.warn("[ADMIN SUPABASE AUTH CHECK]", authErr);
      }
    }

    // Enforce must_change_password flag
    if (isValidPassword) {
      if (Boolean(adminUser.must_change_password) || Boolean(adminUser.temp_password)) {
        requiresPasswordChange = true;
      }
    }

    if (!isValidPassword) {
      return {
        success: false,
        error: "Invalid administrator credentials.",
      };
    }

    // 3. Update last_login_at in database
    try {
      await supabase
        .from("admin_users")
        .update({
          last_login_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", adminUser.id);
    } catch (updateErr) {
      console.warn("[ADMIN UPDATE LAST LOGIN]", updateErr);
    }

    const rawRole = (adminUser.role || "").toLowerCase().trim();
    const role: AdminSession["role"] =
      rawRole === "founder" ? "founder" : rawRole === "admin" ? "admin" : "employee";

    const session: AdminSession = {
      email: adminUser.email,
      role,
      name: adminUser.full_name || "Administrator",
      mustChangePassword: requiresPasswordChange,
      authenticatedAt: new Date().toISOString(),
    };

    // 4. Store in tamper-proof signed HttpOnly cookie
    try {
      const signedToken = await signSession(session);
      const cookieStore = cookies();
      cookieStore.set("exergy_admin_session", signedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 86400 * 7, // 7 days
        secure: process.env.NODE_ENV === "production",
      });
    } catch (cookieErr) {
      console.warn("[ADMIN COOKIE SET]", cookieErr);
    }

    return {
      success: true,
      requiresPasswordChange,
      session,
    };
  } catch (err: any) {
    console.warn("[ADMIN LOGIN ERROR]", err);
    return { success: false, error: err?.message || "Failed to log in." };
  }
}

/**
 * Update permanent password for logged in administrator (hashed with PBKDF2)
 */
export async function changeAdminPasswordAction(
  newPassword: string,
  currentPassword?: string
): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  try {
    const session = await getAdminSessionAction();
    if (!session || !session.email) {
      return { success: false, error: "Unauthorized session. Please log in first." };
    }

    const plainPassword = newPassword?.trim();
    if (!plainPassword || plainPassword.length < 8) {
      return {
        success: false,
        error: "New password must be at least 8 characters long.",
      };
    }

    const supabase = createServiceRoleClient();

    // Verify role: Employees cannot update passwords directly; they must contact the administrator
    const { data: targetUser } = await supabase
      .from("admin_users")
      .select("role, password_hash, temp_password")
      .ilike("email", session.email)
      .maybeSingle();

    const targetRole = (targetUser?.role || session.role || "employee").toLowerCase().trim();
    if (targetRole === "employee") {
      return {
        success: false,
        error:
          "Password updates for employee accounts are restricted. Please contact your system administrator for a password reset.",
      };
    }

    // Verify current password if user is not in forced password change mode
    if (!session.mustChangePassword && currentPassword) {
      const stored = targetUser?.password_hash || "";
      if (stored.includes(":")) {
        const isValid = await verifyPasswordWebCrypto(currentPassword, stored);
        if (!isValid) {
          return { success: false, error: "Current password is incorrect." };
        }
      }
    }

    // Hash the new password securely using PBKDF2
    const hashedPassword = await hashPasswordWebCrypto(plainPassword);
    const nowIso = new Date().toISOString();

    const { error: errA } = await supabase
      .from("admin_users")
      .update({
        password_hash: hashedPassword,
        temp_password: null,
        must_change_password: false,
        updated_at: nowIso,
      })
      .ilike("email", session.email);

    if (errA) {
      console.warn("[CHANGE PASSWORD UPDATE FAILED]", errA.message);
      return { success: false, error: `Failed to update database: ${errA.message}` };
    }

    const updatedSession: AdminSession = {
      ...session,
      mustChangePassword: false,
      authenticatedAt: new Date().toISOString(),
    };

    try {
      const signedToken = await signSession(updatedSession);
      const cookieStore = cookies();
      cookieStore.set("exergy_admin_session", signedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 86400 * 7,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (cookieErr) {
      console.warn("[ADMIN COOKIE UPDATE]", cookieErr);
    }

    return { success: true, session: updatedSession };
  } catch (err: any) {
    console.warn("[CHANGE PASSWORD ERROR]", err);
    return { success: false, error: err?.message || "Failed to update password." };
  }
}

export async function adminSignOutAction(): Promise<{ success: boolean }> {
  try {
    const cookieStore = cookies();
    cookieStore.set("exergy_admin_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    return { success: true };
  } catch (err: any) {
    console.warn("[ADMIN SIGN OUT ERROR]", err);
    return { success: false };
  }
}

export async function getAdminSessionAction(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const cookie = cookieStore.get("exergy_admin_session");
    if (!cookie?.value) return null;
    return await verifySession<AdminSession>(cookie.value);
  } catch {
    return null;
  }
}

/**
 * Enforces admin authorization for Server Actions.
 * Throws an Error if unauthenticated or if the role does not have permission.
 */
export async function assertAdminAuthorized(
  allowedRoles: ("founder" | "admin" | "employee")[] = ["founder", "admin", "employee"]
): Promise<AdminSession> {
  const session = await getAdminSessionAction();
  if (!session || !session.email) {
    throw new Error("Unauthorized. Please log in as an administrator.");
  }
  if (!allowedRoles.includes(session.role)) {
    throw new Error(`Forbidden. Role '${session.role}' is not authorized for this operation.`);
  }
  return session;
}
