import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture, BIM, Revit & 3D Rendering Guides | Artimist",
  description: "Practical guides on house plans, permit drawings, BIM, Revit, CAD, architectural rendering and visualization for homeowners and professional teams.",
  alternates: { canonical: "/insights" },
  openGraph: { title: "Architecture, BIM, Revit & 3D Rendering Guides | Artimist", description: "Practical architecture, BIM, drafting and visualization guidance from Artimist Productions.", url: "https://www.artimistproductions.com/insights", type: "website" },
};

const articles = [
  ["how-much-do-custom-house-plans-cost", "How much do custom house plans cost?", "What changes the price of custom residential design and what homeowners should compare before requesting a quote."],
  ["permit-drawings-vs-construction-drawings", "Permit drawings vs construction drawings", "The difference in purpose, detail and project use between approval sets and construction information."],
  ["how-to-modify-an-existing-floor-plan", "How to modify an existing floor plan", "A practical way to improve circulation, room sizes and adjacencies without losing control of the existing structure."],
  ["revit-drafting-vs-cad-drafting", "Revit drafting vs CAD drafting", "When BIM adds value, when 2D CAD is enough and how to choose the right production workflow."],
  ["what-is-scan-to-bim", "What is Scan-to-BIM?", "How point-cloud information becomes a usable BIM model and what clients need to provide before modeling begins."],
  ["lod-200-vs-lod-300-vs-lod-400", "LOD 200 vs LOD 300 vs LOD 400", "A plain-language explanation of BIM development levels and why the required LOD should be defined before production."],
  ["how-much-does-architectural-rendering-cost", "How much does architectural rendering cost?", "The main variables behind rendering fees: model readiness, image count, complexity, revisions, resolution and animation."],
  ["3d-rendering-vs-unreal-engine-walkthrough", "3D rendering vs Unreal Engine walkthrough", "How still CGI, animation and real-time walkthroughs differ in cost, flexibility and presentation value."],
] as const;

const CSS = `.ins{min-height:100vh;background:#090809;color:#eee8e3;padding:116px 0 110px;font-family:Arial,Helvetica,sans-serif}.ins *{box-sizing:border-box}.ins a{color:inherit}.ins-wrap{width:min(1160px,calc(100% - 40px));margin:auto}.ins-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.ins h1,.ins h2{font-family:Georgia,'Times New Roman',serif;font-weight:400}.ins h1{font-size:clamp(48px,7vw,86px);line-height:.98;letter-spacing:-.045em;margin:16px 0 22px}.ins-lead{max-width:70ch;color:#b9aea8;font-size:19px;line-height:1.65;margin-bottom:54px}.ins-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.ins-card{display:block;text-decoration:none;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:28px;background:#100e0f;min-height:210px}.ins-card small{color:#d45e73;letter-spacing:.14em;text-transform:uppercase}.ins-card h2{font-size:30px;line-height:1.08;margin:18px 0 12px}.ins-card p{margin:0;color:#a99e98;line-height:1.6}.ins-actions{margin-top:46px;display:flex;gap:10px;flex-wrap:wrap}.ins-actions a{border:1px solid rgba(255,255,255,.12);padding:10px 15px;border-radius:999px;text-decoration:none;color:#c9beb8}@media(max-width:760px){.ins{padding-top:92px}.ins-grid{grid-template-columns:1fr}.ins-card{min-height:0}}`;

export default function InsightsPage() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Artimist Architecture, BIM and Visualization Guides", url: "https://www.artimistproductions.com/insights", isPartOf: { "@id": "https://www.artimistproductions.com/#website" } };
  return <main className="ins"><style dangerouslySetInnerHTML={{ __html: CSS }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><div className="ins-wrap"><div className="ins-kicker">Knowledge / practical project guidance</div><h1>Useful answers before the project starts.</h1><p className="ins-lead">Clear explanations for homeowners, architects, developers and production teams comparing design, drafting, BIM and visualization scopes. These guides are written to help define the right brief rather than inflate the service.</p><div className="ins-grid">{articles.map(([slug,title,copy],i)=><Link className="ins-card" key={slug} href={`/insights/${slug}`}><small>Guide {String(i+1).padStart(2,"0")}</small><h2>{title}</h2><p>{copy}</p></Link>)}</div><div className="ins-actions"><Link href="/services">Explore services</Link><Link href="/case-studies">View case studies</Link><Link href="/international">International delivery</Link><Link href="/contact">Start a project brief</Link></div></div></main>;
}
