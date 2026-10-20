import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { hashPasswordWebCrypto, type AdminSession } from "@/app/actions/admin-auth";

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

    // 1. Generate WebCrypto PBKDF2 hash
    const passwordHash = await hashPasswordWebCrypto(newPassword.trim());

    // 2. Update Supabase
    const supabase = createServiceRoleClient();
    const fullPayload = {
      password_hash: passwordHash,
      temp_password: null,
      must_change_password: false,
      updated_at: new Date().toISOString(),
    };

    const { error: updateErr1 } = await supabase
      .from("admin_users")
      .update(fullPayload)
      .eq("email", session.email);

    if (updateErr1) {
      console.warn("[API CHANGE PASSWORD FALLBACK TO MINIMAL]", updateErr1.message);
      const { error: updateErr2 } = await supabase
        .from("admin_users")
        .update({
          password_hash: passwordHash,
          updated_at: new Date().toISOString(),
        })
        .eq("email", session.email);

      if (updateErr2) {
        return NextResponse.json(
          { success: false, error: updateErr2.message },
          { status: 500 }
        );
      }
    }

    // 3. Update session cookie
    const updatedSession: AdminSession = {
      ...session,
      mustChangePassword: false,
      authenticatedAt: new Date().toISOString(),
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
