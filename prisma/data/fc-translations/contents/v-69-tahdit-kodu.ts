import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "V-69 Restriction Code",
    content: "<p>The V-69 restriction code is imposed on foreign nationals whose residence permit in Türkiye has been cancelled. To re-enter Türkiye and obtain a residence permit again, the restriction code must be removed. V-69 may be removed by objection to the competent authority or annulment action. Procedural and substantive points to observe are explained below.</p>",
  },
  {
    title: "What Is the V-69 Restriction Code?",
    content: "<p>The V-69 restriction code is imposed when a foreign national whose residence permit was cancelled attempts to re-enter Türkiye after deportation. Cancellation of the residence permit also cancels work permits, visas, and other documents that allowed entry to Türkiye.</p>",
  },
  {
    title: "Why Is the V-69 Restriction Code Imposed?",
    content: "<p>V-69 is imposed to prevent re-entry by a foreign national deported after conduct requiring residence permit cancellation. A foreign national with V-69 may not be granted a new residence permit for <strong>5 years</strong>.</p><p>Residence permit cancellation arises when conditions for the permit type cease to exist. Each permit type also has specific cancellation grounds.</p><p>Examples of grounds leading to V-69 include:</p><ul><li>Use of false information or documents in a residence permit application detected by the administration,</li><li>Working without a work permit despite holding a residence permit,</li><li>Using a student residence permit for purposes other than study, leading to cancellation and V-69.</li></ul><p>See our article on \"residence permit cancellation\" for cancellation grounds, legal remedies, and reapplication.</p>",
  },
  {
    title: "How Is the V-69 Restriction Code Removed?",
    content: "<p>V-69 is removed by annulment action. Objection to the issuing authority may be filed first; administrative objection is not mandatory.</p><p>In all removal applications, the legal defects of the measure must be clearly shown. Deficiencies often lead to rejection. Legal support from a specialist foreign nationals lawyer is advisable.</p>Removal by Administrative Objection<p>Objection is made by reasoned petition to the Presidency of Migration Management within <strong>60 days</strong> from the day following notification.</p><p>The administration must respond within <strong>30 days</strong>. Silence, unclear response, or express refusal allows annulment action. Direct annulment action without prior objection is also possible within 60 days.</p>Removal by Annulment Action<p>Annulment action is brought against the Presidency within the <strong>60-day</strong> administrative litigation period with clear legal grounds.</p><p>If objection was filed first, the period from notification to objection counts toward 60 days; the administration's processing time does not. After implied refusal, the period restarts from the day after the 30-day response period ends.</p><p>Annulment of V-69 or cancellation of the residence permit does not automatically suspend enforcement; stay of execution must be requested separately. Restriction code annulment and deportation annulment are separate actions, though successful deportation cases may also cancel the code if requested in the petition.</p><p>See \"foreign restriction codes and annulment actions\".</p>Entry Through Annotated Visa<p>Annotated visa allows re-entry after deportation for the visa period. Applications are open but acceptance is discretionary; security-related deportations are often refused. See \"annotated visa\".</p>",
  },
  {
    title: "Annulment Action Against Deportation Decision",
    content: "<p>A foreign national with V-69 and a deportation decision must bring annulment action within <strong>7 days</strong> from notification. Failure to do so leads to swift deportation.</p><p>The administration may deport before the seven-day period expires. The court decision is <strong>final</strong>; appeal and cassation are not available, but individual application to the Constitutional Court with a stay request is possible.</p><p>Deportation annulment automatically suspends deportation; a separate stay request is not required. Cases usually conclude in <strong>4-6 months</strong>. Release from administrative detention requires separate objection.</p>Objection to Administrative Detention<p>Objection is made to the criminal peace judgeship of the governorship province. See \"objection to administrative detention in a removal centre\".</p>",
  },
  {
    title: "How Long Does Removal of a Restriction Code Take?",
    content: "<p>Removal of a restriction code takes approximately <strong>1 year</strong>. A well-prepared petition and complete evidence shorten the process.</p>",
  },
  {
    title: "Court Fees and Costs for Removing a Restriction Code",
    content: "<p>Litigation costs to remove a restriction code are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities. The individual application fee to the Constitutional Court with a stay request is <strong>2,220.60 TL</strong>.</p><p>From <strong>10 July 2023</strong>, the costs are shown below.</p>New Case Postage Fee580 TLNew Case (with hearing)696 TLNew Case (with stay of execution)812 TLNew Case (with hearing and stay)928 TLAppeal with hearing and stay300-500 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLCopy Fee13.95 TL x page countPower of Attorney Fee38.40 TLInspection Fee1,912.35 TLAppeal Fee738 TLConstitutional Court Individual Application Fee2,220.60 TL",
  },
  {
    title: "Competent Court for Removing the V-69 Code",
    content: "<p>The competent court for removing V-69 is the Ankara administrative courts. For deportation annulment, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>V-69 blocks entry to Türkiye and causes serious loss of rights if not cancelled, including deportation and refusal of new residence permits. Legal support from a specialist foreign nationals lawyer is important to protect rights.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "رمز التقييد V-69",
    content: "<p>يُفرض V-69 على من أُلغي تصريح إقامتهم في Türkiye. لإعادة الدخول يلزم رفع الرمز بالطعن أو دعوى الإلغاء.</p>",
  },
  {
    title: "ما هو V-69؟",
    content: "<p>رمز يُفرض عند محاولة إعادة الدخول بعد إلغاء الإقامة والترحيل. يلغى مع الإقامة تصريح العمل والتأشيرة.</p>",
  },
  {
    title: "لماذا يُفرض V-69؟",
    content: "<p>لمنع إعادة دخول مَن رُحِّل بعد سلوك يستوجب إلغاء الإقامة. لا إقامة جديدة <strong>5 سنوات</strong>.</p><ul><li>معلومات أو وثائق مزيفة،</li><li>العمل بلا تصريح عمل،</li><li>استخدام إقامة طالب لغير الدراسة.</li></ul><p>راجعوا \"إلغاء تصريح الإقامة\".</p>",
  },
  {
    title: "كيف تُزال V-69؟",
    content: "<p>بالطعن أو دعوى الإلغاء. الطعن غير إلزامي.</p>الطعن<p>إلى رئاسة إدارة الهجرة خلال <strong>60 يوماً</strong>. رد خلال <strong>30 يوماً</strong>.</p>دعوى الإلغاء<p>خلال <strong>60 يوماً</strong>. طلب وقف التنفيذ منفصل. دعوى الترحيل منفصلة.</p>تأشيرة مشروحة<p>قد تسمح بإعادة الدخول بتقدير الإدارة.</p>",
  },
  {
    title: "دعوى الإلغاء ضد الترحيل",
    content: "<p>خلال <strong>7 أيام</strong>. القرار <strong>نهائي</strong>. الدعوى توقف الترحيل. <strong>4-6 أشهر</strong> عادة.</p>الطعن في المراقبة<p>لدى محكمة الجنح.</p>",
  },
  {
    title: "كم تستغرق الإزالة؟",
    content: "<p>نحو <strong>سنة</strong>.</p>",
  },
  {
    title: "تكاليف الدعوى",
    content: "<p>تكاليف رفع دعوى إزالة رمز التقييد نحو <strong>4,000 ليرة</strong> وفق 2023. رسوم الطعن الفردي لدى المحكمة الدستورية <strong>2,220.60 ليرة</strong>.</p>رسوم بريد580 ليرةدعوى مع جلسة696 ليرةدعوى مع وقف812 ليرةدعوى مع جلسة ووقف928 ليرةرسوم الطلب269.85 ليرةرسوم الحكم269.85 ليرةوقف التنفيذ444.60 ليرةإثبات الدليل444.60 ليرةاستئناف738 ليرة",
  },
  {
    title: "المحكمة المختصة",
    content: "<p>أنقرة للرمز. محافظة الوالي لإلغاء الترحيل.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>V-69 يمنع الدخول ويسبب خسائر جسيمة. استشارة محامٍ متخصص مهمة.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Код V-69",
    content: "<p>V-69 налагается после отмены ВНЖ. Для повторного въезда код снимается возражением или иском.</p>",
  },
  {
    title: "Что такое V-69?",
    content: "<p>Код при попытке повторного въезда после отмены ВНЖ и выдворения. Аннулируются также разрешение на работу и виза.</p>",
  },
  {
    title: "Почему V-69?",
    content: "<p>Чтобы блокировать повторный въезд после выдворения. Новый ВНЖ не выдается <strong>5 лет</strong>.</p><ul><li>Ложные сведения в заявлении,</li><li>Работа без разрешения,</li><li>Использование студенческого ВНЖ не по назначению.</li></ul>",
  },
  {
    title: "Как снять V-69?",
    content: "<p>Иск об отмене; возражение необязательно.</p>Возражение<p>В Президентство в течение <strong>60 дней</strong>.</p>Иск<p>В течение <strong>60 дней</strong>. Отдельно ходатайство об обеспечительных мерах.</p>Аннотированная виза<p>Дискреционное решение администрации.</p>",
  },
  {
    title: "Иск против выдворения",
    content: "<p>В течение <strong>7 дней</strong>. Решение <strong>окончательное</strong>. Иск приостанавливает выдворение. Около <strong>4-6 месяцев</strong>.</p>",
  },
  {
    title: "Срок снятия",
    content: "<p>Около <strong>1 года</strong>.</p>",
  },
  {
    title: "Расходы",
    content: "<p>Судебные расходы по снятию кода около <strong>4 000 TL</strong> (2023). Госпошлина за индивидуальное обращение в Конституционный суд <strong>2 220,60 TL</strong>.</p>Почта580 TLС заседанием696 TLС обеспечением812 TLС заседанием и обеспечением928 TLЗаявление269,85 TLРешение269,85 TLОбеспечение444,60 TLДоказательства444,60 TLАпелляция738 TL",
  },
  {
    title: "Компетентный суд",
    content: "<p>Анкара для кода. Провинция губернаторства для выдворения.</p>",
  },
  {
    title: "Заключение",
    content: "<p>V-69 блокирует въезд. Нужна помощь специализированного адвоката.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "کد V-69",
    content: "<p>V-69 پس از لغو اقامت وضع می‌شود. رفع از طریق اعتراض یا دعوای ابطال.</p>",
  },
  {
    title: "V-69 چیست؟",
    content: "<p>کد برای تلاش ورود مجدد پس از لغو اقامت و اخراج. مجوز کار و ویزا نیز لغو می‌شود.</p>",
  },
  {
    title: "چرا V-69؟",
    content: "<p>برای جلوگیری از ورود مجدد. اقامت جدید <strong>5 سال</strong> داده نمی‌شود.</p><ul><li>اطلاعات جعلی،</li><li>کار بدون مجوز،</li><li>سوءاستفاده از اقامت دانشجویی.</li></ul>",
  },
  {
    title: "رفع V-69",
    content: "<p>دعوای ابطال؛ اعتراض اختیاری است.</p>اعتراض<p>ظرف <strong>60 روز</strong> به ریاست مدیریت مهاجرت.</p>دعوا<p>ظرف <strong>60 روز</strong>. درخواست توقف اجرا جداگانه.</p>",
  },
  {
    title: "دعوای ابطال اخراج",
    content: "<p>ظرف <strong>7 روز</strong>. رأی <strong>قطعی</strong> است. دعوا اجرا را متوقف می‌کند.</p>",
  },
  {
    title: "مدت رفع",
    content: "<p>حدود <strong>1 سال</strong>.</p>",
  },
  {
    title: "هزینه‌ها",
    content: "<p>هزینه دعوای رفع کد حدود <strong>4,000 لیر</strong> (2023). هزینه شکایت فردی دیوان عالیان <strong>2,220.60 لیر</strong>.</p>پست580 لیربا جلسه696 لیربا توقف812 لیرجلسه و توقف928 لیرطرح269.85 لیرحکم269.85 لیرتوقف444.60 لیردلیل444.60 لیرتجدید738 لیر",
  },
  {
    title: "دادگاه صالح",
    content: "<p>آنکارا برای کد. استان والی برای اخراج.</p>",
  },
  {
    title: "نتیجه",
    content: "<p>V-69 ورود را مسدود می‌کند. مشورت با وکیل متخصص ضروری است.</p>",
  }
];

export const contentSlug = "v-69-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "V-69 Restriction Code",
    excerpt: "The V-69 restriction code is imposed on foreign nationals whose residence permit in Türkiye has been cancelled. To re-enter Türkiye and obtain a new residence permit, the code must be removed. This guide explains grounds, removal through objection or annulment action, deportation proceedings, and annotated visa options.",
    shortDescription: "The V-69 code is recorded after residence permit cancellation and deportation. It blocks re-entry and new residence permits for five years, but may be challenged through administrative and judicial remedies.",
    heroTitle: "V-69 Restriction Code",
    heroSubtitle: "Learn what the V-69 restriction code means after residence permit cancellation, why it is imposed, and how to remove it through objection, annulment action, or annotated visa.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمز التقييد V-69",
    excerpt: "يُفرض V-69 على الأجانب الذين أُلغي تصريح إقامتهم في Türkiye. لإعادة الدخول والحصول على إقامة جديدة يلزم رفع الرمز. يشرح الدليل الأسباب والإزالة بالطعن أو دعوى الإلغاء.",
    shortDescription: "V-69 يُسجل بعد إلغاء الإقامة والترحيل. يمنع إعادة الدخول والإقامة لخمس سنوات، ويمكن الطعن فيه إدارياً وقضائياً.",
    heroTitle: "رمز التقييد V-69",
    heroSubtitle: "تعرّف V-69 بعد إلغاء الإقامة وكيفية إزالته بالطعن أو دعوى الإلغاء أو التأشيرة المشروحة.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Код ограничения V-69",
    excerpt: "Код V-69 налагается на иностранцев, у которых аннулирован ВНЖ в Türkiye. Для повторного въезда код необходимо снять. В статье описаны основания, снятие через возражение или иск.",
    shortDescription: "V-69 вносится после отмены ВНЖ и выдворения. Блокирует повторный въезд и новый ВНЖ на 5 лет, но может быть оспорен.",
    heroTitle: "Код ограничения V-69",
    heroSubtitle: "Узнайте значение V-69 после отмены ВНЖ и как снять код через возражение, иск или аннотированную визу.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کد محدودیت V-69",
    excerpt: "کد V-69 برای خارجیانی که اقامتشان در Türkiye لغو شده وضع می‌شود. برای ورود مجدد باید کد رفع شود.",
    shortDescription: "V-69 پس از لغو اقامت و اخراج ثبت می‌شود و ورود و اقامت جدید را 5 سال مسدود می‌کند.",
    heroTitle: "کد محدودیت V-69",
    heroSubtitle: "معنای V-69 پس از لغو اقامت و نحوه رفع از طریق اعتراض، دعوا یا ویزای مشروح.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
