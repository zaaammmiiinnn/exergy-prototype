import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("exergy_admin_session")?.value;
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const session = JSON.parse(decodeURIComponent(sessionCookie));
      const role = (session.role || "employee").toLowerCase().trim();
      const mustChangePassword = Boolean(session.mustChangePassword);

      // If user has a temporary password, force them to /admin/change-password
      if (mustChangePassword) {
        if (pathname !== "/admin/change-password") {
          const changePassUrl = new URL("/admin/change-password", request.url);
          return NextResponse.redirect(changePassUrl);
        }
        return NextResponse.next();
      }

      // If user does not need to change password, prevent access to /admin/change-password
      if (pathname === "/admin/change-password") {
        const dashboardUrl = new URL("/admin", request.url);
        return NextResponse.redirect(dashboardUrl);
      }

      // Rule: Block 'employee' role from accessing /admin/settings or /admin/chatbot
      const isRestrictedPath =
        pathname === "/admin/settings" ||
        pathname.startsWith("/admin/settings/") ||
        pathname === "/admin/chatbot" ||
        pathname.startsWith("/admin/chatbot/");

      if (role === "employee" && isRestrictedPath) {
        const redirectUrl = new URL("/admin", request.url);
        redirectUrl.searchParams.set("error", "unauthorized_role");
        return NextResponse.redirect(redirectUrl);
      }
    } catch {
      // Malformed cookie -> redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
