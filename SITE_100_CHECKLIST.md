# Artimist Productions — Website Completion Checklist

Status: release candidate on `site-100-pass`

Legend: `[x]` completed in source/build; `[~]` completed functionally but requires final live visual confirmation; `[ ]` intentionally still open.

## 1. Brand and shared UI
- [x] Preserve the existing 3D/WebGL experience and model.
- [x] Use one shared SVG icon system for arrows, menu, sun/moon, close, upload, external link and checks.
- [~] Remove visible Unicode/emoji directional arrows from public UI. Shared/new UI is source-level SVG; a few legacy homepage glyphs are visually replaced by CSS linework pending a future full component refactor.
- [x] Remove duplicate legacy header/menu behavior where the canonical header already owns navigation.
- [x] Make header, menu and safe-area spacing consistent across responsive breakpoints.
- [x] Prevent common heading/text clipping, hidden-word and unsafe-overflow failures, including iOS Safari safeguards.
- [x] Improve keyboard focus states, tap targets and reduced-motion behavior.

## 2. Mobile / iOS
- [x] Keep WhatsApp and Ask the Studio as separate controls: WhatsApp left, Ask the Studio right.
- [x] Stop fixed controls from colliding with browser safe areas and reserve footer/bottom spacing.
- [x] Make long navigation strips horizontally scrollable where required.
- [x] Make the canonical site index independently scrollable through the final item on small screens.
- [~] Remove visible emoji-style arrows. New/shared controls are SVG; remaining legacy homepage source glyphs are neutralized visually.
- [x] Respect `prefers-reduced-motion` and remove the old runtime heading animation/mutation system.

## 3. Homepage / primary journey
- [x] Keep the existing 3D/interactive project experience.
- [x] Clarify the proposition around architecture, BIM/Revit, interiors and visualization.
- [x] Keep clear routes into homeowner services, professional services, selected work and portfolio archives.
- [x] Keep genuine client notes only; no invented testimonial fallback.
- [x] Remove the weaker duplicate homepage enquiry form and hand visitors to the single structured project intake.
- [x] Add a focused end-of-portfolio project bridge plus direct WhatsApp option.
- [x] Remove the old post-load script that rewrote headings and silently converted conversation/contact links.

## 4. Contact / project intake
- [x] Replace the generic contact form with a project intake experience.
- [x] Add project location and project stage.
- [x] Use consistent budget bands including $200–$1,000 entry levels.
- [x] Add a source-files/share-link field for Drive, Dropbox, WeTransfer and OneDrive.
- [x] Preserve service/source context from landing pages.
- [x] Store/send the new intake fields through the inquiry API and notification workflow.
- [x] Show a useful success state, enquiry reference and one-click WhatsApp continuation.
- [x] Remove CTA promises that implied an upload/booking experience that did not exist.

## 5. Search landing pages / services
- [x] Make landing-page CTA language match the real project intake flow.
- [x] Differentiate architecture, BIM, drafting, Revit, BIM modeling, permit documentation and visualization pages.
- [x] Add stronger service-to-case-study internal links.
- [x] Add clear “what we need from you” and “what you receive” language where relevant.
- [x] Keep permit/licensing statements precise and non-misleading.
- [x] Replace generic text-heavy visualization subpages with image-led service pages using real Artimist work.
- [x] Add page-specific Open Graph/Twitter metadata to major service routes.

## 6. Portfolio / case studies / visuals
- [x] Keep the image-first Visual Archive concept.
- [x] Fix over-eager image loading/fetch priority in media-heavy visual journeys.
- [x] Add chapter navigation for long visual journeys.
- [x] Improve project captions/context and image semantics.
- [x] Add understated conversion bridges from relevant work into project intake/services.
- [x] Keep case studies focused on real project evidence and decision logic.
- [x] Add original architecture/BIM/visualization SVG graphics to service/search pages where visuals were missing.

## 7. SEO / AI discoverability
- [x] Normalize the primary public entity to “Artimist Productions”.
- [x] Add a default social share image and page-specific metadata support.
- [x] Fix major pages that previously inherited generic homepage social metadata.
- [x] Keep canonical URLs, Organization/WebSite schema and crawler access clean.
- [x] Use truthful page-specific Service/FAQ/Profile structured data only where visible content supports it.
- [x] Permanently redirect stale `/skills` to `/services` and remove stale AI-facing `/skills` references.
- [x] Improve internal linking between hubs, money pages, visual work and case studies.
- [x] Update `llms.txt` to the current routes/project-intake model and explicit non-invention/licensing guidance.

## 8. Performance / accessibility / runtime stability
- [x] Only prioritize genuine above-the-fold media on long visual pages.
- [x] Lazy-load deep portfolio imagery.
- [x] Remove the runtime character-by-character heading mutation system that could create missing-text/hydration-like visual failures.
- [x] Remove the legacy mobile DOM-rewriter from the global execution path.
- [x] Maintain keyboard focus visibility, mobile 44px+ interactive targets and 16px mobile form inputs.
- [x] Reserve safe-area-aware bottom space for conversion controls.
- [x] Build the complete branch successfully on Vercel during the pass; failures were fixed before release.
- [~] Final important-route HTTP/title/canonical checks to be repeated on the public production domain after merge.
- [~] Final desktop/iPhone visual confirmation is limited by protected preview/browser access in this session; source, responsive CSS and build verification are complete.

## 9. Delivery
- [x] Work on isolated `site-100-pass` branch instead of editing production blindly.
- [x] Confirm branch is ahead of `main` with no divergence before release.
- [~] Final branch-head Vercel build must be READY before merge.
- [ ] Merge `site-100-pass` to `main` / production.
- [ ] Recheck the public production domain, routes, runtime errors and crawl files after deployment.

## Release blockers
1. Latest branch-head Vercel build must finish successfully.
2. Do not merge if Vercel reports a type/build error.
3. After merge, recheck production HTTP behavior, sitemap, robots, `llms.txt`, contact route and Vercel runtime errors.

## Non-blocking follow-up
A future cleanup can refactor the large legacy homepage component so every remaining decorative directional glyph is removed from its JSX source rather than being visually replaced by shared CSS. It is not allowed to change or remove the preserved 3D/WebGL experience while doing so.
