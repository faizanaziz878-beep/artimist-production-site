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

/**
 * Where studio enquiries are delivered.
 *
 * This is a private tracking inbox. It is used to address outbound mail only
 * and must never be rendered on the public site — use `publicContactEmail()`
 * for anything a visitor can see.
 */
export function notifyTarget(): string {
  return process.env.INQUIRY_TO_EMAIL?.trim() || "faizanaziz878@gmail.com";
}

/** The address shown to visitors. Deliberately not the tracking inbox. */
export function publicContactEmail(): string {
  return process.env.PUBLIC_CONTACT_EMAIL?.trim() || "Faizan@artimistproductions.com";
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

/**
 * Confirmation of receipt sent to the person who submitted the brief.
 *
 * This is a courtesy acknowledgement, not a sales email: it confirms the brief
 * arrived, repeats back what they sent so they have a record, and gives them a
 * direct route to the studio. It must never block or fail a lead — the caller
 * ignores the return value.
 *
 * Note: Resend will refuse to deliver to arbitrary recipients until the sending
 * domain is verified. Until then this returns false and the enquiry itself is
 * unaffected.
 */
export async function sendReceiptConfirmation(
  to: string,
  fields: { name: string; company: string; projectType: string; budget: string; timeline: string; message: string },
): Promise<boolean> {
  if (!notifyConfigured()) return false;

  const esc = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const firstName = fields.name.trim().split(/\s+/)[0] || "there";
  const studio = publicContactEmail();

  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:10px 0;border-bottom:1px solid #1c1c1c;color:#6f6f6f;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;width:132px;vertical-align:top;">${esc(label)}</td>
           <td style="padding:10px 0;border-bottom:1px solid #1c1c1c;color:#e8e6e3;font-size:14px;line-height:1.6;vertical-align:top;">${esc(value)}</td>
         </tr>`
      : "";

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Brief received</title></head>
<body style="margin:0;padding:0;background:#080808;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your brief reached the studio. Here is a copy for your records.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d0d0d;border:1px solid #1c1c1c;">
        <tr><td style="padding:36px 36px 0 36px;">
          <div style="color:#e8e6e3;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:0.34em;">ARTIMIST</div>
          <div style="margin-top:6px;color:#5c5c5c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;">Architecture &middot; BIM &middot; Visualization</div>
        </td></tr>
        <tr><td style="padding:32px 36px 0 36px;">
          <h1 style="margin:0;color:#f4f2ef;font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.28;font-weight:400;">Your brief reached us.</h1>
          <p style="margin:18px 0 0 0;color:#a5a5a5;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.72;">
            ${esc(firstName)} &mdash; thank you. This is confirmation that your project brief arrived at the studio and is now with our team.
          </p>
          <p style="margin:14px 0 0 0;color:#a5a5a5;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.72;">
            One of us will read it personally rather than route it through a form queue, and come back to you directly at this address. If anything has changed in the meantime, simply reply to this email &mdash; it reaches us.
          </p>
        </td></tr>
        <tr><td style="padding:30px 36px 0 36px;">
          <div style="color:#5c5c5c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid #262626;">Your brief, for your records</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif;margin-top:4px;">
            ${row("Name", fields.name)}
            ${row("Company", fields.company)}
            ${row("Project type", fields.projectType)}
            ${row("Budget", fields.budget)}
            ${row("Timeline", fields.timeline)}
          </table>
          <div style="margin-top:20px;color:#6f6f6f;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">Brief</div>
          <div style="margin-top:8px;padding:16px 18px;background:#111111;border-left:2px solid #2e2e2e;color:#c9c7c4;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.72;white-space:pre-wrap;">${esc(fields.message)}</div>
        </td></tr>
        <tr><td style="padding:30px 36px 36px 36px;">
          <div style="border-top:1px solid #1c1c1c;padding-top:22px;">
            <p style="margin:0;color:#8a8a8a;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;">
              Direct: <a href="mailto:${esc(studio)}" style="color:#e8e6e3;text-decoration:none;border-bottom:1px solid #3a3a3a;">${esc(studio)}</a>
            </p>
            <p style="margin:14px 0 0 0;color:#4f4f4f;font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;">
              Artimist Production &mdash; architectural design support, Revit and BIM production, CAD drafting, permit and construction documentation, interiors and high-end visualization.
            </p>
            <p style="margin:10px 0 0 0;color:#3d3d3d;font-family:Helvetica,Arial,sans-serif;font-size:11px;">
              <a href="https://www.artimistproductions.com" style="color:#5c5c5c;text-decoration:none;">artimistproductions.com</a>
            </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `${firstName} — thank you. This is confirmation that your project brief arrived at Artimist Production.`,
    ``,
    `One of us will read it personally and come back to you directly at this address. If anything has changed, just reply to this email.`,
    ``,
    `YOUR BRIEF, FOR YOUR RECORDS`,
    fields.name ? `Name: ${fields.name}` : "",
    fields.company ? `Company: ${fields.company}` : "",
    fields.projectType ? `Project type: ${fields.projectType}` : "",
    fields.budget ? `Budget: ${fields.budget}` : "",
    fields.timeline ? `Timeline: ${fields.timeline}` : "",
    ``,
    fields.message,
    ``,
    `Direct: ${studio}`,
    `artimistproductions.com`,
  ]
    .filter((line) => line !== "")
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
        to: [to],
        subject: "Your brief reached the studio — Artimist Production",
        html,
        text,
        reply_to: studio,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * A reply written by the studio in the control room and sent to the person who
 * submitted the brief. Threaded by subject so it lands in the same conversation
 * as the confirmation of receipt.
 */
export async function sendStudioReply(
  to: string,
  recipientName: string,
  bodyText: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!notifyConfigured()) {
    return { ok: false, error: "Email is not configured on this deployment." };
  }

  const esc = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const firstName = recipientName.trim().split(/\s+/)[0] || "there";
  const studio = publicContactEmail();

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Artimist Production</title></head>
<body style="margin:0;padding:0;background:#080808;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d0d0d;border:1px solid #1c1c1c;">
        <tr><td style="padding:36px 36px 0 36px;">
          <div style="color:#e8e6e3;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:0.34em;">ARTIMIST</div>
          <div style="margin-top:6px;color:#5c5c5c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;">Architecture &middot; BIM &middot; Visualization</div>
        </td></tr>
        <tr><td style="padding:30px 36px 0 36px;">
          <p style="margin:0 0 16px 0;color:#f4f2ef;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.72;">${esc(firstName)},</p>
          <div style="color:#c9c7c4;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.78;white-space:pre-wrap;">${esc(bodyText)}</div>
        </td></tr>
        <tr><td style="padding:30px 36px 36px 36px;">
          <div style="border-top:1px solid #1c1c1c;padding-top:22px;">
            <p style="margin:0;color:#8a8a8a;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;">
              Artimist Production &mdash; <a href="mailto:${esc(studio)}" style="color:#e8e6e3;text-decoration:none;border-bottom:1px solid #3a3a3a;">${esc(studio)}</a>
            </p>
            <p style="margin:10px 0 0 0;color:#3d3d3d;font-family:Helvetica,Arial,sans-serif;font-size:11px;">
              <a href="https://www.artimistproductions.com" style="color:#5c5c5c;text-decoration:none;">artimistproductions.com</a>
            </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL!.trim(),
        to: [to],
        subject: "Your brief reached the studio — Artimist Production",
        html,
        text: `${firstName},\n\n${bodyText}\n\n—\nArtimist Production\n${studio}\nartimistproductions.com`,
        reply_to: studio,
      }),
    });
    if (response.ok) return { ok: true };
    const detail = (await response.json().catch(() => null)) as { message?: string } | null;
    return { ok: false, error: detail?.message || `Email provider returned ${response.status}.` };
  } catch {
    return { ok: false, error: "Could not reach the email provider." };
  }
}
