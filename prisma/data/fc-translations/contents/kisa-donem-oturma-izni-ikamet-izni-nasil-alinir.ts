import type { ServiceContentSection } from "../../../../src/lib/service-page";
import { serializeServiceSections } from "../../../../src/lib/service-page";
import type { ForeignConsultancyTranslations } from "../../../../src/lib/i18n/foreign-consultancy/translations";

const enSections: ServiceContentSection[] = [
  {
    title: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
    content: `<p>Regulations on foreigners' residence (ikamet) and visa procedures in Türkiye are set out in the Law on Foreigners and International Protection. The law regulates more than one type of residence permit for foreigners in Türkiye. The short-term residence permit, commonly known as a residence permit, grants foreign nationals who are not Turkish citizens the right to remain in Türkiye for a specified period through authorization by the competent legal authorities. These permits may be granted for various purposes and grounds.</p>
<p>A residence permit is the legal document that must be obtained from the provincial directorate of migration management where the foreign national is located, determining the period during which the foreign national may remain in Türkiye, for every foreign national who will stay in Türkiye for more than the period granted by a visa or visa exemption or for more than ninety (90) days. Foreign nationals must obtain a residence permit to remain in Türkiye during periods not covered by their visa validity.</p>
<p>The short-term residence permit is the most frequently applied-for type of residence permit because it is easier to obtain than the other residence permits regulated in the Law on Foreigners and International Protection.</p>`,
  },
  {
    title: "Who Can Apply for a Short-Term Residence Permit?",
    content: `<p>Provisions on foreigners who may apply for a short-term residence permit are regulated in Article 31 of the <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6458.pdf">Law on Foreigners and International Protection</a>. Accordingly, the following foreigners may apply for a short-term residence permit:</p>
<ul><li><p>Those coming to Türkiye for scientific research.</p></li>
<li><p>Those who own immovable property in Türkiye.</p></li>
<li><p>Those who will establish commercial connections or a business in Türkiye.</p></li>
<li><p>Those who will participate in in-service training programs in Türkiye.</p></li>
<li><p>Those coming for education or similar purposes under agreements to which the Republic of Türkiye is a party or under student exchange programs.</p></li>
<li><p>Those who will stay in Türkiye for tourism.</p></li>
<li><p>Those who will receive treatment provided they do not carry a disease classified as a threat to public health.</p></li>
<li><p>Those who must remain in Türkiye at the request or decision of judicial or administrative authorities.</p></li>
<li><p>Those transitioning from a family residence permit to a short-term residence permit.</p></li>
<li><p>Those who will attend Turkish language courses.</p></li>
<li><p>Those who will participate in education, research, internship, and courses in Türkiye through public institutions.</p></li>
<li><p>Those who have completed higher education in Türkiye and apply within six months from the date of graduation.</p></li>
<li><p>Those who will invest within the scope and amount to be determined by the President without working in Türkiye, and their foreign spouse and their or their spouse's minor or dependent foreign children.</p></li>
<li><p>Citizens of the Turkish Republic of Northern Cyprus.</p></li></ul>
<p>Foreign nationals with these qualifications must, where deemed necessary, prove these conditions with documents. Foreign nationals coming for these reasons must also meet residence conditions appropriate to these qualifications.</p>
<p>For detailed information on this subject, see our article titled "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>How to Apply for a Residence Permit (İkamet İzni)?</u></strong></a>".</p>`,
  },
  {
    title: "Conditions for a Short-Term Residence Permit",
    content: `<p>The conditions for a short-term residence permit are regulated in Article 32 of the Law on Foreigners and International Protection. Accordingly:</p>
<ul><li><p>Being one of the foreigners listed above for whom a residence permit may be granted.</p></li>
<li><p>Not being among foreigners whose entry to Türkiye is not permitted.</p></li>
<li><p>Having accommodation conditions that comply with general health and safety standards.</p></li>
<li><p>Where requested, submitting a document showing a criminal record issued by the competent authorities of the country of which they are a citizen or where they legally reside.</p></li>
<li><p>Providing address information for their stay in Türkiye.</p></li></ul>
<p>Foreigners whose entry to Türkiye is not permitted are regulated in Article 7 of Law No. 6458. The relevant provision states in direct quotation:</p>
<p><em>"(1) The following foreigners are treated as inadmissible passengers and are not permitted to enter Türkiye and are turned back:</em><br><em>a) Those without a passport, passport-substitute document, visa, or residence or work permit, or those found to have obtained these documents or permits by fraudulent means or to hold forged documents<br>b) Those without a passport or passport-substitute document valid for at least sixty days from the expiry of their visa, visa exemption, or residence permit period"</em></p>`,
  },
  {
    title: "Duration of a Short-Term Residence Permit",
    content: `<p>Except in exceptional cases, a short-term residence permit may be granted each time for periods of at most <strong>two years</strong>.<br>The exceptions exempt from the two-year limit are as follows:</p>
<ul><li><p>Those who will invest within the scope and amount to be determined by the President without working in Türkiye, and their foreign spouse and their or their spouse's minor or dependent foreign children.</p></li>
<li><p>Citizens of the Turkish Republic of Northern Cyprus.</p></li></ul>
<p>Accordingly, short-term residence permits for the two groups listed above may be granted for periods of at most <strong>five years</strong>.</p>
<p>On the other hand, the duration limit is subject not only to annual limits but also to a limit on how many times a residence permit may be granted. Residence permits granted to those attending Turkish language courses may be granted at most <strong>twice</strong>.</p>
<p>For those who have completed higher education in Türkiye and apply within six months from the date of graduation, a residence permit may be granted <strong>once only</strong> and for a maximum period of one year.</p>`,
  },
  {
    title: "Where Is a Short-Term Residence Permit Application Made?",
    content: `<p>Under Article 21 of the Law on Foreigners and International Protection, applications for a short-term residence permit are made to <strong>consulates</strong> in the country of which the foreign national is a citizen or where they legally reside.</p>
<p>Consulates forward residence permit applications together with their opinions to the Directorate General of Migration Management. Where it deems necessary, the Directorate General obtains the opinions of relevant institutions and, after concluding the applications, informs the consulate to issue the residence permit or refuse the application.</p>
<p>Applications are concluded within at most <strong>ninety days</strong>, and decisions on residence permit applications are notified to the applicant.</p>`,
  },
  {
    title: "Extension of a Short-Term Residence Permit",
    content: `<p><strong>Extension</strong> applications for a short-term residence permit are made to governorships from sixty days before the expiry of the residence permit period and <strong>at the latest before the residence permit expires</strong>. In other words, governorships have authority to extend residence permits.</p>
<p>Foreign nationals applying to extend their residence permit are given a document not subject to a fee. These foreign nationals may continue to reside in Türkiye with this document until a decision is made on their application, even if their residence permit period has expired. Accordingly, foreign nationals who apply to extend their residence permit before it expires may continue their residence in Türkiye with the document issued to them.</p>`,
  },
  {
    title: "Refusal, Cancellation, or Non-Extension of a Short-Term Residence Permit",
    content: `<p>Article 33 of the Law on Foreigners and International Protection contains provisions on refusal, cancellation, and non-extension of short-term residence permits. Accordingly, a short-term residence permit is not granted, is cancelled if already granted, or is not extended upon expiry in the following cases:</p>
<ul><li><p>Failure to fulfill or cessation of one or more of the conditions for a short-term residence permit,</p></li>
<li><p>Determination that the residence permit is being used for a purpose other than that for which it was granted,</p></li>
<li><p>Existence of a valid deportation decision or entry ban to Türkiye.</p></li></ul><p></p>`,
  },
  {
    title: "Annulment Action Against Refusal of a short-term residence permit Application",
    content: `<p>As explained in detail above, applications for a short-term residence permit made by foreign nationals who meet the statutory conditions are examined by the administration and decided upon. In some cases, the administration may refuse these applications for various reasons. The grounds for refusal may include failure to meet the conditions set out in the legislation, application with incomplete or incorrect documents, or a refusal decision within the administration's discretionary authority.</p>
<p>Foreign nationals whose short-term residence permit application has been refused may bring an annulment action if they consider the refusal decision unlawful. These actions must be brought before the administrative court in the place where the authority that issued the decision is located. The period for bringing the action is 60 days from the date on which the refusal decision is notified to the person concerned.</p>
<p>Decisions of the administration refusing or accepting a short-term residence permit application are, in essence, administrative acts. Therefore, for administrative acts to be lawful, they must contain all the elements they are required to have. As explained in our article titled "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>Annulment of Administrative Acts</u></strong></a>", administrative acts in which at least one of the elements of purpose, subject, reason, authority, or form is found to be defective may be annulled by the court.</p>`,
  },
  {
    title: "Frequently Asked Questions",
    content: `<p><strong>Is There an Obligation to Hire a Lawyer in Administrative Courts?</strong></p>
<p>Turkish law allows parties to defend and represent themselves in court; hiring a lawyer for representation is not mandatory except in certain cases. There is no obligation to hire an administrative law lawyer in administrative courts either.<br>However, because administrative law legislation is complex and deadlines under the Administrative Procedure Law are strict and short, non-lawyers may make formal or substantive errors that cannot be remedied. To avoid loss of rights in the detailed administrative litigation process, we recommend obtaining legal support from lawyers practicing in "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>Administrative Law</u></strong></a>" before taking any step.</p><p><strong>How Long Do Short-Term Residence Permit Applications Take to Conclude?</strong></p>
<p>Short-term residence permit applications are concluded within at most ninety days from the date the application is processed.</p>
<p><strong>What Is the Maximum Duration of a Short-Term Residence Permit?</strong></p>
<p>As a rule, a short-term residence permit is granted for a maximum of 2 (two) years.</p>
<p><strong>When Does Conversion from a Family Residence Permit to a Short-Term Residence Permit Arise?</strong></p>
<p>Persons who have remained in Türkiye on a family residence permit for at least 3 years and have reached the age of 18, and persons who remained in Türkiye on a family residence permit as dependents of a supporter who has died, may request conversion of the family residence permit to a short-term residence permit.</p>
<p><strong>What Documents Are Required for a Short-Term Residence Permit?</strong></p>
<p>Residence Permit Application Form<br>Original and copy of passport or passport-substitute document<br>4 biometric (ICAO standard) photographs<br>Health insurance<br>Criminal record<br>Documents proving sufficient financial means for the period of the residence permit<br>Additional documents depending on the situation</p>
<p><strong>What Happens If Missing Documents Are Identified in a Short-Term Residence Permit Application?</strong></p>
<p>If missing documents are identified in a short-term residence permit application, the foreign national is notified which documents are missing and that the deficiencies must be remedied within 15 days. If the missing documents are not completed within 15 days, the application will not be evaluated and will be removed from processing.</p>
<p><strong>Where Are Short-Term Residence Permit Cards Obtained?</strong></p>
<p>All residence permit cards are printed by the Directorate General of Migration Management and sent to foreign nationals' addresses through PTT.</p>`,
  },
];

const arSections: ServiceContentSection[] = [
  {
    title: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
    content: `<p>تُنظم أحكام إجراءات الإقامة (ikamet) والتأشيرة للأجانb في Türkiye في قانون الأجانب والحماية الدولية. ينظم القانون أكثر من نوع لتصريح الإقامة. يمنح تصريح الإقامة قصير الأمد، المعروف باسم تصريح الإقامة، الأجانب غير المواطنين الأتراك الحق في البقاء في Türkiye لفترة محددة. قد تُمنح هذه التصاريح لأغراض وأسباب مختلفة.</p>
<p>تصريح الإقامة هو الوثيقة القانونية التي يجب الحصول عليها من مديرية الهجرة في مكان وجود الأجنبي، وتحدد المدة التي يجوز للأجنبي البقاء فيها في Türkiye، لكل أجنبي سيقيم في Türkiye أكثر من مدة التأشيرة أو الإعفاء منها أو أكثر من تسعين (90) يوماً. يجب على الأجانب الحصول على تصريح إقامة للبقاء في Türkiye في فترات لا تغطيها صلاحية التأشيرة.</p>
<p>تصريح الإقامة قصير الأمد هو أكثر أنواع تصاريح الإقامة طلباً لأنه أسهل في الحصول عليه من الأنواع الأخرى. قد تُمنح هذه التصاريح لأغراض وأسباب مختلفة مثل السياحة والتعليم والعلاج والاستثمار العقاري وغيرها.</p><p>يُنصح المتقدمون بالحصول على دعم قانوني من محامٍ متخصص في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>قانون الأجانب</u></strong></a> قبل تقديم الطلب، لضمان اكتمال المستندات وتقديمها بشكل صحيح وتجنب فقدان الحقوق في الإجراءات الإدارية.</p>`,
  },
  {
    title: "من يمكنه التقدم لتصريح إقامة قصير الأمد؟",
    content: `<p>تُنظم أحكام الأجانب الذين يمكنهم التقدم لتصريح إقامة قصير الأمد في المادة 31 من <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6458.pdf">قانون الأجانب والحماية الدولية</a>. وفقاً لذلك، يجوز للأجانb التالية التقدم لتصريح إقامة قصير الأمد:</p>
<ul><li><p>القادمون إلى Türkiye لأغراض البحث العلمي.</p></li>
<li><p>مالكو العقارات في Türkiye.</p></li>
<li><p>من سيؤسسون علاقات تجارية أو أعمالاً في Türkiye.</p></li>
<li><p>المشاركون في برامج التدريب أثناء الخدمة في Türkiye.</p></li>
<li><p>القادمون للتعليم أو أغراض مماثلة بموجب اتفاقيات تكون Türkiye طرفاً فيها أو بموجب برامج تبادل الطلاب.</p></li>
<li><p>الباقون في Türkiye لأغراض السياحة.</p></li>
<li><p>من سيتلقون العلاج شريطة ألا يحملوا مرضاً يُصنَّف تهديداً للصحة العامة.</p></li>
<li><p>من يجب بقاؤهم في Türkiye بناءً على طلب أو قرار السلطات القضائية أو الإدارية.</p></li>
<li><p>من ينتقلون من تصريح إقامة عائلي إلى تصريح إقامة قصير الأمد.</p></li>
<li><p>من سيحضرون دورات اللغة التركية.</p></li>
<li><p>من سيشاركون في التعليم والبحث والتدريب والدورات في Türkiye عبر مؤسسات عمومية.</p></li>
<li><p>من أكملوا التعليم العالي في Türkiye وقدموا خلال ستة أشهر من تاريخ التخرج.</p></li>
<li><p>من سيستثمرون ضمن النطاق والمبلغ اللذين يحددهما الرئيس دون العمل في Türkiye، وزوجهم الأجنبي وأطفالهم الأجانب القُصر أو التابعون لهم أو لزوجهم.</p></li>
<li><p>مواطنو الجمهورية التركية لشمال قبرص.</p></li></ul>
<p>يجب على الأجانب ذوي هذه الصفات، عند الاقتضاء، إثبات هذه الشروط بالمستندات. كما يجب على الأجانب القادمين لهذه الأسباب استيفاء شروط الإقامة المناسبة لهذه الصفات.</p>
<p>للحصول على معلومات تفصيلية، راجع مقالنا بعنوان "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>كيفية التقدم لتصريح إقامة (إkamet izni)؟</u></strong></a>".</p>`,
  },
  {
    title: "شروط تصريح الإقامة قصير الأمد",
    content: `<p>تُنظم شروط تصريح الإقامة قصير الأمد في المادة 32 من قانون الأجانب والحماية الدولية. وفقاً لذلك:</p>
<ul><li><p>أن يكون من الأجانب المذكورين أعلاه الذين يجوز منحهم تصريح إقامة.</p></li>
<li><p>ألا يكون من الأجانب الذين لا يُسمح بدخولهم إلى Türkiye.</p></li>
<li><p>توفير شروط سكن تتوافق مع معايير الصحة والسلامة العامة.</p></li>
<li><p>عند الطلب، تقديم مستند يُظهر السجل الجنائي صادراً عن السلطات المختصة في بلد الجنسية أو الإقامة القانونية.</p></li>
<li><p>تقديم معلومات العنوان للإقامة في Türkiye.</p></li></ul>
<p>يُنظم الأجانب الذين لا يُسمح بدخولهم إلى Türkiye في المادة 7 من القانون رقم 6458. ينص الحكم المعني حرفياً:</p>
<p><em>"(1) يُعامل الأجانب التالية كمسافرين غير مقبولين ولا يُسمح بدخولهم إلى Türkiye ويُعادون:</em><br><em>أ) من لا يملكون جواز سفر أو وثيقة بديلة أو تأشيرة أو تصريح إقامة أو عمل، أو من تبين أنهم حصلوا على هذه الوثائق أو التصاريح بطرق احتيالية أو يحملون وثائق مزورة</em><br><em>ب) من لا يملكون جواز سفر أو وثيقة بديلة سارية لمدة ستين يوماً على الأقل بعد انتهاء مدة التأشيرة أو الإعفاء منها أو تصريح الإقامة"</em></p>`,
  },
  {
    title: "مدة تصريح الإقامة قصير الأمد",
    content: `<p>باستثناء الحالات الاستثنائية، يجوز منح تصريح الإقامة قصير الأمد في كل مرة لمدة أقصاها <strong>سنتان</strong>.<br>الاستثناءات المعفاة من حد السنتين هي:</p>
<ul><li><p>من سيستثمرون ضمن النطاق والمبلغ اللذين يحددهما الرئيس دون العمل في Türkiye، وزوجهم الأجنبي وأطفالهم الأجانب القُصر أو التابعون.</p></li>
<li><p>مواطنو الجمهورية التركية لشمال قبرص.</p></li></ul>
<p>وبناءً عليه، يجوز منح تصاريح الإقامة قصير الأمد للمجموعتين المذكورتين لمدة أقصاها <strong>خمس سنوات</strong>.</p>
<p>من ناحية أخرى، لا يقتصر حد المدة على الحدود السنوية فحسب، بل أيضاً على عدد مرات منح تصريح الإقامة. تصاريح الإقامة الممنوحة لحضور دورات اللغة التركية يجوز منحها <strong>مرتين</strong> كحد أقصى.</p>
<p>بالنسبة لمن أكملوا التعليم العالي في Türkiye وقدموا خلال ستة أشهر من تاريخ التخرج، يجوز منح تصريح إقامة <strong>مرة واحدة فقط</strong> ولمدة أقصاها سنة واحدة.</p>`,
  },
  {
    title: "أين يُقدَّم طلب تصريح الإقامة قصير الأمد؟",
    content: `<p>وفق المادة 21 من قانون الأجانب والحماية الدولية، تُقدَّم طلبات تصريح الإقامة قصير الأمد إلى <strong>القنصليات</strong> في بلد جنسية الأجنبي أو محل إقامته القانونية.</p>
<p>تُحيل القنصليات طلبات تصريح الإقامة مع آرائها إلى المديرية العامة لإدارة الهجرة. عندما ترى المديرية العامة ذلك ضرورياً، تحصل على آراء المؤسسات ذات الصلة وبعد البت في الطلبات تُبلِّغ القنصلية لإصدار تصريح الإقامة أو رفض الطلب.</p>
<p>تُختتم الطلبات في موعد أقصاه <strong>تسعون يوماً</strong>، وتُبلَّغ قرارات طلبات تصريح الإقامة لمقدم الطلب.</p>`,
  },
  {
    title: "تمديد تصريح الإقامة قصير الأمد",
    content: `<p>طلبات <strong>تمديد</strong> تصريح الإقامة قصير الأمد تُقدَّم إلى المحافظات ابتداءً من ستين يوماً قبل انتهاء مدة تصريح الإقامة و<strong>في موعد أقصاه قبل انتهاء تصريح الإقامة</strong>. أي أن للمحافظات سلطة تمديد تصاريح الإقامة.</p>
<p>يُمنح الأجانب المتقدمون لتمديد تصريح إقامتهم وثيقة معفاة من الرسوم. يجوز لهؤلاء الأجانب الاستمرار في الإقامة في Türkiye بهذه الوثيقة حتى صدور قرار بشأن طلبهم، حتى لو انتهت مدة تصريح إقامتهم. وبناءً عليه، يجوز للأجانb الذين تقدموا لتمديد تصريح إقامتهم قبل انتهائه مواصلة إقامتهم في Türkiye بالوثيقة الممنوحة لهم.</p>`,
  },
  {
    title: "رفض أو إلغاء أو عدم تمديد تصريح الإقامة قصير الأمد",
    content: `<p>تتضمن المادة 33 من قانون الأجانب والحماية الدولية أحكاماً بشأن رفض تصاريح الإقامة قصير الأمد وإلغائها وعدم تمديدها. وفقاً لذلك، لا يُمنح تصريح الإقامة قصير الأمد، أو يُلغى إذا كان قد مُنح، أو لا يُمدَّد عند انتهاء مدته في الحالات التالية:</p>
<ul><li><p>عدم استيفاء شرط أو أكثر من شروط تصريح الإقامة قصير الأمد أو زواله،</p></li>
<li><p>تبين أن تصريح الإقامة يُستخدم لغير الغرض الذي مُنح من أجله،</p></li>
<li><p>وجود قرار ترحيل ساري أو حظر دخول إلى Türkiye.</p></li></ul><p></p>`,
  },
  {
    title: "دعوى إبطال قرار رفض طلب تصريح الإقامة قصير الأمد",
    content: `<p>كما اُوضح بالتفصيل أعلاه، تُفحص طلبات تصريح الإقامة قصير الأمد المقدمة من الأجانب الذين يستوفون الشروط القانونية من قبل الإدارة ويُبت فيها. في بعض الحالات، قد ترفض الإدارة هذه الطلبات لأسباب مختلفة. قد تشمل أسباب الرفض عدم استيفاء الشروط المنصوص عليها في التشريع، أو التقديم بمستندات ناقصة أو خاطئة، أو قرار رفض ضمن سلطة الإدارة التقديرية.</p>
<p>يجوز للأجانب الذين رُفض طلب تصريح الإقامة قصير الأمد لهم رفع دعوى إبطال إذا رأوا أن قرار الرفض غير قانوني. يجب رفع هذه الدعاوى أمام المحكمة الإدارية في مكان الجهة التي أصدرت القرار. مهلة رفع الدعوى 60 يوماً من تاريخ إبلاغ قرار الرفض للمعني.</p>
<p>قرارات الإدارة برفض أو قبول طلب تصريح الإقامة قصير الأمد هي في جوهرها إجراءات إدارية. لذلك، لكي تكون الإجراءات الإدارية مشروعة، يجب أن تتضمن جميع العناصر المطلوبة. كما اُوضح في مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>إبطال الإجراءات الإدارية</u></strong></a>"، يمكن للمحكمة إبطال الإجراءات الإدارية التي يتبين أن أحد عناصر الهدف أو الموضوع أو السبب أو الاختصاص أو الشكل فيها معيباً على الأقل.</p>
<p>للحصول على معلومات تفصيلية حول هذا الموضوع، راجع أيضاً مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi/"><strong><u>دعوى إبطال قرار رفض طلب تصريح الإقامة</u></strong></a>".</p>`,
  },
  {
    title: "الأسئلة الشائعة",
    content: `<p><strong>هل يوجد التزام بتوكيل محامٍ في المحاكم الإدارية؟</strong></p>
<p>يسمح القانون التركي للأطراف بالدفاع عن أنفسهم وتمثيل أنفسهم أمام المحاكم، وتوكيل محامٍ للتمثيل ليس إلزامياً إلا في حالات استثنائية. ولا يوجد التزام بتوكيل محامٍ في قانون الإدارة في المحاكم الإدارية.<br>لكن نظراً لتعقيد تشريعات قانون الإدارة وقصر المهل في قانون الإجراءات الإدارية، قد يرتكب غير المختصين أخطاء شكلية أو موضوعية لا يمكن تصحيحها. لتجنب فقدان الحقوق في مسطرة التقاضي الإداري المفصلة، نوصي بالحصول على دعم قانوني من محامين يعملون في "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a>" قبل أي إجراء.</p><p><strong>كم تستغرق طلبات تصريح الإقامة قصير الأمد؟</strong></p>
<p>تُختتم طلبات تصريح الإقامة قصير الأمد في موعد أقصاه تسعون يوماً من تاريخ معالجة الطلب.</p>
<p><strong>ما أقصى مدة لتصريح الإقامة قصير الأمد؟</strong></p>
<p>يُمنح تصريح الإقامة قصير الأمد كقاعدة لمدة أقصاها سنتان (2).</p>
<p><strong>متى يُطلب تحويل تصريح الإقامة العائلي إلى قصير الأمد؟</strong></p>
<p>يجوز للأشخاص الذين أمضوا في Türkiye على الأقل 3 سنوات بتصريح إقامة عائلي وبلغوا سن 18، وللأشخاص الذين بقوا في Türkiye بتصريح إقامة عائلي كتابعين لداعم توفي، طلب تحويل تصريح الإقامة العائلي إلى تصريح إقامة قصير الأمد.</p>
<p><strong>ما المستندات المطلوبة لتصريح الإقامة قصير الأمد؟</strong></p>
<p>نموذج طلب تصريح الإقامة<br>أصل جواز السفر أو الوثيقة البديلة ونسخته<br>4 صور بيومترية (معايير ICAO)<br>تأمين صحي<br>السجل الجنائي<br>مستندات تثبت توفر وسائل مالية كافية طوال مدة تصريح الإقامة<br>مستندات إضافية حسب الحالة</p>
<p><strong>ماذا يحدث عند نقص المستندات في طلب تصريح الإقامة قصير الأمد؟</strong></p>
<p>إذا تبين نقص مستندات في طلب تصريح إقامة قصير الأمد، يُبلَّغ الأجنبي بالمستندات الناقصة وبوجوب إكمال النواقص خلال 15 يوماً. إذا لم تُستكمل المستندات الناقصة خلال 15 يوماً، لن يُقيَّم الطلب وسيُرفع من المعالجة.</p>
<p><strong>من أين تُستلم بطاقات تصريح الإقامة قصير الأمد؟</strong></p>
<p>تُطبع جميع بطاقات تصريح الإقامة لدى المديرية العامة للهجرة وترسل إلى عناوين الأجانب عبر PTT.</p>
<p>يُنصح المتقدمون بالحصول على دعم قانوني من محامٍ متخصص في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>قانون الأجانب</u></strong></a> قبل تقديم الطلب، لضمان اكتمال المستندات وتقديمها بشكل صحيح وتجنب فقدان الحقوق في الإجراءات الإدارية.</p>`,
  },
];

const ruSections: ServiceContentSection[] = [
  {
    title: "Как получить краткосрочный вид на жительство (ikamet izni)?",
    content: `<p>Нормы о процедурах пребывания (ikamet) и визах для иностранцев в Türkiye содержатся в Законе об иностранцах и международной защите. Краткосрочный вид на жительство предоставляет иностранцам, не являющимся гражданами Türkiye, право оставаться в стране на определенный срок.</p>
<p>Вид на жительство - это документ, который необходимо получить в провинциальном управлении по вопросам миграции по месту нахождения иностранца и который определяет срок его пребывания в Türkiye, если он будет находиться в стране дольше срока визы или визовой льготы или более девяноста (90) дней.</p>
<p>Краткосрочный вид на жительство - наиболее часто запрашиваемый тип, поскольку его проще получить, чем другие виды.</p>`,
  },
  {
    title: "Кто может подать заявление о краткосрочном виде на жительство?",
    content: `<p>Положения о иностранцах, которые могут подать заявление о краткосрочном виде на жительство, регулируются статьей 31 <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6458.pdf">Закона об иностранцах и международной защите</a>. Согласно этому, следующие иностранцы могут подать заявление о краткосрочном виде на жительство:</p>
<ul><li><p>Прибывающие в Türkiye для научных исследований.</p></li>
<li><p>Владельцы недвижимости в Türkiye.</p></li>
<li><p>Лица, которые будут устанавливать деловые связи или вести бизнес в Türkiye.</p></li>
<li><p>Участники программ повышения квалификации в Türkiye.</p></li>
<li><p>Прибывающие для обучения или аналогичных целей по соглашениям, стороной которых является Türkiye, или по программам обмена студентами.</p></li>
<li><p>Лица, которые будут находиться в Türkiye в туристических целях.</p></li>
<li><p>Лица, которые будут проходить лечение при условии, что они не страдают заболеванием, представляющим угрозу для общественного здоровья.</p></li>
<li><p>Лица, которые должны оставаться в Türkiye по запросу или решению судебных или административных органов.</p></li>
<li><p>Лица, переходящие с семейного вида на жительство на краткосрочный.</p></li>
<li><p>Лица, которые будут посещать курсы турецкого языка.</p></li>
<li><p>Лица, которые будут участвовать в образовании, исследованиях, стажировке и курсах в Türkiye через государственные учреждения.</p></li>
<li><p>Лица, завершившие высшее образование в Türkiye и подавшие заявление в течение шести месяцев с даты выпуска.</p></li>
<li><p>Лица, которые будут инвестировать в пределах объема и суммы, определяемых Президентом, без работы в Türkiye, а также их иностранный супруг и их или супруга несовершеннолетние или иждивенческие иностранные дети.</p></li>
<li><p>Граждане Турецкой Республики Северного Кипра.</p></li></ul>
<p>Иностранцы с такими основаниями, при необходимости, должны подтвердить эти условия документами. Иностранцы, прибывающие по этим основаниям, также должны соответствовать условиям проживания, соответствующим этим основаниям.</p>
<p>Для подробной информации см. нашу статью «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>Как подать заявление на вид на жительство (ikamet izni)?</u></strong></a>».</p>`,
  },
  {
    title: "Условия краткосрочного вида на жительство",
    content: `<p>Условия краткосрочного вида на жительство регулируются статьей 32 Закона об иностранцах и международной защите. Согласно этому:</p>
<ul><li><p>Быть одним из перечисленных выше иностранцев, которым может быть выдан вид на жительство.</p></li>
<li><p>Не входить в число иностранцев, которым не разрешен въезд в Türkiye.</p></li>
<li><p>Иметь жилье, соответствующее общим стандартам здоровья и безопасности.</p></li>
<li><p>По запросу представить документ, подтверждающий отсутствие судимости, выданный компетентными органами страны гражданства или законного проживания.</p></li>
<li><p>Предоставить адресные сведения о месте пребывания в Türkiye.</p></li></ul>
<p>Иностранцы, которым не разрешен въезд в Türkiye, регулируются статьей 7 Закона № 6458. Соответствующее положение дословно гласит:</p>
<p><em>"(1) Следующие иностранцы рассматриваются как не допускаемые пассажиры, им не разрешается въезд в Türkiye, и они возвращаются:</em><br><em>a) лица без паспорта, документа, заменяющего паспорт, визы, вида на жительство или разрешения на работу, а также лица, которым установлено, что они получили эти документы или разрешения мошенническим путем или имеют поддельные документы</em><br><em>b) лица без паспорта или документа, заменяющего паспорт, действительного не менее шестидесяти дней после истечения срока визы, визовой льготы или вида на жительство"</em></p>`,
  },
  {
    title: "Срок краткосрочного вида на жительство",
    content: `<p>За исключением особых случаев, краткосрочный вид на жительство может выдаваться каждый раз на срок не более <strong>двух лет</strong>.<br>Исключения, не подпадающие под двухлетний лимит:</p>
<ul><li><p>Лица, которые будут инвестировать в пределах объема и суммы, определяемых Президентом, без работы в Türkiye, а также их иностранный супруг и их или супруга несовершеннолетние или иждивенческие иностранные дети.</p></li>
<li><p>Граждане Турецкой Республики Северного Кипра.</p></li></ul>
<p>Соответственно, краткосрочные виды на жительство для двух перечисленных групп могут выдаваться на срок не более <strong>пяти лет</strong>.</p>
<p>С другой стороны, ограничение срока действует не только в виде годовых лимитов, но и в виде ограничения числа выдач вида на жительство. Виды на жительство, выдаваемые лицам, посещающим курсы турецкого языка, могут выдаваться не более <strong>двух раз</strong>.</p>
<p>Для лиц, завершивших высшее образование в Türkiye и подавших заявление в течение шести месяцев с даты выпуска, вид на жительство может быть выдан <strong>только один раз</strong> и на срок не более одного года.</p>`,
  },
  {
    title: "Куда подается заявление о краткосрочном виде на жительство?",
    content: `<p>Согласно статье 21 Закона об иностранцах и международной защите заявления о краткосрочном виде на жительство подаются в <strong>консульства</strong> в стране гражданства иностранца или месте его законного проживания.</p>
<p>Консульства направляют заявления о виде на жительство вместе со своими заключениями в Генеральное управление по делам миграции. При необходимости Генеральное управление получает заключения соответствующих учреждений и после рассмотрения заявлений уведомляет консульство о выдаче вида на жительство или об отказе в заявлении.</p>
<p>Заявления рассматриваются в срок не более <strong>девяноста дней</strong>, и решения по заявлениям на вид на жительство сообщаются заявителю.</p>`,
  },
  {
    title: "Продление краткосрочного вида на жительство",
    content: `<p>Заявления о <strong>продлении</strong> краткосрочного вида на жительство подаются в губернatorства начиная с шестидесяти дней до истечения срока вида на жительство и <strong>не позднее чем до истечения срока действия разрешения</strong>. То есть губернatorства имеют полномочия продлевать виды на жительство.</p>
<p>Иностранцам, подавшим заявление о продлении вида на жительство, выдается бесплатный документ. Эти иностранцы могут продолжать проживать в Türkiye с этим документом до принятия решения по их заявлению, даже если срок их вида на жительство истек. Следовательно, иностранцы, подавшие заявление о продлении до истечения срока, могут продолжать проживание в Türkiye с выданным им документом.</p>`,
  },
  {
    title: "Отказ, аннулирование или непродление краткосрочного вида на жительство",
    content: `<p>Статья 33 Закона об иностранцах и международной защите содержит положения об отказе, аннулировании и непродлении краткосрочных видов на жительство. Согласно этому, краткосрочный вид на жительство не выдается, аннулируется, если уже выдан, или не продлевается по истечении срока в следующих случаях:</p>
<ul><li><p>несоблюдение или прекращение одного или нескольких условий краткосрочного вида на жительство,</p></li>
<li><p>установление того, что вид на жительство используется не по назначению,</p></li>
<li><p>наличие действующего решения о депортации или запрета на въезд в Türkiye.</p></li></ul><p></p>`,
  },
  {
    title: "Иск об отмене решения об отказе в заявлении о краткосрочном виде на жительство",
    content: `<p>Как подробно изложено выше, заявления о краткосрочном виде на жительство, поданные иностранцами, соответствующими установленным законом условиям, рассматриваются администрацией и по ним принимается решение. В некоторых случаях администрация может отказать в этих заявлениях по различным основаниям. Основаниями отказа могут быть несоблюдение условий, предусмотренных законодательством, подача заявления с неполными или неверными документами либо решение об отказе в рамках усмотрения администрации.</p>
<p>Иностранцы, которым отказано в заявлении о краткосрочном виде на жительство, могут подать иск об отмене, если считают решение об отказе незаконным. Такие иски подаются в административный суд по месту нахождения органа, принявшего решение. Срок подачи иска составляет 60 дней с даты уведомления решения об отказе заинтересованному лицу.</p>
<p>Решения администрации об отказе или принятии заявления о краткосрочном виде на жительство по существу являются административными актами. Поэтому для законности административных актов они должны содержать все необходимые элементы. Как объясняется в нашей статье «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>Отмена административных актов</u></strong></a>», административные акты, в которых хотя бы один из элементов цели, предмета, основания, компетенции или формы признан дефектным, могут быть отменены судом.</p>`,
  },
  {
    title: "Часто задаваемые вопросы",
    content: `<p><strong>Обязательно ли нанимать адвоката в административных судах?</strong></p>
<p>Турецкое право допускает, чтобы стороны защищали и представляли себя в суде; найм адвоката для представительства обязателен лишь в отдельных случаях. В административных судах также нет обязанности нанимать адвоката по административному праву.<br>Однако из-за сложности административного законодательства и строгих коротких сроков по Закону об административном судопроизводстве лица без юридического образования могут допустить формальные или существенные ошибки, которые невозможно исправить. Чтобы не потерять права в детализированном административном процессе, рекомендуем получить правовую поддержку у адвокатов, работающих в области «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>административного права</u></strong></a>» до любых действий.</p><p><strong>Сколько времени рассматриваются заявления о краткосрочном ВНЖ?</strong></p>
<p>Не позднее чем через девяносто дней с даты принятия заявления к рассмотрению.</p>
<p><strong>Максимальный срок?</strong></p>
<p>Как правило, не более 2 (двух) лет.</p>
<p><strong>Когда возможен переход с семейного ВНЖ?</strong></p>
<p>После 3 лет семейного ВНЖ при достижении 18 лет, а также при смерти спонсора для иждивенцев.</p>
<p><strong>Какие документы нужны?</strong></p>
<p>Форма заявления, паспорт, 4 биометрических фото, страховка, справка о несудимости, документы о финансах, дополнительные документы.</p>
<p><strong>Если документы неполные?</strong></p>
<p>Уведомление о недостающих документах, срок устранения 15 дней, иначе заявление снимается с рассмотрения.</p>
<p><strong>Где получить карту?</strong></p>
<p>Карты печатает Генеральное управление по миграции и отправляет через PTT.</p>`,
  },
];

const faSections: ServiceContentSection[] = [
  {
    title: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
    content: `<p>احکام مربوط به اقامت (ikamet) و ویزای اتباع خارجی در Türkiye در قانون اتباع خارجی و حمایت بین‌المللی تنظیم شده است. این قانون بیش از یک نوع مجوز اقامت را برای اتباع خارجی در Türkiye تنظیم می‌کند. مجوز اقامت کوتاه‌مدت که به نام مجوز اقامت نیز شناخته می‌شود، به اتباع خارجی غیرترک حق ماندن در Türkiye برای مدت معین را می‌دهد. این مجوزها می‌توانند برای اهداف و دلایل مختلف داده شوند.</p>
<p>مجوز اقامت سند حقوقی است که باید از اداره مهاجرت استان محل حضور اتباع خارجی گرفته شود و مدت اقامتی را که اتباع خارجی می‌تواند در Türkiye بماند تعیین می‌کند، برای هر اتباع خارجی که بیش از مدت اعطاشده توسط ویزا یا معافیت ویزا یا بیش از نود (90) روز در Türkiye بماند. اتباع خارجی باید برای ماندن در Türkiye در دوره‌هایی که تحت پوشش اعتبار ویزا نیست، مجوز اقامت بگیرند.</p>
<p>مجوز اقامت کوتاه‌مدت پرتقاضاترین نوع مجوز اقامت است چون نسبت به سایر انواع آسان‌تر گرفته می‌شود.</p><p>توصیه می‌شود متقاضیان پیش از ارائه درخواست از وکیل متخصص در <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>حقوق اداری</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>حقوق اتباع خارجی</u></strong></a> پشتیبانی حقوقی بگیرند تا مدارک کامل و صحیح ارائه شود و از از دست رفتن حقوق در فرایند اداری جلوگیری شود.</p>`,
  },
  {
    title: "چه کسانی می‌توانند درخواست مجوز اقامت کوتاه‌مدت بدهند؟",
    content: `<p>احکام اتباع خارجی که می‌توانند برای مجوز اقامت کوتاه‌مدت درخواست دهند در ماده 31 <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6458.pdf">قانون اتباع خارجی و حمایت بین‌المللی</a> تنظیم شده است. بر این اساس، اتباع خارجی زیر می‌توانند برای مجوز اقامت کوتاه‌مدت درخواست دهند:</p>
<ul><li><p>کسانی که برای تحقیقات علمی به Türkiye می‌آیند.</p></li>
<li><p>مالکان اموال غیرمنقول در Türkiye.</p></li>
<li><p>کسانی که قصد ایجاد ارتباطات تجاری یا کسب‌وکار در Türkiye را دارند.</p></li>
<li><p>شرکت‌کنندگان در برنامه‌های آموزش حین خدمت در Türkiye.</p></li>
<li><p>کسانی که برای تحصیل یا اهداف مشابه بر اساس توافقنامه‌هایی که Türkiye طرف آن است یا برنامه‌های تبادل دانشجو می‌آیند.</p></li>
<li><p>کسانی که برای گردشگری در Türkiye می‌مانند.</p></li>
<li><p>کسانی که درمان دریافت می‌کنند به شرطی که بیماری تهدیدکننده سلامت عمومی نداشته باشند.</p></li>
<li><p>کسانی که باید به درخواست یا تصمیم مراجع قضایی یا اداری در Türkiye بمانند.</p></li>
<li><p>کسانی که از مجوز اقامت خانوادگی به مجوز کوتاه‌مدت منتقل می‌شوند.</p></li>
<li><p>کسانی که در دوره‌های زبان ترکی شرکت می‌کنند.</p></li>
<li><p>کسانی که از طریق نهادهای دولتی در آموزش، پژوهش، کارآموزی و دوره‌ها در Türkiye شرکت می‌کنند.</p></li>
<li><p>کسانی که تحصیلات عالی را در Türkiye تکمیل کرده و ظرف شش ماه از تاریخ فارغ‌التحصیلی درخواست داده‌اند.</p></li>
<li><p>کسانی که بدون کار در Türkiye در چارچوب و مبلغی که رئیس‌جمهور تعیین می‌کند سرمایه‌گذاری می‌کنند و همسر خارجی و فرزندان خردسال یا وابسته خارجی آنها یا همسرشان.</p></li>
<li><p>شهروندان جمهوری ترکیه شمال قبرس.</p></li></ul>
<p>اتباع خارجی دارای این صلاحیت‌ها در صورت لزوم باید این شرایط را با مدارک اثبات کنند. اتباع خارجی که به این دلایل می‌آیند باید شرایط اقامت متناسب با این صلاحیت‌ها را نیز برآورده کنند.</p>
<p>برای اطلاعات تفصیلی، مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>چگونه برای مجوز اقامت (ikamet izni) درخواست دهیم؟</u></strong></a>» را ببینید.</p>`,
  },
  {
    title: "شرایط مجوز اقامت کوتاه‌مدت",
    content: `<p>شرایط مجوز اقامت کوتاه‌مدت در ماده 32 قانون اتباع خارجی و حمایت بین‌المللی تنظیم شده است. بر این اساس:</p>
<ul><li><p>جزو اتباع خارجی فهرست‌شده در بالا باشد که مجوز اقامت به آنها داده می‌شود.</p></li>
<li><p>جزو اتباع خارجی که ورودشان به Türkiye مجاز نیست نباشد.</p></li>
<li><p>شرایط مسکن متناسب با استانداردهای عمومی بهداشت و ایمنی داشته باشد.</p></li>
<li><p>در صورت درخواست، سند سوءپیشینه صادرشده از مراجع صلاحیت‌دار کشور تابعیت یا محل اقامت قانونی ارائه دهد.</p></li>
<li><p>اطلاعات آدرس محل اقامت در Türkiye را ارائه دهد.</p></li></ul>
<p>اتباع خارجی که ورودشان به Türkiye مجاز نیست در ماده 7 قانون شماره 6458 تنظیم شده است. متن مربوطه به‌طور مستقیم چنین است:</p>
<p><em>"(1) اتباع خارجی زیر مسافر غیرقابل پذیرش تلقی شده و اجازه ورود به Türkiye داده نمی‌شود و بازگردانده می‌شوند:</em><br><em>الف) کسانی که گذرنامه، سند جایگزین، ویزا، مجوز اقامت یا مجوز کار ندارند یا مشخص شود این اسناد یا مجوزها را به‌صورت متقلبانه اخذ کرده یا اسناد جعلی دارند</em><br><em>ب) کسانی که گذرنامه یا سند جایگزین معتبر برای حداقل شصت روز پس از پایان مدت ویزا، معافیت ویزا یا مجوز اقامت ندارند"</em></p>`,
  },
  {
    title: "مدت مجوز اقامت کوتاه‌مدت",
    content: `<p>به‌جز موارد استثنایی، مجوز اقامت کوتاه‌مدت هر بار حداکثر برای <strong>دو سال</strong> داده می‌شود.<br>استثناهای معاف از محدودیت دو سال:</p>
<ul><li><p>کسانی که بدون کار در Türkiye در چارچوب و مبلغی که رئیس‌جمهور تعیین می‌کند سرمایه‌گذاری می‌کنند و همسر خارجی و فرزندان خردسال یا وابسته خارجی آنها یا همسرشان.</p></li>
<li><p>شهروندان جمهوری ترکیه شمال قبرس.</p></li></ul>
<p>بر این اساس، مجوز اقامت کوتاه‌مدت برای دو گروه فوق حداکثر برای <strong>پنج سال</strong> داده می‌شود.</p>
<p>از سوی دیگر، محدودیت مدت نه تنها به سقف سالانه بلکه به تعداد دفعات اعطای مجوز اقامت نیز تابع است. مجوزهای اقامت داده‌شده به شرکت‌کنندگان دوره زبان ترکی حداکثر <strong>دو بار</strong> داده می‌شود.</p>
<p>برای کسانی که تحصیلات عالی را در Türkiye تکمیل کرده و ظرف شش ماه از تاریخ فارغ‌التحصیلی درخواست داده‌اند، مجوز اقامت <strong>فقط یک بار</strong> و حداکثر برای یک سال داده می‌شود.</p>`,
  },
  {
    title: "درخواست مجوز اقامت کوتاه‌مدت کجا ارائه می‌شود؟",
    content: `<p>طبق ماده 21 قانون اتباع خارجی و حمایت بین‌المللی، درخواست‌های مجوز اقامت کوتاه‌مدت به <strong>کنسولگری‌ها</strong> در کشور تابعیت یا محل اقامت قانونی اتباع خارجی ارائه می‌شود.</p>
<p>کنسولگری‌ها درخواست‌های مجوز اقامت را همراه با نظر خود به اداره کل مدیریت مهاجرت ارجاع می‌دهند. در صورت لزوم، اداره کل نظر نهادهای مرتبط را اخذ کرده و پس از اتخاذ تصمیم، کنسولگری را برای صدور مجوز اقامت یا رد درخواست مطلع می‌کند.</p>
<p>درخواست‌ها حداکثر ظرف <strong>نود روز</strong> نتیجه‌گیری می‌شود و تصمیمات درباره درخواست مجوز اقامت به متقاضی ابلاغ می‌شود.</p>`,
  },
  {
    title: "تمدید مجوز اقامت کوتاه‌مدت",
    content: `<p>درخواست‌های <strong>تمدید</strong> مجوز اقامت کوتاه‌مدت از شصت روز قبل از پایان مدت مجوز و <strong>حداکثر پیش از انقضای مجوز اقامت</strong> به استانداری‌ها ارائه می‌شود. یعنی استانداری‌ها صلاحیت تمدید مجوزهای اقامت را دارند.</p>
<p>به اتباع خارجی متقاضی تمدید مجوز اقامت، سند معاف از عوارض داده می‌شود. این افراد می‌توانند با این سند تا صدور تصمیم درباره درخواست خود در Türkiye بمانند، حتی اگر مدت مجوزشان به پایان رسیده باشد. بنابراین اتباع خارجی که پیش از انقضا برای تمدید درخواست داده‌اند می‌توانند با سند صادرشده اقامت خود را در Türkiye ادامه دهند.</p>`,
  },
  {
    title: "رد، لغو یا عدم تمدید مجوز اقامت کوتاه‌مدت",
    content: `<p>ماده 33 قانون اتباع خارجی و حمایت بین‌المللی احکام رد، لغو و عدم تمدید مجوز اقامت کوتاه‌مدت را شامل می‌شود. بر این اساس، مجوز اقامت کوتاه‌مدت در موارد زیر داده نمی‌شود، در صورت صدور لغو می‌شود یا در پایان مدت تمدید نمی‌شود:</p>
<ul><li><p>عدم احراز یا از بین رفتن یک یا چند شرط مجوز اقامت کوتاه‌مدت،</p></li>
<li><p>مشخص شدن استفاده از مجوز برای غیر از هدفی که برای آن صادر شده،</p></li>
<li><p>وجود تصمیم اخراج معتبر یا ممنوعیت ورود به Türkiye.</p></li></ul><p></p>`,
  },
  {
    title: "دادخواست ابطال تصمیم رد درخواست مجوز اقامت کوتاه‌مدت",
    content: `<p>همان‌طور که در بالا به تفصیل توضیح داده شد، درخواست‌های مجوز اقامت کوتاه‌مدت اشخاصی که شرایط قانونی را برآورده می‌کنند توسط اداره بررسی و درباره آنها تصمیم گرفته می‌شود. در برخی موارد اداره ممکن است این درخواست‌ها را به دلایل مختلف رد کند. دلایل رد می‌تواند عدم برآورده شدن شرایط مقرر در قانون، ارائه مدارک ناقص یا نادرست، یا تصمیم رد در چارچوب اختیار تقدیری اداره باشد.</p>
<p>اتباع خارجی که درخواست مجوز اقامت کوتاه‌مدت آنها رد شده اگر تصمیم رد را غیرقانونی بدانند می‌توانند دادخواست ابطال بدهند. این دادخواست‌ها باید در دادگاه اداری محل مرجعی که تصمیم را صادر کرده اقامه شود. مهلت اقامه دادخواست 60 روز از تاریخ ابلاغ رد درخواست به ذی‌نفع است.</p>
<p>تصمیمات اداره درباره رد یا پذیرش درخواست مجوز اقامت کوتاه‌مدت اساساً اقدامات اداری هستند. بنابراین برای مشروعیت اقدامات اداری باید تمام عناصر لازم را داشته باشند. همان‌طور که در مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>ابطال اقدامات اداری</u></strong></a>» توضیح داده شده، اقدامات اداری که حداقل یکی از عناصر هدف، موضوع، علت، صلاحیت یا شکل آنها معیوب باشد می‌توانند توسط دادگاه ابطال شوند.</p>
<p>برای اطلاعات تفصیلی درباره این موضوع، مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi/"><strong><u>دادخواست ابطال تصمیم رد درخواست مجوز اقامت</u></strong></a>» را نیز ببینید.</p>`,
  },
  {
    title: "سؤالات متداول",
    content: `<p><strong>آیا در دادگاه‌های اداری الزام به استخدام وکیل وجود دارد؟</strong></p>
<p>حقوق ترکیه به طرفین اجازه می‌دهد خود را در دادگاه دفاع و نمایندگی کنند و استخدام وکیل برای نمایندگی جز در موارد استثنایی الزامی نیست. در دادگاه‌های اداری نیز الزام به استخدام وکیل حقوق اداری وجود ندارد.<br>اما به‌دلیل پیچیدگی قوانین حقوق اداری و کوتاه بودن مهلت‌های قانون آیین دادرسی اداری، افراد غیرحقوقی ممکن است خطاهای شکلی یا ماهوی غیرقابل جبران مرتکب شوند. برای جلوگیری از از دست رفتن حقوق در فرایند دقیق دادرسی اداری، پیش از هر اقدامی توصیه می‌کنیم از وکلای فعال در «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>حقوق اداری</u></strong></a>» پشتیبانی حقوقی بگیرید.</p><p><strong>درخواست مجوز اقامت کوتاه‌مدت چقدر طول می‌کشد؟</strong></p>
<p>درخواست‌های مجوز اقامت کوتاه‌مدت حداکثر ظرف نود روز از تاریخ رسیدگی به درخواست نتیجه می‌دهد.</p>
<p><strong>حداکثر مدت مجوز اقامت کوتاه‌مدت چقدر است؟</strong></p>
<p>به‌عنوان قاعده، مجوز اقامت کوتاه‌مدت حداکثر برای 2 (دو) سال اعطا می‌شود.</p>
<p><strong>تبدیل مجوز اقامت خانوادگی به کوتاه‌مدت چه زمانی مطرح می‌شود؟</strong></p>
<p>افرادی که حداقل 3 سال با مجوز اقامت خانوادگی در Türkiye مانده‌اند و 18 سالگی را تکمیل کرده‌اند، و افرادی که با مجوز اقامت خانوادگی به‌عنوان وابسته پشتیبان متوفی در Türkiye مانده‌اند، می‌توانند درخواست تبدیل مجوز اقامت خانوادگی به مجوز اقامت کوتاه‌مدت بدهند.</p>
<p><strong>برای مجوز اقامت کوتاه‌مدت چه مدارکی لازم است؟</strong></p>
<p>فرم درخواست مجوز اقامت<br>اصل و کپی گذرنامه یا سند جایگزین<br>4 عکس بیومتریک (استاندارد ICAO)<br>بیمه درمانی<br>گواهی عدم سوءپیشینه<br>مدارک اثبات تمکن مالی کافی برای مدت مجوز اقامت<br>مدارک تکمیلی بسته به وضعیت</p>
<p><strong>در صورت نقص مدارک در درخواست مجوز اقامت کوتاه‌مدت چه می‌شود؟</strong></p>
<p>اگر در درخواست مجوز اقامت کوتاه‌مدت نقص مدارک مشخص شود، به اتباع خارجی اعلام می‌شود کدام مدارک ناقص است و نواقص باید ظرف 15 روز برطرف شود. اگر مدارک ناقص ظرف 15 روز تکمیل نشود، درخواست ارزیابی نمی‌شود و از رسیدگی خارج می‌شود.</p>
<p><strong>کارت‌های مجوز اقامت کوتاه‌مدت از کجا تحویل می‌شود؟</strong></p>
<p>تمام کارت‌های مجوز اقامت توسط اداره کل مهاجرت چاپ و از طریق PTT به آدرس اتباع خارجی ارسال می‌شود.</p>`,
  },
];

export const contentSlug = "kisa-donem-oturma-izni-ikamet-izni-nasil-alinir";

export const contentTranslations: ForeignConsultancyTranslations = {
  en: {
    name: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
    excerpt: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
    heroTitle: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
    sectionsJson: serializeServiceSections(enSections),
  },
  ar: {
    name: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
    excerpt: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
    heroTitle: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
    sectionsJson: serializeServiceSections(arSections),
  },
  ru: {
    name: "Как получить краткосрочный вид на жительство (ikamet izni)?",
    excerpt: "Как получить краткосрочный вид на жительство (ikamet izni)?",
    heroTitle: "Как получить краткосрочный вид на жительство (ikamet izni)?",
    sectionsJson: serializeServiceSections(ruSections),
  },
  fa: {
    name: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
    excerpt: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
    heroTitle: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
    sectionsJson: serializeServiceSections(faSections),
  },
};
