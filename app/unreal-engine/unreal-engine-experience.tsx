"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SiteSettings } from "../../lib/content";

const capabilities = [
  ["01", "Interactive Architecture", "Real-time architectural environments for design reviews, presentations, investor experiences and client exploration."],
  ["02", "Cinematic Worlds", "Camera-led films, spatial storytelling, atmosphere, lighting and motion built with the speed and flexibility of a real-time pipeline."],
  ["03", "Immersive Sales", "Property and hospitality experiences that let users move through spaces, switch finishes, compare options and understand a project before it is built."],
  ["04", "Digital Twins & Simulation", "High-fidelity spatial systems that connect geometry, information and interaction for communication, operations and future-facing product experiences."],
];

const pipeline = ["Architectural data", "Optimized geometry", "Materials + lighting", "Real-time interaction", "Cinematic delivery"];

function Arrow({ down = false }: { down?: boolean }) {
  return down
    ? <svg className="ue-arrow" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3v14M5 12l5 5 5-5" /></svg>
    : <svg className="ue-arrow" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

export function UnrealEngineExperience({ settings }: { settings: SiteSettings }) {
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
        <div className="ue-hero-scene" aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" poster="/media/residential/residential-13.webp"><source src="/media/motion/residential-build.mp4" type="video/mp4" /></video><i /><i /><i /></div>
        <div className="ue-hero-grid" aria-hidden="true" />
        <div className="ue-hero-copy">
          <span>Real-time architecture / Interactive spatial media</span>
          <h1>REAL-TIME<br /><em>ARCHITECTURE.</em></h1>
          <p>Interactive environments, cinematic walkthroughs and spatial experiences built from architectural information—not game-world decoration.</p>
          <Link href="#capabilities">Explore the system <Arrow down /></Link>
        </div>
        <div className="ue-hud ue-hud-a">LUMEN / NANITE / REALTIME</div>
        <div className="ue-hud ue-hud-b">60 FPS / INTERACTIVE VIEWPORT</div>
        <div className="ue-coordinate">WORLDWIDE DELIVERY<br />USA / UK / CANADA / SWEDEN</div>
        <div className="ue-proof-strip"><span>Live architectural loop</span><span>Realtime material + light</span><span>Optimized spatial model</span></div>
      </section>


      <section className="ue-direction" aria-labelledby="ue-direction-title">
        <div className="ue-direction-copy"><span>Creative direction / technical resolution</span><h2 id="ue-direction-title">Architecture remains the subject.</h2><p>Every environment begins with spatial intent, coordinated geometry and a defined presentation goal. Real-time technology supports the architecture; it does not replace it.</p><Link href="/case-studies">View architectural case studies <Arrow /></Link></div>
        <div className="ue-direction-grid"><figure><img src="/media/atlas/atlas-34.webp" alt="Real-time architectural environment study" /><figcaption>01 / Spatial atmosphere</figcaption></figure><figure><img src="/media/walkthrough/canopy/pavilion-sunset.webp" alt="Computational pavilion real-time visualization" /><figcaption>02 / Geometry and light</figcaption></figure></div>
      </section>

      <section className="ue-capabilities" id="capabilities">
        <header><span>Capability matrix / 04</span><h2>Built for<br /><em>presence.</em></h2></header>
        <div className="ue-cap-grid">
          {capabilities.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><Arrow /></article>)}
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

      <footer className="ue-footer"><strong>ARTIMIST</strong><span>© {new Date().getFullYear()} / WORLDWIDE · USA · UK · CANADA · SWEDEN</span><nav><Link href="/">Home</Link><Link href="/team">Team</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link><a href="#top">Top</a></nav></footer>
    </main>
  );
}
