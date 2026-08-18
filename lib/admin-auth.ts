import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminUsername, verifySessionToken } from "./site-auth";

export type ChatGPTUser = {
  displayName: string;
  email: string;
  fullName: string | null;
};

/**
 * Control-room identity.
 *
 * Access used to be limited to a hardcoded list of ChatGPT accounts. It is now
 * a single studio login backed by a signed session cookie, so the portal works
 * on any host. The shape is unchanged so the existing API routes keep working.
 */
export function isAdminEmail(_email?: string): boolean {
  return true;
}

export async function getAdminUser(): Promise<ChatGPTUser | null> {
  const store = await cookies();
  const valid = await verifySessionToken(store.get(ADMIN_COOKIE)?.value);
  if (!valid) return null;
  const name = adminUsername();
  return { displayName: name, email: name, fullName: "Studio Admin" };
}

export async function requireAdminApi(): Promise<ChatGPTUser | null> {
  return getAdminUser();
}
import { getChatGPTUser, type ChatGPTUser } from "../app/chatgpt-auth";

const ADMIN_EMAILS = new Set(["ar.faizan01@gmail.com", "faizanpro007@gmail.com"]);

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
}

export async function getAdminUser(): Promise<ChatGPTUser | null> {
  const user = await getChatGPTUser();
  return user && isAdminEmail(user.email) ? user : null;
}

export async function requireAdminApi(): Promise<ChatGPTUser | null> {
  return getAdminUser();
}
