import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  uzunDonemConditions,
  uzunDonemDocs,
  uzunDonemEightYears,
  uzunDonemRights,
  uzunDonemWho,
  uzunDonemWorkPermit,
} from "./batch1-uzun-donem-i18n.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "batch1-data/uzun-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs");
let src = fs.readFileSync(file, "utf8");

const blocks = [
  "uzunDonemConditions",
  "uzunDonemEightYears",
  "uzunDonemWho",
  "uzunDonemRights",
  "uzunDonemDocs",
  "uzunDonemWorkPermit",
];

for (const locale of ["ar", "ru", "fa"]) {
  for (let i = 0; i < blocks.length; i++) {
    const idx = i + 2; // sections 2-7
    const re = new RegExp(
      `(${locale}:\\s*\\{[\\s\\S]*?sections:\\s*\\[[\\s\\S]*?\\{[\\s\\S]*?\\},\\s*\\{[\\s\\S]*?\\},\\s*)\\{[\\s\\S]*?title:[\\s\\S]*?\\},`,
      "",
    );
    // simpler: replace section content by title index
  }
}

// Direct title-based replacements for ar
const arTitles = [
  "ما شروط تصريح الإقامة طويل الأمد؟",
  "كيف تُحسب مدة الثماني سنوات؟",
  "لمن يُمنح تصريح الإقامة طويل الأمد؟",
  "ما الحقوق التي يوفرها التصريح؟",
  "المستندات المطلوبة للتقديم",
  "تصريح الإقامة طويل الأمد وتصريح العمل غير المحدد",
];
const ruTitles = [
  "Условия долгосрочного ВНЖ",
  "Расчет 8 лет",
  "Кому выдается?",
  "Права",
  "Документы",
  "Долгосрочный ВНЖ и бессрочный work permit",
];
const faTitles = [
  "شرایط مجوز اقامت بلندمدت",
  "محاسبه 8 سال",
  "به چه کسانی داده می‌شود؟",
  "حقوق مجوز",
  "مدارک درخواست",
  "مجوز بلندمدت و مجوز کار نامحدود",
];

function patch(locale, titles) {
  for (let i = 0; i < titles.length; i++) {
    const block = `${blocks[i]}.${locale}`;
    const re = new RegExp(
      `(title:\\s*${JSON.stringify(titles[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))},\\s*content:\\s*)\`[\\s\\S]*?\``,
    );
    src = src.replace(re, `$1\`${eval(block)}\``);
  }
}

// eval won't work - use map
import * as i18n from "./batch1-uzun-donem-i18n.mjs";
const map = {
  ar: [i18n.uzunDonemConditions.ar, i18n.uzunDonemEightYears.ar, i18n.uzunDonemWho.ar, i18n.uzunDonemRights.ar, i18n.uzunDonemDocs.ar, i18n.uzunDonemWorkPermit.ar],
  ru: [i18n.uzunDonemConditions.ru, i18n.uzunDonemEightYears.ru, i18n.uzunDonemWho.ru, i18n.uzunDonemRights.ru, i18n.uzunDonemDocs.ru, i18n.uzunDonemWorkPermit.ru],
  fa: [i18n.uzunDonemConditions.fa, i18n.uzunDonemEightYears.fa, i18n.uzunDonemWho.fa, i18n.uzunDonemRights.fa, i18n.uzunDonemDocs.fa, i18n.uzunDonemWorkPermit.fa],
};

for (const locale of ["ar", "ru", "fa"]) {
  const titles = locale === "ar" ? arTitles : locale === "ru" ? ruTitles : faTitles;
  for (let i = 0; i < titles.length; i++) {
    const escaped = titles[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      `(title:\\s*"${escaped}",\\s*content:\\s*)\`[\\s\\S]*?\`(,|\\s*\\})`,
    );
    src = src.replace(re, `$1\`${map[locale][i].replace(/`/g, "\\`")}\`$2`);
  }
}

fs.writeFileSync(file, src);
console.log("patched uzun-donem ar/ru/fa sections 2-7");
