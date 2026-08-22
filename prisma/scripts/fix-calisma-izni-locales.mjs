/**
 * Applies complete RU/FA section translations and rebuilds calisma-izni.ts
 * Run: node prisma/scripts/fix-calisma-izni-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "../data/fc-batch6-translations");

const ruTitles = [
  "Разрешение на работу",
  "Что такое разрешение на работу?",
  "Как получить разрешение на работу?",
  "Типы разрешений на работу",
  "Условия получения разрешения на работу иностранцами",
  "Документы для иностранного разрешения на работу",
  "На что обратить внимание в трудовых договорах с иностранцами",
  "Обязательная минимальная заработная плата для иностранцев",
  "Какие профессии не могут получить разрешение на работу?",
  "Освобождения от разрешения на работу",
  "Разрешения на работу для сирийцев",
  "Разрешения на работу для лиц турецкого происхождения",
  "Сборы и расходы по разрешению на работу",
  "Сколько дней оформляется разрешение на работу?",
  "Отказ в заявлении, возражение и иск об отмене",
  "Аннулирование разрешения Министерством, возражение и иск",
  "Как подать заявление на продление разрешения на работу?",
  "Отказ в продлении, возражение и иск об отмене",
  "Штраф за работу иностранца без разрешения",
  "Часто задаваемые вопросы о разрешении на работу",
  "Заключение",
];

const faTitles = [
  "مجوز کار",
  "مجوز کار چیست؟",
  "چگونه مجوز کار اخذ می‌شود؟",
  "انواع مجوز کار",
  "شرایط اخذ مجوز کار برای اتباع خارجی",
  "مدارک لازم برای مجوز کار خارجی",
  "نکات قرارداد کار با پرسنل خارجی",
  "حداقل دستمزدهای اجباری برای پرسنل خارجی",
  "کدام مشاغل نمی‌توانند مجوز کار بگیرند؟",
  "معافیت‌های مجوز کار",
  "مجوز کار سوری‌ها",
  "مجوز کار اتباع خارجی ترک‌تبار",
  "هزینه‌ها و عوارض مجوز کار",
  "صدور مجوز کار چند روز طول می‌کشد؟",
  "رد درخواست، اعتراض و دعوای ابطال",
  "ابطال مجوز توسط وزارت، اعتراض و دعوای ابطال",
  "چگونه درخواست تمدید مجوز کار داده می‌شود؟",
  "رد تمدید، اعتراض و دعوای ابطال",
  "جریمه به‌کارگیری کارگر خارجی بدون مجوز",
  "پرسش‌های متداول درباره مجوز کار خارجی",
  "نتیجه‌گیری",
];

const ruBodies = JSON.parse(
  fs.readFileSync(path.join(DATA, "calisma-izni-ru-bodies-full.json"), "utf8"),
);
const faBodies = JSON.parse(
  fs.readFileSync(path.join(DATA, "calisma-izni-fa-bodies-full.json"), "utf8"),
);

if (ruBodies.length !== 21 || faBodies.length !== 21) {
  throw new Error("Expected 21 sections in locale body files");
}

function writeMjs(loc, titles, bodies) {
  const sections = titles.map((title, i) => ({ title, content: bodies[i] }));
  const code = `/** ${loc.toUpperCase()} sections for calisma-izni - batch 6 */\nexport const sections = ${JSON.stringify(sections, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA, `calisma-izni-${loc}.mjs`), code);
}

writeMjs("ru", ruTitles, ruBodies);
writeMjs("fa", faTitles, faBodies);

await import(pathToFileURL(path.join(__dirname, "build-calisma-izni-translations.mjs")).href);

const out = fs.readFileSync(
  path.join(__dirname, "../data/fc-translations/contents/calisma-izni.ts"),
  "utf8",
);
const stat = fs.statSync(
  path.join(__dirname, "../data/fc-translations/contents/calisma-izni.ts"),
);
const bad = (s) =>
  /\b(the|and|for|with|must|should|application|employer|foreign|when|from|Law,|Under )\b/i.test(
    s,
  );
const ru = Function(
  "return " +
    out
      .match(/const ruSections[\s\S]*?\n\];/)[0]
      .replace("const ruSections: ServiceContentSection[] = ", ""),
)();
const fa = Function(
  "return " +
    out
      .match(/const faSections[\s\S]*?\n\];/)[0]
      .replace("const faSections: ServiceContentSection[] = ", ""),
)();
console.log("Built calisma-izni.ts");
console.log("Size:", stat.size, "bytes");
console.log("Sections per locale:", ru.length);
console.log("Em dash:", out.includes("—"));
console.log(
  "RU English leakage sections:",
  ru.filter((s) => bad(s.content)).map((s) => s.title),
);
console.log(
  "FA English leakage sections:",
  fa.filter((s) => bad(s.content)).map((s) => s.title),
);
