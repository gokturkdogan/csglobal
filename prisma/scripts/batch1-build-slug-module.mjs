/**
 * Builds batch1-data/{slug}.mjs from batch1-full/{slug}.json
 * JSON shape: { meta: { en, ar, ru, fa }, sections: { en: [...], ar: [...], ru: [...], fa: [...] } }
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node batch1-build-slug-module.mjs <slug>");
  process.exit(1);
}

const jsonPath = path.join(__dirname, "batch1-full", `${slug}.json`);
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const imports = data.imports ?? `import { annulmentResidence, faqLawyer, faqTitles } from "../batch1-shared.mjs";`;

const locales = ["en", "ar", "ru", "fa"];
const body = locales
  .map((loc) => {
    const meta = data.meta[loc];
    const metaLines = Object.entries(meta)
      .map(([k, v]) => `    ${k}: ${JSON.stringify(v)},`)
      .join("\n");
    const sections = data.sections[loc]
      .map((s) => `      { title: ${JSON.stringify(s.title)}, content: ${JSON.stringify(s.content)} },`)
      .join("\n");
    return `  ${loc}: {\n    ...meta.${loc},\n    sections: [\n${sections}\n    ],\n  }`;
  })
  .join(",\n");

const out = `${imports}

const meta = {
${locales.map((loc) => `  ${loc}: ${JSON.stringify(data.meta[loc], null, 4).replace(/^/gm, "  ").trim()},`).join("\n")}
};

export default {
${body}
};
`;

const outPath = path.join(__dirname, "batch1-data", `${slug}.mjs`);
fs.writeFileSync(outPath, out);
console.log("wrote", outPath);
