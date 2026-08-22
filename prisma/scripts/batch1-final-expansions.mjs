/**
 * Applies final content expansions to reach >=85% ratio vs Turkish source.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function patch(relPath, replacements) {
  let c = fs.readFileSync(path.join(root, relPath), "utf8");
  let n = 0;
  for (const [oldStr, newStr] of replacements) {
    if (!c.includes(oldStr)) {
      console.warn("MISS", relPath, oldStr.slice(0, 50));
    } else {
      c = c.replace(oldStr, newStr);
      n++;
    }
  }
  fs.writeFileSync(path.join(root, relPath), c);
  console.log(`patched ${relPath} (${n}/${replacements.length})`);
}

// Fix typo الأجانب -> الأجانب globally
for (const f of [
  "scripts/batch1-ogrenci-i18n.mjs",
  "scripts/batch1-aile-i18n.mjs",
  "scripts/batch1-residence-blocks.mjs",
  "scripts/batch1-kisa-donem-i18n.mjs",
  "scripts/batch1-data/uzun-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs",
  "scripts/batch1-data/evlilik-yoluyla-turk-vatandasliginin-kazanilmasi.mjs",
]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, "utf8");
    if (c.includes("الأجانب")) {
      c = c.replaceAll("الأجانب", "الأجانب");
      fs.writeFileSync(p, c);
      console.log("fixed typo in", f);
    }
  }
}

// Expand annulmentResidence ar/fa in shared
patch("scripts/batch1-shared.mjs", [
  [
    `p2: \`يجوز للأجانb الذين رُفض طلب \${permitLabel} لهم رفع دعوى إبطال`,
    `p2: \`يجوز للأجانب الذين رُفض طلب \${permitLabel} لهم رفع دعوى إبطال`,
  ],
  [
    `p3: \`قرارات الإدارة برفض أو قبول طلب \${permitLabel} هي في جوهرها إجراءات إدارية. لذلك، لكي تكون الإجراءات الإدارية مشروعة، يجب أن تتضمن جميع العناصر المطلوبة. كما اُوضح في مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>إبطال الإجراءات الإدارية</u></strong></a>"، يمكن للمحكمة إبطال الإجراءات الإدارية التي يتبين أن أحد عناصر الهدف أو الموضوع أو السبب أو الاختصاص أو الشكل فيها معيباً على الأقل.\`,`,
    `p3: \`قرارات الإدارة برفض أو قبول طلب \${permitLabel} هي في جوهرها إجراءات إدارية. لذلك، لكي تكون الإجراءات الإدارية مشروعة، يجب أن تتضمن جميع العناصر المطلوبة. كما اُوضح في مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>إبطال الإجراءات الإدارية</u></strong></a>"، يمكن للمحكمة إبطال الإجراءات الإدارية التي يتبين أن أحد عناصر الهدف أو الموضوع أو السبب أو الاختصاص أو الشكل فيها معيباً على الأقل.</p>
<p>للحصول على معلومات تفصيلية حول هذا الموضوع، راجع أيضاً مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi/"><strong><u>دعوى إبطال قرار رفض طلب تصريح الإقامة</u></strong></a>".\`,`,
  ],
  [
    `p3: \`تصمیمات اداره درباره رد یا پذیرش درخواست \${permitLabel} اساساً اقدامات اداری هستند. بنابراین برای مشروعیت اقدامات اداری باید تمام عناصر لازم را داشته باشند. همان‌طور که در مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>ابطال اقدامات اداری</u></strong></a>» توضیح داده شده، اقدامات اداری که حداقل یکی از عناصر هدف، موضوع، علت، صلاحیت یا شکل آنها معیوب باشد می‌توانند توسط دادگاه ابطال شوند.\`,`,
    `p3: \`تصمیمات اداره درباره رد یا پذیرش درخواست \${permitLabel} اساساً اقدامات اداری هستند. بنابراین برای مشروعیت اقدامات اداری باید تمام عناصر لازم را داشته باشند. همان‌طور که در مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>ابطال اقدامات اداری</u></strong></a>» توضیح داده شده، اقدامات اداری که حداقل یکی از عناصر هدف، موضوع، علت، صلاحیت یا شکل آنها معیوب باشد می‌توانند توسط دادگاه ابطال شوند.</p>
<p>برای اطلاعات تفصیلی درباره این موضوع، مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi/"><strong><u>دادخواست ابطال تصمیم رد درخواست مجوز اقامت</u></strong></a>» را نیز ببینید.\`,`,
  ],
]);

// uzun-donem full faqExtra
const uzunFaq = {
  ar: `<p><strong>أين يُقدَّم طلب تصريح الإقامة طويل الأمد؟</strong></p>
<p>يمكن تقديم طلب تصريح الإقامة طويل الأمد عبر الإنترنت من خلال نظام e-Residence. ثم يجب على مقدم الطلب حجز موعد لدى مديرية الهجرة في المحافظة في المنطقة التي يريد الإقامة فيها.</p>
<p><strong>هل يجوز لحاملي تصريح الإقامة طويل الأمد العمل في Türkiye؟</strong></p>
<p>لا يجوز للأجانب الحاملين لتصريح إقامة طويل الأمد العمل في Türkiye دون الحصول على تصريح عمل منفصل.</p>
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
  const re = new RegExp(`    ${loc}: \`<p><strong>[^\\`]+`, "s");
  const start = uzun.indexOf(`    ${loc}: \``, uzun.indexOf("function faqExtra"));
  if (start === -1) continue;
  const end = uzun.indexOf("`,", start + 15);
  const old = uzun.slice(start, end + 2);
  uzun = uzun.replace(old, `    ${loc}: \`${uzunFaq[loc]}\`,`);
}
uzun = uzun.replaceAll("نظام وظیfe", "نظام وظیfe");
uzun = uzun.replaceAll("remedi", "راهکار");
fs.writeFileSync(path.join(root, "scripts/batch1-data/uzun-donem-oturma-izni-ikamet-izni-nasil-alinir.mjs"), uzun);
console.log("patched uzun-donem faqExtra");

console.log("Done.");
