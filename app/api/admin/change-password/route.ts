import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { type AdminSession } from "@/app/actions/admin-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { newPassword } = body || {};

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
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Session expired or unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    let session: AdminSession;
    try {
      session = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid session cookie." },
        { status: 401 }
      );
    }

    if (!session.email) {
      return NextResponse.json(
        { success: false, error: "No email associated with session." },
        { status: 401 }
      );
    }

    const supabase = createServiceRoleClient();
    const nowIso = new Date().toISOString();

    // Update with normal plain-text password
    let updateSuccess = false;
    let lastError = "";

    // Attempt A: Try all fields
    const { error: errA } = await supabase
      .from("admin_users")
      .update({
        password: plainPassword,
        password_hash: plainPassword,
        temp_password: null,
        must_change_password: false,
        updated_at: nowIso,
      })
      .eq("email", session.email);

    if (!errA) {
      updateSuccess = true;
    } else {
      console.warn("[API CHANGE PASSWORD ATTEMPT A FAILED]", errA.message);
      lastError = errA.message;

      // Attempt B: Update password_hash with normal password
      const { error: errB } = await supabase
        .from("admin_users")
        .update({
          password_hash: plainPassword,
          updated_at: nowIso,
        })
        .eq("email", session.email);

      if (!errB) {
        updateSuccess = true;
      } else {
        lastError = errB.message;

        // Attempt C: Update password column if renamed
        const { error: errC } = await supabase
          .from("admin_users")
          .update({
            password: plainPassword,
            updated_at: nowIso,
          })
          .eq("email", session.email);

        if (!errC) {
          updateSuccess = true;
        } else {
          lastError = errC.message;
        }
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
      ...session,
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
