// ─── Business Configuration ───────────────────────────────────────────────────
// Update this file once per client site. Every page, schema, and component
// reads from here, you should not need to change business details anywhere else.

export const business = {
  // ── Identity ──
  name: "Your Business Name",
  tagline: "Professional service you can count on, done right the first time.",
  niche: "Home Services",          // e.g. "HVAC", "Roofing", "Plumbing", "Lawn Care"
  yearFounded: 2010,               // used in "X years in business" stats
  licenseNumber: "LIC-000000",     // show on About / footer (set "" to hide)

  // ── Contact ──
  phone: "(555) 555-5555",
  phoneRaw: "5555555555",          // digits only, used in tel: links
  // Optional. If `phone` above is a call-tracking number (for example a rented-site or ad number),
  // put the business's REAL main line here. Search engines (the LocalBusiness data) will use it, so it
  // matches the Google Business Profile. Leave "" to use `phone`. Format it the same way as `phone`.
  schemaPhone: "",
  email: "hello@yourbusiness.com",

  // ── Hours (optional) ──
  // Schema.org format, one entry per range, for example ["Mo-Fr 08:00-17:00", "Sa 09:00-13:00"].
  // Leave [] to leave hours out of the search-engine data.
  hours: [] as string[],

  // ── Location ──
  // Service-area businesses often have no public street address.
  // Fill city/state/zip for local SEO without exposing a home address.
  city: "Your City",
  state: "ST",
  zip: "00000",
  serviceRadius: "30 mile radius", // e.g. "50 miles", "metro area"
  lat: 41.6638,   // city center coordinates for map embeds, update per client
  lng: -83.5552,

  // ── Google ──
  // placeId: get it from Google Maps → Share → copy the Place ID, or use
  //   https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  // Enable "Places API (New)" and "Maps Embed API" in Google Cloud Console.
  // Set GOOGLE_PLACES_API_KEY and PUBLIC_GOOGLE_MAPS_KEY in Cloudflare env vars.
  placeId: "",      // e.g. "ChIJN1t_tDeuEmsRUsoyG83frY4"
  // Optional: your Google Maps listing link (Google Maps > your business > Share > copy link).
  // Added to the search-engine data so Google can connect this site to your listing. "" to skip.
  googleMapsUrl: "",

  // ── Hero photo (optional) ──
  // A wide photo of your work for the top of the home page, saved in public/images/ (WebP, about 1600px wide).
  // Leave "" to use the clean color background. heroImageAlt describes the photo: subject, service, city.
  heroImage: "",
  heroImageAlt: "",

  // ── Review link ──
  // reviewUrl: your direct Google review link (Google Business Profile > "Ask for reviews" > copy link).
  reviewUrl: "https://g.page/r/REPLACE_WITH_REVIEW_ID/review",

  // ── Social ──
  socials: {
    facebook:  "",   // full URL: https://facebook.com/yourbusiness
    instagram: "",   // full URL: https://instagram.com/yourbusiness
    google:    "",   // Google Business Profile URL (for review link CTA)
    nextdoor:  "",   // Nextdoor business page URL
    tiktok:    "",   // full URL: https://tiktok.com/@yourbusiness
    youtube:   "",   // full URL: https://youtube.com/@yourbusiness
  },

  // ── Trust / SEO signals ──
  reviewCount: 200,           // shown in hero and trust bar ("200+ reviews")
  rating: "4.9",              // shown as "Rated 4.9/5"
  // Put the star rating and reviews into search-engine data (schema)? Leave false until
  // reviewCount and rating above are your REAL Google numbers. Fake ratings in schema can get a site penalized.
  showRatingInSchema: false,
  priceRange: "$$",           // search-engine price hint: "$" cheap, "$$" typical, "$$$" premium, "$$$$" high end
  guaranteeText: "100% Satisfaction Guaranteed",
  // Short claims shown under the main buttons (separated by dots). Only list what is TRUE for you.
  // Examples: "Free estimate", "No obligation", "Licensed & insured", "Same-day response".
  ctaProof: ["Free estimate", "No obligation"],

  // ── Quick-stats (homepage stat band) ──
  stats: {
    jobsCompleted:    500,   // e.g. 500+ jobs completed
    yearsInBusiness:  15,    // override or calculate from yearFounded
    satisfactionRate: 98,    // percentage
    citiesServed:     12,    // number of cities/towns in service area
  },

  // ── Optional pages ──
  // Switch a page off (false) if the business does not offer it. The page is then not built,
  // its footer link disappears and it stays out of the sitemap. Content: src/optional-pages/.
  optionalPages: {
    emergency: true,   // /emergency: promises fast, after-hours response. Only if they really do it.
    offers: true,      // /offers: current deals and discounts. Edit the offers first.
    financing: true,   // /financing: payment plans. Only if they offer financing through a real lender.
  },

  // ── Services (short list for footer quick-links) ──
  // Full service pages live in src/content/services/, this is just for the footer.
  primaryServices: [
    "Service One",
    "Service Two",
    "Service Three",
    "Service Four",
    "Service Five",
    "Emergency Service",
  ],
};
