import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Foreign Work Permit Extension",
    content: `<p>Foreign work permit extension is an administrative application applied by foreigners working with a work permit in Türkiye and their employers to extend the work permit period. After the work permit expires, a foreigner who works without applying for an extension will be subject to deportation, and the employer who employs this foreigner will be subject to an administrative fine.</p>`,
  },
  {
    title: "How to Apply for Foreign Work Permit Extension?",
    content: `<p>Application for work permit extension is made by the employer through the e-permit portal on the e-government system. To log into the system, the employer must have his/her KEP address and e-signature. In the extension application tab in the system, the employee to whom the extension application will be made is selected. Afterwards, the application is completed by entering the information in the application form completely and uploading the required documents to the system in PDF format.</p><p>After the work permit extension application is made, the fee, valuable paper fees and bank account information are sent to the employer's e-mail address registered in the system. Fees and valuable paper fees must be paid within 30 days from this notification. Otherwise, the application will be removed from the process. </p><p>After the application fees are paid, the work certificate is mailed to the workplace address upon the positive outcome of the extension by the competent authorities.</p><p><strong>ATTENTION: With the regulations made, it has become mandatory for the employer who will apply for a work permit or extension to have a KEP address suitable for e-signature and electronic notification.</p>`,
  },
  {
    title: "When to Extend a Work Permit?",
    content: `<p>Work permit extension application; It is made 60 days before the end of the work permit period and in any case before the expiration of the permit. Work permit extension applications not made within the deadline will not be accepted. </p> Can an extension be made after the work permit has expired?<p>An extension cannot be made after the work permit has expired. Extension applications made after the work permit expires are rejected. If the foreigner does not also have a valid residence permit, he will be deported if he does not leave the country within 10 days.</p><p>If the foreigner whose work permit has expired has not applied for an extension but wants to continue working in Türkiye, he must apply for a new work permit. Extension applications made after the work permit period has expired are subject to the same provisions as the first work permit application. </p>`,
  },
  {
    title: "Work Permit Extension Application Conditions",
    content: `<p>Work permit extension application conditions; It is divided into three: conditions that must be met by the employer, conditions that must be met by foreign personnel and other conditions. </p>Requirements that the Employer Must Meet<p>There are some conditions that the employer must meet in order for the foreign employee's work permit extension application to be accepted. These conditions can be listed as follows:</p><ul>
<li>The proportion of foreign workers working in the workplace must be at most ⅙ of the workers in the workplace (for example, if 6 people work in the workplace, at most 1 of them can be a foreigner.)</li>



<li>The capital requirement must be maintained.</li>



<li>The foreign worker must have paid his/her SSI payments in full.</li>



<li>The business must have paid all tax debts.</li>



<li>The wage paid to foreign personnel should not be lower than the minimum wage determined for foreigners.</li>
</ul><p>In addition, the conditions that the workplace must meet when making the first application must still continue. In addition, the workplace must have made turnover in the department where the foreigner works and must have contributed to the country's economy.</p><p>In order for the foreign personnel extension application to be successful, the employment contract signed between the foreign employee and the employer must be prepared in accordance with the determined criteria. In practice, rejection of applications due to errors in contracts frequently occurs. At this point, it is beneficial to get support from a foreigners lawyer while preparing the contract.</p>Requirements for Foreign Personnel<p>There are also some conditions that the foreign worker must meet in order for the extension application to be accepted. These conditions are:</p><ul>
<li>Foreign worker; Must not have been abroad for more than six months during the work permit period,</li>



<li>He must not have been involved in any crime,</li>



<li>During the work permit, it must not pose any threat to public health and safety.  </li>
</ul><p>In addition to these conditions, special conditions regarding the existing work permit must continue to be met. </p>Other Conditions<p>The conditions listed and explained above are the general conditions for the work permit extension application. In addition, each sector has its own conditions. Information on all work permits that a foreigner may have is explained in the article titled "How to obtain a foreign work permit".</p>`,
  },
  {
    title: "Update of Foreign Personnel Fee in Extension Applications",
    content: `<p>For foreign work permit extension applications, the foreign personnel fee must be updated. Since the minimum wage tariff for foreigners is republished every 6 months, the wage the foreigner will receive during the new work permit period must be determined above the minimum amount.</p>`,
  },
  {
    title: "Documents Required for Work Permit Extension",
    content: `<p>Some of the documents required for work permit extension must be submitted by the foreign employee and some by the employer. </p><p>Documents required for work permit extension are:</p><ul>
<li>Work permit extension application form,</li>



<li>Employment contract between the employer and the foreigner,</li>



<li>The foreign employee's diploma or graduation certificate translated into Turkish by a sworn translator,</li>



<li>Photocopy of passport or passport substitute document,</li>



<li>2 biometric photographs of the foreign employee,</li>



<li>Diploma showing the last school the foreigner graduated from,</li>



<li>Profit and loss balance sheet approved by the employer's tax office or SMM,</li>



<li>Current work permit document,</li>



<li>Workplace activity certificate,</li>



<li>If the foreign national is going to work in the health sector, he/she must obtain a preliminary permit from the Ministry of Health; if he/she will work in the education sector, he/she will receive a preliminary permit from the Ministry of National Education.</strong></li>



<li>Trade Registry Gazette showing the latest capital structure and number of partners of the workplace.</li>
</ul><p>These documents are uploaded to the system electronically at the time of application. If the documents cannot be obtained electronically, they must be scanned in the accepted format (pdf) and uploaded to the system.</p><p>If there is a deficiency in the documents, the evaluation of the application is postponed until this deficiency is corrected. A maximum of 30 days is given to correct the deficiency. If the deficiency is not corrected within this period, the application will be rejected.</p>`,
  },
  {
    title: "How Long Does It Take to Get a Work Permit Extension?",
    content: `<p>Work permit extension applications are completed in approximately 20-25 days. However, this period may vary depending on the density of applications. If there is a deficiency in the application documents, the administration may give up to 30 days to correct this deficiency. During this period, the application is suspended until the deficiency is completed.</p>`,
  },
  {
    title: "How Many Years Can a Work Permit Be Extended?",
    content: `<p>The work permit obtained for the first time can be extended for a maximum of <strong>2 years</strong>. If an extension application is made again after this extension period has expired, a maximum extension of 3 years is required. </p><p>For example, when a foreigner working in Türkiye with a 1-year work permit applies for an extension, the permit is extended for a maximum of 2 years. If an extension application is made 60 days before the end of this period, the application will be extended for a maximum of 3 years. Thus, the work permit is finally obtained for 1+2+3 years. </p><p>In case of change of employer, the extension application will be granted for a maximum period of 1 year, as it will be subject to the provisions of the work permit application made for the first time.</p>`,
  },
  {
    title: "How to Change Work Permit Workplace (Transfer of Permit)?",
    content: `<p>A foreigner working in Türkiye with a work permit can transfer to a different position in the same workplace or to a different branch of the same employer in the same business line. However, there are some conditions required for this transition. These conditions can be listed as follows:</p><ul>
<li>The application for branch or position change must be submitted to the Ministry of Labor and Social Security through the e-permit portal on e-government.</li>



<li>In case of a position change, the transferred position should not require prior permission and should be similar to the foreigner's previous position.</li>



<li>In case of a branch change, the branch to which the transfer is made must also be registered in the employer's trade registry.</li>



<li>The application must be approved by the General Directorate of International Labor Force.</li>
</ul><p>It is not possible to transfer a work permit if you continue to work with a different employer. Likewise, it is not possible to transfer the work permit in case of transfer to a completely different and independent workplace. In these cases, a new work permit application must be made by the new employer.</p><p>Information regarding work permit transfer applications is explained in detail in the article titled "work permit transfer (change of workplace)".</p>`,
  },
  {
    title: "SSI Transactions During the Extension Process",
    content: `<p>During the evaluation of the work permit extension application, the employer's SSI obligations towards the employee will continue. During this period, if the foreigner continues to work, his insurance must be paid and the employee can request this from the employer.</p>`,
  },
  {
    title: "Extension by Sectors",
    content: `<p>The conditions for extending a work permit are generally as described above, but there are special conditions required in some work sectors. Special conditions for each sector are required in addition to the general conditions for extending a work permit. In other words, the general conditions described above are valid for extension applications in all sectors. The special conditions of the sectors are explained below.</p><p><strong>Home services:</strong> For foreigners; A work permit is not given for working in domestic services other than caring for the elderly, the sick and children. In order to extend the work permit in elderly care, the elderly person cared for by the foreigner must be alive when the extension application is made.</p><p>HealthThe condition of being alive is also valid in patient care, and the disease of the patient being cared for must continue. In child care, the child cared for by a foreigner must not be over 15 years old.</p><p><strong>Related article:</strong> “foreign caregiver work permit”</p><p><strong>Education sector:</strong> In order for the work permit of a foreigner working in the education sector to be extended, in addition to the general conditions, there must be an increase in the number of students of the educational institution where he/she works. In addition, extension applications in the education sector are subject to the prior permission of the Ministry of National Education. This permit can be obtained from the provincial directorate of national education.</p><p><strong>Related article:</strong> “foreign teacher work permit”</p><p><strong>Health Sector: </strong>Extension of the work permit of a foreigner working in the health sector is subject to the preliminary permission of the Ministry of Health. This permit can be obtained from the provincial health directorate.</p><p><strong>Related article:</strong> “foreign doctor work permit”</p><p>Sectors other than home services, education and health sector do not have their own special conditions, they are only subject to general conditions.</p>`,
  },
  {
    title: "Work Permit Extension Lawyer Fees and Expenses",
    content: `<p>Work permit extension costs vary depending on the type of work permit and the period to be extended, but are 4,635.30 Liras for each extension year. If a one-year extension is to be made, it is 4,635.30 TL, if an extension is to be made for up to two years, it is 9,270.60 TL, and if an extension is to be made from two to three years, it is 13,905.90 TL. In addition, a valuable paper fee of 356 TL must be paid, regardless of the extension period.</p>`,
  },
  {
    title: "Rejection of Work Permit Extension Application",
    content: `<p>The work permit extension application that does not meet the extension conditions, is not made within the deadline, is submitted with incomplete documents and this deficiency is not corrected within the deadline will be rejected. </p><p>After the application is completed, the administration evaluates the application and makes a decision. The administration's failure to make a decision within this period is also considered as an implied rejection. If the application is rejected, an objection to the administration and an annulment case are open.</p><p><strong>ATTENTION:</strong>The foreigner whose work permit is rejected must leave the country within ten days. Otherwise he will be deported. However, if the foreigner objects to the rejection of the extension application or files an annulment lawsuit, he/she does not have to leave Türkiye until this process is concluded. </p>Objection and Cancellation Case Against Rejection of Work Permit Extension Application<p>If the work permit extension application is rejected, objection and cancellation case can be filed with the competent authority. An objection may be made to the Ministry of Labor and Social Security within 30 days from the notification of the rejection decision to the applicant, or from the expiration of the 30-day period in case of implied rejection. </p><p>If the objection to the competent authority is rejected or if the objection is not answered, an annulment case may be filed in the administrative court. Objecting to the competent authority is not a mandatory method, and an annulment case can be filed directly.</p><p>The legal procedure to be applied in matters regarding the rejection of the extension application is the same as the rejection of the first application. Detailed information on the subject is included in the article titled "Rejection of work permit extension application".</p>`,
  },
  {
    title: "Conclusion",
    content: `<p>If the work permit extension application is made improperly, the application is rejected. If the foreigner continues to work after the rejection decision, it causes an administrative fine to be imposed on the employer and a deportation penalty to the working foreigner. There are opportunities to object and file an annulment case against the rejection of the extension application. Since these legal remedies are subject to a very detailed and complex procedure, it is important to carry out the process with a lawyer who is an expert in the field. </p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "تمديد تصريح العمل الأجنبي",
    content: `<p>تمديد تصريح العمل الأجنبي هو تطبيق إداري يطبقه الأجانب الذين يعملون بتصريح عمل في Türkiye وأصحاب العمل لتمديد فترة تصريح العمل. بعد انتهاء صلاحية تصريح العمل، فإن الأجنبي الذي يعمل دون التقدم بطلب للحصول على تمديد سيكون عرضة للترحيل، وسيتعرض صاحب العمل الذي يستخدم هذا الأجنبي لغرامة إدارية.</p>`,
  },
  {
    title: "كيفية التقدم بطلب تمديد تصريح العمل الأجنبي؟",
    content: `<p>يتم تقديم طلب تمديد تصريح العمل من قبل صاحب العمل من خلال بوابة التصاريح الإلكترونية على نظام الحكومة الإلكترونية. لتسجيل الدخول إلى النظام، يجب أن يكون لدى صاحب العمل عنوان KEP الخاص به وتوقيعه الإلكتروني. في علامة تبويب طلب التمديد في النظام، يتم اختيار الموظف الذي سيتم تقديم طلب التمديد إليه. بعد ذلك يتم استكمال الطلب بإدخال المعلومات الموجودة في نموذج الطلب بشكل كامل ورفع المستندات المطلوبة على النظام بصيغة PDF. </p><p>بعد تقديم طلب تمديد تصريح العمل، يتم إرسال الرسم ورسوم الأوراق القيمة ومعلومات الحساب البنكي إلى عنوان البريد الإلكتروني لصاحب العمل المسجل في النظام. يجب دفع الرسوم ورسوم الأوراق القيمة خلال 30 يومًا من هذا الإخطار. وإلا سيتم إزالة التطبيق من العملية. </p><p>بعد دفع رسوم الطلب، يتم إرسال شهادة العمل بالبريد إلى عنوان مكان العمل عند النتيجة الإيجابية للتمديد من قبل السلطات المختصة. </p><p><strong>تنبيه: مع وضع اللوائح، أصبح إلزاميًا على صاحب العمل الذي سيتقدم بطلب للحصول على تصريح عمل أو تمديد أن يكون لديه عنوان KEP مناسب للتوقيع الإلكتروني والإخطار الإلكتروني.</p>`,
  },
  {
    title: "متى يتم تمديد تصريح العمل؟",
    content: `<p>طلب تمديد تصريح العمل؛ يتم ذلك قبل 60 يومًا من نهاية فترة تصريح العمل وفي أي حال قبل انتهاء صلاحية التصريح. لن يتم قبول طلبات تمديد تصريح العمل التي لم يتم تقديمها خلال الموعد النهائي. </p> هل يمكن إجراء التمديد بعد انتهاء صلاحية تصريح العمل؟<p>لا يمكن إجراء التمديد بعد انتهاء صلاحية تصريح العمل. يتم رفض طلبات التمديد المقدمة بعد انتهاء صلاحية تصريح العمل. إذا لم يكن لدى الأجنبي أيضًا تصريح إقامة ساري المفعول، فسيتم ترحيله إذا لم يغادر البلاد خلال 10 أيام.</p><p>إذا لم يتقدم الأجنبي الذي انتهت صلاحية تصريح عمله بطلب تمديد ولكنه يريد مواصلة العمل في Türkiye، فيجب عليه التقدم بطلب للحصول على تصريح عمل جديد. تخضع طلبات التمديد المقدمة بعد انتهاء فترة تصريح العمل لنفس الأحكام التي يخضع لها طلب تصريح العمل الأول. </ص>`,
  },
  {
    title: "شروط طلب تمديد تصريح العمل",
    content: `<p>شروط طلب تمديد تصريح العمل؛ وتنقسم إلى ثلاثة: الشروط التي يجب أن تتوفر في صاحب العمل، والشروط التي يجب أن تتوفر في العمالة الأجنبية، وغيرها من الشروط. </p>المتطلبات التي يجب أن يستوفيها صاحب العمل<p>هناك بعض الشروط التي يجب أن يستوفيها صاحب العمل حتى يتم قبول طلب تمديد تصريح العمل للموظف الأجنبي. ويمكن سرد هذه الشروط على النحو التالي:</p><ul>
<li>يجب أن تكون نسبة العمال الأجانب العاملين في مكان العمل ⅙ على الأكثر من العمال في مكان العمل (على سبيل المثال، إذا كان 6 أشخاص يعملون في مكان العمل، فيمكن أن يكون واحد منهم أجنبيًا على الأكثر.)</li>



<li>يجب الحفاظ على متطلبات رأس المال.</li>



<li>يجب أن يكون العامل الأجنبي قد دفع مدفوعات SSI الخاصة به بالكامل.</li>



<li>يجب أن تكون الشركة قد سددت جميع الديون الضريبية.</li>



<li>يجب ألا يكون الأجر المدفوع للموظفين الأجانب أقل من الحد الأدنى للأجور المحدد للأجانب.</li>
</ul><p>بالإضافة إلى ذلك، يجب أن تستمر الشروط التي يجب أن يستوفيها مكان العمل عند تقديم الطلب الأول. بالإضافة إلى ذلك، يجب أن يكون مكان العمل قد حقق معدل دوران في القسم الذي يعمل فيه الأجنبي ويجب أن يكون قد ساهم في اقتصاد البلاد.</p><p>لكي ينجح طلب تمديد الموظفين الأجانب، يجب إعداد عقد العمل الموقع بين الموظف الأجنبي وصاحب العمل وفقًا للمعايير المحددة. ومن الناحية العملية، يحدث في كثير من الأحيان رفض الطلبات بسبب أخطاء في العقود. في هذه المرحلة، من المفيد الحصول على دعم من محامٍ أجنبي أثناء إعداد العقد.</p>متطلبات الموظفين الأجانب<p>هناك أيضًا بعض الشروط التي يجب أن يستوفيها العامل الأجنبي حتى يتم قبول طلب التمديد. وهذه الشروط هي:</p><ul>
<li>عامل أجنبي؛ يجب ألا يكون قد مضى على وجوده في الخارج أكثر من ستة أشهر خلال فترة تصريح العمل،</li>



<li>يجب ألا يكون متورطًا في أي جريمة</li>



<li>يجب ألا يشكل أي خطر على الصحة والسلامة العامة أثناء فترة تصريح العمل.  </لي>
</ul><p>بالإضافة إلى هذه الشروط، يجب الاستمرار في استيفاء الشروط الخاصة المتعلقة بتصريح العمل الحالي. </p>شروط أخرى<p>الشروط المذكورة والموضحة أعلاه هي الشروط العامة لطلب تمديد تصريح العمل. وبالإضافة إلى ذلك، فإن كل قطاع له شروطه الخاصة. المعلومات الخاصة بجميع تصاريح العمل التي قد يحصل عليها الأجنبي موضحة في المقالة بعنوان "كيفية الحصول على تصريح عمل أجنبي".</p>`,
  },
  {
    title: "تحديث رسوم الموظفين الأجانب في طلبات التمديد",
    content: `<p>بالنسبة لطلبات تمديد تصريح العمل الأجنبي، يجب تحديث رسوم الموظفين الأجانب. نظرًا لأنه يتم إعادة نشر تعريفة الحد الأدنى للأجور للأجانب كل 6 أشهر، فيجب تحديد الأجر الذي سيحصل عليه الأجنبي خلال فترة تصريح العمل الجديد أعلى من الحد الأدنى.</p>`,
  },
  {
    title: "المستندات المطلوبة لتمديد تصريح العمل",
    content: `<p>يجب تقديم بعض المستندات المطلوبة لتمديد تصريح العمل من قبل العامل الأجنبي وبعضها من قبل صاحب العمل. </p><p>المستندات المطلوبة لتمديد تصريح العمل هي:</p><ul>
<li>نموذج طلب تمديد تصريح العمل،</li>



<li>عقد العمل بين صاحب العمل والأجنبي</li>



<li>دبلوم الموظف الأجنبي أو شهادة التخرج مترجمة إلى اللغة التركية من قبل مترجم محلف</li>



<li>نسخة من جواز السفر أو وثيقة بديلة لجواز السفر</li>



<li>صورتان بيومترية للموظف الأجنبي</li>



<li>دبلوم يوضح آخر مدرسة تخرج منها الأجنبي</li>



<li>ميزانية عمومية للأرباح والخسائر معتمدة من مكتب الضرائب التابع لصاحب العمل أو SMM،</li>



<li>مستند تصريح العمل الحالي،</li>



<li>شهادة نشاط مكان العمل،</li>



<li>إذا كان المواطن الأجنبي سيعمل في القطاع الصحي، فيجب عليه الحصول على تصريح مبدئي من وزارة الصحة؛ إذا كان سيعمل في قطاع التعليم، فسوف يحصل على تصريح أولي من وزارة التربية الوطنية.</strong></li>



<li>جريدة السجل التجاري توضح أحدث هيكل رأس المال وعدد الشركاء في مكان العمل.</li>
</ul><p>يتم رفع هذه المستندات على النظام إلكترونيًا عند تقديم الطلب. في حالة عدم إمكانية الحصول على المستندات إلكترونيًا، يجب مسحها ضوئيًا بالصيغة المقبولة (pdf) وتحميلها على النظام.</p><p>في حالة وجود نقص في المستندات، يتم تأجيل تقييم الطلب حتى يتم تصحيح هذا النقص. يتم إعطاء 30 يومًا كحد أقصى لتصحيح النقص. إذا لم يتم تصحيح النقص خلال هذه المدة سيتم رفض الطلب.</p>`,
  },
  {
    title: "كم من الوقت يستغرق الحصول على تمديد تصريح العمل؟",
    content: `<p>يتم إكمال طلبات تمديد تصريح العمل خلال 20-25 يومًا تقريبًا. ومع ذلك، قد تختلف هذه الفترة تبعا لكثافة الطلبات. إذا كان هناك نقص في وثائق الطلب، يجوز للإدارة إعطاء ما يصل إلى 30 يوما لتصحيح هذا النقص. خلال هذه الفترة يتم تعليق الطلب لحين استكمال النقص.</p>`,
  },
  {
    title: "كم سنة يمكن تمديد تصريح العمل؟",
    content: `<p>يمكن تمديد تصريح العمل الذي تم الحصول عليه لأول مرة لمدة أقصاها <strong>سنتان</strong>. إذا تم تقديم طلب التمديد مرة أخرى بعد انتهاء فترة التمديد هذه، فيجب أن يكون الحد الأقصى للتمديد 3 سنوات. </p><p>على سبيل المثال، عندما يتقدم أجنبي يعمل في Türkiye بتصريح عمل لمدة عام واحد بطلب تمديد، يتم تمديد التصريح لمدة عامين كحد أقصى. إذا تم تقديم طلب التمديد قبل 60 يومًا من نهاية هذه الفترة، فسيتم تمديد الطلب لمدة أقصاها 3 سنوات. وبذلك يتم الحصول أخيراً على تصريح العمل لمدة 1+2+3 سنوات. </p><p>في حالة تغيير صاحب العمل، سيتم منح طلب التمديد لمدة أقصاها سنة واحدة، حيث سيخضع لأحكام طلب تصريح العمل المقدم لأول مرة.</p>`,
  },
  {
    title: "كيفية تغيير تصريح العمل إلى مكان العمل (نقل التصريح)؟",
    content: `<p>يمكن للأجنبي الذي يعمل في Türkiye بموجب تصريح عمل أن ينتقل إلى وظيفة مختلفة في نفس مكان العمل أو إلى فرع مختلف لنفس صاحب العمل في نفس خط العمل. ومع ذلك، هناك بعض الشروط المطلوبة لهذا التحول. ويمكن سرد هذه الشروط على النحو التالي:</p><ul>
<li>يجب تقديم طلب تغيير الفرع أو الوظيفة إلى وزارة العمل والضمان الاجتماعي من خلال بوابة التصاريح الإلكترونية على الحكومة الإلكترونية.</li>



<li>في حالة تغيير الوظيفة، يجب ألا تتطلب الوظيفة المنقولة الحصول على إذن مسبق ويجب أن تكون مشابهة لوظيفة الأجنبي السابقة.</li>



<li>في حالة تغيير الفرع، يجب أيضًا تسجيل الفرع الذي تم التحويل إليه في السجل التجاري لصاحب العمل.</li>



<li>يجب أن تتم الموافقة على الطلب من قبل المديرية العامة للقوى العاملة الدولية.</li>
</ul><p>لا يمكن نقل تصريح العمل إذا واصلت العمل مع صاحب عمل مختلف. وبالمثل، لا يمكن نقل تصريح العمل في حالة النقل إلى مكان عمل مختلف تمامًا ومستقل. في هذه الحالات، يجب أن يقدم صاحب العمل الجديد طلب تصريح عمل جديد.</p><p>يتم شرح المعلومات المتعلقة بطلبات نقل تصريح العمل بالتفصيل في المقالة التي تحمل عنوان "نقل تصريح العمل (تغيير مكان العمل)".</p>`,
  },
  {
    title: "معاملات SSI أثناء عملية التمديد",
    content: `<p>أثناء تقييم طلب تمديد تصريح العمل، ستستمر التزامات صاحب العمل SSI تجاه الموظف. خلال هذه الفترة إذا استمر الأجنبي في العمل يجب دفع تأمينه ويمكن للعامل أن يطلب ذلك من صاحب العمل.</p>`,
  },
  {
    title: "التمديد حسب القطاعات",
    content: `<p>شروط تمديد تصريح العمل بشكل عام كما هو موضح أعلاه، ولكن هناك شروط خاصة مطلوبة في بعض قطاعات العمل. ويشترط توفر شروط خاصة بكل قطاع بالإضافة إلى الشروط العامة لتمديد تصريح العمل. بمعنى آخر، الشروط العامة الموضحة أعلاه صالحة لطلبات الإرشاد في جميع القطاعات. الشروط الخاصة للقطاعات موضحة أدناه.</p><p><strong>الخدمات المنزلية:</strong> للأجانب؛ لا يمنح تصريح عمل للعمل في الخدمات المنزلية بخلاف رعاية المسنين والمرضى والأطفال. من أجل تمديد تصريح العمل في رعاية المسنين، يجب أن يكون المسن الذي يرعاه الأجنبي على قيد الحياة عند تقديم طلب التمديد.</p><p>الصحةشرط البقاء على قيد الحياة ساري أيضًا في رعاية المرضى، ويجب أن يستمر مرض المريض الذي تتم رعايته. في مجال رعاية الأطفال، يجب ألا يزيد عمر الطفل الذي يعتني به أجنبي عن 15 عامًا.</p><p><strong>مقال ذو صلة:</strong> "تصريح عمل مقدم رعاية أجنبي"</p><p><strong>قطاع التعليم:</strong> من أجل تمديد تصريح عمل الأجنبي العامل في قطاع التعليم، بالإضافة إلى الشروط العامة، يجب أن يكون هناك زيادة في عدد طلاب المؤسسة التعليمية التي يعمل بها. وبالإضافة إلى ذلك، تخضع طلبات التمديد في قطاع التعليم للحصول على إذن مسبق من وزارة التربية الوطنية. يمكن الحصول على هذا التصريح من المديرية الإقليمية للتعليم الوطني.</p><p><strong>مقال ذو صلة:</strong> "تصريح عمل المعلم الأجنبي"</p><p><strong>القطاع الصحي: </strong>يخضع تمديد تصريح العمل للأجنبي العامل في القطاع الصحي للحصول على إذن أولي من وزارة الصحة. يمكن الحصول على هذا التصريح من مديرية الصحة بالمحافظة.</p><p><strong>مقال ذو صلة:</strong> "تصريح عمل طبيب أجنبي"</p><p>القطاعات الأخرى غير الخدمات المنزلية وقطاع التعليم والصحة ليس لها شروط خاصة بها، فهي تخضع فقط للشروط العامة.</p>`,
  },
  {
    title: "تمديد تصريح العمل أتعاب ونفقات المحامي",
    content: `<p>تختلف تكاليف تمديد تصريح العمل حسب نوع تصريح العمل والمدة المراد تمديدها، ولكنها تبلغ 4,635.30 ليرة لكل سنة تمديد. إذا كان سيتم التمديد لمدة عام واحد، فهو 4,635.30 ليرة تركية، وإذا كان سيتم التمديد لمدة تصل إلى عامين، فهو 9,270.60 ليرة تركية، وإذا كان سيتم التمديد من سنتين إلى ثلاث سنوات، فهو 13,905.90 ليرة تركية. بالإضافة إلى ذلك، يجب دفع رسوم ورقية قيمة قدرها 356 ليرة تركية، بغض النظر عن فترة التمديد.</p>`,
  },
  {
    title: "رفض طلب تمديد تصريح العمل",
    content: `<p>سيتم رفض طلب تمديد تصريح العمل الذي لا يستوفي شروط التمديد، ولم يتم تقديمه خلال الموعد النهائي، ويتم تقديمه بمستندات غير كاملة ولم يتم تصحيح هذا النقص خلال الموعد النهائي. </p><p>بعد اكتمال الطلب، تقوم الإدارة بتقييم الطلب واتخاذ القرار. كما يعتبر عدم اتخاذ الإدارة قرارا خلال هذه المدة بمثابة رفض ضمني. في حالة رفض الطلب، يتم فتح اعتراض أمام الإدارة وقضية إلغاء.</p><p><strong>تنبيه:</strong>يجب على الأجنبي الذي تم رفض تصريح عمله مغادرة البلاد خلال عشرة أيام. وإلا سيتم ترحيله. ومع ذلك، إذا اعترض الأجنبي على رفض طلب التمديد أو رفع دعوى إلغاء، فلا يتعين عليه مغادرة Türkiye حتى تنتهي هذه العملية. </p>قضية الاعتراض والإلغاء ضد رفض طلب تمديد تصريح العمل<p>في حالة رفض طلب تمديد تصريح العمل، يمكن رفع دعوى الاعتراض والإلغاء إلى السلطة المختصة. ويجوز تقديم الاعتراض إلى وزارة العمل والضمان الاجتماعي خلال 30 يوماً من تاريخ إبلاغ مقدم الطلب بقرار الرفض، أو من انقضاء مدة الثلاثين يوماً في حالة الرفض الضمني. </p><p>في حالة رفض الاعتراض أمام الجهة المختصة أو عدم الرد على الاعتراض، يجوز رفع دعوى الإلغاء أمام المحكمة الإدارية. الاعتراض لدى الجهة المختصة ليس طريقة إلزامية، ويمكن رفع دعوى الإلغاء مباشرة.</p><p>إن الإجراء القانوني الذي سيتم تطبيقه في الأمور المتعلقة برفض طلب التمديد هو نفس الإجراء الذي يتم به رفض الطلب الأول. المعلومات التفصيلية عن الموضوع متضمنة في المقال بعنوان "رفض طلب تمديد تصريح العمل".</p>`,
  },
  {
    title: "خاتمة",
    content: `<p>إذا تم تقديم طلب تمديد تصريح العمل بشكل غير صحيح، فسيتم رفض الطلب. إذا استمر الأجنبي في العمل بعد قرار الرفض، فإنه يؤدي إلى فرض غرامة إدارية على صاحب العمل وعقوبة الترحيل للأجنبي العامل. هناك فرص للاعتراض ورفع دعوى فسخ ضد رفض طلب التمديد. وبما أن سبل الانتصاف القانونية هذه تخضع لإجراءات مفصلة ومعقدة للغاية، فمن المهم تنفيذ العملية مع محامٍ خبير في هذا المجال. </ص>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Продление разрешения на работу за рубежом",
    content: `<p>Продление разрешения на работу для иностранцев - это административное заявление, подаваемое иностранцами, имеющими разрешение на работу в Türkiye, и их работодателями для продления срока действия разрешения на работу. По истечении срока действия разрешения на работу иностранец, работающий без подачи заявления на продление, будет подлежать депортации, а работодатель, нанявший этого иностранца, будет подвергнут административному штрафу.</p>`,
  },
  {
    title: "Как подать заявку на продление разрешения на работу за рубежом?",
    content: `<p>Заявление о продлении разрешения на работу подается работодателем через портал электронного разрешения в системе электронного правительства. Для входа в систему работодателю необходимо иметь свой адрес КЭП и электронную подпись. Во вкладке заявления на продление в системе выбирается сотрудник, которому будет сделано заявление на продление. После этого заявка заполняется путем полного ввода информации в форму заявки и загрузки необходимых документов в систему в формате PDF.</p><p>После подачи заявки на продление разрешения на работу плата, ценные бумажные сборы и информация о банковском счете отправляются на адрес электронной почты работодателя, зарегистрированный в системе. Пошлины и сборы за ценные бумаги должны быть оплачены в течение 30 дней с момента получения этого уведомления. В противном случае заявка будет удалена из процесса. </p><p>После уплаты сборов за подачу заявления сертификат с работы отправляется по адресу рабочего места после положительного результата продления компетентными органами.</p><p><strong>ВНИМАНИЕ: С принятием правил стало обязательным для работодателя, который будет подавать заявление на получение разрешения на работу или продление, иметь адрес KEP, подходящий для электронной подписи и электронного уведомления.</p>`,
  },
  {
    title: "Когда продлевать разрешение на работу?",
    content: `<p>Заявление о продлении разрешения на работу; Оно производится за 60 дней до окончания срока действия разрешения на работу и в любом случае до истечения срока действия разрешения. Заявки на продление разрешения на работу, не поданные в установленный срок, не принимаются. </p> Можно ли продлить разрешение на работу после истечения срока действия разрешения на работу?<p>Продление нельзя сделать после истечения срока действия разрешения на работу. Заявки на продление, поданные после истечения срока действия разрешения на работу, отклоняются. Если у иностранца также нет действующего вида на жительство, он будет депортирован, если он не покинет страну в течение 10 дней.</p><p>Если иностранец, чье разрешение на работу истекло, не подал заявку на продление, но хочет продолжить работу в Türkiye, он должен подать заявление на получение нового разрешения на работу. Заявления о продлении, поданные после истечения срока действия разрешения на работу, регулируются теми же положениями, что и первое заявление о разрешении на работу. </p>`,
  },
  {
    title: "Условия подачи заявления на продление разрешения на работу",
    content: `<p>Условия подачи заявления на продление разрешения на работу; Он разделен на три: условия, которым должен соответствовать работодатель, условия, которым должен соответствовать иностранный персонал и другие условия. </p>Требования, которым должен соответствовать работодатель<p>Существует ряд условий, которым работодатель должен соответствовать, чтобы заявление на продление разрешения на работу иностранного работника было принято. Эти условия можно перечислить следующим образом:</p><ul>
<li>Доля иностранных работников, работающих на рабочем месте, должна составлять не более ⅙ от числа работающих на рабочем месте (например, если на рабочем месте работают 6 человек, не более 1 из них может быть иностранцем.)</li>



<li>Требования к капиталу должны быть сохранены.</li>



<li>Иностранный работник должен полностью выплатить выплаты SSI.</li>



<li>Компания должна выплатить все налоговые долги.</li>



<li>Заработная плата, выплачиваемая иностранному персоналу, не должна быть ниже минимальной заработной платы, установленной для иностранцев.</li>
</ul><p>Кроме того, должны сохраняться условия, которым должно соответствовать рабочее место при подаче первого заявления. Кроме того, рабочее место должно иметь оборот в подразделении, где работает иностранец, и должно вносить вклад в экономику страны.</p><p>Чтобы заявка на продление иностранного персонала была успешной, трудовой договор, заключаемый между иностранным работником и работодателем, должен быть подготовлен в соответствии с установленными критериями. На практике часто случается отказ в приеме заявок из-за ошибок в договорах. На этом этапе полезно получить поддержку от юриста-иностранца при подготовке контракта.</p>Требования к иностранному персоналу<p>Есть также некоторые условия, которым иностранный работник должен соответствовать, чтобы заявление о продлении было принято. Эти условия:</p><ul>
<li>Иностранный рабочий; Не должен находиться за границей более шести месяцев в период действия разрешения на работу.</li>



<li>Он не должен был быть замешан в каком-либо преступлении.</li>



<li>Во время действия разрешения на работу оно не должно представлять никакой угрозы здоровью и безопасности населения.  </li>
</ul><p>В дополнение к этим условиям необходимо продолжать соблюдать особые условия, касающиеся существующего разрешения на работу. </p>Другие условия<p>Условия, перечисленные и объясненные выше, являются общими условиями подачи заявления на продление разрешения на работу. Кроме того, в каждом секторе свои условия. Информация обо всех разрешениях на работу, которые могут быть у иностранца, описана в статье «Как получить разрешение на работу за рубежом».</p>`,
  },
  {
    title: "Обновление платы за иностранный персонал в заявках на продление",
    content: `<p>Для подачи заявления на продление разрешения на работу за рубежом необходимо обновить плату за иностранный персонал. Поскольку тариф минимальной заработной платы для иностранцев переиздается каждые 6 месяцев, заработная плата, которую иностранец будет получать в течение нового периода разрешения на работу, должна быть определена выше минимальной суммы.</p>`,
  },
  {
    title: "Документы, необходимые для продления разрешения на работу",
    content: `<p>Некоторые документы, необходимые для продления разрешения на работу, должны быть предоставлены иностранным работником, а некоторые - работодателем. </p><p>Документы, необходимые для продления разрешения на работу:</p><ul>
<li>Форма заявления на продление разрешения на работу</li>



<li>Трудовой договор между работодателем и иностранцем,</li>



<li>Диплом или аттестат иностранного работника, переведенный на турецкий язык присяжным переводчиком,</li>



<li>Ксерокопия паспорта или документа, заменяющего паспорт.</li>



<li>2 биометрические фотографии иностранного сотрудника,</li>



<li>Диплом с указанием последней школы, которую окончил иностранец.</li>



<li>Баланс прибылей и убытков, утвержденный налоговой инспекцией работодателя или SMM,</li>



<li>Текущий документ о разрешении на работу.</li>



<li>Справка о деятельности на рабочем месте,</li>



<li>Если иностранный гражданин собирается работать в сфере здравоохранения, он должен получить предварительное разрешение Министерства здравоохранения; если он/она будет работать в сфере образования, он/она получит предварительное разрешение Министерства национального образования.</strong></li>



<li>Бюллетень торгового реестра, показывающий последнюю структуру капитала и количество партнеров на предприятии.</li>
</ul><p>Эти документы загружаются в систему в электронном виде во время подачи заявки. Если документы невозможно получить в электронном виде, их необходимо отсканировать в принятом формате (pdf) и загрузить в систему.</p><p>При обнаружении недостатков в документах рассмотрение заявки откладывается до устранения этого недостатка. На исправление недостатка дается максимум 30 дней. Если в течение этого срока недостаток не будет устранен, заявка будет отклонена.</p>`,
  },
  {
    title: "Сколько времени занимает продление разрешения на работу?",
    content: `<p>Заявки на продление разрешения на работу оформляются примерно за 20-25 дней. Однако этот период может варьироваться в зависимости от плотности заявок. При обнаружении недостатков в документах заявки администрация может дать до 30 дней на исправление этого недостатка. В течение этого периода приложение приостанавливается до устранения недостатка.</p>`,
  },
  {
    title: "На сколько лет можно продлить разрешение на работу?",
    content: `<p>Разрешение на работу, полученное впервые, может быть продлено максимум на <strong>2 года</strong>. Если заявка на продление подается снова после истечения этого периода продления, требуется максимальное продление на 3 года. </p><p>Например, когда иностранец, работающий в Türkiye с разрешением на работу на 1 год, подает заявку на продление, разрешение продлевается максимум на 2 года. Если заявка на продление подана за 60 дней до окончания этого периода, заявка будет продлена максимум на 3 года. Таким образом, разрешение на работу наконец получено на 1+2+3 года. </p><p>В случае смены работодателя заявление на продление будет предоставлено на максимальный период в 1 год, поскольку на него будут распространяться положения заявления на получение разрешения на работу, поданного впервые.</p>`,
  },
  {
    title: "Как изменить место работы разрешения на работу (перенос разрешения)?",
    content: `<p>Иностранец, работающий в Türkiye с разрешением на работу, может перейти на другую должность на том же рабочем месте или в другой филиал того же работодателя по той же сфере деятельности. Однако для этого перехода необходимы некоторые условия. Эти условия можно перечислить следующим образом:</p><ul>
<li>Заявление об изменении филиала или должности необходимо подать в Министерство труда и социальной защиты через портал электронных разрешений электронного правительства.</li>



<li>В случае изменения должности переведенная должность не должна требовать предварительного разрешения и должна быть аналогична предыдущей должности иностранца.</li>



<li>В случае смены филиала филиал, в который осуществляется перевод, также должен быть зарегистрирован в торговом реестре работодателя.</li>



<li>Заявка должна быть одобрена Генеральным управлением международной рабочей силы.</li>
</ul><p>Передать разрешение на работу невозможно, если вы продолжаете работать у другого работодателя. Аналогично невозможно перенести разрешение на работу в случае перевода на совершенно другое и независимое место работы. В этих случаях новое заявление о разрешении на работу должно быть подано новым работодателем.</p><p>Информация о заявлениях о передаче разрешения на работу подробно объяснена в статье «Перенос разрешения на работу (смена места работы)».</p>`,
  },
  {
    title: "Транзакции SSI в процессе продления",
    content: `<p>Во время рассмотрения заявления на продление разрешения на работу обязательства работодателя по SSI перед работником будут сохраняться. В течение этого периода, если иностранец продолжает работать, его страховка должна быть оплачена, и работник может запросить это у работодателя.</p>`,
  },
  {
    title: "Расширение по секторам",
    content: `<p>Условия продления разрешения на работу в целом такие же, как описано выше, но в некоторых секторах работы требуются особые условия. Помимо общих условий продления разрешения на работу необходимы особые условия для каждого сектора. Другими словами, описанные выше общие условия действительны для приложений расширения во всех секторах. Особые условия секторов описаны ниже.</p><p><strong>Услуги на дому:</strong> Для иностранцев; Разрешение на работу не выдается для работы в сфере домашних услуг, кроме ухода за престарелыми, больными и детьми. Чтобы продлить разрешение на работу в сфере ухода за пожилыми людьми, пожилой человек, за которым ухаживает иностранец, должен быть жив на момент подачи заявления о продлении.</p><p>ЗдоровьеУсловие жизни также действует при уходе за пациентом, и заболевание пациента, за которым осуществляется уход, должно продолжаться. В сфере ухода за детьми ребенок, за которым ухаживает иностранец, не должен быть старше 15 лет.</p><p><strong>Статья по теме:</strong> «разрешение на работу иностранного воспитателя»</p><p><strong>Сфера образования:</strong> Для продления разрешения на работу иностранца, работающего в сфере образования, помимо общих условий, должно быть увеличение количества студентов учебного заведения, в котором он работает. Кроме того, заявки на продление обучения в сфере образования подлежат предварительному разрешению Министерства национального образования. Это разрешение можно получить в провинциальном управлении народного образования.</p><p><strong>Статья по теме:</strong> «разрешение на работу иностранного учителя»</p><p><strong>Сектор здравоохранения: </strong>Продление разрешения на работу иностранца, работающего в секторе здравоохранения, осуществляется при наличии предварительного разрешения Министерства здравоохранения. Это разрешение можно получить в провинциальном управлении здравоохранения.</p><p><strong>Статья по теме:</strong> «разрешение на работу иностранного врача»</p><p>В других секторах, кроме услуг на дому, образования и здравоохранения, нет своих особых условий, на них распространяются только общие условия.</p>`,
  },
  {
    title: "Гонорары и расходы юриста по продлению разрешения на работу",
    content: `<p>Затраты на продление разрешения на работу варьируются в зависимости от типа разрешения на работу и периода продления, но составляют 4635,30 лир за каждый год продления. Если продление на один год, это 4 635,30 TL, если продление на срок до двух лет, это 9 270,60 TL, а если продление на два-три года, это 13 905,90 TL. Кроме того, необходимо оплатить ценный бумажный сбор в размере 356 TL, независимо от периода продления.</p>`,
  },
  {
    title: "Отказ в продлении разрешения на работу",
    content: `<p>Заявление о продлении разрешения на работу, которое не соответствует условиям продления, не подано в установленный срок, подано с неполными документами и этот недостаток не устранен в установленный срок, будет отклонено. </p><p>После оформления заявки администрация оценивает заявку и принимает решение. Непринятие администрацией решения в течение этого срока также рассматривается как подразумеваемый отказ. В случае отклонения заявления открывается возражение администрации и дело об аннулировании.</p><p><strong>ВНИМАНИЕ:</strong>Иностранец, которому отказано в разрешении на работу, должен покинуть страну в течение десяти дней. В противном случае его депортируют. Однако, если иностранец возражает против отклонения заявления о продлении или подает иск об аннулировании, ему/ей не придется покидать Türkiye до завершения этого процесса. </p>Дело о возражении и отмене отклонения заявления на продление разрешения на работу<p>Если заявление о продлении разрешения на работу отклонено, дело о возражении и отмене может быть подано в компетентный орган. Возражение может быть подано в Министерство труда и социальной защиты в течение 30 дней с момента уведомления заявителя о решении об отказе или с момента истечения 30-дневного периода в случае подразумеваемого отказа. </p><p>Если возражение компетентному органу отклонено или на возражение не получен ответ, дело об аннулировании может быть подано в административный суд. Подача возражения компетентному органу не является обязательным методом, и дело об аннулировании может быть подано напрямую.</p><p>Правовая процедура, применяемая в вопросах, касающихся отклонения заявки на продление, такая же, как и отклонение первой заявки. Подробная информация по теме содержится в статье «Отказ в продлении разрешения на работу».</p>`,
  },
  {
    title: "Заключение",
    content: `<p>Если заявка на продление разрешения на работу подана неправильно, заявка отклоняется. Если иностранец продолжает работать после решения об отказе, это влечет за собой наложение административного штрафа на работодателя и депортацию работающего иностранца. Существуют возможности возразить и подать иск об аннулировании заявления об отклонении заявления о продлении. Поскольку эти средства правовой защиты подлежат очень подробной и сложной процедуре, важно проводить этот процесс с юристом, который является экспертом в этой области. </p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "تمدید مجوز کار خارجی",
    content: `<p> تمدید مجوز کار خارجی یک برنامه اداری است که توسط خارجیانی که دارای مجوز کار در Türkiye کار می کنند و کارفرمایان آنها برای تمدید دوره مجوز کار اعمال می شود. پس از انقضای مجوز کار، خارجی که بدون درخواست تمدید کار می کند مشمول اخراج می شود و کارفرمایی که این فرد خارجی را به کار می گیرد مشمول جریمه اداری می شود.</p>`,
  },
  {
    title: "چگونه برای تمدید مجوز کار خارجی اقدام کنیم؟",
    content: `<p> درخواست تمدید مجوز کار توسط کارفرما از طریق پورتال مجوز الکترونیکی در سامانه دولت الکترونیک انجام می شود. برای ورود به سیستم، کارفرما باید آدرس KEP و امضای الکترونیکی خود را داشته باشد. در تب اپلیکیشن افزونه در سیستم، کارمندی که درخواست افزونه برای او ساخته خواهد شد انتخاب می شود. پس از آن، با وارد کردن کامل اطلاعات در فرم درخواست و بارگذاری مدارک مورد نیاز در سامانه به صورت پی‌دی‌اف، درخواست تکمیل می‌شود.</p><p>پس از انجام درخواست تمدید مجوز کار، هزینه، هزینه‌های ارزشمند کاغذ و اطلاعات حساب بانکی به آدرس ایمیل کارفرما ثبت‌شده در سامانه ارسال می‌شود. هزینه ها و هزینه های ارزشمند کاغذ باید ظرف 30 روز از این اطلاعیه پرداخت شود. در غیر این صورت، برنامه از روند حذف خواهد شد. </p><p>پس از پرداخت هزینه های درخواست، گواهی کار پس از نتیجه مثبت تمدید توسط مراجع ذی صلاح به آدرس محل کار پست می شود.</p><p><strong>توجه: با مقررات وضع شده، داشتن آدرس KEP مناسب برای امضای الکترونیکی</p> و اطلاع رسانی الکترونیکی برای کارفرمایی که برای مجوز کار یا تمدید درخواست می کند الزامی شده است.`,
  },
  {
    title: "چه زمانی مجوز کار را تمدید کنیم؟",
    content: `<p>برنامه تمدید مجوز کار؛ 60 روز قبل از پایان دوره پروانه کار و در هر صورت قبل از انقضای مجوز انجام می شود. درخواست های تمدید مجوز کار که در مهلت مقرر ارسال نشده باشند، پذیرفته نمی شوند. </p> آیا می‌توان پس از انقضای مجوز کار تمدید کرد؟<p>بعد از انقضای مجوز کار نمی‌توان تمدید کرد. درخواست های تمدید پس از انقضای مجوز کار رد می شود. اگر فرد خارجی دارای مجوز اقامت معتبر نیز نباشد، در صورتی که ظرف مدت 10 روز کشور را ترک نکند، اخراج خواهد شد.</p><p>اگر خارجی که مجوز کارش به پایان رسیده درخواست تمدید نکرده باشد اما بخواهد در Türkiye به کار خود ادامه دهد، باید برای مجوز کار جدید اقدام کند. درخواست‌های تمدید که پس از انقضای مدت مجوز کار ارائه می‌شوند، مشمول مقررات مشابه اولین درخواست مجوز کار هستند. </p>`,
  },
  {
    title: "شرایط درخواست تمدید مجوز کار",
    content: `<p>شرایط درخواست تمدید مجوز کار؛ به سه دسته تقسیم می شود: شرایطی که باید توسط کارفرما رعایت شود، شرایطی که باید توسط پرسنل خارجی رعایت شود و سایر شرایط. </p>شرایطی که کارفرما باید رعایت کند<p>برای پذیرفته شدن درخواست تمدید مجوز کار کارمند خارجی، شرایطی وجود دارد که کارفرما باید آنها را رعایت کند. این شرایط را می توان به صورت زیر فهرست کرد:</p><ul>
<li>نسبت کارگران خارجی شاغل در محل کار باید حداکثر ⅙ از کارگران محل کار باشد (مثلاً اگر 6 نفر در محل کار کار می کنند، حداکثر 1 نفر از آنها می تواند خارجی باشد.)</li>



<li>سرمایه مورد نیاز باید حفظ شود.</li>



<li>کارگر خارجی باید پرداخت های SSI خود را به طور کامل پرداخت کرده باشد.</li>



<li>کسب و کار باید همه بدهی های مالیاتی را پرداخت کرده باشد.</li>



<li>دستمزد پرداختی به پرسنل خارجی نباید کمتر از حداقل دستمزد تعیین شده برای خارجی ها باشد.</li>
</ul><p>علاوه بر این، شرایطی که محل کار باید هنگام انجام اولین درخواست داشته باشد همچنان باید ادامه داشته باشد. علاوه بر این، محل کار باید در بخشی که فرد خارجی در آن کار می کند گردش مالی انجام داده باشد و به اقتصاد کشور کمک کرده باشد.</p><p>برای موفقیت آمیز بودن درخواست تمدید پرسنل خارجی، باید قرارداد کاری که بین کارمند خارجی و کارفرما منعقد شده است، مطابق با ضوابط تعیین شده تنظیم شود. در عمل، رد درخواست ها به دلیل اشتباهات در قراردادها اغلب اتفاق می افتد. در این مرحله، دریافت پشتیبانی از یک وکیل خارجی در حین تنظیم قرارداد مفید است.</p>شرایط مورد نیاز برای پرسنل خارجی<p>همچنین شرایطی وجود دارد که کارگر خارجی برای پذیرش درخواست تمدید باید آنها را رعایت کند. این شرایط عبارتند از:</p><ul>
<li>کارگر خارجی؛ در طول دوره اجازه کار نباید بیش از شش ماه در خارج از کشور بوده باشد،</li>



<li>او نباید در هیچ جنایتی نقش داشته باشد،</li>



<li>در طول مجوز کار، نباید هیچ گونه تهدیدی برای سلامت و ایمنی عمومی ایجاد کند.  </li>
</ul><p>علاوه بر این شرایط، شرایط خاص در مورد مجوز کار موجود نیز باید همچنان رعایت شود. </p>شرایط دیگر<p>شرایط ذکر شده و توضیح داده شده در بالا، شرایط عمومی درخواست تمدید مجوز کار است. علاوه بر این، هر بخش شرایط خاص خود را دارد. اطلاعات مربوط به تمام مجوزهای کاری که یک خارجی ممکن است داشته باشد در مقاله با عنوان "نحوه دریافت مجوز کار خارجی" توضیح داده شده است.</p>`,
  },
  {
    title: "به روز رسانی حق الزحمه پرسنل خارجی در برنامه های توسعه",
    content: `<p>برای درخواست های تمدید مجوز کار خارجی، هزینه پرسنل خارجی باید به روز شود. از آنجایی که تعرفه حداقل دستمزد برای اتباع خارجی هر 6 ماه یکبار بازنشر می شود، دستمزدی که فرد خارجی در دوره جدید اجازه کار دریافت می کند باید بالاتر از حداقل مقدار تعیین شود.</p>`,
  },
  {
    title: "مدارک مورد نیاز برای تمدید مجوز کار",
    content: `<p>برخی از مدارک مورد نیاز برای تمدید مجوز کار باید توسط کارمند خارجی و برخی دیگر توسط کارفرما ارائه شود. </p><p>مدارک مورد نیاز برای تمدید مجوز کار عبارتند از:</p><ul>
<li>فرم درخواست تمدید مجوز کار،</li>



<li>قرارداد کار بین کارفرما و خارجی،</li>



<li>دیپلم یا گواهی فارغ التحصیلی کارمند خارجی که توسط مترجم قسم خورده به ترکی ترجمه شده است،</li>



<li>عکس از گذرنامه یا سند جایگزین پاسپورت،</li>



<li>2 عکس بیومتریک کارمند خارجی،</li>



<li>دیپلم نشان دهنده آخرین مدرسه ای است که یک خارجی از آن فارغ التحصیل شده است،</li>



<li>ترازنامه سود و زیان تایید شده توسط اداره مالیات کارفرما یا SMM،</li>



<li>سند مجوز کار فعلی،</li>



<li>گواهی فعالیت در محل کار،</li>



<li>اگر تبعه خارجی قصد دارد در بخش بهداشت کار کند، باید مجوز اولیه از وزارت بهداشت دریافت کند. اگر در بخش آموزش مشغول به کار شود، مجوز اولیه از وزارت آموزش ملی دریافت می‌کند.</strong></li>



<li>روزنامه ثبت تجارت که آخرین ساختار سرمایه و تعداد شرکای محل کار را نشان می‌دهد.</li>
</ul><p>این اسناد در زمان درخواست به صورت الکترونیکی در سیستم بارگذاری می شوند. در صورتی که مدارک به صورت الکترونیکی قابل دریافت نباشد، باید به فرمت پذیرفته شده (pdf) اسکن و در سامانه بارگذاری شود.</p><p>در صورت وجود نقص در مدارک، ارزیابی درخواست تا رفع این نقص به تعویق می افتد. حداکثر 30 روز برای اصلاح کمبود داده می شود. اگر نقص در این مدت اصلاح نشود، درخواست رد خواهد شد.</p>`,
  },
  {
    title: "چه مدت طول می کشد تا تمدید مجوز کار را دریافت کنید؟",
    content: `<p>برنامه های تمدید مجوز کار تقریباً در 20-25 روز تکمیل می شود. با این حال، این دوره ممکن است بسته به تراکم برنامه ها متفاوت باشد. در صورت وجود نقص در مدارک درخواست، اداره ممکن است تا 30 روز فرصت دهد تا این نقص را اصلاح کند. در طول این مدت، برنامه تا زمانی که نقص تکمیل شود به حالت تعلیق در می آید.</p>`,
  },
  {
    title: "مجوز کار را چند سال می توان تمدید کرد؟",
    content: `<p>مجوز کاری که برای اولین بار دریافت می شود حداکثر برای <strong>2 سال</strong> قابل تمدید است. اگر پس از انقضای این دوره تمدید مجددا درخواست تمدید ارسال شود، حداکثر 3 سال تمدید لازم است. </p><p>به عنوان مثال، هنگامی که یک خارجی شاغل در Türkiye با مجوز کار 1 ساله درخواست تمدید می کند، این مجوز حداکثر برای 2 سال تمدید می شود. در صورتی که درخواست تمدید 60 روز قبل از پایان این مدت ارائه شود، درخواست حداکثر تا 3 سال تمدید می شود. بدین ترتیب مجوز کار نهایتاً 1+2+3 سال اخذ می شود. </p><p>در صورت تغییر کارفرما، درخواست تمدید حداکثر برای یک سال اعطا می شود، زیرا مشمول مفاد درخواست مجوز کار خواهد بود که برای اولین بار انجام می شود.</p>`,
  },
  {
    title: "چگونه محل کار اجازه کار (انتقال مجوز) را تغییر دهیم؟",
    content: `<p>یک خارجی که با مجوز کار در Türkiye کار می کند می تواند به موقعیت دیگری در همان محل کار یا به شعبه دیگری از همان کارفرما در همان خط تجاری منتقل شود. با این حال، شرایطی برای این انتقال لازم است. این شرایط را می توان به صورت زیر فهرست کرد:</p><ul>
<li>درخواست تغییر شعبه یا سمت باید از طریق پورتال الکترونیکی مجوز در دولت الکترونیک به وزارت کار و تامین اجتماعی ارسال شود.</li>



<li>در صورت تغییر موقعیت، موقعیت منتقل شده نباید به مجوز قبلی نیاز داشته باشد و باید مشابه موقعیت قبلی فرد خارجی باشد.</li>



<li>در صورت تغییر شعبه، شعبه ای که انتقال به آن انجام می شود نیز باید در دفتر ثبت تجارت کارفرما ثبت شود.</li>



<li>این درخواست باید توسط اداره کل نیروی کار بین المللی تایید شود.</li>
</ul><p>اگر به کار با کارفرمای دیگری ادامه دهید، امکان انتقال مجوز کار وجود ندارد. همچنین امکان انتقال مجوز کار در صورت انتقال به محل کار کاملا متفاوت و مستقل وجود ندارد. در این موارد، درخواست مجوز کار جدید باید توسط کارفرمای جدید ارائه شود.</p><p>اطلاعات مربوط به درخواست های انتقال مجوز کار به طور مفصل در مقاله با عنوان "انتقال مجوز کار (تغییر محل کار)" توضیح داده شده است.</p>`,
  },
  {
    title: "معاملات SSI در طول فرآیند توسعه",
    content: `<p>در طول ارزیابی درخواست تمدید مجوز کار، تعهدات SSI کارفرما در قبال کارمند ادامه خواهد داشت. در این مدت در صورت ادامه کار فرد خارجی، بیمه وی باید پرداخت شود و کارمند می تواند از کارفرما درخواست کند.</p>`,
  },
  {
    title: "گسترش توسط بخش ها",
    content: `<p>شرایط تمدید مجوز کار معمولاً همانطور که در بالا توضیح داده شد است، اما در برخی از بخش‌های کاری شرایط خاصی مورد نیاز است. برای هر بخش علاوه بر شرایط عمومی برای تمدید مجوز کار، شرایط خاصی لازم است. به عبارت دیگر، شرایط عمومی شرح داده شده در بالا برای برنامه های توسعه در همه بخش ها معتبر است. شرایط ویژه بخش ها در زیر توضیح داده شده است.</p><p><strong>خدمات خانگی:</strong>برای خارجی ها. مجوز کار برای کار در خدمات خانگی به غیر از مراقبت از سالمندان، بیماران و کودکان داده نمی شود. برای تمدید مجوز کار در مراقبت از سالمندان، سالمند تحت مراقبت خارجی باید در هنگام درخواست تمدید زنده باشد.</p><p>سلامت شرط زنده بودن در مراقبت از بیمار نیز معتبر است و بیماری بیمار تحت مراقبت باید ادامه یابد. در مراقبت از کودک، کودک تحت سرپرستی یک خارجی نباید بیش از 15 سال داشته باشد.</p><p><strong>مقاله مرتبط:</strong> “مجوز کار مراقب خارجی”</p><p><strong>بخش آموزش:</strong> برای تمدید مجوز کار یک خارجی شاغل در بخش آموزش، علاوه بر شرایط عمومی تحصیلی، تعداد شاگردان او باید افزایش یابد. علاوه بر این، درخواست های تمدید در بخش آموزش منوط به مجوز قبلی از وزارت آموزش ملی است. این مجوز را می توان از اداره کل آموزش و پرورش استان دریافت کرد.</p><p><strong>مقاله مرتبط:</strong> “مجوز کار معلم خارجی”</p><p><strong>بخش بهداشت: </strong>تمدید مجوز کار خارجی شاغل در بخش بهداشت منوط به مجوز اولیه وزارت بهداشت است. این مجوز را می توان از اداره کل بهداشت استان دریافت کرد.</p><p><strong>مقاله مرتبط:</strong> “مجوز کار پزشک خارجی”</p><p>بخش هایی غیر از خدمات خانگی، آموزش و پرورش و بهداشت، شرایط خاص خود را ندارند و فقط مشمول شرایط عمومی هستند.</p>`,
  },
  {
    title: "هزینه ها و هزینه های وکیل تمدید مجوز کار",
    content: `<p>هزینه های تمدید مجوز کار بسته به نوع مجوز کار و دوره ای که باید تمدید شود متفاوت است، اما برای هر سال تمدید 4635.30 لیر است. اگر قرار باشد تمدید یک ساله انجام شود، 4635.30 لیره، اگر قرار باشد تا دو سال تمدید شود، 9270.60 لیره و اگر قرار باشد از دو تا سه سال تمدید شود، 13905.90 لیره است. علاوه بر این، بدون در نظر گرفتن دوره تمدید، باید هزینه کاغذ با ارزش 356 لیر پرداخت شود.</p>`,
  },
  {
    title: "رد درخواست تمدید مجوز کار",
    content: `<p> درخواست تمدید پروانه کار که شرایط تمدید را نداشته باشد، در مهلت مقرر انجام نشده باشد، با مدارک ناقص ارسال شود و این نقص در مهلت مقرر اصلاح نشود، رد خواهد شد. </p><p>بعد از تکمیل درخواست، اداره درخواست را ارزیابی کرده و تصمیم می گیرد. عدم تصمیم گیری دولت در این مدت نیز به عنوان رد ضمنی تلقی می شود. اگر درخواست رد شود، اعتراض به اداره و پرونده ابطال باز است.</p><p><strong>توجه:</strong>فردی که مجوز کارش رد شده است باید ظرف ده روز کشور را ترک کند. در غیر این صورت اخراج خواهد شد. اما اگر خارجی نسبت به رد درخواست تمدید اعتراض داشته باشد یا دعوای ابطال طرح کند، تا زمانی که این روند به نتیجه نرسد، مجبور نیست Türkiye را ترک کند. </p>پرونده اعتراض و ابطال رد درخواست تمدید پروانه کار<p>در صورت رد درخواست تمدید پروانه کار، اعتراض و ابطال پرونده در مرجع ذیصلاح قابل طرح است. ظرف 30 روز پس از ابلاغ رای رد به متقاضی و یا از انقضای مهلت 30 روزه در صورت رد ضمنی، می توان به وزارت کار و تامین اجتماعی اعتراض کرد. </p><p>در صورت رد اعتراض مرجع ذی صلاح و یا عدم پاسخگویی به اعتراض می توان پرونده ابطال را در دادگاه اداری مطرح کرد. اعتراض به مرجع صلاحیتدار روش اجباری نیست و می توان مستقیماً پرونده ابطال طرح کرد.</p><p>رویت قانونی که در مورد رد درخواست تمدید اعمال می شود مانند رد درخواست اول است. اطلاعات دقیق در مورد این موضوع در مقاله با عنوان "رد درخواست تمدید مجوز کار" گنجانده شده است.</p>`,
  },
  {
    title: "نتیجه گیری",
    content: `<p>اگر درخواست تمدید مجوز کار به درستی انجام شود، درخواست رد می شود. چنانچه فرد خارجی پس از صدور حکم رد، به کار خود ادامه دهد، موجب جریمه اداری برای کارفرما و جریمه اخراج برای کارفرما می شود. فرصت هایی برای اعتراض و تشکیل پرونده ابطال علیه رد درخواست تمدید وجود دارد. از آنجایی که این راه حل های حقوقی مشمول یک رویه بسیار دقیق و پیچیده است، انجام این فرآیند با یک وکیل متخصص در این زمینه مهم است. </p>`,
  },
];

export const contentSlug = "yabanci-calisma-izni-uzatma";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Foreign Work Permit Extension",
    excerpt: "Foreign work permit extension is applied by foreigners working with a work permit in Türkiye and their employers to extend the work permit period.",
    shortDescription: "Foreign work permit extension is applied by foreigners working with a work permit in Türkiye and their employers to extend the work permit period.",
    heroTitle: "Foreign Work Permit Extension",
    heroSubtitle: "Foreign work permit extension is applied by foreigners working with a work permit in Türkiye and their employers to extend the work permit period.",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "تمديد تصريح العمل الأجنبي",
    excerpt: "يتم تطبيق تمديد تصريح العمل الأجنبي من قبل الأجانب الذين يعملون بتصريح عمل في Türkiye وأصحاب العمل لتمديد فترة تصريح العمل.",
    shortDescription: "يتم تطبيق تمديد تصريح العمل الأجنبي من قبل الأجانب الذين يعملون بتصريح عمل في Türkiye وأصحاب العمل لتمديد فترة تصريح العمل.",
    heroTitle: "تمديد تصريح العمل الأجنبي",
    heroSubtitle: "يتم تطبيق تمديد تصريح العمل الأجنبي من قبل الأجانب الذين يعملون بتصريح عمل في Türkiye وأصحاب العمل لتمديد فترة تصريح العمل.",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Продление разрешения на работу за рубежом",
    excerpt: "Продление разрешения на работу за рубежом применяется иностранцами, работающими с разрешением на работу в Türkiye, и их работодателями для продления срока разрешения на работу.",
    shortDescription: "Продление разрешения на работу за рубежом применяется иностранцами, работающими с разрешением на работу в Türkiye, и их работодателями для продления срока разрешения на работу.",
    heroTitle: "Продление разрешения на работу за рубежом",
    heroSubtitle: "Продление разрешения на работу за рубежом применяется иностранцами, работающими с разрешением на работу в Türkiye, и их работодателями для продления срока разрешения на работу.",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "تمدید مجوز کار خارجی",
    excerpt: "تمدید مجوز کار خارجی توسط خارجیانی که دارای مجوز کار در Türkiye هستند و کارفرمایان آنها برای تمدید دوره مجوز کار اعمال می شود.",
    shortDescription: "تمدید مجوز کار خارجی توسط خارجیانی که دارای مجوز کار در Türkiye هستند و کارفرمایان آنها برای تمدید دوره مجوز کار اعمال می شود.",
    heroTitle: "تمدید مجوز کار خارجی",
    heroSubtitle: "تمدید مجوز کار خارجی توسط خارجیانی که دارای مجوز کار در Türkiye هستند و کارفرمایان آنها برای تمدید دوره مجوز کار اعمال می شود.",
    sectionsJson: serializeServiceSections(faSections),
  },
};
