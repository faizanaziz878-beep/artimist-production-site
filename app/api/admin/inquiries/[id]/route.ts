import { eq } from "drizzle-orm";
import { inquiries } from "../../../../../db/schema";
import { requireAdminApi } from "../../../../../lib/admin-auth";

const statuses = new Set(["new", "contacted", "closed"]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdminApi())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number((await context.params).id);
  const body = (await request.json().catch(() => null)) as { status?: string } | null;
  const status = body?.status ?? "";
  if (!Number.isInteger(id) || id < 1 || !statuses.has(status)) {
    return Response.json({ error: "Invalid inquiry update." }, { status: 400 });
  }

  const { getDb } = await import("../../../../../db");
  await getDb()
    .update(inquiries)
    .set({ status: status as "new" | "contacted" | "closed" })
    .where(eq(inquiries.id, id));
  return Response.json({ ok: true });
}
