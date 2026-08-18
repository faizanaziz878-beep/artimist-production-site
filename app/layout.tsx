import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./team/team.css";

export const metadata: Metadata = {
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
