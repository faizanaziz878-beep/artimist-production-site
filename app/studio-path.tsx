"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getStudioOffices, serviceWorlds as defaultServices, type SiteSettings } from "../lib/content";

type Chapter = "services" | "process" | "contact";
type ServiceWorld = (typeof defaultServices)[number];

const serviceImages = [
  "/media/residential/residential-15.webp",
  "/media/atlas/atlas-15.webp",
  "/media/projects/alaskan-made.webp",
  "/media/projects/digital-collectibles.webp",
  "/media/atlas/atlas-27.webp",
  "/media/walkthrough/canopy/pavilion-day.webp",
];

const serviceOutputs = [
  ["Concept & feasibility", "Architecture & interiors", "BIM / Revit / CAD", "Permit documentation"],
  ["Art direction", "Photoreal CGI", "Walkthroughs & film", "Motion graphics"],
  ["Positioning & naming", "Identity systems", "Packaging & print", "Campaign production"],
  ["Unreal Engine environments", "Web experiences", "Interactive products", "Game-ready assets"],
  ["Creative strategy", "Content systems", "Amazon commerce", "Launch direction"],
  ["Parametric systems", "Spatial research", "Prototype studies", "Speculative concepts"],
];

const phases = [
  {
    code: "01",
    title: "Listen",
    statement: "Before a line is drawn, we find the real question.",
    copy: "We listen for ambition, pressure, audience, place and the feeling the finished work must create. This is where scattered ideas become a useful shared brief.",
    outputs: ["Discovery conversation", "Context & ambition map", "Success criteria"],
    media: "/media/atlas/atlas-14.webp",
  },
  {
    code: "02",
    title: "Frame",
    statement: "The problem gains edges, priorities and a route.",
    copy: "Scope, disciplines, sequence and decision points are mapped before production expands. Everyone sees what is being made, why it matters and what happens next.",
    outputs: ["Creative direction", "Scope & milestones", "Visual / spatial route"],
    media: "/media/technical/board-02.webp",
    board: true,
  },
  {
    code: "03",
    title: "Build",
    statement: "The idea becomes visible, testable and inhabitable.",
    copy: "Architects, artists, designers and technologists work in parallel. Models, frames, systems and prototypes grow together instead of waiting in separate silos.",
    outputs: ["Design development", "Models & prototypes", "Production rounds"],
    media: "/media/motion/residential-build.mp4",
    video: true,
  },
  {
    code: "04",
    title: "Refine",
    statement: "We remove noise until the work speaks clearly.",
    copy: "Proportion, pacing, material, hierarchy and technical detail are reviewed as one system. Feedback is documented, resolved and folded back into the whole.",
    outputs: ["Client review", "Technical coordination", "Final art direction"],
    media: "/media/walkthrough/canopy/pavilion-day.webp",
  },
  {
    code: "05",
    title: "Deliver",
    statement: "A finished system—not a folder of disconnected files.",
    copy: "The final work is checked for its real destination: screen, site, permit set, campaign, product or construction. Handover is organized to remain useful after launch.",
    outputs: ["Quality control", "Production-ready package", "Launch & handover"],
    media: "/media/atlas/atlas-33.webp",
  },
];

function useStudioShell() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("artimist-editorial-theme");
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    const timer = window.setTimeout(() => setTheme(initial), 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-sp-reveal]").forEach((node) => observer.observe(node));
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("artimist-editorial-theme", next);
    setTheme(next);
  }

  return { theme, toggleTheme };
}

function PathHeader({ current, theme, onTheme }: { current: Chapter; theme: "light" | "dark"; onTheme: () => void }) {
  return (
    <header className="sp-header">
      <Link className="sp-wordmark" href="/"><strong>ARTIMIST</strong><span>Creative Production</span></Link>
      <nav aria-label="Studio journey">
        <Link className={current === "services" ? "is-active" : ""} href="/services">Services</Link>
        <Link className={current === "process" ? "is-active" : ""} href="/process">Process</Link>
        <Link className={current === "contact" ? "is-active" : ""} href="/contact">Contact</Link>
        <Link href="/team">Team</Link>
        <Link href="/unreal-engine">Unreal</Link>
        <Link href="/visual-archive">Work</Link>
      </nav>
      <button className="sp-theme" onClick={onTheme} aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}><i />{theme === "dark" ? "Night" : "Day"}</button>
    </header>
  );
}

function PathRail({ current }: { current: Chapter }) {
  const chapters: Array<{ id: Chapter; label: string; href: string }> = [
    { id: "services", label: "Services", href: "/services" },
    { id: "process", label: "Process", href: "/process" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];
  return <nav className="sp-path-rail" aria-label="Services to contact path">{chapters.map((chapter, index) => <Link className={chapter.id === current ? "is-active" : ""} href={chapter.href} key={chapter.id}><span>0{index + 1}</span><strong>{chapter.label}</strong><i /></Link>)}</nav>;
}

function SectionCode({ children }: { children: ReactNode }) {
  return <span className="sp-section-code">{children}</span>;
}

function parseServices(settings: SiteSettings): ServiceWorld[] {
  try {
    const parsed = JSON.parse(settings.servicesJson || "[]");
    return Array.isArray(parsed) && parsed.length ? parsed : defaultServices;
  } catch {
    return defaultServices;
  }
}

export function ServicesExperience({ settings }: { settings: SiteSettings }) {
  const { theme, toggleTheme } = useStudioShell();
  const services = useMemo(() => parseServices(settings), [settings]);

  return (
    <main className="studio-path sp-services-page">
      <PathHeader current="services" theme={theme} onTheme={toggleTheme} />
      <section className="sp-hero sp-services-hero">
        <div className="sp-hero-images" aria-hidden="true"><img className="sp-night-image" src="/media/atlas/atlas-35.webp" alt="" /><img className="sp-day-image" src="/media/atlas/atlas-06.webp" alt="" /></div>
        <div className="sp-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="sp-hero-copy" data-sp-reveal><SectionCode>01 / What we make</SectionCode><h1>Services</h1><p>One studio can shape the space, the image, the identity and the digital layer—without losing the idea between disciplines.</p></div>
        <PathRail current="services" />
      </section>

      <section className="sp-services-intro" data-sp-reveal><SectionCode>Six connected fields</SectionCode><h2>Choose a door.<br /><em>We connect the rooms.</em></h2><p>Engage Artimist for one precise deliverable or a multidisciplinary journey. Each service chapter has its own specialists, but every chapter shares one creative direction.</p></section>

      <section className="sp-service-chapters">
        {services.map((service, index) => (
          <article id={`service-${service.code}`} className={index % 2 ? "is-reversed" : ""} key={`${service.code}-${service.subtitle}`} data-sp-reveal>
            <figure><img src={serviceImages[index % serviceImages.length]} alt={`${service.subtitle} by Artimist Production`} loading={index < 2 ? "eager" : "lazy"} /><span>{service.code} / {service.title}</span></figure>
            <div>
              <SectionCode>{service.code} / Service world</SectionCode>
              <h2>{service.subtitle}</h2>
              <p>{service.copy}</p>
              <ul>{serviceOutputs[index % serviceOutputs.length].map((output) => <li key={output}>{output}<span>↗︎</span></li>)}</ul>
              <Link href={`/contact?service=${encodeURIComponent(service.subtitle)}`}>Discuss this service <span>↗︎</span></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="sp-page-cta"><div><SectionCode>Next / 02</SectionCode><h2>How does the work<br /><em>move forward?</em></h2></div><Link href="/process"><span>Enter the process</span><b>↗︎</b></Link></section>
    </main>
  );
}

export function ProcessExperience() {
  const { theme, toggleTheme } = useStudioShell();

  return (
    <main className="studio-path sp-process-page">
      <PathHeader current="process" theme={theme} onTheme={toggleTheme} />
      <section className="sp-hero sp-process-hero">
        <div className="sp-hero-images" aria-hidden="true"><img className="sp-night-image" src="/media/atlas/atlas-14.webp" alt="" /><img className="sp-day-image" src="/media/residential/residential-12.webp" alt="" /></div>
        <div className="sp-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="sp-hero-copy" data-sp-reveal><SectionCode>02 / How it moves</SectionCode><h1>One idea.<br /><em>Five moves.</em></h1><p>A visible route from first conversation to final delivery. Flexible enough for discovery; structured enough to protect time, quality and intent.</p></div>
        <PathRail current="process" />
      </section>

      <section className="sp-process-map" data-sp-reveal><SectionCode>Project route / 01—05</SectionCode><div>{phases.map((phase) => <a href={`#phase-${phase.code}`} key={phase.code}><span>{phase.code}</span><strong>{phase.title}</strong><i /></a>)}</div></section>

      <section className="sp-phase-list">
        {phases.map((phase, index) => (
          <article id={`phase-${phase.code}`} className={`${index % 2 ? "is-reversed" : ""} ${phase.board ? "is-board" : ""}`} key={phase.code} data-sp-reveal>
            <figure>
              {phase.video ? <video src={phase.media} autoPlay muted loop playsInline controls preload="metadata" aria-label={`${phase.title} process film`} /> : <img src={phase.media} alt={`${phase.title} — Artimist process`} loading={index < 2 ? "eager" : "lazy"} />}
              <span>{phase.code} / 05</span>
            </figure>
            <div><SectionCode>Phase {phase.code}</SectionCode><h2>{phase.title}</h2><h3>{phase.statement}</h3><p>{phase.copy}</p><ol>{phase.outputs.map((output, outputIndex) => <li key={output}><span>{String(outputIndex + 1).padStart(2, "0")}</span>{output}</li>)}</ol></div>
          </article>
        ))}
      </section>

      <section className="sp-page-cta"><div><SectionCode>Next / 03</SectionCode><h2>Bring us the brief.<br /><em>Or just the beginning.</em></h2></div><Link href="/contact"><span>Open a conversation</span><b>↗︎</b></Link></section>
    </main>
  );
}

export function ContactExperience({ settings }: { settings: SiteSettings }) {
  const { theme, toggleTheme } = useStudioShell();
  const [status, setStatus] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");
  const [projectType, setProjectType] = useState("");
  const services = useMemo(() => parseServices(settings), [settings]);
  const offices = getStudioOffices(settings);
  const whatsappHref = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Artimist team — I would like to discuss a project.")}`;

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service") || "";
    if (!services.some((service) => service.subtitle === requested)) return;
    const timer = window.setTimeout(() => setProjectType(requested), 0);
    return () => window.clearTimeout(timer);
  }, [services]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending your brief…");
    setFallbackHref("");
    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const track = (name: string, params: Record<string, string>) => {
      if (typeof window === "undefined") return;
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      if (typeof w.gtag === "function") w.gtag("event", name, params);
    };
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(entries),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send your brief.");
      track("generate_lead", { form_name: "project_brief" });
      form.reset();
      setProjectType("");
      setStatus("Brief received. The studio will reply by email.");
    } catch {
      // The studio inbox could not be reached from this host. Never drop the
      // lead: hand the visitor a one-click email with their brief prefilled.
      const subject = `New project brief — ${entries.name || "Website enquiry"}`;
      const body = [
        `Name: ${entries.name || ""}`,
        `Email: ${entries.email || ""}`,
        `Company: ${entries.company || ""}`,
        `Project type: ${entries.projectType || ""}`,
        `Budget: ${entries.budget || ""}`,
        `Timeline: ${entries.timeline || ""}`,
        "",
        "Brief:",
        entries.message || "",
      ].join("\n");
      setFallbackHref(
        `mailto:Faizan@artimistproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      );
      track("lead_fallback_email", { form_name: "project_brief" });
      setStatus("We could not reach the studio inbox from this page. Your brief is ready below — send it in one click and it reaches us directly.");
    }
  }

  return (
    <main className="studio-path sp-contact-page">
      <PathHeader current="contact" theme={theme} onTheme={toggleTheme} />
      <section className="sp-hero sp-contact-hero">
        <div className="sp-hero-images" aria-hidden="true"><img className="sp-night-image" src="/media/atlas/atlas-34.webp" alt="" /><img className="sp-day-image" src="/media/atlas/atlas-27.webp" alt="" /></div>
        <div className="sp-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="sp-hero-copy" data-sp-reveal><SectionCode>03 / Start something</SectionCode><h1>Contact</h1><p>Share the project as it is today: finished brief, rough idea, difficult question or ambitious deadline. We will help locate the next useful move.</p></div>
        <PathRail current="contact" />
      </section>

      <section className="sp-contact-workspace">
        <div className="sp-contact-intro" data-sp-reveal><SectionCode>Open a brief</SectionCode><h2>Tell us what<br /><em>could exist.</em></h2><p>Your inquiry goes directly to the studio admin portal, where it can be tracked from first contact through delivery.</p></div>
        <form className="sp-contact-form" onSubmit={submitInquiry} data-sp-reveal>
          <label><span>Name *</span><input name="name" required maxLength={80} /></label>
          <label><span>Email *</span><input name="email" type="email" required maxLength={160} /></label>
          <label><span>Company</span><input name="company" maxLength={120} /></label>
          <label><span>Project type *</span><select name="projectType" required value={projectType} onChange={(event) => setProjectType(event.target.value)}><option value="" disabled>Select a field</option>{services.map((service) => <option key={service.code}>{service.subtitle}</option>)}<option>Multidisciplinary</option></select></label>
          <label><span>Budget</span><select name="budget" defaultValue=""><option value="">Let&apos;s discuss</option><option>Under $2,500</option><option>$2,500–$7,500</option><option>$7,500–$20,000</option><option>$20,000+</option></select></label>
          <label><span>Timeline</span><input name="timeline" placeholder="e.g. 4–6 weeks" maxLength={80} /></label>
          <label className="is-wide"><span>Brief *</span><textarea name="message" required minLength={20} maxLength={4000} rows={7} placeholder="What are you making, for whom, and what needs to change?" /></label>
          <button type="submit"><span>Send project brief</span><b>↗︎</b></button>{status && <p role="status">{status}</p>}{fallbackHref && <p><a className="sp-lead-fallback" href={fallbackHref} style={{ textDecoration: "underline", fontWeight: 600 }}>Send your brief by email <b>↗︎</b></a></p>}
        </form>
      </section>

      <section className="sp-contact-direct" data-sp-reveal>
        <div><SectionCode>{String(offices.length).padStart(2, "0")} offices / Worldwide</SectionCode><h2>Close to the work,<br /><em>wherever it lives.</em></h2></div>
        <div className="sp-office-grid">{offices.map((office) => <article key={office.code}><span>{office.code} / {office.region}</span><strong>{office.label}</strong><i /></article>)}</div>
        <div className="sp-direct-links"><a href={`mailto:${settings.contactEmail}`}><span>Faizan / Direct</span><strong>{settings.contactEmail}</strong><b>↗︎</b></a><a href={`mailto:${settings.teamEmail}`}><span>Studio team</span><strong>{settings.teamEmail}</strong><b>↗︎</b></a><a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Talk directly to the Artimist team on WhatsApp"><span>Talk to the team</span><strong>WhatsApp · {settings.whatsapp}</strong><b>↗︎</b></a></div>
      </section>

      <footer className="sp-contact-end"><span>{settings.availability}</span><Link href="/services">Services</Link><Link href="/process">Process</Link><Link href="/team">Team</Link><Link href="/">Studio home</Link></footer>
    </main>
  );
}
