import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Foreign Doctor Work Permit",
    content: `<p>A foreign doctor work permit is the type of work permit that foreign doctors and other healthcare personnel who wish to work in Türkiye must hold.</p>`,
  },
  {
    title: "Criteria for Employing Foreign Doctors",
    content: `<p>Criteria for employing foreign doctors consist of conditions sought in the foreign doctor and conditions sought in the healthcare institution and employer that will employ the foreign doctor. Accordingly, the foreign doctor must meet the following conditions:</p><ul>
<li>The foreign doctor must hold a diploma or specialist certificate whose equivalence has been approved by YÖK and registered by the Ministry of Health.</li>



<li>There must be no legal obstacle to the foreign doctor practising their profession.</li>



<li>The foreign doctor must take the Turkish language examination and be found to have at least level B Turkish.</li>



<li>The foreign doctor must have obtained a work and residence permit in Türkiye.</li>



<li>The foreign doctor must have taken out compulsory professional and financial liability insurance in Türkiye.</li>
</ul><p>The criteria above are those that the foreign doctor on whose behalf a work permit application will be made must meet. There are also criteria that the employer and workplace employing the foreign doctor must meet. These may be listed as follows:</p><ul>
<li>At the healthcare institution where the foreign doctor will be employed, at least 5 Turkish citizens must be employed for each foreign doctor to be employed. The foreign employee ratio may not exceed one-sixth of total employees.</li>



<li>The paid-in capital of the private healthcare institution that will employ the foreign doctor must be at least 100,000 TL.</li>



<li>If the company partner submitting the work permit application on behalf of the foreign doctor is also a foreign national, the capital share must be at least 20%. This ratio must correspond to at least 40,000 TL.</li>



<li>The employment contract between the foreign doctor and the healthcare institution must stipulate that the wage payable to the foreign doctor will be at least the minimum wage determined for foreign nationals. (The minimum wage payable to foreign nationals is determined every 6 months by the Directorate General of International Labour.)</li>
</ul><p>All of these criteria must be fully met for a foreign doctor to be employed. If there is a deficiency in even one criterion, the application will be rejected.</p>`,
  },
  {
    title: "How Is a Foreign Doctor Work Permit Obtained?",
    content: `<p>A foreign doctor work permit is obtained by obtaining prior authorization from the Ministry of Health on the subject, meeting application conditions, and submitting the required documents. Submitting the application does not directly grant a work permit. The application must be approved by the Ministry.</p><p><strong>Prior Authorization Process from the Ministry of Health</strong></p><p>The prior authorization process from the Ministry of Health begins with the foreign doctor applying to the private healthcare institution where they wish to work. In this application, the foreign doctor also submits the documents required for the prior authorization application to the responsible manager.</p><p>The responsible manager delivers the documents required for prior authorization to the provincial health directorate. If there is no deficiency in the documents, the directorate forwards them to the Ministry of Health.</p><p>The Ministry examines the documents as to whether the criteria are met. If there is no deficiency in the documents, the foreign doctor's diploma is registered and a prior authorization certificate is issued stating that practice of the profession is found appropriate.</p><p><strong>Documents Required for Prior Authorization Application</strong></p><p>The documents required for prior authorization application are as follows:</p><ul>
<li>A document showing that the equivalence of the applicant doctor's diploma, graduation certificate, or equivalent document has been accepted by the relevant authority,</li>



<li>A document showing that the applicant doctor achieved at least level B in the Turkish language examination conducted by universities (this document must be submitted to the provincial health directorate within <strong>1 year</strong> from application. This document is not requested from foreign doctors graduating from higher education institutions providing education in Turkish),</li>



<li>A document showing that there is no legal obstacle to the foreign doctor practising their profession (this document must be obtained from the relevant authority of the foreign doctor's country of origin. A doctor who graduated from a higher education institution in Türkiye within one year before application, a foreign doctor who documents uninterrupted residence in Türkiye for <strong>5 years</strong> before application, or a doctor who sought asylum in Türkiye due to an extraordinary situation in their country need not submit this document),</li>



<li>An employment contract between the foreign doctor and the private healthcare institution stating the net monthly wage payable to the doctor and containing the name-surname and signatures of the parties on each page.</li>
</ul><p>These documents are required only for prior authorization. Submission of these documents to the provincial health institution begins the prior authorization procedure. If the prior authorization procedure is successfully completed, the foreign doctor work permit application procedure begins.</p><p><strong>How Is a Foreign Doctor Work Permit Application Made?</strong></p><p>A foreign doctor work permit application is made by the employer through the e-permit application after the prior authorization procedure is successfully completed. System login is performed by different methods depending on whether the foreign doctor on whose behalf the application is made is abroad or in Türkiye.</p><p>If the foreign doctor on whose behalf the application is made is abroad, they apply to the Turkish foreign representation in their country of residence and obtain an application code. The employer logs into the e-permit application with this code. If the foreign doctor is in Türkiye, login to the e-permit system is made with the foreign identity number starting with 99 or passport information.</p><p>After logging into the e-permit system, the foreign doctor's personal information is entered and the documents required for the foreign doctor work permit are scanned and uploaded to the system.</p><p>After the required documents are uploaded to the system, if the application is positive, a post containing application fee amounts and bank account details is sent to the registered e-mail address in the system. Payment of the fees completes the application.</p>`,
  },
  {
    title: "What Documents Are Required for a Foreign Doctor Work Permit?",
    content: `<p>The documents required for a foreign doctor work permit are as follows:</p><ul>
<li>Employment contract between the foreign doctor and the employer healthcare institution,</li>



<li>Passport or passport-substitute document of the foreign doctor,</li>



<li>2 biometric photographs of the foreign doctor,</li>



<li>Diploma or diploma-substitute document of the foreign doctor,</li>



<li>Prior authorization certificate obtained from the provincial health directorate,</li>



<li>Trade Registry Gazette showing the healthcare institution's latest capital and partnership structure,</li>



<li>Profit-loss statement and balance sheet for the healthcare institution's last year approved by a certified public accountant or obtained from the tax office,</li>



<li>Activity certificate obtained from the provincial health directorate.</li>
</ul><p>These documents must be uploaded to the e-permit system in pdf format at the time of application. Physical submission of the documents is not required. If there is a deficiency in the documents, the administration grants additional time to remedy the deficiency. If the deficiency is not remedied within the additional period, the application is rejected.</p><p>Documents obtained from abroad must be consular approved or bear an apostille. Documents in foreign languages must also be uploaded together with sworn Turkish translations.</p>`,
  },
  {
    title: "Points to Consider in the Employment Contract for a Foreign Doctor Work Permit",
    content: `<p>There are certain details that must be considered when preparing a foreign doctor employment contract. Invalidity of employment contracts prepared without attention to these criteria, and consequently rejection of the work permit application made, frequently arises. These criteria may be listed as follows:</p><ul>
<li>The contract must be in writing and each page must contain the name-surname and signature of the foreign doctor and employer. (If the employer is a legal entity company, the company name is written and the signature is affixed by the representative.)</li>



<li>The foreign doctor must be informed in writing in the contract regarding their rights.</li>



<li>The contract must include the Human Trafficking Victim Helpline 157 and helpline number 170.</li>



<li>Tax number of the workplace,</li>



<li>Start date of employment of the foreign doctor,</li>



<li>Job description of the foreign doctor must be written clearly.</li>



<li>The wage to be paid to the foreign doctor must be at or above the minimum wage determined by the competent authorities.</li>
</ul><p>A work permit cannot be obtained based on an employment contract that does not meet these conditions. In addition, there are general conditions of employment contracts. Since a work permit cannot be obtained with a contract that does not meet the required qualities, great care must be taken when preparing the contract and an immigration law lawyer should be consulted at this stage.</p>`,
  },
  {
    title: "Minimum Wage That May Be Determined for a Foreign Doctor",
    content: `<p>The minimum wage that may be determined for a foreign doctor, published by the Ministry of Labour and Social Security, is 30,024 TL. Since the Ministry updates this amount every 6 months, attention must be paid to the amount. Work permit applications based on contracts in which an amount below the minimum wage is determined are rejected.</p>`,
  },
  {
    title: "Foreign Doctor Work Permit Legal Fees and Costs",
    content: `<p>Foreign doctor work permit legal acquisition costs in 2023 are a 356 TL valuable paper fee and an annual work permit fee of 3,090 TL. Since the work permit fee is annual, 3,090 TL is paid for each year requested.</p><p>After the work permit application is accepted, the Ministry of Labour and Social Security sends the bank account details of its accounts to the registered e-mail address recorded by the employer when making the work permit application through the e-permit system. Payments are made by the employer to these bank accounts. Payments must be made within 30 days from the date this e-mail is sent to the employer.</p>`,
  },
  {
    title: "How Long Does a Foreign Doctor Work Permit Application Take to Be Concluded?",
    content: `<p>A foreign doctor work permit application is concluded in approximately 30 days, and a prior authorization application in approximately 15 days. Submission of incomplete or incorrect documents in the application causes the period to be extended.</p>`,
  },
  {
    title: "Rejection of a Foreign Doctor Work Permit Application",
    content: `<p>If the conditions for a foreign doctor work permit are not met, required documents are uploaded to the system incompletely, documents are forged, or prior authorization is not obtained from the Ministry of Health, the foreign doctor work permit application is rejected.</p><p>The foreign doctor must leave the country within <strong>10 days</strong> from notification of rejection of the work permit application to the foreign national or their lawyer. Otherwise, they will be deported.</p><p><strong>Objection and Cancellation Lawsuit Against Rejection of a Foreign Doctor Work Permit Application</strong></p><p>Both the employer who submitted the application and the doctor on whose behalf the application was made may submit objection petitions through the e-permit application within 30 days from notification of the rejection decision to them. If this objection is rejected, a cancellation lawsuit may be filed with the Ankara administrative courts.</p><p>Objection and cancellation lawsuit against rejection of a foreign doctor work permit application are subject to the same principles and procedures as objection and cancellation lawsuit against rejection of other work permits. For this reason, those wishing to obtain more detailed information on the subject are advised to review our article titled "rejection of work permit application".</p><p><strong>Right to Reapply After Rejection of a Foreign Doctor Work Permit Application</strong></p><p>It is possible to reapply if a foreign doctor work permit application is rejected. However, for the application to be concluded positively, the reason for rejection of the previous application must first be eliminated.</p>`,
  },
  {
    title: "Extension of a Foreign Doctor Work Permit",
    content: `<p>Extension of a foreign doctor work permit application is made by the employer through the e-permit application. An extension application may be made <strong>60 days</strong> before expiry of the work permit. Extension applications made after expiry of the work permit are not accepted.</p><p>For an extension application to be accepted, the application must be made within the period and the conditions for a foreign doctor work permit must continue to be met. Otherwise, the extension application is rejected. Detailed information on extension applications is explained in the article titled "work permit extension".</p><p><strong>Objection and Cancellation Lawsuit Against Rejection of Extension of a Foreign Doctor Work Permit</strong></p><p>There is a right to object and file a cancellation lawsuit against rejection of an extension application. Objection and cancellation lawsuit against rejection of an extension application are subject to the same principles and procedures as objection and cancellation lawsuit against rejection of a work permit.</p><p><strong>May a Foreign Doctor Work During Evaluation of an Extension Application?</strong></p><p>A foreign doctor may continue working while a work permit extension application is being evaluated. However, this period may not exceed <strong>90 days</strong> from expiry of the validity period of the work permit.</p><p>If the extension application is rejected, the foreign doctor may not continue working even if the 90-day period has not expired.</p>`,
  },
  {
    title: "Work Permit Exemption for Syrian Doctors",
    content: `<p>In general, work permits for Syrian doctors are subject to the same principles as work permits for foreign doctors who are citizens of other countries. However, if Syrian doctors wish to work at migrant health centres coordinated or approved by AFAD, they are not required to submit a diploma document or meet the condition of having no legal obstacle to practising medicine.</p>`,
  },
  {
    title: "Conclusion",
    content: `<p>A foreign doctor work permit is a work permit subject to quite complex procedures and conditions. To obtain this permit, there is first a prior authorization procedure subject to separate conditions and documents. For prior authorization and work permit applications to be concluded positively in the shortest time, obtaining consultancy from a specialist immigration lawyer is very important.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "تصريح عمل الطبيب الأجنبي",
    content: `<p>تصريح عمل الطبيب الأجنبي هو نوع تصريح العمل الذي يجب أن يحمله الأطباء الأجانب وغيرهم من العاملين في القطاع الصحي الراغبون في العمل في Türkiye.</p>`,
  },
  {
    title: "معايير تشغيل الأطباء الأجانب",
    content: `<p>معايير تشغيل الأطباء الأجانب تشمل شروطاً في الطبيب الأجنبي وشروطاً في المؤسسة الصحية وصاحب العمل. يجب على الطبيب الأجنبي استيفاء الشروط التالية:</p><ul>
<li>أن يحمل شهادة دبلoma أو تخصص معادلة من YÖK ومسجلة لدى وزارة الصحة.</li>



<li>ألا يوجد مانع قانوني لممارسة مهنته.</li>



<li>أن يجتاز امتحان اللغة التركية بمستوى B على الأقل.</li>



<li>أن يحصل على تصريح عمل وإقامة في Türkiye.</li>



<li>أن يبرم تأمين مسؤولية مهنية ومالية إلزامي في Türkiye.</li>
</ul><p>هذه معايير الطبيب الأجنبي. وهناك معايير لصاحب العمل والمؤسسة الصحية:</p><ul>
<li>في المؤسسة الصحية، يُشغَّل 5 مواطنين أتراك على الأقل لكل طبيب أجنبي. لا يجوز أن تتجاوز نسبة الأجانب سدس العاملين.</li>



<li>يجب أن يكون رأس المال المدفوع للمؤسسة الصحية الخاصة 100.000 ليرة على الأقل.</li>



<li>إذا كان شريك الشركة أجنبياً، يجب أن تكون حصة رأس المال 20% على الأقل (40.000 ليرة على الأقل).</li>



<li>يجب أن ينص عقد العمل على أجر لا يقل عن الحد الأدنى للأجور للأجانب (يُحدَّد كل 6 أشهر).</li>
</ul><p>يجب استيفاء جميع المعايير. أي نقص يؤدي إلى رفض الطلب.</p>`,
  },
  {
    title: "كيف يُحصل على تصريح عمل الطبيب الأجنبي؟",
    content: `<p>يُحصل على تصريح عمل الطبيب الأجنبي بموافقة مسبقة من وزارة الصحة واستيفاء الشروط وتقديم المستندات. تقديم الطلب لا يمنح التصريح مباشرة؛ يلزم موافقة الوزارة.</p><p><strong>إجراء الموافقة المسبقة من وزارة الصحة</strong></p><p>يبدأ بإقدام الطبيب الأجنبي على المؤسسة الصحية الخاصة التي يرغب في العمل لديها وتسليم المستندات للمسؤول.</p><p>يسلم المسؤول المستندات لمديرية الصحة provincial. عند عدم وجود نقص، تُحال إلى الوزارة.</p><p>تفحص الوزارة المستندات. عند عدم وجود نقص، تُسجَّل الشهادة ويُصدر تصريح موافقة مسبقة.</p><p><strong>مستندات الموافقة المسبقة</strong></p><ul>
<li>مستند قبول معادلة الشهادة،</li>
<li>مستند نجاح بمستوى B في امتحان التركية (خلال <strong>سنة</strong>؛ لا يُطلب من خريجي التعليم بالتركية)،</li>
<li>مستند عدم وجود مانع قانوني (من بلد المنشأ؛ استثناءات للخريجين والمقيمين <strong>5 سنوات</strong> واللاجئين)،</li>
<li>عقد عمل يحدد الأجر الصافي ويوقع من الطرفين في كل صفحة.</li>
</ul><p>هذه مستندات الموافقة المسبقة فقط. عند اكتمالها يبدأ إجراء تصريح العمل.</p><p><strong>كيف يُقدَّم طلب تصريح العمل؟</strong></p><p>يُقدَّم من صاحب العمل عبر e-izin بعد اكتمال الموافقة المسبقة. الدخول للنظام يختلف حسب وجود الطبيب خارج Türkiye أو داخلها.</p><p>إذا كان خارج Türkiye، يحصل على رمز من تمثيل Türkiye الدبلوماسي. إذا كان داخل Türkiye، يُستخدم رقم الهوية 99 أو جواز السفر.</p><p>بعد الدخول، تُدخل البيانات وتُرفع المستندات. عند قبول الطلب، تُرسل رسوم الحسابات البنkية إلى البريد المسجل. دفع الرسوم يكمل الطلب.</p>`,
  },
  {
    title: "ما المستندات المطلوبة لتصريح عمل الطبيب الأجنبي؟",
    content: `<p>المستندات المطلوبة:</p><ul>
<li>عقد العمل،</li>
<li>جواز السفر أو بديله،</li>
<li>صورتان بيومتريتان،</li>
<li>الشهادة أو بديلها،</li>
<li>تصريح الموافقة المسبقة من مديرية الصحة،</li>
<li>جريدة السجل التجاري لرأس المال والشركاء،</li>
<li>قائمة الأرباح والخسائر والميزانية للسنة الأخيرة،</li>
<li>شهادة النشاط من مديرية الصحة.</li>
</ul><p>تُرفع pdf عبر e-izin دون تقديم ورقي. عند النقص تُمنح مهلة إضافية. المستندات من الخارج تحتاج تصديق قنصلي أو apostille وترجمة تركية محلفة.</p>`,
  },
  {
    title: "ما يجب مراعاته في عقد عمل الطبيب الأجنبي",
    content: `<p>هناك تفاصيل يجب مراعاتها عند إعداد عقد الطبيب الأجنبي. العقود غير المطابقة تؤدي إلى رفض الطلب. المعايير:</p><ul>
<li>عقد مكتوب مع اسم وتوقيع الطرفين في كل صفحة،</li>
<li>إبلاغ الطبيب الأجنبي كتابياً بحقوقه،</li>
<li>ذكر خط المساعدة 157 و170،</li>
<li>الرقم الضريبي لمكان العمل،</li>
<li>تاريخ بدء العمل،</li>
<li>وصف وظيفي واضح،</li>
<li>أجر لا يقل عن الحد الأدنى.</li>
</ul><p>لا يُمنح تصريح عمل بعقد لا يستوفي هذه الشروط. يُنصح باستشارة محامٍ متخصص.</p>`,
  },
  {
    title: "الحد الأدنى للأجر للطبيب الأجنبي",
    content: `<p>الحد الأدنى للأجر للطبيب الأجنبي المنشور من وزارة العمل هو 30.024 ليرة. يُحدَّث كل 6 أشهر. الطلبات بعقد أقل من الحد الأدنى تُرفض.</p>`,
  },
  {
    title: "أتعاب المحاماة ومصاريف تصريح عمل الطبيب الأجنبي",
    content: `<p>مصاريف 2023: 356 ليرة ورق ثمين و3.090 ليرة رسوم تصريح سنوي لكل سنة. بعد القبول، تُرسل حسابات البنk إلى البريد المسجل ويجب الدفع خلال 30 يوماً.</p>`,
  },
  {
    title: "خلال كم تُختتم طلبات تصريح عمل الطبيب الأجنبي؟",
    content: `<p>طلب تصريح العمل يُختتم خلال نحو 30 يوماً، والموافقة المسبقة خلال 15 يوماً. النقص أو الخطأ في المستندات يطيل المدة.</p>`,
  },
  {
    title: "رفض طلب تصريح عمل الطبيب الأجنبي",
    content: `<p>يُرفض الطلب عند عدم استيفاء الشروط، نقص المستندات، تزويرها، أو عدم الحصول على موافقة مسبقة.</p><p>يجب على الطبيب الأجنبي مغادرة البلاد خلال <strong>10 أيام</strong> من تبليغ الرفض. وإلا يُرحَّل.</p><p><strong>الاعتراض ودعوى الإلغاء</strong></p><p>يمكن لصاحب العمل والطبيب الاعتراض عبر e-izin خلال 30 يوماً. عند رفض الاعتراض، تُرفع دعوى إلغاء أمام محاكم أنkara الإدارية.</p><p>الإجراءات كرفض تصاريح العمل الأخرى. راجع مقال «رفض طلب تصريح العمل».</p><p><strong>حق إعادة التقديم</strong></p><p>يمكن إعادة التقديم بعد إزالة سبب الرفض السابق.</p>`,
  },
  {
    title: "تمديد تصريح عمل الطبيب الأجنبي",
    content: `<p>يُقدَّم طلب التمديد من صاحب العمل عبر e-izin <strong>60 يوماً</strong> قبل انتهاء التصريح. لا تُقبل طلبات بعد الانتهاء.</p><p>يلزم التقديم في المدة واستمرار الشروط. راجع مقال «تمديد تصريح العمل».</p><p><strong>اعتراض ودعوى إلغاء على رفض التمديد</strong></p><p>للمعترض حق الاعتراض ودعوى الإلغاء بنفس إجراءات رفض التصريح.</p><p><strong>هل يمكن العمل أثناء التمديد؟</strong></p><p>يمكن العمل أثناء التقييم لمدة لا تتجاوز <strong>90 يوماً</strong> من انتهاء التصريح. عند الرفض ينتهي حق العمل حتى لو لم تنته المدة.</p>`,
  },
  {
    title: "إعفاء تصريح العمل للأطباء السوريين",
    content: `<p>بشكل عام، تصاريح الأطباء السوريين تخضع لنفس قواعد الأطباء الأجانب. لكن عند العمل في مراكز صحة المهاجرين المنظمة أو المعتمدة من AFAD، لا يُشترط تقديم الشهادة أو إثبات عدم وجود مانع قانوني.</p>`,
  },
  {
    title: "الخلاصة",
    content: `<p>تصريح عمل الطبيب الأجنبي يخضع لإجراءات وشروط معقدة. يسبقه إجراء موافقة مسبقة بشروط ومستندات منفصلة. للحصول على نتيجة إيجابية سريعاً، استشارة محامٍ متخصص في شؤون الأجانb very important.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Разрешение на работу для иностранного врача",
    content: `<p>Разрешение на работу для иностранного врача - это тип разрешения на работу, который должны иметь иностранные врачи и другой медицинский персонал, желающие работать в Türkiye.</p>`,
  },
  {
    title: "Критерии трудоустройства иностранных врачей",
    content: `<p>Критерии включают условия для иностранного врача и для медицинского учреждения и работодателя. Иностранный врач должен:</p><ul>
<li>Иметь диплом или сертификат специалиста с признанной YÖK эквивалентностью и зарегистрированный Минздравом.</li>
<li>Не иметь legal препятствий к практике.</li>
<li>Сдать экзамен по турецкому языку минимум на уровень B.</li>
<li>Иметь разрешение на работу и проживание в Türkiye.</li>
<li>Иметь обязательное профессиональное и финансовое страхование ответственности.</li>
</ul><p>У работодателя:</p><ul>
<li>Не менее 5 граждан Türkiye на каждого иностранного врача; доля иностранцев не более 1/6.</li>
<li>Уставный капитал частного медучреждения не менее 100 000 TL.</li>
<li>Если партнер-иностранец, доля капитала не менее 20% (40 000 TL).</li>
<li>Зарплата не ниже минимума для иностранцев (пересмотр каждые 6 месяцев).</li>
</ul><p>Любой недостаток ведет к отказу.</p>`,
  },
  {
    title: "Как получить разрешение на работу для иностранного врача?",
    content: `<p>Разрешение получают после предварительного согласия Минздрава, выполнения условий и подачи документов. Заявление не дает разрешение автоматически.</p><p><strong>Предварительное согласие Минздрава</strong></p><p>Начинается с обращения в частное медучреждение и передачи документов ответственному менеджеру, далее в provincial дирекцию и Минздрав.</p><p><strong>Документы для предварительного согласия</strong></p><ul>
<li>Документ о признании эквивалентности диплома,</li>
<li>Документ об уровне B по турецкому (<strong>1 год</strong>; не требуется для выпускников турецких вузов),</li>
<li>Документ об отсутствии legal препятствий (из страны происхождения; исключения),</li>
<li>Трудовой договор с указанием чистой месячной зарплаты и подписями на каждой странице.</li>
</ul><p><strong>Подача заявления на разрешение</strong></p><p>Работодатель подает через e-izin после предварительного согласия. Вход через код консульства (за границей) или номер 99/паспорт (в Türkiye). После загрузки документов на e-mail приходит информация о пошлинах; оплата в течение 30 дней завершает заявление.</p>`,
  },
  {
    title: "Какие документы нужны для разрешения на работу иностранного врача?",
    content: `<p>Документы: трудовой договор, паспорт, 2 биометрических фото, диплом, предварительное согласие, Trade Registry Gazette, баланс за последний год, справка о деятельности. Загрузка pdf через e-izin. Документы из-за границы с консульской легализацией/apostille и присяжным переводом.</p>`,
  },
  {
    title: "На что обратить внимание в трудовом договоре",
    content: `<p>Договор письменный с подписями на каждой странице, письменное информирование о правах, номера 157 и 170, налоговый номер, дата начала, четкое описание должности, зарплата не ниже минимума. Рекомендуется консультация адвоката.</p>`,
  },
  {
    title: "Минимальная зарплата для иностранного врача",
    content: `<p>Минимум 30 024 TL, обновляется каждые 6 месяцев. Заявления с меньшей суммой отклоняются.</p>`,
  },
  {
    title: "Гонорары адвоката и расходы",
    content: `<p>356 TL за valuable paper и 3 090 TL годовой пошлины за каждый год. Оплата на счета Минтруда в течение 30 дней после e-mail.</p>`,
  },
  {
    title: "Срок рассмотрения заявления",
    content: `<p>Около 30 дней для разрешения и 15 дней для предварительного согласия. Ошибки в документах удлиняют срок.</p>`,
  },
  {
    title: "Отказ в выдаче разрешения",
    content: `<p>Отказ при несоблюдении условий, неполных/поддельных документах или отсутствии предварительного согласия.</p><p>Выезд в течение <strong>10 дней</strong> после уведомления об отказе, иначе депортация.</p><p><strong>Возражение и иск об отмене</strong></p><p>Работодатель и врач могут возразить через e-izin в течение 30 дней, затем иск в административные суды Ankara.</p><p><strong>Право повторной подачи</strong></p><p>Возможна повторная подача после устранения причины отказа.</p>`,
  },
  {
    title: "Продление разрешения",
    content: `<p>Продление через e-izin за <strong>60 дней</strong> до окончания. После окончания не принимается. Подробности в статье «продление разрешения на работу».</p><p><strong>Возражение против отказа в продлении</strong></p><p>Те же правила, что при отказе в разрешении.</p><p><strong>Можно ли работать во время рассмотрения продления?</strong></p><p>Да, не более <strong>90 дней</strong> после окончания разрешения. При отказе работа прекращается.</p>`,
  },
  {
    title: "Освобождение от разрешения для сирийских врачей",
    content: `<p>Для сирийских врачей действуют те же правила, кроме работы в миграционных health центрах AFAD, где не требуются диплом и документ об отсутствии legal препятствий.</p>`,
  },
  {
    title: "Заключение",
    content: `<p>Разрешение для иностранного врача связано со сложными процедурами и предварительным согласием. Консультация специализированного адвоката очень важна.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "مجوز کار پزشک خارجی",
    content: `<p>مجوز کار پزشک خارجی نوع مجوزی است که پزشکان خارجی و سایر پرسنل بهداشت که قصد کار در Türkiye دارند باید داشته باشند.</p>`,
  },
  {
    title: "معیارهای به کارگیری پزشک خارجی",
    content: `<p>معیارها شامل شرایط پزشک خارجی و مؤسسه بهداشت و کارفرماست:</p><ul>
<li>مدرک با معادل‌سازی YÖK و ثبت وزارت بهداشت،</li>
<li>فقدان مانع قانونی،</li>
<li>سطح B زبان ترکی،</li>
<li>مجوز کار و اقامت در Türkiye،</li>
<li>بیمه مسئولیت حرفه‌ای و مالی.</li>
</ul><p>کارفرما: حداقل 5 شهروند Türkiye به ازای هر پزشک خارجی؛ سقف یک‌ششم؛ سرمایه 100.000 لیر؛ سهم 20% برای شریک خارجی؛ حداقل دستمزد.</p>`,
  },
  {
    title: "مجوز کار پزشک خارجی چگونه اخذ می‌شود؟",
    content: `<p>پس از مجوز قبلی وزارت بهداشت، تأمین شرایط و ارائه مدارک. درخواست مستقیماً مجوز نمی‌دهد.</p><p><strong>فرآیند مجوز قبلی</strong></p><p>درخواست به مرکز بهداشت خصوصی، تحویل مدارک به مدیر مسئول، ارسال به مدیرکل بهداشت و وزارت.</p><p><strong>مدارک مجوز قبلی</strong></p><ul>
<li>مدرک معادل‌سازی،</li>
<li>مدرک سطح B ترکی (<strong>1 سال</strong>)،</li>
<li>مدرک فقدان مانع قانونی،</li>
<li>قرارداد با حقوق خالص و امضای هر صفحه.</li>
</ul><p><strong>درخواست مجوز کار</strong></p><p>کارفرما از e-izin پس از مجوز قبلی. ورود با کد کنسولگری یا شماره 99/گذرنامه. پس از بارگذاری، پرداخت هزینه‌ها ظرف 30 روز.</p>`,
  },
  {
    title: "مدارک لازم برای مجوز کار پزشک خارجی",
    content: `<p>قرارداد، گذرنامه، 2 عکس، مدرک، مجوز قبلی، گazette تجاری، ترازنامه، مجوز فعالیت. بارگذاری pdf. مدارک خارجی با تأیید کنسولی/apostille و ترجمه رسمی.</p>`,
  },
  {
    title: "نکات قرارداد کار پزشک خارجی",
    content: `<p>قرارداد کتبی با امضای هر صفحه، اطلاع‌رسانی حقوق، شماره‌های 157 و 170، شماره مالیاتی، تاریخ شروع، شرح شغل، حداقل دستمزد. مشورت با وکیل توصیه می‌شود.</p>`,
  },
  {
    title: "حداقل دستمزد پزشک خارجی",
    content: `<p>30.024 لیر، هر 6 ماه به‌روزرسانی. قرارداد زیر حداقل رد می‌شود.</p>`,
  },
  {
    title: "حق‌الوکاله و هزینه‌ها",
    content: `<p>356 لیر تمبر و 3.090 لیر حق مجوز سالانه برای هر سال. پرداخت ظرف 30 روز پس از ایمیل.</p>`,
  },
  {
    title: "مدت رسیدگی درخواست",
    content: `<p>حدود 30 روز برای مجوز و 15 روز برای مجوز قبلی. نقص مدارک مدت را طولانی می‌کند.</p>`,
  },
  {
    title: "رد درخواست مجوز کار پزشک خارجی",
    content: `<p>رد در صورت عدم شرایط، نقص/جعل مدارک یا فقدان مجوز قبلی.</p><p>خروج ظرف <strong>10 روز</strong> پس از ابلاغ رد، وگرنه اخراج.</p><p><strong>اعتراض و دعوای ابطال</strong></p><p>اعتراض از e-izin ظرف 30 روز؛ سپس دعوا در دادگاه‌های اداری آنkara.</p><p><strong>حق درخواست مجدد</strong></p><p>پس از رفع علت رد قبلی.</p>`,
  },
  {
    title: "تمدید مجوز کار پزشک خارجی",
    content: `<p>تمدید از e-izin <strong>60 روز</strong> قبل از پایان. پس از پایان پذیرفته نمی‌شود.</p><p><strong>اعتراض به رد تمدید</strong></p><p>همان رویه رد مجوز.</p><p><strong>آیا در دوران رسیدگی می‌توان کار کرد؟</strong></p><p>بله، حداکثر <strong>90 روز</strong> پس از پایان مجوز. با رد، کار ممنوع.</p>`,
  },
  {
    title: "معافیت مجوز کار برای پزشکان سوری",
    content: `<p>قواعد عمومی مانند سایر پزشکان خارجی، مگر در مراکز بهداشت مهاجرتی AFAD که ارائه مدرک و فقدان مانع قانونی لازم نیست.</p>`,
  },
  {
    title: "نتیجه‌گیری",
    content: `<p>مجوز کار پزشک خارجی رویه و شرایط پیچیده دارد و مجوز قبلی جداگانه لازم است. مشورت وکیل متخصص بسیار مهم است.</p>`,
  },
];

export const contentSlug = "yabanci-doktor-calisma-izni";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Foreign Doctor Work Permit",
    excerpt: "A foreign doctor work permit is the type of work permit that foreign doctors and other healthcare personnel who wish to work in Türkiye must hold.",
    shortDescription: "A foreign doctor work permit is the type of work permit that foreign doctors and other healthcare personnel who wish to work in Türkiye must hold.",
    heroTitle: "Foreign Doctor Work Permit",
    heroSubtitle: "A foreign doctor work permit is the type of work permit that foreign doctors and other healthcare personnel who wish to work in Türkiye must hold.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "تصريح عمل الطبيب الأجنبي",
    excerpt: "تصريح عمل الطبيب الأجنبي هو نوع تصريح العمل الذي يجب أن يحمله الأطباء الأجانب وغيرهم من العاملين في القطاع الصحي الراغبون في العمل في Türkiye.",
    shortDescription: "تصريح عمل الطبيب الأجنبي هو نوع تصريح العمل الذي يجب أن يحمله الأطباء الأجانب وغيرهم من العاملين في القطاع الصحي الراغبون في العمل في Türkiye.",
    heroTitle: "تصريح عمل الطبيب الأجنبي",
    heroSubtitle: "تصريح عمل الطبيب الأجنبي هو نوع تصريح العمل الذي يجب أن يحمله الأطباء الأجانب وغيرهم من العاملين في القطاع الصحي الراغبون في العمل في Türkiye.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Разрешение на работу для иностранного врача",
    excerpt: "Разрешение на работу для иностранного врача - это тип разрешения на работу, который должны иметь иностранные врачи и другой медицинский персонал, желающие работать в Türkiye.",
    shortDescription: "Разрешение на работу для иностранного врача - это тип разрешения на работу, который должны иметь иностранные врачи и другой медицинский персонал, желающие работать в Türkiye.",
    heroTitle: "Разрешение на работу для иностранного врача",
    heroSubtitle: "Разрешение на работу для иностранного врача - это тип разрешения на работу, который должны иметь иностранные врачи и другой медицинский персонал, желающие работать в Türkiye.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "مجوز کار پزشک خارجی",
    excerpt: "مجوز کار پزشک خارجی نوع مجوزی است که پزشکان خارجی و سایر پرسنل بهداشت که قصد کار در Türkiye دارند باید داشته باشند.",
    shortDescription: "مجوز کار پزشک خارجی نوع مجوزی است که پزشکان خارجی و سایر پرسنل بهداشت که قصد کار در Türkiye دارند باید داشته باشند.",
    heroTitle: "مجوز کار پزشک خارجی",
    heroSubtitle: "مجوز کار پزشک خارجی نوع مجوزی است که پزشکان خارجی و سایر پرسنل بهداشت که قصد کار در Türkiye دارند باید داشته باشند.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
