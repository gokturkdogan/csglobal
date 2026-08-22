/**
 * Builds calisma-izni.ts from EN sections in partial file + locale data modules.
 * Run: node prisma/scripts/build-calisma-izni-translations.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../data/fc-translations/contents/calisma-izni.ts");
const DATA = path.join(__dirname, "../data/fc-batch6-translations");

const LOCALES = ["en", "ar", "ru", "fa"];

const meta = {
  en: {
    name: "Work Permit",
    excerpt:
      "A foreign work permit is an authorization document issued by the Ministry of Labour and Social Security that foreign nationals must obtain to work in Türkiye. Applications must follow the correct procedure and permit type; otherwise they may be rejected, with rights to object or bring annulment action.",
    shortDescription:
      "A foreign work permit grants the right to work and reside in Türkiye for its validity period. Types include temporary, indefinite, independent, exceptional permits and Turquoise Card, each with distinct conditions, documents and procedures.",
    heroTitle: "Work Permit",
    heroSubtitle:
      "Comprehensive guide to obtaining a foreign work permit in Türkiye: application procedures, permit types, employer and employee conditions, required documents, fees, extensions, exemptions, rejection remedies and frequently asked questions.",
  },
  ar: {
    name: "تصريح العمل",
    excerpt:
      "تصريح العمل للأجانب وثيقة إذن تصدرها وزارة العمل والضمان الاجتماعي ويجب على الأجانب الحصول عليها للعمل في Türkiye. يجب اتباع الإجراءات ونوع التصريح المناسب؛ وإلا قد يُرفض الطلب مع حق الاعتراض أو دعوى الإلغاء.",
    shortDescription:
      "يمنح تصريح العمل الأجنبي حق العمل والإقامة في Türkiye خلال مدة صلاحيته. تشمل الأنواع التصاريح المؤقتة والدائمة والمستقلة والاستثنائية وبطاقة الفيروز، لكل منها شروط ووثائق وإجراءات مختلفة.",
    heroTitle: "تصريح العمل",
    heroSubtitle:
      "دليل شامل للحصول على تصريح عمل أجنبي في Türkiye: إجراءات التقديم، أنواع التصاريح، شروط صاحب العمل والعامل، الوثائق، الرسوم، التمديد، الإعفاءات، سبل الطعن والأسئلة الشائعة.",
  },
  ru: {
    name: "Разрешение на работу",
    excerpt:
      "Иностранное разрешение на работу - документ, выдаваемый Министерством труда и социальной защиты, который иностранцы обязаны получить для работы в Türkiye. Заявления должны соответствовать процедуре и типу разрешения; иначе они могут быть отклонены с правом возражения или иска об отмене.",
    shortDescription:
      "Иностранное разрешение на работу предоставляет право работать и проживать в Türkiye в течение срока действия. Типы включают временные, бессрочные, независимые, исключительные разрешения и Бирюзовую карту.",
    heroTitle: "Разрешение на работу",
    heroSubtitle:
      "Полное руководство по получению иностранного разрешения на работу в Türkiye: процедуры, типы разрешений, условия, документы, сборы, продление, освобождения и средства правовой защиты.",
  },
  fa: {
    name: "مجوز کار",
    excerpt:
      "مجوز کار خارجی سندی است که وزارت کار و تأمین اجتماعی صادر می‌کند و اتباع خارجی برای کار در Türkiye باید آن را اخذ کنند. درخواست‌ها باید مطابق روش و نوع مجوز مناسب باشد؛ در غیر این صورت ممکن است رد شود با حق اعتراض یا دعوای ابطال.",
    shortDescription:
      "مجوز کار خارجی در مدت اعتبار، حق کار و اقامت در Türkiye را می‌دهد. انواع شامل مجوزهای موقت، نامحدود، مستقل، استثنایی و کارت فیروزه‌ای است.",
    heroTitle: "مجوز کار",
    heroSubtitle:
      "راهنمای جامع اخذ مجوز کار خارجی در Türkiye: رویه‌های درخواست، انواع مجوز، شرایط، مدارک، هزینه‌ها، تمدید، معافیت‌ها و راه‌های حقوقی.",
  },
};

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

function parseEnSections(ts) {
  const m = ts.match(/const enSections[\s\S]*?\n\];/);
  if (!m) throw new Error("enSections not found");
  return Function(
    "return " + m[0].replace("const enSections: ServiceContentSection[] = ", ""),
  )();
}

let partial = fs.readFileSync(OUT, "utf8");
const enSections = parseEnSections(partial);

const localeSections = { en: enSections };
for (const loc of ["ar", "ru", "fa"]) {
  const mod = await import(pathToFileURL(path.join(DATA, `calisma-izni-${loc}.mjs`)).href);
  localeSections[loc] = mod.sections;
  if (localeSections[loc].length !== 21) {
    throw new Error(`${loc} has ${localeSections[loc].length} sections, expected 21`);
  }
}

const header = `import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

`;

const blocks = LOCALES.map((l) => sectionBlock(l, localeSections[l])).join("\n\n");
const translations = LOCALES.map((l) => {
  const m = meta[l];
  return `  ${l}: {
    name: ${JSON.stringify(m.name)},
    excerpt: ${JSON.stringify(m.excerpt)},
    shortDescription: ${JSON.stringify(m.shortDescription)},
    heroTitle: ${JSON.stringify(m.heroTitle)},
    heroSubtitle: ${JSON.stringify(m.heroSubtitle)},
    sectionsJson: serializeServiceSections(${l}Sections),
  }`;
}).join(",\n");

const out = `${header}${blocks}

export const contentSlug = "calisma-izni";

export const contentTranslations: ForeignConsultancyTranslations = {
${translations},
};
`;

fs.writeFileSync(OUT, out, "utf8");
const stat = fs.statSync(OUT);
console.log(`Built ${OUT}`);
console.log(`Size: ${stat.size} bytes`);
console.log(`Sections per locale: ${enSections.length}`);
