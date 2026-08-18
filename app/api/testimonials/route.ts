import { testimonials } from "../../../db/schema";
import { sendNotification } from "../../../lib/notify";

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function field(form: FormData, key: string, max: number) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const clientName = field(form, "clientName", 80);
    const role = field(form, "role", 100);
    const company = field(form, "company", 100);
    const quote = field(form, "quote", 1200);
    const rating = Math.min(5, Math.max(3, Number(field(form, "rating", 3)) || 5));

    if (!clientName || quote.length < 20) {
      return Response.json({ error: "Please add your name and a little more detail about the experience." }, { status: 400 });
    }

    let photoKey = "";
    const photo = form.get("photo");
    if (photo instanceof File && photo.size > 0) {
      const extension = allowedTypes.get(photo.type);
      if (!extension) return Response.json({ error: "Please use a JPG, PNG or WebP photo." }, { status: 400 });
      if (photo.size > MAX_PHOTO_BYTES) return Response.json({ error: "The photo must be smaller than 4 MB." }, { status: 400 });

      const { env } = await import("cloudflare:workers");
      if (env?.BUCKET) {
        photoKey = `testimonials/${crypto.randomUUID()}.${extension}`;
        await env.BUCKET.put(photoKey, photo.stream(), {
          httpMetadata: { contentType: photo.type, cacheControl: "public, max-age=31536000, immutable" },
          customMetadata: { purpose: "testimonial-photo" },
        });
      }
    }

    try {
      const { getDb } = await import("../../../db");
      const db = getDb();
      await db.insert(testimonials).values({ clientName, role, company, quote, rating, photoKey, status: "pending" });
      return Response.json({ ok: true }, { status: 201 });
    } catch {
      // No database binding on this host — forward the review by email so it
      // still reaches the studio for manual publishing.
      const emailed = await sendNotification(`New testimonial — ${clientName}`, {
        Name: clientName,
        Role: role,
        Company: company,
        Rating: String(rating),
        Review: quote,
      });
      if (emailed) return Response.json({ ok: true }, { status: 201 });
      throw new Error("no delivery channel");
    }
  } catch {
    return Response.json({ error: "The studio inbox is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }
}
