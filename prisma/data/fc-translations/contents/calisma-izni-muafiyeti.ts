import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "Work Permit Exemption",
    content: `<p>Work permit exemption is the document required for foreigners to work, reside and make multiple entries and exits in Türkiye without having a work permit. This document is given to people who meet the conditions specified in the relevant Regulation.</p>`,
  },
  {
    title: "What is Work Permit Exemption?",
    content: `<p>Work permit exemption is an exemption document that allows foreigners who do not have a work permit to work, reside and make multiple entries and exits in Türkiye. Work permit exemption can be issued by the Ministry of Labor and Social Security only on behalf of persons specified in the legislation.</p>`,
  },
  {
    title: "Which Foreigners Are Exempt from Work Permit?",
    content: `<p>Foreign person groups with the qualifications listed in Article 48 of the International Labor Law Implementation Regulation are exempt from work permits. According to the regulation, foreigners who will be exempt from work permits are:</p><ul>
<li><strong>Up to 1 month for foreigners who will work in the field of science, culture and art</li>



<li>Up to 3 months for foreigners who will <strong>give training</strong> on goods and services exported from or imported to Türkiye or on the use, maintenance or repair of machinery and systems imported to Türkiye,</li>



<li>Up to 3 months for foreigners residing abroad who are determined by the ministries to be of <strong>Turkish descent</strong>,</li>



<li><strong>Up to 3 months for those working in sports activities</strong>,</li>



<li>Up to 4 months for foreigners who will do internship within the scope of university international student exchange programs (Erasmus, AIASEC, Farabi etc.), up to 12 months if these exchange programs are approved by the General Directorate of International Labor Force,</li>



<li>Up to 6 months for foreigners who will work in seasonal agriculture and animal husbandry jobs determined by the General Directorate of International Labor Force,</li>



<li>Up to 6 months for foreigners who are declared by relevant public institutions and organizations to make significant contributions to Türkiye in the fields of economy, socio-cultural issues, technology or education,</li>



<li><strong>Up to 8 months for foreigners who will work as tour operator representatives</strong>,</li>



<li>Foreigners who will operate outside the borders of certified tourism enterprises<strong>will work in fairs and circuses</strong> up to six months,</li>



<li>With the approval of the Ministry of Youth and Sports and the TFF, foreign athletes, coaches, physiotherapists, masseurs and other personnel who come to Türkiye with a sports-based visa, during the contract period with sports clubs in Türkiye,</li>



<li>For those working in Türkiye within the scope of financial cooperation agreements between Türkiye and the European Union,</li>



<li><strong>For foreign seafarers on ships registered in the Turkish International Ship Registry</strong> but working outside the cabotage line, until the employment contract expires,</li>



<li><strong>Foreign university students who are enrolled in a formal education program in Türkiye and have a compulsory internship, during the internship period</li>



<li>Those who are civil servants in the diplomatic or consular representatives of foreign countries in Türkiye</strong> for the duration of their duties, and those who work under an employment contract until the contract ends.</li>



<li>Foreigners working in schools, cultural institutions and religious institutions operating as affiliated units of diplomatic and consular representations of foreign countries in Türkiye, during their duties,



<li><strong>Foreigners who come to Türkiye for TUS or DUS</strong> during their education,</li>



<li><strong>Up to 1 month for cross-border service providers</li>



<li>Up to 3 months for foreign board members of joint stock companies who do not reside in Türkiye,</li>



<li><strong>Foreigners specializing in medicine or dentistry</strong> during their education,</li>



<li><strong>Foreign personnel, researchers or managers who will work within the Turkish-Japanese University of Science and Technology</strong> during their employment contracts,</li>



<li>Up to 3 months for <strong>non-managing foreign partners of companies other than joint stock companies</li>



<li><strong>Employees working in factories or shipyards within MSB or within MKE</strong> may be granted exemption from work permits throughout their employment contracts.</li>
</ul><p>Foreigners listed in this article are not automatically exempt from a work permit. These foreigners must apply for exemption. The application conditions and procedure are explained in the rest of the article.</p><p>Foreigners who do not comply with these articles must apply for a general work permit. You can read our article on "foreign work permit" about this.</p>`,
  },
  {
    title: "How to Apply for Work Permit Exemption?",
    content: `<p>Work permit exemption application is received by applying through the e-exemption system. </p><p>If the foreigner who will apply for work permit exemption is in the country</strong>If he has a Foreign Identification Number starting with 99, he will log in to the system via e-government. If the foreigner does not have an identification number, he/she logs into the system with his/her passport information. </p><p>If the foreigner who will apply for work permit exemption is abroad, he/she will apply to the Turkish foreign representative office of the country he/she is in and receive a reference number. Afterwards, he can log in to the system with the reference number given to him.</p><p>The application is completed when the necessary steps are completed through the e-exemption system and the documents are uploaded to the system. After this stage, the Ministry evaluates the application. The application will be accepted if the foreigner applying for exemption is among the foreigners foreseen to be granted exemption in the Law and Regulation, the documents are fully uploaded to the system and the application complies with the international labor policy.</p><p>A Work Permit Exemption Certificate is issued to foreigners whose applications are accepted. Persons who want the transaction subject to the fee to be carried out are obliged to pay the work permit exemption payments. An e-mail is sent to the foreigner who applies to pay the valuable paper fee and the fee. The duty and paper fee must be paid within <strong>30 days</strong>from the sending of this e-mail. Otherwise, the application will be rejected and no objection can be made against this decision.</p><p>If the exemption period is <strong>3 months or more</strong>, the fee for document issuance and the cost of valuable paper must be paid. If the exemption validity period is <strong>less than 3 months</strong>, no fee will be charged, and if the applicant requests the issuance of a document, only the payment of the valuable paper fee will be sufficient.</p><p>Applications to be made from within the country must be made within <strong>30 days</strong>from the foreigner's entry into Türkiye. Applications made after this period will be rejected.</p>Required Documents for Work Permit Exemption<p>Documents required for work permit exemption are as follows:</p><ul>
<li>Biometric photograph of the foreigner, </li>



<li>Valid passport or passport substitute document, </li>



<li>Education and workplace information, if any, and relevant supporting documents</li>
</ul><p>These documents must be uploaded to the system when applying through the e-exemption application. In addition, documents proving the status of the foreigner must be uploaded according to the type of exemption applied for.</p><p>In order to obtain a work permit exemption certificate, the criteria specified in the legislation must be met and the necessary documents must be complete. However, meeting all these conditions is not sufficient to obtain an exemption certificate. In addition, procedural procedures must be carried out properly. Otherwise, the application will be rejected even if all conditions are thought to be met. In this sense, it would be beneficial to consult a foreigners lawyer who is an expert in his field in order to carry out the process effectively and quickly. </p>`,
  },
  {
    title: "How Long Is Work Permit Exemption Granted?",
    content: `<p>Work permit exemption is granted to each group of foreigners for the period they request, provided that it does not exceed the periods stipulated in Article 48 of the relevant Regulation. </p><p>Work permit exemption cannot be extended. For this reason, it is beneficial to request the exemption for the period needed, usually even the maximum period.</p>`,
  },
  {
    title: "How Long Does It Take for Work Permit Exemption Application to Be Finalized?",
    content: `<p>Work permit exemption applications are concluded within an average of <strong>30 days</p>.`,
  },
  {
    title: "Work Permit Exemption Application Costs",
    content: `<p>Work permit exemption application costs, fees and valuable papers. The fee, which varies depending on the exemption period, is 3090 TL for each year of the exemption period. In this context, the fee fees according to exemption periods are as follows:</p><ul>
<li>3090 TL for exemptions of 1 year or less, </li>



<li>6180 TL for exemptions between 1-2 years, </li>



<li>9270 TL for 2-3 years, </li>



<li>12360 TL for 3-4 years, </li>



<li>For 4-5 years it is 15450 TL. </li>
</ul><p>The cost of valuable paper is 356 TL in 2023. All these amounts are valid for 2023.</p><p>Work permit exemptions for less than 3 months are not subject to fees. Additionally, if the exemption certificate is not requested, there is no need to pay the valuable paper fee.</p>`,
  },
  {
    title: "Rejection of Work Permit Exemption Application, Objection Against Rejection and Cancellation Case",
    content: `<p>Applications for work permit exemption made by those who are not foreigners who can be granted work permit exemption, who are against the legislation or who do not meet other application conditions, will be rejected. The reasons for rejection are regulated in Article 52 of the International Labor Law Implementation Regulation and the following applications are rejected:</p><ul>
<li>Made by foreigners who are not within the scope of exemption,</li>



<li>Contrary to international labor policy,</li>



<li>Made by foreigners who are deemed unsafe to work in Türkiye due to national security, public order or general health reasons,</li>



<li>Made by foreigners against whom there is a deportation decision,</li>



<li>Made by foreigners who will not be allowed to enter Türkiye,</li>



<li>Made with false or misleading documents,</li>



<li>Conducted for jobs that are reserved only for Turkish citizens in the legislation,</li>



<li>Made by citizens of countries that the Republic of Türkiye does not recognize or does not have diplomatic relations with, (However, the exemption application of these persons may be accepted if the Ministry of Foreign Affairs receives the appropriate opinion.)</li>



<li>In case the application is made domestically, it is not made within<strong>30 days</strong> from the foreigner's entry into Türkiye,</li>



<li>Applications made in violation of Law No. 6735 or the implementing regulations of this Law will be rejected.</li>
</ul><p>If the work permit exemption application meets one of the reasons listed above, the application will be rejected. The rejection of the work permit is notified to the applicant via the e-mail address he registered in the system when applying. </p><p>An objection can be made against this decision via the e-exemption system within 30 days from the notification of the rejection decision.</strong> Additionally, a direct cancellation lawsuit can be filed within 60 days from the day following the notification of the rejection decision. If an objection has been made before, the person has the right to file an annulment case if the objection is rejected.</p><p>More detailed information about the objection and annulment action against the rejection of the work permit exemption application is included in the article titled "rejection of the work permit application".</p>Possibility of Re-Application After the Rejection Decision<p>A foreigner whose work permit exemption application has been rejected can re-apply for exemption. However, a waiting period of <strong>12 months</strong> is foreseen in order to apply for exemption again. This period starts from the notification to the foreigner that the exemption application has been rejected. The waiting period for cross-border service providers is <strong>6 months</p>.`,
  },
  {
    title: "Cancellation of Work Permit Exemption, Objection to Cancellation and Cancellation Case",
    content: `<p>Work permit exemption can be canceled upon the request of the foreigner or his employer. Apart from this, Article 56 of the International Labor Law Implementation Regulation regulates the reasons for cancellation. According to the regulation, the reasons for cancellation of work permit exemption are as follows:</p><ul>
<li>The foreigner does not enter Türkiye within <strong>6 months</strong> from the beginning of the exemption period,</li>



<li>While the exemption period is still valid, the passport or passport substitute document should not be extended even though it has expired, (but if the Ministry of Internal Affairs or the Ministry of Foreign Affairs deems the situation appropriate, the exemption will not be cancelled.)</li>



<li>A decision to deport the foreigner is made or it is understood that this decision has been made,</li>



<li>The foreigner is among those who will not be allowed to enter Türkiye,</li>



<li>Detection that the application was made with false or misleading documents,</li>



<li>Termination of employment for any reason,</li>



<li>Determination that the work is against the legislation,</li>



<li>The reasons for cancellation are if a foreigner's work in Türkiye is considered dangerous in terms of national security, public order or general health.</li>
</ul><p>In case of cancellation of the exemption permit, the work permit exemption certificate must be submitted to the Ministry within<strong>15 days</strong> from the cancellation.</p><p>In case the exemption permit is canceled, the foreigner has the right to object and file a cancellation lawsuit. The procedure to be followed for the right to file a cancellation lawsuit and object is the same as for work permit exemption denial as explained above. </p><p>More detailed information about objecting to the cancellation of work permit exemption and filing a cancellation lawsuit is included in the article titled "rejection of work permit application".</p>`,
  },
  {
    title: "Conclusion",
    content: `<p>Work permit exemption has a detailed regulation in the legislation. Any deficiencies in the application conditions or procedural procedures will result in the rejection of the exemption permit application. In this context, care should be taken to ensure that the necessary criteria are met and the procedural procedures are carried out correctly. Therefore, consulting with a foreigners lawyer who is an expert in his field from the beginning of the process will be beneficial to ensure that the procedures for obtaining the exemption permit are carried out properly.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "الإعفاء من تصريح العمل",
    content: `<p>الإعفاء من تصريح العمل هو الوثيقة المطلوبة للأجانب للعمل والإقامة والدخول والخروج المتعدد في Türkiye دون الحصول على تصريح عمل. تُمنح هذه الوثيقة للأشخاص الذين يستوفون الشروط المحددة في اللائحة ذات الصلة.</p>`,
  },
  {
    title: "ما هو الإعفاء من تصريح العمل؟",
    content: `<p>الإعفاء من تصريح العمل هو وثيقة إعفاء تسمح للأجانب الذين ليس لديهم تصريح عمل بالعمل والإقامة والدخول والخروج المتعدد في Türkiye. يمكن أن يتم إصدار الإعفاء من تصريح العمل من قبل وزارة العمل والضمان الاجتماعي فقط نيابة عن الأشخاص المحددين في التشريع.</p>`,
  },
  {
    title: "من هم الأجانب المعفيون من تصريح العمل؟",
    content: `<p>تُعفى مجموعات الأشخاص الأجانب الحاصلين على المؤهلات المذكورة في المادة 48 من لائحة تنفيذ قانون العمل الدولي من تصاريح العمل. وفقًا للائحة، فإن الأجانب الذين سيتم إعفاؤهم من تصاريح العمل هم:</p><ul>
<li><strong>ما يصل إلى شهر واحد للأجانب الذين سيعملون في مجال العلوم والثقافة والفنون</li>



<li>ما يصل إلى 3 أشهر للأجانب الذين <strong>يقدمون تدريبًا</strong> على السلع والخدمات المصدرة من Türkiye أو المستوردة إليها أو على استخدام أو صيانة أو إصلاح الآلات والأنظمة المستوردة إلى Türkiye،</li>



<li>ما يصل إلى 3 أشهر للأجانب المقيمين في الخارج والذين تحدد الوزارات أنهم من <strong>أصل تركي</strong>،</li>



<li><strong>حتى 3 أشهر للعاملين في الأنشطة الرياضية</strong>،</li>



<li>ما يصل إلى 4 أشهر للأجانب الذين سيقومون بالتدريب في نطاق برامج تبادل الطلاب الدوليين بالجامعات (إيراسموس، AIASEC، الفارابي وما إلى ذلك)، وما يصل إلى 12 شهرًا إذا تمت الموافقة على برامج التبادل هذه من قبل المديرية العامة للقوى العاملة الدولية، </li>



<li>ما يصل إلى 6 أشهر للأجانب الذين سيعملون في وظائف الزراعة الموسمية وتربية الحيوانات التي تحددها المديرية العامة للقوى العاملة الدولية،</li>



<li>ما يصل إلى 6 أشهر للأجانب الذين أعلنتهم المؤسسات والمنظمات العامة ذات الصلة أنهم يقدمون مساهمات كبيرة لTürkiye في مجالات الاقتصاد أو القضايا الاجتماعية والثقافية أو التكنولوجيا أو التعليم،</li>



<li><strong>ما يصل إلى 8 أشهر للأجانب الذين سيعملون كممثلين لمنظمي الرحلات السياحية</strong>،</li>



<li>الأجانب الذين سيعملون خارج حدود المؤسسات السياحية المعتمدة<strong>سيعملون في المعارض والسيرك</strong> لمدة تصل إلى ستة أشهر،</li>



<li>بموافقة وزارة الشباب والرياضة والاتحاد التركي لكرة القدم، فإن الرياضيين الأجانب والمدربين وأخصائيي العلاج الطبيعي والمدلكين وغيرهم من الموظفين الذين يأتون إلى Türkiye بتأشيرة رياضية، خلال فترة العقد مع الأندية الرياضية في Türkiye،</li>



<li>بالنسبة للعاملين في Türkiye ضمن نطاق اتفاقيات التعاون المالي بين Türkiye والاتحاد الأوروبي،</li>



<li><strong>بالنسبة للبحارة الأجانب على متن السفن المسجلة في سجل السفن الدولي التركي</strong> ولكنهم يعملون خارج خط الملاحة الساحلية، حتى انتهاء عقد العمل،</li>



<li><strong>طلاب الجامعات الأجانب المسجلين في برنامج التعليم الرسمي في Türkiye ويحصلون على تدريب إلزامي خلال فترة التدريب</li>



<li>أولئك الذين هم موظفون حكوميون في الممثلين الدبلوماسيين أو القنصليين للدول الأجنبية في Türkiye</strong> طوال مدة واجباتهم، وأولئك الذين يعملون بموجب عقد عمل حتى انتهاء العقد.</li>



<li>الأجانب العاملون في المدارس والمؤسسات الثقافية والمؤسسات الدينية العاملة كوحدات تابعة للممثليات الدبلوماسية والقنصلية للدول الأجنبية في Türkiye، أثناء واجباتهم،



<li><strong>الأجانب الذين يأتون إلى Türkiye للدراسة في TUS أو DUS</strong> أثناء تعليمهم،</li>



<li><strong>ما يصل إلى شهر واحد لمقدمي الخدمات عبر الحدود</li>



<li>ما يصل إلى 3 أشهر لأعضاء مجلس إدارة الشركات المساهمة الأجانب الذين لا يقيمون في Türkiye،</li>



<li><strong>الأجانب المتخصصين في الطب أو طب الأسنان</strong> أثناء تعليمهم،</li>



<li><strong>الموظفون الأجانب أو الباحثون أو المديرون الذين سيعملون داخل الجامعة التركية اليابانية للعلوم والتكنولوجيا</strong> خلال عقود عملهم،</li>



<li>ما يصل إلى 3 أشهر <strong>للشركاء الأجانب غير الإداريين في الشركات بخلاف الشركات المساهمة</li>



<li><strong>يجوز منح الموظفين العاملين في المصانع أو أحواض بناء السفن داخل MSB أو داخل MKE</strong> إعفاءً من تصاريح العمل طوال عقود عملهم.</li>
</ul><p>لا يتم إعفاء الأجانب المدرجين في هذه المقالة تلقائيًا من تصريح العمل. ويجب على هؤلاء الأجانب التقدم بطلب للحصول على الإعفاء. شروط وإجراءات التقديم موضحة في بقية المقال.</p><p>يجب على الأجانب الذين لا يلتزمون بهذه المواد التقدم بطلب للحصول على تصريح عمل عام. يمكنك قراءة مقالتنا حول "تصريح العمل الأجنبي" حول هذا الموضوع.</p>`,
  },
  {
    title: "كيفية التقدم بطلب الإعفاء من تصريح العمل؟",
    content: `<p>يتم استقبال طلب الإعفاء من تصريح العمل عن طريق التقديم عبر نظام الإعفاء الإلكتروني. </p><p>إذا كان الأجنبي الذي سيتقدم بطلب الإعفاء من تصريح العمل موجودًا في الدولة</strong>إذا كان لديه رقم تعريف أجنبي يبدأ بـ 99، فسوف يقوم بالدخول إلى النظام عبر الحكومة الإلكترونية. إذا لم يكن لدى الأجنبي رقم هوية، فإنه يقوم بتسجيل الدخول إلى النظام باستخدام معلومات جواز سفره. </p><p>إذا كان الأجنبي الذي سيتقدم بطلب للحصول على إعفاء تصريح العمل موجودًا في الخارج، فسوف يتقدم بطلب إلى مكتب التمثيل الأجنبي التركي في البلد الذي يتواجد فيه ويحصل على رقم مرجعي. ويمكنه بعد ذلك تسجيل الدخول إلى النظام بالرقم المرجعي الممنوح له.</p><p>ويكتمل الطلب عند استكمال الخطوات اللازمة من خلال نظام الإعفاء الإلكتروني ورفع المستندات على النظام. بعد هذه المرحلة تقوم الوزارة بتقييم الطلب. سيتم قبول الطلب إذا كان الأجنبي الذي يتقدم بطلب الإعفاء من بين الأجانب المتوقع منحهم الإعفاء بموجب القانون واللائحة، ويتم تحميل المستندات بالكامل على النظام ويتوافق الطلب مع سياسة العمل الدولية.</p><p>يتم إصدار شهادة إعفاء من تصريح العمل للأجانب الذين يتم قبول طلباتهم. الأشخاص الذين يريدون تنفيذ المعاملة الخاضعة للرسوم ملزمون بدفع دفعات الإعفاء من تصريح العمل. يتم إرسال بريد إلكتروني إلى الأجنبي الذي يتقدم بطلب لدفع رسوم الورق القيمة والرسوم. يجب دفع الرسوم الجمركية والرسوم الورقية خلال <strong>30 يومًا</strong>من إرسال هذا البريد الإلكتروني. وإلا سيتم رفض الطلب ولا يمكن الاعتراض على هذا القرار.</p><p>إذا كانت فترة الإعفاء <strong>3 أشهر أو أكثر</strong>، فيجب دفع رسوم إصدار المستند وتكلفة الورق القيم. إذا كانت فترة صلاحية الإعفاء <strong>أقل من 3 أشهر</strong>، فلن يتم فرض أي رسوم، وإذا طلب مقدم الطلب إصدار مستند، فسيكون دفع رسوم الورق القيمة فقط كافيًا.</p><p>يجب تقديم الطلبات المقدمة من داخل الدولة خلال <strong>30 يومًا</strong>من دخول الأجنبي إلى Türkiye. سيتم رفض الطلبات المقدمة بعد هذه الفترة.</p>المستندات المطلوبة للإعفاء من تصريح العمل<p>المستندات المطلوبة للإعفاء من تصريح العمل هي كما يلي:</p><ul>
<li>صورة بيومترية للأجنبي، </li>



<li>جواز سفر صالح أو وثيقة بديلة لجواز السفر، </li>



<li>معلومات التعليم ومكان العمل، إن وجدت، والمستندات الداعمة ذات الصلة</li>
</ul><p>يجب رفع هذه المستندات على النظام عند التقديم عبر طلب الإعفاء الإلكتروني. بالإضافة إلى ذلك، يجب تحميل المستندات التي تثبت حالة الأجنبي حسب نوع الإعفاء المطلوب الحصول عليه.</p><p>للحصول على شهادة الإعفاء من تصريح العمل، يجب استيفاء المعايير المحددة في التشريعات ويجب استكمال المستندات اللازمة. إلا أن استيفاء كافة هذه الشروط لا يكفي للحصول على شهادة الإعفاء. وبالإضافة إلى ذلك، يجب تنفيذ الإجراءات الإجرائية بشكل صحيح. وإلا سيتم رفض الطلب حتى لو كان يعتقد أن جميع الشروط مستوفاة. وبهذا المعنى، سيكون من المفيد استشارة محامٍ أجنبي خبير في مجاله من أجل تنفيذ العملية بفعالية وسرعة. </ص>`,
  },
  {
    title: "ما هي مدة الإعفاء من تصريح العمل؟",
    content: `<p>يُمنح الإعفاء من تصريح العمل لكل مجموعة من الأجانب للمدة التي يطلبونها، على ألا تتجاوز الفترات المنصوص عليها في المادة 48 من اللائحة ذات الصلة. </p><p>لا يمكن تمديد الإعفاء من تصريح العمل. ولهذا السبب، من المفيد طلب الإعفاء للمدة المطلوبة، وعادةً ما تكون المدة القصوى.</p>`,
  },
  {
    title: "ما المدة التي يستغرقها إنهاء طلب الإعفاء من تصريح العمل؟",
    content: `<p>يتم الانتهاء من طلبات الإعفاء من تصريح العمل في غضون <strong>30 يومًا في المتوسط</p>.`,
  },
  {
    title: "تكاليف طلب الإعفاء من تصريح العمل",
    content: `<p>تكاليف طلب الإعفاء من تصريح العمل والرسوم والأوراق القيمة. الرسوم التي تختلف حسب فترة الإعفاء هي 3090 ليرة تركية عن كل سنة من فترة الإعفاء. وفي هذا السياق تكون رسوم الرسوم حسب فترات الإعفاء كما يلي:</p><ul>
<li>3090 ليرة تركية للإعفاءات لمدة سنة واحدة أو أقل، </li>



<li>6180 ليرة تركية للإعفاءات ما بين 1-2 سنة، </li>



<li>9270 ليرة تركية لمدة 2-3 سنوات، </li>



<li>12360 ليرة تركية لمدة 3-4 سنوات، </li>



<li>لمدة 4-5 سنوات تبلغ التكلفة 15450 ليرة تركية. </لي>
</ul><p>تكلفة الورق الثمين هي 356 ليرة تركية في عام 2023. كل هذه المبالغ صالحة لعام 2023.</p><p>الإعفاءات من تصريح العمل لمدة تقل عن 3 أشهر لا تخضع للرسوم. بالإضافة إلى ذلك، إذا لم يتم طلب شهادة الإعفاء، فلا داعي لدفع الرسوم الورقية القيمة.</p>`,
  },
  {
    title: "رفض طلب الإعفاء من تصريح العمل والاعتراض على الرفض وقضية الإلغاء",
    content: `<p>سيتم رفض طلبات الإعفاء من تصريح العمل المقدمة من غير الأجانب الذين يمكن منحهم إعفاء من تصريح العمل، أو الذين يخالفون التشريع أو الذين لا يستوفون شروط الطلب الأخرى. يتم تنظيم أسباب الرفض في المادة 52 من لائحة تنفيذ قانون العمل الدولي ويتم رفض الطلبات التالية:</p><ul>
<li>مصنوعة من قبل أجانب لا يدخلون في نطاق الإعفاء</li>



<li>خلافًا لسياسة العمل الدولية،</li>



<li>مصنوعة من قبل أجانب يعتبرون غير آمنين للعمل في Türkiye لأسباب تتعلق بالأمن القومي أو النظام العام أو لأسباب تتعلق بالصحة العامة،</li>



<li>مصنوع من قبل أجانب صدر ضدهم قرار ترحيل</li>



<li>مصنوع من قبل أجانب لن يسمح لهم بدخول Türkiye</li>



<li>مصنوعة بمستندات مزيفة أو مضللة،</li>



<li>يتم إجراؤه للوظائف المخصصة فقط للمواطنين الأتراك في التشريع،</li>



<li>تم تقديمه من قبل مواطني الدول التي لا تعترف بها الجمهورية التركية أو ليس لديها علاقات دبلوماسية معها، (ومع ذلك، قد يتم قبول طلب الإعفاء لهؤلاء الأشخاص إذا تلقت وزارة الخارجية الرأي المناسب.)</li>



<li>في حالة تقديم الطلب محليًا، لا يتم تقديمه خلال<strong>30 يومًا</strong> من دخول الأجنبي إلى Türkiye،</li>



<li>سيتم رفض الطلبات المقدمة بالمخالفة للقانون رقم 6735 أو اللائحة التنفيذية لهذا القانون.</li>
</ul><p>إذا كان طلب الإعفاء من تصريح العمل مستوفياً لأحد الأسباب المذكورة أعلاه، فسيتم رفض الطلب. يتم إبلاغ مقدم الطلب برفض تصريح العمل عبر عنوان البريد الإلكتروني الذي سجله في النظام عند التقديم. </p><p>ويمكن الاعتراض على هذا القرار عبر نظام الإعفاء الإلكتروني خلال 30 يومًا من تاريخ الإبلاغ بقرار الرفض.</strong> كما يمكن رفع دعوى الإلغاء المباشر خلال 60 يومًا من اليوم التالي للإخطار بقرار الرفض. إذا تم تقديم اعتراض من قبل، يحق للشخص رفع دعوى إلغاء إذا تم رفض الاعتراض.</p><p>تم تضمين معلومات أكثر تفصيلاً حول الاعتراض وإجراءات الإلغاء ضد رفض طلب الإعفاء من تصريح العمل في المقالة التي تحمل عنوان "رفض طلب تصريح العمل".</p>إمكانية إعادة الطلب بعد قرار الرفض<p>يمكن للأجنبي الذي تم رفض طلب الإعفاء من تصريح العمل إعادة التقدم بطلب للحصول عليه الإعفاء. ومع ذلك، من المتوقع أن تكون هناك فترة انتظار <strong>12 شهرًا</strong> لتقديم طلب الإعفاء مرة أخرى. تبدأ هذه الفترة من تاريخ إشعار الأجنبي برفض طلب الإعفاء. فترة الانتظار لمقدمي الخدمات عبر الحدود هي <strong>6 أشهر</p>.`,
  },
  {
    title: "إلغاء الإعفاء من تصريح العمل والاعتراض على الإلغاء وحالة الإلغاء",
    content: `<p>يمكن إلغاء الإعفاء من تصريح العمل بناء على طلب الأجنبي أو صاحب العمل. وبصرف النظر عن هذا، فإن المادة 56 من لائحة تنفيذ قانون العمل الدولي تنظم أسباب الإلغاء. وبحسب اللائحة فإن أسباب إلغاء الإعفاء من تصريح العمل هي كما يلي:</p><ul>
<li>لا يدخل الأجنبي إلى Türkiye خلال <strong>6 أشهر</strong> من بداية فترة الإعفاء،</li>



<li>بينما لا تزال فترة الإعفاء سارية، لا ينبغي تمديد جواز السفر أو وثيقة بديل جواز السفر حتى لو انتهت صلاحيتها، (ولكن إذا رأت وزارة الداخلية أو وزارة الخارجية أن الوضع مناسب، فلن يتم إلغاء الإعفاء).</li>



<li>تم اتخاذ قرار بترحيل الأجنبي أو من المفهوم أنه قد تم اتخاذ هذا القرار،</li>



<li>الأجنبي من بين الذين لن يسمح لهم بدخول Türkiye</li>



<li>اكتشاف أن الطلب تم تقديمه باستخدام مستندات مزيفة أو مضللة،</li>



<li>إنهاء عقد العمل لأي سبب من الأسباب،</li>



<li>القرار بأن العمل مخالف للتشريع،</li>



<li>أسباب الإلغاء هي إذا كان عمل الأجنبي في Türkiye يعتبر خطيرًا من حيث الأمن القومي أو النظام العام أو الصحة العامة.</li>
</ul><p>في حالة إلغاء تصريح الإعفاء يجب تقديم شهادة الإعفاء من تصريح العمل إلى الوزارة خلال<strong>15 يوم</strong> من الإلغاء.</p><p>في حالة إلغاء تصريح الإعفاء يحق للأجنبي الاعتراض ورفع دعوى إلغاء. الإجراء الواجب اتباعه للحصول على الحق في رفع دعوى الإلغاء والاعتراض هو نفس الإجراء الخاص برفض الإعفاء من تصريح العمل كما هو موضح أعلاه. </p><p>مزيد من المعلومات التفصيلية حول الاعتراض على إلغاء الإعفاء من تصريح العمل ورفع دعوى الإلغاء متضمنة في المقالة التي تحمل عنوان "رفض طلب تصريح العمل".</p>`,
  },
  {
    title: "خاتمة",
    content: `<p>الإعفاء من تصريح العمل له لائحة مفصلة في التشريع. أي قصور في شروط الطلب أو الإجراءات الإجرائية سيؤدي إلى رفض طلب تصريح الإعفاء. وفي هذا السياق، ينبغي الحرص على التأكد من استيفاء المعايير اللازمة وتنفيذ الإجراءات الإجرائية بشكل صحيح. لذلك، فإن استشارة محامٍ أجنبي خبير في مجاله منذ بداية العملية سيكون مفيدًا لضمان تنفيذ إجراءات الحصول على تصريح الإعفاء بشكل صحيح.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Освобождение от разрешения на работу",
    content: `<p>Освобождение от разрешения на работу - это документ, необходимый иностранцам для работы, проживания и многократного въезда и выезда в Türkiye без разрешения на работу. Данный документ выдается лицам, соответствующим условиям, указанным в соответствующем Положении.</p>`,
  },
  {
    title: "Что такое освобождение от разрешения на работу?",
    content: `<p>Освобождение от разрешения на работу - это документ об освобождении, который позволяет иностранцам, не имеющим разрешения на работу, работать, проживать и совершать многократный въезд и выезд в Türkiye. Разрешение на работу в освобожденном виде может быть выдано Министерством труда и социальной защиты только от имени лиц, указанных в законодательстве.</p>`,
  },
  {
    title: "Какие иностранцы освобождаются от разрешения на работу?",
    content: `<p>Группы иностранцев, обладающие квалификацией, указанной в статье 48 Положения о применении международного трудового законодательства, освобождаются от разрешений на работу. Согласно постановлению, иностранцы, которые будут освобождены от разрешений на работу:</p><ул>
<li><strong>До 1 месяца для иностранцев, которые будут работать в сфере науки, культуры и искусства</li>



<li>До 3 месяцев для иностранцев, которые будут <strong>проводить обучение</strong> по товарам и услугам, экспортируемым или импортируемым в Türkiye, или по использованию, техническому обслуживанию или ремонту машин и систем, импортированных в Türkiye,</li>



<li>До 3 месяцев для иностранцев, проживающих за рубежом, которые, по мнению министерства, имеют <strong>турецкое происхождение</strong>,</li>



<li><strong>До 3 месяцев для тех, кто занимается спортом</strong>,</li>



<li>До 4 месяцев для иностранцев, которые будут проходить стажировку в рамках университетских программ международного обмена студентами (Erasmus, AIASEC, Farabi и т.д.), до 12 месяцев, если эти программы обмена одобрены Генеральным управлением международной рабочей силы,</li>



<li>До 6 месяцев для иностранцев, которые будут работать на сезонных работах в сельском хозяйстве и животноводстве, определенных Генеральным директоратом международной рабочей силы,</li>



<li>До 6 месяцев для иностранцев, которые заявлены соответствующими государственными учреждениями и организациями о внесении значительного вклада в Türkiye в области экономики, социально-культурных вопросов, технологий или образования,</li>



<li><strong>До 8 месяцев для иностранцев, которые будут работать представителями туроператора</strong>,</li>



<li>Иностранцы, которые будут работать за пределами сертифицированных туристических предприятий,<strong>будут работать на ярмарках и в цирках</strong> до шести месяцев,</li>



<li>С одобрения Министерства молодежи и спорта и TFF иностранные спортсмены, тренеры, физиотерапевты, массажисты и другой персонал, прибывающие в Türkiye по спортивной визе, в течение срока действия контракта со спортивными клубами Türkiye,</li>



<li>Для тех, кто работает в Türkiye в рамках соглашений о финансовом сотрудничестве между Türkiye и Европейским Союзом.</li>



<li><strong>Для иностранных моряков на судах, зарегистрированных в Турецком международном судовом реестре</strong>, но работающих за пределами каботажной линии, до истечения срока трудового договора,</li>



<li><strong>Иностранные студенты университетов, обучающиеся по программе формального образования в Türkiye и проходящие обязательную стажировку, в период стажировки</li>



<li>Те, кто являются государственными служащими дипломатических или консульских представительств иностранных государств в Türkiye</strong> на время исполнения ими своих обязанностей, а также те, кто работает по трудовому договору до окончания срока действия контракта.</li>



<li>Иностранцы, работающие в школах, учреждениях культуры и религиозных учреждениях, действующих в качестве филиалов дипломатических и консульских представительств иностранных государств в Türkiye, во время выполнения своих обязанностей,



<li><strong>Иностранцы, приезжающие в Türkiye для прохождения TUS или DUS</strong> во время учебы,</li>



<li><strong>До 1 месяца для международных поставщиков услуг.</li>



<li>До 3 месяцев для иностранных членов правления акционерных обществ, не проживающих в Türkiye.</li>



<li><strong>Иностранцы, специализирующиеся в области медицины или стоматологии</strong> во время обучения,</li>



<li><strong>Иностранный персонал, исследователи или менеджеры, которые будут работать в Турецко-японском университете науки и технологий</strong> во время трудового договора,</li>



<li>До 3 месяцев для <strong>неуправляющих иностранных партнеров компаний, не являющихся акционерными обществами.</li>



<li><strong>Сотрудникам, работающим на фабриках или верфях в рамках MSB или MKE</strong>, может быть предоставлено освобождение от разрешений на работу на протяжении всего их трудового договора.</li>
</ul><p>Иностранцы, перечисленные в этой статье, не освобождаются автоматически от разрешения на работу. Эти иностранцы должны подать заявление на освобождение. Условия и процедура подачи заявки описаны в остальной части статьи.</p><p>Иностранцы, которые не соблюдают эти статьи, должны подать заявление на получение общего разрешения на работу. Об этом вы можете прочитать в нашей статье «Разрешение на работу за рубежом».</p>`,
  },
  {
    title: "Как подать заявление на освобождение от разрешения на работу?",
    content: `<p>Заявление об освобождении от уплаты разрешений на работу можно получить, подав заявку через электронную систему исключений. </p><p>Если иностранец, который подаст заявку на освобождение от разрешения на работу, находится в стране</strong>Если у него есть иностранный идентификационный номер, начинающийся с 99, он войдет в систему через электронное правительство. Если у иностранца нет идентификационного номера, он входит в систему по своим паспортным данным. </p><p>Если иностранец, который подаст заявку на освобождение от разрешения на работу, находится за границей, он/она подаст заявление в иностранное представительство Türkiye в стране, в которой он/она находится, и получит ссылочный номер. После этого он может войти в систему, используя предоставленный ему ссылочный номер.</p><p>Заявление заполняется, когда необходимые шаги выполнены через систему электронного освобождения и документы загружены в систему. После этого этапа Министерство оценивает заявку. Заявление будет принято, если иностранец, подающий заявку на освобождение от уплаты налогов, входит в число иностранцев, которым в Законе и постановлениях предусмотрено освобождение, документы полностью загружены в систему и заявление соответствует международной трудовой политике.</p><p>Иностранцам, заявления которых приняты, выдается свидетельство об освобождении от разрешения на работу. Лица, которые хотят, чтобы сделка, облагаемая пошлиной, была осуществлена, обязаны уплатить платежи за освобождение от разрешения на работу. Иностранцу, который подает заявку на уплату ценной бумаги и пошлины, отправляется электронное письмо. Пошлина и плата за оформление документов должны быть оплачены в течение <strong>30 дней</strong> с момента отправки этого электронного письма. В противном случае заявка будет отклонена и против данного решения не может быть выдвинуто никаких возражений.</p><p>Если срок льготы составляет <strong>3 месяца и более</strong>, необходимо оплатить пошлину за выдачу документа и стоимость ценных бумаг. Если срок действия освобождения составляет <strong>менее 3 месяцев</strong>, плата не взимается, а если заявитель просит выдать документ, будет достаточно только оплаты пошлины за ценный документ.</p><p>Заявления, подаваемые внутри страны, должны быть поданы в течение <strong>30 дней</strong> с момента въезда иностранца в Türkiye. Заявки, поданные после этого периода, будут отклонены.</p>Необходимые документы для освобождения от разрешения на работу<p>Для освобождения от разрешения на работу необходимы следующие документы:</p><ul>
<li>Биометрическая фотография иностранца,</li>



<li>Действительный паспорт или документ, заменяющий паспорт, </li>



<li>Информация об образовании и рабочем месте, если таковая имеется, а также соответствующие подтверждающие документы.</li>
</ul><p>Эти документы необходимо загрузить в систему при подаче заявления на получение электронного освобождения. Кроме того, документы, подтверждающие статус иностранца, должны быть загружены в соответствии с типом запрашиваемого освобождения.</p><p>Чтобы получить свидетельство об освобождении от разрешения на работу, должны быть соблюдены критерии, указанные в законодательстве, и необходимые документы должны быть заполнены. Однако выполнения всех этих условий недостаточно для получения свидетельства об освобождении от уплаты налогов. Кроме того, процессуальные процедуры должны быть проведены надлежащим образом. В противном случае заявка будет отклонена, даже если считается, что все условия соблюдены. В этом смысле было бы полезно проконсультироваться с юристом-иностранцем, который является экспертом в своей области, чтобы провести процесс эффективно и быстро. </p>`,
  },
  {
    title: "На какой срок предоставляется освобождение от разрешения на работу?",
    content: `<p>Освобождение от разрешения на работу предоставляется каждой группе иностранцев на период, который они запрашивают, при условии, что он не превышает периоды, предусмотренные статьей 48 соответствующего Постановления. </p><p>Исключение из разрешения на работу не может быть продлено. По этой причине полезно запросить освобождение на необходимый период, обычно даже на максимальный период.</p>`,
  },
  {
    title: "Сколько времени занимает оформление заявления об освобождении от разрешения на работу?",
    content: `<p>Заявления об освобождении от уплаты разрешений на работу рассматриваются в среднем в течение <strong>30 дней</p>.`,
  },
  {
    title: "Расходы на получение разрешения на работу",
    content: `<p>Расходы на получение разрешения на работу, сборы и ценные документы. Плата, которая варьируется в зависимости от периода освобождения, составляет 3090 TL за каждый год периода освобождения. В этом контексте размер пошлины в зависимости от периода освобождения составляет следующее:</p><ul>
<li>3090 TL за освобождение от налога сроком на 1 год или менее. </li>



<li>6180 TL за освобождение от налога на срок 1–2 года. </li>



<li>9270 турецких лир на 2–3 года.</li>



<li>12360 турецких лир на 3–4 года.</li>



<li>На 4-5 лет это 15450 TL. </li>
</ul><p>Стоимость ценной бумаги в 2023 году составляет 356 TL. Все эти суммы действительны на 2023 год.</p><p>Освобождение от разрешения на работу на срок менее 3 месяцев не облагается пошлиной. Кроме того, если сертификат об освобождении не запрашивается, нет необходимости платить пошлину за ценную бумагу.</p>`,
  },
  {
    title: "Отклонение заявления на освобождение от разрешения на работу, возражение против отклонения и случай отмены",
    content: `<p>Заявки на освобождение от разрешения на работу, поданные теми, кто не является иностранцами, которым может быть предоставлено освобождение от разрешения на работу, которые противоречат законодательству или не соответствуют другим условиям заявления, будут отклонены. Причины отклонения регулируются статьей 52 Положения о применении международного трудового законодательства, и следующие заявки отклоняются:</p><ul>
<li>Сделано иностранцами, на которых не распространяется освобождение.</li>



<li>Вопреки международной трудовой политике</li>



<li>Сделано иностранцами, работа которых в Türkiye считается небезопасной по соображениям национальной безопасности, общественного порядка или общего состояния здоровья.</li>



<li>Сделано иностранцами, в отношении которых имеется решение о депортации.</li>



<li>Сделано иностранцами, которым не будет разрешен въезд в Türkiye.</li>



<li>Сделано на основе фальшивых или вводящих в заблуждение документов.</li>



<li>Проводится для должностей, которые по законодательству предназначены только для граждан Türkiye.</li>



<li>Сделано гражданами стран, которые Турецкая Республика не признает или с которыми не имеет дипломатических отношений (Однако заявление этих лиц об освобождении от уплаты налогов может быть принято, если Министерство иностранных дел получит соответствующее заключение.)</li>



<li>Если заявление подано внутри страны, оно не подается в течение <strong>30 дней</strong> с момента въезда иностранца в Türkiye.</li>



<li>Заявки, поданные с нарушением Закона № 6735 или положений настоящего Закона, будут отклонены.</li>
</ul><p>Если заявка на освобождение от разрешения на работу соответствует одной из причин, перечисленных выше, заявка будет отклонена. Об отказе в разрешении на работу заявитель уведомляется по адресу электронной почты, который он зарегистрировал в системе при подаче заявления. </p><p>Против этого решения можно подать возражение через электронную систему исключений в течение 30 дней с момента уведомления о решении об отказе.</strong> Кроме того, иск о прямой отмене может быть подан в течение 60 дней со дня, следующего за днем ​​​​уведомления о решении об отказе. Если возражение было подано ранее, лицо имеет право подать заявление об аннулировании, если возражение отклонено.</p><p>Более подробная информация о возражении и действиях по аннулированию отклонения заявления об освобождении от разрешения на работу включена в статью «Отклонение заявления об освобождении от разрешения на работу».</p>Возможность повторной подачи заявления после решения об отказе<p>Иностранец, чье заявление об освобождении от разрешения на работу было отклонено, может повторно подать заявление на освобождение. Однако для повторной подачи заявления на освобождение предусмотрен период ожидания в <strong>12 месяцев</strong>. Этот период начинается с момента уведомления иностранца о том, что заявление об освобождении от уплаты налогов отклонено. Период ожидания для трансграничных поставщиков услуг составляет <strong>6 месяцев</p>.`,
  },
  {
    title: "Отмена освобождения от разрешения на работу, возражение против отмены и случай отмены",
    content: `<p>Освобождение от разрешения на работу может быть отменено по требованию иностранца или его работодателя. Кроме того, статья 56 Положения о применении международного трудового права регулирует причины расторжения. Согласно постановлению, причинами отмены освобождения от разрешения на работу являются:</p><ul>
<li>Иностранец не въезжает в Türkiye в течение <strong>6 месяцев</strong> с начала периода освобождения,</li>



<li>Пока срок действия льготы еще действителен, паспорт или документ, заменяющий паспорт, не должен продлеваться, даже если срок его действия истек (но если Министерство внутренних дел или Министерство иностранных дел сочтут ситуацию подходящей, освобождение не будет отменено).</li>



<li>Принято решение о депортации иностранца или считается, что это решение принято,</li>



<li>Иностранец входит в число тех, кому не будет разрешен въезд в Türkiye.</li>



<li>Обнаружение того, что заявка была подана с использованием фальшивых или вводящих в заблуждение документов.</li>



<li>Увольнение по любой причине.</li>



<li>Определение того, что работа противоречит законодательству.</li>



<li>Причиной отмены является то, что работа иностранца в Türkiye считается опасной с точки зрения национальной безопасности, общественного порядка или общего состояния здоровья.</li>
</ul><p>В случае отмены разрешения на освобождение, свидетельство об освобождении от разрешения на работу должно быть представлено в Министерство в течение <strong>15 дней</strong> с момента аннулирования.</p><p>В случае отмены разрешения на освобождение иностранец имеет право возразить и подать иск об аннулировании. Процедура, которой необходимо следовать для получения права подать иск об аннулировании и возражения, такая же, как и в случае отказа в освобождении от уплаты разрешений на работу, как описано выше. </p><p>Более подробная информация о возражении против отмены освобождения от разрешения на работу и подаче иска об отмене разрешения содержится в статье «Отказ в выдаче разрешения на работу».</p>`,
  },
  {
    title: "Заключение",
    content: `<p>Освобождение от разрешения на работу имеет подробное регулирование в законодательстве. Любые недостатки в условиях подачи заявления или процедурных процедурах приведут к отклонению заявления на получение разрешения на освобождение. В этом контексте следует позаботиться о том, чтобы необходимые критерии были соблюдены и процессуальные процедуры проводились правильно. Поэтому консультация с юристом-иностранцем, который является экспертом в своей области, с самого начала процесса будет полезна, чтобы гарантировать правильное выполнение процедур получения разрешения на освобождение.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "معافیت مجوز کار",
    content: `<p>معافیت مجوز کار مدرکی است که برای اتباع خارجی برای کار، اقامت و چندین بار ورود و خروج در Türkiye بدون داشتن مجوز کار لازم است. این سند به افرادی داده می شود که دارای شرایط مشخص شده در آیین نامه مربوطه باشند.</p>`,
  },
  {
    title: "معافیت مجوز کار چیست؟",
    content: `<p>معافیت مجوز کار یک سند معافیت است که به خارجی هایی که مجوز کار ندارند اجازه می دهد تا کار، اقامت و چندین بار ورود و خروج در Türkiye انجام دهند. معافیت پروانه کار توسط وزارت کار و تامین اجتماعی فقط از طرف اشخاصی که در قانون مشخص شده است صادر می شود.</p>`,
  },
  {
    title: "کدام خارجی ها از مجوز کار معاف هستند؟",
    content: `<p>گروه های افراد خارجی با شرایط مندرج در ماده 48 آیین نامه اجرای قانون بین المللی کار از مجوز کار مستثنی هستند. طبق این آیین نامه، اتباع خارجی که از مجوز کار معاف می شوند عبارتند از:</p><ul>
<li><strong>حداکثر 1 ماه برای خارجیانی که در زمینه علم، فرهنگ و هنر فعالیت خواهند کرد</li>



<li>حداکثر 3 ماه برای خارجیانی که <strong>آموزش</strong> در مورد کالاها و خدمات صادر شده از Türkiye یا وارد شده به Türkiye یا استفاده، نگهداری یا تعمیر ماشین آلات و سیستم های وارداتی به Türkiye خواهند داد،</li>



<li>حداکثر 3 ماه برای خارجیان مقیم خارج از کشور که توسط وزارتخانه ها به عنوان <strong>ترکی تبار</strong> تعیین شده است،</li>



<li><strong>حداکثر 3 ماه برای کسانی که در فعالیت های ورزشی کار می کنند</strong>،</li>



<li>حداکثر 4 ماه برای خارجیانی که در محدوده برنامه های تبادل دانشجوی بین المللی دانشگاه (اراسموس، آیاسک، فارابی و غیره) کارآموزی خواهند کرد، در صورت تایید این برنامه های تبادلی توسط اداره کل نیروی کار بین المللی، حداکثر تا 12 ماه،</li>



<li>حداکثر 6 ماه برای خارجیانی که در مشاغل فصلی کشاورزی و دامپروری تعیین شده توسط اداره کل نیروی کار بین المللی کار خواهند کرد،</li>



<li>حداکثر 6 ماه برای خارجیانی که توسط مؤسسات و سازمان‌های دولتی مربوطه اعلام شده‌اند تا در زمینه‌های اقتصادی، مسائل اجتماعی-فرهنگی، فناوری یا آموزش کمک‌های قابل توجهی به Türkiye داشته باشند،</li>



<li><strong>حداکثر 8 ماه برای خارجیانی که به عنوان نماینده اپراتور تور کار خواهند کرد</strong>،</li>



<li>خارجیانی که خارج از مرزهای شرکت‌های گردشگری معتبر فعالیت خواهند کرد<strong>در نمایشگاه‌ها و سیرک‌ها</strong> حداکثر تا شش ماه کار خواهند کرد،</li>



<li>با تایید وزارت جوانان و ورزش و TFF، ورزشکاران، مربیان، فیزیوتراپ ها، ماساژورها و سایر پرسنل خارجی که در مدت قرارداد با باشگاه های ورزشی در Türkiye با ویزای ورزشی به Türkiye می آیند،</li>



<li>برای کسانی که در Türkiye در چارچوب قراردادهای همکاری مالی بین Türkiye و اتحادیه اروپا کار می کنند،</li>



<li><strong>برای دریانوردان خارجی در کشتی هایی که در ثبت کشتی بین المللی Türkiye ثبت شده اند</strong> اما خارج از خط کابوتاژ کار می کنند، تا زمان انقضای قرارداد کار،</li>



<li><strong>دانشجویان خارجی که در یک برنامه آموزشی رسمی در Türkiye ثبت نام کرده اند و دوره کارآموزی اجباری دارند، در طول دوره کارآموزی</li>



<li>کسانی که در طول مدت وظایف خود در نمایندگی های دیپلماتیک یا کنسولی کشورهای خارجی در Türkiye کارمند هستند و کسانی که تا پایان قرارداد تحت قرارداد کاری کار می کنند.</li>



<li>خارجیان شاغل در مدارس، مؤسسات فرهنگی و مؤسسات مذهبی که به عنوان واحدهای وابسته نمایندگی های دیپلماتیک و کنسولی کشورهای خارجی در Türkiye در حین انجام وظایف خود فعالیت می کنند،



<li><strong>خارجیانی که برای TUS یا DUS</strong> در طول تحصیل خود به Türkiye می آیند،</li>



<li><strong>حداکثر 1 ماه برای ارائه دهندگان خدمات فرامرزی</li>



<li>حداکثر 3 ماه برای اعضای هیئت مدیره خارجی شرکت های سهامی که در Türkiye اقامت ندارند،</li>



<li><strong>خارجیان متخصص در پزشکی یا دندانپزشکی</strong> در طول تحصیل،</li>



<li><strong>کارکنان، محققان یا مدیران خارجی که در طول قراردادهای کاری خود در دانشگاه علم و فناوری Türkiye-ژاپن کار خواهند کرد،</li>



<li>حداکثر 3 ماه برای <strong>شرکای خارجی غیرمدیریت شرکتهای غیر از شرکتهای سهامی</li>



<li><strong>کارمندانی که در کارخانه‌ها یا کارخانه‌های کشتی‌سازی در MSB یا MKE کار می‌کنند</strong> ممکن است در طول قراردادهای کاری خود از مجوز کار معاف شوند.</li>
</ul><p>خارجیان فهرست شده در این مقاله به طور خودکار از مجوز کار مستثنی نیستند. این اتباع خارجی باید برای معافیت اقدام کنند. شرایط و روش درخواست در ادامه مقاله توضیح داده شده است.</p><p>خارجیانی که این مواد را رعایت نمی کنند باید برای مجوز کار عمومی اقدام کنند. می توانید مقاله ما در مورد "اجازه کار خارجی" را در این مورد بخوانید.</p>`,
  },
  {
    title: "چگونه برای معافیت مجوز کار اقدام کنیم؟",
    content: `<p> درخواست معافیت پروانه کار با درخواست از طریق سامانه معافیت الکترونیکی دریافت می شود. </p><p>اگر خارجی که برای معافیت مجوز کار درخواست می کند در کشور باشد</strong>اگر دارای شماره شناسایی خارجی باشد که با 99 شروع می شود، از طریق دولت الکترونیک وارد سامانه می شود. اگر فرد خارجی شماره شناسایی نداشته باشد، با اطلاعات پاسپورت خود وارد سیستم می شود. </p><p>اگر خارجی که برای معافیت مجوز کار درخواست می کند در خارج از کشور باشد، به نمایندگی خارجی Türkiye کشوری که در آن است مراجعه کرده و شماره مرجع دریافت می کند. پس از آن می تواند با شماره مرجعی که به او داده شده وارد سامانه شود.</p><p>در صورتی که مراحل لازم از طریق سامانه معافیت الکترونیکی انجام شده و مدارک در سامانه بارگذاری شود، درخواست تکمیل می شود. پس از این مرحله، وزارت درخواست را ارزیابی می کند. در صورتی که خارجی متقاضی معافیت جزو خارجی هایی باشد که در قانون و مقررات برای معافیت پیش بینی شده است، مدارک به طور کامل در سیستم بارگذاری شده باشد و درخواست مطابق با سیاست بین المللی کار باشد، درخواست پذیرفته می شود.</p><p>گواهی معافیت مجوز کار برای خارجیانی که درخواست آنها پذیرفته می شود، صادر می شود. افرادی که مایل به انجام معامله مشمول کارمزد هستند، موظف به پرداخت معافیت پروانه کار می باشند. یک ایمیل برای خارجی ارسال می شود که برای پرداخت هزینه ارزشمند کاغذ و هزینه اقدام می کند. وظیفه و هزینه کاغذ باید ظرف <strong>30 روز</strong>از ارسال این ایمیل پرداخت شود. در غیر این صورت درخواست رد می شود و نمی توان نسبت به این تصمیم اعتراض کرد.</p><p>در صورتی که مدت معافیت <strong>۳ ماه یا بیشتر</strong> باشد، باید هزینه صدور سند و هزینه کاغذ با ارزش پرداخت شود. اگر مدت اعتبار معافیت <strong>کمتر از 3 ماه</strong> باشد، هیچ هزینه ای دریافت نمی شود و در صورت درخواست متقاضی برای صدور سند، تنها پرداخت هزینه ارزشمند کاغذ کافی خواهد بود.</p><p>برنامه هایی که از داخل کشور ارسال می شوند باید ظرف <strong>30 روز</strong>از زمان ورود فرد خارجی به Türkiye انجام شوند. درخواست‌هایی که پس از این مدت انجام شود رد می‌شود.</p>مدارک مورد نیاز برای معافیت از مجوز کار<p>مدارک مورد نیاز برای معافیت مجوز کار به شرح زیر است:</p><ul>
<li>عکس بیومتریک خارجی، </li>



<li>گذرنامه معتبر یا سند جایگزین پاسپورت، </li>



<li>اطلاعات تحصیلی و محل کار، در صورت وجود، و اسناد پشتیبان مرتبط</li>
</ul><p>این مدارک باید هنگام درخواست از طریق درخواست معافیت الکترونیکی در سامانه بارگذاری شوند. علاوه بر این، مدارکی که وضعیت فرد خارجی را ثابت می کند، باید با توجه به نوع معافیت درخواستی بارگذاری شود.</p><p>برای دریافت گواهی معافیت مجوز کار، باید ضوابط مندرج در قانون رعایت شود و مدارک لازم نیز کامل باشد. اما رعایت تمامی این شرایط برای اخذ گواهی معافیت کافی نیست. علاوه بر این، رویه های رویه ای باید به درستی انجام شود. در غیر این صورت حتی در صورت وجود تمامی شرایط، درخواست رد خواهد شد. از این نظر، مشورت با یک وکیل خارجی که در زمینه کاری خود متخصص است، مفید خواهد بود تا فرآیند را به طور موثر و سریع انجام دهید. </p>`,
  },
  {
    title: "معافیت مجوز کار چه مدت اعطا می شود؟",
    content: `<p>معافیت پروانه کار برای هر گروه از اتباع خارجی برای مدتی که درخواست می کنند اعطا می شود مشروط بر اینکه از مدت مقرر در ماده 48 آیین نامه مربوط تجاوز نکند. </p><p>معافیت مجوز کار قابل تمدید نیست. به همین دلیل، درخواست معافیت برای دوره مورد نیاز، معمولاً حتی حداکثر مدت، سودمند است.</p>`,
  },
  {
    title: "چه مدت طول می کشد تا درخواست معافیت از مجوز کار نهایی شود؟",
    content: `<p>برنامه‌های معافیت از مجوز کار به طور متوسط ​​در <strong>30 روز</p> به پایان می‌رسد.`,
  },
  {
    title: "هزینه های درخواست معافیت مجوز کار",
    content: `<p>هزینه های درخواست معافیت مجوز کار، هزینه ها و اوراق ارزشمند. این کارمزد که بسته به دوره معافیت متفاوت است، برای هر سال از دوره معافیت 3090 لیر لیر است. در این زمینه، کارمزدها با توجه به دوره های معافیت به شرح زیر است:</p><ul>
<li>3090 TL برای معافیت های 1 ساله یا کمتر، </li>



<li>6180 TL برای معافیت بین 1-2 سال، </li>



<li>9270 TL برای 2-3 سال، </li>



<li>12360 TL برای 3-4 سال، </li>



<li>برای 4-5 سال 15450 TL است. </li>
</ul><p>هزینه کاغذ با ارزش در سال 2023 356 لیر لیر است. همه این مبالغ برای سال 2023 معتبر است.</p><p>معافیت های مجوز کار برای کمتر از 3 ماه مشمول هزینه نمی شود. علاوه بر این، در صورت عدم درخواست گواهی معافیت، نیازی به پرداخت هزینه ارزشمند کاغذ نیست.</p>`,
  },
  {
    title: "رد درخواست معافیت پروانه کار، اعتراض به رد و پرونده انصراف",
    content: `<p>تقاضای معافیت از مجوز کار توسط افرادی که خارجی نیستند و می توانند معافیت مجوز کار را دریافت کنند، مخالف قانون هستند یا سایر شرایط درخواست را ندارند، رد خواهد شد. دلایل رد در ماده 52 آیین نامه اجرای قانون بین المللی کار تنظیم شده است و درخواست های زیر رد می شود:</p><ul>
<li>ساخته شده توسط خارجیانی که در محدوده معافیت نیستند،</li>



<li>برخلاف سیاست بین المللی کار،</li>



<li>ساخته شده توسط خارجیانی که به دلیل امنیت ملی، نظم عمومی یا دلایل سلامت عمومی برای کار در Türkiye ناامن تلقی می شوند،</li>



<li>ساخته شده توسط خارجیانی که علیه آنها تصمیم اخراج وجود دارد،</li>



<li>ساخته شده توسط خارجی هایی که اجازه ورود به Türkiye را ندارند،</li>



<li>ساخته شده با اسناد جعلی یا گمراه کننده،</li>



<li>برای مشاغلی انجام می شود که در قانون فقط برای شهروندان Türkiye محفوظ است،</li>



<li>ساخته شده توسط اتباع کشورهایی که جمهوری Türkiye آنها را به رسمیت نمی شناسد یا با آنها روابط دیپلماتیک ندارد، (البته درخواست معافیت این افراد در صورت دریافت نظر مناسب توسط وزارت امور خارجه پذیرفته می شود.)</li>



<li>در صورتی که درخواست در داخل کشور انجام شده باشد، ظرف<strong>30 روز</strong> از ورود فرد خارجی به Türkiye انجام نمی‌شود،</li>



<li>تقاضایی که بر خلاف قانون شماره 6735 یا آیین نامه اجرایی این قانون باشد رد خواهد شد.</li>
</ul><p>اگر درخواست معافیت مجوز کار یکی از دلایل ذکر شده در بالا را داشته باشد، درخواست رد خواهد شد. رد مجوز کار از طریق آدرس ایمیلی که هنگام درخواست در سامانه ثبت کرده است به اطلاع متقاضی می رسد. </p><p>از طریق سامانه معافیت الکترونیکی ظرف 30 روز پس از ابلاغ رای رد، می توان نسبت به این تصمیم اعتراض کرد.</strong> ضمناً ظرف 60 روز از روز پس از ابلاغ رای رد، دعوی ابطال مستقیم قابل طرح است. اگر قبلاً اعتراضی شده باشد، در صورت رد اعتراض، شخص حق دارد پرونده ابطال تشکیل دهد.</p><p>اطلاعات بیشتر در مورد اعتراض و اقدام ابطال در مورد رد درخواست معافیت پروانه کار در مقاله با عنوان «رد درخواست مجوز کار» آمده است.</p>احتمال درخواست مجدد درخواست کار خارجی درخواست معافیت رد شده است می توانید دوباره برای معافیت درخواست دهید. با این حال، برای درخواست مجدد معافیت، یک دوره انتظار<strong>۱۲ ماهه</strong> پیش بینی شده است. این مدت از زمانی شروع می شود که به خارجی اعلام شود درخواست معافیت رد شده است. دوره انتظار برای ارائه دهندگان خدمات فرامرزی <strong>6 ماه</p> است.`,
  },
  {
    title: "ابطال معافیت پروانه کار، اعتراض به ابطال و مورد ابطال",
    content: `<p>معافیت مجوز کار را می توان بنا به درخواست فرد خارجی یا کارفرما لغو کرد. علاوه بر این، ماده 56 آیین نامه اجرای قانون کار بین المللی دلایل لغو را تنظیم می کند. بر اساس آیین نامه، دلایل لغو معافیت پروانه کار به شرح زیر است:</p><ul>
<li>فردی خارجی ظرف <strong>6 ماه</strong> از آغاز دوره معافیت وارد Türkiye نمی‌شود،</li>



<li>تا زمانی که مدت معافیت هنوز معتبر است، گذرنامه یا سند جایگزین گذرنامه حتی با وجود تمام شده نباید تمدید شود، (اما اگر وزارت کشور یا وزارت امور خارجه شرایط را مناسب تشخیص دهند، معافیت لغو نمی شود.)</li>



<li>تصمیم برای اخراج خارجی گرفته شده است یا اینکه این تصمیم گرفته شده است،</li>



<li>این خارجی از جمله کسانی است که اجازه ورود به Türkiye را ندارند،</li>



<li>تشخیص اینکه برنامه با اسناد نادرست یا گمراه کننده ساخته شده است،</li>



<li>خاتمه کار به هر دلیلی،</li>



<li>تصمیم به اینکه کار خلاف قانون است،</li>



<li>دلایل لغو این است که کار یک خارجی در Türkiye از نظر امنیت ملی، نظم عمومی یا سلامت عمومی خطرناک تلقی شود.</li>
</ul><p>در صورت ابطال پروانه معافیت، گواهی معافیت پروانه کار باید ظرف<strong>۱۵ روز</strong>از تاریخ ابطال به وزارت تسلیم شود.</p><p>در صورت لغو مجوز معافیت، فرد خارجی حق اعتراض و طرح دعوی انصراف را دارد. رویه ای که برای حق طرح دعوی انصراف و اعتراض باید طی شود مانند رد معافیت پروانه کار است که در بالا توضیح داده شد. </p><p>اطلاعات بیشتر در مورد اعتراض به لغو معافیت پروانه کار و طرح دعوی ابطال در مقاله با عنوان "رد درخواست مجوز کار" آمده است.</p>`,
  },
  {
    title: "نتیجه گیری",
    content: `<p>معافیت مجوز کار دارای مقررات مفصلی در قانون است. هر گونه نقص در شرایط درخواست یا رویه های رویه ای منجر به رد درخواست مجوز معافیت می شود. در این زمینه باید دقت شود که معیارهای لازم رعایت شده و رویه های رویه ای به درستی انجام شود. بنابراین، مشاوره با یک وکیل خارجی که در زمینه کاری خود متخصص است از ابتدای فرآیند برای اطمینان از انجام صحیح مراحل اخذ مجوز معافیت مفید خواهد بود.</p>`,
  },
];

export const contentSlug = "calisma-izni-muafiyeti";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "Work Permit Exemption",
    excerpt: "Work permit exemption is the document required for foreigners to work, reside and make multiple entries and exits in Türkiye without having a work permit. B…",
    shortDescription: "Work permit exemption is the document required for foreigners to work, reside and make multiple entries and exits in Türkiye without having a work permit. B…",
    heroTitle: "Work Permit Exemption",
    heroSubtitle: "Work permit exemption is the document required for foreigners to work, reside and make multiple entries and exits in Türkiye without having a work permit. B…",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "الإعفاء من تصريح العمل",
    excerpt: "الإعفاء من تصريح العمل هو الوثيقة المطلوبة للأجانب للعمل والإقامة والقيام بعمليات دخول وخروج متعددة في Türkiye دون الحصول على تصريح عمل. ب…",
    shortDescription: "الإعفاء من تصريح العمل هو الوثيقة المطلوبة للأجانب للعمل والإقامة والقيام بعمليات دخول وخروج متعددة في Türkiye دون الحصول على تصريح عمل. ب…",
    heroTitle: "الإعفاء من تصريح العمل",
    heroSubtitle: "الإعفاء من تصريح العمل هو الوثيقة المطلوبة للأجانب للعمل والإقامة والقيام بعمليات دخول وخروج متعددة في Türkiye دون الحصول على تصريح عمل. ب…",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Освобождение от разрешения на работу",
    excerpt: "Освобождение от разрешения на работу - это документ, необходимый иностранцам для работы, проживания и многократного въезда и выезда в Türkiye без разрешения на работу. Б…",
    shortDescription: "Освобождение от разрешения на работу - это документ, необходимый иностранцам для работы, проживания и многократного въезда и выезда в Türkiye без разрешения на работу. Б…",
    heroTitle: "Освобождение от разрешения на работу",
    heroSubtitle: "Освобождение от разрешения на работу - это документ, необходимый иностранцам для работы, проживания и многократного въезда и выезда в Türkiye без разрешения на работу. Б…",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "معافیت مجوز کار",
    excerpt: "معافیت مجوز کار مدرکی است که برای اتباع خارجی برای کار، اقامت و چندین بار ورود و خروج در Türkiye بدون داشتن مجوز کار لازم است. ب…",
    shortDescription: "معافیت مجوز کار مدرکی است که برای اتباع خارجی برای کار، اقامت و چندین بار ورود و خروج در Türkiye بدون داشتن مجوز کار لازم است. ب…",
    heroTitle: "معافیت مجوز کار",
    heroSubtitle: "معافیت مجوز کار مدرکی است که برای اتباع خارجی برای کار، اقامت و چندین بار ورود و خروج در Türkiye بدون داشتن مجوز کار لازم است. ب…",
    sectionsJson: serializeServiceSections(faSections),
  },
};
