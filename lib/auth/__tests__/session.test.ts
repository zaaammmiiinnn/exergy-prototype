import { describe, test } from "node:test";
import assert from "node:assert";
import { signSession, verifySession } from "../session";
import { hashPasswordWebCrypto, verifyPasswordWebCrypto } from "@/app/actions/admin-auth";

describe("Cryptographic Session & Authentication Security", () => {
  test("1. signSession produces a valid tamper-proof token and verifySession decodes it", async () => {
    const payload = {
      email: "founder@exergy-solutions.com",
      role: "founder",
      name: "Principal Founder",
    };

    const token = await signSession(payload);
    assert.ok(typeof token === "string");
    assert.ok(token.includes("."));

    const decoded = await verifySession<typeof payload>(token);
    assert.ok(decoded);
    assert.strictEqual(decoded.email, "founder@exergy-solutions.com");
    assert.strictEqual(decoded.role, "founder");
  });

  test("2. verifySession rejects tampered payload (privilege escalation attempt)", async () => {
    const payload = {
      email: "staff@exergy-solutions.com",
      role: "employee",
      name: "Staff",
    };

    const token = await signSession(payload);
    const [b64Data, sigHex] = token.split(".");

    // Attacker alters payload to role 'founder' while keeping original signature
    const tamperedPayload = {
      ...payload,
      role: "founder",
    };
    const tamperedB64 = Buffer.from(JSON.stringify(tamperedPayload)).toString("base64url");
    const tamperedToken = `${tamperedB64}.${sigHex}`;

    const result = await verifySession(tamperedToken);
    assert.strictEqual(result, null, "Tampered token must be rejected with null");
  });

  test("3. verifySession rejects invalid tokens, empty strings, and malformed inputs", async () => {
    assert.strictEqual(await verifySession(""), null);
    assert.strictEqual(await verifySession("random-string-without-dot"), null);
    assert.strictEqual(await verifySession("invalid.signature"), null);
    assert.strictEqual(await verifySession(undefined), null);
    assert.strictEqual(await verifySession(null), null);
  });

  test("4. hashPasswordWebCrypto creates salted PBKDF2 hash and verifyPasswordWebCrypto validates correctly", async () => {
    const password = "StrongPassword2026!";
    const hash = await hashPasswordWebCrypto(password);

    assert.ok(hash.includes(":"));
    const [saltHex, derivedHex] = hash.split(":");
    assert.strictEqual(saltHex.length, 32); // 16 bytes = 32 hex chars
    assert.strictEqual(derivedHex.length, 64); // 256 bits = 32 bytes = 64 hex chars

    // Correct password succeeds
    const isMatch = await verifyPasswordWebCrypto(password, hash);
    assert.strictEqual(isMatch, true);

    // Wrong password fails
    const isWrongMatch = await verifyPasswordWebCrypto("WrongPassword123!", hash);
    assert.strictEqual(isWrongMatch, false);
  });
});
