// Creates the values the admin panel needs in .env.local. Run:  node scripts/hash-password.mjs
// It asks for nothing on the command line (so the password never lands in shell history): set it in the
// ADMIN_PASSWORD environment variable for this one run, or leave it unset to have a strong one generated.
//
//   PowerShell:  $env:ADMIN_PASSWORD = "your password"; node scripts/hash-password.mjs
//   bash:        ADMIN_PASSWORD="your password" node scripts/hash-password.mjs
//
// It prints ADMIN_PASSWORD_HASH and a fresh ADMIN_SESSION_SECRET to paste into .env.local (never commit them).

import { randomBytes, scrypt } from "node:crypto";

const N = 16384, R = 8, P = 1;
const generated = !process.env.ADMIN_PASSWORD;
const password = process.env.ADMIN_PASSWORD || randomBytes(15).toString("base64url");

if (password.length < 12) {
  console.error("Use a password of at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const key = await new Promise((resolve, reject) =>
  scrypt(password, salt, 64, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 }, (e, k) => (e ? reject(e) : resolve(k)))
);

console.log("# Add these to .env.local (and to your host's environment variables):");
console.log("ADMIN_EMAIL=you@example.com");
console.log(`ADMIN_PASSWORD_HASH=${["scrypt", N, R, P, salt.toString("base64url"), key.toString("base64url")].join(":")}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString("base64url")}`);
if (generated) console.log(`\n# Generated password (shown once, store it safely): ${password}`);
