import type { Metadata } from "next";
import { PartnersHub } from "./shared";

export const metadata: Metadata = {
  title: "Partners",
  description: "Artimist Production’s working partners — Decoding Bits (technology & software engineering) and Scallance LLC (Amazon & e-commerce services).",
  alternates: { canonical: "/partners" },
};

export default function Page() { return <PartnersHub />; }
