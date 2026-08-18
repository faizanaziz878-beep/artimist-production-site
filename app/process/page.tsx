import type { Metadata } from "next";
import { ProcessExperience } from "../studio-path";

export const metadata: Metadata = {
  title: "Process — Artimist Production",
  description: "The Artimist Production project route: listen, frame, build, refine and deliver.",
};

export default function ProcessPage() {
  return <ProcessExperience />;
}
