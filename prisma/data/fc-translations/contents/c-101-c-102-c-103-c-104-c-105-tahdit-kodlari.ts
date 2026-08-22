import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Ç-101, Ç-102, Ç-103, Ç-104, Ç-105 Restriction Codes",
    content: "<p>Ç-101 to Ç-105 restriction codes are administrative measures for foreign nationals who violate visa, visa exemption, work permit, or residence permit rules. They may be removed by administrative objection or annulment action. Entry may still be possible with an annotated visa. If deportation is ordered, deportation annulment must also be pursued.</p>",
  },
  {
    title: "What Are the Ç-101 to Ç-105 Restriction Codes?",
    content: "<p>These codes are imposed for violations of visa, visa exemption, work permit, or residence permit rules.</p>What Is the Ç-101 Code?<p>Ç-101 imposes a <strong>3-month</strong> entry ban. It applies to:</p><ul>\n<li>Foreign nationals deported for visa, exemption, work permit, or residence violations,</li>\n<li>Those who overstayed more than 10 days and came to the border to exit without paying fines without deportation,</li>\n<li>Those with violations from more than 10 days (day 10 excluded) up to 3 months.</li>\n</ul>What Is the Ç-102 Code?<p>Ç-102 imposes a <strong>6-month</strong> ban for similar grounds with violations from 3 months (inclusive) to 6 months.</p>What Is the Ç-103 Code?<p>Ç-103 imposes a <strong>1-year</strong> ban for violations from 6 months (inclusive) to 1 year.</p>What Is the Ç-104 Code?<p>Ç-104 imposes a <strong>2-year</strong> ban for violations from 1 year (inclusive) to 2 years.</p>What Is the Ç-105 Code?<p>Ç-105 imposes a <strong>5-year</strong> ban for violations exceeding 2 years.</p>",
  },
  {
    title: "What Is the Difference Between Ç-101 to Ç-105 Codes?",
    content: "<p>The difference lies in the duration of violation or overstay. Otherwise grounds are essentially the same.</p><p>Code/Entry ban duration and violation period:</p><p>Ç-101 / 3 months: 10 days to 3 months (day 10 excluded)</p><p>Ç-102 / 6 months: 3 to 6 months (3 months inclusive)</p><p>Ç-103 / 1 year: 6 months to 1 year (6 months inclusive)</p><p>Ç-104 / 2 years: 1 to 2 years (1 year inclusive)</p><p>Ç-105 / 5 years: more than 2 years</p>",
  },
  {
    title: "How Are Ç-101 to Ç-105 Codes Removed?",
    content: "<p>Codes may be removed by <strong>administrative application or annulment action</strong>. Entry is also possible with an <strong>annotated visa</strong>.</p>Removal by Administrative Objection<p>Within <strong>60 days</strong> from notification, objection is filed to the <strong>Presidency of Migration Management</strong> with a petition proving no violation or overstay.</p><p>The administration decides within 30 days. Silence or unclear response is implied refusal. Objection suspends the annulment period.</p>Removal by Annulment Action<p>Direct action within <strong>60 days</strong> without prior objection is possible; after direct action, objection is not available.</p><p>If objection was filed first, time until objection is deducted from 60 days.</p><p>Stay of execution may be requested. See \"foreign restriction codes and annulment actions\".</p>Entry Through Annotated Visa<p>Annotated visa allows entry despite the code and ban. See \"annotated visa\".</p>",
  },
  {
    title: "Removal of Deportation Decision",
    content: "<p>Deportation may accompany restriction codes. Annulment action must be brought within <strong>7 days</strong> before the administrative court of the governorship province.</p><p>Act quickly; deportation may proceed before seven days expire.</p><p>Deportation and code cancellation may be requested together.</p>Objection to Administrative Detention<p>Objection to the criminal peace judgeship of the governorship province or place of detention.</p>",
  },
  {
    title: "How Long Does Removal of Ç-101 to Ç-105 Take?",
    content: "<p>Annulment actions take approximately <strong>1 year</strong>. Objections take <strong>1-3 months</strong>.</p>",
  },
  {
    title: "Court Fees and Costs for Removing Ç-101 to Ç-105",
    content: "<p>Litigation costs to remove Ç-101 to Ç-105 codes average approximately <strong>4,000 TL</strong> for 2023.</p>New Case Postage Fee580 TLNew Case (with stay of execution)812 TLApplication Fee296.85 TLDecision Fee296.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLAppeal Fee738 TL",
  },
  {
    title: "Competent Court for Removing a Restriction Code",
    content: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>Ç-101 to Ç-105 codes apply to visa and permit violations. Removal requires objection, annulment action, or annotated visa while observing legal deadlines and proper petitions. Consult a specialist foreign nationals lawyer from the outset.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "رموز التقييد Ç-101 إلى Ç-105",
    content: "<p>إجراءات إدارية لمخالفة قواعد التأشيرة أو الإعفاء أو تصريح العمل أو الإقامة. تُزال بالطعن أو دعوى الإلغاء. الدخول ممكن بتأشيرة مشروحة.</p>",
  },
  {
    title: "ما هي رموز Ç-101 إلى Ç-105؟",
    content: "<p>Ç-101: حظر <strong>3 أشهر</strong>. Ç-102: <strong>6 أشهر</strong>. Ç-103: <strong>سنة</strong>. Ç-104: <strong>سنتان</strong>. Ç-105: <strong>5 سنوات</strong> حسب مدة المخالفة.</p>",
  },
  {
    title: "ما الفرق بين الرموز؟",
    content: "<p>الفرق في مدة المخالفة أو التجاوز. Ç-101 / 3 أشهر: 10 أيام إلى 3 أشهر. Ç-102 / 6 أشهر: 3-6 أشهر. Ç-103 / سنة: 6 شهر-سنة. Ç-104 / سنتان: 1-2 سنة. Ç-105 / 5 سنوات: أكثر من سنتين.</p>",
  },
  {
    title: "كيف تُزال الرموز؟",
    content: "<p>بالطعن الإداري أو دعوى الإلغاء خلال <strong>60 يوماً</strong> لدى رئاسة إدارة الهجرة. الطعن يوقف مهلة الدعوى.</p><p>الدخول بتأشيرة مشروحة ممكن.</p>",
  },
  {
    title: "رفع قرار الترحيل",
    content: "<p>دعوى إلغاء خلال <strong>7 أيام</strong>. يمكن طلب إلغاء الترحيل والرمز معاً.</p>",
  },
  {
    title: "كم تستغرق الإزالة؟",
    content: "<p>الدعوى نحو <strong>سنة</strong>. الطعن <strong>1-3 أشهر</strong>.</p>",
  },
  {
    title: "رسوم ومصاريف الإزالة",
    content: "<p>متوسط تكاليف رفع دعوى إزالة رموز Ç-101 إلى Ç-105 نحو <strong>4,000 ليرة</strong> لعام 2023.</p>رسوم بريد580 ليرةدعوى مع وقف812 ليرةرسوم الطلب296.85 ليرةرسوم الحكم296.85 ليرةوقف التنفيذ444.60 ليرةإثبات الدليل444.60 ليرةالاستئناف738 ليرة",
  },
  {
    title: "المحكمة المختصة",
    content: "<p>المحكمة الإدارية المختصة لإزالة رمز التقييد هي محاكم أنقرة الإدارية. ولإلغاء قرارات الترحيل المبنية على رمز التقييد، تكون المحكمة الإدارية في محافظة الوالي الذي أصدر قرار الترحيل.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>احترموا المواعيد والأسانيد القانونية. استشارة محامٍ متخصص مهمة.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Коды Ç-101 - Ç-105",
    content: "<p>Административные меры за нарушения визовых и миграционных правил. Снятие через возражение или иск. Въезд по аннотированной визе возможен.</p>",
  },
  {
    title: "Что такое коды Ç-101 - Ç-105?",
    content: "<p>Ç-101: запрет <strong>3 месяца</strong>. Ç-102: <strong>6 месяцев</strong>. Ç-103: <strong>1 год</strong>. Ç-104: <strong>2 года</strong>. Ç-105: <strong>5 лет</strong>.</p>",
  },
  {
    title: "В чем разница?",
    content: "<p>Разница в длительности нарушения. Ç-101: 10 дней - 3 месяца. Ç-102: 3-6 месяцев. Ç-103: 6 месяцев - 1 год. Ç-104: 1-2 года. Ç-105: свыше 2 лет.</p>",
  },
  {
    title: "Как снять коды?",
    content: "<p>Возражение или иск в течение <strong>60 дней</strong> в Президентство по делам миграции. Возражение приостанавливает срок иска.</p>",
  },
  {
    title: "Отмена выдворения",
    content: "<p>Иск в течение <strong>7 дней</strong>. Можно требовать отмены выдворения и кода.</p>",
  },
  {
    title: "Сколько длится снятие?",
    content: "<p>Иск около <strong>1 года</strong>. Возражение <strong>1-3 месяца</strong>.</p>",
  },
  {
    title: "Судебные расходы",
    content: "<p>Судебные расходы по снятию кодов Ç-101 - Ç-105 в среднем около <strong>4 000 TL</strong> за 2023 год.</p>Почта580 TLИск с обеспечением812 TLЗаявление296,85 TLРешение296,85 TLОбеспечение444,60 TLДоказательства444,60 TLАпелляция738 TL",
  },
  {
    title: "Компетентный суд",
    content: "<p>Компетентный административный суд для снятия кода ограничения - административные суды Анкары. Для отмены решений о выдворении на основании кода ограничения компетентен административный суд провинции, где находится губернаторство, вынесшее решение.</p>",
  },
  {
    title: "Заключение",
    content: "<p>Соблюдайте сроки и правовые основания. Рекомендуется консультация адвоката.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "کدهای Ç-101 تا Ç-105",
    content: "<p>اقدامات اداری برای نقض قوانین ویزا و مجوز. رفع با اعتراض یا دعوای ابطال. ورود با ویزای مشروح ممکن است.</p>",
  },
  {
    title: "کدهای Ç-101 تا Ç-105 چیست؟",
    content: "<p>Ç-101: <strong>3 ماه</strong>. Ç-102: <strong>6 ماه</strong>. Ç-103: <strong>1 سال</strong>. Ç-104: <strong>2 سال</strong>. Ç-105: <strong>5 سال</strong>.</p>",
  },
  {
    title: "تفاوت کدها چیست؟",
    content: "<p>تفاوت در مدت تخلف است. Ç-101: 10 روز تا 3 ماه. Ç-102: 3-6 ماه. Ç-103: 6 ماه تا 1 سال. Ç-104: 1-2 سال. Ç-105: بیش از 2 سال.</p>",
  },
  {
    title: "چگونه کدها رفع می‌شوند؟",
    content: "<p>اعتراض یا دعوای ابطال ظرف <strong>60 روز</strong> نزد ریاست مدیریت مهاجرت.</p>",
  },
  {
    title: "رفع تصمیم اخراج",
    content: "<p>دعوای ابطال ظرف <strong>7 روز</strong>.</p>",
  },
  {
    title: "رفع کدها چقدر طول می‌کشد؟",
    content: "<p>دعوا حدود <strong>1 سال</strong>. اعتراض <strong>1-3 ماه</strong>.</p>",
  },
  {
    title: "هزینه‌های دعوا",
    content: "<p>هزینه دعوای رفع کدهای Ç-101 تا Ç-105 حدود <strong>4,000 لیر</strong> در 2023.</p>پست580 لیردعوای توقف812 لیرحق طرح296.85 لیرحق حکم296.85 لیرتوقف اجرا444.60 لیرتعیین دلیل444.60 لیرتجدیدنظر738 لیر",
  },
  {
    title: "دادگاه صالح",
    content: "<p>دادگاه اداری صالح برای رفع کد محدودیت، دادگاه‌های اداری آنکارا است. برای ابطال تصمیم اخراج مبتنی بر کد محدودیت، دادگاه اداری استان والی صادرکننده تصمیم صالح است.</p>",
  },
  {
    title: "نتیجه‌گیری",
    content: "<p>رعایت مواعد و لایحه حقوقی ضروری است. مشورت با وکیل متخصص توصیه می‌شود.</p>",
  }
];

export const contentSlug = "c-101-c-102-c-103-c-104-c-105-tahdit-kodlari";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Ç-101, Ç-102, Ç-103, Ç-104, Ç-105 Restriction Codes",
    excerpt: "Ç-101 to Ç-105 restriction codes are administrative measures imposed on foreign nationals who violate visa, visa exemption, work permit, or residence permit rules. This guide explains each code, entry ban durations, removal procedures, deportation remedies, and annotated visa options.",
    shortDescription: "Ç-101 through Ç-105 codes impose graduated entry bans from 3 months to 5 years for violations of visa, visa exemption, work permit, or residence permit rules in Türkiye.",
    heroTitle: "Ç-101 to Ç-105 Restriction Codes",
    heroSubtitle: "Understand visa and permit violation restriction codes Ç-101 to Ç-105, their entry ban periods, and how to remove them through objection, annulment action, or annotated visa.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رموز التقييد Ç-101 إلى Ç-105",
    excerpt: "رموز Ç-101 إلى Ç-105 إجراءات إدارية على من يخالفون قواعد التأشيرة أو الإعفاء أو تصريح العمل أو الإقامة. يشرح الدليل كل رمز ومدة الحظر وإجراءات الإزالة.",
    shortDescription: "رموز Ç-101 إلى Ç-105 تفرض حظر دخول متدرجاً من 3 أشهر إلى 5 سنوات لمخالفات التأشيرة أو الإعفاء أو تصريح العمل أو الإقامة في Türkiye.",
    heroTitle: "رموز التقييد Ç-101 إلى Ç-105",
    heroSubtitle: "افهم رموز مخالفة التأشيرة والتصريح Ç-101 إلى Ç-105 ومدد حظر الدخول وكيفية إزالتها.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Коды ограничения Ç-101 - Ç-105",
    excerpt: "Коды Ç-101 - Ç-105 налагаются за нарушения правил визы, визового освобождения, разрешения на работу или ВНЖ.",
    shortDescription: "Коды Ç-101 - Ç-105 устанавливают запрет въезда от 3 месяцев до 5 лет за нарушения визовых и миграционных правил в Türkiye.",
    heroTitle: "Коды ограничения Ç-101 - Ç-105",
    heroSubtitle: "Поймите коды нарушений визы и разрешений, сроки запрета въезда и способы снятия.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کدهای محدودیت Ç-101 تا Ç-105",
    excerpt: "کدهای Ç-101 تا Ç-105 برای نقض قوانین ویزا، معافیت ویزا، مجوز کار یا اقامت وضع می‌شوند.",
    shortDescription: "کدهای Ç-101 تا Ç-105 ممنوعیت ورود از 3 ماه تا 5 سال برای تخلفات ویزا و مجوز در Türkiye اعمال می‌کنند.",
    heroTitle: "کدهای محدودیت Ç-101 تا Ç-105",
    heroSubtitle: "کدهای تخلف ویزا و مجوز، مدت ممنوعیت ورود و نحوه رفع را بشناسید.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
