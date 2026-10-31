import { cookies } from "next/headers";
import { signSession, verifySession } from "@/lib/auth/session";

export interface VisitorSessionPayload {
  visitorUuid: string;
  deviceType: string;
  createdAt: string;
}

const VISITOR_COOKIE_NAME = "exergy_visitor_token";

/**
 * Generate a cryptographically secure random visitor UUID
 */
export function generateVisitorUuid(): string {
  return `visitor_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

/**
 * Sign visitor identity token with tamper-proof HMAC-SHA256 signature
 */
export async function signVisitorToken(
  visitorUuid: string,
  deviceType: string = "desktop"
): Promise<string> {
  const payload: VisitorSessionPayload = {
    visitorUuid,
    deviceType,
    createdAt: new Date().toISOString(),
  };
  return await signSession(payload);
}

/**
 * Verify visitor identity token. Returns null if invalid or tampered.
 */
export async function verifyVisitorToken(
  token: string | null | undefined
): Promise<VisitorSessionPayload | null> {
  if (!token) return null;
  return await verifySession<VisitorSessionPayload>(token);
}

/**
 * Retrieve or establish authenticated visitor identity from request cookies
 */
export async function resolveVisitorSession(): Promise<{
  visitorUuid: string;
  deviceType: string;
  token: string;
  isNew: boolean;
}> {
  const cookieStore = cookies();
  const existingCookie = cookieStore.get(VISITOR_COOKIE_NAME);

  if (existingCookie?.value) {
    const verified = await verifyVisitorToken(existingCookie.value);
    if (verified && verified.visitorUuid) {
      return {
        visitorUuid: verified.visitorUuid,
        deviceType: verified.deviceType || "desktop",
        token: existingCookie.value,
        isNew: false,
      };
    }
  }

  // Create new signed visitor session
  const newUuid = generateVisitorUuid();
  const newToken = await signVisitorToken(newUuid, "desktop");

  try {
    cookieStore.set(VISITOR_COOKIE_NAME, newToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400 * 365, // 1 year persistence
      secure: process.env.NODE_ENV === "production",
    });
  } catch (err) {
    // Cookie store may be immutable in some contexts; caller can set via response header
  }

  return {
    visitorUuid: newUuid,
    deviceType: "desktop",
    token: newToken,
    isNew: true,
  };
}
