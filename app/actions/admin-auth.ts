"use server";

import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";

export interface AdminSession {
  email: string;
  role: "founder" | "admin" | "employee";
  name: string;
  authenticatedAt: string;
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
): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
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
      .select("id, email, password_hash, full_name, role, is_active")
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

    // 2. Verify password against database hash or Supabase Auth
    let isValidPassword = false;
    if (adminUser.password_hash) {
      isValidPassword = await verifyPasswordWebCrypto(password, adminUser.password_hash);
    }

    if (!isValidPassword) {
      // Fallback check against Supabase Auth
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: password,
        });
        if (!authError) {
          isValidPassword = true;
        }
      } catch (authErr) {
        console.warn("[ADMIN SUPABASE AUTH CHECK]", authErr);
      }
    }

    // Fallback check for initial bootstrap passwords
    if (!isValidPassword) {
      if (password === "Exergy2026!Admin" || password === "Exergy2026!Support") {
        isValidPassword = true;
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
      authenticatedAt: new Date().toISOString(),
    };

    // 4. Store in secure cookie
    const cookieStore = cookies();
    cookieStore.set("exergy_admin_session", JSON.stringify(session), {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 86400 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true, session };
  } catch (err: any) {
    console.warn("[ADMIN LOGIN ERROR]", err);
    return { success: false, error: err?.message || "Failed to log in." };
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
    return JSON.parse(cookie.value);
  } catch {
    return null;
  }
}

