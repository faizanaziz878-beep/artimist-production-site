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
