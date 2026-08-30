// US search-acquisition landing pages: three hubs and six money pages.
// Each entry is deliberately distinct — different search intent, different
// copy — so no two pages read as thin variants of one another.

export type LandingFaq = { q: string; a: string };

export type LandingBlock = { h: string; p: string };

export type LandingPage = {
  slug: string;
  kind: "hub" | "service";
  name: string;
  primaryKeyword: string;
  title: string;
  desc: string;
  h1: string;
  tagline: string;
  intro: string;
  forWho: string;
  problems: string[];
  included: string[];
  deliverables?: string[];
  inputs?: string[];
  workflow: LandingBlock[];
  software?: string[];
  quality?: string;
  faqs: LandingFaq[];
  related: string[]; // slugs (hubs or services)
  parentHub?: string;
};

export const LANDING_PAGES: LandingPage[] = [
  // ─────────────────────────── HUBS ───────────────────────────
  {
    slug: "architecture",
    kind: "hub",
    name: "Architecture",
    primaryKeyword: "architectural services",
    title: "Architectural Design & Documentation Services | Artimist",
    desc: "Architectural design support, permit and construction documentation, interiors, feasibility and renovation for architects, developers and builders across the US.",
    h1: "Architectural Services",
    tagline: "Design support and documentation, from first massing to a submittable set.",
    intro:
      "We support architecture practices, developers and builders across the residential and commercial spectrum — carrying a project from early spatial strategy through the drawing set that gets it permitted and built. When a locally licensed professional is required to stamp drawings, we work alongside yours rather than around them.",
    forWho:
      "Architecture firms scaling production without adding headcount, developers who need a full documentation set, and builders and homeowners with serious residential projects that have outgrown a napkin sketch.",
    problems: [
      "Design intent is clear but there is no team to turn it into a coordinated, submittable drawing set.",
      "In-house drafters are at capacity and a deadline is closing.",
      "A project stalled between concept and permit because the documentation was never completed.",
    ],
    included: [
      "Residential design support",
      "Commercial design support",
      "Interior design",
      "Permit documentation",
      "Construction documentation",
      "Feasibility studies",
      "Renovation & adaptive reuse",
    ],
    workflow: [
      { h: "Understand the project", p: "We start from whatever exists — a brief, a sketch, a survey or a half-finished CAD file — and tell you plainly what is present and what is missing to reach the outcome you need." },
      { h: "Design and document", p: "Spatial strategy, plans, sections and elevations are developed to your standards, then coordinated into a consistent set rather than a pile of unrelated sheets." },
      { h: "Coordinate for approval", p: "The set is prepared for its real destination — a planning board, a permit office, a contractor — and where a stamp is needed we coordinate with your licensed professional." },
    ],
    faqs: [
      { q: "Do you replace our in-house team or extend it?", a: "Extend it. Most of our architecture clients keep design direction in-house and use us for production capacity and documentation, to their template and standards." },
      { q: "Can you stamp drawings for permit?", a: "We do not hold licensure in every US jurisdiction and will never claim to. Where a stamp is required we prepare the set to a submittable standard and coordinate with your locally licensed professional." },
      { q: "What kinds of projects do you take?", a: "Residential and commercial, new-build and renovation. If it needs drawings, we can usually help — and if it does not suit us we will tell you before you commit." },
    ],
    related: ["architectural-drafting-services", "permit-drawing-services", "construction-documentation-services"],
  },
  {
    slug: "bim-drafting",
    kind: "hub",
    name: "BIM & Drafting",
    primaryKeyword: "BIM and drafting services",
    title: "BIM & Drafting Services — Revit, CAD, Scan to BIM | Artimist",
    desc: "Architectural drafting, Revit drafting, BIM modeling, CAD drafting, CAD to Revit, PDF to CAD, Scan to BIM and as-built drawings for US architects and builders.",
    h1: "BIM & Drafting Services",
    tagline: "Production drafting and BIM to your standards, not ours.",
    intro:
      "The production engine behind a design practice: Revit and CAD drafting, BIM modeling, format conversions and Scan to BIM. We work inside your template, your title block and your layer standards, so the output looks like it came from your own studio.",
    forWho:
      "Architects and BIM managers who need reliable overflow production, and builders and developers who need existing conditions or design drawings turned into usable models and sheets.",
    problems: [
      "Revit production is the bottleneck and hiring is slower than the pipeline.",
      "Drawings arrive as PDFs or paper and need to become editable CAD or a live Revit model.",
      "Existing conditions were captured as a point cloud and now need to become an accurate as-built model.",
    ],
    included: [
      "Architectural drafting",
      "Revit drafting",
      "BIM modeling",
      "CAD drafting",
      "CAD to Revit",
      "PDF to CAD",
      "PDF to Revit",
      "Scan to BIM",
      "Point Cloud to BIM",
      "As-Built drawings",
    ],
    workflow: [
      { h: "Set the standard", p: "Before production starts we align on template, title block, layer and family standards, and the level of detail you actually need — so nothing has to be redone." },
      { h: "Model and draft", p: "We build the model or draft the set, checking geometry and annotation against your source material as we go rather than at the end." },
      { h: "Review and hand back", p: "A second set of eyes runs quality control, then we hand back native files you own outright — Revit, DWG or PDF — ready to drop into your project." },
    ],
    software: ["Autodesk Revit", "AutoCAD", "Navisworks", "Recap / point-cloud tools", "SketchUp"],
    faqs: [
      { q: "Will the files match our office standards?", a: "Yes — that is the point. We work to your template, title block, layers and families so the deliverable is indistinguishable from in-house work." },
      { q: "What LOD do you model to?", a: "Whatever the project needs, commonly LOD 300 to LOD 350. We agree the level of detail up front so you are not paying for detail you will never use." },
      { q: "Do we own the files?", a: "Completely. You receive the native, editable files with no lock-in." },
    ],
    related: ["architectural-drafting-services", "revit-drafting-services", "bim-modeling-services"],
  },
  {
    slug: "visualization",
    kind: "hub",
    name: "Visualization",
    primaryKeyword: "architectural visualization services",
    title: "Architectural Visualization & 3D Rendering Services | Artimist",
    desc: "Exterior and interior rendering, real-estate visualization, animation, 3D walkthroughs and Unreal Engine real-time experiences for developers, architects and brands.",
    h1: "Architectural Visualization Services",
    tagline: "Show the building the way it will actually feel — before it exists.",
    intro:
      "Images that sell, persuade and get things approved: photoreal exterior and interior renders, real-estate marketing sets, cinematic animation, and interactive real-time experiences in Unreal Engine. One coherent visual language across every asset a project needs.",
    forWho:
      "Developers opening pre-construction sales, architects preparing planning and competition boards, and brands that need a space to look finished long before it is.",
    problems: [
      "Sales need to open but there is nothing to show buyers except floor plans.",
      "A planning or competition submission needs imagery that reads as considered, not clip-art.",
      "A development is too large or too experiential for a single still to communicate.",
    ],
    included: [
      "Exterior rendering",
      "Interior rendering",
      "Architectural rendering",
      "Real-estate visualization",
      "Architectural animation",
      "3D walkthroughs",
      "Unreal Engine experiences",
      "Interactive experiences",
    ],
    workflow: [
      { h: "Build the scene", p: "We start from your drawings or model and build an accurate 3D scene — geometry, materials, landscape and lighting set to match the real design intent." },
      { h: "Review at low resolution", p: "You review camera, composition and light at draft quality and make real decisions before anything is committed to a final render." },
      { h: "Deliver the set", p: "Final stills, animation or a real-time build are delivered in the aspect ratios and formats each channel needs, with a consistent grade across the whole campaign." },
    ],
    software: ["3ds Max", "Corona / V-Ray", "Unreal Engine", "Blender", "After Effects"],
    faqs: [
      { q: "Can you keep a consistent style across a whole development?", a: "Yes. We treat a development as one visual identity — camera language, time of day and colour grade stay consistent so the campaign reads as a single confident product." },
      { q: "When should visualization start?", a: "As soon as there is enough design to represent honestly. Earlier imagery drives pre-construction sales and planning; later imagery refines the marketing set." },
      { q: "Do you do interactive as well as stills?", a: "Yes — from a single hero render to a real-time Unreal Engine walkthrough a client can control themselves." },
    ],
    related: ["architectural-visualization-services", "unreal-engine"],
  },

  // ─────────────────────── MONEY PAGES ───────────────────────
  {
    slug: "architectural-drafting-services",
    kind: "service",
    name: "Architectural Drafting",
    primaryKeyword: "architectural drafting services",
    title: "Architectural Drafting Services for US Projects | Artimist",
    desc: "Professional architectural drafting services: accurate plans, sections, elevations and details in CAD or Revit, to your standards, for architects, builders and developers.",
    h1: "Architectural Drafting Services",
    tagline: "Accurate, coordinated drawings — drafted to your standards.",
    intro:
      "Architectural drafting is the difference between a good idea and a set someone can build from. We produce plans, sections, elevations and details that are accurate, internally consistent and ready to move forward — in CAD or Revit, using your template so the output belongs to your office.",
    forWho:
      "Architecture practices needing production overflow, and builders, developers and homeowners who have a design but no one to turn it into proper construction-ready drawings.",
    problems: [
      "A design exists as sketches or a rough model and needs to become a clean, dimensioned drawing set.",
      "Your drafters are fully committed and a deadline will not move.",
      "Earlier drawings are inconsistent — dimensions that do not add up, details that contradict the plan.",
    ],
    included: [
      "Floor plans",
      "Reflected ceiling plans",
      "Sections & elevations",
      "Construction details",
      "Door, window & finish schedules",
      "Site & location plans",
      "Dimension & annotation cleanup",
    ],
    deliverables: [
      "Coordinated multi-sheet drawing set",
      "Native CAD (DWG) or Revit (RVT) files",
      "Print-ready PDF set",
    ],
    inputs: ["Hand sketches", "PDF drawings", "DWG / CAD files", "Revit / SketchUp models", "Survey data"],
    workflow: [
      { h: "Review the source", p: "We examine everything you send and confirm what is usable and what is missing before any drafting begins, so there are no surprises mid-set." },
      { h: "Draft to your standard", p: "Plans, sections and elevations are drafted in your template with correct layers, line weights and annotation — coordinated against each other as we go." },
      { h: "Quality-check and deliver", p: "A separate reviewer checks dimensions, references and sheet consistency, then you receive native, editable files plus a print-ready PDF." },
    ],
    software: ["AutoCAD", "Autodesk Revit", "SketchUp"],
    quality:
      "Every set goes through an independent check for dimensional accuracy, cross-sheet references and annotation consistency before it reaches you — because a drawing that contradicts itself costs more on site than it ever saved in drafting.",
    faqs: [
      { q: "Can you work in our existing CAD or Revit template?", a: "Yes. Send your template, title block and standards and the drawings come back looking like your own studio produced them." },
      { q: "How do you handle incomplete information?", a: "We flag every assumption and gap rather than guessing. You get a clear list of what we need to finish, not a set full of silent invention." },
      { q: "What file formats do you deliver?", a: "Native DWG or RVT plus a print-ready PDF. You own the editable files outright." },
      { q: "How fast can you turn a set around?", a: "It depends on scope and sheet count. Send the drawings and the deadline and you will get a specific timeline, not a vague range." },
    ],
    related: ["revit-drafting-services", "permit-drawing-services", "construction-documentation-services"],
    parentHub: "bim-drafting",
  },
  {
    slug: "revit-drafting-services",
    kind: "service",
    name: "Revit Drafting",
    primaryKeyword: "Revit drafting services",
    title: "Revit Drafting Services for Architects & Builders | Artimist",
    desc: "Professional Revit drafting services: parametric models, coordinated construction documents, families and sheets built to your BIM standards — reliable production overflow.",
    h1: "Professional Revit Drafting Services",
    tagline: "Revit production that behaves like it came from your own BIM team.",
    intro:
      "Revit is only as good as the discipline behind it. We produce parametric models and coordinated construction documents inside your BIM standards — right families, right worksets, right level of detail — so the model stays clean and the sheets stay coordinated as the project grows.",
    forWho:
      "Architects and BIM managers who need trusted Revit overflow, and firms moving from CAD to Revit who need production help without compromising their standards.",
    problems: [
      "Revit output is the production bottleneck and hiring cannot keep pace.",
      "Outsourced Revit work has come back as a messy model that costs more to fix than to redo.",
      "A project needs Revit documentation but the practice is still CAD-first internally.",
    ],
    included: [
      "Parametric Revit modeling",
      "Construction documentation in Revit",
      "Custom & shared families",
      "Sheet & view setup",
      "Worksets & coordination",
      "Schedules & tags",
      "CAD-to-Revit rebuilds",
    ],
    deliverables: [
      "Coordinated Revit (RVT) model",
      "Documented sheet set",
      "Reusable families where relevant",
      "Print-ready PDF set",
    ],
    inputs: ["Revit models", "CAD / DWG drawings", "PDF sets", "SketchUp models", "Point-cloud scans"],
    workflow: [
      { h: "Agree the BIM standard", p: "Template, shared parameters, family and workset standards and target LOD are locked before modeling — this is where most outsourced Revit work quietly goes wrong, so we get it right first." },
      { h: "Model parametrically", p: "Geometry is modeled to behave, not just to look right in one view — so a change in plan updates the section, the schedule and the sheet the way Revit is supposed to." },
      { h: "Coordinate and check", p: "Sheets, tags and schedules are set up and reviewed for coordination before delivery, so you inherit a model you can actually keep working in." },
    ],
    software: ["Autodesk Revit", "Navisworks", "AutoCAD", "Dynamo"],
    quality:
      "We audit the model for family hygiene, workset structure and warning count before hand-off. A tidy Revit model is not a nicety — it is the difference between a model your team can extend and one they have to babysit.",
    faqs: [
      { q: "Will the model follow our BIM standards?", a: "Yes. Shared parameters, families, worksets and LOD are agreed up front and followed throughout, so the model drops into your environment cleanly." },
      { q: "Can you rebuild CAD or PDF drawings as a Revit model?", a: "Yes — CAD-to-Revit and PDF-to-Revit rebuilds are core work. We reconstruct a proper parametric model rather than tracing dumb lines." },
      { q: "What LOD do you work to?", a: "Commonly LOD 300 to 350, set to match the project stage. We will not over-model detail you do not need." },
      { q: "How do you keep the model clean?", a: "We manage warnings, purge unused content and follow a consistent family and naming discipline, then audit before hand-off." },
    ],
    related: ["architectural-drafting-services", "bim-modeling-services", "construction-documentation-services"],
    parentHub: "bim-drafting",
  },
  {
    slug: "bim-modeling-services",
    kind: "service",
    name: "BIM Modeling",
    primaryKeyword: "BIM modeling services",
    title: "BIM Modeling Services for Architecture & Construction | Artimist",
    desc: "BIM modeling services for architecture and construction: accurate, coordinated 3D models at the right LOD, including Scan to BIM and as-built modeling from point-cloud data.",
    h1: "BIM Modeling Services",
    tagline: "Coordinated models at the level of detail your project actually needs.",
    intro:
      "A BIM model is only useful if it is accurate, coordinated and built to the right level of detail. We produce discipline-coordinated models — new design or existing conditions from a point cloud — that carry the information a project needs downstream, without the bloat that makes a model slow and unusable.",
    forWho:
      "Architects, BIM managers, contractors and developers who need a reliable model for documentation, coordination or as-built record.",
    problems: [
      "A project needs a coordinated model but the in-house team cannot absorb the workload.",
      "Existing conditions were laser-scanned and the point cloud now needs to become a usable model.",
      "Models from different sources do not line up and need rebuilding to one standard.",
    ],
    included: [
      "Architectural BIM modeling",
      "Scan to BIM",
      "Point Cloud to BIM",
      "As-built modeling",
      "LOD 300 – 350 models",
      "Model coordination",
      "Family creation",
    ],
    deliverables: [
      "Coordinated Revit (RVT) model",
      "As-built model from scan data where relevant",
      "Model at agreed LOD with documented families",
    ],
    inputs: ["Point-cloud scans (RCP/RCS/E57)", "Revit models", "CAD drawings", "PDF sets", "Survey data"],
    workflow: [
      { h: "Define scope and LOD", p: "We agree exactly what is modeled, to what level of detail, and to what tolerance — the single decision that determines whether a model is useful or expensive noise." },
      { h: "Model from source", p: "For new design we model from your drawings; for existing conditions we model directly against the registered point cloud so the geometry matches reality, not a guess." },
      { h: "Coordinate and validate", p: "The model is checked for coordination and, for Scan to BIM, validated against the scan for deviation before it is handed over." },
    ],
    software: ["Autodesk Revit", "Recap", "Navisworks", "Dynamo"],
    quality:
      "For Scan to BIM we validate modeled geometry against the point cloud so you know the tolerance you are getting. For design models we check inter-element and inter-discipline coordination before delivery.",
    faqs: [
      { q: "What is the difference between LOD 300 and LOD 350?", a: "Broadly, LOD 300 models elements with accurate size, shape and location; LOD 350 adds how elements connect and interface with each other — important for coordination. We match LOD to what the project needs." },
      { q: "Can you model from a point cloud?", a: "Yes. Scan to BIM and Point Cloud to BIM are core work — we model against the registered scan and validate deviation so you know the accuracy." },
      { q: "Which scan formats do you accept?", a: "Common formats including RCP/RCS and E57. If you have raw scans we can advise on registration too." },
      { q: "Will the model be coordinated?", a: "Yes — we check coordination within the model and, where relevant, against other disciplines before hand-off." },
    ],
    related: ["revit-drafting-services", "architectural-drafting-services", "construction-documentation-services"],
    parentHub: "bim-drafting",
  },
  {
    slug: "permit-drawing-services",
    kind: "service",
    name: "Permit Documentation",
    primaryKeyword: "permit drawing services",
    title: "Permit Drawing & Documentation Services | Artimist",
    desc: "Permit drawing production support for architects, builders and developers: coordinated plans, sections, elevations and submission packages aligned with local professional review.",
    h1: "Professional Permit Drawing & Documentation Support",
    tagline: "Coordinated permit-set production for professional project teams.",
    intro:
      "Artimist supports architects, builders, developers and design teams that need reliable production capacity for permit documentation. We develop coordinated plans, sections, elevations, schedules and response revisions to the supplied standards, while the locally licensed professional retains the review, signature or seal responsibilities required by the jurisdiction.",
    forWho:
      "Architecture practices, builders, developers and consultants that already understand the approval pathway and need a dependable production team to complete or revise the architectural drawing package.",
    problems: [
      "A professional team has the design direction but not enough production capacity to complete the architectural permit set.",
      "A reviewer or local professional has issued markups that need to be incorporated accurately across the entire package.",
      "Sheets contradict each other and reviewers keep sending it back.",
    ],
    included: [
      "Residential permit-set production",
      "Commercial permit-set production",
      "Site & zoning plans",
      "Code-required plans, sections & elevations",
      "Schedules & general notes",
      "Existing & proposed drawings",
      "Resubmission & markup response",
    ],
    deliverables: [
      "Complete, coordinated permit drawing set",
      "Print-ready PDF formatted for submission",
      "Native CAD or Revit files",
    ],
    inputs: ["Sketches", "PDF drawings", "CAD / DWG files", "Revit / SketchUp models", "Site surveys"],
    workflow: [
      { h: "Scope against the requirement", p: "We identify what the submission needs to contain and compare it against what you have, so you get a clear gap list before any drafting starts." },
      { h: "Produce the set", p: "Plans, sections, elevations, schedules and notes are produced as one coordinated set — the internal consistency reviewers look for is built in, not bolted on." },
      { h: "Coordinate the stamp", p: "Where a locally licensed professional must stamp the drawings, we prepare the set to their standard and coordinate the review so nothing is misrepresented about who is responsible for what." },
    ],
    software: ["AutoCAD", "Autodesk Revit", "SketchUp"],
    quality:
      "Every permit set is checked sheet-against-sheet for the contradictions that trigger rejections — plan versus section, schedule versus drawing, note versus detail — before it goes anywhere near a submission.",
    faqs: [
      { q: "Is this page intended for homeowners?", a: "This service is structured for architects, builders, developers and professional teams needing permit-set production support. Homeowners planning an addition or renovation should begin with our Residential Renovation & Permit Plans service." },
      { q: "Can you stamp the drawings?", a: "We do not claim licensure we do not hold. Where a stamp is required we prepare drawings to a submittable standard and work alongside your licensed professional." },
      { q: "Do you handle resubmissions?", a: "Yes. If a set comes back with markups we respond to them and update the drawings so it clears on the next pass." },
      { q: "Residential and commercial both?", a: "Yes. The production scope can support residential or commercial packages when the jurisdiction, professional responsibilities and required deliverables are defined before work begins." },
    ],
    related: ["construction-documentation-services", "architectural-drafting-services", "residential-renovation-permit-drawings"],
    parentHub: "architecture",
  },
  {
    slug: "construction-documentation-services",
    kind: "service",
    name: "Construction Documentation",
    primaryKeyword: "construction documentation services",
    title: "Architectural Construction Documentation Services | Artimist",
    desc: "Construction documentation services: complete, coordinated CD sets — plans, sections, details and schedules — that a contractor can actually build from, in CAD or Revit.",
    h1: "Construction Documentation Services",
    tagline: "The set the building actually gets built from — coordinated and complete.",
    intro:
      "Construction documents are where ambiguity becomes expensive. We produce coordinated CD sets — plans, sections, details, schedules and notes — detailed enough that a contractor prices and builds from them with fewer RFIs and fewer surprises on site. Delivered in CAD or Revit, to your standards.",
    forWho:
      "Architects who need CD-phase production support, developers taking a project to tender, and builders who need buildable, unambiguous drawings.",
    problems: [
      "Design development is done but the CD set is a mountain of work the team cannot absorb.",
      "Earlier drawings are not coordinated and would generate a flood of RFIs on site.",
      "A project is going to tender and needs a set contractors can price accurately.",
    ],
    included: [
      "Full construction drawing set",
      "Wall, floor & roof details",
      "Sections & enlarged plans",
      "Door, window & finish schedules",
      "General notes & specifications coordination",
      "Cross-referencing & sheet management",
    ],
    deliverables: [
      "Coordinated, cross-referenced CD set",
      "Native CAD (DWG) or Revit (RVT) files",
      "Tender-ready PDF set",
    ],
    inputs: ["Design development drawings", "Revit / CAD models", "PDF sets", "Sketches & markups", "Specifications"],
    workflow: [
      { h: "Build from design development", p: "We take the DD set forward, resolving the detail and coordination that turns a design into something buildable rather than merely drawn." },
      { h: "Detail and cross-reference", p: "Details, schedules and notes are developed and cross-referenced across the set so a contractor can follow a reference from a plan to the detail without guessing." },
      { h: "Coordinate and quality-check", p: "The full set is checked for internal coordination and reference integrity before it goes to tender or to site." },
    ],
    software: ["Autodesk Revit", "AutoCAD"],
    quality:
      "We check the whole set for reference integrity and coordination — every callout lands where it should, every schedule matches its drawings — because the cost of an uncoordinated CD set lands on site, not on the drawing board.",
    faqs: [
      { q: "What is the difference between permit drawings and construction drawings?", a: "Permit drawings prove a design meets code well enough to be approved; construction drawings carry the detail a contractor needs to actually build it. They overlap but are not the same, and we produce both." },
      { q: "Can you continue from our design development set?", a: "Yes — that is the most common way we are engaged. We take DD forward into a coordinated CD set to your standards." },
      { q: "Will the set be cross-referenced?", a: "Yes. Callouts, details and schedules are cross-referenced across the set and checked for reference integrity before delivery." },
      { q: "CAD or Revit?", a: "Either — we work in your environment and deliver native, editable files." },
    ],
    related: ["permit-drawing-services", "architectural-drafting-services", "revit-drafting-services"],
    parentHub: "architecture",
  },
  {
    slug: "architectural-visualization-services",
    kind: "service",
    name: "Architectural Visualization",
    primaryKeyword: "architectural visualization services",
    title: "Architectural Visualization & 3D Rendering Services | Artimist",
    desc: "Architectural visualization and 3D rendering services: photoreal exterior and interior renders, animation and real-time experiences for developers, architects and brands.",
    h1: "Architectural Visualization Services",
    tagline: "Photoreal images that get projects sold, approved and remembered.",
    intro:
      "High-end architectural visualization that lets a client, an investor or a planning board see a building the way it will actually feel — light, material, atmosphere and context, resolved before construction begins. Stills, animation or interactive real-time, delivered as one coherent visual package.",
    forWho:
      "Property developers opening pre-construction sales, architects preparing planning and competition submissions, and brands that need a finished-looking space before it is built.",
    problems: [
      "Sales need to open and there is nothing to show buyers but plans.",
      "A planning or competition board submission needs imagery that reads as serious and considered.",
      "Marketing needs a consistent visual set across brochure, web and paid social.",
    ],
    included: [
      "Exterior renders",
      "Interior renders",
      "Dusk, daylight & night variants",
      "Aerial & context views",
      "Architectural animation",
      "3D walkthroughs",
      "Real-estate marketing sets",
      "Real-time / Unreal Engine experiences",
    ],
    deliverables: [
      "Print- and presentation-resolution stills",
      "Aspect-ratio crops for brochure, web, hoarding & social",
      "Animation or real-time build where commissioned",
    ],
    inputs: ["Revit / CAD drawings", "SketchUp / 3D models", "Massing models", "Plans & elevations", "Material & FF&E references"],
    workflow: [
      { h: "Build an accurate scene", p: "From your drawings or model we build a true 3D scene — geometry, materials, landscape and lighting set to the real design intent, not a generic approximation." },
      { h: "Review before final", p: "You review camera, composition and lighting at draft resolution and make decisions there, so the final render is a confirmation rather than a gamble." },
      { h: "Deliver a coherent set", p: "Finals are delivered in every aspect ratio each channel needs, colour-graded consistently so the whole campaign reads as one product." },
    ],
    software: ["3ds Max", "Corona Renderer", "V-Ray", "Unreal Engine", "Blender", "After Effects", "Photoshop"],
    quality:
      "Where a specified product or finish exists we model it accurately; where it is still open we render a clearly-marked stand-in so nothing is misrepresented. Every image is colour-managed so the set holds together across print and screen.",
    faqs: [
      { q: "How is this different from 3D rendering alone?", a: "Rendering is one output. Visualization is the whole package — coordinated stills, animation and interactive work in a single, consistent visual language across a project." },
      { q: "What do you need to start?", a: "Drawings or a 3D model, plus any material and FF&E references. The more accurate the source, the more accurate the image." },
      { q: "Can you match a development's existing brand?", a: "Yes. We work to your art direction and keep camera language, time of day and grade consistent with your identity." },
      { q: "Do you offer real-time / Unreal Engine?", a: "Yes — from a single render up to an interactive Unreal Engine walkthrough a client can control themselves." },
    ],
    related: ["visualization", "unreal-engine"],
    parentHub: "visualization",
  },
  {
    slug: "sketch-to-floor-plan-service",
    kind: "service",
    name: "Sketch to Floor Plan",
    primaryKeyword: "turn a sketch into a floor plan",
    title: "Turn Your Sketch Into a Professional Floor Plan | Artimist",
    desc: "Send a hand sketch, marked-up PDF or rough layout and receive a clean, scaled professional floor plan prepared for design, renovation or visualization.",
    h1: "Turn Your Sketch Into a Professional Floor Plan",
    tagline: "From a rough idea to a clear, scaled drawing you can actually use.",
    intro:
      "A hand sketch can communicate the idea without communicating enough information to design, price or coordinate the project. Artimist redraws sketches, screenshots and marked-up plans as clear digital floor plans, verifies the dimensions you provide and identifies what is still missing before the drawing is treated as reliable project information.",
    forWho:
      "Homeowners with a hand-drawn idea, builders documenting an early layout, real-estate teams needing a clean plan and designers who need rough information converted into editable CAD or Revit.",
    problems: [
      "The layout exists only as a notebook sketch, phone image or marked-up PDF.",
      "An old plan is difficult to read and cannot be edited cleanly.",
      "A floor plan is needed before design development, renovation pricing or 3D visualization can begin.",
    ],
    included: [
      "Hand sketch to floor plan",
      "PDF or image redraw",
      "Room names and dimensions",
      "Doors, windows and circulation",
      "Furniture-aware layout cleanup",
      "Existing-plan digitization",
      "Optional CAD or Revit setup",
      "Optional 3D visualization",
    ],
    deliverables: ["Scaled floor-plan PDF", "Editable DWG or RVT where included", "Marked assumptions and missing-information notes"],
    inputs: ["Hand sketches", "Phone photos", "Marked-up PDFs", "Existing plans", "Known measurements and site photos"],
    workflow: [
      { h: "Send the rough information", p: "Share the sketch or old plan together with every reliable dimension, photograph and note you have. We separate measured information from assumptions before drawing begins." },
      { h: "Redraw and clarify", p: "The layout is reconstructed as a clean digital floor plan with consistent walls, openings, room names and dimensions, then checked against the information supplied." },
      { h: "Review and receive", p: "You review one clear draft, answer any remaining dimensional questions and receive the agreed PDF, DWG or Revit output with its intended use stated clearly." },
    ],
    software: ["AutoCAD", "Autodesk Revit", "SketchUp"],
    quality:
      "We do not silently invent missing dimensions. Assumptions and unresolved information are identified so a presentation plan is never mistaken for verified survey or construction information.",
    faqs: [
      { q: "Can you work from a photo of my hand sketch?", a: "Yes. A clear phone photo is enough to begin when you also provide the dimensions and notes needed to understand the layout." },
      { q: "Will the result be ready for construction?", a: "Not automatically. A redraw records the information supplied. Construction or permit use requires verified dimensions, the appropriate drawing scope and any locally required professional review." },
      { q: "Can you improve the layout while redrawing it?", a: "Yes, but layout design is separated from basic redraw work so the design responsibility, options and revision allowance stay clear." },
      { q: "Can I receive an editable file?", a: "Yes. DWG or Revit delivery can be included in the written scope together with a print-ready PDF." },
    ],
    related: ["architectural-drafting-services", "floor-plan-to-3d-rendering", "custom-house-design"],
    parentHub: "architecture",
  },
  {
    slug: "floor-plan-to-3d-rendering",
    kind: "service",
    name: "Floor Plan to 3D",
    primaryKeyword: "turn a floor plan into 3D",
    title: "Turn a Floor Plan Into a 3D Rendering | Artimist",
    desc: "Convert a floor plan, sketch or drawing set into a clear 3D model and photoreal interior or exterior render before construction or renovation.",
    h1: "Turn Your Floor Plan Into a 3D Rendering",
    tagline: "See the rooms, light and materials before committing on site.",
    intro:
      "A floor plan explains relationships but not how the finished space will feel. Artimist builds a coordinated 3D model from your plan, confirms the design information that affects height and appearance, and produces realistic views that help you judge proportion, furniture, material, lighting and exterior form before construction begins.",
    forWho:
      "Homeowners comparing renovation or new-home options, interior designers presenting a scheme, builders explaining a proposal and developers who need believable pre-construction imagery.",
    problems: [
      "The plan is difficult for the client or family to understand spatially.",
      "Furniture, lighting and material decisions are being made without seeing the complete room.",
      "A project needs realistic imagery for review, approval, marketing or investor presentation.",
    ],
    included: [
      "Floor plan to 3D model",
      "Interior 3D rendering",
      "Exterior 3D rendering",
      "Furniture and fixture placement",
      "Material and finish direction",
      "Daylight and evening options",
      "Camera and composition review",
      "Optional animation or walkthrough",
    ],
    deliverables: ["Photoreal still images", "Agreed image resolutions and crops", "3D model or source files where specifically included"],
    inputs: ["Floor plans", "Elevations and sections", "Reference images", "Material selections", "Furniture or product references"],
    workflow: [
      { h: "Check the plan", p: "We review dimensions, levels, openings and any elevations or references needed to build the model honestly rather than guessing at missing design information." },
      { h: "Build and review in 3D", p: "The model, cameras, furniture and early material direction are shared at draft quality so spatial decisions are made before final rendering." },
      { h: "Resolve the final images", p: "Approved views are completed with accurate materials, lighting, landscape and post-production, then delivered in the formats named in the scope." },
    ],
    software: ["3ds Max", "Corona Renderer", "V-Ray", "Unreal Engine", "SketchUp", "Photoshop"],
    quality:
      "Every final image is tied back to the supplied plan and approved camera. Design changes and visualization corrections are separated so revision time remains predictable.",
    faqs: [
      { q: "Is a floor plan alone enough?", a: "It can be enough for an early interior study, but accurate exterior or detailed interior work normally also needs heights, elevations, material references and information about doors, windows and ceilings." },
      { q: "Can you design the interior as well as render it?", a: "Yes. Interior design development can be included as a separate responsibility instead of treating unresolved design decisions as free rendering revisions." },
      { q: "How many views will I receive?", a: "The view count is agreed before production. We recommend the smallest set that clearly explains the project rather than producing repetitive images." },
      { q: "Can I receive the 3D model?", a: "Yes when editable model delivery is specifically included in the quotation and the intended software format is agreed before work begins." },
    ],
    related: ["visualization", "sketch-to-floor-plan-service", "architectural-visualization-services"],
    parentHub: "visualization",
  },
  {
    slug: "home-addition-plans",
    kind: "service",
    name: "Home Addition Plans",
    primaryKeyword: "plans for a home addition",
    title: "Home Addition Plans & Extension Drawings | Artimist",
    desc: "Existing and proposed plans, elevations, sections and permit-documentation support for room additions, home extensions and residential remodeling projects.",
    h1: "Home Addition Plans & Extension Drawings",
    tagline: "Connect the new space to the existing home before construction begins.",
    intro:
      "A home addition is not only an extra room. It changes circulation, structure, roof form, daylight, exterior appearance and the relationship between existing and proposed work. Artimist develops the layout and coordinated architectural drawings needed to understand the addition, review it with local professionals and move toward permit or construction documentation.",
    forWho:
      "Homeowners planning a bedroom, family-room, kitchen, garage, second-story or rear addition and builders who need a clear architectural base for residential coordination.",
    problems: [
      "The required extra space is clear but its relationship to the existing floor plan is not.",
      "A concept sketch needs to become existing and proposed architectural drawings.",
      "The addition affects roof, structure, openings or exterior character and needs coordinated review.",
    ],
    included: [
      "Existing-condition plans",
      "Proposed addition plans",
      "Room and circulation planning",
      "Exterior elevations",
      "Building sections",
      "Roof-form coordination",
      "Permit-documentation support",
      "Optional exterior and interior 3D views",
    ],
    deliverables: ["Existing and proposed drawing package", "PDF issue set", "DWG or Revit files where included"],
    inputs: ["Survey or measured drawings", "Existing plans", "Site photographs", "Room requirements", "Jurisdiction and property information"],
    workflow: [
      { h: "Understand the existing house", p: "We begin from reliable existing information and identify the structural, dimensional, access and planning constraints that shape the addition." },
      { h: "Develop the addition", p: "Layout, circulation, openings, roof and exterior form are developed together so the new space does not solve one problem while creating another." },
      { h: "Coordinate the drawing package", p: "The agreed plans, elevations and sections are prepared for their stated review purpose and coordinated with the locally required professionals or consultants." },
    ],
    software: ["AutoCAD", "Autodesk Revit", "SketchUp", "3ds Max"],
    quality:
      "Existing and proposed conditions are separated clearly, and locally required structure, energy, zoning, professional review and stamps are identified as responsibilities rather than hidden assumptions.",
    faqs: [
      { q: "Can you design a second-story addition?", a: "Yes, subject to reliable existing information and coordination with the locally required structural and licensed professionals." },
      { q: "Do you measure the existing house?", a: "The scope can begin from a survey or measurements provided by the client or local surveyor. Remote delivery does not replace any field verification required for reliable construction information." },
      { q: "Are the drawings automatically permit-ready?", a: "No. Permit requirements differ by location. The exact documentation, consultant and licensed-professional responsibilities are confirmed for the project before the package is represented for submission." },
      { q: "Can you show the addition in 3D?", a: "Yes. Exterior and interior views can be included so massing, roof, materials and the connection to the existing home can be reviewed before documentation is finalized." },
    ],
    related: ["architecture", "permit-drawing-services", "floor-plan-to-3d-rendering"],
    parentHub: "architecture",
  },
  {
    slug: "house-exterior-design-service",
    kind: "service",
    name: "House Exterior Design",
    primaryKeyword: "house exterior design service",
    title: "House Exterior Design & 3D Facade Rendering | Artimist",
    desc: "Professional house exterior design, facade updates, material studies and photoreal 3D rendering for new homes, renovations and curb-appeal improvements.",
    h1: "House Exterior Design & 3D Facade Rendering",
    tagline: "Resolve the form, openings and materials before changing the building.",
    intro:
      "Exterior design is more than selecting paint. Proportion, roof form, windows, entrances, materials, landscape and lighting need to read as one architectural decision. Artimist develops new-home facades and renovation options in 3D so homeowners and project teams can compare meaningful directions before documentation, purchasing or construction.",
    forWho:
      "Homeowners redesigning an outdated exterior, builders presenting a new-home elevation, architects needing visualization support and developers preparing residential marketing imagery.",
    problems: [
      "The floor plan works but the exterior elevation feels unresolved or generic.",
      "Material and color decisions are being made from disconnected samples instead of a complete view.",
      "A renovation needs to improve curb appeal without losing control of openings, roof and buildability.",
    ],
    included: [
      "New-home exterior design",
      "Facade renovation concepts",
      "Entry and porch design",
      "Window and opening studies",
      "Roof and massing refinement",
      "Material and color options",
      "Landscape context",
      "Photoreal day, dusk or night renders",
    ],
    deliverables: ["Selected exterior design direction", "Photoreal exterior views", "Annotated material direction or drawings where included"],
    inputs: ["Plans and elevations", "Site photographs", "Existing exterior images", "Style references", "Preferred materials and budget priorities"],
    workflow: [
      { h: "Read the existing architecture", p: "We review the plan, elevations, photographs and constraints so the exterior direction responds to the real building instead of covering it with decoration." },
      { h: "Compare focused options", p: "A small number of strong directions test form, openings, materials and entry sequence, with the differences explained clearly." },
      { h: "Resolve and visualize", p: "The selected direction is refined into agreed exterior views and any additional drawing or material information named in the scope." },
    ],
    software: ["3ds Max", "Corona Renderer", "V-Ray", "Revit", "SketchUp", "Photoshop"],
    quality:
      "The image remains connected to the supplied building information. Products and finishes are represented accurately when specified, and conceptual substitutions are not presented as confirmed selections.",
    faqs: [
      { q: "Can you redesign an existing house from photographs?", a: "Photographs are useful, but accurate design normally also needs plans, key dimensions and information about the roof and openings. We identify what is missing before committing to a detailed result." },
      { q: "Can you provide several material options?", a: "Yes. The number of options and review rounds is agreed in advance so comparisons stay meaningful and controlled." },
      { q: "Does this include construction drawings?", a: "Not automatically. Exterior design and rendering can lead into architectural documentation, but the drawing deliverables and local professional requirements must be scoped separately." },
      { q: "Can you match a specific American home style?", a: "Yes. We can work within contemporary, modern farmhouse, craftsman, coastal, traditional and other directions while adapting the references to the actual building rather than copying a stock facade." },
    ],
    related: ["visualization", "floor-plan-to-3d-rendering", "custom-house-design"],
    parentHub: "visualization",
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}

// Small helper for related links: resolve a slug to a display name and href,
// covering hubs, money pages, and the existing /unreal-engine route.
export function resolveLink(slug: string): { name: string; href: string } {
  const page = getLandingPage(slug);
  if (page) return { name: page.name, href: "/" + page.slug };
  if (slug === "unreal-engine") return { name: "Unreal Engine", href: "/unreal-engine" };
  if (slug === "custom-house-design") return { name: "Custom House Design", href: "/custom-house-design" };
  if (slug === "residential-renovation-permit-drawings") return { name: "Residential Renovation & Permit Plans", href: "/residential-renovation-permit-drawings" };
  return { name: slug, href: "/" + slug };
}
