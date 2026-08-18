import { sql } from "drizzle-orm";
import { siteSettings } from "../../../../db/schema";
import { requireAdminApi } from "../../../../lib/admin-auth";
import { defaultSettings } from "../../../../lib/content";

const allowedKeys = new Set(Object.keys(defaultSettings));

export async function PUT(request: Request) {
  if (!(await requireAdminApi())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid settings." }, { status: 400 });

  const entries = Object.entries(body)
    .filter(([key, value]) => allowedKeys.has(key) && typeof value === "string")
    .map(([key, value]) => [key, (value as string).trim().slice(0, 1500)] as const);
  if (!entries.length) return Response.json({ error: "Nothing to update." }, { status: 400 });

  const { getDb } = await import("../../../../db");
  const db = getDb();
  for (const [key, value] of entries) {
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, updatedAt: sql`CURRENT_TIMESTAMP` },
      });
  }
  return Response.json({ ok: true });
}
