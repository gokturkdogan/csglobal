import { annulmentResidence, faqLawyer, faqTitles } from "../batch1-shared.mjs";
import {
  kisaDonemConditions,
  kisaDonemDuration,
  kisaDonemExtension,
  kisaDonemRefusal,
  kisaDonemWhereApply,
  kisaDonemWhoApplies,
} from "../batch1-kisa-donem-i18n.mjs";

const meta = {
  en: {
    name: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
    excerpt: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
    heroTitle: "How to Obtain a Short-Term Residence Permit (İkamet İzni)?",
  },
  ar: {
    name: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
    excerpt: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
    heroTitle: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
  },
  ru: {
    name: "Как получить краткосрочный вид на жительство (ikamet izni)?",
    excerpt: "Как получить краткосрочный вид на жительство (ikamet izni)?",
    heroTitle: "Как получить краткосрочный вид на жительство (ikamet izni)?",
  },
  fa: {
    name: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
    excerpt: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
    heroTitle: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
  },
};

const permitLabel = {
  en: "short-term residence permit",
  ar: "تصريح الإقامة قصير الأمد",
  ru: "краткосрочном виде на жительство",
  fa: "مجوز اقامت کوتاه‌مدت",
};

function faqExtra(locale) {
  const t = {
    en: `<p><strong>How Long Do Short-Term Residence Permit Applications Take to Conclude?</strong></p>
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
    ar: `<p><strong>كم تستغرق طلبات تصريح الإقامة قصير الأمد؟</strong></p>
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
    ru: `<p><strong>Сколько времени рассматриваются заявления о краткосрочном ВНЖ?</strong></p>
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
    fa: `<p><strong>درخواست مجوز اقامت کوتاه‌مدت چقدر طول می‌کشد؟</strong></p>
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
  };
  return t[locale];
}

export default {
  en: {
    ...meta.en,
    sections: [
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
      annulmentResidence("en", permitLabel.en),
      {
        title: faqTitles.en,
        content: faqLawyer.en + faqExtra("en"),
      },
    ],
  },
  ar: {
    ...meta.ar,
    sections: [
      {
        title: "كيفية الحصول على تصريح إقامة قصير الأمد (إkamet izni)؟",
        content: `<p>تُنظم أحكام إجراءات الإقامة (ikamet) والتأشيرة للأجانb في Türkiye في قانون الأجانب والحماية الدولية. ينظم القانون أكثر من نوع لتصريح الإقامة. يمنح تصريح الإقامة قصير الأمد، المعروف باسم تصريح الإقامة، الأجانب غير المواطنين الأتراك الحق في البقاء في Türkiye لفترة محددة. قد تُمنح هذه التصاريح لأغراض وأسباب مختلفة.</p>
<p>تصريح الإقامة هو الوثيقة القانونية التي يجب الحصول عليها من مديرية الهجرة في مكان وجود الأجنبي، وتحدد المدة التي يجوز للأجنبي البقاء فيها في Türkiye، لكل أجنبي سيقيم في Türkiye أكثر من مدة التأشيرة أو الإعفاء منها أو أكثر من تسعين (90) يوماً. يجب على الأجانب الحصول على تصريح إقامة للبقاء في Türkiye في فترات لا تغطيها صلاحية التأشيرة.</p>
<p>تصريح الإقامة قصير الأمد هو أكثر أنواع تصاريح الإقامة طلباً لأنه أسهل في الحصول عليه من الأنواع الأخرى. قد تُمنح هذه التصاريح لأغراض وأسباب مختلفة مثل السياحة والتعليم والعلاج والاستثمار العقاري وغيرها.</p><p>يُنصح المتقدمون بالحصول على دعم قانوني من محامٍ متخصص في <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>قانون الأجانب</u></strong></a> قبل تقديم الطلب، لضمان اكتمال المستندات وتقديمها بشكل صحيح وتجنب فقدان الحقوق في الإجراءات الإدارية.</p>`,
      },
      {
        title: "من يمكنه التقدم لتصريح إقامة قصير الأمد؟",
        content: kisaDonemWhoApplies.ar,
      },
      {
        title: "شروط تصريح الإقامة قصير الأمد",
        content: kisaDonemConditions.ar,
      },
      {
        title: "مدة تصريح الإقامة قصير الأمد",
        content: kisaDonemDuration.ar,
      },
      {
        title: "أين يُقدَّم طلب تصريح الإقامة قصير الأمد؟",
        content: kisaDonemWhereApply.ar,
      },
      {
        title: "تمديد تصريح الإقامة قصير الأمد",
        content: kisaDonemExtension.ar,
      },
      {
        title: "رفض أو إلغاء أو عدم تمديد تصريح الإقامة قصير الأمد",
        content: kisaDonemRefusal.ar,
      },

      annulmentResidence("ar", permitLabel.ar),
      { title: faqTitles.ar, content: faqLawyer.ar + faqExtra("ar") },
    ],
  },
  ru: {
    ...meta.ru,
    sections: [
      {
        title: "Как получить краткосрочный вид на жительство (ikamet izni)?",
        content: `<p>Нормы о процедурах пребывания (ikamet) и визах для иностранцев в Türkiye содержатся в Законе об иностранцах и международной защите. Краткосрочный вид на жительство предоставляет иностранцам, не являющимся гражданами Türkiye, право оставаться в стране на определенный срок.</p>
<p>Вид на жительство - это документ, который необходимо получить в провинциальном управлении по вопросам миграции по месту нахождения иностранца и который определяет срок его пребывания в Türkiye, если он будет находиться в стране дольше срока визы или визовой льготы или более девяноста (90) дней.</p>
<p>Краткосрочный вид на жительство - наиболее часто запрашиваемый тип, поскольку его проще получить, чем другие виды.</p>`,
      },
      {
        title: "Кто может подать заявление о краткосрочном виде на жительство?",
        content: kisaDonemWhoApplies.ru,
      },
      {
        title: "Условия краткосрочного вида на жительство",
        content: kisaDonemConditions.ru,
      },
      {
        title: "Срок краткосрочного вида на жительство",
        content: kisaDonemDuration.ru,
      },
      {
        title: "Куда подается заявление о краткосрочном виде на жительство?",
        content: kisaDonemWhereApply.ru,
      },
      {
        title: "Продление краткосрочного вида на жительство",
        content: kisaDonemExtension.ru,
      },
      {
        title: "Отказ, аннулирование или непродление краткосрочного вида на жительство",
        content: kisaDonemRefusal.ru,
      },

      annulmentResidence("ru", permitLabel.ru),
      { title: faqTitles.ru, content: faqLawyer.ru + faqExtra("ru") },
    ],
  },
  fa: {
    ...meta.fa,
    sections: [
      {
        title: "چگونه مجوز اقامت کوتاه‌مدت (ikamet izni) بگیریم؟",
        content: `<p>احکام مربوط به اقامت (ikamet) و ویزای اتباع خارجی در Türkiye در قانون اتباع خارجی و حمایت بین‌المللی تنظیم شده است. این قانون بیش از یک نوع مجوز اقامت را برای اتباع خارجی در Türkiye تنظیم می‌کند. مجوز اقامت کوتاه‌مدت که به نام مجوز اقامت نیز شناخته می‌شود، به اتباع خارجی غیرترک حق ماندن در Türkiye برای مدت معین را می‌دهد. این مجوزها می‌توانند برای اهداف و دلایل مختلف داده شوند.</p>
<p>مجوز اقامت سند حقوقی است که باید از اداره مهاجرت استان محل حضور اتباع خارجی گرفته شود و مدت اقامتی را که اتباع خارجی می‌تواند در Türkiye بماند تعیین می‌کند، برای هر اتباع خارجی که بیش از مدت اعطاشده توسط ویزا یا معافیت ویزا یا بیش از نود (90) روز در Türkiye بماند. اتباع خارجی باید برای ماندن در Türkiye در دوره‌هایی که تحت پوشش اعتبار ویزا نیست، مجوز اقامت بگیرند.</p>
<p>مجوز اقامت کوتاه‌مدت پرتقاضاترین نوع مجوز اقامت است چون نسبت به سایر انواع آسان‌تر گرفته می‌شود.</p><p>توصیه می‌شود متقاضیان پیش از ارائه درخواست از وکیل متخصص در <a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>حقوق اداری</u></strong></a> و<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/yabancilar-hukuku/"><strong><u>حقوق اتباع خارجی</u></strong></a> پشتیبانی حقوقی بگیرند تا مدارک کامل و صحیح ارائه شود و از از دست رفتن حقوق در فرایند اداری جلوگیری شود.</p>`,
      },
      {
        title: "چه کسانی می‌توانند درخواست مجوز اقامت کوتاه‌مدت بدهند؟",
        content: kisaDonemWhoApplies.fa,
      },
      {
        title: "شرایط مجوز اقامت کوتاه‌مدت",
        content: kisaDonemConditions.fa,
      },
      {
        title: "مدت مجوز اقامت کوتاه‌مدت",
        content: kisaDonemDuration.fa,
      },
      {
        title: "درخواست مجوز اقامت کوتاه‌مدت کجا ارائه می‌شود؟",
        content: kisaDonemWhereApply.fa,
      },
      {
        title: "تمدید مجوز اقامت کوتاه‌مدت",
        content: kisaDonemExtension.fa,
      },
      {
        title: "رد، لغو یا عدم تمدید مجوز اقامت کوتاه‌مدت",
        content: kisaDonemRefusal.fa,
      },
      annulmentResidence("fa", permitLabel.fa),
      { title: faqTitles.fa, content: faqLawyer.fa + faqExtra("fa") },
    ],
  },
};
