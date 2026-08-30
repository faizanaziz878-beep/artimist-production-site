import Link from "next/link";

const VISUAL_ARCHIVE_SLUGS = new Set([
  "visualization",
  "floor-plan-to-3d-rendering",
  "house-exterior-design-service",
]);

const bridgeCss = `
.visual-archive-bridge{background:#09090a;color:#eee8e3;border-top:1px solid rgba(255,255,255,.1);padding:0 max(22px,4vw) 82px}.visual-archive-bridge__inner{width:min(1320px,100%);margin:auto;display:grid;grid-template-columns:1fr auto;align-items:end;gap:34px;padding-top:48px}.visual-archive-bridge small{display:block;color:#d35e74;font:650 9px/1.2 Arial,sans-serif;letter-spacing:.15em;text-transform:uppercase;margin-bottom:10px}.visual-archive-bridge h2{max-width:760px;margin:0;font:400 clamp(34px,4vw,58px)/.98 Georgia,'Times New Roman',serif;letter-spacing:-.035em}.visual-archive-bridge p{max-width:650px;margin:18px 0 0;color:#a99e98;font:400 14px/1.65 Arial,sans-serif}.visual-archive-bridge a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;background:#992636;color:#fff;text-decoration:none;font:650 9px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}@media(max-width:760px){.visual-archive-bridge{padding:0 18px 72px}.visual-archive-bridge__inner{grid-template-columns:1fr;align-items:start}.visual-archive-bridge a{width:100%}}
`;

export default async function LandingLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ landing: string }> }>) {
  const { landing } = await params;
  const showArchive = VISUAL_ARCHIVE_SLUGS.has(landing);

  return <>
    {children}
    {showArchive ? <section className="visual-archive-bridge" aria-labelledby="visual-archive-bridge-title">
      <style dangerouslySetInnerHTML={{ __html: bridgeCss }} />
      <div className="visual-archive-bridge__inner">
        <div><small>More visual evidence</small><h2 id="visual-archive-bridge-title">Browse the wider architecture and interior image archive.</h2><p>Move beyond the selected case studies into a larger collection of interiors, residential exteriors, technical plates and architectural visualization studies.</p></div>
        <Link href="/visual-archive">Open visual archive</Link>
      </div>
    </section> : null}
  </>;
}
