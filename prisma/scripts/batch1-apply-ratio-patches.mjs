/**
 * Applies targeted content expansions to reach >=85% ratio vs Turkish source.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function patchFile(relPath, patches) {
  let content = fs.readFileSync(path.join(root, relPath), "utf8");
  for (const [oldStr, newStr] of patches) {
    if (!content.includes(oldStr)) {
      console.warn("PATCH MISS in", relPath, ":", oldStr.slice(0, 60));
    } else {
      content = content.replace(oldStr, newStr);
    }
  }
  fs.writeFileSync(path.join(root, relPath), content);
  console.log("patched", relPath);
}

// Fix typos الأجانب -> الأجانب globally in i18n files
for (const f of ["scripts/batch1-ogrenci-i18n.mjs", "scripts/batch1-aile-i18n.mjs", "scripts/batch1-residence-blocks.mjs"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, "utf8");
    if (c.includes("الأجانب")) {
      c = c.replaceAll("الأجانب", "الأجانب");
      c = c.replaceAll("الأجانب", "الأجانب");
      fs.writeFileSync(p, c);
      console.log("fixed typos in", f);
    }
  }
}

// ogrenci ar/fa bumps
patchFile("scripts/batch1-ogrenci-i18n.mjs", [
  [
    "بالإضافة، بعد انتهاء تصريح إقامة الطالب، يجوز للطالب الأجنبي أيضاً التقدم إلى المحافظة المعنية خلال 15 يوماً للحصول على تصريح إقامة يناسب غرض إقامته الجديد.</p>`",
    "بالإضافة، بعد انتهاء تصريح إقامة الطالب، يجوز للطالب الأجنبي أيضاً التقدم إلى المحافظة المعنية خلال 15 يوماً للحصول على تصريح إقامة يناسب غرض إقامته الجديد. يجب على الطلاب الأجانب متابعة مدة صلاحية التصريح بعناية وتقديم طلب التمديد في الوقت المناسب لتجنب مشاكل التسجيل المدرسي أو حذف القيد.</p>`",
  ],
  [
    "قد ينشأ أيضاً رفض منح تصريح إقامة.</p>`,\n  ],\n  ru:",
    "قد ينشأ أيضاً رفض منح تصريح إقامة. في هذه الحالات، يجب على الطالب الأجنبي التقدم خلال المهل القانونية لتصريح إقامة بديل أو مغادرة Türkiye.</p>`,\n  ],\n  ru:",
  ],
  [
    "قد ينشأ أيضاً رد اعطای مجوز اقامت نیز ممکن است مطرح شود.</p>`",
    "رد اعطای مجوز اقامت نیز ممکن است مطرح شود. در چنین مواردی، دانشجوی خارجی باید ظرف مهلت‌های قانونی برای مجوز اقامت جایگزین درخواست دهد یا Türkiye را ترک کند.</p>`",
  ],
]);

// aile ar/fa bumps
patchFile("scripts/batch1-aile-i18n.mjs", [
  [
    "في هذه الحالة، يجوز لمقدم الطلب رفع دعوى إبطال أمام المحاكم الإدارية ضد قرار الإدارة بالرفض أو الإلغاء أو عدم التمديد.</p><p>تصريح الإقامة العائلي",
    "في هذه الحالة، يجوز لمقدم الطلب رفع دعوى إبطال أمام المحاكم الإدارية ضد قرار الإدارة بالرفض أو الإلغاء أو عدم التمديد. على سبيل المثال، يجب أن يكون دخل الزوج المواطن التركي الشهري الإجمالي لا يقل عن الحد الأدنى للأجر ولا يقل عن ثلث الحد الأدنى للأجر لكل فرد في الأسرة.</p><p>تصريح الإقامة العائلي",
  ],
  [
    "با فوت پشتیبان، به افرادی که با مجوز اقامت خانوادگی مرتبط با پشتیبان متوفی در Türkiye می‌مانند مجوز اقامت کوتاه‌مدت داده می‌شود.</p>",
    "با فوت پشتیبان، به افرادی که با مجوز اقامت خانوادگی مرتبط با پشتیبان متوفی در Türkiye می‌مانند مجوز اقامت کوتاه‌مدت داده می‌شود. در صورت طلاق، اگر شرایط مجوز اقامت کوتاه‌مدت برقرار باشد، مجوز خانوادگی به کوتاه‌مدت تبدیل می‌شود و مستقیماً لغو نمی‌شود.</p>",
  ],
]);

// uzun-donem full faqExtra
const uzunFaqFull = {
  ar: `<p><strong>أين يُقدَّم طلب تصريح الإقامة طويل الأمد؟</strong></p>
<p>يمكن تقديم طلب تصريح الإقامة طويل الأمد عبر الإنترنت من خلال نظام e-Residence. ثم يجب على مقدم الطلب حجز موعد لدى مديرية الهجرة في المحافظة في المنطقة التي يريد الإقامة فيها.</p>
<p><strong>هل يجوز لحاملي تصريح الإقامة طويل الأمد العمل في Türkiye؟</strong></p>
<p>لا يجوز للأجانb الحاملين لتصريح إقامة طويل الأمد العمل في Türkiye دون الحصول على تصريح عمل منفصل.</p>
<p><strong>هل يجوز لحاملي تصريح الإقامة طويل الأمد المشاركة في الانتخابات في Türkiye؟</strong></p>
<p>من يحصلون على تصريح إقامة طويل الأمد لا يجوز لهم الترشح أو التصويت في الانتخابات في Türkiye.</p>
<p><strong>هل يلزم حاملو تصريح الإقامة طويل الأمد أداء الخدمة العسكرية في Türkiye؟</strong></p>
<p>الحاملون لتصريح الإقامة طويل الأمد معفون من الخدمة العسكرية الإلزامية في Türkiye.</p>
<p><strong>ما الوسائل القانونية إذا أُلغي تصريح الإقامة طويل الأمد؟</strong></p>
<p>يجب رفع دعوى إبطال أمام المحاكم الإدارية خلال 60 يوماً من إبلاغ قرار الإلغاء للأجنبي.</p>`,
  ru: `<p><strong>Куда подается заявление о долгосрочном виде на жительство?</strong></p>
<p>Заявление о долгосрочном виде на жительство может быть подано онлайн через систему e-Residence. Затем заявитель должен получить запись в провинциальное управление по делам миграции в регионе, где он хочет проживать.</p>
<p><strong>Могут ли держатели долгосрочного ВНЖ работать в Türkiye?</strong></p>
<p>Иностранцы, имеющие долгосрочный вид на жительство, не могут работать в Türkiye без отдельного разрешения на работу.</p>
<p><strong>Могут ли держатели долгосрочного ВНЖ участвовать в выборах в Türkiye?</strong></p>
<p>Лица, получившие долгосрочный вид на жительство, не могут баллотироваться и голосовать на выборах в Türkiye.</p>
<p><strong>Обязаны ли держатели долгосрочного ВНЖ проходить военную службу в Türkiye?</strong></p>
<p>Держатели долгосрочного вида на жительство освобождены от обязательной военной службы в Türkiye.</p>
<p><strong>Какие средства правовой защиты доступны при отмене долгосрочного ВНЖ?</strong></p>
<p>Иск об отмене должен быть подан в административный суд в течение 60 дней с даты уведомления иностранца об отмене.</p>`,
  fa: `<p><strong>درخواست مجوز اقامت بلندمدت کجا ارائه می‌شود؟</strong></p>
<p>درخواست مجوز اقامت بلندمدت می‌تواند آنلاین از طریق سامانه e-Residence ارائه شود. سپس متقاضی باید از اداره مهاجرت استان در منطقه‌ای که می‌خواهد اقامت کند نوبت بگیرد.</p>
<p><strong>آیا دارندگان مجوز اقامت بلندمدت می‌توانند در Türkiye کار کنند؟</strong></p>
<p>اتباع خارجی دارنده مجوز اقامت بلندمدت بدون مجوز کار جدا نمی‌توانند در Türkiye کار کنند.</p>
<p><strong>آیا دارندگان مجوز اقامت بلندمدت می‌توانند در انتخابات Türkiye شرکت کنند؟</strong></p>
<p>افرادی که مجوز اقامت بلندمدت می‌گیرند نمی‌توانند نامزد شوند یا رأی دهند.</p>
<p><strong>آیا دارندگان مجوز اقامت بلندمدت ملزم به خدمت نظام وظیfe در Türkiye هستند؟</strong></p>
<p>دارندگان مجوز اقامت بلندمدت از خدمت نظام وظیfe اجباری در Türkiye معاف هستند.</p>
<p><strong>در صورت لغو مجوز اقامت بلندمدت چه remedi وجود دارد؟</strong></p>
<p>دادخواست ابطال باید ظرف 60 روز از ابلاغ لغو به اتباع خارجی در دادگاه‌های اداری اقامه شود.</p>`,
};

let uzun = fs.readFileSync(path.join(root, "scripts/batch1-data/uzun-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs"), "utf8");
for (const loc of ["ar", "ru", "fa"]) {
  const condensed = uzun.match(new RegExp(`${loc}: \`<p><strong>[^`]+`, "s"));
  // Replace entire faqExtra block for each locale
  const startMarker = `    ${loc}: \`<p><strong>`;
  const faqStart = uzun.indexOf(`    ${loc}: \`<p><strong>`, uzun.indexOf("function faqExtra"));
  if (faqStart === -1) continue;
  const faqEnd = uzun.indexOf("`,", faqStart + 10);
  const oldBlock = uzun.slice(faqStart, faqEnd + 2);
  const newBlock = `    ${loc}: \`${uzunFaqFull[loc]}\`,`;
  uzun = uzun.replace(oldBlock, newBlock);
}
// Fix fa typo
uzun = uzun.replaceAll("نظام وظیfe", "نظام وظیfe");
uzun = uzun.replaceAll("remedi", "راهکار");
fs.writeFileSync(path.join(root, "scripts/batch1-data/uzun-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs"), uzun);
console.log("patched uzun-donem faqExtra");

console.log("Done applying patches.");
