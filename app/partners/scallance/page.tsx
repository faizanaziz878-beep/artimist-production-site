import type { Metadata } from "next";
import { PartnerDetail, PARTNERS } from "../shared";

export const metadata: Metadata = {
  title: "Scallance LLC",
  description: "Scallance LLC is Artimist Production’s Amazon services partner — a US-registered e-commerce agency that launches and scales brands on Amazon.",
  alternates: { canonical: "/partners/scallance" },
};

export default function Page() { return <PartnerDetail p={PARTNERS["scallance"]} />; }
