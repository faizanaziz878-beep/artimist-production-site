import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TITLE = "Home Design, House Plans, Interiors & 3D Visualization | Artimist";
const DESCRIPTION = "Artimist Productions helps homeowners and professional teams worldwide with custom house plans, floor plan changes, interior design, renovation drawings, BIM/Revit and photoreal 3D visualization.";
const GOOGLE_VERIFICATION = "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.artimistproductions.com/#organization",
  name: "Artimist Productions",
  url: "https://www.artimistproductions.com",
  email: "Faizan@artimistproductions.com",
  description: "International multidisciplinary design and creative production studio helping homeowners, architects, developers and brands with house design, interiors, floor plan modifications, residential drafting, BIM, architectural visualization, animation and real-time experiences.",
  areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"],
  knowsAbout: ["Custom house plans", "Floor plan design", "House plan modification", "Interior design", "Home renovation drawings", "Residential drafting", "BIM", "Revit", "Architectural visualization", "3D rendering", "Architectural animation", "Unreal Engine visualization"],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.artimistproductions.com/#website",
  url: "https://www.artimistproductions.com",
  name: "Artimist Productions",
  publisher: { "@id": "https://www.artimistproductions.com/#organization" },
  inLanguage: "en",
};

const seoStyle = `<style id="artimist-seo-authority-style">
.st-seo-authority{background:#090909;color:#f1ede8;padding:96px max(24px,6vw);border-top:1px solid rgba(255,255,255,.12)}
.st-seo-authority__inner{max-width:1600px;margin:0 auto}.st-seo-authority__eyebrow{margin:0 0 18px;font:600 10px/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#d96476}.st-seo-authority h2{max-width:1050px;margin:0 0 22px;font:400 clamp(42px,5.4vw,86px)/.98 Georgia,serif;letter-spacing:-.045em}.st-seo-authority__lead{max-width:760px;margin:0 0 42px;color:rgba(255,255,255,.62);font:400 17px/1.65 Georgia,serif}.st-seo-authority__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.st-seo-authority__grid a{position:relative;display:block;min-height:310px;overflow:hidden;border:1px solid rgba(255,255,255,.13);text-decoration:none;color:#fff;background:#111}.st-seo-authority__grid img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s}.st-seo-authority__grid a:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(5,5,5,.94),rgba(5,5,5,.28) 64%,transparent)}.st-seo-authority__grid a:hover img{transform:scale(1.035)}.st-seo-authority__copy{position:absolute;z-index:2;left:20px;right:20px;bottom:20px}.st-seo-authority__copy small{display:block;color:#d96476;font:600 9px/1 Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase;margin-bottom:8px}.st-seo-authority__copy strong{display:block;font:400 24px/1.15 Georgia,serif}.st-seo-authority__foot{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}.st-seo-authority__foot a{border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:10px 15px;text-decoration:none;color:rgba(255,255,255,.75);font:500 10px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}@media(max-width:900px){.st-seo-authority{padding:72px 24px 110px}.st-seo-authority__grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.st-seo-authority__grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-24px;padding-right:24px;scrollbar-width:none}.st-seo-authority__grid::-webkit-scrollbar{display:none}.st-seo-authority__grid a{flex:0 0 82vw;min-height:112vw;scroll-snap-align:center}}
</style>`;

const seoSection = `<section class="st-seo-authority" aria-labelledby="global-services-title"><div class="st-seo-authority__inner"><p class="st-seo-authority__eyebrow">START WITH WHAT YOU NEED</p><h2 id="global-services-title">Design it, change it, draw it or see it before you build.</h2><p class="st-seo-authority__lead">You do not need to know the professional name of the service. Artimist helps homeowners and project teams turn sketches, plans and ideas into clear designs, usable drawings and believable 3D visuals.</p><div class="st-seo-authority__grid">
<a href="/custom-house-design"><img src="/graphics/custom-house-floor-plan-design.svg" alt="Custom house plans and floor plan design" loading="lazy"><span class="st-seo-authority__copy"><small>01 / HOUSE DESIGN</small><strong>Design my house</strong></span></a>
<a href="/3d-interior-design-service"><img src="/graphics/3d-interior-design-visualization.svg" alt="3D interior design and home visualization" loading="lazy"><span class="st-seo-authority__copy"><small>02 / INTERIORS</small><strong>Design my interior</strong></span></a>
<a href="/plan-modification-service"><img src="/graphics/house-plan-modification-before-after.svg" alt="Before and after floor plan modification" loading="lazy"><span class="st-seo-authority__copy"><small>03 / PLAN CHANGES</small><strong>Change my floor plan</strong></span></a>
<a href="/residential-renovation-permit-drawings"><img src="/graphics/residential-renovation-permit-drawings.svg" alt="Residential renovation and permit drawings" loading="lazy"><span class="st-seo-authority__copy"><small>04 / RENOVATION</small><strong>Plan my renovation</strong></span></a>
<a href="/visualization"><img src="/img/resid01.webp" alt="Photoreal residential architectural visualization" loading="lazy"><span class="st-seo-authority__copy"><small>05 / 3D</small><strong>Show me the design</strong></span></a>
<a href="/bim-drafting"><img src="/img/permit01.webp" alt="BIM Revit and architectural drawing production" loading="lazy"><span class="st-seo-authority__copy"><small>06 / PROFESSIONAL</small><strong>BIM, Revit & drafting</strong></span></a>
</div><div class="st-seo-authority__foot"><a href="/home-design-services">All home design help</a><a href="/case-studies">Real case studies</a><a href="/international">International delivery</a><a href="/architectural-visualization-services">3D rendering studio</a></div></div></section>`;

const webpageSchema = `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.artimistproductions.com/#home",
  url: "https://www.artimistproductions.com/",
  name: TITLE,
  description: DESCRIPTION,
  about: ["Custom house plans", "Floor plan design", "House plan modification", "Interior design", "Home renovation drawings", "BIM", "Revit drafting", "Architectural visualization", "3D rendering", "Unreal Engine"],
  audience: ["Homeowners", "Architects", "Developers", "Builders", "Brands"],
  spatialCoverage: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"],
  isPartOf: { "@id": "https://www.artimistproductions.com/#website" },
})}</script>`;

function enhance(source: string) {
  let html = source;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${TITLE}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${DESCRIPTION}">`);
  html = html.replace(/<meta property="og:site_name" content="[^"]*">/i, `<meta property="og:site_name" content="Artimist Productions">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${TITLE}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${DESCRIPTION}">`);
  html = html.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"Organization"[\s\S]*?<\/script>/i, `<script type="application/ld+json">${JSON.stringify(organization)}</script>`);
  html = html.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"WebSite"[\s\S]*?<\/script>/i, `<script type="application/ld+json">${JSON.stringify(website)}</script>`);
  html = html.replace('<span>YVR</span><span>OH</span><span>STO</span><span>LHE</span>\n      <p>04 OFFICES / WORKING WORLDWIDE</p>', '<span>WORLDWIDE</span><span>USA</span><span>UK</span><span>CANADA</span><span>SWEDEN</span>\n      <p>INTERNATIONAL PROJECT DELIVERY</p>');
  html = html.replace('VANCOUVER &middot; OHIO &middot; STOCKHOLM &middot; LAHORE', 'WORLDWIDE &middot; USA &middot; UK &middot; CANADA &middot; SWEDEN');
  html = html.replace('<li>Vancouver</li><li>Ohio &middot; Stockholm</li>', '<li>Worldwide project delivery</li><li>USA &middot; UK &middot; Canada &middot; Sweden</li>');
  html = html.replace(/ARTIMIST PRODUCTION(?!S)/g, 'ARTIMIST PRODUCTIONS');
  html = html.replace(/<span aria-hidden="true">&#8599;<\/span>/g, '');
  html = html.replace(/ &#8599;/g, '');
  html = html.replace('</head>', `<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">${seoStyle}${webpageSchema}<script src="/mobile-cleanup.js"></script></head>`);
  html = html.replace('</main>', `${seoSection}</main>`);
  html = html.replace('</body>', `<script src="/lead-attribution.js"></script><script src="/whatsapp-conversations.js"></script><script src="/buyer-journey.js"></script><script src="/client-showcase.js"></script></body>`);
  return html;
}

export async function GET() {
  try {
    const source = await readFile(path.join(process.cwd(), "public", "studio.html"), "utf8");
    return new Response(enhance(source), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return new Response("Homepage unavailable", { status: 500 });
  }
}
