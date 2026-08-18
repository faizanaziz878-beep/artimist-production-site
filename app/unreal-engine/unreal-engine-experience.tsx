"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SiteSettings } from "../../lib/content";
import { getStudioOffices } from "../../lib/content";

const capabilities = [
  ["01", "Interactive Architecture", "Real-time architectural environments for design reviews, presentations, investor experiences and client exploration."],
  ["02", "Cinematic Worlds", "Camera-led films, spatial storytelling, atmosphere, lighting and motion built with the speed and flexibility of a real-time pipeline."],
  ["03", "Immersive Sales", "Property and hospitality experiences that let users move through spaces, switch finishes, compare options and understand a project before it is built."],
  ["04", "Digital Twins & Simulation", "High-fidelity spatial systems that connect geometry, information and interaction for communication, operations and future-facing product experiences."],
];

const pipeline = ["Architectural data", "Optimized geometry", "Materials + lighting", "Real-time interaction", "Cinematic delivery"];

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

export function UnrealEngineExperience({ settings }: { settings: SiteSettings }) {
  const offices = getStudioOffices(settings);

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--ue-progress", String(total > 0 ? window.scrollY / total : 0));
      document.documentElement.style.setProperty("--ue-scroll", `${window.scrollY}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="ue-page" id="top">
      <div className="ue-progress" aria-hidden="true" />
      <header className="ue-header">
        <Link href="/" className="ue-brand"><strong>ARTIMIST</strong><span>Unreal Engine / Real-time</span></Link>
        <nav><Link href="/#recent-projects">Projects</Link><Link href="/team">Team</Link><Link href="/services">Services</Link><Link href="/contact">Start a project</Link></nav>
      </header>

      <section className="ue-hero">
        <div className="ue-hero-scene" aria-hidden="true"><img src="/media/atlas/atlas-34.webp" alt="" /><i /><i /><i /></div>
        <div className="ue-hero-grid" aria-hidden="true" />
        <div className="ue-hero-copy">
          <span>Artimist / Real-time production / 2026</span>
          <h1>UNREAL<br /><em>ENGINE.</em></h1>
          <p>Architecture you do not just look at. You enter it, move through it, change it and feel it in real time.</p>
          <Link href="#capabilities">Explore the system <Arrow down /></Link>
        </div>
        <div className="ue-hud ue-hud-a">LUMEN / NANITE / REALTIME</div>
        <div className="ue-hud ue-hud-b">60 FPS / INTERACTIVE VIEWPORT</div>
        <div className="ue-coordinate">YVR / OH / STO / LHE<br />WORLDWIDE DELIVERY</div>
      </section>

      <section className="ue-directors">
        <div className="ue-directors-title"><span>Core direction / 02</span><h2>Creative control.<br /><em>Technical depth.</em></h2><p>High-end real-time work sits between architecture, storytelling and engineering. We keep those decisions connected from the first model to the final interactive build.</p></div>
        <div className="ue-director-stage">
          <figure className="ue-director ue-faizan"><div><img src="/media/team/faizan-founder-hd.webp" alt="Faizan Aziz" /></div><figcaption><small>Founder / Creative Director</small><strong>Faizan Aziz</strong><p>Creative direction, architectural language, experience design and final visual standard.</p></figcaption></figure>
          <figure className="ue-director ue-hanan"><div><img src="/media/team/hanan-profile-2026.webp" alt="Hanan Shahid" /></div><figcaption><small>Unreal Engine Engineer / Architect</small><strong>Hanan Shahid</strong><p>Real-time engineering, environment production, optimization and computational workflows.</p></figcaption></figure>
          <span className="ue-link-line" aria-hidden="true">CREATIVE DIRECTION × REAL-TIME ENGINEERING</span>
        </div>
      </section>

      <section className="ue-capabilities" id="capabilities">
        <header><span>Capability matrix / 04</span><h2>Built for<br /><em>presence.</em></h2></header>
        <div className="ue-cap-grid">
          {capabilities.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}
        </div>
      </section>

      <section className="ue-showcase">
        <figure className="ue-showcase-main"><img src="/media/residential/residential-13.webp" alt="Real-time residential visualization study" /><figcaption><span>Realtime architecture / atmosphere</span><strong>Move from model to lived experience.</strong></figcaption></figure>
        <div className="ue-showcase-stack">
          <figure><img src="/media/walkthrough/bowl/exterior-hero.webp" alt="Hospitality visualization" /><figcaption>Hospitality / cinematic light</figcaption></figure>
          <figure><img src="/media/walkthrough/canopy/pavilion-sunset.webp" alt="Computational pavilion visualization" /><figcaption>Parametric / realtime translation</figcaption></figure>
        </div>
      </section>

      <section className="ue-pipeline">
        <div><span>Production system</span><h2>One pipeline.<br /><em>No visual handoff gap.</em></h2></div>
        <ol>{pipeline.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><i /></li>)}</ol>
      </section>

      <section className="ue-market">
        <div className="ue-market-copy"><span>For developers / architects / brands</span><h2>When a still image<br />is not enough.</h2><p>Use Unreal Engine to sell an unbuilt development, review a complex design, create a cinematic launch film, prototype a spatial product or build an interactive environment your audience remembers.</p></div>
        <div className="ue-market-cards">
          <article><span>01</span><strong>Property + Architecture</strong><p>Interactive walkthroughs, finish options, sales suites and design-review environments.</p></article>
          <article><span>02</span><strong>Hospitality + Retail</strong><p>Cinematic experiential spaces, branded environments and customer-facing interactive concepts.</p></article>
          <article><span>03</span><strong>Industrial + Infrastructure</strong><p>Process visualization, equipment environments, logistics stories and spatial communication.</p></article>
          <article><span>04</span><strong>Digital + Experiential</strong><p>Virtual environments, events, game-ready spaces and high-impact real-time visual systems.</p></article>
        </div>
      </section>

      <section className="ue-cta">
        <span>Next build / 01</span><h2>Give people<br /><em>a world to enter.</em></h2><div><Link href="/contact">Start an Unreal Engine project <Arrow /></Link><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}<Arrow /></a></div>
      </section>

      <footer className="ue-footer"><strong>ARTIMIST</strong><span>© {new Date().getFullYear()} / {offices.map((office) => office.label).join(" · ")}</span><nav><Link href="/">Home</Link><Link href="/team">Team</Link><Link href="/admin">Admin</Link><a href="#top">Top ↑</a></nav></footer>
    </main>
  );
}
