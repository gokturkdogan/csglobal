/**
 * Writes prisma/data/fc-translations/_batch1-translations/{slug}.json
 * from prisma/scripts/batch1-translations-data.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translationsBySlug } from "./batch1-translations-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../data/fc-translations/_batch1-translations");

function buildLocale(localeData) {
  const out = {};
  for (const key of ["name", "excerpt", "heroTitle", "heroSubtitle", "shortDescription"]) {
    const v = localeData[key];
    if (v != null && v !== "") out[key] = v;
  }
  if (localeData.sections?.length) out.sections = localeData.sections;
  return out;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const slugs = Object.keys(translationsBySlug).sort();
  for (const slug of slugs) {
    const entry = translationsBySlug[slug];
    const data = {
      slug,
      translations: {
        en: buildLocale(entry.en),
        ar: buildLocale(entry.ar),
        ru: buildLocale(entry.ru),
        fa: buildLocale(entry.fa),
      },
    };
    fs.writeFileSync(
      path.join(OUT_DIR, `${slug}.json`),
      JSON.stringify(data, null, 2) + "\n",
    );
    console.log(`wrote ${slug}.json`);
  }
  console.log(`Generated ${slugs.length} translation JSON files.`);
}

main();
