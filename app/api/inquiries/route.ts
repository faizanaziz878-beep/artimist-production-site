import { inquiries } from "../../../db/schema";
import { publicContactEmail, sendNotification, sendReceiptConfirmation } from "../../../lib/notify";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Courtesy confirmation to the sender. Never allowed to fail a lead: the
// enquiry is already safe by the time this runs.
async function confirmReceipt(
  email: string,
  fields: { name: string; company: string; projectType: string; budget: string; timeline: string; message: string },
) {
  try {
    await sendReceiptConfirmation(email, fields);
  } catch {
    // Ignored on purpose.
  }
}

export async function POST(request: Request) {
  let payload: {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
  };

  try {
    const body = (await request.json()) as Record<string, unknown>;
    payload = {
      name: clean(body.name, 80),
      email: clean(body.email, 160),
      company: clean(body.company, 120),
      projectType: clean(body.projectType, 80),
      budget: clean(body.budget, 80),
      timeline: clean(body.timeline, 100),
      message: clean(body.message, 2500),
    };
  } catch {
    return Response.json({ error: "That submission could not be read. Please try again." }, { status: 400 });
  }

  const { name, email, company, projectType, budget, timeline, message } = payload;
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !projectType || message.length < 20) {
    return Response.json(
      { error: "Please complete your name, email, project type and a short project brief." },
      { status: 400 },
    );
  }

  // Preferred path: persist to the studio database so the enquiry appears in
  // the control room.
  let stored = false;
  try {
    const { getDb } = await import("../../../db");
    await getDb().insert(inquiries).values({ name, email, company, projectType, budget, timeline, message });
    stored = true;
  } catch {
    // No database binding on this host — the email copy below is then the only record.
  }

  // A copy always goes to the studio inbox, whether or not the enquiry was
  // stored, so a lead is visible without opening the control room.
  const emailed = await sendNotification(
    `New studio enquiry — ${name}`,
    {
      Name: name,
      Email: email,
      Company: company,
      "Project type": projectType,
      Budget: budget,
      Timeline: timeline,
      Brief: message,
    },
    email,
  );

  if (stored || emailed) {
    await confirmReceipt(email, { name, company, projectType, budget, timeline, message });
    return Response.json({ ok: true }, { status: 201 });
  }

  return Response.json(
    {
      error: `The studio inbox is temporarily unavailable. Please email us directly at ${publicContactEmail()} and we will reply the same day.`,
    },
    { status: 503 },
  );
}
