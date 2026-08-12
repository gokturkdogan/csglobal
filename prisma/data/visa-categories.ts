export type VisaCategorySeed = {
  slug: string;
  name: string;
  categoryType: string;
  sortOrder: number;
  shortDescription: string;
};

export type VisaServiceSeed = {
  slug: string;
  name: string;
  shortDescription: string;
  processingTime?: string;
  isFeatured?: boolean;
};

/** Tüm ülkelerde ortak kök kategoriler — altında ülkeye bağlı hizmetler */
export const VISA_ROOT_CATEGORIES: VisaCategorySeed[] = [
  {
    slug: "turistik-vizeler",
    name: "Turistik Vizeler",
    categoryType: "visa_tourist",
    sortOrder: 1,
    shortDescription: "Turistik ve kısa süreli seyahat vizeleri.",
  },
  {
    slug: "ticari-vizeler",
    name: "Ticari Vizeler",
    categoryType: "visa_business",
    sortOrder: 2,
    shortDescription: "Ticari ziyaret, fuar ve iş seyahati vizeleri.",
  },
  {
    slug: "aile-vizeleri",
    name: "Aile Vizeleri",
    categoryType: "visa_family",
    sortOrder: 3,
    shortDescription: "Aile ziyareti ve aile birleşimi vizeleri.",
  },
  {
    slug: "transit-vizeler",
    name: "Transit Vizeler",
    categoryType: "visa_transit",
    sortOrder: 4,
    shortDescription: "Havalimanı transit ve kısa geçiş vizeleri.",
  },
  {
    slug: "diger-vizeler",
    name: "Diğer Vizeler",
    categoryType: "visa_other",
    sortOrder: 5,
    shortDescription: "Özel amaçlı ve diğer vize türleri.",
  },
  {
    slug: "oturma-izni",
    name: "Oturma İzni",
    categoryType: "residence",
    sortOrder: 6,
    shortDescription: "Uzun süreli oturum ve ikamet izni başvuruları.",
  },
  {
    slug: "calisma-izni",
    name: "Çalışma İzni",
    categoryType: "work_permit",
    sortOrder: 7,
    shortDescription: "Çalışma ve istihdam amaçlı izin başvuruları.",
  },
  {
    slug: "vatandaslik",
    name: "Vatandaşlık",
    categoryType: "citizenship",
    sortOrder: 8,
    shortDescription: "Vatandaşlık ve doğalizasyon süreçleri.",
  },
];

/** Örnek hizmetler — Ticari Vizeler altında */
export const TICARI_SAMPLE_SERVICES: VisaServiceSeed[] = [
  {
    slug: "ticari-vize",
    name: "Ticari Vize",
    shortDescription: "İş görüşmeleri ve ticari ziyaretler için kısa süreli vize.",
    processingTime: "10-15 iş günü",
    isFeatured: true,
  },
  {
    slug: "fuar-vizesi",
    name: "Fuar Vizesi",
    shortDescription: "Uluslararası fuar ve ticari etkinlik ziyaretleri.",
    processingTime: "10-15 iş günü",
    isFeatured: true,
  },
];
