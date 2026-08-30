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

export default function HomeDesignServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    {children}
  </>;
}
