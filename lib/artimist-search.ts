export type ArtimistSearchRoute = {
  title: string;
  path: string;
  category: string;
  reason: string;
};

export type ArtimistSearchResult = {
  answer: string;
  intent: string;
  confidence: "high" | "medium" | "low";
  routes: ArtimistSearchRoute[];
  followUp?: string;
  leadReady: boolean;
};

type KnowledgeEntry = {
  id: string;
  title: string;
  path: string;
  category: string;
  keywords: string[];
  phrases?: string[];
  answer: string;
  followUp?: string;
  priority?: number;
};

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: "custom-house",
    title: "Custom House Design",
    path: "/custom-house-design",
    category: "House & home",
    keywords: ["house", "home", "custom", "design", "plans", "plan", "floorplan", "floor", "layout", "new build", "residential"],
    phrases: ["design my house", "custom house plans", "custom home design", "new home", "house plan"],
    answer: "Yes. Artimist can develop a custom home from your brief, site information, sketches, references or an early plan. Depending on scope, that can include floor-plan development, exterior design, architectural drawings and 3D visualization so you can understand the design before construction.",
    followUp: "Do you already have a site, sketch or existing plan?",
    priority: 9,
  },
  {
    id: "sketch-floor-plan",
    title: "Sketch to Floor Plan",
    path: "/sketch-to-floor-plan-service",
    category: "House & home",
    keywords: ["sketch", "hand", "drawing", "floor", "plan", "floorplan", "redraw", "image", "pdf", "rough", "measurements"],
    phrases: ["turn my sketch into a floor plan", "sketch to floor plan", "redraw floor plan", "hand drawn plan"],
    answer: "Yes. Artimist can turn a hand sketch, marked-up PDF, image or measured information into a clean architectural floor plan. The more reliable the dimensions and existing information are, the more accurately the plan can support later design or documentation.",
    followUp: "Do you have dimensions, a PDF, an image or only a rough sketch?",
    priority: 10,
  },
  {
    id: "plan-modification",
    title: "Plan Changes & Redraws",
    path: "/plan-modification-service",
    category: "House & home",
    keywords: ["modify", "change", "redesign", "layout", "floor", "plan", "room", "bedroom", "bathroom", "kitchen", "circulation", "existing"],
    phrases: ["change my floor plan", "modify house plan", "redesign floor plan", "improve my layout"],
    answer: "Yes. Existing plans can be reviewed and changed to improve room sizes, circulation, privacy, storage, furniture fit and relationships between spaces. Artimist can keep what already works and focus only on the parts that need improvement.",
    followUp: "What is the main problem with the current layout?",
    priority: 9,
  },
  {
    id: "adu",
    title: "ADU Design & Plans",
    path: "/adu-design-plans",
    category: "House & home",
    keywords: ["adu", "accessory", "dwelling", "backyard", "garage", "conversion", "granny", "unit", "detached", "attached"],
    phrases: ["design an adu", "garage to adu", "backyard adu", "accessory dwelling unit"],
    answer: "Yes. Artimist can help develop detached, attached and garage-conversion ADU concepts, including plans, elevations, sections and 3D design support where required. Zoning, setbacks, utilities, parking and permit requirements still need to be checked for the specific property and jurisdiction.",
    followUp: "Is it a detached ADU, attached ADU or garage conversion, and which city is the property in?",
    priority: 10,
  },
  {
    id: "home-addition",
    title: "Home Addition Plans",
    path: "/home-addition-plans",
    category: "House & home",
    keywords: ["addition", "extension", "extend", "second floor", "room", "garage", "home", "house", "existing", "proposed"],
    phrases: ["home addition", "house extension", "add a room", "second floor addition"],
    answer: "Artimist can help plan room additions, extensions, second-floor additions and related existing/proposed drawings. The required permit package depends on the local authority and whether structural or other licensed consultant input is required.",
    followUp: "What are you adding, and do you have drawings of the existing house?",
    priority: 9,
  },
  {
    id: "renovation",
    title: "Renovation & Permit Drawings",
    path: "/residential-renovation-permit-drawings",
    category: "Documentation",
    keywords: ["renovation", "remodel", "permit", "existing", "proposed", "demolition", "drawing", "drawings", "house", "home"],
    phrases: ["renovation drawings", "remodel plans", "permit drawings for renovation", "existing and proposed plans"],
    answer: "For renovations, Artimist can prepare existing, demolition and proposed architectural drawings within the agreed scope. The exact sheets depend on the work and local requirements; structural changes or specialist systems may require separate licensed consultants.",
    followUp: "Is the renovation changing walls, structure, use, or only finishes and layout?",
    priority: 10,
  },
  {
    id: "permit",
    title: "Permit Drawing Services",
    path: "/permit-drawing-services",
    category: "Documentation",
    keywords: ["permit", "approval", "city", "county", "council", "submission", "building department", "drawings", "code"],
    phrases: ["permit drawings", "permit set", "drawing set for permit", "submit to city"],
    answer: "Artimist provides design, drafting and permit-support documentation based on the agreed scope. Submission procedures, code requirements, seals and licensed-professional requirements vary by jurisdiction, so they must be confirmed for the specific project.",
    followUp: "Which city or authority will review the project, and what drawings do you already have?",
    priority: 10,
  },
  {
    id: "stamp",
    title: "Permit & Stamping Boundaries",
    path: "/legal#stamps",
    category: "Client information",
    keywords: ["stamp", "seal", "licensed", "license", "architect of record", "engineer", "certify", "certification", "professional of record"],
    phrases: ["do you stamp", "architect stamp", "engineer stamp", "licensed architect"],
    answer: "Artimist does not provide a regional architectural or engineering stamp or seal. Where a jurisdiction requires certification, the appropriately licensed local architect, engineer or other professional must independently review and provide the required professional responsibility.",
    followUp: "If you tell me the project location, I can point you to the relevant Artimist permit-support information.",
    priority: 20,
  },
  {
    id: "permit-guarantee",
    title: "Permit Drawing Services",
    path: "/permit-drawing-services",
    category: "Documentation",
    keywords: ["guarantee", "guaranteed", "approval", "approved", "permit", "promise"],
    phrases: ["guarantee permit approval", "will my permit be approved"],
    answer: "No responsible design or drafting provider can guarantee permit approval. Approval is controlled by the reviewing authority and depends on local regulations, property conditions, consultant requirements and the authority's review. Artimist can prepare and revise documentation within its agreed scope.",
    priority: 18,
  },
  {
    id: "interior",
    title: "3D Interior Design",
    path: "/3d-interior-design-service",
    category: "Visualization",
    keywords: ["interior", "room", "kitchen", "bedroom", "living", "furniture", "materials", "colors", "3d", "renovation", "design"],
    phrases: ["3d interior design", "design my room", "see my interior", "interior visualization"],
    answer: "Artimist can develop interior layouts, materials, furniture, lighting and spatial atmosphere, then show the proposed design in realistic 3D views before renovation, purchasing or construction begins. Remote interior work can start from plans, measurements, photographs and references.",
    followUp: "Which room or rooms are you designing, and do you have measurements or a floor plan?",
    priority: 9,
  },
  {
    id: "floor-to-3d",
    title: "Floor Plan to 3D Rendering",
    path: "/floor-plan-to-3d-rendering",
    category: "Visualization",
    keywords: ["floor", "plan", "3d", "render", "rendering", "model", "visualize", "visualise", "pdf", "dwg"],
    phrases: ["floor plan to 3d", "turn floor plan into 3d", "3d from floor plan"],
    answer: "Yes. PDF, CAD or architectural floor plans can be developed into a 3D model and then into interior, exterior or material-study views depending on the information available and the required output.",
    followUp: "Do you need the 3D model only, realistic images, or both?",
    priority: 10,
  },
  {
    id: "rendering",
    title: "Architectural Rendering",
    path: "/services/architectural-rendering",
    category: "Visualization",
    keywords: ["render", "rendering", "cgi", "image", "photoreal", "photorealistic", "exterior", "interior", "aerial", "marketing", "visual"],
    phrases: ["architectural rendering", "3d rendering", "photorealistic render", "exterior render"],
    answer: "Artimist produces architectural renderings for design review, presentation and marketing, including exterior, interior, aerial and detail views. DWG, RVT, SketchUp, PDFs and other source material can be reviewed as a starting point.",
    followUp: "How many views do you need, and what model or drawings do you already have?",
    priority: 9,
  },
  {
    id: "visualization",
    title: "Architectural Visualization",
    path: "/visualization",
    category: "Visualization",
    keywords: ["visualization", "visualisation", "presentation", "architecture", "rendering", "animation", "developer", "real estate", "competition"],
    phrases: ["architectural visualization", "visualization studio", "visualise architecture"],
    answer: "Architectural visualization is broader than a single rendering. Artimist can translate design information into still images, diagrams, animation, walkthroughs and real-time experiences depending on how the project needs to be communicated.",
    followUp: "Is this for design approval, client presentation, marketing or competition work?",
    priority: 8,
  },
  {
    id: "animation",
    title: "Architectural Animation",
    path: "/services/architectural-animation",
    category: "Visualization",
    keywords: ["animation", "video", "walkthrough", "flythrough", "cinematic", "camera", "motion", "film"],
    phrases: ["architectural animation", "3d walkthrough", "flythrough", "architecture video"],
    answer: "Artimist produces cinematic architectural animation, walkthroughs and flythroughs. Model readiness, shot list, duration, aspect ratio and delivery quality are agreed before production so the animation scope stays controlled.",
    followUp: "What duration and platform are you targeting, and is the model already available?",
    priority: 9,
  },
  {
    id: "unreal",
    title: "Unreal Engine & Real-Time",
    path: "/unreal-engine",
    category: "Visualization",
    keywords: ["unreal", "engine", "realtime", "real-time", "interactive", "vr", "virtual", "experience", "walkthrough"],
    phrases: ["unreal engine", "real time visualization", "interactive walkthrough"],
    answer: "Artimist can develop real-time architectural environments when a project benefits from interactive movement, live material exploration or immersive presentation. The studio first checks whether Unreal Engine is the right delivery method rather than using it where conventional rendering would be more efficient.",
    followUp: "Do you need a guided experience, free navigation, material switching or a recorded cinematic output?",
    priority: 9,
  },
  {
    id: "bim",
    title: "BIM & Drafting",
    path: "/bim-drafting",
    category: "BIM & drafting",
    keywords: ["bim", "modeling", "modelling", "coordination", "lod", "revit", "drafting", "documentation", "scan", "point cloud"],
    phrases: ["bim services", "bim drafting", "architectural bim", "bim outsourcing"],
    answer: "Artimist provides architectural BIM modeling, Revit drafting, model development, drawing production, CAD-to-Revit, PDF-to-Revit, Scan-to-BIM support and coordinated documentation. Scope, LOD and client standards are defined before production.",
    followUp: "What is the required deliverable: model, sheets, coordination support, conversion or ongoing production capacity?",
    priority: 10,
  },
  {
    id: "revit",
    title: "Revit Drafting Services",
    path: "/revit-drafting-services",
    category: "BIM & drafting",
    keywords: ["revit", "rvt", "family", "families", "sheets", "schedule", "template", "workset", "cad", "pdf", "model"],
    phrases: ["revit drafting", "cad to revit", "pdf to revit", "revit outsourcing"],
    answer: "Artimist provides Revit drafting and modeling support, including CAD/PDF-to-Revit workflows, sheets, schedules, families and production inside client templates where agreed. The goal is a usable model and documentation set, not just geometry that looks correct in screenshots.",
    followUp: "Which Revit version, LOD and client template or BIM standard should the team follow?",
    priority: 11,
  },
  {
    id: "scan-bim",
    title: "BIM Modeling Services",
    path: "/bim-modeling-services",
    category: "BIM & drafting",
    keywords: ["scan", "point", "cloud", "laser", "bim", "asbuilt", "as-built", "existing", "survey"],
    phrases: ["scan to bim", "point cloud to revit", "point cloud to bim"],
    answer: "Point-cloud or scan data can be translated into organized BIM geometry based on the agreed elements, accuracy and level of detail. Scan-to-BIM scopes vary significantly, so the expected model content and tolerances should be defined before work starts.",
    followUp: "What scan format and target LOD or accuracy do you need?",
    priority: 11,
  },
  {
    id: "drafting",
    title: "Architectural Drafting Services",
    path: "/architectural-drafting-services",
    category: "BIM & drafting",
    keywords: ["draft", "drafting", "cad", "autocad", "dwg", "plans", "elevations", "sections", "redraw", "production"],
    phrases: ["architectural drafting", "cad drafting", "outsourced drafting", "drawing production"],
    answer: "Artimist provides architectural drafting and drawing-production support including plans, elevations, sections, CAD production, redraws and documentation support. Professional teams can provide their own standards, title blocks and drawing conventions.",
    followUp: "Are you looking for a one-off drawing package or ongoing drafting capacity?",
    priority: 9,
  },
  {
    id: "as-built",
    title: "As-Built Drawings",
    path: "/as-built-drawings",
    category: "BIM & drafting",
    keywords: ["asbuilt", "as-built", "existing", "record", "survey", "measured", "drawings", "site"],
    phrases: ["as built drawings", "existing condition drawings", "record drawings"],
    answer: "Artimist can produce as-built or existing-condition drawings from reliable measured information, surveys, scans or source documents. Accuracy depends on the quality of the field information supplied, so unverified geometry should not be treated as measured fact.",
    followUp: "Do you have a survey, scan, measured sketch or existing drawings?",
    priority: 10,
  },
  {
    id: "construction-docs",
    title: "Construction Documentation",
    path: "/construction-documentation-services",
    category: "Documentation",
    keywords: ["construction", "documentation", "details", "working drawings", "sheets", "drawing set", "cd", "documents"],
    phrases: ["construction documents", "construction drawings", "working drawings"],
    answer: "Artimist can support architectural construction documentation within the agreed scope. Compared with a basic permit set, construction documentation typically requires more detail, coordination and information for how the design is to be built.",
    followUp: "What stage is the design at, and which sheets or details are required?",
    priority: 9,
  },
  {
    id: "pricing",
    title: "Start a Project",
    path: "/contact",
    category: "Working with Artimist",
    keywords: ["price", "pricing", "cost", "fee", "fees", "rate", "rates", "budget", "quote", "quotation", "how much", "deposit", "payment"],
    phrases: ["how much does it cost", "what do you charge", "give me a quote", "project price"],
    answer: "Artimist prices work from the actual scope rather than publishing a single generic rate. Project size, source-file quality, deliverables, complexity, revisions and deadline all affect the fee. Send the project as it stands today and the studio can define the right commercial structure.",
    followUp: "What service do you need, what do you already have, and when do you need it?",
    priority: 14,
  },
  {
    id: "revisions",
    title: "Process",
    path: "/process",
    category: "Working with Artimist",
    keywords: ["revision", "revisions", "feedback", "changes", "round", "rounds", "edit", "edits", "scope"],
    phrases: ["how many revisions", "revision rounds", "change the design"],
    answer: "Revision allowances are defined in the project agreement. Revisions apply to the agreed scope; major new directions, redesigns or additional deliverables can be treated as additional scope so responsibilities, cost and schedule stay clear.",
    priority: 11,
  },
  {
    id: "nda",
    title: "NDA & Confidentiality",
    path: "/legal#confidentiality",
    category: "Working with Artimist",
    keywords: ["nda", "confidential", "confidentiality", "private", "privacy", "white label", "white-label", "secret", "sensitive"],
    phrases: ["sign an nda", "keep project private", "white label"],
    answer: "Yes. NDA-based, confidential and white-label workflows are available where appropriate. For sensitive projects, request the confidentiality arrangement before sharing non-public drawings, links, models or commercial information.",
    priority: 12,
  },
  {
    id: "files",
    title: "Frequently Asked Questions",
    path: "/faqs#working",
    category: "Working with Artimist",
    keywords: ["file", "files", "format", "dwg", "rvt", "pdf", "skp", "sketchup", "image", "point cloud", "source"],
    phrases: ["what files", "file formats", "can you open"],
    answer: "Common inputs include PDF, DWG, RVT, images, sketches, presentation files, point-cloud data and 3D model formats. File usefulness depends on the actual content, organization and version, so source files are reviewed before production assumptions are made.",
    priority: 8,
  },
  {
    id: "usa",
    title: "United States",
    path: "/usa",
    category: "International",
    keywords: ["usa", "us", "america", "american", "united states", "feet", "inches", "imperial", "state", "city"],
    phrases: ["work in the usa", "united states projects", "american projects"],
    answer: "Yes. Artimist works remotely with U.S. homeowners and professional teams and can use imperial units and U.S. drawing conventions. Artimist does not represent itself as a licensed local U.S. architecture office; permit, seal and code requirements remain jurisdiction-specific.",
    followUp: "Which state and city is the project in?",
    priority: 10,
  },
  {
    id: "international",
    title: "International Delivery",
    path: "/international",
    category: "International",
    keywords: ["international", "remote", "worldwide", "country", "canada", "uk", "united kingdom", "sweden", "overseas", "timezone"],
    phrases: ["work internationally", "remote studio", "outside pakistan"],
    answer: "Artimist is structured for remote international delivery. Project standards, units, file formats, meeting times and local professional requirements are clarified at the beginning so the workflow fits the project location.",
    followUp: "Which country is the project in?",
    priority: 8,
  },
  {
    id: "team",
    title: "Studio Team",
    path: "/team",
    category: "Studio",
    keywords: ["team", "people", "staff", "founder", "who", "studio", "architects", "designers"],
    phrases: ["who is your team", "meet the team", "who works at artimist"],
    answer: "Artimist is a multidisciplinary studio with named team members across architecture, design, BIM, visualization and creative production. You can review the team page and project evidence before deciding whether the studio is the right fit.",
    priority: 8,
  },
  {
    id: "proof",
    title: "Proof & Trust",
    path: "/proof",
    category: "Studio",
    keywords: ["proof", "trust", "real", "portfolio", "projects", "clients", "evidence", "reviews", "legit", "legitimate"],
    phrases: ["are you real", "show me your work", "project proof", "client reviews"],
    answer: "You can verify Artimist through project evidence, case studies, the visual archive, named team members, client terms and direct studio contact. The proof page connects those trust signals in one place.",
    priority: 8,
  },
  {
    id: "start",
    title: "Start a Project",
    path: "/contact",
    category: "Working with Artimist",
    keywords: ["start", "hire", "project", "brief", "contact", "quote", "urgent", "deadline", "ready", "need", "help", "begin"],
    phrases: ["start a project", "i need help", "i want to hire", "get a quote"],
    answer: "Send the project as it stands today: a finished brief, rough idea, drawings, model, screenshots or a technical problem. Artimist can review what is usable, identify missing information and define the next practical step before production begins.",
    followUp: "What are you trying to deliver, where is the project, and what deadline are you working toward?",
    priority: 5,
  },
];

const STOP = new Set(["the", "and", "for", "with", "from", "into", "that", "this", "you", "your", "our", "are", "can", "could", "would", "want", "need", "have", "has", "how", "what", "where", "when", "who", "why", "please", "about", "help", "artimist"]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9+#.\-\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string) {
  return normalize(value).split(" ").filter((token) => token.length > 1 && !STOP.has(token));
}

function scoreEntry(query: string, entry: KnowledgeEntry) {
  const q = normalize(query);
  const qTokens = tokens(query);
  const keywords = entry.keywords.map(normalize);
  let score = entry.priority || 0;

  for (const phrase of entry.phrases || []) {
    const p = normalize(phrase);
    if (q === p) score += 40;
    else if (q.includes(p)) score += 25;
    else {
      const phraseTokens = tokens(p);
      const overlap = phraseTokens.filter((token) => qTokens.includes(token)).length;
      if (overlap >= Math.max(2, phraseTokens.length - 1)) score += 12;
    }
  }

  for (const keyword of keywords) {
    if (q === keyword) score += 18;
    else if (q.includes(keyword)) score += keyword.includes(" ") ? 12 : 7;
  }

  const keywordTokens = new Set(keywords.flatMap(tokens));
  for (const token of qTokens) {
    if (keywordTokens.has(token)) score += 5;
    else {
      for (const candidate of keywordTokens) {
        if (token.length >= 5 && candidate.length >= 5 && (candidate.startsWith(token) || token.startsWith(candidate))) {
          score += 2;
          break;
        }
      }
    }
  }

  return score;
}

function leadReady(query: string) {
  const q = normalize(query);
  const strong = ["quote", "quotation", "hire", "start project", "urgent", "deadline", "ready to start", "need someone", "need help", "can you do my", "i have a project"];
  return strong.some((phrase) => q.includes(phrase));
}

export function searchArtimist(query: string): ArtimistSearchResult {
  const clean = query.trim().slice(0, 500);
  if (!clean) {
    return {
      answer: "Hello, I’m Artimist. Tell me what you are trying to design, draw, visualize or deliver, and I’ll point you to the most relevant part of the studio.",
      intent: "welcome",
      confidence: "low",
      routes: [
        { title: "Frequently Asked Questions", path: "/faqs", category: "Questions", reason: "Browse practical answers by topic." },
        { title: "Services", path: "/services", category: "Studio", reason: "See the full service structure." },
      ],
      followUp: "For example: ‘turn my sketch into a floor plan’, ‘I need Revit drafting’, or ‘can you design an ADU?’",
      leadReady: false,
    };
  }

  const ranked = KNOWLEDGE
    .map((entry) => ({ entry, score: scoreEntry(clean, entry) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1];
  const confidence: ArtimistSearchResult["confidence"] = top.score >= 35 ? "high" : top.score >= 18 ? "medium" : "low";

  if (confidence === "low") {
    return {
      answer: "I can help with Artimist’s architecture, home design, permit-support drawings, interiors, BIM, Revit, drafting, rendering, animation and real-time work, but I don’t want to guess what you mean. Give me one more detail about the project or the deliverable you need.",
      intent: "clarify",
      confidence,
      routes: [
        { title: "Frequently Asked Questions", path: "/faqs", category: "Questions", reason: "Scan common project questions." },
        { title: "Services", path: "/services", category: "Studio", reason: "Browse Artimist services." },
        { title: "Start a Project", path: "/contact", category: "Studio", reason: "Send the real project if it needs human review." },
      ],
      followUp: "What are you trying to create, change, document or visualize?",
      leadReady: leadReady(clean),
    };
  }

  const selected = ranked.filter((item) => item.score >= Math.max(14, top.score * 0.44)).slice(0, 3);
  const routes: ArtimistSearchRoute[] = selected.map(({ entry }) => ({
    title: entry.title,
    path: entry.path,
    category: entry.category,
    reason: entry.id === top.entry.id ? "Best match for your question." : "Also relevant to this project." ,
  }));

  if (leadReady(clean) && !routes.some((route) => route.path === "/contact")) {
    routes.push({ title: "Start a Project", path: "/contact", category: "Working with Artimist", reason: "Send files, location and deadline for a human project review." });
  }

  const combined = second && second.score >= top.score * 0.72 && second.entry.id !== top.entry.id && !["pricing", "start", "files"].includes(second.entry.id)
    ? `${top.entry.answer} ${second.entry.answer}`
    : top.entry.answer;

  return {
    answer: combined,
    intent: top.entry.id,
    confidence,
    routes: routes.slice(0, 4),
    followUp: top.entry.followUp,
    leadReady: leadReady(clean),
  };
}

export const ARTIMIST_SEARCH_EXAMPLES = [
  "Can you turn my sketch into a floor plan?",
  "I need Revit drafting for an architecture project",
  "Can you design a garage conversion ADU?",
  "How much does an architectural rendering cost?",
  "Do you stamp permit drawings in the USA?",
];
