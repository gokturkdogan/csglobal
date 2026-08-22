/**
 * Generates prisma/data/fc-translations/contents/*.ts from batch4 translation data.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "../data/fc-batch4-translations");
const OUT_DIR = path.join(__dirname, "../data/fc-translations/contents");
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

function localeBlock(locale, data) {
  const fields = [
    `name: ${JSON.stringify(data.name)}`,
    `excerpt: ${JSON.stringify(data.excerpt)}`,
    `shortDescription: ${JSON.stringify(data.shortDescription)}`,
    `heroTitle: ${JSON.stringify(data.heroTitle)}`,
    `heroSubtitle: ${JSON.stringify(data.heroSubtitle)}`,
    `sectionsJson: serializeServiceSections(${locale}Sections)`,
  ];
  return `  ${locale}: {\n    ${fields.join(",\n    ")},\n  }`;
}

function generateFile(slug, data) {
  const header = `import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

`;

  const sectionBlocks = LOCALES.map((locale) =>
    sectionBlock(locale, data[locale].sections),
  ).join("\n\n");

  const translations = LOCALES.map((locale) => localeBlock(locale, data[locale])).join(
    ",\n",
  );

  return `${header}${sectionBlocks}

export const contentSlug = ${JSON.stringify(slug)};

export const contentTranslations: ForeignConsultancyTranslations = {
${translations},
};
`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs
  .readdirSync(DATA_DIR)
  .filter((file) => file.endsWith(".json"))
  .sort();

for (const file of files) {
  const slug = file.replace(/\.json$/, "");
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
  const outPath = path.join(OUT_DIR, `${slug}.ts`);
  fs.writeFileSync(outPath, generateFile(slug, data), "utf8");
  console.log("wrote", outPath);
}

console.log(`Generated ${files.length} files.`);
