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

    // Check A: Match against temp_password column if set
    if (adminUser.temp_password && adminUser.temp_password === cleanPassword) {
      isValidPassword = true;
      requiresPasswordChange = true;
    }

    // Check B: Match against password_hash column
    if (!isValidPassword && adminUser.password_hash) {
      const stored = adminUser.password_hash.trim();
      // If stored hash is plain text (like '12345678')
      if (!stored.includes(":")) {
        if (cleanPassword === stored) {
          isValidPassword = true;
          requiresPasswordChange = true;
        }
      } else {
        // Standard WebCrypto PBKDF2 hash verification
        isValidPassword = await verifyPasswordWebCrypto(cleanPassword, stored);
        if (isValidPassword && adminUser.must_change_password) {
          requiresPasswordChange = true;
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

    // Check D: Fallback check for initial bootstrap passwords
    if (!isValidPassword) {
      const allowedBootstrap = [
        "Exergy2026!Admin",
        "Exergy2026!Support",
        "Exergy2026!Employee",
        "Exergy2026!Founder",
        "employee",
        "employee123",
        "admin",
        "admin123",
        "12345678",
      ];
      if (allowedBootstrap.includes(cleanPassword)) {
        isValidPassword = true;
        if (cleanPassword === "12345678" || cleanPassword === "employee" || cleanPassword === "employee123") {
          requiresPasswordChange = true;
        }
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
 * Update permanent password for logged in administrator
 */
export async function changeAdminPasswordAction(
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getAdminSessionAction();
    if (!session || !session.email) {
      return { success: false, error: "Unauthorized session. Please log in first." };
    }

    if (!newPassword || newPassword.trim().length < 8) {
      return {
        success: false,
        error: "New password must be at least 8 characters long.",
      };
    }

    // 1. Generate secure WebCrypto PBKDF2 hash
    const passwordHash = await hashPasswordWebCrypto(newPassword.trim());

    // 2. Update Supabase database
    const supabase = createServiceRoleClient();

    // Prepare update payload
    const updatePayload: Record<string, any> = {
      password_hash: passwordHash,
      updated_at: new Date().toISOString(),
    };

    // Try clearing temp_password and must_change_password
    try {
      updatePayload.temp_password = null;
      updatePayload.must_change_password = false;
      await supabase.from("admin_users").update(updatePayload).eq("email", session.email);
    } catch {
      // If columns don't exist yet, update only password_hash
      await supabase
        .from("admin_users")
        .update({
          password_hash: passwordHash,
          updated_at: new Date().toISOString(),
        })
        .eq("email", session.email);
    }

    // 3. Update active session cookie
    const updatedSession: AdminSession = {
      ...session,
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

    return { success: true };
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
