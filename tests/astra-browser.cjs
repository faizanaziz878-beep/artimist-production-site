const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const base = process.env.PREVIEW_BASE_URL || "http://127.0.0.1:4180";
const output = path.resolve(process.env.ASTRA_QA_DIR || "artifacts/astra-qa");
const routes = ["/", "/services", "/house-exterior-design-service", "/revit-drafting-services", "/custom-house-design", "/about", "/team", "/contact", "/visualization", "/insights/how-much-do-custom-house-plans-cost"];
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [], results = [];
  page.on("pageerror", error => errors.push({ route: page.url(), message: error.message }));
  try {
    for (const width of process.env.ASTRA_INTERACTIONS_ONLY ? [] : [1440, 1280, 768, 390, 360]) {
      await page.setViewportSize({ width, height: width > 800 ? 1000 : 844 });
      for (const route of routes) {
        const response = await page.goto(base + route, { waitUntil: "load" });
        assert.equal(response.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        await page.locator("h1").waitFor({ state: "visible" });
        const metrics = await page.evaluate(() => {
          const h1 = document.querySelector("h1").getBoundingClientRect();
          const visibleImages = [...document.images].filter(image => { const r = image.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0 && image.getAttribute("src"); });
          return { width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth + 2, titleTop: h1.top, titleRight: h1.right, broken: visibleImages.filter(image => image.complete && !image.naturalWidth).map(image => image.src) };
        });
        assert.equal(metrics.overflow, false, route + " overflow at " + width);
        assert.ok(metrics.titleTop >= 62, route + " header overlaps title at " + width + ": " + metrics.titleTop);
        assert.ok(metrics.titleRight <= width + 2, route + " title exceeds screen at " + width);
        assert.deepEqual(metrics.broken, [], route + " broken hero images");
        await page.screenshot({ path: path.join(output, (route === "/" ? "home" : route.slice(1).replaceAll("/", "-")) + "-" + width + ".png"), fullPage: false });
        results.push({ route, width, ...metrics });
        console.log("PASS", width, route);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/services");
    const design = page.getByRole("tab", { name: /01 DESIGN IT/ });
    await design.focus(); await page.keyboard.press("ArrowRight");
    assert.equal(await page.getByRole("tab", { name: /02 DOCUMENT IT/ }).getAttribute("aria-selected"), "true");
    await page.keyboard.press("End");
    assert.equal(await page.getByRole("tab", { name: /03 SHOW IT/ }).getAttribute("aria-selected"), "true");
    assert.equal(await page.getByRole("tabpanel", { name: /03 SHOW IT/ }).isVisible(), true);
    await page.getByRole("button", { name: "Ask Artimist", exact: true }).click();
    await page.getByRole("dialog", { name: "Ask Artimist a question" }).waitFor({ state: "visible" });
    await page.getByRole("textbox", { name: "Ask the studio a question" }).fill("Revit");
    await page.screenshot({ path: path.join(output, "search-mobile.png") });
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog", { name: "Ask Artimist a question" }).count(), 0);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.getByRole("tab", { name: /02 DOCUMENT IT/ }).click();
    assert.equal(await page.locator(".astra-panel-document img").evaluate(el => getComputedStyle(el).animationName), "astra-image-in");
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await page.locator(".astra-panel-document img").evaluate(el => getComputedStyle(el).animationName), "none");
    await page.goto(base + "/house-exterior-design-service");
    const tools = page.locator(".astra-gallery-tools").first();
    await tools.scrollIntoViewIfNeeded();
    await tools.getByRole("button", { name: "Next image" }).click();
    await page.screenshot({ path: path.join(output, "gallery-mobile.png") });
    await page.waitForFunction(() => document.querySelector(".astra-gallery-tools output")?.textContent === "02 / 04");
    const zoom = page.locator(".lp2-opening-proof figure").nth(1).getByRole("button", { name: /Enlarge image/ });
    await zoom.click();
    await page.getByRole("dialog", { name: "Enlarged studio image" }).waitFor({ state: "visible" });
    await page.screenshot({ path: path.join(output, "drawing-zoom-mobile.png") });
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").isVisible(), false);
    assert.equal(await zoom.evaluate(el => document.activeElement === el), true);
    await page.goto(base + "/custom-house-design");
    await page.getByText("Scope & starting information", { exact: true }).click();
    assert.equal(await page.locator(".astra-scope").getAttribute("open"), "");
    await page.screenshot({ path: path.join(output, "scope-open-mobile.png") });
    assert.deepEqual(errors, [], "Browser runtime errors");
    await fs.writeFile(path.join(output, "results.json"), JSON.stringify({ base, results, interactionChecks: ["tab keyboard navigation", "gallery next/count", "image zoom/Escape/focus restoration", "native scope disclosure"], errors }, null, 2));
    console.log("PASS all responsive and interaction checks");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
