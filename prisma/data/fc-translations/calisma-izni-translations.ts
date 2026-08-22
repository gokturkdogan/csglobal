import type { ServiceContentSection } from "../../../src/lib/service-page";
import { serializeServiceSections } from "../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "What is a work permit in Türkiye?",
    content: `<p>Foreign nationals who wish to work legally in Türkiye must hold a work permit or a status that grants the right to work, independent of their residence status. A work permit authorizes employment in Türkiye within a specific employer and occupation; duration and conditions vary by permit type.</p>
<p>Work permit applications are processed by the Ministry of Labour and Social Security. Applications are mostly submitted through e-Devlet or authorized online systems; different document sets and approval steps may apply for the employer and the foreign employee.</p>
<p>A work permit is not the same document as a residence permit. To reside in Türkiye, a residence permit is required; to work, a work permit or a residence status that includes the right to work is required. Before applying, the timing and document alignment of both processes should be planned.</p>`,
  },
  {
    title: "Types of work permits",
    content: `<p>The most commonly applied work permit types in Türkiye are listed below. Requirements, fees, and document lists differ for each type; the following list is for general information.</p>
<ul>
<li><strong>Temporary work permit:</strong> A permit granted for a specific employer and position, usually valid for up to one year. Renewal and employer change are subject to conditions.</li>
<li><strong>Indefinite work permit:</strong> An indefinite status that may be granted to foreign nationals with a long history of legal employment in Türkiye who meet specific conditions.</li>
<li><strong>Turquoise Card:</strong> A special status defined for qualified foreign personnel; work and residence rights are regulated together.</li>
<li><strong>Student work permit:</strong> An application type that allows foreign students studying in Türkiye to work under certain conditions.</li>
<li><strong>Self-employment and special cases:</strong> Special work permit categories linked to occupation type, sector, or agreements.</li>
</ul>
<p>Permit type selection is assessed together with the position, education level, employer type, and the foreign national's prior employment history. Applying under the wrong category may lead to refusal or loss of time.</p>`,
  },
  {
    title: "Application requirements",
    content: `<p>Although conditions sought for the employer and foreign employee in work permit applications vary by permit type, the general framework is as follows:</p>
<ul>
<li>Valid passport and appropriate residence status or a residence application plan</li>
<li>Employment contract, job description, and company documents submitted by the employer</li>
<li>Education and professional qualification documents (diploma, certificate; equivalency processes may be required)</li>
<li>Employer's legal activity documents and social security (SGK) records</li>
<li>Application form, undertaking, and fee payments</li>
<li>Additional licenses, permits, or ministry approvals in some sectors</li>
</ul>
<p>Prior work violations, unauthorized employment, or a history of refusals may adversely affect new applications. Employer change, position change, or updates in company structure may require a separate application or notification.</p>`,
  },
  {
    title: "Application and evaluation process",
    content: `<p>A work permit application is usually initiated online by the employer or authorized representative. The permit type is selected in the system, documents are uploaded, and the application is completed. During evaluation, missing document notices or requests for additional information may be issued.</p>
<p>Documents must be complete and up to date before application. Applications may not be processed due to incomplete files, or processing may take longer. During busy periods, evaluation times may extend; start-of-work planning should therefore follow a realistic timeline.</p>
<p>After approval, the work permit document is issued; alignment with the residence permit, social security registration, and lawful start of employment should be planned together. In case of refusal, the grounds are communicated and reapplication or appeal options are assessed.</p>`,
  },
  {
    title: "Duration, renewal and employer change",
    content: `<p>Work permits are granted for specific periods; a renewal application must be filed before expiry. Renewal requires documents showing that the employment relationship continues, up-to-date social security records, and current paperwork.</p>
<p>Employer change, position change, or company merger may require a new application or notification. Starting a new job under a permit tied to a former employer creates legal risk; the transition plan should be clarified in advance.</p>
<p>Continuing to work without legal status after a permit expires may lead to serious sanctions for both the employer and the foreign employee. Tracking validity and planning renewal are integral parts of the process.</p>`,
  },
  {
    title: "CSGLOBAL consultancy scope",
    content: `<p>CSGLOBAL provides document list preparation, employer and employee file review, application planning, and process tracking for work permit applications in Türkiye. Each application is assessed individually according to the position, sector, employer structure, and the foreign national's prior status.</p>
<p>Online application or document upload is not available through our website. You manage your process with our specialist consultants by phone or WhatsApp; we create a clear plan for document and timing steps.</p>
<p>When both a work permit and a residence permit are required, the timing and document alignment of both processes are planned separately. Contact us through our communication channels for detailed information and a preliminary assessment.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "ما هو تصريح العمل في Türkiye؟",
    content: `<p>يجب على الأجانب الذين يرغبون في العمل قانونياً في Türkiye الحصول على تصريح عمل أو وضع يمنح حق العمل، مستقلاً عن وضع الإقامة. يمنح تصريح العمل صلاحية العمل في Türkiye لدى صاحب عمل ومهنة محدَّدين؛ وتختلف المدة والشروط حسب نوع التصريح.</p>
<p>تُقيَّم طلبات تصريح العمل لدى وزارة العمل والضمان الاجتماعي. تُقدَّم الطلبات في الغالب عبر e-Devlet أو الأنظمة الإلكترونية المعتمدة؛ وقد تُطبَّق مجموعات مستندات وخطوات موافقة مختلفة على صاحب العمل والموظف الأجنبي.</p>
<p>تصريح العمل ليس هو نفسه تصريح الإقامة. للإقامة في Türkiye يلزم تصريح إقامة؛ وللعمل يلزم تصريح عمل أو وضع إقامة يتضمن حق العمل. قبل التقديم، ينبغي تخطيط توقيت العمليتين وتوافق المستندات.</p>`,
  },
  {
    title: "أنواع تصاريح العمل",
    content: `<p>فيما يلي أشهر أنواع تصاريح العمل المتقدَّم لها في Türkiye. تختلف الشروط والرسوم وقوائم المستندات لكل نوع؛ والقائمة التالية للمعلومات العامة.</p>
<ul>
<li><strong>تصريح عمل مؤقت:</strong> تصريح يُمنح لصاحب عمل ومنصب محدَّدين، وعادةً ما يكون سارياً لمدة تصل إلى سنة. التجديد وتغيير صاحب العمل يخضعان لشروط.</li>
<li><strong>تصريح عمل دائم:</strong> وضع دائم قد يُمنح للأجانب الذين لديهم تاريخ طويل من العمل القانوني في Türkiye ويستوفون شروطاً محددة.</li>
<li><strong>البطاقة الفيروزية (Turkuaz Kart):</strong> وضع خاص مخصص للكفاءات الأجنبية؛ تُنظَّم حقوق العمل والإقامة معاً.</li>
<li><strong>تصريح عمل للطلاب:</strong> نوع طلب يتيح للطلاب الأجانب في Türkiye العمل وفق شروط محددة.</li>
<li><strong>العمل الحر والحالات الخاصة:</strong> فئات تصاريح عمل خاصة مرتبطة بنوع المهنة أو القطاع أو الاتفاقيات.</li>
</ul>
<p>يُقيَّم اختيار نوع التصريح مع المنصب والمستوى التعليمي ونوع صاحب العمل وتاريخ عمل الأجنبي السابق. التقديم في فئة خاطئة قد يؤدي إلى الرفض أو فقدان الوقت.</p>`,
  },
  {
    title: "شروط التقديم",
    content: `<p>رغم أن الشروط المطلوبة من صاحب العمل والموظف الأجنبي في طلبات تصريح العمل تختلف حسب النوع، فإن الإطار العام كالتالي:</p>
<ul>
<li>جواز سفر ساري ووضع إقامة مناسب أو خطة لتقديم طلب إقامة</li>
<li>عقد عمل ووصف وظيفي ومستندات الشركة يقدمها صاحب العمل</li>
<li>مستندات التعليم والمؤهلات المهنية (شهادة، دبلوم؛ قد تُطلب إجراءات معادلة)</li>
<li>مستندات النشاط القانوني لصاحب العمل وسجلات الضمان الاجتماعي (SGK)</li>
<li>نموذج طلب وتعهد ودفع الرسوم</li>
<li>تراخيص أو موافقات وزارة إضافية في بعض القطاعات</li>
</ul>
<p>مخالفات العمل السابقة أو التوظيف غير المصرَّح به أو سجل الرفض قد يؤثر سلباً على الطلبات الجديدة. تغيير صاحب العمل أو المنصب أو التحديثات في هيكل الشركة قد يتطلب طلباً أو إخطاراً منفصلاً.</p>`,
  },
  {
    title: "عملية التقديم والتقييم",
    content: `<p>يُبدأ طلب تصريح العمل في الغالب عبر الإنترنت من قبل صاحب العمل أو الممثل المخوَّل. يُختار نوع التصريح في النظام، تُرفع المستندات، ويُستكمل الطلب. خلال التقييم، قد تُصدر إشعارات بنقص المستندات أو طلبات معلومات إضافية.</p>
<p>يجب أن تكون المستندات كاملة ومحدَّثة قبل التقديم. قد لا تُعالَج الطلبات بسبب نقص الملف، أو قد تطول المدة. في فترات الازدحام قد تمتد مدة التقييم؛ لذا ينبغي أن يكون تخطيط بدء العمل وفق جدول زمني واقعي.</p>
<p>بعد الموافقة، يُصدر مستند تصريح العمل؛ ينبغي تخطيط التوافق مع تصريح الإقامة وتسجيل الضمان الاجتماعي وبدء العمل القانوني معاً. في حال الرفض، تُبلَّغ الأسباب وتُقيَّم خيارات إعادة التقديم أو الاستئناف.</p>`,
  },
  {
    title: "المدة والتجديد وتغيير صاحب العمل",
    content: `<p>تُمنح تصاريح العمل لفترات محددة؛ ويجب تقديم طلب التجديد قبل انتهاء المدة. يتطلب التجديد مستندات تُثبت استمرار علاقة العمل، وسجلات ضمان اجتماعي محدَّثة، وأوراقاً حديثة.</p>
<p>قد يتطلب تغيير صاحب العمل أو المنصب أو اندماج الشركة طلباً أو إخطاراً جديداً. البدء في عمل جديد بتصريح مرتبط بصاحب عمل سابق ينطوي على مخاطر قانونية؛ ينبغي توضيح خطة الانتقال مسبقاً.</p>
<p>مواصلة العمل دون وضع قانوني بعد انتهاء التصريح قد يؤدي إلى عقوبات جسيمة على صاحب العمل والموظف الأجنبي. متابعة المدة وتخطيط التجديد جزء لا يتجزأ من العملية.</p>`,
  },
  {
    title: "نطاق استشارات CSGLOBAL",
    content: `<p>تقدِّم CSGLOBAL إعداد قائمة المستندات ومراجعة ملف صاحب العمل والموظف وتخطيط التقديم ومتابعة العملية لطلبات تصريح العمل في Türkiye. يُقيَّم كل طلب على حدة وفق المنصب والقطاع وهيكل صاحب العمل والوضع السابق للأجنبي.</p>
<p>لا يتوفر تقديم طلب أو رفع مستندات عبر موقعنا الإلكتروني. تدير عمليتك مع مستشارينا المتخصصين عبر الهاتف أو WhatsApp؛ ونضع خطة واضحة لخطوات المستندات والتوقيت.</p>
<p>عند الحاجة إلى تصريح عمل وتصريح إقامة معاً، يُخطَّط توقيت العمليتين وتوافق المستندات بشكل منفصل. تواصل معنا عبر قنوات الاتصال للحصول على معلومات تفصيلية وتقييم أولي.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Что такое разрешение на работу в Türkiye?",
    content: `<p>Иностранные граждане, желающие легально работать в Türkiye, должны иметь разрешение на работу или статус, дающий право на трудовую деятельность, независимо от статуса проживания. Разрешение на работу дает право трудоустройства в Türkiye у конкретного работодателя и по определенной профессии; срок и условия зависят от типа разрешения.</p>
<p>Заявления на разрешение на работу рассматриваются Министерством труда и социальной защиты. Заявки в основном подаются через e-Devlet или уполномоченные онлайн-системы; для работодателя и иностранного сотрудника могут применяться разные комплекты документов и этапы согласования.</p>
<p>Разрешение на работу и вид на жительство - это разные документы. Для проживания в Türkiye требуется вид на жительство; для работы - разрешение на работу или статус проживания, включающий право на трудовую деятельность. Перед подачей заявления следует спланировать сроки и согласованность документов для обоих процессов.</p>`,
  },
  {
    title: "Типы разрешений на работу",
    content: `<p>Ниже перечислены наиболее часто подаваемые типы разрешений на работу в Türkiye. Требования, пошлины и перечни документов для каждого типа различаются; список приведен для общей информации.</p>
<ul>
<li><strong>Срочное разрешение на работу:</strong> Разрешение, выдаваемое для конкретного работодателя и должности, обычно на срок до одного года. Продление и смена работодателя зависят от условий.</li>
<li><strong>Бессрочное разрешение на работу:</strong> Бессрочный статус, который может быть предоставлен иностранцам с длительной историей легальной работы в Türkiye при выполнении определенных условий.</li>
<li><strong>Turkuaz Kart (Бирюзовая карта):</strong> Специальный статус для квалифицированных иностранных специалистов; права на работу и проживание регулируются совместно.</li>
<li><strong>Разрешение на работу для студентов:</strong> Тип заявления, позволяющий иностранным студентам в Türkiye работать при определенных условиях.</li>
<li><strong>Самозанятость и особые случаи:</strong> Специальные категории разрешений на работу, связанные с типом профессии, сектором или соглашениями.</li>
</ul>
<p>Выбор типа разрешения оценивается вместе с должностью, уровнем образования, типом работодателя и предыдущей трудовой историей иностранца. Подача заявления в неверной категории может привести к отказу или потере времени.</p>`,
  },
  {
    title: "Требования к подаче заявления",
    content: `<p>Хотя условия для работодателя и иностранного сотрудника в заявлениях на разрешение на работу различаются в зависимости от типа, общая структура следующая:</p>
<ul>
<li>Действительный паспорт и подходящий статус проживания или план подачи заявления на вид на жительство</li>
<li>Трудовой договор, описание должности и документы компании, представленные работодателем</li>
<li>Документы об образовании и профессиональной квалификации (диплом, сертификат; может потребоваться процедура признания)</li>
<li>Документы о законной деятельности работодателя и записи в системе социального обеспечения (SGK)</li>
<li>Форма заявления, обязательство и оплата пошлин</li>
<li>Дополнительные лицензии, разрешения или согласования министерства в некоторых секторах</li>
</ul>
<p>Предыдущие нарушения трудового законодательства, нелегальная занятость или история отказов могут негативно повлиять на новые заявления. Смена работодателя, должности или изменения в структуре компании могут потребовать отдельного заявления или уведомления.</p>`,
  },
  {
    title: "Процесс подачи заявления и рассмотрения",
    content: `<p>Заявление на разрешение на работу обычно инициируется онлайн работодателем или уполномоченным представителем. В системе выбирается тип разрешения, загружаются документы и завершается заявление. На этапе рассмотрения могут поступить уведомления о недостающих документах или запросы дополнительной информации.</p>
<p>Документы должны быть полными и актуальными до подачи заявления. Заявление может не быть принято к рассмотрению из-за неполного пакета, или срок рассмотрения может увеличиться. В периоды высокой нагрузки сроки рассмотрения могут быть дольше; планирование начала работы следует строить на реалистичном графике.</p>
<p>После одобрения выдается документ разрешения на работу; согласование с видом на жительство, регистрация в системе социального обеспечения и законное начало работы следует планировать совместно. В случае отказа сообщаются основания и рассматриваются варианты повторной подачи или обжалования.</p>`,
  },
  {
    title: "Срок, продление и смена работодателя",
    content: `<p>Разрешения на работу выдаются на определенные сроки; заявление на продление необходимо подать до истечения срока. Для продления требуются документы, подтверждающие продолжение трудовых отношений, актуальные записи в системе социального обеспечения и обновленный пакет бумаг.</p>
<p>Смена работодателя, должности или слияние компаний может потребовать нового заявления или уведомления. Начало работы у нового работодателя по разрешению, привязанному к прежнему, создает правовые риски; план перехода следует определить заранее.</p>
<p>Продолжение работы без легального статуса после истечения разрешения может повлечь серьезные санкции как для работодателя, так и для иностранного сотрудника. Контроль срока и планирование продления являются неотъемлемой частью процесса.</p>`,
  },
  {
    title: "Объем консультационных услуг CSGLOBAL",
    content: `<p>CSGLOBAL предоставляет подготовку перечня документов, проверку дел работодателя и сотрудника, планирование подачи заявления и сопровождение процесса по разрешениям на работу в Türkiye. Каждое заявление оценивается индивидуально с учетом должности, сектора, структуры работодателя и предыдущего статуса иностранца.</p>
<p>Онлайн-подача заявления или загрузка документов через наш сайт недоступна. Вы ведете процесс с нашими специалистами по телефону или WhatsApp; мы составляем четкий план по документам и срокам.</p>
<p>Когда требуются и разрешение на работу, и вид на жительство, сроки и согласованность документов для обоих процессов планируются отдельно. Свяжитесь с нами через наши каналы связи для подробной информации и предварительной оценки.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "مجوز کار در Türkiye چیست؟",
    content: `<p>اتباع خارجی که قصد کار قانونی در Türkiye دارند، باید مستقل از وضعیت اقامت، مجوز کار یا وضعیتی داشته باشند که حق کار را فراهم کند. مجوز کار اجازه اشتغال در Türkiye را برای یک کارفرمای و شغل مشخص می‌دهد؛ مدت و شرایط بسته به نوع مجوز متفاوت است.</p>
<p>درخواست‌های مجوز کار در وزارت کار و تأمین اجتماعی بررسی می‌شوند. درخواست‌ها عمدتاً از طریق e-Devlet یا سامانه‌های آنلاین مجاز ثبت می‌شوند؛ برای کارفرما و کارمند خارجی ممکن است مجموعه مدارک و مراحل تأیید متفاوت باشد.</p>
<p>مجوز کار با مجوز اقامت یک سند نیست. برای اقامت در Türkiye مجوز اقامت لازم است؛ برای کار، مجوز کار یا وضعیت اقامتی که حق کار را شامل شود. پیش از درخواست، زمان‌بندی و هماهنگی مدارک هر دو فرآیند باید برنامه‌ریزی شود.</p>`,
  },
  {
    title: "انواع مجوز کار",
    content: `<p>رایج‌ترین انواع مجوز کار در Türkiye که برای آن‌ها درخواست ثبت می‌شود در زیر آمده است. شرایط، هزینه‌ها و فهرست مدارک هر نوع متفاوت است؛ فهرست زیر صرفاً برای اطلاعات عمومی است.</p>
<ul>
<li><strong>مجوز کار موقت:</strong> مجوزی که برای کارفرما و موقعیت شغلی مشخص صادر می‌شود و معمولاً تا یک سال اعتبار دارد. تمدید و تغییر کارفرما تابع شرایط است.</li>
<li><strong>مجوز کار دائم:</strong> وضعیتی نامحدود که ممکن است به اتباع خارجی با سابقه طولانی کار قانونی در Türkiye که شرایط را برآورده کنند، اعطا شود.</li>
<li><strong>کارت فیروزه‌ای (Turkuaz Kart):</strong> وضعیت ویژه برای نیروی متخصص خارجی؛ حقوق کار و اقامت با هم تنظیم می‌شوند.</li>
<li><strong>مجوز کار دانشجویی:</strong> نوع درخواستی که به دانشجویان خارجی در Türkiye تحت شرایط مشخص اجازه کار می‌دهد.</li>
<li><strong>کار آزاد و موارد خاص:</strong> دسته‌های ویژه مجوز کار مرتبط با نوع شغل، بخش یا توافق‌نامه‌ها.</li>
</ul>
<p>انتخاب نوع مجوز همراه با موقعیت شغلی، سطح تحصیلات، نوع کارفرما و سابقه کاری قبلی اتباع خارجی ارزیابی می‌شود. ثبت درخواست در دسته نادرست ممکن است به رد یا اتلاف وقت منجر شود.</p>`,
  },
  {
    title: "شرایط درخواست",
    content: `<p>اگرچه شرایط مورد انتظار از کارفرما و کارمند خارجی در درخواست‌های مجوز کار بسته به نوع متفاوت است، چارچوب کلی به شرح زیر است:</p>
<ul>
<li>گذرنامه معتبر و وضعیت اقامت مناسب یا برنامه درخواست اقامت</li>
<li>قرارداد کار، شرح موقعیت شغلی و مدارک شرکت ارائه‌شده توسط کارفرما</li>
<li>مدارک تحصیلی و صلاحیت حرفه‌ای (مدرک تحصیلی، گواهی؛ ممکن است فرآیند معادل‌سازی لازم باشد)</li>
<li>مدارک فعالیت قانونی کارفرما و سوابق تأمین اجتماعی (SGK)</li>
<li>فرم درخواست، تعهدنامه و پرداخت هزینه‌ها</li>
<li>مجوزها یا تأییدیه‌های وزارتخانه اضافی در برخی بخش‌ها</li>
</ul>
<p>تخلفات کاری قبلی، اشتغال غیرمجاز یا سابقه رد می‌تواند بر درخواست‌های جدید تأثیر منفی بگذارد. تغییر کارفرما، تغییر موقعیت شغلی یا به‌روزرسانی ساختار شرکت ممکن است درخواست یا اطلاع جداگانه بخواهد.</p>`,
  },
  {
    title: "فرآیند درخواست و بررسی",
    content: `<p>درخواست مجوز کار معمولاً توسط کارفرما یا نماینده مجاز به‌صورت آنلاین آغاز می‌شود. نوع مجوز در سامانه انتخاب می‌شود، مدارک بارگذاری می‌شوند و درخواست تکمیل می‌شود. در مرحله بررسی، ممکن است اعلان نقص مدارک یا درخواست اطلاعات تکمیلی صادر شود.</p>
<p>مدارک باید پیش از درخواست کامل و به‌روز باشند. ممکن است به‌دلیل نقص پرونده درخواست پذیرفته نشود یا مدت بررسی طولانی شود. در دوره‌های شلوغ، زمان بررسی ممکن است بیشتر شود؛ بنابراین برنامه شروع کار باید با جدول زمانی واقع‌بینانه تنظیم شود.</p>
<p>پس از تأیید، سند مجوز کار صادر می‌شود؛ هماهنگی با مجوز اقامت، ثبت تأمین اجتماعی و شروع قانونی کار باید با هم برنامه‌ریزی شود. در صورت رد، دلایل اعلام می‌شود و گزینه‌های درخواست مجدد یا تجدیدنظر بررسی می‌شود.</p>`,
  },
  {
    title: "مدت، تمدید و تغییر کارفرما",
    content: `<p>مجوزهای کار برای مدت‌های مشخص صادر می‌شوند؛ درخواست تمدید باید پیش از پایان مدت ثبت شود. برای تمدید، مدارکی لازم است که ادامه رابطه کاری را نشان دهند، همراه با سوابق به‌روز تأمین اجتماعی و مدارک جاری.</p>
<p>تغییر کارفرما، تغییر موقعیت شغلی یا ادغام شرکت ممکن است درخواست یا اطلاع جدید بخواهد. شروع کار در شغل جدید با مجوزی که به کارفرمای قبلی وابسته است ریسک حقوقی ایجاد می‌کند؛ برنامه انتقال باید از قبل روشن شود.</p>
<p>ادامه کار بدون وضعیت قانونی پس از پایان مجوز می‌تواند برای کارفرما و کارمند خارجی منجر به جریمه‌های جدی شود. پیگیری مدت و برنامه‌ریزی تمدید بخش جدایی‌ناپذیر فرآیند است.</p>`,
  },
  {
    title: "دامنه مشاوره CSGLOBAL",
    content: `<p>CSGLOBAL برای درخواست‌های مجوز کار در Türkiye، تهیه فهرست مدارک، بررسی پرونده کارفرما و کارمند، برنامه‌ریزی درخواست و پیگیری فرآیند ارائه می‌دهد. هر درخواست با توجه به موقعیت شغلی، بخش، ساختار کارفرما و وضعیت قبلی اتباع خارجی به‌صورت جداگانه ارزیابی می‌شود.</p>
<p>ثبت درخواست آنلاین یا بارگذاری مدارک از طریق وب‌سایت ما امکان‌پذیر نیست. فرآیند خود را با مشاوران متخصص ما از طریق تلفن یا WhatsApp مدیریت می‌کنید؛ برای مراحل مدارک و زمان‌بندی، برنامه‌ای روشن تنظیم می‌کنیم.</p>
<p>وقتی هم مجوز کار و هم مجوز اقامت لازم باشد، زمان‌بندی و هماهنگی مدارک هر دو فرآیند جداگانه برنامه‌ریزی می‌شود. برای اطلاعات تفصیلی و ارزیابی اولیه از کانال‌های ارتباطی ما با ما تماس بگیرید.</p>`,
  },
];

export const calismaIzniCategoryTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Türkiye Work Permit",
    excerpt:
      "Document lists, application planning, and process tracking for Türkiye work permit applications, renewals, and employer change. CSGLOBAL consultancy.",
    shortDescription:
      "We plan your foreign employee work permit applications with document, timing, and renewal steps.",
    heroTitle: "Türkiye work permit consultancy",
    heroSubtitle:
      "We build your document and application plan together for temporary work permits, Turquoise Card, and student work permit applications.",
    sectionsJson: serializeServiceSections(enSections),
    featureImage1Title: "Document list and file review",
    featureImage1Text:
      "We prepare the document list according to permit type and position; we check employment contract, company documents, diploma, and social security records before application. We review the file together to reduce refusal risk from incomplete or incorrect documents.",
    featureImage2Title: "Application and renewal tracking",
    featureImage2Text:
      "We plan online application, evaluation, and permit document stages on a calendar. As expiry approaches, we send reminders and reorganize the process with an up-to-date document list for renewal, employer change, and residence permit alignment.",
  },
  ar: {
    name: "تصريح العمل في Türkiye",
    excerpt:
      "قوائم المستندات وتخطيط التقديم ومتابعة العملية لطلبات تصريح العمل في Türkiye والتجديد وتغيير صاحب العمل. استشارات CSGLOBAL.",
    shortDescription:
      "نخطط لطلبات تصريح عمل الموظفين الأجانب عبر خطوات المستندات والتوقيت والتجديد.",
    heroTitle: "استشارات تصريح العمل في Türkiye",
    heroSubtitle:
      "نضع معاً خطة المستندات والتقديم لطلبات تصريح العمل المؤقت والبطاقة الفيروزية وتصريح عمل الطلاب.",
    sectionsJson: serializeServiceSections(arSections),
    featureImage1Title: "قائمة المستندات ومراجعة الملف",
    featureImage1Text:
      "نُعد قائمة المستندات حسب نوع التصريح والمنصب؛ ونتحقق من عقد العمل ومستندات الشركة والشهادة وسجلات الضمان الاجتماعی قبل التقديم. نراجع الملف معاً لتقليل مخاطر الرفض بسبب نقص أو خطأ في المستندات.",
    featureImage2Title: "متابعة التقديم والتجديد",
    featureImage2Text:
      "نخطط التقديم الإلكتروني والتقييم ومراحل مستند التصريح على التقويم. عند اقتراب انتهاء المدة، نُذكّرك ونعيد تنظيم العملية بقائمة مستندات محدَّثة للتجديد وتغيير صاحب العمل وتوافق تصريح الإقامة.",
  },
  ru: {
    name: "Разрешение на работу в Türkiye",
    excerpt:
      "Перечни документов, планирование подачи и сопровождение процесса по заявлениям на разрешение на работу в Türkiye, продлению и смене работодателя. Консультации CSGLOBAL.",
    shortDescription:
      "Мы планируем заявления на разрешение на работу для иностранных сотрудников с учетом документов, сроков и продления.",
    heroTitle: "Консультации по разрешению на работу в Türkiye",
    heroSubtitle:
      "Мы вместе составляем план документов и подачи заявления для срочных разрешений на работу, Turkuaz Kart и разрешений на работу для студентов.",
    sectionsJson: serializeServiceSections(ruSections),
    featureImage1Title: "Перечень документов и проверка дела",
    featureImage1Text:
      "Мы составляем перечень документов в зависимости от типа разрешения и должности; проверяем трудовой договор, документы компании, диплом и записи SGK до подачи заявления. Мы совместно проверяем дело, чтобы снизить риск отказа из-за неполного или ошибочного пакета документов.",
    featureImage2Title: "Сопровождение подачи и продления",
    featureImage2Text:
      "Мы планируем онлайн-подачу, рассмотрение и этапы выдачи разрешения по календарю. По мере приближения срока действия напоминаем и организуем процесс заново с актуальным перечнем документов для продления, смены работодателя и согласования с видом на жительство.",
  },
  fa: {
    name: "مجوز کار Türkiye",
    excerpt:
      "فهرست مدارک، برنامه‌ریزی درخواست و پیگیری فرآیند برای درخواست مجوز کار Türkiye، تمدید و تغییر کارفرما. مشاوره CSGLOBAL.",
    shortDescription:
      "درخواست‌های مجوز کار کارکنان خارجی شما را با مراحل مدارک، زمان‌بندی و تمدید برنامه‌ریزی می‌کنیم.",
    heroTitle: "مشاوره مجوز کار Türkiye",
    heroSubtitle:
      "برای درخواست‌های مجوز کار موقت، کارت فیروزه‌ای و مجوز کار دانشجویی، برنامه مدارک و درخواست را با هم تنظیم می‌کنیم.",
    sectionsJson: serializeServiceSections(faSections),
    featureImage1Title: "فهرست مدارک و بررسی پرونده",
    featureImage1Text:
      "فهرست مدارک را بر اساس نوع مجوز و موقعیت شغلی تهیه می‌کنیم؛ قرارداد کار، مدارک شرکت، مدرک تحصیلی و سوابق SGK را پیش از درخواست بررسی می‌کنیم. برای کاهش ریسک رد به‌دلیل نقص یا خطا در مدارک، پرونده را با هم مرور می‌کنیم.",
    featureImage2Title: "پیگیری درخواست و تمدید",
    featureImage2Text:
      "درخواست آنلاین، بررسی و مراحل سند مجوز را روی تقویم برنامه‌ریزی می‌کنیم. با نزدیک شدن به پایان مجوز، یادآوری می‌کنیم و فرآیند را با فهرست مدارک به‌روز برای تمدید، تغییر کارفرما و هماهنگی مجوز اقامت دوباره ساماندهی می‌کنیم.",
  },
};

