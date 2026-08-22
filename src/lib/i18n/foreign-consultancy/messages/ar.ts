import { FOREIGN_CONSULTANCY_LOCALE_LABELS } from "@/lib/i18n/foreign-consultancy/locales";
import type { ForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/types";

export const arForeignConsultancyMessages: ForeignConsultancyMessages = {
  locale: "ar",
  languageSwitcher: {
    label: "اللغة",
    options: FOREIGN_CONSULTANCY_LOCALE_LABELS,
  },
  common: {
    home: "الرئيسية",
    foreignConsultancy: "الاستشارات للأجانب",
    selectProcess: "اختر إجراءك",
    viewDetails: "عرض التفاصيل",
    contents: "المحتويات",
    similarContents: "محتوى ذو صلة",
    noContents: "لا يوجد محتوى في هذه الفئة بعد.",
    categoryPage: "صفحة الفئة",
    contentsNavAria: "محتويات الاستشارات للأجانب",
    contactFor: "تواصل معنا بخصوص {name}",
    contactSubtitle:
      "خطط لطلبك مع مستشارينا الخبراء. لا يوجد تقديم عبر الإنترنت.",
    contentTranslationPending: "المحتوى الرئيسي متاح حاليا باللغة التركية.",
  },
  serviceHero: {
    program: "البرنامج",
    duration: "المدة",
    appointment: "الموعد",
    required: "مطلوب",
    countryDependent: "حسب الدولة",
    fee: "الرسوم",
    feeFrom: "{amount} فأكثر",
  },
  tableOfContents: {
    title: "جدول المحتويات",
    hint: "انتقال سريع إلى أقسام الصفحة",
    ariaLabel: "جدول المحتويات",
  },
  index: {
    title: "الاستشارات للأجانب",
    description:
      "استشارات مؤسسية لتصاريح العمل وتصاريح الإقامة وإجراءات الموظفين الأجانب في تركيا. تواصل مباشرة مع فريق CSGLOBAL.",
    content:
      "احصل على استشارة لإجراءات الموظفين الأجانب والإقامة في تركيا. اختر تصريح الإقامة أو تصريح العمل أدناه للمتابعة.",
  },
  categories: {
    oturmaIzni: {
      title: "تصريح الإقامة",
      description:
        "قائمة المستندات وتخطيط المواعيد ومتابعة الإجراءات لتقديم وتجديد الإقامة طويلة الأمد في تركيا.",
    },
    calismaIzni: {
      title: "تصريح العمل",
      description:
        "قائمة المستندات وتخطيط التقديم ومتابعة الإجراءات لتصاريح العمل وتجديدها وتغيير صاحب العمل في تركيا.",
    },
  },
};
