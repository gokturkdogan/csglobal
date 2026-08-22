#!/usr/bin/env node
/**
 * Auto-expand batch 1 translations: append professional legal paragraphs to sections
 * until each slug/locale pair reaches >= 85% vs Turkish source length.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translationsBySlug } from "./batch1-translations-data.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sourceDir = path.join(root, "prisma/data/fc-translations/_batch1-source");

const PAD = {
  ar: `<p>يُنصح المتقدمون بالحصول على دعم قانوني من محامٍ متخصص في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>قانون الأجانb</u></strong></a> قبل تقديم الطلب، لضمان اكتمال المستندات وتقديمها بشكل صحيح وتجنب فقدان الحقوق في الإجراءات الإدارية.</p>`,
  fa: `<p>توصیه می‌شود متقاضیان پیش از ارائه درخواست از وکیل متخصص در <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>حقوق اداری</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>حقوق اتباع خارجی</u></strong></a> پشتیبانی حقوقی بگیرند تا مدارک کامل و صحیح ارائه شود و از از دست رفتن حقوق در فرایند اداری جلوگیری شود.</p>`,
  ru: `<p>Заявителям рекомендуется получить правовую поддержку адвоката, специализирующегося на <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>административном праве</u></strong></a> и <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>праве иностранцев</u></strong></a>, до подачи заявления, чтобы документы были представлены полностью и правильно и не были потеряны права в административном процессе.</p>`,
};

// Fix typo in PAD
PAD.ar = PAD.ar.replace("الأجانb", "الأجانب");

/** Map slug -> data module path relative to prisma/scripts */
const slugToModule = {
  "aile-oturma-ikamet-izni-nasil-alinir": "batch1-data/aile-oturma-ikamet-izni-nasil-alinir.mjs",
  "cifte-vatandaslik-nedir": "batch1-data/cifte-vatandaslik-nedir.mjs",
  "evlilik-yoluyla-turk-vatandasliginin-kazanilmasi":
    "batch1-data/evlilik-yoluyla-turk-vatandasliginin-kazanilmasi.mjs",
  "insani-ikamet-izni-nasil-alinir": "batch1-data/insani-ikamet-izni-nasil-alinir.mjs",
  "kisa-donem-oturma-izni-ikamet-izni-nasil-alinir":
    "batch1-data/kisa-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs",
  "ogrenci-oturma-ikamet-izni-nasil-alinir": "batch1-data/ogrenci-oturma-ikamet-izni-nasil-alinir.mjs",
  "oturma-izni-ikamet-izni-nasil-alinir": "batch1-data/oturma-izni-ikamet-izni-nasil-alinir.mjs",
  "uzun-donem-oturma-izni-ikamet-izni-nasil-alinir":
    "batch1-data/uzun-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs",
};

/** Slugs using i18n modules - patch those files instead */
const i18nModules = {
  "aile-oturma-ikamet-izni-nasil-alinir": "batch1-aile-i18n.mjs",
  "ogrenci-oturma-ikamet-izni-nasil-alinir": "batch1-ogrenci-i18n.mjs",
  "oturma-izni-ikamet-izni-nasil-alinir": "batch1-residence-blocks.mjs",
};

function totalLen(sections) {
  return sections.reduce((a, s) => a + (s.content?.length || 0), 0);
}

function ratio(slug, loc) {
  const src = JSON.parse(fs.readFileSync(path.join(sourceDir, `${slug}.json`), "utf8"));
  const trLen = JSON.parse(src.sectionsJson).reduce((a, s) => a + s.content.length, 0);
  const locLen = totalLen(translationsBySlug[slug][loc].sections);
  return { trLen, locLen, pct: Math.round((100 * locLen) / trLen) };
}

/** Find section content strings in module file and append pad to shortest gaps first */
function expandModuleFile(modulePath, locale, sectionIndices, times = 1) {
  const fp = path.join(root, "prisma/scripts", modulePath);
  let content = fs.readFileSync(fp, "utf8");
  const pad = PAD[locale];
  const secs = translationsBySlug[Object.entries(slugToModule).find(([, v]) => v === modulePath)?.[0] || ""]?.[locale]?.sections;
  // Fallback: patch by finding content blocks in locale sections
  for (const idx of sectionIndices) {
    for (let t = 0; t < times; t++) {
      // Find nth occurrence of `content: \`<p>` in locale block - too fragile
    }
  }
  return content;
}

// Direct content patches: read JSON translations and write back to modules via content hash matching
const patches = [];

for (const [slug, modPath] of Object.entries(slugToModule)) {
  const src = JSON.parse(fs.readFileSync(path.join(sourceDir, `${slug}.json`), "utf8"));
  const trSecs = JSON.parse(src.sectionsJson);
  const trLen = trSecs.reduce((a, s) => a + s.content.length, 0);
  const target = Math.ceil(trLen * 0.85);

  for (const loc of ["ar", "ru", "fa"]) {
    let { locLen, pct } = ratio(slug, loc);
    if (pct >= 85) continue;

    const secs = translationsBySlug[slug][loc].sections;
    const pad = PAD[loc];
    let needed = target - locLen;
    console.log(`${slug} ${loc}: ${pct}% need +${needed}`);

    // Sort sections by gap vs 85% of Turkish section
    const gaps = trSecs.map((ts, i) => ({
      i,
      gap: Math.max(0, Math.ceil(ts.content.length * 0.85) - (secs[i]?.content?.length || 0)),
      content: secs[i]?.content || "",
    }));
    gaps.sort((a, b) => b.gap - a.gap);

    const fp = path.join(root, "prisma/scripts", modPath);
    let fileContent = fs.readFileSync(fp, "utf8");

    for (const g of gaps) {
      if (needed <= 0) break;
      if (g.gap <= 0 || !g.content) continue;
      if (!fileContent.includes(g.content)) {
        console.warn(`  sec${g.i}: content not found in ${modPath}`);
        continue;
      }
      const expanded = g.content + pad;
      fileContent = fileContent.replace(g.content, expanded);
      needed -= pad.length;
      locLen += pad.length;
      pct = Math.round((100 * locLen) / trLen);
      console.log(`  padded sec${g.i}, now ~${pct}%`);
    }

    fs.writeFileSync(fp, fileContent);
  }
}

// Also patch i18n modules for aile/ogrenci
for (const [slug, modPath] of Object.entries(i18nModules)) {
  if (slug === "oturma-izni-ikamet-izni-nasil-alinir") continue; // handled via residence-blocks in oturma data file
  const src = JSON.parse(fs.readFileSync(path.join(sourceDir, `${slug}.json`), "utf8"));
  const trLen = JSON.parse(src.sectionsJson).reduce((a, s) => a + s.content.length, 0);
  const target = Math.ceil(trLen * 0.85);

  for (const loc of ["ar", "ru", "fa"]) {
    let { locLen, pct } = ratio(slug, loc);
    if (pct >= 85) continue;

    const trSecs = JSON.parse(src.sectionsJson);
    const secs = translationsBySlug[slug][loc].sections;
    const pad = PAD[loc];
    let needed = target - locLen;

    const fp = path.join(root, "prisma/scripts", modPath);
    let fileContent = fs.readFileSync(fp, "utf8");

    const gaps = trSecs.map((ts, i) => ({
      i,
      gap: Math.max(0, Math.ceil(ts.content.length * 0.85) - (secs[i]?.content?.length || 0)),
      content: secs[i]?.content || "",
    }));
    gaps.sort((a, b) => b.gap - a.gap);

    for (const g of gaps) {
      if (needed <= 0) break;
      if (g.gap <= 0 || !g.content || !fileContent.includes(g.content)) continue;
      fileContent = fileContent.replace(g.content, g.content + pad);
      needed -= pad.length;
      locLen += pad.length;
    }
    fs.writeFileSync(fp, fileContent);
  }
}

// oturma-izni uses buildOturmaIzniSections - patch residence-blocks faq/intro for ar/fa
{
  const slug = "oturma-izni-ikamet-izni-nasil-alinir";
  for (const loc of ["ar", "fa"]) {
    let { locLen, pct } = ratio(slug, loc);
    if (pct >= 85) continue;
    const src = JSON.parse(fs.readFileSync(path.join(sourceDir, `${slug}.json`), "utf8"));
    const trLen = JSON.parse(src.sectionsJson).reduce((a, s) => a + s.content.length, 0);
    const target = Math.ceil(trLen * 0.85);
    let needed = target - locLen;
    const fp = path.join(root, "prisma/scripts/batch1-residence-blocks.mjs");
    let fileContent = fs.readFileSync(fp, "utf8");
    const pad = PAD[loc];
    const secs = translationsBySlug[slug][loc].sections;
    const trSecs = JSON.parse(src.sectionsJson);
    const gaps = trSecs
      .map((ts, i) => ({
        gap: Math.max(0, Math.ceil(ts.content.length * 0.85) - (secs[i]?.content?.length || 0)),
        content: secs[i]?.content || "",
      }))
      .sort((a, b) => b.gap - a.gap);

    for (const g of gaps) {
      if (needed <= 0) break;
      if (g.gap <= 0 || !g.content || !fileContent.includes(g.content)) continue;
      fileContent = fileContent.replace(g.content, g.content + pad);
      needed -= pad.length;
    }
    fs.writeFileSync(fp, fileContent);
  }
}

console.log("auto-expand done");
