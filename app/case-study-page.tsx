import Link from "next/link";

const BASE = "https://www.artimistproductions.com";

type RelatedLink = { href: string; label: string };
type GalleryItem = { src: string; alt: string; caption: string };

export type ProjectCaseStudyProps = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  region: string;
  hero: GalleryItem;
  services: string[];
  brief: string;
  approach: string[];
  deliverables: string[];
  demonstrates: string;
  gallery: GalleryItem[];
  related: RelatedLink[];
  note?: string;
};

const CSS = `
.cs{min-height:100vh;background:#0a0909;color:#eee8e3;padding-top:84px;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.cs *{box-sizing:border-box}.cs a{color:inherit}.cs-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}.cs-crumb{padding:26px 0 14px;color:#9e938d;font-size:12px}.cs-crumb a{text-decoration:none}.cs-hero{display:grid;grid-template-columns:.9fr 1.1fr;gap:52px;align-items:end;padding:40px 0 72px}.cs-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.cs h1,.cs h2,.cs h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.cs h1{font-size:clamp(46px,6.8vw,88px);line-height:.98;letter-spacing:-.035em;margin:16px 0 24px}.cs-summary{font-size:19px;color:#c6bab3;max-width:62ch}.cs-meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}.cs-meta span{border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 12px;color:#a99e98;font-size:11px;letter-spacing:.05em}.cs-hero figure,.cs-gallery figure{margin:0}.cs-hero img{width:100%;height:640px;object-fit:cover;border-radius:18px;border:1px solid rgba(255,255,255,.1);box-shadow:0 32px 100px rgba(0,0,0,.48)}.cs-caption{margin-top:10px;color:#817771;font-size:11px;letter-spacing:.05em}.cs-section{padding:64px 0;border-top:1px solid rgba(255,255,255,.09)}.cs-two{display:grid;grid-template-columns:.44fr 1fr;gap:58px}.cs h2{font-size:clamp(34px,4vw,50px);line-height:1.08;margin:0}.cs-copy{font-size:18px;color:#bbb0aa;max-width:70ch;margin:0}.cs-list{display:grid;grid-template-columns:1fr 1fr;gap:12px;list-style:none;margin:0;padding:0}.cs-list li{padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.025);color:#c9beb8}.cs-approach{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cs-step{border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px;background:#100e0f}.cs-step b{display:block;color:#d45e73;font-size:11px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:10px}.cs-step p{margin:0;color:#aaa09a}.cs-gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.cs-gallery img{width:100%;height:460px;object-fit:cover;border-radius:14px;border:1px solid rgba(255,255,255,.1)}.cs-proof{padding:44px;border-radius:18px;background:linear-gradient(135deg,rgba(153,38,54,.18),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.1)}.cs-proof p{font-family:Georgia,'Times New Roman',serif;font-size:clamp(26px,3vw,38px);line-height:1.3;margin:0;color:#e2d8d2}.cs-note{margin-top:20px;padding:16px 18px;border-left:3px solid #9d3043;background:rgba(157,48,67,.08);color:#a99e98;font-size:13px}.cs-related{display:flex;gap:10px;flex-wrap:wrap}.cs-related a{border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:10px 15px;text-decoration:none;color:#c9beb8}.cs-cta{margin:42px 0 90px;text-align:center;padding:48px 24px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#100e0f}.cs-cta h2{margin-bottom:12px}.cs-cta p{max-width:60ch;margin:0 auto 24px;color:#a99e98}.cs-btn{display:inline-block;text-decoration:none;background:#992636;color:#fff!important;border-radius:999px;padding:14px 22px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}@media(max-width:820px){.cs{padding-top:72px}.cs-hero,.cs-two{grid-template-columns:1fr}.cs-hero{gap:30px;padding-bottom:52px}.cs-hero img{height:440px}.cs-list,.cs-approach,.cs-gallery{grid-template-columns:1fr}.cs-gallery img{height:360px}.cs-proof{padding:28px}}
`;

export function ProjectCaseStudy(props: ProjectCaseStudyProps) {
  const url = `${BASE}/case-studies/${props.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: props.title,
        description: props.summary,
        url,
        creator: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions", url: BASE },
        about: props.services,
        spatialCoverage: props.region,
        image: [props.hero.src, ...props.gallery.map((item) => item.src)].map((src) => `${BASE}${src}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${BASE}/case-studies` },
          { "@type": "ListItem", position: 3, name: props.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="cs">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="cs-wrap">
        <nav className="cs-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/case-studies">Case Studies</Link> / {props.title}</nav>
        <section className="cs-hero">
          <div>
            <div className="cs-kicker">{props.eyebrow}</div>
            <h1>{props.title}</h1>
            <p className="cs-summary">{props.summary}</p>
            <div className="cs-meta"><span>{props.region}</span>{props.services.map((service) => <span key={service}>{service}</span>)}</div>
          </div>
          <figure><img src={props.hero.src} alt={props.hero.alt} /><figcaption className="cs-caption">{props.hero.caption}</figcaption></figure>
        </section>

        <section className="cs-section cs-two"><div><div className="cs-kicker">Project brief</div><h2>What the work needed to resolve</h2></div><p className="cs-copy">{props.brief}</p></section>

        <section className="cs-section"><div className="cs-kicker">Approach</div><h2 style={{ margin: "8px 0 28px" }}>How Artimist approached it</h2><div className="cs-approach">{props.approach.map((item, index) => <article className="cs-step" key={item}><b>0{index + 1}</b><p>{item}</p></article>)}</div></section>

        <section className="cs-section cs-two"><div><div className="cs-kicker">Scope</div><h2>Project deliverables</h2></div><ul className="cs-list">{props.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>

        <section className="cs-section"><div className="cs-gallery">{props.gallery.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy" /><figcaption className="cs-caption">{item.caption}</figcaption></figure>)}</div></section>

        <section className="cs-section"><div className="cs-proof"><div className="cs-kicker">What this demonstrates</div><p>{props.demonstrates}</p></div>{props.note ? <div className="cs-note">{props.note}</div> : null}</section>

        <section className="cs-section"><div className="cs-kicker">Related services</div><h2 style={{ margin: "8px 0 24px" }}>Explore the connected expertise</h2><div className="cs-related">{props.related.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div></section>

        <section className="cs-cta"><h2>Have a project with a similar problem?</h2><p>Send the current plans, survey, model, reference material or early brief. Artimist can review the information and define the right design, visualization or documentation scope.</p><Link className="cs-btn" href="/contact">Discuss your project</Link></section>
      </div>
    </main>
  );
}
