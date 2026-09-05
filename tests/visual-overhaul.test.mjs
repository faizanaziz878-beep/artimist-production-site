import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import { SERVICE_VISUALS, serviceVisuals } from "../lib/service-visuals.ts";
import { LANDING_PAGES } from "../lib/landing-content.ts";

test("homepage visual composition is locked and isolated from the Astra redesign", async () => {
  const home = await readFile(new URL("../public/studio.html", import.meta.url), "utf8");
  const route = await readFile(new URL("../app/seo-home/route.ts", import.meta.url), "utf8");
  const styles = await readFile(new URL("../public/astra-design.css", import.meta.url), "utf8");
  assert.ok(home.indexOf('id="portal"') < home.indexOf('id="work"'));
  assert.match(home, /href="#portal" aria-label="Enter the spatial portal"/);
  assert.doesNotMatch(route, /astra-design\.css|studio-motion\.js/);
  assert.doesNotMatch(styles, /\.st\.st/);
  const typography = await readFile(new URL("../public/home-typography.css", import.meta.url), "utf8");
  const declarations = [...typography.matchAll(/\{([^{}]*)\}/g)].flatMap(match => match[1].split(";")).map(rule => rule.trim()).filter(Boolean);
  const allowed = /^(font-family|font-size|font-weight|font-style|line-height|letter-spacing|text-transform):/;
  for (const rule of declarations) assert.match(rule, allowed, "Homepage changes must be typography only: " + rule);
});

test("every indexed landing has an exact visual plan and one image per process step", () => {
  for (const page of LANDING_PAGES) {
    const visuals = serviceVisuals(page.slug);
    assert.equal(visuals.evidence.length, 4, page.slug);
    assert.equal(visuals.process.length, page.workflow.length, page.slug);
  }
  assert.throws(() => serviceVisuals("not-curated"), /Missing curated/);
});

test("curated assets exist and retired pavilion board is not used", async () => {
  for (const plan of Object.values(SERVICE_VISUALS)) {
    for (const image of [plan.hero, ...plan.evidence, ...plan.process]) {
      assert.ok(image.alt.length > 15);
      assert.ok(!image.src.includes("board-01.webp"));
      await access(new URL("../public" + image.src, import.meta.url));
    }
  }
});

test("House Exterior contains only verified facade, site and house-massing assets", () => {
  const plan = serviceVisuals("house-exterior-design-service");
  const allowed = new Set(["/img/resext01.webp", "/img/resext02.webp", "/img/resext03.webp", "/img/resext04.webp", "/img/rhino02.webp"]);
  for (const image of [plan.hero, ...plan.evidence, ...plan.process]) assert.ok(allowed.has(image.src), image.src);
});

test("service overview stays crawlable and generated selection is not rotated", async () => {
  const source = await readFile(new URL("../app/landing-v2.tsx", import.meta.url), "utf8");
  assert.match(source, /<details className="lp2-scope-details">/);
  assert.match(source, /<p>\{page.intro\}<\/p>/);
  assert.match(source, /<p>\{page.forWho\}<\/p>/);
  const gallery = await readFile(new URL("../app/generated-architecture-gallery.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(gallery, /offsetFor|GeneratedStudyStrip/);
});

test("homepage source does not advertise unverified offices", async () => {
  const source = await readFile(new URL("../public/studio.html", import.meta.url), "utf8");
  assert.doesNotMatch(source, /04 OFFICES|Artimist Production — Vancouver|Artimist Production — Ohio|Artimist Production — Stockholm/);
  assert.match(source, /INTERNATIONAL PROJECT DELIVERY/);
});
