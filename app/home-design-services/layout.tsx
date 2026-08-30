import Link from "next/link";

const BASE = "https://www.artimistproductions.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE}/home-design-services#webpage`,
      url: `${BASE}/home-design-services`,
      name: "Home Design Services",
      description: "Home redesign, interior design, floor-plan changes, renovation planning and 3D home visualization for homeowners.",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/home-design-services#service` },
    },
    {
      "@type": "Service",
      "@id": `${BASE}/home-design-services#service`,
      name: "Home Design and Redesign Services",
      serviceType: "Home redesign, interior design, floor-plan redesign and 3D visualization",
      provider: { "@id": `${BASE}/#organization` },
      areaServed: ["United States", "United Kingdom", "Canada", "Sweden", "Worldwide"],
      url: `${BASE}/home-design-services`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Home Design Services", item: `${BASE}/home-design-services` },
      ],
    },
  ],
};

const breadcrumbCss = `
.hd-breadcrumb-shell{position:absolute;z-index:40;top:82px;left:0;right:0;pointer-events:none;color:#a89d97;font:500 10px/1.2 Arial,Helvetica,sans-serif;letter-spacing:.08em;text-transform:uppercase}.hd-breadcrumb-shell nav{width:min(1240px,calc(100% - 44px));margin:auto;display:flex;align-items:center;gap:9px;pointer-events:auto}.hd-breadcrumb-shell a{color:#d7cbc5;text-decoration:none}.hd-breadcrumb-shell a:hover{color:#fff}.hd-breadcrumb-shell span{opacity:.45}@media(max-width:640px){.hd-breadcrumb-shell{top:72px;font-size:9px}.hd-breadcrumb-shell nav{width:calc(100% - 28px)}}
`;

export default function HomeDesignServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <style dangerouslySetInnerHTML={{ __html: breadcrumbCss }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="hd-breadcrumb-shell"><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Home Design Services</strong></nav></div>
    {children}
  </>;
}
