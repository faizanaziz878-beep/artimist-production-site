import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE = "https://www.artimistproductions.com";

type Article = {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  takeaways: string[];
  serviceHref: string;
  serviceLabel: string;
};

const articles: Record<string, Article> = {
  "how-much-do-custom-house-plans-cost": {
    title: "How Much Do Custom House Plans Cost?",
    description: "A practical guide to custom house plan pricing, including the factors that change design fees, drawing scope, revisions and visualization costs.",
    intro: "There is no useful single price for a custom house plan because the phrase can describe anything from a refined floor-plan concept to a coordinated drawing package with elevations, sections, 3D views and permit support. The useful question is not only what a plan costs, but what information and decisions the fee actually includes.",
    sections: [
      { heading: "What usually changes the price", body: ["Project size matters, but complexity matters more. A compact house on a difficult site can demand more design work than a larger house with a simple geometry. Sloping land, unusual structure, complex roofs, additions to existing buildings and strict planning constraints all increase coordination.", "The starting information also changes the workload. A clear survey, measured drawing or existing CAD model can reduce setup time. A rough sketch with missing dimensions may require more verification before design can progress safely."] },
      { heading: "Concept design is not the same as a construction set", body: ["A floor-plan study may focus on circulation, room relationships and overall dimensions. A fuller architectural package can add elevations, sections, roof information, schedules and coordination notes. Permit or construction documentation can introduce another level of jurisdiction-specific detail and consultant coordination.", "When comparing quotes, ask for a deliverable list rather than comparing only the total fee. Two proposals can use the same phrase — custom house plans — while describing very different amounts of work."] },
      { heading: "Revisions, options and 3D visualization", body: ["Design fees also depend on how many options and revision rounds are included. A controlled process normally defines review milestones so the project does not drift through unlimited redesign.", "3D visualization is optional but often valuable because it exposes proportion, material and lighting decisions that are difficult to understand from plans alone. It should be priced as a defined scope: number of views, image resolution, animation requirements and expected revision rounds."] },
      { heading: "How to request a useful quote", body: ["Send the site or property information, approximate area, room requirements, reference images, existing plans if any, target construction stage and the deliverables you expect. If the project needs permit support, include the location because local requirements can change the documentation scope.", "A good proposal should make clear what is included, what information the client must supply, how reviews work and which items require separate local professionals or consultants."] },
    ],
    takeaways: ["Compare deliverables, not just headline prices.", "Define the number of design options and review rounds.", "Separate concept design, permit support and construction documentation.", "Provide accurate site and existing-condition information early."],
    serviceHref: "/custom-house-design", serviceLabel: "Custom house design"
  },
  "permit-drawings-vs-construction-drawings": {
    title: "Permit Drawings vs Construction Drawings",
    description: "Understand the difference between permit drawings and construction drawings, including their purpose, level of detail and local approval requirements.",
    intro: "Permit drawings and construction drawings can overlap, but they are not automatically the same package. Permit drawings are primarily assembled to demonstrate that a proposal can be reviewed for the approvals required by the local authority. Construction drawings are used to communicate enough coordinated information for the work to be priced and built.",
    sections: [
      { heading: "What a permit set is trying to prove", body: ["A permit submission usually communicates the proposed work, site or floor-plan changes, key dimensions, elevations, sections and the information requested by the relevant authority. The exact contents vary widely by project type and jurisdiction.", "The authority may also require structural, mechanical, energy, fire, accessibility or other specialist information. Those requirements are not universal, which is why a remote drawing service should not describe every permit set as identical."] },
      { heading: "What construction drawings add", body: ["Construction information usually goes further into dimensions, assemblies, interfaces, schedules, details and coordination. The purpose is not only to obtain approval but to reduce ambiguity during pricing and construction.", "A small residential project may use a relatively compact construction set, while a more complex building may require extensive architectural, structural and services documentation produced by several disciplines."] },
      { heading: "Why one set may evolve into the other", body: ["In many projects the permit set becomes the base for later construction documentation. That does not mean the permit issue should be treated as the finished construction set. Comments from authorities, consultants, contractors and the client can all create later revisions.", "It is useful to identify drawing status clearly: concept, planning, permit, tender, construction or record information. Clear status reduces the risk of someone building from a set that was never intended for that purpose."] },
      { heading: "What to confirm before commissioning drawings", body: ["Confirm the project location, approval pathway, required professionals, expected submission format and whether the commission ends at permit submission or continues into construction documentation. If a licensed architect, engineer or other professional must review or seal the work, that role should be identified before the package is promised as permit-ready."] },
    ],
    takeaways: ["Permit drawings support approval; construction drawings support building and coordination.", "Requirements vary by jurisdiction and project type.", "Drawing status should always be explicit.", "Local licensed-professional requirements must be confirmed early."],
    serviceHref: "/permit-drawing-services", serviceLabel: "Permit drawing support"
  },
  "how-to-modify-an-existing-floor-plan": {
    title: "How to Modify an Existing Floor Plan",
    description: "A practical process for improving an existing house floor plan, from identifying circulation problems to checking structure, dimensions and 3D impact.",
    intro: "A floor-plan modification works best when it starts with the reason for change rather than immediately moving walls. The goal may be better circulation, more storage, an open kitchen, another bedroom, improved daylight or a cleaner connection to an extension. Each goal creates different constraints.",
    sections: [
      { heading: "Start with accurate existing information", body: ["Use a measured survey, reliable existing drawings or field dimensions. Before redesigning, identify structural walls, stairs, plumbing zones, windows, doors, ceiling changes and any level differences that limit where new rooms can go.", "If the available plan is only a marketing image or old PDF, treat it as reference rather than guaranteed construction information until important dimensions are verified."] },
      { heading: "Diagnose the plan before redrawing it", body: ["Look for wasted corridors, rooms that are difficult to furnish, doors that conflict, poor privacy, long travel paths and spaces that receive little daylight. Then separate problems that can be solved by furniture or door changes from problems that genuinely need architectural work.", "A successful modification usually improves several relationships at once. Moving one wall may solve a kitchen problem but create a weak bedroom or structural complication elsewhere."] },
      { heading: "Test options against real furniture and circulation", body: ["Room names alone are not enough. Test beds, sofas, dining tables, kitchen clearances, wardrobes and door swings. A plan that appears generous when empty can become tight once real objects and circulation zones are shown.", "Compare a small number of strong options rather than producing many superficial variations. Each option should have a clear reason for existing."] },
      { heading: "Check the change in elevation and 3D", body: ["Plan changes affect windows, façades, roof lines, ceiling conditions and interior views. A simple 3D model or visualization can reveal awkward proportions before the design reaches documentation.", "For renovations, the final step is to coordinate the preferred layout with structure, building services, local codes and the permit pathway before construction begins."] },
    ],
    takeaways: ["Verify the existing building before redesigning it.", "Solve a defined problem rather than moving walls randomly.", "Test furniture, door swings and circulation.", "Coordinate the preferred plan with structure, services and approvals."],
    serviceHref: "/plan-modification-service", serviceLabel: "Floor-plan modification"
  },
  "revit-drafting-vs-cad-drafting": {
    title: "Revit Drafting vs CAD Drafting",
    description: "Compare Revit BIM production with 2D CAD drafting and understand when each workflow is appropriate for architectural documentation.",
    intro: "Revit and CAD are both useful production tools, but they solve different problems. CAD is primarily a drawing environment. Revit is a model-based BIM environment in which plans, sections, elevations, schedules and views can be generated from coordinated building information.",
    sections: [
      { heading: "When CAD is efficient", body: ["2D CAD can be efficient for small drawing tasks, redlines, simple details, existing legacy projects and scopes where a coordinated building model would add little value. It is also useful when the client already has an established DWG-based workflow.", "The limitation is that coordination depends more heavily on disciplined manual updates. A plan change does not automatically update every unrelated drawing unless the production team makes those changes."] },
      { heading: "When Revit adds value", body: ["Revit is useful when the project benefits from a shared 3D building model, repeated views, coordinated schedules, model-based quantities or multidisciplinary BIM workflows. Changes to modeled elements can propagate into multiple views, reducing some types of drawing inconsistency.", "That benefit only appears when the model is built to the right level and maintained properly. A poorly structured Revit file can be slower and less reliable than a clean CAD set."] },
      { heading: "Do not choose software before defining the deliverable", body: ["The right question is what the project needs to deliver. If the client needs a coordinated model for later design, consultant exchange or facilities information, BIM may be appropriate. If the task is to update a handful of 2D drawings, a full model may be unnecessary.", "For outsourcing, also confirm software version, templates, families, naming standards, worksharing rules and what native files must be returned."] },
      { heading: "Hybrid workflows are common", body: ["Many professional teams use both. Revit may carry the main building model while CAD is used for consultant information, legacy details or specialist drawings. The important issue is not ideological software preference but controlled information exchange and clear responsibility for coordination."] },
    ],
    takeaways: ["CAD is efficient for focused 2D production.", "Revit is valuable when model coordination and repeated views matter.", "A BIM model must be structured to the required level, not overbuilt.", "Define software version and delivery standards before outsourcing."],
    serviceHref: "/revit-drafting-services", serviceLabel: "Revit drafting services"
  },
  "what-is-scan-to-bim": {
    title: "What Is Scan-to-BIM?",
    description: "Learn how laser scans and point clouds are converted into Revit or BIM models, what accuracy means and what should be defined before modeling starts.",
    intro: "Scan-to-BIM is the process of using captured survey data — commonly a point cloud from laser scanning or photogrammetry — as the reference for creating a structured building information model. The scan records existing geometry; the BIM model interprets that geometry into usable building elements.",
    sections: [
      { heading: "A point cloud is not automatically a BIM model", body: ["Point clouds can contain millions of measured points representing surfaces in the existing building. They are valuable references but they do not inherently know that a surface is a wall, door, slab or pipe.", "The modeler must decide what to represent, how accurately to represent it and which irregular existing conditions should remain literal instead of being simplified into ideal geometry."] },
      { heading: "Define scope and tolerance before modeling", body: ["A Scan-to-BIM brief should define the disciplines to model, target model use, expected level of detail or information, coordinate system and acceptable geometric tolerance. Modeling every visible object is rarely necessary.", "For renovation design, architecture may be the priority. For coordination, structure or building services may be equally important. The scope should follow the downstream use of the model."] },
      { heading: "Typical workflow", body: ["The point cloud is registered and checked, linked into the modeling environment, and used to establish levels, grids and major geometry. Building elements are then modeled against the scan, with deviations or uncertain areas recorded according to the agreed procedure.", "Quality control should include spot checks against the point cloud, especially around critical dimensions, irregular geometry and areas that will affect new construction."] },
      { heading: "What clients should provide", body: ["Supply the point-cloud format, survey coordinate information, project units, available drawings, required Revit version, modeling standards and a clear statement of what the model will be used for. If certain areas are inaccessible or incomplete in the scan, identify them before production begins."] },
    ],
    takeaways: ["The scan is measured reference data; BIM is an interpreted model.", "Accuracy and scope need written definitions.", "Model only the information needed for the next project stage.", "Quality control should compare critical modeled geometry back to the scan."],
    serviceHref: "/bim-modeling-services", serviceLabel: "BIM modeling services"
  },
  "lod-200-vs-lod-300-vs-lod-400": {
    title: "LOD 200 vs LOD 300 vs LOD 400",
    description: "A plain-language guide to BIM LOD 200, 300 and 400 and why model purpose matters more than requesting the highest level by default.",
    intro: "LOD is often used to describe how developed BIM elements are for a particular project purpose. The numbers are useful shorthand, but they should not replace a written scope. Different disciplines and elements can legitimately be at different levels of development in the same project.",
    sections: [
      { heading: "LOD 200: approximate systems and intent", body: ["At LOD 200, elements generally communicate approximate size, shape, location and orientation. The model is useful for design development, spatial coordination and early visualization, but dimensions and interfaces may still change.", "It is usually inappropriate to assume that every modeled component at this stage contains fabrication-level information."] },
      { heading: "LOD 300: defined geometry for coordination", body: ["LOD 300 typically represents elements with more specific quantity, size, shape, location and orientation so that information can be measured from the model within the defined scope. It is commonly associated with developed design and coordinated documentation.", "The model still requires clear responsibility boundaries and should not be treated as fabrication information simply because it appears detailed."] },
      { heading: "LOD 400: fabrication and assembly information", body: ["LOD 400 is associated with information developed enough for fabrication, assembly or installation for the relevant elements. This level is often created by specialist contractors, fabricators or trade partners rather than the architectural design team alone.", "Requesting LOD 400 for an entire building without a clear use case can create large amounts of unnecessary work and cost."] },
      { heading: "Define model use, not only a number", body: ["A useful BIM execution brief identifies which elements need which development, the intended model uses, expected information fields, software version, coordination process and acceptance criteria. A single global LOD number is rarely enough to define a complex model reliably."] },
    ],
    takeaways: ["Higher LOD is not automatically better.", "Different model elements can require different development levels.", "LOD 300 is not the same as fabrication information.", "Write the intended model uses and acceptance criteria into the scope."],
    serviceHref: "/bim-modeling-services", serviceLabel: "BIM modeling services"
  },
  "how-much-does-architectural-rendering-cost": {
    title: "How Much Does Architectural Rendering Cost?",
    description: "Understand the main factors behind architectural rendering prices, including modeling, image count, complexity, revisions, animation and resolution.",
    intro: "Architectural rendering prices vary because the final image is only one part of the work. The production team may need to clean or build the 3D model, develop materials, create lighting, populate the scene, compose cameras, render high-resolution frames and complete post-production before revisions are considered.",
    sections: [
      { heading: "Model readiness is one of the biggest variables", body: ["A clean Revit, SketchUp, Rhino or 3D model can reduce setup time, but only if the geometry is suitable for visualization. Missing details, unresolved façades, inconsistent layers or incomplete interiors can turn a nominally finished model into a substantial modeling task.", "If no model exists, the visualization team must build one from drawings, references or sketches, which should be identified separately in the quote."] },
      { heading: "Image count and scene complexity", body: ["Multiple views of the same well-developed scene can be more efficient than unrelated views across different spaces. Large landscapes, dense vegetation, custom furniture, night lighting, water, crowds and complex materials can all increase production time.", "Interior images often require more detailed close-range materials and furnishing decisions, while exterior images may involve broader environment and landscaping work."] },
      { heading: "Revisions should be structured", body: ["A professional rendering scope should define review stages. Early reviews are useful for camera, geometry and design direction; later reviews focus on materials, lighting and polish. Major design changes after final-quality rendering naturally create extra work.", "The quote should state how many review rounds are included and what counts as a design change rather than a normal visualization correction."] },
      { heading: "Animation and real-time work are different scopes", body: ["Animation adds camera sequencing, motion, many rendered frames, editing and often sound. Unreal Engine walkthroughs add real-time optimization, interaction and deployment requirements. They should not be compared directly with the price of one still image.", "The most useful request for pricing includes source files, required views, target resolution, deadline, quality references and whether design development is still ongoing."] },
    ],
    takeaways: ["Separate modeling from image production when comparing quotes.", "Define the number of views and target resolution.", "Use staged review rounds to control revisions.", "Treat animation and real-time walkthroughs as separate production scopes."],
    serviceHref: "/architectural-visualization-services", serviceLabel: "Architectural visualization services"
  },
  "3d-rendering-vs-unreal-engine-walkthrough": {
    title: "3D Rendering vs Unreal Engine Walkthrough",
    description: "Compare still 3D rendering, architectural animation and Unreal Engine walkthroughs by presentation value, flexibility, production workflow and project use.",
    intro: "Still rendering, animation and Unreal Engine can all communicate architecture, but they create different experiences. A still image gives the team complete control over one composed view. Animation controls the sequence over time. A real-time walkthrough allows the viewer to navigate and explore interactively.",
    sections: [
      { heading: "Still rendering: maximum control over key images", body: ["Still CGI is effective for marketing images, design approvals, competitions, websites and presentations where a small number of strong views can explain the project. Every element of composition, lighting and post-production can be tuned for the selected camera.", "It is usually the most efficient option when the client does not need movement or interactive exploration."] },
      { heading: "Animation: controlled storytelling", body: ["Architectural animation guides the viewer through a planned sequence. It can reveal arrival, circulation, atmosphere and relationships that are difficult to communicate in a single frame.", "Because animation contains many frames, production decisions about camera paths, scene complexity, resolution and duration have a larger impact on rendering time and cost."] },
      { heading: "Unreal Engine: real-time exploration", body: ["A real-time experience is valuable when users need to move through the design, compare options, present an interactive sales environment or explore spaces from more than one fixed camera. The model and assets must be optimized for real-time performance rather than only offline rendering quality.", "Interactive projects may also require interface design, navigation logic, packaging, hardware testing and deployment decisions."] },
      { heading: "Choose based on the decision you need to support", body: ["Use still images when a few persuasive viewpoints answer the brief. Use animation when sequence and emotion are important but navigation should remain controlled. Use real-time walkthroughs when exploration, option comparison or interaction is genuinely valuable.", "Projects can also combine formats: a real-time model for design review, stills for marketing and a short animation for launch presentation."] },
    ],
    takeaways: ["Stills are efficient for selected hero views.", "Animation adds sequence and controlled storytelling.", "Unreal Engine adds interaction and real-time exploration.", "Choose the format around the decision or audience, not novelty."],
    serviceHref: "/unreal-engine", serviceLabel: "Unreal Engine visualization"
  },
};

const CSS = `.article{min-height:100vh;background:#090809;color:#eee8e3;padding:100px 0 120px;font-family:Arial,Helvetica,sans-serif;line-height:1.75}.article *{box-sizing:border-box}.article a{color:inherit}.article-wrap{width:min(900px,calc(100% - 40px));margin:auto}.article-crumb{font-size:12px;color:#998f89;margin-bottom:44px}.article-crumb a{text-decoration:none}.article-kicker{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#d45e73;font-weight:700}.article h1,.article h2{font-family:Georgia,'Times New Roman',serif;font-weight:400}.article h1{font-size:clamp(46px,7vw,78px);line-height:1;letter-spacing:-.045em;margin:16px 0 24px}.article-lead{font-size:20px;color:#c3b7b0;max-width:72ch;margin:0 0 54px}.article-sec{padding:38px 0;border-top:1px solid rgba(255,255,255,.09)}.article-sec h2{font-size:34px;line-height:1.12;margin:0 0 18px}.article-sec p{font-size:17px;color:#b5aaa4;margin:0 0 16px}.article-take{margin:38px 0;padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#100e0f}.article-take h2{margin:0 0 16px;font-size:30px}.article-take ul{margin:0;padding-left:20px;color:#c1b5af}.article-take li{margin:8px 0}.article-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:34px}.article-actions a{border:1px solid rgba(255,255,255,.12);padding:10px 15px;border-radius:999px;text-decoration:none;color:#c9beb8}.article-actions a:first-child{background:#992636;border-color:#992636;color:#fff}@media(max-width:760px){.article{padding-top:88px}.article-wrap{width:min(100% - 30px,900px)}.article-sec h2{font-size:29px}}`;

export function generateStaticParams() { return Object.keys(articles).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: `${article.title} | Artimist`,
    description: article.description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { title: article.title, description: article.description, url: `${BASE}/insights/${slug}`, type: "article", images: [{ url: "/media/hero-night.webp", alt: "Artimist Productions architecture and visualization" }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: ["/media/hero-night.webp"] },
  };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();
  const url = `${BASE}/insights/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}#article`, headline: article.title, description: article.description, url, datePublished: "2026-08-28", dateModified: "2026-08-28", author: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions" }, publisher: { "@id": `${BASE}/#organization` }, mainEntityOfPage: url, inLanguage: "en" },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` }, { "@type": "ListItem", position: 2, name: "Insights", item: `${BASE}/insights` }, { "@type": "ListItem", position: 3, name: article.title, item: url }] },
    ],
  };

  return <main className="article"><style dangerouslySetInnerHTML={{ __html: CSS }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><article className="article-wrap"><nav className="article-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {article.title}</nav><div className="article-kicker">Practical guide / Artimist Productions</div><h1>{article.title}</h1><p className="article-lead">{article.intro}</p>{article.sections.map((section)=><section className="article-sec" key={section.heading}><h2>{section.heading}</h2>{section.body.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>)}<section className="article-take"><h2>Key takeaways</h2><ul>{article.takeaways.map((item)=><li key={item}>{item}</li>)}</ul></section><div className="article-actions"><Link href={article.serviceHref}>{article.serviceLabel}</Link><Link href="/case-studies">Case studies</Link><Link href="/international">International delivery</Link><Link href="/contact">Discuss a project</Link></div></article></main>;
}
