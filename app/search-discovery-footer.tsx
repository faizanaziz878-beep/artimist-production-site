"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const groups = [
  { title: "Home & renovation", links: [["Custom house design", "/custom-house-design"],["Home renovation plans", "/home-renovation-plans"],["Home addition plans", "/home-addition-plans"],["ADU design & plans", "/adu-design-plans"],["Garage conversion plans", "/garage-conversion-plans"],["House exterior design", "/house-exterior-design-service"],["Sketch to floor plan", "/sketch-to-floor-plan-service"]] },
  { title: "See it in 3D", links: [["3D house design", "/3d-house-design"],["Floor plan to 3D", "/floor-plan-to-3d-rendering"],["Architectural visualization", "/visualization"],["Interior rendering", "/services/3d-interior-rendering"],["Animation & Unreal", "/services/architectural-animation"]] },
  { title: "Architecture & BIM", links: [["Architecture", "/architecture"],["As-built drawings", "/as-built-drawings"],["BIM & drafting", "/bim-drafting"],["Revit drafting", "/revit-drafting-services"],["Construction documentation", "/construction-documentation-services"]] },
  { title: "UK homeowner searches", links: [["House extension plans", "/house-extension-plans"],["Loft conversion plans", "/loft-conversion-plans"],["Home renovation plans", "/home-renovation-plans"],["United Kingdom · remote delivery", "/uk"]] },
  { title: "Markets", links: [["United States · remote delivery", "/usa"],["Canada · remote delivery", "/canada"],["United Kingdom · remote delivery", "/uk"],["Sweden · remote delivery", "/sweden"]] },
  { title: "Proof & trust", links: [["Project evidence", "/proof"],["Case studies", "/case-studies"],["Visual archive", "/visual-archive"],["Team", "/team"],["Founder", "/founder-message"],["Process", "/process"]] },
  { title: "Client information", links: [["Client terms & legal", "/legal"],["NDA & confidentiality", "/legal#confidentiality"],["Permit & stamping boundaries", "/legal#stamps"],["Start a project", "/contact"]] },
  { title: "Official profiles", links: [["Instagram", "https://www.instagram.com/artimist.productions/"],["LinkedIn", "https://www.linkedin.com/company/artimist-productions"],["Trustpilot", "https://www.trustpilot.com/review/www.artimistproductions.com"]] },
] as const;
export function SearchDiscoveryFooter() {
  const pathname = usePathname();
  if (!pathname || pathname === "/" || pathname.startsWith("/admin") || pathname.startsWith("/api")) return null;
  return <footer className="search-discovery-footer" aria-label="Explore Artimist Productions"><div className="search-discovery-inner">
    <div className="search-discovery-intro"><p className="search-discovery-kicker">Explore Artimist Productions</p><h2>Design, drawings and visualization—connected.</h2><p>Find a service, explore the work, or read the full client terms.</p></div>
    <div className="search-discovery-groups">{groups.map(group => <details key={group.title}><summary>{group.title}</summary><nav aria-label={group.title}>{group.links.map(([label, href]) => <Link key={`${group.title}-${href}`} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav></details>)}</div>
    <div className="search-discovery-mark">ARTIMIST PRODUCTIONS · HOME DESIGN · ADU DESIGN · RENOVATION · ARCHITECTURE · BIM · 3D VISUALIZATION · WORLDWIDE REMOTE DELIVERY</div>
  </div></footer>;
}
