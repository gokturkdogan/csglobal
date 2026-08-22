/**
 * Builds prisma/data/fc-batch4-translations/*.json from slug translation modules.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLUG_DIR = path.join(__dirname, "batch4-translation-slugs");
const OUT_DIR = path.join(__dirname, "../data/fc-batch4-translations");

const slugs = fs
  .readdirSync(SLUG_DIR)
  .filter((f) => f.endsWith(".mjs") && !f.startsWith("_"))
  .map((f) => f.replace(/\.mjs$/, ""))
  .sort();

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const slug of slugs) {
  const mod = await import(`./batch4-translation-slugs/${slug}.mjs`);
  const outPath = path.join(OUT_DIR, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(mod.default, null, 2) + "\n", "utf8");
  console.log("wrote", outPath);
}

console.log(`Built ${slugs.length} translation JSON files.`);
