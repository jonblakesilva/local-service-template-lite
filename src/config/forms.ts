// ─── Forms ────────────────────────────────────────────────────────────────────
// Pick ONE way to handle the forms on the site (contact page and the home page quote box).
// Full walkthrough: SETUP-FORMS.md
//
//  "web3forms"  Option A. Free. No CRM. Every submission is emailed to you.
//               Needs a free access key from https://web3forms.com (paste it below).
//  "embed"      Option B. Use a form from your own CRM or form tool. Paste its embed code below.
//
// Until the chosen option is set up, visitors see a friendly "Call us" box instead of a broken form.

export const formProvider = "web3forms" as "web3forms" | "embed";

// Option A: your Web3Forms access key. It is safe to leave in the site code. Web3Forms designed
// access keys to be public, and they only let people send email to YOU. Leave "" until you have it.
export const web3formsAccessKey = "";

// ─── Option B embed slot ──────────────────────────────────────────────────────
// Paste the embed code from ANY form tool (your CRM, HubSpot, Jotform, Typeform, Google Forms, Tally...)
// between the backticks below. It can be an <iframe> or a <script> snippet; both work.
// Leave it empty ("") until you have the code. While it is empty, the page shows a setup box in
// development and a simple "Call us" box on the live site, so visitors never see setup text.
//
// Tip: if the code contains a backtick (`) or ${, ask your form tool for the iframe version instead.

export const forms = {
  // /contact ("Request a free quote" form).
  contactEmbed: ``,
};

/** True when Option A is chosen and a real access key has been pasted in. */
export const web3formsReady =
  formProvider === "web3forms" &&
  web3formsAccessKey.trim() !== "" &&
  !web3formsAccessKey.includes("YOUR_");
