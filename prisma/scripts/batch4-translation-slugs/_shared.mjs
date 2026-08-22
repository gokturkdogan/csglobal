export const FEE_TABLE = {
  en: "PERMIT TYPE/DURATION,FEE AMOUNT (TL),Fixed-term/ up to 1 year (1 year inclusive),3,090.20,Fixed-term/ more than 1 year and up to 2 years,6,180.40,Fixed-term/ more than 2 years and up to 3 years,9,270.60,Fixed-term/ more than 3 years and up to 4 years,12,360.80,Fixed-term/ more than 4 years and up to 5 years,15,451.00,Indefinite,30,914.50,Independent,30,914.50.",
  ar: "نوع/مدة التصريح,مبلغ الرسم (TL),مؤقت/ حتى سنة (شاملة),3,090.20,مؤقت/ أكثر من سنة وحتى سنتين,6,180.40,مؤقت/ أكثر من سنتين وحتى 3 سنوات,9,270.60,مؤقت/ أكثر من 3 سنوات وحتى 4 سنوات,12,360.80,مؤقت/ أكثر من 4 سنوات وحتى 5 سنوات,15,451.00,غير محدد المدة,30,914.50,مستقل,30,914.50.",
  ru: "ТИП/СРОК,СУММА ПОШЛИНЫ (TL),Срочное/ до 1 года (включ.),3,090.20,Срочное/ свыше 1 года до 2 лет,6,180.40,Срочное/ свыше 2 лет до 3 лет,9,270.60,Срочное/ свыше 3 лет до 4 лет,12,360.80,Срочное/ свыше 4 лет до 5 лет,15,451.00,Бессрочное,30,914.50,Независимое,30,914.50.",
  fa: "نوع/مدت,مبلغ حق (TL),موقت/ تا 1 سال (شامل),3,090.20,موقت/ بیش از 1 سال تا 2 سال,6,180.40,موقت/ بیش از 2 سال تا 3 سال,9,270.60,موقت/ بیش از 3 سال تا 4 سال,12,360.80,موقت/ بیش از 4 سال تا 5 سال,15,451.00,نامحدود,30,914.50,مستقل,30,914.50.",
};

export const BAKICI_FEE_TABLE = {
  en: "PERMIT TYPE/DURATION,FEE AMOUNT (TL),Fixed-term/ up to 1 year (1 year inclusive),3,090.20,Fixed-term/ more than 1 year and up to 2 years,6,180.40,Fixed-term/ more than 2 years and up to 3 years,9,270.60,Fixed-term/ more than 3 years and up to 4 years,12,360.80,Fixed-term/ more than 4 years and up to 5 years,15,451.00,Indefinite,30,914.50,Independent,30,914.50,Temporary Protection Work Permit/ 1 year (standard),1,149.60.",
  ar: "نوع/مدة التصريح,مبلغ الرسم (TL),مؤقت/ حتى سنة,3,090.20,مؤقت/ أكثر من سنة وحتى سنتين,6,180.40,مؤقت/ أكثر من سنتين وحتى 3 سنوات,9,270.60,مؤقت/ أكثر من 3 سنوات وحتى 4 سنوات,12,360.80,مؤقت/ أكثر من 4 سنوات وحتى 5 سنوات,15,451.00,غير محدد,30,914.50,مستقل,30,914.50,تصريح عمل الحماية المؤقتة/ سنة,1,149.60.",
  ru: "ТИП/СРОК,ПОШЛИНА (TL),Срочное/ до 1 года,3,090.20,Срочное/ 1-2 года,6,180.40,Срочное/ 2-3 года,9,270.60,Срочное/ 3-4 года,12,360.80,Срочное/ 4-5 лет,15,451.00,Бессрочное,30,914.50,Независимое,30,914.50,Временная защита/ 1 год,1,149.60.",
  fa: "نوع/مدت,حق (TL),موقت/ تا 1 سال,3,090.20,موقت/ 1-2 سال,6,180.40,موقت/ 2-3 سال,9,270.60,موقت/ 3-4 سال,12,360.80,موقت/ 4-5 سال,15,451.00,نامحدود,30,914.50,مستقل,30,914.50,حمایت موقت/ 1 سال,1,149.60.",
};

export const APPEAL_30_60 = {
  en: (topic) =>
    `<p><strong>Objections</strong> against refusal must be filed within <strong>30 days</strong> from notification to the foreign national through the e-permit system against the Ministry. A reasoned petition and supporting documents must be uploaded with an e-signature.</p><p>An <strong>annulment action</strong> must be brought before the administrative court within <strong>60 days</strong> from the day following notification. If an objection was filed first, the annulment period is suspended.</p><p>For detailed information on refusal of ${topic}, see our article on "refusal of work permit application".</p>`,
  ar: (topic) =>
    `<p>يجب تقديم <strong>الطعون</strong> ضد الرفض خلال <strong>30 يوماً</strong> من التبليغ عبر نظام e-permit أمام الوزارة، مع عريضة مستندة ومرفقات وإمضاء إلكتروني.</p><p>تُرفع <strong>دعوى الإلغاء</strong> أمام المحكمة الإدارية خلال <strong>60 يوماً</strong> من اليوم التالي للتبليغ. إذا سبق الطعن، تتوقف مهلة الدعوى.</p><p>لمزيد من التفاصيل حول رفض ${topic}، راجعوا مقال "رفض طلب تصريح العمل".</p>`,
  ru: (topic) =>
    `<p><strong>Возражения</strong> против отказа подаются в течение <strong>30 дней</strong> с даты уведомления через систему e-permit в Министерство с мотивированным заявлением и электронной подписью.</p><p><strong>Иск об отмене</strong> подается в административный суд в течение <strong>60 дней</strong> со дня, следующего за уведомлением. При предварительном возражении срок приостанавливается.</p><p>Подробнее об отказе в ${topic} см. статью «отказ в выдаче разрешения на работу».</p>`,
  fa: (topic) =>
    `<p><strong>اعتراض‌ها</strong> ظرف <strong>30 روز</strong> از ابلاغ از طریق e-permit نزد وزارت با لایحه مستدل و امضای الکترونیکی ارائه می‌شوند.</p><p><strong>دعوای ابطال</strong> ظرف <strong>60 روز</strong> از روز بعد از ابلاغ در دادگاه اداری طرح می‌شود. در صورت اعتراض قبلی، مهلت متوقف می‌شود.</p><p>برای جزئیات رد ${topic}، مقاله «رد درخواست مجوز کار» را ببینید.</p>`,
};

export const TAHDIT_COURT_COSTS = {
  en: `<p>Litigation costs to remove a restriction code are approximately <strong>4,000 TL</strong> for 2023 data published by the authorities. The individual application fee to the Constitutional Court with a stay request is <strong>2,220.60 TL</strong>.</p>New Case Postage Fee580 TLNew Case (with stay of execution)588 TLApplication Fee269.85 TLDecision Fee269.85 TLStay of Execution Fee444.60 TLEvidence Determination Fee444.60 TLAppeal Fee738 TL`,
  ar: `<p>تكاليف رفع دعوى إزالة رمز التقييد نحو <strong>4,000 ليرة تركية</strong> وفق بيانات 2023. رسوم الطعن الفردي لدى المحكمة الدستورية مع طلب وقف التنفيذ <strong>2,220.60 ليرة</strong>.</p>رسوم بريد دعوى جديدة580 ليرةدعوى جديدة (وقف التنفيذ)588 ليرةرسوم الطلب269.85 ليرةرسوم الحكم269.85 ليرةرسوم وقف التنفيذ444.60 ليرةرسوم إثبات الدليل444.60 ليرةرسوم الاستئناف738 ليرة`,
  ru: `<p>Судебные расходы по снятию кода ограничения составляют около <strong>4 000 TL</strong> по данным 2023 года. Госпошлина за индивидуальное обращение в Конституционный суд с ходатайством об обеспечительных мерах - <strong>2 220,60 TL</strong>.</p>Почтовые расходы нового иска580 TLИск с обеспечительными мерами588 TLПошлина за заявление269,85 TLПошлина за решение269,85 TLОбеспечительные меры444,60 TLОпределение доказательств444,60 TLАпелляция738 TL`,
  fa: `<p>هزینه دعوای رفع کد محدودیت حدود <strong>4,000 لیر</strong> بر اساس داده‌های 2023 است. هزینه شکایت فردی به دیوان عالیان با درخواست توقف اجرا <strong>2,220.60 لیر</strong> است.</p>هزینه پست دعوای جدید580 لیردعوای جدید (توقف اجرا)588 لیرحق طرح269.85 لیرحق حکم269.85 لیرحق توقف اجرا444.60 لیرحق تعیین دلیل444.60 لیرحق تجدیدنظر738 لیر`,
};

export const FEES_356_NOTE = {
  en: (topic) =>
    `<p>In addition to the fees above, a valuable paper fee of <strong>356 TL</strong> applies for 2023. <strong>NOTE: </strong>If fees and valuable paper are not paid within <strong>30 days</strong> from notification, the ${topic} application is removed from processing.</p>`,
  ar: (topic) =>
    `<p>بالإضافة إلى الرسوم أعلاه، رسوم الورق النقدي <strong>356 ليرة</strong> لعام 2023. <strong>تنبيه: </strong>عدم الدفع خلال <strong>30 يوماً</strong> من التبليغ يؤدي إلى إيقاف معالجة طلب ${topic}.</p>`,
  ru: (topic) =>
    `<p>Кроме пошлин выше, сбор за ценную бумагу <strong>356 TL</strong> на 2023 год. <strong>ВНИМАНИЕ: </strong>неуплата в течение <strong>30 дней</strong> с уведомления ведет к снятию заявления на ${topic} с рассмотрения.</p>`,
  fa: (topic) =>
    `<p>علاوه بر حقوق فوق، تمبر <strong>356 لیر</strong> در 2023. <strong>توجه: </strong>عدم پرداخت ظرف <strong>30 روز</strong> از ابلاغ، درخواست ${topic} را از رسیدگی حذف می‌کند.</p>`,
};

export const EXTENSION_60_90 = {
  en: (topic) =>
    `<p>${topic} extension applications must be filed from <strong>60 days</strong> before expiry and in any event before the permit expires. The employer files through the e-permit system. The holder may continue working for up to <strong>90 days</strong> after expiry without changing the nature of the work. Against refusal, objection within <strong>30 days</strong> or annulment action within <strong>60 days</strong> is available; prior objection suspends the annulment period.</p>`,
  ar: (topic) =>
    `<p>تُقدَّم طلبات تمديد ${topic} من <strong>60 يوماً</strong> قبل الانتهاء وقبل انتهاء التصريح. يقدم صاحب العمل عبر e-permit. يمكن الاستمرار في العمل حتى <strong>90 يوماً</strong> بعد الانتهاء دون تغيير طبيعة العمل. عند الرفض: طعن خلال <strong>30 يوماً</strong> أو دعوى إلغاء خلال <strong>60 يوماً</strong>.</p>`,
  ru: (topic) =>
    `<p>Заявления на продление ${topic} подаются за <strong>60 дней</strong> до окончания и до истечения разрешения. Работодатель подает через e-permit. Работа может продолжаться до <strong>90 дней</strong> после окончания без изменения характера работы. При отказе: возражение в <strong>30 дней</strong> или иск в <strong>60 дней</strong>.</p>`,
  fa: (topic) =>
    `<p>تمدید ${topic} از <strong>60 روز</strong> قبل انقضا و حتماً قبل پایان مجوز ارائه می‌شود. کارفرما از e-permit درخواست می‌دهد. تا <strong>90 روز</strong> پس از انقضا می‌توان کار را ادامه داد. در صورت رد: اعتراض <strong>30 روز</strong> یا دعوای ابطال <strong>60 روز</strong>.</p>`,
};

export const COMPETENT_COURT_TAHDIT = {
  en: "<p>The competent administrative court for removal of a restriction code is the Ankara administrative courts. For annulment of deport decisions based on a restriction code, the competent court is the administrative court of the province where the governorship that issued the deport decision is located.</p>",
  ar: "<p>المحكمة الإدارية المختصة لإزالة رمز التقييد هي محاكم أنقرة الإدارية. ولإلغاء قرارات الترحيل المبنية على رمز التقييد، تكون المحكمة الإدارية في محافظة الوالي الذي أصدر قرار الترحيل.</p>",
  ru: "<p>Компетентный административный суд для снятия кода ограничения - административные суды Анкары. Для отмены решений о выдворении на основании кода ограничения компетентен административный суд провинции, где находится губернаторство, вынесшее решение.</p>",
  fa: "<p>دادگاه اداری صالح برای رفع کد محدودیت، دادگاه‌های اداری آنکارا است. برای ابطال تصمیم اخراج مبتنی بر کد محدودیت، دادگاه اداری استان والی صادرکننده تصمیم صالح است.</p>",
};
