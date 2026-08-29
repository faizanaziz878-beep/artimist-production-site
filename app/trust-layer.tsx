"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const standards = [
  {
    code: "01",
    title: "Scope before production",
    copy: "The brief, deliverables, timeline, revision allowance and payment milestones are agreed before production starts. Scope changes are identified and quoted separately rather than hidden inside the original fee.",
  },
  {
    code: "02",
    title: "Confidential when required",
    copy: "NDA-based and confidential project workflows are available. Client drawings, links and working files are used for project delivery and are not presented as public proof without permission.",
  },
  {
    code: "03",
    title: "Clear revision control",
    copy: "The revision allowance is written into the quotation. Additional rounds, new directions or work outside the agreed brief are treated as additional scope so both sides know where the project stands.",
  },
  {
    code: "04",
    title: "Defined handover",
    copy: "Every scope identifies what the client receives at completion—such as PDFs, DWGs, RVTs, images, animation or agreed source files. Source-file delivery depends on the contracted scope.",
  },
];

const proofLinks = [
  ["Project evidence", "/proof"],
  ["Case studies", "/case-studies"],
  ["Meet the team", "/team"],
  ["Founder", "/founder-message"],
  ["Studio process", "/process"],
  ["Start a project", "/contact"],
] as const;

export function TrustLayer() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;

  return (
    <section className="trust-layer" aria-labelledby="trust-layer-title">
      <div className="trust-layer-inner">
        <header className="trust-layer-head">
          <div>
            <p className="trust-layer-kicker">Working standard</p>
            <h2 id="trust-layer-title">Know how the project works before you commit.</h2>
          </div>
          <p>Artimist Productions keeps project terms, proof and accountability visible. If a claim cannot be supported by real work, a named person, a client-approved reference or a retained project record, it should not be presented as proof.</p>
        </header>

        <div className="trust-layer-grid">
          {standards.map((item) => (
            <article key={item.code}>
              <span>{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="trust-layer-proof">
          <div>
            <p className="trust-layer-kicker">Verify the studio</p>
            <strong>Real work. Named people. Direct contact.</strong>
          </div>
          <nav aria-label="Artimist trust and project links">
            {proofLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </div>

        <div className="trust-layer-note">
          <span>Project files</span>
          <p>Send only the material needed for review and production. Access links can be replaced or revoked by the client at any time. For sensitive work, request an NDA before sharing confidential material.</p>
          <Link href="/contact">Discuss a confidential project →</Link>
        </div>
      </div>
    </section>
  );
}
