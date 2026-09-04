"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const standards = [
  ["Scope first", "Deliverables, timing, revisions and fees are agreed before production."],
  ["Confidential when needed", "NDA-based workflows are available before sensitive files are shared."],
  ["Defined handover", "Final PDFs, DWGs, RVTs, images, films or source files follow the written scope."],
  ["Honest local boundary", "Required stamps, seals and statutory certification stay with the appropriately licensed local professional."],
] as const;

const proofLinks = [
  ["Project evidence", "/proof"], ["Case studies", "/case-studies"], ["Meet the team", "/team"],
  ["Founder", "/founder-message"], ["Studio process", "/process"], ["Client terms", "/legal"], ["Start a project", "/contact"],
] as const;

export function TrustLayer() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || pathname === "/legal" || pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;

  return (
    <section className="trust-layer" aria-labelledby="trust-layer-title">
      <div className="trust-layer-inner">
        <header className="trust-layer-head">
          <div><p className="trust-layer-kicker">Working standard</p><h2 id="trust-layer-title">Clear before commitment.</h2></div>
          <p>Scope, confidentiality and handover are agreed in writing. Project-specific signed terms always take priority.</p>
        </header>
        <div className="trust-layer-grid">{standards.map(([title,copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="trust-layer-proof"><div><p className="trust-layer-kicker">Verify the studio</p><strong>Real work. Named people. Direct contact.</strong></div><nav aria-label="Artimist trust and project links">{proofLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div>
        <p className="trust-layer-boundary">Permit-support may include package preparation, coordination and submission support when agreed. Artimist does not supply a regional architectural or engineering stamp; any legally required stamp, seal or certification must come from the appropriately licensed local professional. <Link href="/legal#stamps">Read full client terms →</Link></p>
      </div>
    </section>
  );
}
