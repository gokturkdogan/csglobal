import { FOREIGN_CONSULTANCY_LOCALE_LABELS } from "@/lib/i18n/foreign-consultancy/locales";
import type { ForeignConsultancyMessages } from "@/lib/i18n/foreign-consultancy/types";

export const trForeignConsultancyMessages: ForeignConsultancyMessages = {
  locale: "tr",
  languageSwitcher: {
    label: "Dil",
    options: FOREIGN_CONSULTANCY_LOCALE_LABELS,
  },
  common: {
    home: "Anasayfa",
    foreignConsultancy: "Yabancı Danışmanlık",
    selectProcess: "Sürecinizi seçin",
    viewDetails: "Detayları incele",
    contents: "İçerikler",
    similarContents: "Benzer içerikler",
    noContents: "Bu kategoride henüz içerik yok.",
    categoryPage: "Kategori sayfası",
    contentsNavAria: "Yabancı danışmanlık içerikleri",
    contactFor: "{name} için iletişime geçin",
    contactSubtitle:
      "Başvuru sürecinizi uzman danışmanlarımızla planlayın. Online başvuru yok.",
    contentTranslationPending: "",
  },
  serviceHero: {
    program: "Program",
    duration: "Süre",
    appointment: "Randevu",
    required: "Gerekli",
    countryDependent: "Ülkeye bağlı",
    fee: "Ücret",
    feeFrom: "{amount} ve üzeri",
  },
  tableOfContents: {
    title: "İçindekiler",
    hint: "Sayfa bölümlerine hızlı geçiş",
    ariaLabel: "İçindekiler",
  },
  index: {
    title: "Yabancı Danışmanlık",
    description:
      "Türkiye'de çalışma izni, oturum izni ve yabancı personel süreçleri için kurumsal danışmanlık. CSGLOBAL uzman ekibiyle doğrudan iletişim.",
    content:
      "Türkiye'de yabancı personel ve ikamet süreçleriniz için danışmanlık alın. Aşağıdan oturma izni veya çalışma izni seçeneğini seçerek devam edin.",
  },
  categories: {
    oturmaIzni: {
      title: "Oturma izni",
      description:
        "Türkiye ikamet izni başvurusu, yenileme ve uzun dönem oturum için evrak listesi, randevu planı ve süreç takibi.",
    },
    calismaIzni: {
      title: "Çalışma izni",
      description:
        "Türkiye çalışma izni başvurusu, yenileme ve işveren değişikliği için evrak listesi, başvuru planı ve süreç takibi.",
    },
  },
};
