/**
 * Outbound notification fallback.
 *
 * Configure with:
 *   RESEND_API_KEY
 *   INQUIRY_TO_EMAIL
 *   INQUIRY_FROM_EMAIL
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function notifyTarget(): string {
  return process.env.INQUIRY_TO_EMAIL?.trim() || "faizanaziz878@gmail.com";
}

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

export type ReceiptFields = {
  reference: string;
  name: string;
  company: string;
  projectType: string;
  projectLocation: string;
  projectStage: string;
  budget: string;
  timeline: string;
  preferredContact: string;
  sourceLinks: string;
  message: string;
};

export async function sendReceiptConfirmation(
  to: string,
  fields: ReceiptFields,
): Promise<boolean> {
  if (!notifyConfigured()) return false;

  const esc = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const firstName = fields.name.trim().split(/\s+/)[0] || "there";
  const studio = publicContactEmail();
  const row = (label: string, value: string) => value ? `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #1c1c1c;color:#6f6f6f;font-size:11px;letter-spacing:.14em;text-transform:uppercase;width:142px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #1c1c1c;color:#e8e6e3;font-size:14px;line-height:1.6;vertical-align:top;overflow-wrap:anywhere;">${esc(value)}</td>
  </tr>` : "";

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Project received</title></head>
<body style="margin:0;padding:0;background:#080808;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your project brief reached Artimist Productions. Reference ${esc(fields.reference)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#0d0d0d;border:1px solid #1c1c1c;">
        <tr><td style="padding:36px 36px 0 36px;">
          <div style="color:#e8e6e3;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:.34em;">ARTIMIST</div>
          <div style="margin-top:6px;color:#5c5c5c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:.24em;text-transform:uppercase;">Architecture &middot; BIM &middot; Visualization</div>
        </td></tr>
        <tr><td style="padding:32px 36px 0 36px;">
          <div style="display:inline-block;padding:8px 11px;border:1px solid #2c2023;border-radius:999px;color:#d96476;font:600 10px/1 Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;">Reference ${esc(fields.reference)}</div>
          <h1 style="margin:20px 0 0;color:#f4f2ef;font-family:Georgia,'Times New Roman',serif;font-size:29px;line-height:1.25;font-weight:400;">Your project reached the studio.</h1>
          <p style="margin:18px 0 0;color:#a5a5a5;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.72;">${esc(firstName)} — thank you. A studio lead will read the brief personally and reply directly. If you need to add anything, reply to this email and it stays with the same conversation.</p>
        </td></tr>
        <tr><td style="padding:30px 36px 0 36px;">
          <div style="color:#5c5c5c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid #262626;">Your project, for your records</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Helvetica,Arial,sans-serif;margin-top:4px;">
            ${row("Name", fields.name)}
            ${row("Company", fields.company)}
            ${row("Project type", fields.projectType)}
            ${row("Location", fields.projectLocation)}
            ${row("Stage", fields.projectStage)}
            ${row("Budget", fields.budget)}
            ${row("Timeline", fields.timeline)}
            ${row("Contact", fields.preferredContact)}
            ${row("Files / link", fields.sourceLinks)}
          </table>
          <div style="margin-top:20px;color:#6f6f6f;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;">Brief</div>
          <div style="margin-top:8px;padding:16px 18px;background:#111;border-left:2px solid #6e141c;color:#c9c7c4;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.72;white-space:pre-wrap;">${esc(fields.message)}</div>
        </td></tr>
        <tr><td style="padding:30px 36px 36px 36px;">
          <div style="border-top:1px solid #1c1c1c;padding-top:22px;">
            <p style="margin:0;color:#8a8a8a;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;">Direct: <a href="mailto:${esc(studio)}" style="color:#e8e6e3;text-decoration:none;border-bottom:1px solid #3a3a3a;">${esc(studio)}</a></p>
            <p style="margin:14px 0 0;color:#4f4f4f;font-family:Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;">Artimist Productions — architecture, interiors, BIM/Revit, drafting, permit and construction documentation, high-end visualization, animation and real-time experiences.</p>
            <p style="margin:10px 0 0;color:#3d3d3d;font-family:Helvetica,Arial,sans-serif;font-size:11px;"><a href="https://www.artimistproductions.com" style="color:#5c5c5c;text-decoration:none;">artimistproductions.com</a></p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `${firstName} — thank you. Your project brief reached Artimist Productions.`,
    `Reference: ${fields.reference}`,
    ``,
    `A studio lead will read it personally and reply directly. If anything changes, reply to this email.`,
    ``,
    `YOUR PROJECT, FOR YOUR RECORDS`,
    fields.name ? `Name: ${fields.name}` : "",
    fields.company ? `Company: ${fields.company}` : "",
    fields.projectType ? `Project type: ${fields.projectType}` : "",
    fields.projectLocation ? `Location: ${fields.projectLocation}` : "",
    fields.projectStage ? `Stage: ${fields.projectStage}` : "",
    fields.budget ? `Budget: ${fields.budget}` : "",
    fields.timeline ? `Timeline: ${fields.timeline}` : "",
    fields.preferredContact ? `Preferred contact: ${fields.preferredContact}` : "",
    fields.sourceLinks ? `Files / link: ${fields.sourceLinks}` : "",
    ``,
    fields.message,
    ``,
    `Direct: ${studio}`,
    `artimistproductions.com`,
  ].filter((line) => line !== "").join("\n");

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
        subject: `Your project reached Artimist Productions — ${fields.reference}`,
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

export async function sendStudioReply(
  to: string,
  recipientName: string,
  bodyText: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!notifyConfigured()) return { ok: false, error: "Email is not configured on this deployment." };

  const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const firstName = recipientName.trim().split(/\s+/)[0] || "there";
  const studio = publicContactEmail();
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Artimist Productions</title></head><body style="margin:0;padding:0;background:#080808;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 16px;"><tr><td align="center"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d0d0d;border:1px solid #1c1c1c;"><tr><td style="padding:36px 36px 0"><div style="color:#e8e6e3;font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:.34em;">ARTIMIST</div><div style="margin-top:6px;color:#5c5c5c;font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:.24em;text-transform:uppercase;">Architecture &middot; BIM &middot; Visualization</div></td></tr><tr><td style="padding:30px 36px 0"><p style="margin:0 0 16px;color:#f4f2ef;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.72;">${esc(firstName)},</p><div style="color:#c9c7c4;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.78;white-space:pre-wrap;">${esc(bodyText)}</div></td></tr><tr><td style="padding:30px 36px 36px"><div style="border-top:1px solid #1c1c1c;padding-top:22px;"><p style="margin:0;color:#8a8a8a;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1.7;">Artimist Productions — <a href="mailto:${esc(studio)}" style="color:#e8e6e3;text-decoration:none;border-bottom:1px solid #3a3a3a;">${esc(studio)}</a></p><p style="margin:10px 0 0;color:#3d3d3d;font-family:Helvetica,Arial,sans-serif;font-size:11px;"><a href="https://www.artimistproductions.com" style="color:#5c5c5c;text-decoration:none;">artimistproductions.com</a></p></div></td></tr></table></td></tr></table></body></html>`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL!.trim(),
        to: [to],
        subject: "Artimist Productions — project follow-up",
        html,
        text: `${firstName},\n\n${bodyText}\n\n—\nArtimist Productions\n${studio}\nartimistproductions.com`,
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
