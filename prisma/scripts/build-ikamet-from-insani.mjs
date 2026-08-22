/**
 * Builds ikamet-izni-basvurusunun-reddi mjs from translated insani mjs + ikamet titles/meta.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import translate from "translate-google";
import { lawyerFaq } from "./batch2-fc-translation-data/_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../data/fc-translations/_batch2-source/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi.json");
const OUT = path.join(__dirname, "batch2-fc-translation-data/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi.mjs");

const LOCALES = [
  { code: "en", to: "en" },
  { code: "ar", to: "ar" },
  { code: "ru", to: "ru" },
  { code: "fa", to: "fa" },
];

function postProcess(text, localeCode) {
  if (!text) return text;
  let out = text.replace(/\u2014/g, "-").replace(/—/g, "-");
  if (localeCode === "en") out = out.replace(/\bTurkey\b/g, "Türkiye");
  return out;
}

async function tr(text, to, code) {
  const t = await translate(text, { from: "tr", to });
  await new Promise((r) => setTimeout(r, 300));
  return postProcess(t, code);
}

function numberedTitle(insaniTitle, ikTitle) {
  const m = ikTitle.match(/^(\d+)\.\s*/);
  return m ? `${m[1]}. ${insaniTitle}` : insaniTitle;
}

const insaniMod = await import(
  pathToFileURL(
    path.join(__dirname, "batch2-fc-translation-data/insani-ikamet-izni-talepleri-ve-red-kararlarina-karsi-iptal-davasi.mjs"),
  ).href,
);
const insani = insaniMod.default;
const ikSrc = JSON.parse(fs.readFileSync(SRC, "utf8"));

const data = {};
for (const locale of LOCALES) {
  const ins = insani[locale.code];
  console.log("meta", locale.code);
  data[locale.code] = {
    name: await tr(ikSrc.name, locale.to, locale.code),
    excerpt: await tr(ikSrc.excerpt, locale.to, locale.code),
    shortDescription: await tr(ikSrc.shortDescription, locale.to, locale.code),
    heroTitle: await tr(ikSrc.heroTitle, locale.to, locale.code),
    heroSubtitle: await tr(ikSrc.heroSubtitle, locale.to, locale.code),
    sections: ins.sections.map((s, i) => ({
      title: numberedTitle(s.title, ikSrc.sections[i].title),
      content: s.content,
    })),
  };
}

const parts = [`import { lawyerFaq } from './_shared.mjs';`, "", "export default {"];
for (const loc of LOCALES.map((l) => l.code)) {
  const d = data[loc];
  parts.push(`  ${loc}: {`);
  parts.push(`    name: ${JSON.stringify(d.name)},`);
  parts.push(`    excerpt: ${JSON.stringify(d.excerpt)},`);
  parts.push(`    shortDescription: ${JSON.stringify(d.shortDescription)},`);
  parts.push(`    heroTitle: ${JSON.stringify(d.heroTitle)},`);
  parts.push(`    heroSubtitle: ${JSON.stringify(d.heroSubtitle)},`);
  parts.push("    sections: [");
  for (const s of d.sections) {
    if (/faq|sorulan|questions|متداول|вопрос|پرسش/i.test(s.title)) {
      const idx = s.content.indexOf("<p><strong>");
      const after = idx === -1 ? s.content : s.content.slice(idx + 1);
      const second = after.search(/<p><strong>/);
      const rest = second === -1 ? "" : after.slice(second);
      parts.push(`      { title: ${JSON.stringify(s.title)}, content: lawyerFaq.${loc} + ${JSON.stringify(rest)} },`);
    } else {
      parts.push(`      { title: ${JSON.stringify(s.title)}, content: ${JSON.stringify(s.content)} },`);
    }
  }
  parts.push("    ],");
  parts.push("  },");
}
parts.push("};", "");

fs.writeFileSync(OUT, parts.join("\n"));
console.log("wrote", OUT, fs.statSync(OUT).size);
