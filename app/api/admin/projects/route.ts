import { projects } from "../../../../db/schema";
import { requireAdminApi } from "../../../../lib/admin-auth";
import {
  boolField,
  listField,
  numberField,
  slugify,
  storeImage,
  storeImages,
  textField,
} from "../../../../lib/media-upload";

export async function POST(request: Request) {
  if (!(await requireAdminApi())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const title = textField(form, "title", 140);
    const slug = slugify(textField(form, "slug", 120) || title);
    const category = textField(form, "category", 80);
    const summary = textField(form, "summary", 500);
    const uploadedImage = await storeImage(form.get("image"), "projects");
    const uploadedGallery = await storeImages(form.getAll("galleryFiles"), "projects");
    const image = uploadedImage || textField(form, "imagePath", 500) || uploadedGallery[0] || "";

    if (!title || !slug || !category || !summary || !image) {
      return Response.json(
        { error: "Title, category, summary and a cover image are required." },
        { status: 400 },
      );
    }

    const gallery = [...uploadedGallery, ...listField(form, "gallery")];
    if (!gallery.includes(image)) gallery.unshift(image);
    const uniqueGallery = gallery.filter((item, index) => gallery.indexOf(item) === index).slice(0, 24);
    const { getDb } = await import("../../../../db");
    await getDb().insert(projects).values({
      slug,
      title,
      category,
      summary,
      description: textField(form, "description", 4000),
      image,
      gallery: JSON.stringify(uniqueGallery),
      year: textField(form, "year", 30),
      location: textField(form, "location", 120),
      services: JSON.stringify(listField(form, "services")),
      featured: boolField(form, "featured"),
      published: boolField(form, "published"),
      sortOrder: numberField(form, "sortOrder"),
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save this project.";
    const friendly = message.toLowerCase().includes("unique")
      ? "That project URL is already in use. Choose a different slug."
      : message;
    return Response.json({ error: friendly }, { status: 400 });
  }
}
