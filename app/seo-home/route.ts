import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TITLE = "Architecture, BIM, Interior Design & 3D Visualization Studio | Artimist";
const DESCRIPTION = "Artimist Productions is an international architecture, BIM, Revit, interior design and architectural visualization studio serving clients worldwide, with focus in the USA, UK, Canada and Sweden.";
const GOOGLE_VERIFICATION = "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM";

const seoStyle = `<style id="artimist-seo-authority-style">
.st-seo-authority{background:#090909;color:#f1ede8;padding:96px max(24px,6vw);border-top:1px solid rgba(255,255,255,.12)}
.st-seo-authority__inner{max-width:1600px;margin:0 auto}.st-seo-authority__eyebrow{margin:0 0 18px;font:600 10px/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#d96476}.st-seo-authority h2{max-width:1100px;margin:0 0 26px;font:400 clamp(42px,5.4vw,86px)/.98 Georgia,serif;letter-spacing:-.045em}.st-seo-authority>div>p{max-width:760px;color:rgba(255,255,255,.62);font:400 17px/1.65 Georgia,serif}.st-seo-authority__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:42px}.st-seo-authority__grid a{display:block;min-height:150px;padding:20px;border:1px solid rgba(255,255,255,.13);border-radius:12px;text-decoration:none;color:#fff;background:rgba(255,255,255,.025)}.st-seo-authority__grid small{display:block;color:#d96476;font:600 9px/1 Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase;margin-bottom:36px}.st-seo-authority__grid strong{display:block;font:400 22px/1.15 Georgia,serif}.st-seo-authority__foot{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}.st-seo-authority__foot a{border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:10px 15px;text-decoration:none;color:rgba(255,255,255,.75);font:500 10px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}@media(max-width:900px){.st-seo-authority{padding:72px 24px 110px}.st-seo-authority__grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.st-seo-authority__grid{grid-template-columns:1fr}.st-seo-authority__grid a{min-height:125px}}
</style>`;

const seoSection = `<section class="st-seo-authority" aria-labelledby="global-services-title"><div class="st-seo-authority__inner"><p class="st-seo-authority__eyebrow">INTERNATIONAL STUDIO / SEARCHABLE EXPERTISE</p><h2 id="global-services-title">Architecture, BIM and visualization—connected from idea to delivery.</h2><p>Artimist Productions works with homeowners, architects, developers, builders and brands worldwide. Explore focused services for residential design, interiors, technical production and visual communication, with active market focus in the United States, United Kingdom, Canada and Sweden.</p><div class="st-seo-authority__grid"><a href="/custom-house-design"><small>Residential / 01</small><strong>Custom House Design & Floor Plans</strong></a><a href="/3d-interior-design-service"><small>Interior / 02</small><strong>3D Interior Design & Home Visualization</strong></a><a href="/residential-renovation-permit-drawings"><small>Technical / 03</small><strong>Renovation & Permit Drawing Support</strong></a><a href="/bim-drafting"><small>BIM / 04</small><strong>Revit, CAD & BIM Production</strong></a><a href="/visualization"><small>CGI / 05</small><strong>Architectural Visualization & Rendering</strong></a><a href="/unreal-engine"><small>Real-time / 06</small><strong>Unreal Engine & Interactive Architecture</strong></a><a href="/case-studies"><small>Evidence / 07</small><strong>Architecture & Visualization Case Studies</strong></a><a href="/international"><small>Worldwide / 08</small><strong>International Project Delivery</strong></a></div><div class="st-seo-authority__foot"><a href="/architectural-drafting-services">Architectural drafting</a><a href="/revit-drafting-services">Revit drafting</a><a href="/bim-modeling-services">BIM modeling</a><a href="/permit-drawing-services">Permit drawings</a><a href="/architectural-visualization-services">3D rendering studio</a></div></div></section>`;

const webpageSchema = `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.artimistproductions.com/#home",
  url: "https://www.artimistproductions.com/",
  name: TITLE,
  description: DESCRIPTION,
  about: ["Architecture", "Interior Design", "BIM", "Revit Drafting", "CAD Drafting", "Architectural Visualization", "3D Rendering", "Architectural Animation", "Unreal Engine"],
  audience: ["Homeowners", "Architects", "Developers", "Builders", "Brands"],
  spatialCoverage: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"],
  isPartOf: { "@id": "https://www.artimistproductions.com/#website" },
})}</script>`;

const menuEnhancement = `<script id="artimist-home-index-enhancement">(function(){function add(){var list=document.getElementById('indexPages');if(!list||list.querySelector('[data-seo-extra]'))return;[['Case Studies','/case-studies'],['International','/international']].forEach(function(p){var a=document.createElement('a');a.href=p[1];a.setAttribute('data-seo-extra','1');a.innerHTML='<small>+</small><span>'+p[0]+'</span><i aria-hidden="true"><svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 15 15 5M7 5h8v8"/></svg></i>';list.appendChild(a);});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(add,50)});else setTimeout(add,50);})();</script>`;

function enhance(source: string) {
  let html = source;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${TITLE}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${DESCRIPTION}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${TITLE}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${DESCRIPTION}">`);
  html = html.replace(/\"areaServed\":\[\"United States\",\"Canada\",\"Sweden\",\"Pakistan\",\"Worldwide\"\]/g, '\"areaServed\":[\"Worldwide\",\"United States\",\"United Kingdom\",\"Canada\",\"Sweden\",\"Pakistan\"]');
  html = html.replace('04 OFFICES / WORKING WORLDWIDE', 'INTERNATIONAL STUDIO / WORKING WORLDWIDE');
  html = html.replace('</head>', `<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">${seoStyle}${webpageSchema}</head>`);
  html = html.replace('</main>', `${seoSection}</main>`);
  html = html.replace('</body>', `<script src="/lead-attribution.js"></script>${menuEnhancement}</body>`);
  return html;
}

export async function GET() {
  try {
    const source = await readFile(path.join(process.cwd(), "public", "studio.html"), "utf8");
    return new Response(enhance(source), {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Homepage unavailable", { status: 500 });
  }
}
