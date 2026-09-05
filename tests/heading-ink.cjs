const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const base = process.env.PREVIEW_BASE_URL || "http://127.0.0.1:4180";
const out = path.resolve(process.env.HEADING_QA_DIR || "outputs/heading-ink");
const routes = ["/", "/services", "/architecture", "/bim-drafting", "/visualization", "/custom-house-design", "/house-exterior-design-service", "/revit-drafting-services", "/about", "/team", "/contact", "/insights/how-much-do-custom-house-plans-cost", "/faqs", "/usa", "/case-studies"];
(async () => {
  await fs.mkdir(out, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  let count = 0;
  try {
    for (const width of process.env.HEADING_MOTION_ONLY ? [] : [1440, 390, 360]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(() => document.querySelector(".artimist-reveal-heading.is-artimist-visible"));
        // Existing reveals finish in at most 1.05 s after the 1.8 s safety reveal.
        await page.waitForFunction(() => [...document.querySelectorAll(".artimist-reveal-heading")].every(el => {
          if (getComputedStyle(el).display === "none") return true;
          const clip = getComputedStyle(el).clipPath;
          return el.classList.contains("is-artimist-visible") && (clip === "none" || /^inset\(-/.test(clip));
        }), { timeout: 10000 });
        const headings = await page.locator(".artimist-reveal-heading").evaluateAll(elements => elements.map(el => ({ text: el.textContent.trim(), clip: getComputedStyle(el).clipPath })));
        for (const h of headings) assert.ok(h.clip === "none" || /^inset\(-/.test(h.clip), route + ": " + h.text);
        count += headings.length;
        if (route === "/") {
          const heading = page.locator("#global-services-title");
          await heading.scrollIntoViewIfNeeded();
          const box = await heading.boundingBox();
          await page.screenshot({ path: path.join(out, "begin-" + width + ".png"), clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 15), width: Math.min(width - Math.max(0, box.x - 10), box.width + 20), height: box.height + 45 } });
        }
        console.log("PASS", width, route, headings.length, "headings");
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base + "/services");
    await page.waitForFunction(() => !!document.querySelector(".artimist-reveal-heading"));
    const duration = await page.locator("h1").evaluate(el => getComputedStyle(el).transitionDuration);
    // The global reduced-motion reset uses 0.01ms instead of exactly zero.
    assert.ok(duration.split(",").every(value => parseFloat(value) <= 0.001), duration);
    console.log("PASS", count, "heading instances; reduced motion preserved");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
