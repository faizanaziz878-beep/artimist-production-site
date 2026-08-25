/**
 * Studio control-room authentication.
 *
 * The site was originally gated by Sign in with ChatGPT, whose identity headers
 * only exist on the OpenAI Sites host. This replaces that with a self-contained
 * username/password session that works on any host.
 *
 * Configure with environment variables:
 *   ADMIN_USERNAME         defaults to "faizan"
 *   ADMIN_PASSWORD         defaults to "admin"  <-- change this
 *   ADMIN_SESSION_SECRET   optional; derived from the credentials when unset
 */

export const ADMIN_COOKIE = "artimist_studio_session";
const SESSION_DAYS = 7;

export function adminUsername(): string {
  return process.env.ADMIN_USERNAME?.trim() || "faizan";
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "admin";
}

/** True while the portal is still on the shipped default password. */
export function usingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD?.trim();
}

function sessionSecret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit) return explicit;
  // Derived so that changing the password invalidates every existing session.
  return `artimist:${adminUsername()}:${adminPassword()}`;
}

const encoder = new TextEncoder();

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Length-independent comparison so a wrong guess leaks no timing signal. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function checkCredentials(username: string, password: string): boolean {
  const okUser = safeEqual(username.trim(), adminUsername());
  const okPass = safeEqual(password, adminPassword());
  return okUser && okPass;
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${adminUsername()}.${expires}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [user, expires, signature] = parts;
  if (!Number.isFinite(Number(expires)) || Number(expires) < Date.now()) return false;
  if (user !== adminUsername()) return false;
  return safeEqual(signature, await sign(`${user}.${expires}`));
}

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;
