import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { business } from "@/config/business";

// Generated from src/config/business.ts and your service/location files, so it never goes stale.
export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? "";
  const services = (await getCollection("services", (s) => !s.data.draft)).sort((a, b) => a.data.order - b.data.order);
  const locations = await getCollection("locations");

  const lines = [
    `# ${business.name}: ${business.niche}`,
    "",
    `> ${business.tagline}`,
    "",
    "## About",
    `${business.name} is a ${business.niche.toLowerCase()} company based in ${business.city}, ${business.state}. Founded in ${business.yearFounded}. ${business.guaranteeText}. We serve customers within a ${business.serviceRadius}.`,
    "",
    "## Services",
    ...services.map((s) => `- ${s.data.title}: ${s.data.shortDesc} (${siteUrl}/services/${s.data.urlSlug})`),
    "",
    "## Service Area",
    `${business.city}, ${business.state} and a ${business.serviceRadius}`,
    ...locations.map((l: any) => `- ${l.data.city}, ${l.data.state} (${siteUrl}/service-areas/${l.data.urlSlug})`),
    "",
    "## Contact",
    `- Phone: ${business.phone}`,
    `- Email: ${business.email}`,
    `- Free estimate: ${siteUrl}/contact`,
    ...(business.hours.length ? ["", "## Hours", ...business.hours.map((h) => `- ${h}`)] : []),
    "",
    "## Trust Signals",
    `- Rated ${business.rating}/5 by ${business.reviewCount}+ customers`,
    `- ${business.guaranteeText}`,
    ...business.ctaProof.map((c) => `- ${c}`),
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
