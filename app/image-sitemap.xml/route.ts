import { GENERATED_ARCHITECTURE_IMAGES } from "../../lib/generated-architecture";
import { atlasChapters, residentialChapters, technicalBoards } from "../../lib/visual-content";

const BASE = "https://www.artimistproductions.com";

function absolute(path: string) {
  return `${BASE}${path}`;
}

export function GET() {
  const visualArchiveImages = [
    ...GENERATED_ARCHITECTURE_IMAGES.map((image) => image.src),
    ...residentialChapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.src)),
    ...atlasChapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.src)),
    ...technicalBoards.map((board) => board.src),
    "/media/hero-day.webp",
    "/media/hero-night.webp",
  ];

  const uniqueImages = Array.from(new Set(visualArchiveImages));
  const images = uniqueImages.map((src) => `<image:image><image:loc>${absolute(src)}</image:loc></image:image>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>${BASE}/visual-archive</loc>${images}</url></urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
