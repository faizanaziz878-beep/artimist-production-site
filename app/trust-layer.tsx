"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const standards = [
  { code: "01", title: "Scope before production", copy: "Before production starts, the brief, deliverables, timeline, revision allowance and payment milestones are defined in the quotation or project agreement. Work outside that scope is identified before it is treated as additional work." },
  { code: "02", title: "Confidential when required", copy: "NDA-based and confidential workflows are available. Non-public drawings, models, project links and commercial information are handled for delivery and are not presented as public project proof without permission." },
  { code: "03", title: "Revision control", copy: "Unless a project agreement states otherwise, the standard framework allows up to three reasonable revision rounds on Artimist's original work. New directions, redesigns and additional rounds may be separately quoted." },
  { code: "04", title: "Defined handover", copy: "The agreed scope identifies the final deliverables—such as PDFs, DWGs, RVTs, images, animation or specifically included source files. Final handover and usage rights are subject to the applicable agreement and payment status." },
  { code: "05", title: "Permit application responsibility", copy: "Where permit-application services are included in the agreed scope, Artimist can prepare, coordinate and support the permit application package and submission process. Artimist does not provide a regional architectural or engineering stamp, seal or statutory certification. Any legally required stamp, seal or professional certification must be provided by the appropriately licensed local professional." },
  { code: "06", title: "International delivery", copy: "Artimist works remotely with clients and professional teams across multiple markets. A market page describes service availability; it does not by itself represent a licensed local office, Architect of Record or Engineer of Record." },
  { code: "07", title: "Payment milestones", copy: "Project-specific terms control. The standard commercial framework may use a 20–40% mobilization payment with the remaining 60–80% billed through progress, monthly or agreed milestone invoices." },
  { code: "08", title: "Human accountability", copy: "Clients can communicate directly with the studio throughout delivery. Project-specific pricing, scope, technical decisions, complaints, negotiations and urgent matters can be escalated for human review." },
];

const proofLinks = [
  ["Project evidence", "/proof"], ["Case studies", "/case-studies"], ["Meet the team", "/team"],
  ["Founder", "/founder-message"], ["Studio process", "/process"], ["Client terms", "/legal"], ["Start a project", "/contact"],
] as const;

const assurances = [
  ["Before you send files", "Share only material needed for review. For sensitive work, request an NDA before confidential information is transferred."],
  ["During production", "Consolidated feedback keeps revisions measurable. Delays, changed instructions or third-party corrections that materially expand the agreed work may affect fees and schedule."],
  ["At completion", "The final package follows the contracted deliverable list. Native/source files are included only when the scope says they are included."],
  ["For permit applications", "Where included in scope, Artimist can prepare and coordinate the application package and submission support. Required professional stamps, seals and certifications remain with the locally licensed professional."],
] as const;

export function TrustLayer() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;

  return (
    <section className="trust-layer" aria-labelledby="trust-layer-title">
      <div className="trust-layer-inner">
        <header className="trust-layer-head">
          <div><p className="trust-layer-kicker">Working standard</p><h2 id="trust-layer-title">Know how the project works before you commit.</h2></div>
          <p>Artimist Productions keeps scope, responsibility, proof and commercial expectations visible. Project-specific signed terms always take priority over this summary.</p>
        </header>
        <div className="trust-layer-grid">{standards.map((item) => <article key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
        <div className="trust-layer-proof"><div><p className="trust-layer-kicker">Verify the studio</p><strong>Real work. Named people. Direct contact.</strong></div><nav aria-label="Artimist trust and project links">{proofLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div>
        <div className="trust-assurance-grid" aria-label="Client assurance summary">{assurances.map(([title,copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="trust-layer-note"><span>Project files & privacy</span><p>Client personal and confidential information is not treated as collateral for an unpaid invoice. Artimist may instead suspend services, withhold unpaid work product or source files, and use lawful recovery remedies. Clients should maintain their own permanent archive after delivery.</p><Link href="/legal#data">Read data & confidentiality terms →</Link></div>
        <div className="trust-layer-note"><span>Professional boundaries</span><p>Artimist can take responsibility for the agreed permit-application preparation and submission-support scope. Where a jurisdiction requires a registered architect, engineer, certifier or other Professional of Record to stamp, seal or certify documents, that professional must independently review and assume the responsibility required by local law.</p><Link href="/legal#stamps">Read permit & stamping terms →</Link></div>
      </div>
    </section>
  );
}
