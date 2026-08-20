import { eq } from "drizzle-orm";
import { inquiries } from "../../../../../../db/schema";
import { requireAdminApi } from "../../../../../../lib/admin-auth";
import { sendStudioReply } from "../../../../../../lib/notify";

/** Send a written reply to an enquiry and mark the conversation as contacted. */
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await requireAdminApi())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number((await context.params).id);
  const body = (await request.json().catch(() => null)) as { message?: string } | null;
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ error: "Unknown enquiry." }, { status: 400 });
  }
  if (message.length < 2) {
    return Response.json({ error: "Write a reply before sending." }, { status: 400 });
  }

  const { getDb } = await import("../../../../../../db");
  const db = getDb();
  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (!row) return Response.json({ error: "Unknown enquiry." }, { status: 404 });

  const sent = await sendStudioReply(row.email, row.name, message);
  if (!sent.ok) {
    return Response.json({ error: sent.error || "The reply could not be sent." }, { status: 502 });
  }

  await db.update(inquiries).set({ status: "contacted" }).where(eq(inquiries.id, id));
  return Response.json({ ok: true, status: "contacted" });
}
