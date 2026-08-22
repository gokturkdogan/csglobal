import {
  FOREIGN_CONSULTANCY_DEFAULT_LOCALE,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";
import { arForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/messages/ar";
import { enForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/messages/en";
import { faForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/messages/fa";
import { ruForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/messages/ru";
import { trForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/messages/tr";
import type {
  ForeignConsultancyCategoryMessages,
  ForeignConsultancyMessages,
} from "@/lib/i18n/foreign-consultancy/types";
import { FOREIGN_CONSULTANCY_CATEGORY_SLUGS } from "@/lib/foreign-consultancy-categories";

const MESSAGES: Record<ForeignConsultancyLocale, ForeignConsultancyMessages> = {
  tr: trForeignConsultancyMessages,
  en: enForeignConsultancyMessages,
  ar: arForeignConsultancyMessages,
  ru: ruForeignConsultancyMessages,
  fa: faForeignConsultancyMessages,
};

export function getForeignConsultancyMessages(
  locale: ForeignConsultancyLocale = FOREIGN_CONSULTANCY_DEFAULT_LOCALE,
): ForeignConsultancyMessages {
  return MESSAGES[locale] ?? MESSAGES[FOREIGN_CONSULTANCY_DEFAULT_LOCALE];
}

export function getForeignConsultancyCategoryMessages(
  messages: ForeignConsultancyMessages,
  categorySlug: string,
): ForeignConsultancyCategoryMessages {
  if (categorySlug === "oturma-izni") {
    return messages.categories.oturmaIzni;
  }
  return messages.categories.calismaIzni;
}

export function formatForeignConsultancyMessage(
  template: string,
  values: Record<string, string>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

export function getLocalizedForeignConsultancyOptions(messages: ForeignConsultancyMessages) {
  return FOREIGN_CONSULTANCY_CATEGORY_SLUGS.map((slug) => {
    const categoryMessages = getForeignConsultancyCategoryMessages(messages, slug);
    return {
      slug,
      title: categoryMessages.title,
      description: categoryMessages.description,
    };
  });
}

export function shouldUseForeignConsultancyStaticCopy(locale: ForeignConsultancyLocale): boolean {
  return locale !== "tr";
}
