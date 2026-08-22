import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Ç-152 Restriction Code",
    content: "<p>The Ç-152 restriction code temporarily blocks foreign nationals from entering Türkiye for a set period. Entry is possible only after removal through objection or annulment action.</p>",
  },
  {
    title: "What Is the Ç-152 Restriction Code?",
    content: "<p>Ç-152 is a precautionary code blocking entry to Türkiye for a period set by the administration, generally <strong>1 year</strong>. The foreign national is informed at border gates or through domestic notification.</p>",
  },
  {
    title: "Why Is the Ç-152 Restriction Code Imposed?",
    content: "<p>Ç-152 is imposed to ban entry to Türkiye. Without legal remedies, the foreign national cannot enter for the validity period of the code.</p>",
  },
  {
    title: "How Is the Ç-152 Restriction Code Removed?",
    content: "<p>Ç-152 and the entry ban may be removed by objection or annulment action. If deportation was ordered, deportation annulment is also required.</p><p>Legal grounds must be clearly shown. The process involves many procedural steps; consulting a specialist foreign nationals lawyer is advisable.</p>Removal by Administrative Objection<p>Within <strong>60 days</strong> from notification, reasoned objection is filed with the Presidency of Migration Management. Implied refusal after <strong>30 days</strong> allows annulment action. Direct court action is possible; after court action, objection is not.</p>Annulment Action to Remove the Code<p>Annulment action is brought within <strong>60 days</strong> against the Presidency. Missing the deadline leads to dismissal. If objection was filed first, the period until objection counts toward 60 days. Appeal is available if dismissed.</p><p>See \"foreign restriction codes and annulment actions\".</p>Entry Through Annotated Visa<p>A foreign national with a one-year ban may enter for the annotated visa period. Applications are made at Turkish foreign missions. See \"what is an annotated visa and how to obtain one\".</p>",
  },
  {
    title: "Annulment Action Against Deportation Decision",
    content: "<p>If deportation was ordered because of Ç-152, separate annulment action must be brought within <strong>7 days</strong>. Deportation may occur before the period expires.</p><p>The court decision is final; appeal and cassation are not available, but individual application to the Constitutional Court with a stay request is possible.</p><p>Code annulment does not automatically suspend enforcement; stay of execution must be requested separately. Deportation annulment automatically suspends deportation.</p><p>Release from detention requires separate objection to administrative detention. See \"how to lift a deportation decision\".</p>Objection to Administrative Detention<p>Detention may last up to <strong>6 months</strong>, extendable. Objection is made to the criminal peace judgeship of the governorship province.</p>",
  },
  {
    title: "How Long Does Removal of the Ç-152 Code Take?",
    content: "<p>Objections take <strong>1-3 months</strong>. Code annulment actions take approximately <strong>1 year</strong>. Deportation annulment is legally 15 days but in practice <strong>4-6 months</strong>. Weak reasoning, missing documents, or appeal extend timelines.</p>",
  },
  {
    title: "Court Fees and Costs for Removing the Ç-152 Code",
    content: "<p>Litigation costs to remove the Ç-152 restriction code are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities. Constitutional Court individual application fee is <strong>2,220.60 TL</strong>.</p>New Case Postage Fee580 TLNew Case (with stay of execution)588 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLAppeal Fee738 TL",
  },
  {
    title: "Competent and Authorized Court for Removing a Restriction Code",
    content: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>Foreign nationals with Ç-152 must use legal remedies to remove the code and regain entry. Because the administration has broad discretion, legally sound reasoning is essential. Consulting a specialist foreign nationals lawyer is advisable.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "Ç-152",
    content: "<p>حظر دخول مؤقت. الإزالة بالطعن أو دعوى الإلغاء.</p>",
  },
  {
    title: "ما هو؟",
    content: "<p>حظر <strong>سنة</strong> احترازي.</p>",
  },
  {
    title: "لماذا؟",
    content: "<p>منع الدخول إلى Türkiye.</p>",
  },
  {
    title: "كيف تُزال؟",
    content: "<p>طعن <strong>60 يوماً</strong> أو دعوى.</p>",
  },
  {
    title: "دعوى الترحيل",
    content: "<p>خلال <strong>7 أيام</strong>. قرار نهائي.</p>",
  },
  {
    title: "المدة",
    content: "<p>طعن <strong>1-3 أشهر</strong>. دعوى <strong>سنة</strong>.</p>",
  },
  {
    title: "التكاليف",
    content: "<p>تكاليف Ç-152 نحو <strong>4,000 ليرة</strong> (2023). الطعن الفردي <strong>2,220.60 ليرة</strong>.</p>580 ليرة588 ليرة269.85 ليرة269.85 ليرة444.60 ليرة444.60 ليرة738 ليرة",
  },
  {
    title: "المحكمة",
    content: "<p>أنقرة. محافظة الوالي.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>أسباب قانونية واستشارة محامٍ.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Ç-152",
    content: "<p>Временная блокировка въезда.</p>",
  },
  {
    title: "Что это?",
    content: "<p>Запрет обычно на <strong>1 год</strong>.</p>",
  },
  {
    title: "Почему?",
    content: "<p>Блокировка въезда в Türkiye.</p>",
  },
  {
    title: "Как снять?",
    content: "<p>Возражение <strong>60 дней</strong> или иск.</p>",
  },
  {
    title: "Выдворение",
    content: "<p>За <strong>7 дней</strong>.</p>",
  },
  {
    title: "Срок",
    content: "<p><strong>1-3 месяца</strong> / <strong>1 год</strong>.</p>",
  },
  {
    title: "Расходы",
    content: "<p>Расходы около <strong>4 000 TL</strong> (2023). КС <strong>2 220,60 TL</strong>.</p>580 TL588 TL269,85 TL269,85 TL444,60 TL444,60 TL738 TL",
  },
  {
    title: "Суд",
    content: "<p>Анкара.</p>",
  },
  {
    title: "Заключение",
    content: "<p>Нужно юридическое обоснование.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "Ç-152",
    content: "<p>ممنوعیت موقت ورود.</p>",
  },
  {
    title: "چیست؟",
    content: "<p>معمولاً <strong>1 سال</strong>.</p>",
  },
  {
    title: "چرا؟",
    content: "<p>ممنوعیت ورود به Türkiye.</p>",
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
    content: "<p><strong>1-3 ماه</strong> / <strong>1 سال</strong>.</p>",
  },
  {
    title: "هزینه",
    content: "<p>هزینه Ç-152 حدود <strong>4,000 لیر</strong> (2023). شکایت فردی <strong>2,220.60 لیر</strong>.</p>580 لیر588 لیر269.85 لیر269.85 لیر444.60 لیر444.60 لیر738 لیر",
  },
  {
    title: "دادگاه",
    content: "<p>آنکارا.</p>",
  },
  {
    title: "نتیجه",
    content: "<p>استدلال حقوقی و وکیل متخصص.</p>",
  }
];

export const contentSlug = "c-152-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Ç-152 Restriction Code",
    excerpt: "The Ç-152 restriction code is imposed to temporarily block foreign nationals from entering Türkiye for a set period. Entry is possible only after removal through objection or annulment action, or with an annotated visa.",
    shortDescription: "Ç-152 is a precautionary one-year entry ban that may be challenged through objection, annulment action, or annotated visa.",
    heroTitle: "Ç-152 Restriction Code",
    heroSubtitle: "Learn what the Ç-152 precautionary entry ban means, its one-year duration, and removal through legal remedies.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمز التقييد Ç-152",
    excerpt: "Ç-152 لمنع دخول الأجانب مؤقتاً. حظر سنة واحدة عادة.",
    shortDescription: "Ç-152 حظر احترازي للدخول يمكن الطعن فيه.",
    heroTitle: "رمز التقييد Ç-152",
    heroSubtitle: "Ç-152 وحظر الدخول الاحترازي.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Код ограничения Ç-152",
    excerpt: "Ç-152 для временной блокировки въезда иностранцев. Обычно 1 год.",
    shortDescription: "Ç-152 превентивный запрет въезда, оспариваемый в суде.",
    heroTitle: "Код Ç-152",
    heroSubtitle: "Ç-152: превентивный запрет въезда.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کد محدودیت Ç-152",
    excerpt: "Ç-152 برای ممنوعیت موقت ورود خارجیان.",
    shortDescription: "Ç-152 ممنوعیت احتیاطی یک‌ساله ورود.",
    heroTitle: "کد Ç-152",
    heroSubtitle: "Ç-152: ممنوعیت احتیاطی ورود.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
