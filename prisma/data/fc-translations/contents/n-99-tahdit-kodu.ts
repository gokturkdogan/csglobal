import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "N-99 Restriction Code",
    content: "<p>The N-99 restriction code is an administrative measure imposed on foreign nationals listed on the INTERPOL wanted list and brings an entry ban. Persons with N-99 are subject to a prior approval procedure for entry. To remove N-99, objection may be made to the competent authority, annulment action may be brought, or an annotated visa may be applied for. If a deportation decision also exists, annulment action against that decision is also required.</p>",
  },
  {
    title: "What Is the N-99 Restriction Code?",
    content: "<p>The N-99 restriction code, also known in practice as the INTERPOL code, is a restriction type that blocks foreign nationals from entering Türkiye. It is imposed when the foreign national appears on INTERPOL's wanted bulletin or is sought in a country that is a member of the INTERPOL system.</p><p>N-99 is imposed by provincial directorates general of migration, the Directorate General of Border and Coast Guard, and other authorized bodies.</p><p>In principle this code requires prior approval for entry to Türkiye. Foreign nationals with N-99 must first obtain permission from the competent authorities. In practice, however, prior approval is often not issued for persons with \"N\" restriction codes, so N-99 effectively operates as an entry ban to Türkiye.</p>",
  },
  {
    title: "Why Is the N-99 Restriction Code Imposed?",
    content: "<p>N-99 is imposed to control entry to Türkiye of foreign nationals on the INTERPOL wanted bulletin. It is also imposed under Article 9 of Law No. 6458 on Foreigners and International Protection to protect public order and public security. Through N-99, the foreign national's entry is made subject to prior approval and the person cannot benefit from visa exemption.</p>",
  },
  {
    title: "How Is the N-99 Restriction Code Removed?",
    content: "<p>N-99 may be removed by <strong>objection</strong> to the competent authority <strong>or</strong> by <strong>annulment action</strong> before the administrative court. A foreign national recorded with the code may also enter Türkiye by obtaining an <strong>annotated visa</strong>.</p>Removal by Administrative Objection<p>To remove N-99, <strong>objection is made to the Presidency of Migration Management</strong> with a reasoned petition on the matter. Objection must be made within <strong>60 days</strong> from the day following notification of the code to the person.</p><p>After application, the Presidency must decide within 30 days. If no response is given within 30 days, the objection is deemed refused. After refusal, annulment action may be brought. The foreign national may also bring annulment action directly without any prior objection.</p><p>Objection to the Presidency suspends the statutory 60-day period for annulment action until the objection is concluded.</p>Removal by Annulment Action<p>The foreign national may bring <strong>annulment action</strong> before the <strong>administrative court</strong> to remove N-99. The limitation period is <strong>60 days</strong> from the day following notification.</p><p>After <strong>objection to the Presidency</strong> and a <strong>refusal decision</strong>, <strong>annulment action</strong> may also be brought. In that case, the period between notification and objection is deducted from the 60 days.</p><p>For example, if objection is made on the 32nd day after notification, the person has 28 days from the day following notification of the refusal to bring action.</p><p>Stay of execution may be requested in annulment action to remove the code. If granted, the effects of the code are suspended until the case concludes. This requires irreparable harm and clear unlawfulness, which must be stated in the petition.</p><p>Annulment actions involve many procedural steps and correct legal reasoning. Consulting a specialist foreign nationals lawyer is advisable. See our article on \"foreign restriction codes and annulment action to remove the code\".</p>Entry Through Annotated Visa<p>A foreign national banned from entry because of N-99 may enter with an annotated visa. An annotated visa allows entry even if the restriction code and entry ban remain.</p><p>Annotated visa is a special visa granted by the administration for family reunification, work, study, treatment, trade, and similar purposes.</p><p>See our article on \"what is an annotated visa and how to obtain it\" for full details.</p>",
  },
  {
    title: "Annulment Action Against Deportation Decision",
    content: "<p>A foreign national recorded with a restriction code may also have a deportation decision. Even if annulment action is brought to cancel the code, deportation may continue. Therefore annulment action against the deportation decision is also required. Annulment action against deportation will suspend deportation proceedings.</p><p><strong>Annulment action</strong> against deportation must be brought within <strong>7 days</strong> from notification of the deportation decision. The petition may also request removal of the restriction code. If the court approves, the code may also be cancelled.</p><p>Action should be brought as quickly as possible within the seven-day period because the administration may complete deportation without waiting for the foreign national to file suit.</p><p>See our article on \"how to lift a deportation decision\" for comprehensive information.</p>Objection to Administrative Detention<p>A foreign national with a deportation decision may be placed under administrative detention in removal centres. To be released, objection must be made to the <strong>criminal peace judgeship</strong> of the province of the governorship that issued the decision.</p><p>General information on objection to administrative detention appears here. See our article on \"objection to administrative detention in a removal centre\" for full details.</p>",
  },
  {
    title: "How Long Does Removal of the Restriction Code Take?",
    content: "<p><strong>Annulment action</strong> before the administrative court to remove N-99 takes approximately <strong>1 year</strong>. <strong>Objection</strong> to the competent authority is usually concluded within <strong>1-3 months</strong>.</p>",
  },
  {
    title: "Court Fees and Costs for Removing a Restriction Code",
    content: "<p>Costs to remove N-99 through annulment action, including court fees, postage, and other litigation costs, are approximately <strong>4,000 TL</strong>. Fee amounts are revised each year. 2023 costs for administrative litigation are set out below.</p>POSTAGE COSTS PAID IN ADVANCE WHEN FILING BEFORE ADMINISTRATIVE COURTSNew Case Opening Postage580.00 TLNew Case with Hearing Request696.00 TLNew Case with Stay of Execution Request812.00 TLNew Case with Hearing and Stay of Execution928.00 TLAppeal with Hearing and Stay of Execution300-500 TLADMINISTRATIVE COURT FEESApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLCopy Fee13.95 TL x Number of PagesPower of Attorney Fee38.40 TLInspection Fee1,912.35 TL",
  },
  {
    title: "Competent and Authorized Court for Removing a Restriction Code",
    content: "<p>The competent and authorized court for removing a restriction code is the Ankara administrative courts. For annulment of deportation decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deportation decision is located.</p>",
  },
  {
    title: "Conclusion",
    content: "<p>N-99 is one of the most commonly encountered restriction codes in practice. Removing it involves many procedural steps. If the restriction code and deportation decision are not cancelled, the person cannot enter Türkiye or may be deported. Consulting a specialist foreign nationals lawyer is very important to avoid such outcomes.</p>",
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "رمز التقييد N-99",
    content: "<p>رمز N-99 إجراء إداري يُفرض على الأجانب المدرجين في قائمة الإنتربول ويمنع الدخول. يخضع حامله لإجراء إذن مسبق. لإزالته: الطعن أو دعوى الإلغاء أو التأشيرة المشروحة. إن وُجد قرار ترحيل يلزم أيضاً دعوى إلغاء ضده.</p>",
  },
  {
    title: "ما هو رمز التقييد N-99؟",
    content: "<p>N-99، المعروف عملياً برمز الإنتربول، يمنع دخول الأجانب إلى Türkiye. يُفرض إذا ظهر الأجنبي في نشرة الإنتربول أو كان مطلوباً في دولة عضو.</p><p>يُفرض من مديريات الهجرة في المحافظات ومديرية الحدود والسواحل وغيرها.</p><p>في الأصل يتطلب إذناً مسبقاً للدخول. لكن عملياً غالباً لا يُصدر إذن مسبق لحاملي رموز \"N\"، فيعمل N-99 كحظر دخول فعلي.</p>",
  },
  {
    title: "لماذا يُفرض رمز التقييد N-99؟",
    content: "<p>يُفرض للتحكم في دخول من على قائمة الإنتربول. كما يُفرض بموجب المادة 9 من قانون 6458 لحماية النظام العام والأمن. يُشترط إذن مسبق ولا يستفيد الشخص من إعفاء التأشيرة.</p>",
  },
  {
    title: "كيف تُزال رمز التقييد N-99؟",
    content: "<p>يُزال بال<strong>طعن</strong> أو <strong>دعوى الإلغاء</strong> أو <strong>التأشيرة المشروحة</strong>.</p>الطعن الإداري<p>الطعن لدى <strong>رئاسة إدارة الهجرة</strong> خلال <strong>60 يوماً</strong> من التبليغ.</p><p>تبت الرئاسة خلال 30 يوماً. السكوت رفض. يمكن الدعوى مباشرة. الطعن يوقف مدة الستين يوماً.</p>دعوى الإلغاء<p>دعوى أمام <strong>المحكمة الإدارية</strong> خلال <strong>60 يوماً</strong>. بعد رفض الطعن تُخصم المدة المنقضية.</p><p>يمكن طلب وقف التنفيذ. استشارة محامٍ متخصص مفيدة.</p>الدخول بتأشيرة مشروحة<p>قد يدخل حامل N-99 بتأشيرة مشروحة رغم بقاء الرمز.</p>",
  },
  {
    title: "دعوى الإلغاء ضد قرار الترحيل",
    content: "<p>قد يوجد قرار ترحيل مع الرمز. يلزم دعوى إلغاء الترحيل خلال <strong>7 أيام</strong>. قد تُطلب إزالة الرمز أيضاً.</p><p>يجب التقديم بأسرع وقت. راجعوا \"كيفية رفع قرار الترحيل\".</p>الطعن في المراقبة الإدارية<p>الطعن لدى <strong>محكمة الجنح</strong> في محافظة الوالي للإفراج.</p>",
  },
  {
    title: "كم تستغرق إزالة رمز التقييد؟",
    content: "<p>دعوى الإلغاء نحو <strong>سنة</strong>. الطعن الإداري <strong>1-3 أشهر</strong>.</p>",
  },
  {
    title: "رسوم وتكاليف دعوى إزالة رمز التقييد",
    content: "<p>التكاليف نحو <strong>4,000 ليرة</strong>. رسوم 2023:</p>بريد دعوى جديدة580,00 ليرةدعوى مع جلسة696,00 ليرةدعوى مع وقف812,00 ليرةرسوم الطلب269,85 ليرةرسوم الحكم269,85 ليرة",
  },
  {
    title: "المحكمة المختصة والنافذة لإزالة رمز التقييد",
    content: "<p>المحكمة المختصة محاكم أنقرة الإدارية. لإلغاء الترحيل المبني على الرمز: المحكمة الإدارية في محافظة الوالي.</p>",
  },
  {
    title: "الخلاصة",
    content: "<p>N-99 من أكثر الرموز شيوعاً. إزالته تتضمن إجراءات كثيرة. دون الإلغاء لا دخول أو يُرحَّل الشخص. استشارة محامٍ متخصص مهمة.</p>",
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Код ограничения N-99",
    content: "<p>Код N-99 - административная мера против иностранцев из списка INTERPOL с запретом въезда. Требуется предварительное разрешение. Снятие: возражение, иск об отмене или аннотированная виза. При решении о депортации нужен отдельный иск.</p>",
  },
  {
    title: "Что такое код ограничения N-99?",
    content: "<p>N-99, известный как код INTERPOL, блокирует въезд в Türkiye. Вводится, если лицо в бюллетене INTERPOL или разыскивается в стране-участнице.</p><p>Вводится управлениями миграции, пограничной службой и иными органами.</p><p>По сути требует предварительного разрешения, но на практике оно часто не выдается, и N-99 фактически является запретом въезда.</p>",
  },
  {
    title: "Почему вводится код N-99?",
    content: "<p>Для контроля въезда лиц из бюллетеня INTERPOL и по ст. 9 Закона № 6458 для защиты общественного порядка. Въезд ставится в зависимость от предварительного разрешения, визовая льгота не применяется.</p>",
  },
  {
    title: "Как снять код N-99?",
    content: "<p>Снятие через <strong>возражение</strong> или <strong>иск об отмене</strong>, также <strong>аннотированная виза</strong>.</p>Административное возражение<p>Возражение в <strong>Президентство по делам миграции</strong> в течение <strong>60 дней</strong>.</p><p>Решение за 30 дней. Молчание - отказ. Возможен прямой иск. Возражение приостанавливает 60-дневный срок.</p>Иск об отмене<p>Иск в <strong>административный суд</strong> в течение <strong>60 дней</strong>. Период до возражения вычитается.</p><p>Можно ходатайствовать об обеспечительных мерах. Консультация адвоката рекомендуется.</p>Аннотированная виза<p>Въезд возможен по аннотированной визе при сохранении кода.</p>",
  },
  {
    title: "Иск об отмене решения о выдворении",
    content: "<p>Может существовать решение о депортации. Нужен иск в течение <strong>7 дней</strong>. Можно просить снятие кода.</p><p>Действовать быстро. См. \"как отменить депортацию\".</p>Возражение против задержания<p>Возражение в <strong>суд мировых судей</strong> провинции губернаторства.</p>",
  },
  {
    title: "Сколько длится снятие кода?",
    content: "<p>Иск около <strong>1 года</strong>. Возражение <strong>1-3 месяца</strong>.</p>",
  },
  {
    title: "Судебные расходы по снятию кода",
    content: "<p>Около <strong>4 000 TL</strong>. Тариф 2023:</p>Почта580,00 TLС заседанием696,00 TLС обеспечением812,00 TLПошлина269,85 TL",
  },
  {
    title: "Компетентный суд",
    content: "<p>Административные суды Анкары. Для депортации - суд провинции губернаторства.</p>",
  },
  {
    title: "Заключение",
    content: "<p>N-99 один из самых частых кодов. Снятие требует многих процедур. Без отмены нет въезда или возможна депортация. Консультация специализированного адвоката очень важна.</p>",
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "کد محدودیت N-99",
    content: "<p>کد N-99 اقدام اداری علیه اتباع خارجی در فهرست اینترپل با ممنوعیت ورود است. دارنده مشمول مجوز قبلی است. برای رفع: اعتراض، دعوای ابطال یا ویزای مشروح. اگر تصمیم اخراج هم باشد دعوای جداگانه لازم است.</p>",
  },
  {
    title: "کد محدودیت N-99 چیست؟",
    content: "<p>N-99 که در عمل کد اینترپل نامیده می‌شود، ورود به Türkiye را مسدود می‌کند. وقتی شخص در بولتن اینترپل یا در کشور عضو اینترپل تحت تعقیب باشد وضع می‌شود.</p><p>توسط ادارات کل مهاجرت، مرز و سایر مراجع صادر می‌شود.</p><p>در اصل مجوز قبلی لازم است اما در عمل اغلب صادر نمی‌شود و N-99 عملاً ممنوعیت ورود است.</p>",
  },
  {
    title: "چرا کد N-99 وضع می‌شود؟",
    content: "<p>برای کنترل ورود کسانی که در بولتن اینترپل هستند و بر اساس ماده 9 قانون 6458 برای حفظ نظم و امنیت عمومی. ورود منوط به مجوز قبلی است و از معافیت ویزا بهره نمی‌برند.</p>",
  },
  {
    title: "کد N-99 چگونه رفع می‌شود؟",
    content: "<p>با <strong>اعتراض</strong> یا <strong>دعوای ابطال</strong> یا <strong>ویزای مشروح</strong>.</p>اعتراض اداری<p>اعتراض به <strong>ریاست مدیریت مهاجرت</strong> ظرف <strong>60 روز</strong>.</p><p>پاسخ ظرف 30 روز. سکوت رد است. دعوای مستقیم ممکن است. اعتراض مهلت 60 روزه را متوقف می‌کند.</p>دعوای ابطال<p>دعوا در <strong>دادگاه اداری</strong> ظرف <strong>60 روز</strong>. مدت قبل از اعتراض کسر می‌شود.</p><p>درخواست توقف اجرا ممکن است. مشورت با وکیل توصیه می‌شود.</p>ورود با ویزای مشروح<p>ورود با ویزای مشروح حتی با باقی ماندن کد ممکن است.</p>",
  },
  {
    title: "دعوای ابطال تصمیم اخراج",
    content: "<p>ممکن است تصمیم اخراج هم وجود داشته باشد. دعوای ابطال ظرف <strong>7 روز</strong> لازم است. می‌توان رفع کد را هم خواست.</p><p>هرچه سریع‌تر اقدام شود. رجوع به \"چگونه تصمیم اخراج را لغو کنیم\".</p>اعتراض به نظارت اداری<p>اعتراض به <strong>دادگاه صلح جنایی</strong> استان والی.</p>",
  },
  {
    title: "رفع کد چقدر طول می‌کشد؟",
    content: "<p>دعوای ابطال حدود <strong>1 سال</strong>. اعتراض <strong>1-3 ماه</strong>.</p>",
  },
  {
    title: "هزینه دعوای رفع کد",
    content: "<p>حدود <strong>4,000 لیر</strong>. تعرفه 2023:</p>پست580,00 لیربا جلسه696,00 لیربا توقف اجرا812,00 لیرحق طرح269,85 لیر",
  },
  {
    title: "دادگاه صالح",
    content: "<p>دادگاه‌های اداری آنکارا. برای اخراج: دادگاه اداری استان والی.</p>",
  },
  {
    title: "نتیجه‌گیری",
    content: "<p>N-99 از شایع‌ترین کدهاست. رفع آن پر از تشریفات است. بدون لغو ورود ممکن نیست یا اخراج می‌شوند. مشورت با وکیل متخصص بسیار مهم است.</p>",
  },
];

export const contentSlug = "n-99-tahdit-kodu";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "N-99 Restriction Code",
    excerpt: "The N-99 restriction code is imposed on foreign nationals on the INTERPOL wanted list and brings an entry ban to Türkiye. Removal requires objection, annulment action, or annotated visa. If deportation also exists, separate annulment action is required.",
    shortDescription: "N-99, known in practice as the INTERPOL code, blocks entry to Türkiye for persons on INTERPOL lists. Prior approval is required in principle, but in practice it often operates as a full entry ban subject to legal challenge.",
    heroTitle: "N-99 Restriction Code",
    heroSubtitle: "Learn what the N-99 INTERPOL restriction code means, why it is imposed, how to remove it through objection or annulment action, and options including annotated visa applications.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "رمز التقييد N-99",
    excerpt: "رمز N-99 يُفرض على الأجانب في قائمة الإنتربول ويمنع الدخول إلى Türkiye. الإزالة تتطلب الطعن أو دعوى الإلغاء أو التأشيرة المشروحة. إن وُجد ترحيل يلزم دعوى منفصلة.",
    shortDescription: "N-99، المعروف برمز الإنتربول، يمنع دخول Türkiye لمن على قوائم الإنتربول. يتطلب إذناً مسبقاً نظرياً لكنه عملياً حظر دخول قابل للطعن.",
    heroTitle: "رمز التقييد N-99",
    heroSubtitle: "تعرّف معنى رمز N-99 وأسباب فرضه وكيفية إزالته بالطعن أو دعوى الإلغاء وخيارات التأشيرة المشروحة.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Код ограничения N-99",
    excerpt: "Код N-99 вводится против иностранцев из списка INTERPOL и блокирует въезд в Türkiye. Снятие требует возражения, иска об отмене или аннотированной визы. При депортации нужен отдельный иск.",
    shortDescription: "N-99, известный как код INTERPOL, блокирует въезд в Türkiye для лиц из списков INTERPOL. Формально требует предварительного разрешения, но на практике часто действует как полный запрет въезда.",
    heroTitle: "Код ограничения N-99",
    heroSubtitle: "Узнайте, что означает код N-99 INTERPOL, почему он вводится, как снять его через возражение или иск и какие есть варианты с аннотированной визой.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "کد محدودیت N-99",
    excerpt: "کد N-99 علیه اتباع خارجی در فهرست اینترپل وضع می‌شود و ورود به Türkiye را ممنوع می‌کند. رفع آن نیازمند اعتراض، دعوای ابطال یا ویزای مشروح است. اگر اخراج هم باشد دعوای جداگانه لازم است.",
    shortDescription: "N-99 که کد اینترپل نامیده می‌شود، ورود به Türkiye را برای افراد در فهرست اینترپل مسدود می‌کند. در اصل مجوز قبلی لازم است اما در عمل اغلب ممنوعیت کامل ورود است.",
    heroTitle: "کد محدودیت N-99",
    heroSubtitle: "با معنای کد N-99 اینترپل، دلایل وضع آن، نحوه رفع از طریق اعتراض یا دعوای ابطال و گزینه ویزای مشروح آشنا شوید.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
