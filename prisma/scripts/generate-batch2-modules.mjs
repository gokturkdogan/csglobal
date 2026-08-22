/**
 * Generates batch2-fc-translation-data/*.mjs from Turkish source JSON.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import translate from "translate-google";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "../data/fc-translations/_batch2-source");
const OUT_DIR = path.join(__dirname, "batch2-fc-translation-data");

const force = process.argv.includes("--force");
const slugArgs = process.argv.slice(2).filter((a) => a !== "--force");

const SLUGS = slugArgs.length
  ? slugArgs
  : [
      "sinir-disi-deport-kararina-itiraz",
      "turk-vatandasliginin-kazanilmasi",
      "uzun-sureli-ikamet-izni-ile-turk-vatandasliginin-kazanilmasi",
      "vatandaslik-basvurusunun-reddi-kararinin-iptali-davasi",
      "insani-ikamet-izni-talepleri-ve-red-kararlarina-karsi-iptal-davasi",
      "ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi",
    ];

const LOCALES = [
  { code: "en", to: "en" },
  { code: "ar", to: "ar" },
  { code: "ru", to: "ru" },
  { code: "fa", to: "fa" },
];

function protectHtml(html) {
  const tokens = [];
  const protectedText = html.replace(/<[^>]+>/g, (tag) => {
    const key = `__HTML${tokens.length}__`;
    tokens.push(tag);
    return key;
  });
  return { protectedText, tokens };
}

function restoreHtml(text, tokens) {
  let out = text;
  for (let i = 0; i < tokens.length; i++) {
    out = out.split(`__HTML${i}__`).join(tokens[i]);
  }
  return out;
}

function postProcess(text, localeCode) {
  if (!text) return text;
  let out = text.replace(/\u2014/g, "-").replace(/—/g, "-");
  if (localeCode === "en") out = out.replace(/\bTurkey\b/g, "Türkiye");
  return out;
}

async function translateChunk(text, locale) {
  const { protectedText, tokens } = protectHtml(text);
  const translated = await translate(protectedText, { from: "tr", to: locale.to });
  return postProcess(restoreHtml(translated, tokens), locale.code);
}

async function translateText(text, locale, retries = 3) {
  if (!text?.trim()) return text;
  const chunks = [];
  if (text.length > 2800) {
    const parts = text.split(/(?=<\/p>)/);
    let buf = "";
    for (const part of parts) {
      if ((buf + part).length > 2800 && buf) {
        chunks.push(buf);
        buf = part;
      } else {
        buf += part;
      }
    }
    if (buf) chunks.push(buf);
  } else {
    chunks.push(text);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const out = [];
      for (const chunk of chunks) {
        out.push(await translateChunk(chunk, locale));
        await new Promise((r) => setTimeout(r, 250));
      }
      return out.join("");
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`  retry ${attempt}/${retries} (${locale.code}):`, err.message?.slice(0, 80));
      await new Promise((r) => setTimeout(r, 3000 * attempt));
    }
  }
}

function isFaqTitle(title) {
  return /sıkça|sorulan|faq|questions|متداول|вопрос|پرسش/i.test(title);
}

function faqRest(content) {
  const first = content.search(/<p><strong>/);
  if (first === -1) return "";
  const afterFirst = content.slice(first + 1);
  const second = afterFirst.search(/<p><strong>/);
  if (second === -1) return "";
  return afterFirst.slice(second);
}

async function translateLocale(item, locale) {
  const out = {
    name: await translateText(item.name, locale),
    excerpt: await translateText(item.excerpt, locale),
    heroTitle: await translateText(item.heroTitle, locale),
    sections: [],
  };
  if (item.shortDescription) out.shortDescription = await translateText(item.shortDescription, locale);
  if (item.heroSubtitle) out.heroSubtitle = await translateText(item.heroSubtitle, locale);

  for (const section of item.sections) {
    const title = await translateText(section.title, locale);
    const content = await translateText(section.content, locale);
    const entry = { title, content };
    if (isFaqTitle(section.title)) entry.faqRest = faqRest(content);
    out.sections.push(entry);
    console.log(`  [${locale.code}] ${section.title.slice(0, 50)}`);
  }
  return out;
}

function writeModule(slug, data) {
  const parts = [`import { lawyerFaq } from './_shared.mjs';`, "", "export default {"];
  for (const loc of LOCALES.map((l) => l.code)) {
    const d = data[loc];
    parts.push(`  ${loc}: {`);
    parts.push(`    name: ${JSON.stringify(d.name)},`);
    parts.push(`    excerpt: ${JSON.stringify(d.excerpt)},`);
    if (d.shortDescription != null) parts.push(`    shortDescription: ${JSON.stringify(d.shortDescription)},`);
    parts.push(`    heroTitle: ${JSON.stringify(d.heroTitle)},`);
    if (d.heroSubtitle != null) parts.push(`    heroSubtitle: ${JSON.stringify(d.heroSubtitle)},`);
    parts.push("    sections: [");
    for (const s of d.sections) {
      if (s.faqRest != null) {
        parts.push(`      {`);
        parts.push(`        title: ${JSON.stringify(s.title)},`);
        parts.push(`        content: lawyerFaq.${loc} + ${JSON.stringify(s.faqRest)},`);
        parts.push(`      },`);
      } else {
        parts.push(`      { title: ${JSON.stringify(s.title)}, content: ${JSON.stringify(s.content)} },`);
      }
    }
    parts.push("    ],");
    parts.push("  },");
  }
  parts.push("};", "");
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.mjs`), parts.join("\n"));
}

for (const slug of SLUGS) {
  const outPath = path.join(OUT_DIR, `${slug}.mjs`);
  if (fs.existsSync(outPath) && !force) {
    console.log("skip existing", slug);
    continue;
  }
  console.log("\n===", slug, "===");
  const item = JSON.parse(fs.readFileSync(path.join(SRC_DIR, `${slug}.json`), "utf8"));
  const data = {};
  for (const locale of LOCALES) {
    console.log("locale", locale.code);
    data[locale.code] = await translateLocale(item, locale);
  }
  writeModule(slug, data);
  console.log("wrote", outPath);
}

console.log("\nDone.");
