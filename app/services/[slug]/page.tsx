import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Service = { slug: string; name: string; h1: string; title: string; desc: string; tagline: string; intro: string; sections: { h: string; p: string }[]; items: string[] };

const SERVICES: Service[] = [
  {
    slug: "architectural-rendering", name: "Architectural Rendering", h1: "Architectural Rendering Services",
    title: "Architectural Rendering Services | 3D Exterior Renders",
    desc: "Photorealistic architectural rendering for architects, developers and builders. Exterior and interior 3D renders that communicate design intent before construction begins.",
    tagline: "Photorealistic images of buildings that do not exist yet.",
    intro: "We produce high-end architectural renderings that let clients, investors and planning boards see a building the way it will actually feel — light, material, atmosphere and context, resolved before a single foundation is poured.",
    sections: [{ h: "What you receive", p: "Still images at print and presentation resolution, delivered in the aspect ratios you need: hero exteriors, entry approaches, key interiors, dusk and daylight variants, and context views that place the building in its real surroundings." }, { h: "How we work", p: "We start from your drawings — Revit, CAD, SketchUp or a massing model — and build an accurate 3D scene. Materials, lighting and landscape are set to match the design intent, then reviewed with you at low resolution before final rendering." }, { h: "Where it is used", p: "Planning and permit submissions, investor and board presentations, pre-construction sales, competition boards, and marketing collateral for launches." }],
    items: ["Exterior architectural renders", "Interior renders", "Dusk, daylight and night variants", "Aerial and context views", "Site and landscape integration", "Print-resolution delivery"],
  },
  {
    slug: "3d-interior-rendering", name: "3D Interior Rendering", h1: "3D Interior Rendering",
    title: "3D Interior Rendering Services | Interior Visualization",
    desc: "3D interior rendering and interior visualization for designers, developers and hospitality brands. Photoreal rooms with accurate materials, lighting and furniture.",
    tagline: "Rooms you can feel before they are built.",
    intro: "Interior visualization is where material and light do the persuading. We render interiors at a level of finish where a client can judge a stone, a fabric or a lighting temperature and make a real decision from the image.",
    sections: [{ h: "What you receive", p: "Room-by-room interior renders with correct furniture, finishes and fixtures. Options are rendered as variants so the same camera can show alternative palettes, layouts or lighting states side by side." }, { h: "How we work", p: "We build from your plans and FF&E schedule. Where a specified product exists, we model it accurately; where it is still open, we render a considered stand-in and mark it clearly so nothing is misrepresented." }, { h: "Where it is used", p: "Design review and client sign-off, residential and hospitality marketing, showroom and sales-suite display, and finish-selection meetings." }],
    items: ["Living, kitchen and bedroom sets", "Hospitality and F&B interiors", "Material and palette variants", "Lighting state studies", "FF&E-accurate modelling", "Detail and vignette shots"],
  },
  {
    slug: "real-estate-rendering", name: "Real Estate Rendering", h1: "Real Estate Rendering for Developers",
    title: "Real Estate Rendering & 3D Marketing for Developers",
    desc: "Real estate rendering and 3D visualization for property developers: pre-construction marketing imagery, sales-suite visuals and investor presentation renders.",
    tagline: "Sell the building before it exists.",
    intro: "Pre-construction sales depend entirely on imagery. We produce the visual package a development needs to open sales — hero shots, amenity spaces, unit interiors and lifestyle context — consistent in style across every asset.",
    sections: [{ h: "What you receive", p: "A coordinated marketing set: signature exterior hero, amenity and lobby spaces, representative unit interiors, aerial context, and crops sized for brochure, hoarding, web and paid social." }, { h: "How we work", p: "We treat the development as one visual identity rather than a pile of unrelated images. Camera language, time of day, styling and colour grade stay consistent so the campaign reads as a single confident product." }, { h: "Where it is used", p: "Sales centres and hoardings, brochures and websites, investor decks, listing platforms and launch advertising." }],
    items: ["Pre-construction marketing imagery", "Amenity and lobby visualization", "Unit interior sets", "Aerial and masterplan views", "Brochure and web crops", "Consistent campaign art direction"],
  },
  {
    slug: "architectural-animation", name: "Architectural Animation", h1: "Architectural Animation & Walkthroughs",
    title: "Architectural Animation & 3D Walkthrough Videos",
    desc: "Architectural animation, 3D walkthrough videos and cinematic flythroughs for developments, competitions and investor presentations.",
    tagline: "Move through the building before it is built.",
    intro: "Animation shows what a still cannot: sequence, scale and the experience of moving through a space. We produce cinematic architectural films and walkthroughs that carry a project's atmosphere, not just its geometry.",
    sections: [{ h: "What you receive", p: "Edited films with camera choreography, sound design and colour grade — delivered in the durations and formats you need, from a 90-second flagship film to short vertical cuts for social." }, { h: "How we work", p: "We storyboard the route first so the film argues for the design rather than wandering through it. Camera moves, reveals and pacing are agreed before render time is spent." }, { h: "Where it is used", p: "Launch campaigns, competition submissions, investor and board presentations, exhibition loops and social advertising." }],
    items: ["Cinematic architectural films", "3D walkthroughs and flythroughs", "Storyboarded camera choreography", "Sound design and colour grade", "Vertical and social cuts", "Exhibition loops"],
  },
];

const CSS = ".sv-root{position:relative;min-height:100vh;background:#0b090a;color:#ece7e2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.6} .sv-root::before{content:'';position:fixed;inset:0;pointer-events:none;background:radial-gradient(1100px 620px at 50% -8%,rgba(153,38,54,.30),rgba(20,13,14,0) 60%),radial-gradient(820px 640px at 88% 12%,rgba(70,22,34,.22),transparent 55%),linear-gradient(180deg,#130c0e,#0b090a 55%)} .sv-root>*{position:relative} .sv-root h1,.sv-root h2,.sv-root h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;margin:0} .sv-kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#c9536a;font-weight:600} .sv-wrap{max-width:820px;margin:0 auto;padding:0 40px} .sv-back{display:inline-block;color:#9a8f89;font-size:12px;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;padding:26px 0} .sv-back:hover{color:#ece7e2} .sv-hero{padding:60px 0 44px;text-align:center;border-bottom:1px solid rgba(255,255,255,.08)} .sv-hero h1{font-size:60px;line-height:1.03;margin:16px 0 18px} .sv-tagline{font-family:Georgia,serif;font-size:26px;color:#e6dcd7;font-style:italic} .sv-lead{font-size:22px;line-height:1.55;color:#d8d1cc;padding:46px 0 10px;text-align:center;font-family:Georgia,serif} .sv-body{padding:40px 0} .sv-sec{margin-bottom:38px} .sv-sec h2{font-size:26px;margin-bottom:10px} .sv-sec p{color:#9a8f89;font-size:16px;max-width:70ch;margin:0 auto} .sv-items-wrap{padding:14px 0 48px;border-top:1px solid rgba(255,255,255,.08);text-align:center} .sv-items{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;justify-content:center} .sv-item{border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:9px 18px;font-size:13px;color:#cdc4bf} .sv-cta-row{padding:0 0 60px;text-align:center} .sv-cta{display:inline-block;background:#992636;color:#fff;text-decoration:none;padding:16px 36px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;border-radius:40px} .sv-cta:hover{filter:brightness(1.15)} .sv-more{padding:34px 0 110px;border-top:1px solid rgba(255,255,255,.08);text-align:center} .sv-more-links{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:18px} .sv-more-links a{color:#cdc4bf;text-decoration:none;border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:10px 20px;font-size:14px} .sv-more-links a:hover{border-color:#992636;color:#fff} @media(max-width:760px){.sv-hero h1{font-size:40px}.sv-wrap{padding:0 22px}}";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title, description: s.desc, alternates: { canonical: "/services/" + s.slug } };
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
    provider: { "@type": "Organization", name: "Artimist Production", url: "https://www.artimistproductions.com" },
    areaServed: ["United States", "Canada", "United Kingdom", "Worldwide"],
    url: "https://www.artimistproductions.com/services/" + s.slug,
  };
  return (
    <main className="sv-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="sv-wrap">
        <Link className="sv-back" href="/services">← All services</Link>
        <section className="sv-hero">
          <div className="sv-kicker">Service</div>
          <h1>{s.h1}</h1>
          <p className="sv-tagline">{s.tagline}</p>
        </section>
        <p className="sv-lead">{s.intro}</p>
        <div className="sv-body">
          {s.sections.map((sec) => (
            <div className="sv-sec" key={sec.h}><h2>{sec.h}</h2><p>{sec.p}</p></div>
          ))}
        </div>
        <div className="sv-items-wrap">
          <div className="sv-kicker">Included</div>
          <div className="sv-items">{s.items.map((i) => <span className="sv-item" key={i}>{i}</span>)}</div>
        </div>
        <div className="sv-cta-row"><a className="sv-cta" href="/contact">Start a project →</a></div>
        <div className="sv-more">
          <div className="sv-kicker">Related services</div>
          <div className="sv-more-links">
            {others.map((o) => <Link href={"/services/" + o.slug} key={o.slug}>{o.name}</Link>)}
          </div>
        </div>
      </div>
    </main>
  );
}
