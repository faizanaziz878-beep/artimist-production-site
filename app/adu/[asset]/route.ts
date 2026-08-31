import { aduAssets } from "../adu-assets.generated";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ asset: string }> },
) {
  const { asset } = await context.params;
  const encoded = aduAssets[asset];

  if (!encoded) {
    return new Response("Not found", { status: 404 });
  }

  const bytes = Buffer.from(encoded, "base64");

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(bytes.byteLength),
      "X-Content-Type-Options": "nosniff",
    },
  });
}
