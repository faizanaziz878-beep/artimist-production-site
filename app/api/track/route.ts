import { sql } from "drizzle-orm";
import { pageViews } from "../../../db/schema";

/**
 * Visitor logging.
 *
 * Called once per page view by the small script in the root layout. It records
 * the path, where the visit came from, a coarse device class and the country
 * Vercel already resolved at the edge. It never stores an IP address, a cookie
 * or anything that identifies a person, and it never fails the page: every
 * error path returns 204 so a logging problem can never break browsing.
 */

let tableReady = false;

/**
 * Create the table on first use.
 *
 * The rest of the schema was created by a migration run before this table
 * existed, and the production database cannot be migrated from here, so the
 * table is created lazily instead. `IF NOT EXISTS` makes it a no-op afterwards.
 */
async function ensureTable(db: ReturnType<typeof import("../../../db").getDb>) {
  if (tableReady) return;
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id serial PRIMARY KEY,
      path text NOT NULL,
      referrer text NOT NULL DEFAULT '',
      visitor_id text NOT NULL DEFAULT '',
      country text NOT NULL DEFAULT '',
      city text NOT NULL DEFAULT '',
      device text NOT NULL DEFAULT '',
      created_at text NOT NULL DEFAULT (now()::text)
    )
  `);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at)`);
  tableReady = true;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function deviceClass(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "Tablet";
  if (/mobi|android|iphone/.test(ua)) return "Mobile";
  if (!ua) return "";
  return "Desktop";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const path = clean(body.path, 300) || "/";
    const referrer = clean(body.referrer, 300);
    const visitorId = clean(body.visitorId, 64);

    const { getDb } = await import("../../../db");
    const db = getDb();
    await ensureTable(db);
    await db.insert(pageViews).values({
      path,
      referrer,
      visitorId,
      country: request.headers.get("x-vercel-ip-country") || "",
      city: request.headers.get("x-vercel-ip-city") || "",
      device: deviceClass(request.headers.get("user-agent") || ""),
    });
  } catch {
    // No database, or a transient write failure. Browsing must not be affected.
  }
  return new Response(null, { status: 204 });
}
