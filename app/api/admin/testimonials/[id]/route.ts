import { eq, sql } from "drizzle-orm";
import { testimonials } from "../../../../../db/schema";
import { requireAdminApi } from "../../../../../lib/admin-auth";

const statuses = new Set(["pending", "published", "rejected"]);
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdminApi())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ error: "Invalid review update." }, { status: 400 });
  }

  const contentType = request.headers.get("content-type") || "";
  const { getDb } = await import("../../../../../db");
  const db = getDb();

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const photo = form.get("photo");
    if (!(photo instanceof File) || photo.size === 0) {
      return Response.json({ error: "Choose a client photo first." }, { status: 400 });
    }
    const extension = allowedTypes.get(photo.type);
    if (!extension) return Response.json({ error: "Please use a JPG, PNG or WebP photo." }, { status: 400 });
    if (photo.size > MAX_PHOTO_BYTES) return Response.json({ error: "The photo must be smaller than 4 MB." }, { status: 400 });

    const photoKey = `testimonials/${crypto.randomUUID()}.${extension}`;
    const { env } = await import("cloudflare:workers");
    await env.BUCKET.put(photoKey, photo.stream(), {
      httpMetadata: { contentType: photo.type, cacheControl: "public, max-age=31536000, immutable" },
      customMetadata: { purpose: "testimonial-photo-admin" },
    });
    await db.update(testimonials).set({ photoKey }).where(eq(testimonials.id, id));
    return Response.json({ ok: true, photoKey });
  }

  const body = (await request.json().catch(() => null)) as { status?: string } | null;
  const status = body?.status ?? "";
  if (!statuses.has(status)) {
    return Response.json({ error: "Invalid review update." }, { status: 400 });
  }

  await db
    .update(testimonials)
    .set({
      status: status as "pending" | "published" | "rejected",
      publishedAt: status === "published" ? sql`CURRENT_TIMESTAMP` : null,
    })
    .where(eq(testimonials.id, id));
  return Response.json({ ok: true });
}
