import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://www.artimistproductions.com";

export const metadata: Metadata = {
  title: "Proof, Clients & Project Evidence | Artimist Productions",
  description:
    "Verify Artimist Productions through real project case studies, published client and collaborator references, team identity, transparent international delivery and a permission-based review process.",
  alternates: { canonical: "/proof" },
  openGraph: {
    title: "Proof, Clients & Project Evidence | Artimist Productions",
    description:
      "Real project evidence, public studio identity, transparent service markets and a review process that only publishes approved client feedback.",
    url: `${BASE}/proof`,
    type: "website",
  },
};

const clients = [
  "Yellow Productions",
  "Johnny Beig",
  "Dioz Group",
  "Label Realty Group",
  "Alaskan Made",
];

const evidence = [
  { href: "/case-studies/rv-park-design", title: "RV Park Design & Site Planning", meta: "United States · site planning · architecture · visualization" },
  { href: "/case-studies/us-permit-documentation", title: "U.S. Permit Documentation", meta: "Revit · BIM · CAD · drawing production" },
  { href: "/case-studies/bowl-stroke", title: "Bowl Stroke", meta: "Hospitality · architecture · interiors · animation" },
  { href: "/case-studies/home-interior-design", title: "Whole-Home Interior Design", meta: "Interior design · spatial planning · visualization" },
  { href: "/case-studies/residential-exterior-design", title: "Residential Exterior Design", meta: "Architecture · landscape · 3D visualization" },
  { href: "/case-studies/harmonic-horizons", title: "Harmonic Horizons", meta: "Architecture · master planning · research · visualization" },
];

const markets = [
  { href: "/usa", code: "USA", copy: "Remote design, BIM/Revit, documentation and visualization support for U.S. projects." },
  { href: "/canada", code: "CAN", copy: "Custom home, renovation, BIM/Revit and visualization support for Canadian projects." },
  { href: "/uk", code: "UK", copy: "Architecture support, BIM/Revit, planning/Building Regulations drawing support and CGI." },
  { href: "/sweden", code: "SWE", copy: "Architecture, interiors, BIM/Revit and visualization support for Swedish projects." },
];

const CSS = `
.proof{min-height:100vh;background:#090809;color:#eee8e3;padding-top:84px;font-family:Arial,Helvetica,sans-serif;line-height:1.65}.proof *{box-sizing:border-box}.proof a{color:inherit}.proof-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}.proof-crumb{padding:26px 0 16px;font-size:12px;color:#938983}.proof-crumb a{text-decoration:none}.proof-hero{padding:54px 0 82px;display:grid;grid-template-columns:1.15fr .85fr;gap:64px;align-items:end}.proof-kicker{color:#cf5267;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.proof h1,.proof h2,.proof h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.proof h1{font-size:clamp(52px,7.6vw,104px);line-height:.92;letter-spacing:-.055em;margin:16px 0 26px}.proof-lead{font-size:20px;color:#c3b8b2;max-width:62ch}.proof-principle{border:1px solid rgba(255,255,255,.11);border-radius:18px;padding:30px;background:linear-gradient(145deg,rgba(153,38,54,.18),rgba(255,255,255,.02))}.proof-principle strong{display:block;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:29px;line-height:1.15;margin:10px 0 14px}.proof-principle p{margin:0;color:#aaa09a}.proof-section{padding:68px 0;border-top:1px solid rgba(255,255,255,.09)}.proof-section-head{display:grid;grid-template-columns:.45fr 1fr;gap:52px;margin-bottom:30px}.proof-section h2{font-size:clamp(34px,4.3vw,56px);line-height:1.05;margin:0}.proof-section-head p{margin:0;color:#a99e98;max-width:68ch}.proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.proof-card{display:block;text-decoration:none;padding:24px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:#100e0f;min-height:180px;transition:transform .25s ease,border-color .25s ease}.proof-card:hover{transform:translateY(-2px);border-color:rgba(207,82,103,.48)}.proof-card small{color:#cf5267;font-size:9px;letter-spacing:.14em;text-transform:uppercase}.proof-card h3{font-size:25px;line-height:1.08;margin:14px 0 9px}.proof-card p{margin:0;color:#968c87;font-size:13px}.proof-clients{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden}.proof-client{min-height:145px;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;border-right:1px solid rgba(255,255,255,.1);font-family:Georgia,'Times New Roman',serif;font-size:22px;background:rgba(255,255,255,.018)}.proof-client:last-child{border-right:0}.proof-note{margin-top:18px;color:#847a75;font-size:12px;max-width:80ch}.proof-policy{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.proof-policy article{padding:26px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#100e0f}.proof-policy b{display:block;color:#cf5267;font-size:10px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:10px}.proof-policy h3{font-size:25px;margin:0 0 10px}.proof-policy p{margin:0;color:#a99e98}.proof-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.proof-pill{display:inline-flex;text-decoration:none;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:10px 15px;font-size:12px;color:#d8cfca}.proof-cta{margin:42px 0 120px;padding:48px 28px;text-align:center;border-radius:18px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(135deg,rgba(153,38,54,.22),rgba(255,255,255,.02))}.proof-cta h2{font-size:clamp(34px,4vw,50px);margin:0 0 12px}.proof-cta p{max-width:62ch;margin:0 auto 24px;color:#aaa09a}.proof-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.proof-btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border-radius:999px;padding:14px 22px;font-size:11px;letter-spacing:.08em;text-transform:uppercase}.proof-btn-primary{background:#992636;color:#fff!important}.proof-btn-secondary{border:1px solid rgba(255,255,255,.18)}
@media(max-width:900px){.proof-hero,.proof-section-head{grid-template-columns:1fr}.proof-hero{gap:30px}.proof-grid{grid-template-columns:1fr 1fr}.proof-clients{grid-template-columns:1fr 1fr}.proof-client{border-bottom:1px solid rgba(255,255,255,.1)}.proof-policy{grid-template-columns:1fr}}
@media(max-width:620px){.proof{padding-top:72px}.proof-wrap{width:min(100% - 28px,1180px)}.proof-hero{padding:38px 0 58px}.proof h1{font-size:50px}.proof-grid{grid-template-columns:1fr}.proof-clients{grid-template-columns:1fr}.proof-client{min-height:100px;border-right:0}.proof-section{padding:52px 0}.proof-cta{padding:34px 20px;margin-bottom:140px}}
`;

export default function ProofPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${BASE}/proof#page`,
        url: `${BASE}/proof`,
        name: "Artimist Productions — Proof, Clients & Project Evidence",
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Proof", item: `${BASE}/proof` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Selected Artimist project evidence",
        itemListElement: evidence.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.title,
          url: `${BASE}${item.href}`,
        })),
      },
    ],
  };

  return (
    <main className="proof">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="proof-wrap">
        <nav className="proof-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / Proof</nav>

        <section className="proof-hero">
          <div>
            <div className="proof-kicker">Trust should be inspectable</div>
            <h1>Proof before promises.</h1>
            <p className="proof-lead">This page puts the evidence behind Artimist in one place: real project case studies, publicly listed client and collaborator names, identifiable people, transparent service markets, and a review workflow that requires publication permission before anything can appear as a testimonial.</p>
          </div>
          <aside className="proof-principle">
            <div className="proof-kicker">Studio policy</div>
            <strong>No invented offices, awards, reviews or credentials.</strong>
            <p>If a claim cannot be supported by project material, a public profile, a client submission, a source link or a document we can retain, it should not be presented as proof.</p>
          </aside>
        </section>

        <section className="proof-section">
          <div className="proof-section-head">
            <div><div className="proof-kicker">01 / Project evidence</div><h2>See the work in context.</h2></div>
            <p>A strong portfolio is more useful when the project page explains the brief, approach, deliverables and what the work demonstrates. These case studies are built from projects already published in Artimist's portfolio rather than generic stock examples.</p>
          </div>
          <div className="proof-grid">
            {evidence.map((item, index) => (
              <Link className="proof-card" href={item.href} key={item.href}>
                <small>{String(index + 1).padStart(2, "0")} / Case study</small>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </Link>
            ))}
          </div>
          <div className="proof-links"><Link className="proof-pill" href="/case-studies">View all case studies</Link><Link className="proof-pill" href="/visual-archive">Browse visual archive</Link><Link className="proof-pill" href="/process">See the studio process</Link></div>
        </section>

        <section className="proof-section">
          <div className="proof-section-head">
            <div><div className="proof-kicker">02 / Relationships</div><h2>Names already published by the studio.</h2></div>
            <p>These names are already displayed by Artimist as selected clients or collaborators. This page does not turn that listing into an endorsement, invent project results, or claim permission beyond the way the relationship is already presented. Reference detail can be shared privately where appropriate.</p>
          </div>
          <div className="proof-clients">{clients.map((client) => <div className="proof-client" key={client}>{client}</div>)}</div>
          <p className="proof-note">Relationship labels are intentionally conservative. If a client supplies a publishable review, project credit, logo permission or public source, that stronger proof can be added without changing the underlying standard.</p>
        </section>

        <section className="proof-section">
          <div className="proof-section-head">
            <div><div className="proof-kicker">03 / Real people</div><h2>A studio with identifiable people behind it.</h2></div>
            <p>Clients can inspect the team, founder, process and public professional presence before starting a project. Artimist's public LinkedIn company profile also provides an external identity trail separate from this website.</p>
          </div>
          <div className="proof-grid">
            <Link className="proof-card" href="/team"><small>Team</small><h3>Meet the studio</h3><p>Named team members, roles and disciplines.</p></Link>
            <Link className="proof-card" href="/founder-message"><small>Founder</small><h3>Founder&apos;s message</h3><p>Who is accountable for the direction of the practice.</p></Link>
            <a className="proof-card" href="https://www.linkedin.com/company/artimist-productions" target="_blank" rel="noopener noreferrer"><small>Public profile</small><h3>LinkedIn</h3><p>An external company identity and activity trail.</p></a>
          </div>
        </section>

        <section className="proof-section">
          <div className="proof-section-head">
            <div><div className="proof-kicker">04 / Service markets</div><h2>International work, stated accurately.</h2></div>
            <p>Country pages describe markets Artimist serves remotely. They are not used to imply a physical office or local professional licence that does not exist. Where a project requires a locally licensed architect, engineer or other professional, that requirement is treated as a real project constraint.</p>
          </div>
          <div className="proof-grid">{markets.map((market) => <Link className="proof-card" href={market.href} key={market.code}><small>{market.code}</small><h3>{market.code === "CAN" ? "Canada" : market.code === "SWE" ? "Sweden" : market.code === "UK" ? "United Kingdom" : "United States"}</h3><p>{market.copy}</p></Link>)}</div>
          <div className="proof-links"><Link className="proof-pill" href="/international">International delivery overview</Link></div>
        </section>

        <section className="proof-section">
          <div className="proof-section-head">
            <div><div className="proof-kicker">05 / Verification standard</div><h2>How stronger trust signals become legitimate.</h2></div>
            <p>The website now has a repeatable standard for the trust signals that matter most to clients and search engines. The goal is not to remove reviews, recognition or references; it is to make each one defensible.</p>
          </div>
          <div className="proof-policy">
            <article><b>Reviews</b><h3>Permission first.</h3><p>Client feedback enters as pending, includes explicit publication permission, and is reviewed before publication. A submitted review is never treated as verified merely because it was submitted.</p></article>
            <article><b>Locations</b><h3>Service market ≠ office.</h3><p>Country landing pages explain where the studio can work. Physical-office claims should only be made where an actual operating location can be substantiated.</p></article>
            <article><b>Awards & press</b><h3>Source required.</h3><p>Award wins, nominations, editorial features and certifications should be accompanied by a source URL, certificate, official announcement or other retained evidence before publication.</p></article>
            <article><b>Client & partner proof</b><h3>Use the strongest permission available.</h3><p>A name can remain a conservative client/collaborator reference. Logos, quotes, project results and endorsements should be upgraded only when the studio has the corresponding permission or public evidence.</p></article>
          </div>
        </section>

        <section className="proof-cta">
          <h2>Want to verify the studio before starting?</h2>
          <p>Ask for relevant project references, review the case studies, or speak directly with the studio. Existing clients can also submit feedback through the permission-based review form.</p>
          <div className="proof-actions"><Link className="proof-btn proof-btn-primary" href="/contact">Request references</Link><Link className="proof-btn proof-btn-secondary" href="/review">Leave a client review</Link></div>
        </section>
      </div>
    </main>
  );
}
