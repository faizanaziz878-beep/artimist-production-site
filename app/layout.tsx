import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./intro.css";
import "./team/team.css";
import "./site-index.css";
import { IntroCurtain, IntroScript } from "./intro-curtain";
import { SiteIndex } from "./site-index";
import { VisitorTracker } from "./visitor-tracker";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artimistproductions.com"),
  verification: { google: "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM" },
  title: "Architecture, BIM & Architectural Visualization Studio | Artimist",
  description:
    "Artimist Productions is an international architecture, BIM, interior design and architectural visualization studio serving clients worldwide, with active focus in the USA, UK, Canada and Sweden.",
  openGraph: {
    type: "website",
    siteName: "Artimist Productions",
    locale: "en_US",
    url: "https://www.artimistproductions.com",
    title: "Architecture, BIM & Architectural Visualization Studio | Artimist",
    description:
      "International architecture, BIM and visualization studio delivering Revit and CAD drafting, interiors, 3D rendering, animation and Unreal Engine experiences for clients worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture, BIM & Architectural Visualization Studio | Artimist",
    description:
      "Artimist Productions serves homeowners, architects, developers and brands worldwide, with focus on the USA, UK, Canada and Sweden.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <IntroScript />
        <Script src="/mobile-cleanup.js" strategy="afterInteractive" />
        <Script src="/whatsapp-conversations.js" strategy="afterInteractive" />
        <Script id="text-arrow-presentation" strategy="afterInteractive">{`(function(){function fix(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(n.nodeValue&&n.nodeValue.indexOf('↗')>-1){n.nodeValue=n.nodeValue.replace(/↗(?!︎)/g,'↗︎');}}}fix(document.body);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===3){if(n.nodeValue&&n.nodeValue.indexOf('↗')>-1)n.nodeValue=n.nodeValue.replace(/↗(?!︎)/g,'↗︎');}else if(n.nodeType===1){fix(n);}});});}).observe(document.body,{childList:true,subtree:true});})();`}</Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1PWWCTSMW4" strategy="afterInteractive" />
        <Script id="ms-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","y4w3ocfmtl");`}</Script>
        <Script id="lead-events" strategy="afterInteractive">{`document.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a"):null;if(!a||!a.href)return;var h=a.href;if(typeof window.gtag!=="function")return;if(h.indexOf("wa.me")>-1||h.indexOf("api.whatsapp.com")>-1){window.gtag("event","whatsapp_click",{link_url:h});}else if(h.indexOf("mailto:")===0){window.gtag("event","email_click",{link_url:h});}else if(h.indexOf("tel:")===0){window.gtag("event","phone_click",{link_url:h});}else if(a.pathname==="/contact"){window.gtag("event","cta_click",{cta_location:location.pathname,cta_text:(a.innerText||"").trim().slice(0,60)});}},true);`}</Script>
        <Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1PWWCTSMW4');`}</Script>
      </head>
      <body className="antialiased">
        <IntroCurtain />
        <SiteIndex />
        <VisitorTracker />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"https://www.artimistproductions.com/#organization\",\"name\":\"Artimist Productions\",\"url\":\"https://www.artimistproductions.com\",\"email\":\"Faizan@artimistproductions.com\",\"description\":\"International multidisciplinary creative studio working across architecture, interiors, BIM, architectural visualization, Unreal Engine real-time experiences, identity, motion and digital products.\",\"location\":[{\"@type\":\"Place\",\"name\":\"Artimist Productions — Vancouver\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Vancouver\",\"addressRegion\":\"British Columbia\",\"addressCountry\":\"CA\"}},{\"@type\":\"Place\",\"name\":\"Artimist Productions — Ohio\",\"address\":{\"@type\":\"PostalAddress\",\"addressRegion\":\"Ohio\",\"addressCountry\":\"US\"}},{\"@type\":\"Place\",\"name\":\"Artimist Productions — Stockholm\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Stockholm\",\"addressCountry\":\"SE\"}},{\"@type\":\"Place\",\"name\":\"Artimist Productions — Lahore\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Lahore\",\"addressRegion\":\"Punjab\",\"addressCountry\":\"PK\"}}],\"areaServed\":[\"Worldwide\",\"United States\",\"United Kingdom\",\"Canada\",\"Sweden\",\"Pakistan\"]}" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"@id\":\"https://www.artimistproductions.com/#website\",\"url\":\"https://www.artimistproductions.com\",\"name\":\"Artimist Productions\",\"publisher\":{\"@id\":\"https://www.artimistproductions.com/#organization\"},\"inLanguage\":\"en\"}" }} />
        {children}
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
