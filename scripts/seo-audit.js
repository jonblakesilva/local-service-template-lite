#!/usr/bin/env node
/**
 * seo-audit.js
 * Run after `npm run build`. Checks every page in dist/ for the SEO basics
 * that quietly cost rankings, and exits non-zero if any hard failure is found.
 *
 *   npm run audit            (failures + warnings)
 *   npm run audit -- --strict  (warnings count as failures too)
 *
 * Checks adapted from NicoSKOOL/99-website (MIT licence):
 * verify-seo.mjs, validate-jsonld.mjs and check-links.mjs, reworked to read
 * this template's dist/ folder directly instead of a site.json page plan.
 */

import fs from "fs";
import path from "path";

const DIST = path.resolve("dist");
const STRICT = process.argv.includes("--strict");

// A noindex page is fine on purpose (thank-you, survey, thin directory pages...) as long as it is
// NOT in the sitemap. Noindex + in the sitemap is a mixed signal Google reports as an error.
// Raster files allowed in dist (social share image, favicons).
const RASTER_OK = /(opengraph|favicon|apple-touch|icon-\d|og-|(^|\/)og\/)/i;

// ---------- small HTML helpers ----------
const ENT = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === "#"
      ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : +e.slice(1))
      : (ENT[e.toLowerCase()] ?? m),
  );
const strip = (html) =>
  decode(
    html
      .replace(/<head\b[\s\S]*?<\/head>/i, " ")
      .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[1] ?? m[2]) : null;
};
const metaContent = (html, name) => {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    if ((attr(m[0], "name") || "").toLowerCase() === name) return attr(m[0], "content") ?? "";
  }
  return null;
};

// ---------- collect pages ----------
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

if (!fs.existsSync(DIST)) {
  console.error("No dist/ folder. Run `npm run build` first.");
  process.exit(1);
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
// Pages are stored as /about/index.html (directory format) or /about.html (file format).
// Both are keyed as "/about/" so links work either way.
const urlOf = (f) => {
  const rel = "/" + path.relative(DIST, f).split(path.sep).join("/");
  if (rel === "/404.html") return "/404/";
  if (rel.endsWith("/index.html")) return rel.replace(/index\.html$/, "");
  return rel.replace(/\.html$/, "/");
};
// Skip HTML fragments (partials loaded by JavaScript): they have no <html> element.
const pages = htmlFiles
  .map((f) => ({ url: urlOf(f), html: fs.readFileSync(f, "utf8") }))
  .filter((p) => /<html[\s>]/i.test(p.html));
const sitemapFiles = files.filter((f) => /sitemap[^/]*\.xml$/.test(f));
const inSitemap = new Set(
  sitemapFiles.flatMap((f) =>
    [...fs.readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => { try { return new URL(m[1].trim()).pathname; } catch { return ""; } })
      .filter((u) => u && !u.endsWith(".xml"))
      .map((u) => u.replace(/(index)?\.html$/, "").replace(/\/?$/, "/")),
  ),
);
const built = new Set(pages.map((p) => p.url));

const failures = [];
const warnings = [];
const fail = (url, msg) => failures.push(`${url}: ${msg}`);
const warn = (url, msg) => warnings.push(`${url}: ${msg}`);

// ---------- per-page checks ----------
const inbound = new Map(pages.map((p) => [p.url, 0]));
const noindexPages = new Set();

for (const { url, html } of pages) {
  const robots = metaContent(html, "robots") || "";
  const noindex = /noindex/i.test(robots);
  if (noindex) noindexPages.add(url);
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
  const desc = metaContent(html, "description");
  const canonTag = (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || [])[0];
  const canon = canonTag ? attr(canonTag, "href") : "";
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
  const visible = strip(html);

  if (noindex && inSitemap.has(url)) fail(url, "page is noindex but listed in the sitemap (mixed signal, Search Console reports it as an error)");
  if (!noindex && sitemapFiles.length && !inSitemap.has(url) && url !== "/404/") warn(url, "indexable page missing from the sitemap");

  // Title, description, canonical, h1
  if (!title) fail(url, "missing <title>");
  else if ([...title].length > 60) warn(url, `title is ${[...title].length} characters (aim for 60 or less): "${title}"`);
  if (!noindex) {
    if (desc === null || !desc) fail(url, "missing meta description");
    else if (desc.length < 70 || desc.length > 160) warn(url, `meta description is ${desc.length} characters (aim for 70 to 160)`);
    if (!canon) fail(url, "missing canonical link");
    else if (!canon.replace(/^https?:\/\/[^/]+/, "").replace(/(index)?\.html$/, "").replace(/\/?$/, "/").endsWith(url === "/" ? "/" : url))
      warn(url, `canonical "${canon}" does not point at this page`);
  }
  if (h1s.length !== 1) fail(url, `${h1s.length} <h1> elements (need exactly 1)`);

  // Heading order
  let last = 0;
  for (const m of html.matchAll(/<h([1-6])\b/gi)) {
    const lvl = +m[1];
    if (last && lvl > last + 1) { warn(url, `heading jumps from h${last} to h${lvl}`); break; }
    last = lvl;
  }

  // Images: alt, size, format
  for (const m of html.matchAll(/<(img|source)\b[^>]*>/gi)) {
    const tag = m[0];
    const srcs = [attr(tag, "src"), ...(attr(tag, "srcset") || "").split(",").map((s) => s.trim().split(" ")[0])].filter(Boolean);
    for (const u of srcs) {
      if (!/\.(webp|avif|svg)(\?|$)/i.test(u) && !/[?&](fm|format|output)=(webp|avif)\b/i.test(u) && !u.startsWith("data:") && !RASTER_OK.test(u)) warn(url, `non-WebP image ${u}`);
    }
    if (m[1].toLowerCase() === "img") {
      if (attr(tag, "alt") === null) fail(url, `image without alt text: ${srcs[0] || tag.slice(0, 60)}`);
      // Width/height attributes are not needed when CSS fixes the box (for example "h-16 w-16" or "absolute inset-0 h-full w-full").
      const cls = attr(tag, "class") || "";
      const sizedByCss = /(^|\s)(h|size|aspect)-\S+/.test(cls) && /(^|\s)(w|size)-\S+/.test(cls);
      if (!sizedByCss && (!attr(tag, "width") || !attr(tag, "height"))) warn(url, `image without width/height (causes layout shift): ${srcs[0] || tag.slice(0, 60)}`);
    }
  }

  // Copy rules
  if (visible.includes("\u2014")) warn(url, "em dash in visible text");
  if (/\[NEEDS INPUT|lorem ipsum/i.test(visible)) fail(url, "leftover filler text on the page");

  // JSON-LD: parses, and FAQ schema matches what the page shows
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (!noindex && !blocks.length) warn(url, "no structured data (JSON-LD) on the page");
  const visNorm = norm(visible);
  for (const raw of blocks) {
    let data;
    try { data = JSON.parse(raw); } catch (e) { fail(url, `JSON-LD does not parse: ${e.message}`); continue; }
    const nodes = [].concat(data).flatMap((d) => d["@graph"] || [d]);
    for (const n of nodes) {
      const types = [].concat(n["@type"] || []);
      if (types.includes("FAQPage")) {
        for (const q of n.mainEntity || []) {
          if (q.name && !visNorm.includes(norm(q.name))) fail(url, `FAQ question in schema but not visible on the page: "${q.name.slice(0, 50)}"`);
        }
      }
      if (n.aggregateRating || n.review) warn(url, "schema includes ratings/reviews. Only keep this if real reviews are shown on the page");
    }
  }

  // Internal links
  const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)]
    .map((m) => decode(m[1]))
    .filter((h) => h.startsWith("/") && !h.startsWith("//"))
    .map((h) => h.split("#")[0].split("?")[0])
    .filter(Boolean);
  for (const l of new Set(links)) {
    if (l.startsWith("/api/")) continue;
    if (/\.[a-z0-9]{2,5}$/i.test(l) && !/\.html$/i.test(l)) {
      // A file (image, pdf, xml...): just check it exists.
      if (!fs.existsSync(path.join(DIST, decodeURIComponent(l)))) fail(url, `broken link to file ${l}`);
      continue;
    }
    const clean = l.replace(/(index)?\.html$/i, "");
    const target = clean.endsWith("/") ? clean : clean + "/";
    if (!built.has(target)) fail(url, `broken internal link to ${l}`);
    else if (target !== url) inbound.set(target, inbound.get(target) + 1);
  }
}

// Orphans: indexable pages nothing links to
for (const [url, n] of inbound) {
  if (url === "/" || url === "/404/" || noindexPages.has(url) || n > 0) continue;
  warn(url, "no other page links here (orphan page)");
}

// ---------- site-level checks ----------
for (const f of ["robots.txt", "llms.txt", "404.html", "_headers"]) {
  if (!fs.existsSync(path.join(DIST, f))) (f === "_headers" ? warn : fail)("site", `missing ${f}`);
}
if (!files.some((f) => /sitemap.*\.xml$/.test(f))) fail("site", "missing sitemap");
for (const f of files) {
  if (/\.(png|jpe?g|gif)$/i.test(f) && !RASTER_OK.test(f)) warn("site", `JPG/PNG shipped: ${path.relative(DIST, f)} (run npm run images)`);
}

// ---------- report ----------
for (const f of failures) console.log(`FAIL ${f}`);
for (const w of warnings) console.log(`WARN ${w}`);
console.log(
  `\n${pages.length} pages checked: ${failures.length} failure(s), ${warnings.length} warning(s)`,
);
if (!failures.length && !warnings.length) console.log("All SEO checks pass.");
process.exit(failures.length || (STRICT && warnings.length) ? 1 : 0);
