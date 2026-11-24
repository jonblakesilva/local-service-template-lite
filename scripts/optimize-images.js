#!/usr/bin/env node
/**
 * optimize-images.js
 * Converts every JPG, JPEG and PNG in a folder to WebP (max 1200px wide, quality 82).
 * Usage: npm run images -- path/to/photos [output-folder]
 * The output folder defaults to public/images. Originals are left untouched.
 * File names are lowercased and cleaned up (spaces become dashes); rename them to describe
 * the subject, service and city, for example "acme-roof-replacement-toledo.webp".
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const [, , inputArg, outputArg] = process.argv;
if (!inputArg) {
  console.error("Usage: npm run images -- <folder-of-photos> [output-folder]");
  process.exit(1);
}
const inputDir = path.resolve(inputArg);
const outputDir = path.resolve(outputArg ?? "public/images");
if (!fs.existsSync(inputDir)) {
  console.error(`Folder not found: ${inputDir}`);
  process.exit(1);
}
fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (files.length === 0) {
  console.log("No JPG or PNG files found.");
  process.exit(0);
}

for (const file of files) {
  const name = path
    .parse(file)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const out = path.join(outputDir, `${name}.webp`);
  await sharp(path.join(inputDir, file))
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  console.log(`${file} -> ${path.relative(process.cwd(), out)}`);
}
console.log(`Done: ${files.length} image(s). Add alt text that names the service and city wherever you use them.`);
