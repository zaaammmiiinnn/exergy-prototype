"use server";

import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";

export interface AdminSession {
  email: string;
  role: "founder" | "admin" | "ops" | "viewer";
  name: string;
  authenticatedAt: string;
}

const ALLOWED_ADMINS: Record<string, { role: AdminSession["role"]; name: string }> = {
  "neuralwaves.official@gmail.com": { role: "founder", name: "Neural Waves Founder" },
  "support@neuralwaves.in": { role: "admin", name: "Exergy Operations Support" },
};

export async function adminLoginAction(email: string, password?: string): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const adminConfig = ALLOWED_ADMINS[normalizedEmail];

    if (!adminConfig) {
      return {
        success: false,
        error: "Access denied. Only authorized administrators (@neuralwaves.in / @gmail.com) can access this console.",
      };
    }

    // Optional Supabase Auth credential validation if password provided
    if (password && password.trim() !== "") {
      try {
        const supabase = createServiceRoleClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: password,
        });

        // If credentials exist and failed, reject
        if (authError && !authError.message.toLowerCase().includes("not confirmed")) {
          // Allow valid preset default password or Supabase Auth
          if (password !== "Exergy2026!Admin" && password !== "Exergy2026!Support") {
            return { success: false, error: "Invalid administrator credentials." };
          }
        }
      } catch (authErr) {
        console.warn("[ADMIN SUPABASE AUTH CHECK]", authErr);
      }
    }

    const session: AdminSession = {
      email: normalizedEmail,
      role: adminConfig.role,
      name: adminConfig.name,
      authenticatedAt: new Date().toISOString(),
    };

    // Store in cookie
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
