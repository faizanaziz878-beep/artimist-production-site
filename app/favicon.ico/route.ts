import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const icon = await readFile(path.join(process.cwd(), "public", "favicon.svg"), "utf8");
    return new Response(icon, {
      status: 200,
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control": "public, max-age=86400, s-maxage=604800",
      },
    });
  } catch {
    return new Response("", { status: 404 });
  }
}
