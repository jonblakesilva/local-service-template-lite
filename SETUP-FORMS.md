# Setup: Forms

This guide shows how to make the quote forms on your site send leads to you. The forms are on the home page (the quote box at the top) and on `/contact`.

## Choose how your forms work

Every form on the site uses ONE of two options. You pick in `src/config/forms.ts` with the `formProvider` setting.

| | Option A: Web3Forms | Option B: Your own form tool or CRM |
| --- | --- | --- |
| Setting | `formProvider = "web3forms"` | `formProvider = "embed"` |
| Cost | Free plan | Depends on the tool |
| Setup time | About 5 minutes | A few minutes to a few hours |
| What happens to a lead | An email lands in your inbox | The lead is saved in your tool |
| Who it is for | You just want leads in your email and nothing else to manage | You already use a CRM or form tool |

You can start with A and move to B later. Nothing else on the site changes.

Until the option you picked is set up, visitors see a friendly "Call us" box in place of each form. While developing (`npm run dev`) you see a dashed "Form not set up yet" box that says what is missing.

## Option A: Web3Forms (free, no CRM)

1. Go to [web3forms.com](https://web3forms.com) and enter your email. They email you an **access key**.
2. Open `src/config/forms.ts`. Make sure `formProvider = "web3forms"` and paste the key between the quotes of `web3formsAccessKey`.
3. Run `npm run dev` and send a test from the home page and from `/contact`. Confirm each test arrives in your email. Each email subject names the form it came from.

Good to know:

- **The access key is public on purpose.** Web3Forms designed it to sit in the page code. It can only send email to you, nothing else. You do not need to hide it.
- Spam is blocked by a hidden "botcheck" field that people never see, plus Web3Forms' own filters. Their free plan has monthly limits, so check their current plan page.
- Each form has an optional, unticked text-message consent box with plain wording. Web3Forms does not send texts for you. The box only records that the person agreed, in your email.
- It works on any static host (Cloudflare Pages, Netlify, Vercel). No server needed.

## Option B: Your own form tool or CRM

1. Build a form in your tool (Jotform, Typeform, Tally, Google Forms, or your CRM).
2. Copy its **embed code** (look for "Embed", "Share" or "Website code"). An iframe or a script snippet both work.
3. Paste it between the backticks of `contactEmbed` in `src/config/forms.ts`. Set `formProvider = "embed"`.
4. Run `npm run dev` and check `/contact`.

The home page quote box can also send leads to a webhook. Put your tool's webhook URL in `PUBLIC_GHL_WEBHOOK_URL` (a local `.env` file to test, your host's environment variables for the live site). The name says GHL, but any webhook URL from your CRM or form tool works. Without it, that box shows a "Call us" button instead.

## Need a CRM?

If you want leads followed up automatically (missed-call text back, appointment reminders, review requests), a CRM can do that. One option is [HighLevel](https://heyjonathanblake.com/go/highlevel). *(Affiliate link: the template's creator may earn a commission if you sign up, at no extra cost to you.)* Any CRM that gives you an embed code or webhook URL works with Option B.

## Test every form

1. Submit each form once with test details (use your own phone and email).
2. Confirm the test lead shows up in your email (Option A) or your tool (Option B), with every answer filled in.
3. Delete your test leads.
