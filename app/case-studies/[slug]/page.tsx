import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "../../case-study-page";

const BASE = "https://www.artimistproductions.com";

type Case = {
  title: string; description: string; eyebrow: string; region: string;
  hero: { src: string; alt: string; caption: string };
  services: string[]; brief: string; approach: string[]; deliverables: string[];
  gallery: { src: string; alt: string; caption: string }[];
  demonstrates: string; related: { href: string; label: string }[]; note?: string;
};

const cases: Record<string, Case> = {
  "bowl-stroke": {
    title: "Bowl Stroke Hospitality Design & Visualization",
    description: "Hospitality architecture, interior design, 3D visualization and animation case study developed across exterior, dining, bar and private-room environments.",
    eyebrow: "Hospitality / architecture / interior / visualization", region: "International",
    hero: { src: "/media/projects/bowl-stroke.webp", alt: "Bowl Stroke hospitality architecture and exterior visualization", caption: "Hospitality design and visualization / Artimist Productions" },
    services: ["Architecture", "Interior Design", "3D Visualization", "Animation"],
    brief: "Bowl Stroke was developed as a connected hospitality experience rather than a set of disconnected rooms. The project needed exterior presence, dining atmosphere, bar character and private-room environments to feel like parts of the same night-time destination.",
    approach: ["Treat arrival, exterior identity and interior atmosphere as one visual sequence.", "Use material warmth, lighting and spatial framing to keep the dining, bar and private areas related without making them identical.", "Develop still imagery and motion together so the project can be understood both as architecture and as a cinematic experience."],
    deliverables: ["Architectural design development", "Interior design direction", "Exterior visualization", "Interior visualization", "Hospitality animation", "Presentation imagery"],
    gallery: [{ src: "/media/projects/bowl-stroke-02.webp", alt: "Bowl Stroke hospitality interior visualization", caption: "Interior atmosphere study" }, { src: "/media/projects/bowl-stroke-03.webp", alt: "Bowl Stroke bar and hospitality visualization", caption: "Hospitality material and lighting study" }],
    demonstrates: "The project shows how Artimist can combine architecture, interiors, rendering and motion into one presentation language instead of treating visualization as a separate final step.",
    related: [{ href: "/architecture", label: "Architecture & Interiors" }, { href: "/architectural-visualization-services", label: "Architectural Visualization" }, { href: "/services/architectural-animation", label: "Architectural Animation" }, { href: "/international", label: "International Studio" }]
  },
  "harmonic-horizons": {
    title: "Harmonic Horizons Cultural Campus",
    description: "Architecture, master planning and visualization case study for a nature-integrated cultural campus organized around performance, learning, accommodation and public life.",
    eyebrow: "Cultural architecture / master planning / research", region: "Lakeside cultural district",
    hero: { src: "/media/projects/music-campus.webp", alt: "Harmonic Horizons cultural campus architecture visualization", caption: "Cultural campus master planning study / Artimist Productions" },
    services: ["Architecture", "Master Planning", "Research", "Visualization"],
    brief: "The project explores how a cultural campus can bring performance, learning, accommodation and public activity together while responding to a strong lakeside landscape setting. Acoustic separation, view corridors and movement between programs were central design concerns.",
    approach: ["Organize the campus around program relationships rather than treating each building as an isolated object.", "Use view corridors, landscape sequence and acoustic separation to shape the master plan.", "Translate the sound-to-form research idea into architectural and visual studies that can be discussed at both campus and building scale."],
    deliverables: ["Master-planning concept", "Architectural design studies", "Program and circulation strategy", "Research-led form development", "3D visualization", "Presentation imagery"],
    gallery: [{ src: "/media/projects/music-campus.webp", alt: "Harmonic Horizons lakeside cultural architecture", caption: "Overall architecture and landscape relationship" }],
    demonstrates: "Harmonic Horizons demonstrates Artimist's ability to connect architectural research, master planning and visualization so a complex cultural brief can be communicated as one spatial system.",
    related: [{ href: "/architecture", label: "Architecture" }, { href: "/visualization", label: "Visualization" }, { href: "/process", label: "Studio Process" }, { href: "/international", label: "International Studio" }]
  },
  "us-permit-documentation": {
    title: "U.S. Permit Documentation & Revit Production",
    description: "Revit, BIM, CAD and permit-documentation case study focused on coordinated architectural drawing packages for U.S. project review and technical delivery.",
    eyebrow: "Technical production / Revit / BIM / permit support", region: "United States",
    hero: { src: "/media/projects/permit-sets.webp", alt: "United States permit documentation and architectural drawing package", caption: "Permit and technical documentation / Artimist Productions" },
    services: ["Revit", "BIM", "CAD", "Permit Sets", "Coordination"],
    brief: "This ongoing technical work focuses on translating existing conditions and design information into clear architectural drawing packages for review and multidisciplinary coordination. The emphasis is on legibility, sheet organization and controlled production rather than visual spectacle.",
    approach: ["Establish the existing-condition and project information before producing downstream drawings.", "Structure plans, elevations, sections, schedules and related sheets so revisions remain traceable and coordinated.", "Keep jurisdiction-specific review and locally licensed professional responsibilities explicit rather than assuming one universal permit workflow."],
    deliverables: ["Revit production", "CAD drafting", "Existing-condition drawings", "Permit drawing support", "Sheet coordination", "Technical presentation packages"],
    gallery: [{ src: "/media/projects/permit-sets.webp", alt: "Architectural permit drawing and Revit documentation set", caption: "Technical drawing package example" }],
    demonstrates: "The work demonstrates a production capability that sits alongside Artimist's design and visualization practice: organized Revit/BIM and drawing support for teams that need clear technical handover.",
    note: "Permit, code-compliance, signature and professional-seal requirements vary by U.S. jurisdiction. Local professional responsibilities are confirmed for the actual project scope.",
    related: [{ href: "/permit-drawing-services", label: "Permit Drawing Support" }, { href: "/revit-drafting-services", label: "Revit Drafting" }, { href: "/bim-modeling-services", label: "BIM Modeling" }, { href: "/usa", label: "USA Services" }]
  },
  "residential-visualization": {
    title: "Residential Architecture & Interior Visualization",
    description: "Residential exterior and interior visualization case study focused on daylight, warm materiality, believable furnishing and design decision-making.",
    eyebrow: "Residential / interior / exterior / visualization", region: "International",
    hero: { src: "/media/projects/residential.webp", alt: "Residential architecture and interior visualization by Artimist", caption: "Residential atmosphere and visualization study" },
    services: ["Interior Design", "Exterior Design", "3D Visualization", "Art Direction"],
    brief: "The residential work uses visualization as a design tool rather than only a marketing finish. Proportion, daylight, furnishing, material warmth and the emotional character of everyday spaces are tested through exterior and interior imagery.",
    approach: ["Use real furniture scale and circulation to test whether the spatial design works beyond an empty model.", "Develop lighting and material choices together so the visual mood supports the architectural intent.", "Keep exterior and interior imagery related enough that the project reads as one home rather than a collection of unrelated renders."],
    deliverables: ["Residential exterior visualization", "Interior visualization", "Material and lighting studies", "Furniture-aware spatial testing", "Art direction", "Presentation imagery"],
    gallery: [{ src: "/media/projects/residential.webp", alt: "Photoreal residential design visualization", caption: "Residential material, daylight and atmosphere study" }],
    demonstrates: "The project demonstrates how rendering can support residential design decisions before construction while also producing polished client-facing imagery.",
    related: [{ href: "/custom-house-design", label: "Custom House Design" }, { href: "/3d-interior-design-service", label: "3D Interior Design" }, { href: "/architectural-visualization-services", label: "Architectural Visualization" }, { href: "/residential", label: "Residential Portfolio" }]
  },
  "parametric-canopy-studies": {
    title: "Parametric Canopy Computational Design Studies",
    description: "Grasshopper-led computational design and visualization study exploring repeatable geometry, environmental response, material logic and human scale.",
    eyebrow: "Artimist Lab / computational design / Grasshopper", region: "Artimist Lab",
    hero: { src: "/media/projects/parametric-canopy.webp", alt: "Parametric canopy computational architecture study", caption: "Grasshopper-led canopy form study / Artimist Lab" },
    services: ["Grasshopper", "Computational Design", "Research", "Visualization"],
    brief: "The canopy studies investigate how rule-based geometry can produce architectural form that remains legible at human scale. The work connects repetition, environmental response and material logic rather than using parametric form as decoration alone.",
    approach: ["Build repeatable geometric rules that can be adjusted without redrawing the system from scratch.", "Test how density, span, rhythm and environmental response affect the spatial character of the canopy.", "Use visualization to evaluate whether the computational logic produces a convincing public-space experience at human scale."],
    deliverables: ["Parametric geometry studies", "Grasshopper workflows", "Form-finding iterations", "Computational design research", "Architectural visualization", "Presentation studies"],
    gallery: [{ src: "/media/projects/parametric-canopy.webp", alt: "Computational canopy architecture visualization", caption: "Rule-based structural and spatial study" }],
    demonstrates: "The studies show how Artimist's research practice can connect parametric systems with architectural judgement and visual communication.",
    related: [{ href: "/lab", label: "Artimist Lab" }, { href: "/architecture", label: "Architecture" }, { href: "/visualization", label: "Visualization" }, { href: "/process", label: "Process" }]
  },
  "connected-learning-auditorium": {
    title: "Connected Learning Auditorium Architecture Study",
    description: "Public architecture case study connecting civic purpose, learning, circulation, landscape, acoustic thinking and architectural presentation.",
    eyebrow: "Public architecture / learning / urban strategy", region: "Concept Study",
    hero: { src: "/media/projects/auditorium.webp", alt: "Connected Learning Auditorium public architecture study", caption: "Public architecture and learning-space study" },
    services: ["Architecture", "Urban Strategy", "Presentation", "Visualization"],
    brief: "The auditorium study explores how a public learning and gathering building can connect civic purpose, movement and landscape. The project is communicated from urban strategy down to program, sections, acoustic thinking and spatial experience.",
    approach: ["Start with how people arrive, gather and move through the public building rather than treating the auditorium as a single isolated room.", "Use program, section and acoustic considerations together so circulation and performance spaces support one another.", "Develop presentation imagery that explains both the urban idea and the interior spatial experience."],
    deliverables: ["Architectural concept", "Urban and circulation strategy", "Program studies", "Sectional development", "Acoustic design thinking", "Architectural visualization"],
    gallery: [{ src: "/media/projects/auditorium.webp", alt: "Public auditorium architecture and circulation visualization", caption: "Architecture, circulation and civic-space study" }],
    demonstrates: "The project demonstrates Artimist's ability to communicate public architecture across several scales, from urban strategy to spatial and visual experience.",
    related: [{ href: "/architecture", label: "Architecture" }, { href: "/visualization", label: "Visualization" }, { href: "/process", label: "Process" }, { href: "/international", label: "International Studio" }]
  },
};

export function generateStaticParams() { return Object.keys(cases).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = cases[slug]; if (!item) return {};
  return { title: `${item.title} | Artimist`, description: item.description, alternates: { canonical: `/case-studies/${slug}` }, openGraph: { title: item.title, description: item.description, url: `${BASE}/case-studies/${slug}`, type: "article", images: [{ url: item.hero.src, alt: item.hero.alt }] } };
}

export default async function PortfolioCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = cases[slug]; if (!item) notFound();
  return <ProjectCaseStudy slug={slug} eyebrow={item.eyebrow} title={item.title} summary={item.description} region={item.region} hero={item.hero} services={item.services} brief={item.brief} approach={item.approach} deliverables={item.deliverables} gallery={item.gallery} demonstrates={item.demonstrates} related={item.related} note={item.note} />;
}
