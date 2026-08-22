import { FOREIGN_CONSULTANCY_LOCALE_LABELS } from "@/lib/i18n/foreign-consultancy/locales";
import type { ForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/types";

export const faForeignConsultancyMessages: ForeignConsultancyMessages = {
  locale: "fa",
  languageSwitcher: {
    label: "زبان",
    options: FOREIGN_CONSULTANCY_LOCALE_LABELS,
  },
  common: {
    home: "صفحه اصلی",
    foreignConsultancy: "مشاوره برای اتباع خارجی",
    selectProcess: "فرایند خود را انتخاب کنید",
    viewDetails: "مشاهده جزئیات",
    contents: "محتوا",
    similarContents: "محتوای مرتبط",
    noContents: "هنوز محتوایی در این دسته وجود ندارد.",
    categoryPage: "صفحه دسته",
    contentsNavAria: "محتوای مشاوره برای اتباع خارجی",
    contactFor: "تماس درباره {name}",
    contactSubtitle:
      "فرایند درخواست خود را با مشاوران متخصص ما برنامه‌ریزی کنید. درخواست آنلاین وجود ندارد.",
    contentTranslationPending: "محتوای اصلی در حال حاضر به زبان ترکی در دسترس است.",
  },
  serviceHero: {
    program: "برنامه",
    duration: "مدت",
    appointment: "نوبت",
    required: "الزامی",
    countryDependent: "بسته به کشور",
    fee: "هزینه",
    feeFrom: "{amount} به بالا",
  },
  tableOfContents: {
    title: "فهرست مطالب",
    hint: "پرش سریع به بخش‌های صفحه",
    ariaLabel: "فهرست مطالب",
  },
  index: {
    title: "مشاوره برای اتباع خارجی",
    description:
      "مشاوره سازمانی برای مجوز کار، اقامت و فرایندهای پرسنل خارجی در ترکیه. مستقیما با تیم متخصص CSGLOBAL تماس بگیرید.",
    content:
      "برای فرایندهای پرسنل خارجی و اقامت در ترکیه مشاوره بگیرید. برای ادامه، اقامت یا مجوز کار را در زیر انتخاب کنید.",
  },
  categories: {
    oturmaIzni: {
      title: "مجوز اقامت",
      description:
        "فهرست مدارک، برنامه‌ریزی نوبت و پیگیری فرایند برای درخواست، تمدید و اقامت بلندمدت در ترکیه.",
    },
    calismaIzni: {
      title: "مجوز کار",
      description:
        "فهرست مدارک، برنامه درخواست و پیگیری فرایند برای مجوز کار، تمدید و تغییر کارفرما در ترکیه.",
    },
  },
};
