import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Studio database.
 *
 * The site was authored against Cloudflare D1. It is hosted on Vercel, where
 * that binding does not exist, so the control room and every write path were
 * dead. This is Postgres (Neon) over HTTP, which works on any serverless host.
 *
 * Configure with one environment variable:
 *   DATABASE_URL   Neon connection string (Vercel injects this automatically
 *                  when the Neon integration is connected to the project)
 *
 * When it is absent this still throws, exactly as before, so every caller falls
 * back to the bundled studio content instead of crashing the page.
 */
export function getDb() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Connect the Neon integration to this Vercel project, or set DATABASE_URL, before using the database.",
    );
  }

  return drizzle(neon(url), { schema });
}

/** True when a database is configured. Lets callers branch without throwing. */
export function databaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
