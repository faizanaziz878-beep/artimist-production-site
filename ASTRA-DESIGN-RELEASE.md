# Artimist — Astra design release

Production deployment authorized by the user on 5 September 2026.
Working branch: codex/astra-design-20260905.
Previous production source: 1509bf359f31e55e15cbf2616c64433b8a80a6ec.

## Visual decisions

- Homepage: warm editorial opening, framed cinematic imagery, controlled title scale, improved captions and contrast. Selected work now precedes the interactive spatial model.
- Services: keyboard-accessible DESIGN IT / DOCUMENT IT / SHOW IT explorer with deliberate image transitions and a compact mobile tab strip. All specialist links remain below.
- Architecture, BIM, visualization and the indexed landing-page family: separate text and image areas, uncropped technical boards, balanced headings, shorter section spacing and mobile layouts.
- Custom House, Plan Modification, Interior Design and Renovation: compact scope disclosure retains the full introductory SEO copy; cleaner image treatment and mobile actions.
- About, Team and Contact: measured heading and section scale, with the complete team roster preserved. About keeps its multidisciplinary visual sequence; Contact retains its accepted-input examples and form.
- Insights: calmer typography and image enlargement alongside the existing article visual sequences and crawlable copy.
- Shared galleries: previous/next controls, current-image count and an accessible image dialog with Escape and focus restoration.
- Motion: short entrance reveals and image transitions. No new permanent animation loop. Reduced-motion preferences are respected.

## Preservation

Existing page-specific asset maps, metadata, schema, FAQs, terms and licensing boundaries remain intact. House Exterior still uses exterior/facade/site/massing imagery only. Retired board-01.webp remains excluded from curated service mappings. No new office, price, stamp or permit-guarantee claims.

Existing Artimist assets cover this release; no new generated assets were required.

## Verification

- Next production build and TypeScript compilation.
- 46 existing route/SEO/content/asset checks.
- 50 browser layout cases: ten representative routes at 1440, 1280, 768, 390 and 360 px.
- Keyboard service selection, search sheet, gallery controls, image dialog close/focus restoration, native scope disclosure and reduced-motion checks.
- Browser screenshots inspected for desktop, tablet and mobile compositions.
- Changed React components: no lint errors; existing image-optimization advisory warnings remain.
- No real inquiry was submitted during testing.

The browser test can be run with Playwright available on NODE_PATH and PREVIEW_BASE_URL pointing to a running Next production server. ASTRA_QA_DIR controls screenshot output.

## Scope notes

This is an editorial and motion refinement of the prior full visual overhaul, not a replacement of every specialist page template. Existing content and unique page identities are preserved. Field performance should be evaluated with real visitor data; this release does not claim a measured Lighthouse or Core Web Vitals improvement.
