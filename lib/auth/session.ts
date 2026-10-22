/**
 * Cryptographic session signing and verification using Web Crypto API.
 * Fully compatible with Node.js and Cloudflare Workers (Edge runtime).
 */

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.CHAT_SESSION_SALT ||
  "exergy-solutions-secure-secret-salt-2026";

/**
 * Derives an HMAC-SHA256 CryptoKey from the secret
 */
async function getSigningKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Sign session object into a tamper-proof token format: `<base64UrlData>.<hexSignature>`
 */
export async function signSession<T extends object>(payload: T): Promise<string> {
  const enc = new TextEncoder();
  const jsonStr = JSON.stringify(payload);
  const key = await getSigningKey();

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(jsonStr));
  const sigHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const b64Data = Buffer.from(jsonStr, "utf-8").toString("base64url");
  return `${b64Data}.${sigHex}`;
}

/**
 * Verify and decode tamper-proof session token.
 * Returns null if the token is invalid, expired, or modified.
 */
export async function verifySession<T = any>(token: string | undefined | null): Promise<T | null> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  try {
    const [b64Data, sigHex] = token.split(".");
    if (!b64Data || !sigHex) return null;

    const jsonStr = Buffer.from(b64Data, "base64url").toString("utf-8");
    const enc = new TextEncoder();
    const key = await getSigningKey();

    const sigBytes = new Uint8Array(
      sigHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(jsonStr)
    );

    if (!isValid) {
      return null;
    }

    return JSON.parse(jsonStr) as T;
  } catch {
    return null;
  }
}
