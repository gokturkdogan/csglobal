import { cookies } from "next/headers";
import {
  FOREIGN_CONSULTANCY_DEFAULT_LOCALE,
  FOREIGN_CONSULTANCY_LOCALE_COOKIE,
  isForeignConsultancyLocale,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";

export async function getForeignConsultancyLocale(): Promise<ForeignConsultancyLocale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(FOREIGN_CONSULTANCY_LOCALE_COOKIE)?.value;

  if (value && isForeignConsultancyLocale(value)) {
    return value;
  }

  return FOREIGN_CONSULTANCY_DEFAULT_LOCALE;
}
