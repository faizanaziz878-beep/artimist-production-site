import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AduVisualStage } from "./adu-visual-stage";
import "./adu.css";

const BASE = "https://www.artimistproductions.com";

export const metadata: Metadata = {
  title: "ADU Design & Plans | Floor Plans, Drawings & 3D | Artimist",
  description:
    "ADU design and drawing support for backyard, detached, attached and garage-conversion ADUs. Floor plans, elevations, sections, Revit/CAD and realistic 3D views for U.S. homeowners, builders and ADU teams.",
  alternates: { canonical: "/adu-design-plans" },
  openGraph: {
    title: "ADU Design & Plans | Artimist Productions",
    description:
      "Plan the ADU, understand the drawings and see it in 3D before construction. Remote design and documentation support with clear local-professional boundaries.",
    url: `${BASE}/adu-design-plans`,
    type: "website",
    images: [{ url: `${BASE}/adu/adu-hero.svg`, width: 1200, height: 1800, alt: "Modern backyard ADU design visualization by Artimist Productions" }],
  },
};

const aduTypes = [
  { n: "01", title: "Backyard ADU", text: "A separate small home designed around your yard, access, privacy and the way the main house already uses the site." },
  { n: "02", title: "Detached ADU", text: "Independent floor plans, elevations and 3D design for a new accessory dwelling unit behind or beside the primary home." },
  { n: "03", title: "Attached ADU", text: "Plan an ADU connected to the existing house while resolving entries, circulation, openings and privacy." },
  { n: "04", title: "Garage Conversion ADU", text: "Turn an existing garage into usable living space with existing/proposed plans and coordinated architectural drawing support." },
];

const deliverables = [
  "ADU floor plans and layout studies",
  "Existing / proposed plans where relevant",
  "Exterior elevations",
  "Building sections",
  "Door and window studies",
  "CAD or Revit production as scoped",
  "ADU 3D rendering and material studies",
  "Permit-documentation support for local review",
];

const faqs = [
  { q: "Can you design an ADU from my existing house plans?", a: "Yes. Existing house drawings, a measured survey, site information and photographs can be used as the design base. We identify what is verified and what still needs local field confirmation before detailed documentation is relied on." },
  { q: "Can you turn my garage into an ADU floor plan?", a: "Yes. We can document the existing garage, develop a proposed ADU layout and prepare the agreed plans, elevations, sections and optional 3D views for coordination with your builder and locally required professionals." },
  { q: "Can you make an ADU floor plan from a sketch?", a: "Yes. A hand sketch, marked-up PDF or rough layout can be developed into a clearer digital floor plan when enough dimensions, site information and project requirements are available." },
  { q: "Can I see my ADU in 3D before building it?", a: "Yes. We can turn the approved floor plan and architectural information into realistic exterior and interior 3D views so scale, windows, materials, furniture and lighting can be reviewed before construction." },
  { q: "Do you provide ADU permit drawings?", a: "Artimist provides architectural design, drafting and permit-documentation support within the written scope. Code review, engineering, professional stamping, signing and jurisdiction-specific submission responsibility remain with the appropriate locally licensed professionals where required." },
  { q: "Can you work with my contractor or local architect?", a: "Yes. Our role can be structured as remote design and production support for a homeowner, contractor, ADU builder or locally licensed architect/engineer, with responsibilities kept explicit." },
];

export default function AduDesignPlansPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "ADU Design & Drawing Support",
        serviceType: ["ADU design", "ADU floor plans", "Accessory dwelling unit drawings", "ADU 3D rendering"],
        description: "Remote ADU design, floor-plan, drafting, visualization and permit-documentation support for detached, attached, backyard and garage-conversion accessory dwelling units.",
        url: `${BASE}/adu-design-plans`,
        provider: { "@type": "Organization", name: "Artimist Productions", url: BASE },
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "Audience", audienceType: "Homeowners, ADU builders, contractors, developers and local design professionals" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "ADU Design & Plans", item: `${BASE}/adu-design-plans` },
        ],
      },
    ],
  };

  return (
    <main className="adu-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="adu-hero">
        <div className="adu-hero-grid adu-wrap">
          <div className="adu-hero-copy">
            <p className="adu-kicker">USA · Accessory Dwelling Units</p>
            <h1>ADU Design <span>&amp; Drawing Support</span></h1>
            <p className="adu-lead">Design the ADU. Understand the plan. <strong>See it before you build it.</strong></p>
            <details className="adu-scope"><summary>Scope &amp; project inputs</summary><p className="adu-intro">Artimist develops ADU floor plans, architectural drawings and realistic 3D views for backyard ADUs, detached or attached units and garage conversions. Start from a sketch, existing plan, PDF or site information—we turn the idea into a coordinated design package for the next project stage.</p></details>
            <div className="adu-actions">
              <Link className="adu-btn adu-btn-primary" href="/contact">Send your ADU idea</Link>
              <a className="adu-btn adu-btn-ghost" href="#adu-drawings">See plans &amp; drawings</a>
            </div>
            <div className="adu-search-language" aria-label="Common ADU project needs">
              <span>ADU floor plans</span><span>garage conversion ADU</span><span>backyard ADU design</span><span>ADU 3D rendering</span>
            </div>
          </div>
          <AduVisualStage />
        </div>
      </section>

      <section className="adu-proofbar" aria-label="ADU service summary">
        <div className="adu-wrap adu-proofbar-grid">
          <div><b>01</b><span>Plan the space</span></div>
          <div><b>02</b><span>Develop the drawings</span></div>
          <div><b>03</b><span>See it in 3D</span></div>
          <div><b>04</b><span>Coordinate locally</span></div>
        </div>
      </section>

      <section className="adu-section adu-types adu-wrap">
        <div className="adu-section-head">
          <p className="adu-kicker">What are you trying to build?</p>
          <h2>Four ways to create more living space.</h2>
          <p>Each project type has different existing conditions, drawing needs and design decisions.</p>
        </div>
        <div className="adu-type-grid">
          {aduTypes.map((type) => <article key={type.n} className="adu-type-card"><span>{type.n}</span><h3>{type.title}</h3><p>{type.text}</p></article>)}
        </div>
      </section>

      <section className="adu-section adu-cinema">
        <div className="adu-wrap adu-cinema-grid">
          <figure className="adu-cinema-main">
            <Image src="/adu/adu-exterior.svg" alt="Photoreal backyard accessory dwelling unit exterior at golden hour" fill sizes="(max-width: 900px) 100vw, 64vw" />
            <figcaption>Backyard ADU · exterior design + visualization</figcaption>
          </figure>
          <div className="adu-cinema-copy">
            <p className="adu-kicker">See the design</p>
            <h2>“What will my ADU actually look like?”</h2>
            <p>Homeowners do not always search for “architectural visualization.” They search for a 3D picture of the house, a way to make a floor plan 3D, or a way to see the design before building. This service connects those questions directly to the drawings.</p>
            <Link href="/3d-house-design" className="adu-text-link">See our 3D house design service <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section id="adu-drawings" className="adu-section adu-drawings adu-wrap">
        <div className="adu-section-head adu-section-head-wide">
          <p className="adu-kicker">Plans · elevations · sections · 3D</p>
          <h2>The design should work in a render <em>and</em> on a drawing sheet.</h2>
        </div>
        <div className="adu-drawing-table">
          <figure className="adu-sheet adu-sheet-plan"><Image src="/adu/adu-floor-plan.svg" alt="Detached ADU floor plan drawing showing bedroom, bathroom, living area and kitchen" fill sizes="(max-width: 900px) 100vw, 58vw" /><figcaption>Detached ADU · floor plan</figcaption></figure>
          <figure className="adu-sheet adu-sheet-elev"><Image src="/adu/adu-elevations.svg" alt="Architectural elevation drawings for a modern detached ADU" fill sizes="(max-width: 900px) 100vw, 36vw" /><figcaption>Exterior elevations</figcaption></figure>
          <figure className="adu-sheet adu-sheet-section"><Image src="/adu/adu-sections.svg" alt="Architectural building sections for a modern ADU" fill sizes="(max-width: 900px) 100vw, 42vw" /><figcaption>Building sections</figcaption></figure>
          <figure className="adu-sheet adu-sheet-render"><Image src="/adu/adu-living.svg" alt="Photoreal open plan ADU living room and kitchen visualization" fill sizes="(max-width: 900px) 100vw, 52vw" /><figcaption>Interior visualization</figcaption></figure>
        </div>
      </section>

      <section className="adu-section adu-package">
        <div className="adu-wrap adu-package-grid">
          <div>
            <p className="adu-kicker">What can be included</p>
            <h2>A coordinated ADU design package—not a mystery bundle.</h2>
            <p className="adu-muted">The exact deliverables are defined in writing around your project stage and the information available.</p>
          </div>
          <ul className="adu-deliverables">{deliverables.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
        </div>
      </section>

      <section className="adu-section adu-garage adu-wrap">
        <div className="adu-garage-copy">
          <p className="adu-kicker">Garage conversions</p>
          <h2>Already have a garage? Start there.</h2>
          <p>A garage conversion ADU starts with what already exists. We can turn verified dimensions, existing drawings and photographs into an existing-condition base, develop the proposed layout and coordinate the architectural drawings and 3D views around that conversion.</p>
          <Link href="/garage-conversion-plans" className="adu-btn adu-btn-primary">Garage conversion plans</Link>
        </div>
        <figure className="adu-garage-sheet"><Image src="/adu/adu-garage-plan.svg" alt="Garage conversion ADU floor plan with one bedroom, bathroom, kitchen and living space" fill sizes="(max-width: 900px) 100vw, 50vw" /><figcaption>Garage conversion ADU · proposed floor plan study</figcaption></figure>
      </section>

      <section className="adu-section adu-process adu-wrap">
        <div className="adu-section-head"><p className="adu-kicker">From “I have this” to “make me that”</p><h2>Send what you already have.</h2></div>
        <div className="adu-process-row">
          <article><b>Sketch / PDF</b><p>Hand sketch, rough layout, old plan or marked-up PDF.</p></article>
          <span className="adu-process-arrow">→</span>
          <article><b>Floor plan / Revit</b><p>Develop the layout and coordinated architectural information.</p></article>
          <span className="adu-process-arrow">→</span>
          <article><b>3D / drawing package</b><p>See the ADU clearly and move the agreed documentation into local coordination.</p></article>
        </div>
      </section>

      <section className="adu-section adu-boundary">
        <div className="adu-wrap adu-boundary-grid">
          <p className="adu-kicker">Trust matters more than pretending</p>
          <div><h2>Remote design support. Local responsibility stays local.</h2><p>Artimist provides design, drafting, visualization and permit-documentation support. Requirements differ by U.S. state, city and project. Where code verification, structural engineering, professional stamping/signing or jurisdiction-specific submission responsibility must be performed by a locally licensed professional, that responsibility remains with the appropriate local party. We can coordinate with your contractor, architect or engineer rather than implying remote production replaces local licensure.</p></div>
        </div>
      </section>

      <section className="adu-section adu-faq adu-wrap">
        <div className="adu-section-head"><p className="adu-kicker">ADU questions homeowners actually ask</p><h2>Before you send the plans.</h2></div>
        <div className="adu-faq-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="adu-section adu-related adu-wrap">
        <p className="adu-kicker">Continue by problem</p>
        <div className="adu-related-links">
          <Link href="/garage-conversion-plans">Garage conversion plans</Link>
          <Link href="/home-addition-plans">Home addition plans</Link>
          <Link href="/3d-house-design">See your house in 3D</Link>
          <Link href="/floor-plan-to-3d-rendering">Floor plan to 3D</Link>
          <Link href="/permit-drawing-services">Permit drawing support</Link>
          <Link href="/sketch-to-floor-plan-service">Sketch to floor plan</Link>
        </div>
      </section>

      <section className="adu-final">
        <Image className="adu-final-bg" src="/adu/adu-hero.svg" alt="" fill sizes="100vw" aria-hidden="true" />
        <div className="adu-final-shade" />
        <div className="adu-final-copy adu-wrap">
          <p className="adu-kicker">Have a sketch, plan or property idea?</p>
          <h2>Show us what you have.<br />We’ll help make the ADU visible.</h2>
          <Link className="adu-btn adu-btn-primary" href="/contact">Start the ADU conversation</Link>
        </div>
      </section>
    </main>
  );
}
