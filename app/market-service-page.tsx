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

const marketVisuals: Record<string, { src: string; alt: string; label: string }[]> = {
  usa: [
    { src: "/media/generated-architecture/artimist-architecture-035.webp", alt: "Compact courtyard house exterior study", label: "Residential design" },
    { src: "/media/generated-architecture/artimist-architecture-029.webp", alt: "Compact courtyard house floor plans", label: "Plan development" },
    { src: "/media/generated-architecture/artimist-architecture-012.webp", alt: "Backyard studio permit drawing set", label: "Permit documentation" },
  ],
  canada: [
    { src: "/media/generated-architecture/artimist-architecture-001.webp", alt: "Compact brick home after a careful energy retrofit", label: "Residential retrofit" },
    { src: "/media/generated-architecture/artimist-architecture-067.webp", alt: "Passive house retrofit construction section", label: "Building performance" },
    { src: "/media/generated-architecture/artimist-architecture-054.webp", alt: "Exploded low-carbon backyard studio assembly", label: "BIM coordination" },
  ],
  uk: [
    { src: "/media/generated-architecture/artimist-architecture-019.webp", alt: "Brick townhouse with a contemporary courtyard extension", label: "Residential extension" },
    { src: "/media/generated-architecture/artimist-architecture-087.webp", alt: "Existing condition townhouse floor plans", label: "Measured drawings" },
    { src: "/media/generated-architecture/artimist-architecture-088.webp", alt: "Townhouse section through a rear extension", label: "Technical section" },
  ],
  sweden: [
    { src: "/media/generated-architecture/artimist-architecture-090.webp", alt: "Weathered timber backyard work studio", label: "Timber architecture" },
    { src: "/media/generated-architecture/artimist-architecture-082.webp", alt: "Timber cabin envelope junction detail", label: "Envelope study" },
    { src: "/media/generated-architecture/artimist-architecture-042.webp", alt: "Compact rural cabin plan and section", label: "BIM documentation" },
  ],
};

const CSS = `
.market{min-height:100vh;background:#090809;color:#eee8e3;padding-top:82px;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.market *{box-sizing:border-box}.market a{color:inherit}.market-wrap{width:min(1220px,calc(100% - 40px));margin:0 auto}.market-crumb{padding:24px 0;color:#9d928c;font-size:12px}.market-crumb a{text-decoration:none}.market-hero{padding:42px 0 36px;display:grid;grid-template-columns:1.02fr .98fr;gap:54px;align-items:center}.market-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.market h1,.market h2,.market h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.market h1{font-size:clamp(48px,6.2vw,84px);line-height:.98;letter-spacing:-.045em;margin:16px 0 24px}.market-lead{font-size:19px;color:#c5b9b2;max-width:62ch}.market-visual-stack{position:relative;min-width:0}.market-hero-figure{position:relative;margin:0;border:1px solid rgba(255,255,255,.12);border-radius:22px;overflow:hidden;background:#151213;aspect-ratio:4/3}.market-hero-figure img{width:100%;height:100%;object-fit:cover;display:block}.market-hero-figure:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(9,8,9,.8))}.market-hero-figure figcaption{position:absolute;z-index:1;left:22px;bottom:18px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#f0e8e3}.market-panel{position:relative;margin:-46px 20px 0 54px;padding:24px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:rgba(18,14,16,.94);backdrop-filter:blur(12px);z-index:2}.market-panel p{margin:0;color:#b9ada7;font-size:14px}.market-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px}.market-tags span{border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:7px 10px;font-size:10px;color:#c9beb8}.market-plate-strip{display:grid;grid-template-columns:1.35fr .65fr;gap:14px;padding:38px 0 72px}.market-plate{position:relative;margin:0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#eee7dd;min-height:260px}.market-plate img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .6s ease}.market-plate:hover img{transform:scale(1.015)}.market-plate figcaption{position:absolute;left:14px;bottom:14px;border-radius:999px;background:rgba(9,8,9,.82);padding:7px 10px;color:#f0e8e3;font-size:9px;letter-spacing:.12em;text-transform:uppercase}.market-sec{padding:64px 0;border-top:1px solid rgba(255,255,255,.09);content-visibility:auto;contain-intrinsic-size:600px}.market-sec h2{font-size:clamp(34px,4.5vw,54px);line-height:1.08;margin:8px 0 28px}.market-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.market-card{display:block;text-decoration:none;padding:24px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#100e0f}.market-card h3{font-size:24px;margin:0 0 8px}.market-card p{margin:0;color:#a99e98;font-size:14px}.market-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.market-step{padding-top:18px;border-top:1px solid rgba(255,255,255,.13)}.market-step b{display:block;color:#d45e73;font-size:11px;letter-spacing:.14em;margin-bottom:10px}.market-step h3{font-size:23px;margin:0 0 8px}.market-step p{margin:0;color:#a99e98;font-size:14px}.market-faq details{border-top:1px solid rgba(255,255,255,.1);padding:20px 0}.market-faq summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:21px}.market-faq p{color:#aaa09a;max-width:74ch}.market-note{margin-top:22px;padding:18px 20px;border-left:3px solid #9d3043;background:rgba(157,48,67,.08);color:#b1a59f;font-size:14px}.market-links{display:flex;flex-wrap:wrap;gap:10px}.market-links a{border:1px solid rgba(255,255,255,.12);padding:10px 14px;border-radius:999px;text-decoration:none;color:#c9beb8}.market-cta{margin:42px 0 110px;padding:46px 24px;text-align:center;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#100e0f}.market-cta h2{margin:0 0 12px}.market-cta p{max-width:58ch;margin:0 auto 22px;color:#a99e98}.market-btn{display:inline-block;text-decoration:none;background:#992636;color:#fff!important;border-radius:999px;padding:14px 22px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}@media(max-width:840px){.market{padding-top:72px}.market-wrap{width:min(100% - 28px,1220px)}.market-hero{grid-template-columns:1fr;gap:30px;padding-top:26px}.market h1{font-size:clamp(46px,14vw,68px)}.market-panel{margin:-28px 12px 0 28px}.market-plate-strip{grid-template-columns:1fr 1fr;padding-bottom:54px}.market-plate{min-height:190px}.market-grid,.market-steps{grid-template-columns:1fr}.market-sec{padding:52px 0}.market-cta{margin-bottom:130px}}@media(max-width:520px){.market-plate-strip{grid-template-columns:1fr}.market-plate{aspect-ratio:4/3}.market-panel{margin:-22px 8px 0 20px;padding:20px}.market-hero-figure{aspect-ratio:1/1}}
`;

export function MarketServicePage(props: MarketServicePageProps) {
  const url = `${BASE}/${props.slug}`;
  const visuals = marketVisuals[props.slug] ?? marketVisuals.usa;
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
        <div className="market-visual-stack">
          <figure className="market-hero-figure"><img src={visuals[0].src} alt={visuals[0].alt} width="1600" height="1200" fetchPriority="high" /><figcaption>{visuals[0].label} / Artimist study</figcaption></figure>
          <aside className="market-panel"><p>{props.serviceIntro}</p><div className="market-tags">{props.terms.map((term) => <span key={term}>{term}</span>)}</div></aside>
        </div>
      </section>

      <div className="market-plate-strip" aria-label={`${props.country} architectural capability studies`}>
        {visuals.slice(1).map((visual) => <figure className="market-plate" key={visual.src}><img src={visual.src} alt={visual.alt} width="1448" height="1086" loading="lazy" decoding="async" /><figcaption>{visual.label}</figcaption></figure>)}
      </div>

      <section className="market-sec"><div className="market-kicker">Services</div><h2>Remote design and production support with a clear project handoff.</h2><div className="market-grid">{services.map((service) => <Link className="market-card" key={service.href} href={service.href}><h3>{service.title}</h3><p>{service.copy}</p></Link>)}</div></section>

      <section className="market-sec"><div className="market-kicker">Workflow</div><h2>Structured for distributed teams and homeowner projects.</h2><div className="market-steps">{props.workflow.map((step, index) => <article className="market-step" key={step.title}><b>0{index + 1}</b><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

      <section className="market-sec market-faq"><div className="market-kicker">FAQ</div><h2>Practical questions before starting.</h2>{props.faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}<div className="market-note">{props.localNote}</div></section>

      <section className="market-sec"><div className="market-kicker">Useful guides</div><h2>Understand the scope before requesting a quote.</h2><div className="market-links">{guides.map((guide) => <Link href={guide.href} key={guide.href}>{guide.label}</Link>)}<Link href="/case-studies">View case studies</Link><Link href="/international">International delivery</Link></div></section>

      <section className="market-cta"><h2>Send the project at its current stage.</h2><p>Share the survey, sketch, CAD file, Revit model, existing plans, reference images or written brief. Artimist can define the right design, drafting, BIM or visualization scope from there.</p><Link className="market-btn" href="/contact">Start a project brief</Link></section>
    </div>
  </main>;
}
