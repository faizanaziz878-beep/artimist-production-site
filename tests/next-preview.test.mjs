import assert from "node:assert/strict";
import test from "node:test";

// Run against Next's production-format server or the deployed preview.
// PREVIEW_BASE_URL=http://127.0.0.1:4175 node --test tests/next-preview.test.mjs
const base = process.env.PREVIEW_BASE_URL ?? "http://127.0.0.1:4175";
const routes = [
  "/", "/services", "/architecture", "/custom-house-design",
  "/plan-modification-service", "/3d-interior-design-service",
  "/residential-renovation-permit-drawings", "/sketch-to-floor-plan-service",
  "/floor-plan-to-3d-rendering", "/home-addition-plans", "/adu-design-plans",
  "/house-exterior-design-service", "/permit-drawing-services",
  "/construction-documentation-services", "/architectural-drafting-services",
  "/revit-drafting-services", "/bim-modeling-services", "/bim-drafting",
  "/visualization", "/services/architectural-rendering",
  "/services/architectural-animation", "/unreal-engine", "/team", "/about",
  "/founder-message", "/partners", "/case-studies", "/insights", "/faqs",
  "/contact", "/usa", "/international", "/canada", "/uk", "/sweden",
  "/proof", "/process", "/legal", "/visual-archive",
  "/insights/how-to-modify-an-existing-floor-plan",
];

for (const path of routes) {
  test(`Next renders SEO and page content: ${path}`, async () => {
    const response = await fetch(new URL(path, base), { redirect: "manual" });
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/);
    const html = await response.text();
    assert.match(html, /<h1[\s>]/i);
    assert.match(html, /<title>[^<]+<\/title>/i);
    assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]+"/i);
    assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.artimistproductions\.com/);
    assert.match(html, /type="application\/ld\+json"/);
    assert.doesNotMatch(html, /NEXT_HTTP_ERROR_FALLBACK;404|Application error: a server-side exception/);
    if (path === "/usa") {
      assert.match(html, /Project scope &amp; delivery/);
      assert.doesNotMatch(html, /supports U\.<\/p>/);
    }
  });
}

test("ADU visual route returns actual WebP bytes", async () => {
  const response = await fetch(new URL("/adu/adu-hero.svg", base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /image\/webp/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.subarray(0, 4).toString(), "RIFF");
  assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
});
