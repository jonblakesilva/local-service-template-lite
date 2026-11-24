# Launch Checklist

A short list to run through on launch day, and again 30 days later. The long version of every setting is in `SETUP-CHECKLIST.md`. Check each box only when it is true.

## Before you go live

- [ ] Every value in `src/config/business.ts` is real: name, phone, email, city, state, zip, hours, services.
- [ ] `reviewUrl` is your real Google review link, and `googleMapsUrl` is your Google Maps listing link.
- [ ] If `phone` is a call-tracking number, your real main line is in `schemaPhone`.
- [ ] Only true claims are shown: license, insurance, guarantee, review count, years in business, stats.
- [ ] `site:` in `astro.config.mjs` is your real domain.
- [ ] You chose how forms work (`src/config/forms.ts`), and you sent a real test message through every form.
- [ ] You called the phone number from your own phone and it rings the right place.
- [ ] `npm run build` and `npm run check-placeholders` both finish with no problems.
- [ ] Every image is WebP, has a descriptive name and alt text, and no photo shows a customer's address or face without permission.
- [ ] Privacy and terms pages have real dates, and any offers or financing pages are true or removed.
- [ ] You checked every page at phone width.

## Day one

- [ ] Claim and verify your Google Business Profile.
- [ ] Add your social page links to `socials` in `src/config/business.ts`.
- [ ] Submit your sitemap (`/sitemap-index.xml`) in Google Search Console.
- [ ] Turn on Cloudflare Web Analytics (`CF_ANALYTICS_TOKEN`), and optionally PostHog (see README).
- [ ] Add the site link to your Facebook page, truck, invoices, email signature and business cards.

## First 30 days

- [ ] Ask 10 happy customers for a Google review.
- [ ] Add new real photos to your Google profile every week.
- [ ] Ask every caller how they heard about you, and write it down.
- [ ] Reply to every review within 2 days.
- [ ] Look at your analytics: which pages get visits, which numbers get tapped.
- [ ] Fix anything that confused visitors.
