/** Reusable translation snippets for FC batch 1 content pages. */

export const faqTitles = {
  en: "Frequently Asked Questions",
  ar: "الأسئلة الشائعة",
  ru: "Часто задаваемые вопросы",
  fa: "سؤالات متداول",
};

export const faqLawyer = {
  en: `<p><strong>Is There an Obligation to Hire a Lawyer in Administrative Courts?</strong></p>
<p>Turkish law allows parties to defend and represent themselves in court; hiring a lawyer for representation is not mandatory except in certain cases. There is no obligation to hire an administrative law lawyer in administrative courts either.<br>However, because administrative law legislation is complex and deadlines under the Administrative Procedure Law are strict and short, non-lawyers may make formal or substantive errors that cannot be remedied. To avoid loss of rights in the detailed administrative litigation process, we recommend obtaining legal support from lawyers practicing in "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>Administrative Law</u></strong></a>" before taking any step.</p>`,
  ar: `<p><strong>هل يوجد التزام بتوكيل محامٍ في المحاكم الإدارية؟</strong></p>
<p>يسمح القانون التركي للأطراف بالدفاع عن أنفسهم وتمثيل أنفسهم أمام المحاكم، وتوكيل محامٍ للتمثيل ليس إلزامياً إلا في حالات استثنائية. ولا يوجد التزام بتوكيل محامٍ في قانون الإدارة في المحاكم الإدارية.<br>لكن نظراً لتعقيد تشريعات قانون الإدارة وقصر المهل في قانون الإجراءات الإدارية، قد يرتكب غير المختصين أخطاء شكلية أو موضوعية لا يمكن تصحيحها. لتجنب فقدان الحقوق في مسطرة التقاضي الإداري المفصلة، نوصي بالحصول على دعم قانوني من محامين يعملون في "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>قانون الإدارة</u></strong></a>" قبل أي إجراء.</p>`,
  ru: `<p><strong>Обязательно ли нанимать адвоката в административных судах?</strong></p>
<p>Турецкое право допускает, чтобы стороны защищали и представляли себя в суде; найм адвоката для представительства обязателен лишь в отдельных случаях. В административных судах также нет обязанности нанимать адвоката по административному праву.<br>Однако из-за сложности административного законодательства и строгих коротких сроков по Закону об административном судопроизводстве лица без юридического образования могут допустить формальные или существенные ошибки, которые невозможно исправить. Чтобы не потерять права в детализированном административном процессе, рекомендуем получить правовую поддержку у адвокатов, работающих в области «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>административного права</u></strong></a>» до любых действий.</p>`,
  fa: `<p><strong>آیا در دادگاه‌های اداری الزام به استخدام وکیل وجود دارد؟</strong></p>
<p>حقوق ترکیه به طرفین اجازه می‌دهد خود را در دادگاه دفاع و نمایندگی کنند و استخدام وکیل برای نمایندگی جز در موارد استثنایی الزامی نیست. در دادگاه‌های اداری نیز الزام به استخدام وکیل حقوق اداری وجود ندارد.<br>اما به‌دلیل پیچیدگی قوانین حقوق اداری و کوتاه بودن مهلت‌های قانون آیین دادرسی اداری، افراد غیرحقوقی ممکن است خطاهای شکلی یا ماهوی غیرقابل جبران مرتکب شوند. برای جلوگیری از از دست رفتن حقوق در فرایند دقیق دادرسی اداری، پیش از هر اقدامی توصیه می‌کنیم از وکلای فعال در «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/calismaalanlarimiz/idare-hukuku/"><strong><u>حقوق اداری</u></strong></a>» پشتیبانی حقوقی بگیرید.</p>`,
};

export function annulmentResidence(locale, permitLabel) {
  const t = {
    en: {
      title: `Annulment Action Against Refusal of a ${permitLabel} Application`,
      p1: `As explained in detail above, applications for a ${permitLabel} made by foreign nationals who meet the statutory conditions are examined by the administration and decided upon. In some cases, the administration may refuse these applications for various reasons. The grounds for refusal may include failure to meet the conditions set out in the legislation, application with incomplete or incorrect documents, or a refusal decision within the administration's discretionary authority.`,
      p2: `Foreign nationals whose ${permitLabel} application has been refused may bring an annulment action if they consider the refusal decision unlawful. These actions must be brought before the administrative court in the place where the authority that issued the decision is located. The period for bringing the action is 60 days from the date on which the refusal decision is notified to the person concerned.`,
      p3: `Decisions of the administration refusing or accepting a ${permitLabel} application are, in essence, administrative acts. Therefore, for administrative acts to be lawful, they must contain all the elements they are required to have. As explained in our article titled "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>Annulment of Administrative Acts</u></strong></a>", administrative acts in which at least one of the elements of purpose, subject, reason, authority, or form is found to be defective may be annulled by the court.`,
    },
    ar: {
      title: `دعوى إبطال قرار رفض طلب ${permitLabel}`,
      p1: `كما اُوضح بالتفصيل أعلاه، تُفحص طلبات ${permitLabel} المقدمة من الأجانب الذين يستوفون الشروط القانونية من قبل الإدارة ويُبت فيها. في بعض الحالات، قد ترفض الإدارة هذه الطلبات لأسباب مختلفة. قد تشمل أسباب الرفض عدم استيفاء الشروط المنصوص عليها في التشريع، أو التقديم بمستندات ناقصة أو خاطئة، أو قرار رفض ضمن سلطة الإدارة التقديرية.`,
      p2: `يجوز للأجانب الذين رُفض طلب ${permitLabel} لهم رفع دعوى إبطال إذا رأوا أن قرار الرفض غير قانوني. يجب رفع هذه الدعاوى أمام المحكمة الإدارية في مكان الجهة التي أصدرت القرار. مهلة رفع الدعوى 60 يوماً من تاريخ إبلاغ قرار الرفض للمعني.`,
      p3: `قرارات الإدارة برفض أو قبول طلب ${permitLabel} هي في جوهرها إجراءات إدارية. لذلك، لكي تكون الإجراءات الإدارية مشروعة، يجب أن تتضمن جميع العناصر المطلوبة. كما اُوضح في مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>إبطال الإجراءات الإدارية</u></strong></a>"، يمكن للمحكمة إبطال الإجراءات الإدارية التي يتبين أن أحد عناصر الهدف أو الموضوع أو السبب أو الاختصاص أو الشكل فيها معيباً على الأقل.`,
      p4: `للحصول على معلومات تفصيلية حول هذا الموضوع، راجع أيضاً مقالنا "<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi/"><strong><u>دعوى إبطال قرار رفض طلب تصريح الإقامة</u></strong></a>".`,
    },
    ru: {
      title: `Иск об отмене решения об отказе в заявлении о ${permitLabel}`,
      p1: `Как подробно изложено выше, заявления о ${permitLabel}, поданные иностранцами, соответствующими установленным законом условиям, рассматриваются администрацией и по ним принимается решение. В некоторых случаях администрация может отказать в этих заявлениях по различным основаниям. Основаниями отказа могут быть несоблюдение условий, предусмотренных законодательством, подача заявления с неполными или неверными документами либо решение об отказе в рамках усмотрения администрации.`,
      p2: `Иностранцы, которым отказано в заявлении о ${permitLabel}, могут подать иск об отмене, если считают решение об отказе незаконным. Такие иски подаются в административный суд по месту нахождения органа, принявшего решение. Срок подачи иска составляет 60 дней с даты уведомления решения об отказе заинтересованному лицу.`,
      p3: `Решения администрации об отказе или принятии заявления о ${permitLabel} по существу являются административными актами. Поэтому для законности административных актов они должны содержать все необходимые элементы. Как объясняется в нашей статье «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>Отмена административных актов</u></strong></a>», административные акты, в которых хотя бы один из элементов цели, предмета, основания, компетенции или формы признан дефектным, могут быть отменены судом.`,
    },
    fa: {
      title: `دادخواست ابطال تصمیم رد درخواست ${permitLabel}`,
      p1: `همان‌طور که در بالا به تفصیل توضیح داده شد، درخواست‌های ${permitLabel} اشخاصی که شرایط قانونی را برآورده می‌کنند توسط اداره بررسی و درباره آنها تصمیم گرفته می‌شود. در برخی موارد اداره ممکن است این درخواست‌ها را به دلایل مختلف رد کند. دلایل رد می‌تواند عدم برآورده شدن شرایط مقرر در قانون، ارائه مدارک ناقص یا نادرست، یا تصمیم رد در چارچوب اختیار تقدیری اداره باشد.`,
      p2: `اتباع خارجی که درخواست ${permitLabel} آنها رد شده اگر تصمیم رد را غیرقانونی بدانند می‌توانند دادخواست ابطال بدهند. این دادخواست‌ها باید در دادگاه اداری محل مرجعی که تصمیم را صادر کرده اقامه شود. مهلت اقامه دادخواست 60 روز از تاریخ ابلاغ رد درخواست به ذی‌نفع است.`,
      p3: `تصمیمات اداره درباره رد یا پذیرش درخواست ${permitLabel} اساساً اقدامات اداری هستند. بنابراین برای مشروعیت اقدامات اداری باید تمام عناصر لازم را داشته باشند. همان‌طور که در مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/idari-islemlerin-iptali-davasi/"><strong><u>ابطال اقدامات اداری</u></strong></a>» توضیح داده شده، اقدامات اداری که حداقل یکی از عناصر هدف، موضوع، علت، صلاحیت یا شکل آنها معیوب باشد می‌توانند توسط دادگاه ابطال شوند.`,
      p4: `برای اطلاعات تفصیلی درباره این موضوع، مقاله «<a target="_blank" rel="noopener noreferrer nofollow" class="text-csg-blue underline cursor-pointer" href="https://kulacoglu.av.tr/ikamet-izni-basvurusunun-reddi-kararinin-iptali-davasi/"><strong><u>دادخواست ابطال تصمیم رد درخواست مجوز اقامت</u></strong></a>» را نیز ببینید.`,
    },
  };
  const x = t[locale];
  const extra = x.p4 ? `\n<p>${x.p4}</p>` : "";
  return { title: x.title, content: `<p>${x.p1}</p>\n<p>${x.p2}</p>\n<p>${x.p3}</p>${extra}` };
}

