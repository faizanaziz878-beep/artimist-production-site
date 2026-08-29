"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SiteSettings } from "../../lib/content";
import { getStudioOffices } from "../../lib/content";
import { UiIcon } from "../ui-icon";

function Arrow({ down = false }: { down?: boolean }) {
  return <UiIcon className={down ? "ed-arrow-down" : "ui-icon"} name={down ? "chevron" : "arrow"} size={16} />;
}

function FounderTrace() {
  return (
    <svg className="ed-founder-trace" viewBox="0 0 680 820" fill="none" aria-hidden="true">
      <g className="ed-founder-trace-main">
        <path d="M68 692H608M108 692V186H565V692M108 248H565M108 517H565" />
        <path d="M196 186V692M337 186V692M478 186V692" />
        <path d="M108 186L337 84L565 186M196 248L337 132L478 248" />
        <circle cx="337" cy="248" r="92" />
      </g>
      <g className="ed-founder-trace-dimensions">
        <path d="M108 750H565M108 741V759M565 741V759M319 735V769M354 750H319" />
        <path d="M52 186V692M43 186H61M43 692H61" />
      </g>
      <g className="ed-founder-trace-text">
        <text x="306" y="791">24.60 M / AXIS</text>
        <text x="23" y="483" transform="rotate(-90 23 483)">FOUNDER / SECTION 01</text>
      </g>
    </svg>
  );
}

export function FounderMessageExperience({ settings }: { settings: SiteSettings }) {
  const locations = getStudioOffices(settings);

  useEffect(() => {
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

  return (
    <main className="editorial-site ed-founder">
      <div className="ed-progress" aria-hidden="true" />

      <section className="ed-founder-hero" id="top">
        <img className="ed-founder-collage" src="/media/generated/founder-architectural-collage-v1.svg" alt="" aria-hidden="true" fetchPriority="high" />
        <div className="ed-founder-hero-copy">
          <div className="ed-section-code"><span>00</span><p>Founder&apos;s message</p></div>
          <h1>A clear idea.<br /><em>Carried through.</em></h1>
          <p>A founder’s note on why architecture, visualization, technology and delivery should protect the same central idea.</p>
        </div>
        <figure className="ed-founder-portrait">
          <img src="/media/team/faizan-founder-hd.webp" alt="Faizan Aziz, founder and creative director of Artimist Productions" fetchPriority="high" />
          <figcaption><span>Faizan Aziz</span><strong>Founder / Architect / Creative Director</strong></figcaption>
        </figure>
        <FounderTrace />
        <div className="ed-founder-meta"><span>Studio network / 04</span><span>Vancouver / Ohio / Stockholm / Lahore</span><span>Message / 01</span></div>
        <a className="ed-founder-scroll" href="#letter">Read the message <Arrow down /></a>
      </section>

      <section className="ed-founder-letter" id="letter">
        <aside data-ed-reveal>
          <span>01 / A connected practice</span>
          <div><img src="/media/team/faizan-founder-hd.webp" alt="" loading="lazy" /><p><strong>Faizan Aziz</strong><small>Founder & Creative Director</small></p></div>
        </aside>
        <article data-ed-reveal>
          <p className="ed-founder-opening">Artimist began with a simple frustration: creative work is too often divided into disconnected pieces.</p>
          <p>Architecture happens in one room, visualization in another, branding arrives later, and digital experience is treated as the final layer. I wanted to build a practice where the central idea could survive every translation.</p>
          <p>For us, design is a way of thinking before it is a style. A drawing must understand construction. An image must carry atmosphere. An identity must tell the truth about the work. Technology should deepen the human experience rather than become the spectacle.</p>
          <blockquote>We are not building separate services. We are building one creative intelligence that can move between them.</blockquote>
          <p>Our team is deliberately multidisciplinary. Architects, visualizers, BIM specialists, animators, graphics experts, real-time engineers and creative strategists sit around the same table. The people shown on this website are our main team—not the whole team. Artimist is strengthened by a wider network of trusted specialists, production partners and collaborators who join us according to the needs of each project.</p>
          <p>We are young enough to question established habits and serious enough to deliver professionally. Whether we are shaping a building, an image, a brand, a film or an interactive product, we care about clarity, craft and the way the final work makes people feel.</p>
          <p>To every client and collaborator: bring us honest ambition. We will bring curiosity, rigor and the determination to carry the idea all the way through.</p>
          <footer><span>With intent,</span><strong>Faizan Aziz</strong><small>Founder & Creative Director<br />Artimist Productions</small></footer>
        </article>
      </section>

      <section className="ed-founder-values">
        <div data-ed-reveal><div className="ed-section-code"><span>02</span><p>What guides the practice</p></div><h2>Curiosity.<br />Rigor.<br /><em>Feeling.</em></h2></div>
        <div className="ed-founder-value-grid">
          <article data-ed-reveal><span>01</span><h3>Question the obvious.</h3><p>Research deeply enough to discover a more intelligent direction.</p></article>
          <article data-ed-reveal><span>02</span><h3>Resolve the idea.</h3><p>Carry concept into drawings, systems, coordination and production.</p></article>
          <article data-ed-reveal><span>03</span><h3>Make it human.</h3><p>Measure success by the clarity, memory and emotion the work creates.</p></article>
        </div>
      </section>

      <section className="ed-founder-team-note" data-ed-reveal>
        <div className="ed-section-code"><span>03</span><p>The people behind the work</p></div>
        <h2>Main team.<br /><em>Wider intelligence.</em></h2>
        <p>The core team gives Artimist its continuity. Our extended network gives every project the exact specialist depth it needs.</p>
        <Link href="/team">Meet the main team <Arrow /></Link>
      </section>

      <section className="ed-founder-contact">
        <div data-ed-reveal><span>Begin a conversation / 04</span><h2>Let&apos;s shape<br /><em>what comes next.</em></h2></div>
        <div data-ed-reveal><div className="ed-founder-office-list"><span>Working locations</span>{locations.map((location) => <p key={location.code}><small>{location.code} / {location.region}</small><strong>{location.label}</strong></p>)}</div><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}<Arrow /></a><a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp {settings.whatsapp}<Arrow /></a><Link href="/contact">Start a project <Arrow /></Link></div>
      </section>

      <footer className="ed-footer"><div>ARTIMIST</div><span>© {new Date().getFullYear()} / {locations.map((location) => location.label).join(" · ")}</span><nav><Link href="/team">Team</Link><Link href="/about">About</Link><Link href="/">Selected work</Link><a href="#top">Back to top <UiIcon className="ed-arrow-up" name="chevron" size={14} /></a></nav></footer>
    </main>
  );
}
