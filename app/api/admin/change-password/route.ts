import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { type AdminSession } from "@/app/actions/admin-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { newPassword, email: bodyEmail } = body || {};

    if (!newPassword || typeof newPassword !== "string" || newPassword.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const plainPassword = newPassword.trim();

    // Read session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("exergy_admin_session")?.value;
    let session: AdminSession | null = null;
    if (sessionCookie) {
      try {
        session = JSON.parse(decodeURIComponent(sessionCookie));
      } catch {}
    }

    const emailToUpdate = (session?.email || bodyEmail)?.toLowerCase().trim();
    if (!emailToUpdate) {
      return NextResponse.json(
        { success: false, error: "Session expired or unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const supabase = createServiceRoleClient();

    // Verify role: Employees cannot update passwords directly; they must contact the administrator
    const { data: targetUser } = await supabase
      .from("admin_users")
      .select("role")
      .ilike("email", emailToUpdate)
      .maybeSingle();

    const targetRole = (targetUser?.role || session?.role || "employee").toLowerCase().trim();
    if (targetRole === "employee") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Password updates for employee accounts are restricted. Please contact your system administrator (admin@exergy.solutions) for a password reset.",
        },
        { status: 403 }
      );
    }

    const nowIso = new Date().toISOString();

    // Directly update password_hash on admin_users table
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
      console.warn("[API CHANGE PASSWORD FAILED, TRYING FALLBACK]", errA.message);
      lastError = errA.message;

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
      return NextResponse.json(
        { success: false, error: `Failed to update database: ${lastError}` },
        { status: 500 }
      );
    }

    // Update session cookie
    const updatedSession: AdminSession = {
      email: emailToUpdate,
      role: session?.role || "employee",
      name: session?.name || "Administrator",
      mustChangePassword: false,
      authenticatedAt: nowIso,
    };

    const response = NextResponse.json({ success: true, session: updatedSession });
    response.cookies.set("exergy_admin_session", JSON.stringify(updatedSession), {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 86400 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err: any) {
    console.error("[API CHANGE PASSWORD ERROR]", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
