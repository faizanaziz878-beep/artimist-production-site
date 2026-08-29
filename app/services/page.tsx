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
  twitter: { card: "summary_large_image", title: "Architecture, BIM, Interiors & Visualization Services | Artimist Productions", description: "Architecture, interiors, BIM/Revit, drafting, visualization, animation and real-time production.", images: ["/media/atlas/atlas-08.webp"] },
};

const SERVICE_GROUPS = [
  {
    label: "Architecture & residential", image: "/media/atlas/atlas-08.webp", alt: "Contemporary architecture developed by Artimist Productions",
    statement: "From first sketch to a resolved home, permit set or construction-ready design direction.",
    links: [["Home design services", "/home-design-services"],["Custom house design", "/custom-house-design"],["Plan modification", "/plan-modification-service"],["3D interior design", "/3d-interior-design-service"],["Renovation & permit drawings", "/residential-renovation-permit-drawings"],["Architecture", "/architecture"],["Permit drawing services", "/permit-drawing-services"],["Construction documentation", "/construction-documentation-services"],["Residential", "/residential"]],
  },
  {
    label: "BIM, Revit & drafting", image: "/img/permit01.webp", alt: "Technical drawing and BIM documentation by Artimist Productions",
    statement: "Precise production support for teams that need coordinated models, drawings and dependable documentation.",
    links: [["BIM & drafting", "/bim-drafting"],["Architectural drafting", "/architectural-drafting-services"],["Revit drafting", "/revit-drafting-services"],["BIM modeling", "/bim-modeling-services"]],
  },
  {
    label: "Visualization & motion", image: "/media/atlas/atlas-06.webp", alt: "Architectural visualization by Artimist Productions",
    statement: "Stills, films and real-time environments built to make unbuilt space feel believable.",
    links: [["Architectural visualization", "/visualization"],["Architectural rendering", "/services/architectural-rendering"],["3D interior rendering", "/services/3d-interior-rendering"],["Real estate rendering", "/services/real-estate-rendering"],["Architectural animation", "/services/architectural-animation"],["Unreal & real-time", "/unreal-engine"]],
  },
] as const;

const directoryCss = `
.service-directory{position:relative;z-index:3;background:#090708;color:#eee8e3;padding:110px 0 140px;border-top:1px solid rgba(255,255,255,.12);font-family:"Artimist Geist","Helvetica Neue",Arial,sans-serif}.service-directory__shell{width:min(1560px,calc(100% - 80px));margin:auto}.service-directory__head{display:grid;grid-template-columns:.33fr .67fr;gap:60px;align-items:end;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,.14)}.service-directory__head small{color:#c55369;font:650 9px/1.4 "Artimist Mono",monospace;letter-spacing:.16em;text-transform:uppercase}.service-directory__head h2{margin:0;font-family:"Bodoni 72",Didot,"Iowan Old Style",Baskerville,"Times New Roman",serif;font-size:clamp(56px,7vw,110px);line-height:.88;font-weight:400;letter-spacing:-.055em}.service-directory__head p{grid-column:2;max-width:720px;margin:24px 0 0;color:rgba(238,232,227,.62);font-size:16px;line-height:1.7}.service-directory__group{display:grid;grid-template-columns:.46fr .54fr;gap:42px;padding:64px 0;border-bottom:1px solid rgba(255,255,255,.13)}.service-directory__visual{position:relative;min-height:520px;overflow:hidden;background:#151113}.service-directory__visual img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.2,.7,.2,1)}.service-directory__group:hover .service-directory__visual img{transform:scale(1.025)}.service-directory__visual:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,5,6,.7),transparent 58%)}.service-directory__visual span{position:absolute;z-index:2;left:18px;bottom:16px;color:#fff;font:650 9px/1.4 "Artimist Mono",monospace;letter-spacing:.14em;text-transform:uppercase}.service-directory__content{display:flex;flex-direction:column}.service-directory__index{color:#8d263a;font-family:Georgia,serif;font-size:54px;line-height:1}.service-directory__content h3{margin:18px 0 14px;font:400 clamp(38px,4vw,64px)/.96 Georgia,serif;letter-spacing:-.035em}.service-directory__content>p{max-width:680px;margin:0 0 34px;color:rgba(238,232,227,.58);font-size:15px;line-height:1.65}.service-directory__links{margin-top:auto;border-top:1px solid rgba(255,255,255,.12)}.service-directory__links a{display:grid;grid-template-columns:1fr auto;align-items:center;gap:20px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.1);color:#e7e0dc;text-decoration:none;font-size:14px}.service-directory__links a:after{content:"↗";font-size:13px;color:#8d263a;transition:transform .2s}.service-directory__links a:hover{color:#fff}.service-directory__links a:hover:after{transform:translate(2px,-2px)}.service-directory__evidence{display:flex;align-items:center;gap:26px;flex-wrap:wrap;padding-top:42px}.service-directory__evidence span{color:#c55369;font:650 9px/1.6 "Artimist Mono",monospace;letter-spacing:.14em;text-transform:uppercase}.service-directory__evidence a{color:rgba(238,232,227,.7);font-size:12px;text-decoration:none;border-bottom:1px solid rgba(238,232,227,.2);padding-bottom:2px}.service-directory__evidence a:hover{color:#fff;border-color:#c55369}@media(max-width:900px){.service-directory{padding:80px 0 120px}.service-directory__shell{width:calc(100% - 40px)}.service-directory__head{grid-template-columns:1fr;gap:18px}.service-directory__head p{grid-column:auto}.service-directory__group{grid-template-columns:1fr;gap:28px}.service-directory__visual{min-height:58vw}.service-directory__index{font-size:42px}}@media(max-width:600px){.service-directory{padding:70px 0 calc(120px + env(safe-area-inset-bottom))}.service-directory__shell{width:calc(100% - 32px)}.service-directory__head h2{font-size:54px}.service-directory__group{padding:42px 0}.service-directory__visual{min-height:72vw}.service-directory__content h3{font-size:38px}.service-directory__content>p{font-size:14px}.service-directory__evidence{display:grid;gap:12px}}@media(prefers-reduced-motion:reduce){.service-directory__visual img{transition:none}.service-directory__group:hover .service-directory__visual img{transform:none}}
`;

export default async function ServicesPage() {
  const { settings } = await getPublicContent();
  return <>
    <ServicesExperience settings={settings} />
    <GeneratedStudyStrip slug="services" category="architecture" count={1} title="One studio, resolved through space." />
    <section className="service-directory" aria-labelledby="service-directory-title">
      <style dangerouslySetInnerHTML={{ __html: directoryCss }} />
      <div className="service-directory__shell">
        <header className="service-directory__head"><small>Service index / choose the problem</small><div><h2 id="service-directory-title">One studio.<br/>Three ways in.</h2><p>Start with what the project needs now. The disciplines can stay focused or connect into one continuous team as the work develops.</p></div></header>
        {SERVICE_GROUPS.map((group,index) => <article className="service-directory__group" key={group.label}>
          <figure className="service-directory__visual"><img src={group.image} alt={group.alt} loading="lazy" decoding="async"/><span>0{index + 1} / Selected Artimist work</span></figure>
          <div className="service-directory__content"><div className="service-directory__index">0{index + 1}</div><h3>{group.label}</h3><p>{group.statement}</p><nav className="service-directory__links" aria-label={group.label}>{group.links.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div>
        </article>)}
        <nav className="service-directory__evidence" aria-label="Project evidence and guidance"><span>Go deeper</span><Link href="/case-studies">Case studies</Link><Link href="/visual-archive">Visual archive</Link><Link href="/insights">Insights</Link><Link href="/process">Process</Link><Link href="/international">International delivery</Link></nav>
      </div>
    </section>
  </>;
}
