import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./intro.css";
import "./team/team.css";
import { IntroCurtain, IntroScript } from "./intro-curtain";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artimistproductions.com"),
  verification: { google: "lsk4HfeRzYO3lwG_jcZAoexrOwBkDMyneJKREIpOxvM" },
  title: "Artimist Production — Architecture, Unreal Engine, Identity & Motion",
  description:
    "Artimist Production is a multidisciplinary creative studio connecting architecture, interiors, visualization, Unreal Engine real-time experiences, branding, motion, digital products and strategy.",
  other: {
    "codex-preview": "development",
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1PWWCTSMW4" strategy="afterInteractive" />
        <Script id="ms-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","y4w3ocfmtl");`}</Script>
        <Script id="lead-events" strategy="afterInteractive">{`document.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a"):null;if(!a||!a.href)return;var h=a.href;if(typeof window.gtag!=="function")return;if(h.indexOf("wa.me")>-1||h.indexOf("api.whatsapp.com")>-1){window.gtag("event","whatsapp_click",{link_url:h});}else if(h.indexOf("mailto:")===0){window.gtag("event","email_click",{link_url:h});}else if(h.indexOf("tel:")===0){window.gtag("event","phone_click",{link_url:h});}},true);`}</Script>
        <Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1PWWCTSMW4');`}</Script>
      </head>
      <body className="antialiased">
        <IntroCurtain />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"https://www.artimistproductions.com/#organization\",\"name\":\"Artimist Production\",\"url\":\"https://www.artimistproductions.com\",\"email\":\"Faizan@artimistproductions.com\",\"description\":\"Independent multidisciplinary creative studio working across architecture, interiors, visualization, Unreal Engine real-time experiences, identity, motion and digital products.\",\"location\":[{\"@type\":\"Place\",\"name\":\"Artimist Production — Vancouver\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Vancouver\",\"addressRegion\":\"British Columbia\",\"addressCountry\":\"CA\"}},{\"@type\":\"Place\",\"name\":\"Artimist Production — Ohio\",\"address\":{\"@type\":\"PostalAddress\",\"addressRegion\":\"Ohio\",\"addressCountry\":\"US\"}},{\"@type\":\"Place\",\"name\":\"Artimist Production — Stockholm\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Stockholm\",\"addressCountry\":\"SE\"}},{\"@type\":\"Place\",\"name\":\"Artimist Production — Lahore\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Lahore\",\"addressRegion\":\"Punjab\",\"addressCountry\":\"PK\"}}],\"areaServed\":[\"United States\",\"Canada\",\"Sweden\",\"Pakistan\",\"Worldwide\"]}" }} />
        {children}
        {/* Vercel Web Analytics. Collects page views with no cookies and no
            personal data; the numbers appear in the project's Analytics tab. */}
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
