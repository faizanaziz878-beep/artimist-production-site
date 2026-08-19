"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { VisualChapter, VisualScene } from "../lib/visual-content";

type VisualJourneyProps = {
  kind: "residential" | "atlas";
  eyebrow: string;
  title: string;
  intro: string;
  chapters: VisualChapter[];
  technicalBoards?: VisualScene[];
};

export function VisualJourney({ kind, eyebrow, title, intro, chapters, technicalBoards = [] }: VisualJourneyProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const sceneCount = useMemo(() => chapters.reduce((total, chapter) => total + chapter.scenes.length, 0), [chapters]);
  const heroScene = kind === "residential" ? chapters[1]?.scenes[1] || chapters[0]?.scenes[0] : chapters[1]?.scenes[0] || chapters[0]?.scenes[0];

  useEffect(() => {
    const saved = window.localStorage.getItem("artimist-editorial-theme");
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    const timer = window.setTimeout(() => setTheme(initial), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("artimist-editorial-theme", next);
    setTheme(next);
  }

  return (
    <main className={`visual-journey visual-journey-${kind}`}>
      <header className="vj-header">
        <Link className="vj-wordmark" href="/" aria-label="Artimist Production home"><strong>ARTIMIST</strong><span>Creative Production</span></Link>
        <nav aria-label="Visual archive navigation"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/process">Process</Link><Link href="/team">Team</Link><Link href="/contact">Contact</Link><button onClick={toggleTheme}>{theme === "dark" ? "Night" : "Day"}<i /></button></nav>
      </header>

      <section className="vj-hero">
        {heroScene && <img src={heroScene.src} alt="" />}
        <div className="vj-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="vj-hero-copy">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="vj-hero-index"><span>{String(sceneCount).padStart(2, "0")} visuals</span><span>{String(chapters.length).padStart(2, "0")} chapters</span>{technicalBoards.length > 0 && <span>{String(technicalBoards.length).padStart(2, "0")} full plates</span>}</div>
        <a className="vj-enter" href={`#${chapters[0]?.slug}`}>Enter the sequence <b>↓</b></a>
      </section>

      <div className="vj-manifesto"><span>Images lead. Words locate.</span><p>Every frame is presented at its natural ratio. Nothing important is cropped, stretched or hidden behind the interface.</p></div>

      {chapters.map((chapter, chapterIndex) => (
        <section className="vj-chapter" id={chapter.slug} key={chapter.slug}>
          <header className="vj-chapter-head">
            <span>{chapter.code}</span><h2>{chapter.title}</h2><p>{chapter.intro}</p><small>{String(chapter.scenes.length).padStart(2, "0")} scenes</small>
          </header>
          <div className="vj-scenes">
            {chapter.scenes.map((scene, sceneIndex) => {
              const globalIndex = chapters.slice(0, chapterIndex).reduce((total, item) => total + item.scenes.length, 0) + sceneIndex + 1;
              return (
                <figure className={`vj-scene ${sceneIndex % 3 === 1 ? "is-inset" : ""} ${sceneIndex % 3 === 2 ? "is-offset" : ""}`} key={`${chapter.slug}-${sceneIndex}-${scene.src}`}>
                  <div className="vj-media-stage">
                    <img className="vj-media-backdrop" src={scene.src} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                    <img className="vj-media-primary" src={scene.src} alt={`${chapter.title} — ${scene.label}`} loading="eager" decoding="async" fetchPriority={sceneIndex === 0 ? "high" : "auto"} onError={(event) => event.currentTarget.parentElement?.classList.add("is-missing")} />
                  </div>
                  <figcaption><span>{String(globalIndex).padStart(2, "0")} / {String(sceneCount).padStart(2, "0")}</span><strong>{scene.label}</strong><p>{scene.detail}</p></figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ))}

      {technicalBoards.length > 0 && (
        <section className="vj-technical" id="technical-plates">
          <header><span>T / 21</span><h2>Drawings shown whole.</h2><p>Scroll sideways through the complete presentation plates. Every title, diagram, plan, section and annotation remains inside the frame.</p></header>
          <div className="vj-board-rail">
            {technicalBoards.map((board, index) => <figure key={board.src}><img src={board.src} alt={`${board.label} — ${board.detail}`} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, "0")} / {String(technicalBoards.length).padStart(2, "0")}</span><strong>{board.label}</strong><small>{board.detail}</small></figcaption></figure>)}
          </div>
        </section>
      )}

      <section className="vj-end">
        <span>End of sequence</span><h2>See the work.<br /><em>Feel the space.</em></h2><div><Link href="/">Return to studio <b>↗︎</b></Link><Link href="/contact">Start a project <b>↗︎</b></Link></div>
      </section>
    </main>
  );
}
