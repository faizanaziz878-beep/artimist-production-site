import { GENERATED_ARCHITECTURE_IMAGES } from "../../lib/generated-architecture";
import { atlasChapters, residentialChapters, technicalBoards } from "../../lib/visual-content";

const BASE = "https://www.artimistproductions.com";

function absolute(path: string) {
  return `${BASE}${path}`;
}

function urlEntry(path: string, images: string[]) {
  const uniqueImages = Array.from(new Set(images));
  const imageXml = uniqueImages.map((src) => `<image:image><image:loc>${absolute(src)}</image:loc></image:image>`).join("");
  return `<url><loc>${absolute(path)}</loc>${imageXml}</url>`;
}

export function GET() {
  const archiveImages = [
    ...GENERATED_ARCHITECTURE_IMAGES.map((image) => image.src),
    ...residentialChapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.src)),
    ...atlasChapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.src)),
    ...technicalBoards.map((board) => board.src),
    "/media/hero-day.webp",
    "/media/hero-night.webp",
  ];

  // Associate representative imagery with the existing pages where users actually search for it.
  // This gives image search engines page-level context instead of treating the archive as the only source.
  const pageImages: Array<[string, string[]]> = [
    ["/", ["/media/hero-day.webp", "/media/hero-night.webp", "/media/projects/bowl-stroke.webp", "/media/projects/music-campus.webp"]],
    ["/custom-house-design", ["/media/generated-architecture/artimist-architecture-035.webp", "/media/generated-architecture/artimist-architecture-019.webp", "/media/generated-architecture/artimist-architecture-063.webp"]],
    ["/3d-interior-design-service", ["/media/generated-architecture/artimist-architecture-015.webp", "/media/generated-architecture/artimist-architecture-050.webp", "/media/generated-architecture/artimist-architecture-089.webp"]],
    ["/plan-modification-service", ["/media/generated-architecture/artimist-architecture-053.webp", "/media/generated-architecture/artimist-architecture-029.webp", "/media/generated-architecture/artimist-architecture-043.webp"]],
    ["/architecture", ["/media/generated-architecture/artimist-architecture-035.webp", "/media/generated-architecture/artimist-architecture-155.webp", "/media/generated-architecture/artimist-architecture-165.webp"]],
    ["/bim-drafting", ["/media/generated-architecture/artimist-architecture-043.webp", "/media/generated-architecture/artimist-architecture-054.webp", "/media/generated-architecture/artimist-architecture-088.webp"]],
    ["/visualization", ["/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-149.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/services/architectural-rendering", ["/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-136.webp", "/media/generated-architecture/artimist-architecture-137.webp", "/media/generated-architecture/artimist-architecture-155.webp"]],
    ["/services/3d-interior-rendering", ["/media/generated-architecture/artimist-architecture-149.webp", "/media/generated-architecture/artimist-architecture-156.webp", "/media/generated-architecture/artimist-architecture-153.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/services/real-estate-rendering", ["/media/generated-architecture/artimist-architecture-136.webp", "/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-152.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/residential", residentialChapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.src))],
    ["/unreal-engine", ["/media/atlas/atlas-34.webp", "/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-159.webp", "/media/generated-architecture/artimist-architecture-165.webp"]],
    ["/case-studies/bowl-stroke", ["/media/projects/bowl-stroke.webp", "/media/generated-architecture/artimist-architecture-014.webp", "/media/generated-architecture/artimist-architecture-016.webp", "/media/generated-architecture/artimist-architecture-074.webp"]],
    ["/case-studies/us-permit-documentation", ["/media/projects/permit-sets.webp", "/media/generated-architecture/artimist-architecture-012.webp", "/media/generated-architecture/artimist-architecture-003.webp", "/media/generated-architecture/artimist-architecture-022.webp"]],
    ["/case-studies/home-interior-design", ["/img/homeint01.webp", "/media/generated-architecture/artimist-architecture-015.webp", "/media/generated-architecture/artimist-architecture-050.webp", "/media/generated-architecture/artimist-architecture-089.webp"]],
    ["/case-studies/residential-exterior-design", ["/img/resext01.webp", "/media/generated-architecture/artimist-architecture-035.webp", "/media/generated-architecture/artimist-architecture-019.webp", "/media/generated-architecture/artimist-architecture-063.webp"]],
    ["/case-studies/harmonic-horizons", ["/media/projects/music-campus.webp", "/media/generated-architecture/artimist-architecture-055.webp", "/media/generated-architecture/artimist-architecture-010.webp", "/media/editorial/sound-to-form.webp"]],
    ["/visual-archive", archiveImages],
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${pageImages.map(([path, images]) => urlEntry(path, images)).join("")}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
