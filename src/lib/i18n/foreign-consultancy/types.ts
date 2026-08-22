import type { ForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/locales";

export type ForeignConsultancyCategoryMessages = {
  title: string;
  description: string;
};

export type ForeignConsultancyMessages = {
  locale: ForeignConsultancyLocale;
  languageSwitcher: {
    label: string;
    options: Record<ForeignConsultancyLocale, string>;
  };
  common: {
    home: string;
    foreignConsultancy: string;
    selectProcess: string;
    viewDetails: string;
    contents: string;
    similarContents: string;
    noContents: string;
    categoryPage: string;
    contentsNavAria: string;
    contactFor: string;
    contactSubtitle: string;
    contentTranslationPending: string;
  };
  serviceHero: {
    program: string;
    duration: string;
    appointment: string;
    required: string;
    countryDependent: string;
    fee: string;
    feeFrom: string;
  };
  tableOfContents: {
    title: string;
    hint: string;
    ariaLabel: string;
  };
  index: {
    title: string;
    description: string;
    content: string;
  };
  categories: {
    oturmaIzni: ForeignConsultancyCategoryMessages;
    calismaIzni: ForeignConsultancyCategoryMessages;
  };
};

export type ServiceHeroLabels = ForeignConsultancyMessages["serviceHero"];

export type TableOfContentsLabels = ForeignConsultancyMessages["tableOfContents"];
