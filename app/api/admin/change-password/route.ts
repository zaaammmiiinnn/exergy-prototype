import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";
import {
  type AdminSession,
  hashPasswordWebCrypto,
  verifyPasswordWebCrypto,
} from "@/app/actions/admin-auth";
import { signSession, verifySession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { newPassword, currentPassword } = body || {};

    if (!newPassword || typeof newPassword !== "string" || newPassword.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const plainPassword = newPassword.trim();

    // Authenticate via cryptographically signed session cookie ONLY (never trust unauthenticated bodyEmail)
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("exergy_admin_session")?.value;
    const session = sessionCookie ? await verifySession<AdminSession>(sessionCookie) : null;

    if (!session || !session.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session. Please log in first." },
        { status: 401 }
      );
    }

    const emailToUpdate = session.email.toLowerCase().trim();
    const supabase = createServiceRoleClient();

    // Fetch user from database
    const { data: targetUser } = await supabase
      .from("admin_users")
      .select("role, password_hash, temp_password, must_change_password")
      .ilike("email", emailToUpdate)
      .maybeSingle();

    const targetRole = (targetUser?.role || session?.role || "employee").toLowerCase().trim();
    if (targetRole === "employee") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Password updates for employee accounts are restricted. Please contact your system administrator for a password reset.",
        },
        { status: 403 }
      );
    }

    // If not in forced temporary password mode, verify current password
    if (!session.mustChangePassword && currentPassword) {
      const stored = targetUser?.password_hash || "";
      if (stored.includes(":")) {
        const isValid = await verifyPasswordWebCrypto(currentPassword, stored);
        if (!isValid) {
          return NextResponse.json(
            { success: false, error: "Current password verification failed." },
            { status: 400 }
          );
        }
      }
    }

    // Cryptographically hash the new password using PBKDF2
    const hashedPassword = await hashPasswordWebCrypto(plainPassword);
    const nowIso = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("admin_users")
      .update({
        password_hash: hashedPassword,
        temp_password: null,
        must_change_password: false,
        updated_at: nowIso,
      })
      .ilike("email", emailToUpdate);

    if (updateError) {
      console.warn("[API CHANGE PASSWORD DB ERROR]", updateError.message);
      return NextResponse.json(
        { success: false, error: "Failed to update password in database." },
        { status: 500 }
      );
    }

    const updatedSession: AdminSession = {
      ...session,
      mustChangePassword: false,
      authenticatedAt: new Date().toISOString(),
    };

    const signedToken = await signSession(updatedSession);
    const response = NextResponse.json({
      success: true,
      session: updatedSession,
    });

    response.cookies.set("exergy_admin_session", signedToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err: any) {
    console.error("[API CHANGE PASSWORD UNHANDLED ERROR]", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
