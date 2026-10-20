import { NextResponse } from "next/server";
import { adminLoginAction } from "@/app/actions/admin-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const res = await adminLoginAction(email, password);
    if (!res.success) {
      return NextResponse.json(
        { success: false, error: res.error || "Authentication failed." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true, session: res.session });
    
    // Explicitly set cookie on response
    if (res.session) {
      response.cookies.set("exergy_admin_session", JSON.stringify(res.session), {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 86400 * 7,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch (err: any) {
    console.error("[API ADMIN LOGIN ERROR]", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
