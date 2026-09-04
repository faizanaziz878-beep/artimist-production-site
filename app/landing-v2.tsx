import Link from "next/link";
import type { Metadata } from "next";
import { getLandingPage, resolveLink, type LandingPage } from "../lib/landing-content";
import { serviceVisuals, type ServiceVisualFamily } from "../lib/service-visuals";
import { UiIcon } from "./ui-icon";

const BASE = "https://www.artimistproductions.com";
const WHATSAPP_NUMBER = "18078084181";
const EMAIL = "Faizan@artimistproductions.com";

const WORKING_STANDARD = [
  ["Scope", "Agreed before production"],
  ["Reviews", "Milestones and revisions defined"],
  ["Handover", "Formats listed in writing"],
  ["Local approvals", "Licensed stamps stay local"],
] as const;

export function landingMetadataV2(slug: string): Metadata {
  const page = getLandingPage(slug);
  if (!page) return {};
  const hero = serviceVisuals(page.slug).hero.src;
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

function LandingDiagram({ family }: { family: ServiceVisualFamily }) {
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
  const visuals = serviceVisuals(page.slug);
  const family = visuals.family;
  const hero = visuals.hero.src;
  const hub = page.parentHub ? getLandingPage(page.parentHub) : undefined;
  const contactHref = `/contact?service=${encodeURIComponent(page.name)}`;
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Artimist team — I am interested in ${page.name}. I would like to discuss my project.`)}`;
  const shortIntro = Array.from(new Intl.Segmenter("en", { granularity: "sentence" }).segment(page.intro))[0]?.segment.trim() ?? page.intro;
  const shortAudience = Array.from(new Intl.Segmenter("en", { granularity: "sentence" }).segment(page.forWho))[0]?.segment.trim() ?? page.forWho;

  return <main className="lp2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(page)) }} />

    <section className="lp2-hero">
      <img className="lp2-hero-image" src={hero} alt={visuals.hero.alt} fetchPriority="high" />
      <div className="lp2-hero-shade" />
      <div className="lp2-hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="lp2-hero-diagram" aria-hidden="true"><LandingDiagram family={family} /></div>
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
      <figure className="lp2-hero-proof"><img src={visuals.evidence[0].src} alt={visuals.evidence[0].alt} width="760" height="570" loading="eager" decoding="async" /><figcaption>{visuals.evidence[0].caption}</figcaption></figure>
    </section>

    <section className="lp2-intro" id="scope">
      <div><span className="lp2-kicker">What this solves</span><h2>Clear scope.<br/><em>Useful output.</em></h2></div>
      <div><p className="lp2-lead">{shortIntro}</p><p>{shortAudience}</p><details className="lp2-scope-details"><summary>Full service overview and audience</summary><p>{page.intro}</p><p>{page.forWho}</p></details></div>
    </section>

    <section className="lp2-opening-proof" tabIndex={0} aria-label={`${page.name} project imagery`}>{visuals.evidence.map((shot,index)=><figure key={`${shot.src}-${index}`}><img src={shot.src} alt={shot.alt} width="1200" height="900" loading={index === 0 ? "eager" : "lazy"} decoding="async" /><figcaption>0{index + 1} / {shot.caption}</figcaption></figure>)}</section>
    <p className="lp2-swipe-hint" aria-hidden="true">Swipe to follow the visual sequence · 01—{String(visuals.evidence.length).padStart(2,"0")}</p>

    <section className="lp2-standard" aria-label="Working and commercial standards">
      <span className="lp2-kicker">Working standard</span>
      <div>{WORKING_STANDARD.map(([title, copy]) => <p key={title}><strong>{title}</strong><span>{copy}</span></p>)}</div>
      <Link href="/legal">Read full client terms <UiIcon name="arrow" size={14}/></Link>
    </section>

    <section className="lp2-split">
      <div className="lp2-split-copy"><span className="lp2-kicker">Problems we solve</span><h2>Where we become useful.</h2><ul>{page.problems.map((item) => <li key={item}><UiIcon name="check" size={15}/><span>{item}</span></li>)}</ul></div>
      <div className="lp2-split-visual">
        <img className="lp2-generated-visual" src={visuals.evidence[1].src} alt={visuals.evidence[1].alt} loading="lazy" decoding="async" />
        <span className="lp2-visual-caption">{visuals.visualCaption}</span>
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
      <header><span className="lp2-kicker">Working route</span><h2>How the project moves.</h2></header><p className="lp2-example-note">Selected visuals illustrate the stages; they are not a single-project before-and-after sequence. Concept studies are not issued construction documents.</p>
      <div>{page.workflow.map((step,index)=>{const shot=visuals.process[index];return <article key={step.h}><img className="lp2-step-art" src={shot.src} alt={shot.alt} loading="lazy" /><small>0{index+1}</small><h3>{step.h}</h3><p>{step.p}</p></article>;})}</div>
      {page.quality && <aside><span className="lp2-kicker">Quality control</span><p>{page.quality}</p></aside>}
    </section>

    {page.software && <section className="lp2-software"><span className="lp2-kicker">Software / capabilities</span><div>{page.software.map((item)=><span key={item}>{item}</span>)}</div></section>}

    <section className="lp2-proof">
      <header><span className="lp2-kicker">Related projects</span><h2>Explore the work in context.</h2></header>
      <div className="lp2-case-links">{visuals.caseStudies.map(([label,href])=><Link key={href} href={href}><span>{label}</span><UiIcon name="arrow" size={16}/></Link>)}</div>
    </section>

    <section className="lp2-faq">
      <header><span className="lp2-kicker">Before we start</span><h2>Useful answers.</h2></header>
      <div>{page.faqs.map((faq)=><details key={faq.q}><summary>{faq.q}<UiIcon name="chevron" size={16}/></summary><p>{faq.a}</p></details>)}</div>
    </section>

    <section className="lp2-cta">
      <div><span className="lp2-kicker">Your project / next step</span><h2>Send what you have.<br/><em>We’ll find the next move.</em></h2><p>A plan, model, survey or rough brief is enough to begin.</p></div>
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
