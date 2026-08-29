import Link from "next/link";

const BASE = "https://www.artimistproductions.com";

type RelatedLink = { href: string; label: string };
type GalleryItem = { src: string; alt: string; caption: string };

const SUPPLEMENTAL_VISUALS: Record<string, GalleryItem[]> = {
  "bowl-stroke": [
    { src: "/media/generated-architecture/artimist-architecture-014.webp", alt: "Blue-hour brick hospitality venue exterior", caption: "Arrival and exterior identity study" },
    { src: "/media/generated-architecture/artimist-architecture-016.webp", alt: "Longitudinal section through a brick hospitality venue", caption: "Hospitality program and sectional relationship" },
    { src: "/media/generated-architecture/artimist-architecture-074.webp", alt: "Warm repaired-brick hospitality bar interior", caption: "Material, lighting and bar atmosphere study" },
  ],
  "harmonic-horizons": [
    { src: "/media/generated-architecture/artimist-architecture-055.webp", alt: "Fan-shaped learning auditorium architectural plan", caption: "Auditorium program and circulation plan" },
    { src: "/media/generated-architecture/artimist-architecture-010.webp", alt: "Auditorium sightline and acoustic section", caption: "Sightline, section and acoustic study" },
    { src: "/media/editorial/sound-to-form.webp", alt: "Sound-to-form architectural research board", caption: "Research translated into architectural form" },
  ],
  "us-permit-documentation": [
    { src: "/media/generated-architecture/artimist-architecture-012.webp", alt: "Backyard studio permit drawing set", caption: "Permit package hierarchy and sheet organization" },
    { src: "/media/generated-architecture/artimist-architecture-003.webp", alt: "Accessible neighborhood clinic floor plan", caption: "Coordinated plan information" },
    { src: "/media/generated-architecture/artimist-architecture-022.webp", alt: "Accessibility construction detail sheet", caption: "Technical details and review information" },
  ],
  "residential-visualization": [
    { src: "/media/generated-architecture/artimist-architecture-015.webp", alt: "Blue-hour residential living and dining interior", caption: "Evening atmosphere and material study" },
    { src: "/media/generated-architecture/artimist-architecture-050.webp", alt: "Warm residential dining view toward an oak media wall", caption: "Spatial continuity and furniture scale" },
    { src: "/media/generated-architecture/artimist-architecture-089.webp", alt: "Warm oak kitchen beyond a contemporary living room", caption: "Kitchen, living and daylight relationship" },
  ],
  "parametric-canopy-studies": [
    { src: "/media/generated-architecture/artimist-architecture-083.webp", alt: "Timber grid-shell canopy structure and details", caption: "Repeatable structural geometry" },
    { src: "/media/editorial/kinetic-roof-technical.webp", alt: "Kinetic origami roof computational design plate", caption: "Parametric rules and form development" },
    { src: "/media/generated-architecture/artimist-architecture-054.webp", alt: "Exploded low-carbon pavilion assembly", caption: "Material logic and buildable assembly" },
  ],
  "connected-learning-auditorium": [
    { src: "/media/generated-architecture/artimist-architecture-055.webp", alt: "Fan-shaped learning auditorium plan", caption: "Learning, gathering and circulation plan" },
    { src: "/media/generated-architecture/artimist-architecture-010.webp", alt: "Learning auditorium sightline and acoustic section", caption: "Public space, sightline and acoustic section" },
    { src: "/media/editorial/sound-to-form.webp", alt: "Architectural research and auditorium form-development board", caption: "Urban idea translated into spatial experience" },
  ],
  "home-interior-design": [
    { src: "/media/generated-architecture/artimist-architecture-015.webp", alt: "Blue-hour living and dining room visualization", caption: "Evening lighting and whole-home material language" },
    { src: "/media/generated-architecture/artimist-architecture-050.webp", alt: "Dining and living space with warm oak joinery", caption: "Furniture, joinery and circulation study" },
    { src: "/media/generated-architecture/artimist-architecture-089.webp", alt: "Warm oak kitchen connected to the living room", caption: "Kitchen and social-space continuity" },
  ],
  "permit-application-packages": [
    { src: "/media/generated-architecture/artimist-architecture-012.webp", alt: "Residential studio permit plans and elevations", caption: "Plans, elevations and submission hierarchy" },
    { src: "/media/generated-architecture/artimist-architecture-003.webp", alt: "Accessible building floor plan drawing", caption: "Legible plan-review information" },
    { src: "/media/generated-architecture/artimist-architecture-022.webp", alt: "Accessible construction detail sheet", caption: "Code-related details and coordination" },
  ],
  "residential-exterior-design": [
    { src: "/media/generated-architecture/artimist-architecture-035.webp", alt: "Compact lime-rendered courtyard house exterior", caption: "Massing, courtyard and material study" },
    { src: "/media/generated-architecture/artimist-architecture-019.webp", alt: "Brick townhouse with a contemporary courtyard extension", caption: "Existing character and contemporary intervention" },
    { src: "/media/generated-architecture/artimist-architecture-063.webp", alt: "Modest brick garden pavilion in a landscaped setting", caption: "Architecture and landscape relationship" },
  ],
  "rv-park-design": [
    { src: "/media/generated-architecture/artimist-architecture-056.webp", alt: "Forest RV park circulation plan", caption: "Loop circulation and shared landscape" },
    { src: "/media/generated-architecture/artimist-architecture-057.webp", alt: "Forest RV park masterplan", caption: "Pad orientation, privacy and central green" },
    { src: "/media/generated-architecture/artimist-architecture-091.webp", alt: "Woodland RV park architectural presentation board", caption: "Landscape, pavilion and planning studies" },
  ],
};

export type ProjectCaseStudyProps = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  region: string;
  hero: GalleryItem;
  services: string[];
  brief: string;
  approach: string[];
  deliverables: string[];
  demonstrates: string;
  gallery: GalleryItem[];
  related: RelatedLink[];
  note?: string;
};

const CSS = `
.cs{--ink:#0a0909;--paper:#eee8e3;--muted:#a89d97;--line:rgba(255,255,255,.11);--accent:#c85167;min-height:100vh;background:radial-gradient(circle at 82% 5%,rgba(126,26,46,.14),transparent 26%),var(--ink);color:var(--paper);padding-top:78px;font-family:Arial,Helvetica,sans-serif;line-height:1.62;overflow:hidden}.cs *{box-sizing:border-box}.cs a{color:inherit}.cs-wrap{width:min(1320px,calc(100% - 56px));margin:0 auto}.cs-crumb{padding:23px 0 17px;color:#857b76;font-size:11px;letter-spacing:.04em}.cs-crumb a{text-decoration:none}.cs-kicker{font-size:9px;line-height:1.3;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);font-weight:700}.cs h1,.cs h2,.cs h3{font-family:Georgia,'Times New Roman',serif;font-weight:400}.cs-hero{position:relative;min-height:calc(100svh - 118px);display:flex;align-items:flex-end;margin-bottom:34px;overflow:hidden;border:1px solid var(--line);background:#111}.cs-hero-media{position:absolute;inset:0;margin:0}.cs-hero-media img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.005)}.cs-hero-media:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,4,5,.05) 0%,rgba(4,4,5,.18) 34%,rgba(5,4,5,.88) 100%),linear-gradient(90deg,rgba(5,4,5,.7) 0%,rgba(5,4,5,.08) 68%)}.cs-hero-caption{position:absolute;z-index:2;top:20px;right:20px;padding:8px 10px;background:rgba(8,7,8,.72);backdrop-filter:blur(8px);color:rgba(255,255,255,.62);font-size:8px;letter-spacing:.12em;text-transform:uppercase}.cs-hero-copy{position:relative;z-index:2;width:min(880px,78%);padding:clamp(34px,5vw,74px)}.cs-hero h1{font-size:clamp(54px,7.6vw,112px);line-height:.88;letter-spacing:-.055em;margin:14px 0 22px;max-width:12ch;text-wrap:balance}.cs-summary{margin:0;max-width:60ch;font-size:clamp(16px,1.45vw,21px);color:rgba(255,255,255,.76)}.cs-meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:26px}.cs-meta span{border:1px solid rgba(255,255,255,.16);background:rgba(7,6,7,.34);backdrop-filter:blur(8px);padding:7px 10px;color:rgba(255,255,255,.72);font-size:9px;letter-spacing:.08em;text-transform:uppercase}.cs-chapter-nav{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:0 0 34px}.cs-chapter-nav::-webkit-scrollbar{display:none}.cs-chapter-nav a{flex:0 0 auto;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.18);padding:10px 20px 10px 0;color:rgba(255,255,255,.54);font-size:9px;letter-spacing:.14em;text-transform:uppercase;transition:color .2s ease,border-color .2s ease}.cs-chapter-nav a:hover{color:#fff;border-color:var(--accent)}.cs-section{padding:74px 0;border-top:1px solid var(--line)}.cs-section-head{display:grid;grid-template-columns:120px minmax(0,1fr);gap:28px;align-items:start;margin-bottom:34px}.cs-section-head h2{margin:0;font-size:clamp(38px,5vw,66px);line-height:.96;letter-spacing:-.04em;max-width:13ch}.cs-brief-grid{display:grid;grid-template-columns:.75fr 1.25fr;gap:clamp(34px,7vw,100px);align-items:start}.cs-brief-copy{position:sticky;top:110px}.cs-brief-copy p{margin:22px 0 0;color:#b9ada7;font-size:17px;max-width:60ch}.cs-visual-pair{display:grid;grid-template-columns:1.08fr .92fr;gap:12px}.cs-visual-card{position:relative;margin:0;min-height:440px;overflow:hidden;border:1px solid var(--line);background:#161314}.cs-visual-card:nth-child(2){margin-top:72px;min-height:350px}.cs-visual-card img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .4s ease;filter:saturate(.9) contrast(1.02)}.cs-visual-card:hover img{transform:scale(1.018);filter:saturate(1) contrast(1.04)}.cs-visual-card figcaption,.cs-record figure figcaption{position:absolute;z-index:2;left:12px;bottom:12px;max-width:calc(100% - 24px);padding:7px 9px;background:rgba(8,7,8,.78);backdrop-filter:blur(8px);font-size:8px;line-height:1.35;letter-spacing:.11em;text-transform:uppercase;color:rgba(255,255,255,.72)}.cs-approach{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.cs-step{min-height:290px;padding:32px;background:#0d0b0c;display:flex;flex-direction:column;transition:background .25s ease}.cs-step:hover{background:#141011}.cs-step b{display:block;color:var(--accent);font-size:9px;letter-spacing:.16em;text-transform:uppercase}.cs-step h3{font-size:28px;line-height:1.08;margin:46px 0 14px}.cs-step p{margin:auto 0 0;color:#aaa09a;font-size:14px}.cs-feature-frame{position:relative;margin:0;min-height:68vw;max-height:850px;overflow:hidden;border:1px solid var(--line);background:#141112}.cs-feature-frame img{display:block;width:100%;height:100%;min-height:inherit;object-fit:cover}.cs-feature-frame:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(6,5,6,.72))}.cs-feature-frame figcaption{position:absolute;z-index:2;left:24px;bottom:22px;color:#fff;font-family:Georgia,serif;font-size:clamp(22px,2.4vw,34px);max-width:28ch}.cs-scope-grid{display:grid;grid-template-columns:.55fr 1fr;gap:70px;align-items:start}.cs-scope-grid h2{font-size:clamp(38px,5vw,64px);line-height:.98;letter-spacing:-.04em;margin:8px 0 0}.cs-list{display:grid;grid-template-columns:1fr 1fr;list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}.cs-list li{position:relative;min-height:88px;padding:20px 34px 20px 0;border-bottom:1px solid var(--line);color:#cbc0ba;font-size:14px}.cs-list li:nth-child(odd){margin-right:20px}.cs-list li:before{content:'';position:absolute;right:8px;top:50%;width:20px;height:1px;background:rgba(200,81,103,.72)}.cs-record-head{display:grid;grid-template-columns:.58fr 1fr;gap:70px;align-items:end;margin-bottom:34px}.cs-record-head h2{font-size:clamp(42px,5.8vw,76px);line-height:.92;letter-spacing:-.045em;margin:8px 0 0}.cs-record-head p{margin:0;color:#998f89;max-width:58ch}.cs-record{display:grid;grid-template-columns:repeat(12,1fr);gap:12px}.cs-record figure{position:relative;margin:0;grid-column:span 6;min-height:430px;overflow:hidden;border:1px solid var(--line);background:#141112}.cs-record figure:nth-child(3n+1){grid-column:span 7}.cs-record figure:nth-child(3n+2){grid-column:span 5}.cs-record img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}.cs-record figure:hover img{transform:scale(1.018)}.cs-proof{display:grid;grid-template-columns:.38fr 1fr;gap:70px;padding:56px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.cs-proof p{font-family:Georgia,'Times New Roman',serif;font-size:clamp(27px,3.5vw,48px);line-height:1.18;letter-spacing:-.025em;margin:0;color:#dfd5cf}.cs-note{grid-column:2;margin-top:18px;padding:14px 0;border-top:1px solid rgba(200,81,103,.38);color:#968b85;font-size:12px;max-width:70ch}.cs-related{display:grid;grid-template-columns:.5fr 1fr;gap:70px;align-items:start}.cs-related h2{font-size:clamp(36px,4.6vw,60px);line-height:.98;letter-spacing:-.04em;margin:8px 0 0}.cs-related-links{display:grid;border-top:1px solid var(--line)}.cs-related-links a{position:relative;text-decoration:none;padding:18px 44px 18px 0;border-bottom:1px solid var(--line);font-family:Georgia,serif;font-size:21px;color:#cfc4be;transition:color .2s ease,padding-left .2s ease}.cs-related-links a:after{content:'';position:absolute;right:2px;top:50%;width:24px;height:1px;background:var(--accent);transform-origin:right center;transition:width .2s ease}.cs-related-links a:hover{color:#fff;padding-left:8px}.cs-related-links a:hover:after{width:38px}.cs-cta{position:relative;margin:0 0 88px;padding:clamp(48px,7vw,92px);overflow:hidden;border:1px solid var(--line);background:radial-gradient(circle at 85% 10%,rgba(169,46,68,.27),transparent 34%),#110d0f}.cs-cta .cs-kicker{margin-bottom:18px}.cs-cta h2{font-size:clamp(45px,6.6vw,86px);line-height:.91;letter-spacing:-.045em;margin:0 0 20px;max-width:11ch}.cs-cta p{max-width:55ch;margin:0 0 28px;color:#a99e98}.cs-btn{display:inline-flex;align-items:center;min-height:48px;text-decoration:none;background:#992636;color:#fff!important;padding:0 19px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.cs-btn:after{content:'';width:22px;height:1px;background:#fff;margin-left:14px;transition:width .2s ease}.cs-btn:hover:after{width:34px}@media(max-width:900px){.cs-wrap{width:min(100% - 30px,1320px)}.cs-hero{min-height:78svh}.cs-hero-copy{width:100%;padding:30px}.cs-hero h1{font-size:clamp(50px,11vw,82px)}.cs-section{padding:56px 0}.cs-section-head,.cs-brief-grid,.cs-scope-grid,.cs-record-head,.cs-proof,.cs-related{grid-template-columns:1fr;gap:24px}.cs-brief-copy{position:static}.cs-visual-pair{grid-template-columns:1fr 1fr}.cs-visual-card{min-height:360px}.cs-visual-card:nth-child(2){margin-top:38px;min-height:300px}.cs-approach{grid-template-columns:1fr}.cs-step{min-height:0}.cs-step h3{margin-top:28px}.cs-feature-frame{min-height:70vw}.cs-record figure,.cs-record figure:nth-child(3n+1),.cs-record figure:nth-child(3n+2){grid-column:span 6}.cs-proof .cs-note{grid-column:auto}.cs-related{padding-bottom:20px}}@media(max-width:620px){.cs{padding-top:68px}.cs-wrap{width:calc(100% - 24px)}.cs-crumb{font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cs-hero{min-height:72svh;margin-bottom:20px}.cs-hero-copy{padding:22px 18px 26px}.cs-hero h1{font-size:clamp(46px,13vw,64px);line-height:.9;max-width:10ch}.cs-summary{font-size:15px;max-width:36ch}.cs-meta{gap:5px;margin-top:19px}.cs-meta span{font-size:7.5px;padding:6px 8px}.cs-hero-caption{display:none}.cs-chapter-nav{padding-bottom:22px}.cs-section{padding:44px 0}.cs-section-head{grid-template-columns:1fr;gap:10px}.cs-section-head h2{font-size:39px}.cs-brief-copy p{font-size:15px}.cs-visual-pair{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;margin-right:-12px;padding-right:12px;scrollbar-width:none}.cs-visual-pair::-webkit-scrollbar{display:none}.cs-visual-card,.cs-visual-card:nth-child(2){flex:0 0 82vw;min-height:66vw;margin:0;scroll-snap-align:center}.cs-approach{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;background:transparent;border:0;margin-right:-12px;padding-right:12px;scrollbar-width:none}.cs-approach::-webkit-scrollbar{display:none}.cs-step{flex:0 0 80vw;min-height:300px;border:1px solid var(--line);scroll-snap-align:center}.cs-feature-frame{min-height:112vw;margin-left:-12px;margin-right:-12px}.cs-feature-frame figcaption{left:16px;bottom:16px;font-size:23px}.cs-list{grid-template-columns:1fr}.cs-list li:nth-child(odd){margin-right:0}.cs-record-head h2{font-size:44px}.cs-record{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-12px;padding-right:12px;scrollbar-width:none}.cs-record::-webkit-scrollbar{display:none}.cs-record figure,.cs-record figure:nth-child(3n+1),.cs-record figure:nth-child(3n+2){flex:0 0 84vw;min-height:74vw;scroll-snap-align:center}.cs-proof{padding:44px 0}.cs-related-links a{font-size:19px}.cs-cta{margin-left:-12px;margin-right:-12px;margin-bottom:72px;padding:44px 24px}.cs-cta h2{font-size:48px}}
@media(prefers-reduced-motion:reduce){.cs-visual-card img,.cs-record img,.cs-btn:after,.cs-related-links a,.cs-related-links a:after{transition:none!important}}
`;

export function ProjectCaseStudy(props: ProjectCaseStudyProps) {
  const url = `${BASE}/case-studies/${props.slug}`;
  const fullGallery = [...props.gallery, ...(SUPPLEMENTAL_VISUALS[props.slug] ?? [])];
  const openingVisuals = fullGallery.slice(0, 2);
  const featureVisual = fullGallery[2] ?? fullGallery[0] ?? props.hero;
  const recordVisuals = fullGallery.slice(3);
  const visibleRecord = recordVisuals.length ? recordVisuals : fullGallery.slice(1);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: props.title,
        description: props.summary,
        url,
        creator: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Artimist Productions", url: BASE },
        about: props.services,
        spatialCoverage: props.region,
        image: [props.hero.src, ...fullGallery.map((item) => item.src)].map((src) => `${BASE}${src}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${BASE}/case-studies` },
          { "@type": "ListItem", position: 3, name: props.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="cs">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="cs-wrap">
        <nav className="cs-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/case-studies">Case Studies</Link> / {props.title}</nav>

        <section className="cs-hero" aria-labelledby="case-study-title">
          <figure className="cs-hero-media">
            <img src={props.hero.src} alt={props.hero.alt} width="1800" height="1200" fetchPriority="high" />
            <figcaption className="cs-hero-caption">{props.hero.caption}</figcaption>
          </figure>
          <div className="cs-hero-copy">
            <div className="cs-kicker">{props.eyebrow}</div>
            <h1 id="case-study-title">{props.title}</h1>
            <p className="cs-summary">{props.summary}</p>
            <div className="cs-meta"><span>{props.region}</span>{props.services.map((service) => <span key={service}>{service}</span>)}</div>
          </div>
        </section>

        <nav className="cs-chapter-nav" aria-label="Case study chapters">
          <a href="#brief">01 / Brief</a><a href="#approach">02 / Approach</a><a href="#scope">03 / Scope</a><a href="#record">04 / Visual record</a><a href="#proof">05 / Outcome</a>
        </nav>

        <section className="cs-section cs-brief-grid" id="brief">
          <div className="cs-brief-copy">
            <div className="cs-kicker">01 / Project brief</div>
            <h2 style={{ fontSize: "clamp(40px,5vw,66px)", lineHeight: ".98", letterSpacing: "-.04em", margin: "10px 0 0" }}>What the work needed to resolve.</h2>
            <p>{props.brief}</p>
          </div>
          <div className="cs-visual-pair">
            {openingVisuals.map((item) => <figure className="cs-visual-card" key={item.src}><img src={item.src} alt={item.alt} width="1448" height="1086" loading="lazy" decoding="async" /><figcaption>{item.caption}</figcaption></figure>)}
          </div>
        </section>

        <section className="cs-section" id="approach">
          <div className="cs-section-head"><div className="cs-kicker">02 / Approach</div><h2>Design decisions, not filler.</h2></div>
          <div className="cs-approach">
            {props.approach.map((item, index) => <article className="cs-step" key={item}><b>0{index + 1}</b><h3>{index === 0 ? "Set the direction" : index === 1 ? "Resolve the system" : "Make it communicable"}</h3><p>{item}</p></article>)}
          </div>
        </section>

        <figure className="cs-feature-frame">
          <img src={featureVisual.src} alt={featureVisual.alt} width="1800" height="1200" loading="lazy" decoding="async" />
          <figcaption>{featureVisual.caption}</figcaption>
        </figure>

        <section className="cs-section cs-scope-grid" id="scope">
          <div><div className="cs-kicker">03 / Scope</div><h2>What moved from idea into delivery.</h2></div>
          <ul className="cs-list">{props.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="cs-section" id="record">
          <div className="cs-record-head"><div><div className="cs-kicker">04 / Project visual record</div><h2>Design, detail and atmosphere.</h2></div><p>Selected project views connect the finished presentation with the drawings, material thinking and spatial decisions behind it.</p></div>
          <div className="cs-record">{visibleRecord.map((item) => <figure key={item.src}><img src={item.src} alt={item.alt} width="1448" height="1086" loading="lazy" decoding="async" /><figcaption>{item.caption}</figcaption></figure>)}</div>
        </section>

        <section className="cs-section" id="proof">
          <div className="cs-proof"><div className="cs-kicker">05 / What this demonstrates</div><p>{props.demonstrates}</p>{props.note ? <div className="cs-note">{props.note}</div> : null}</div>
        </section>

        <section className="cs-section cs-related">
          <div><div className="cs-kicker">Connected expertise</div><h2>Continue through the relevant services.</h2></div>
          <div className="cs-related-links">{props.related.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        </section>

        <section className="cs-cta"><div className="cs-kicker">Start with the real project</div><h2>Have a similar problem to solve?</h2><p>Send the current plans, survey, model, reference material or early brief. Artimist can review the information and define the right design, visualization or documentation scope.</p><Link className="cs-btn" href="/contact">Discuss your project</Link></section>
      </div>
    </main>
  );
}
