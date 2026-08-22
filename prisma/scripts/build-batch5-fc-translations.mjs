/**
 * Builds batch 5 FC content translation .ts files.
 * Run: node prisma/scripts/build-batch5-fc-translations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../data/fc-translations/contents");
const DATA_DIR = path.join(__dirname, "batch5-fc-translation-data");

const LOCALES = ["en", "ar", "ru", "fa"];

function sectionBlock(locale, sections) {
  const items = sections
    .map(
      (s) => `  {
    title: ${JSON.stringify(s.title)},
    content: ${JSON.stringify(s.content)},
  }`,
    )
    .join(",\n");
  return `const ${locale}Sections: ServiceContentSection[] = [\n${items}\n];`;
}

function localeFields(data) {
  const fields = [
    `name: ${JSON.stringify(data.name)}`,
    `excerpt: ${JSON.stringify(data.excerpt)}`,
  ];
  if (data.shortDescription != null) {
    fields.push(`shortDescription: ${JSON.stringify(data.shortDescription)}`);
  }
  fields.push(`heroTitle: ${JSON.stringify(data.heroTitle)}`);
  if (data.heroSubtitle != null) {
    fields.push(`heroSubtitle: ${JSON.stringify(data.heroSubtitle)}`);
  }
  return fields;
}

function generateFile(slug, data) {
  const header = `import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

`;

  const sectionBlocks = LOCALES.map((locale) =>
    sectionBlock(locale, data[locale].sections),
  ).join("\n\n");

  const translations = LOCALES.map((locale) => {
    const fields = [
      ...localeFields(data[locale]),
      `sectionsJson: serializeServiceSections(${locale}Sections)`,
    ];
    return `  ${locale}: {\n    ${fields.join(",\n    ")},\n  }`;
  }).join(",\n");

  return `${header}${sectionBlocks}

export const contentSlug = ${JSON.stringify(slug)};

export const contentTranslations: ForeignConsultancyTranslations = {
${translations},
};
`;
}

const slugs = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.endsWith(".mjs") && !f.startsWith("_"))
  .map((f) => f.replace(/\.mjs$/, ""));

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const slug of slugs.sort()) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, `${slug}.mjs`)).href);
  const outPath = path.join(OUT_DIR, `${slug}.ts`);
  fs.writeFileSync(outPath, generateFile(slug, mod.default), "utf8");
  console.log(`${slug}.ts`, fs.statSync(outPath).size, "bytes");
}

console.log(`Built ${slugs.length} files.`);
