import { inquiries } from "../../../db/schema";
import { notifyTarget, sendNotification } from "../../../lib/notify";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
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
  try {
    const { getDb } = await import("../../../db");
    await getDb().insert(inquiries).values({ name, email, company, projectType, budget, timeline, message });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    // No database binding on this host — fall through to email.
  }

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

  if (emailed) return Response.json({ ok: true }, { status: 201 });

  return Response.json(
    {
      error: `The studio inbox is temporarily unavailable. Please email us directly at ${notifyTarget()} and we will reply the same day.`,
    },
    { status: 503 },
  );
}
