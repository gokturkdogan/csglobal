/**
 * Professional translations for FC batch 1 content pages.
 * Each slug lives in ./batch1-data/{slug}.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "batch1-data");

const modules = fs
  .readdirSync(dataDir)
  .filter((f) => f.endsWith(".mjs"))
  .sort();

export const translationsBySlug = {};

for (const file of modules) {
  const slug = file.replace(/\.mjs$/, "");
  const mod = await import(`./batch1-data/${file}`);
  translationsBySlug[slug] = mod.default;
}
