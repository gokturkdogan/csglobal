/**
 * Populates RU/FA section bodies for calisma-izni and writes locale .mjs files.
 * Run: node prisma/scripts/populate-calisma-izni-ru-fa.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

// Load AR sections - use as base to generate RU/FA via reading pre-built JSON chunks
const arSections = (await import(path.join(DATA, "calisma-izni-ar.mjs"))).sections;

// Load EN from TS for reference
const ts = fs.readFileSync(path.join(DATA, "../fc-translations/contents/calisma-izni.ts"), "utf8");
const enSections = Function(
  "return " + ts.match(/const enSections[\s\S]*?\n\];/)[0].replace("const enSections: ServiceContentSection[] = ", ""),
)();

// Load translated bodies if present
const bodiesPath = path.join(DATA, "calisma-izni-ru-fa-bodies-translated.json");
if (!fs.existsSync(bodiesPath)) {
  console.error("Missing", bodiesPath);
  process.exit(1);
}
const bodies = JSON.parse(fs.readFileSync(bodiesPath, "utf8"));

for (const loc of ["ru", "fa"]) {
  const titles = loc === "ru" ? ruTitles : faTitles;
  const sections = bodies[loc].map((s, i) => ({ title: titles[i], content: s.content }));
  if (sections.length !== 21) throw new Error(`${loc} count ${sections.length}`);
  const code = `/** ${loc.toUpperCase()} sections for calisma-izni - batch 6 */\nexport const sections = ${JSON.stringify(sections, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA, `calisma-izni-${loc}.mjs`), code);
  console.log(`Wrote calisma-izni-${loc}.mjs`, fs.statSync(path.join(DATA, `calisma-izni-${loc}.mjs`)).size);
}
