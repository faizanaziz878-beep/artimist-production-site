import type { Metadata } from "next";
import { PartnerDetail, PARTNERS } from "../shared";
import "../partners-premium.css";

export const metadata: Metadata = {
  title: "Scallance Amazon Partner | Artimist Productions",
  description: "Scallance LLC is Artimist Productions’ Amazon and e-commerce services partner for marketplace management, storefront optimization, advertising and brand growth.",
  alternates: { canonical: "/partners/scallance" },
  openGraph: {
    title: "Scallance Amazon Partner | Artimist Productions",
    description: "Amazon marketplace execution, storefront optimization and e-commerce growth through Artimist Productions’ specialist partnership with Scallance LLC.",
    url: "https://www.artimistproductions.com/partners/scallance",
    type: "website",
    images: [{ url: "/media/generated-architecture/artimist-architecture-075.webp", alt: "Artimist Productions and Scallance e-commerce partnership" }],
  },
};

export default function Page() { return <PartnerDetail p={PARTNERS["scallance"]} />; }
