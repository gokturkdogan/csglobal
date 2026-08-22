/**
 * Generates prisma/data/fc-translations/contents/{slug}.ts from
 * prisma/data/fc-translations/_batch3-translations/{slug}.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANSLATIONS_DIR = path.join(
  __dirname,
  "../data/fc-translations/_batch3-translations",
);
const OUTPUT_DIR = path.join(__dirname, "../data/fc-translations/contents");

const FILE_HEADER = `import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";
`;

function escapeTemplate(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function renderSections(varName, sections) {
  const items = sections
    .map(
      (s) => `  {
    title: ${JSON.stringify(s.title)},
    content: \`${escapeTemplate(s.content)}\`,
  }`,
    )
    .join(",\n");
  return `const ${varName}: ServiceContentSection[] = [\n${items},\n];`;
}

function renderLocaleFields(locale, fields) {
  const lines = [];
  for (const [key, value] of Object.entries(fields)) {
    if (key === "sections") continue;
    if (value == null || value === "") continue;
    lines.push(`    ${key}: ${JSON.stringify(value)},`);
  }
  if (fields.sections?.length) {
    const varName = `${locale}Sections`;
    lines.push(`    sectionsJson: serializeServiceSections(${varName}),`);
  }
  return lines.join("\n");
}

function generateFile(data) {
  const { slug, translations } = data;
  const locales = ["en", "ar", "ru", "fa"];

  let body = `${FILE_HEADER}\n`;

  for (const locale of locales) {
    const t = translations[locale];
    if (!t?.sections?.length) {
      throw new Error(`Missing sections for ${slug}/${locale}`);
    }
    body += `${renderSections(`${locale}Sections`, t.sections)}\n\n`;
  }

  body += `export const contentSlug = ${JSON.stringify(slug)};\n\n`;
  body += `export const contentTranslations: ForeignConsultancyTranslations = {\n`;

  for (const locale of locales) {
    const t = translations[locale];
    body += `  ${locale}: {\n${renderLocaleFields(locale, t)}\n  },\n`;
  }

  body += `};\n`;
  return body;
}

function main() {
  const slugs = process.argv.slice(2);
  const files =
    slugs.length > 0
      ? slugs.map((s) => `${s}.json`)
      : fs.readdirSync(TRANSLATIONS_DIR).filter((f) => f.endsWith(".json"));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const file of files.sort()) {
    const data = JSON.parse(
      fs.readFileSync(path.join(TRANSLATIONS_DIR, file), "utf8"),
    );
    const out = generateFile(data);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${data.slug}.ts`), out);
    console.log(`generated: ${data.slug}.ts`);
  }
}

main();
