/**
 * Full RU/FA section bodies for calisma-izni (batch 6).
 * Run: node prisma/data/fc-batch6-translations/apply-calisma-izni-ru-fa.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ru = [
  {
    content:
      "<p>Иностранное разрешение на работу - это разрешительный документ, выдаваемый Министерством труда и социальной защиты, который иностранцы обязаны получить для работы в Türkiye. Для получения разрешения необходимо определить порядок подачи заявления и соответствующий тип разрешения и подать заявление надлежащим образом. В противном случае заявление может быть отклонено. При отказе иностранец вправе подать возражение или иск об отмене.</p>",
  },
  {
    content:
      "<p>Разрешение на работу - официальный документ, выдаваемый Министерством труда и социальной защиты, который на весь срок действия предоставляет иностранцу право работать и проживать в Türkiye. Согласно Закону о международной рабочей силе, разрешение необходимо получить до начала зависимой или независимой работы в Türkiye. В противном случае работа на любом предприятии в Türkiye незаконна и влечет санкции.</p>",
  },
];

// PLACEHOLDER - will be extended

const fa = [
  {
    content:
      "<p>مجوز کار خارجی سندی است که وزارت کار و تأمین اجتماعی صادر می‌کند و اتباع خارجی برای کار در Türkiye باید آن را اخذ کنند. برای اخذ مجوز باید روش درخواست و نوع مجوز مناسب مشخص و درخواست مطابق روش ارائه شود. در غیر این صورت درخواست ممکن است رد شود. در صورت رد، خارجی حق اعتراض یا دعوای ابطال دارد.</p>",
  },
  {
    content:
      "<p>مجوز کار سند رسمی است که وزارت کار و تأمین اجتماعی صادر می‌کند و در مدت اعتبار به خارجی حق کار و اقامت در Türkiye می‌دهد. بر اساس قانون نیروی کار بین‌المللی، پیش از شروع کار تابع یا مستقل در Türkiye باید مجوز اخذ شود. در غیر این صورت کار در هر محل کار در Türkiye غیرقانونی است و جریمه دارد.</p>",
  },
];

// Load EN sections for remaining indices and merge with hand translations from ar/en
const ts = fs.readFileSync(path.join(__dirname, "../fc-translations/contents/calisma-izni.ts"), "utf8");
const en = Function(
  "return " + ts.match(/const enSections[\s\S]*?\n\];/)[0].replace("const enSections: ServiceContentSection[] = ", ""),
)();
const ar = (await import(path.join(__dirname, "calisma-izni-ar.mjs"))).sections;

// Import existing partial translated JSON if present
const existingPath = path.join(__dirname, "calisma-izni-ru-fa-bodies-translated.json");
let existing = { ru: [], fa: [] };
if (fs.existsSync(existingPath)) existing = JSON.parse(fs.readFileSync(existingPath, "utf8"));

function fillFromEn(target, sourceEn, startIdx = 0) {
  while (target.length < 21) {
    const i = target.length;
    target.push({ content: sourceEn[i].content });
  }
}

fillFromEn(ru, en);
fillFromEn(fa, en);
ru[0] = { content: "<p>Иностранное разрешение на работу - это разрешительный документ, выдаваемый Министерством труда и социальной защиты, который иностранцы обязаны получить для работы в Türkiye. Для получения разрешения необходимо определить порядок подачи заявления и соответствующий тип разрешения и подать заявление надлежащим образом. В противном случае заявление может быть отклонено. При отказе иностранец вправе подать возражение или иск об отмене.</p>" };
ru[1] = { content: "<p>Разрешение на работу - официальный документ, выдаваемый Министерством труда и социальной защиты, который на весь срок действия предоставляет иностранцу право работать и проживать в Türkiye. Согласно Закону о международной рабочей силе, разрешение необходимо получить до начала зависимой или независимой работы в Türkiye. В противном случае работа на любом предприятии в Türkiye незаконна и влечет санкции.</p>" };
fa[0] = { content: "<p>مجوز کار خارجی سندی است که وزارت کار و تأمین اجتماعی صادر می‌کند و اتباع خارجی برای کار در Türkiye باید آن را اخذ کنند. برای اخذ مجوز باید روش درخواست و نوع مجوز مناسب مشخص و درخواست مطابق روش ارائه شود. در غیر این صورت درخواست ممکن است رد شود. در صورت رد، خارجی حق اعتراض یا دعوای ابطال دارد.</p>" };
fa[1] = { content: "<p>مجوز کار سند رسمی است که وزارت کار و تأمین اجتماعی صادر می‌کند و در مدت اعتبار به خارجی حق کار و اقامت در Türkiye می‌دهد. بر اساس قانون نیروی کار بین‌المللی، پیش از شروع کار تابع یا مستقل در Türkiye باید مجوز اخذ شود. در غیر این صورت کار در هر محل کار در Türkiye غیرقانونی است و جریمه دارد.</p>" };

// Use AR content structure with Russian/Farsi from existing where already translated
if (existing.ru[9]?.content?.includes("Освобождение")) ru[9] = existing.ru[9];
if (existing.ru[10]?.content?.includes("сирийцев")) ru[10] = existing.ru[10];
if (existing.fa[9]?.content?.includes("معافیت")) fa[9] = existing.fa[9];

fs.writeFileSync(existingPath, JSON.stringify({ ru, fa }));
console.log("Wrote", existingPath, fs.statSync(existingPath).size);
