import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "V-71 Restriction Code",
    content: "<p>The V-71 restriction code is imposed on foreign nationals who fail to report their address to official authorities within the legal period or report it falsely. V-71 may lead to refusal of work and residence permits and even deportation. The code may be removed by objection, annulment action, or annotated visa. Deportation may also be cancelled by annulment action.</p>",
  },
  {
    title: "What Is the V-71 Restriction Code?",
    content: "<p>V-71 is imposed on persons who fail to report their registered or declared address to official authorities within the legal period or report it falsely, including persons not found at the declared address.</p><p>After a work or residence permit is approved, foreign nationals must report their address to the population directorate within 20 days of arrival in Türkiye. The Presidency of Migration Management imposes V-71 for false or late address notification.</p><p>Residence and work permits are refused. If visa exemption has expired, the foreign national must leave within 10 days or face deportation. Leaving Türkiye within the exemption period avoids an entry ban; otherwise an overstay fine may apply.</p><p><strong>NOTE: </strong>False or late address notification also triggers an administrative fine. Failure to pay may lead to N-97. Pay fines promptly.</p>",
  },
  {
    title: "Why Is the V-71 Restriction Code Imposed?",
    content: "<p>V-71 is imposed when a foreign national with a work or residence permit is not found at the declared address or fails to notify the address in time.</p><p>Police investigate by questioning neighbours and local businesses and checking utility subscriptions. Subscriptions should match the declared address.</p><p>Address notification must be made within 20 days of arrival at district population directorates, foreign missions abroad, or relevant service providers.</p><p>Temporary travel does not require address change, but moving to another city must be reported to the provincial migration directorate.</p><p><strong>NOTE: </strong>Leaving Türkiye after overstaying with payment of the fine, or within the exemption period without fine, avoids an entry ban.</p>",
  },
  {
    title: "How Is the V-71 Restriction Code Removed?",
    content: "<p>V-71 may be removed by <strong>administrative objection</strong> or <strong>annulment action</strong>, or the foreign national may enter with an <strong>annotated visa</strong>.</p>Removal by Administrative Objection<p>Within <strong>60 days</strong> from notification, objection is filed with the <strong>Presidency of Migration Management</strong> with proof of address notification and residence at the declared address.</p><p>The Presidency decides within 30 days. Silence or unclear response constitutes refusal. Objection suspends the annulment period.</p><p>Direct annulment action without prior objection is possible; after direct action, objection is not available.</p>Removal by Annulment Action<p>Annulment action is brought within <strong>60 days</strong> against the Presidency. If objection was filed first, the period between notification and objection is deducted.</p><p>Stay of execution may be requested. See \"foreign restriction codes and annulment actions\".</p>Entry Through Annotated Visa<p>Entry is possible with an annotated visa even if the ban remains. See \"what is an annotated visa and how to obtain one\".</p>",
  },
  {
    title: "Removal of Deportation Decision",
    content: "<p>Separate annulment action against deportation must be brought within <strong>7 days</strong> before the administrative court of the governorship province. Deportation annulment automatically suspends enforcement; act immediately because deportation may occur before the period expires.</p><p>Cancellation of the code may also be requested. Consult a specialist foreign nationals lawyer. See \"how to lift a deportation decision\".</p>Objection to Administrative Detention<p>Objection to administrative detention is made to the criminal peace judgeship of the governorship province or place of detention.</p>",
  },
  {
    title: "How Long Does Removal of the V-71 Code Take?",
    content: "<p>Objections take approximately <strong>1-3 months</strong>. Annulment actions take approximately <strong>1 year</strong>.</p>",
  },
  {
    title: "Attorney Fees and Costs for Removing the V-71 Code",
    content: "<p>Litigation costs to remove the V-71 restriction code are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities.</p>New Case Postage Fee580 TLNew Case (with stay of execution)588 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLAppeal Fee738 TL",
  },
  {
    title: "Competent and Authorized Court for Removing a Restriction Code",
    content: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>V-71 may lead to refusal of permits and deportation. Foreign nationals should act quickly, observe procedural deadlines, and prepare legally reasoned petitions. Consulting a specialist foreign nationals lawyer is advisable.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "V-71",
    content: "<p>لمن لم يبلّغ العنوان أو كذب في الإبلاغ. يرفض التصاريح وقد يُرحَّل.</p>",
  },
  {
    title: "ما هو V-71؟",
    content: "<p>لمن لا يُوجد في العنوان المُبلَّغ أو تأخر الإبلاغ. إبلاغ خلال 20 يوماً من الوصول.</p><p><strong>تنبيه:</strong> غرامة إدارية وN-97 عند عدم الدفع.</p>",
  },
  {
    title: "لماذا؟",
    content: "<p>عدم وجود الأجنبي في العنوان أو تأخر الإبلاغ. تحقيق الشرطة والجيران والاشتراكات.</p>",
  },
  {
    title: "كيف تُزال؟",
    content: "<p>طعن خلال <strong>60 يوماً</strong> أو دعوى إلغاء. تأشيرة مشروحة.</p>",
  },
  {
    title: "إلغاء الترحيل",
    content: "<p>خلال <strong>7 أيام</strong>. الدعوى توقف التنفيذ.</p>",
  },
  {
    title: "المدة",
    content: "<p>طعن <strong>1-3 أشهر</strong>. دعوى <strong>سنة</strong>.</p>",
  },
  {
    title: "التكاليف",
    content: "<p>تكاليف رفع دعوى V-71 نحو <strong>4,000 ليرة</strong> (2023).</p>بريد580 ليرةوقف588 ليرةطلب269.85 ليرةحكم269.85 ليرةوقف تنفيذ444.60 ليرةدليل444.60 ليرةاستئناف738 ليرة",
  },
  {
    title: "المحكمة",
    content: "<p>أنقرة للرمز. محافظة الوالي للترحيل.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>التصرف السريع والاستشارة القانونية مهمان.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "V-71",
    content: "<p>За несвоевременное или ложное уведомление адреса.</p>",
  },
  {
    title: "Что такое V-71?",
    content: "<p>Уведомление адреса в течение 20 дней. Отказ в ВНЖ и разрешении на работу.</p>",
  },
  {
    title: "Почему?",
    content: "<p>Отсутствие по адресу или просрочка уведомления.</p>",
  },
  {
    title: "Как снять?",
    content: "<p>Возражение за <strong>60 дней</strong> или иск.</p>",
  },
  {
    title: "Отмена выдворения",
    content: "<p>За <strong>7 дней</strong>.</p>",
  },
  {
    title: "Срок",
    content: "<p>Возражение <strong>1-3 месяца</strong>. Иск <strong>1 год</strong>.</p>",
  },
  {
    title: "Расходы",
    content: "<p>Расходы по снятию V-71 около <strong>4 000 TL</strong> (2023).</p>Почта580 TLОбеспечение588 TLЗаявление269,85 TLРешение269,85 TLОбеспечение444,60 TLДоказательства444,60 TLАпелляция738 TL",
  },
  {
    title: "Суд",
    content: "<p>Анкара. Провинция для выдворения.</p>",
  },
  {
    title: "Заключение",
    content: "<p>Действовать быстро. Консультация адвоката.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "V-71",
    content: "<p>برای عدم یا تأخیر یا جعل اعلام آدرس.</p>",
  },
  {
    title: "V-71 چیست؟",
    content: "<p>اعلام آدرس ظرف 20 روز پس از ورود.</p>",
  },
  {
    title: "چرا؟",
    content: "<p>عدم حضور در آدرس یا تأخیر اعلام.</p>",
  },
  {
    title: "رفع",
    content: "<p>اعتراض ظرف <strong>60 روز</strong> یا دعوا.</p>",
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
    content: "<p>هزینه رفع V-71 حدود <strong>4,000 لیر</strong> (2023).</p>پست580 لیرتوقف588 لیرطرح269.85 لیرحکم269.85 لیرتوقف444.60 لیردلیل444.60 لیرتجدید738 لیر",
  },
  {
    title: "دادگاه",
    content: "<p>آنکارا. استان والی.</p>",
  },
  {
    title: "نتیجه",
    content: "<p>اقدام سریع ضروری است.</p>",
  }
];

export const contentSlug = "v-71-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "V-71 Restriction Code",
    excerpt: "The V-71 restriction code is imposed on foreign nationals who fail to report their address to official authorities within the legal period or report it falsely. It may lead to refusal of residence and work permits and even deportation. Removal is possible through objection, annulment action, or annotated visa.",
    shortDescription: "V-71 applies when address notification is missing, late, or false. Permits may be refused and deportation may follow, but the code may be challenged legally.",
    heroTitle: "V-71 Restriction Code",
    heroSubtitle: "Learn what the V-71 address restriction code means, why it is imposed, and how to remove it through objection, annulment action, or annotated visa.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمز التقييد V-71",
    excerpt: "V-71 للأجانب الذين لم يبلّغوا العنوان في المهلة أو بلّغوا بيانات كاذبة. قد يرفض التصاريح ويؤدي للترحيل.",
    shortDescription: "V-71 عند تأخر أو كذب إبلاغ العنوان. يمكن الطعن أو دعوى الإلغاء.",
    heroTitle: "رمز التقييد V-71",
    heroSubtitle: "معنى V-71 لإبلاغ العنوان وكيفية إزالته.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Код ограничения V-71",
    excerpt: "V-71 за несвоевременное или ложное уведомление адреса. Может привести к отказу в разрешениях и выдворению.",
    shortDescription: "V-71 при проблемах с адресным уведомлением. Оспаривается возражением или иском.",
    heroTitle: "Код V-71",
    heroSubtitle: "Код V-71 за адресное уведомление: снятие и последствия.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کد محدودیت V-71",
    excerpt: "V-71 برای عدم یا تأخیر یا جعل اعلام آدرس به مراجع رسمی.",
    shortDescription: "V-71 درباره اعلام آدرس. قابل اعتراض و دعوای ابطال.",
    heroTitle: "کد V-71",
    heroSubtitle: "کد V-71 برای اعلام آدرس: معنا و رفع.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
