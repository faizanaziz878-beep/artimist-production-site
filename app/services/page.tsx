import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "../../lib/data";
import { ServicesExperience } from "../studio-path";
import { GeneratedStudyStrip } from "../generated-architecture-gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Architecture, BIM, Interiors & 3D Visualization Services | Artimist",
  description: "Explore Artimist Productions services across architecture, custom homes, interiors, BIM/Revit, CAD drafting, permit documentation, architectural visualization, animation and Unreal Engine.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Architecture, BIM, Interiors & 3D Visualization Services | Artimist",
    description: "Architecture, interiors, BIM/Revit, drafting, architectural visualization, animation and real-time experiences in one multidisciplinary studio.",
    url: "https://www.artimistproductions.com/services",
    type: "website",
    images: [{ url: "/media/atlas/atlas-08.webp", alt: "Artimist Productions architecture, BIM, interiors and visualization services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture, BIM, Interiors & Visualization Services | Artimist Productions",
    description: "Architecture, interiors, BIM/Revit, drafting, visualization, animation and real-time production.",
    images: ["/media/atlas/atlas-08.webp"],
  },
};

const SERVICE_GROUPS = [
  {
    label: "Architecture & residential",
    links: [
      ["Home design services", "/home-design-services"],
      ["Custom house design", "/custom-house-design"],
      ["Plan modification", "/plan-modification-service"],
      ["3D interior design", "/3d-interior-design-service"],
      ["Renovation & permit drawings", "/residential-renovation-permit-drawings"],
      ["Architecture", "/architecture"],
      ["Permit drawing services", "/permit-drawing-services"],
      ["Construction documentation", "/construction-documentation-services"],
      ["Residential", "/residential"],
    ],
  },
  {
    label: "BIM, Revit & drafting",
    links: [
      ["BIM & drafting", "/bim-drafting"],
      ["Architectural drafting", "/architectural-drafting-services"],
      ["Revit drafting", "/revit-drafting-services"],
      ["BIM modeling", "/bim-modeling-services"],
    ],
  },
  {
    label: "Visualization & motion",
    links: [
      ["Architectural visualization", "/visualization"],
      ["Architectural rendering", "/services/architectural-rendering"],
      ["3D interior rendering", "/services/3d-interior-rendering"],
      ["Real estate rendering", "/services/real-estate-rendering"],
      ["Architectural animation", "/services/architectural-animation"],
      ["Unreal & real-time", "/unreal-engine"],
    ],
  },
] as const;

const directoryCss = `
.service-directory{position:relative;z-index:3;padding:clamp(72px,8vw,118px) clamp(22px,5vw,80px) clamp(90px,9vw,138px);background:#09090a;color:#eeeae3;border-top:1px solid rgba(255,255,255,.12);font-family:"Artimist Geist","Helvetica Neue",Arial,sans-serif}
.service-directory__head{display:grid;grid-template-columns:minmax(0,.7fr) minmax(280px,1fr);gap:36px;max-width:1280px;margin:0 auto 52px;align-items:end}
.service-directory__head small{display:block;color:#b94860;font:650 9px/1.4 "Artimist Mono",monospace;letter-spacing:.14em;text-transform:uppercase}
.service-directory__head h2{margin:12px 0 0;font-family:"Bodoni 72",Didot,"Iowan Old Style",Baskerville,"Times New Roman",serif;font-size:clamp(42px,5vw,76px);line-height:.94;font-weight:400;letter-spacing:-.035em}
.service-directory__head p{max-width:660px;margin:0;color:rgba(238,234,227,.62);font-size:15px;line-height:1.75}
.service-directory__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;max-width:1280px;margin:0 auto;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.12)}
.service-directory__group{padding:clamp(24px,3vw,38px);background:#0c0c0d;min-width:0}
.service-directory__group>span{display:block;margin-bottom:22px;color:rgba(238,234,227,.43);font:650 8px/1.4 "Artimist Mono",monospace;letter-spacing:.13em;text-transform:uppercase}
.service-directory__group nav{display:grid}
.service-directory__group a{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.1);color:#eeeae3;text-decoration:none;font-size:14px;line-height:1.35}
.service-directory__group a::after{content:"";flex:0 0 auto;width:7px;height:7px;border-top:1px solid currentColor;border-right:1px solid currentColor;transform:rotate(45deg);opacity:.45;transition:transform .2s ease,opacity .2s ease}
.service-directory__group a:hover::after{transform:translateX(2px) rotate(45deg);opacity:1}
.service-directory__evidence{display:flex;flex-wrap:wrap;gap:10px 24px;max-width:1280px;margin:28px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,.1)}
.service-directory__evidence span{color:rgba(238,234,227,.4);font:650 8px/1.6 "Artimist Mono",monospace;letter-spacing:.12em;text-transform:uppercase}
.service-directory__evidence a{color:rgba(238,234,227,.72);font-size:12px;text-decoration:none;border-bottom:1px solid rgba(238,234,227,.24)}
.service-directory__evidence a:hover{color:#fff;border-color:#b94860}
@media(max-width:900px){.service-directory__head{grid-template-columns:1fr}.service-directory__grid{grid-template-columns:1fr}.service-directory__group{padding:28px 24px}}
@media(max-width:600px){.service-directory{padding:64px 20px calc(96px + env(safe-area-inset-bottom))}.service-directory__head{margin-bottom:36px}.service-directory__head h2{font-size:clamp(42px,13vw,62px)}.service-directory__evidence{display:grid;gap:12px}}
`;

export default async function ServicesPage() {
  const { settings } = await getPublicContent();
  return <>
    <ServicesExperience settings={settings} />
    <GeneratedStudyStrip slug="services" category="architecture" count={1} title="One studio, resolved through space." />
    <section className="service-directory" aria-labelledby="service-directory-title">
      <style dangerouslySetInnerHTML={{ __html: directoryCss }} />
      <div className="service-directory__head">
        <div><small>Service directory / direct routes</small><h2 id="service-directory-title">Find the right specialist path.</h2></div>
        <p>Start with the outcome you actually need. Each focused page explains scope, inputs, deliverables and the way that service connects back into the wider studio.</p>
      </div>
      <div className="service-directory__grid">
        {SERVICE_GROUPS.map((group) => <article className="service-directory__group" key={group.label}>
          <span>{group.label}</span>
          <nav aria-label={group.label}>
            {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </article>)}
      </div>
      <nav className="service-directory__evidence" aria-label="Project evidence and guidance">
        <span>Evidence & guidance</span>
        <Link href="/case-studies">Case studies</Link>
        <Link href="/visual-archive">Visual archive</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/process">Process</Link>
        <Link href="/international">International delivery</Link>
      </nav>
    </section>
  </>;
}
