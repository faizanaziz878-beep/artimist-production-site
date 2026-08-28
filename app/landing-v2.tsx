import Link from "next/link";
import type { Metadata } from "next";
import { getLandingPage, resolveLink, type LandingPage } from "../lib/landing-content";
import { UiIcon } from "./ui-icon";
import { GeneratedStudyStrip } from "./generated-architecture-gallery";
import type { GeneratedArchitectureCategory } from "../lib/generated-architecture";

const BASE = "https://www.artimistproductions.com";
const WHATSAPP_NUMBER = "18078084181";
const EMAIL = "Faizan@artimistproductions.com";

type Family = "architecture" | "bim" | "visualization";
type Shot = { src: string; alt: string };

const STUDY_CATEGORY: Record<string, GeneratedArchitectureCategory> = {
  architecture: "architecture",
  "bim-drafting": "drawings",
  visualization: "interiors",
  "architectural-drafting-services": "drawings",
  "revit-drafting-services": "technical",
  "bim-modeling-services": "technical",
  "permit-drawing-services": "drawings",
  "construction-documentation-services": "technical",
  "architectural-visualization-services": "interiors",
};

const FAMILY: Record<string, Family> = {
  architecture: "architecture",
  "permit-drawing-services": "architecture",
  "construction-documentation-services": "architecture",
  "bim-drafting": "bim",
  "architectural-drafting-services": "bim",
  "revit-drafting-services": "bim",
  "bim-modeling-services": "bim",
  visualization: "visualization",
  "architectural-visualization-services": "visualization",
};

const HERO_IMAGE: Record<string, string> = {
  architecture: "/media/atlas/atlas-11.webp",
  "bim-drafting": "/media/atlas/atlas-08.webp",
  visualization: "/media/atlas/atlas-07.webp",
  "architectural-drafting-services": "/media/technical/board-16.webp",
  "revit-drafting-services": "/media/atlas/atlas-13.webp",
  "bim-modeling-services": "/media/atlas/atlas-14.webp",
  "permit-drawing-services": "/img/permit01.webp",
  "construction-documentation-services": "/media/technical/board-19.webp",
  "architectural-visualization-services": "/media/atlas/atlas-06.webp",
};

const PROOF: Record<Family, Shot[]> = {
  architecture: [
    { src: "/img/rvpark.webp", alt: "RV park site planning and architectural visualization by Artimist Productions" },
    { src: "/img/permit01.webp", alt: "Permit application drawing package prepared by Artimist Productions" },
    { src: "/media/atlas/atlas-16.webp", alt: "Community architecture study with landscape and arrival sequence" },
  ],
  bim: [
    { src: "/media/technical/board-16.webp", alt: "Architectural systems technical drawing plate" },
    { src: "/media/technical/board-19.webp", alt: "Coordinated architectural technical documentation plate" },
    { src: "/img/permit01.webp", alt: "Permit documentation package prepared for project review" },
  ],
  visualization: [
    { src: "/img/resext03.webp", alt: "Residential exterior architectural visualization among pine trees" },
    { src: "/img/homeint03.webp", alt: "Warm contemporary residential interior visualization" },
    { src: "/media/atlas/atlas-06.webp", alt: "Waterfront cultural architecture visualization at sunset" },
  ],
};

const CASE_STUDIES: Record<Family, Array<[string, string]>> = {
  architecture: [
    ["RV park design and site planning", "/case-studies/rv-park-design"],
    ["Permit application drawing packages", "/case-studies/permit-application-packages"],
  ],
  bim: [
    ["Permit application drawing packages", "/case-studies/permit-application-packages"],
    ["Residential exterior design and documentation", "/case-studies/residential-exterior-design"],
  ],
  visualization: [
    ["Whole-home interior design and visualization", "/case-studies/home-interior-design"],
    ["Residential exterior design and visualization", "/case-studies/residential-exterior-design"],
  ],
};

const GENERATED_VISUAL: Partial<Record<Family, Shot>> = {
  bim: {
    src: "/media/generated/bim-coordination-collage-v1.svg",
    alt: "Architectural BIM coordination collage combining model views, technical linework and material studies",
  },
  visualization: {
    src: "/media/generated/visual-direction-collage-v1.svg",
    alt: "Architectural visualization direction board combining atmosphere, light, material and camera studies",
  },
};

const TRUST = [
  ["Work to your standard", "Templates, title blocks, naming and output are aligned before production starts."],
  ["Native files stay yours", "Editable source files are handed back when they form part of the agreed scope."],
  ["Review before delivery", "The output is checked for consistency before it leaves the studio."],
  ["Local requirements stay honest", "Where local licensure or a professional seal is required, we coordinate rather than overclaim."],
] as const;

export function landingMetadataV2(slug: string): Metadata {
  const page = getLandingPage(slug);
  if (!page) return {};
  const hero = HERO_IMAGE[page.slug] || "/media/hero-night.webp";
  return {
    title: page.title,
    description: page.desc,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.desc,
      url: `${BASE}/${page.slug}`,
      type: "website",
      images: [{ url: hero, alt: `${page.name} — Artimist Productions` }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.desc,
      images: [hero],
    },
  };
}

function structuredData(page: LandingPage) {
  const crumbs = [{ name: "Home", url: BASE }];
  if (page.parentHub) {
    const hub = getLandingPage(page.parentHub);
    if (hub) crumbs.push({ name: hub.name, url: `${BASE}/${hub.slug}` });
  }
  crumbs.push({ name: page.name, url: `${BASE}/${page.slug}` });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
      {
        "@type": "Service",
        name: page.h1,
        serviceType: page.name,
        description: page.desc,
        url: `${BASE}/${page.slug}`,
        provider: { "@id": `${BASE}/#organization` },
        areaServed: ["Worldwide", "United States", "United Kingdom", "Canada"],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}

function LandingDiagram({ family }: { family: Family }) {
  if (family === "bim") {
    return <svg className="lp2-diagram" viewBox="0 0 720 460" role="img" aria-label="BIM coordination diagram">
      <g className="lp2-diagram-grid"><path d="M60 80H660M60 160H660M60 240H660M60 320H660M140 40V400M260 40V400M380 40V400M500 40V400M620 40V400" /></g>
      <g className="lp2-diagram-main"><path d="M125 335V112h170v70h126v-98h174v251H125Z"/><path d="M125 248h470M295 112v223M421 182v153M500 84v251"/><circle cx="209" cy="180" r="28"/><circle cx="548" cy="162" r="36"/><path d="M183 290h70M455 290h96"/></g>
      <g className="lp2-diagram-accent"><path d="M100 365h520M100 355v20M620 355v20"/><path d="M645 75v265M635 75h20M635 340h20"/></g>
    </svg>;
  }
  if (family === "visualization") {
    return <svg className="lp2-diagram" viewBox="0 0 720 460" role="img" aria-label="Architectural visualization camera and composition diagram">
      <g className="lp2-diagram-grid"><path d="M80 80H640M80 160H640M80 240H640M80 320H640M160 50V390M280 50V390M400 50V390M520 50V390" /></g>
      <g className="lp2-diagram-main"><path d="M170 320 280 176l110 86 78-110 94 168H170Z"/><path d="M112 250 312 155M112 250l200 95"/><circle cx="108" cy="250" r="28"/><path d="M80 250H40M108 222v-40"/></g>
      <g className="lp2-diagram-accent"><rect x="238" y="120" width="300" height="214" rx="4"/><path d="M238 227h300M388 120v214"/></g>
    </svg>;
  }
  return <svg className="lp2-diagram" viewBox="0 0 720 460" role="img" aria-label="Architectural planning diagram">
    <g className="lp2-diagram-grid"><path d="M70 80H650M70 160H650M70 240H650M70 320H650M150 45V400M270 45V400M390 45V400M510 45V400M630 45V400" /></g>
    <g className="lp2-diagram-main"><path d="M148 330V112h205v72h214v146H148Z"/><path d="M148 222h419M353 112v218M464 184v146"/><path d="M196 112v48M244 112v48M506 184v62"/></g>
    <g className="lp2-diagram-accent"><path d="M120 360h475M120 350v20M595 350v20"/><path d="M610 100v240M600 100h20M600 340h20"/></g>
  </svg>;
}

export function LandingPageV2({ slug }: { slug: string }) {
  const page = getLandingPage(slug)!;
  const family = FAMILY[page.slug] || "architecture";
  const hero = HERO_IMAGE[page.slug] || "/media/atlas/atlas-06.webp";
  const hub = page.parentHub ? getLandingPage(page.parentHub) : undefined;
  const contactHref = `/contact?service=${encodeURIComponent(page.name)}`;
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Artimist team — I am interested in ${page.name}. I would like to discuss my project.`)}`;

  return <main className="lp2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(page)) }} />

    <section className="lp2-hero">
      <img className="lp2-hero-image" src={hero} alt="" fetchPriority="high" />
      <div className="lp2-hero-shade" />
      <div className="lp2-hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="lp2-hero-copy">
        <nav className="lp2-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>{hub && <><Link href={`/${hub.slug}`}>{hub.name}</Link><span>/</span></>}<b>{page.name}</b>
        </nav>
        <span className="lp2-kicker">{page.kind === "hub" ? "Practice" : "Service"} / {page.primaryKeyword}</span>
        <h1>{page.h1}</h1>
        <p className="lp2-tagline">{page.tagline}</p>
        <div className="lp2-hero-actions">
          <Link className="lp2-primary" href={contactHref}>Send project for review <UiIcon name="arrow" size={16} /></Link>
          <Link className="lp2-secondary" href="#scope">See scope <UiIcon name="chevron" size={15} /></Link>
        </div>
      </div>
      <div className="lp2-hero-diagram" aria-hidden="true"><LandingDiagram family={family} /></div>
    </section>

    <section className="lp2-intro" id="scope">
      <div><span className="lp2-kicker">What this solves</span><h2>Clear scope.<br/><em>Useful output.</em></h2></div>
      <div><p className="lp2-lead">{page.intro}</p><p>{page.forWho}</p></div>
    </section>

    <GeneratedStudyStrip slug={page.slug} category={STUDY_CATEGORY[page.slug] || "architecture"} title="A visual language for the work." />

    <section className="lp2-trust" aria-label="Working commitments">
      {TRUST.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
    </section>

    <section className="lp2-split">
      <div className="lp2-split-copy"><span className="lp2-kicker">Problems we solve</span><h2>Where we become useful.</h2><ul>{page.problems.map((item) => <li key={item}><UiIcon name="check" size={15}/><span>{item}</span></li>)}</ul></div>
      <div className="lp2-split-visual">
        {GENERATED_VISUAL[family]
          ? <img className="lp2-generated-visual" src={GENERATED_VISUAL[family]!.src} alt={GENERATED_VISUAL[family]!.alt} loading="lazy" />
          : <LandingDiagram family={family} />}
        <span className="lp2-visual-caption">{family === "bim" ? "Model / coordinate / document" : family === "visualization" ? "Compose / light / resolve" : "Plan / test / coordinate"}</span>
      </div>
    </section>

    <section className="lp2-deliverables">
      <header><span className="lp2-kicker">Scope / outputs</span><h2>{page.kind === "hub" ? "What this practice covers." : "What can be included."}</h2></header>
      <div className="lp2-chip-grid">{page.included.map((item, index) => <div key={item}><small>{String(index + 1).padStart(2,"0")}</small><strong>{item}</strong></div>)}</div>
      {(page.inputs || page.deliverables) && <div className="lp2-input-output">
        {page.inputs && <article><span className="lp2-kicker">You can send</span><ul>{page.inputs.map((item)=><li key={item}>{item}</li>)}</ul></article>}
        {page.deliverables && <article><span className="lp2-kicker">You can receive</span><ul>{page.deliverables.map((item)=><li key={item}>{item}</li>)}</ul></article>}
      </div>}
    </section>

    <section className="lp2-process">
      <header><span className="lp2-kicker">Working route</span><h2>How the project moves.</h2></header>
      <div>{page.workflow.map((step,index)=><article key={step.h}><img className="lp2-step-art" src={PROOF[family][index % PROOF[family].length].src} alt="" loading="lazy" /><small>0{index+1}</small><h3>{step.h}</h3><p>{step.p}</p></article>)}</div>
      {page.quality && <aside><span className="lp2-kicker">Quality control</span><p>{page.quality}</p></aside>}
    </section>

    {page.software && <section className="lp2-software"><span className="lp2-kicker">Software / capabilities</span><div>{page.software.map((item)=><span key={item}>{item}</span>)}</div></section>}

    <section className="lp2-proof">
      <header><span className="lp2-kicker">Project evidence</span><h2>Real work, not stock proof.</h2></header>
      <div className="lp2-proof-grid">{PROOF[family].map((shot,index)=><figure key={shot.src}><img src={shot.src} alt={shot.alt} loading="lazy"/><figcaption><small>0{index+1}</small><span>{shot.alt}</span></figcaption></figure>)}</div>
      <div className="lp2-case-links">{CASE_STUDIES[family].map(([label,href])=><Link key={href} href={href}><span>{label}</span><UiIcon name="arrow" size={16}/></Link>)}</div>
    </section>

    <section className="lp2-faq">
      <header><span className="lp2-kicker">Before we start</span><h2>Useful answers.</h2></header>
      <div>{page.faqs.map((faq)=><details key={faq.q}><summary>{faq.q}<UiIcon name="chevron" size={16}/></summary><p>{faq.a}</p></details>)}</div>
    </section>

    <section className="lp2-cta">
      <div><span className="lp2-kicker">Your project / next step</span><h2>Send what you have.<br/><em>We will locate the next move.</em></h2><p>Plans, a model, a survey, references or a rough brief are enough to start. The intake keeps your service context and lets you share secure cloud-file links.</p></div>
      <div className="lp2-cta-actions">
        <Link className="lp2-primary" href={contactHref}>Send project for review <UiIcon name="arrow" size={16}/></Link>
        <a className="lp2-secondary" href={whatsapp} target="_blank" rel="noopener noreferrer">Talk on WhatsApp <UiIcon name="external" size={15}/></a>
        <a className="lp2-email" href={`mailto:${EMAIL}?subject=${encodeURIComponent(`${page.name} project enquiry`)}`}>{EMAIL}</a>
      </div>
    </section>

    <section className="lp2-related">
      <span className="lp2-kicker">Related capability</span>
      <div>{page.related.map((related)=>{const link=resolveLink(related);return <Link href={link.href} key={related}><span>{link.name}</span><UiIcon name="arrow" size={15}/></Link>;})}</div>
    </section>
  </main>;
}
