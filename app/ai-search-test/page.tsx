import { searchArtimist } from "../../lib/artimist-search";

export const metadata = { robots: { index: false, follow: false }, title: "Artimist Search Preview Test" };

const TESTS: Array<{ query: string; intent?: string; route?: string; confidence?: "high" | "medium" | "low" }> = [
  { query: "Can you design a garage conversion ADU?", intent: "adu", route: "/adu-design-plans", confidence: "high" },
  { query: "Turn my hand sketch into a professional floor plan", intent: "sketch-floor-plan", route: "/sketch-to-floor-plan-service", confidence: "high" },
  { query: "I need Revit drafting for an architecture project", intent: "revit", route: "/revit-drafting-services", confidence: "high" },
  { query: "How much does an architectural rendering cost?", intent: "pricing", route: "/contact" },
  { query: "Do you stamp permit drawings in the USA?", intent: "stamp", route: "/legal#stamps", confidence: "high" },
  { query: "I need existing and proposed plans for my home renovation", intent: "renovation", route: "/residential-renovation-permit-drawings" },
  { query: "Can you convert my point cloud to BIM?", intent: "scan-bim", route: "/bim-modeling-services", confidence: "high" },
  { query: "Will you guarantee my permit gets approved?", intent: "permit-guarantee", route: "/permit-drawing-services", confidence: "high" },
  { query: "purple elephant spaceship catering", intent: "clarify", confidence: "low" },
];

const RESULTS = TESTS.map((test) => {
  const result = searchArtimist(test.query);
  const failures: string[] = [];
  if (test.intent && result.intent !== test.intent) failures.push(`intent expected ${test.intent}, got ${result.intent}`);
  if (test.confidence && result.confidence !== test.confidence) failures.push(`confidence expected ${test.confidence}, got ${result.confidence}`);
  if (test.route && !result.routes.some((route) => route.path === test.route)) failures.push(`missing route ${test.route}`);
  return { ...test, result, failures };
});

const FAILURES = RESULTS.flatMap((row) => row.failures.map((failure) => `${row.query}: ${failure}`));
if (FAILURES.length) throw new Error(`Artimist search preview tests failed:\n${FAILURES.join("\n")}`);

export default function ArtimistSearchTestPage() {
  return <main style={{ padding: 40, fontFamily: "system-ui", background: "#0b0c0e", color: "#eee", minHeight: "100vh" }}>
    <h1>Artimist search preview tests</h1>
    <p>{RESULTS.length} intent tests passed during static generation.</p>
    <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{JSON.stringify(RESULTS.map(({ query, result }) => ({ query, intent: result.intent, confidence: result.confidence, routes: result.routes.map((route) => route.path) })), null, 2)}</pre>
  </main>;
}
