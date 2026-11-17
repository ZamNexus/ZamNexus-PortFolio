import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from "node:crypto";

// Password hashing with scrypt (built into Node, memory-hard, no extra dependency).
// Stored form: scrypt:N:r:p:salt:hash, with salt and hash in base64url. Colons rather than "$" on purpose:
// a "$" inside a .env value is treated as a variable reference and would silently corrupt the hash.

const N = 16384;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;

function derive(password: string, salt: Buffer, n: number, r: number, p: number): Promise<Buffer> {
  const options: ScryptOptions = { N: n, r, p, maxmem: 64 * 1024 * 1024 };
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, options, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, N, R, P);
  return ["scrypt", N, R, P, salt.toString("base64url"), key.toString("base64url")].join(":");
}

// Always does the full derivation, even for a malformed hash, so a wrong email or a broken config takes about
// as long to reject as a wrong password.
export async function verifyPassword(password: string, stored: string | undefined): Promise<boolean> {
  const parts = (stored ?? "").split(":");
  const valid = parts.length === 6 && parts[0] === "scrypt";
  const [n, r, p] = valid ? parts.slice(1, 4).map(Number) : [N, R, P];
  const salt = Buffer.from(valid ? parts[4] : "x", "base64url");
  const expected = Buffer.from(valid ? parts[5] : "x", "base64url");
  if (![n, r, p].every((v) => Number.isInteger(v) && v > 0 && v <= 1 << 20)) return false;
  try {
    const actual = await derive(password, salt, n, r, p);
    return valid && actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
