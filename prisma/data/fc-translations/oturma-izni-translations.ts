import type { ServiceContentSection } from "../../../src/lib/service-page";
import { serializeServiceSections } from "../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "What is a residence permit in Türkiye?",
    content: `<p>Foreign nationals who wish to reside legally in Türkiye must obtain a residence permit (ikamet izni) in addition to the visa used for entry. A residence permit grants the right to stay in Türkiye for a specified period; duration and conditions vary by permit type.</p>
<p>Residence permits are processed by the Directorate General of Migration Management. Applications are mostly submitted through the e-Residence system; appointment scheduling, document submission, and card issuance stages may differ depending on the permit type.</p>
<p>A residence permit is not the same document as a work permit. To work in Türkiye, a separate work permit or a residence status that includes the right to work is required. It is important to clarify the permit type suited to your purpose before applying.</p>`,
  },
  {
    title: "Types of residence permits",
    content: `<p>The most commonly applied residence permit types in Türkiye are listed below. Requirements and document lists differ for each type; the following list is for general information.</p>
<ul>
<li><strong>Short-term residence permit:</strong> For short-term stays such as tourism, business relations, or accommodation. Usually granted for up to one year; renewal conditions depend on the stated purpose of stay.</li>
<li><strong>Family residence permit:</strong> For spouses, parents, or dependent family members of Turkish citizens or foreign nationals legally residing in Türkiye.</li>
<li><strong>Long-term residence permit:</strong> An indefinite status that may be granted to foreign nationals who have resided in Türkiye continuously and legally for a long period, subject to specific conditions.</li>
<li><strong>Student residence permit:</strong> For foreign students enrolled at an educational institution in Türkiye.</li>
<li><strong>Human resources-linked residence permit:</strong> Residence types tied to a work permit or a status that grants the right to work.</li>
</ul>
<p>Permit type selection is assessed together with passport type, prior residence history, and the stated purpose of application. Applying under the wrong category may lead to refusal or additional delays.</p>`,
  },
  {
    title: "Application requirements",
    content: `<p>Although conditions sought in residence permit applications vary by permit type, the general framework is as follows:</p>
<ul>
<li>Valid passport or passport-equivalent document</li>
<li>Visa or visa exemption required for entry to Türkiye (depending on application type)</li>
<li>Documents supporting the purpose of residence (accommodation, enrollment, family ties, etc.)</li>
<li>Health insurance (type and coverage requirements may vary)</li>
<li>Biometric photograph and application form</li>
<li>Address declaration or documents relating to the residence address</li>
</ul>
<p>Some applications may require fees, undertakings, or additional financial documents. Prior residence violations, unauthorized work, or a history of refusals may adversely affect new applications.</p>`,
  },
  {
    title: "Application and appointment process",
    content: `<p>Residence permit applications are initiated through e-Residence. The permit type is selected in the system, the form is completed, and an appointment is booked. On the appointment date, the applicant or authorized representative submits documents to the designated Migration Management office.</p>
<p>Documents must be complete and up to date before the appointment. Applications may not be processed due to missing documents, or the appointment may need to be rescheduled. During busy periods, appointment dates may be pushed to later months; planning should therefore begin early.</p>
<p>After evaluation, approved applications proceed to residence card printing and delivery. In case of refusal, the grounds are communicated and appeal or reapplication options are assessed.</p>`,
  },
  {
    title: "Duration, renewal and long-term residence",
    content: `<p>Residence permits are granted for specific periods; a renewal application must be filed before expiry. Renewal requires documents showing that the purpose of residence continues, along with up-to-date paperwork.</p>
<p>Long-term residence permit is an indefinite status that may be granted to foreign nationals who have resided in Türkiye continuously and legally for a specified period, once the conditions are met. This status comes with specific rights and obligations; application conditions are defined in detail in the legislation.</p>
<p>Remaining in Türkiye after a permit expires without legal status creates risk. Tracking validity and planning renewal are integral parts of the application process.</p>`,
  },
  {
    title: "CSGLOBAL consultancy scope",
    content: `<p>CSGLOBAL provides document list preparation, file review, appointment planning, and process tracking for residence permit applications in Türkiye. Each application is assessed individually according to the applicant's purpose of residence, prior status, and family situation.</p>
<p>Online application or document upload is not available through our website. You manage your process with our specialist consultants by phone or WhatsApp; we create a clear plan for document and appointment steps.</p>
<p>When both a residence permit and a work permit are required, the timing and document alignment of both processes are planned separately. Contact us through our communication channels for detailed information and a preliminary assessment.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "ما هو تصريح الإقامة في Türkiye؟",
    content: `<p>يجب على الأجانب الذين يرغبون في الإقامة قانونياً في Türkiye الحصول على تصريح إقامة (ikamet izni) بالإضافة إلى التأشيرة المستخدمة للدخول. يمنح تصريح الإقامة الحق في البقاء في Türkiye لفترة محددة، وتختلف المدة والشروط حسب نوع التصريح.</p>
<p>تُقيَّم تصاريح الإقامة لدى المديرية العامة لإدارة الهجرة. تُقدَّم الطلبات في الغالب عبر نظام e-Residence؛ وقد تختلف مراحل حجز الموعد وتسليم المستندات وطباعة البطاقة حسب نوع التصريح.</p>
<p>تصريح الإقامة ليس هو نفسه تصريح العمل. للعمل في Türkiye يلزم تصريح عمل منفصل أو وضع إقامة يمنح حق العمل. من المهم تحديد نوع التصريح المناسب لهدفك قبل التقديم.</p>`,
  },
  {
    title: "أنواع تصاريح الإقامة",
    content: `<p>فيما يلي أشهر أنواع تصاريح الإقامة المتقدَّم لها في Türkiye. تختلف شروط كل نوع وقائمة المستندات؛ والقائمة التالية للمعلومات العامة.</p>
<ul>
<li><strong>تصريح إقامة قصير الأمد:</strong> للإقامات قصيرة الأمد مثل السياحة أو العلاقات التجارية أو الإقامة الفندقية. تُمنح عادةً لمدة تصل إلى سنة؛ وتعتمد شروط التجديد على سبب الإقامة.</li>
<li><strong>تصريح إقامة عائلي:</strong> للزوج أو الوالدين أو أفراد الأسرة المعالين لمواطن تركي أو أجنبي مقيم قانونياً في Türkiye.</li>
<li><strong>تصريح إقامة طويل الأمد:</strong> وضع دائم قد يُمنح للأجانب الذين أقاموا في Türkiye بشكل متواصل وقانوني لفترة طويلة، وفق شروط محددة.</li>
<li><strong>تصريح إقامة طالب:</strong> للطلاب الأجانب المسجَّلين في مؤسسة تعليمية في Türkiye.</li>
<li><strong>تصريح إقامة مرتبط بالموارد البشرية:</strong> أنواع إقامة مرتبطة بتصريح عمل أو وضع يمنح حق العمل.</li>
</ul>
<p>يُقيَّم اختيار نوع التصريح مع نوع جواز السفر وتاريخ الإقامة السابق وسبب التقديم. التقديم في فئة خاطئة قد يؤدي إلى الرفض أو تأخير إضافي.</p>`,
  },
  {
    title: "شروط التقديم",
    content: `<p>رغم أن الشروط المطلوبة في طلبات تصريح الإقامة تختلف حسب النوع، فإن الإطار العام كالتالي:</p>
<ul>
<li>جواز سفر ساري أو وثيقة معادلة</li>
<li>تأشيرة أو إعفاء من التأشيرة مطلوب للدخول إلى Türkiye (حسب نوع الطلب)</li>
<li>مستندات تدعم غرض الإقامة (سكن، تسجيل دراسي، روابط عائلية، إلخ)</li>
<li>تأمين صحي (قد تختلف نوع التغطية والشروط)</li>
<li>صورة بيومترية ونموذج طلب</li>
<li>إقرار عنوان أو مستندات متعلقة بعنوان الإقامة</li>
</ul>
<p>قد تُطلب في بعض الطلبات رسوم أو تعهدات أو مستندات مالية إضافية. مخالفات الإقامة السابقة أو العمل غير المصرَّح به أو سجل الرفض قد يؤثر سلباً على الطلبات الجديدة.</p>`,
  },
  {
    title: "عملية التقديم والموعد",
    content: `<p>تبدأ طلبات تصريح الإقامة عبر e-Residence. يُختار نوع التصريح في النظام، ويُملأ النموذج، ويُحجز موعد. في يوم الموعد، يُسلِّم مقدِّم الطلب أو الممثل المخوَّل المستندات إلى مكتب إدارة الهجرة المحدَّد.</p>
<p>يجب أن تكون المستندات كاملة ومحدَّثة قبل الموعد. قد لا تُعالَج الطلبات بسبب نقص المستندات، أو قد يلزم إعادة جدولة الموعد. في فترات الازدحام قد تُؤجَّل مواعيد الحجز إلى أشهر لاحقة؛ لذا يُفضَّل التخطيط مبكراً.</p>
<p>بعد التقييم، تُستكمل في الطلبات المعتمدة مراحل طباعة بطاقة الإقامة وتسليمها. في حال الرفض، تُبلَّغ الأسباب وتُقيَّم خيارات الاستئناف أو إعادة التقديم.</p>`,
  },
  {
    title: "المدة والتجديد والإقامة طويلة الأمد",
    content: `<p>تُمنح تصاريح الإقامة لفترات محددة؛ ويجب تقديم طلب التجديد قبل انتهاء المدة. يتطلب التجديد مستندات تُثبت استمرار غرض الإقامة، إضافة إلى أوراق محدَّثة.</p>
<p>تصريح الإقامة طويل الأمد هو وضع دائم قد يُمنح للأجانب الذين أقاموا في Türkiye بشكل متواصل وقانوني لفترة محددة عند استيفاء الشروط. يأتي هذا الوضع مع حقوق والتزامات محددة؛ وتُحدَّد شروط التقديم بالتفصيل في التشريعات.</p>
<p>البقاء في Türkiye بعد انتهاء التصريح دون وضع قانوني ينطوي على مخاطر. متابعة المدة وتخطيط التجديد جزء لا يتجزأ من عملية التقديم.</p>`,
  },
  {
    title: "نطاق استشارات CSGLOBAL",
    content: `<p>تقدِّم CSGLOBAL إعداد قائمة المستندات ومراجعة الملف وتخطيط المواعيد ومتابعة العملية لطلبات تصريح الإقامة في Türkiye. يُقيَّم كل طلب على حدة وفق غرض الإقامة والوضع السابق والوضع العائلي.</p>
<p>لا يتوفر تقديم طلب أو رفع مستندات عبر موقعنا الإلكتروني. تدير عمليتك مع مستشارينا المتخصصين عبر الهاتف أو WhatsApp؛ ونضع خطة واضحة لخطوات المستندات والمواعيد.</p>
<p>عند الحاجة إلى تصريح إقامة وتصريح عمل معاً، يُخطَّط توقيت العمليتين وتوافق المستندات بشكل منفصل. تواصل معنا عبر قنوات الاتصال للحصول على معلومات تفصيلية وتقييم أولي.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Что такое вид на жительство в Türkiye?",
    content: `<p>Иностранные граждане, желающие легально проживать в Türkiye, должны получить вид на жительство (ikamet izni) помимо визы, использованной для въезда. Вид на жительство предоставляет право пребывания в Türkiye на определенный срок; срок и условия зависят от типа разрешения.</p>
<p>Заявления на вид на жительство рассматриваются Главным управлением по делам миграции. Заявки в основном подаются через систему e-Residence; этапы записи на прием, сдачи документов и изготовления карты могут различаться в зависимости от типа разрешения.</p>
<p>Вид на жительство и разрешение на работу - это разные документы. Для работы в Türkiye требуется отдельное разрешение на работу или статус проживания, дающий право на трудовую деятельность. Перед подачей заявления важно определить подходящий тип разрешения.</p>`,
  },
  {
    title: "Типы видов на жительство",
    content: `<p>Ниже перечислены наиболее часто подаваемые типы видов на жительство в Türkiye. Требования и перечень документов для каждого типа различаются; список приведен для общей информации.</p>
<ul>
<li><strong>Краткосрочный вид на жительство:</strong> Для краткосрочного пребывания, например в целях туризма, деловых связей или проживания. Обычно выдается на срок до одного года; условия продления зависят от цели пребывания.</li>
<li><strong>Семейный вид на жительство:</strong> Для супругов, родителей или иждивенцев граждан Türkiye или иностранцев, легально проживающих в стране.</li>
<li><strong>Долгосрочный вид на жительство:</strong> Бессрочный статус, который может быть предоставлен иностранцам, непрерывно и легально проживавшим в Türkiye длительное время, при выполнении определенных условий.</li>
<li><strong>Студенческий вид на жительство:</strong> Для иностранных студентов, обучающихся в образовательном учреждении в Türkiye.</li>
<li><strong>Вид на жительство, связанный с трудовыми ресурсами:</strong> Типы проживания, связанные с разрешением на работу или статусом, дающим право на трудовую деятельность.</li>
</ul>
<p>Выбор типа разрешения оценивается вместе с типом паспорта, предыдущей историей проживания и заявленной целью. Подача заявления в неверной категории может привести к отказу или дополнительным задержкам.</p>`,
  },
  {
    title: "Требования к подаче заявления",
    content: `<p>Хотя условия для заявлений на вид на жительство различаются в зависимости от типа, общая структура следующая:</p>
<ul>
<li>Действительный паспорт или документ, его заменяющий</li>
<li>Виза или визовое освобождение, необходимые для въезда в Türkiye (в зависимости от типа заявления)</li>
<li>Документы, подтверждающие цель проживания (жилье, зачисление в учебное заведение, семейные связи и т. д.)</li>
<li>Медицинская страховка (тип и условия покрытия могут различаться)</li>
<li>Биометрическая фотография и форма заявления</li>
<li>Декларация адреса или документы, относящиеся к адресу проживания</li>
</ul>
<p>В некоторых заявлениях могут потребоваться пошлины, обязательства или дополнительные финансовые документы. Предыдущие нарушения режима проживания, нелегальная работа или история отказов могут негативно повлиять на новые заявления.</p>`,
  },
  {
    title: "Процесс подачи заявления и записи на прием",
    content: `<p>Заявления на вид на жительство начинаются через e-Residence. В системе выбирается тип разрешения, заполняется форма и назначается прием. В день приема заявитель или уполномоченный представитель сдает документы в указанное подразделение управления миграцией.</p>
<p>Документы должны быть полными и актуальными до даты приема. Заявление может не быть принято к рассмотрению из-за неполного пакета документов, или потребуется перенос записи. В периоды высокой нагрузки даты приема могут сдвигаться на более поздние месяцы; планирование следует начинать заранее.</p>
<p>После рассмотрения одобренные заявления переходят к этапам изготовления и выдачи карты проживания. В случае отказа сообщаются основания и рассматриваются варианты обжалования или повторной подачи.</p>`,
  },
  {
    title: "Срок, продление и долгосрочное проживание",
    content: `<p>Виды на жительство выдаются на определенные сроки; заявление на продление необходимо подать до истечения срока. Для продления требуются документы, подтверждающие сохранение цели проживания, а также актуальный пакет бумаг.</p>
<p>Долгосрочный вид на жительство - это бессрочный статус, который может быть предоставлен иностранцам, непрерывно и легально проживавшим в Türkiye определенный период, при выполнении условий. Этот статус сопровождается определенными правами и обязанностями; условия подачи подробно определены в законодательстве.</p>
<p>Пребывание в Türkiye после истечения срока разрешения без легального статуса создает риски. Контроль срока и планирование продления являются неотъемлемой частью процесса подачи заявления.</p>`,
  },
  {
    title: "Объем консультационных услуг CSGLOBAL",
    content: `<p>CSGLOBAL предоставляет подготовку перечня документов, проверку дела, планирование записи на прием и сопровождение процесса по заявлениям на вид на жительство в Türkiye. Каждое заявление оценивается индивидуально с учетом цели проживания, предыдущего статуса и семейной ситуации заявителя.</p>
<p>Онлайн-подача заявления или загрузка документов через наш сайт недоступна. Вы ведете процесс с нашими специалистами по телефону или WhatsApp; мы составляем четкий план по документам и этапам записи на прием.</p>
<p>Когда требуются и вид на жительство, и разрешение на работу, сроки и согласованность документов для обоих процессов планируются отдельно. Свяжитесь с нами через наши каналы связи для подробной информации и предварительной оценки.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "مجوز اقامت در Türkiye چیست؟",
    content: `<p>اتباع خارجی که قصد اقامت قانونی در Türkiye دارند، باید علاوه بر ویزای ورود، مجوز اقامت (ikamet izni) دریافت کنند. مجوز اقامت حق ماندن در Türkiye را برای مدت مشخصی فراهم می‌کند؛ مدت و شرایط بسته به نوع مجوز متفاوت است.</p>
<p>مجوزهای اقامت در اداره کل مدیریت مهاجرت بررسی می‌شوند. درخواست‌ها عمدتاً از طریق سامانه e-Residence ثبت می‌شوند؛ مراحل نوبت‌دهی، تحویل مدارک و صدور کارت بسته به نوع مجوز ممکن است متفاوت باشد.</p>
<p>مجوز اقامت با مجوز کار یک سند نیست. برای کار در Türkiye، مجوز کار جداگانه یا وضعیت اقامتی که حق کار را شامل شود لازم است. قبل از ثبت درخواست، تعیین نوع مجوز متناسب با هدف شما اهمیت دارد.</p>`,
  },
  {
    title: "انواع مجوز اقامت",
    content: `<p>رایج‌ترین انواع مجوز اقامت در Türkiye که برای آن‌ها درخواست ثبت می‌شود در زیر آمده است. شرایط و فهرست مدارک هر نوع متفاوت است؛ فهرست زیر صرفاً برای اطلاعات عمومی است.</p>
<ul>
<li><strong>مجوز اقامت کوتاه‌مدت:</strong> برای اقامت‌های کوتاه‌مدت مانند گردشگری، روابط تجاری یا اقامت. معمولاً تا یک سال صادر می‌شود؛ شرایط تمدید به دلیل اقامت بستگی دارد.</li>
<li><strong>مجوز اقامت خانوادگی:</strong> برای همسر، والدین یا اعضای وابسته خانواده شهروند Türkiye یا اتباع خارجی که به‌صورت قانونی در کشور اقامت دارند.</li>
<li><strong>مجوز اقامت بلندمدت:</strong> وضعیتی نامحدود که ممکن است به اتباع خارجی که مدت طولانی به‌صورت پیوسته و قانونی در Türkiye اقامت داشته‌اند، در صورت برآورده شدن شرایط، اعطا شود.</li>
<li><strong>مجوز اقامت دانشجویی:</strong> برای دانشجویان خارجی ثبت‌نام‌شده در مؤسسه آموزشی در Türkiye.</li>
<li><strong>مجوز اقامت مرتبط با منابع انسانی:</strong> انواع اقامت مرتبط با مجوز کار یا وضعیتی که حق کار را فراهم می‌کند.</li>
</ul>
<p>انتخاب نوع مجوز همراه با نوع گذرنامه، سابقه اقامت قبلی و دلیل درخواست ارزیابی می‌شود. ثبت درخواست در دسته نادرست ممکن است به رد یا تأخیر اضافی منجر شود.</p>`,
  },
  {
    title: "شرایط درخواست",
    content: `<p>اگرچه شرایط درخواست مجوز اقامت بسته به نوع متفاوت است، چارچوب کلی به شرح زیر است:</p>
<ul>
<li>گذرنامه معتبر یا سند معادل آن</li>
<li>ویزا یا معافیت ویزا برای ورود به Türkiye (بسته به نوع درخواست)</li>
<li>مدارکی که هدف اقامت را پشتیبانی می‌کنند (مسکن، ثبت‌نام تحصیلی، پیوندهای خانوادگی و غیره)</li>
<li>بیمه درمانی (نوع و شرایط پوشش ممکن است متفاوت باشد)</li>
<li>عکس بیومتریک و فرم درخواست</li>
<li>اظهار آدرس یا مدارک مربوط به آدرس اقامت</li>
</ul>
<p>در برخی درخواست‌ها ممکن است هزینه‌ها، تعهدنامه یا مدارک مالی اضافی لازم باشد. تخلفات قبلی در اقامت، کار غیرمجاز یا سابقه رد، می‌تواند بر درخواست‌های جدید تأثیر منفی بگذارد.</p>`,
  },
  {
    title: "فرآیند درخواست و نوبت",
    content: `<p>درخواست‌های مجوز اقامت از طریق e-Residence آغاز می‌شوند. نوع مجوز در سامانه انتخاب می‌شود، فرم تکمیل می‌شود و نوبت گرفته می‌شود. در روز نوبت، متقاضی یا نماینده مجاز مدارک را به واحد تعیین‌شده مدیریت مهاجرت تحویل می‌دهد.</p>
<p>مدارک باید پیش از نوبت کامل و به‌روز باشند. ممکن است به‌دلیل نقص مدارک درخواست پذیرفته نشود یا نیاز به برنامه‌ریزی مجدد نوبت باشد. در دوره‌های شلوغ، تاریخ نوبت ممکن است به ماه‌های بعد موکول شود؛ بنابراین برنامه‌ریزی باید زودتر انجام شود.</p>
<p>پس از بررسی، درخواست‌های تأییدشده به مراحل چاپ و تحویل کارت اقامت می‌رسند. در صورت رد، دلایل اعلام می‌شود و گزینه‌های تجدیدنظر یا درخواست مجدد بررسی می‌شود.</p>`,
  },
  {
    title: "مدت، تمدید و اقامت بلندمدت",
    content: `<p>مجوزهای اقامت برای مدت‌های مشخص صادر می‌شوند؛ درخواست تمدید باید پیش از پایان مدت ثبت شود. برای تمدید، مدارکی لازم است که ادامه هدف اقامت را نشان دهند، همراه با مدارک به‌روز.</p>
<p>مجوز اقامت بلندمدت وضعیتی نامحدود است که ممکن است به اتباع خارجی که مدت مشخصی به‌صورت پیوسته و قانونی در Türkiye اقامت داشته‌اند، در صورت برآورده شدن شرایط، اعطا شود. این وضعیت با حقوق و تعهدات مشخص همراه است؛ شرایط درخواست در قوانین به‌تفصیل تعریف شده است.</p>
<p>ماندن در Türkiye پس از پایان مجوز بدون وضعیت قانونی ریسک ایجاد می‌کند. پیگیری مدت و برنامه‌ریزی تمدید بخش جدایی‌ناپذیر فرآیند درخواست است.</p>`,
  },
  {
    title: "دامنه مشاوره CSGLOBAL",
    content: `<p>CSGLOBAL برای درخواست‌های مجوز اقامت در Türkiye، تهیه فهرست مدارک، بررسی پرونده، برنامه‌ریزی نوبت و پیگیری فرآیند ارائه می‌دهد. هر درخواست با توجه به هدف اقامت، وضعیت قبلی و وضعیت خانوادگی متقاضی به‌صورت جداگانه ارزیابی می‌شود.</p>
<p>ثبت درخواست آنلاین یا بارگذاری مدارک از طریق وب‌سایت ما امکان‌پذیر نیست. فرآیند خود را با مشاوران متخصص ما از طریق تلفن یا WhatsApp مدیریت می‌کنید؛ برای مراحل مدارک و نوبت، برنامه‌ای روشن تنظیم می‌کنیم.</p>
<p>وقتی هم مجوز اقامت و هم مجوز کار لازم باشد، زمان‌بندی و هماهنگی مدارک هر دو فرآیند جداگانه برنامه‌ریزی می‌شود. برای اطلاعات تفصیلی و ارزیابی اولیه از کانال‌های ارتباطی ما با ما تماس بگیرید.</p>`,
  },
];

export const oturmaIzniCategoryTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Türkiye Residence Permit",
    excerpt:
      "Document lists, appointment planning, and process tracking for Türkiye residence permit applications, renewals, and long-term residence. CSGLOBAL consultancy.",
    shortDescription:
      "We plan your residence permit applications with document, appointment, and renewal steps.",
    heroTitle: "Türkiye residence permit consultancy",
    heroSubtitle:
      "We build your document and appointment plan together for short-term residence, family reunification, and long-term residence applications.",
    sectionsJson: serializeServiceSections(enSections),
    featureImage1Title: "Document list and file review",
    featureImage1Text:
      "We prepare the document list according to permit type and check passport, insurance, address, and supporting documents before application. We review the file together to avoid losing an appointment due to incomplete or incorrect documents.",
    featureImage2Title: "Appointment and renewal tracking",
    featureImage2Text:
      "We plan e-Residence appointments, document submission, and card delivery on a calendar. As the permit expiry approaches, we send reminders and reorganize the process with an up-to-date document list for renewal applications.",
  },
  ar: {
    name: "تصريح الإقامة في Türkiye",
    excerpt:
      "قوائم المستندات وتخطيط المواعيد ومتابعة العملية لطلبات تصريح الإقامة في Türkiye والتجديد والإقامة طويلة الأمد. استشارات CSGLOBAL.",
    shortDescription:
      "نخطط لطلبات تصريح الإقامة الخاصة بك عبر خطوات المستندات والمواعيد والتجديد.",
    heroTitle: "استشارات تصريح الإقامة في Türkiye",
    heroSubtitle:
      "نضع معاً خطة المستندات والمواعيد لطلبات الإقامة قصيرة الأمد ولم شمل الأسرة والإقامة طويلة الأمد.",
    sectionsJson: serializeServiceSections(arSections),
    featureImage1Title: "قائمة المستندات ومراجعة الملف",
    featureImage1Text:
      "نُعد قائمة المستندات حسب نوع التصريح؛ ونتحقق من جواز السفر والتأمين والعنوان والمستندات الداعمة قبل التقديم. نراجع الملف معاً لتجنب فقدان الموعد بسبب نقص أو خطأ في المستندات.",
    featureImage2Title: "متابعة المواعيد والتجديد",
    featureImage2Text:
      "نخطط مواعيد e-Residence وتسليم المستندات واستلام البطاقة على التقويم. عند اقتراب انتهاء التصريح، نُذكّرك ونعيد تنظيم العملية بقائمة مستندات محدَّثة لطلب التجديد.",
  },
  ru: {
    name: "Вид на жительство в Türkiye",
    excerpt:
      "Перечни документов, планирование записи и сопровождение процесса по заявлениям на вид на жительство в Türkiye, продлению и долгосрочному проживанию. Консультации CSGLOBAL.",
    shortDescription:
      "Мы планируем ваши заявления на вид на жительство с учетом документов, записи на прием и продления.",
    heroTitle: "Консультации по виду на жительство в Türkiye",
    heroSubtitle:
      "Мы вместе составляем план документов и записи на прием для краткосрочного проживания, воссоединения семьи и долгосрочного проживания.",
    sectionsJson: serializeServiceSections(ruSections),
    featureImage1Title: "Перечень документов и проверка дела",
    featureImage1Text:
      "Мы составляем перечень документов в зависимости от типа разрешения и проверяем паспорт, страховку, адрес и подтверждающие документы до подачи заявления. Мы совместно проверяем дело, чтобы не потерять запись из-за неполного или ошибочного пакета документов.",
    featureImage2Title: "Сопровождение записи и продления",
    featureImage2Text:
      "Мы планируем записи в e-Residence, сдачу документов и выдачу карты по календарю. По мере приближения срока действия разрешения напоминаем и организуем процесс заново с актуальным перечнем документов для продления.",
  },
  fa: {
    name: "مجوز اقامت Türkiye",
    excerpt:
      "فهرست مدارک، برنامه‌ریزی نوبت و پیگیری فرآیند برای درخواست مجوز اقامت Türkiye، تمدید و اقامت بلندمدت. مشاوره CSGLOBAL.",
    shortDescription:
      "درخواست‌های مجوز اقامت شما را با مراحل مدارک، نوبت و تمدید برنامه‌ریزی می‌کنیم.",
    heroTitle: "مشاوره مجوز اقامت Türkiye",
    heroSubtitle:
      "برای درخواست‌های اقامت کوتاه‌مدت، الحاق خانواده و اقامت بلندمدت، برنامه مدارک و نوبت را با هم تنظیم می‌کنیم.",
    sectionsJson: serializeServiceSections(faSections),
    featureImage1Title: "فهرست مدارک و بررسی پرونده",
    featureImage1Text:
      "فهرست مدارک را بر اساس نوع مجوز تهیه می‌کنیم و گذرنامه، بیمه، آدرس و مدارک پشتیبان را پیش از درخواست بررسی می‌کنیم. برای جلوگیری از از دست رفتن نوبت به‌دلیل نقص یا خطا در مدارک، پرونده را با هم مرور می‌کنیم.",
    featureImage2Title: "پیگیری نوبت و تمدید",
    featureImage2Text:
      "نوبت e-Residence، تحویل مدارک و دریافت کارت را روی تقویم برنامه‌ریزی می‌کنیم. با نزدیک شدن به پایان مجوز، یادآوری می‌کنیم و فرآیند را با فهرست مدارک به‌روز برای درخواست تمدید دوباره ساماندهی می‌کنیم.",
  },
};
