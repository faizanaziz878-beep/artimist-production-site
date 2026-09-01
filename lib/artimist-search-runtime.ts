import { searchArtimist as baseSearch, type ArtimistSearchResult } from "./artimist-search";

function normalized(query: string) {
  return query.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function hasAny(value: string, phrases: string[]) {
  return phrases.some((phrase) => value.includes(phrase));
}

const stampTerms = ["stamp", "stamped", "seal", "sealed", "licensed architect", "licensed engineer", "architect of record", "engineer of record", "professional of record", "certify", "certification"];
const permitTerms = ["permit", "approval", "approved", "building department", "city", "county", "council"];
const guaranteeTerms = ["guarantee", "guaranteed", "promise", "will it be approved", "will my permit be approved"];

function stampResult(): ArtimistSearchResult {
  return {
    answer: "Artimist does not provide a regional architectural or engineering stamp or seal. Where a jurisdiction requires certification, the appropriately licensed local architect, engineer or other professional must independently review and provide the required professional responsibility.",
    intent: "stamp",
    confidence: "high",
    routes: [
      { title: "Permit & Stamping Boundaries", path: "/legal#stamps", category: "Client information", reason: "The studio’s exact professional boundary for stamps, seals and certification." },
      { title: "Permit Drawing Services", path: "/permit-drawing-services", category: "Documentation", reason: "See what Artimist can prepare and support before local professional review." },
    ],
    followUp: "Which city or jurisdiction is the project in?",
    leadReady: false,
  };
}

function permitGuaranteeResult(): ArtimistSearchResult {
  return {
    answer: "No responsible design or drafting provider can guarantee permit approval. Approval is controlled by the reviewing authority and depends on local regulations, property conditions, consultant requirements and the authority’s review. Artimist can prepare and revise documentation within its agreed scope.",
    intent: "permit-guarantee",
    confidence: "high",
    routes: [
      { title: "Permit Drawing Services", path: "/permit-drawing-services", category: "Documentation", reason: "See the permit-support scope and workflow." },
      { title: "Client Terms", path: "/legal#stamps", category: "Client information", reason: "Review permit, stamping and professional responsibility boundaries." },
    ],
    followUp: "If you share the project location and current drawing stage, I can point you to the most relevant permit-support route.",
    leadReady: false,
  };
}

function clarifyResult(): ArtimistSearchResult {
  return {
    answer: "I can help with Artimist’s architecture, home design, permit-support drawings, interiors, BIM, Revit, drafting, rendering, animation and real-time work, but I don’t want to guess what you mean. Give me one more detail about the project or the deliverable you need.",
    intent: "clarify",
    confidence: "low",
    routes: [
      { title: "Frequently Asked Questions", path: "/faqs", category: "Questions", reason: "Scan common project questions." },
      { title: "Services", path: "/services", category: "Studio", reason: "Browse Artimist services." },
      { title: "Start a Project", path: "/contact", category: "Studio", reason: "Send the real project if it needs human review." },
    ],
    followUp: "What are you trying to create, change, document or visualize?",
    leadReady: false,
  };
}

export function searchArtimist(query: string): ArtimistSearchResult {
  const q = normalized(query);

  if (q && hasAny(q, stampTerms)) return stampResult();
  if (q && hasAny(q, guaranteeTerms) && hasAny(q, permitTerms)) return permitGuaranteeResult();

  const result = baseSearch(query);

  // The base knowledge uses priority weights to break ties. If no real semantic
  // match exists, a high-priority safety topic must never become the answer.
  if (result.intent === "stamp" && !hasAny(q, stampTerms)) return clarifyResult();
  if (result.intent === "permit-guarantee" && !(hasAny(q, guaranteeTerms) && hasAny(q, permitTerms))) return clarifyResult();

  return result;
}
