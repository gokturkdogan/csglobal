/** Patch kisa-donem ar/ru sections to use full i18n blocks. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  kisaDonemConditions,
  kisaDonemDuration,
  kisaDonemExtension,
  kisaDonemRefusal,
  kisaDonemWhereApply,
  kisaDonemWhoApplies,
} from "./batch1-kisa-donem-i18n.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "batch1-data/kisa-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs");
let src = fs.readFileSync(file, "utf8");

function patchLocale(locale, titles, blocks) {
  const re = new RegExp(
    `${locale}:\\s*\\{\\s*\\.\\.\\.meta\\.${locale},\\s*sections:\\s*\\[[\\s\\S]*?\\n\\s*\\],\\s*\\}`,
    "m",
  );
  const m = src.match(re);
  if (!m) throw new Error(`Could not find ${locale} block`);
  const introMatch = m[0].match(/sections:\s*\[\s*\{[\s\S]*?\},\s*\{/);
  if (!introMatch) throw new Error(`Could not find intro for ${locale}`);
  const introSection = m[0].match(/sections:\s*\[\s*(\{[\s\S]*?\}),/)[1];
  const tail = `
      annulmentResidence("${locale}", permitLabel.${locale}),
      { title: faqTitles.${locale}, content: faqLawyer.${locale} + faqExtra("${locale}") },
    ],
  }`;
  const sections = titles
    .map(
      (title, i) => `      {
        title: ${JSON.stringify(title)},
        content: ${blocks[i]},
      }`,
    )
    .join(",\n");
  const replacement = `${locale}: {
    ...meta.${locale},
    sections: [
      ${introSection},
${sections},
${tail}`;
  src = src.replace(re, replacement);
}

patchLocale(
  "ar",
  [
    "من يمكنه التقدم لتصريح إقامة قصير الأمد؟",
    "شروط تصريح الإقامة قصير الأمد",
    "مدة تصريح الإقامة قصير الأمد",
    "أين يُقدَّم طلب تصريح الإقامة قصير الأمد؟",
    "تمديد تصريح الإقامة قصير الأمد",
    "رفض أو إلغاء أو عدم تمديد تصريح الإقامة قصير الأمد",
  ],
  [
    "kisaDonemWhoApplies.ar",
    "kisaDonemConditions.ar",
    "kisaDonemDuration.ar",
    "kisaDonemWhereApply.ar",
    "kisaDonemExtension.ar",
    "kisaDonemRefusal.ar",
  ],
);

patchLocale(
  "ru",
  [
    "Кто может подать заявление о краткосрочном виде на жительство?",
    "Условия краткосрочного вида на жительство",
    "Срок краткосрочного вида на жительство",
    "Куда подается заявление о краткосрочном виде на жительство?",
    "Продление краткосрочного вида на жительство",
    "Отказ, аннулирование или непродление краткосрочного вида на жительство",
  ],
  [
    "kisaDonemWhoApplies.ru",
    "kisaDonemConditions.ru",
    "kisaDonemDuration.ru",
    "kisaDonemWhereApply.ru",
    "kisaDonemExtension.ru",
    "kisaDonemRefusal.ru",
  ],
);

fs.writeFileSync(file, src);
console.log("patched kisa-donem ar/ru sections");
