import Link from "next/link";
import { UiIcon } from "../ui-icon";

type Body = { h: string; p: string };
type PartnerVisual = { src: string; alt: string; caption: string };
export type Partner = {
  slug: string;
  name: string;
  kicker: string;
  ceo: string;
  initials: string;
  ceoTitle: string;
  ownerImage: string;
  ownerImageAlt: string;
  accent: string;
  tagline: string;
  intro: string;
  body: Body[];
  services: string[];
  cta: string;
  visuals: PartnerVisual[];
};

export const PARTNER_ORDER = ["decoding-bits", "scallance"];

export const PARTNERS: Record<string, Partner> = {
  "decoding-bits": {
    slug: "decoding-bits",
    name: "Decoding Bits",
    kicker: "Technology & Software Engineering Partner",
    ceo: "Furqan A",
    initials: "FA",
    ceoTitle: "Founder & Chief Executive Officer",
    ownerImage: "/media/partners/furqan-a.jpg",
    ownerImageAlt: "Furqan A., founder and chief executive officer of Decoding Bits",
    accent: "linear-gradient(135deg,#2a0e14,#5a1622 55%,#7a1f2e)",
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
    services: ["Custom web development", "Web & mobile applications", "Automation & internal tooling", "Interactive & real-time front ends"],
    cta: "Discuss a digital project",
  },
  "scallance": {
    slug: "scallance",
    name: "Scallance LLC",
    kicker: "Amazon & E-Commerce Services Partner",
    ceo: "Abdullah Azzam",
    initials: "AA",
    ceoTitle: "Founder & Chief Executive Officer",
    ownerImage: "/media/partners/abdullah-azzam.jpg",
    ownerImageAlt: "Abdullah Azzam, founder and chief executive officer of Scallance LLC",
    accent: "linear-gradient(135deg,#0e0c0c,#3a1620 55%,#7a1f2e)",
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
    services: ["Amazon account management", "Listing & storefront optimization", "Amazon advertising (PPC)", "Brand launch & scaling"],
    cta: "Discuss an e-commerce project",
  },
};

const CSS = `
.ap-root{--bg:#0a0809;--paper:#eee7e2;--muted:#9b918b;--line:rgba(255,255,255,.11);--accent:#c85167;position:relative;min-height:100vh;background:radial-gradient(circle at 85% 0%,rgba(136,32,51,.17),transparent 30%),var(--bg);color:var(--paper);font-family:Arial,Helvetica,sans-serif;font-weight:300;line-height:1.6;overflow:hidden}.ap-root *{box-sizing:border-box}.ap-root h1,.ap-root h2,.ap-root h3,.ap-root h4{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0}.ap-root a{color:inherit}.ap-kicker{font-size:9px;letter-spacing:.19em;text-transform:uppercase;color:var(--accent);font-weight:700}.ap-shell{width:min(1320px,calc(100% - 56px));margin:0 auto}.ap-back{display:inline-flex;align-items:center;gap:8px;color:#8d837e;font-size:9px;letter-spacing:.13em;text-transform:uppercase;text-decoration:none;padding:24px 0 12px}.ap-back .ui-icon{transform:rotate(180deg)}.ap-back:hover{color:#fff}.ap-hub{padding:112px 0 110px}.ap-hub-head{display:grid;grid-template-columns:1.05fr .7fr;gap:80px;align-items:end;padding-bottom:56px;border-bottom:1px solid var(--line)}.ap-hub-head h1{font-size:clamp(58px,8vw,108px);line-height:.88;letter-spacing:-.055em;max-width:10ch;margin-top:14px}.ap-hub-head p{margin:0 0 8px;color:#a89d97;font-size:17px;max-width:46ch}.ap-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding-top:12px}.ap-card{display:block;text-decoration:none;border:1px solid var(--line);background:#0e0c0d;overflow:hidden;transition:transform .35s ease,border-color .35s ease}.ap-card:hover{transform:translateY(-4px);border-color:rgba(200,81,103,.45)}.ap-card-media{position:relative;height:min(52vw,560px);min-height:440px;overflow:hidden;background:#161213}.ap-card-media:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(7,6,7,.86) 100%)}.ap-card-media>img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1);filter:saturate(.9)}.ap-card:hover .ap-card-media>img{transform:scale(1.018);filter:saturate(1)}.ap-card-owner{position:absolute;z-index:2;left:24px;bottom:22px;display:flex;align-items:center;gap:14px}.ap-card-owner img{width:84px;height:84px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(255,255,255,.35);box-shadow:0 0 0 6px rgba(8,7,8,.36)}.ap-card-owner small{display:block;color:#cda3aa;font-size:8px;letter-spacing:.13em;text-transform:uppercase}.ap-card-owner strong{display:block;margin-top:4px;font-family:Georgia,serif;font-size:20px;font-weight:400}.ap-card-copy{padding:32px 30px 34px}.ap-card-copy h2{font-size:clamp(36px,4vw,52px);line-height:.98;letter-spacing:-.035em;margin:10px 0 14px}.ap-card-copy p{color:#978d87;margin:0 0 22px;max-width:52ch;font-size:14px}.ap-card-link{display:inline-flex;align-items:center;gap:8px;color:#d26a7d;font-size:9px;font-weight:700;letter-spacing:.13em;text-transform:uppercase}.ap-card-link .ui-icon{transition:transform .2s ease}.ap-card:hover .ap-card-link .ui-icon{transform:translate(2px,-2px)}.ap-detail{padding-bottom:98px}.ap-detail-hero{position:relative;display:grid;grid-template-columns:.8fr 1.2fr;min-height:calc(100svh - 126px);border:1px solid var(--line);background:#0d0b0c;overflow:hidden}.ap-detail-copy{display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(34px,5vw,72px);border-right:1px solid var(--line)}.ap-detail-copy h1{font-size:clamp(58px,8vw,110px);line-height:.86;letter-spacing:-.055em;margin:14px 0 22px;max-width:8ch}.ap-tagline{font-family:Georgia,serif;font-style:italic;font-size:clamp(22px,2.3vw,31px);line-height:1.15;color:#e5d9d4;margin:0 0 24px}.ap-detail-lead{color:#aea39d;font-size:15px;max-width:58ch;margin:0}.ap-detail-media{position:relative;margin:0;min-height:650px;background:#161213;overflow:hidden}.ap-detail-media img{display:block;width:100%;height:100%;object-fit:cover}.ap-detail-media:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,4,5,.02) 50%,rgba(5,4,5,.7))}.ap-detail-media figcaption{position:absolute;z-index:2;left:18px;bottom:16px;padding:7px 9px;background:rgba(8,7,8,.76);font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.72)}.ap-leadership{display:grid;grid-template-columns:110px .8fr 1.2fr;gap:28px;align-items:center;padding:28px 0;border-bottom:1px solid var(--line)}.ap-leadership img{width:110px;height:110px;border-radius:50%;object-fit:cover;object-position:center top;border:1px solid rgba(255,255,255,.22)}.ap-leadership-name{font-family:Georgia,serif;font-size:30px;line-height:1}.ap-leadership-title{margin-top:6px;color:#8f8580;font-size:12px}.ap-leadership-note{margin:0;color:#9d928c;font-size:13px;max-width:54ch}.ap-visual-strip{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:10px;padding:70px 0}.ap-visual-strip figure{position:relative;margin:0;min-height:360px;overflow:hidden;border:1px solid var(--line);background:#151213}.ap-visual-strip figure:nth-child(2){margin-top:64px}.ap-visual-strip figure:nth-child(3){margin-top:116px}.ap-visual-strip img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s ease}.ap-visual-strip figure:hover img{transform:scale(1.018)}.ap-visual-strip figcaption{position:absolute;left:12px;bottom:12px;max-width:calc(100% - 24px);padding:7px 9px;background:rgba(8,7,8,.78);font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.72)}.ap-story-head{display:grid;grid-template-columns:.35fr 1fr;gap:70px;align-items:end;padding:64px 0 34px;border-top:1px solid var(--line)}.ap-story-head h2{font-size:clamp(44px,6vw,80px);line-height:.92;letter-spacing:-.045em;max-width:12ch}.ap-story{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.ap-story article{min-height:330px;padding:30px;background:#0d0b0c;display:flex;flex-direction:column}.ap-story-no{color:var(--accent);font-size:9px;font-weight:700;letter-spacing:.16em}.ap-story h3{font-size:29px;line-height:1.08;margin:42px 0 16px}.ap-story p{margin:auto 0 0;color:#9e948e;font-size:14px}.ap-capability{display:grid;grid-template-columns:.45fr 1fr;gap:70px;padding:70px 0;border-bottom:1px solid var(--line)}.ap-capability h2{font-size:clamp(38px,5vw,64px);line-height:.96;letter-spacing:-.04em;margin:10px 0 0}.ap-services{display:grid;border-top:1px solid var(--line)}.ap-service{position:relative;padding:18px 40px 18px 0;border-bottom:1px solid var(--line);font-family:Georgia,serif;font-size:20px;color:#c9beba}.ap-service:after{content:'';position:absolute;right:3px;top:50%;width:24px;height:1px;background:var(--accent)}.ap-cta-row{position:relative;margin-top:70px;padding:clamp(48px,7vw,88px);border:1px solid var(--line);background:radial-gradient(circle at 85% 0%,rgba(154,37,58,.28),transparent 35%),#110d0f;overflow:hidden}.ap-cta-row h2{font-size:clamp(48px,6.5vw,84px);line-height:.9;letter-spacing:-.045em;max-width:10ch;margin:12px 0 22px}.ap-cta-row p{color:#9d928c;max-width:55ch;margin:0 0 28px}.ap-cta{display:inline-flex;align-items:center;gap:10px;min-height:48px;background:#992636;color:#fff;text-decoration:none;padding:0 18px;font-size:9px;font-weight:700;letter-spacing:.13em;text-transform:uppercase}.ap-cta .ui-icon{transition:transform .2s ease}.ap-cta:hover .ui-icon{transform:translate(2px,-2px)}@media(max-width:900px){.ap-shell{width:min(100% - 30px,1320px)}.ap-hub-head,.ap-detail-hero,.ap-story-head,.ap-capability{grid-template-columns:1fr}.ap-hub-head{gap:24px}.ap-cards{grid-template-columns:1fr}.ap-card-media{height:62vw;min-height:380px}.ap-detail-copy{border-right:0;border-bottom:1px solid var(--line)}.ap-detail-hero{min-height:0}.ap-detail-media{min-height:60vw}.ap-leadership{grid-template-columns:100px 1fr}.ap-leadership-note{grid-column:2}.ap-visual-strip{grid-template-columns:1fr 1fr}.ap-visual-strip figure:nth-child(2),.ap-visual-strip figure:nth-child(3){margin-top:0}.ap-visual-strip figure:first-child{grid-column:1/3;min-height:55vw}.ap-story{grid-template-columns:1fr}.ap-story article{min-height:0}.ap-story-head,.ap-capability{gap:22px}}@media(max-width:620px){.ap-shell{width:calc(100% - 24px)}.ap-hub{padding:92px 0 84px}.ap-hub-head h1{font-size:clamp(50px,14vw,66px)}.ap-card-media{height:78vw;min-height:0}.ap-card-copy{padding:24px 20px 26px}.ap-card-copy h2{font-size:42px}.ap-card-owner{left:16px;bottom:16px}.ap-card-owner img{width:72px;height:72px}.ap-detail{padding-bottom:74px}.ap-detail-hero{display:flex;flex-direction:column-reverse}.ap-detail-copy{padding:28px 20px 30px}.ap-detail-copy h1{font-size:clamp(52px,15vw,70px);max-width:9ch}.ap-detail-media{min-height:88vw}.ap-leadership{grid-template-columns:78px 1fr;gap:16px;padding:22px 0}.ap-leadership img{width:78px;height:78px}.ap-leadership-name{font-size:25px}.ap-leadership-note{grid-column:1/3}.ap-visual-strip{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;margin-right:-12px;padding:48px 12px 48px 0;scrollbar-width:none}.ap-visual-strip::-webkit-scrollbar{display:none}.ap-visual-strip figure,.ap-visual-strip figure:first-child{flex:0 0 84vw;min-height:72vw;grid-column:auto;scroll-snap-align:center}.ap-story-head{padding-top:46px}.ap-story-head h2{font-size:46px}.ap-story{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;background:transparent;border:0;margin-right:-12px;padding-right:12px;scrollbar-width:none}.ap-story::-webkit-scrollbar{display:none}.ap-story article{flex:0 0 82vw;min-height:330px;border:1px solid var(--line);scroll-snap-align:center}.ap-capability{padding:52px 0}.ap-services .ap-service{font-size:18px}.ap-cta-row{margin-left:-12px;margin-right:-12px;margin-top:52px;padding:44px 24px}.ap-cta-row h2{font-size:49px}}@media(prefers-reduced-motion:reduce){.ap-card,.ap-card-media>img,.ap-visual-strip img,.ap-card-link .ui-icon,.ap-cta .ui-icon{transition:none!important}}
`;

export function PartnersStyle() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

export function PartnersHub() {
  return (
    <main className="ap-root">
      <PartnersStyle />
      <div className="ap-shell ap-hub">
        <header className="ap-hub-head">
          <div><div className="ap-kicker">Working partners</div><h1>The people we build with.</h1></div>
          <p>Specialist partners extend Artimist Productions when a project needs software engineering, digital product development, Amazon or e-commerce depth beyond the studio’s core disciplines.</p>
        </header>
        <div className="ap-cards">
          {PARTNER_ORDER.map((slug, index) => {
            const p = PARTNERS[slug];
            return (
              <Link className="ap-card" href={`/partners/${p.slug}`} key={p.slug}>
                <div className="ap-card-media">
                  <img src={p.visuals[0].src} alt={p.visuals[0].alt} width="1400" height="1000" loading="eager" decoding="async" fetchPriority={index === 0 ? "high" : "auto"} />
                  <div className="ap-card-owner"><img src={p.ownerImage} alt={p.ownerImageAlt} width="160" height="160" loading="eager" decoding="async" /><div><small>Founder / CEO</small><strong>{p.ceo}</strong></div></div>
                </div>
                <div className="ap-card-copy"><div className="ap-kicker">0{index + 1} / {p.kicker}</div><h2>{p.name}</h2><p>{p.tagline} {p.intro.slice(0, 118)}…</p><span className="ap-card-link">Open partnership story <UiIcon name="arrow" size={14} /></span></div>
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
      <div className="ap-shell ap-detail">
        <Link className="ap-back" href="/partners"><UiIcon name="chevron" size={13} /> All partners</Link>

        <section className="ap-detail-hero">
          <div className="ap-detail-copy"><div className="ap-kicker">{p.kicker}</div><h1>{p.name}</h1><p className="ap-tagline">{p.tagline}</p><p className="ap-detail-lead">{p.intro}</p></div>
          <figure className="ap-detail-media" style={{ background: p.accent }}><img src={p.visuals[0].src} alt={p.visuals[0].alt} width="1800" height="1200" fetchPriority="high" /><figcaption>{p.visuals[0].caption}</figcaption></figure>
        </section>

        <section className="ap-leadership" aria-label={`${p.name} leadership`}><img src={p.ownerImage} alt={p.ownerImageAlt} width="220" height="220" loading="lazy" decoding="async" /><div><div className="ap-kicker">Accountable partner</div><div className="ap-leadership-name">{p.ceo}</div><div className="ap-leadership-title">{p.ceoTitle}, {p.name}</div></div><p className="ap-leadership-note">A specialist collaboration with a named owner and a clear discipline. Artimist remains responsible for its own creative scope; {p.name} remains responsible for the specialist work it delivers.</p></section>

        <section className="ap-visual-strip" aria-label={`${p.name} collaboration studies`}>{p.visuals.slice(1).map((visual) => <figure key={visual.src}><img src={visual.src} alt={visual.alt} width="1400" height="1000" loading="lazy" decoding="async" /><figcaption>{visual.caption}</figcaption></figure>)}</section>

        <section><div className="ap-story-head"><div className="ap-kicker">How the partnership works</div><h2>Specialist depth without blurring responsibilities.</h2></div><div className="ap-story">{p.body.map((sec, index) => <article key={sec.h}><span className="ap-story-no">0{index + 1}</span><h3>{sec.h}</h3><p>{sec.p}</p></article>)}</div></section>

        <section className="ap-capability"><div><div className="ap-kicker">Capabilities</div><h2>What {p.name} brings into the collaboration.</h2></div><div className="ap-services">{p.services.map((service) => <div className="ap-service" key={service}>{service}</div>)}</div></section>

        <section className="ap-cta-row"><div className="ap-kicker">A joined-up brief when it makes sense</div><h2>Need creative work plus specialist execution?</h2><p>Start with the project itself. We can identify whether the right scope stays inside Artimist or benefits from a coordinated specialist partner.</p><Link className="ap-cta" href="/contact">{p.cta} <UiIcon name="arrow" size={15} /></Link></section>
      </div>
    </main>
  );
}
