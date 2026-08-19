import Link from "next/link";

type Body = { h: string; p: string };
export type Partner = { slug: string; name: string; kicker: string; ceo: string; initials: string; ceoTitle: string; accent: string; tagline: string; intro: string; body: Body[]; services: string[]; cta: string };

export const PARTNER_ORDER = ["decoding-bits", "scallance"];

export const PARTNERS: Record<string, Partner> = {
  "decoding-bits": {
    slug: "decoding-bits", name: "Decoding Bits", kicker: "Technology & Software Engineering Partner",
    ceo: "Furqan A", initials: "FA", ceoTitle: "Founder & Chief Executive Officer", accent: "linear-gradient(135deg,#2a0e14,#5a1622 55%,#7a1f2e)",
    tagline: "The engineering layer behind the experience.",
    intro: "Decoding Bits is Artimist Production’s technology and software engineering partner. Where Artimist shapes how a space looks and feels, Decoding Bits builds the systems that carry that work to the world — the websites, web apps, interactive tools and automation that turn a portfolio into a working business.",
    body: [{ h: "What they build", p: "Decoding Bits designs and develops custom software: marketing and portfolio websites, web and mobile applications, client dashboards, and back-office automation. The team works across the full stack, from interface to infrastructure, and cares about the same thing Artimist does — that the final product is fast, clean and considered." }, { h: "How we work together", p: "Decoding Bits maintains and extends Artimist’s digital presence and internal tooling: the production site, real-time visualization delivery, lead-capture flows and the automation that keeps projects moving. When a client needs an interactive product to sit alongside a visualization — a configurator, a virtual tour front-end, a booking flow — Decoding Bits is who we build it with." }, { h: "Why it matters", p: "Beautiful renders don’t grow a studio on their own; the machine around them does. Partnering with a dedicated engineering team means Artimist can promise not just imagery, but the delivery platform that makes it useful — measurable, maintainable and built to scale." }],
    services: ["Custom web development", "Web & mobile applications", "Automation & internal tooling", "Interactive & real-time front-ends"], cta: "Work with Decoding Bits",
  },
  "scallance": {
    slug: "scallance", name: "Scallance LLC", kicker: "Amazon & E-Commerce Services Partner",
    ceo: "Abdullah Azzam", initials: "AA", ceoTitle: "Founder & Chief Executive Officer", accent: "linear-gradient(135deg,#0e0c0c,#3a1620 55%,#7a1f2e)",
    tagline: "Building and scaling brands on Amazon.",
    intro: "Scallance LLC is Artimist Production’s Amazon services partner — a US-registered e-commerce agency that launches, manages and scales brands on the Amazon marketplace. It’s the commercial counterpart to Artimist’s creative work: where a product needs to sell, Scallance runs the store.",
    body: [{ h: "What they do", p: "Scallance provides end-to-end Amazon services: account setup and management, product listing and optimization, brand storefront design, advertising (PPC) and ongoing growth. The team treats every listing as a storefront that has to earn attention and convert it." }, { h: "How we work together", p: "Product visualization and marketplace strategy belong together. Artimist produces the photorealistic imagery, lifestyle scenes and brand assets; Scallance places that work where it performs — on optimized, well-run Amazon listings engineered to rank and sell. Clients who need both a brand and a channel get one joined-up answer." }, { h: "Why it matters", p: "A great product with a weak listing loses; a well-run listing with weak creative plateaus. The Artimist–Scallance partnership closes that gap — strong visuals and a disciplined marketplace operation working toward the same revenue goal." }],
    services: ["Amazon account management", "Listing & storefront optimization", "Amazon advertising (PPC)", "Brand launch & scaling"], cta: "Work with Scallance",
  },
};

const CSS = ".ap-root{background:#0e0c0c;color:#ece7e2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.6} .ap-root h1,.ap-root h2,.ap-root h3,.ap-root h4{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0} .ap-kicker{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--maroon,#b23a4c);font-weight:600} .ap-wrap{max-width:900px;margin:0 auto;padding:0 40px} .ap-hub{max-width:1120px;margin:0 auto;padding:96px 40px 120px} .ap-hub-head{max-width:660px;margin-bottom:60px} .ap-hub-head h1{font-size:62px;line-height:1.03;margin:14px 0 20px} .ap-hub-head p{color:#9a8f89;font-size:18px} .ap-cards{display:grid;grid-template-columns:1fr 1fr;gap:28px} .ap-card{display:block;text-decoration:none;color:inherit;background:#16110f;border:1px solid #2a211f;border-radius:3px;overflow:hidden;transition:transform .35s,border-color .35s} .ap-card:hover{transform:translateY(-4px);border-color:var(--maroon,#7a1f2e)} .ap-mono{display:grid;place-items:center;height:230px;font-family:Georgia,serif;font-size:96px;color:#e7c9cf} .ap-card-body{padding:30px} .ap-card-body h3{font-size:33px;margin:6px 0 12px} .ap-card-body p{color:#9a8f89;font-size:15px;margin-bottom:18px} .ap-card-link{color:var(--maroon,#b23a4c);font-size:12px;letter-spacing:.14em;text-transform:uppercase} .ap-back{display:inline-block;color:#9a8f89;font-size:12px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;padding:26px 0} .ap-back:hover{color:#ece7e2} .ap-hero{position:relative;min-height:340px;display:flex;align-items:flex-end;overflow:hidden} .ap-hero .ap-scrim{position:absolute;inset:0} .ap-hero-inner{position:relative;max-width:900px;margin:0 auto;padding:70px 40px 52px;width:100%} .ap-hero-inner h1{font-size:72px;line-height:1;margin:12px 0 14px} .ap-tagline{font-family:Georgia,serif;font-size:26px;color:#e6dcd7;font-style:italic} .ap-lead{font-size:23px;line-height:1.55;color:#d8d1cc;padding:60px 0 44px;border-bottom:1px solid #2a211f;font-family:Georgia,serif} .ap-ceo{display:flex;gap:32px;align-items:center;padding:46px 0;border-bottom:1px solid #2a211f} .ap-ceo-mono{width:120px;height:120px;flex:none;border-radius:50%;display:grid;place-items:center;font-family:Georgia,serif;font-size:44px;color:#e7c9cf;border:1px solid #2a211f} .ap-ceo-name{font-family:Georgia,serif;font-size:31px;margin:8px 0 4px} .ap-ceo-title{color:#9a8f89;font-size:14px} .ap-body{padding:50px 0} .ap-sec{margin-bottom:38px} .ap-sec h4{font-size:26px;margin-bottom:10px} .ap-sec p{color:#9a8f89;font-size:16px;max-width:70ch} .ap-chips-wrap{padding:10px 0 48px;border-top:1px solid #2a211f} .ap-chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px} .ap-chip{border:1px solid #2a211f;border-radius:2px;padding:9px 16px;font-size:13px;color:#cdc4bf} .ap-cta-row{padding:0 0 100px} .ap-cta{display:inline-block;background:var(--maroon,#7a1f2e);color:#fff;text-decoration:none;padding:16px 34px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;border-radius:2px} @media(max-width:760px){.ap-cards{grid-template-columns:1fr}.ap-hub-head h1{font-size:42px}.ap-hero-inner h1{font-size:46px}.ap-hub{padding:56px 22px 80px}.ap-wrap{padding:0 22px}.ap-ceo{flex-direction:column;text-align:center}}";
export function PartnersStyle() { return <style dangerouslySetInnerHTML={{ __html: CSS }} />; }

export function PartnersHub() {
  return (
    <main className="ap-root">
      <PartnersStyle />
      <div className="ap-hub">
        <div className="ap-hub-head">
          <div className="ap-kicker">Working Partners</div>
          <h1>The people we build with.</h1>
          <p>Artimist Production doesn’t work alone. These are the partners who extend what we do — the engineering that ships it and the marketplace operation that sells it.</p>
        </div>
        <div className="ap-cards">
          {PARTNER_ORDER.map((slug) => {
            const p = PARTNERS[slug];
            return (
              <Link className="ap-card" href={"/partners/" + p.slug} key={p.slug}>
                <div className="ap-mono" style={{ background: p.accent }}>{p.initials}</div>
                <div className="ap-card-body">
                  <div className="ap-kicker">{p.kicker}</div>
                  <h3>{p.name}</h3>
                  <p>{p.intro.slice(0, 150)}…</p>
                  <span className="ap-card-link">View partner →</span>
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
      <div className="ap-wrap"><Link className="ap-back" href="/partners">← All partners</Link></div>
      <section className="ap-hero">
        <div className="ap-scrim" style={{ background: p.accent }} />
        <div className="ap-hero-inner">
          <div className="ap-kicker">{p.kicker}</div>
          <h1>{p.name}</h1>
          <p className="ap-tagline">{p.tagline}</p>
        </div>
      </section>
      <div className="ap-wrap">
        <p className="ap-lead">{p.intro}</p>
        <div className="ap-ceo">
          <div className="ap-ceo-mono" style={{ background: p.accent }}>{p.initials}</div>
          <div>
            <div className="ap-kicker">Leadership</div>
            <div className="ap-ceo-name">{p.ceo}</div>
            <div className="ap-ceo-title">{p.ceoTitle}, {p.name}</div>
          </div>
        </div>
        <div className="ap-body">
          {p.body.map((sec) => (<div className="ap-sec" key={sec.h}><h4>{sec.h}</h4><p>{sec.p}</p></div>))}
        </div>
        <div className="ap-chips-wrap">
          <div className="ap-kicker">Capabilities</div>
          <div className="ap-chips">{p.services.map((x) => <span className="ap-chip" key={x}>{x}</span>)}</div>
        </div>
        <div className="ap-cta-row"><a className="ap-cta" href="/contact">{p.cta} →</a></div>
      </div>
    </main>
  );
}
