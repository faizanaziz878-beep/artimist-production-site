import Link from "next/link";
import { GeneratedStudyStrip } from "./generated-architecture-gallery";
import type { GeneratedArchitectureCategory } from "../lib/generated-architecture";

const BASE = "https://www.artimistproductions.com";
const WHATSAPP = "https://wa.me/18078084181";

type Step = { title: string; text: string };
type FAQ = { q: string; a: string };
type Related = { href: string; label: string };
type Visual = { image: string; alt: string; caption: string };

export type HomeownerServicePageProps = {
  slug: string;
  serviceName: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  intro: string;
  audience: string;
  image: string;
  imageAlt: string;
  included: string[];
  deliverables: string[];
  steps: Step[];
  faqs: FAQ[];
  related: Related[];
  permitNotice?: string;
};

const CSS = `
.hsp{min-height:100vh;background:#090809;color:#eee8e3;font-family:Arial,Helvetica,sans-serif;line-height:1.65;overflow:hidden}.hsp *{box-sizing:border-box}.hsp a{color:inherit}.hsp-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}.hsp-nav{padding:94px 0 20px;font-size:12px;color:#a89d97}.hsp-nav a{text-decoration:none}.hsp-hero{display:grid;grid-template-columns:1.02fr .98fr;gap:54px;align-items:center;padding:34px 0 68px}.hsp-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c95469;font-weight:700}.hsp h1,.hsp h2,.hsp h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.hsp h1{font-size:clamp(46px,6vw,80px);line-height:1.01;margin:16px 0 22px;letter-spacing:-.04em}.hsp-sub{font-family:Georgia,'Times New Roman',serif;font-size:clamp(22px,2.4vw,31px);line-height:1.34;color:#d9cec7;max-width:25ch}.hsp-intro{font-size:17px;color:#bdb2ac;max-width:64ch;margin-top:24px}.hsp-audience{font-size:14px;color:#958b86;margin-top:18px}.hsp-hero-media{position:relative;overflow:hidden;border-radius:18px;min-height:610px;margin:0;border:1px solid rgba(255,255,255,.12);background:#151213;box-shadow:0 32px 90px rgba(0,0,0,.5)}.hsp-hero-proof{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;animation:hspBreath 13s ease-in-out infinite alternate}.hsp-hero-media:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,5,.02) 42%,rgba(5,5,5,.78) 100%);pointer-events:none}.hsp-hero-tech{position:absolute;z-index:2;right:20px;bottom:20px;width:min(48%,260px);padding:8px;background:rgba(238,232,222,.94);box-shadow:0 18px 50px rgba(0,0,0,.48);transform:rotate(-1.2deg)}.hsp-hero-tech img{display:block;width:100%;height:170px;object-fit:cover;border:0}.hsp-hero-tech span{display:block;padding:8px 5px 3px;color:#2b2523;font-size:9px;letter-spacing:.14em;text-transform:uppercase}.hsp-hero-caption{position:absolute;z-index:2;left:20px;bottom:22px;max-width:42%;margin:0;color:#f1e9e4;font-size:10px;letter-spacing:.13em;text-transform:uppercase}.hsp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hsp-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:999px;text-decoration:none;font-size:12px;letter-spacing:.08em;text-transform:uppercase}.hsp-primary{background:#992636;color:white}.hsp-secondary{border:1px solid rgba(255,255,255,.2);color:#f0ebe7}.hsp-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;margin-bottom:28px}.hsp-strip div{padding:22px;background:#100e0f}.hsp-strip strong{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:18px;margin-bottom:4px}.hsp-strip span{font-size:13px;color:#938984}.hsp-needs{display:flex;gap:9px;overflow-x:auto;padding:0 0 58px;scrollbar-width:none}.hsp-needs::-webkit-scrollbar{display:none}.hsp-needs a{flex:0 0 auto;text-decoration:none;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:10px 14px;color:#c9beb8;font-size:12px}.hsp-sec{padding:58px 0;border-top:1px solid rgba(255,255,255,.09)}.hsp-sec h2{font-size:clamp(32px,4vw,48px);line-height:1.08;margin:0 0 26px}.hsp-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px}.hsp-list{display:grid;grid-template-columns:1fr 1fr;gap:12px;list-style:none;padding:0;margin:0}.hsp-list li{padding:16px 18px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.025);color:#cec4be}.hsp-visuals{padding:14px 0 72px}.hsp-visual-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:14px}.hsp-visual{margin:0;position:relative;overflow:hidden;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:#100e0f}.hsp-visual:first-child{grid-row:span 2}.hsp-visual img{width:100%;height:100%;min-height:260px;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}.hsp-visual:first-child img{min-height:560px}.hsp-visual:hover img{transform:scale(1.025)}.hsp-visual figcaption{position:absolute;left:14px;right:14px;bottom:14px;padding:9px 11px;border-radius:999px;background:rgba(8,8,8,.72);backdrop-filter:blur(10px);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#eee6e0}.hsp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.hsp-step{padding:24px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.02)}.hsp-step b{display:block;color:#c95469;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}.hsp-step h3{font-size:24px;margin:0 0 10px}.hsp-step p{color:#a79c96;margin:0}.hsp-faq details{border-top:1px solid rgba(255,255,255,.1);padding:20px 0}.hsp-faq summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:21px}.hsp-faq p{color:#aaa09a;max-width:74ch}.hsp-note{margin-top:22px;padding:18px 20px;border-left:3px solid #992636;background:rgba(153,38,54,.08);color:#b9aea8;font-size:14px}.hsp-related{display:flex;flex-wrap:wrap;gap:12px}.hsp-related a{text-decoration:none;border:1px solid rgba(255,255,255,.12);padding:10px 16px;border-radius:999px;color:#cfc5bf}.hsp-evidence{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.hsp-evidence a{text-decoration:none;padding:22px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#100e0f}.hsp-evidence h3{font-size:24px;margin:0 0 6px}.hsp-evidence span{font-size:12px;color:#9f948e}.hsp-cta{margin:42px 0 110px;padding:48px;border-radius:18px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(135deg,rgba(153,38,54,.2),rgba(255,255,255,.02));text-align:center}.hsp-cta h2{margin:0 0 10px;font-size:38px}.hsp-cta p{color:#a99e98;max-width:58ch;margin:0 auto 22px}@keyframes hspBreath{from{transform:scale(1.01)}to{transform:scale(1.045)}}@media(max-width:820px){.hsp-wrap{width:min(100% - 28px,1180px)}.hsp-nav{padding-top:82px}.hsp-hero,.hsp-grid{grid-template-columns:1fr}.hsp-hero-media{min-height:500px}.hsp-strip,.hsp-steps,.hsp-evidence{grid-template-columns:1fr}.hsp-list{grid-template-columns:1fr}.hsp-hero{gap:32px;padding-top:20px}.hsp-hero-tech{width:46%}.hsp-hero-caption{max-width:44%}.hsp-visual-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:10px;margin-right:-14px;padding-right:14px;scrollbar-width:none}.hsp-visual-grid::-webkit-scrollbar{display:none}.hsp-visual,.hsp-visual:first-child{flex:0 0 86vw;grid-row:auto;scroll-snap-align:center}.hsp-visual img,.hsp-visual:first-child img{min-height:62vw;height:62vw}.hsp-cta{padding:34px 22px}.hsp-sec{padding:48px 0}.hsp-needs{padding-bottom:46px}}@media(max-width:520px){.hsp-hero-media{min-height:440px;border-radius:12px}.hsp-hero-tech{right:12px;bottom:12px;width:52%;padding:6px}.hsp-hero-tech img{height:124px}.hsp-hero-caption{left:14px;bottom:15px;max-width:38%;font-size:8px}.hsp-actions .hsp-btn{width:100%}}@media(prefers-reduced-motion:reduce){.hsp-hero-proof{animation:none}.hsp-visual img{transition:none}}
`;

function evidenceFor(slug: string): Related[] {
  if (slug === "custom-house-design" || slug === "plan-modification-service") return [
    { href: "/case-studies/residential-exterior-design", label: "Residential Exterior Design & Visualization" },
    { href: "/case-studies/home-interior-design", label: "Whole-Home Interior Design & 3D Visualization" },
  ];
  if (slug === "3d-interior-design-service") return [
    { href: "/case-studies/home-interior-design", label: "Whole-Home Interior Design & 3D Visualization" },
    { href: "/case-studies/residential-exterior-design", label: "Residential Exterior Design & Visualization" },
  ];
  return [
    { href: "/case-studies/permit-application-packages", label: "Permit Application Drawing Packages" },
    { href: "/case-studies/rv-park-design", label: "RV Park Design & Site Planning" },
  ];
}

function visualsFor(slug: string): Visual[] {
  if (slug === "custom-house-design") return [
    { image: "/graphics/custom-house-floor-plan-design.svg", alt: "Custom house floor plan design study", caption: "Floor plan + spatial planning" },
    { image: "/img/resext03.webp", alt: "Contemporary residential exterior design by Artimist", caption: "Exterior design direction" },
    { image: "/img/resid01.webp", alt: "Residential architecture and interior visualization", caption: "From plan to built atmosphere" },
  ];
  if (slug === "3d-interior-design-service") return [
    { image: "/graphics/3d-interior-design-visualization.svg", alt: "3D interior design visualization study", caption: "Layout + materials + light" },
    { image: "/img/homeint03.webp", alt: "Photoreal home interior visualization", caption: "Whole-home visualization" },
    { image: "/img/drive-09.webp", alt: "Warm contemporary interior design visualization", caption: "See the room before building" },
  ];
  if (slug === "plan-modification-service") return [
    { image: "/graphics/house-plan-modification-before-after.svg", alt: "Before and after house plan modification diagram", caption: "Existing plan → refined layout" },
    { image: "/img/resid02.webp", alt: "Residential layout and design refinement", caption: "Improve circulation + room relationships" },
    { image: "/img/homeint01.webp", alt: "Interior layout planning and visualization", caption: "Test the change in 3D" },
  ];
  return [
    { image: "/graphics/residential-renovation-permit-drawings.svg", alt: "Residential renovation and permit drawing study", caption: "Plans + elevations + technical coordination" },
    { image: "/img/permit01.webp", alt: "Residential permit application drawing package", caption: "Permit-documentation support" },
    { image: "/img/permit04.webp", alt: "Detailed residential construction drawing sheet", caption: "Clear review-ready information" },
  ];
}

const NEEDS: Related[] = [
  { href: "/custom-house-design", label: "Design my house" },
  { href: "/3d-interior-design-service", label: "Design my interior" },
  { href: "/plan-modification-service", label: "Change my floor plan" },
  { href: "/residential-renovation-permit-drawings", label: "Plan a renovation" },
  { href: "/visualization", label: "Make a 3D render" },
  { href: "/architectural-drafting-services", label: "Prepare drawings" },
];

const STUDY_CATEGORY: Record<string, GeneratedArchitectureCategory> = {
  "custom-house-design": "architecture",
  "3d-interior-design-service": "interiors",
  "plan-modification-service": "drawings",
  "residential-renovation-permit-drawings": "technical",
};

export function HomeownerServicePage(props: HomeownerServicePageProps) {
  const evidence = evidenceFor(props.slug);
  const visuals = visualsFor(props.slug);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: props.serviceName, description: props.intro, url: `${BASE}/${props.slug}`, provider: { "@type": "Organization", name: "Artimist Productions", url: BASE }, areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"], audience: { "@type": "Audience", audienceType: "Homeowners, architects, developers and design clients" } },
      { "@type": "FAQPage", mainEntity: props.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` }, { "@type": "ListItem", position: 2, name: props.serviceName, item: `${BASE}/${props.slug}` }] },
    ],
  };

  return (
    <main className="hsp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="hsp-wrap">
        <nav className="hsp-nav" aria-label="Breadcrumb"><Link href="/">Home</Link> / {props.serviceName}</nav>
        <section className="hsp-hero"><div><div className="hsp-eyebrow">{props.eyebrow}</div><h1>{props.h1}</h1><div className="hsp-sub">{props.subtitle}</div><p className="hsp-intro">{props.intro}</p><p className="hsp-audience">{props.audience}</p><div className="hsp-actions"><Link className="hsp-btn hsp-primary" href="/contact">Get a project quote</Link><a className="hsp-btn hsp-secondary" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp the studio</a></div></div><figure className="hsp-hero-media"><img className="hsp-hero-proof" src={visuals[1].image} alt={visuals[1].alt} width="1200" height="1500" fetchPriority="high" decoding="async" /><figcaption className="hsp-hero-caption">Artimist project work / {props.serviceName}</figcaption><div className="hsp-hero-tech"><img src={props.image} alt={props.imageAlt} width="800" height="540" decoding="async" /><span>Technical study / project logic</span></div></figure></section>
        <div className="hsp-strip" aria-label="Service advantages"><div><strong>Designed around your project</strong><span>No generic stock-plan workflow.</span></div><div><strong>Visual before you build</strong><span>3D support is available where useful.</span></div><div><strong>International collaboration</strong><span>Remote project delivery for clients worldwide.</span></div></div>
        <div className="hsp-needs" aria-label="Common project needs">{NEEDS.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <section className="hsp-sec hsp-grid"><div><div className="hsp-eyebrow">Scope</div><h2>What the service can include</h2></div><ul className="hsp-list">{props.included.map((x) => <li key={x}>{x}</li>)}</ul></section>
        <section className="hsp-visuals" aria-label="Visual examples"><div className="hsp-visual-grid">{visuals.map((v) => <figure className="hsp-visual" key={v.image}><img src={v.image} alt={v.alt} loading="lazy" /><figcaption>{v.caption}</figcaption></figure>)}</div></section>
        <GeneratedStudyStrip slug={props.slug} category={STUDY_CATEGORY[props.slug] || "architecture"} title="Drawn at a buildable scale." />
        <section className="hsp-sec hsp-grid"><div><div className="hsp-eyebrow">Deliverables</div><h2>What you can receive</h2></div><ul className="hsp-list">{props.deliverables.map((x) => <li key={x}>{x}</li>)}</ul></section>
        <section className="hsp-sec"><div className="hsp-eyebrow">Process</div><h2>A clear path from idea to drawings</h2><div className="hsp-steps">{props.steps.map((s, i) => <article className="hsp-step" key={s.title}><b>Step {i + 1}</b><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>{props.permitNotice ? <div className="hsp-note">{props.permitNotice}</div> : null}</section>
        <section className="hsp-sec"><div className="hsp-eyebrow">Project evidence</div><h2>See related Artimist work</h2><div className="hsp-evidence">{evidence.map((item) => <Link key={item.href} href={item.href}><h3>{item.label}</h3><span>Open case study</span></Link>)}</div></section>
        <section className="hsp-sec hsp-faq"><div className="hsp-eyebrow">Questions</div><h2>Frequently asked</h2>{props.faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>
        <section className="hsp-sec"><div className="hsp-eyebrow">Related expertise</div><h2>More ways we can help</h2><div className="hsp-related">{props.related.map((r) => <Link key={r.href} href={r.href}>{r.label}</Link>)}<Link href="/home-design-services">Home Design Services</Link><Link href="/international">International Projects</Link><Link href="/case-studies">All Case Studies</Link></div></section>
        <section className="hsp-cta"><h2>Tell us what you want to change or build.</h2><p>Send your sketch, existing plan, inspiration images or project brief. We’ll review the material and recommend the right next step.</p><div className="hsp-actions" style={{ justifyContent: "center" }}><a className="hsp-btn hsp-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Talk to the studio on WhatsApp</a></div></section>
      </div>
    </main>
  );
}
