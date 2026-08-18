import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  createSessionToken,
} from "../../../../lib/site-auth";

/** Small in-memory throttle. Per instance only, but it blunts credential stuffing. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function throttled(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return Response.json(
      { error: "Too many sign-in attempts. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let username = "";
  let password = "";
  try {
    const body = (await request.json()) as Record<string, unknown>;
    username = typeof body.username === "string" ? body.username.slice(0, 120) : "";
    password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  } catch {
    return Response.json({ error: "That sign-in could not be read." }, { status: 400 });
  }

  if (!checkCredentials(username, password)) {
    return Response.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
