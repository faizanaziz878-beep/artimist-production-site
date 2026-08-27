import Link from "next/link";

const BASE = "https://www.artimistproductions.com";
const WHATSAPP = "https://wa.me/18078084181";

type Step = { title: string; text: string };
type FAQ = { q: string; a: string };
type Related = { href: string; label: string };

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
.hsp{min-height:100vh;background:#090809;color:#eee8e3;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.hsp *{box-sizing:border-box}.hsp a{color:inherit}.hsp-wrap{width:min(1120px,calc(100% - 40px));margin:0 auto}.hsp-nav{padding:24px 0;font-size:13px;color:#a89d97}.hsp-nav a{text-decoration:none}.hsp-hero{display:grid;grid-template-columns:1.08fr .92fr;gap:54px;align-items:center;padding:48px 0 72px}.hsp-eyebrow{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#c95469;font-weight:700}.hsp h1,.hsp h2,.hsp h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.hsp h1{font-size:clamp(44px,6vw,78px);line-height:1.02;margin:16px 0 22px;letter-spacing:-.035em}.hsp-sub{font-family:Georgia,'Times New Roman',serif;font-size:clamp(22px,2.4vw,30px);line-height:1.35;color:#d9cec7;max-width:25ch}.hsp-intro{font-size:18px;color:#bdb2ac;max-width:64ch;margin-top:24px}.hsp-audience{font-size:15px;color:#958b86;margin-top:18px}.hsp-hero-media{position:relative}.hsp-hero-media img{width:100%;height:580px;object-fit:cover;border-radius:18px;border:1px solid rgba(255,255,255,.12);display:block;box-shadow:0 32px 90px rgba(0,0,0,.5)}.hsp-hero-media:after{content:'';position:absolute;inset:0;border-radius:18px;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.34));pointer-events:none}.hsp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hsp-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:999px;text-decoration:none;font-size:13px;letter-spacing:.08em;text-transform:uppercase}.hsp-primary{background:#992636;color:white}.hsp-secondary{border:1px solid rgba(255,255,255,.2);color:#f0ebe7}.hsp-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;margin-bottom:72px}.hsp-strip div{padding:22px;background:#100e0f}.hsp-strip strong{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:18px;margin-bottom:4px}.hsp-strip span{font-size:13px;color:#938984}.hsp-sec{padding:58px 0;border-top:1px solid rgba(255,255,255,.09)}.hsp-sec h2{font-size:clamp(32px,4vw,46px);line-height:1.1;margin:0 0 26px}.hsp-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px}.hsp-list{display:grid;grid-template-columns:1fr 1fr;gap:12px;list-style:none;padding:0;margin:0}.hsp-list li{padding:16px 18px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.025);color:#cec4be}.hsp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.hsp-step{padding:24px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.02)}.hsp-step b{display:block;color:#c95469;font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}.hsp-step h3{font-size:24px;margin:0 0 10px}.hsp-step p{color:#a79c96;margin:0}.hsp-faq details{border-top:1px solid rgba(255,255,255,.1);padding:20px 0}.hsp-faq summary{cursor:pointer;font-family:Georgia,'Times New Roman',serif;font-size:21px}.hsp-faq p{color:#aaa09a;max-width:74ch}.hsp-note{margin-top:22px;padding:18px 20px;border-left:3px solid #992636;background:rgba(153,38,54,.08);color:#b9aea8;font-size:14px}.hsp-related{display:flex;flex-wrap:wrap;gap:12px}.hsp-related a{text-decoration:none;border:1px solid rgba(255,255,255,.12);padding:10px 16px;border-radius:999px;color:#cfc5bf}.hsp-cta{margin:42px 0 92px;padding:48px;border-radius:18px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(135deg,rgba(153,38,54,.2),rgba(255,255,255,.02));text-align:center}.hsp-cta h2{margin:0 0 10px;font-size:38px}.hsp-cta p{color:#a99e98;max-width:58ch;margin:0 auto 22px}@media(max-width:820px){.hsp-hero,.hsp-grid{grid-template-columns:1fr}.hsp-hero-media img{height:420px}.hsp-strip,.hsp-steps{grid-template-columns:1fr}.hsp-list{grid-template-columns:1fr}.hsp-hero{gap:32px;padding-top:24px}.hsp-cta{padding:34px 22px}}
`;

export function HomeownerServicePage(props: HomeownerServicePageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: props.serviceName,
        description: props.intro,
        url: `${BASE}/${props.slug}`,
        provider: { "@type": "Organization", name: "Artimist Productions", url: BASE },
        areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"],
        audience: { "@type": "Audience", audienceType: "Homeowners, architects, developers and design clients" },
      },
      {
        "@type": "FAQPage",
        mainEntity: props.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: props.serviceName, item: `${BASE}/${props.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="hsp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="hsp-wrap">
        <nav className="hsp-nav" aria-label="Breadcrumb"><Link href="/">Home</Link> / {props.serviceName}</nav>

        <section className="hsp-hero">
          <div>
            <div className="hsp-eyebrow">{props.eyebrow}</div>
            <h1>{props.h1}</h1>
            <div className="hsp-sub">{props.subtitle}</div>
            <p className="hsp-intro">{props.intro}</p>
            <p className="hsp-audience">{props.audience}</p>
            <div className="hsp-actions">
              <Link className="hsp-btn hsp-primary" href="/contact">Get a project quote</Link>
              <a className="hsp-btn hsp-secondary" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp the studio</a>
            </div>
          </div>
          <div className="hsp-hero-media"><img src={props.image} alt={props.imageAlt} /></div>
        </section>

        <div className="hsp-strip" aria-label="Service advantages">
          <div><strong>Designed around your project</strong><span>No generic stock-plan workflow.</span></div>
          <div><strong>Visual before you build</strong><span>3D support is available where useful.</span></div>
          <div><strong>International collaboration</strong><span>Remote project delivery for clients worldwide.</span></div>
        </div>

        <section className="hsp-sec hsp-grid">
          <div><div className="hsp-eyebrow">Scope</div><h2>What the service can include</h2></div>
          <ul className="hsp-list">{props.included.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>

        <section className="hsp-sec hsp-grid">
          <div><div className="hsp-eyebrow">Deliverables</div><h2>What you can receive</h2></div>
          <ul className="hsp-list">{props.deliverables.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>

        <section className="hsp-sec">
          <div className="hsp-eyebrow">Process</div><h2>A clear path from idea to drawings</h2>
          <div className="hsp-steps">{props.steps.map((s, i) => <article className="hsp-step" key={s.title}><b>Step {i + 1}</b><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
          {props.permitNotice ? <div className="hsp-note">{props.permitNotice}</div> : null}
        </section>

        <section className="hsp-sec hsp-faq">
          <div className="hsp-eyebrow">Questions</div><h2>Frequently asked</h2>
          {props.faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </section>

        <section className="hsp-sec">
          <div className="hsp-eyebrow">Related expertise</div><h2>More ways we can help</h2>
          <div className="hsp-related">{props.related.map((r) => <Link key={r.href} href={r.href}>{r.label}</Link>)}</div>
        </section>

        <section className="hsp-cta">
          <h2>Tell us what you want to change or build.</h2>
          <p>Send your sketch, existing plan, inspiration images or project brief. We’ll review the material and recommend the right next step.</p>
          <div className="hsp-actions" style={{ justifyContent: "center" }}><Link className="hsp-btn hsp-primary" href="/contact">Start your project</Link></div>
        </section>
      </div>
    </main>
  );
}
