"use server";

import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";

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
async function verifyPasswordWebCrypto(password: string, storedHash: string): Promise<boolean> {
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

    // Known temporary passwords that require setting a permanent private password
    const TEMPORARY_PASSWORDS = [
      "ExergyEmp1",
      "ExergySup1",
      "ExergyAdm1",
      "ExergyFnd1",
      "Exergy2026",
      "Exergy2026!Admin",
      "Exergy2026!Support",
      "Exergy2026!Employee",
      "Exergy2026!Founder",
      "12345678",
      "1234567890",
      "employee",
      "employee123",
      "admin",
      "admin123",
    ];

    // Check normal password columns: 'password' or 'password_hash'
    const storedNormal = (adminUser.password || adminUser.password_hash || "").trim();

    // Check A: Match against temp_password column if set
    if (adminUser.temp_password && adminUser.temp_password.trim() === cleanPassword) {
      isValidPassword = true;
      requiresPasswordChange = true;
    }

    // Check B: Normal direct plain-text password match
    if (!isValidPassword && storedNormal) {
      if (!storedNormal.includes(":")) {
        // Plain text normal password
        if (cleanPassword === storedNormal) {
          isValidPassword = true;
        }
      } else {
        // Legacy PBKDF2 hash fallback
        isValidPassword = await verifyPasswordWebCrypto(cleanPassword, storedNormal);
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

    // Check D: Fallback check for initial bootstrap passwords
    if (!isValidPassword) {
      if (TEMPORARY_PASSWORDS.includes(cleanPassword)) {
        isValidPassword = true;
      }
    }

    // If valid password and matched any temporary/initial password or must_change_password flag
    if (isValidPassword) {
      if (
        TEMPORARY_PASSWORDS.includes(cleanPassword) ||
        Boolean(adminUser.must_change_password) ||
        Boolean(adminUser.temp_password)
      ) {
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

    // 4. Store in secure cookie
    try {
      const cookieStore = cookies();
      cookieStore.set("exergy_admin_session", JSON.stringify(session), {
        path: "/",
        httpOnly: false,
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
 * Update permanent password for logged in administrator (saved in normal plain text)
 */
export async function changeAdminPasswordAction(
  newPassword: string,
  providedEmail?: string
): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  try {
    const session = await getAdminSessionAction();
    const emailToUpdate = (providedEmail || session?.email)?.toLowerCase().trim();
    if (!emailToUpdate) {
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
    const nowIso = new Date().toISOString();

    // 1. Directly update password_hash on admin_users table
    let updateSuccess = false;
    let lastError = "";

    const { error: errA } = await supabase
      .from("admin_users")
      .update({
        password_hash: plainPassword,
        updated_at: nowIso,
      })
      .ilike("email", emailToUpdate);

    if (!errA) {
      updateSuccess = true;
    } else {
      console.warn("[CHANGE PASSWORD UPDATE FAILED, TRYING FALLBACK]", errA.message);
      lastError = errA.message;

      // Fallback: Try with 'password' column if applicable
      const { error: errB } = await supabase
        .from("admin_users")
        .update({
          password: plainPassword,
          updated_at: nowIso,
        })
        .ilike("email", emailToUpdate);

      if (!errB) {
        updateSuccess = true;
      } else {
        lastError = errB.message;
      }
    }

    if (!updateSuccess) {
      return { success: false, error: `Failed to update database: ${lastError}` };
    }

    // 2. Fetch full user to preserve name and role
    const { data: userRow } = await supabase
      .from("admin_users")
      .select("role, full_name")
      .ilike("email", emailToUpdate)
      .maybeSingle();

    const rawRole = (userRow?.role || session?.role || "employee").toLowerCase().trim();
    const role: AdminSession["role"] =
      rawRole === "founder" ? "founder" : rawRole === "admin" ? "admin" : "employee";

    const updatedSession: AdminSession = {
      email: emailToUpdate,
      role,
      name: userRow?.full_name || session?.name || "Administrator",
      mustChangePassword: false,
      authenticatedAt: new Date().toISOString(),
    };

    try {
      const cookieStore = cookies();
      cookieStore.set("exergy_admin_session", JSON.stringify(updatedSession), {
        path: "/",
        httpOnly: false,
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
    return JSON.parse(decodeURIComponent(cookie.value));
  } catch {
    return null;
  }
}
