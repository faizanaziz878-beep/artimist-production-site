"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    title: "Home & interiors",
    links: [
      ["Custom house design", "/custom-house-design"],
      ["Plan modification", "/plan-modification-service"],
      ["3D interior design", "/3d-interior-design-service"],
      ["Renovation & permit drawings", "/residential-renovation-permit-drawings"],
    ],
  },
  {
    title: "Architecture & BIM",
    links: [
      ["Architecture", "/architecture"],
      ["BIM & drafting", "/bim-drafting"],
      ["Revit drafting", "/revit-drafting-services"],
      ["Construction documentation", "/construction-documentation-services"],
    ],
  },
  {
    title: "Visualization",
    links: [
      ["Architectural visualization", "/visualization"],
      ["Architectural rendering", "/services/architectural-rendering"],
      ["Interior rendering", "/services/3d-interior-rendering"],
      ["Animation & Unreal", "/services/architectural-animation"],
    ],
  },
  {
    title: "Markets",
    links: [
      ["United States", "/usa"],
      ["Canada", "/canada"],
      ["United Kingdom", "/uk"],
      ["Sweden", "/sweden"],
    ],
  },
  {
    title: "Proof & studio",
    links: [
      ["Case studies", "/case-studies"],
      ["Visual archive", "/visual-archive"],
      ["Process", "/process"],
      ["Client terms & legal", "/legal"],
      ["Start a project", "/contact"],
    ],
  },
] as const;

export function SearchDiscoveryFooter() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;

  return (
    <footer className="search-discovery-footer" aria-label="Explore Artimist Productions">
      <div className="search-discovery-inner">
        <div className="search-discovery-intro">
          <p className="search-discovery-kicker">Explore Artimist Productions</p>
          <h2>Design, documentation and visualization—connected.</h2>
          <p>Move directly between the studio&apos;s core services, project evidence, international markets and project intake.</p>
        </div>
        <div className="search-discovery-groups">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => (
                <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="search-discovery-mark">ARTIMIST PRODUCTIONS · ARCHITECTURE · BIM · INTERIORS · VISUALIZATION</div>
      </div>
    </footer>
  );
}
