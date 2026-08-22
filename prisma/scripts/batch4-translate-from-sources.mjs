/**
 * Generates complete batch4 translation JSON from Turkish sources + locale maps.
 * Run: node prisma/scripts/batch4-translate-from-sources.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FEE_TABLE, BAKICI_FEE_TABLE, APPEAL_30_60, TAHDIT_COURT_COSTS, COMPETENT_COURT_TAHDIT } from "./batch4-translation-slugs/_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "../data/fc-batch4-sources");
const OUT_DIR = path.join(__dirname, "../data/fc-batch4-translations");
const LOCALES = ["en", "ar", "ru", "fa"];

const SLUGS = [
  "bagimsiz-calisma-izni",
  "calisma-izni-transferi",
  "kilit-personel-calisma-izni",
  "sirket-ortagi-yabancilarin-calisma-izni",
  "yabanci-muhendis-mimar-calisma-izni",
  "yabanci-bakici-calisma-izni",
  "yabanci-ogretmen-calisma-izni",
  "yabanci-ogrenci-calisma-izni",
  "c-138-tahdit-kodu",
  "c-101-c-102-c-103-c-104-c-105-tahdit-kodlari",
  "m-67-interpol-dolandiricilik-tahdit-kodu",
  "v-70-tahdit-kodu",
];

/** @type {Record<string, Record<string, Record<string, string>>>} */
const meta = {
  "bagimsiz-calisma-izni": {
    en: {
      name: "Independent Work Permit",
      excerpt:
        "An independent work permit is required for foreign nationals who wish to work on their own account in Türkiye without being tied to an employer. This guide explains eligibility under the International Labour Force Law, the e-permit application, required documents, fees, and remedies if the permit is refused or cancelled.",
      shortDescription:
        "Independent work permits allow qualified foreign nationals to work on their own account in Türkiye. Applications are filed through the e-permit system by the foreign applicant personally, subject to Regulation Article 29 criteria.",
      heroTitle: "Independent Work Permit",
      heroSubtitle:
        "Learn who may obtain an independent work permit in Türkiye, how to apply through e-Devlet, which documents are required, applicable fees, and your rights if the application is refused or the permit is cancelled.",
    },
    ar: {
      name: "تصريح العمل المستقل",
      excerpt:
        "يُعد تصريح العمل المستقل ضرورياً للأجانب الراغبين في العمل لحسابهم الخاص في Türkiye دون ارتباط بصاحب عمل. يشرح هذا الدليل الأهلية بموجب قانون القوى العاملة الدولية وتقديم e-permit والمستندات والرسوم والسبل عند الرفض أو الإلغاء.",
      shortDescription:
        "يتيح تصريح العمل المستقل للأجانب المؤهلين العمل لحسابهم الخاص في Türkiye. يقدمه الأجنبي شخصياً عبر نظام e-permit وفق المادة 29 من اللائحة.",
      heroTitle: "تصريح العمل المستقل",
      heroSubtitle:
        "تعرّف من يمكنه الحصول على تصريح عمل مستقل في Türkiye وكيفية التقديم عبر e-Devlet والمستندات والرسوم وحقوقكم عند الرفض أو الإلغاء.",
    },
    ru: {
      name: "Независимое разрешение на работу",
      excerpt:
        "Независимое разрешение на работу требуется иностранцам, желающим работать на свой счет в Türkiye без привязки к работодателю. В статье описаны условия по Закону о международной рабочей силе, подача через e-permit, документы, пошлины и средства защиты при отказе или отмене.",
      shortDescription:
        "Независимое разрешение позволяет квалифицированным иностранцам работать на свой счет в Türkiye. Заявление подает сам иностранец через e-permit согласно статье 29 Положения.",
      heroTitle: "Независимое разрешение на работу",
      heroSubtitle:
        "Узнайте, кто может получить независимое разрешение в Türkiye, как подать заявление через e-Devlet, какие документы и пошлины требуются и какие права есть при отказе или отмене.",
    },
    fa: {
      name: "مجوز کار مستقل",
      excerpt:
        "مجوز کار مستقل برای اتباع خارجی که می‌خواهند به حساب خود در Türkiye بدون وابستگی به کارفرما کار کنند لازم است. این راهنما شرایط قانون نیروی کار بین‌المللی، درخواست e-permit، مدارک، هزینه‌ها و راه‌های حقوقی در صورت رد یا لغو را توضیح می‌دهد.",
      shortDescription:
        "مجوز کار مستقل به خارجیان واجد شرایط اجازه می‌دهد به حساب خود در Türkiye کار کنند. درخواست توسط خود خارجی از طریق e-permit و مطابق ماده 29 آیین‌نامه ارائه می‌شود.",
      heroTitle: "مجوز کار مستقل",
      heroSubtitle:
        "با شرایط اخذ مجوز کار مستقل در Türkiye، نحوه درخواست از e-Devlet، مدارک، هزینه‌ها و حقوق در صورت رد یا لغو آشنا شوید.",
    },
  },
};

// Import completed slug modules for slugs already fully translated
const completedModules = {
  "calisma-izni-transferi": () => import("./batch4-translation-slugs/calisma-izni-transferi.mjs"),
  "v-70-tahdit-kodu": () => import("./batch4-translation-slugs/v-70-tahdit-kodu.mjs"),
  "bagimsiz-calisma-izni": () => import("./batch4-translation-slugs/bagimsiz-calisma-izni.mjs"),
};

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const slug of SLUGS) {
  if (completedModules[slug]) {
    const mod = await completedModules[slug]();
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.json`), JSON.stringify(mod.default, null, 2) + "\n");
    console.log("wrote (module)", slug);
    continue;
  }
  console.warn("SKIP (no module yet):", slug);
}

console.log("Done. Add remaining slug modules and re-run.");
