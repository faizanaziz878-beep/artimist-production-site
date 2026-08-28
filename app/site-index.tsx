"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UiIcon } from "./ui-icon";

const PAGES: Array<[string, string, string]> = [
  ["01", "Home", "/"],
  ["02", "Selected work", "/#work"],
  ["03", "Home Design Help", "/home-design-services"],
  ["04", "Custom House Design", "/custom-house-design"],
  ["05", "Plan Changes & Redraws", "/plan-modification-service"],
  ["06", "3D Interior Design", "/3d-interior-design-service"],
  ["07", "Renovation & Permit Drawings", "/residential-renovation-permit-drawings"],
  ["08", "Services", "/services"],
  ["09", "Architecture", "/architecture"],
  ["10", "BIM & Drafting", "/bim-drafting"],
  ["11", "Visualization", "/visualization"],
  ["12", "Unreal & Real-time", "/unreal-engine"],
  ["13", "Residential", "/residential"],
  ["14", "Case Studies", "/case-studies"],
  ["15", "International", "/international"],
  ["16", "Visual archive", "/visual-archive"],
  ["17", "Process", "/process"],
  ["18", "Studio team", "/team"],
  ["19", "About", "/about"],
  ["20", "Founder's message", "/founder-message"],
  ["21", "Partners", "/partners"],
  ["22", "Proof & Trust", "/proof"],
  ["23", "Contact", "/contact"],
];

const PRIMARY: Array<[string, string]> = [
  ["Home Design", "/home-design-services"],
  ["Services", "/services"],
  ["Case Studies", "/case-studies"],
  ["International", "/international"],
  ["Contact", "/contact"],
];

export function SiteIndex() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"day" | "night">("day");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let saved = "day";
    try {
      saved = window.localStorage.getItem("artimist_mode") === "night" || window.localStorage.getItem("artimist-editorial-theme") === "dark" ? "night" : "day";
    } catch {}
    const next = saved === "night" ? "night" : "day";
    document.documentElement.dataset.mode = next;
    document.documentElement.dataset.theme = next === "night" ? "dark" : "light";
    document.body.dataset.mode = next;
    setMode(next);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  function toggleMode() {
    const next = mode === "night" ? "day" : "night";
    setMode(next);
    document.documentElement.dataset.mode = next;
    document.documentElement.dataset.theme = next === "night" ? "dark" : "light";
    document.body.dataset.mode = next;
    try {
      window.localStorage.setItem("artimist_mode", next);
      window.localStorage.setItem("artimist-editorial-theme", next === "night" ? "dark" : "light");
    } catch {}
  }

  return <>
    <a className="canonical-skip" href="#main-content">Skip to content</a>
    <header className="canonical-header">
      <Link className="canonical-wordmark" href="/" aria-label="Artimist Productions home">
        <span><b>A</b>RTIMIST</span><small>CREATIVE PRODUCTION</small>
      </Link>
      <nav className="canonical-primary" aria-label="Primary navigation">
        {PRIMARY.map(([label, href]) => {
          const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return <Link key={href} href={href} aria-current={current ? "page" : undefined}>{label}</Link>;
        })}
      </nav>
      <div className="canonical-actions">
        <button className="canonical-pill" type="button" onClick={toggleMode} aria-pressed={mode === "night"} aria-label={`Switch to ${mode === "night" ? "day" : "night"} mode`}>
          <UiIcon name={mode === "night" ? "moon" : "sun"} size={16} />
          <span>{mode === "night" ? "NIGHT" : "DAY"}</span>
        </button>
        <button className="canonical-pill" type="button" aria-expanded={open} aria-controls="site-index-panel" onClick={() => setOpen((value) => !value)}>
          <span>MENU</span><UiIcon name="menu" size={16} />
        </button>
        <Link className="canonical-cta" href="/contact">
          <span>START A PROJECT</span><UiIcon name="arrow" size={16} />
        </Link>
      </div>
    </header>
    <div id="site-index-panel" className={`site-index-panel${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site index" hidden={!open}>
      <button type="button" className="site-index-backdrop" aria-label="Close site index" onClick={() => setOpen(false)} />
      <nav className="site-index-sheet" aria-label="All pages">
        <div className="site-index-top">
          <p>INDEX / ALL PAGES</p>
          <button type="button" className="site-index-close" aria-label="Close site index" onClick={() => setOpen(false)}><span>CLOSE</span><UiIcon name="close" size={15} /></button>
        </div>
        <ul>
          {PAGES.map(([no, label, href]) => {
            const base = href.split("#")[0];
            const current = base === "/" ? pathname === "/" : pathname.startsWith(base);
            return <li key={href}><Link href={href} aria-current={current ? "page" : undefined}><small>{no}</small><span>{label}</span><i aria-hidden="true"><UiIcon name="arrow" size={16} /></i></Link></li>;
          })}
        </ul>
        <p className="site-index-foot">WORLDWIDE · USA · UK · CANADA · SWEDEN</p>
      </nav>
    </div>
  </>;
}
