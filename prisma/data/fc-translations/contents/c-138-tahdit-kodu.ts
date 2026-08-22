import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Ç-138 Restriction Code",
    content: "<p>The Ç-138 restriction code, also known as the INAD passenger restriction code, is one of the most commonly applied codes. When foreign nationals arrive at border gates they may be refused entry and returned to their country. To re-enter Türkiye, legal remedies must be used. The legal avenues for removing the Ç-138 code are explained below.</p>",
  },
  {
    title: "What Is the Ç-138 Restriction Code?",
    content: "<p>The Ç-138 restriction code is imposed when a foreign national has repeatedly been an inadmissible passenger at entry. In practice it is also known as the INAD passenger code.</p><p>At border gates, persons who fail to meet entry conditions or cannot pass border police or passport control are treated as inadmissible passengers. If a foreign national is prevented from entering once or several times as inadmissible, a Ç-138 restriction code is recorded.</p>",
  },
  {
    title: "Why Is the Ç-138 Restriction Code Imposed?",
    content: "<p>The Ç-138 restriction code is imposed to ban entry to Türkiye for up to five years for foreign nationals assessed as inadmissible passengers.</p><p>Even if the person later meets entry requirements, entry remains blocked because of the code. A foreign national with an INAD code must have the restriction removed to re-enter Türkiye.</p>",
  },
  {
    title: "How Is the Ç-138 Restriction Code Removed?",
    content: "<p>The Ç-138 code may be removed by reasoned objection to the competent authority or by annulment action before the administrative court. Objection before court action is not mandatory but is preferred in practice. After an annulment action is filed, objection to the authority is no longer possible.</p><p>Detailed information on all restriction codes appears in our article on \"foreign restriction codes and annulment actions\". Consulting a specialist foreign nationals lawyer is important for swift results.</p>Removal by Administrative Objection<p>A foreign national banned under Ç-138 may object to the Presidency of Migration Management with a reasoned petition within <strong>60 days</strong> from the day following notification or learning of the code. Late applications are rejected.</p><p>Although not mandatory before court action, objection is recommended because it may produce practical results and helps calculate deadlines if the administration refuses.</p><p>If the application is refused, no response is given within <strong>30 days</strong>, or an unclear response is given, an annulment action may be brought.</p>Annulment Action to Remove the Code<p>Another remedy is an annulment action against the Presidency of Migration Management within <strong>60 days</strong> from the day following notification. If objection was filed first, the period between notification and objection is deducted from the 60-day period; the administration's processing time is not deducted.</p><p>For example, if objection is filed on the 10th day after notification and the administration responds or impliedly refuses within 30 days, an action may be brought within the remaining 50 days.</p><p>Filing the action does not automatically suspend the code; the court may grant stay of execution if conditions are met.</p><p>If the action is dismissed, appeal before the regional administrative court is available; cassation is not.</p>Entry Through Annotated Visa<p>A foreign national with Ç-138 who holds an annotated visa may enter Türkiye for the visa period even if a five-year entry ban or deportation decision exists.</p><p>Annotated visa is a special visa granted at the administration's discretion for family reunification, treatment, education, and similar grounds through Turkish foreign missions. See our article on \"annotated visa\".</p>",
  },
  {
    title: "Annulment Action Against Deportation Decision",
    content: "<p>If a restriction code restricting liberty is applied, deportation may also follow. The foreign national may bring an annulment action within <strong>7 days</strong> from notification of deportation before the administrative court of the province of the governorship that issued the decision.</p><p>The action must be filed as quickly as possible because the administration may complete deportation without waiting for the seven-day period to expire.</p><p>In deportation annulment actions, cancellation of the deportation decision and the restriction code may both be requested. If the court finds the claims legally valid, it may cancel both.</p><p>Strict compliance with deadlines and well-reasoned petitions are essential; otherwise the foreign national may be deported. See our article on \"how to lift a deportation decision\".</p>Objection to Administrative Detention<p>Persons subject to administrative detention in removal centres during deportation must object to detention to be released during proceedings.</p><p>Objection is made to the criminal peace judgeship of the province of the governorship that issued detention or where the person is held. See our article on \"objection to administrative detention\".</p>",
  },
  {
    title: "How Long Does Removal of the Ç-138 Code Take?",
    content: "<p>Administrative objections on Ç-138 are usually concluded within <strong>1-3 months</strong>. Annulment actions to remove the code and entry ban take approximately <strong>1 year</strong>. Appeal extends the process. Delays may also arise from weak reasoning, missing documents, or heavy workload.</p>",
  },
  {
    title: "Court Fees and Costs for Removing the Ç-138 Code",
    content: "<p>Litigation costs to remove the Ç-138 restriction code are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities. The individual application fee to the Constitutional Court with a stay request is <strong>2,220.60 TL</strong>.</p>New Case Postage Fee580 TLNew Case (with stay of execution)588 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLAppeal Fee738 TL",
  },
  {
    title: "Competent Court for Removing a Restriction Code",
    content: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>Restrictions under Ç-138, deportation, and objections to administrative detention require procedurally correct applications. Otherwise the foreign national may be unable to enter Türkiye for five years. For swift and correct removal of the code and deportation decision, consult a specialist foreign nationals lawyer.</p>",
  }
];

const arSections: ServiceContentSection[] = [
  {
    title: "رمز التقييد Ç-138",
    content: "<p>رمز التقييد Ç-138، المعروف أيضاً برمز مسافر INAD، من الرموز الشائعة. عند وصول الأجانب إلى المعابر قد يُرفض دخولهم ويُعادون إلى بلدهم. لإعادة الدخول إلى Türkiye يلزم اللجوء إلى السبل القانونية. تُشرح أدناه طرق إزالة رمز Ç-138.</p>",
  },
  {
    title: "ما هو رمز التقييد Ç-138؟",
    content: "<p>رمز Ç-138 يُفرض عندما يكون الأجنبي مسافراً غير مقبول عند الدخول مراراً. في التطبيق يُعرف أيضاً برمز مسافر INAD.</p><p>في المعابر، من لا يستوف شروط الدخول أو لا يجتاز شرطة الحدود أو مراقبة الجوازات يُعتبر مسافراً غير مقبول. إذا مُنع دخول الأجنبي مرة أو عدة مرات يُسجل رمز Ç-138.</p>",
  },
  {
    title: "لماذا يُفرض رمز التقييد Ç-138؟",
    content: "<p>يُفرض Ç-138 لحظر دخول Türkiye حتى خمس سنوات للأجانب المُقيَّمين كمسافرين غير مقبولين.</p><p>حتى لو استوفى الشخص لاحقاً شروط الدخول، يبقى الدخول محظوراً بسبب الرمز. يجب إزالة الرمز لإعادة الدخول.</p>",
  },
  {
    title: "كيف تُزال رمز التقييد Ç-138؟",
    content: "<p>تُزال الرموز بالطعن المسبب إلى الجهة المختصة أو بدعوى إلغاء أمام المحكمة الإدارية. الطعن قبل الدعوى ليس إلزامياً لكنه مفضل عملياً. بعد رفع دعوى الإلغاء لا يمكن الطعن لدى الإدارة.</p>الطعن الإداري لإزالة الرمز<p>يمكن الطعن لدى رئاسة إدارة الهجرة خلال <strong>60 يوماً</strong> من اليوم التالي للتبليغ أو العلم بالرمز.</p><p>إذا رُفض الطلب أو لم تُجب الإدارة خلال <strong>30 يوماً</strong> أو كانت الإجابة غير واضحة، يمكن رفع دعوى إلغاء.</p>دعوى الإلغاء لإزالة الرمز<p>دعوى إلغاء ضد رئاسة إدارة الهجرة خلال <strong>60 يوماً</strong>. إذا سبق الطعن، يُخصم الوقت بين التبليغ والطعن وليس وقت معالجة الإدارة.</p><p>رفع الدعوى لا يوقف الرمز تلقائياً؛ يمكن طلب وقف التنفيذ.</p>الدخول بتأشيرة مشروحة<p>حامل التأشيرة المشروحة قد يدخل Türkiye رغم حظر الدخول لخمس سنوات.</p>",
  },
  {
    title: "دعوى الإلغاء ضد قرار الترحيل",
    content: "<p>يمكن رفع دعوى إلغاء خلال <strong>7 أيام</strong> من تبليغ الترحيل. يجب التحرك بسرعة لأن الإدارة قد تُكمل الترحيل دون انتظار انتهاء المهلة.</p><p>يمكن طلب إلغاء قرار الترحيل والرمز معاً.</p>الطعن في المراقبة الإدارية<p>المحتجزون في مراكز الإعادة يجب أن يطعنوا في المراقبة الإدارية للإفراج.</p>",
  },
  {
    title: "كم تستغرق إزالة رمز Ç-138؟",
    content: "<p>الطعون الإدارية تستغرق <strong>1-3 أشهر</strong>. دعوى الإلغاء نحو <strong>سنة</strong>. الاستئناف يطيل المدة.</p>",
  },
  {
    title: "رسوم ومصاريف دعوى إزالة رمز Ç-138",
    content: "<p>تكاليف رفع دعوى إزالة رمز Ç-138 نحو <strong>4,000 ليرة تركية</strong> وفق بيانات 2023. رسوم الطعن الفردي لدى المحكمة الدستورية مع طلب وقف التنفيذ <strong>2,220.60 ليرة</strong>.</p>رسوم بريد دعوى جديدة580 ليرةدعوى جديدة (وقف التنفيذ)588 ليرةرسوم الطلب269.85 ليرةرسوم الحكم269.85 ليرةرسوم وقف التنفيذ444.60 ليرةرسوم إثبات الدليل444.60 ليرةرسوم الاستئناف738 ليرة",
  },
  {
    title: "المحكمة المختصة لإزالة رمز التقييد",
    content: "<p>المحكمة الإدارية المختصة لإزالة رمز التقييد هي محاكم أنقرة الإدارية. ولإلغاء قرارات الترحيل المبنية على رمز التقييد، تكون المحكمة الإدارية في محافظة الوالي الذي أصدر قرار الترحيل.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>تتطلب قيود Ç-138 والترحيل والطعن في المراقبة الإدارية إجراءات صحيحة. وإلا قد يُمنع الأجنبي من الدخول خمس سنوات. استشارة محامٍ متخصص مهمة للإزالة السريعة والصحيحة.</p>",
  }
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Код ограничения Ç-138",
    content: "<p>Код Ç-138, также известный как код пассажира INAD, широко применяется. Иностранцам на границе может быть отказано во въезде с возвратом в страну гражданства. Для повторного въезда в Türkiye необходимы правовые средства.</p>",
  },
  {
    title: "Что такое код ограничения Ç-138?",
    content: "<p>Код Ç-138 вносится, если иностранец неоднократно являлся недопустимым пассажиром при въезде. В практике известен как код INAD.</p><p>На границе лица, не соответствующие условиям въезда, считаются недопустимыми пассажирами. При однократном или многократном отказе во въезде вносится Ç-138.</p>",
  },
  {
    title: "Почему вносится код Ç-138?",
    content: "<p>Код Ç-138 вводится для запрета въезда в Türkiye до пяти лет для недопустимых пассажиров.</p><p>Даже при последующем соответствии условиям въезд блокируется кодом. Для повторного въезда код должен быть снят.</p>",
  },
  {
    title: "Как снять код Ç-138?",
    content: "<p>Код снимается мотивированным возражением в компетентный орган или иском об отмене. Возражение до иска не обязательно, но рекомендуется. После подачи иска возражение в орган невозможно.</p>Административное возражение<p>Возражение в Президентство по делам миграции в течение <strong>60 дней</strong> со дня после уведомления.</p><p>При отказе, молчании в течение <strong>30 дней</strong> или неясном ответе возможен иск.</p>Иск об отмене<p>Иск в течение <strong>60 дней</strong>. При предварительном возражении вычитается период до возражения, а не время рассмотрения органа.</p><p>Иск не приостанавливает код автоматически; возможно ходатайство об обеспечительных мерах.</p>Въезд по аннотированной визе<p>Держатель аннотированной визы может въехать даже при пятилетнем запрете.</p>",
  },
  {
    title: "Иск об отмене решения о выдворении",
    content: "<p>Иск подается в течение <strong>7 дней</strong> с уведомления. Действовать нужно быстро, так как выдворение может быть исполнено до истечения срока.</p><p>Можно требовать отмены выдворения и кода.</p>Возражение против административного задержания<p>Задержанные в центрах удержания должны оспорить задержание.</p>",
  },
  {
    title: "Сколько длится снятие кода Ç-138?",
    content: "<p>Возражения: <strong>1-3 месяца</strong>. Иск: около <strong>1 года</strong>. Апелляция продлевает процесс.</p>",
  },
  {
    title: "Судебные расходы по снятию кода Ç-138",
    content: "<p>Судебные расходы по снятию кода Ç-138 составляют около <strong>4 000 TL</strong> по данным 2023 года. Госпошлина за индивидуальное обращение в Конституционный суд с ходатайством об обеспечительных мерах - <strong>2 220,60 TL</strong>.</p>Почтовые расходы нового иска580 TLИск с обеспечительными мерами588 TLПошлина за заявление269,85 TLПошлина за решение269,85 TLОбеспечительные меры444,60 TLОпределение доказательств444,60 TLАпелляция738 TL",
  },
  {
    title: "Компетентный суд для снятия кода",
    content: "<p>Компетентный административный суд для снятия кода ограничения - административные суды Анкары. Для отмены решений о выдворении на основании кода ограничения компетентен административный суд провинции, где находится губернаторство, вынесшее решение.</p>",
  },
  {
    title: "Заключение",
    content: "<p>Ограничения Ç-138, выдворение и оспаривание задержания требуют соблюдения процедуры. Иначе въезд может быть запрещен на пять лет. Рекомендуется консультация специализированного адвоката.</p>",
  }
];

const faSections: ServiceContentSection[] = [
  {
    title: "کد محدودیت Ç-138",
    content: "<p>کد Ç-138 که به عنوان کد مسافر INAD نیز شناخته می‌شود، از کدهای رایج است. به خارجیان در مرز ممکن است ورود رد و به کشورشان بازگردانده شوند. برای ورود مجدد به Türkiye باید از راه‌های حقوقی استفاده شود.</p>",
  },
  {
    title: "کد محدودیت Ç-138 چیست؟",
    content: "<p>کد Ç-138 وقتی وضع می‌شود که خارجی بارها مسافر غیرقابل پذیرش در ورود بوده باشد. در عمل به عنوان کد INAD نیز شناخته می‌شود.</p>",
  },
  {
    title: "چرا کد Ç-138 وضع می‌شود؟",
    content: "<p>Ç-138 برای ممنوعیت ورود تا پنج سال به Türkiye برای مسافران غیرقابل پذیرش وضع می‌شود.</p><p>حتی با احراز بعدی شرایط، ورود به دلیل کد مسدود می‌ماند.</p>",
  },
  {
    title: "کد Ç-138 چگونه رفع می‌شود؟",
    content: "<p>رفع از طریق اعتراض مستدل به مرجع صلاح یا دعوای ابطال ممکن است. اعتراض قبل از دعوا اجباری نیست اما توصیه می‌شود.</p>اعتراض اداری<p>اعتراض به ریاست مدیریت مهاجرت ظرف <strong>60 روز</strong> از روز بعد از ابلاغ.</p><p>در صورت رد یا عدم پاسخ ظرف <strong>30 روز</strong>، دعوای ابطال ممکن است.</p>دعوای ابطال<p>ظرف <strong>60 روز</strong>. در صورت اعتراض قبلی، مدت تا اعتراض کسر می‌شود.</p>ورود با ویزای مشروح<p>دارنده ویزای مشروح حتی با ممنوعیت پنج‌ساله می‌تواند وارد شود.</p>",
  },
  {
    title: "دعوای ابطال تصمیم اخراج",
    content: "<p>دعوا ظرف <strong>7 روز</strong> از ابلاغ. باید سریع اقدام شود.</p><p>ابطال اخراج و کد را می‌توان با هم خواست.</p>اعتراض به نظارت اداری<p>محبوسان در مراکز بازگشت باید اعتراض کنند.</p>",
  },
  {
    title: "رفع کد Ç-138 چقدر طول می‌کشد؟",
    content: "<p>اعتراض: <strong>1-3 ماه</strong>. دعوا: حدود <strong>1 سال</strong>.</p>",
  },
  {
    title: "هزینه‌های دعوای رفع کد Ç-138",
    content: "<p>هزینه دعوای رفع کد Ç-138 حدود <strong>4,000 لیر</strong> بر اساس داده‌های 2023 است. هزینه شکایت فردی به دیوان عالیان با درخواست توقف اجرا <strong>2,220.60 لیر</strong> است.</p>هزینه پست دعوای جدید580 لیردعوای جدید (توقف اجرا)588 لیرحق طرح269.85 لیرحق حکم269.85 لیرحق توقف اجرا444.60 لیرحق تعیین دلیل444.60 لیرحق تجدیدنظر738 لیر",
  },
  {
    title: "دادگاه صالح برای رفع کد محدودیت",
    content: "<p>دادگاه اداری صالح برای رفع کد محدودیت، دادگاه‌های اداری آنکارا است. برای ابطال تصمیم اخراج مبتنی بر کد محدودیت، دادگاه اداری استان والی صادرکننده تصمیم صالح است.</p>",
  },
  {
    title: "نتیجه‌گیری",
    content: "<p>محدودیت‌های Ç-138 و اخراج نیازمند رعایت آیین است. در غیر این صورت ورود پنج سال مسدود می‌ماند. مشورت با وکیل متخصص توصیه می‌شود.</p>",
  }
];

export const contentSlug = "c-138-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Ç-138 Restriction Code (INAD Passenger)",
    excerpt: "The Ç-138 restriction code, also known as the INAD passenger code, is one of the most commonly applied restriction codes. Foreign nationals refused entry at border gates must use legal remedies to re-enter Türkiye. This guide explains what Ç-138 means, why it is imposed, and how to remove it.",
    shortDescription: "Ç-138 is the INAD passenger restriction code imposed when a foreign national is repeatedly refused entry at Türkiye's borders. It may block re-entry for up to five years until removed through objection, annulment action, or annotated visa.",
    heroTitle: "Ç-138 Restriction Code",
    heroSubtitle: "Learn what the Ç-138 INAD passenger restriction code means, why it is imposed after repeated entry refusals, and how to remove it through administrative objection, annulment action, or annotated visa.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمز التقييد Ç-138 (مسافر INAD)",
    excerpt: "رمز التقييد Ç-138، المعروف أيضاً برمز مسافر INAD، من أكثر رموز التقييد شيوعاً. الأجانب المرفوضون عند المعابر يحتاجون إلى سبل قانونية لإعادة الدخول إلى Türkiye. يشرح هذا الدليل معنى Ç-138 وأسباب فرضه وكيفية إزالته.",
    shortDescription: "Ç-138 هو رمز مسافر INAD يُفرض عند رفض دخول الأجنبي مراراً عند حدود Türkiye. قد يمنع إعادة الدخول حتى خمس سنوات حتى تُزال الرموز بالطعن أو دعوى الإلغاء أو التأشيرة المشروحة.",
    heroTitle: "رمز التقييد Ç-138",
    heroSubtitle: "تعرّف معنى رمز مسافر INAD Ç-138 وأسباب فرضه بعد رفض الدخول المتكرر وكيفية إزالته بالطعن الإداري أو دعوى الإلغاء أو التأشيرة المشروحة.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Код ограничения Ç-138 (пассажир INAD)",
    excerpt: "Код ограничения Ç-138, также известный как код пассажира INAD, является одним из наиболее распространенных кодов. Иностранцам, которым отказано во въезде на пограничных пунктах, необходимо использовать правовые средства для повторного въезда в Türkiye.",
    shortDescription: "Ç-138 - код пассажира INAD, вносимый при неоднократном отказе во въезде на границе Türkiye. Может блокировать въезд до пяти лет до снятия через возражение, иск или аннотированную визу.",
    heroTitle: "Код ограничения Ç-138",
    heroSubtitle: "Узнайте, что означает код пассажира INAD Ç-138, почему он вносится после повторных отказов во въезде и как снять его через административное возражение, иск об отмене или аннотированную визу.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کد محدودیت Ç-138 (مسافر INAD)",
    excerpt: "کد محدودیت Ç-138 که به عنوان کد مسافر INAD نیز شناخته می‌شود، از رایج‌ترین کدهای محدودیت است. اتباع خارجی که در مرز رد می‌شوند برای ورود مجدد به Türkiye باید از راه‌های حقوقی استفاده کنند.",
    shortDescription: "Ç-138 کد مسافر INAD است که پس از رد مکرر ورود در مرزهای Türkiye وضع می‌شود. تا رفع از طریق اعتراض، دعوا یا ویزای مشروح ممکن است ورود تا پنج سال مسدود شود.",
    heroTitle: "کد محدودیت Ç-138",
    heroSubtitle: "با معنای کد مسافر INAD Ç-138، دلایل وضع پس از رد مکرر ورود و نحوه رفع از طریق اعتراض اداری، دعوای ابطال یا ویزای مشروح آشنا شوید.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
