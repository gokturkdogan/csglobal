import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Ç-149 Restriction Code",
    content: "<p>The Ç-149 restriction code blocks entry for foreign nationals suspected of links to conflict zones or likely to travel to such areas. Persons with Ç-149 may object, bring annulment action, or obtain an annotated visa. If deportation exists, deportation annulment is also required.</p>",
  },
  {
    title: "What Is the Ç-149 Restriction Code?",
    content: "<p>Ç-149 is imposed by border personnel on foreigners assessed as a public security threat. Entry to Türkiye is banned for <strong>5 years</strong>.</p>",
  },
  {
    title: "Why Is the Ç-149 Restriction Code Imposed?",
    content: "<p>Ç-149 is imposed following risk analysis when a foreign national is suspected of links to conflict zones or likely to travel to such areas, to block entry to Türkiye.</p>",
  },
  {
    title: "How Is the Ç-149 Restriction Code Removed?",
    content: "<p>Ç-149 may be removed by <strong>administrative objection</strong> or <strong>annulment action</strong>, or entry is possible with an <strong>annotated visa</strong>.</p>Removal by Administrative Objection<p>Within <strong>60 days</strong> from notification, reasoned objection is filed with the Directorate General of Migration Management. Implied refusal after 30 days allows annulment action. Direct court action without objection is possible.</p><p><strong>NOTE: </strong>Objection suspends the 60-day annulment period.</p>Removal by Annulment Action<p>Annulment action is brought within <strong>60 days</strong> against the Presidency of Migration Management. Period between notification and objection is deducted if objection was filed first.</p><p>Stay of execution may be requested with concrete unlawfulness grounds. See \"foreign restriction codes and annulment actions\".</p>Entry Through Annotated Visa<p>Entry is possible with an annotated visa. See \"what is an annotated visa and how to obtain one\".</p>",
  },
  {
    title: "Removal of Deportation Decision",
    content: "<p>Deportation may also be ordered. Separate annulment action must be brought within <strong>7 days</strong> before the administrative court of the governorship province. Act immediately because deportation may occur before the period expires.</p><p>Cancellation of the code may be requested in the deportation petition. See \"how to lift a deportation decision\".</p>Objection to Administrative Detention<p>Administrative detention may last up to <strong>6 months</strong>, extendable in special cases. Objection is made to the criminal peace judgeship. See \"objection to administrative detention in a removal centre\".</p>",
  },
  {
    title: "How Long Does Removal of a Restriction Code Take?",
    content: "<p>Objections conclude in <strong>1-3 months</strong>. Annulment actions take approximately <strong>1 year</strong>.</p>",
  },
  {
    title: "Court Fees and Costs for Removing a Restriction Code",
    content: "<p>Litigation costs to remove the Ç-149 restriction code are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities.</p>New Case Postage Fee580 TLNew Case (with stay of execution)588 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLAppeal Fee738 TL",
  },
  {
    title: "Competent and Authorized Court for Removing a Restriction Code",
    content: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>In Ç-149 objections and actions, grounds for the code must be clearly refuted and statutory deadlines observed. Otherwise deportation or continued entry ban may follow. Consulting a specialist foreign nationals lawyer is advisable.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "Ç-149",
    content: "<p>لمن يُشتبه بارتباطهم بمناطق نزاع. حظر <strong>5 سنوات</strong>.</p>",
  },
  {
    title: "ما هو؟",
    content: "<p>يُفرض عند الحدود لأسباب الأمن العام.</p>",
  },
  {
    title: "لماذا؟",
    content: "<p>تحليل المخاطر وارتباط محتمل بمناطق نزاع.</p>",
  },
  {
    title: "كيف تُزال؟",
    content: "<p>طعن <strong>60 يوماً</strong> أو دعوى. تأشيرة مشروحة.</p>",
  },
  {
    title: "إلغاء الترحيل",
    content: "<p>خلال <strong>7 أيام</strong>. مراقبة حتى <strong>6 أشهر</strong>.</p>",
  },
  {
    title: "المدة",
    content: "<p>طعن <strong>1-3 أشهر</strong>. دعوى <strong>سنة</strong>.</p>",
  },
  {
    title: "التكاليف",
    content: "<p>تكاليف Ç-149 نحو <strong>4,000 ليرة</strong> (2023).</p>580 ليرة588 ليرة269.85 ليرة269.85 ليرة444.60 ليرة444.60 ليرة738 ليرة",
  },
  {
    title: "المحكمة",
    content: "<p>أنقرة. محافظة الوالي.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>إثبات عدم وجود أسباب ومراعاة المهل.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Ç-149",
    content: "<p>Запрет въезда на <strong>5 лет</strong> при подозрении связи с зонами конфликта.</p>",
  },
  {
    title: "Что это?",
    content: "<p>Код пограничной службы по угрозе безопасности.</p>",
  },
  {
    title: "Почему?",
    content: "<p>Анализ рисков и подозрение связи с зонами конфликта.</p>",
  },
  {
    title: "Как снять?",
    content: "<p>Возражение за <strong>60 дней</strong> или иск.</p>",
  },
  {
    title: "Выдворение",
    content: "<p>Иск за <strong>7 дней</strong>. Задержание до <strong>6 месяцев</strong>.</p>",
  },
  {
    title: "Срок",
    content: "<p>Возражение <strong>1-3 месяца</strong>. Иск <strong>1 год</strong>.</p>",
  },
  {
    title: "Расходы",
    content: "<p>Расходы около <strong>4 000 TL</strong> (2023).</p>580 TL588 TL269,85 TL269,85 TL444,60 TL444,60 TL738 TL",
  },
  {
    title: "Суд",
    content: "<p>Анкара. Провинция для выдворения.</p>",
  },
  {
    title: "Заключение",
    content: "<p>Нужны конкретные доводы и соблюдение сроков.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "Ç-149",
    content: "<p>ممنوعیت ورود <strong>5 سال</strong> برای ارتباط مشکوک با مناطق درگیری.</p>",
  },
  {
    title: "چیست؟",
    content: "<p>کد مرزی برای تهدید امنیت عمومی.</p>",
  },
  {
    title: "چرا؟",
    content: "<p>تحلیل ریسک و ارتباط احتمالی با مناطق درگیری.</p>",
  },
  {
    title: "رفع",
    content: "<p>اعتراض <strong>60 روز</strong> یا دعوا.</p>",
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
    title: "هزینه",
    content: "<p>هزینه حدود <strong>4,000 لیر</strong> (2023).</p>580 لیر588 لیر269.85 لیر269.85 لیر444.60 لیر444.60 لیر738 لیر",
  },
  {
    title: "دادگاه",
    content: "<p>آنکارا.</p>",
  },
  {
    title: "نتیجه",
    content: "<p>رد علل کد و رعایت مهلت‌ها.</p>",
  }
];

export const contentSlug = "c-149-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Ç-149 Restriction Code",
    excerpt: "The Ç-149 restriction code blocks entry for foreign nationals suspected of links to conflict zones or likely to travel to such areas. It may be removed by objection, annulment action, or annotated visa. Deportation annulment may also be required.",
    shortDescription: "Ç-149 is imposed at border gates for conflict-zone related security assessments and bans entry for five years.",
    heroTitle: "Ç-149 Restriction Code",
    heroSubtitle: "Learn what the Ç-149 restriction code means, why border authorities impose it, and how to remove it through legal remedies.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمز التقييد Ç-149",
    excerpt: "Ç-149 لمن يُشتبه بارتباطهم بمناطق نزاع. حظر دخول 5 سنوات. إزالة بالطعن أو دعوى الإلغاء.",
    shortDescription: "Ç-149 عند الحدود لأسباب أمنية مرتبطة بمناطق الصراع.",
    heroTitle: "رمز التقييد Ç-149",
    heroSubtitle: "معنى Ç-149 وإزالته.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Код ограничения Ç-149",
    excerpt: "Ç-149 для лиц, подозреваемых в связях с зонами конфликта. Запрет въезда на 5 лет.",
    shortDescription: "Ç-149 на границе по оценке рисков, связанных с зонами конфликта.",
    heroTitle: "Код Ç-149",
    heroSubtitle: "Код Ç-149: основания и снятие.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کد محدودیت Ç-149",
    excerpt: "Ç-149 برای افراد مشکوک به ارتباط با مناطق درگیری.",
    shortDescription: "Ç-149 در مرز برای ارزیابی امنیتی مناطق درگیری.",
    heroTitle: "کد Ç-149",
    heroSubtitle: "کد Ç-149: معنا و رفع.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
