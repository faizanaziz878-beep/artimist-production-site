import { readFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://www.artimistproductions.com";
const GOOGLE_VERIFICATION = "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM";

type LinkItem = { href: string; label: string; note?: string };

type LegacySeoConfig = {
  file: string;
  canonical: string;
  title: string;
  description: string;
  serviceName: string;
  serviceType: string[];
  related: LinkItem[];
  intro: string;
};

function escHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const style = `<style id="artimist-service-authority-style">
.ap-seo-related{background:#10100f;color:#fff;padding:88px max(24px,5vw);border-top:1px solid rgba(255,255,255,.14)}.ap-seo-related__inner{max-width:1700px;margin:0 auto}.ap-seo-related__eyebrow{margin:0 0 15px;font:600 9px/1 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#e97587}.ap-seo-related h2{max-width:1050px;margin:0;font:400 clamp(40px,5vw,82px)/.96 Georgia,serif;letter-spacing:-.045em}.ap-seo-related__intro{max-width:760px;margin:22px 0 38px;color:rgba(255,255,255,.58);font:400 16px/1.62 Georgia,serif}.ap-seo-related__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.ap-seo-related__grid a{display:flex;min-height:132px;flex-direction:column;justify-content:space-between;padding:18px;border:1px solid rgba(255,255,255,.13);text-decoration:none;color:#fff;background:rgba(255,255,255,.025)}.ap-seo-related__grid strong{font:400 20px/1.16 Georgia,serif}.ap-seo-related__grid span{font:500 9px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.42)}@media(max-width:900px){.ap-seo-related{padding:68px 24px 100px}.ap-seo-related__grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.ap-seo-related__grid{grid-template-columns:1fr}.ap-seo-related__grid a{min-height:105px}}
</style>`;

export async function serveLegacySeo(config: LegacySeoConfig) {
  try {
    let html = await readFile(path.join(process.cwd(), "public", config.file), "utf8");
    const canonicalUrl = `${BASE}${config.canonical}`;
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${canonicalUrl}#service`,
          name: config.serviceName,
          url: canonicalUrl,
          description: config.description,
          serviceType: config.serviceType,
          areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"],
          provider: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions", url: BASE },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: config.serviceName, item: canonicalUrl },
          ],
        },
      ],
    };
    const links = config.related.map((item) => `<a href="${escHtml(item.href)}"><strong>${escHtml(item.label)}</strong><span>${escHtml(item.note || "Explore service")}</span></a>`).join("");
    const related = `<section class="ap-seo-related" aria-labelledby="ap-related-title"><div class="ap-seo-related__inner"><p class="ap-seo-related__eyebrow">CONNECTED EXPERTISE / ARTIMIST PRODUCTIONS</p><h2 id="ap-related-title">Go deeper into the work.</h2><p class="ap-seo-related__intro">${escHtml(config.intro)}</p><div class="ap-seo-related__grid">${links}</div></div></section>`;

    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escHtml(config.title)}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${escHtml(config.description)}">`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${escHtml(config.title)}">`);
    html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${escHtml(config.description)}">`);
    html = html.replace('</head>', `<meta name="google-site-verification" content="${GOOGLE_VERIFICATION}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">${style}<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
    html = html.replace('</main>', `${related}</main>`);

    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return new Response("Page unavailable", { status: 500 });
  }
}
