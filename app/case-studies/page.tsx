import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://www.artimistproductions.com";

export const metadata: Metadata = {
  title: "Architecture, BIM & 3D Visualization Case Studies | Artimist",
  description: "Selected Artimist Productions case studies across residential design, permit documentation, site planning, interior design and architectural visualization.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Architecture, BIM & 3D Visualization Case Studies | Artimist",
    description: "Real project evidence across residential design, technical documentation, interiors and visualization.",
    url: `${BASE}/case-studies`,
    type: "website",
  },
};

const projects = [
  { href: "/case-studies/rv-park-design", title: "RV Park Design & Site Planning", meta: "United States / Site planning / Visualization", image: "/img/rvpark.webp", alt: "Aerial visualization of a wooded RV park design" },
  { href: "/case-studies/permit-application-packages", title: "Permit Application Drawing Packages", meta: "Technical / Permit documentation / Coordination", image: "/img/permit01.webp", alt: "Permit application drawing package prepared by Artimist Productions" },
  { href: "/case-studies/home-interior-design", title: "Whole-Home Interior Design & 3D Visualization", meta: "Residential / Interior / Visualization", image: "/img/homeint03.webp", alt: "Warm contemporary home interior designed and visualized by Artimist Productions" },
  { href: "/case-studies/residential-exterior-design", title: "Residential Exterior Design & Visualization", meta: "Residential / Architecture / 3D rendering", image: "/img/resext03.webp", alt: "Contemporary residential exterior visualization among pine trees" },
];

const CSS = `
.csi{min-height:100vh;background:#0a0909;color:#eee8e3;padding-top:84px;font-family:Arial,Helvetica,sans-serif}.csi *{box-sizing:border-box}.csi a{color:inherit}.csi-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}.csi-crumb{padding:26px 0;color:#9e938d;font-size:12px}.csi-crumb a{text-decoration:none}.csi-hero{padding:54px 0 70px;max-width:980px}.csi-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.csi h1,.csi h2{font-family:Georgia,'Times New Roman',serif;font-weight:400}.csi h1{font-size:clamp(50px,7vw,94px);line-height:.98;letter-spacing:-.04em;margin:16px 0 24px}.csi-lead{font-size:20px;color:#b9aea8;line-height:1.6;max-width:68ch}.csi-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding-bottom:84px}.csi-card{display:block;text-decoration:none;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;background:#100e0f}.csi-card img{width:100%;height:420px;object-fit:cover;display:block;transition:transform .6s ease}.csi-card:hover img{transform:scale(1.02)}.csi-body{padding:22px}.csi-body small{color:#9e938d;font-size:11px;letter-spacing:.06em}.csi-body h2{font-size:30px;line-height:1.15;margin:10px 0 0}.csi-cta{border-top:1px solid rgba(255,255,255,.09);padding:64px 0 92px;display:flex;align-items:end;justify-content:space-between;gap:28px}.csi-cta p{max-width:55ch;color:#a99e98;line-height:1.6}.csi-btn{display:inline-block;text-decoration:none;background:#992636;border-radius:999px;padding:14px 22px;color:#fff!important;font-size:12px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}@media(max-width:820px){.csi{padding-top:72px}.csi-grid{grid-template-columns:1fr}.csi-card img{height:340px}.csi-cta{display:block}.csi-btn{margin-top:20px}}
`;

export default function CaseStudiesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Artimist Productions Case Studies",
    url: `${BASE}/case-studies`,
    description: "Selected project evidence across architecture, residential design, technical documentation and visualization.",
    hasPart: projects.map((project) => ({ "@type": "CreativeWork", name: project.title, url: `${BASE}${project.href}` })),
  };

  return <main className="csi"><style dangerouslySetInnerHTML={{ __html: CSS }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="csi-wrap"><nav className="csi-crumb"><Link href="/">Home</Link> / Case Studies</nav><section className="csi-hero"><div className="csi-kicker">Project evidence / selected work</div><h1>Case studies built around real work.</h1><p className="csi-lead">Service pages explain what Artimist can do. These project pages show how that capability appears in actual residential, technical and visualization work—without invented performance claims or generic stock examples.</p></section><section className="csi-grid">{projects.map((project) => <Link className="csi-card" href={project.href} key={project.href}><img src={project.image} alt={project.alt} loading="lazy" /><div className="csi-body"><small>{project.meta}</small><h2>{project.title}</h2></div></Link>)}</section><section className="csi-cta"><div><div className="csi-kicker">Your project</div><h2 style={{ fontSize: "clamp(34px,4vw,52px)", margin: "8px 0 10px" }}>Need the same kind of clarity?</h2><p>Send your current drawings, model, survey, references or brief. We can review what exists and define the next useful scope.</p></div><Link className="csi-btn" href="/contact">Start a project</Link></section></div></main>;
}
