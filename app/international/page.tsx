import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://www.artimistproductions.com";
const WHATSAPP = "https://wa.me/18078084181?text=Hi%20Artimist%20Productions%20%E2%80%94%20I%27d%20like%20to%20discuss%20an%20international%20project.";

export const metadata: Metadata = {
  title: "International Architecture, BIM & 3D Visualization Studio | Artimist",
  description: "Artimist Productions works with homeowners, architects, developers and brands worldwide, with active focus in the USA, UK, Canada and Sweden across architecture, BIM, Revit, interiors, 3D visualization and Unreal Engine.",
  alternates: { canonical: "/international" },
  openGraph: {
    title: "International Architecture, BIM & 3D Visualization Studio | Artimist",
    description: "Worldwide architecture, BIM, interior design, architectural visualization, animation and real-time production with focused support for the USA, UK, Canada and Sweden.",
    url: `${BASE}/international`,
    type: "website",
    images: [{ url: "/graphics/international-architecture-bim-network.svg", alt: "Artimist Productions international architecture, BIM and visualization delivery network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "International Architecture, BIM & 3D Visualization | Artimist Productions",
    description: "International architecture, BIM, Revit, interiors, visualization and real-time production for clients worldwide.",
    images: ["/media/hero-night.webp"],
  },
};

const markets = [
  {
    code: "USA",
    title: "United States",
    copy: "Residential design, custom house plans, renovation and permit-documentation support, Revit/BIM production, architectural rendering and real-time visualization for homeowners and professional teams. Jurisdiction-specific professional review or stamping is coordinated where required.",
    terms: ["Custom house design", "Permit drawing support", "Revit / BIM", "Architectural visualization"],
  },
  {
    code: "UK",
    title: "United Kingdom",
    copy: "Architecture and interior design development, planning and Building Regulations drawing support, BIM/Revit production and photoreal visualization for residential and commercial work. Local statutory requirements remain subject to the relevant authority and appointed professionals.",
    terms: ["Residential design", "Planning drawing support", "BIM / Revit", "CGI & animation"],
  },
  {
    code: "CAN",
    title: "Canada",
    copy: "Custom home design, renovation planning, permit-documentation support, 3D interiors, exterior visualization and BIM production for homeowners, builders, developers and design studios across Canadian markets.",
    terms: ["Custom home design", "Renovation drawings", "3D interior design", "BIM production"],
  },
  {
    code: "SWE",
    title: "Sweden",
    copy: "Architecture, interior development, BIM/Revit support and high-end visualization for Scandinavian projects, with a workflow built around digital coordination, clear milestones and native source-file handover.",
    terms: ["Architecture support", "Interior design", "BIM / Revit", "Visualization"],
  },
  {
    code: "INT",
    title: "Worldwide",
    copy: "Artimist is built for distributed work. Projects can begin from a sketch, survey, CAD set, Revit model, point cloud, mood board or written brief and move through structured online reviews to editable final files.",
    terms: ["Remote collaboration", "Source-file handover", "Structured reviews", "Multidisciplinary delivery"],
  },
];

const faqs = [
  { q: "Can Artimist work with clients outside these four markets?", a: "Yes. Artimist works internationally. The USA, UK, Canada and Sweden are priority growth markets, not a limit on where projects can be accepted." },
  { q: "How do international projects handle local permits and professional licensing?", a: "Local requirements vary. When a project needs a locally licensed architect, engineer or other professional to review, coordinate or stamp documents, Artimist works alongside that professional rather than representing that remote design services replace local licensure." },
  { q: "What files can international clients send?", a: "Typical starting material includes PDF drawings, DWG, Revit files, point clouds, surveys, sketches, inspiration images, specifications, schedules and written briefs." },
  { q: "Can Artimist work inside another architecture studio's standards?", a: "Yes. BIM, Revit and CAD production can be aligned to client templates, title blocks, naming systems, model protocols and review processes when those standards are supplied." },
];

const CSS = `
.intl{min-height:100vh;background:#0a0909;color:#eee8e3;padding-top:84px;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.intl *{box-sizing:border-box}.intl a{color:inherit}.intl-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}.intl-crumb{padding:26px 0;color:#9e938d;font-size:12px}.intl-crumb a{text-decoration:none}.intl-hero{display:grid;grid-template-columns:1.08fr .92fr;gap:58px;align-items:center;padding:50px 0 82px}.intl-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.intl h1,.intl h2,.intl h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.intl h1{font-size:clamp(50px,7vw,92px);line-height:.98;letter-spacing:-.04em;margin:16px 0 24px}.intl-lead{font-size:20px;color:#c4b8b1;max-width:64ch}.intl-hero-card{min-height:520px;border-radius:20px;border:1px solid rgba(255,255,255,.1);overflow:hidden;background:#0b0a0a;box-shadow:0 32px 100px rgba(0,0,0,.38)}.intl-hero-card img{display:block;width:100%;height:100%;min-height:520px;object-fit:cover}.intl-section{padding:68px 0;border-top:1px solid rgba(255,255,255,.09)}.intl-section h2{font-size:clamp(34px,4.5vw,56px);line-height:1.08;margin:8px 0 28px}.intl-market-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.intl-market{border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:28px;background:#100e0f}.intl-market small{color:#d45e73;letter-spacing:.16em}.intl-market h3{font-size:30px;margin:12px 0}.intl-market p{color:#aaa09a}.intl-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.intl-tags span{font-size:11px;border:1px solid rgba(255,255,255,.1);padding:7px 10px;border-radius:999px;color:#b9aea8}.intl-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.intl-services a{display:block;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:22px;text-decoration:none;background:rgba(255,255,255,.02)}.intl-services strong{display:block;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:400;margin-bottom:8px}.intl-services span{font-size:12px;color:#9f948e}.intl-process{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.intl-process article{border-top:1px solid rgba(255,255,255,.14);padding-top:18px}.intl-process b{display:block;color:#d45e73;font-size:11px;letter-spacing:.14em;margin-bottom:12px}.intl-process h3{font-size:24px;margin:0 0 8px}.intl-process p{color:#a99e98;font-size:14px}.intl-faq details{padding:20px 0;border-top:1px solid rgba(255,255,255,.1)}.intl-faq summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:21px}.intl-faq p{color:#aaa09a;max-width:74ch}.intl-note{padding:20px;border-left:3px solid #9d3043;background:rgba(157,48,67,.08);color:#aca19b;font-size:13px}.intl-cta{margin:42px 0 90px;padding:48px 24px;text-align:center;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#100e0f}.intl-cta h2{margin:0 0 12px}.intl-cta p{max-width:58ch;margin:0 auto 24px;color:#a99e98}.intl-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.intl-btn{display:inline-block;text-decoration:none;background:#992636;color:#fff!important;border-radius:999px;padding:14px 22px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}.intl-btn-secondary{background:transparent;border:1px solid rgba(255,255,255,.18)}@media(max-width:840px){.intl{padding-top:72px}.intl-hero{grid-template-columns:1fr;gap:32px}.intl-hero-card,.intl-hero-card img{min-height:380px}.intl-market-grid,.intl-services,.intl-process{grid-template-columns:1fr}.intl-section{padding:52px 0}.intl-cta{margin-bottom:130px}}
`;

export default function InternationalPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: "International Architecture, BIM and Visualization Services", url: `${BASE}/international`, provider: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions", url: BASE }, areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"], serviceType: ["Architecture", "Interior Design", "BIM", "Revit Drafting", "CAD Drafting", "Architectural Visualization", "3D Rendering", "Architectural Animation", "Unreal Engine"] },
      { "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` }, { "@type": "ListItem", position: 2, name: "International", item: `${BASE}/international` }] },
    ],
  };

  return <main className="intl">
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="intl-wrap">
      <nav className="intl-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / International</nav>
      <section className="intl-hero">
        <div><div className="intl-kicker">Worldwide studio / focused markets</div><h1>Built to work across borders.</h1><p className="intl-lead">Artimist Productions supports homeowners, architects, developers, builders and brands internationally across architecture, interior design, BIM, Revit, CAD, 3D visualization, animation and Unreal Engine. The studio works worldwide, with focused business development in the USA, UK, Canada and Sweden.</p></div>
        <aside className="intl-hero-card"><img src="/graphics/international-architecture-bim-network.svg" alt="International architecture BIM and visualization delivery network for worldwide Artimist projects" /></aside>
      </section>

      <section className="intl-section"><div className="intl-kicker">Priority markets</div><h2>Global reach without pretending every market is the same.</h2><div className="intl-market-grid">{markets.map((market) => <article className="intl-market" key={market.code}><small>{market.code}</small><h3>{market.title}</h3><p>{market.copy}</p><div className="intl-tags">{market.terms.map((term) => <span key={term}>{term}</span>)}</div></article>)}</div></section>

      <section className="intl-section"><div className="intl-kicker">Core services</div><h2>Specialist pages for the work people actually search for.</h2><div className="intl-services">
        <Link href="/custom-house-design"><strong>Custom House Design</strong><span>House plans, floor plans and residential design</span></Link>
        <Link href="/3d-interior-design-service"><strong>3D Interior Design</strong><span>Home interiors, layouts and visualization</span></Link>
        <Link href="/residential-renovation-permit-drawings"><strong>Renovation & Permit Drawings</strong><span>Remodels, additions and permit-documentation support</span></Link>
        <Link href="/bim-drafting"><strong>BIM & Revit</strong><span>Revit, CAD, Scan-to-BIM and technical production</span></Link>
        <Link href="/visualization"><strong>Architectural Visualization</strong><span>Photoreal CGI, animation and cinematic direction</span></Link>
        <Link href="/unreal-engine"><strong>Unreal Engine</strong><span>Interactive architecture and real-time experiences</span></Link>
      </div></section>

      <section className="intl-section"><div className="intl-kicker">International workflow</div><h2>Clear enough to cross time zones.</h2><div className="intl-process"><article><b>01</b><h3>Receive</h3><p>Collect the survey, model, plan set, brief, standards and target deliverables.</p></article><article><b>02</b><h3>Align</h3><p>Confirm scope, review rhythm, file standards, responsibilities and local-professional interfaces.</p></article><article><b>03</b><h3>Develop</h3><p>Design, model, draw or visualize with staged review packages rather than opaque production.</p></article><article><b>04</b><h3>Handover</h3><p>Deliver organized exports and editable native files according to the agreed scope.</p></article></div></section>

      <section className="intl-section intl-faq"><div className="intl-kicker">International FAQ</div><h2>Questions clients ask before working remotely.</h2>{faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}<div className="intl-note">Artimist can support design and documentation internationally, but permitting, code compliance, planning approvals and professional-stamp requirements are controlled locally. Project scopes are structured around the actual jurisdiction and appointed local professionals where required.</div></section>

      <section className="intl-section"><div className="intl-kicker">Proof of work</div><h2>See project evidence, not just service claims.</h2><div className="intl-services"><Link href="/case-studies"><strong>Case Studies</strong><span>Selected residential, technical and visualization work</span></Link><Link href="/visual-archive"><strong>Visual Archive</strong><span>Broader portfolio material across disciplines</span></Link><Link href="/process"><strong>Process</strong><span>How projects move from brief to handover</span></Link></div></section>

      <section className="intl-cta"><h2>Start from wherever your project is now.</h2><p>Send the plan set, model, survey, references or early brief. Artimist can define a scope that fits the stage, market and deliverables you actually need.</p><div className="intl-actions"><Link className="intl-btn" href="/contact">Send a project brief</Link><a className="intl-btn intl-btn-secondary" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Talk to the studio on WhatsApp</a></div></section>
    </div>
  </main>;
}