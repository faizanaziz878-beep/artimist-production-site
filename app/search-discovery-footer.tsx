"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  { title: "Home & interiors", links: [["Custom house design", "/custom-house-design"],["Plan modification", "/plan-modification-service"],["3D interior design", "/3d-interior-design-service"],["Renovation & permit drawings", "/residential-renovation-permit-drawings"]] },
  { title: "Architecture & BIM", links: [["Architecture", "/architecture"],["BIM & drafting", "/bim-drafting"],["Revit drafting", "/revit-drafting-services"],["Construction documentation", "/construction-documentation-services"]] },
  { title: "Visualization", links: [["Architectural visualization", "/visualization"],["Architectural rendering", "/services/architectural-rendering"],["Interior rendering", "/services/3d-interior-rendering"],["Animation & Unreal", "/services/architectural-animation"]] },
  { title: "Markets", links: [["United States · remote delivery", "/usa"],["Canada · remote delivery", "/canada"],["United Kingdom · remote delivery", "/uk"],["Sweden · remote delivery", "/sweden"]] },
  { title: "Proof & trust", links: [["Project evidence", "/proof"],["Case studies", "/case-studies"],["Team", "/team"],["Founder", "/founder-message"],["Process", "/process"]] },
  { title: "Client information", links: [["Client terms & legal", "/legal"],["Payments & deposit", "/legal#payments"],["NDA & confidentiality", "/legal#confidentiality"],["Data & privacy", "/legal#data"],["Permit & stamping boundaries", "/legal#stamps"],["Start a project", "/contact"]] },
] as const;

export function SearchDiscoveryFooter() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;
  return <footer className="search-discovery-footer" aria-label="Explore Artimist Productions"><div className="search-discovery-inner">
    <div className="search-discovery-intro"><p className="search-discovery-kicker">Explore Artimist Productions</p><h2>Design, documentation and visualization—connected.</h2><p>Move directly between services, project evidence, the people behind the work, international remote-delivery markets and the commercial terms that govern an engagement.</p></div>
    <div className="search-discovery-groups">{groups.map((group) => <nav key={group.title} aria-label={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>)}</div>
    <div className="search-discovery-mark">ARTIMIST PRODUCTIONS · ARCHITECTURE · BIM · INTERIORS · VISUALIZATION · WORLDWIDE REMOTE DELIVERY</div>
  </div></footer>;
}
