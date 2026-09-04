# Artimist visual overhaul — preview review

4 September 2026. Branch: `codex/visual-overhaul-preview-20260903`.
Release update: on 4 September 2026, the owner explicitly approved deployment to the original website. The reviewed website code is commit `dca1609`. This release-record update changes no website code; the preview review notes below remain the record of verification and asset limitations.

## What changed

- **Homepage and navigation:** a shorter image-led opening, compact desktop Ask control, mobile search icon and accessible search sheet. Removed unsupported multi-office claims; international delivery wording remains.
- **Services:** three dominant visual routes — DESIGN IT / DOCUMENT IT / SHOW IT — with the complete discipline/service content retained in expandable sections.
- **13 landing pages:** exact, reviewable hero/evidence/process mappings replace category-level reuse and slug-offset selection. House Exterior uses only residential facade, site, material and house-massing imagery. BIM, Revit, CAD, permit documentation and construction documentation now use their relevant models/drawings rather than research boards.
- **Homeowner services:** custom house, plan modification, interior and renovation pages show a four-stage visual route. ADU keeps its dedicated plans/elevations/sections/render experience with a more compact opening.
- **About / Team / Contact:** six multidisciplinary studio visuals on About; all 14 existing team members preserved before the studio-network section; four accepted input examples on Contact. Repeated terms are compact, with full legal links.
- **Partners:** restored the hub heading that an old shared navigation rule incorrectly hid; unrelated architectural research and retail studies replaced by existing founder portraits and clearly labeled, partner-specific collaboration steps. No substitute project proof is fabricated.
- **Insights / FAQs / markets:** article visuals are inserted between sections while retaining article copy; FAQs remain category-led accordions. Country drawing panels and decorative lettering no longer overflow narrow phones. Full country introductions remain in accessible disclosure.
- **Shared layout:** readable image captions, visible swipe indicators, keyboard-scrollable galleries, less repeated legal/footer density, and a smaller mobile WhatsApp control.

## Content and asset decisions

Existing Artimist assets were reused; no new AI images were generated. Technical boards are shown without cutting off their drawings in the principal technical galleries. Generated concept references are labeled as concepts. Transformation sequences explicitly describe selected examples, not a claimed single-project before/after.

The retired Parametric Pavilion `board-01.webp` is not assigned to page content. Existing redirects away from the retired URL can remain.

SEO titles, descriptions, canonical URLs and structured data remain in place. Image metadata and the image sitemap follow the new assignments. Full service/Insight copy stays in the rendered HTML, including expanded reading sections. Local licensing, engineering/stamp responsibilities and permit uncertainty remain explicit. No new pricing or office claims were introduced.

## Verification

- Next.js production-format build: passed, 83 generated pages.
- 46 focused tests: passed — 40 rendered routes, ADU WebP response, exact asset coverage, exterior-only mapping, crawlable service copy, retired-asset exclusion and office-claim regression.
- Browser route pass: all 39 requested major routes at desktop and phone width.
- Additional critical-route checks at 1440, 1280, 768, 390 and 360 px: no remaining document-width overflow or broken loaded above-fold images after fixes.
- Visual inspection included homepage, Services, exterior gallery, Revit gallery, homeowner transformation sequence, Contact gallery, About, Team, ADU, Insights, FAQ, country pages, navigation and search overlays.
- Keyboard image scrolling, FAQ disclosure, search answer selection, Escape dismissal and focus return checked. No real inquiry or contact form was submitted.
- Existing WebP assets and lazy loading reused; duplicate proof galleries and rotating generated strips removed. No measured Core Web Vitals improvement is claimed.

### Existing tooling limitations

The repository's default `npm test` targets its older Sites/vinext worker and expects obsolete development-preview metadata. That legacy test failed and was not weakened to hide the mismatch. The active Vercel project uses `next build`; the new `tests/next-preview.test.mjs` checks that actual rendering path.

The full lint pass still reports 26 pre-existing errors in `artimist-experience.tsx` and `site-index.tsx` (24 internal-link rules and 2 state-in-effect rules). The same counts were verified against the untouched base commit. Newly edited core components pass the focused error-level lint check.

This is browser-width verification, not physical iPhone/Safari testing or a field performance measurement. Review on a real phone before production approval.

## Assets and approvals still needed

1. Genuine, permission-cleared source → plan → model → final sets from the same homeowner projects would replace the explicitly illustrative sequences.
2. Original CAD/Revit files or high-resolution clean exports would improve detailed technical zooming, especially documentation examples with baked-in promotional text.
3. Partner-approved software/interface and e-commerce delivery screenshots are still needed; existing 200-pixel founder portraits identify the partners in the meantime and are displayed at their native size.
4. Owner approval of image choices, concept labels, mobile layout and the preview as a whole is required before production. A measured performance pass and physical-device check are recommended at that gate.

## Reproduce the focused checks

Use Node 22.13 or newer. Build with `node node_modules/next/dist/bin/next build`, start that build with `node node_modules/next/dist/bin/next start --port 4175`, then run `node --test tests/visual-overhaul.test.mjs tests/next-preview.test.mjs`. Set `PREVIEW_BASE_URL` to check a different running preview.
