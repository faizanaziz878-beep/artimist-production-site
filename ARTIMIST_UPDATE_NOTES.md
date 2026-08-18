# Artimist Website — August 2026 Refresh

## What changed

- Replaced the current team portraits across public team surfaces for Sufyan Ilyas, Abdur Rehman, Farwa Kashif, Rohma Fatima, Eunica Amir and Shumail. The public data layer now prefers these refreshed portraits so an older database image cannot reappear on another page.
- Added Shumail to the core roster. The temporary role is **Studio Collaborator** and can be changed from Studio Admin.
- Added **Stockholm, Sweden** as the fourth office and updated office counts/copy across Home, About, Founder Message, Contact and the shared office footer.
- Added a dedicated **Unreal Engine / Real-time** page at `/unreal-engine`, with a high-end animated presentation, real-time capabilities, use cases, pipeline, and featured direction by Faizan Aziz and Hanan Shahid.
- Added homepage Unreal Engine marketing gateway and navigation links, plus Unreal Engine visibility in Services and site metadata.
- Added a **Recent Projects** rail to the homepage. Newly published projects with the highest sequence numbers appear first and open the existing full project walkthrough/story view.
- Expanded Studio Admin project publishing:
  - multiple gallery image upload (up to 16 new images in one save)
  - cover upload or automatic first-gallery-image cover on new projects
  - full project description/story field
  - services, location, year, category and publication controls retained
- Expanded testimonial management:
  - public reviewer photo submission remains supported
  - Studio Admin can now add/replace a real client photo on each testimonial
  - public testimonial cards show the actual uploaded photo when available
  - initials remain the fallback when there is no client-supplied photo

## Admin workflow — publish a portfolio project

1. Open `/admin` and choose **Portfolio**.
2. Choose **New project**.
3. Add title, category, card summary and the longer **Project description / full story**.
4. Upload a cover image and/or multiple gallery images.
5. Keep **Visible on public site** enabled and save.
6. The project appears in the public archive and automatically enters **Recent Projects**. Higher sequence numbers appear earlier in the Recent Projects rail.

## Admin workflow — reviewer photos

1. Open `/admin` and choose **Client stories**.
2. On a testimonial, choose **Add real client photo** or **Replace client photo**.
3. Upload JPG, PNG or WebP (max 4 MB).
4. The public review card switches from initials to that real photo.

No fabricated client faces are bundled into the site. This keeps testimonials visually strong without presenting an invented person as a real reviewer.

## Validation note

The edited TypeScript/TSX files were syntax-parsed with the available TypeScript compiler and no parse errors were found. Static media references added in this refresh were checked against `public/`. A full framework lint/build could not be run in this environment because package installation could not reach the npm registry.
