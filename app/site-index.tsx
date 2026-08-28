"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UiIcon } from "./ui-icon";

// Keep the site index as the canonical crawlable map of the public site.
// These are real user-facing routes (not SEO-only aliases), so every important
// page has a durable internal discovery path even if the XML sitemap is stale.
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
  ["12", "Architectural Drafting", "/architectural-drafting-services"],
  ["13", "Revit Drafting", "/revit-drafting-services"],
  ["14", "BIM Modeling", "/bim-modeling-services"],
  ["15", "Permit Drawing Services", "/permit-drawing-services"],
  ["16", "Construction Documentation", "/construction-documentation-services"],
  ["17", "Architectural Rendering", "/services/architectural-rendering"],
  ["18", "3D Interior Rendering", "/services/3d-interior-rendering"],
  ["19", "Real Estate Rendering", "/services/real-estate-rendering"],
  ["20", "Architectural Animation", "/services/architectural-animation"],
  ["21", "Unreal & Real-time", "/unreal-engine"],
  ["22", "Residential", "/residential"],
  ["23", "Case Studies", "/case-studies"],
  ["24", "RV Park Design & Site Planning", "/case-studies/rv-park-design"],
  ["25", "Permit Application Packages", "/case-studies/permit-application-packages"],
  ["26", "Home Interior Design", "/case-studies/home-interior-design"],
  ["27", "Residential Exterior Design", "/case-studies/residential-exterior-design"],
  ["28", "Bowl Stroke", "/case-studies/bowl-stroke"],
  ["29", "Harmonic Horizons", "/case-studies/harmonic-horizons"],
  ["30", "U.S. Permit Documentation", "/case-studies/us-permit-documentation"],
  ["31", "Residential Visualization", "/case-studies/residential-visualization"],
  ["32", "Parametric Canopy Studies", "/case-studies/parametric-canopy-studies"],
  ["33", "Connected Learning Auditorium", "/case-studies/connected-learning-auditorium"],
  ["34", "Insights", "/insights"],
  ["35", "Custom House Plan Costs", "/insights/how-much-do-custom-house-plans-cost"],
  ["36", "Permit vs Construction Drawings", "/insights/permit-drawings-vs-construction-drawings"],
  ["37", "How to Modify a Floor Plan", "/insights/how-to-modify-an-existing-floor-plan"],
  ["38", "Revit Drafting vs CAD", "/insights/revit-drafting-vs-cad-drafting"],
  ["39", "What Is Scan to BIM?", "/insights/what-is-scan-to-bim"],
  ["40", "LOD 200 vs 300 vs 400", "/insights/lod-200-vs-lod-300-vs-lod-400"],
  ["41", "Architectural Rendering Costs", "/insights/how-much-does-architectural-rendering-cost"],
  ["42", "3D Rendering vs Unreal Engine", "/insights/3d-rendering-vs-unreal-engine-walkthrough"],
  ["43", "International", "/international"],
  ["44", "United States", "/usa"],
  ["45", "Canada", "/canada"],
  ["46", "United Kingdom", "/uk"],
  ["47", "Sweden", "/sweden"],
  ["48", "Visual Archive", "/visual-archive"],
  ["49", "Process", "/process"],
  ["50", "Studio Team", "/team"],
  ["51", "About", "/about"],
  ["52", "Founder's Message", "/founder-message"],
  ["53", "Partners", "/partners"],
  ["54", "Decoding Bits", "/partners/decoding-bits"],
  ["55", "Scallance", "/partners/scallance"],
  ["56", "Proof & Trust", "/proof"],
  ["57", "Contact", "/contact"],
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
      <nav className="site-index-sheet" aria-label="All public pages">
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
