/**
 * Writes prisma/data/fc-batch4-translations/*.json from embedded translation data.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translationsBySlug } from "./batch4-translations-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../data/fc-batch4-translations");

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, data] of Object.entries(translationsBySlug)) {
  const outPath = path.join(OUT_DIR, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("wrote", outPath);
}

console.log(`Wrote ${Object.keys(translationsBySlug).length} translation JSON files.`);
