import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Entertainment Industry Work Permit",
    content: `<p>Entertainment industry work permit; This is the work permit that foreigners who will work in the entertainment industry must obtain. Especially considering the high number of foreigners employed in touristic places and entertainment venues, the importance of the entertainment sector work permit becomes evident. Special regulations have been introduced for this type of work permit.</p>`,
  },
  {
    title: "Criteria for Employing Foreign Personnel for the Entertainment Industry",
    content: `<p>There are some criteria for employing foreign employees in the entertainment industry. These criteria are not related to the foreign employee, but to the workplace that will employ foreigners. The conditions that must be met by the employer when applying are as follows:</p><ul>
<li>The paid-in capital of the business must be at least 100,000 TL, or its gross sales must be at least 800,000 TL, or its export amount must be at least 250,000 USD.</li>



<li>Company partner applying for a work permit on behalf of a foreigner; must own at least 20% of the company capital. This rate should correspond to at least 40,000 TL.</li>



<li>At least 10 Turkish citizens must be employed in the workplace.</li>
</ul><p>Whether these criteria are met is evaluated by the Ministry of Labor and Social Security. If any of the criteria is not met, the application will be rejected. If there is a deficiency in the above-mentioned conditions in the application, the administration may grant a certain period of time to correct the deficiency.</p>`,
  },
  {
    title: "How to Obtain a Work Permit for Foreign Dancers, Animators and Artists in the Entertainment Industry?",
    content: `<p>Work permit in the entertainment sector is obtained as a result of the application made by the employer through the e-permit application on the e-government portal. How the employer will log in to the system; It varies according to the possibility of the foreigner being in the country or abroad at the time of application.</p><p>If the foreigner on whose behalf the work permit application will be made is abroad, he/she applies for a work permit to the Turkish foreign representative office in the country where he/she is located. The employer logs into the e-permit application with this code and completes the application. </p><p>If the foreigner who will apply for a work permit on behalf of the foreigner is in Türkiye, the e-permit application is entered with the foreigner identification number or passport information. The online application is completed by the employer by entering the necessary information and documents into the system.</p><p>If the application is accepted, the bank accounts to which the fee and valuable paper fee will be paid will be sent to the employer's e-mail address registered in the e-permit system. Payments must be made to the relevant bank accounts within 30 days from this notification. </p><p>If the employer makes the payments in full within 30 days to the bank accounts notified to him, the Ministry will send the foreign employee's work permit document to the workplace address entered when applying within 30 days. However, if payments are not made, the application will be rejected. </p><p><strong>ATTENTION: </strong>The employer is obliged to submit the foreign employee's insured employment certificate to the social security institution where the workplace is located, <strong>within 30 days</strong> following the approval of the work permit application. </p><p><strong>ATTENTION: </strong>If the application is made from abroad, the foreigner must register his address at the civil registry office within 20 days of entering Türkiye.</p><p>There are many other types of work permits that foreigners who want to work in Türkiye can apply for. Detailed information about these work permits and the application procedure is explained in the article "How to obtain a foreign work permit".</p>`,
  },
  {
    title: "What are the Documents Required for Entertainment Sector Work Permit?",
    content: `<p>There are some documents that need to be uploaded to the system when applying for an entertainment sector work permit. Some of these documents are brought by the foreign employee and some by the employer. </p><p>The documents required for the entertainment sector work permit are as follows:</p><p><strong>Documents to be Provided by the Employer</strong>:</p><ul>
<li>Authorized bank payroll showing that the workplace's turnover for the last year is at least 40,000 USD or equivalent foreign currency,</li>



<li>Trade registry gazette showing the latest capital status and number of partners of the workplace,</li>



<li>The workplace's balance sheet and profit-loss statement approved by the tax office or a certified public accountant for the last year,</li>



<li>Operation and investment certificate, (Can be obtained from the Ministry of Culture and Tourism.)</li>



<li>Power of attorney if the application is made by the representative rather than the employer himself,</li>



<li>Employment contract between the employer and the foreigner on whose behalf the application is made. (The conditions that this contract must meet are explained in detail below.)</li>
</ul><p><strong>Documents Regarding Foreign Personnel</strong>:</p><ul>
<li>Passport or passport substitute document,</li>



<li>Notarized and sworn copy of the diploma or substitute graduation certificate with Turkish translation,</li>



<li>Residence permit document if the foreign employee is residing in Türkiye at the time of application,</li>



<li>Biometric photograph of foreign personnel,</li>



<li>Referral with sworn translation and approved by the competent authorities.</li>
</ul><p>All documents must be uploaded to the e-permit system by the employer during the application. Documents that cannot be obtained electronically must be scanned, converted to pdf format and uploaded to the system in this format. It is not required to physically present the required documents separately.</p>`,
  },
  {
    title: "Things to Consider in the Employment Contract for Entertainment Sector Work Permit",
    content: `<p>There are many issues to consider when preparing an employment contract between a foreign employee and an employer. The conditions and conditions that the employment contract must contain can be listed as follows: </p><ul>
<li>Record stating that the return ticket and travel expenses will be covered by the employer when the foreigner returns to his/her country during the period he/she works under the employer in Türkiye,</li>



<li>Your fee; Contract provision stating that it will not be lower than the minimum wage determined for foreigners by the General Directorate of International Labor Force, (The General Directorate of International Labor Force determines the minimum wage that can be paid to foreign employees every 6 months. The foreign employee's wage cannot be lower than this.)</li>



<li>Tax number of the workplace,</li>



<li>Date of employment,</li>



<li>The address of the workplace where the foreign employee will work,</li>



<li>Clarification letter regarding the rights of the employee,</li>



<li>Specific job description of the foreigner,</li>



<li>157 Trafficking Victim Helpline, 170 helpline number for the employee to call if necessary.</li>
</ul><p>The above-mentioned issues must be included in the signed employment contract. Otherwise, the employment contract that does not meet the relevant conditions will be deemed invalid and the work permit application on which this employment contract is based will be rejected.</p>`,
  },
  {
    title: "Minimum Wage Set for Foreign Personnel in the Entertainment Industry",
    content: `<p>In 2023, the minimum wage determined by the General Directorate of International Labor Force for foreigners is 13,414.50 TL. However, if the foreign employee will work as an acrobat in tourism-animation organizations, the wage to be paid is at least 2 times this amount.</strong> The minimum wage that can be paid to foreign artists is 3 times this amount.</strong></p>`,
  },
  {
    title: "How Long Does It Take for the Entertainment Sector Work Permit Application to Be Completed?",
    content: `<p>Application for entertainment sector work permit; If the application is completed completely and duly, it will be concluded within <strong>30 days</strong>.</p><p>If there is a deficiency in the application documents, the administration will give additional time to correct the deficiency, which will cause the period to be extended. For this reason, consulting with a foreigners' lawyer when applying, or even having the application made personally by a foreigners' lawyer, will ensure that the process is concluded in the fastest and most positive way.</p>`,
  },
  {
    title: "Work Permit Lawyer Fees and Expenses for the Entertainment Industry",
    content: `<p>Entertainment sector work permit costs consist of work permit fee and fixed value paper fee. The fee is 3090.20 TL for each year of the work permit period. Accordingly, 3090.20 TL will be paid for work permits up to 1 year, and 7180 TL will be paid for work permits up to 2 years. The valuable paper fee is 356 TL, regardless of the duration of the work permit. These amounts for both the fee and the valuable paper fee are valid for 2023. These amounts will be updated in the following years.</p>`,
  },
  {
    title: "Entertainment Industry Work Permit Application Rejection",
    content: `<p>Rejection of entertainment industry work permit application; It will come to the agenda if the work permit conditions are not met, there is a deficiency in the documents and this deficiency is not corrected within the time given by the administration, or the Ministry does not deem the application in accordance with the international labor policy.</p>Objection and Cancellation Case Against the Rejection of the Entertainment Sector Work Permit Application<p>Both the foreign employee on whose behalf the application is made and the applicant employer have the right to object and file a cancellation case against the rejection of the entertainment sector work permit application. </p><p>It is possible to file an objection by uploading the objection petition to the e-permit application within <strong>30 days</strong> from the notification of the rejection decision. If the objection is accepted, the procedures are carried out directly by the competent authorities.</p><p>If the objection made in accordance with the procedure within the prescribed period is rejected, the foreign employee or employer may file an annulment lawsuit against the rejection decision. The competent court in an annulment case is the Ankara Administrative Court. </p><p>The objection and cancellation case against the rejection of the entertainment sector work permit application is subject to the same period and procedures as the objection and cancellation case against the rejection of other work permits. A detailed explanation on the subject is found in the article "rejection of work permit application". </p>Right to Re-Application in Case of Rejection of Work Permit Application<p>The person whose entertainment sector work permit application is rejected can make a new application by paying attention to the issues included in the reason for rejection of the application. If the deficiencies that caused the rejection of the previous application are not corrected, the new application will also be rejected.</p>`,
  },
  {
    title: "Entertainment Sector Work Permit Extension",
    content: `<p>It is possible to extend the entertainment sector work permit. The extension application, like the leave application, is made through the e-permit application by the employer or his authorized representative. The extension application must be made 60 days before the end of the work permit period, and in any case before the end of the permit period. </p><p>Extension applications; If the conditions of the permit are maintained and the necessary documents are completely uploaded to the system, it is accepted and evaluated by the competent authorities. The entertainment industry work permit can be extended for a maximum of 2 years for the first extension and for a maximum of 3 years for subsequent extension applications. However, the extension period cannot exceed the remaining period of the employment contract. </p><p><strong>ATTENTION: </strong>In order for the work permit to be extended, the foreigner must continue to work for the same employer. If the foreigner makes an agreement with another employer or starts working independently, the extension application is not accepted and is processed as a first-time permit application. </p><p>The reasons for rejection of entertainment sector work permit extension applications, the application procedure, the required documents and all other details on the subject are included in the "work permit extension" article.</p>Objection and Cancellation Case Against Rejection of Entertainment Sector Work Permit Extension Application<p>The person whose application for entertainment sector work permit extension is rejected can appeal to the competent authority and file an annulment case in the administrative court. Objection and annulment case against rejection of the application; It is exactly the same as the objection against the rejection of the first application and the annulment case in terms of terms and procedures.</p>Can the Foreigner be Worked During the Evaluation Process of the Entertainment Sector Work Permit Extension Application?<p>A foreigner can work for 90 more days after the current work permit expires during the evaluation process of the entertainment sector work permit extension application. However, if the application is rejected, the employment becomes illegal.</p><p>During this period while the foreigner continues to work, the rights and obligations of both the employer and the foreign employee continue under the law.</p>`,
  },
  {
    title: "Conclusion",
    content: `<p>In the entertainment sector work permit, the criteria and required documents are arranged in detail. If one of the conditions is not met or the documents are not of the required quality, the application is rejected. It is beneficial to get legal support from a foreigners law lawyer in order to carry out the process in the fastest and smoothest way possible in terms of objection and annulment against the rejection of the application.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "تصريح عمل صناعة الترفيه",
    content: `<p>تصريح عمل في مجال الترفيه؛ هذا هو تصريح العمل الذي يجب على الأجانب الذين سيعملون في مجال الترفيه الحصول عليه. خاصة مع ارتفاع عدد الأجانب العاملين في الأماكن السياحية والترفيهية، تتضح أهمية تصريح العمل في قطاع الترفيه. وقد تم إدخال لوائح خاصة لهذا النوع من تصاريح العمل.</p>`,
  },
  {
    title: "معايير توظيف الموظفين الأجانب في صناعة الترفيه",
    content: `<p>هناك بعض المعايير لتوظيف موظفين أجانب في صناعة الترفيه. ولا تتعلق هذه المعايير بالموظف الأجنبي، بل بمكان العمل الذي سيوظف الأجانب. الشروط التي يجب أن تتوفر في جهة العمل عند التقديم هي كما يلي:</p><ul>
<li>يجب أن يكون رأس المال المدفوع للشركة 100000 ليرة تركية على الأقل، أو يجب أن يكون إجمالي مبيعاتها 800000 ليرة تركية على الأقل، أو يجب أن تكون قيمة صادراتها 250000 دولار أمريكي على الأقل.</li>



<li>شريك الشركة الذي يتقدم بطلب للحصول على تصريح عمل نيابة عن أجنبي؛ أن يمتلك ما لا يقل عن 20% من رأس مال الشركة. يجب أن يتوافق هذا السعر مع 40.000 ليرة تركية على الأقل.</li>



<li>يجب توظيف ما لا يقل عن 10 مواطنين أتراك في مكان العمل.</li>
</ul><p>يتم تقييم ما إذا كان قد تم استيفاء هذه المعايير من قبل وزارة العمل والضمان الاجتماعي. إذا لم يتم استيفاء أي من المعايير، سيتم رفض الطلب. في حال وجود نقص في الشروط المذكورة أعلاه في الطلب، يجوز للإدارة منح فترة زمنية معينة لتصحيح النقص.</p>`,
  },
  {
    title: "كيف يمكن الحصول على تصريح عمل للراقصين ورسامي الرسوم المتحركة والفنانين الأجانب العاملين في مجال الترفيه؟",
    content: `<p>يتم الحصول على تصريح العمل في قطاع الترفيه نتيجة الطلب المقدم من صاحب العمل من خلال طلب التصريح الإلكتروني على بوابة الحكومة الإلكترونية. كيف سيقوم صاحب العمل بتسجيل الدخول إلى النظام؛ ويختلف الأمر وفقًا لإمكانية تواجد الأجنبي في البلاد أو في الخارج وقت تقديم الطلب.</p><p>إذا كان الأجنبي الذي سيتم تقديم طلب تصريح العمل نيابة عنه موجودًا في الخارج، فإنه يتقدم بطلب للحصول على تصريح عمل إلى مكتب التمثيل الأجنبي التركي في البلد الذي يتواجد فيه. يقوم صاحب العمل بتسجيل الدخول إلى طلب التصريح الإلكتروني باستخدام هذا الرمز وإكمال الطلب. </p><p>إذا كان الأجنبي الذي سيتقدم بطلب للحصول على تصريح عمل نيابة عن الأجنبي موجودًا في Türkiye، يتم إدخال طلب التصريح الإلكتروني مع رقم هوية الأجنبي أو معلومات جواز السفر. يتم استكمال الطلب عبر الإنترنت من قبل صاحب العمل عن طريق إدخال المعلومات والمستندات اللازمة في النظام.</p><p>في حالة قبول الطلب، سيتم إرسال الحسابات البنكية التي سيتم دفع الرسوم ورسوم الأوراق القيمة إليها إلى عنوان البريد الإلكتروني لصاحب العمل المسجل في نظام التصاريح الإلكترونية. يجب أن تتم الدفعات إلى الحسابات المصرفية ذات الصلة في غضون 30 يومًا من هذا الإخطار. </p><p>إذا قام صاحب العمل بسداد الدفعات بالكامل خلال 30 يومًا إلى الحسابات المصرفية التي تم إخطاره بها، فسترسل الوزارة وثيقة تصريح عمل الموظف الأجنبي إلى عنوان مكان العمل الذي تم إدخاله عند التقديم خلال 30 يومًا. ومع ذلك، إذا لم يتم سداد الدفعات، سيتم رفض الطلب. </p><p><strong>تنبيه: </strong>يلتزم صاحب العمل بتقديم شهادة العمل المؤمن عليها للموظف الأجنبي إلى مؤسسة الضمان الاجتماعي حيث يقع مكان العمل، <strong>في غضون 30 يومًا</strong> بعد الموافقة على طلب تصريح العمل. </p><p><strong>تنبيه: </strong>إذا تم تقديم الطلب من الخارج، فيجب على الأجنبي تسجيل عنوانه في مكتب السجل المدني خلال 20 يومًا من دخول Türkiye. </p><p>هناك العديد من أنواع تصاريح العمل الأخرى التي يمكن للأجانب الذين يرغبون في العمل في Türkiye التقدم للحصول عليها. المعلومات التفصيلية حول تصاريح العمل هذه وإجراءات التقديم موضحة في مقال "كيفية الحصول على تصريح عمل أجنبي".</p>`,
  },
  {
    title: "ما هي المستندات المطلوبة للحصول على تصريح عمل في قطاع الترفيه؟",
    content: `<p>هناك بعض المستندات التي يجب رفعها على النظام عند التقدم للحصول على تصريح عمل في القطاع الترفيهي. بعض هذه الوثائق يتم إحضارها من قبل العامل الأجنبي والبعض الآخر من قبل صاحب العمل. </p><p>المستندات المطلوبة للحصول على تصريح عمل قطاع الترفيه هي كما يلي:</p><p><strong>المستندات المطلوب تقديمها من قبل صاحب العمل</strong>:</p><ul>
<li>كشف رواتب البنك المعتمد الذي يوضح أن حجم مبيعات مكان العمل للعام الماضي لا يقل عن 40000 دولار أمريكي أو ما يعادله بالعملة الأجنبية،</li>



<li>جريدة السجل التجاري التي توضح أحدث حالة لرأس المال وعدد الشركاء في مكان العمل،</li>



<li>الميزانية العمومية لمكان العمل وبيان الربح والخسارة المعتمد من مكتب الضرائب أو محاسب قانوني معتمد للعام الماضي،</li>



<li>شهادة التشغيل والاستثمار (يمكن الحصول عليها من وزارة الثقافة والسياحة)</li>



<li>التوكيل إذا كان الطلب مقدمًا من قبل الممثل وليس صاحب العمل نفسه،</li>



<li>عقد العمل بين صاحب العمل والأجنبي الذي يتم تقديم الطلب نيابة عنه. (الشروط التي يجب أن يستوفيها هذا العقد موضحة بالتفصيل أدناه.)</li>
</ul><p><strong>المستندات المتعلقة بالموظفين الأجانب</strong>:</p><ul>
<li>جواز السفر أو مستند بديل لجواز السفر،</li>



<li>نسخة موثقة ومحلفة من الدبلوم أو شهادة التخرج البديلة مع ترجمة تركية،</li>



<li>وثيقة تصريح الإقامة إذا كان الموظف الأجنبي يقيم في Türkiye وقت تقديم الطلب،</li>



<li>صورة بيومترية للموظفين الأجانب</li>



<li>الإحالة مع ترجمة محلفة ومعتمدة من الجهات المختصة.</li>
</ul><p>يجب رفع كافة المستندات على نظام التصاريح الإلكترونية من قبل صاحب العمل أثناء تقديم الطلب. يجب مسح المستندات التي لا يمكن الحصول عليها إلكترونيًا، وتحويلها إلى تنسيق pdf وتحميلها على النظام بهذا التنسيق. ليس من الضروري تقديم المستندات المطلوبة بشكل منفصل.</p>`,
  },
  {
    title: "الأشياء التي يجب مراعاتها في عقد العمل للحصول على تصريح عمل في قطاع الترفيه",
    content: `<p>هناك العديد من الأمور التي يجب مراعاتها عند إعداد عقد العمل بين موظف أجنبي وصاحب العمل. ويمكن إدراج الشروط والأحكام التي يجب أن يتضمنها عقد العمل على النحو التالي: </p><ul>
<li>سجل يفيد بأن تذكرة العودة ونفقات السفر سيتم تغطيتها من قبل صاحب العمل عند عودة الأجنبي إلى بلده خلال الفترة التي يعمل فيها لدى صاحب العمل في Türkiye،</li>



<li>الرسوم الخاصة بك؛ ينص العقد على أنه لن يكون أقل من الحد الأدنى للأجور الذي تحدده المديرية العامة للقوى العاملة الدولية للأجانب، (تحدد المديرية العامة للقوى العاملة الدولية الحد الأدنى للأجور الذي يمكن دفعه للموظفين الأجانب كل 6 أشهر. لا يمكن أن يكون أجر الموظف الأجنبي أقل من هذا.)</li>



<li>الرقم الضريبي لمكان العمل</li>



<li>تاريخ التوظيف،</li>



<li>عنوان مكان العمل الذي سيعمل فيه الموظف الأجنبي</li>



<li>رسالة توضيحية بخصوص حقوق الموظف</li>



<li>الوصف الوظيفي المحدد للأجنبي،</li>



<li>157 خط مساعدة ضحايا الاتجار، 170 رقم خط المساعدة الذي يمكن للموظف الاتصال به إذا لزم الأمر.</li>
</ul><p>يجب تضمين المسائل المذكورة أعلاه في عقد العمل الموقع. بخلاف ذلك، سيتم اعتبار عقد العمل الذي لا يستوفي الشروط ذات الصلة باطلا وسيتم رفض طلب تصريح العمل الذي يستند إليه عقد العمل هذا.</p>`,
  },
  {
    title: "الحد الأدنى للأجور للموظفين الأجانب في صناعة الترفيه",
    content: `<p>في عام 2023، يبلغ الحد الأدنى للأجور الذي تحدده المديرية العامة للقوى العاملة الدولية للأجانب 13,414.50 ليرة تركية. ومع ذلك، إذا كان الموظف الأجنبي سيعمل بهلوانًا في منظمات السياحة والرسوم المتحركة، فإن الأجر الواجب دفعه هو ضعف هذا المبلغ على الأقل.</strong> الحد الأدنى للأجور الذي يمكن دفعه للفنانين الأجانب هو 3 أضعاف هذا المبلغ.</strong></p>`,
  },
  {
    title: "ما هي المدة التي يستغرقها استكمال طلب تصريح العمل في قطاع الترفيه؟",
    content: `<p>طلب تصريح عمل في قطاع الترفيه؛ إذا تم استكمال الطلب بشكل كامل وحسب الأصول، فسيتم الانتهاء منه خلال <strong>30 يومًا</strong>.</p><p>إذا كان هناك نقص في مستندات الطلب، فستمنح الإدارة وقتًا إضافيًا لتصحيح النقص، مما سيؤدي إلى تمديد الفترة. لهذا السبب، فإن استشارة محامي الأجانب عند تقديم الطلب، أو حتى تقديم الطلب شخصيًا من قبل محامي الأجانب، سيضمن إتمام العملية بأسرع طريقة وأكثرها إيجابية.</p>`,
  },
  {
    title: "تصريح العمل ورسوم ونفقات المحامي لصناعة الترفيه",
    content: `<p>تتكون تكاليف تصريح العمل في قطاع الترفيه من رسوم تصريح العمل ورسوم الورق ذات القيمة الثابتة. الرسوم هي 3090.20 ليرة تركية عن كل سنة من فترة تصريح العمل. وفقًا لذلك، سيتم دفع 3090.20 ليرة تركية مقابل تصاريح العمل لمدة تصل إلى عام واحد، وسيتم دفع 7180 ليرة تركية مقابل تصاريح العمل لمدة تصل إلى عامين. رسوم الورق القيمة هي 356 ليرة تركية، بغض النظر عن مدة تصريح العمل. هذه المبالغ لكل من الرسوم ورسوم الورق القيمة صالحة لعام 2023. وسيتم تحديث هذه المبالغ في السنوات التالية.</p>`,
  },
  {
    title: "رفض طلب تصريح العمل في مجال الترفيه",
    content: `<p>رفض طلب تصريح العمل في مجال الترفيه؛ سيتم طرحه على جدول الأعمال إذا لم يتم استيفاء شروط تصريح العمل، أو كان هناك نقص في المستندات ولم يتم تصحيح هذا النقص خلال الوقت المحدد من قبل الإدارة، أو لم تعتبر الوزارة الطلب متوافقًا مع سياسة العمل الدولية.</p>قضية الاعتراض والإلغاء ضد رفض طلب تصريح العمل في قطاع الترفيه<p>يحق لكل من الموظف الأجنبي الذي تم تقديم الطلب نيابة عنه وصاحب العمل مقدم الطلب الاعتراض ورفع دعوى إلغاء ضد رفض تصريح العمل في قطاع الترفيه application. </p><p>من الممكن تقديم اعتراض عن طريق تحميل طلب الاعتراض على طلب التصريح الإلكتروني خلال <strong>30 يومًا</strong> من تاريخ الإخطار بقرار الرفض. وفي حالة قبول الاعتراض، تتم الإجراءات مباشرة من قبل الجهات المختصة.</p><p>وفي حالة رفض الاعتراض المقدم وفق الإجراء خلال المدة المقررة، يجوز للعامل أو صاحب العمل الأجنبي رفع دعوى فسخ ضد قرار الرفض. المحكمة المختصة في قضية الإلغاء هي محكمة أنقرة الإدارية. </p><p>تخضع دعوى الاعتراض والإلغاء ضد رفض طلب تصريح عمل في القطاع الترفيهي لنفس المدة والإجراءات التي تخضع لها دعوى الاعتراض والإلغاء ضد رفض تصاريح العمل الأخرى. ويوجد شرح تفصيلي للموضوع في مقال "رفض طلب تصريح العمل". </p>الحق في إعادة الطلب في حالة رفض طلب تصريح العمل<p>يمكن للشخص الذي تم رفض طلب تصريح العمل في القطاع الترفيهي تقديم طلب جديد من خلال الانتباه إلى المشكلات المدرجة في سبب رفض الطلب. إذا لم يتم تصحيح النواقص التي كانت سبباً في رفض الطلب السابق، فسيتم رفض الطلب الجديد أيضاً.</p>`,
  },
  {
    title: "تمديد تصريح العمل في قطاع الترفيه",
    content: `<p>يمكن تمديد تصريح العمل في القطاع الترفيهي. يتم تقديم طلب التمديد، مثله مثل طلب الإجازة، من خلال طلب التصريح الإلكتروني من قبل صاحب العمل أو من يفوضه. ويجب تقديم طلب التمديد قبل 60 يومًا من نهاية فترة تصريح العمل، وفي جميع الأحوال قبل نهاية فترة التصريح. </p><p>تطبيقات الامتداد؛ وفي حال الحفاظ على شروط التصريح ورفع المستندات اللازمة بشكل كامل على النظام، يتم قبوله وتقييمه من قبل الجهات المختصة. يمكن تمديد تصريح العمل في صناعة الترفيه لمدة أقصاها سنتان للتمديد الأول ولمدة أقصاها 3 سنوات لطلبات التمديد اللاحقة. ومع ذلك، لا يجوز أن تتجاوز فترة التمديد المدة المتبقية من عقد العمل. </p><p><strong>تنبيه: </strong>من أجل تمديد تصريح العمل، يجب على الأجنبي الاستمرار في العمل لدى نفس صاحب العمل. إذا أبرم الأجنبي اتفاقًا مع صاحب عمل آخر أو بدأ العمل بشكل مستقل، فلن يتم قبول طلب التمديد ويتم التعامل معه كطلب تصريح لأول مرة. </p><p>أسباب رفض طلبات تمديد تصريح العمل في قطاع الترفيه وإجراءات التقديم والمستندات المطلوبة وجميع التفاصيل الأخرى المتعلقة بالموضوع مذكورة في المادة "تمديد تصريح العمل".</p>قضية الاعتراض والإلغاء ضد رفض طلب تمديد تصريح العمل في قطاع الترفيه<p>يمكن للشخص الذي تم رفض طلب تمديد تصريح العمل في قطاع الترفيه الاستئناف أمام السلطة المختصة ورفع دعوى إلغاء في المحكمة الإدارية. دعوى الاعتراض والإلغاء ضد رفض الطلب؛ وهو نفس الاعتراض على رفض الطلب الأول ودعوى الإلغاء من حيث الشروط والإجراءات.</p>هل يمكن للأجنبي العمل أثناء عملية تقييم طلب تمديد تصريح العمل في قطاع الترفيه؟<p>يمكن للأجنبي العمل لمدة 90 يومًا أخرى بعد انتهاء تصريح العمل الحالي أثناء عملية تقييم طلب تمديد تصريح العمل في قطاع الترفيه. ومع ذلك، إذا تم رفض الطلب، يصبح التوظيف غير قانوني.</p><p>خلال هذه الفترة بينما يستمر الأجنبي في العمل، تستمر حقوق والتزامات كل من صاحب العمل والموظف الأجنبي بموجب القانون.</p>`,
  },
  {
    title: "خاتمة",
    content: `<p>في تصريح العمل في القطاع الترفيهي، يتم ترتيب المعايير والمستندات المطلوبة بشكل تفصيلي. إذا لم يتم استيفاء أحد الشروط أو أن المستندات ليست بالجودة المطلوبة، يتم رفض الطلب. من المفيد الحصول على الدعم القانوني من محامي قانون الأجانب من أجل تنفيذ العملية بأسرع وأسلس طريقة ممكنة من حيث الاعتراض والإلغاء ضد رفض الطلب.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Разрешение на работу в индустрии развлечений",
    content: `<p>Разрешение на работу в сфере развлечений; Это разрешение на работу, которое должны получить иностранцы, которые будут работать в индустрии развлечений. Особенно учитывая большое количество иностранцев, работающих в туристических и развлекательных заведениях, важность разрешения на работу в сфере развлечений становится очевидной. Для этого типа разрешения на работу введены специальные правила.</p>`,
  },
  {
    title: "Критерии приема на работу иностранного персонала в индустрию развлечений",
    content: `<p>Существуют некоторые критерии приема на работу иностранных сотрудников в индустрию развлечений. Эти критерии относятся не к иностранному работнику, а к рабочему месту, на котором будут трудоустроены иностранцы. Условия, которые должен соблюдать работодатель при подаче заявления, следующие:</p><ul>
<li>Оплаченный капитал предприятия должен составлять не менее 100 000 TL, валовой объем продаж должен составлять не менее 800 000 TL, либо сумма экспорта должна составлять не менее 250 000 долларов США.</li>



<li>Партнер компании, подающий заявление на получение разрешения на работу от имени иностранца; должен владеть не менее 20% капитала компании. Эта ставка должна соответствовать как минимум 40 000 TL.</li>



<li>На рабочем месте должно быть занято не менее 10 граждан Türkiye.</li>
</ul><p>Соответствие этим критериям оценивает Министерство труда и социальной защиты. Если какой-либо из критериев не будет выполнен, заявка будет отклонена. При обнаружении в заявке несоответствия вышеуказанным условиям администрация может предоставить определенный срок для исправления недостатка.</p>`,
  },
  {
    title: "Как получить разрешение на работу иностранным танцорам, аниматорам и артистам индустрии развлечений?",
    content: `<p>Разрешение на работу в сфере развлечений получается на основании заявления, поданного работодателем через заявку на получение электронного разрешения на портале электронного правительства. Как работодатель будет авторизоваться в системе; Оно варьируется в зависимости от возможности пребывания иностранца в стране или за границей на момент подачи заявления.</p><p>Если иностранец, от имени которого будет подано заявление на получение разрешения на работу, находится за границей, он/она подает заявление на получение разрешения на работу в иностранное представительство Türkiye в стране, где он/она находится. Работодатель входит в заявку на получение электронного разрешения с этим кодом и заполняет заявку. </p><p>Если иностранец, который будет подавать заявление на получение разрешения на работу от имени иностранца, находится в Türkiye, в заявку на получение электронного разрешения вводится идентификационный номер иностранца или паспортные данные. Онлайн-заявка заполняется работодателем путем внесения в систему необходимой информации и документов.</p><p>Если заявка будет принята, на адрес электронной почты работодателя, зарегистрированный в системе электронного разрешения, будут отправлены банковские счета, на которые будет произведена оплата пошлины и сбора за ценные бумаги. Платежи должны быть произведены на соответствующие банковские счета в течение 30 дней с момента получения этого уведомления. </p><p>Если работодатель производит оплату в полном объеме в течение 30 дней на указанные ему банковские счета, Министерство в течение 30 дней отправит документ о разрешении на работу иностранному работнику на адрес рабочего места, указанный при подаче заявления. Однако если оплата не будет произведена, заявка будет отклонена. </p><p><strong>ВНИМАНИЕ: </strong>Работодатель обязан предоставить застрахованное свидетельство о трудоустройстве иностранного работника в учреждение социального обеспечения по месту нахождения рабочего места <strong>в течение 30 дней</strong> после одобрения заявления о разрешении на работу. </p><p><strong>ВНИМАНИЕ: </strong>Если заявление подано из-за границы, иностранец должен зарегистрировать свой адрес в органе записи актов гражданского состояния в течение 20 дней после въезда в Türkiye.</p><p>Существует множество других типов разрешений на работу, на которые могут подать заявление иностранцы, желающие работать в Türkiye. Подробная информация об этих разрешениях на работу и процедуре подачи заявления описана в статье «Как получить разрешение на работу за рубежом».</p>`,
  },
  {
    title: "Какие документы необходимы для получения разрешения на работу в сфере развлечений?",
    content: `<p>При подаче заявления на получение разрешения на работу в сфере развлечений необходимо загрузить в систему некоторые документы. Часть этих документов приносит иностранный работник, часть - работодатель. </p><p>Документы, необходимые для получения разрешения на работу в сфере развлечений, следующие:</p><p><strong>Документы, предоставляемые работодателем</strong>:</p><ul>
<li>Утвержденная банковская ведомость о заработной плате, показывающая, что оборот рабочего места за последний год составляет не менее 40 000 долларов США или эквивалентную сумму в иностранной валюте.</li>



<li>Бюллетень торгового реестра, показывающий последний статус капитала и количество партнеров на рабочем месте,</li>



<li>Баланс рабочего места и отчет о прибылях и убытках, утвержденные налоговой инспекцией или сертифицированным бухгалтером за последний год,</li>



<li>Свидетельство об эксплуатации и инвестициях (можно получить в Министерстве культуры и туризма).</li>



<li>Доверенность, если заявление подает представитель, а не сам работодатель.</li>



<li>Трудовой договор между работодателем и иностранцем, от имени которого подано заявление. (Условия, которым должен соответствовать этот контракт, подробно описаны ниже.)</li>
</ul><p><strong>Документы об иностранном персонале</strong>:</p><ul>
<li>Паспорт или документ, заменяющий паспорт,</li>



<li>Нотариально заверенная копия диплома или заменяющего его аттестата с переводом на турецкий язык.</li>



<li>Документ о виде на жительство, если иностранный работник проживает в Türkiye на момент подачи заявления.</li>



<li>Биометрическая фотография иностранного персонала.</li>



<li>Направление с нотариально заверенным переводом, одобренное компетентными органами.</li>
</ul><p>Все документы должны быть загружены в систему электронного разрешения работодателем во время подачи заявления. Документы, которые невозможно получить в электронном виде, необходимо отсканировать, преобразовать в формат pdf и загрузить в систему в этом формате. Отдельно физически предъявлять требуемые документы не требуется.</p>`,
  },
  {
    title: "Что следует учитывать при заключении трудового договора для получения разрешения на работу в сфере развлечений",
    content: `<p>При составлении трудового договора между иностранным работником и работодателем необходимо учитывать множество вопросов. Условия и положения, которые должен содержать трудовой договор, можно перечислить следующим образом: </p><ul>
<li>Запись о том, что обратный билет и транспортные расходы будут покрыты работодателем, когда иностранец вернется в свою страну в течение периода, когда он/она работает у работодателя в Türkiye,</li>



<li>Ваш гонорар; Положение контракта, гласящее, что она не будет ниже минимальной заработной платы, установленной для иностранцев Генеральным управлением международной рабочей силы (Генеральное управление международной рабочей силы определяет минимальную заработную плату, которую можно выплачивать иностранным работникам каждые 6 месяцев. Заработная плата иностранного работника не может быть ниже этой суммы.)</li>



<li>Налоговый номер рабочего места,</li>



<li>Дата приема на работу.</li>



<li>Адрес места работы, на котором будет работать иностранный сотрудник,</li>



<li>Разъясняющее письмо относительно прав работника.</li>



<li>Конкретная должностная инструкция иностранца,</li>



<li>157 Горячая линия для жертв торговли людьми, номер горячей линии 170, по которому сотрудник может позвонить в случае необходимости.</li>
</ul><p>Вышеуказанные вопросы должны быть включены в заключаемый трудовой договор. В противном случае трудовой договор, не соответствующий соответствующим условиям, будет признан недействительным, а заявление на получение разрешения на работу, на основании которого заключен этот трудовой договор, будет отклонено.</p>`,
  },
  {
    title: "Установлен минимальный размер оплаты труда иностранного персонала в индустрии развлечений",
    content: `<p>В 2023 году минимальная заработная плата, определенная Генеральным управлением международной рабочей силы для иностранцев, составит 13 414,50 турецких лир. Однако если иностранный работник будет работать акробатом в туристско-анимационной организации, то размер заработной платы составит как минимум 2-кратную эту сумму.</strong> Минимальная заработная плата, которую можно выплачивать иностранным артистам, составляет 3-кратную эту сумму.</strong></p>`,
  },
  {
    title: "Сколько времени занимает заполнение заявления на получение разрешения на работу в сфере развлечений?",
    content: `<p>Заявка на получение разрешения на работу в сфере развлечений; Если заявка заполнена полностью и в установленном порядке, она будет оформлена в течение <strong>30 дней</strong>.</p><p>При обнаружении недостатков в документах заявки администрация предоставит дополнительное время на исправление недостатков, что приведет к продлению срока. По этой причине консультация с адвокатом иностранцев при подаче заявления или даже подача заявления лично адвокатом иностранцев обеспечит максимально быстрое и положительное завершение процесса.</p>`,
  },
  {
    title: "Гонорары и расходы юриста по разрешению на работу в индустрии развлечений",
    content: `<p>Затраты на получение разрешения на работу в секторе развлечений состоят из платы за разрешение на работу и платы за бумагу фиксированной стоимости. Плата составляет 3090,20 TL за каждый год периода действия разрешения на работу. Соответственно, за разрешения на работу до 1 года будет выплачено 3090,20 TL, а за разрешения на работу до 2 лет - 7180 TL. Плата за ценную бумагу составляет 356 TL, независимо от срока действия разрешения на работу. Эти суммы как сбора, так и сбора за ценные бумаги действительны на 2023 год. Эти суммы будут обновлены в последующие годы.</p>`,
  },
  {
    title: "Отказ в выдаче разрешения на работу в индустрии развлечений",
    content: `<p>Отказ в выдаче разрешения на работу в индустрии развлечений; Вопрос встает на повестку дня, если условия разрешения на работу не выполнены, в документах имеется недостаток и этот недостаток не устранен в течение срока, предоставленного администрацией, или Министерство не рассматривает заявление в соответствии с международной трудовой политикой.</p>Дело о возражении и отмене разрешения на работу в сфере развлечений<p>Иностранный работник, от имени которого подано заявление, и работодатель-заявитель имеют право возражать и подать иск против отказа в работе в сфере развлечений. заявление на получение разрешения. </p><p>Подать возражение можно, загрузив ходатайство о возражении в заявку на получение электронного разрешения в течение <strong>30 дней</strong> с момента уведомления о решении об отказе. В случае принятия возражения процедуры осуществляются непосредственно компетентными органами.</p><p>Если возражение, поданное в установленном порядке в установленный срок, отклонено, иностранный работник или работодатель может подать иск об аннулировании решения об отказе. Компетентным судом по делу об аннулировании является Административный суд Анкары. </p><p>В случае возражения и аннулирования отклонения заявления на получение разрешения на работу в сфере развлечений действуют те же сроки и процедуры, что и в случае возражения и аннулирования отказа в выдаче других разрешений на работу. Подробное объяснение по этому поводу можно найти в статье «Отказ в выдаче разрешения на работу». </p>Право на повторное заявление в случае отклонения заявления на получение разрешения на работу<p>Лицо, чье заявление на получение разрешения на работу в сфере развлечений отклонено, может подать новое заявление, обратив внимание на вопросы, включенные в причину отклонения заявления. Если недостатки, послужившие причиной отклонения предыдущей заявки, не будут устранены, новая заявка также будет отклонена.</p>`,
  },
  {
    title: "Продление разрешения на работу в сфере развлечений",
    content: `<p>Возможно продлить разрешение на работу в сфере развлечений. Заявление на продление, как и заявление на отпуск, подается через заявление на получение электронного разрешения работодателем или его уполномоченным представителем. Заявление о продлении должно быть подано за 60 дней до окончания срока действия разрешения на работу и в любом случае до окончания срока действия разрешения. </p><p>Приложения расширения; Если условия разрешения соблюдены и необходимые документы полностью загружены в систему, оно принимается и оценивается компетентными органами. Разрешение на работу в индустрии развлечений может быть продлено максимум на 2 года при первом продлении и максимум на 3 года при последующих заявлениях на продление. Однако срок продления не может превышать оставшийся срок трудового договора. </p><p><strong>ВНИМАНИЕ: </strong>Для продления разрешения на работу иностранец должен продолжать работать у того же работодателя. Если иностранец заключает договор с другим работодателем или начинает работать самостоятельно, заявление о продлении не принимается и рассматривается как заявление на получение первого разрешения. </p><p>Причины отклонения заявления на продление разрешения на работу в сфере развлечений, процедура подачи заявления, необходимые документы и все другие подробности по этому вопросу включены в статью «Продление разрешения на работу».</p>Дело о возражении и отмене отклонения заявления на продление разрешения на работу в сфере развлечений<p>Лицо, чье заявление на продление разрешения на работу в сфере развлечений отклонено, может обратиться в компетентный орган и подать иск об аннулировании в административный суд. Дело о возражении и аннулировании отклонения заявления; С точки зрения условий и процедур это точно так же, как возражение против отклонения первого заявления и дела об аннулировании.</p>Может ли иностранец работать во время процесса оценки заявления на продление разрешения на работу в сфере развлечений?<p>Иностранец может работать еще 90 дней после истечения срока действия текущего разрешения на работу во время процесса оценки заявления на продление разрешения на работу в сфере развлечений. Однако в случае отклонения заявления трудоустройство становится незаконным.</p><p>В течение этого периода, пока иностранец продолжает работать, права и обязанности как работодателя, так и иностранного работника сохраняются в соответствии с законом.</p>`,
  },
  {
    title: "Заключение",
    content: `<p>В разрешении на работу в сфере развлечений подробно описаны критерии и необходимые документы. Если одно из условий не выполнено или документы не требуемого качества, заявка отклоняется. Выгодно получить юридическую поддержку от юриста по делам иностранцев, чтобы провести процесс как можно быстрее и беспрепятственно с точки зрения возражения и аннулирования отклонения заявления.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "مجوز کار در صنعت سرگرمی",
    content: `<p>مجوز کار صنعت سرگرمی؛ این مجوز کاری است که خارجیانی که در صنعت سرگرمی کار خواهند کرد باید دریافت کنند. به ویژه با توجه به تعداد بالای افراد خارجی شاغل در اماکن توریستی و اماکن تفریحی، اهمیت مجوز کار بخش سرگرمی آشکار می شود. مقررات ویژه ای برای این نوع مجوز کار معرفی شده است.</p>`,
  },
  {
    title: "ضوابط استخدام پرسنل خارجی در صنعت سرگرمی",
    content: `<p> معیارهایی برای استخدام کارمندان خارجی در صنعت سرگرمی وجود دارد. این معیارها مربوط به کارمند خارجی نیست، بلکه مربوط به محل کاری است که خارجی ها را استخدام می کند. شرایطی که کارفرما هنگام درخواست باید رعایت کند به شرح زیر است:</p><ul>
<li>سرمایه پرداخت شده کسب و کار باید حداقل 100000 لیره یا فروش ناخالص آن باید حداقل 800000 لیره یا مقدار صادرات آن باید حداقل 250000 دلار باشد.</li>



<li>شریک شرکتی که از طرف یک خارجی برای مجوز کار درخواست می کند. باید حداقل 20 درصد از سرمایه شرکت را در اختیار داشته باشد. این نرخ باید حداقل معادل 40000 لیر باشد.</li>



<li>حداقل 10 شهروند Türkiye باید در محل کار استخدام شوند.</li>
</ul><p>اینکه آیا این معیارها برآورده می شوند توسط وزارت کار و تامین اجتماعی ارزیابی می شود. در صورت عدم رعایت هر یک از شرایط، درخواست رد خواهد شد. در صورت وجود نقص در شرایط فوق الذکر در درخواست، اداره ممکن است مهلت معینی را برای رفع نقص اعطا کند.</p>`,
  },
  {
    title: "چگونه می توان مجوز کار برای رقصندگان، انیماتورها و هنرمندان خارجی در صنعت سرگرمی دریافت کرد؟",
    content: `<p>مجوز کار در بخش سرگرمی در نتیجه درخواست ارائه شده توسط کارفرما از طریق درخواست مجوز الکترونیکی در پورتال دولت الکترونیکی اخذ می شود. نحوه ورود کارفرما به سیستم؛ با توجه به احتمال حضور فرد خارجی در کشور یا خارج از کشور در زمان درخواست متفاوت است.</p><p>اگر خارجی که از طرف او درخواست مجوز کار انجام می شود در خارج از کشور باشد، برای مجوز کار به نمایندگی خارجی Türkiye در کشوری که در آن واقع شده است، درخواست می دهد. کارفرما با این کد وارد برنامه مجوز الکترونیکی می شود و درخواست را تکمیل می کند. </p><p>اگر خارجی که از طرف یک خارجی برای اجازه کار درخواست می کند در Türkiye باشد، درخواست مجوز الکترونیکی با شماره شناسایی خارجی یا اطلاعات گذرنامه وارد می شود. درخواست آنلاین توسط کارفرما با وارد کردن اطلاعات و مدارک لازم در سامانه تکمیل می شود.</p><p>در صورت پذیرش درخواست، حساب های بانکی که هزینه و هزینه کاغذ با ارزش به آنها پرداخت می شود به آدرس ایمیل کارفرما که در سامانه مجوز الکترونیکی ثبت شده است ارسال می شود. پرداخت ها باید ظرف 30 روز از تاریخ این اطلاعیه به حساب های بانکی مربوطه انجام شود. </p><p>در صورتی که کارفرما حداکثر ظرف مدت 30 روز به حساب های بانکی که به وی ابلاغ شده است، پرداخت ها را به طور کامل انجام دهد، وزارتخانه سند مجوز کار کارمند خارجی را به آدرس محل کار وارد شده در هنگام درخواست ارسال می کند. اما در صورت عدم پرداخت، درخواست رد خواهد شد. </p><p><strong>توجه: </strong>کارفرما موظف است گواهی اشتغال به کار بیمه شده کارمند خارجی را<strong>ظرف ۳۰ روز پس از تایید درخواست مجوز کار به موسسه تامین اجتماعی محل کار ارائه نماید. </p><p><strong>توجه: </strong>اگر درخواست از خارج از کشور انجام شده باشد، فرد خارجی باید ظرف 20 روز پس از ورود به Türkiye آدرس خود را در اداره ثبت احوال ثبت کند.</p><p> انواع دیگری از مجوزهای کار وجود دارد که خارجیانی که می خواهند در Türkiye کار کنند می توانند درخواست دهند. اطلاعات دقیق در مورد این مجوزهای کار و روش درخواست در مقاله "نحوه دریافت مجوز کار خارجی" توضیح داده شده است.</p>`,
  },
  {
    title: "مدارک مورد نیاز برای مجوز کار در بخش سرگرمی چیست؟",
    content: `<p>در هنگام درخواست مجوز کار بخش سرگرمی، اسنادی وجود دارد که باید در سیستم آپلود شوند. برخی از این مدارک توسط کارمند خارجی و برخی توسط کارفرما آورده می شود. </p><p>مدارک مورد نیاز برای مجوز کار در بخش سرگرمی به شرح زیر است:</p><p><strong>اسنادی که باید توسط کارفرما ارائه شود</strong>:</p><ul>
<li>لیست حقوق و دستمزد مجاز بانک که نشان می دهد گردش مالی محل کار در سال گذشته حداقل 40000 دلار آمریکا یا معادل آن ارز خارجی است،</li>



<li>روزنامه ثبت تجارت که آخرین وضعیت سرمایه و تعداد شرکای محل کار را نشان می دهد،</li>



<li>ترازنامه محل کار و صورت سود زیان مورد تایید اداره مالیات یا حسابدار رسمی در سال گذشته،</li>



<li>گواهی بهره برداری و سرمایه گذاری، (از وزارت فرهنگ و گردشگری قابل دریافت است.)</li>



<li>اگر درخواست توسط نماینده به جای خود کارفرما باشد، وکالت نامه،</li>



<li>قرارداد کار بین کارفرما و خارجی که از طرف او درخواست داده شده است. (شرایطی که این قرارداد باید داشته باشد در زیر به تفصیل توضیح داده شده است.)</li>
</ul><p><strong>اسناد مربوط به پرسنل خارجی</strong>:</p><ul>
<li>گذرنامه یا سند جایگزین گذرنامه،</li>



<li>کپی محضری و سوگند نامه دیپلم یا گواهی فارغ التحصیلی جایگزین با ترجمه ترکی،</li>



<li>اگر کارمند خارجی در زمان درخواست در Türkiye اقامت داشته باشد، سند اجازه اقامت،</li>



<li>عکس بیومتریک پرسنل خارجی،</li>



<li>ارجاع با ترجمه قسم خورده و تایید شده توسط مراجع ذیصلاح.</li>
</ul><p>کلیه مدارک باید در حین درخواست توسط کارفرما در سامانه مجوز الکترونیکی بارگذاری شود. اسنادی که به صورت الکترونیکی قابل دریافت نیستند باید اسکن شوند، به فرمت pdf تبدیل و با این فرمت در سامانه بارگذاری شوند. ارائه فیزیکی مدارک مورد نیاز به صورت جداگانه الزامی نیست.</p>`,
  },
  {
    title: "مواردی که در قرارداد کاری برای مجوز کار در بخش سرگرمی باید در نظر گرفته شود",
    content: `<p> هنگام تنظیم قرارداد کاری بین یک کارمند خارجی و یک کارفرما، مسائل زیادی باید در نظر گرفته شود. شرایط و شرایطی که قرارداد کار باید شامل آن باشد را می توان به شرح زیر برشمرد: </p><ul>
<li>سوابق مبنی بر اینکه بلیط رفت و برگشت و هزینه های سفر زمانی که فرد خارجی در طول مدتی که زیر نظر کارفرما در Türkiye کار می کند به کشور خود بازگردد توسط کارفرما تامین می شود،</li>



<li>هزینه شما؛ مفاد قرارداد مبنی بر اینکه کمتر از حداقل دستمزد تعیین شده برای اتباع خارجی توسط اداره کل نیروی کار بین المللی نخواهد بود، (اداره کل نیروی کار بین المللی حداقل دستمزد قابل پرداخت به کارمندان خارجی را هر 6 ماه یکبار تعیین می کند. دستمزد کارمند خارجی نمی تواند کمتر از این باشد.)</li>



<li>شماره مالیات محل کار،</li>



<li>تاریخ استخدام،</li>



<li>آدرس محل کار که کارمند خارجی در آن کار خواهد کرد،</li>



<li>توضیح نامه در مورد حقوق کارمند،</li>



<li>شرح شغل خاص فرد خارجی،</li>



<li>خط کمک 157 قربانی قاچاق، شماره تلفن 170 برای کارمند که در صورت لزوم با آن تماس بگیرد.</li>
</ul><p>موضوعات فوق باید در قرارداد کار امضا شده درج شود. در غیر این صورت، قرارداد کاری که شرایط مربوطه را نداشته باشد باطل تلقی می شود و درخواست مجوز کار که بر اساس این قرارداد کار است رد می شود.</p>`,
  },
  {
    title: "تعیین حداقل دستمزد برای پرسنل خارجی در صنعت سرگرمی",
    content: `<p>در سال 2023، حداقل دستمزد تعیین شده توسط اداره کل نیروی کار بین المللی برای خارجی ها 13414.50 لیر است. اما در صورتی که کارمند خارجی به عنوان آکروبات در سازمان های گردشگری-انیمیشن مشغول به کار شود، دستمزدی که باید پرداخت شود حداقل 2 برابر این مبلغ است.</strong>حداقل دستمزدی که می توان به هنرمندان خارجی پرداخت کرد، 3 برابر این مبلغ است.</strong></p>`,
  },
  {
    title: "چه مدت طول می کشد تا درخواست مجوز کار در بخش سرگرمی تکمیل شود؟",
    content: `<p>درخواست مجوز کار در بخش سرگرمی؛ اگر درخواست به طور کامل و به موقع تکمیل شود، ظرف <strong>30 روز</strong> به نتیجه می رسد.</p><p>در صورت وجود نقص در مدارک درخواست، اداره وقت اضافی برای رفع نقص می دهد که باعث تمدید دوره می شود. به همین دلیل، مشاوره با یک وکیل خارجی در هنگام درخواست، یا حتی ارائه درخواست شخصا توسط وکیل خارجی، تضمین می کند که روند به سریع ترین و مثبت ترین روش به پایان می رسد.</p>`,
  },
  {
    title: "هزینه ها و هزینه های وکیل مجوز کار برای صنعت سرگرمی",
    content: `<p>هزینه‌های مجوز کار بخش سرگرمی شامل هزینه مجوز کار و هزینه کاغذ با ارزش ثابت است. هزینه برای هر سال از دوره مجوز کار 3090.20 لیر لیر است. بر این اساس، 3090.20 لیر لیره برای مجوزهای کار تا 1 سال و 7180 لیره برای مجوزهای کار تا 2 سال پرداخت می شود. هزینه کاغذ با ارزش 356 لیره بدون در نظر گرفتن مدت زمان مجوز کار است. این مبالغ هم برای کارمزد و هم برای کارمزد ارزشمند کاغذ برای سال 2023 معتبر است. این مبالغ در سال‌های بعد به‌روزرسانی خواهند شد.</p>`,
  },
  {
    title: "رد درخواست مجوز کار صنعت سرگرمی",
    content: `<p>رد درخواست مجوز کار صنعت سرگرمی؛ در صورت عدم رعایت شرایط پروانه کار، نقص در مدارک و عدم رفع این نقص در مهلت مقرر از سوی اداره، یا وزارتخانه درخواست را مطابق با سیاست بین‌المللی کار ندانند، در دستور کار قرار می‌گیرد.</p>مورد اعتراض و ابطال در مورد رد درخواست کارمند بخش سرگرمی، درخواست کارمند خارجی است که درخواست کارمند خارجی است<p on> درخواست صادر شده توسط کارمند خارجی کارفرما حق دارد علیه رد درخواست مجوز کار بخش سرگرمی اعتراض کند و پرونده انصراف را تشکیل دهد. </p><p>ممکن است با بارگذاری دادخواست اعتراض در درخواست مجوز الکترونیکی ظرف <strong>۳۰ روز</strong> از زمان ابلاغ رای رد، اعتراض خود را ثبت کنید. در صورت پذیرفته شدن اعتراض، تشریفات مستقیماً توسط مراجع ذیصلاح انجام می شود.</p><p>در صورت رد اعتراض طبق رویه در مهلت مقرر، کارمند یا کارفرمای خارجی می تواند علیه تصمیم رد دعوای ابطال طرح کند. دادگاه صالح در پرونده ابطال، دادگاه اداری آنکارا است. </p><p>دعوای اعتراض و ابطال در مورد رد درخواست مجوز کار بخش سرگرمی مشمول همان مدت و مراحلی است که پرونده اعتراض و ابطال در برابر رد سایر مجوزهای کار. توضیح مفصل در مورد این موضوع در مقاله "رد درخواست مجوز کار" آمده است. </p>حق درخواست مجدد در صورت رد درخواست مجوز کار<p>شخصی که درخواست مجوز کار بخش سرگرمی وی رد شده است می تواند با توجه به موارد مندرج در دلیل رد درخواست درخواست جدیدی ارائه دهد. اگر نواقصی که باعث رد درخواست قبلی شده است اصلاح نشود، درخواست جدید نیز رد خواهد شد.</p>`,
  },
  {
    title: "تمدید مجوز کار در بخش سرگرمی",
    content: `<p>امکان تمدید مجوز کار بخش سرگرمی وجود دارد. درخواست تمدید، مانند درخواست مرخصی، از طریق درخواست مجوز الکترونیکی توسط کارفرما یا نماینده مجاز او انجام می شود. درخواست تمدید باید 60 روز قبل از پایان دوره مجوز کار و در هر صورت قبل از پایان دوره مجوز انجام شود. </p><p>برنامه های افزودنی؛ در صورت حفظ شرایط مجوز و بارگذاری کامل مدارک لازم در سامانه، مورد پذیرش و ارزیابی مراجع ذیصلاح قرار می گیرد. مجوز کار صنعت سرگرمی برای اولین تمدید حداکثر به مدت 2 سال و برای درخواست های تمدید بعدی حداکثر تا 3 سال قابل تمدید است. با این حال، مدت تمدید نمی تواند از مدت باقی مانده از قرارداد کار تجاوز کند. </p><p><strong>توجه: </strong>برای تمدید مجوز کار، فرد خارجی باید برای همان کارفرما به کار خود ادامه دهد. اگر خارجی با کارفرمای دیگری توافق کند یا به طور مستقل شروع به کار کند، درخواست تمدید پذیرفته نمی شود و به عنوان درخواست مجوز برای اولین بار بررسی می شود. </p><p>دلایل رد درخواست‌های تمدید مجوز کار در بخش سرگرمی، روش درخواست، مدارک مورد نیاز و کلیه جزئیات دیگر در مورد این موضوع در مقاله "تمدید مجوز کار" درج شده است.</p>پرونده اعتراض و ابطال علیه رد درخواست تمدید مجوز کار در بخش سرگرمی<p>فردی است که مرجع صالح برای تمدید کار، درخواست تجدیدنظر برای کار را مجدداً ارسال می‌کند. ابطال پرونده در دادگاه اداری اعتراض و ابطال دعوای رد درخواست؛ این دقیقاً مشابه اعتراض به رد اولین درخواست و پرونده ابطال از نظر شرایط و رویه‌ها است.</p>آیا می‌توان خارجی را در طول فرآیند ارزیابی درخواست تمدید مجوز کار در بخش سرگرمی کار کرد؟<p>یک خارجی می‌تواند 90 روز دیگر پس از انقضای مجوز کار فعلی در طول فرآیند ارزیابی درخواست تمدید بخش سرگرمی کار کند. با این حال، اگر درخواست رد شود، استخدام غیرقانونی می‌شود.</p><p>در طول این مدت زمانی که فرد خارجی به کار خود ادامه می‌دهد، حقوق و تعهدات کارفرما و کارمند خارجی طبق قانون ادامه می‌یابد.</p>`,
  },
  {
    title: "نتیجه گیری",
    content: `<p>در مجوز کار بخش سرگرمی، ضوابط و مدارک مورد نیاز به تفصیل تنظیم شده است. در صورت عدم احراز یکی از شرایط یا عدم کیفیت مدارک، درخواست رد می شود. دریافت حمایت حقوقی از وکیل اتباع خارجی به منظور انجام سریعترین و روانترین روش ممکن از نظر اعتراض و ابطال در برابر رد درخواست مفید است.</p>`,
  },
];

export const contentSlug = "eglence-sektoru-calisma-izni";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Entertainment Industry Work Permit",
    excerpt: "Entertainment industry work permit; This is the work permit that foreigners who will work in the entertainment industry must obtain. Play especially in touristic places and entertainment venues…",
    shortDescription: "Entertainment industry work permit; This is the work permit that foreigners who will work in the entertainment industry must obtain. Play especially in touristic places and entertainment venues…",
    heroTitle: "Entertainment Industry Work Permit",
    heroSubtitle: "Entertainment industry work permit; This is the work permit that foreigners who will work in the entertainment industry must obtain. Play especially in touristic places and entertainment venues…",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "تصريح عمل صناعة الترفيه",
    excerpt: "تصريح عمل في مجال الترفيه؛ هذا هو تصريح العمل الذي يجب على الأجانب الذين سيعملون في مجال الترفيه الحصول عليه. اللعب خاصة في الأماكن السياحية والترفيهية…",
    shortDescription: "تصريح عمل في مجال الترفيه؛ هذا هو تصريح العمل الذي يجب على الأجانب الذين سيعملون في مجال الترفيه الحصول عليه. اللعب خاصة في الأماكن السياحية والترفيهية…",
    heroTitle: "تصريح عمل صناعة الترفيه",
    heroSubtitle: "تصريح عمل في مجال الترفيه؛ هذا هو تصريح العمل الذي يجب على الأجانب الذين سيعملون في مجال الترفيه الحصول عليه. اللعب خاصة في الأماكن السياحية والترفيهية…",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Разрешение на работу в индустрии развлечений",
    excerpt: "Разрешение на работу в индустрии развлечений; Это разрешение на работу, которое должны получить иностранцы, которые будут работать в индустрии развлечений. Особенно играйте в туристических местах и ​​развлекательных заведениях…",
    shortDescription: "Разрешение на работу в индустрии развлечений; Это разрешение на работу, которое должны получить иностранцы, которые будут работать в индустрии развлечений. Особенно играйте в туристических местах и ​​развлекательных заведениях…",
    heroTitle: "Разрешение на работу в индустрии развлечений",
    heroSubtitle: "Разрешение на работу в индустрии развлечений; Это разрешение на работу, которое должны получить иностранцы, которые будут работать в индустрии развлечений. Особенно играйте в туристических местах и ​​развлекательных заведениях…",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "مجوز کار در صنعت سرگرمی",
    excerpt: "مجوز کار صنعت سرگرمی؛ این مجوز کاری است که خارجیانی که در صنعت سرگرمی کار خواهند کرد باید دریافت کنند. بازی به خصوص در مکان های توریستی و مکان های تفریحی…",
    shortDescription: "مجوز کار صنعت سرگرمی؛ این مجوز کاری است که خارجیانی که در صنعت سرگرمی کار خواهند کرد باید دریافت کنند. بازی به خصوص در مکان های توریستی و مکان های تفریحی…",
    heroTitle: "مجوز کار در صنعت سرگرمی",
    heroSubtitle: "مجوز کار صنعت سرگرمی؛ این مجوز کاری است که خارجیانی که در صنعت سرگرمی کار خواهند کرد باید دریافت کنند. بازی به خصوص در مکان های توریستی و مکان های تفریحی…",
    sectionsJson: serializeServiceSections(faSections),
  },
};
