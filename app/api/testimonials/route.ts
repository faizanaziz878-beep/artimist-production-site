import { testimonials } from "../../../db/schema";
import { sendNotification } from "../../../lib/notify";
import { getPublicContent } from "../../../lib/data";

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

export async function GET() {
  try {
    const { testimonials: published } = await getPublicContent();
    return Response.json({
      testimonials: published.slice(0, 6).map(({ id, clientName, role, company, rating, quote, photoKey }) => ({
        id,
        clientName,
        role,
        company,
        rating,
        quote,
        photoKey,
      })),
    }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
    });
  } catch {
    return Response.json({ testimonials: [] });
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const clientName = field(form, "clientName", 80);
    const role = field(form, "role", 100);
    const company = field(form, "company", 100);
    const quote = field(form, "quote", 1200);
    const rating = Math.min(5, Math.max(1, Number(field(form, "rating", 3)) || 5));
    const permission = field(form, "permission", 8) === "yes";

    if (!clientName || quote.length < 20) {
      return Response.json({ error: "Please add your name and a little more detail about the experience." }, { status: 400 });
    }
    if (!permission) {
      return Response.json({ error: "Please confirm that this is your own feedback and that Artimist may publish it." }, { status: 400 });
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
      const emailed = await sendNotification(`New testimonial — ${clientName}`, {
        Name: clientName,
        Role: role,
        Company: company,
        Rating: String(rating),
        Review: quote,
        "Publication permission": "Confirmed by submitter",
      });
      if (emailed) return Response.json({ ok: true }, { status: 201 });
      throw new Error("no delivery channel");
    }
  } catch {
    return Response.json({ error: "The studio inbox is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }
}
