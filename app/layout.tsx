import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./intro.css";
import "./team/team.css";
import { IntroCurtain, IntroScript } from "./intro-curtain";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artimistproductions.com"),
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
        <Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1PWWCTSMW4');`}</Script>
      </head>
      <body className="antialiased">
        <IntroCurtain />
        {children}
        {/* Vercel Web Analytics. Collects page views with no cookies and no
            personal data; the numbers appear in the project's Analytics tab. */}
        <script defer src="/_vercel/insights/script.js" />
      </body>
    </html>
  );
}
