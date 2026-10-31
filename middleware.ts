import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth/session";

const PRIVATE_ROUTES = [
  "/admin",
  "/portal",
  "/api",
  "/account",
  "/track",
  "/assessment/thank-you",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // 1. Enforce 301 Canonical Domain (redirect www to non-www)
  if (host.startsWith("www.exergy-solutions.com")) {
    const nonWwwUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      "https://exergy-solutions.com"
    );
    return NextResponse.redirect(nonWwwUrl, { status: 301 });
  }

  // 2. Protect /admin routes (except login)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return res;
    }

    const sessionCookie = request.cookies.get("exergy_admin_session")?.value;
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return res;
    }

    try {
      // Cryptographically verify HMAC-SHA256 signature
      const session = await verifySession<any>(sessionCookie);
      if (!session) {
        // Tampered, expired, or unsigned cookie -> force re-login
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("error", "session_invalid");
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete("exergy_admin_session");
        res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        return res;
      }

      const role = (session.role || "employee").toLowerCase().trim();
      const mustChangePassword = Boolean(session.mustChangePassword);

      // If user has a temporary password, force them to /admin/change-password
      if (mustChangePassword) {
        if (pathname !== "/admin/change-password") {
          const changePassUrl = new URL("/admin/change-password", request.url);
          const res = NextResponse.redirect(changePassUrl);
          res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
          return res;
        }
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        return res;
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
        const res = NextResponse.redirect(redirectUrl);
        res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        return res;
      }
    } catch {
      // Malformed cookie -> redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return res;
    }
  }

  // 3. Attach X-Robots-Tag on private/transactional application routes
  const response = NextResponse.next();
  const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  if (isPrivate) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/api/:path*",
    "/account/:path*",
    "/track/:path*",
    "/assessment/thank-you",
  ],
};
