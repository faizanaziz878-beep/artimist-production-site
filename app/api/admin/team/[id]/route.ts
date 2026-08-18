import { eq, sql } from "drizzle-orm";
import { teamMembers } from "../../../../../db/schema";
import { requireAdminApi } from "../../../../../lib/admin-auth";
import {
  boolField,
  numberField,
  storeImage,
  textField,
} from "../../../../../lib/media-upload";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdminApi())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = Number((await context.params).id);
    if (!Number.isInteger(id) || id < 1) {
      return Response.json({ error: "Invalid team member." }, { status: 400 });
    }
    const form = await request.formData();
    const name = textField(form, "name", 120);
    const role = textField(form, "role", 140);
    const image = (await storeImage(form.get("image"), "team")) || textField(form, "imagePath", 500);
    if (!name || !role) {
      return Response.json({ error: "Name and role are required." }, { status: 400 });
    }

    const { getDb } = await import("../../../../../db");
    await getDb()
      .update(teamMembers)
      .set({
        name,
        role,
        bio: textField(form, "bio", 1800),
        image,
        linkedin: textField(form, "linkedin", 500),
        published: boolField(form, "published"),
        sortOrder: numberField(form, "sortOrder"),
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(teamMembers.id, id));
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to update this team member." },
      { status: 400 },
    );
  }
}
