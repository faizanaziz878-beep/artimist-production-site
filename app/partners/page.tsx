import type { Metadata } from "next";
import { PartnersHub } from "./shared";

export const metadata: Metadata = {
  title: "Creative & Technology Partners | Artimist Productions",
  description: "Meet specialist partners who extend Artimist Productions with software engineering, digital product development, Amazon and e-commerce support.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Creative & Technology Partners | Artimist Productions",
    description: "The specialist engineering and commerce partners Artimist works with when a project needs additional depth.",
    url: "https://www.artimistproductions.com/partners",
    type: "website",
    images: [{ url: "/media/editorial/architectural-translation.webp", alt: "Artimist Productions creative and technology partner network" }],
  },
};

export default function Page() { return <PartnersHub />; }
