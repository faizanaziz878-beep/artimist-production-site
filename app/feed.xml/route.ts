const BASE = "https://www.artimistproductions.com";

const ITEMS = [
  ["How Much Do Custom House Plans Cost?", "how-much-do-custom-house-plans-cost", "A practical guide to custom house plan pricing, drawing scope, revisions and visualization costs."],
  ["Permit Drawings vs Construction Drawings", "permit-drawings-vs-construction-drawings", "The difference between permit and construction drawings, their purpose, detail and local approval requirements."],
  ["How to Modify an Existing Floor Plan", "how-to-modify-an-existing-floor-plan", "A practical process for improving an existing house floor plan while checking circulation, structure, dimensions and 3D impact."],
  ["Revit Drafting vs CAD Drafting", "revit-drafting-vs-cad-drafting", "When Revit BIM production or 2D CAD drafting is the more appropriate architectural workflow."],
  ["What Is Scan-to-BIM?", "what-is-scan-to-bim", "How laser scans and point clouds are converted into structured Revit or BIM models."],
  ["LOD 200 vs LOD 300 vs LOD 400", "lod-200-vs-lod-300-vs-lod-400", "A plain-language guide to BIM levels of development and why model purpose matters."],
  ["How Much Does Architectural Rendering Cost?", "how-much-does-architectural-rendering-cost", "The main factors behind architectural rendering prices, including modeling, complexity, revisions and resolution."],
  ["3D Rendering vs Unreal Engine Walkthrough", "3d-rendering-vs-unreal-engine-walkthrough", "When still rendering, animation or real-time Unreal Engine visualization is the right presentation format."],
  ["Do House Plans Need an Architect's Stamp?", "do-house-plans-need-an-architect-stamp", "Why U.S. residential stamping requirements vary and what to confirm with the local permitting authority."],
  ["What Drawings Are Needed for a Home Addition Permit?", "what-drawings-are-needed-for-a-home-addition-permit", "A practical overview of common home-addition permit drawings and local professional requirements."],
  ["How to Turn a Hand Sketch Into Floor Plans", "how-to-turn-a-hand-sketch-into-floor-plans", "The dimensions, photographs and project notes that help turn a rough sketch into a useful architectural plan."],
  ["What to Send for a 3D Home Rendering", "what-to-send-for-a-3d-home-rendering", "A brief checklist covering drawings, materials, references, camera views, milestones and handover."],
] as const;

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[char] || char));
}

export function GET() {
  const items = ITEMS.map(([title, slug, description]) => {
    const url = `${BASE}/insights/${slug}`;
    return `<item><title>${escapeXml(title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(description)}</description></item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Artimist Productions Insights</title><link>${BASE}/insights</link><description>Practical architecture, residential design, BIM, Revit, drafting and architectural visualization guidance from Artimist Productions.</description><language>en</language><atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />${items}</channel></rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
