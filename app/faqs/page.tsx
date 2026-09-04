import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture, House Plans, BIM, Revit & 3D Design FAQs | Artimist",
  description: "Answers about custom house plans, floor plans, renovations, permit drawings, 3D interior design, architectural rendering, BIM, Revit drafting, pricing and working with Artimist Productions.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Architecture, House Plans, BIM, Revit & 3D Design FAQs | Artimist",
    description: "Quick answers about house design, permits, rendering, BIM, Revit, drafting, pricing and project delivery.",
    url: "https://www.artimistproductions.com/faqs",
    type: "website",
    images: [{ url: "/media/atlas/atlas-13.webp", alt: "Artimist Productions architecture, BIM and visualization work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture, House Plans, BIM, Revit & 3D Design FAQs | Artimist",
    description: "Quick answers about house design, permits, rendering, BIM, Revit, drafting and working with Artimist.",
    images: ["/media/atlas/atlas-13.webp"],
  },
};

type Faq = { q: string; a: string };
type LinkItem = { label: string; href: string };
type Group = { id: string; no: string; title: string; subtitle: string; links: LinkItem[]; faqs: Faq[] };

const groups: Group[] = [
  {
    id: "house-home",
    no: "01",
    title: "House & home",
    subtitle: "Custom homes, floor plans, renovations, additions and ADUs.",
    links: [
      { label: "Custom house design", href: "/custom-house-design" },
      { label: "Sketch to floor plan", href: "/sketch-to-floor-plan-service" },
      { label: "Home addition plans", href: "/home-addition-plans" },
      { label: "ADU design & plans", href: "/adu-design-plans" },
    ],
    faqs: [
      { q: "Can you design a custom house from scratch?", a: "Yes. Artimist can develop a custom home from a brief, site information, sketches, reference images or an early floor-plan idea. Depending on scope, the work can include layout development, exterior design, architectural drawings and 3D visualization so the design is understood before construction begins." },
      { q: "Can you turn my rough sketch into a professional floor plan?", a: "Yes. Hand sketches, marked-up PDFs, photographs and measured information can be translated into a clean architectural floor plan. Accuracy depends on the information supplied, so dimensions, existing drawings and site measurements are especially useful when the plan will be used for later design or documentation." },
      { q: "Can you modify an existing floor plan?", a: "Yes. Existing plans can be reviewed and changed to improve room sizes, circulation, privacy, storage, furniture fit and relationships between spaces. We can work from DWG, PDF, image files or a redrawn base plan, depending on what you already have." },
      { q: "Can you improve a house plan without redesigning the whole house?", a: "Yes. Many projects only need focused changes. We can study specific problems such as an awkward kitchen, poor circulation, small bedrooms, limited storage or an inefficient entrance while keeping the parts of the existing plan that already work." },
      { q: "Can you show me what my house will look like before it is built?", a: "Yes. Floor plans and elevations can be developed into a 3D model and realistic exterior or interior views. This helps compare materials, proportions, windows, lighting and design options before expensive construction decisions are made." },
      { q: "Can you design an addition to an existing house?", a: "Yes. Artimist can help develop room additions, extensions, second-floor additions and related existing/proposed drawings. The final documentation required for approval depends on the local jurisdiction and whether structural or other licensed consultant input is required." },
      { q: "Can you design an ADU?", a: "Yes. We can develop detached backyard ADUs, attached ADUs and garage-conversion concepts, including floor plans, elevations, sections and 3D design support where required. Local zoning, setbacks, parking, utilities and permit requirements still need to be verified for the specific property." },
      { q: "Can you convert a garage into an ADU or living space?", a: "Yes. A garage conversion can be studied for layout, openings, access, kitchens, bathrooms, storage and exterior changes. Existing conditions and local regulations determine what is feasible, so accurate measurements and any available property information should be provided at the start." },
      { q: "Can you work from old house plans or a property listing?", a: "Yes. Old drawings, listing plans, real-estate images and site photographs can help establish the starting point. They are useful for design studies, but verified dimensions may still be needed before producing accurate existing-condition or permit-support documentation." },
      { q: "What is the difference between custom house plans and stock house plans?", a: "Stock plans are pre-designed for broad use. Custom house plans are developed around a particular brief, site, lifestyle and set of priorities. Custom work gives more control over room relationships, orientation, architectural character and future changes, but it also requires more design input and coordination." },
      { q: "How much does a custom house plan cost?", a: "Cost depends on project size, complexity, the starting information, required drawings, number of design options and whether visualization or permit-support documentation is included. We review the brief first so the fee reflects the actual scope rather than forcing every project into the same package." },
    ],
  },
  {
    id: "visualize",
    no: "02",
    title: "Visualize it",
    subtitle: "3D interiors, exterior design, rendering, animation and real-time experiences.",
    links: [
      { label: "3D interior design", href: "/3d-interior-design-service" },
      { label: "Floor plan to 3D", href: "/floor-plan-to-3d-rendering" },
      { label: "Architectural visualization", href: "/visualization" },
      { label: "Architectural rendering", href: "/services/architectural-rendering" },
    ],
    faqs: [
      { q: "What is a 3D interior design service?", a: "It combines interior design decisions with three-dimensional visualization. We can study layout, furniture, materials, lighting, color and spatial atmosphere, then show the proposed room in realistic views before renovation, purchasing or construction begins." },
      { q: "Can you design my interior remotely?", a: "Yes. Remote interior design can work from floor plans, measurements, photographs, videos and reference images supplied by the client. Clear dimensions and photographs are important because the accuracy of the 3D space depends on the quality of the existing information." },
      { q: "Can I send Pinterest, Instagram or reference images?", a: "Yes. Reference images are useful for communicating atmosphere, materials, furniture types and architectural preferences. We use them to understand direction rather than simply copying another project, then develop a coherent design for your own space." },
      { q: "Can you turn a floor plan into a 3D model or rendering?", a: "Yes. PDF, CAD or other architectural plans can be used to build a 3D model. Depending on the information available, we can then produce interior views, exterior views, material studies or presentation renderings from the same coordinated model." },
      { q: "What is architectural rendering?", a: "Architectural rendering is the creation of images that communicate a proposed building or interior before it exists. A rendering can be simple and diagrammatic or highly photorealistic, depending on whether the goal is design review, client approval, marketing, planning or final presentation." },
      { q: "What is the difference between architectural rendering and visualization?", a: "Rendering usually refers to the final image or output. Architectural visualization is the broader process of translating design information into understandable visual media, which can include still images, diagrams, animation, virtual tours and real-time interactive experiences." },
      { q: "Can you create renderings from CAD or Revit files?", a: "Yes. DWG, RVT, SketchUp and other model or drawing formats can provide the geometric starting point. We review the source files first because model quality, missing information and material detail can affect how much preparation is required before visualization begins." },
      { q: "Can you create exterior and interior renderings for the same project?", a: "Yes. When the source model and design information are coordinated, the same project can be developed into exterior, interior, aerial and detail views. This helps keep materials and architectural decisions consistent across the full presentation set." },
      { q: "Can you create architectural animation and walkthroughs?", a: "Yes. We produce cinematic walkthroughs, flythroughs and motion sequences for architecture, interiors and development presentations. The required model detail, shot list, duration and delivery format are agreed before production so animation effort stays aligned with the intended use." },
      { q: "Can you create Unreal Engine or real-time architectural experiences?", a: "Yes. Real-time environments can be developed when a project benefits from interactive movement, live material exploration or immersive presentation rather than only fixed images. We first determine whether Unreal Engine is the right delivery method for the project instead of using it where a conventional render would be more efficient." },
      { q: "How much does an architectural rendering cost?", a: "Rendering cost depends on the quality of the starting model, number of views, complexity, landscaping, furniture, level of realism, revisions and deadline. A single clean view from a well-prepared model is very different in scope from a full marketing set built from incomplete drawings." },
    ],
  },
  {
    id: "document",
    no: "03",
    title: "Document it",
    subtitle: "Renovation drawings, permit support and construction documentation.",
    links: [
      { label: "Permit drawing services", href: "/permit-drawing-services" },
      { label: "Renovation & permit drawings", href: "/residential-renovation-permit-drawings" },
      { label: "Construction documentation", href: "/construction-documentation-services" },
      { label: "House exterior design", href: "/house-exterior-design-service" },
    ],
    faqs: [
      { q: "What are permit drawings?", a: "Permit drawings are documents used to communicate a proposed project to a building or planning authority. The exact required sheets vary by location and project type, but may include existing and proposed plans, elevations, sections, site information, notes and coordination with structural or other specialist documents." },
      { q: "What drawings do I need for a home renovation?", a: "That depends on the renovation. Common drawings include existing plans, demolition plans, proposed floor plans, elevations, sections and relevant details. Structural changes, additions, changes of use or jurisdiction-specific requirements may introduce additional engineering, code or consultant documentation." },
      { q: "Can Artimist prepare drawings for permit submission?", a: "Yes. We provide drafting, design and permit-support documentation based on the agreed scope. However, submission procedures, professional seals and licensed-professional requirements vary by jurisdiction, so local requirements must be confirmed for the specific project." },
      { q: "Does Artimist stamp architectural drawings?", a: "Artimist provides design, drafting and documentation services. Where a city, state, province or other authority requires documents to be reviewed, signed or stamped by a locally licensed architect or engineer, that licensed professional must provide the required professional certification." },
      { q: "Can a local architect or engineer review drawings prepared by Artimist?", a: "Yes, subject to that professional's own review process and local rules. We can coordinate our production with a client's locally licensed architect or engineer, respond to markups and revise the drawing package as required for their review." },
      { q: "Can you prepare existing and proposed drawings for a renovation?", a: "Yes. We can document the existing condition from reliable source information and prepare proposed plans, elevations or sections showing the intended changes. Verified measurements are important because permit and construction decisions should not rely on unconfirmed geometry." },
      { q: "Can you revise drawings after permit comments?", a: "Yes. If the review comments relate to our agreed drawing scope, we can update the package and coordinate the revisions. Comments requiring structural engineering, energy calculations, specialist reports or licensed professional judgment may need input from the relevant consultant." },
      { q: "Can Artimist guarantee permit approval?", a: "No. Permit approval is controlled by the relevant authority and depends on local regulations, property conditions, consultant requirements and the authority's review. We can prepare and revise documentation within our scope, but no design or drafting provider can responsibly guarantee an authority's approval." },
      { q: "What is the difference between permit drawings and construction drawings?", a: "Permit drawings focus on the information needed for regulatory review, while construction drawings communicate how the approved design is to be built and coordinated. There can be overlap, but construction documentation often requires more detail, specifications and coordination than a basic permit set." },
      { q: "What information do you need to start permit-support drawings?", a: "Useful starting information includes existing drawings, verified measurements, survey or site information where relevant, photographs, the proposed scope, local authority requirements and any consultant information already available. Better source information generally reduces assumptions and revision time." },
    ],
  },
  {
    id: "bim-revit",
    no: "04",
    title: "Build the model",
    subtitle: "BIM, Revit, CAD conversion, Scan-to-BIM and production support.",
    links: [
      { label: "BIM & drafting", href: "/bim-drafting" },
      { label: "Revit drafting", href: "/revit-drafting-services" },
      { label: "BIM modeling", href: "/bim-modeling-services" },
      { label: "Architectural drafting", href: "/architectural-drafting-services" },
    ],
    faqs: [
      { q: "What BIM services does Artimist provide?", a: "Our BIM work includes architectural modeling, Revit drafting, model development, drawing production, CAD-to-Revit conversion, PDF-to-Revit workflows, Scan-to-BIM support and coordinated documentation. Scope and model standards are defined before production begins." },
      { q: "Can you convert AutoCAD drawings into Revit?", a: "Yes. CAD drawings can be used as a basis for a Revit model, but the process is not simply an automatic file conversion. Geometry, levels, families, model organization, documentation requirements and the intended LOD must be agreed so the resulting Revit file is useful rather than only visually similar." },
      { q: "Can you convert PDF drawings into Revit?", a: "Yes. PDF drawings can be redrawn and modeled in Revit when they contain enough reliable information. Where dimensions or sections are missing, assumptions must be identified or resolved through additional source material before the model is treated as accurate." },
      { q: "Do you provide Scan-to-BIM services?", a: "Yes. Point-cloud or scan data can be translated into organized BIM geometry based on the required scope and level of detail. The expected accuracy, model elements and deliverables should be agreed before work starts because Scan-to-BIM requirements can vary significantly between surveys, existing buildings and facility-management uses." },
      { q: "What is LOD 300?", a: "LOD 300 generally describes model elements with defined size, shape, quantity, location and orientation suitable for coordinated design documentation. The exact interpretation should still be agreed within the project's BIM requirements because different teams can use LOD terminology differently." },
      { q: "Can you produce LOD 350 BIM models?", a: "Yes, when the project requires it. LOD 350 typically adds interfaces and relationships needed for greater coordination between building systems. We confirm which elements require that depth rather than applying unnecessary detail across an entire model." },
      { q: "Can you work inside our existing Revit template?", a: "Yes. Architecture and development teams can provide their templates, title blocks, view standards, naming conventions and project requirements. We aim to work inside the client's system rather than forcing a separate Artimist standard onto an established production workflow." },
      { q: "Can you create Revit families, sheets and schedules?", a: "Yes. Revit production can include project families, reusable families where appropriate, views, sheets, annotations, schedules and drawing organization. The exact family complexity and parameter requirements should be defined because lightweight documentation families and data-rich content are very different tasks." },
      { q: "Can Artimist support an architecture firm with ongoing Revit or drafting work?", a: "Yes. We can work as an external production extension for architecture, design, construction and development teams. This can be project-based or structured around a recurring workload, with clear task ownership, review stages and delivery standards." },
      { q: "How do you check a Revit model before delivery?", a: "Quality checks depend on the scope but can include model organization, warnings, naming, sheet consistency, view setup, family hygiene, duplicated content and agreed BIM standards. The goal is to return a model another team can continue using, not only a file that looks correct in screenshots." },
    ],
  },
  {
    id: "working",
    no: "05",
    title: "Work with us",
    subtitle: "Pricing, timelines, revisions, confidentiality and international delivery.",
    links: [
      { label: "How we work", href: "/process" },
      { label: "Proof & trust", href: "/proof" },
      { label: "Client terms", href: "/legal" },
      { label: "Start a project", href: "/contact" },
    ],
    faqs: [
      { q: "What does Artimist Productions do?", a: "Artimist Productions is a multidisciplinary design and creative production studio working across architecture, residential design, interiors, BIM and Revit, drafting, architectural visualization, animation, real-time experiences and related creative production. Projects can involve one discipline or several connected through the same studio direction." },
      { q: "Do you work with homeowners directly?", a: "Yes. Homeowners commonly approach us for custom house plans, floor-plan changes, additions, ADUs, renovation drawings, exterior design, 3D interior design and visualization. We explain what we can provide directly and where local licensed professionals or consultants may also be required." },
      { q: "Do you work with architects, builders and developers?", a: "Yes. Professional clients use Artimist for BIM, Revit, drafting, documentation, rendering, animation and production capacity. We can work behind an existing project lead, follow established standards and keep client-facing responsibility with the appointed architecture, design or development team." },
      { q: "Do you work with clients in the United States?", a: "Yes. Artimist works remotely with U.S. homeowners and professional teams. We can use imperial units and U.S. drawing conventions, but permit, stamp and code requirements remain jurisdiction-specific and must be verified for the city, county or state involved." },
      { q: "Can you work internationally?", a: "Yes. The studio is structured for remote international delivery and works with clients across multiple markets. Project standards, units, file formats, meeting times and local professional requirements are clarified at the beginning so the workflow fits the project location." },
      { q: "How much do Artimist services cost?", a: "Pricing depends on project size, quality of source information, required deliverables, complexity, revision expectations and deadline. Some scopes are best priced as a fixed project and others as ongoing production support. We review the brief before confirming the appropriate commercial structure." },
      { q: "Do you charge per project or per hour?", a: "Both structures are possible depending on the work. Clearly defined deliverables often suit fixed project pricing, while evolving production support, revision-heavy work or ongoing team extension may be more appropriate on an hourly, daily or monthly basis." },
      { q: "How long does a typical project take?", a: "Timelines vary widely. A focused drafting or rendering task may take days, while a custom home, BIM model or coordinated documentation package can take much longer. The schedule is confirmed after reviewing the brief, source files, expected revisions and required delivery stages." },
      { q: "How many revisions are included?", a: "The included revision allowance is stated in the project agreement. As a general working principle, revisions apply to the agreed scope rather than unlimited redesign. New requirements, major changes after approval or added deliverables can be treated as additional scope." },
      { q: "Does Artimist sign NDAs?", a: "Yes. NDA and confidential working arrangements are available where appropriate. Professional clients can also request white-label or non-public delivery so unreleased projects, client information and production files are handled within the agreed confidentiality boundaries." },
      { q: "Will my project automatically appear in the Artimist portfolio?", a: "No. Confidentiality, publication rights and portfolio use depend on the project agreement and client permissions. Projects under NDA or with restricted publicity are handled accordingly." },
      { q: "What should I send when requesting a quote?", a: "Send a short description of the project, location, what you need delivered, your deadline and any available drawings, models, sketches, photographs or reference material. The clearer the source information, the more accurately we can define scope, schedule and price." },
      { q: "What file formats can Artimist work with?", a: "Common inputs include PDF, DWG, RVT, image files, sketches, presentation files, point-cloud data and 3D model formats. File compatibility is checked at the start because the usefulness of a source file depends on its actual content, organization and version." },
      { q: "How do I start a project?", a: "Use the project brief or contact page and send the core information you already have. We review the request, identify the required disciplines, clarify missing information and then confirm scope, timeline, deliverables and commercial terms before production begins." },
    ],
  },
];

const allFaqs = groups.flatMap((group) => group.faqs);
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.artimistproductions.com/faqs#faqpage",
  url: "https://www.artimistproductions.com/faqs",
  name: "Artimist Productions Frequently Asked Questions",
  mainEntity: allFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const css = `
.faqp{--bg:#0a0b0d;--paper:#f0ece5;--ink:#111214;--wine:#a32c47;--line:rgba(255,255,255,.14);background:var(--bg);color:#f4efe9;min-height:100vh;font-family:"Artimist Geist","Helvetica Neue",Arial,sans-serif}.faqp *{box-sizing:border-box}.faqp a{color:inherit}.faqp-shell{width:min(1500px,calc(100% - clamp(32px,7vw,110px)));margin:auto}.faqp-hero{padding:clamp(154px,15vw,230px) 0 clamp(90px,10vw,150px);background:radial-gradient(circle at 82% 12%,rgba(163,44,71,.23),transparent 32%),#090a0c;border-bottom:1px solid var(--line)}.faqp-kicker{display:block;color:#df677d;font:650 9px/1.3 "Artimist Mono",monospace;letter-spacing:.17em;text-transform:uppercase}.faqp-hero-grid{display:grid;grid-template-columns:1.22fr .78fr;gap:clamp(50px,8vw,130px);align-items:end}.faqp h1,.faqp h2,.faqp h3{font-family:"Bodoni 72",Didot,"Iowan Old Style",Baskerville,Georgia,serif;font-weight:400;text-wrap:balance}.faqp h1{max-width:1100px;margin:30px 0 0;font-size:clamp(67px,9.4vw,150px);line-height:.82;letter-spacing:-.06em}.faqp h1 em{color:#e7b2bd;font-weight:400}.faqp-hero-copy{padding-bottom:8px}.faqp-hero-copy p{margin:0;font-family:"Bodoni 72",Didot,serif;font-size:clamp(23px,2.2vw,36px);line-height:1.15;color:rgba(255,255,255,.84)}.faqp-hero-copy small{display:block;margin-top:24px;color:rgba(255,255,255,.5);font-size:12px;line-height:1.7}.faqp-jump{padding:28px 0 30px;border-bottom:1px solid var(--line);position:sticky;top:78px;z-index:6;background:rgba(10,11,13,.94);backdrop-filter:blur(18px)}.faqp-jump-inner{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}.faqp-jump-inner::-webkit-scrollbar{display:none}.faqp-jump a{flex:0 0 auto;padding:12px 16px;border:1px solid rgba(255,255,255,.18);border-radius:999px;text-decoration:none;font:650 9px/1 "Artimist Mono",monospace;letter-spacing:.09em;text-transform:uppercase;transition:.25s}.faqp-jump a:hover{background:#f2eee8;color:#111214;border-color:#f2eee8}.faqp-section{scroll-margin-top:160px;padding:clamp(88px,10vw,150px) 0;border-bottom:1px solid var(--line)}.faqp-section:nth-of-type(even){background:#0d0e10}.faqp-section-head{display:grid;grid-template-columns:.32fr .68fr;gap:clamp(40px,8vw,120px);margin-bottom:56px}.faqp-section-no{font-family:"Artimist Mono",monospace;font-size:11px;letter-spacing:.15em;color:#d85c74}.faqp-section h2{margin:0;font-size:clamp(53px,6.2vw,96px);line-height:.88;letter-spacing:-.05em}.faqp-section-sub{max-width:720px;margin:24px 0 0;color:rgba(255,255,255,.58);font-size:14px;line-height:1.75}.faqp-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}.faqp-links a{padding:10px 13px;border:1px solid rgba(255,255,255,.14);border-radius:999px;text-decoration:none;font-size:10px;letter-spacing:.04em}.faqp-links a:hover{border-color:#df667c;color:#f0a9b7}.faqp-list{border-top:1px solid var(--line)}.faqp-item{border-bottom:1px solid var(--line)}.faqp-item summary{list-style:none;display:grid;grid-template-columns:44px 1fr auto;gap:16px;align-items:center;cursor:pointer;padding:25px 0}.faqp-item summary::-webkit-details-marker{display:none}.faqp-item summary small{color:#ce536b;font:650 8px/1 "Artimist Mono",monospace;letter-spacing:.1em}.faqp-item summary strong{font-family:"Bodoni 72",Didot,serif;font-size:clamp(20px,2vw,30px);font-weight:400;line-height:1.14}.faqp-item summary i{font-style:normal;font-size:22px;color:rgba(255,255,255,.48);transition:transform .25s}.faqp-item[open] summary i{transform:rotate(45deg);color:#e46b82}.faqp-answer{padding:0 64px 28px;max-width:1000px;color:rgba(255,255,255,.66);font-size:14px;line-height:1.8}.faqp-answer p{margin:0}.faqp-cta{padding:clamp(105px,12vw,180px) 0;background:var(--paper);color:var(--ink)}.faqp-cta-grid{display:grid;grid-template-columns:.86fr 1.14fr;gap:clamp(50px,9vw,150px);align-items:end}.faqp-cta h2{margin:26px 0 0;font-size:clamp(57px,7.5vw,118px);line-height:.84;letter-spacing:-.055em}.faqp-cta p{max-width:570px;margin:0 0 30px;color:rgba(17,18,20,.63);font-size:15px;line-height:1.75}.faqp-cta a{display:inline-flex;align-items:center;gap:20px;padding:17px 22px;background:#111214;color:#fff;text-decoration:none;border-radius:999px;font:650 9px/1 "Artimist Mono",monospace;letter-spacing:.11em;text-transform:uppercase}.faqp-cta a span{font-size:16px}@media(max-width:900px){.faqp-hero-grid,.faqp-section-head,.faqp-cta-grid{grid-template-columns:1fr}.faqp-hero-copy{max-width:650px}.faqp-jump{top:74px}.faqp-section-head{gap:24px}.faqp-answer{padding-left:60px}.faqp-cta-grid>div:last-child{margin-top:20px}}@media(max-width:620px){.faqp-shell{width:calc(100% - 28px)}.faqp-hero{padding-top:132px}.faqp h1{font-size:clamp(58px,17vw,86px)}.faqp-jump{top:72px;padding:16px 0}.faqp-jump a{padding:10px 12px}.faqp-section{scroll-margin-top:130px;padding:76px 0}.faqp-section h2{font-size:clamp(48px,14vw,70px)}.faqp-item summary{grid-template-columns:32px 1fr auto;gap:10px;padding:21px 0}.faqp-item summary strong{font-size:21px}.faqp-answer{padding:0 0 24px 42px;font-size:13px}.faqp-links{overflow-x:auto;flex-wrap:nowrap;margin-right:-14px;padding-right:14px;scrollbar-width:none}.faqp-links a{flex:0 0 auto}.faqp-cta h2{font-size:clamp(52px,15vw,78px)}}
`;

export default function FaqPage() {
  return <main className="faqp" id="top">
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <style dangerouslySetInnerHTML={{ __html: ".faqp-jump a,.faqp-links a{min-height:44px;display:flex;align-items:center}" }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <section className="faqp-hero">
      <div className="faqp-shell faqp-hero-grid">
        <div><span className="faqp-kicker">Questions / answers / routes</span><h1>Find the answer.<br/><em>Go deeper.</em></h1></div>
        <div className="faqp-hero-copy"><p>House plans, permits, interiors, rendering, BIM, Revit and working with Artimist — scan the answer quickly, then move into the service that solves it.</p><small>{allFaqs.length} practical answers connected to the pages where the full process, deliverables and project evidence live.</small></div>
      </div>
    </section>

    <nav className="faqp-jump" aria-label="FAQ categories"><div className="faqp-shell faqp-jump-inner">{groups.map((group)=><a key={group.id} href={`#${group.id}`}>{group.no} / {group.title}</a>)}</div></nav>

    {groups.map((group) => <section className="faqp-section" id={group.id} key={group.id}>
      <div className="faqp-shell">
        <header className="faqp-section-head">
          <div className="faqp-section-no">{group.no} / {String(group.faqs.length).padStart(2,"0")} QUESTIONS</div>
          <div><h2>{group.title}</h2><p className="faqp-section-sub">{group.subtitle}</p><div className="faqp-links">{group.links.map((item)=><Link key={item.href} href={item.href}>{item.label} ↗</Link>)}</div></div>
        </header>
        <div className="faqp-list">{group.faqs.map((faq, index)=><details className="faqp-item" key={faq.q}><summary><small>{String(index+1).padStart(2,"0")}</small><strong>{faq.q}</strong><i aria-hidden="true">+</i></summary><div className="faqp-answer"><p>{faq.a}</p></div></details>)}</div>
      </div>
    </section>)}

    <section className="faqp-cta"><div className="faqp-shell faqp-cta-grid"><div><span className="faqp-kicker">Still specific?</span><h2>Show us the<br/>actual project.</h2></div><div><p>If the answer depends on your property, drawings, model, deadline or local requirements, send the real brief. We can tell you what Artimist can handle, what information is missing and what should happen next.</p><Link href="/contact">Start a project <span>↗</span></Link></div></div></section>
  </main>;
}
