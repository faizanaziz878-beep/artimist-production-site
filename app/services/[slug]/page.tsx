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
  motion?: { src: string; poster: string; label: string; title: string };
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
    motion: { src: "/media/motion/music-campus-teaser.mp4", poster: "/media/projects/music-campus.webp", label: "Architecture-only motion study", title: "Camera, sequence and atmosphere—not a slideshow of stills." },
    sections: [
      { h: "What you receive", p: "Edited films with camera choreography, sound design and colour grade — delivered in the durations and formats you need, from a flagship film to short vertical cuts for social." },
      { h: "How we work", p: "We storyboard the route first so the film argues for the design rather than wandering through it. Camera moves, reveals and pacing are agreed before final render time is spent." },
      { h: "Where it is used", p: "Launch campaigns, competition submissions, investor and board presentations, exhibition loops and social advertising." },
    ],
    items: ["Cinematic architectural films", "3D walkthroughs and flythroughs", "Storyboarded camera choreography", "Sound design and colour grade", "Vertical and social cuts", "Exhibition loops"],
  },
];

const CSS = `
.sv-root{--ink:#f1ece7;--muted:#a99f99;--red:#a22b42;--line:rgba(255,255,255,.13);min-height:100vh;background:#090708;color:var(--ink);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;overflow:hidden}.sv-root *{box-sizing:border-box}.sv-root h1,.sv-root h2,.sv-root h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0}.sv-shell{width:min(1600px,calc(100% - 80px));margin:auto}.sv-topline{position:absolute;z-index:8;top:92px;left:0;right:0;display:flex;justify-content:space-between;align-items:center}.sv-back,.sv-hero-cta{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-size:10px;letter-spacing:.16em;text-transform:uppercase}.sv-back .ui-icon{transform:rotate(180deg)}.sv-count{font-size:10px;letter-spacing:.16em;color:rgba(255,255,255,.58);text-transform:uppercase}.sv-hero{position:relative;height:min(920px,100svh);min-height:720px;overflow:hidden;background:#151012}.sv-hero-media{position:absolute;inset:0}.sv-hero-media img,.sv-hero-media video{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.01)}.sv-hero-media:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,4,5,.82) 0%,rgba(5,4,5,.3) 50%,rgba(5,4,5,.15) 100%),linear-gradient(0deg,rgba(5,4,5,.72),transparent 52%)}.sv-hero-copy{position:absolute;z-index:4;left:max(40px,calc((100vw - 1600px)/2 + 40px));bottom:68px;width:min(920px,calc(100% - 80px))}.sv-kicker{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#e07086;font-weight:600}.sv-hero h1{font-size:clamp(64px,8.8vw,150px);line-height:.82;letter-spacing:-.058em;max-width:1060px;margin:18px 0 24px;text-wrap:balance}.sv-tagline{font:italic 400 clamp(24px,2.5vw,42px)/1.15 Georgia,serif;color:#eee4df;margin:0 0 22px}.sv-lead{max-width:720px;margin:0;color:rgba(255,255,255,.72);font-size:17px;line-height:1.65}.sv-scroll{position:absolute;z-index:5;right:40px;bottom:38px;writing-mode:vertical-rl;color:rgba(255,255,255,.5);font-size:9px;letter-spacing:.18em;text-transform:uppercase}.sv-intro{display:grid;grid-template-columns:.34fr .66fr;gap:70px;padding:94px 0 76px;border-bottom:1px solid var(--line)}.sv-intro-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#d8667a}.sv-intro-copy{font:400 clamp(34px,4.4vw,72px)/1.02 Georgia,serif;letter-spacing:-.035em;color:#e8e0db;max-width:1100px}.sv-proof-rail{display:grid;grid-template-columns:1.15fr .75fr .95fr;gap:10px;padding:10px 0 100px}.sv-proof-rail figure{position:relative;margin:0;overflow:hidden;background:#141113;min-height:520px}.sv-proof-rail figure:nth-child(2){margin-top:88px;min-height:430px}.sv-proof-rail img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1s cubic-bezier(.2,.7,.2,1)}.sv-proof-rail figure:hover img{transform:scale(1.025)}.sv-proof-rail figcaption{position:absolute;left:16px;bottom:16px;padding:8px 11px;background:rgba(8,6,7,.76);backdrop-filter:blur(12px);font-size:9px;letter-spacing:.14em;text-transform:uppercase}.sv-story{padding:20px 0 110px}.sv-story-row{display:grid;grid-template-columns:86px minmax(340px,.9fr) minmax(340px,1.1fr);gap:28px;align-items:stretch;padding:10px 0;border-top:1px solid var(--line)}.sv-story-no{padding-top:26px;font:400 42px/.9 Georgia,serif;color:#7f2032}.sv-story-visual{margin:0;min-height:360px;overflow:hidden;background:#151113}.sv-story-visual img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.78);transition:transform .8s ease}.sv-story-row:hover .sv-story-visual img{transform:scale(1.025)}.sv-story-copy{display:flex;flex-direction:column;justify-content:flex-end;padding:30px 22px 30px 8px}.sv-story h2{font-size:clamp(34px,4vw,62px);line-height:1;letter-spacing:-.035em}.sv-story p{max-width:560px;margin:18px 0 0;color:var(--muted);font-size:15px;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.sv-motion{padding:0 0 110px}.sv-motion-stage{position:relative;min-height:72vh;background:#111;overflow:hidden}.sv-motion-stage video{display:block;width:100%;height:72vh;object-fit:cover}.sv-motion-overlay{position:absolute;inset:auto 0 0;padding:40px;background:linear-gradient(0deg,rgba(5,4,5,.9),transparent);display:flex;align-items:end;justify-content:space-between;gap:30px}.sv-motion-overlay h2{font-size:clamp(34px,4vw,64px);line-height:1;max-width:800px}.sv-motion-overlay span{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#e07086}.sv-included{padding:92px 0 110px;border-top:1px solid var(--line)}.sv-included-head{display:grid;grid-template-columns:.35fr .65fr;gap:60px;align-items:end;margin-bottom:46px}.sv-included h2{font-size:clamp(46px,6vw,90px);line-height:.93;letter-spacing:-.045em}.sv-items{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--line)}.sv-item{display:flex;justify-content:space-between;gap:20px;padding:24px 0;border-bottom:1px solid var(--line);font-size:14px}.sv-item:nth-child(odd){padding-right:34px}.sv-item:nth-child(even){padding-left:34px;border-left:1px solid var(--line)}.sv-item small{color:#7f2032;font-size:10px}.sv-closing{position:relative;min-height:68vh;display:flex;align-items:end;overflow:hidden;margin-top:10px;background:#171214}.sv-closing img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.88) brightness(.58)}.sv-closing:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,5,6,.95),rgba(7,5,6,.08) 70%)}.sv-closing-copy{position:relative;z-index:2;padding-bottom:58px}.sv-closing p{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#e07086}.sv-closing h2{max-width:1150px;font-size:clamp(56px,7.5vw,118px);line-height:.88;letter-spacing:-.055em;margin:16px 0 34px}.sv-primary{display:inline-flex;align-items:center;gap:12px;padding:15px 22px;background:#8f2338;color:#fff;text-decoration:none;font-size:10px;letter-spacing:.15em;text-transform:uppercase}.sv-related{padding:70px 0 130px}.sv-related-head{display:flex;justify-content:space-between;align-items:end;padding-bottom:22px;border-bottom:1px solid var(--line)}.sv-related-head h2{font-size:34px}.sv-related-grid{display:grid;grid-template-columns:repeat(3,1fr)}.sv-related-card{position:relative;display:block;padding:26px 24px 28px 0;text-decoration:none;color:#ded7d2;border-bottom:1px solid var(--line)}.sv-related-card:not(:last-child){border-right:1px solid var(--line);margin-right:24px}.sv-related-card small{display:block;color:#7f2032;font-size:9px;letter-spacing:.15em;text-transform:uppercase;margin-bottom:14px}.sv-related-card strong{font:400 25px/1.05 Georgia,serif}.sv-related-card .ui-icon{position:absolute;right:20px;top:28px}.sv-related-card:hover strong{color:#fff}@media(max-width:900px){.sv-shell{width:min(100% - 40px,1600px)}.sv-topline{top:78px}.sv-hero{min-height:700px}.sv-hero-copy{left:20px;bottom:52px;width:calc(100% - 40px)}.sv-hero h1{font-size:clamp(54px,12vw,90px)}.sv-scroll{display:none}.sv-intro{grid-template-columns:1fr;gap:24px;padding:70px 0 52px}.sv-proof-rail{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-20px;padding-right:20px;padding-bottom:70px;scrollbar-width:none}.sv-proof-rail::-webkit-scrollbar{display:none}.sv-proof-rail figure,.sv-proof-rail figure:nth-child(2){flex:0 0 82vw;min-height:58vh;margin-top:0;scroll-snap-align:center}.sv-story-row{grid-template-columns:54px 1fr;gap:14px}.sv-story-visual{min-height:58vw}.sv-story-copy{grid-column:2;padding:22px 0 30px}.sv-story-no{font-size:38px}.sv-included-head{grid-template-columns:1fr;gap:18px}.sv-related-grid{grid-template-columns:1fr}.sv-related-card:not(:last-child){border-right:0;margin-right:0}.sv-related-card{padding-right:48px}}@media(max-width:600px){.sv-shell{width:calc(100% - 32px)}.sv-topline{top:74px}.sv-count{display:none}.sv-hero{height:86svh;min-height:620px}.sv-hero-media:after{background:linear-gradient(0deg,rgba(5,4,5,.88),rgba(5,4,5,.12) 70%)}.sv-hero-copy{left:16px;bottom:42px;width:calc(100% - 32px)}.sv-hero h1{font-size:clamp(48px,14vw,72px);line-height:.87;margin-top:14px}.sv-tagline{font-size:22px}.sv-lead{font-size:14px;line-height:1.55;max-width:95%}.sv-intro-copy{font-size:36px}.sv-proof-rail figure,.sv-proof-rail figure:nth-child(2){flex-basis:88vw;min-height:52vh}.sv-story{padding-bottom:80px}.sv-story-row{grid-template-columns:40px 1fr;padding:8px 0 26px}.sv-story-visual{min-height:72vw}.sv-story-copy{padding:20px 0 4px}.sv-story h2{font-size:36px}.sv-story p{font-size:14px;line-height:1.55}.sv-motion-stage,.sv-motion-stage video{height:62vh;min-height:520px}.sv-motion-overlay{padding:22px;display:block}.sv-motion-overlay h2{font-size:36px;margin-top:8px}.sv-items{grid-template-columns:1fr}.sv-item,.sv-item:nth-child(odd),.sv-item:nth-child(even){padding:20px 0;border-left:0}.sv-closing{min-height:72vh}.sv-closing h2{font-size:54px}.sv-related{padding-bottom:150px}}@media(prefers-reduced-motion:reduce){.sv-proof-rail img,.sv-story-visual img{transition:none}.sv-proof-rail figure:hover img,.sv-story-row:hover .sv-story-visual img{transform:none}}
`;

export function generateStaticParams() { return SERVICES.map((s) => ({ slug: s.slug })); }

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

      <section className="sv-hero">
        <div className="sv-hero-media">
          {s.motion ? <video autoPlay muted loop playsInline preload="metadata" poster={s.motion.poster} aria-label={s.motion.label}><source src={s.motion.src} type="video/mp4" /></video> : <img src={s.image} alt={s.imageAlt} width="1800" height="1200" fetchPriority="high" />}
        </div>
        <div className="sv-shell sv-topline"><Link className="sv-back" href="/services"><UiIcon name="chevron" size={13} /> All services</Link><span className="sv-count">Artimist / {s.name}</span></div>
        <div className="sv-hero-copy"><div className="sv-kicker">{s.motion ? "Motion / Film / Walkthrough" : "Visualization / Selected service"}</div><h1>{s.h1}</h1><p className="sv-tagline">{s.tagline}</p><p className="sv-lead">{s.intro.split(". ")[0]}.</p></div>
        <span className="sv-scroll">Scroll to enter the work</span>
      </section>

      <div className="sv-shell">
        <section className="sv-intro"><div className="sv-intro-label">01 / Why this matters</div><div className="sv-intro-copy">The image is not decoration. It is where a project becomes understandable, believable and easier to approve.</div></section>
        <section className="sv-proof-rail" aria-label={`${s.name} selected work`}>{s.gallery.map((visual) => <figure key={visual.src}><img src={visual.src} alt={visual.alt} width="1400" height="1000" loading="lazy" decoding="async" /><figcaption>{visual.caption}</figcaption></figure>)}</section>
        <section className="sv-story">{s.sections.map((sec,index) => <article className="sv-story-row" key={sec.h}><div className="sv-story-no">0{index + 1}</div><figure className="sv-story-visual"><img src={s.gallery[index % s.gallery.length].src} alt="" width="1200" height="900" loading="lazy" decoding="async" /></figure><div className="sv-story-copy"><h2>{sec.h}</h2><p>{sec.p.split(". ")[0]}.</p></div></article>)}</section>
        {s.motion && <section className="sv-motion"><div className="sv-motion-stage"><video autoPlay muted loop playsInline preload="metadata" poster={s.motion.poster}><source src={s.motion.src} type="video/mp4" /></video><div className="sv-motion-overlay"><div><span>Motion study / Playing</span><h2>{s.motion.title}</h2></div></div></div></section>}
        <section className="sv-included"><div className="sv-included-head"><div className="sv-kicker">02 / Deliverables</div><h2>What can leave the studio.</h2></div><div className="sv-items">{s.items.map((item,index) => <div className="sv-item" key={item}><span>{item}</span><small>0{index + 1}</small></div>)}</div></section>
      </div>

      <section className="sv-closing"><img src={s.gallery[0]?.src || s.image} alt="" aria-hidden="true" /><div className="sv-shell sv-closing-copy"><p>Bring the drawings, model or early idea.</p><h2>We will make it feel real enough to decide.</h2><Link className="sv-primary" href="/contact">Start a project <UiIcon name="arrow" size={15} /></Link></div></section>

      <section className="sv-shell sv-related"><div className="sv-related-head"><div><div className="sv-kicker">03 / Continue</div><h2>Related studio services</h2></div></div><div className="sv-related-grid">{others.map((other,index) => <Link className="sv-related-card" href={`/services/${other.slug}`} key={other.slug}><small>0{index + 1}</small><strong>{other.name}</strong><UiIcon name="arrow" size={15} /></Link>)}</div></section>
    </main>
  );
}
