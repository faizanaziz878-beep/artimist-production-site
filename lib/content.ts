export type Project = {
  id?: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  year: string;
  location: string;
  services: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export type TeamMember = {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  published: boolean;
  sortOrder: number;
};

export type Testimonial = {
  id: number;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  photoKey: string;
  status: "pending" | "published" | "rejected";
  createdAt: string;
  publishedAt: string | null;
};

export type SiteSettings = Record<string, string>;

export const defaultSettings: SiteSettings = {
  heroEyebrow: "Independent multidisciplinary creative studio · Vancouver / Ohio / Stockholm / Lahore",
  heroHeadline: "We design how the future will feel.",
  heroBody:
    "Artimist Production connects architecture, identity, motion and digital craft into one living creative practice.",
  availability: "Open for selected international collaborations",
  contactEmail: "Faizan@artimistproductions.com",
  teamEmail: "team@artimistproductions.com",
  whatsapp: "+1 (807) 808-4181",
  address: "Raya DHA, Lahore",
  officeCanada: "Vancouver, Canada",
  officeUsa: "Ohio, USA",
  officePakistan: "Raya DHA, Lahore",
  officeSweden: "Stockholm, Sweden",
  instagram: "https://www.instagram.com/artimist.production/",
  linkedin: "https://www.linkedin.com/company/artimist-productions/",
  servicesJson: JSON.stringify([
    { code: "01", title: "Space", subtitle: "Architecture & Interior", copy: "Concepts, planning, residential and commercial design, interiors, landscape, BIM, CAD and U.S. permit documentation." },
    { code: "02", title: "Image", subtitle: "Visualization & Motion", copy: "Photoreal CGI, architectural animation, walkthroughs, video editing and cinematic visual storytelling." },
    { code: "03", title: "Identity", subtitle: "Brand & Product", copy: "Strategy, naming, logo systems, packaging, campaigns, print, merchandise and production-ready visual systems." },
    { code: "04", title: "Digital", subtitle: "Web, AI & Interactive", copy: "Web experiences, Unreal Engine real-time environments, AI creative, interactive products, Web3 and game-ready assets." },
    { code: "05", title: "Growth", subtitle: "Marketing & Commerce", copy: "Marketing direction, business strategy, Amazon marketplace services, content systems and creative consultancy." },
    { code: "06", title: "Lab", subtitle: "Research & Experiment", copy: "Parametric design, spatial research, speculative prototypes and new ways to connect culture, technology and form." },
  ]),
};

export function getStudioOffices(settings: SiteSettings) {
  return [
    { code: "01", region: "Canada", label: settings.officeCanada || defaultSettings.officeCanada },
    { code: "02", region: "United States", label: settings.officeUsa || defaultSettings.officeUsa },
    { code: "03", region: "Sweden", label: settings.officeSweden || defaultSettings.officeSweden },
    { code: "04", region: "Lahore", label: settings.officePakistan || defaultSettings.officePakistan },
  ];
}

export const defaultProjects: Project[] = [
  {
    slug: "bowl-stroke",
    title: "Bowl Stroke",
    category: "Space",
    summary: "A cinematic hospitality experience developed across exterior, dining, bar and private-room environments.",
    description:
      "Architecture and visualization are treated as one continuous narrative: arrival, atmosphere, material warmth and the rhythm of a night out.",
    image: "/media/projects/bowl-stroke.webp",
    gallery: [
      "/media/motion/bowl-stroke-teaser.mp4",
      "/media/projects/bowl-stroke.webp",
      "/media/projects/bowl-stroke-02.webp",
      "/media/projects/bowl-stroke-03.webp",
    ],
    year: "2026",
    location: "International",
    services: ["Architecture", "Interior", "3D Visualization", "Animation"],
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    slug: "harmonic-horizons",
    title: "Harmonic Horizons",
    category: "Space",
    summary: "A nature-integrated campus at Khanpur Dam where sound becomes landscape, sequence and form.",
    description:
      "The campus brings together performance, learning, accommodation and public life through acoustic separation, view corridors and a sound-to-form design method.",
    image: "/media/projects/music-campus.webp",
    gallery: ["/media/motion/music-campus-teaser.mp4", "/media/projects/music-campus.webp"],
    year: "2026",
    location: "Lakeside cultural district",
    services: ["Architecture", "Master Planning", "Research", "Visualization"],
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    slug: "alaskan-made",
    title: "Alaskan Made",
    category: "Identity",
    summary: "A full outdoor brand universe spanning strategy, identity, packaging, campaign and marketplace presence.",
    description:
      "A rugged but disciplined identity system designed to move consistently from product shelves and apparel to social campaigns and Amazon storefronts.",
    image: "/media/projects/alaskan-made.webp",
    gallery: ["/media/projects/alaskan-made.webp"],
    year: "2026",
    location: "United States",
    services: ["Brand Strategy", "Identity", "Packaging", "Amazon", "Campaign"],
    featured: true,
    published: true,
    sortOrder: 3,
  },
  {
    slug: "parametric-canopy-studies",
    title: "Parametric Canopy Studies",
    category: "Lab",
    summary: "Computational structures shaped through repeatable geometry, performance studies and human scale.",
    description:
      "Grasshopper-led form finding connects rule-based systems with material logic, environmental response and memorable public space.",
    image: "/media/projects/parametric-canopy.webp",
    gallery: ["/media/projects/parametric-canopy.webp"],
    year: "2026",
    location: "Artimist Lab",
    services: ["Grasshopper", "Computational Design", "Research", "Visualization"],
    featured: false,
    published: true,
    sortOrder: 4,
  },
  {
    slug: "connected-learning-auditorium",
    title: "Connected Learning Auditorium",
    category: "Space",
    summary: "A public architecture study connecting civic purpose, learning, circulation and landscape.",
    description:
      "The project is communicated from urban strategy down to program, sections, acoustic thinking and spatial experience.",
    image: "/media/projects/auditorium.webp",
    gallery: ["/media/projects/auditorium.webp"],
    year: "2026",
    location: "Concept Study",
    services: ["Architecture", "Urban Strategy", "Presentation", "Visualization"],
    featured: false,
    published: true,
    sortOrder: 5,
  },
  {
    slug: "us-permit-documentation",
    title: "U.S. Permit Documentation",
    category: "Technical",
    summary: "Coordinated architectural drawing packages built for clarity, review and multidisciplinary execution.",
    description:
      "From existing-condition surveys and code coordination to permit sheets and schedules, the work translates design into legible technical delivery.",
    image: "/media/projects/permit-sets.webp",
    gallery: ["/media/projects/permit-sets.webp"],
    year: "Ongoing",
    location: "United States",
    services: ["Revit", "BIM", "CAD", "Permit Sets", "Coordination"],
    featured: false,
    published: true,
    sortOrder: 6,
  },
  {
    slug: "unesco-cultural-study",
    title: "UNESCO Cultural Study",
    category: "Space",
    summary: "A cultural architecture proposal shaped by threshold, shadow, landscape and patterned enclosure.",
    description:
      "The visual study investigates how geometry, filtered light and material repetition can create a ceremonial yet contemporary public experience.",
    image: "/media/projects/unesco.webp",
    gallery: ["/media/projects/unesco.webp"],
    year: "2026",
    location: "Concept Study",
    services: ["Architecture", "Cultural Research", "Visualization"],
    featured: false,
    published: true,
    sortOrder: 7,
  },
  {
    slug: "residential-visualization",
    title: "Residential Atmospheres",
    category: "Image",
    summary: "Quiet residential environments built around daylight, warm materiality and believable everyday life.",
    description:
      "Exterior and interior visualization is used as a design tool: testing proportion, light, furnishing and the emotional temperature of a home.",
    image: "/media/projects/residential.webp",
    gallery: ["/media/motion/residential-build.mp4", "/media/projects/residential.webp"],
    year: "2026",
    location: "International",
    services: ["Interior", "Exterior", "3D Visualization", "Art Direction"],
    featured: false,
    published: true,
    sortOrder: 8,
  },
  {
    slug: "identity-systems",
    title: "Identity Systems",
    category: "Identity",
    summary: "Distinctive marks and visual languages designed to remain clear across every scale and medium.",
    description:
      "Each system begins with positioning and personality before moving into typography, color, applications and launch-ready assets.",
    image: "/media/projects/logo-systems.webp",
    gallery: ["/media/projects/logo-systems.webp"],
    year: "2026",
    location: "International",
    services: ["Naming", "Logo Design", "Visual Identity", "Brand Systems"],
    featured: false,
    published: true,
    sortOrder: 9,
  },
  {
    slug: "digital-collectible-system",
    title: "Digital Collectible System",
    category: "Digital",
    summary: "A character-led digital collection developed as a coherent visual product rather than isolated artwork.",
    description:
      "Character logic, rarity, trait systems, collection structure and marketplace presentation are designed as one connected experience.",
    image: "/media/projects/digital-collectibles.webp",
    gallery: ["/media/projects/digital-collectibles.webp"],
    year: "2026",
    location: "Digital",
    services: ["Creative Direction", "Character System", "Web3", "Product Design"],
    featured: false,
    published: true,
    sortOrder: 10,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: -1,
    clientName: "Residential Client",
    role: "Private Home",
    company: "Canada",
    rating: 5,
    quote: "The team understood the feeling we wanted before we had the words for it. The final spaces felt calm, coherent and genuinely ours.",
    photoKey: "",
    status: "published",
    createdAt: "2026-01-18T10:00:00.000Z",
    publishedAt: "2026-01-18T10:00:00.000Z",
  },
  {
    id: -2,
    clientName: "Hospitality Client",
    role: "Commercial Interior",
    company: "United States",
    rating: 5,
    quote: "Artimist connected the architecture, interiors and visual story into one clear experience. Every review moved the project forward.",
    photoKey: "",
    status: "published",
    createdAt: "2026-02-03T10:00:00.000Z",
    publishedAt: "2026-02-03T10:00:00.000Z",
  },
  {
    id: -3,
    clientName: "Property Developer",
    role: "Mixed-use Development",
    company: "Ohio, USA",
    rating: 4.5,
    quote: "The visualizations made complex planning decisions easy to understand. Communication was direct, fast and consistently professional.",
    photoKey: "",
    status: "published",
    createdAt: "2026-02-21T10:00:00.000Z",
    publishedAt: "2026-02-21T10:00:00.000Z",
  },
  {
    id: -4,
    clientName: "Brand Founder",
    role: "Consumer Brand",
    company: "United States",
    rating: 5,
    quote: "They did more than design a logo. They built a complete visual system that now works across packaging, content and commerce.",
    photoKey: "",
    status: "published",
    createdAt: "2026-03-10T10:00:00.000Z",
    publishedAt: "2026-03-10T10:00:00.000Z",
  },
  {
    id: -5,
    clientName: "Cultural Project Client",
    role: "Architecture & Research",
    company: "Lahore",
    rating: 5,
    quote: "The work balanced ambition with structure. The concept, diagrams and final presentation all spoke the same architectural language.",
    photoKey: "",
    status: "published",
    createdAt: "2026-03-29T10:00:00.000Z",
    publishedAt: "2026-03-29T10:00:00.000Z",
  },
  {
    id: -6,
    clientName: "Design Partner",
    role: "Architectural Visualization",
    company: "United Kingdom",
    rating: 5,
    quote: "The images were not only photorealistic; they carried atmosphere, material depth and a strong understanding of the design intent.",
    photoKey: "",
    status: "published",
    createdAt: "2026-04-12T10:00:00.000Z",
    publishedAt: "2026-04-12T10:00:00.000Z",
  },
  {
    id: -7,
    clientName: "Interior Client",
    role: "Private Residence",
    company: "Vancouver, Canada",
    rating: 4.5,
    quote: "They refined what we already loved instead of forcing a new direction. The home became more functional without losing its personality.",
    photoKey: "",
    status: "published",
    createdAt: "2026-04-30T10:00:00.000Z",
    publishedAt: "2026-04-30T10:00:00.000Z",
  },
  {
    id: -8,
    clientName: "Construction Partner",
    role: "Permit Documentation",
    company: "United States",
    rating: 5,
    quote: "The drawing package was organized, readable and responsive to coordination comments. That clarity saved time during review.",
    photoKey: "",
    status: "published",
    createdAt: "2026-05-16T10:00:00.000Z",
    publishedAt: "2026-05-16T10:00:00.000Z",
  },
  {
    id: -9,
    clientName: "Creative Director",
    role: "Motion & CGI",
    company: "UAE",
    rating: 5,
    quote: "The animation had the pacing and finish of a film rather than a standard walkthrough. The team cared about every frame.",
    photoKey: "",
    status: "published",
    createdAt: "2026-06-02T10:00:00.000Z",
    publishedAt: "2026-06-02T10:00:00.000Z",
  },
  {
    id: -10,
    clientName: "Digital Product Client",
    role: "Interactive Experience",
    company: "United States",
    rating: 4.5,
    quote: "Artimist brought spatial thinking into the digital product. The result felt distinctive, intuitive and much more memorable.",
    photoKey: "",
    status: "published",
    createdAt: "2026-06-20T10:00:00.000Z",
    publishedAt: "2026-06-20T10:00:00.000Z",
  },
  {
    id: -11,
    clientName: "Landscape Client",
    role: "Master Planning",
    company: "Lahore",
    rating: 5,
    quote: "They turned a large and complicated brief into a clear sequence of places. The master plan became easy to explain and phase.",
    photoKey: "",
    status: "published",
    createdAt: "2026-07-07T10:00:00.000Z",
    publishedAt: "2026-07-07T10:00:00.000Z",
  },
  {
    id: -12,
    clientName: "Repeat Client",
    role: "Multidisciplinary Projects",
    company: "International",
    rating: 5,
    quote: "We return because the team can move from strategy to design to production without losing the original idea along the way.",
    photoKey: "",
    status: "published",
    createdAt: "2026-07-25T10:00:00.000Z",
    publishedAt: "2026-07-25T10:00:00.000Z",
  },
];

export const defaultTeam: TeamMember[] = [
  {
    name: "Faizan Aziz",
    role: "Founder & Creative Director",
    bio: "Architect and multidisciplinary creative lead connecting spatial thinking, visual storytelling, brand strategy and digital production.",
    image: "/media/team/faizan-founder-hd.webp",
    linkedin: "https://www.linkedin.com/in/faizan-aziz-9788a3378/",
    published: true,
    sortOrder: 1,
  },
  {
    name: "Mahnoor Shiekh",
    role: "Interior Architect & 3D Visualizer",
    bio: "Develops residential and commercial interiors from space planning and concept through photoreal visualization.",
    image: "/media/team/mahnoor.webp",
    linkedin: "",
    published: true,
    sortOrder: 2,
  },
  {
    name: "Jannat Niaz",
    role: "Architectural Designer",
    bio: "Works through narrative, zoning, circulation and sectional thinking to shape clear and emotionally resonant spaces.",
    image: "/media/team/jannat.webp",
    linkedin: "https://www.linkedin.com/in/jannat-niaz-b61a932b6/",
    published: true,
    sortOrder: 3,
  },
  {
    name: "Aden Mansoor",
    role: "Project Lead Architect",
    bio: "Leads architectural projects from early spatial strategy through design development, team coordination and delivery.",
    image: "/media/team/aden-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 4,
  },
  {
    name: "Sufyan Ilyas",
    role: "Studio Collaborator",
    bio: "Contributes to the studio's growing network of creative, technical and production capabilities.",
    image: "/media/team/sufyan-team-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 5,
  },
  {
    name: "Zarmeen Khan",
    role: "People & Operations",
    bio: "Supports the human side of a distributed practice: team coordination, communication and studio operations.",
    image: "/media/team/zarmeen.webp",
    linkedin: "https://www.linkedin.com/in/zarmeen-khan-725610276/",
    published: true,
    sortOrder: 6,
  },
  {
    name: "Abdur Rehman",
    role: "2D / 3D Animator & Graphics Expert",
    bio: "Builds animated sequences, motion graphics, visual assets and 2D/3D storytelling for architectural and creative production.",
    image: "/media/team/abdur-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 7,
  },
  {
    name: "Farwa Kashif",
    role: "Revit / BIM / AutoCAD / 3ds Max Expert",
    bio: "Develops coordinated BIM models, Revit documentation, AutoCAD drawings and 3ds Max production assets.",
    image: "/media/team/farwa-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 8,
  },
  {
    name: "Hanan Shahid",
    role: "Unreal Engine Engineer, Architect & Grasshopper Expert",
    bio: "Combines architectural thinking with Unreal Engine real-time production and Grasshopper-led computational design.",
    image: "/media/team/hanan-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 9,
  },
  {
    name: "Rohma Fatima",
    role: "Multidisciplinary Studio Team",
    bio: "Part of Artimist's main multidisciplinary team, contributing to project development and creative delivery.",
    image: "/media/team/rohma-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 10,
  },
  {
    name: "Eunica Amir",
    role: "Multidisciplinary Studio Team",
    bio: "Part of Artimist's main multidisciplinary team, contributing to project development and creative delivery.",
    image: "/media/team/eunica-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 11,
  },
  {
    name: "Ezza Shahid",
    role: "Interior Designer",
    bio: "Develops functional, visually resolved interiors through space planning, concept boards, material thinking and 3D visualization across SketchUp, AutoCAD, Lumion and Enscape.",
    image: "/media/team/ezza.jpeg",
    linkedin: "",
    published: true,
    sortOrder: 12,
  },
  {
    name: "Shumail",
    role: "Studio Collaborator",
    bio: "Supports Artimist's multidisciplinary project delivery and contributes across the studio's evolving creative workflow.",
    image: "/media/team/shumail-profile-2026.webp",
    linkedin: "",
    published: true,
    sortOrder: 13,
  },
];

export const serviceWorlds = [
  {
    code: "01",
    title: "Space",
    subtitle: "Architecture & Interior",
    copy: "Concepts, planning, residential and commercial design, interiors, landscape, BIM, CAD and U.S. permit documentation.",
  },
  {
    code: "02",
    title: "Image",
    subtitle: "Visualization & Motion",
    copy: "Photoreal CGI, architectural animation, walkthroughs, video editing and cinematic visual storytelling.",
  },
  {
    code: "03",
    title: "Identity",
    subtitle: "Brand & Product",
    copy: "Strategy, naming, logo systems, packaging, campaigns, print, merchandise and production-ready visual systems.",
  },
  {
    code: "04",
    title: "Digital",
    subtitle: "Web, AI & Interactive",
    copy: "Web experiences, Unreal Engine real-time environments, AI creative, interactive products, Web3 and game-ready assets.",
  },
  {
    code: "05",
    title: "Growth",
    subtitle: "Marketing & Commerce",
    copy: "Marketing direction, business strategy, Amazon marketplace services, content systems and creative consultancy.",
  },
  {
    code: "06",
    title: "Lab",
    subtitle: "Research & Experiment",
    copy: "Parametric design, spatial research, speculative prototypes and new ways to connect culture, technology and form.",
  },
];
