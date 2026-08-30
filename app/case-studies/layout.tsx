import Link from "next/link";
import "./case-studies-premium.css";
import "./case-study-detail-premium.css";

const css = `
.case-archive-bridge{background:#0a0909;color:#eee8e3;border-top:1px solid rgba(255,255,255,.1);padding:46px max(20px,4vw) 82px}.case-archive-bridge__inner{width:min(1280px,100%);margin:auto;display:flex;align-items:end;justify-content:space-between;gap:34px}.case-archive-bridge small{display:block;color:#d45e73;font:650 9px/1.2 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}.case-archive-bridge h2{max-width:760px;margin:9px 0 0;font:400 clamp(30px,3.6vw,50px)/1 Georgia,'Times New Roman',serif}.case-archive-bridge p{max-width:620px;margin:14px 0 0;color:#a99e98;font:400 13px/1.65 Arial,sans-serif}.case-archive-bridge a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;background:#992636;color:#fff;text-decoration:none;font:650 9px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}@media(max-width:700px){.case-archive-bridge__inner{display:block}.case-archive-bridge a{width:100%;margin-top:26px}}
`;

export default function CaseStudiesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    {children}
    <section className="case-archive-bridge" aria-labelledby="case-archive-bridge-title">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="case-archive-bridge__inner">
        <div><small>Visual archive</small><h2 id="case-archive-bridge-title">Want to scan more work before reading another case study?</h2><p>Browse the wider visual archive for residential interiors, architecture, technical plates and visualization studies.</p></div>
        <Link href="/visual-archive">Browse visual archive</Link>
      </div>
    </section>
  </>;
}
