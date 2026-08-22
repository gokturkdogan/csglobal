import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Work Permits for Syrian Workers",
    content: `<p>Work permits for Syrian workers are frequently researched due to heavy migration from Syria to our country in recent years and the employment of migrants from Syria, especially in sectors with significant labour shortages. The work permit type for Syrian workers applies to Syrian citizens under temporary protection.</p>`,
  },
  {
    title: "Conditions for Work Permits for Syrian Workers",
    content: `<p>Conditions for work permits for Syrian workers are the conditions that foreigners under temporary protection must meet when applying for a work permit. Syrians are foreigners with temporary protection status. These conditions determined by the Directorate General of International Labour of the Ministry of Labour and Social Security may be listed as follows:</p><ul>
<li>The Syrian foreign national must be under temporary protection status and have resided in Türkiye for at least 6 months.</li>



<li>The Syrian worker must have a foreign identity number starting with 99. Foreign identity numbers for persons under temporary protection are issued with the temporary protection identity document.</li>



<li>The work permit application must not be for a job reserved for Turkish citizens and must be for one of the jobs that the Ministry of Labour and Social Security permits foreigners under temporary protection to perform.</li>



<li>If the profession for which the application is made requires prior authorization from the Ministry of Health or the Ministry of National Education, prior authorization must be obtained before applying for a work permit.</li>



<li>The quota for employing Syrians at the workplace where the Syrian will be employed must be observed. This quota is explained below.</li>



<li>The workplace where the Syrian will be employed must be in the province where they received their temporary protection identity card. Syrians may work only in these provinces. However, if the Ministry deems it appropriate, Syrians may also work in other provinces.</li>
</ul><p>For a work permit application to be evaluated positively, the criteria above must be fully met. If there is a deficiency in the criteria, the applicant may be given time to remedy it. If the deficiency is not remedied within the period, the application will be removed from processing.</p>`,
  },
  {
    title: "How Are Work Permits Obtained for Syrian Workers?",
    content: `<p>Work permit applications for Syrian workers are made online through the e-permit application on the e-Devlet portal. Except for independent work permit applications, applications are made by the employer employing the Syrian worker. The employer must have an e-signature and KEP address to log into the system.</p><p>On the screen opened, after clicking the "apply" menu, the "temporary protection" tab is entered. In the form opened, information relating to the employer and the Syrian employee is completed in full. Required documents are also scanned and saved to the system in pdf format, after which the application is completed.</p><p>If the application is found to comply with the criteria and international labour policy, it is accepted. After the application is accepted, bank accounts are sent to the registered e-mail address entered into the system during the application; for independent work permit applications this is sent to the Syrian worker's e-mail, and otherwise to the employer's.</p><p>Within 30 days from the date this notification is sent to the e-mail address, the fee and valuable paper charge must be deposited into the bank accounts. The party obliged to make payment is the employer. However, for independent work permits, the Syrian employee makes the payment. After payment is made, the work permit card is posted to the workplace address registered in the system.</p><p>Within 30 days from approval of the Syrian worker's work permit application, the employer must go to the social security institution, submit the employee's start-of-work notification, and initiate insurance. The wage basis for insurance premiums is the wage written in the Syrian worker's employment contract. Insurance premium is calculated on 30 days per month.</p><p>If an error is made at any of these stages, the application will be rejected; if the Syrian is nevertheless employed, severe sanctions will apply. To avoid such negative outcomes, it is advisable for the process to be conducted by an immigration lawyer from start to finish.</p><p>Detailed information on all other work permit types and application procedures that foreigners may apply for is provided in our article titled "how to obtain a foreign work permit".</p>`,
  },
  {
    title: "Syrian Worker Quota at the Workplace",
    content: `<p>A work quota applies at workplaces where Syrians are employed. Accordingly, the ratio of persons working under temporary protection at the workplace may not exceed 10% of the ratio of Turkish citizens employed at the workplace.</p><p>For example, if 20 Turks are employed at a workplace, at most 2 Syrians may be employed. If a third Syrian is to be employed, 10 more Turkish citizens must be employed. If the number of employees at the workplace is less than 10, at most 1 Syrian may be employed.</p><p>If the employer documents from the provincial directorate of the Employment Agency in their province that no Turkish citizen could be found to perform the job the Syrian will perform for 4 weeks, the Syrian employment quota may not apply. In this case, employment may be accepted even if the Syrian ratio at the workplace exceeds 10% of the Turkish ratio due to employment of the Syrian.</p>`,
  },
  {
    title: "Required Documents for Work Permit Applications for Syrian Workers",
    content: `<p>Required documents for work permit applications for Syrian workers are documents proving that the Syrian worker, employer, and workplace meet the required criteria.</p><p>Required documents for a Syrian worker work permit are as follows:</p><ul>
<li>Employment contract between the Syrian worker and the employer,</li>



<li>Prior authorization document obtained from the Ministry of Health if the sector is healthcare, or from the Ministry of National Education if the sector is education,</li>



<li>Tax plate of the workplace,</li>



<li>Profit-loss statement and balance sheet for the workplace's last year from the tax office or approved by a certified public accountant,</li>



<li>Insured service list showing all personnel employed at the workplace (through this list it is determined whether the quota is exceeded),</li>



<li>Trade Registry Gazette showing the workplace's latest capital and partnership structure,</li>



<li>Power of attorney if the work permit application is made by the employer's lawyer,</li>



<li>Workplace activity certificate,</li>



<li>Biometric photograph of the Syrian,</li>



<li>Temporary protection identity document of the Syrian.</li>
</ul><p>All of these documents must be uploaded to the system by the employer making the application. However, if the Syrian applies for an independent work permit in their own name, only a biometric photograph and temporary protection identity document are required from these documents. In this case, the application and upload of documents will be completed by the Syrian employee.</p><p>All documents must be uploaded to the Work Permit Automation System in pdf format at the time of application. Documents that cannot be obtained electronically must be converted to pdf format with a scanner application and uploaded to the system. Physical submission of documents is not required.</p><p>If there is a deficiency in the documents, the employer is given time to remedy the deficiency and upload the document in full. If the deficiency is not remedied within this period, the work permit application for Syrian workers is rejected.</p>`,
  },
  {
    title: "Minimum Wage Payable to Syrian Workers",
    content: `<p>The minimum wage payable to Syrian workers may not be lower than the minimum wage amount for foreign employees published by the competent authorities. The minimum wage published as of July 2023 is 13,414.50 TL.</p><p>If the wage specified in the employment contract is lower than the minimum wage, the contract becomes invalid and the work permit application based on this contract will also be rejected.</p>`,
  },
  {
    title: "Work Permit Costs for Syrian Workers",
    content: `<p>Work permit costs for Syrian workers consist of the work permit fee and valuable paper charge. In 2023, the temporary protection work permit fee is 1,724.40 TL and the valuable paper charge is 356 TL. These amounts must be paid separately by the employer to the bank accounts sent to their registered e-mail address.</p>`,
  },
  {
    title: "How Long Does It Take to Obtain a Work Permit for Syrian Workers?",
    content: `<p>Applications made to the administration to obtain a work permit for Syrian workers under temporary protection are concluded within approximately <strong>1 month</strong>.</p><p>Errors or deficiencies in the information and documents required to be submitted in the application, or submission of incomplete documents, extend the time for conclusion of the application. In addition, the workload of the administrative unit where the application is made also affects the application process.</p>`,
  },
  {
    title: "Work Permit Exemption for Syrian Workers",
    content: `<p>Syrians who wish to work in seasonal agriculture or livestock jobs may apply to the provincial governorship that provides them temporary protection for a work permit exemption. If a work permit application for Syrian workers is concluded positively, they may work without a work permit, limited to the specified jobs.</p><p>In exemption applications, the Syrian must be within the scope of temporary protection, have resided in Türkiye under temporary protection for at least 6 months, and the application must be made only to work in seasonal agriculture or livestock jobs.</p><p>The documents required to apply for a work permit exemption for Syrian workers are only the temporary protection identity document and biometric photograph. The governorship forwards these applications to the Ministry of Labour and Social Security and the Ministry decides.</p><p><strong>NOTE:</strong> Foreigners under temporary protection may work with a work permit exemption for Syrian workers only in temporary agriculture and livestock jobs and only in the province where temporary protection was granted to them.</p>`,
  },
  {
    title: "Conclusion",
    content: `<p>Work permits for Syrian workers differ from work permits for other foreigners in many respects, including criteria, quota, required documents, fee amounts, and exemption conditions. If an error is made during a work permit application for Syrian workers or the criteria are not met, rejection of the application and deportation of the foreign national may arise. If the work permit application process for Syrian workers is conducted by an immigration lawyer, the likelihood of encountering such negative outcomes is significantly reduced.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "تصاريح العمل للعمال السوريين",
    content: `<p>تُبحث تصاريح العمل للعمال السوريين كثيراً بسبب الهجرة الكثيفة من سوريا إلى بلدنا في السنوات الأخيرة وتوظيف المهاجرين من سوريا، خصوصاً في القطاعات التي تعاني نقصاً في العمالة. ينطبق نوع تصريح العمل للعمال السوريين على مواطني سوريا تحت الحماية المؤقتة.</p>`,
  },
  {
    title: "شروط تصاريح العمل للعمال السوريين",
    content: `<p>شروط تصاريح العمل للعمال السوريين هي الشروط التي يجب على الأجانب تحت الحماية المؤقتة استيفاؤها عند التقدم لتصريح عمل. السوريون أجانب بحالة حماية مؤقتة. يمكن enumerating الشروط التي حددتها المديرية العامة للعمالة الدولية في وزارة العمل:</p><ul>
<li>يجب أن يكون الأجنبي السوري تحت الحماية المؤقتة ومقيمًا في Türkiye 6 أشهر على الأقل.</li>
<li>يجب أن يحمل رقم هوية أجنبية يبدأ بـ 99.</li>
<li>يجب ألا يكون الطلب لوظيفة م reservedة للأتراك ويجب أن يكون لوظيفة مسموح بها للأجانب تحت الحماية المؤقتة.</li>
<li>إذا تطلبت المهنة موافقة مسبقة من وزارة الصحة أو التعليم، يجب الحصول عليها قبل التقديم.</li>
<li>يجب مراعاة حصة تشغيل السوريين في مكان العمل.</li>
<li>يجب أن يكون م place العمل في المحافظة التي صدرت فيها بطاقة الحماية المؤقتة، ما لم توافق الوزارة على محافظة أخرى.</li>
</ul><p>للتقييم الإيجابي يجب استيفاء جميع المعايير. عند النقص تُمنح مهلة؛ وإلا يُرفض الطلب.</p>`,
  },
  {
    title: "كيف تُحصل تصاريح العمل للعمال السوريين؟",
    content: `<p>تُقدَّم طلبات تصريح العمل للعمال السوريين online عبر e-izin في e-Devlet. باستثناء التصريح المستقل، يقدمها صاحب العمل. يلزم e-imza وKEP.</p><p>بعد «تقديم طلب»، يُختار tab «الحماية المؤقتة» وتُملأ بيانات صاحب العمل والعامل السوري وترفع المستندات pdf.</p><p>عند المطابقة للمعايير يُقبل الطلب. تُرسل حسابات البنk للبريد المسجل؛ في التصريح المستقل للعامل السوري.</p><p>خلال 30 يوماً تُدفع الرسوم و«الورق الثمين». الدفع على صاحب العمل إلا في التصريح المستقل. بعد الدفع يُرسل بطاقة التصريح لعنوان العمل.</p><p>خلال 30 يوماً من الموافقة يُبلّغ صاحب العمل عن بدء العمل ويبدأ التأمين. أجر التأمين هو أجر العقد. القسط على 30 يوماً شهرياً.</p><p>أي خطأ قد يؤدي للرفض أو عقوبات شديدة عند التشغil بلا تصريح. يُنصح بمحامٍ أجانb طوال العملية.</p><p>للتفاصيل عن تصاريح أخرى، راجع «كيفية الحصول على تصريح عمل أجنبي».</p>`,
  },
  {
    title: "حصة تشغيل السوريين في مكان العمل",
    content: `<p>تُطبَّق حصة في أماكن عمل السوريين: نسبة العاملين تحت الحماية المؤقتة لا تتجاوز 10% من نسبة الأتراك.</p><p>مثلاً 20 تركياً يسمح ب2 سوريين. للثالث يلزم 10 أتراك إضافيين. إذا كان عدد العاملين أقل من 10، سوري واحد كحد أقصى.</p><p>إذا وثّق صاحب العمل من İŞKUR عدم وجود تركي للوظيفة 4 أسابيع، قد لا تُطبَّق الحصة حتى لو تجاوزت 10%.</p>`,
  },
  {
    title: "المستندات المطلوبة لطلبات تصريح العمل للعمال السوريين",
    content: `<p>المستندات تثبت استيفاء العامل السوري وصاحب العمل وم place العمل للمعايير:</p><ul>
<li>عقد عمل،</li>
<li>موافقة مسبقة (صحة/تعليم)،</li>
<li>لوحة ضريبية،</li>
<li>أرباح وخسائر وميزانية،</li>
<li>قائمة المؤمن عليهم،</li>
<li>جريدة السجل التجاري،</li>
<li>توكيل (إن وُجد)،</li>
<li>شهادة نشاط،</li>
<li>صورة بيومترية،</li>
<li>وثيقة الحماية المؤقتة.</li>
</ul><p>يرفعها صاحب العمل. للتصريح المستقل: صورة ووثيقة حماية فقط من قبل العامل. pdf فقط دون تقديم ورقي. النقص يُمنح مهلة ثم الرفض.</p>`,
  },
  {
    title: "الحد الأدنى للأجر للعمال السوريين",
    content: `<p>لا يجوز أن يقل الأجر عن الحد الأدنى للأجانb المنشور. من يوليو 2023: 13.414,50 ليرة. أقل من ذلك يبطل العقد ويُرفض الطلب.</p>`,
  },
  {
    title: "مصاريف تصريح العمل للعمال السوريين",
    content: `<p>الرسوم: 1.724,40 ليرة harç و356 ليرة ورق ثمين ل2023. يدفعها صاحب العمل على حسابات البنk المرسلة للبريد.</p>`,
  },
  {
    title: "خلال كم يصدر تصريح العمل للعمال السوريين؟",
    content: `<p>الطلبات تُختتم خلال نحو <strong>شهر</strong>. الأخطاء أو النقص أو ازدحام الإدارة يطيل المدة.</p>`,
  },
  {
    title: "إعفاء تصريح العمل للعمال السوريين",
    content: `<p>للعمل الموسمي في الزراعة أو الثروة الحيوانية يمكن طلب إعفاء من valilik الحماية المؤقتة. عند قبول تصريح العمل يمكن العمل بلا تصريح في هذه الأعمال فقط.</p><p>شروط الإعفاء: حماية مؤقتة، إقامة 6 أشهر، طلب للعمل الموسمي فقط. المستندات: بطاقة حماية وصورة. Valilik يحيل للوزارة.</p><p><strong>تنبيه:</strong> الإعفاء للزراعة/الثروة الحيوانية المؤقتة فقط في محافظة الحماية المؤقتة.</p>`,
  },
  {
    title: "الخلاصة",
    content: `<p>تصاريح السوريين تختلف عن غيرهم في المعايير والحصة والمستندات والرسوم والإعفاء. الخطأ أو عدم استيفاء الشروط قد يؤدي للرفض والترحيل. إدارة العملية بواسطة محامٍ أجانb تقلل المخاطر.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Разрешения на работу для сирийских работников",
    content: `<p>Разрешения на работу для сирийских работников часто изучаются из-за интенсивной миграции из Сирии и трудоустройства мигрантов, особенно в секторах с дефицитом рабочей силы. Этот тип разрешения применяется к гражданам Сирии под временной защитой.</p>`,
  },
  {
    title: "Условия получения разрешения на работу для сирийских работников",
    content: `<p>Условия - это требования для иностранцев под временной защитой. Сирийцы имеют статус временной защиты. Условия Гендирекции международной рабочей силы Минтруда:</p><ul>
<li>Статус временной защиты и проживание в Türkiye не менее 6 месяцев.</li>
<li>Номер иностранного удостоверения, начинающийся с 99.</li>
<li>Заявление не на работу, зарезервированную для граждан Türkiye, а на разрешенную работу для лиц под временной защитой.</li>
<li>Предварительное согласие Минздрава или Минобразования, если требуется.</li>
<li>Соблюдение квоты на сирийцев.</li>
<li>Место работы в провинции выдачи карты временной защиты, если Министерство не разрешит иное.</li>
</ul><p>Все критерии должны быть выполнены. При недостатке дается срок; иначе заявление снимается с рассмотрения.</p>`,
  },
  {
    title: "Как получить разрешение на работу для сирийских работников?",
    content: `<p>Заявления подаются онлайн через e-izin на e-Devlet. Кроме независимого разрешения, подает работодатель. Нужны e-подпись и KEP.</p><p>После «подать заявление» выбирается вкладка «временная защита», заполняются данные и загружаются pdf.</p><p>При соответствии критериям заявление принимается. На e-mail отправляются банковские счета.</p><p>В течение 30 дней оплачиваются пошлина и valuable paper. Платит работодатель, кроме независимого разрешения. Карта разрешения отправляется на адрес workplace.</p><p>В течение 30 дней после одобрения работодатель уведомляет о начале работы и начинает SGK. База премии - зарплата по договору, 30 дней в месяц.</p><p>Ошибка ведет к отказу или санкциям. Рекомenдуется адвокат по миграции. Подробности в статье «как получить разрешение на работу иностранцу».</p>`,
  },
  {
    title: "Квота на трудоустройство сирийцев на предприятии",
    content: `<p>Квота: доля лиц под временной защитой не более 10% от числа граждан Türkiye.</p><p>20 турок - максимум 2 сирийца; для 3-го нужно еще 10 турок. Менее 10 работников - максимум 1 сiriец.</p><p>Если İŞKUR подтверждает отсутствие турка 4 недели, квота может не применяться.</p>`,
  },
  {
    title: "Документы, необходимые для заявления на разрешение на работу для сирийских работников",
    content: `<p>Документы подтверждают соответствие работника, работодателя и workplace:</p><ul>
<li>Трудовой договор,</li>
<li>Предварительное согласие (здравоохранение/образование),</li>
<li>Налоговая табличка,</li>
<li>Баланс и P&L,</li>
<li>Список застрахованных,</li>
<li>Trade Registry Gazette,</li>
<li>Доверенность (если есть),</li>
<li>Справка о деятельности,</li>
<li>Биометрическое фото,</li>
<li>Документ временной защиты.</li>
</ul><p>Загружает работодатель. Для независимого разрешения - только фото и документ защиты. Только pdf. При недостатке - срок, затем отказ.</p>`,
  },
  {
    title: "Минимальная заработная плата для сирийских работников",
    content: `<p>Минимальная зарплата не ниже опубликованного минимума для иностранцев. С июля 2023: 13 414,50 TL. Меньше - недействительный договор и отказ.</p>`,
  },
  {
    title: "Расходы на разрешение на работу для сирийских работников",
    content: `<p>Расходы 2023: пошлина 1 724,40 TL и 356 TL valuable paper. Оплата работодателем на счета из e-mail.</p>`,
  },
  {
    title: "Сколько времени занимает получение разрешения на работу для сирийских работников?",
    content: `<p>Рассмотрение около <strong>1 месяца</strong>. Ошибки, недостатки и загрузка удлиняют срок.</p>`,
  },
  {
    title: "Освобождение от разрешения на работу для сирийских работников",
    content: `<p>Для сезонного сельского хозяйства/животноводства возможно освобождение через valilik. При положительном разрешении можно работать без него в указанных работах.</p><p>Условия: временная защита, 6 месяцев проживания, только сезонные работы. Документы: карта защиты и фото. Valilik направляет в Минтруд.</p><p><strong>ВНИМАНИЕ:</strong> только сезонное сельское хозя/животноводство в провинции временной защиты.</p>`,
  },
  {
    title: "Заключение",
    content: `<p>Разрешения для сирийцев отличаются по критериям, квоте, документам, пошлинам и освобождению. Ошибки ведут к отказу и депортации. Адвокат снижает риски.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "مجوز کار برای کارگران سوری",
    content: `<p>مجوز کار کارگران سوری به دلیل مهاجرت گسترده از سوریه و اشتغال مهاجران، به‌ویژه در بخش‌های با کمبود نیرو، اغلب بررسی می‌شود. این نوع مجوز برای شهروندان سوری تحت حمایت موقت است.</p>`,
  },
  {
    title: "شرایط مجوز کار برای کارگران سوری",
    content: `<p>شرایط، الزامات اتباع تحت حمایت موقت است:</p><ul>
<li>حمایت موقت و اقامت حداقل 6 ماه در Türkiye،</li>
<li>شماره هویت خارجی با 99،</li>
<li>نه شغل م reserved برای ترک‌ها و از مشاغل مجاز برای حمایت موقت،</li>
<li>مجوز قبلی وزارت بهداشت/آموزش در صورت لزوم،</li>
<li>رعایت سهمیه سوری،</li>
<li>محل کار در استان کارت حمایت موقت مگر موافقت وزارت.</li>
</ul><p>استیفای کامل شرایط لازم است. نقص: مهلت؛ عدم رفع: رد.</p>`,
  },
  {
    title: "مجوز کار برای کارگران سوری چگونه اخذ می‌شود؟",
    content: `<p>درخواست آنلاین از e-izin در e-Devlet. به جز مستقل، توسط کارفرما. e-imza و KEP لازم.</p><p>تب «حمایت موقت»، تکمیل اطلاعات و بارگذاری pdf.</p><p>پذیرش: ارسال حساب بانکی به ایمیل ثبت‌شده.</p><p>پرداخت هزینه و تمبر ظرف 30 روز. کارفرما پرداخت می‌کند مگر مستقل. کارت مجوز به آدرس محل کار.</p><p>ظرف 30 روز پس از تأیید، اعلام شروع کار و SGK. مبنای حق بیمه: حقوق قرارداد، 30 روز.</p><p>خطا: رد یا مجازات. وکیل امور خارجی توصیه می‌شود. جزئیات در «چگونه مجوز کار خارجی بگیریم».</p>`,
  },
  {
    title: "سهمیه به کارگیری سوری در محل کار",
    content: `<p>سهمیه: نسبت حمایت موقت حداکثر 10% نسبت به اتباع Türkiye.</p><p>20 ترک: حداکثر 2 سوری. برای سومی 10 ترک دیگر. کمتر از 10 نفر: 1 سوری.</p><p>گواهی İŞKUR برای 4 هفته: ممکن است سهمیه اعمال نشود.</p>`,
  },
  {
    title: "مدارک لازم برای درخواست مجوز کار کارگران سوری",
    content: `<p>مدارک:</p><ul>
<li>قرارداد،</li>
<li>مجوز قبلی،</li>
<li>پلاک مالیاتی،</li>
<li>ترازنامه،</li>
<li>فهرست بیمه‌شدگان،</li>
<li>گazette تجاری،</li>
<li>وکالتنامه،</li>
<li>مجوز فعالیت،</li>
<li>عکس،</li>
<li>مدرک حمایت موقت.</li>
</ul><p>بارگذاری pdf توسط کارفرما. مستقل: عکس و مدرک حمایت. نقص: مهلت سپس رد.</p>`,
  },
  {
    title: "حداقل دستمزد کارگران سوری",
    content: `<p>حداقل دستمزد 13.414,50 لیر (تیر 2023). کمتر: بطلان قرارداد و رد.</p>`,
  },
  {
    title: "هزینه‌های مجوز کار برای کارگران سوری",
    content: `<p>هزینه 2023: 1.724,40 لیر harç و 356 لیر تمبر.</p>`,
  },
  {
    title: "صدور مجوز کار برای کارگران سوری چقدر طول می‌کشد؟",
    content: `<p>حدود <strong>1 ماه</strong>. خطا و نقص مدت را افزایش می‌دهد.</p>`,
  },
  {
    title: "معافیت مجوز کار برای کارگران سوری",
    content: `<p>برای کشاورزی/دامداری فصلی: معافیت از استانداری. با تأیید مجوز می‌توان بدون مجوز در همان مشاغل کار کرد.</p><p>شرایط: حمایت موقت، 6 ماه اقامت، فقط فصلی. مدارک: کارت حمایت و عکس.</p><p><strong>توجه:</strong> فقط کشاورزی/دامداری موقت در استان حمایت موقت.</p>`,
  },
  {
    title: "نتیجه‌گیری",
    content: `<p>مجوز سوری‌ها در معیار، سهمیه، مدارک، هزینه و معافیت متفاوت است. خطا منجر به رد و اخراج. وکیل متخصص ریسک را کاهش می‌دهد.</p>`,
  },
];

export const contentSlug = "suriyeli-iscilere-calisma-izni";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Work Permits for Syrian Workers",
    excerpt: "Work permits for Syrian workers are frequently researched due to heavy migration from Syria in recent years and employment of migrants from Syria, especially in sectors with significant labour short…",
    shortDescription: "Work permits for Syrian workers are frequently researched due to heavy migration from Syria in recent years and employment of migrants from Syria, especially in sectors with significant labour short…",
    heroTitle: "Work Permits for Syrian Workers",
    heroSubtitle: "Work permits for Syrian workers are frequently researched due to heavy migration from Syria in recent years and employment of migrants from Syria, especially in sectors with significant labour short…",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "تصاريح العمل للعمال السوريين",
    excerpt: "تُبحث تصاريح العمل للعمال السوريين كثيراً بسبب الهجرة الكثيفة من سوريا في السنوات الأخيرة وتوظيف المهاجرين من سوريا، خصوصاً في القطاعات التي تعاني نقصاً في العمالة…",
    shortDescription: "تُبحث تصاريح العمل للعمال السوريين كثيراً بسبب الهجرة الكثيفة من سوريا في السنوات الأخيرة وتوظيف المه migrants من سوريا، خصوصاً في القطاعات التي تعاني نقصاً في العمالة…",
    heroTitle: "تصاريح العمل للعمال السوريين",
    heroSubtitle: "تُبحث تصاريح العمل للعمال السوريين كثيراً بسبب الهجرة الكثيفة من سوريا في السنوات الأخيرة وتوظيف المهاجرين من سوريا، خصوصاً في القطاعات التي تعاني نقصاً في العمالة…",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Разрешения на работу для сирийских работников",
    excerpt: "Разрешения на работу для сирийских работников часто изучаются из-за интенсивной миграции из Сирии в последние годы и трудоустройства мигрантов из Сирии, особенно в секторах с дефицитом рабочей силы…",
    shortDescription: "Разрешения на работу для сирийских работников часто изучаются из-за интенсивной миграции из Сирии в последние годы и трудоустройства мигрантов из Сирии, особенно в секторах с дефицитом рабочей силы…",
    heroTitle: "Разрешения на работу для сирийских работников",
    heroSubtitle: "Разрешения на работу для сирийских работников часто изучаются из-за интенсивной миграции из Сирии в последние годы и трудоустройства мигрантов из Сирии, особенно в секторах с дефицитом рабочей силы…",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "مجوز کار برای کارگران سوری",
    excerpt: "مجوز کار برای کارگران سوری به دلیل مهاجرت گسترده از سوریه در سال‌های اخیر و اشتغال مهاجران سوری، به‌ویژه در بخش‌های با کمبود نیروی کار، اغلب مورد جستجو قرار می‌گیرد…",
    shortDescription: "مجوز کار برای کارگران سوری به دلیل مهاجرت گسترده از سوریه در سال‌های اخیر و اشتغال مهاجران سوری، به‌ویژه در بخش‌های با کمبود نیروی کار، اغلب مورد جستجو قرار می‌گیرد…",
    heroTitle: "مجوز کار برای کارگران سوری",
    heroSubtitle: "مجوز کار برای کارگران سوری به دلیل مهاجرت گسترده از سوریه در سال‌های اخیر و اشتغال مهاجران سوری، به‌ویژه در بخش‌های با کمبود نیروی کار، اغلب مورد جستجو قرار می‌گیرد…",
    sectionsJson: serializeServiceSections(faSections),
  },
};
