"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "../../lib/content";
import { getStudioOffices, serviceWorlds as defaultServices } from "../../lib/content";

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗︎"}</span>;
}

function AboutTrace() {
  return (
    <svg className="ed-about-trace" viewBox="0 0 900 620" fill="none" aria-hidden="true">
      <g className="ed-about-trace-main">
        <path d="M73 495H825M120 495V155H730V495M120 217H730M120 366H730" />
        <path d="M218 155V495M382 155V495M548 155V495M668 155V495" />
        <path d="M120 155L426 62L730 155M218 217L426 105L668 217" />
        <path d="M382 366L548 217M382 217L548 366" />
      </g>
      <g className="ed-about-trace-dimensions">
        <circle cx="426" cy="217" r="94" /><circle cx="426" cy="217" r="150" />
        <path d="M120 540H730M120 531V549M730 531V549M410 525V557M443 540H410" />
        <path d="M82 155V495M73 155H91M73 495H91" />
      </g>
      <g className="ed-about-trace-text">
        <text x="421" y="579">36.80 M / PRIMARY AXIS</text>
        <text x="39" y="330" transform="rotate(-90 39 330)">18.40 M / SECTION</text>
        <text x="137" y="194">01 / THRESHOLD</text><text x="571" y="194">04 / ASSEMBLY</text>
      </g>
    </svg>
  );
}

const principles = [
  ["01", "Research before decoration", "Every project begins by understanding people, place, purpose and constraint. Form earns its place."],
  ["02", "One idea across every medium", "Architecture, image, identity, motion and digital experience carry the same central thought."],
  ["03", "Clarity through delivery", "A strong concept matters only when drawings, systems, assets and decisions make it executable."],
  ["04", "Grounded, international", "We work across borders while keeping authorship, context and cultural intelligence close to the work."],
];

const process = [
  ["01", "Listen", "People, place, ambition and constraints."],
  ["02", "Frame", "The central idea and the system around it."],
  ["03", "Design", "Space, image, identity and interaction."],
  ["04", "Resolve", "Detail, coordination and production logic."],
  ["05", "Deliver", "Clear assets, drawings and experiences."],
];

export function AboutExperience({ settings }: { settings: SiteSettings }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const offices = getStudioOffices(settings);
  const services = useMemo(() => {
    try {
      const parsed = JSON.parse(settings.servicesJson || "[]");
      return Array.isArray(parsed) && parsed.length ? parsed as typeof defaultServices : defaultServices;
    } catch {
      return defaultServices;
    }
  }, [settings.servicesJson]);

  useEffect(() => {
    const saved = window.localStorage.getItem("artimist-editorial-theme");
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    window.setTimeout(() => setTheme(initial), 0);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--ed-progress", String(total > 0 ? window.scrollY / total : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-seen")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-ed-reveal]").forEach((node) => observer.observe(node));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("artimist-editorial-theme", next);
  }

  return (
    <main className="editorial-site ed-about">
      <div className="ed-progress" aria-hidden="true" />
      <header className="ed-header ed-about-header">
        <Link href="/" className="ed-logo" aria-label="Artimist Production home"><strong>ARTIMIST</strong><span>Creative Production</span></Link>
        <div className="ed-header-actions">
          <button className="ed-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}><i />{theme === "dark" ? "Night" : "Day"}</button>
          <Link className="ed-about-home-link" href="/">Index <span>↖</span></Link>
        </div>
      </header>

      <section className="ed-about-hero" id="top">
        <img src="/media/walkthrough/music/campus-overview.webp" alt="Harmonic Horizons architectural study" />
        <div className="ed-about-hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <AboutTrace />
        <div className="ed-about-hero-title" data-ed-reveal>
          <div className="ed-section-code"><span>00</span><p>About the practice</p></div>
          <h1>A practice{" "}<br /><em>between disciplines.</em></h1>
        </div>
        <p className="ed-about-hero-intro" data-ed-reveal>Artimist connects the intelligence of architecture with the emotional force of image, identity, motion and digital craft.</p>
        <div className="ed-about-hero-meta"><span>Founded / Lahore</span><span>Offices / Vancouver · Ohio · Stockholm · Lahore</span><span>Frame / 00—05</span></div>
        <a className="ed-about-scroll" href="#vision">Read the practice <Arrow down /></a>
      </section>

      <section className="ed-about-vision" id="vision">
        <div className="ed-about-vision-heading" data-ed-reveal>
          <div className="ed-section-code"><span>01</span><p>Vision</p></div>
          <h2>Vision is not a style.<br /><em>It is a way of seeing.</em></h2>
        </div>
        <div className="ed-about-vision-copy" data-ed-reveal>
          <p>Artimist Production is a multidisciplinary creative practice founded in Lahore and now working through four offices in Vancouver, Ohio, Stockholm and Raya DHA Lahore. We approach architecture, imagery, identity, motion and digital products as parts of one connected creative system.</p>
          <p>Our vision is to build work that is spatially intelligent, visually memorable and professionally executable—work that can move from a first sketch to a built environment, a film, a brand or an interactive experience without losing its central idea.</p>
        </div>
        <Link className="ed-about-founder-link" href="/founder-message">A note from Faizan Aziz <strong>Read the founder&apos;s message</strong><Arrow /></Link>
        <figure className="ed-about-vision-image" data-ed-reveal>
          <img src="/media/atlas/atlas-13.webp" alt="Material, daylight and water study in a public interior" />
          <figcaption><span>Spatial atmosphere / 01</span><strong>Ideas become places people can feel.</strong></figcaption>
        </figure>
        <div className="ed-about-fields" aria-label="Connected creative fields">
          {[["01", "Space"], ["02", "Image"], ["03", "Identity"], ["04", "Digital"]].map(([number, label]) => <span key={label}><i>{number}</i>{label}</span>)}
        </div>
      </section>

      <section className="ed-about-principles">
        <div className="ed-about-principles-head" data-ed-reveal>
          <div className="ed-section-code"><span>02</span><p>Operating principles</p></div>
          <h2>One idea.<br /><em>Every medium.</em></h2>
        </div>
        <div className="ed-about-principle-grid">
          {principles.map(([number, title, copy]) => (
            <article key={number} data-ed-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" /></article>
          ))}
        </div>
      </section>

      <section className="ed-about-services" id="services">
        <div className="ed-about-services-head" data-ed-reveal>
          <div className="ed-section-code"><span>03</span><p>Services</p></div>
          <h2>From first line<br />to final experience.</h2>
          <p>Clients can engage one discipline or assemble a connected team around a larger brief.</p>
        </div>
        <div className="ed-about-service-list">
          {services.map((service) => (
            <article key={service.code} data-ed-reveal>
              <span>{service.code}</span><p>{service.title}</p><h3>{service.subtitle}</h3><div>{service.copy}</div><i>↗︎</i>
            </article>
          ))}
        </div>
      </section>

      <section className="ed-about-process">
        <div className="ed-about-process-title" data-ed-reveal><div className="ed-section-code"><span>04</span><p>Method</p></div><h2>Five moves.<br /><em>No handoff of the idea.</em></h2></div>
        <div className="ed-about-process-line" aria-hidden="true"><i /></div>
        <div className="ed-about-process-grid">
          {process.map(([number, title, copy]) => <article key={number} data-ed-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="ed-about-image-band" aria-label="Selected Artimist work">
        <figure><img src="/media/walkthrough/canopy/technical-sequence.webp" alt="Parametric architectural drawing sequence" /><figcaption>Logic / Drawing</figcaption></figure>
        <figure><img src="/media/walkthrough/canopy/pavilion-sunset.webp" alt="Computational pavilion at sunset" /><figcaption>Form / Atmosphere</figcaption></figure>
        <figure><img src="/media/editorial/sound-to-form.webp" alt="Sound to form research board" /><figcaption>Research / Future</figcaption></figure>
      </section>

      <section className="ed-about-contact">
        <div data-ed-reveal>
          <div className="ed-section-code"><span>05</span><p>Begin a conversation</p></div>
          <h2>Bring us something<br /><em>worth shaping.</em></h2>
        </div>
        <div className="ed-about-contact-rail" data-ed-reveal>
          <div className="ed-about-office-list"><span>{String(offices.length).padStart(2, "0")} offices / One studio</span>{offices.map((office) => <article key={office.code}><small>{office.code} / {office.region}</small><strong>{office.label}</strong></article>)}</div>
          <div className="ed-about-contact-links">
            <a href={`mailto:${settings.contactEmail}`}><span>Faizan / New projects</span><strong>{settings.contactEmail}</strong><Arrow /></a>
            <a href={`mailto:${settings.teamEmail}`}><span>Studio / Team</span><strong>{settings.teamEmail}</strong><Arrow /></a>
            <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><span>WhatsApp / Direct</span><strong>{settings.whatsapp}</strong><Arrow /></a>
            <Link href="/contact"><span>Structured brief</span><strong>Start a project</strong><Arrow /></Link>
          </div>
        </div>
      </section>

      <footer className="ed-footer ed-about-footer"><div>ARTIMIST</div><span>© {new Date().getFullYear()} / {offices.map((office) => office.label).join(" · ")}</span><nav><Link href="/team">Team</Link><Link href="/founder-message">Founder&apos;s message</Link><Link href="/">Selected work</Link><Link href="/admin">Studio admin</Link><a href="#top">Back to top ↑</a></nav></footer>
    </main>
  );
}
