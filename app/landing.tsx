import Link from "next/link";
import type { Metadata } from "next";
import { getLandingPage, resolveLink, type LandingPage } from "../lib/landing-content";

const BASE = "https://www.artimistproductions.com";
const WHATSAPP = "https://wa.me/18078084181";
const EMAIL = "mailto:studio@artimistproductions.com?subject=Project%20enquiry";

const CSS = ".lp-root{position:relative;min-height:100vh;background:#0b090a;color:#ece7e2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.6}.lp-root::before{content:'';position:fixed;inset:0;pointer-events:none;background:radial-gradient(1100px 620px at 50% -8%,rgba(153,38,54,.30),rgba(20,13,14,0) 60%),radial-gradient(820px 640px at 88% 12%,rgba(70,22,34,.22),transparent 55%),linear-gradient(180deg,#130c0e,#0b090a 55%)}.lp-root>*{position:relative}.lp-root h1,.lp-root h2,.lp-root h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0}.lp-kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#c9536a;font-weight:600}.lp-wrap{max-width:860px;margin:0 auto;padding:0 40px}.lp-crumbs{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:26px 0;font-size:12px;letter-spacing:.06em;color:#8a807a}.lp-crumbs a{color:#9a8f89;text-decoration:none}.lp-crumbs a:hover{color:#ece7e2}.lp-crumbs span{opacity:.5}.lp-hero{padding:44px 0 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,.08)}.lp-hero h1{font-size:58px;line-height:1.04;margin:16px 0 18px}.lp-tagline{font-family:Georgia,serif;font-size:25px;color:#e6dcd7;font-style:italic;max-width:24ch;margin:0 auto}.lp-lead{font-size:22px;line-height:1.55;color:#d8d1cc;padding:46px 0 8px;text-align:center;font-family:Georgia,serif;max-width:62ch;margin:0 auto}.lp-sec{padding:34px 0;border-top:1px solid rgba(255,255,255,.08)}.lp-sec:first-of-type{border-top:0}.lp-sec h2{font-size:30px;margin-bottom:18px}.lp-sec p{color:#b3a9a3;font-size:17px;max-width:70ch}.lp-list{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:12px}.lp-list li{color:#c7bdb7;font-size:16px;padding-left:20px;position:relative}.lp-list li::before{content:'';position:absolute;left:0;top:11px;width:7px;height:7px;background:#992636;border-radius:50%}.lp-chips{display:flex;flex-wrap:wrap;gap:11px;margin-top:16px}.lp-chip{border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:9px 18px;font-size:13px;color:#cdc4bf}.lp-steps{display:grid;gap:22px;margin-top:18px}.lp-step{border-left:2px solid rgba(153,38,54,.5);padding:2px 0 2px 20px}.lp-step h3{font-size:21px;margin-bottom:6px}.lp-step p{color:#a99f99;font-size:16px}.lp-faq{margin-top:14px}.lp-faq details{border-top:1px solid rgba(255,255,255,.09);padding:18px 0}.lp-faq summary{cursor:pointer;font-family:Georgia,serif;font-size:20px;color:#ece7e2;list-style:none}.lp-faq summary::-webkit-details-marker{display:none}.lp-faq summary::after{content:'+';float:right;color:#c9536a}.lp-faq details[open] summary::after{content:'–'}.lp-faq p{color:#a99f99;font-size:16px;margin:12px 0 0;max-width:70ch}.lp-cta{margin-top:34px;padding:44px;border:1px solid rgba(255,255,255,.12);border-radius:6px;text-align:center;background:rgba(255,255,255,.02)}.lp-cta h2{font-size:30px;margin-bottom:8px}.lp-cta p{color:#a99f99;font-size:16px;margin:0 auto 24px;max-width:52ch}.lp-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}.lp-btn{display:inline-block;text-decoration:none;padding:15px 30px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;border-radius:40px}.lp-btn-primary{background:#992636;color:#fff}.lp-btn-primary:hover{filter:brightness(1.15)}.lp-btn-ghost{border:1px solid rgba(255,255,255,.22);color:#ece7e2}.lp-btn-ghost:hover{border-color:#992636}.lp-mini{margin-top:18px;font-size:13px;color:#8a807a}.lp-mini a{color:#c7bdb7;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.18)}.lp-mini a:hover{color:#fff}.lp-more{padding:34px 0 110px;border-top:1px solid rgba(255,255,255,.08);text-align:center}.lp-more-links{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:18px}.lp-more-links a{color:#cdc4bf;text-decoration:none;border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:10px 20px;font-size:14px}.lp-more-links a:hover{border-color:#992636;color:#fff}@media(max-width:760px){.lp-hero h1{font-size:38px}.lp-wrap{padding:0 22px}.lp-cta{padding:30px 20px}}";

export function landingMetadata(slug: string): Metadata {
  const p = getLandingPage(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.desc,
    alternates: { canonical: "/" + p.slug },
    openGraph: { title: p.title, description: p.desc, url: `${BASE}/${p.slug}`, type: "website" },
  };
}

function schema(p: LandingPage) {
  const crumbs = [{ name: "Home", url: BASE + "/" }];
  if (p.parentHub) {
    const hub = getLandingPage(p.parentHub);
    if (hub) crumbs.push({ name: hub.name, url: `${BASE}/${hub.slug}` });
  }
  crumbs.push({ name: p.name, url: `${BASE}/${p.slug}` });

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
    },
    {
      "@type": "Service",
      name: p.h1,
      serviceType: p.name,
      description: p.desc,
      url: `${BASE}/${p.slug}`,
      provider: { "@type": "Organization", name: "Artimist Production", url: BASE },
      areaServed: ["United States", "Canada", "Worldwide"],
    },
    {
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}

export function LandingPageView({ slug }: { slug: string }) {
  const p = getLandingPage(slug)!;
  const hub = p.parentHub ? getLandingPage(p.parentHub) : undefined;

  return (
    <main className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(p)) }} />
      <div className="lp-wrap">
        <nav className="lp-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          {hub && (<><Link href={"/" + hub.slug}>{hub.name}</Link><span>/</span></>)}
          <span style={{ color: "#c7bdb7" }}>{p.name}</span>
        </nav>

        <header className="lp-hero">
          <div className="lp-kicker">{p.kind === "hub" ? "Capability" : "Service"}</div>
          <h1>{p.h1}</h1>
          <p className="lp-tagline">{p.tagline}</p>
        </header>

        <p className="lp-lead">{p.intro}</p>

        <section className="lp-sec">
          <h2>Who it is for</h2>
          <p>{p.forWho}</p>
        </section>

        <section className="lp-sec">
          <h2>Problems we solve</h2>
          <ul className="lp-list">{p.problems.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>

        <section className="lp-sec">
          <h2>{p.kind === "hub" ? "What this covers" : "What is included"}</h2>
          <div className="lp-chips">{p.included.map((x) => <span className="lp-chip" key={x}>{x}</span>)}</div>
        </section>

        {p.deliverables && (
          <section className="lp-sec">
            <h2>What you receive</h2>
            <ul className="lp-list">{p.deliverables.map((x) => <li key={x}>{x}</li>)}</ul>
          </section>
        )}

        {p.inputs && (
          <section className="lp-sec">
            <h2>Formats we accept</h2>
            <div className="lp-chips">{p.inputs.map((x) => <span className="lp-chip" key={x}>{x}</span>)}</div>
          </section>
        )}

        <section className="lp-sec">
          <h2>How we work</h2>
          <div className="lp-steps">
            {p.workflow.map((s) => (
              <div className="lp-step" key={s.h}><h3>{s.h}</h3><p>{s.p}</p></div>
            ))}
          </div>
        </section>

        {p.software && (
          <section className="lp-sec">
            <h2>Software & capabilities</h2>
            <div className="lp-chips">{p.software.map((x) => <span className="lp-chip" key={x}>{x}</span>)}</div>
          </section>
        )}

        {p.quality && (
          <section className="lp-sec">
            <h2>Quality control</h2>
            <p>{p.quality}</p>
          </section>
        )}

        <section className="lp-sec">
          <h2>Frequently asked</h2>
          <div className="lp-faq">
            {p.faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        <section className="lp-cta">
          <h2>Bring us the project.</h2>
          <p>Send a finished brief, a rough idea or a difficult question. You will get a specific answer, not a sales pitch.</p>
          <div className="lp-btns">
            <a className="lp-btn lp-btn-primary" href="/contact">Upload your project</a>
            <a className="lp-btn lp-btn-ghost" href="/contact">Book a project review</a>
          </div>
          <p className="lp-mini">Or reach us directly on <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a> or by <a href={EMAIL}>email</a>.</p>
        </section>

        <section className="lp-more">
          <div className="lp-kicker">Related</div>
          <div className="lp-more-links">
            {p.related.map((s) => {
              const l = resolveLink(s);
              return <Link href={l.href} key={s}>{l.name}</Link>;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
