import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translationsBySlug } from "./batch1-translations-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../data/fc-translations/_batch1-source");

const slugs = fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));

console.log("slug\tlocale\tratio");
for (const slug of slugs.sort()) {
  const src = JSON.parse(fs.readFileSync(path.join(srcDir, `${slug}.json`)));
  const entry = translationsBySlug[slug];
  const srcSecs = JSON.parse(src.sectionsJson);
  const srcLen = srcSecs.reduce((a, s) => a + s.content.length, 0);
  for (const loc of ["en", "ar", "ru", "fa"]) {
    const trSecs = entry[loc].sections;
    const trLen = trSecs.reduce((a, s) => a + s.content.length, 0);
    const ratio = ((trLen / srcLen) * 100).toFixed(0);
    const flag = ratio < 85 ? "FIX" : "OK ";
    console.log(`${flag}\t${slug}\t${loc}\t${ratio}%`);
  }
}
