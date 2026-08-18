/**
 * Outbound notification fallback.
 *
 * On the Cloudflare/Sites deployment, form submissions are written to D1 and
 * read back in the studio control room. On a Node host without that binding
 * (e.g. Vercel) there is no database, so submissions are emailed instead —
 * a lead is never silently dropped.
 *
 * Configure with environment variables:
 *   RESEND_API_KEY     API key from https://resend.com (free tier is enough)
 *   INQUIRY_TO_EMAIL   where studio enquiries should land
 *   INQUIRY_FROM_EMAIL a verified sender on your Resend domain
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function notifyTarget(): string {
  return process.env.INQUIRY_TO_EMAIL?.trim() || "Faizan@artimistproductions.com";
}

export function notifyConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.INQUIRY_FROM_EMAIL?.trim());
}

export async function sendNotification(
  subject: string,
  fields: Record<string, string>,
  replyTo?: string,
): Promise<boolean> {
  if (!notifyConfigured()) return false;

  const lines = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL!.trim(),
        to: [notifyTarget()],
        subject,
        text: lines,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
