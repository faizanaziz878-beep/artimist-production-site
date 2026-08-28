import Link from "next/link";

const BASE = "https://www.artimistproductions.com";

type FAQ = { q: string; a: string };
type MarketServicePageProps = {
  slug: string;
  country: string;
  kicker: string;
  h1: string;
  intro: string;
  serviceIntro: string;
  terms: string[];
  workflow: { title: string; text: string }[];
  faqs: FAQ[];
  localNote: string;
};

const services = [
  { href: "/custom-house-design", title: "Custom house design", copy: "House plans, layouts and residential design development." },
  { href: "/3d-interior-design-service", title: "3D interior design", copy: "Interior layouts, materials, lighting and photoreal visualization." },
  { href: "/bim-drafting", title: "BIM, Revit & drafting", copy: "Modeling, documentation, CAD/Revit production and coordination support." },
  { href: "/architectural-visualization-services", title: "Architectural visualization", copy: "Photoreal rendering, CGI, animation and presentation imagery." },
  { href: "/permit-drawing-services", title: "Permit drawing support", copy: "Drawing packages prepared around the project scope and local review pathway." },
  { href: "/unreal-engine", title: "Unreal Engine", copy: "Real-time architectural walkthroughs and interactive presentation." },
];

const guides = [
  { href: "/insights/permit-drawings-vs-construction-drawings", label: "Permit drawings vs construction drawings" },
  { href: "/insights/revit-drafting-vs-cad-drafting", label: "Revit drafting vs CAD drafting" },
  { href: "/insights/how-much-does-architectural-rendering-cost", label: "Architectural rendering cost guide" },
  { href: "/insights/how-to-modify-an-existing-floor-plan", label: "How to modify an existing floor plan" },
];

const CSS = `
.market{min-height:100vh;background:#090809;color:#eee8e3;padding-top:82px;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.market *{box-sizing:border-box}.market a{color:inherit}.market-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}.market-crumb{padding:24px 0;color:#9d928c;font-size:12px}.market-crumb a{text-decoration:none}.market-hero{padding:54px 0 76px;display:grid;grid-template-columns:1.08fr .92fr;gap:56px;align-items:end}.market-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.market h1,.market h2,.market h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.market h1{font-size:clamp(50px,7vw,92px);line-height:.98;letter-spacing:-.045em;margin:16px 0 24px}.market-lead{font-size:20px;color:#c5b9b2;max-width:64ch}.market-panel{padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:linear-gradient(145deg,rgba(153,38,54,.18),rgba(255,255,255,.02))}.market-panel p{margin:0;color:#b0a49e}.market-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}.market-tags span{border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 11px;font-size:11px;color:#c9beb8}.market-sec{padding:64px 0;border-top:1px solid rgba(255,255,255,.09)}.market-sec h2{font-size:clamp(34px,4.5vw,54px);line-height:1.08;margin:8px 0 28px}.market-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.market-card{display:block;text-decoration:none;padding:24px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#100e0f}.market-card h3{font-size:24px;margin:0 0 8px}.market-card p{margin:0;color:#a99e98;font-size:14px}.market-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.market-step{padding-top:18px;border-top:1px solid rgba(255,255,255,.13)}.market-step b{display:block;color:#d45e73;font-size:11px;letter-spacing:.14em;margin-bottom:10px}.market-step h3{font-size:23px;margin:0 0 8px}.market-step p{margin:0;color:#a99e98;font-size:14px}.market-faq details{border-top:1px solid rgba(255,255,255,.1);padding:20px 0}.market-faq summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:21px}.market-faq p{color:#aaa09a;max-width:74ch}.market-note{margin-top:22px;padding:18px 20px;border-left:3px solid #9d3043;background:rgba(157,48,67,.08);color:#b1a59f;font-size:14px}.market-links{display:flex;flex-wrap:wrap;gap:10px}.market-links a{border:1px solid rgba(255,255,255,.12);padding:10px 14px;border-radius:999px;text-decoration:none;color:#c9beb8}.market-cta{margin:42px 0 110px;padding:46px 24px;text-align:center;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#100e0f}.market-cta h2{margin:0 0 12px}.market-cta p{max-width:58ch;margin:0 auto 22px;color:#a99e98}.market-btn{display:inline-block;text-decoration:none;background:#992636;color:#fff!important;border-radius:999px;padding:14px 22px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}@media(max-width:840px){.market{padding-top:72px}.market-hero{grid-template-columns:1fr;gap:28px;padding-top:38px}.market-grid,.market-steps{grid-template-columns:1fr}.market-sec{padding:52px 0}.market-cta{margin-bottom:130px}}
`;

export function MarketServicePage(props: MarketServicePageProps) {
  const url = `${BASE}/${props.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: props.h1,
        description: props.intro,
        url,
        provider: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions", url: BASE },
        areaServed: { "@type": "Country", name: props.country },
        serviceType: ["Architecture", "Interior Design", "BIM", "Revit Drafting", "Architectural Visualization", "3D Rendering", "Unreal Engine"],
      },
      {
        "@type": "FAQPage",
        mainEntity: props.faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "International", item: `${BASE}/international` },
          { "@type": "ListItem", position: 3, name: props.country, item: url },
        ],
      },
    ],
  };

  return <main className="market">
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="market-wrap">
      <nav className="market-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/international">International</Link> / {props.country}</nav>
      <section className="market-hero">
        <div><div className="market-kicker">{props.kicker}</div><h1>{props.h1}</h1><p className="market-lead">{props.intro}</p></div>
        <aside className="market-panel"><p>{props.serviceIntro}</p><div className="market-tags">{props.terms.map((term) => <span key={term}>{term}</span>)}</div></aside>
      </section>

      <section className="market-sec"><div className="market-kicker">Services</div><h2>Remote design and production support with a clear project handoff.</h2><div className="market-grid">{services.map((service) => <Link className="market-card" key={service.href} href={service.href}><h3>{service.title}</h3><p>{service.copy}</p></Link>)}</div></section>

      <section className="market-sec"><div className="market-kicker">Workflow</div><h2>Structured for distributed teams and homeowner projects.</h2><div className="market-steps">{props.workflow.map((step, index) => <article className="market-step" key={step.title}><b>0{index + 1}</b><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

      <section className="market-sec market-faq"><div className="market-kicker">FAQ</div><h2>Practical questions before starting.</h2>{props.faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}<div className="market-note">{props.localNote}</div></section>

      <section className="market-sec"><div className="market-kicker">Useful guides</div><h2>Understand the scope before requesting a quote.</h2><div className="market-links">{guides.map((guide) => <Link href={guide.href} key={guide.href}>{guide.label}</Link>)}<Link href="/case-studies">View case studies</Link><Link href="/international">International delivery</Link></div></section>

      <section className="market-cta"><h2>Send the project at its current stage.</h2><p>Share the survey, sketch, CAD file, Revit model, existing plans, reference images or written brief. Artimist can define the right design, drafting, BIM or visualization scope from there.</p><Link className="market-btn" href="/contact">Start a project brief</Link></section>
    </div>
  </main>;
}
