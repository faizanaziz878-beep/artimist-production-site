import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon } from "../../ui-icon";

type Service = {
  slug: string;
  name: string;
  h1: string;
  title: string;
  desc: string;
  tagline: string;
  intro: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string; caption: string }[];
  sections: { h: string; p: string }[];
  items: string[];
};

const BASE = "https://www.artimistproductions.com";

const SERVICES: Service[] = [
  {
    slug: "architectural-rendering", name: "Architectural Rendering", h1: "Architectural Rendering Services",
    title: "Architectural Rendering Services | 3D Exterior Renders",
    desc: "Photorealistic architectural rendering for architects, developers and builders. Exterior and interior 3D renders that communicate design intent before construction begins.",
    tagline: "Photorealistic images of buildings that do not exist yet.",
    intro: "We produce high-end architectural renderings that let clients, investors and planning boards see a building the way it will actually feel — light, material, atmosphere and context, resolved before construction begins.",
    image: "/media/atlas/atlas-06.webp", imageAlt: "Photoreal architectural visualization of a waterfront cultural building at sunset",
    gallery: [
      { src: "/media/atlas/atlas-07.webp", alt: "Sculptural timber cultural building exterior visualization", caption: "Material and daylight study" },
      { src: "/media/atlas/atlas-08.webp", alt: "Adaptive reuse courtyard architectural visualization", caption: "Atmosphere and context" },
      { src: "/media/atlas/atlas-16.webp", alt: "Contemporary low-rise pavilion exterior rendering", caption: "Landscape integration" },
    ],
    sections: [
      { h: "What you receive", p: "Still images at print and presentation resolution, delivered in the aspect ratios you need: hero exteriors, entry approaches, key interiors, dusk and daylight variants, and context views that place the building in its surroundings." },
      { h: "How we work", p: "We start from your drawings — Revit, CAD, SketchUp or a massing model — and build an accurate 3D scene. Materials, lighting and landscape are set to match the design intent, then reviewed with you at draft resolution before final rendering." },
      { h: "Where it is used", p: "Planning and permit submissions, investor and board presentations, pre-construction sales, competition boards and marketing collateral for launches." },
    ],
    items: ["Exterior architectural renders", "Interior renders", "Dusk, daylight and night variants", "Aerial and context views", "Site and landscape integration", "Print-resolution delivery"],
  },
  {
    slug: "3d-interior-rendering", name: "3D Interior Rendering", h1: "3D Interior Rendering",
    title: "3D Interior Rendering Services | Interior Visualization",
    desc: "3D interior rendering and interior visualization for designers, developers and hospitality brands. Photoreal rooms with accurate materials, lighting and furniture.",
    tagline: "Rooms you can feel before they are built.",
    intro: "Interior visualization is where material and light do the persuading. We render interiors at a level of finish where a client can judge a stone, a fabric or a lighting temperature and make a real decision from the image.",
    image: "/img/homeint03.webp", imageAlt: "Photoreal residential interior visualization showing materials, furniture and lighting",
    gallery: [
      { src: "/img/homeint05.webp", alt: "Warm contemporary living room visualization", caption: "Furniture and palette" },
      { src: "/img/homeint09.webp", alt: "Contemporary bedroom material and lighting visualization", caption: "Private-space study" },
      { src: "/media/atlas/atlas-15.webp", alt: "High-end residential interior overlooking the landscape", caption: "Spatial atmosphere" },
    ],
    sections: [
      { h: "What you receive", p: "Room-by-room interior renders with correct furniture, finishes and fixtures. Options can be rendered as variants so the same camera shows alternative palettes, layouts or lighting states side by side." },
      { h: "How we work", p: "We build from your plans and FF&E schedule. Where a specified product exists, we model it accurately; where it is still open, we use a considered stand-in and identify it clearly so nothing is misrepresented." },
      { h: "Where it is used", p: "Design review and client sign-off, residential and hospitality marketing, showroom and sales-suite display, and finish-selection meetings." },
    ],
    items: ["Living, kitchen and bedroom sets", "Hospitality and F&B interiors", "Material and palette variants", "Lighting state studies", "FF&E-accurate modelling", "Detail and vignette shots"],
  },
  {
    slug: "real-estate-rendering", name: "Real Estate Rendering", h1: "Real Estate Rendering for Developers",
    title: "Real Estate Rendering & 3D Marketing for Developers",
    desc: "Real estate rendering and 3D visualization for property developers: pre-construction marketing imagery, sales-suite visuals and investor presentation renders.",
    tagline: "Sell the building before it exists.",
    intro: "Pre-construction sales depend heavily on imagery. We produce the visual package a development needs to open sales — hero shots, amenity spaces, unit interiors and lifestyle context — consistent in style across every asset.",
    image: "/media/atlas/atlas-11.webp", imageAlt: "Aerial architectural visualization of a masterplanned development at dusk",
    gallery: [
      { src: "/media/atlas/atlas-12.webp", alt: "Development arrival sequence at blue hour", caption: "Arrival and public realm" },
      { src: "/media/atlas/atlas-13.webp", alt: "Residential development lobby visualization", caption: "Amenity and lobby" },
      { src: "/media/atlas/atlas-14.webp", alt: "Coastal masterplan aerial visualization", caption: "Masterplan context" },
    ],
    sections: [
      { h: "What you receive", p: "A coordinated marketing set: signature exterior hero, amenity and lobby spaces, representative unit interiors, aerial context, and crops sized for brochure, hoarding, web and paid social." },
      { h: "How we work", p: "We treat the development as one visual identity rather than a pile of unrelated images. Camera language, time of day, styling and colour grade stay consistent so the campaign reads as one product." },
      { h: "Where it is used", p: "Sales centres and hoardings, brochures and websites, investor decks, listing platforms and launch advertising." },
    ],
    items: ["Pre-construction marketing imagery", "Amenity and lobby visualization", "Unit interior sets", "Aerial and masterplan views", "Brochure and web crops", "Consistent campaign art direction"],
  },
  {
    slug: "architectural-animation", name: "Architectural Animation", h1: "Architectural Animation & Walkthroughs",
    title: "Architectural Animation & 3D Walkthrough Videos",
    desc: "Architectural animation, 3D walkthrough videos and cinematic flythroughs for developments, competitions and investor presentations.",
    tagline: "Move through the building before it is built.",
    intro: "Animation shows what a still cannot: sequence, scale and the experience of moving through a space. We produce cinematic architectural films and walkthroughs that carry a project's atmosphere, not just its geometry.",
    image: "/media/atlas/atlas-14.webp", imageAlt: "Cinematic architectural visualization used in an Artimist animation sequence",
    gallery: [
      { src: "/img/ue01.webp", alt: "Architectural environment prepared in Unreal Engine", caption: "Scene development" },
      { src: "/img/ue02.webp", alt: "Real-time architectural lighting workflow", caption: "Lighting and materials" },
      { src: "/img/ue03.webp", alt: "Real-time architecture environment review", caption: "Interactive review" },
    ],
    sections: [
      { h: "What you receive", p: "Edited films with camera choreography, sound design and colour grade — delivered in the durations and formats you need, from a flagship film to short vertical cuts for social." },
      { h: "How we work", p: "We storyboard the route first so the film argues for the design rather than wandering through it. Camera moves, reveals and pacing are agreed before final render time is spent." },
      { h: "Where it is used", p: "Launch campaigns, competition submissions, investor and board presentations, exhibition loops and social advertising." },
    ],
    items: ["Cinematic architectural films", "3D walkthroughs and flythroughs", "Storyboarded camera choreography", "Sound design and colour grade", "Vertical and social cuts", "Exhibition loops"],
  },
];

const CSS = ".sv-root{position:relative;min-height:100vh;background:#0b090a;color:#ece7e2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.6;overflow:hidden}.sv-root::before{content:'';position:fixed;inset:0;pointer-events:none;background:radial-gradient(1100px 620px at 50% -8%,rgba(153,38,54,.27),rgba(20,13,14,0) 60%),radial-gradient(820px 640px at 88% 12%,rgba(70,22,34,.18),transparent 55%),linear-gradient(180deg,#130c0e,#0b090a 55%)}.sv-root>*{position:relative}.sv-root h1,.sv-root h2,.sv-root h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0}.sv-kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#c9536a;font-weight:600}.sv-wrap{max-width:1220px;margin:0 auto;padding:0 40px}.sv-back{display:inline-flex;align-items:center;gap:8px;color:#9a8f89;font-size:12px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;padding:92px 0 26px}.sv-back .ui-icon{transform:rotate(180deg)}.sv-back:hover{color:#ece7e2}.sv-hero{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center;padding:28px 0 74px}.sv-hero-copy{text-align:left}.sv-hero h1{font-size:clamp(48px,6.2vw,82px);line-height:.98;letter-spacing:-.04em;margin:16px 0 20px}.sv-tagline{font-family:Georgia,serif;font-size:26px;color:#e6dcd7;font-style:italic;margin:0}.sv-lead{font-size:19px;line-height:1.62;color:#bdb2ac;margin:30px 0 0;max-width:58ch}.sv-proof{position:relative;margin:0;overflow:hidden;border:1px solid rgba(255,255,255,.11);border-radius:20px;background:#111;aspect-ratio:4/3}.sv-proof img{display:block;width:100%;height:100%;object-fit:cover}.sv-proof:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(8,8,8,.74))}.sv-proof figcaption{position:absolute;z-index:1;left:16px;bottom:16px;padding:9px 12px;background:rgba(8,8,8,.72);font-size:9px;text-transform:uppercase;letter-spacing:.12em;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.sv-gallery{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:14px;padding:0 0 76px}.sv-gallery figure{position:relative;margin:0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#151213;aspect-ratio:4/3}.sv-gallery img{width:100%;height:100%;display:block;object-fit:cover;transition:transform .55s ease}.sv-gallery figure:hover img{transform:scale(1.02)}.sv-gallery figcaption{position:absolute;left:12px;bottom:12px;background:rgba(9,8,9,.82);border-radius:999px;padding:7px 10px;color:#eee7e2;font-size:9px;letter-spacing:.12em;text-transform:uppercase}.sv-body{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:64px 0;border-top:1px solid rgba(255,255,255,.09)}.sv-sec{padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(255,255,255,.024);min-height:270px}.sv-sec-index{display:block;color:#c9536a;font-size:10px;letter-spacing:.16em;margin-bottom:34px}.sv-sec h2{font-size:28px;margin-bottom:14px}.sv-sec p{color:#aaa09a;font-size:15px;margin:0}.sv-items-wrap{padding:44px 0 54px;border-top:1px solid rgba(255,255,255,.08);text-align:center}.sv-items{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px;justify-content:center}.sv-item{border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:9px 18px;font-size:13px;color:#cdc4bf}.sv-cta-row{padding:0 0 70px;text-align:center}.sv-cta{display:inline-flex;align-items:center;gap:10px;background:#992636;color:#fff;text-decoration:none;padding:16px 30px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;border-radius:40px}.sv-cta .ui-icon{transition:transform .2s ease}.sv-cta:hover .ui-icon{transform:translate(2px,-2px)}.sv-more{padding:40px 0 125px;border-top:1px solid rgba(255,255,255,.08);text-align:center}.sv-more-links{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:18px}.sv-more-links a{color:#cdc4bf;text-decoration:none;border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:10px 20px;font-size:14px}.sv-more-links a:hover{border-color:#992636;color:#fff}@media(max-width:880px){.sv-hero{grid-template-columns:1fr;gap:34px}.sv-gallery{grid-template-columns:1fr 1fr}.sv-gallery figure:first-child{grid-column:1/3;aspect-ratio:16/9}.sv-body{grid-template-columns:1fr}.sv-sec{min-height:0}}@media(max-width:600px){.sv-wrap{padding:0 22px}.sv-back{padding-top:82px}.sv-hero{padding-bottom:48px}.sv-hero h1{font-size:clamp(44px,13vw,62px)}.sv-proof{aspect-ratio:1/1}.sv-gallery{grid-template-columns:1fr;padding-bottom:54px}.sv-gallery figure,.sv-gallery figure:first-child{grid-column:auto;aspect-ratio:4/3}.sv-body{padding-top:52px}.sv-more{padding-bottom:150px}}";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.desc,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description: s.desc, url: `${BASE}/services/${s.slug}`, type: "website", images: [{ url: s.image, alt: s.imageAlt }] },
    twitter: { card: "summary_large_image", title: s.title, description: s.desc, images: [s.image] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    description: s.desc,
    serviceType: s.name,
    provider: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions", url: BASE },
    areaServed: ["United States", "Canada", "United Kingdom", "Sweden", "Worldwide"],
    url: `${BASE}/services/${s.slug}`,
  };
  return (
    <main className="sv-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="sv-wrap">
        <Link className="sv-back" href="/services"><UiIcon name="chevron" size={13} /> All services</Link>
        <section className="sv-hero"><div className="sv-hero-copy"><div className="sv-kicker">Service</div><h1>{s.h1}</h1><p className="sv-tagline">{s.tagline}</p><p className="sv-lead">{s.intro}</p></div><figure className="sv-proof"><img src={s.image} alt={s.imageAlt} width="1600" height="1200" fetchPriority="high" /><figcaption>Selected Artimist work / {s.name}</figcaption></figure></section>
        <div className="sv-gallery" aria-label={`${s.name} visual studies`}>{s.gallery.map((visual) => <figure key={visual.src}><img src={visual.src} alt={visual.alt} width="1200" height="900" loading="lazy" decoding="async" /><figcaption>{visual.caption}</figcaption></figure>)}</div>
        <div className="sv-body">{s.sections.map((sec,index) => <div className="sv-sec" key={sec.h}><span className="sv-sec-index">0{index + 1} / SERVICE STAGE</span><h2>{sec.h}</h2><p>{sec.p}</p></div>)}</div>
        <div className="sv-items-wrap"><div className="sv-kicker">Included</div><div className="sv-items">{s.items.map((item) => <span className="sv-item" key={item}>{item}</span>)}</div></div>
        <div className="sv-cta-row"><Link className="sv-cta" href="/contact">Start a project <UiIcon name="arrow" size={15} /></Link></div>
        <div className="sv-more"><div className="sv-kicker">Related services</div><div className="sv-more-links">{others.map((other) => <Link href={`/services/${other.slug}`} key={other.slug}>{other.name}</Link>)}</div></div>
      </div>
    </main>
  );
}
