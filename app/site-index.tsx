"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Site index — the client-facing navigation.
 *
 * A single, consistent way to reach every page from anywhere on the site. It
 * sits in the top-left corner of every page, opens into a full index, marks the
 * page you are on, and closes on Escape, on navigation, and on backdrop click.
 * Hidden inside the control room, which has its own navigation.
 */

const PAGES: Array<[string, string, string]> = [
  ["01", "Home", "/"],
  ["02", "Services", "/services"],
  ["03", "Architecture", "/services/architecture"],
  ["04", "BIM & Drafting", "/services/bim-drafting"],
  ["05", "Visualization", "/services/visualization"],
  ["06", "Unreal & Real-time", "/unreal-engine"],
  ["07", "Residential", "/residential"],
  ["08", "Visual archive", "/visual-archive"],
  ["09", "Process", "/process"],
  ["10", "Studio team", "/team"],
  ["11", "About", "/about"],
  ["12", "Founder's message", "/founder-message"],
  ["13", "Partners", "/partners"],
  ["14", "Contact", "/contact"],
];

export function SiteIndex() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  // Any navigation closes the panel, including back/forward.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Keep the page behind the panel still.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <button
        type="button"
        className="site-index-trigger"
        aria-expanded={open}
        aria-controls="site-index-panel"
        aria-label={open ? "Close site index" : "Open site index"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="site-index-trigger-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="site-index-trigger-label">{open ? "CLOSE" : "INDEX"}</span>
      </button>

      <div
        id="site-index-panel"
        className={`site-index-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        hidden={!open}
      >
        <button
          type="button"
          className="site-index-backdrop"
          aria-label="Close site index"
          onClick={() => setOpen(false)}
        />
        <nav className="site-index-sheet" aria-label="All pages">
          <p className="site-index-eyebrow">INDEX / ALL PAGES</p>
          <ul>
            {PAGES.map(([no, label, href]) => {
              const current = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link href={href} aria-current={current ? "page" : undefined}>
                    <small>{no}</small>
                    <span>{label}</span>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="site-index-foot">
            VANCOUVER · OHIO · STOCKHOLM · LAHORE
          </p>
        </nav>
      </div>
    </>
  );
}
