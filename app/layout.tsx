import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./intro.css";
import "./team/team.css";
import "./site-index.css";
import "./quality-pass.css";
import "./landing-v2.css";
import "./homeowner-premium.css";
import "./ask-bot.css";
import "./final-qa.css";
import "./completion-pass.css";
import "./cinematic-density.css";
import { IntroCurtain, IntroScript } from "./intro-curtain";
import { SiteIndex } from "./site-index";
import { AskBot } from "./ask-bot";
import { VisitorTracker } from "./visitor-tracker";
import Script from "next/script";

const SITE_URL = "https://www.artimistproductions.com";
const DEFAULT_SOCIAL_IMAGE = "/media/hero-night.webp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM" },
  title: "Home Design, Floor Plans, BIM & 3D Visualization | Artimist",
  description: "Artimist Productions helps homeowners and professional teams with custom house plans, floor plan changes, interior design, renovation drawings, BIM/Revit and photoreal 3D visualization worldwide.",
  robots: { index: true, follow: true, nocache: false, googleBot: { index: true, follow: true, noimageindex: false, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", siteName: "Artimist Productions", locale: "en_US", url: SITE_URL, title: "Home Design, Floor Plans, BIM & 3D Visualization | Artimist", description: "Custom house design, plan modifications, interiors, renovation drawings, BIM, architectural rendering and real-time visualization for clients worldwide.", images: [{ url: DEFAULT_SOCIAL_IMAGE, width: 1600, height: 900, alt: "Artimist Productions architecture and visualization work" }] },
  twitter: { card: "summary_large_image", title: "Home Design, Floor Plans, BIM & 3D Visualization | Artimist", description: "Design your house, improve a floor plan, visualize an interior, prepare drawings or bring in Artimist for BIM and visualization production.", images: [DEFAULT_SOCIAL_IMAGE] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const serviceOffers = [
  ["Custom House Design", "/custom-house-design", "Custom house plans, floor-plan development and residential design support."],
  ["3D Interior Design", "/3d-interior-design-service", "Interior design development and photoreal 3D visualization for residential spaces."],
  ["BIM, Revit and Drafting", "/bim-drafting", "BIM modeling, Revit drafting, CAD production and coordinated architectural documentation."],
  ["Architectural Visualization", "/visualization", "Photoreal architectural rendering, interior visualization and design communication."],
  ["Architectural Animation", "/services/architectural-animation", "Cinematic architectural animation, walkthroughs and flythroughs."],
  ["Unreal Engine and Real-Time", "/unreal-engine", "Interactive architectural environments and real-time visualization experiences."],
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const founder = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}/founder-message#faizan-aziz`, name: "Faizan Aziz", jobTitle: "Founder", url: `${SITE_URL}/founder-message`, worksFor: { "@id": `${SITE_URL}/#organization` }, knowsAbout: ["Architecture", "Residential Design", "BIM", "Revit", "Architectural Visualization", "Interior Design", "Architectural Animation", "Real-Time Visualization", "Creative Production"] };
  const organization = { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Artimist Productions", url: SITE_URL, logo: `${SITE_URL}/brand/mark-red.svg`, email: "Faizan@artimistproductions.com", telephone: "+1-807-808-4181", founder: { "@id": `${SITE_URL}/founder-message#faizan-aziz` }, sameAs: ["https://www.linkedin.com/company/artimist-productions"], description: "International multidisciplinary architecture and creative production studio helping homeowners, architects, developers and brands with custom house design, interiors, plan modifications, residential drafting, BIM, architectural visualization, animation and real-time experiences.", areaServed: ["Worldwide", "United States", "United Kingdom", "Canada", "Sweden"], knowsAbout: ["Custom house plans", "Floor plan design", "House plan modification", "Interior design", "Home renovation drawings", "Residential drafting", "BIM", "Revit", "Architectural visualization", "3D rendering", "Architectural animation", "Unreal Engine visualization"], contactPoint: { "@type": "ContactPoint", contactType: "project enquiries", email: "Faizan@artimistproductions.com", telephone: "+1-807-808-4181", url: `${SITE_URL}/contact`, areaServed: "Worldwide", availableLanguage: ["English"] }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Artimist Productions core services", itemListElement: serviceOffers.map(([name,path,description]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, description, url: `${SITE_URL}${path}`, provider: { "@id": `${SITE_URL}/#organization` }, areaServed: "Worldwide" } })) } };
  const website = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Artimist Productions", publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en" };

  return <html lang="en" suppressHydrationWarning><head>
    <link rel="alternate" type="text/plain" href="/llms.txt" title="Artimist Productions AI site guide" /><link rel="alternate" type="text/plain" href="/llms-full.txt" title="Artimist Productions detailed AI reference" /><link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Artimist Productions Insights" />
    <IntroScript /><Script src="/whatsapp-conversations.js" strategy="afterInteractive" /><Script src="/desktop-showcase-motion.js" strategy="afterInteractive" /><Script src="/insight-visual-flow.js" strategy="afterInteractive" /><Script src="/final-rendering-pass.js" strategy="afterInteractive" /><Script src="/final-qa.js" strategy="afterInteractive" /><Script src="https://www.googletagmanager.com/gtag/js?id=G-1PWWCTSMW4" strategy="afterInteractive" /><Script id="ms-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","y4w3ocfmtl");`}</Script><Script id="lead-events" strategy="afterInteractive">{`document.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a"):null;if(!a||!a.href)return;var h=a.href;if(typeof window.gtag!=="function")return;if(h.indexOf("wa.me")>-1||h.indexOf("api.whatsapp.com")>-1){window.gtag("event","whatsapp_click",{link_url:h});}else if(h.indexOf("mailto:")===0){window.gtag("event","email_click",{link_url:h});}else if(h.indexOf("tel:")===0){window.gtag("event","phone_click",{link_url:h});}else if(a.pathname==="/contact"){window.gtag("event","cta_click",{cta_location:location.pathname,cta_text:(a.innerText||"").trim().slice(0,60)});}},true);`}</Script><Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1PWWCTSMW4');`}</Script>
  </head><body className="antialiased"><IntroCurtain /><SiteIndex /><AskBot /><VisitorTracker /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(founder)}} /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}} /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(website)}} /><span id="main-content" className="main-content-anchor" tabIndex={-1} />{children}<script defer src="/_vercel/insights/script.js" /></body></html>;
}
