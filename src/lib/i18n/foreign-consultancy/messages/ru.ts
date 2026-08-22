import { FOREIGN_CONSULTANCY_LOCALE_LABELS } from "@/lib/i18n/foreign-consultancy/locales";
import type { ForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/types";

export const ruForeignConsultancyMessages: ForeignConsultancyMessages = {
  locale: "ru",
  languageSwitcher: {
    label: "Язык",
    options: FOREIGN_CONSULTANCY_LOCALE_LABELS,
  },
  common: {
    home: "Главная",
    foreignConsultancy: "Консультации для иностранцев",
    selectProcess: "Выберите процесс",
    viewDetails: "Подробнее",
    contents: "Материалы",
    similarContents: "Похожие материалы",
    noContents: "В этой категории пока нет материалов.",
    categoryPage: "Страница категории",
    contentsNavAria: "Материалы консультаций для иностранцев",
    contactFor: "Связаться по теме: {name}",
    contactSubtitle:
      "Спланируйте подачу заявления с нашими экспертами. Онлайн-подача недоступна.",
    contentTranslationPending: "Основной контент сейчас доступен на турецком языке.",
  },
  serviceHero: {
    program: "Программа",
    duration: "Срок",
    appointment: "Запись",
    required: "Требуется",
    countryDependent: "Зависит от страны",
    fee: "Сбор",
    feeFrom: "от {amount}",
  },
  tableOfContents: {
    title: "Содержание",
    hint: "Быстрый переход к разделам страницы",
    ariaLabel: "Содержание",
  },
  index: {
    title: "Консультации для иностранцев",
    description:
      "Корпоративные консультации по разрешениям на работу, виду на жительство и процессам для иностранного персонала в Турции. Свяжитесь с экспертами CSGLOBAL.",
    content:
      "Получите консультацию по процессам для иностранного персонала и проживания в Турции. Выберите вид на жительство или разрешение на работу ниже.",
  },
  categories: {
    oturmaIzni: {
      title: "Вид на жительство",
      description:
        "Список документов, планирование записи и сопровождение подачи, продления и долгосрочного вида на жительство в Турции.",
    },
    calismaIzni: {
      title: "Разрешение на работу",
      description:
        "Список документов, план подачи и сопровождение заявлений, продлений и смены работодателя для разрешения на работу в Турции.",
    },
  },
};
