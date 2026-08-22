import { FOREIGN_CONSULTANCY_LOCALE_LABELS } from "@/lib/i18n/foreign-consultancy/locales";
import type { ForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/types";

export const enForeignConsultancyMessages: ForeignConsultancyMessages = {
  locale: "en",
  languageSwitcher: {
    label: "Language",
    options: FOREIGN_CONSULTANCY_LOCALE_LABELS,
  },
  common: {
    home: "Home",
    foreignConsultancy: "Foreign Consultancy",
    selectProcess: "Choose your process",
    viewDetails: "View details",
    contents: "Contents",
    similarContents: "Related content",
    noContents: "No content in this category yet.",
    categoryPage: "Category page",
    contentsNavAria: "Foreign consultancy contents",
    contactFor: "Contact us about {name}",
    contactSubtitle:
      "Plan your application with our expert consultants. No online application.",
    contentTranslationPending: "Main content is currently available in Turkish.",
  },
  serviceHero: {
    program: "Program",
    duration: "Duration",
    appointment: "Appointment",
    required: "Required",
    countryDependent: "Country dependent",
    fee: "Fee",
    feeFrom: "{amount} and above",
  },
  tableOfContents: {
    title: "Contents",
    hint: "Jump to page sections",
    ariaLabel: "Table of contents",
  },
  index: {
    title: "Foreign Consultancy",
    description:
      "Corporate consultancy for work permits, residence permits, and foreign personnel processes in Türkiye. Contact the CSGLOBAL expert team directly.",
    content:
      "Get consultancy for foreign personnel and residence processes in Türkiye. Choose residence permit or work permit below to continue.",
  },
  categories: {
    oturmaIzni: {
      title: "Residence permit",
      description:
        "Document checklist, appointment planning, and process tracking for Türkiye residence permit applications, renewals, and long-term residence.",
    },
    calismaIzni: {
      title: "Work permit",
      description:
        "Document checklist, application planning, and process tracking for Türkiye work permit applications, renewals, and employer changes.",
    },
  },
};
