import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Ç-117 and Ç-119 Restriction Codes",
    content: "<p>The Ç-117 restriction code applies to foreigners working illegally in Türkiye. The Ç-119 code applies to foreigners fined for illegal work who fail to pay the fine. These codes lead to deportation and time-limited entry bans. They may be removed by objection, annulment action, or annotated visa.</p>",
  },
  {
    title: "What Are the Ç-117 and Ç-119 Restriction Codes?",
    content: "<p>Ç-117 and Ç-119 are restriction codes for foreigners working in Türkiye without authorisation. Illegal workers are deported, face a one-year entry ban, and an administrative fine. Ç-119 is imposed when the fine is not paid.</p>What Is the Ç-117 Restriction Code?<p>Ç-117 is imposed when unauthorised work is detected. It triggers deportation, a one-year entry ban, and an administrative fine.</p>What Is the Ç-119 Restriction Code?<p>Ç-119 is imposed when a foreign national fined for unauthorised work fails to pay. It leads to deportation and a <strong>5-year</strong> entry ban.</p>",
  },
  {
    title: "Why Are the Ç-117 and Ç-119 Restriction Codes Imposed?",
    content: "<p>Ç-117 is imposed when unauthorised work in Türkiye is detected. Ç-119 is imposed when the administrative fine for unauthorised work is not paid.</p>",
  },
  {
    title: "How Are the Ç-117 and Ç-119 Restriction Codes Removed?",
    content: "<p>Both codes may be removed by <strong>administrative objection</strong> or <strong>annulment action</strong> before the administrative court. Entry is also possible with an <strong>annotated visa</strong>.</p>Removal by Administrative Objection<p>Objection is filed with the <strong>Presidency of Migration Management</strong> within <strong>60 days</strong> from notification of the code or deportation decision. The petition must state grounds and supporting documents. For Ç-117, the foreign national must prove non-employment or lawful work under a valid permit.</p><p>The administration decides within 30 days. Silence or unclear response constitutes implied refusal. Direct annulment action without objection is also possible.</p><p><strong>NOTE: </strong>Objection to the Presidency suspends the annulment period.</p>Removal by Annulment Action<p>Annulment action may be brought within <strong>60 days</strong> from notification. A single petition may challenge both codes. Stay of execution may be requested.</p><p>See \"foreign restriction codes and annulment actions\".</p>Entry Through Annotated Visa<p>Entry is possible with an annotated visa even if the ban remains. See \"what is an annotated visa and how to obtain one\".</p>",
  },
  {
    title: "Removal of Deportation Decision",
    content: "<p>Deportation may also be ordered. Annulment action must be brought within <strong>7 days</strong> before the administrative court of the governorship province.</p><p>Action must be swift because deportation may occur before the period expires. Cancellation of both deportation and the code may be requested.</p><p>Consult a specialist foreign nationals lawyer. See \"how to lift a deportation decision\".</p>Objection to Administrative Detention<p>Separate objection to administrative detention is required at the <strong>criminal peace judgeship</strong> to leave a removal centre during proceedings.</p>",
  },
  {
    title: "How Long Does Removal of Ç-117 and Ç-119 Take?",
    content: "<p>Objections take approximately <strong>1-3 months</strong>. Annulment actions take approximately <strong>1 year</strong>.</p>",
  },
  {
    title: "Attorney Fees and Litigation Costs for Removing Ç-117 and Ç-119",
    content: "<p>Litigation costs to remove Ç-117 and Ç-119 restriction codes are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities.</p><p>From <strong>10 July 2023</strong>, the costs are shown below.</p>New Case Postage Fee580 TLNew Case (with hearing)696 TLNew Case (with stay of execution)812 TLNew Case (with hearing and stay)928 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLRegional Appeal Fee738 TL",
  },
  {
    title: "Competent and Authorized Court for Removing a Restriction Code",
    content: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>Removing Ç-117 and Ç-119 involves many procedural steps. Deadlines must be observed and petitions must be reasoned. Otherwise the code may remain or deportation may proceed. Consulting a specialist foreign nationals lawyer is advisable.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "رمزا Ç-117 وÇ-119",
    content: "<p>Ç-117 للعمل بلا تصريح. Ç-119 عند عدم دفع الغرامة. يؤديان إلى الترحيل وحظر الدخول.</p>",
  },
  {
    title: "ما هما الرمزان؟",
    content: "<p>للعمل غير المصرح به. Ç-117: ترحيل وحظر سنة وغرامة. Ç-119: عند عدم الدفع وحظر <strong>5 سنوات</strong>.</p>",
  },
  {
    title: "لماذا يُفرضان؟",
    content: "<p>Ç-117 عند اكتشاف عمل بلا تصريح. Ç-119 عند عدم دفع الغرامة.</p>",
  },
  {
    title: "كيف تُزال؟",
    content: "<p>بالطعن أو دعوى الإلغاء أو تأشيرة مشروحة.</p>الطعن<p>إلى رئاسة إدارة الهجرة خلال <strong>60 يوماً</strong>.</p>دعوى الإلغاء<p>خلال <strong>60 يوماً</strong>. دعوى واحدة للرمزين ممكنة.</p>",
  },
  {
    title: "إلغاء قرار الترحيل",
    content: "<p>خلال <strong>7 أيام</strong>. يمكن طلب إلغاء الرمز أيضاً.</p>المراقبة الإدارية<p>طعن منفصل لدى محكمة الجنح.</p>",
  },
  {
    title: "مدة الإزالة",
    content: "<p>الطعن <strong>1-3 أشهر</strong>. الدعوى <strong>سنة</strong>.</p>",
  },
  {
    title: "التكاليف",
    content: "<p>تكاليف رفع دعاوى Ç-117 وÇ-119 نحو <strong>4,000 ليرة</strong> (2023).</p>بريد580 ليرةجلسة696 ليرةوقف812 ليرةجلسة ووقف928 ليرةطلب269.85 ليرةحكم269.85 ليرةوقف تنفيذ444.60 ليرةدليل444.60 ليرةاستئناف738 ليرة",
  },
  {
    title: "المحكمة المختصة",
    content: "<p>أنقرة للرمز. محافظة الوالي للترحيل.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>المواعيد والأسباب مهمة. استشارة محامٍ متخصص مفيدة.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Коды Ç-117 и Ç-119",
    content: "<p>Ç-117 за незаконную работу. Ç-119 при неуплате штрафа. Выдворение и запрет въезда.</p>",
  },
  {
    title: "Что это?",
    content: "<p>Ç-117: выдворение, запрет 1 год, штраф. Ç-119: неуплата штрафа, запрет <strong>5 лет</strong>.</p>",
  },
  {
    title: "Почему?",
    content: "<p>Ç-117 при незаконной работе. Ç-119 при неуплате штрафа.</p>",
  },
  {
    title: "Как снять?",
    content: "<p>Возражение или иск. Аннотированная виза.</p>Возражение<p>В Президентство за <strong>60 дней</strong>.</p>Иск<p>За <strong>60 дней</strong>. Один иск на оба кода возможен.</p>",
  },
  {
    title: "Отмена выдворения",
    content: "<p>За <strong>7 дней</strong>. Отдельное возражение против задержания.</p>",
  },
  {
    title: "Срок",
    content: "<p>Возражение <strong>1-3 месяца</strong>. Иск <strong>1 год</strong>.</p>",
  },
  {
    title: "Расходы",
    content: "<p>Расходы по снятию кодов Ç-117 и Ç-119 около <strong>4 000 TL</strong> (2023).</p>Почта580 TLЗаседание696 TLОбеспечение812 TLЗаседание и обеспечение928 TLЗаявление269,85 TLРешение269,85 TLОбеспечение444,60 TLДоказательства444,60 TLАпелляция738 TL",
  },
  {
    title: "Суд",
    content: "<p>Анкара для кода. Провинция для выдворения.</p>",
  },
  {
    title: "Заключение",
    content: "<p>Соблюдайте сроки. Консультация адвоката рекомендуется.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "کدهای Ç-117 و Ç-119",
    content: "<p>Ç-117 برای کار بدون مجوز. Ç-119 برای عدم پرداخت جریمه.</p>",
  },
  {
    title: "این کدها چیست؟",
    content: "<p>Ç-117: اخراج، ممنوعیت 1 سال، جریمه. Ç-119: عدم پرداخت، ممنوعیت <strong>5 سال</strong>.</p>",
  },
  {
    title: "چرا وضع می‌شوند؟",
    content: "<p>Ç-117 برای کار غیرمجاز. Ç-119 برای عدم پرداخت جریمه.</p>",
  },
  {
    title: "چگونه رفع می‌شوند؟",
    content: "<p>اعتراض یا دعوای ابطال. ویزای مشروح.</p>اعتراض<p>ظرف <strong>60 روز</strong> به ریاست مدیریت مهاجرت.</p>دعوا<p>ظرف <strong>60 روز</strong>.</p>",
  },
  {
    title: "ابطال اخراج",
    content: "<p>ظرف <strong>7 روز</strong>.</p>",
  },
  {
    title: "مدت",
    content: "<p>اعتراض <strong>1-3 ماه</strong>. دعوا <strong>1 سال</strong>.</p>",
  },
  {
    title: "هزینه‌ها",
    content: "<p>هزینه رفع کدهای Ç-117 و Ç-119 حدود <strong>4,000 لیر</strong> (2023).</p>پست580 لیرجلسه696 لیرتوقف812 لیرجلسه و توقف928 لیرطرح269.85 لیرحکم269.85 لیرتوقف444.60 لیردلیل444.60 لیرتجدید738 لیر",
  },
  {
    title: "دادگاه صالح",
    content: "<p>آنکارا برای کد. استان والی برای اخراج.</p>",
  },
  {
    title: "نتیجه",
    content: "<p>رعایت مهلت‌ها ضروری است.</p>",
  }
];

export const contentSlug = "c-117-c-119-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Ç-117 and Ç-119 Restriction Codes",
    excerpt: "The Ç-117 restriction code applies to foreigners working illegally in Türkiye. The Ç-119 code applies when an administrative fine for illegal work is not paid. Both codes lead to deportation and entry bans. They may be removed by objection, annulment action, or annotated visa.",
    shortDescription: "Ç-117 targets unauthorised work; Ç-119 applies when the related fine is unpaid. Both trigger deportation and entry bans of one or five years respectively.",
    heroTitle: "Ç-117 and Ç-119 Restriction Codes",
    heroSubtitle: "Understand illegal work restriction codes Ç-117 and Ç-119, their consequences, and removal through objection, annulment action, or annotated visa.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمزا التقييد Ç-117 وÇ-119",
    excerpt: "Ç-117 للعاملين بلا تصريح في Türkiye. Ç-119 عند عدم دفع الغرامة. يؤديان إلى الترحيل وحظر الدخول ويمكن إزالتهما بالطعن أو دعوى الإلغاء.",
    shortDescription: "Ç-117 للعمل غير المصرح به؛ Ç-119 عند عدم دفع الغرامة. الترحيل وحظر دخول سنة أو خمس سنوات.",
    heroTitle: "رمزا التقييد Ç-117 وÇ-119",
    heroSubtitle: "فهم رمزي العمل غير المصرح به وإزالتهما بالطعن أو دعوى الإلغاء أو التأشيرة المشروحة.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Коды ограничения Ç-117 и Ç-119",
    excerpt: "Ç-117 для незаконной работы в Türkiye. Ç-119 при неуплате штрафа. Ведут к выдворению и запрету въезда.",
    shortDescription: "Ç-117 за работу без разрешения; Ç-119 при неуплате штрафа. Запрет въезда на 1 или 5 лет.",
    heroTitle: "Коды Ç-117 и Ç-119",
    heroSubtitle: "Коды за незаконную работу: последствия и снятие через возражение, иск или аннотированную визу.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کدهای محدودیت Ç-117 و Ç-119",
    excerpt: "Ç-117 برای کار بدون مجوز در Türkiye. Ç-119 در صورت عدم پرداخت جریمه.",
    shortDescription: "Ç-117 برای کار غیرمجاز؛ Ç-119 برای عدم پرداخت جریمه. ممنوعیت ورود 1 یا 5 سال.",
    heroTitle: "کدهای Ç-117 و Ç-119",
    heroSubtitle: "کدهای کار غیرمجاز: عواقب و رفع از طریق اعتراض، دعوا یا ویزای مشروح.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
