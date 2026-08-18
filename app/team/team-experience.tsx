"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteSettings, TeamMember } from "../../lib/content";
import { getStudioOffices } from "../../lib/content";

const portraitPosition: Record<string, string> = {
  "Faizan Aziz": "50% 27%",
  "Mahnoor Shiekh": "52% 26%",
  "Jannat Niaz": "50% 32%",
  "Aden Mansoor": "50% 29%",
  "Sufyan Ilyas": "50% 46%",
  "Zarmeen Khan": "50% 26%",
  "Abdur Rehman": "50% 42%",
  "Farwa Kashif": "50% 44%",
  "Hanan Shahid": "50% 46%",
  "Rohma Fatima": "50% 46%",
  "Eunica Amir": "50% 44%",
  "Shumail": "50% 46%",
  "Ezza Shahid": "50% 30%",
};

function Arrow({ down = false }: { down?: boolean }) {
  return <span aria-hidden="true">{down ? "↓" : "↗"}</span>;
}

function Monogram({ name }: { name: string }) {
  return <span className="tp-monogram">{name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</span>;
}

function Portrait({ person, decorative = false }: { person: TeamMember; decorative?: boolean }) {
  return person.image
    ? <img src={person.image} alt={decorative ? "" : person.name} style={{ objectPosition: portraitPosition[person.name] || "50% 28%" }} />
    : <Monogram name={person.name} />;
}

export function TeamExperience({ team, settings }: { team: TeamMember[]; settings: SiteSettings }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const offices = getStudioOffices(settings);

  useEffect(() => {
    const saved = window.localStorage.getItem("artimist-editorial-theme");
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    const timer = window.setTimeout(() => setTheme(initial), 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-present")),
      { threshold: 0.24, rootMargin: "0px 0px -7%" },
    );
    document.querySelectorAll("[data-team-entry]").forEach((node) => observer.observe(node));
    return () => {
      window.clearTimeout(timer);
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
    <main className="team-page">
      <header className="tp-header">
        <Link className="tp-wordmark" href="/" aria-label="Artimist Production home"><strong>ARTIMIST</strong><span>Creative Production</span></Link>
        <nav aria-label="Team page navigation"><Link href="/">Home</Link><Link href="/#work">Work</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link><button onClick={toggleTheme}>{theme === "dark" ? "Night" : "Day"}<i /></button></nav>
      </header>

      <section className="tp-hero" id="top">
        <img className="tp-hero-image" src="/media/atlas/atlas-08.webp" alt="" />
        <div className="tp-hero-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="tp-hero-copy">
          <span>Studio / Main team / {String(team.length).padStart(2, "0")}</span>
          <h1>People<br />in <em>motion.</em></h1>
          <p>Different disciplines. One shared standard. Meet the main team at the center of Artimist—and the wider intelligence that moves with them.</p>
        </div>
        <div className="tp-lineup" aria-hidden="true">
          {team.map((person, index) => <div className="tp-lineup-person" key={person.name} style={{ "--tp-i": index } as CSSProperties}><div><Portrait person={person} decorative /></div></div>)}
        </div>
        <a className="tp-enter" href="#promenade">Follow the team <Arrow down /></a>
      </section>

      <section className="tp-manifesto">
        <span>Core roster / Wider network</span>
        <h2>This is our main team.<br /><em>Not the whole team.</em></h2>
        <p>The people presented here give Artimist continuity across architecture, visualization, BIM, animation, graphics, real-time engineering, interiors and studio operations. Around them is a trusted network of specialist collaborators assembled for the precise needs of each project.</p>
      </section>

      <section className="tp-promenade" id="promenade">
        <div className="tp-route" aria-hidden="true"><i /><i /><i /><i /></div>
        {team.map((person, index) => (
          <article className={`tp-member ${index % 2 ? "from-right" : "from-left"}`} key={person.name} data-team-entry>
            <div className="tp-member-index"><span>{String(index + 1).padStart(2, "0")}</span><small>{String(team.length).padStart(2, "0")}</small></div>
            <div className={`tp-person-visual ${person.image ? "" : "is-reserved"}`}>
              <i className="tp-person-shadow" aria-hidden="true" />
              <div className="tp-face-shell"><Portrait person={person} /></div>
              {!person.image && <span className="tp-reserved-note">Portrait reserved</span>}
            </div>
            <div className="tp-person-copy">
              <p>{person.role}</p>
              <h3>{person.name}</h3>
              <span>{person.bio}</span>
              {person.linkedin && <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>}
            </div>
          </article>
        ))}
      </section>

      <section className="tp-network">
        <div><span>Beyond the frame</span><h2>A core team.<br /><em>An expandable studio.</em></h2></div>
        <div><p>Artimist scales intelligently. When a project needs added depth, our main team brings in trusted collaborators across production, engineering, research, development and specialist delivery—without losing one clear creative direction.</p><Link href="/founder-message">Read the founder&apos;s message <Arrow /></Link><Link href="/services">See how the disciplines connect <Arrow /></Link></div>
      </section>

      <section className="tp-contact">
        <span>Next movement / Project 01</span>
        <h2>Bring the team<br /><em>into your project.</em></h2>
        <div><Link href="/contact">Start a project <Arrow /></Link><a href={`mailto:${settings.teamEmail}`}>{settings.teamEmail}<Arrow /></a></div>
      </section>

      <footer className="tp-footer"><strong>ARTIMIST</strong><span>© {new Date().getFullYear()} / {offices.map((office) => office.label).join(" · ")}</span><nav><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="#top">Top ↑</Link></nav></footer>
    </main>
  );
}
