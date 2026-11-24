# Local Service & Contractor Website Template (Lite)

A free, modern, production-ready Astro website template built for local service businesses, contractors, HVAC, lawn care, roofing, plumbing, electricians, and any other trade or home service company.

**Built by [The Lead Venture](https://theleadventure.com)**

---

## What's Included

- **Complete page set**: Home, About, Services, Service Areas, Pricing, Contact, Blog, Privacy Policy, Terms of Service, Thank You, 404
- **CRO-optimized homepage**: Hero with inline quote form, trust bar, services grid, how it works, stats counter, testimonials, before/after gallery, FAQ, and CTA
- **SEO-ready**: Schema.org LocalBusiness, AggregateRating, Service, and FAQPage structured data
- **Scroll animations**: [Motion](https://motion.dev): sections fade in as they scroll into view, Lucide icons pop in, cards react on hover (respects reduced-motion)
- **Sticky mobile call bar**: Fixed bottom bar with Call Now + Free Quote buttons (mobile only)
- **Before/after gallery**: Swap in real project photos with one line of code
- **Content Collections**: Add services and service areas as Markdown files
- **Single config file**: All business info (name, phone, address, reviews, etc.) in `src/config/business.ts`
- **Cloudflare Web Analytics**: Set `CF_ANALYTICS_TOKEN` env var and done
- **llms.txt**: AI crawler-friendly site description, generated from your config
- **Ready for AI helpers**: `CLAUDE.md`, `AGENTS.md` and an image converter (`npm run images`)
- **Tailwind CSS v4**: Custom navy + orange design system, easy to retheme

---

## Quick Start (start here)

Follow these steps in order. Each one is short.

1. **Get the code.** Click **Use this template** at the top of this page to make your own copy (it can be private). Then download it to your computer (`git clone <your copy's address>`), or download the ZIP and unzip it.
2. **Install the tools.** Install [Node.js 24](https://nodejs.org) (22.23 or newer also works). In a terminal, open the project folder and run `npm install`.
3. **Edit the ONE file.** Open `src/config/business.ts` and replace the placeholder values:
   - `name`, `tagline`, `niche`: your business name, one-line pitch and trade (for example "Roofing").
   - `phone` and `phoneRaw`: your number, nicely formatted and digits only.
   - `city`, `state`, `zip`, `serviceRadius`: where you work.
   - `primaryServices`: the list of your main services (shown in the footer and contact form).
   - `reviewUrl`: your direct Google review link.
   - `socials`: full web addresses of your Facebook, Instagram, TikTok, YouTube, Google and Nextdoor pages. Leave any blank to hide it.
   - Colors: edit the `--color-primary-*` (navy) and `--color-accent-*` (orange) values in `src/styles/global.css`.
   - Full list of every setting: [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md).
4. **Preview it.** Run `npm run dev` and open the address it prints (usually http://localhost:4321). Click around and check every page.
5. **Check for leftovers.** Run `npm run build`, then `npm run check-placeholders`. It lists any placeholder text you forgot to replace (like "Your Business Name" or a sample phone number). Fix them and run both again until it says no placeholders were found.
6. **Put it online.** Cloudflare Pages, Netlify and Vercel all work, and Cloudflare Pages is free. Settings: build command `npm run build`, output folder `dist`. Step-by-step Cloudflare instructions are in the [Deploy](#deploy) section below. Set `site:` in `astro.config.mjs` to your real domain first.
7. **Pick how your forms work.** Open `src/config/forms.ts` and choose one. Full walkthrough: [SETUP-FORMS.md](SETUP-FORMS.md).
   - **Option A, Web3Forms (free, no CRM):** set `formProvider = "web3forms"`, get a free access key at [web3forms.com](https://web3forms.com), and paste it in `web3formsAccessKey`. Every contact and quote submission is emailed to you. The key is meant to be public, so it is safe in the site code.
   - **Option B, your own form tool or CRM:** set `formProvider = "embed"` and paste the embed code from your tool into `contactEmbed` in `src/config/forms.ts`.
   - Not set up yet? Visitors see a friendly "Call us" box, never a broken form.
8. **Plan your launch.** Run through [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md).
9. **Quote form webhook (optional).** With Option B, the home page quote form sends leads to a webhook when `PUBLIC_GHL_WEBHOOK_URL` is set. Despite the name, use the webhook URL from your CRM or form tool. Put it in a local `.env` file to test, and in your host's environment variables for the live site. Without it, those forms show a "Call us" box instead.

---

## Build It With AI

You can finish this site with an AI coding assistant such as Claude Code or Codex. The files `CLAUDE.md` and `AGENTS.md` tell the assistant how the project works. Open the project folder in your assistant and paste a prompt like these (swap in your own details):

1. "Fill in `src/config/business.ts` for my business: [name], [trade], [phone], [city, state, zip], services [list], Google review link [url], Facebook [url], Instagram [url]. Then run the placeholder check and tell me what is left."
2. "Add a service page for [service] in [city]. Match the other service pages, write plain-English copy for homeowners, and add a free-estimate button and phone link."
3. "I put photos in [folder]. Convert them to WebP with `npm run images`, give them descriptive file names, and use them in the before/after section with alt text that names the service and city."
4. "Run `npm run build` and `npm run check-placeholders`, then fix everything it lists. Do not invent facts; ask me when you need a real value."
5. "Check every page at phone width and fix anything that looks cramped, then tell me what you changed in plain English."

---

## Customization

### 1. Fill in your business info

Edit `src/config/business.ts`, this is the single source of truth for every page:

```ts
export const business = {
  name: "Your Business Name",
  tagline: "...",
  phone: "(555) 555-5555",
  city: "Your City",
  state: "ST",
  // ...
};
```

### 2. Add your services

Create a Markdown file in `src/content/services/`:

```md
---
title: "Roof Replacement"
urlSlug: "roof-replacement"
shortDesc: "Full residential roof replacement with lifetime warranty."
icon: "lucide:home"
order: 1
---

## What's Included
...
```

### 3. Add service areas

Create a Markdown file in `src/content/locations/`:

```md
---
city: "Columbus"
state: "OH"
urlSlug: "columbus-oh"
order: 1
---
```

### 4. Add real before/after photos

In `src/components/beforeafter.astro`, replace the placeholder divs with:

```html
<img src="/images/before-project-1.jpg" alt="Before" class="w-full h-full object-cover" />
```

Place photos in `public/images/`.

### 5. Wire up Cloudflare Analytics

Set `CF_ANALYTICS_TOKEN` in your Cloudflare Pages environment variables (Settings → Environment Variables). Get your token from [dash.cloudflare.com](https://dash.cloudflare.com) → Web Analytics. No code changes needed, the analytics script loads automatically when the variable is set, and is omitted entirely when it isn't.

### 5b. Track calls and quote requests with PostHog (optional)

Make a free account at [posthog.com](https://posthog.com), copy your project API key, and set `PUBLIC_POSTHOG_KEY` in your hosting environment variables (and in a local `.env` file to test). If your PostHog project is in the EU cloud, also set `PUBLIC_POSTHOG_HOST` to `https://eu.i.posthog.com`. Redeploy and you'll see:

- **Page views**: automatically.
- **`phone_clicked`**: someone tapped a phone link. That shows intent, not a completed call.
- **`quote_submitted`**: a quote form was sent successfully, with which form and page.

Leave the key unset and no PostHog code ships at all.

### 6. Update the site URL

In `astro.config.mjs`, set `site` to your domain.

---

## Tech Stack

- [Astro 5](https://astro.build), Static site generator
- [Tailwind CSS v4](https://tailwindcss.com), Utility-first CSS
- [Motion](https://motion.dev), Scroll and hover animations
- [Lucide Icons](https://lucide.dev), via astro-icon + @iconify-json/lucide
- [web3forms](https://web3forms.com), Contact form (free tier, no backend needed)
- [Cloudflare Pages](https://pages.cloudflare.com), Recommended hosting

---

## Deploy

```bash
npm run build
```

Output goes to `dist/`. Deploy to Cloudflare Pages, Netlify, or Vercel.

**Cloudflare Pages (free):** Workers & Pages → Create → Pages → Import an existing Git repository → pick your copy. Framework preset **Astro**, build command `npm run build`, output directory `dist`, and add the environment variable `NODE_VERSION` = `24`.

---

## Need a CRM?

If you want leads followed up automatically (missed-call text back, appointment reminders, review requests), a CRM can do that. One option is [HighLevel](https://heyjonathanblake.com/go/highlevel). *(Affiliate link: the template's creator may earn a commission if you sign up, at no extra cost to you.)* Any CRM that gives you an embed code or webhook URL works with Option B above.

---

## Want the full version?

This free Lite template covers the core site. The full version adds:

- Survey, quiz and link-in-bio pages, ready to connect to your forms
- A done-for-you CRM snapshot with the follow-up already built
- An AI design kit for adding new sections that match the site
- A growth playbook for landing your first customers

Details at [theleadventure.com](https://theleadventure.com).

---

## Built by The Lead Venture

[theleadventure.com](https://theleadventure.com), We build lead generation websites for local service businesses.
