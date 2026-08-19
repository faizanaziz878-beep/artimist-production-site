import type { Metadata } from "next";
import { PartnerDetail, PARTNERS } from "../shared";

export const metadata: Metadata = {
  title: "Decoding Bits",
  description: "Decoding Bits is Artimist Production’s technology and software engineering partner — custom websites, web apps and automation.",
  alternates: { canonical: "/partners/decoding-bits" },
};

export default function Page() { return <PartnerDetail p={PARTNERS["decoding-bits"]} />; }
