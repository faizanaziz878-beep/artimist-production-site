"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PAGES: Array<[string, string, string]> = [
  ["01", "Home", "/"],
  ["02", "Selected work", "/#work"],
  ["03", "Services", "/services"],
  ["04", "Architecture", "/architecture"],
  ["05", "BIM & Drafting", "/bim-drafting"],
  ["06", "Visualization", "/visualization"],
  ["07", "Unreal & Real-time", "/unreal-engine"],
  ["08", "Residential", "/residential"],
  ["09", "Custom House Design", "/custom-house-design"],
  ["10", "3D Interior Design", "/3d-interior-design-service"],
  ["11", "Renovation & Permit Drawings", "/residential-renovation-permit-drawings"],
  ["12", "Visual archive", "/visual-archive"],
  ["13", "Process", "/process"],
  ["14", "Studio team", "/team"],
  ["15", "About", "/about"],
  ["16", "Founder's message", "/founder-message"],
  ["17", "Partners", "/partners"],
  ["18", "Contact", "/contact"],
];

function Icon({ kind }: { kind: "sun" | "menu" | "arrow" }) {
  if (kind === "sun") return <svg className="canonical-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.25" /><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.45 1.45M14.55 14.55L16 16M16 4l-1.45 1.45M5.45 14.55L4 16" /></svg>;
  if (kind === "menu") return <svg className="canonical-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>;
  return <svg className="canonical-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

export function SiteIndex() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"day" | "night">("day");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let saved = "day";
    try {
      saved = window.localStorage.getItem("artimist_mode") === "night" ||
        window.localStorage.getItem("artimist-editorial-theme") === "dark" ? "night" : "day";
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

  return (
    <>
      <header className="canonical-header">
        <Link className="canonical-wordmark" href="/" aria-label="Artimist home"><span><b>A</b>RTIMIST</span><small>CREATIVE PRODUCTION</small></Link>
        <nav className="canonical-primary" aria-label="Primary navigation">
          <Link href="/#work">Work</Link><Link href="/services">Services</Link><Link href="/team">Team</Link><Link href="/#plans">Plans</Link><Link href="/#brief">Brief</Link>
        </nav>
        <div className="canonical-actions">
          <button className="canonical-pill" type="button" onClick={toggleMode} aria-pressed={mode === "night"} aria-label={`Switch to ${mode === "night" ? "day" : "night"} mode`}><Icon kind="sun" /><span>{mode === "night" ? "NIGHT" : "DAY"}</span></button>
          <button className="canonical-pill" type="button" aria-expanded={open} aria-controls="site-index-panel" onClick={() => setOpen((value) => !value)}>MENU<Icon kind="menu" /></button>
          <Link className="canonical-cta" href="/contact">START A PROJECT<Icon kind="arrow" /></Link>
        </div>
      </header>

      <div id="site-index-panel" className={`site-index-panel${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site index" hidden={!open}>
        <button type="button" className="site-index-backdrop" aria-label="Close site index" onClick={() => setOpen(false)} />
        <nav className="site-index-sheet" aria-label="All pages">
          <div className="site-index-top"><p>INDEX / ALL PAGES</p><button type="button" onClick={() => setOpen(false)}>CLOSE ×</button></div>
          <ul>{PAGES.map(([no,label,href]) => {
            const base = href.split("#")[0];
            const current = base === "/" ? pathname === "/" : pathname.startsWith(base);
            return <li key={href}><Link href={href} aria-current={current ? "page" : undefined}><small>{no}</small><span>{label}</span><i aria-hidden="true">↗</i></Link></li>;
          })}</ul>
          <p className="site-index-foot">VANCOUVER · OHIO · STOCKHOLM · LAHORE</p>
        </nav>
      </div>
    </>
  );
}
