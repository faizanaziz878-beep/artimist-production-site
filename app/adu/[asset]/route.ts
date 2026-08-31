export const runtime = "nodejs";

const SOURCE_BASE =
  "https://raw.githubusercontent.com/faizanaziz878-beep/artimist-production-site/main/public/adu";

const assetSources: Record<string, string> = {
  "adu-hero.svg": "adu-hero.b64",
  "adu-floor-plan.svg": "adu-floor-plan.b64",
  "adu-elevations.svg": "adu-elevations.b64",
  "adu-sections.svg": "adu-sections.b64",
  "adu-living.svg": "adu-living.b64",
  "adu-garage-plan.svg": "adu-garage-plan.b64",
  "adu-exterior.svg": "adu-hero.b64",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ asset: string }> },
) {
  const { asset } = await context.params;
  const source = assetSources[asset];

  if (!source) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const sourceResponse = await fetch(`${SOURCE_BASE}/${source}`, {
      cache: "force-cache",
      next: { revalidate: 31536000 },
    });

    if (!sourceResponse.ok) {
      return new Response("Image source unavailable", { status: 502 });
    }

    const encoded = (await sourceResponse.text()).trim();
    const bytes = Buffer.from(encoded, "base64");

    if (!bytes.length) {
      return new Response("Invalid image source", { status: 502 });
    }

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, s-maxage=31536000, max-age=86400, stale-while-revalidate=604800",
        "Content-Length": String(bytes.byteLength),
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Image source unavailable", { status: 502 });
  }
}
