import type { Metadata } from "next";
import { ProcessExperience } from "../studio-path";

export const metadata: Metadata = {
  title: "Process — Artimist Productions",
  description: "The Artimist Productions project route: listen, frame, build, refine and deliver with visible milestones and coordinated review.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process — Artimist Productions",
    description: "A visible route from first conversation to coordinated delivery.",
    url: "https://www.artimistproductions.com/process",
    type: "website",
    images: [{ url: "/media/technical/board-02.webp", alt: "Artimist Productions design and technical process" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Process — Artimist Productions",
    description: "Listen, frame, build, refine and deliver.",
    images: ["/media/technical/board-02.webp"],
  },
};

export default function ProcessPage() {
  return <ProcessExperience />;
}
