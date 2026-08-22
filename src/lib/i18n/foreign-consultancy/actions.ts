"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { FOREIGN_CONSULTANCY_BASE_PATH } from "@/lib/foreign-consultancy";
import {
  FOREIGN_CONSULTANCY_LOCALE_COOKIE,
  isForeignConsultancyLocale,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function setForeignConsultancyLocale(locale: ForeignConsultancyLocale) {
  if (!isForeignConsultancyLocale(locale)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(FOREIGN_CONSULTANCY_LOCALE_COOKIE, locale, {
    path: FOREIGN_CONSULTANCY_BASE_PATH,
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
  });

  revalidatePath(FOREIGN_CONSULTANCY_BASE_PATH, "layout");
}
