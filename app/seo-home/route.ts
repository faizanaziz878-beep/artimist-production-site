import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TITLE = "Artimist Productions — Architecture, BIM & 3D Visualization Studio";
const DESCRIPTION = "International architecture, design, BIM, 3D visualization and creative production studio serving homeowners, architects, developers and brands.";
const GOOGLE_VERIFICATION = "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM";
const GOOGLE_TAG_ID = "G-1PWWCTSMW4";
const googleTag = `<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}"></script><script id="google-tag-init">window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GOOGLE_TAG_ID}");</script>`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.artimistproductions.com/#organization",
  name: "Artimist Productions",
  alternateName: ["Artimist", "Artimist Production"],
  legalName: "Artimist Productions",
  url: "https://www.artimistproductions.com",
  email: "Faizan@artimistproductions.com",
  telephone: "+1-807-808-4181",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
  },
  sameAs: [
    "https://www.instagram.com/artimist.productions/",
    "https://www.linkedin.com/company/artimist-productions",
    "https://www.trustpilot.com/review/www.artimistproductions.com",
  ],
  description: "International multidisciplinary design and creative production studio helping homeowners, architects, developers and brands with house design, interiors, floor plan modifications, residential drafting, BIM, architectural visualization, animation and real-time experiences.",
  areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"],
  knowsAbout: ["Custom house plans", "Floor plan design", "House plan modification", "Interior design", "Home renovation drawings", "Residential drafting", "Construction documentation", "Architectural documentation", "Permit drawings", "BIM", "Revit", "Revit MEP drafting", "Architectural visualization", "3D rendering", "Architectural animation", "Unreal Engine visualization"],
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

const arrowUpRight = '<svg class="st-inline-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8"/></svg>';
const arrowRight = '<svg class="st-inline-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h14M12 5l5 5-5 5"/></svg>';
const arrowLeft = '<svg class="st-inline-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M17 10H3M8 5l-5 5 5 5"/></svg>';
const arrowDown = '<svg class="st-inline-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v14M5 12l5 5 5-5"/></svg>';

const seoStyle = `<style id="artimist-seo-authority-style">
.st-seo-authority{background:#090909;color:#f1ede8;padding:96px max(24px,6vw);border-top:1px solid rgba(255,255,255,.12)}
.st-seo-authority__inner{max-width:1600px;margin:0 auto}.st-seo-authority__eyebrow{margin:0 0 18px;font:600 10px/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#d96476}.st-seo-authority h2{max-width:1050px;margin:0 0 22px;font:400 clamp(42px,5.4vw,86px)/.98 Georgia,serif;letter-spacing:-.045em}.st-seo-authority__lead{max-width:760px;margin:0 0 42px;color:rgba(255,255,255,.62);font:400 17px/1.65 Georgia,serif}.st-seo-authority__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.st-seo-authority__grid a{position:relative;display:block;min-height:310px;overflow:hidden;border:1px solid rgba(255,255,255,.13);text-decoration:none;color:#fff;background:#111}.st-seo-authority__grid img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s}.st-seo-authority__grid a:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(5,5,5,.94),rgba(5,5,5,.28) 64%,transparent)}.st-seo-authority__grid a:hover img{transform:scale(1.035)}.st-seo-authority__copy{position:absolute;z-index:2;left:20px;right:20px;bottom:20px}.st-seo-authority__copy small{display:block;color:#d96476;font:600 9px/1 Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase;margin-bottom:8px}.st-seo-authority__copy strong{display:block;font:400 24px/1.15 Georgia,serif}.st-seo-authority__foot{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}.st-seo-authority__foot a{border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:10px 15px;text-decoration:none;color:rgba(255,255,255,.75);font:500 10px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
.st-full-scope{max-width:760px;margin:0 0 26px;color:#b8afa8;font:14px/1.7 Arial,sans-serif}.st-full-scope summary{cursor:pointer;min-height:44px;display:list-item}.st-full-scope p{margin:12px 0 24px}.st-hero h1{max-width:1180px!important;font-size:clamp(48px,6.4vw,112px)!important;line-height:.94!important}.st-hero-accent{color:#d96476}.st-hero-foot p{max-width:760px!important}.st-audience-router{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 0 54px}.st-audience-router a{display:block;min-height:190px;padding:28px;border:1px solid rgba(255,255,255,.14);color:#f1ede8;text-decoration:none;background:rgba(255,255,255,.025)}.st-audience-router small{color:#d96476;font:600 9px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}.st-audience-router strong{display:block;margin:28px 0 10px;font:400 30px/1.08 Georgia,serif}.st-audience-router p{margin:0;color:rgba(255,255,255,.58);font:400 14px/1.55 Arial,sans-serif}
.st-inline-arrow{display:inline-block;width:16px;height:16px;vertical-align:middle;fill:none;stroke:currentColor;stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round}.st-scroll-cue .st-inline-arrow,.st-lb-nav .st-inline-arrow,.st-team-mobile-cta .st-inline-arrow{width:20px;height:20px}.st-underline,.st-team-mobile-cta,.st-contact .st-underline{display:inline-flex!important;align-items:center;gap:9px}.st-brief-full-intake{display:inline-flex;align-items:center;gap:9px;margin-top:18px;padding-bottom:5px;border-bottom:1px solid rgba(242,237,231,.48);color:#f2ede7;text-decoration:none;font:600 10px/1.3 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}.st-form select,.st-form input,.st-form textarea{max-width:100%}
@media(max-width:900px){.st-seo-authority{padding:72px 24px 110px}.st-seo-authority__grid{grid-template-columns:1fr 1fr}.st-audience-router{grid-template-columns:1fr}}
@media(max-width:560px){
.st-seo-authority__grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-24px;padding-right:24px;scrollbar-width:none}.st-seo-authority__grid::-webkit-scrollbar{display:none}.st-seo-authority__grid a{flex:0 0 82vw;min-height:112vw;scroll-snap-align:center}.st-form input,.st-form select,.st-form textarea{font-size:16px!important}.st-footer{padding-bottom:calc(110px + env(safe-area-inset-bottom))!important}
.st-realtime .st-realtime-body{padding-top:86px!important;padding-bottom:68px!important}
.st-realtime .st-h2{width:100%!important;max-width:none!important;margin:0!important;font-size:clamp(38px,10.5vw,46px)!important;line-height:.94!important;letter-spacing:-.045em!important;word-break:normal!important;overflow-wrap:normal!important}
.st-realtime .st-h2 em{display:block!important;margin-top:.12em!important;font-size:.92em!important;line-height:1!important;white-space:normal!important}
.st-realtime .st-lead{position:relative!important;z-index:2!important;margin-top:28px!important}
}
</style>`;

const seoSection = `<section class="st-seo-authority" aria-labelledby="global-services-title"><div class="st-seo-authority__inner"><p class="st-seo-authority__eyebrow">START WITH WHAT YOU NEED</p><h2 id="global-services-title">One studio, two clear ways to begin.</h2><details class="st-full-scope"><summary>Architecture, design, 3D visualization &amp; creative production studio</summary><p>Artimist Productions is an international studio providing architecture, interiors, BIM and Revit, architectural rendering, animation, branding, web design and interactive experiences for homeowners, architects, developers and brands.</p></details><p class="st-seo-authority__lead">Choose the route that sounds most like you. Both lead to a reviewed brief, a defined scope and the right mix of design, technical production and visualization.</p><div class="st-audience-router"><a href="/home-design-services"><small>Homeowners</small><strong>I am planning my home</strong><p>House plans, additions, renovations, interiors, permit-support drawings and 3D views explained in everyday language.</p></a><a href="/services"><small>Architects, developers and brands</small><strong>I need studio production support</strong><p>Architecture, BIM/Revit, documentation, rendering, animation, branding, web and interactive experiences.</p></a></div><h2>Design it, change it, draw it or see it before you build.</h2><p class="st-seo-authority__lead">You do not need to know the professional name of the service. Artimist turns sketches, plans and ideas into clear designs, usable drawings and believable 3D visuals.</p><div class="st-seo-authority__grid">
<a href="/custom-house-design"><img src="/img/services/design-house-premium-2026.jpg" width="1536" height="1024" decoding="async" alt="Custom house plans and floor plan design" loading="lazy"><span class="st-seo-authority__copy"><small>01 / HOUSE DESIGN</small><strong>Design my house</strong></span></a>
<a href="/3d-interior-design-service"><img src="/img/services/design-interior-premium-2026.jpg" width="1536" height="1024" decoding="async" alt="3D interior design and home visualization" loading="lazy"><span class="st-seo-authority__copy"><small>02 / INTERIORS</small><strong>Design my interior</strong></span></a>
<a href="/plan-modification-service"><img src="/img/services/change-floor-plan-premium-2026.jpg" width="1536" height="1024" decoding="async" alt="Before and after floor plan modification" loading="lazy"><span class="st-seo-authority__copy"><small>03 / PLAN CHANGES</small><strong>Change my floor plan</strong></span></a>
<a href="/residential-renovation-permit-drawings"><img src="/img/services/plan-renovation-premium-2026.jpg" width="1536" height="1024" decoding="async" alt="Residential renovation and permit drawings" loading="lazy"><span class="st-seo-authority__copy"><small>04 / RENOVATION</small><strong>Plan my renovation</strong></span></a>
<a href="/visualization"><img src="/img/resid01.webp" width="1672" height="941" decoding="async" alt="Photoreal residential architectural visualization" loading="lazy"><span class="st-seo-authority__copy"><small>05 / 3D</small><strong>Show me the design</strong></span></a>
<a href="/bim-drafting"><img src="/img/revit04.webp" width="1448" height="1086" decoding="async" alt="BIM Revit model and coordinated plan views" loading="lazy"><span class="st-seo-authority__copy"><small>06 / PROFESSIONAL</small><strong>BIM, Revit & drafting</strong></span></a>
</div><div class="st-seo-authority__foot"><a href="/sketch-to-floor-plan-service">Sketch to floor plan</a><a href="/floor-plan-to-3d-rendering">Floor plan to 3D</a><a href="/home-addition-plans">Home addition plans</a><a href="/house-exterior-design-service">House exterior design</a><a href="/case-studies">Real case studies</a><a href="/usa">U.S. projects</a></div></div></section>`;

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
  html = html.replace('<script type="module" src="/spatial-model.js"></script>', '');
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
  html = html.replace('<h1>Atmosphere begins<br>before <em>the door.</em></h1>', '<h1><span class="st-hero-accent">Architecture.</span> <br>Design. <em>Visualization.</em></h1>');
  html = html.replace('Architecture, visualization and creative production for places, products and worlds people can believe in.', 'Design, drawings and immersive visuals — from first idea to a clearly defined deliverable.');

  // Add verified official profile links to the homepage footer for bidirectional entity association.
  html = html.replace(
    '<li><a href="/contact">Start a project</a></li><li><a href="#plans">Monthly plans</a></li>\n        <li><a href="/contact">Contact</a></li>',
    '<li><a href="/contact">Start a project</a></li><li><a href="#plans">Monthly plans</a></li>\n        <li><a href="/contact">Contact</a></li><li><a href="https://www.instagram.com/artimist.productions/">Instagram</a></li><li><a href="https://www.linkedin.com/company/artimist-productions">LinkedIn</a></li><li><a href="https://www.trustpilot.com/review/www.artimistproductions.com">Trustpilot</a></li>',
  );

  // Keep the homepage brief useful but clearly lighter than the complete intake.
  html = html.replace(
    'Tell us the problem rather than the deliverable. We will come back with the right scope, a named lead and a route to a decision.',
    `Tell us the problem rather than the deliverable. This is the quick brief; for location, stage and source-file links, use the full project intake.<br><a class="st-brief-full-intake" href="/contact">Open full project intake ${arrowUpRight}</a>`,
  );
  html = html.replace('<option>$200 &mdash; 1k</option><option>$1k &mdash; 5k</option><option>$5k &mdash; 20k</option>\n              <option>$20k &mdash; 50k</option><option>$50k+</option><option>Not sure yet</option>', '<option>$200 &mdash; $1,000</option><option>$1,000 &mdash; $5,000</option><option>$5,000 &mdash; $20,000</option>\n              <option>$20,000 &mdash; $50,000</option><option>$50,000+</option><option>Not sure yet</option>');

  // The complete project intake is now the primary conversion destination.
  html = html.replace(/href="#brief"/g, 'href="/contact"');

  // Platform-independent vector arrows: no blue/emoji glyph substitution on iOS.
  html = html.replace(/&#8599;/g, arrowUpRight);
  html = html.replace(/&#8594;/g, arrowRight);
  html = html.replace(/&#8592;/g, arrowLeft);
  html = html.replace(/&#8595;/g, arrowDown);

  html = html.replace('</head>', `<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">${googleTag}${seoStyle}<link rel="stylesheet" href="/astra-design.css">${webpageSchema}</head>`);

  // Keep this conversion/SEO section in the main browsing flow, immediately
  // before the team section rather than detached near the bottom of the page.
  html = html.replace('    <!-- TEAM -->', `${seoSection}\n    <!-- TEAM -->`);

  // Homepage uses the legacy studio.js index, so add the FAQ destination there
  // before client-showcase converts the raw index into grouped accordions.
  const faqIndexPatch = `<script id="artimist-faq-index-patch">(function(){var host=document.getElementById('indexPages');if(!host||host.querySelector('a[href="/faqs"]'))return;var group=document.createElement('p');group.className='st-index-group';group.textContent='FAQs';host.appendChild(group);var link=document.createElement('a');link.href='/faqs';link.setAttribute('data-index-link','');link.innerHTML='<small>68</small><span>Frequently Asked Questions</span><i aria-hidden="true">${arrowUpRight}</i>';host.appendChild(link);})();</script>`;

  // Keep only source-stable enhancements. Buyer-journey and premium-plan scripts
  // previously injected large new sections after load and made mobile output vary.
  html = html.replace('</body>', `${faqIndexPatch}<script>(function(){var loaded=false;function load(){if(loaded)return;loaded=true;var s=document.createElement('script');s.type='module';s.src='/spatial-model.js';document.head.appendChild(s)}var target=document.getElementById('portal');if('IntersectionObserver'in window&&target){var observer=new IntersectionObserver(function(entries){if(entries.some(function(entry){return entry.isIntersecting})){observer.disconnect();load()}},{rootMargin:'500px'});observer.observe(target)}else if('requestIdleCallback'in window){requestIdleCallback(load,{timeout:4000})}else{setTimeout(load,2500)}})();</script><script src="/lead-attribution.js" defer></script><script src="/whatsapp-conversations.js" defer></script><script src="/client-showcase.js" defer></script><script src="/home-consistency-final.js" defer></script><script src="/studio-motion.js" defer></script></body>`);
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
