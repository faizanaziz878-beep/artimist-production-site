const BASE = "https://www.artimistproductions.com";
const INDEXNOW_KEY = "35ad61d466734bb4a9a9031a6c045413";

const PATHS = [
  "/", "/home-design-services", "/custom-house-design", "/plan-modification-service", "/3d-interior-design-service", "/residential-renovation-permit-drawings",
  "/international", "/usa", "/canada", "/uk", "/sweden",
  "/architecture", "/bim-drafting", "/visualization", "/architectural-drafting-services", "/revit-drafting-services", "/bim-modeling-services", "/permit-drawing-services", "/construction-documentation-services", "/services", "/services/architectural-rendering", "/services/3d-interior-rendering", "/services/real-estate-rendering", "/services/architectural-animation", "/residential", "/unreal-engine",
  "/case-studies", "/case-studies/rv-park-design", "/case-studies/permit-application-packages", "/case-studies/home-interior-design", "/case-studies/residential-exterior-design", "/case-studies/bowl-stroke", "/case-studies/harmonic-horizons", "/case-studies/us-permit-documentation", "/case-studies/residential-visualization", "/case-studies/parametric-canopy-studies", "/case-studies/connected-learning-auditorium",
  "/insights", "/insights/how-much-do-custom-house-plans-cost", "/insights/permit-drawings-vs-construction-drawings", "/insights/how-to-modify-an-existing-floor-plan", "/insights/revit-drafting-vs-cad-drafting", "/insights/what-is-scan-to-bim", "/insights/lod-200-vs-lod-300-vs-lod-400", "/insights/how-much-does-architectural-rendering-cost", "/insights/3d-rendering-vs-unreal-engine-walkthrough",
  "/proof", "/visual-archive", "/process", "/partners", "/partners/decoding-bits", "/partners/scallance", "/about", "/team", "/founder-message", "/contact"
] as const;

export async function GET() {
  if (process.env.VERCEL_ENV !== "production") {
    return Response.json({ ok: false, reason: "production-only" }, { status: 403 });
  }

  const payload = {
    host: "www.artimistproductions.com",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
    urlList: PATHS.map((path) => `${BASE}${path}`),
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  return Response.json({ ok: response.ok, status: response.status, submitted: payload.urlList.length, body }, { status: response.ok ? 200 : 502 });
}
