# Local Service Website (Astro)

A lead-generation website for a local service business (contractor, HVAC, lawn care, roofing, plumbing and so on). Built with Astro and Tailwind CSS v4. Hosted as a static site (Cloudflare Pages, Netlify or Vercel).

The owner may not be technical. Explain what you changed in plain English.

## The files you edit

- `src/config/business.ts`: the ONE file for business details (name, phone, city, services list, hours, review link, socials, trust claims). Pages, schema and `llms.txt` all read from it.
- `src/config/forms.ts`: how the forms work. Two options, pick ONE with `formProvider`:
  - **Option A, `"web3forms"`:** free, no CRM, submissions are emailed to the owner. Needs `web3formsAccessKey` (free key from web3forms.com). The key is public by design, it is fine in client code.
  - **Option B, `"embed"`:** the owner pastes an embed code from their own form tool or CRM into `contactEmbed`. The home hero quote form uses the `PUBLIC_GHL_WEBHOOK_URL` webhook in this mode.
  - Unconfigured forms show a "Call us" box live and a "Form not set up yet" box in dev, never a broken form. SMS consent text must never include "Reply STOP". Details: `SETUP-FORMS.md`.
- `src/content/services/*.md`, `src/content/locations/*.md`, `src/content/blog/*.md`: service pages, service-area pages and blog posts.
- `src/styles/global.css`: colors (`--color-primary-*`, `--color-accent-*`) and fonts.
- Full list of settings: `SETUP-CHECKLIST.md`. Launch steps: `LAUNCH-CHECKLIST.md`.
- Call tracking: if `phone` is a tracking number, put the real main line in `schemaPhone` (used for search-engine data).

## Commands

- `npm install`: install once.
- `npm run dev`: preview at http://localhost:4321.
- `npm run build`: build the site into `dist/`.
- `npm run check-placeholders`: run after a build. Lists any template text still on the pages. Must be clean before launch.
- `npm run images -- <photo-folder>`: converts JPG/PNG photos to WebP into `public/images/`.

## Conventions

- All images are WebP, max about 1200px wide, quality about 82. No JPEG or PNG committed. Use `npm run images`.
- Descriptive file names: `{business}-{subject}-{context}.webp`.
- Every image has meaningful alt text that names the subject, the service and the city.
- No em dashes in any copy. Use a comma, a period or a colon.
- Never leave placeholder text on a live page (run the placeholder check).
- Mobile first. Check every change at phone width.
- Every page has one clear call to action plus a phone link. Do not stack several competing buttons.
- Only show claims the business owner has said are true (licensed, insured, guarantees, review counts).
- Keep business details in `business.ts`, not hard-coded in pages.

## Page notes

- Service pages: optional `image: { src: "/images/x.webp", alt: "..." }` in the frontmatter.
- Blog posts: `image.src` must be a local `/images/*.webp` path, not an external URL. Hero images about 1200px wide.
- "Recent work" section (`src/components/beforeafter.astro`): set `after` (and `before` for a split card) to `/images/*.webp` paths. With no photos the section is left out.
- Home hero photo: `heroImage` / `heroImageAlt` in `business.ts` (WebP in `public/images/`). Leave `""` for the plain color background.

## Astro docs

Full documentation: https://docs.astro.build
