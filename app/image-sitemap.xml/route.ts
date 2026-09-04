import { SERVICE_VISUALS } from "../../lib/service-visuals";
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

  const pageImages: Array<[string, string[]]> = [
    ["/", ["/media/hero-day.webp", "/media/hero-night.webp", "/media/projects/bowl-stroke.webp", "/media/projects/music-campus.webp"]],

    ["/home-design-services", ["/img/resext01.webp", "/img/homeint01.webp", "/img/permit01.webp", "/img/resid01.webp"]],
    ["/custom-house-design", ["/img/resext01.webp", "/img/resext03.webp", "/img/resid01.webp", "/media/generated-architecture/artimist-architecture-035.webp", "/media/generated-architecture/artimist-architecture-019.webp", "/media/generated-architecture/artimist-architecture-063.webp"]],
    ["/3d-interior-design-service", ["/img/homeint01.webp", "/img/homeint03.webp", "/img/drive-09.webp", "/media/generated-architecture/artimist-architecture-015.webp", "/media/generated-architecture/artimist-architecture-050.webp", "/media/generated-architecture/artimist-architecture-089.webp"]],
    ["/plan-modification-service", ["/img/cad03.webp", "/img/resid02.webp", "/img/homeint01.webp", "/img/cad01.webp", "/img/max04.webp", "/media/generated-architecture/artimist-architecture-053.webp", "/media/generated-architecture/artimist-architecture-087.webp"]],
    ["/residential-renovation-permit-drawings", ["/img/cad03.webp", "/media/generated-architecture/artimist-architecture-012.webp", "/media/generated-architecture/artimist-architecture-088.webp", "/media/generated-architecture/artimist-architecture-021.webp", "/img/rhino02.webp", "/img/services/plan-renovation-premium-2026.jpg"]],

    ["/architecture", ["/media/atlas/atlas-11.webp", "/img/rvpark.webp", "/img/permit01.webp", "/media/atlas/atlas-16.webp", "/media/generated-architecture/artimist-architecture-035.webp", "/media/generated-architecture/artimist-architecture-155.webp", "/media/generated-architecture/artimist-architecture-165.webp"]],
    ["/bim-drafting", ["/media/atlas/atlas-08.webp", "/media/technical/board-16.webp", "/media/technical/board-19.webp", "/img/permit01.webp", "/media/generated-architecture/artimist-architecture-043.webp", "/media/generated-architecture/artimist-architecture-054.webp", "/media/generated-architecture/artimist-architecture-088.webp"]],
    ["/architectural-drafting-services", ["/media/technical/board-16.webp", "/media/technical/board-19.webp", "/img/permit01.webp", "/media/generated-architecture/artimist-architecture-012.webp"]],
    ["/revit-drafting-services", ["/media/atlas/atlas-13.webp", "/media/technical/board-16.webp", "/media/technical/board-19.webp", "/media/generated-architecture/artimist-architecture-043.webp"]],
    ["/bim-modeling-services", ["/media/atlas/atlas-14.webp", "/media/generated-architecture/artimist-architecture-054.webp", "/media/generated-architecture/artimist-architecture-088.webp", "/media/technical/board-16.webp"]],
    ["/permit-drawing-services", ["/img/permit01.webp", "/img/permit04.webp", "/media/projects/permit-sets.webp", "/media/generated-architecture/artimist-architecture-012.webp", "/media/generated-architecture/artimist-architecture-022.webp"]],
    ["/construction-documentation-services", ["/media/technical/board-19.webp", "/media/technical/board-16.webp", "/img/permit04.webp", "/media/generated-architecture/artimist-architecture-022.webp"]],

    ["/visualization", ["/media/atlas/atlas-07.webp", "/img/resext03.webp", "/img/homeint03.webp", "/media/atlas/atlas-06.webp", "/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-149.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/services/architectural-rendering", ["/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-136.webp", "/media/generated-architecture/artimist-architecture-137.webp", "/media/generated-architecture/artimist-architecture-155.webp"]],
    ["/services/3d-interior-rendering", ["/media/generated-architecture/artimist-architecture-149.webp", "/media/generated-architecture/artimist-architecture-156.webp", "/media/generated-architecture/artimist-architecture-153.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/services/real-estate-rendering", ["/media/generated-architecture/artimist-architecture-136.webp", "/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-152.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/services/architectural-animation", ["/media/atlas/atlas-06.webp", "/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-159.webp"]],
    ["/residential", residentialChapters.flatMap((chapter) => chapter.scenes.map((scene) => scene.src))],
    ["/unreal-engine", ["/media/atlas/atlas-34.webp", "/media/generated-architecture/artimist-architecture-151.webp", "/media/generated-architecture/artimist-architecture-159.webp", "/media/generated-architecture/artimist-architecture-165.webp"]],

    ["/usa", ["/img/rvpark.webp", "/media/projects/permit-sets.webp", "/img/resext01.webp"]],
    ["/canada", ["/img/resid01.webp", "/img/permit01.webp", "/img/homeint03.webp"]],
    ["/uk", ["/media/projects/bowl-stroke.webp", "/img/permit04.webp", "/img/resext03.webp"]],
    ["/sweden", ["/media/projects/music-campus.webp", "/img/drive-09.webp", "/media/projects/unesco.webp"]],

    ["/case-studies/bowl-stroke", ["/media/projects/bowl-stroke.webp", "/media/generated-architecture/artimist-architecture-014.webp", "/media/generated-architecture/artimist-architecture-016.webp", "/media/generated-architecture/artimist-architecture-074.webp"]],
    ["/case-studies/us-permit-documentation", ["/media/projects/permit-sets.webp", "/media/generated-architecture/artimist-architecture-012.webp", "/media/generated-architecture/artimist-architecture-003.webp", "/media/generated-architecture/artimist-architecture-022.webp"]],
    ["/case-studies/permit-application-packages", ["/media/projects/permit-sets.webp", "/media/generated-architecture/artimist-architecture-012.webp", "/media/generated-architecture/artimist-architecture-003.webp", "/media/generated-architecture/artimist-architecture-022.webp"]],
    ["/case-studies/home-interior-design", ["/img/homeint01.webp", "/media/generated-architecture/artimist-architecture-015.webp", "/media/generated-architecture/artimist-architecture-050.webp", "/media/generated-architecture/artimist-architecture-089.webp"]],
    ["/case-studies/residential-visualization", ["/media/generated-architecture/artimist-architecture-015.webp", "/media/generated-architecture/artimist-architecture-050.webp", "/media/generated-architecture/artimist-architecture-089.webp"]],
    ["/case-studies/residential-exterior-design", ["/img/resext01.webp", "/media/generated-architecture/artimist-architecture-035.webp", "/media/generated-architecture/artimist-architecture-019.webp", "/media/generated-architecture/artimist-architecture-063.webp"]],
    ["/case-studies/harmonic-horizons", ["/media/projects/music-campus.webp", "/media/generated-architecture/artimist-architecture-055.webp", "/media/generated-architecture/artimist-architecture-010.webp", "/media/editorial/sound-to-form.webp"]],
    ["/case-studies/connected-learning-auditorium", ["/media/generated-architecture/artimist-architecture-055.webp", "/media/generated-architecture/artimist-architecture-010.webp", "/media/editorial/sound-to-form.webp"]],
    ["/case-studies/parametric-canopy-studies", ["/media/generated-architecture/artimist-architecture-083.webp", "/media/editorial/kinetic-roof-technical.webp", "/media/generated-architecture/artimist-architecture-054.webp"]],
    ["/case-studies/rv-park-design", ["/img/rvpark.webp", "/media/generated-architecture/artimist-architecture-056.webp", "/media/generated-architecture/artimist-architecture-057.webp", "/media/generated-architecture/artimist-architecture-091.webp"]],

    ["/proof", ["/media/projects/permit-sets.webp", "/media/projects/bowl-stroke.webp", "/img/homeint03.webp", "/img/resext03.webp"]],
    ["/visual-archive", archiveImages],
  ];

  // Keep service-image indexing aligned with the exact on-page curation.
  const curated = Object.entries(SERVICE_VISUALS).map(([slug, plan]): [string, string[]] => [`/${slug}`, [plan.hero.src, ...plan.evidence.map(image => image.src), ...plan.process.map(image => image.src)]]);
  const curatedPaths = new Set(curated.map(([path]) => path));
  const indexedPages = [...pageImages.filter(([path]) => !curatedPaths.has(path)), ...curated];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${indexedPages.map(([path, images]) => urlEntry(path, images)).join("")}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
