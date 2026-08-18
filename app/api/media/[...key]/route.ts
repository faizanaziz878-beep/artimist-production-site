export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const objectKey = key.join("/");
  if (!objectKey || objectKey.includes("..")) return new Response("Not found", { status: 404 });

  // Uploaded media lives in R2. Hosts without that binding serve only the
  // static assets under /media, so report a clean 404 instead of crashing.
  const { env } = await import("cloudflare:workers");
  if (!env?.BUCKET) return new Response("Not found", { status: 404 });

  const object = await env.BUCKET.get(objectKey);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", headers.get("cache-control") || "public, max-age=86400");
  headers.set("x-content-type-options", "nosniff");
  return new Response(object.body, { headers });
}
