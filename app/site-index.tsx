"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UiIcon } from "./ui-icon";

// Keep the site index as the canonical crawlable map of the public site.
// The menu groups destinations first so visitors are not confronted with the
// full navigation tree at once. Anchors are destinations, not separate pages.
const PAGES: Array<[string, string, string, string]> = [
  ["01", "Home", "/", "Start"],
  ["02", "Selected work", "/#work", "Start"],
  ["03", "Home Design Help", "/home-design-services", "Home design"],
  ["04", "Custom House Design", "/custom-house-design", "Home design"],
  ["05", "Plan Changes & Redraws", "/plan-modification-service", "Home design"],
  ["06", "3D Interior Design", "/3d-interior-design-service", "Home design"],
  ["07", "Renovation & Permit Drawings", "/residential-renovation-permit-drawings", "Home design"],
  ["08", "Services", "/services", "Professional studio"],
  ["09", "Architecture", "/architecture", "Professional studio"],
  ["10", "BIM & Drafting", "/bim-drafting", "Professional studio"],
  ["11", "Visualization", "/visualization", "Professional studio"],
  ["12", "Architectural Drafting", "/architectural-drafting-services", "Professional studio"],
  ["13", "Revit Drafting", "/revit-drafting-services", "Professional studio"],
  ["14", "BIM Modeling", "/bim-modeling-services", "Professional studio"],
  ["15", "Permit Drawing Services", "/permit-drawing-services", "Professional studio"],
  ["16", "Construction Documentation", "/construction-documentation-services", "Professional studio"],
  ["17", "Architectural Rendering", "/services/architectural-rendering", "Professional studio"],
  ["18", "3D Interior Rendering", "/services/3d-interior-rendering", "Professional studio"],
  ["19", "Real Estate Rendering", "/services/real-estate-rendering", "Professional studio"],
  ["20", "Architectural Animation", "/services/architectural-animation", "Professional studio"],
  ["21", "Unreal & Real-time", "/unreal-engine", "Professional studio"],
  ["22", "Residential", "/residential", "Professional studio"],
  ["23", "Case Studies", "/case-studies", "Case studies"],
  ["24", "RV Park Design & Site Planning", "/case-studies/rv-park-design", "Case studies"],
  ["25", "Permit Application Packages", "/case-studies/permit-application-packages", "Case studies"],
  ["26", "Home Interior Design", "/case-studies/home-interior-design", "Case studies"],
  ["27", "Residential Exterior Design", "/case-studies/residential-exterior-design", "Case studies"],
  ["28", "Bowl Stroke", "/case-studies/bowl-stroke", "Case studies"],
  ["29", "Harmonic Horizons", "/case-studies/harmonic-horizons", "Case studies"],
  ["30", "U.S. Permit Documentation", "/case-studies/us-permit-documentation", "Case studies"],
  ["31", "Residential Visualization", "/case-studies/residential-visualization", "Case studies"],
  ["32", "Parametric Canopy Studies", "/case-studies/parametric-canopy-studies", "Case studies"],
  ["33", "Connected Learning Auditorium", "/case-studies/connected-learning-auditorium", "Case studies"],
  ["34", "Insights", "/insights", "Insights"],
  ["35", "Custom House Plan Costs", "/insights/how-much-do-custom-house-plans-cost", "Insights"],
  ["36", "Permit vs Construction Drawings", "/insights/permit-drawings-vs-construction-drawings", "Insights"],
  ["37", "How to Modify a Floor Plan", "/insights/how-to-modify-an-existing-floor-plan", "Insights"],
  ["38", "Revit Drafting vs CAD", "/insights/revit-drafting-vs-cad-drafting", "Insights"],
  ["39", "What Is Scan to BIM?", "/insights/what-is-scan-to-bim", "Insights"],
  ["40", "LOD 200 vs 300 vs 400", "/insights/lod-200-vs-lod-300-vs-lod-400", "Insights"],
  ["41", "Architectural Rendering Costs", "/insights/how-much-does-architectural-rendering-cost", "Insights"],
  ["42", "3D Rendering vs Unreal Engine", "/insights/3d-rendering-vs-unreal-engine-walkthrough", "Insights"],
  ["43", "International", "/international", "International"],
  ["44", "United States", "/usa", "International"],
  ["45", "Canada", "/canada", "International"],
  ["46", "United Kingdom", "/uk", "International"],
  ["47", "Sweden", "/sweden", "International"],
  ["48", "Visual Archive", "/visual-archive", "Work & delivery"],
  ["49", "Process", "/process", "Work & delivery"],
  ["50", "Studio Team", "/team", "Studio"],
  ["51", "About", "/about", "Studio"],
  ["52", "Founder's Message", "/founder-message", "Studio"],
  ["53", "Partners", "/partners", "Studio"],
  ["54", "Decoding Bits", "/partners/decoding-bits", "Studio"],
  ["55", "Scallance", "/partners/scallance", "Studio"],
  ["56", "Proof & Trust", "/proof", "Studio"],
  ["57", "Contact", "/contact", "Studio"],
];

const PUBLIC_PAGE_COUNT = PAGES.filter(([, , href]) => !href.includes("#")).length;

// Mirror the homepage navigation exactly. Internal pages should never introduce
// a second information architecture when the visitor leaves the homepage.
const PRIMARY: Array<[string, string]> = [
  ["Work", "/#work"],
  ["Services", "/#disciplines"],
  ["Team", "/#team"],
  ["Plans", "/#plans"],
  ["Brief", "/contact"],
];

const GROUPS = Array.from(new Set(PAGES.map((page) => page[3])));

export function SiteIndex() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mode, setMode] = useState<"day" | "night">("day");

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

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
          const current = href === "/contact" ? pathname === "/contact" : false;
          return <Link key={href} href={href} aria-current={current ? "page" : undefined}>{label}</Link>;
        })}
      </nav>
      <div className="canonical-actions">
        <button className="canonical-pill" type="button" onClick={toggleMode} aria-pressed={mode === "night"} aria-label={`Switch to ${mode === "night" ? "day" : "night"} mode`}>
          <UiIcon name={mode === "night" ? "moon" : "sun"} size={16} />
          <span>{mode === "night" ? "NIGHT" : "DAY"}</span>
        </button>
        <button className="canonical-pill" type="button" aria-expanded={open} aria-controls="site-index-panel" onClick={() => {
          setOpen((value) => !value);
          if (open) setOpenGroup(null);
        }}>
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
          <p>INDEX / {PUBLIC_PAGE_COUNT} PAGES</p>
          <button type="button" className="site-index-close" aria-label="Close site index" onClick={() => setOpen(false)}><span>CLOSE</span><UiIcon name="close" size={15} /></button>
        </div>

        <div className="site-index-groups">
          {GROUPS.map((group, groupIndex) => {
            const pages = PAGES.filter((page) => page[3] === group);
            const expanded = openGroup === group;
            const panelId = `site-index-group-${groupIndex}`;
            return <section className={`site-index-category${expanded ? " is-open" : ""}`} key={group}>
              <button
                className="site-index-group-toggle"
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenGroup(expanded ? null : group)}
              >
                <small>{String(groupIndex + 1).padStart(2, "0")}</small>
                <span>{group}</span>
                <b>{String(pages.length).padStart(2, "0")}</b>
                <i aria-hidden="true">{expanded ? "−" : "+"}</i>
              </button>
              <ul id={panelId} hidden={!expanded}>
                {pages.map(([no, label, href]) => {
                  const base = href.split("#")[0];
                  const current = href === "/" ? pathname === "/" : !href.includes("#") && pathname === base;
                  return <li key={href}>
                    <Link href={href} aria-current={current ? "page" : undefined}>
                      <small>{no}</small><span>{label}</span><i aria-hidden="true"><UiIcon name="arrow" size={15} /></i>
                    </Link>
                  </li>;
                })}
              </ul>
            </section>;
          })}
        </div>

        <p className="site-index-foot">WORLDWIDE · USA · UK · CANADA · SWEDEN</p>
      </nav>
    </div>
  </>;
}
