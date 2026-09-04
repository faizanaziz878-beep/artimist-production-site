export type ServiceVisualFamily = "architecture" | "bim" | "visualization";

export type ServiceShot = {
  src: string;
  alt: string;
  caption: string;
};

export type ServiceVisualPlan = {
  family: ServiceVisualFamily;
  hero: ServiceShot;
  evidence: ServiceShot[];
  process: ServiceShot[];
  visualCaption: string;
  caseStudies: Array<[string, string]>;
};

const shot = (src: string, alt: string, caption: string): ServiceShot => ({ src, alt, caption: src.includes("/generated-architecture/") ? `${caption} · Concept study` : caption });

// These assignments are intentionally exact. Service pages must never fall back
// to a category rotation or slug-derived offset: the picture beside a sentence
// should demonstrate that sentence's subject and stage of work.
export const SERVICE_VISUALS: Record<string, ServiceVisualPlan> = {
  architecture: {
    family: "architecture",
    hero: shot("/media/atlas/atlas-11.webp", "Contemporary architecture and landscape designed by Artimist Productions", "Architecture / Place and arrival"),
    evidence: [
      shot("/media/walkthrough/music/campus-overview.webp", "Cultural campus architecture masterplan by Artimist Productions", "Campus / Masterplan"),
      shot("/media/walkthrough/auditorium/masterplan.webp", "Connected learning auditorium masterplan and site strategy", "Planning / Site relationships"),
      shot("/img/rvpark.webp", "RV park architecture and site planning by Artimist Productions", "Site planning / Hospitality"),
      shot("/img/resext04.webp", "Resolved contemporary house exterior by Artimist Productions", "Residential / Exterior"),
    ],
    process: [
      shot("/media/walkthrough/auditorium/brief.webp", "Architectural project brief and early spatial analysis", "01 / Brief"),
      shot("/media/walkthrough/auditorium/plans.webp", "Architectural plans developed from the project brief", "02 / Draw"),
      shot("/media/walkthrough/music/campus-threshold.webp", "Final architectural threshold visualization", "03 / Resolve"),
    ],
    visualCaption: "Brief / plan / space",
    caseStudies: [["RV park design and site planning", "/case-studies/rv-park-design"], ["Connected learning auditorium", "/case-studies/connected-learning-auditorium"]],
  },
  "bim-drafting": {
    family: "bim",
    hero: shot("/img/revit02.webp", "Coordinated BIM building-services model by Artimist Productions", "BIM / Multidiscipline coordination"),
    evidence: [
      shot("/img/revit01.webp", "Revit model, details and technical views", "Model / Technical overview"),
      shot("/img/cad04.webp", "CAD drawing production workspace", "Draft / Author"),
      shot("/img/revit02.webp", "Coordinated architectural and building-services BIM model", "Coordinate / Systems"),
      shot("/img/permit08.webp", "Electrical power plans and detail coordination workflow", "Electrical / Coordination"),
    ],
    process: [
      shot("/img/cad02.webp", "Existing CAD information prepared for production", "01 / Review"),
      shot("/img/revit04.webp", "Revit plan and model developed together", "02 / Model"),
      shot("/img/permit07.webp", "Coordinated drawing package prepared for handover", "03 / Deliver"),
    ],
    visualCaption: "Model / coordinate / document",
    caseStudies: [["U.S. permit documentation", "/case-studies/us-permit-documentation"], ["Permit application drawing packages", "/case-studies/permit-application-packages"]],
  },
  visualization: {
    family: "visualization",
    hero: shot("/media/atlas/atlas-07.webp", "Architectural visualization by Artimist Productions", "Visualization / Spatial storytelling"),
    evidence: [
      shot("/media/atlas/atlas-06.webp", "Waterfront cultural architecture visualization at sunset", "Architecture / Atmosphere"),
      shot("/img/resext03.webp", "Photoreal residential exterior visualization", "Exterior / Material and light"),
      shot("/img/homeint03.webp", "Photoreal residential interior visualization", "Interior / Mood and detail"),
      shot("/media/walkthrough/residential/arrival.webp", "Residential arrival view for design communication", "Sequence / Arrival"),
    ],
    process: [
      shot("/img/max04.webp", "Interior wireframe and three-dimensional scene development", "01 / Build"),
      shot("/img/max02.webp", "Exterior rendering scene in production", "02 / Light"),
      shot("/img/ue04.webp", "Real-time architectural scene review", "03 / Experience"),
    ],
    visualCaption: "Model / light / communicate",
    caseStudies: [["Residential visualization", "/case-studies/residential-visualization"], ["Whole-home interior design and visualization", "/case-studies/home-interior-design"]],
  },
  "architectural-drafting-services": {
    family: "bim",
    hero: shot("/img/cad04.webp", "Residential CAD floor plan with dimensions and drawing layers", "CAD drafting / Authoring"),
    evidence: [
      shot("/img/cad01.webp", "Clean architectural floor plan drafted by Artimist Productions", "Plan / Linework"),
      shot("/img/cad02.webp", "Architectural drawing developed in CAD", "CAD / Production"),
      shot("/img/cad03.webp", "Detailed residential floor plan", "Plan / Coordination"),
      shot("/img/permit01.webp", "Commercial floor plans, schedules and drawing sheets", "Sheets / Commercial documentation"),
    ],
    process: [
      shot("/media/generated-architecture/artimist-architecture-087.webp", "Existing-condition townhouse floor plans", "01 / Source reference"),
      shot("/img/cad04.webp", "Architectural drawing authored in CAD", "02 / Draft"),
      shot("/img/permit03.webp", "Detailed construction drawing sheet", "03 / Check"),
    ],
    visualCaption: "Reference / linework / sheet",
    caseStudies: [["U.S. permit documentation", "/case-studies/us-permit-documentation"], ["Permit application drawing packages", "/case-studies/permit-application-packages"]],
  },
  "revit-drafting-services": {
    family: "bim",
    hero: shot("/img/revit04.webp", "Revit plan and building model authored together", "Revit / Native authoring"),
    evidence: [
      shot("/img/revit04.webp", "Revit workspace with coordinated plan and model", "Author / Native model"),
      shot("/img/revit01.webp", "Revit technical overview with building model and details", "Resolve / Details"),
      shot("/img/revit02.webp", "Revit building-services coordination model", "Coordinate / Systems"),
      shot("/img/revit03.webp", "Revit model views prepared for project review", "Review / Model views"),
    ],
    process: [
      shot("/img/cad03.webp", "Existing plan information for Revit conversion", "01 / Review source"),
      shot("/img/revit04.webp", "Native Revit authoring workflow", "02 / Build model"),
      shot("/img/revit02.webp", "Coordinated Revit model ready for output", "03 / Coordinate"),
    ],
    visualCaption: "Author / coordinate / issue",
    caseStudies: [["U.S. permit documentation", "/case-studies/us-permit-documentation"], ["Permit application drawing packages", "/case-studies/permit-application-packages"]],
  },
  "bim-modeling-services": {
    family: "bim",
    hero: shot("/img/revit02.webp", "Federated BIM model showing coordinated building systems", "BIM / Coordinated systems"),
    evidence: [
      shot("/img/revit02.webp", "Architectural and building-services BIM coordination", "Coordination / Systems"),
      shot("/img/revit03.webp", "Three-dimensional BIM model review views", "Model / Review"),
      shot("/img/rhino01.webp", "Three-dimensional architectural model development", "Geometry / Build"),
      shot("/img/rhino03.webp", "Architectural model and technical geometry", "Model / Resolve"),
    ],
    process: [
      shot("/img/rhino02.webp", "Architectural source geometry prepared for modeling", "01 / Source"),
      shot("/img/revit01.webp", "BIM model developed with technical information", "02 / Develop"),
      shot("/img/revit02.webp", "Coordinated BIM systems model", "03 / Coordinate"),
    ],
    visualCaption: "Geometry / information / coordination",
    caseStudies: [["U.S. permit documentation", "/case-studies/us-permit-documentation"], ["Residential exterior design and documentation", "/case-studies/residential-exterior-design"]],
  },
  "permit-drawing-services": {
    family: "architecture",
    hero: shot("/img/permit07.webp", "Drawing package overview with site, building, fire and detail sheets", "Permit support / Drawing package"),
    evidence: [
      shot("/img/permit01.webp", "Permit application drawings prepared for project review", "Application / Sheets"),
      shot("/img/permit03.webp", "Commercial floor plan, code information and schedules", "Review / Sheet organization"),
      shot("/img/permit06.webp", "Permit documentation workflow and package structure", "Package / Coordination"),
      shot("/img/permit07.webp", "Complete permit-support drawing set", "Issue / Handover"),
    ],
    process: [
      shot("/media/walkthrough/permit/workflow.webp", "Permit drawing workflow from source information", "01 / Review"),
      shot("/media/walkthrough/permit/sheets.webp", "Permit application sheets in development", "02 / Prepare"),
      shot("/media/walkthrough/permit/package.webp", "Coordinated permit-support package", "03 / Package"),
    ],
    visualCaption: "Review / draw / package",
    caseStudies: [["Permit application drawing packages", "/case-studies/permit-application-packages"], ["U.S. permit documentation", "/case-studies/us-permit-documentation"]],
  },
  "construction-documentation-services": {
    family: "bim",
    hero: shot("/img/permit08.webp", "Electrical power plans, details and drawing coordination workflow", "Construction documentation / Coordinated sheet"),
    evidence: [
      shot("/img/permit08.webp", "Electrical plans and details showing the documentation workflow", "Electrical / Sheet coordination"),
      shot("/media/generated-architecture/artimist-architecture-002.webp", "Accessibility details showing threshold, counter, toilet and grab-rail interfaces", "Detail / Accessibility"),
      shot("/img/permit03.webp", "Technical construction drawing sheet", "Drawing / Information"),
      shot("/img/permit07.webp", "Coordinated construction documentation set", "Package / Handover"),
    ],
    process: [
      shot("/img/revit04.webp", "Coordinated plan and model used for documentation", "01 / Coordinate"),
      shot("/img/permit03.webp", "Technical details developed for the package", "02 / Detail"),
      shot("/img/permit07.webp", "Checked drawing package prepared for delivery", "03 / Issue"),
    ],
    visualCaption: "Coordinate / detail / issue",
    caseStudies: [["U.S. permit documentation", "/case-studies/us-permit-documentation"], ["Permit application drawing packages", "/case-studies/permit-application-packages"]],
  },
  "architectural-visualization-services": {
    family: "visualization",
    hero: shot("/media/walkthrough/residential/twilight.webp", "Photoreal residential twilight visualization", "Architectural visualization / Final image"),
    evidence: [
      shot("/media/walkthrough/residential/arrival.webp", "Residential arrival architectural rendering", "Exterior / Arrival"),
      shot("/media/walkthrough/residential/living.webp", "Residential living space architectural rendering", "Interior / Living"),
      shot("/media/walkthrough/residential/twilight.webp", "Residential twilight rendering", "Light / Twilight"),
      shot("/media/atlas/atlas-06.webp", "Waterfront cultural architecture visualization", "Context / Landmark"),
    ],
    process: [
      shot("/img/max03.webp", "Architectural scene and drawing reference in production", "01 / Build"),
      shot("/img/max02.webp", "Exterior lighting and material scene in production", "02 / Develop"),
      shot("/img/resext03.webp", "Final photoreal residential exterior visualization", "03 / Deliver"),
    ],
    visualCaption: "Compose / light / resolve",
    caseStudies: [["Residential visualization", "/case-studies/residential-visualization"], ["Residential exterior design and visualization", "/case-studies/residential-exterior-design"]],
  },
  "sketch-to-floor-plan-service": {
    family: "architecture",
    hero: shot("/media/generated-architecture/artimist-architecture-043.webp", "Pencil-style townhouse floor plan study", "Sketch to plan / Design intent"),
    evidence: [
      shot("/media/generated-architecture/artimist-architecture-043.webp", "Pencil-style ground and upper-floor townhouse plan study", "Source / Sketch intent"),
      shot("/img/cad01.webp", "Clean floor plan drafted from source information", "Plan / Redraw"),
      shot("/img/cad03.webp", "Resolved residential floor plan", "Plan / Resolve"),
      shot("/media/generated-architecture/artimist-architecture-053.webp", "Existing and proposed apartment floor-plan comparison", "Compare / Confirm"),
    ],
    process: [
      shot("/media/generated-architecture/artimist-architecture-043.webp", "Townhouse sketch plan illustrating a source reference", "01 / Source"),
      shot("/img/cad01.webp", "Draft floor plan created from the source", "02 / Draw"),
      shot("/img/cad03.webp", "Checked floor plan ready for handover", "03 / Confirm"),
    ],
    visualCaption: "Sketch / measure / floor plan",
    caseStudies: [["Permit application drawing packages", "/case-studies/permit-application-packages"], ["U.S. permit documentation", "/case-studies/us-permit-documentation"]],
  },
  "floor-plan-to-3d-rendering": {
    family: "visualization",
    hero: shot("/img/homeint03.webp", "Photoreal room visualization developed from a floor plan", "Floor plan to 3D / Final view"),
    evidence: [
      shot("/img/cad01.webp", "Architectural floor plan used as a three-dimensional modeling source", "Source / Floor plan"),
      shot("/img/max04.webp", "Three-dimensional interior wireframe developed from the plan", "Model / Volume"),
      shot("/img/homeint03.webp", "Final photoreal interior rendering", "Render / Atmosphere"),
      shot("/img/resid01.webp", "Residential exterior and interior visualization sequence", "Design / Whole home"),
    ],
    process: [
      shot("/img/cad01.webp", "Floor plan reviewed before modeling", "01 / Read plan"),
      shot("/img/max04.webp", "Interior geometry built from the plan", "02 / Build 3D"),
      shot("/img/homeint03.webp", "Materials, lighting and final rendering", "03 / Visualize"),
    ],
    visualCaption: "Plan / model / final image",
    caseStudies: [["Whole-home interior design and visualization", "/case-studies/home-interior-design"], ["Residential visualization", "/case-studies/residential-visualization"]],
  },
  "home-addition-plans": {
    family: "architecture",
    hero: shot("/img/services/plan-renovation-premium-2026.jpg", "Residential renovation and addition design", "Home addition / Resolved design"),
    evidence: [
      shot("/media/generated-architecture/artimist-architecture-021.webp", "Coastal cottage exterior illustrating existing-building character", "Source / Existing home"),
      shot("/media/generated-architecture/artimist-architecture-088.webp", "Townhouse section showing the junction with a rear extension", "Drawing / Extension section"),
      shot("/media/generated-architecture/artimist-architecture-019.webp", "Rear extension design developed for a residential property", "Design / Extension"),
      shot("/img/services/plan-renovation-premium-2026.jpg", "Resolved residential addition and renovation", "Outcome / New space"),
    ],
    process: [
      shot("/media/generated-architecture/artimist-architecture-021.webp", "Coastal cottage exterior reference study", "01 / Existing"),
      shot("/media/generated-architecture/artimist-architecture-088.webp", "Townhouse and rear extension section study", "02 / Plan the junction"),
      shot("/img/services/plan-renovation-premium-2026.jpg", "Resolved addition design", "03 / Visualize"),
    ],
    visualCaption: "Existing / addition plan / resolved home",
    caseStudies: [["Permit application drawing packages", "/case-studies/permit-application-packages"], ["Residential exterior design and visualization", "/case-studies/residential-exterior-design"]],
  },
  "house-exterior-design-service": {
    family: "visualization",
    hero: shot("/img/resext03.webp", "Contemporary house exterior design among mature trees", "House exterior / Final facade"),
    evidence: [
      shot("/img/resext01.webp", "Residential facade and roof-form study in winter", "Facade / Form"),
      shot("/img/resext02.webp", "House exterior design integrated with its site", "Site / Landscape relationship"),
      shot("/img/resext03.webp", "Contemporary facade material and glazing design", "Materials / Openings"),
      shot("/img/resext04.webp", "Resolved front elevation and approach", "Elevation / Arrival"),
    ],
    process: [
      shot("/img/resext02.webp", "House facade, roof form and landscape relationship", "01 / Read the site"),
      shot("/img/rhino02.webp", "Three-dimensional house massing and facade model", "02 / Test form"),
      shot("/img/resext04.webp", "Final house exterior material and arrival visualization", "03 / Resolve facade"),
    ],
    visualCaption: "Elevation / material / site",
    caseStudies: [["Residential exterior design and visualization", "/case-studies/residential-exterior-design"], ["Residential visualization", "/case-studies/residential-visualization"]],
  },
};

export function serviceVisuals(slug: string): ServiceVisualPlan {
  const plan = SERVICE_VISUALS[slug];
  if (!plan) throw new Error(`Missing curated visual mapping for ${slug}`);
  return plan;
}
