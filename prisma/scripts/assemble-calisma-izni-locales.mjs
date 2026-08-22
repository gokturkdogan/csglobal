/**
 * Assembles calisma-izni-ru.mjs and calisma-izni-fa.mjs from per-section locale files.
 * Run: node prisma/scripts/assemble-calisma-izni-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "../data/fc-batch6-translations");
const SECT = path.join(DATA, "calisma-izni-sections");

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

function readSection(loc, i) {
  const p = path.join(SECT, `${loc}-${String(i).padStart(2, "0")}.html`);
  if (!fs.existsSync(p)) {
    throw new Error(`Missing ${p}`);
  }
  return fs.readFileSync(p, "utf8").trim();
}

function writeMjs(loc, titles) {
  const sections = titles.map((title, i) => ({
    title,
    content: readSection(loc, i),
  }));
  const code = `/** ${loc.toUpperCase()} sections for calisma-izni - batch 6 */\nexport const sections = ${JSON.stringify(sections, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA, `calisma-izni-${loc}.mjs`), code);
  console.log(`Wrote calisma-izni-${loc}.mjs (${sections.length} sections)`);
}

for (const loc of ["ru", "fa"]) {
  for (let i = 0; i < 21; i++) {
    const p = path.join(SECT, `${loc}-${String(i).padStart(2, "0")}.html`);
    if (!fs.existsSync(p)) throw new Error(`Missing section file: ${p}`);
  }
}

writeMjs("ru", ruTitles);
writeMjs("fa", faTitles);

await import(pathToFileURL(path.join(__dirname, "build-calisma-izni-translations.mjs")).href);
