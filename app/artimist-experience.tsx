"use client";

import type { CSSProperties, FormEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project, SiteSettings, TeamMember, Testimonial } from "../lib/content";
import { getStudioOffices, serviceWorlds as defaultServices } from "../lib/content";
import { residentialChapters, technicalBoards } from "../lib/visual-content";

type ExperienceProps = {
  projects: Project[];
  team: TeamMember[];
  testimonials: Testimonial[];
  settings: SiteSettings;
};

const filters = ["All", "Space", "Image", "Identity", "Digital", "Technical", "Lab"];
const heroDisciplines = ["Architecture", "Interiors", "Visualization", "Motion", "Branding", "Digital Production"];
const teamPortraitFraming: Record<string, { scale: string; x: string; y: string }> = {
  "Faizan Aziz": { scale: "1.2", x: "0%", y: "11%" },
  "Mahnoor Shiekh": { scale: "1.18", x: "-12%", y: "10%" },
  "Jannat Niaz": { scale: "1.23", x: "0%", y: "10%" },
  "Aden Mansoor": { scale: "1.16", x: "-4%", y: "6%" },
  "Sufyan Ilyas": { scale: "1.08", x: "0%", y: "2%" },
  "Zarmeen Khan": { scale: "1.12", x: "0%", y: "7%" },
  "Abdur Rehman": { scale: "1.04", x: "0%", y: "2%" },
  "Farwa Kashif": { scale: "1.08", x: "0%", y: "2%" },
  "Hanan Shahid": { scale: "1.04", x: "0%", y: "2%" },
  "Rohma Fatima": { scale: "1.04", x: "0%", y: "1%" },
  "Eunica Amir": { scale: "1.04", x: "0%", y: "2%" },
  "Shumail": { scale: "1.05", x: "0%", y: "2%" },
  "Ezza Shahid": { scale: "1.2", x: "0%", y: "2%" },
};

type WalkthroughMoment = {
  src: string;
  label: string;
  fit?: "cover" | "contain";
  position?: string;
};

const residentialMoments: WalkthroughMoment[] = residentialChapters.flatMap((chapter) => chapter.scenes.map((scene) => ({
  src: scene.src,
  label: `${chapter.title} / ${scene.label}`,
})));

const projectWalkthroughs: Record<string, WalkthroughMoment[]> = {
  "bowl-stroke": [
    { src: "/media/motion/bowl-stroke-teaser.mp4", label: "Motion / Arrival" },
    { src: "/media/atlas/atlas-01.webp", label: "Exterior / Night" },
    { src: "/media/atlas/atlas-02.webp", label: "Arrival / Street" },
    { src: "/media/atlas/atlas-03.webp", label: "Interior / Social room" },
    { src: "/media/atlas/atlas-04.webp", label: "Interior / Dining" },
    { src: "/media/atlas/atlas-05.webp", label: "Interior / Private room" },
  ],
  "harmonic-horizons": [
    { src: "/media/motion/music-campus-teaser.mp4", label: "Motion / Campus sequence" },
    { src: "/media/projects/music-campus.webp", label: "Campus / Khanpur Dam" },
    { src: "/media/walkthrough/music/campus-overview.webp", label: "Architecture / Overview", fit: "contain" },
    { src: "/media/walkthrough/music/campus-interior.webp", label: "Interior / Living with landscape", fit: "contain" },
    { src: "/media/walkthrough/music/campus-threshold.webp", label: "Threshold / Back to the lake", fit: "contain" },
  ],
  "alaskan-made": [
    { src: "/media/projects/alaskan-made.webp", label: "Brand / Overview" },
    { src: "/media/walkthrough/alaskan/identity.webp", label: "Identity / Visual language" },
    { src: "/media/walkthrough/alaskan/packaging.webp", label: "Product / Packaging" },
    { src: "/media/walkthrough/alaskan/apparel.webp", label: "System / Apparel" },
    { src: "/media/walkthrough/alaskan/campaign.webp", label: "Campaign / Social content" },
  ],
  "parametric-canopy-studies": [
    { src: "/media/walkthrough/canopy/pavilion-sunset.webp", label: "Pavilion / Final atmosphere" },
    { src: "/media/technical/board-01.webp", label: "Logic / Concept", fit: "contain" },
    { src: "/media/technical/board-03.webp", label: "System / Parametric workflow", fit: "contain" },
    { src: "/media/technical/board-05.webp", label: "Study / Iterations", fit: "contain" },
    { src: "/media/walkthrough/canopy/pavilion-day.webp", label: "Pavilion / Human scale" },
  ],
  "connected-learning-auditorium": [
    { src: "/media/projects/auditorium.webp", label: "Public auditorium / Overview" },
    { src: "/media/walkthrough/auditorium/brief.webp", label: "Brief / Civic purpose" },
    { src: "/media/walkthrough/auditorium/context.webp", label: "Site / Environmental response" },
    { src: "/media/walkthrough/auditorium/masterplan.webp", label: "Strategy / Masterplan" },
    { src: "/media/walkthrough/auditorium/plans.webp", label: "Drawing / Plan and circulation" },
  ],
  "us-permit-documentation": [
    { src: "/media/projects/permit-sets.webp", label: "Permit package / Overview", fit: "contain" },
    { src: "/media/walkthrough/permit/code-review.webp", label: "Review / Code coordination", fit: "contain" },
    { src: "/media/walkthrough/permit/workflow.webp", label: "Method / Package workflow", fit: "contain" },
    { src: "/media/walkthrough/permit/package.webp", label: "Sheets / Coordinated set", fit: "contain" },
    { src: "/media/walkthrough/permit/sheets.webp", label: "Delivery / Construction information", fit: "contain" },
  ],
  "residential-visualization": [
    { src: "/media/motion/residential-build.mp4", label: "Motion / Ground to reality" },
    ...residentialMoments,
  ],
  "identity-systems": [
    { src: "/media/projects/logo-systems.webp", label: "Identity / Selected marks", fit: "contain" },
    { src: "/media/walkthrough/identity/marks.webp", label: "Collection / Identity marks", fit: "contain" },
    { src: "/media/walkthrough/identity/applications.webp", label: "Systems / Applications", fit: "contain" },
    { src: "/media/walkthrough/identity/process.webp", label: "Process / Exploration", fit: "contain" },
    { src: "/media/walkthrough/identity/collection.webp", label: "Archive / Curated collection", fit: "contain" },
  ],
  "digital-collectible-system": [
    { src: "/media/projects/digital-collectibles.webp", label: "Digital / Character system", fit: "contain" },
    { src: "/media/walkthrough/digital/character-system.webp", label: "Design / Character logic", fit: "contain" },
    { src: "/media/walkthrough/digital/collection.webp", label: "Product / Final collection", fit: "contain" },
  ],
};

function isVideo(src: string) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function walkthroughFor(project: Project): WalkthroughMoment[] {
  const curated = projectWalkthroughs[project.slug];
  if (curated?.length) return curated;

  const source = project.gallery.length ? project.gallery : [project.image];
  const unique = source.filter((item, index) => source.indexOf(item) === index);
  const moments = unique.map((src, index) => ({ src, label: `View / ${String(index + 1).padStart(2, "0")}` }));
  if (moments.length !== 1 || isVideo(moments[0].src)) return moments;

  return [
    { ...moments[0], label: "Overview / Full composition", fit: "contain" },
    { ...moments[0], label: "Detail / Upper field", fit: "cover", position: "center 22%" },
    { ...moments[0], label: "Detail / Lower field", fit: "cover", position: "center 78%" },
  ];
}

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗︎"}</span>;
}

function Monogram({ name }: { name: string }) {
  return <span className="ed-monogram">{name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</span>;
}

function ratingDisplay(rating: number) {
  const whole = Math.floor(rating);
  return `${"★".repeat(whole)}${rating - whole >= 0.5 ? "½" : ""}`;
}

function ArchitecturalTrace({ className = "" }: { className?: string }) {
  return (
    <svg className={`ed-architectural-trace ${className}`} viewBox="0 0 760 460" fill="none" aria-hidden="true">
      <g className="ed-trace-primary">
        <path d="M62 350H704M94 388V86H626V350M154 350V168H324V350M324 350V124H568V350" />
        <path d="M94 168H568M154 250H626M324 124L458 72L626 168M324 250L458 168L626 250" />
        <path d="M201 168V350M401 124V350M505 108V350" />
      </g>
      <g className="ed-trace-secondary">
        <circle cx="458" cy="168" r="72" />
        <circle cx="458" cy="168" r="114" />
        <path d="M42 350H720M42 340V360M94 340V360M154 340V360M201 340V360M324 340V360M401 340V360M505 340V360M568 340V360M626 340V360M704 340V360" />
        <path d="M94 405H626M94 397V413M626 397V413M348 388V422M372 405H348" />
      </g>
      <g className="ed-trace-labels">
        <text x="53" y="374">A</text><text x="696" y="374">A</text><text x="334" y="440">32.40 M</text>
        <text x="108" y="106">01 / ARRIVAL</text><text x="409" y="152">CENTRAL VOID</text>
      </g>
    </svg>
  );
}

function uniqueFeatured(projects: Project[]) {
  const ordered = [...projects.filter((project) => project.featured), ...projects];
  return ordered.filter((project, index) => ordered.findIndex((item) => item.slug === project.slug) === index).slice(0, 5);
}

export function ArtimistExperience({ projects, team, testimonials, settings }: ExperienceProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [capabilityIndex, setCapabilityIndex] = useState(0);
  const [processPosition, setProcessPosition] = useState(48);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [testimonialStatus, setTestimonialStatus] = useState("");
  const [inquiryStatus, setInquiryStatus] = useState("");
  const offices = getStudioOffices(settings);

  const services = useMemo(() => {
    try {
      const parsed = JSON.parse(settings.servicesJson || "[]");
      return Array.isArray(parsed) && parsed.length ? parsed as typeof defaultServices : defaultServices;
    } catch {
      return defaultServices;
    }
  }, [settings.servicesJson]);

  const featuredProjects = useMemo(() => uniqueFeatured(projects), [projects]);
  const activeProject = featuredProjects[featureIndex] || projects[0];
  const activePreview = activeProject ? walkthroughFor(activeProject)[0] : null;
  const archiveProjects = useMemo(
    () => projects.filter((project) => filter === "All" || project.category === filter),
    [filter, projects],
  );
  const recentProjects = useMemo(
    () => [...projects].sort((a, b) => b.sortOrder - a.sortOrder).slice(0, 6),
    [projects],
  );
  const heroWorld = theme === "dark" ? {
    mode: "Night / 20:26",
    eyebrow: "Featured atmosphere / 01",
    title: "Luminous Arrival",
    meta: "Hospitality · Night architecture · 2026",
    statement: "Atmosphere begins before the door.",
    frame: "Night study / 01",
  } : {
    mode: "Day / 08:26",
    eyebrow: "Featured atmosphere / 02",
    title: "Civic Horizon",
    meta: "Public architecture · Cultural space / 2026",
    statement: "Public architecture, drawn as movement.",
    frame: "Daylight study / 02",
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("artimist-editorial-theme");
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    window.setTimeout(() => setTheme(initial), 0);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--ed-progress", String(total > 0 ? window.scrollY / total : 0));
      document.documentElement.style.setProperty("--ed-scroll", `${window.scrollY}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-seen")),
      { threshold: 0.1 },
    );
    document.querySelectorAll("[data-ed-reveal]").forEach((node) => observer.observe(node));
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches("[data-ed-reveal]")) observer.observe(node);
        node.querySelectorAll("[data-ed-reveal]").forEach((child) => observer.observe(child));
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen || selectedProject || reviewOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedProject(null);
        setReviewOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, reviewOpen, selectedProject]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("artimist-editorial-theme", next);
  }

  function tilt(event: ReactPointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--ed-ry", `${x * 3.5}deg`);
    event.currentTarget.style.setProperty("--ed-rx", `${y * -3.5}deg`);
  }

  function clearTilt(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--ed-ry", "0deg");
    event.currentTarget.style.setProperty("--ed-rx", "0deg");
  }

  async function submitTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTestimonialStatus("Submitting for studio review…");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/testimonials", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to submit your review.");
      form.reset();
      setTestimonialStatus("Received. Your review will stay private until the studio approves it.");
    } catch (error) {
      setTestimonialStatus(error instanceof Error ? error.message : "Please try again.");
    }
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquiryStatus("Sending your brief…");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send your brief.");
      form.reset();
      setInquiryStatus("Brief received. We’ll reply by email.");
    } catch (error) {
      setInquiryStatus(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <main className="editorial-site">
      <div className="ed-progress" aria-hidden="true" />

      <header className="ed-header">
        <a href="#top" className="ed-logo" aria-label="Artimist Production home">
          <strong><span className="ed-a">A</span>RTIMIST</strong><span>Creative Production</span>
        </a>
        <div className="ed-header-actions">
          <button className="ed-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}>
            <i />{heroWorld.mode}
          </button>
          <button className="ed-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation">Menu <span>⠿</span></button>
        </div>
      </header>

      <aside className={`ed-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="ed-menu-close" onClick={() => setMenuOpen(false)}>Close <span>×</span></button>
        <div className="ed-menu-index"><span>INDEX / 2026</span><strong><span className="ed-a">A</span>RTIMIST</strong></div>
        <nav>
          {[["Work", "#work"], ["Recent", "#recent-projects"], ["Architecture", "/architecture"], ["BIM & Drafting", "/bim-drafting"], ["Visualization", "/visualization"], ["Unreal Engine", "/unreal-engine"], ["Residential", "/residential"], ["Render atlas", "/visual-archive"], ["Services", "/services"], ["Process", "/process"], ["Team", "/team"], ["About", "/about"], ["Founder", "/founder-message"], ["Lab", "#lab"], ["Partners", "/partners"], ["Contact", "/contact"]].map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}><small>{String(index + 1).padStart(2, "0")}</small><span>{label}</span><Arrow /></a>
          ))}
        </nav>
        <div className="ed-menu-foot"><span>{offices.map((office) => office.label).join(" · ")}</span><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></div>
      </aside>

      <section className="ed-hero" id="top">
        <div className="ed-hero-image ed-hero-day" aria-hidden="true" />
        <div className="ed-hero-image ed-hero-night" aria-hidden="true" />
        <div className="ed-drawing-grid" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <ArchitecturalTrace className="ed-hero-trace" />
        <div className="ed-hero-title" data-ed-reveal>
          <span className="ed-hero-wordmark"><span className="ed-a">A</span>RTIMIST</span>
          <h1 className="ed-hero-positioning">Architecture, BIM &amp; Visualization Services</h1>
        </div>
        <p className="ed-hero-statement" data-ed-reveal key={`statement-${theme}`}>{heroWorld.statement}</p>
        <div className="ed-hero-coordinates" aria-hidden="true">
          <span>YVR / OH / STO / LHE</span>
          <span>{String(offices.length).padStart(2, "0")} offices / Working worldwide</span>
          <span>{heroWorld.frame}</span>
        </div>
        <div className="ed-hero-project-note" data-ed-reveal key={`project-note-${theme}`}>
          <span>{heroWorld.eyebrow}</span>
          <strong>{heroWorld.title}</strong>
          <p>{heroWorld.meta}</p>
        </div>
        <div className="ed-hero-scan" aria-hidden="true" />
        <ul className="ed-hero-disciplines" data-ed-reveal>
          {heroDisciplines.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="ed-hero-foot">
          <a href="#work">Enter selected work <Arrow down /></a>
          <span>{theme === "dark" ? "N / 2040" : "D / 0826"}</span>
        </div>
      </section>

      <section className="ed-selected" id="work">
        <div className="ed-section-code"><span>01</span><p>Selected work</p></div>
        <div className="ed-selected-main">
          <div className="ed-selected-copy" key={`copy-${activeProject?.slug}`}>
            <span>{String(featureIndex + 1).padStart(2, "0")}</span>
            <h2>{activeProject?.title}</h2>
            <p className="ed-selected-meta">{activeProject?.services.slice(0, 3).join(" / ")}<br />{activeProject?.year}</p>
            <p className="ed-selected-summary">{activeProject?.summary}</p>
            <button onClick={() => activeProject && setSelectedProject(activeProject)}>Enter walkthrough <Arrow /></button>
          </div>
          <button className="ed-selected-image" key={activeProject?.slug} onClick={() => activeProject && setSelectedProject(activeProject)} onPointerMove={tilt} onPointerLeave={clearTilt}>
            {activeProject && activePreview && (isVideo(activePreview.src)
              ? <video src={activePreview.src} poster={activeProject.image} autoPlay muted loop playsInline aria-label={`${activeProject.title} preview`} />
              : <img src={activePreview.src} alt={activeProject.title} style={{ objectFit: activePreview.fit || "cover", objectPosition: activePreview.position || "center" }} />)}
            <span className="ed-selected-camera" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="ed-selected-walk">Move pointer / Open to walk ↗︎</span>
          </button>
        </div>
        <div className="ed-project-tabs" role="tablist" aria-label="Featured projects">
          {featuredProjects.map((project, index) => (
            <button key={project.slug} role="tab" aria-selected={featureIndex === index} className={featureIndex === index ? "is-active" : ""} onClick={() => setFeatureIndex(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{project.title}</strong><small>{project.category} / {project.year}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="ed-process" id="process">
        <div className="ed-process-head">
          <div className="ed-section-code"><span>02</span><p>Process mode</p></div>
          <div className="ed-process-steps">
            {["Concept", "Model", "Drawing", "Material", "Reality"].map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}
          </div>
        </div>
        <div className="ed-comparison" data-ed-reveal>
          <img className="ed-comparison-before" src="/media/walkthrough/canopy/technical-sequence.webp" alt="Technical drawing and parametric design sequence" />
          <div className="ed-comparison-after" style={{ clipPath: `inset(0 ${100 - processPosition}% 0 0)` }}>
            <img src="/media/walkthrough/canopy/pavilion-sunset.webp" alt="Completed computational pavilion visualization" />
          </div>
          <span className="ed-comparison-line" style={{ left: `${processPosition}%` }}><i>↔</i></span>
          <input aria-label="Compare drawing and final visualization" type="range" min="8" max="92" value={processPosition} onChange={(event) => setProcessPosition(Number(event.target.value))} />
          <div className="ed-comparison-labels"><span>Technical logic</span><span>Built atmosphere</span></div>
        </div>
        <a className="ed-process-page-link" href="/process"><span>See the complete five-phase process</span><Arrow /></a>
      </section>

      <section className="ed-residential-gateway" id="residential-preview">
        <header data-ed-reveal><div className="ed-section-code"><span>R</span><p>Residential collection</p></div><h2>Walk through<br /><em>the whole home.</em></h2><p>Nineteen complete exterior and interior renders. Every image stays at its natural ratio; every room continues the same spatial story.</p><a href="/residential">Enter residential renders <Arrow /></a></header>
        <a className="ed-residential-feature" href="/residential" aria-label="Open the residential render collection"><img src="/media/residential/residential-13.webp" alt="Forest House at twilight" /><span>01 / Twilight arrival</span></a>
        <div className="ed-residential-strip">
          {[15, 6, 10, 19].map((number, index) => <a href="/residential" key={number}><img src={`/media/residential/residential-${String(number).padStart(2, "0")}.webp`} alt={["Forest living room", "Courtyard kitchen", "Primary bath", "Quiet room"][index]} loading="lazy" /><span>{String(index + 2).padStart(2, "0")}</span></a>)}
        </div>
      </section>

      <section className="ed-motion-theater" data-ed-reveal>
        <header><div className="ed-section-code"><span>M</span><p>Moving image</p></div><p>Original 16:9 frame / uncropped / controls available</p></header>
        <video src="/media/motion/music-campus-teaser.mp4" poster="/media/atlas/atlas-14.webp" autoPlay muted loop playsInline controls aria-label="Harmonic Horizons architectural animation" />
      </section>

      <section className="ed-capabilities" id="capabilities">
        <div className="ed-capability-list">
          <div className="ed-section-code"><span>03</span><p>Capabilities</p></div>
          {services.map((service, index) => (
            <button key={service.title} className={capabilityIndex === index ? "is-active" : ""} onMouseEnter={() => setCapabilityIndex(index)} onFocus={() => setCapabilityIndex(index)} onClick={() => setCapabilityIndex(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{service.subtitle}</strong><Arrow />
            </button>
          ))}
          <a href="/services">Explore every service <Arrow /></a>
        </div>
        <div className="ed-capability-visual" key={`cap-${capabilityIndex}`}>
          <img src={(projects[capabilityIndex % Math.max(projects.length, 1)] || projects[0])?.image} alt="" />
          <span>0{capabilityIndex + 1}</span>
        </div>
        <div className="ed-capability-copy" key={`cap-copy-${capabilityIndex}`}>
          <p>{services[capabilityIndex]?.title}</p>
          <h2>{services[capabilityIndex]?.subtitle}</h2>
          <span>{services[capabilityIndex]?.copy}</span>
        </div>
      </section>

      <section className="ed-unreal-gateway" id="unreal" data-ed-reveal>
        <div className="ed-unreal-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="ed-unreal-copy">
          <div className="ed-section-code"><span>UE</span><p>Real-time production</p></div>
          <h2>Design it.<br /><em>Step inside it.</em></h2>
          <p>Unreal Engine environments, interactive architectural experiences, cinematic sequences and real-time worlds—creative direction by Faizan Aziz with real-time engineering led by Hanan Shahid.</p>
          <a href="/unreal-engine">Enter the Unreal Engine studio <Arrow /></a>
        </div>
        <div className="ed-unreal-visual">
          <img className="ed-unreal-scene" src="/media/atlas/atlas-34.webp" alt="" />
          <figure className="ed-unreal-person is-faizan"><img src="/media/team/faizan-founder-hd.webp" alt="Faizan Aziz" /><figcaption><span>Creative direction</span><strong>Faizan Aziz</strong></figcaption></figure>
          <figure className="ed-unreal-person is-hanan"><img src="/media/team/hanan-profile-2026.webp" alt="Hanan Shahid" /><figcaption><span>Unreal Engine</span><strong>Hanan Shahid</strong></figcaption></figure>
          <span className="ed-unreal-hud">60 FPS / realtime / interactive</span>
        </div>
      </section>

      <section className="ed-studio" id="studio">
        <div className="ed-studio-intro" data-ed-reveal>
          <div className="ed-section-code"><span>04</span><p>Studio</p></div>
          <h2>One direction.<br /><em>Different disciplines.</em></h2>
          <p>Founded by architect and creative director Faizan Aziz, Artimist is an international studio working through Vancouver, Ohio, Stockholm and Raya DHA Lahore across architecture, visualization, identity, motion and digital production.<a className="ed-studio-about" href="/about">Read about the practice <Arrow /></a><a className="ed-studio-about" href="/founder-message">Founder&apos;s message <Arrow /></a></p>
        </div>
        <div className="ed-team-disclaimer" data-ed-reveal><span>Main team / Core roster</span><p><strong>These are the people at the center of Artimist.</strong> They are our main team—not the whole team. A wider network of specialist collaborators and trusted partners joins the studio around each project.</p></div>
        <div className={`ed-team-roundtable ${team.length % 2 ? "is-odd" : ""}`} data-ed-reveal>
          <div className="ed-team-rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="ed-team-core"><span>Main team / not the whole team</span><strong>{String(team.length).padStart(2, "0")}</strong><p>Our core creative group, supported by a wider specialist network.</p></div>
          {team.map((person, index) => {
            const angle = -Math.PI / 2 + (index / Math.max(team.length, 1)) * Math.PI * 2;
            const portrait = person.image || (person.name.toLowerCase() === "jannat niaz" ? "/media/team/jannat.webp" : "");
            const framing = teamPortraitFraming[person.name] || { scale: "1.12", x: "0%", y: "8%" };
            const position = {
              "--ed-team-x": `${50 + Math.cos(angle) * 43}%`,
              "--ed-team-y": `${50 + Math.sin(angle) * 41}%`,
            } as CSSProperties;
            const portraitStyle = {
              "--ed-face-scale": framing.scale,
              "--ed-face-x": framing.x,
              "--ed-face-y": framing.y,
            } as CSSProperties;
            return (
              <article className="ed-person" key={`${person.name}-${index}`} style={position}>
                <div className={`ed-person-portrait ${portrait ? "" : "is-reserved"}`}>{portrait ? <img src={portrait} alt={person.name} style={portraitStyle} /> : <Monogram name={person.name} />}<span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="ed-person-name"><p>{person.role}</p><h3>{person.name}</h3></div>
                <span className="ed-person-bio">{person.bio}</span>
                {person.linkedin && <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} on LinkedIn`}>in ↗︎</a>}
              </article>
            );
          })}
        </div>
        <a className="ed-team-page-link" href="/team"><span>Watch the full team promenade</span><strong>Meet all {String(team.length).padStart(2, "0")} people</strong><Arrow /></a>
      </section>

      <section className="ed-lab" id="lab">
        <div className="ed-lab-title ed-lab-title-wide" data-ed-reveal><div className="ed-section-code"><span>05</span><p>Research / Lab</p></div><h2>Complete drawings.<br /><em>No cropped information.</em></h2><p>Twenty-one original Grasshopper, parametric and architectural presentation plates shown in full. Scroll sideways to inspect every sheet.</p><a href="/visual-archive#technical-plates">Open the complete technical atlas <Arrow /></a></div>
        <div className="ed-technical-rail-home">
          {technicalBoards.map((board, index) => <figure key={board.src}><img src={board.src} alt={`${board.label} — ${board.detail}`} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, "0")} / 21</span><strong>{board.label}</strong><small>{board.detail}</small></figcaption></figure>)}
        </div>
      </section>

      <section className="ed-atlas-gateway">
        <header data-ed-reveal><div className="ed-section-code"><span>A</span><p>Complete render atlas</p></div><h2>Thirty-seven<br /><em>visual worlds.</em></h2><p>Architecture, interiors, landscape, hospitality and public space—organized into a continuous image-first journey.</p><a href="/visual-archive">Enter the render atlas <Arrow /></a></header>
        <div>{[6, 14, 27, 34].map((number, index) => <a href="/visual-archive" key={number}><img src={`/media/atlas/atlas-${String(number).padStart(2, "0")}.webp`} alt={["Civic horizon", "Harmonic Horizons", "Retail hall", "Padel garden"][index]} loading="lazy" /><span>{String(index + 1).padStart(2, "0")}</span></a>)}</div>
      </section>

      <section className="ed-recent" id="recent-projects">
        <header className="ed-recent-head" data-ed-reveal>
          <div><div className="ed-section-code"><span>N</span><p>Recent projects</p></div><h2>Fresh from<br /><em>the studio.</em></h2></div>
          <p>New portfolio uploads from the admin portal appear here automatically. Open any project to see its description and complete image sequence.</p>
        </header>
        <div className="ed-recent-rail">
          {recentProjects.map((project, index) => (
            <button key={project.slug} className="ed-recent-card" onClick={() => setSelectedProject(project)} data-ed-reveal>
              <span className="ed-recent-image"><img src={project.image} alt="" /><i>{String(index + 1).padStart(2, "0")}</i><b>Open project ↗︎</b></span>
              <span className="ed-recent-copy"><small>{project.category} / {project.year}</small><strong>{project.title}</strong><em>{project.summary}</em><span>{project.location}</span></span>
            </button>
          ))}
        </div>
      </section>

      <section className="ed-archive" id="archive">
        <div className="ed-archive-head" data-ed-reveal>
          <div><div className="ed-section-code"><span>06</span><p>Project index</p></div><h2>Selected archive.</h2></div>
          <p>Real work across spatial design, technical delivery, identity and moving image.</p>
        </div>
        <div className="ed-filters" role="tablist" aria-label="Filter project archive">
          {filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="ed-archive-grid">
          {archiveProjects.map((project, index) => (
            <button className="ed-archive-card" key={project.slug} style={{ "--ed-card-delay": `${index * -1.35}s` } as CSSProperties} onClick={() => setSelectedProject(project)} onPointerMove={tilt} onPointerLeave={clearTilt} data-ed-reveal>
              <span className={`ed-archive-image ${["Identity", "Digital", "Technical", "Lab"].includes(project.category) ? "is-document" : ""}`}><img src={project.image} alt="" /><span aria-hidden="true"><b>Walkthrough</b><em>{walkthroughFor(project).length} scenes</em></span><i>Enter ↗︎</i></span>
              <span className="ed-archive-meta"><small>{String(index + 1).padStart(3, "0")} / {project.category}</small><strong>{project.title}</strong><em>{project.location} · {project.year}</em></span>
            </button>
          ))}
        </div>
      </section>

      <section className="ed-network">
        <div className="ed-partners" data-ed-reveal>
          <div className="ed-section-code"><span>07</span><p>Trusted network</p></div>
          <div><article><strong>Decoding Bits</strong><span>Web development & engineering</span></article><article><strong>Scallence LLC</strong><span>Business & commerce</span></article><article><strong>Amazon Services</strong><span>Marketplace delivery</span></article></div>
        </div>
        <div className="ed-voices" id="voices" data-ed-reveal>
          <div className="ed-section-code"><span>08</span><p>Client notes</p></div>
          {testimonials.length ? <div className="ed-voice-grid">{testimonials.map((item) => <article key={item.id}><span className="ed-rating">{ratingDisplay(item.rating)} <small>{item.rating.toFixed(1)}</small></span><blockquote>“{item.quote}”</blockquote><footer>{item.photoKey ? <img src={`/api/media/${item.photoKey}`} alt="" /> : <Monogram name={item.clientName} />}<p><strong>{item.clientName}</strong><small>{[item.role, item.company].filter(Boolean).join(" · ")}</small></p></footer></article>)}</div> : <p className="ed-no-voices">No published client notes yet. Nothing invented. Nothing filled for appearance.</p>}
          <button className="ed-leave-review" onClick={() => { setTestimonialStatus(""); setReviewOpen(true); }}><span>Worked with Artimist?</span><strong>Leave a review</strong><Arrow /></button>
        </div>
      </section>

      <section className="ed-contact" id="contact">
        <div className="ed-contact-head" data-ed-reveal><div className="ed-section-code"><span>09</span><p>Start a project</p></div><h2>Have something<br /><em>interesting?</em></h2></div>
        <div className="ed-contact-layout">
          <form className="ed-inquiry" onSubmit={submitInquiry}>
            <label><span>Name *</span><input name="name" required maxLength={80} /></label><label><span>Email *</span><input name="email" type="email" required maxLength={160} /></label><label><span>Company</span><input name="company" maxLength={120} /></label><label><span>Project type *</span><select name="projectType" required defaultValue=""><option value="" disabled>Select</option>{services.map((service) => <option key={service.title}>{service.subtitle}</option>)}<option>Multidisciplinary</option></select></label><label><span>Budget</span><select name="budget" defaultValue=""><option value="">Let’s discuss</option><option>Under $2,500</option><option>$2,500–$7,500</option><option>$7,500–$20,000</option><option>$20,000+</option></select></label><label><span>Timeline</span><input name="timeline" placeholder="e.g. 4–6 weeks" /></label><label className="ed-wide"><span>Brief *</span><textarea name="message" required minLength={20} rows={5} /></label><button type="submit">Send project brief <Arrow /></button>{inquiryStatus && <p className="ed-form-status" role="status">{inquiryStatus}</p>}
          </form>
          <aside>
            <p>Offices / {String(offices.length).padStart(2, "0")}</p>
            <div className="ed-contact-offices">{offices.map((office) => <article key={office.code}><small>{office.code} / {office.region}</small><strong>{office.label}</strong></article>)}</div>
            <p>Direct</p><a href={`mailto:${settings.contactEmail}`}>Faizan · {settings.contactEmail}<Arrow /></a><a href={`mailto:${settings.teamEmail}`}>Studio team · {settings.teamEmail}<Arrow /></a><a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp {settings.whatsapp}<Arrow /></a><p>Social</p><a href={settings.instagram} target="_blank" rel="noreferrer">Instagram<Arrow /></a><a href={settings.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a><span><i />{settings.availability}</span>
          </aside>
        </div>
      </section>

      <footer className="ed-footer">
        <div>ARTIMIST</div><span>© {new Date().getFullYear()} / {offices.map((office) => office.label).join(" · ")}</span><nav><a href="/services">Services</a><a href="/unreal-engine">Unreal Engine</a><a href="/process">Process</a><a href="/team">Team</a><a href="/contact">Contact</a><a href="/residential">Residential</a><a href="/visual-archive">Render atlas</a><a href="/about">About</a><a href="/admin">Studio admin</a><a href="#top">Back to top ↑</a></nav>
      </footer>

      {selectedProject && <EditorialProject project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {reviewOpen && <div className="ed-review-dialog" role="dialog" aria-modal="true" aria-labelledby="review-dialog-title">
        <button className="ed-review-backdrop" onClick={() => setReviewOpen(false)} aria-label="Close review form" />
        <section>
          <header><div><span>Client voice / Private submission</span><h2 id="review-dialog-title">Leave a review.</h2><p>Your note enters the admin portal first. Nothing appears publicly until the studio reviews and approves it.</p></div><button onClick={() => setReviewOpen(false)}>Close <b>×</b></button></header>
          <form className="ed-review-form" onSubmit={submitTestimonial}>
            <label><span>Name *</span><input name="clientName" required maxLength={80} autoFocus /></label>
            <label><span>Company</span><input name="company" maxLength={100} /></label>
            <label><span>Role</span><input name="role" maxLength={100} /></label>
            <label><span>Rating</span><select name="rating" defaultValue="5"><option value="5">5.0 / Excellent</option><option value="4.5">4.5 / Very good</option><option value="4">4.0 / Good</option><option value="3.5">3.5 / Fair</option><option value="3">3.0 / Needs improvement</option></select></label>
            <label className="ed-wide"><span>Your experience *</span><textarea name="quote" required minLength={20} maxLength={1200} rows={5} /></label>
            <label><span>Optional photo</span><input name="photo" type="file" accept="image/jpeg,image/png,image/webp" /></label>
            <div className="ed-review-submit"><button type="submit">Send to admin review <Arrow /></button>{testimonialStatus && <p role="status">{testimonialStatus}</p>}</div>
          </form>
        </section>
      </div>}
    </main>
  );
}

function WalkMedia({ moment, project, hero = false }: { moment: WalkthroughMoment; project: Project; hero?: boolean }) {
  if (isVideo(moment.src)) {
    return <video src={moment.src} poster={project.image} autoPlay muted loop playsInline controls={!hero} preload="metadata" aria-label={`${project.title} — ${moment.label}`} />;
  }
  return <img src={moment.src} alt={`${project.title} — ${moment.label}`} style={{ objectFit: moment.fit || "cover", objectPosition: moment.position || "center" }} />;
}

function EditorialProject({ project, onClose }: { project: Project; onClose: () => void }) {
  const moments = useMemo(() => walkthroughFor(project), [project]);
  const heroMoment = moments.find((moment) => !isVideo(moment.src)) || moments[0];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const totalScenes = moments.length + 3;

  function updateWalkProgress() {
    const node = scrollRef.current;
    if (!node) return;
    const total = node.scrollHeight - node.clientHeight;
    setProgress(total > 0 ? node.scrollTop / total : 0);
    setActiveScene(Math.min(totalScenes - 1, Math.round(node.scrollTop / Math.max(node.clientHeight, 1))));
  }

  function walkTo(scene: number) {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: Math.max(0, Math.min(totalScenes - 1, scene)) * node.clientHeight, behavior: "smooth" });
  }

  function moveCamera(event: ReactPointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--ed-walk-x", `${x * -22}px`);
    event.currentTarget.style.setProperty("--ed-walk-y", `${y * -16}px`);
  }

  function resetCamera(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--ed-walk-x", "0px");
    event.currentTarget.style.setProperty("--ed-walk-y", "0px");
  }

  return (
    <div className="ed-project-walkthrough" role="dialog" aria-modal="true" aria-labelledby="ed-project-title" onKeyDown={(event) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); walkTo(activeScene + 1); }
      if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); walkTo(activeScene - 1); }
    }}>
      <div className="ed-walk-progress" aria-hidden="true"><i style={{ width: `${progress * 100}%` }} /></div>
      <button className="ed-modal-close" onClick={onClose} autoFocus>Close <span>×</span></button>
      <nav className="ed-walk-rail" aria-label="Project scene navigation">
        {Array.from({ length: totalScenes }, (_, index) => <button key={index} className={activeScene === index ? "is-active" : ""} onClick={() => walkTo(index)} aria-label={`Go to scene ${index + 1}`}><i /></button>)}
      </nav>

      <div className="ed-walk-scroll" ref={scrollRef} onScroll={updateWalkProgress}>
        <section className={`ed-walk-hero ${heroMoment.fit === "contain" ? "is-document" : ""}`} onPointerMove={moveCamera} onPointerLeave={resetCamera}>
          <div className={`ed-walk-hero-media ${heroMoment.fit === "contain" ? "is-document" : ""}`}><WalkMedia moment={heroMoment} project={project} hero /></div>
          <div className="ed-walk-grid" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="ed-walk-title">
            <p>{project.category} / {project.year}</p>
            <h2 id="ed-project-title">{project.title}</h2>
            <span>{project.location}</span>
          </div>
          <div className="ed-walk-instruction"><span>Walk the project</span><strong>Scroll / swipe / use arrows</strong><i>↓</i></div>
        </section>

        {moments.map((moment, index) => (
          <section className={`ed-walk-frame ${moment.fit === "contain" ? "is-board" : ""} ${isVideo(moment.src) ? "is-video" : ""}`} key={`${moment.src}-${index}`} onPointerMove={moveCamera} onPointerLeave={resetCamera}>
            <figure>
              <div className="ed-walk-frame-media">
                {moment.fit === "contain" && !isVideo(moment.src) && <img className="ed-walk-board-blur" src={moment.src} alt="" aria-hidden="true" />}
                <WalkMedia moment={moment} project={project} />
              </div>
              <div className="ed-walk-frame-grid" aria-hidden="true"><i /><i /><i /><i /></div>
              <figcaption><span>{String(index + 1).padStart(2, "0")} / {String(moments.length).padStart(2, "0")}</span><strong>{moment.label}</strong><em>{moment.fit === "contain" || isVideo(moment.src) ? "Full frame / Nothing cropped" : "Scroll to continue through the space"}</em></figcaption>
            </figure>
          </section>
        ))}

        <section className="ed-walk-story">
          <div className="ed-section-code"><span>ST</span><p>Project narrative</p></div>
          <h3>{project.summary}</h3>
          <div><p>{project.description}</p><dl><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Scope</dt><dd>{project.services.join(" / ")}</dd></div></dl></div>
        </section>

        <section className="ed-walk-end">
          {!isVideo(moments[moments.length - 1].src) && <img src={moments[moments.length - 1].src} alt="" />}
          <div><span>End / {String(moments.length).padStart(2, "0")} scenes</span><h3>Build the next<br /><em>experience.</em></h3><a href="/contact" onClick={onClose}>Start a related project <Arrow /></a></div>
        </section>
      </div>
    </div>
  );
}
