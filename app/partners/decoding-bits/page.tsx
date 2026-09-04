import type { Metadata } from "next";
import { PartnerDetail, PARTNERS } from "../shared";
import "../partners-premium.css";

export const metadata: Metadata = {
  title: "Decoding Bits Technology Partner | Artimist Productions",
  description: "Decoding Bits is Artimist Productions’ technology and software engineering partner for custom websites, web apps, interactive tools and automation.",
  alternates: { canonical: "/partners/decoding-bits" },
  openGraph: {
    title: "Decoding Bits Technology Partner | Artimist Productions",
    description: "Software engineering, web applications, interactive products and automation through Artimist Productions’ specialist technology partnership.",
    url: "https://www.artimistproductions.com/partners/decoding-bits",
    type: "website",
    images: [{ url: "/media/partners/furqan-a.jpg", alt: "Artimist Productions and Decoding Bits technology partnership" }],
  },
};

export default function Page() { return <PartnerDetail p={PARTNERS["decoding-bits"]} />; }
