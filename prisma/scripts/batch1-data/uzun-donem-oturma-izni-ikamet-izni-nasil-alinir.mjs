import { annulmentResidence, faqLawyer, faqTitles } from "../batch1-shared.mjs";

const meta = {
  en: {
    name: "How to Obtain a Long-Term Residence Permit (İkamet İzni)?",
    excerpt: "How to Obtain a Long-Term Residence Permit (İkamet İzni)?",
    heroTitle: "How to Obtain a Long-Term Residence Permit (İkamet İzni)?",
  },
  ar: {
    name: "كيفية الحصول على تصريح إقامة طويل الأمد (إkamet izni)؟",
    excerpt: "كيفية الحصول على تصريح إقامة طويل الأمد (إkamet izni)؟",
    heroTitle: "كيفية الحصول على تصريح إقامة طويل الأمد (إkamet izni)؟",
  },
  ru: {
    name: "Как получить долгосрочный вид на жительство (ikamet izni)?",
    excerpt: "Как получить долгосрочный вид на жительство (ikamet izni)?",
    heroTitle: "Как получить долгосрочный вид на жительство (ikamet izni)?",
  },
  fa: {
    name: "چگونه مجوز اقامت بلندمدت (ikamet izni) بگیریم؟",
    excerpt: "چگونه مجوز اقامت بلندمدت (ikamet izni) بگیریم؟",
    heroTitle: "چگونه مجوز اقامت بلندمدت (ikamet izni) بگیریم؟",
  },
};

const permitLabel = {
  en: "long-term residence permit",
  ar: "تصريح الإقامة طويل الأمد",
  ru: "долгосрочном виде на жительство",
  fa: "مجوز اقامت بلندمدت",
};

function faqExtra(locale) {
  const t = {
    en: `<p><strong>Where Is a Long-Term Residence Permit Application Made?</strong></p>
<p>A long-term residence permit application can be made online through the e-Residence system. The applicant must then obtain an appointment from the provincial directorate of migration management in the region where they wish to reside.</p>
<p><strong>Can Holders of a Long-Term Residence Permit Work in Türkiye?</strong></p>
<p>Foreign nationals holding a long-term residence permit may not work in Türkiye without obtaining a separate work permit.</p>
<p><strong>Can Holders of a Long-Term Residence Permit Participate in Elections in Türkiye?</strong></p>
<p>Persons who obtain a long-term residence permit may neither stand as candidates nor vote in elections in Türkiye.</p>
<p><strong>Are Holders of a Long-Term Residence Permit Required to Perform Military Service in Türkiye?</strong></p>
<p>Persons holding a long-term residence permit are exempt from compulsory military service in Türkiye.</p>
<p><strong>What Remedies Are Available If a Long-Term Residence Permit Is Cancelled?</strong></p>
<p>An annulment action must be brought before the administrative courts within 60 days from notification of the cancellation to the foreign national.</p>`,
    ar: `<p><strong>أين يُقدَّم طلب تصريح الإقامة طويل الأمد؟</strong></p>
<p>يمكن تقديم طلب تصريح الإقامة طويل الأمد عبر الإنترنت من خلال نظام e-Residence. ثم يجب على مقدم الطلب حجز موعد لدى مديرية الهجرة في المحافظة في المنطقة التي يريد الإقامة فيها.</p>
<p><strong>هل يجوز لحاملي تصريح الإقامة طويل الأمد العمل في Türkiye؟</strong></p>
<p>لا يجوز للأجانب الحاملين لتصريح إقامة طويل الأمد العمل في Türkiye دون الحصول على تصريح عمل منفصل.</p>
<p><strong>هل يجوز لحاملي تصريح الإقامة طويل الأمد المشاركة في الانتخابات في Türkiye؟</strong></p>
<p>من يحصلون على تصريح إقامة طويل الأمد لا يجوز لهم الترشح أو التصويت في الانتخابات في Türkiye.</p>
<p><strong>هل يلزم حاملو تصريح الإقامة طويل الأمد أداء الخدمة العسكرية في Türkiye؟</strong></p>
<p>الحاملون لتصريح الإقامة طويل الأمد معفون من الخدمة العسكرية الإلزامية في Türkiye.</p>
<p><strong>ما الوسائل القانونية إذا أُلغي تصريح الإقامة طويل الأمد؟</strong></p>
<p>يجب رفع دعوى إبطال أمام المحاكم الإدارية خلال 60 يوماً من إبلاغ قرار الإلغاء للأجنبي.</p>`,
    ru: `<p><strong>Куда подается заявление о долгосрочном виде на жительство?</strong></p>
<p>Заявление о долгосрочном виде на жительство может быть подано онлайн через систему e-Residence. Затем заявитель должен получить запись в провинциальное управление по делам миграции в регионе, где он хочет проживать.</p>
<p><strong>Могут ли держатели долгосрочного ВНЖ работать в Türkiye?</strong></p>
<p>Иностранцы, имеющие долгосрочный вид на жительство, не могут работать в Türkiye без отдельного разрешения на работу.</p>
<p><strong>Могут ли держатели долгосрочного ВНЖ участвовать в выборах в Türkiye?</strong></p>
<p>Лица, получившие долгосрочный вид на жительство, не могут баллотироваться и голосовать на выборах в Türkiye.</p>
<p><strong>Обязаны ли держатели долгосрочного ВНЖ проходить военную службу в Türkiye?</strong></p>
<p>Держатели долгосрочного вида на жительство освобождены от обязательной военной службы в Türkiye.</p>
<p><strong>Какие средства правовой защиты доступны при отмене долгосрочного ВНЖ?</strong></p>
<p>Иск об отмене должен быть подан в административный суд в течение 60 дней с даты уведомления иностранца об отмене.</p>`,
    fa: `<p><strong>درخواست مجوز اقامت بلندمدت کجا ارائه می‌شود؟</strong></p>
<p>درخواست مجوز اقامت بلندمدت می‌تواند آنلاین از طریق سامانه e-Residence ارائه شود. سپس متقاضی باید از اداره مهاجرت استان در منطقه‌ای که می‌خواهد اقامت کند نوبت بگیرد.</p>
<p><strong>آیا دارندگان مجوز اقامت بلندمدت می‌توانند در Türkiye کار کنند؟</strong></p>
<p>اتباع خارجی دارنده مجوز اقامت بلندمدت بدون مجوز کار جدا نمی‌توانند در Türkiye کار کنند.</p>
<p><strong>آیا دارندگان مجوز اقامت بلندمدت می‌توانند در انتخابات Türkiye شرکت کنند؟</strong></p>
<p>افرادی که مجوز اقامت بلندمدت می‌گیرند نمی‌توانند نامزد شوند یا رأی دهند.</p>
<p><strong>آیا دارندگان مجوز اقامت بلندمدت ملزم به خدمت سربازی در Türkiye هستند؟</strong></p>
<p>دارندگان مجوز اقامت بلندمدت از خدمت سربازی اجباری در Türkiye معاف هستند.</p>
<p><strong>در صورت لغو مجوز اقامت بلندمدت چه راهکاری وجود دارد؟</strong></p>
<p>دادخواست ابطال باید ظرف 60 روز از ابلاغ لغو به اتباع خارجی در دادگاه‌های اداری اقامه شود.</p>`,
  };
  return t[locale];
}

export default {
  en: {
    ...meta.en,
    sections: [
      {
        title: "How to Obtain a Long-Term Residence Permit (İkamet İzni)?",
        content: `<p>Foreign nationals who wish to hold indefinite residence in Türkiye may obtain a "Long-Term Residence Permit" if they meet the conditions specified in <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6458.pdf">Law No. 6458 on Foreigners and International Protection</a>. Long-term residence permits are granted by governorships with the approval of the Ministry of Interior. Foreign nationals who wish to obtain indefinite residence in Türkiye must have remained in the country continuously for at least eight years on a residence permit. In addition, the foreign national must not have received social assistance in the last three years and must have regular and sufficient income. If the foreign national meets these statutory conditions, they may hold a long-term residence permit.</p>
<p>It should be noted immediately that even if these conditions are not met, foreign nationals who meet the conditions determined by the <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.goc.gov.tr/goc-kurulu">Migration Policies Board</a> may also obtain a long-term residence permit. However, when evaluating a long-term residence permit application, the competent authority must in all cases form the view that the foreign national does not pose a threat to public order or public security.</p>
<p>Holders of a long-term residence permit may benefit from the same rights granted to Turkish citizens, subject to certain exceptions. Some of these exceptions are military service obligation, the right to elect and be elected, and the right to hold public office.</p>`,
      },
      {
        title: "What Is a Long-Term Residence Permit?",
        content: `<p>By "long-term residence permit" is essentially meant "indefinite residence permit". The type of residence permit applied for by foreign nationals who have remained in Türkiye continuously for at least eight years on a residence permit and who also meet the conditions determined by the Migration Policies Board is called a "long-term residence permit". A foreign national who obtains a long-term residence permit acquires the right to remain in the country indefinitely without making an extension application for their residence permit.</p>`,
      },
      {
        title: "What Are the Conditions for a Long-Term Residence Permit?",
        content: `<p>Article 43 of the Law on Foreigners and International Protection regulates the conditions a foreign national must meet for a long-term residence permit.</p>
<p>Accordingly, for a long-term residence permit:</p>
<ul><li><p>Having remained in Türkiye continuously for at least eight years on a residence permit,</p></li>
<li><p>Not having received social assistance in the last three years,</p></li>
<li><p>Having sufficient and regular income to support themselves and, if any, their family,</p></li>
<li><p>Holding valid health insurance,</p></li>
<li><p>Not posing a threat to public order or public security</p></li></ul>
<p>must be satisfied.</p>
<p>In addition, even if the applicant does not meet these conditions, they may obtain a long-term residence permit if they meet the conditions determined by the Migration Policies Board. In all cases, however, whether the foreign national poses a threat to public order or public security will be investigated.</p>`,
      },
      {
        title: "How Is the Eight-Year Continuous Stay in Türkiye Calculated?",
        content: `<p>As explained in detail above, before applying for a long-term residence permit, the foreign national must have remained in Türkiye continuously for eight years with a valid residence permit. When calculating the eight-year period, the date of application for long-term residence is taken as the basis. Periods spent abroad or in Türkiye without a residence permit are not included in the calculation.</p>
<p>In retrospective one-year calculations, if it is determined that the foreign national was in Türkiye for less than 180 days in that year, stay periods in the country in the last 5 years are examined. If it is determined that more than 365 days were spent abroad during the examined 5-year period, the long-term residence application will result negatively.</p>
<p>If it is determined that the foreign national applying for long-term residence remained abroad for more than six (6) months, the application will be concluded negatively directly without retrospective examination.</p>`,
      },
      {
        title: "Who Is Granted a Long-Term Residence Permit?",
        content: `<p>According to Article 42 of the Law on Foreigners and International Protection, persons who may obtain long-term residence include:</p>
<ul><li><p>Foreign nationals who have remained in Türkiye continuously for at least eight years and who also comply with the conditions determined by the Ministry,</p></li>
<li><p>Foreign nationals who are not refugees, conditional refugees, or holders of subsidiary protection status,</p></li>
<li><p>Foreign nationals who do not benefit from humanitarian residence or temporary protection may obtain long-term residence.</p></li></ul><p></p>`,
      },
      {
        title: "What Rights Does a Long-Term Residence Permit Provide?",
        content: `<p>Foreign nationals holding a long-term residence permit may benefit from the rights granted to Turkish citizens, subject to certain exceptions. These exceptions are military service, the right to elect and be elected, entering public service, and importing vehicles duty-free. A holder of a long-term residence permit is exempt from military service in Türkiye, has no right to elect or be elected, and cannot enter public service.</p>
<p>However, it should be noted immediately that their acquired social security rights are reserved and use of these rights is subject to the provisions of the relevant law.</p>
<p>Transactions in Türkiye relating to</p>
<ul><li><p>Residence</p></li>
<li><p>Travel</p></li>
<li><p>Work</p></li>
<li><p>Investment</p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/anonim-sirket-kurulusu/"><strong><u>Commercial activity</u></strong></a></p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/miras-hukuku-nedir/"><strong><u>Inheritance</u></strong></a></p></li>
<li><p>Acquisition and transfer of movable and immovable property</p></li></ul>
<p>by holders of long-term residence permits are carried out by the relevant institutions according to the legislation applied to Turkish citizens. However, where special legal provisions require Turkish citizenship to use these rights, persons holding a long-term residence permit may not claim these rights.</p>`,
      },
      {
        title: "Documents Required for a Long-Term Residence Permit Application",
        content: `<p>The documents requested by the provincial directorate of migration management during a long-term residence permit application are as follows:</p>
<ul><li><p>Residence Permit Application Form</p></li>
<li><p>Original and copy of passport or passport-substitute document</p></li>
<li><p>4 biometric (ICAO standard) photographs</p></li>
<li><p>Health insurance</p></li>
<li><p>Criminal record</p></li>
<li><p>Receipts showing payment of required fees</p></li>
<li><p>Documents proving sufficient financial means for the period of the residence permit</p></li>
<li><p>Stamped and signed document showing no social assistance in the last 3 years</p></li>
<li><p>Document showing registration in the address registration system (AKS)</p></li>
<li><p>Document showing continuous residence in Türkiye for 8 years</p></li>
<li><p>Documents relating to any previous residence permit held</p></li>
<li><p>Document showing the place of residence if long-term residence is granted (title deed, lease agreement, etc.)</p></li>
<li><p>Additional documents depending on the situation</p></li></ul>
<p>Although the documents are as listed above in detail, errors are very likely if foreign nationals apply for a long-term residence permit without legal consultancy. Therefore, obtaining legal support is advisable for completing the application process in the best way and following it properly thereafter.</p>`,
      },
      {
        title: "Long-Term Residence Permit and Indefinite Work Permit",
        content: `<p>Under the <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6735.pdf">International Labour Force Law</a>, foreign nationals with a <strong>long-term residence permit</strong> in Türkiye or at least eight years of lawful work permit may apply for an indefinite work permit. It should be noted that a foreign national holding an indefinite work permit also benefits from all rights provided by the long-term residence permit.</p>
<p>For detailed information on obtaining a residence permit in Türkiye, see our article titled "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>How to Obtain a Residence Permit (İkamet İzni)?</u></strong></a>".</p>`,
      },
      annulmentResidence("en", permitLabel.en),
      { title: faqTitles.en, content: faqLawyer.en + faqExtra("en") },
    ],
  },
  ar: {
    ...meta.ar,
    sections: [
      {
        title: "كيفية الحصول على تصريح إقامة طويل الأمد (إkamet izni)؟",
        content: `<p>يجوز للأجانب الراغبين في إقامة غير محددة في Türkiye الحصول على «تصريح إقامة طويل الأمد» إذا استوفوا الشروط المنصوص عليها في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6458.pdf">القانون رقم 6458 بشأن الأجانب والحماية الدولية</a>. تُمنح تصاريح الإقامة طويلة الأمد من المحافظات بموافقة وزارة الداخلية. يجب على الأجانب الراغبين في الحصول على إقامة غير محددة في Türkiye أن يكونوا قد بقوا في البلاد باستمرار لمدة ثماني سنوات على الأقل بتصريح إقامة. بالإضافة إلى ذلك، يجب ألا يكون الأجنبي قد تلقى مساعدة اجتماعية في آخر ثلاث سنوات، ويجب أن يكون لديه دخل منتظم وكافٍ. إذا استوفى الأجنبي هذه الشروط القانونية، يجوز له الحصول على تصريح إقامة طويل الأمد.</p>
<p>يجب التنويه فوراً إلى أنه حتى إذا لم تُستوفَ هذه الشروط، يجوز للأجانb الذين يستوفون الشروط التي يحددها <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.goc.gov.tr/goc-kurulu">مجلس سياسات الهجرة</a> أيضاً الحصول على تصريح إقامة طويل الأمد. غير أنه عند تقييم طلب تصريح إقامة طويل الأمد، يجب على الجهة المختصة في جميع الأحوال أن تتأكد من أن الأجنبي لا يشكل تهديداً للنظام العام أو الأمن العام.</p>
<p>يستفيد حاملو تصريح الإقامة طويل الأمد من نفس الحقوق الممنوحة للمواطنين الأتراك، مع مراعاة بعض الاستثناءات. من هذه الاستثناءات: التزام الخدمة العسكرية، وحق الانتخاب والترشح، وحق شغل الوظائف العامة.</p>`,
      },
      {
        title: "ما هو تصريح الإقامة طويل الأمد؟",
        content: `<p>ب«تصريح الإقامة طويل الأمد» يُقصد أساساً «تصريح إقامة غير محدد». يُسمى التصريح المطلوب من أقاموا في Türkiye باستمرار ثماني سنوات على الأقل واستوفوا شروط مجلس سياسات الهجرة «تصريح إقامة طويل الأمد». يكتسب حامله الحق في البقاء بشكل غير محدد دون طلب تمديد.</p>`,
      },
      {
        title: "ما شروط تصريح الإقامة طويل الأمد؟",
        content: `<p>تُنظم المادة 43 من قanون الأجانب والحماية الدولية الشروط التي يجب على الأجنبي استيفاؤها للحصول على تصريح إقامة طويل الأمد.</p>
<p>وفقاً لذلك، يجب توافر ما يلي لتصريح الإقامة طويل الأمد:</p>
<ul><li><p>البقاء في Türkiye باستمرار لمدة ثماني سنوات على الأقل بتصريح إقامة،</p></li>
<li><p>عدم تلقي مساعدة اجتماعية خلال آخر ثلاث سنوات،</p></li>
<li><p>وجود دخل كافٍ ومنتظم لإعالة نفسه وأسرته إن وُجدت،</p></li>
<li><p>حيازة تأمين صحي ساري،</p></li>
<li><p>عدم تشكيل تهديد للنظام العام أو الأمن العام</p></li></ul>
<p>يجب استيفاء هذه الشروط.</p>
<p>بالإضافة إلى ذلك، حتى إذا لم يستوفِ مقدم الطلب هذه الشروط، يجوز له الحصول على تصريح إقامة طويل الأمد إذا استوفى الشروط التي يحددها مجلس سياسات الهجرة. ومع ذلك، في جميع الأحوال، سيتم التحقق مما إذا كان الأجنبي يشكل تهديداً للنظام العام أو الأمن العام.</p>`,
      },
      {
        title: "كيف تُحسب مدة الثماني سنوات؟",
        content: `<p>كما اُوضح بالتفصيل أعلاه، قبل التقدم لتصريح إقامة طويل الأمد، يجب أن يكون الأجنبي قد بقي في Türkiye باستمرار ثماني سنوات بتصريح إقامة ساري. عند حساب مدة الثماني سنوات، يُؤخذ تاريخ تقديم طلب الإقامة طويلة الأمد أساساً. لا تُحسب الفترات التي قضاها في الخارج أو في Türkiye دون تصريح إقامة.</p>
<p>في حسابات السنة الواحدة بأثر رجعي، إذا تبين أن الأجنبي كان في Türkiye أقل من 180 يوماً في تلك السنة، تُفحص فترات الإقامة في البلاد خلال آخر 5 سنوات. إذا تبين أن أكثر من 365 يوماً قُضيت في الخارج خلال فترة الـ 5 سنوات المفحوصة، سيُرفض طلب الإقامة طويلة الأمد.</p>
<p>إذا تبين أن الأجنبي المتقدم للإقامة طويلة الأمد بقي في الخارج أكثر من ستة (6) أشهر، سيُرفض الطلب مباشرة دون فحص بأثر رجعي.</p><p>يُنصح المتقدمون بالحصول على دعم قانوني من محامٍ متخصص في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>قانون الأجانب</u></strong></a> قبل تقديم الطلب، لضمان اكتمال المستندات وتقديمها بشكل صحيح وتجنب فقدان الحقوق في الإجراءات الإدارية.</p>`,
      },
      {
        title: "لمن يُمنح تصريح الإقامة طويل الأمد؟",
        content: `<p>وفق المادة 42 من قانون الأجانب والحماية الدولية، من يمكنهم الحصول على إقامة طويلة الأمد:</p>
<ul><li><p>الأجانب الذين أقاموا في Türkiye باستمرار لمدة ثماني سنوات على الأقل ويلتزمون أيضاً بالشروط التي تحددها الوزارة،</p></li>
<li><p>الأجانب الذين ليسوا لاجئين أو لاجئين مشروطين أو حاملين لوضع الحماية الفرعية،</p></li>
<li><p>الأجانب الذين لا يستفيدون من إقامة إنسانية أو حماية مؤقتة يجوز لهم الحصول على إقامة طويلة الأمد.</p></li></ul><p></p>`,
      },
      {
        title: "ما الحقوق التي يوفرها التصريح؟",
        content: `<p>يجوز للأجانb الحاملين لتصريح إقامة طويل الأمد الاستفادة من الحقوق الممنوحة للمواطنين الأتراك، مع مراعاة بعض الاستثناءات. هذه الاستثناءات هي الخدمة العسكرية، وحق الانتخاب والترشح، والدخول إلى الخدمة العامة، وإدخال المركبات معفاة من الرسوم. المعفون من الخدمة العسكرية في Türkiye هو حامل تصريح الإقامة طويل الأمد، ولا حق له في الانتخاب أو الترشح، ولا يمكنه الدخول إلى الخدمة العامة.</p>
<p>غير أنه يجب التأكيد فوراً أن حقوقهم المكتسبة في الضمان الاجتماعي محفوظة واستخدام هذه الحقوق يخضع لأحكام القانون المعني.</p>
<p>المعاملات في Türkiye المتعلقة بـ</p>
<ul><li><p>الإقامة</p></li>
<li><p>السفر</p></li>
<li><p>العمل</p></li>
<li><p>الاستثمار</p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/anonim-sirket-kurulusu/"><strong><u>النشاط التجاري</u></strong></a></p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/miras-hukuku-nedir/"><strong><u>الميراث</u></strong></a></p></li>
<li><p>اكتساب المنقولات وغير المنقولات ونقلها</p></li></ul>
<p>من قبل حاملي تصاريح الإقامة طويلة الأمد تُجرى من قبل المؤسسات المعنية وفق التشريعات المطبقة على المواطنين الأتراك. ومع ذلك، حيث تتطلب أحكام قانونية خاصة الجنسية التركية لاستخدام هذه الحقوق، لا يجوز لحاملي تصريح الإقامة طويل الأمد المطالبة بهذه الحقوق.</p>`,
      },
      {
        title: "المستندات المطلوبة للتقديم",
        content: `<p>المستندات التي تطلبها مديرية الهجرة في المحافظة أثناء طلب تصريح إقامة طويل الأمد هي:</p>
<ul><li><p>نموذج طلب تصريح الإقامة</p></li>
<li><p>أصل جواز السفر أو الوثيقة البديلة ونسخته</p></li>
<li><p>4 صور بيومترية (معايير ICAO)</p></li>
<li><p>تأمين صحي</p></li>
<li><p>السجل الجنائي</p></li>
<li><p>إيصالات دفع الرسوم المطلوبة</p></li>
<li><p>مستندات إثبات وسائل مالية كافية طوال مدة التصريح</p></li>
<li><p>مستند مختوم وموقع يثبت عدم تلقي مساعدة اجتماعية خلال آخر 3 سنوات</p></li>
<li><p>مستند يثبت التسجيل في نظام تسجيل العناوين (AKS)</p></li>
<li><p>مستند يثبت الإقامة المستمرة في Türkiye لمدة 8 سنوات</p></li>
<li><p>مستندات تتعلق بأي تصريح إقامة سابق</p></li>
<li><p>مستند يثبت محل الإقامة إذا مُنحت إقامة طويلة الأمد (سند ملكية، عقد إيجار، إلخ)</p></li>
<li><p>مستندات إضافية حسب الحالة</p></li></ul>
<p>رغم أن المستندات مفصلة كما أعلاه، فإن الأخطاء محتملة جداً إذا تقدم الأجانب لإقامة طويلة الأمد دون استشارة قانونية. لذلك يُنصح بالحصول على دعم قانوني لإكمال عملية التقديم بأفضل شكل ومتابعتها بشكل صحيح thereafter.</p><p>يُنصح المتقدمون بالحصول على دعم قانوني من محامٍ متخصص في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>قانون الأجانب</u></strong></a> قبل تقديم الطلب، لضمان اكتمال المستندات وتقديمها بشكل صحيح وتجنب فقدان الحقوق في الإجراءات الإدارية.</p>`,
      },
      {
        title: "تصريح الإقامة طويل الأمد وتصريح العمل غير المحدد",
        content: `<p>بموجب <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6735.pdf">قانون قوة العمل الدولية</a>، يجوز للأجانb الحاملين <strong>تصريح إقامة طويل الأمد</strong> في Türkiye أو من أمضى ثماني سنوات على الأقل بتصريح عمل قانوني التقدم لتصريح عمل غير محدد. يجب التأكيد أن الأجنبي الحامل لتصريح عمل غير محدد يستفيد أيضاً من جميع الحقوق التي يوفرها تصريح الإقامة طويل الأمد.</p>
<p>للحصول على معلومات تفصيلية حول الحصول على تصريح إقامة في Türkiye، راجع مقالنا بعنوان "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>كيفية الحصول على تصريح إقامة (إkamet izni)؟</u></strong></a>".</p>`,
      },
      annulmentResidence("ar", permitLabel.ar),
      { title: faqTitles.ar, content: faqLawyer.ar + faqExtra("ar") },
    ],
  },
  ru: {
    ...meta.ru,
    sections: [
      {
        title: "Как получить долгосрочный вид на жительство (ikamet izni)?",
        content: `<p>Иностранцы, желающие бессрочного пребывания в Türkiye, могут получить «долгосрочный вид на жительство», если они соответствуют условиям, указанным в <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6458.pdf">Законе № 6458 об иностранцах и международной защите</a>. Долгосрочные виды на жительство выдаются гubernatorствами с одобрения Министерства внутренних дел. Иностранцы, желающие получить бессрочное проживание в Türkiye, должны непрерывно проживать в стране не менее восьми лет на основании вида на жительство. Кроме того, иностранец не должен получать социальную помощь в течение последних трех лет и должен иметь регулярный и достаточный доход. Если иностранец соответствует этим установленным законом условиям, он может иметь долгосрочный вид на жительство.</p>
<p>Следует сразу отметить, что даже если эти условия не выполнены, иностранцы, соответствующие условиям, определенным <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.goc.gov.tr/goc-kurulu">Советом миграционной политики</a>, также могут получить долгосрочный вид на жительство. Однако при рассмотрении заявления о долгосрочном виде на жительство компетентный орган во всех случаях должен прийти к выводу, что иностранец не представляет угрозы общественному порядку или общественной безопасности.</p>
<p>Держатели долгосрочного вида на жительство могут пользоваться теми же правами, что предоставлены гражданам Türkiye, с учетом определенных исключений. Некоторые из этих исключений: обязанность проходить военную службу, право избирать и быть избранным, право занимать государственную должность.</p>`,
      },
      {
        title: "Что такое долгосрочный вид на жительство?",
        content: `<p>Под «долгосрочным видом на жительство» по существу понимается «бессрочный вид на жительство». Тип вида на жительство, на который подают заявление иностранцы, непрерывно проживавшие в Türkiye не менее восьми лет на основании вида на жительство и также соответствующие условиям, определенным Советом миграционной политики, называется «долгосрочным видом на жительство». Иностранец, получивший долгосрочный вид на жительство, приобретает право оставаться в стране бессрочно без подачи заявления о продлении вида на жительство.</p>`,
      },
      {
        title: "Условия долгосрочного ВНЖ",
        content: `<p>Статья 43 Закона об иностранцах и международной защите регулирует условия, которые иностранец должен выполнить для получения долгосрочного вида на жительство.</p>
<p>Согласно этому, для долгосрочного вида на жительство должны быть соблюдены следующие условия:</p>
<ul><li><p>непрерывное пребывание в Türkiye не менее восьми лет на основании вида на жительство,</p></li>
<li><p>отсутствие получения социальной помощи за последние три года,</p></li>
<li><p>наличие достаточного и регулярного дохода для содержания себя и, при наличии, семьи,</p></li>
<li><p>наличие действующей медицинской страховки,</p></li>
<li><p>отсутствие угрозы общественному порядку или общественной безопасности</p></li></ul>
<p>должны быть выполнены.</p>
<p>Кроме того, даже если заявитель не соответствует этим условиям, он может получить долгосрочный вид на жительство, если выполняет условия, определенные Советом миграционной политики. Однако во всех случаях будет проверяться, представляет ли иностранец угрозу общественному порядку или общественной безопасности.</p>`,
      },
      {
        title: "Расчет 8 лет",
        content: `<p>Как подробно изложено выше, перед подачей заявления о долгосрочном виде на жительство иностранец должен непрерывно проживать в Türkiye восемь лет на основании действующего вида на жительство. При расчете восьмилетнего периода за основу принимается дата подачи заявления о долгосрочном проживании. Периоды пребывания за границей или в Türkiye без вида на жительство в расчет не включаются.</p>
<p>При ретросpectивном расчете за один год, если установлено, что иностранец находился в Türkiye менее 180 дней в этом году, проверяются периоды пребывания в стране за последние 5 лет. Если установлено, что более 365 дней было проведено за границей в течение проверяемого 5-летнего периода, заявление о долгосрочном проживании будет отклонено.</p>
<p>Если установлено, что иностранец, подавший заявление о долгосрочном проживании, оставался за границей более шести (6) месяцев, заявление будет отклонено напрямую без ретросpectивной проверки.</p>`,
      },
      {
        title: "Кому выдается?",
        content: `<p>Согласно статье 42 Закона об иностранцах и международной защите к числу лиц, которые могут получить долгосрочное проживание, относятся:</p>
<ul><li><p>иностранцы, непрерывно проживавшие в Türkiye не менее восьми лет и также соблюдающие условия, определенные Министерством,</p></li>
<li><p>иностранцы, не являющиеся беженцами, условными беженцами или обладателями статуса субсидиарной защиты,</p></li>
<li><p>иностранцы, не пользующиеся гуманитарным видом на жительство или временной защитой, могут получить долгосрочное проживание.</p></li></ul><p></p>`,
      },
      {
        title: "Права",
        content: `<p>Иностранцы, имеющие долгосрочный вид на жительство, могут пользоваться правами, предоставленными гражданам Türkiye, с учетом определенных исключений. Эти исключения: военная служба, право избирать и быть избранным, поступление на государственную службу и ввоз транспортных средств без пошлин. Обладатель долгосрочного вида на жительство освобожден от военной службы в Türkiye, не имеет права избирать и быть избранным и не может поступить на государственную службу.</p>
<p>Однако следует сразу отметить, что их приобретенные права социального обеспечения сохраняются, а использование этих прав регулируется положениями соответствующего закона.</p>
<p>Сделки в Türkiye, связанные с</p>
<ul><li><p>проживанием</p></li>
<li><p>поездками</p></li>
<li><p>работой</p></li>
<li><p>инвестициями</p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/anonim-sirket-kurulusu/"><strong><u>коммерческой деятельностью</u></strong></a></p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/miras-hukuku-nedir/"><strong><u>наследством</u></strong></a></p></li>
<li><p>приобретением и передачей движимого и недвижимого имущества</p></li></ul>
<p>лицами с долгосрочным видом на жительство осуществляются соответствующими учреждениями согласно законодательству, применяемому к гражданам Türkiye. Однако если специальные правовые положения требуют гражданства Türkiye для использования этих прав, обладатели долгосрочного вида на жительство не могут претендовать на эти права.</p>`,
      },
      {
        title: "Документы",
        content: `<p>Документы, запрашиваемые управлением миграции во время подачи заявления о долгосрочном виде на жительство, следующие:</p>
<ul><li><p>Форма заявления на вид на жительство</p></li>
<li><p>Оригинал и копия паспорта или документа, его заменяющего</p></li>
<li><p>4 биометрические фотографии (стандарт ICAO)</p></li>
<li><p>Медицинская страховка</p></li>
<li><p>Справка о несудимости</p></li>
<li><p>Квитанции об оплате необходимых сборов</p></li>
<li><p>Документы, подтверждающие достаточные финансовые средства на период действия разрешения</p></li>
<li><p>Заверенный и подписанный документ об отсутствии социальной помощи за последние 3 года</p></li>
<li><p>Документ, подтверждающий регистрацию в системе регистрации адресов (AKS)</p></li>
<li><p>Документ, подтверждающий непрерывное проживание в Türkiye в течение 8 лет</p></li>
<li><p>Документы, относящиеся к любому ранее выданному виду на жительство</p></li>
<li><p>Документ, подтверждающий место проживания при выдаче долгосрочного проживания (право собственности, договор аренды и т. д.)</p></li>
<li><p>Дополнительные документы в зависимости от ситуации</p></li></ul>
<p>Хотя перечень документов приведен подробно, ошибки весьма вероятны, если иностранцы подают заявление о долгосрочном проживании без юридической консультации. Поэтому рекомендуется получить правовую поддержку для наилучшего завершения процесса подачи и его дальнейшего сопровождения.</p>`,
      },
      {
        title: "Долгосрочный ВНЖ и бессрочный work permit",
        content: `<p>Согласно <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6735.pdf">Закону о международной рабочей силе</a>, иностранцы, имеющие <strong>долгосрочный вид на жительство</strong> в Türkiye или не менее восьми лет законного разрешения на работу, могут подать заявление о бессрочном разрешении на работу. Следует отметить, что иностранец, имеющий бессрочное разрешение на работу, также пользуется всеми правами, предоставляемыми долгосрочным видом на жительство.</p>
<p>Для подробной информации о получении вида на жительство в Türkiye см. нашу статью «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>Как получить вид на жительство (ikamet izni)?</u></strong></a>».</p>`,
      },
      annulmentResidence("ru", permitLabel.ru),
      { title: faqTitles.ru, content: faqLawyer.ru + faqExtra("ru") },
    ],
  },
  fa: {
    ...meta.fa,
    sections: [
      {
        title: "چگونه مجوز اقامت بلندمدت (ikamet izni) بگیریم؟",
        content: `<p>اتباع خارجی که می‌خواهند اقامت نامحدود در Türkiye داشته باشند، در صورت احراز شرایط مقرر در <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6458.pdf">قانون شماره 6458 درباره اتباع خارجی و حمایت بین‌المللی</a> می‌توانند «مجوز اقامت بلندمدت» بگیرند. مجوزهای اقامت بلندمدت توسط استانداری‌ها با تأیید وزارت کشور صادر می‌شوند. اتباع خارجی که می‌خواهند اقامت نامحدود در Türkiye داشته باشند باید حداقل هشت سال پیوسته با مجوز اقامت در کشور مانده باشند. علاوه بر این، اتباع خارجی نباید در سه سال اخیر کمک اجتماعی دریافت کرده باشند و باید درآمد منظم و کافی داشته باشند. اگر اتباع خارجی این شرایط قانونی را داشته باشد، می‌تواند مجوز اقامت بلندمدت بگیرد.</p>
<p>باید فوراً تأکید شود که حتی اگر این شرایط برقرار نباشد، اتباع خارجی که شرایط تعیین‌شده توسط <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.goc.gov.tr/goc-kurulu">شورای سیاست‌های مهاجرت</a> را دارند نیز می‌توانند مجوز اقامت بلندمدت بگیرند. با این حال، هنگام بررسی درخواست مجوز اقامت بلندمدت، مرجع صلاحیت‌دار در همه موارد باید نظر بدهد که اتباع خارجی تهدیدی برای نظم عمومی یا امنیت عمومی محسوب نمی‌شود.</p>
<p>دارندگان مجوز اقامت بلندمدت می‌توانند از همان حقوقی که به شهروندان Türkiye داده می‌شود با رعایت برخی استثناها بهره ببرند. برخی از این استثناها خدمت نظام وظیفه، حق انتخاب و انتخاب شدن، و حق ورود به مشاغل دولتی است.</p>`,
      },
      {
        title: "مجوز اقامت بلندمدت چیست؟",
        content: `<p>منظور از «مجوز اقامت بلندمدت» اساساً «مجوز اقامت نامحدود» است. نوع مجوز اقامتی که توسط اتباع خارجی که حداقل هشت سال پیوسته با مجوز اقامت در Türkiye مانده‌اند و همچنین شرایط تعیین‌شده توسط شورای سیاست‌های مهاجرت را دارند درخواست می‌شود، «مجوز اقامت بلندمدت» نامیده می‌شود. اتباع خارجی که مجوز اقامت بلندمدت می‌گیرد، حق ماندن نامحدود در کشور را بدون درخواست تمدید مجوز اقامت به دست می‌آورد.</p>`,
      },
      {
        title: "شرایط مجوز اقامت بلندمدت",
        content: `<p>ماده 43 قانون اتباع خارجی و حمایت بین‌المللی شرایطی را که اتباع خارجی برای مجوز اقامت بلندمدت باید برآورده کند تنظیم می‌کند.</p>
<p>بر این اساس، برای مجوز اقامت بلندمدت باید موارد زیر برقرار باشد:</p>
<ul><li><p>اقامت پیوسته در Türkiye حداقل هشت سال با مجوز اقامت،</p></li>
<li><p>عدم دریافت کمک اجتماعی در سه سال اخیر،</p></li>
<li><p>داشتن درآمد کافی و منظم برای تأمین خود و در صورت وجود خانواده،</p></li>
<li><p>داشتن بیمه درمانی معتبر،</p></li>
<li><p>عدم ایجاد تهدید برای نظم عمومی یا امنیت عمومی</p></li></ul>
<p>باید احراز شود.</p>
<p>علاوه بر این، حتی اگر متقاضی این شرایط را نداشته باشد، در صورت احراز شرایط تعیین‌شده توسط شورای سیاست‌های مهاجرت می‌تواند مجوز اقامت بلندمدت بگیرد. با این حال در همه موارد بررسی می‌شود که آیا اتباع خارجی تهدیدی برای نظم عمومی یا امنیت عمومی محسوب می‌شود یا خیر.</p>`,
      },
      {
        title: "محاسبه 8 سال",
        content: `<p>همان‌طور که در بالا به تفصیل توضیح داده شد، پیش از درخواست مجوز اقامت بلندمدت، اتباع خارجی باید هشت سال پیوسته با مجوز اقامت معتبر در Türkiye اقامت داشته باشد. در محاسبه دوره هشت سال، تاریخ درخواست اقامت بلندمدت مبنا قرار می‌گیرد. مدت‌هایی که خارج از کشور یا در Türkiye بدون مجوز اقامت سپری شده‌اند در محاسبه لحاظ نمی‌شوند.</p>
<p>در محاسبات یک‌ساله با اثر retroactive، اگر مشخص شود اتباع خارجی در آن سال کمتر از 180 روز در Türkiye بوده، دوره‌های اقامت در کشور در 5 سال اخیر بررسی می‌شود. اگر مشخص شود بیش از 365 روز در دوره 5 ساله مورد بررسی خارج از کشور بوده، درخواست اقامت بلندمدت منفی نتیجه می‌دهد.</p>
<p>اگر مشخص شود متقاضی اقامت بلندمدت بیش از شش (6) ماه خارج از کشور مانده، درخواست بدون بررسی retroactive مستقیماً رد می‌شود.</p>`,
      },
      {
        title: "به چه کسانی داده می‌شود؟",
        content: `<p>طبق ماده 42 قانون اتباع خارجی و حمایت بین‌المللی، اشخاصی که می‌توانند اقامت بلندمدت بگیرند عبارت‌اند از:</p>
<ul><li><p>اتباع خارجی که حداقل هشت سال پیوسته در Türkiye اقامت داشته و همچنین شرایط تعیین‌شده توسط وزارت را رعایت می‌کنند،</p></li>
<li><p>اتباع خارجی که پناهنده، پناهنده مشروط یا دارنده وضعیت حمایت ثانویه نیستند،</p></li>
<li><p>اتباع خارجی که از اقامت انسانی یا حمایت موقت بهره‌مند نیستند می‌توانند اقامت بلندمدت بگیرند.</p></li></ul><p></p>`,
      },
      {
        title: "حقوق مجوز",
        content: `<p>اتباع خارجی دارنده مجوز اقامت بلندمدت می‌توانند از حقوق اعطاشده به شهروندان Türkiye با رعایت برخی استثناها بهره ببرند. این استثناها خدمت نظام وظیفه، حق انتخاب و انتخاب شدن، ورود به مشاغل دولتی و واردات معاف خودرو است. دارنده مجوز اقامت بلندمدت از خدمت نظام وظیفه در Türkiye معاف است، حق رأی و نامزدی ندارد و نمی‌تواند وارد مشاغل دولتی شود.</p>
<p>اما باید فوراً تأکید شود که حقوق تأمین اجتماعی اکتسابی آنها محفوظ است و استفاده از این حقوق تابع مقررات قانون مربوط است.</p>
<p>معاملات در Türkiye مربوط به</p>
<ul><li><p>اقامت</p></li>
<li><p>سفر</p></li>
<li><p>کار</p></li>
<li><p>سرمایه‌گذاری</p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/anonim-sirket-kurulusu/"><strong><u>فعالیت تجاری</u></strong></a></p></li>
<li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/miras-hukuku-nedir/"><strong><u>ارث</u></strong></a></p></li>
<li><p>اکتساب و انتقال اموال منقول و غیرمنقول</p></li></ul>
<p>توسط دارندگان مجوز اقامت بلندمدت توسط نهادهای مربوط طبق قوانین اعمال‌شده بر شهروندان انجام می‌شود. اما هرگاه مقررات قانونی خاص تابعیت Türkiye را برای استفاده از این حقوق بخواهد، دارندگان مجوز اقامت بلندمدت نمی‌توانند این حقوق را مطالبه کنند.</p>`,
      },
      {
        title: "مدارک درخواست",
        content: `<p>مدارکی که اداره مهاجرت استان در جریان درخواست مجوز اقامت بلندمدت درخواست می‌کند به شرح زیر است:</p>
<ul><li><p>فرم درخواست مجوز اقامت</p></li>
<li><p>اصل و کپی گذرنامه یا سند جایگزین</p></li>
<li><p>4 عکس بیومتریک (استاندارد ICAO)</p></li>
<li><p>بیمه درمانی</p></li>
<li><p>گواهی عدم سوءپیشینه</p></li>
<li><p>رسید پرداخت عوارض لازم</p></li>
<li><p>مدارک اثبات تمکن مالی کافی برای مدت مجوز</p></li>
<li><p>سند مهر و امضاشده مبنی بر عدم دریافت کمک اجتماعی در 3 سال اخیر</p></li>
<li><p>سند ثبت در سامانه ثبت آدرس (AKS)</p></li>
<li><p>سند اثبات اقامت پیوسته در Türkiye به مدت 8 سال</p></li>
<li><p>مدارک مربوط به هر مجوز اقامت قبلی</p></li>
<li><p>سند اثبات محل سکونت در صورت اعطای اقامت بلندمدت (سند مالکیت، قرارداد اجاره و غیره)</p></li>
<li><p>مدارک تکمیلی بسته به وضعیت</p></li></ul>
<p>اگرچه مدارک به تفصیل فهرست شده‌اند، اگر اتباع خارجی بدون مشاوره حقوقی برای اقامت بلندمدت درخواست دهند احتمال خطا بسیار زیاد است. بنابراین توصیه می‌شود برای تکمیل بهتر فرایند درخواست و پیگیری صحیح آن از پشتیبانی حقوقی استفاده شود.</p><p>توصیه می‌شود متقاضیان پیش از ارائه درخواست از وکیل متخصص در <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>حقوق اداری</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>حقوق اتباع خارجی</u></strong></a> پشتیبانی حقوقی بگیرند تا مدارک کامل و صحیح ارائه شود و از از دست رفتن حقوق در فرایند اداری جلوگیری شود.</p>`,
      },
      {
        title: "مجوز بلندمدت و مجوز کار نامحدود",
        content: `<p>طبق <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6735.pdf">قانون نیروی کار بین‌المللی</a>، اتباع خارجی دارنده <strong>مجوز اقامت بلندمدت</strong> در Türkiye یا حداقل هشت سال مجوز کار قانونی می‌توانند برای مجوز کار نامحدود درخواست دهند. باید تأکید شود که اتباع خارجی دارنده مجوز کار نامحدود از تمام حقوقی که مجوز اقامت بلندمدت فراهم می‌کند نیز بهره‌مند می‌شود.</p>
<p>برای اطلاعات تفصیلی درباره گرفتن مجوز اقامت در Türkiye، مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/oturma-izni-nasil-alinir/"><strong><u>چگونه مجوز اقامت (ikamet izni) بگیریم؟</u></strong></a>» را ببینید.</p>`,
      },
      annulmentResidence("fa", permitLabel.fa),
      { title: faqTitles.fa, content: faqLawyer.fa + faqExtra("fa") },
    ],
  },
};
