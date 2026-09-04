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
  audiences?: { title: string; text: string; href: string }[];
  decisionDetails?: { title: string; text: string }[];
};

const services = [
  { href: "/custom-house-design", title: "Custom house design", image: "/img/resext03.webp", alt: "Residential exterior design by Artimist Productions" },
  { href: "/3d-interior-design-service", title: "3D interior design", image: "/img/homeint03.webp", alt: "Photoreal interior design by Artimist Productions" },
  { href: "/bim-drafting", title: "BIM, Revit & drafting", image: "/media/projects/permit-sets.webp", alt: "BIM and architectural drawing production by Artimist Productions" },
  { href: "/architectural-visualization-services", title: "Architectural visualization", image: "/media/projects/bowl-stroke.webp", alt: "Architectural visualization by Artimist Productions" },
  { href: "/permit-drawing-services", title: "Permit drawing support", image: "/img/permit04.webp", alt: "Permit documentation drawing sheet by Artimist Productions" },
  { href: "/unreal-engine", title: "Unreal Engine", image: "/media/residential/residential-13.webp", alt: "Real-time architectural visualization by Artimist Productions" },
];

const guides = [
  { href: "/insights/permit-drawings-vs-construction-drawings", label: "Permit drawings vs construction drawings" },
  { href: "/insights/revit-drafting-vs-cad-drafting", label: "Revit drafting vs CAD drafting" },
  { href: "/insights/how-much-does-architectural-rendering-cost", label: "Architectural rendering cost guide" },
  { href: "/insights/how-to-modify-an-existing-floor-plan", label: "How to modify an existing floor plan" },
];

const marketVisuals: Record<string, { src: string; alt: string; label: string }[]> = {
  usa: [
    { src: "/img/rvpark.webp", alt: "RV park site planning and architectural visualization by Artimist Productions", label: "Published work / site planning" },
    { src: "/media/projects/permit-sets.webp", alt: "Permit documentation drawing set prepared by Artimist Productions", label: "Drawing production" },
    { src: "/img/resext01.webp", alt: "Residential exterior design by Artimist Productions", label: "Residential design" },
  ],
  canada: [
    { src: "/img/resid01.webp", alt: "Residential architecture and visualization project by Artimist Productions", label: "Published work / residential" },
    { src: "/img/permit01.webp", alt: "Technical residential drawing package by Artimist Productions", label: "Documentation" },
    { src: "/img/homeint03.webp", alt: "Whole-home interior visualization by Artimist Productions", label: "Interior design" },
  ],
  uk: [
    { src: "/media/projects/bowl-stroke.webp", alt: "Hospitality architecture and interior visualization by Artimist Productions", label: "Published work / hospitality" },
    { src: "/img/permit04.webp", alt: "Coordinated architectural drawing sheet by Artimist Productions", label: "Technical production" },
    { src: "/img/resext03.webp", alt: "Contemporary residential exterior design by Artimist Productions", label: "Residential design" },
  ],
  sweden: [
    { src: "/media/projects/music-campus.webp", alt: "Cultural campus architecture and visualization by Artimist Productions", label: "Published work / cultural" },
    { src: "/img/drive-09.webp", alt: "Warm contemporary interior visualization by Artimist Productions", label: "Interior atmosphere" },
    { src: "/media/projects/unesco.webp", alt: "Architectural cultural project visualization by Artimist Productions", label: "Architectural visualization" },
  ],
};

const CSS = `
.market{min-height:100vh;background:#090809;color:#eee8e3;padding-top:82px;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.market *{box-sizing:border-box}.market a{color:inherit}.market-wrap{width:min(1220px,calc(100% - 40px));margin:0 auto}.market-crumb{padding:24px 0;color:#9d928c;font-size:12px}.market-crumb a{text-decoration:none}.market-hero{position:relative;padding:54px 0 48px;display:grid;grid-template-columns:.9fr 1.1fr;gap:64px;align-items:center}.market-code{position:absolute;left:-6px;top:8px;color:rgba(255,255,255,.035);font-family:Arial,Helvetica,sans-serif;font-size:clamp(110px,18vw,250px);font-weight:800;line-height:.8;letter-spacing:-.08em;text-transform:uppercase;pointer-events:none}.market-hero-copy{position:relative;z-index:1}.market-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.market h1,.market h2,.market h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.market h1{font-size:clamp(48px,6.2vw,84px);line-height:.98;letter-spacing:-.045em;margin:16px 0 24px}.market-lead{font-size:19px;color:#c5b9b2;max-width:62ch}.market-visual-stack{position:relative;min-width:0}.market-hero-figure{position:relative;margin:0;border:1px solid rgba(255,255,255,.14);overflow:hidden;background:#151213;aspect-ratio:5/6}.market-hero-figure img{width:100%;height:100%;object-fit:cover;display:block}.market-hero-figure:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 48%,rgba(9,8,9,.86))}.market-hero-figure figcaption{position:absolute;z-index:1;left:22px;bottom:18px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#f0e8e3}.market-panel{position:absolute;left:-42px;right:26px;bottom:24px;margin:0;padding:24px;border:1px solid rgba(255,255,255,.16);background:rgba(14,11,12,.94);backdrop-filter:blur(12px);z-index:2}.market-panel p{margin:0;color:#b9ada7;font-size:14px}.market-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:0}.market-tags span{border-top:1px solid rgba(255,255,255,.18);padding:7px 10px 0 0;font-size:10px;color:#c9beb8}.market-plate-strip{display:grid;grid-template-columns:1.35fr .65fr;gap:14px;padding:38px 0 72px}.market-plate{position:relative;margin:0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#eee7dd;min-height:260px}.market-plate img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .6s ease}.market-plate:hover img{transform:scale(1.015)}.market-plate figcaption{position:absolute;left:14px;bottom:14px;border-radius:999px;background:rgba(9,8,9,.82);padding:7px 10px;color:#f0e8e3;font-size:9px;letter-spacing:.12em;text-transform:uppercase}.market-sec{padding:64px 0;border-top:1px solid rgba(255,255,255,.09);content-visibility:auto;contain-intrinsic-size:600px}.market-sec h2{font-size:clamp(34px,4.5vw,54px);line-height:1.08;margin:8px 0 28px}.market-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.market-card{position:relative;display:block;text-decoration:none;min-height:390px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:#111;isolation:isolate}.market-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .65s ease}.market-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(7,7,7,.92))}.market-card:hover img{transform:scale(1.025)}.market-card-copy{position:absolute;z-index:1;left:24px;right:24px;bottom:22px}.market-card-index{display:block;margin-bottom:7px;color:#df6b7d;font-size:10px;letter-spacing:.16em}.market-card h3{font-size:30px;line-height:1.05;margin:0}.market-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.market-step{padding:22px 0;border-top:1px solid rgba(255,255,255,.13)}.market-step b{display:block;color:rgba(212,94,115,.85);font-family:Georgia,serif;font-size:48px;font-weight:400;line-height:1;margin-bottom:14px}.market-step h3{font-size:23px;line-height:1.08;margin:0 0 8px}.market-step p{margin:0;color:#8f8580;font-size:12px;line-height:1.55}.market-audiences,.market-decisions{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.market-audiences a,.market-decisions article{display:block;min-height:210px;padding:24px;border:1px solid rgba(255,255,255,.11);text-decoration:none;background:#100e0f}.market-audiences h3,.market-decisions h3{font-size:24px;line-height:1.08;margin:22px 0 10px}.market-audiences p,.market-decisions p{margin:0;color:#9c918b;font-size:13px}.market-audiences small{color:#d45e73;letter-spacing:.14em;text-transform:uppercase}.market-faq details{border-top:1px solid rgba(255,255,255,.1);padding:20px 0}.market-faq summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:21px}.market-faq p{color:#aaa09a;max-width:74ch}.market-note{margin-top:22px;border-top:1px solid rgba(255,255,255,.1);padding:18px 0}.market-note summary{cursor:pointer;color:#cfc5bf;font-size:12px;letter-spacing:.1em;text-transform:uppercase}.market-note p{max-width:80ch;color:#918781;font-size:13px}.market-links{display:flex;flex-wrap:wrap;gap:10px}.market-links a{border:1px solid rgba(255,255,255,.12);padding:10px 14px;border-radius:999px;text-decoration:none;color:#c9beb8}.market-cta{margin:42px 0 110px;padding:46px 24px;text-align:center;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#100e0f}.market-cta h2{margin:0 0 12px}.market-cta p{max-width:48ch;margin:0 auto 22px;color:#918781;font-size:13px}.market-btn{display:inline-block;text-decoration:none;background:#992636;color:#fff!important;border-radius:999px;padding:14px 22px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}.market-hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:26px}.market-btn-quiet{display:inline-block;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:13px 20px;font-size:11px;letter-spacing:.08em;text-transform:uppercase}@media(max-width:840px){.market{padding-top:72px}.market-wrap{width:min(100% - 28px,1220px)}.market-hero{grid-template-columns:1fr;gap:30px;padding-top:26px}.market h1{font-size:clamp(46px,14vw,68px)}.market-panel{position:relative;left:auto;right:auto;bottom:auto;margin:-34px 12px 0 28px}.market-plate-strip{grid-template-columns:1fr 1fr;padding-bottom:54px}.market-plate{min-height:190px}.market-steps,.market-audiences,.market-decisions{grid-template-columns:1fr}.market-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:10px;margin-right:-14px;padding-right:14px;scrollbar-width:none}.market-grid::-webkit-scrollbar{display:none}.market-card{flex:0 0 min(84vw,420px);min-height:430px;scroll-snap-align:center}.market-sec{padding:52px 0}.market-cta{margin-bottom:130px}}@media(max-width:520px){.market-plate-strip{grid-template-columns:1fr}.market-plate{aspect-ratio:4/3}.market-panel{margin:-22px 8px 0 20px;padding:20px}.market-hero-figure{aspect-ratio:4/5}.market-code{top:18px}.market-hero-actions a{flex:1;text-align:center;min-width:150px}}
`;

export function MarketServicePage(props: MarketServicePageProps) {
  const url = `${BASE}/${props.slug}`;
  const visuals = marketVisuals[props.slug] ?? marketVisuals.usa;
  const shortIntro = `Design, drawings and visualization for ${props.country} projects. Remote delivery, with local professional responsibilities clearly defined.`;
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
        <div className="market-code" aria-hidden="true">{props.slug}</div>
        <div className="market-hero-copy"><div className="market-kicker">{props.kicker}</div><h1>{props.h1}</h1><p className="market-lead">{shortIntro}</p><details className="market-note"><summary>Project scope & delivery</summary><p>{props.intro}</p></details><div className="market-hero-actions"><Link className="market-btn" href="/contact">Brief the studio</Link><Link className="market-btn-quiet" href="/case-studies">See project evidence</Link></div></div>
        <div className="market-visual-stack">
          <figure className="market-hero-figure"><img src={visuals[0].src} alt={visuals[0].alt} width="1600" height="1200" fetchPriority="high" /><figcaption>{visuals[0].label} / Artimist project</figcaption></figure>
          <aside className="market-panel"><div className="market-tags">{props.terms.map((term) => <span key={term}>{term}</span>)}</div></aside>
        </div>
      </section>

      <div className="market-plate-strip" aria-label={`${props.country} architectural capability studies`}>
        {visuals.slice(1).map((visual) => <figure className="market-plate" key={visual.src}><img src={visual.src} alt={visual.alt} width="1448" height="1086" loading="lazy" decoding="async" /><figcaption>{visual.label}</figcaption></figure>)}
      </div>

      {props.audiences && <section className="market-sec"><div className="market-kicker">Choose your route</div><h2>Support shaped around the client.</h2><div className="market-audiences">{props.audiences.map((audience, index) => <Link key={audience.title} href={audience.href}><small>0{index + 1}</small><h3>{audience.title}</h3><p>{audience.text}</p></Link>)}</div></section>}

      <section className="market-sec"><div className="market-kicker">Services</div><h2>Choose the support you need.</h2><div className="market-grid">{services.map((service, index) => <Link className="market-card" key={service.href} href={service.href}><img src={service.image} alt={service.alt} width="1200" height="900" loading="lazy" decoding="async" /><div className="market-card-copy"><span className="market-card-index">0{index + 1}</span><h3>{service.title}</h3></div></Link>)}</div></section>

      <section className="market-sec"><div className="market-kicker">Workflow</div><h2>Four clear stages.</h2><div className="market-steps">{props.workflow.map((step, index) => <article className="market-step" key={step.title}><b>0{index + 1}</b><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

      {props.decisionDetails && <section className="market-sec"><div className="market-kicker">Before you commission</div><h2>Scope, timing and handover stay visible.</h2><div className="market-decisions">{props.decisionDetails.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>}

      <section className="market-sec market-faq"><div className="market-kicker">FAQ</div><h2>Practical questions before starting.</h2>{props.faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}<details className="market-note"><summary>Local approvals & professional responsibility</summary><p>{props.localNote}</p></details></section>

      <section className="market-sec"><div className="market-kicker">Useful guides</div><h2>Read only what you need.</h2><div className="market-links">{guides.map((guide) => <Link href={guide.href} key={guide.href}>{guide.label}</Link>)}<Link href="/case-studies">View case studies</Link><Link href="/international">International delivery</Link></div></section>

      <section className="market-cta"><h2>Send the project at its current stage.</h2><p>A sketch, plan, model or short brief is enough to begin.</p><Link className="market-btn" href="/contact">Start a project brief</Link></section>
    </div>
  </main>;
}
