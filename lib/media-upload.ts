const MAX_MEDIA_BYTES = 8 * 1024 * 1024;
const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function storeImage(file: FormDataEntryValue | null, folder: "projects" | "team") {
  if (!(file instanceof File) || file.size === 0) return "";
  const extension = allowedImageTypes.get(file.type);
  if (!extension) throw new Error("Please upload a JPG, PNG or WebP image.");
  if (file.size > MAX_MEDIA_BYTES) throw new Error("Images must be smaller than 8 MB.");

  const key = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { env } = await import("cloudflare:workers");
  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type,
      cacheControl: "public, max-age=31536000, immutable",
    },
    customMetadata: { purpose: `${folder}-image` },
  });
  return `/api/media/${key}`;
}

export async function storeImages(files: FormDataEntryValue[], folder: "projects" | "team", limit = 16) {
  const uploaded: string[] = [];
  for (const entry of files.slice(0, limit)) {
    const path = await storeImage(entry, folder);
    if (path) uploaded.push(path);
  }
  return uploaded;
}

export function textField(form: FormData, key: string, max = 2000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function boolField(form: FormData, key: string) {
  return form.get(key) === "true" || form.get(key) === "on";
}

export function numberField(form: FormData, key: string, fallback = 0) {
  const value = Number(textField(form, key, 20));
  return Number.isFinite(value) ? Math.trunc(value) : fallback;
}

export function listField(form: FormData, key: string) {
  return textField(form, key, 4000)
    .split(/[,\n]/)
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 24);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}
