import { inquiries } from "../../../db/schema";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = clean(body.name, 80);
    const email = clean(body.email, 160);
    const company = clean(body.company, 120);
    const projectType = clean(body.projectType, 80);
    const budget = clean(body.budget, 80);
    const timeline = clean(body.timeline, 100);
    const message = clean(body.message, 2500);

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !projectType || message.length < 20) {
      return Response.json({ error: "Please complete your name, email, project type and a short project brief." }, { status: 400 });
    }

    const { getDb } = await import("../../../db");
    await getDb().insert(inquiries).values({ name, email, company, projectType, budget, timeline, message });
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "The studio inbox is temporarily unavailable. You can also contact us directly by email." }, { status: 503 });
  }
}
