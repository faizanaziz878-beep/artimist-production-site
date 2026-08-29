import Link from "next/link";
import { UiIcon } from "../ui-icon";

type Body = { h: string; p: string };
type PartnerVisual = { src: string; alt: string; caption: string };
export type Partner = { slug: string; name: string; kicker: string; ceo: string; initials: string; ceoTitle: string; ownerImage: string; ownerImageAlt: string; accent: string; tagline: string; intro: string; body: Body[]; services: string[]; cta: string; visuals: PartnerVisual[] };

export const PARTNER_ORDER = ["decoding-bits", "scallance"];

export const PARTNERS: Record<string, Partner> = {
  "decoding-bits": {
    slug: "decoding-bits", name: "Decoding Bits", kicker: "Technology & Software Engineering Partner",
    ceo: "Furqan A", initials: "FA", ceoTitle: "Founder & Chief Executive Officer", ownerImage: "/media/partners/furqan-a.jpg", ownerImageAlt: "Furqan A., founder and chief executive officer of Decoding Bits", accent: "linear-gradient(135deg,#2a0e14,#5a1622 55%,#7a1f2e)",
    tagline: "The engineering layer behind the experience.",
    intro: "Decoding Bits is Artimist Productions’ technology and software engineering partner. Where Artimist shapes how a space looks and feels, Decoding Bits builds the systems that carry that work to the world — the websites, web apps, interactive tools and automation that turn a portfolio into a working business.",
    body: [
      { h: "What they build", p: "Decoding Bits designs and develops custom software: marketing and portfolio websites, web and mobile applications, client dashboards, and back-office automation. The team works across the full stack, from interface to infrastructure, and cares about the same thing Artimist does — that the final product is fast, clean and considered." },
      { h: "How we work together", p: "Decoding Bits maintains and extends Artimist’s digital presence and internal tooling: the production site, real-time visualization delivery, lead-capture flows and the automation that keeps projects moving. When a client needs an interactive product to sit alongside a visualization — a configurator, a virtual-tour front end or a booking flow — Decoding Bits is who we build it with." },
      { h: "Why it matters", p: "Beautiful renders do not grow a studio on their own; the machine around them matters too. Partnering with a dedicated engineering team means Artimist can pair creative production with a delivery platform that is measurable, maintainable and built to scale." },
    ],
    visuals: [
      { src: "/media/editorial/architectural-translation.webp", alt: "Architectural translation and digital systems study", caption: "Architecture translated into an interactive system" },
      { src: "/media/editorial/kinetic-roof-technical.webp", alt: "Kinetic roof technical and parametric design plate", caption: "Parametric logic and technical structure" },
      { src: "/media/editorial/sound-to-form.webp", alt: "Architecture process board connecting data to spatial form", caption: "Research, interface and spatial communication" },
      { src: "/media/generated-architecture/artimist-architecture-083.webp", alt: "Timber grid-shell canopy structural study", caption: "A complex system made legible" },
    ],
    services: ["Custom web development", "Web & mobile applications", "Automation & internal tooling", "Interactive & real-time front ends"], cta: "Discuss a digital project",
  },
  "scallance": {
    slug: "scallance", name: "Scallance LLC", kicker: "Amazon & E-Commerce Services Partner",
    ceo: "Abdullah Azzam", initials: "AA", ceoTitle: "Founder & Chief Executive Officer", ownerImage: "/media/partners/abdullah-azzam.jpg", ownerImageAlt: "Abdullah Azzam, founder and chief executive officer of Scallance LLC", accent: "linear-gradient(135deg,#0e0c0c,#3a1620 55%,#7a1f2e)",
    tagline: "Building and scaling brands on Amazon.",
    intro: "Scallance LLC is Artimist Productions’ Amazon services partner — an e-commerce agency focused on launching, managing and scaling brands on the Amazon marketplace. It is the commercial counterpart to Artimist’s creative work: where a product needs strong presentation and marketplace execution, the two teams can work together.",
    body: [
      { h: "What they do", p: "Scallance provides Amazon services including account setup and management, product listing and optimization, brand storefront design, advertising (PPC) and ongoing growth support. The team treats every listing as a storefront that has to earn attention and convert it." },
      { h: "How we work together", p: "Product visualization and marketplace strategy belong together. Artimist can produce photorealistic imagery, lifestyle scenes and brand assets while Scallance handles marketplace implementation and optimization. Clients who need both creative production and Amazon support can coordinate the two through one project conversation." },
      { h: "Why it matters", p: "A strong product needs both credible creative presentation and disciplined marketplace execution. The Artimist–Scallance relationship connects those two parts without pretending they are the same discipline." },
    ],
    visuals: [
      { src: "/media/generated-architecture/artimist-architecture-075.webp", alt: "Restored independent bookshop storefront", caption: "A clear storefront begins with a clear identity" },
      { src: "/media/generated-architecture/artimist-architecture-080.webp", alt: "Independent bookshop interior and display environment", caption: "Product presentation within a coherent environment" },
      { src: "/media/generated-architecture/artimist-architecture-065.webp", alt: "Retail reading room architectural plan and section", caption: "Planning the customer journey before launch" },
      { src: "/media/generated-architecture/artimist-architecture-077.webp", alt: "Restored brick neighborhood cafe storefront", caption: "A focused commercial presence" },
    ],
    services: ["Amazon account management", "Listing & storefront optimization", "Amazon advertising (PPC)", "Brand launch & scaling"], cta: "Discuss an e-commerce project",
  },
};

const CSS = ".ap-root{position:relative;min-height:100vh;background:#0b090a;color:#ece7e2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.6}.ap-root::before{content:'';position:fixed;inset:0;pointer-events:none;background:radial-gradient(1100px 620px at 50% -8%,rgba(153,38,54,.30),rgba(20,13,14,0) 60%),radial-gradient(820px 640px at 88% 12%,rgba(70,22,34,.22),transparent 55%),linear-gradient(180deg,#130c0e,#0b090a 55%)}.ap-root>*{position:relative}.ap-root h1,.ap-root h2,.ap-root h3,.ap-root h4{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0}.ap-kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--maroon,#c9536a);font-weight:600}.ap-wrap{max-width:820px;margin:0 auto;padding:0 40px}.ap-hub{max-width:1120px;margin:0 auto;padding:112px 40px 130px}.ap-hub-head{max-width:640px;margin:0 auto 76px;text-align:center}.ap-hub-head h1{font-size:64px;line-height:1.02;margin:16px 0 22px}.ap-hub-head p{color:#9a8f89;font-size:18px}.ap-cards{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:900px;margin:0 auto}.ap-card{display:flex;flex-direction:column;align-items:center;text-align:center;text-decoration:none;color:inherit;padding:44px 34px;transition:background .4s,transform .4s}.ap-card:hover{background:rgba(255,255,255,.035);transform:translateY(-5px)}.ap-card-top{margin-bottom:28px}.ap-mono{display:block;width:152px;height:152px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(201,83,106,.4);box-shadow:0 0 0 8px rgba(153,38,54,.10),0 26px 55px -20px rgba(0,0,0,.75);transition:box-shadow .4s,transform .4s}.ap-card:hover .ap-mono{box-shadow:0 0 0 12px rgba(153,38,54,.20),0 30px 65px -20px rgba(0,0,0,.8);transform:scale(1.03)}.ap-card-body{display:flex;flex-direction:column;align-items:center}.ap-card-body h3{font-size:34px;margin:14px 0}.ap-card-body p{color:#9a8f89;font-size:15px;max-width:34ch;margin-bottom:22px}.ap-card-link,.ap-back,.ap-cta{display:inline-flex;align-items:center;gap:9px}.ap-card-link{color:var(--maroon,#c9536a);font-size:12px;letter-spacing:.16em;text-transform:uppercase}.ap-back{color:#9a8f89;font-size:12px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;padding:26px 0}.ap-back .ui-icon{transform:rotate(180deg)}.ap-back:hover{color:#ece7e2}.ap-hero{position:relative;min-height:260px;display:flex;align-items:flex-end;overflow:hidden}.ap-hero .ap-scrim{position:absolute;inset:0;opacity:.9}.ap-hero-inner{position:relative;max-width:820px;margin:0 auto;padding:76px 40px 44px;width:100%;text-align:center}.ap-hero-inner h1{font-size:70px;line-height:1;margin:12px 0 14px}.ap-tagline{font-family:Georgia,serif;font-size:26px;color:#e6dcd7;font-style:italic}.ap-lead{font-size:23px;line-height:1.55;color:#d8d1cc;padding:52px 0 38px;text-align:center;font-family:Georgia,serif}.ap-ceo{display:flex;flex-direction:column;gap:12px;align-items:center;padding:16px 0 46px;text-align:center;border-bottom:1px solid rgba(255,255,255,.08)}.ap-ceo-mono{width:148px;height:148px;flex:none;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(201,83,106,.4);box-shadow:0 0 0 7px rgba(153,38,54,.10)}.ap-ceo-name{font-family:Georgia,serif;font-size:31px;margin:8px 0 4px}.ap-ceo-title{color:#9a8f89;font-size:14px}.ap-body{padding:52px 0}.ap-sec{margin-bottom:38px}.ap-sec h4{font-size:26px;margin-bottom:10px}.ap-sec p{color:#9a8f89;font-size:16px;max-width:70ch;margin:0 auto}.ap-chips-wrap{padding:10px 0 48px;border-top:1px solid rgba(255,255,255,.08);text-align:center}.ap-chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;justify-content:center}.ap-chip{border:1px solid rgba(255,255,255,.14);padding:9px 18px;font-size:13px;color:#cdc4bf}.ap-cta-row{padding:0 0 110px;text-align:center}.ap-cta{background:var(--maroon,#992636);color:#fff;text-decoration:none;padding:16px 30px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;}.ap-card-link .ui-icon,.ap-cta .ui-icon{transition:transform .2s ease}.ap-card:hover .ap-card-link .ui-icon,.ap-cta:hover .ui-icon{transform:translate(2px,-2px)}@media(max-width:760px){.ap-cards{grid-template-columns:1fr;gap:4px}.ap-hub-head h1{font-size:42px}.ap-hero-inner h1{font-size:46px}.ap-hub{padding:90px 22px 110px}.ap-wrap{padding:0 22px}.ap-cta-row{padding-bottom:140px}}";
const VISUAL_CSS = `.ap-hub{max-width:1220px;padding-top:116px}.ap-hub-head{max-width:none;margin:0 0 64px;text-align:left;display:grid;grid-template-columns:1fr .8fr;gap:64px;align-items:end}.ap-hub-head h1{font-size:clamp(54px,7vw,92px);line-height:.96;letter-spacing:-.045em}.ap-hub-head p{font-size:18px;max-width:48ch;margin:0 0 8px}.ap-cards{max-width:none;gap:0;border-top:1px solid rgba(255,255,255,.14)}.ap-card{position:relative;padding:0;display:grid;grid-template-columns:1.05fr .95fr;align-items:stretch;text-align:left;border:1px solid rgba(255,255,255,.1);background:#100e0f;overflow:hidden}.ap-card-top{display:block;position:relative;margin:0;height:460px;min-height:460px;overflow:hidden;background:#e9e2d8}.ap-card-visual{position:absolute;inset:0;width:100%!important;height:100%!important;display:block!important;opacity:1!important;visibility:visible!important;object-fit:cover;transition:transform .6s ease}.ap-card:hover .ap-card-visual{transform:scale(1.02)}.ap-card-top:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 48%,rgba(9,8,9,.88))}.ap-card-owner{position:absolute;z-index:2;left:24px;bottom:22px;display:flex;align-items:center;gap:18px}.ap-card-owner .ap-mono{width:112px;height:112px;box-shadow:0 0 0 6px rgba(9,8,9,.45),0 20px 44px -18px #000}.ap-card-owner small{display:block;color:#d09a9f;font-size:9px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:4px}.ap-card-owner strong{display:block;color:#fff;font-family:Georgia,serif;font-size:20px;font-weight:400}.ap-card-body{align-items:flex-start;justify-content:center;padding:clamp(30px,5vw,70px);border-left:1px solid rgba(255,255,255,.12)}.ap-card-body h3{font-size:38px}.ap-card-body p{max-width:52ch}.ap-wrap{max-width:1180px}.ap-detail-hero{display:grid;grid-template-columns:.9fr 1.1fr;gap:54px;align-items:center;padding:30px 0 70px}.ap-detail-hero h1{font-size:clamp(54px,7vw,92px);line-height:.96;letter-spacing:-.045em;margin:14px 0 18px}.ap-detail-hero .ap-tagline{margin:0}.ap-detail-lead{font-family:Georgia,serif;font-size:21px;line-height:1.56;color:#c9beba;margin:28px 0 0;max-width:58ch}.ap-detail-visual{position:relative;margin:0;overflow:hidden;border:1px solid rgba(255,255,255,.1);aspect-ratio:4/3;background:#e9e2d8}.ap-detail-visual img{width:100%;height:100%;object-fit:cover;display:block}.ap-detail-visual:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 58%,rgba(9,8,9,.76))}.ap-detail-visual figcaption{position:absolute;z-index:1;left:16px;bottom:14px;color:#eee7e2;font-size:9px;letter-spacing:.13em;text-transform:uppercase}.ap-gallery{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:14px;padding-bottom:72px}.ap-gallery figure{position:relative;margin:0;overflow:hidden;border:1px solid rgba(255,255,255,.1);aspect-ratio:4/3;background:#e9e2d8}.ap-gallery img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease}.ap-gallery figure:hover img{transform:scale(1.02)}.ap-gallery figcaption{position:absolute;left:12px;bottom:12px;padding:7px 10px;border-radius:999px;background:rgba(9,8,9,.82);font-size:9px;letter-spacing:.11em;text-transform:uppercase}.ap-ceo{display:grid;grid-template-columns:148px 1fr;gap:30px;align-items:center;text-align:left;padding:30px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.022)}.ap-ceo-name{font-size:34px}.ap-body{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:64px 0}.ap-sec{margin:0;padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#100e0f}.ap-sec h4{font-size:27px}.ap-sec p{font-size:15px}.ap-chips-wrap{padding-top:44px}@media(max-width:860px){.ap-hub-head,.ap-detail-hero{grid-template-columns:1fr}.ap-gallery{grid-template-columns:1fr 1fr}.ap-gallery figure:first-child{grid-column:1/3;aspect-ratio:16/9}.ap-body{grid-template-columns:1fr}.ap-ceo{grid-template-columns:1fr;gap:10px}}@media(max-width:600px){.ap-card{grid-template-columns:1fr}.ap-card-top{height:310px;min-height:310px}.ap-card-body{border-left:0;border-top:1px solid rgba(255,255,255,.12)}.ap-hub{padding:92px 22px 130px}.ap-hub-head{gap:24px}.ap-hub-head h1,.ap-detail-hero h1{font-size:clamp(48px,14vw,66px)}.ap-wrap{padding:0 22px}.ap-detail-hero{padding-top:18px}.ap-detail-visual{aspect-ratio:1/1}.ap-gallery{grid-template-columns:1fr;padding-bottom:54px}.ap-gallery figure,.ap-gallery figure:first-child{grid-column:auto;aspect-ratio:4/3}.ap-card-owner{left:18px;bottom:18px}.ap-card-owner .ap-mono{width:94px;height:94px}.ap-card-owner strong{font-size:18px}.ap-card-body{padding:24px}.ap-cta-row{padding-bottom:140px}}`;
export function PartnersStyle() { return <style dangerouslySetInnerHTML={{ __html: CSS + VISUAL_CSS }} />; }

export function PartnersHub() {
  return (
    <main className="ap-root">
      <PartnersStyle />
      <div className="ap-hub">
        <div className="ap-hub-head">
          <div className="ap-kicker">Working Partners</div>
          <h1>The people we build with.</h1>
          <p>Artimist Productions works with specialist partners when a project needs engineering, software or marketplace depth beyond the studio’s core disciplines.</p>
        </div>
        <div className="ap-cards">
          {PARTNER_ORDER.map((slug, index) => {
            const p = PARTNERS[slug];
            return (
              <Link className="ap-card" href={`/partners/${p.slug}`} key={p.slug}>
                <div className="ap-card-top"><img className="ap-card-visual" src={p.visuals[0].src} alt={p.visuals[0].alt} width="1200" height="750" loading="eager" decoding="async" fetchPriority="high" /><div className="ap-card-owner"><img className="ap-mono" src={p.ownerImage} alt={p.ownerImageAlt} width="200" height="200" loading="eager" decoding="async" /><div><small>Founder / CEO</small><strong>{p.ceo}</strong></div></div></div>
                <div className="ap-card-body">
                  <div className="ap-kicker">0{index + 1} / {p.kicker}</div>
                  <h3>{p.name}</h3>
                  <p>{p.intro.slice(0, 150)}…</p>
                  <span className="ap-card-link">View partner <UiIcon name="arrow" size={14} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export function PartnerDetail({ p }: { p: Partner }) {
  return (
    <main className="ap-root">
      <PartnersStyle />
      <div className="ap-wrap"><Link className="ap-back" href="/partners"><UiIcon name="chevron" size={13} /> All partners</Link></div>
      <div className="ap-wrap">
        <section className="ap-detail-hero"><div><div className="ap-kicker">{p.kicker}</div><h1>{p.name}</h1><p className="ap-tagline">{p.tagline}</p><p className="ap-detail-lead">{p.intro}</p></div><figure className="ap-detail-visual" style={{ background: p.accent }}><img src={p.visuals[0].src} alt={p.visuals[0].alt} width="1600" height="1200" fetchPriority="high" /><figcaption>{p.visuals[0].caption}</figcaption></figure></section>
        <div className="ap-gallery" aria-label={`${p.name} collaboration studies`}>{p.visuals.slice(1).map((visual) => <figure key={visual.src}><img src={visual.src} alt={visual.alt} width="1200" height="900" loading="lazy" decoding="async" /><figcaption>{visual.caption}</figcaption></figure>)}</div>
        <div className="ap-ceo">
          <img className="ap-ceo-mono" src={p.ownerImage} alt={p.ownerImageAlt} width="200" height="200" loading="lazy" decoding="async" /><div><div className="ap-kicker">Leadership / accountable partner</div><div className="ap-ceo-name">{p.ceo}</div><div className="ap-ceo-title">{p.ceoTitle}, {p.name}</div></div>
        </div>
        <div className="ap-body">{p.body.map((sec) => <div className="ap-sec" key={sec.h}><h4>{sec.h}</h4><p>{sec.p}</p></div>)}</div>
        <div className="ap-chips-wrap"><div className="ap-kicker">Capabilities</div><div className="ap-chips">{p.services.map((x) => <span className="ap-chip" key={x}>{x}</span>)}</div></div>
        <div className="ap-cta-row"><Link className="ap-cta" href="/contact">{p.cta} <UiIcon name="arrow" size={15} /></Link></div>
      </div>
    </main>
  );
}
