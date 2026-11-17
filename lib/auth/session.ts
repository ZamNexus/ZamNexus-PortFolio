import { createHmac, timingSafeEqual } from "node:crypto";

// Signed session cookie. The token is base64url(JSON payload) + "." + base64url(HMAC-SHA256 of that part),
// keyed by ADMIN_SESSION_SECRET. It carries who the session is for, the role and an expiry, and nothing the
// server does not check again: tampering with any part breaks the signature. Changing the secret signs
// everyone out.

export const SESSION_COOKIE = "zn_admin";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

export interface AdminSession {
  sub: string;
  role: "admin";
  iat: number;
  exp: number;
}

const mac = (part: string, secret: string) => createHmac("sha256", secret).update(part).digest();

export function signSession(email: string, secret: string, now = Date.now()): string {
  const iat = Math.floor(now / 1000);
  const payload: AdminSession = { sub: email, role: "admin", iat, exp: iat + SESSION_TTL_SECONDS };
  const part = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${part}.${mac(part, secret).toString("base64url")}`;
}

export function verifySession(token: string | undefined | null, secret: string | undefined, now = Date.now()): AdminSession | null {
  if (!token || !secret || secret.length < 32) return null;
  const [part, signature, extra] = token.split(".");
  if (!part || !signature || extra !== undefined) return null;
  const given = Buffer.from(signature, "base64url");
  const expected = mac(part, secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(part, "base64url").toString("utf8")) as Partial<AdminSession>;
    if (payload.role !== "admin" || typeof payload.sub !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp * 1000 <= now) return null;
    return payload as AdminSession;
  } catch {
    return null;
  }
}
