# Artimist Productions — 100% Website Completion Checklist

Status: in progress

## 1. Brand and shared UI
- [ ] Preserve the existing 3D/WebGL experience and model.
- [ ] Use one shared SVG icon system for arrows, menu, sun/moon, close, upload, external link and checks.
- [ ] Remove remaining Unicode/emoji directional arrows from visible Next.js UI.
- [ ] Remove duplicate legacy header/menu behavior where the canonical header already owns navigation.
- [ ] Make header, menu and safe-area spacing consistent on desktop, Android and iOS Safari.
- [ ] Prevent heading/text clipping, hidden words and unsafe overflow at all supported breakpoints.
- [ ] Improve keyboard focus states, tap targets and reduced-motion behavior.

## 2. Mobile / iOS
- [ ] Keep WhatsApp, Ask the Studio and footer controls visually separated.
- [ ] Stop fixed controls from colliding with browser safe areas.
- [ ] Make all local navigation strips scrollable and readable without clipping.
- [ ] Make the site index usable to the final item on small iPhones.
- [ ] Remove source-level emoji arrows so iOS never substitutes blue emoji glyphs.
- [ ] Reduce decorative motion on small screens while keeping the visual identity.

## 3. Homepage / primary journey
- [ ] Keep the 3D experience.
- [ ] Clarify the first-screen proposition for homeowners and professional teams.
- [ ] Improve the route into Home Design, professional Services and Selected Work.
- [ ] Render validated client proof in the page instead of relying only on client-side injection.
- [ ] Keep the low-budget entry point consistent with the contact flow.
- [ ] Make every primary CTA carry service context into the project brief.

## 4. Contact / project intake
- [ ] Replace the generic contact form with a project intake experience.
- [ ] Add project location and project stage.
- [ ] Use consistent budget bands including $200–1k.
- [ ] Add a source-files/share-link field for Drive/Dropbox/WeTransfer/OneDrive.
- [ ] Preserve service preselection from landing pages.
- [ ] Store/send new intake fields through the inquiry API and receipt email.
- [ ] Show a useful success state and one-click WhatsApp continuation.
- [ ] Remove CTA promises that imply an upload/booking experience that does not exist.

## 5. Search landing pages / services
- [ ] Make landing-page CTA language match the real project intake flow.
- [ ] Differentiate architecture, BIM, drafting, Revit, BIM modeling, permit documentation and visualization pages.
- [ ] Add stronger service-to-case-study internal links.
- [ ] Add clear “what we need from you” and “what you receive” language where relevant.
- [ ] Keep permit/licensing statements precise and non-misleading.

## 6. Portfolio / case studies / visuals
- [ ] Keep the image-first Visual Archive concept.
- [ ] Fix over-eager image preloading/fetch priority in media-heavy pages.
- [ ] Add chapter navigation for long visual journeys.
- [ ] Improve project captions/context and image semantics.
- [ ] Add understated conversion bridges from relevant work into the matching service.
- [ ] Keep case studies focused on real project evidence and decision logic.

## 7. SEO / AI discoverability
- [ ] Use consistent “Artimist Productions” entity naming everywhere in the live Next.js experience.
- [ ] Add a default social share image and page-specific metadata support.
- [ ] Fix pages that inherit generic homepage Open Graph/Twitter metadata.
- [ ] Keep canonical URLs, Organization/WebSite schema and crawler access clean.
- [ ] Use truthful page-specific structured data only where visible content supports it.
- [ ] Remove/redirect dead internal routes such as stale /skills references.
- [ ] Improve internal linking between hubs, money pages and case studies.

## 8. Performance / accessibility / QA
- [ ] Only prioritize genuine above-the-fold media.
- [ ] Lazy-load deep portfolio imagery and avoid unnecessary eager images.
- [ ] Pause/reduce expensive motion where practical on mobile/reduced-motion devices.
- [ ] Maintain readable contrast and text sizing.
- [ ] Verify all important pages return 200 with correct titles/canonicals.
- [ ] Verify no broken primary links or missing CTA destinations remain.
- [ ] Verify desktop and mobile live pages after deployment.

## 9. Delivery
- [ ] Build/preview the complete pass.
- [ ] Verify the preview before production.
- [ ] Promote/merge only after checks pass.
- [ ] Recheck the production domain after deployment.
