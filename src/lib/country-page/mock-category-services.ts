export type MockCategoryService = {
  slug: string;
  name: string;
  shortDescription?: string;
  processingTime?: string;
};

export type MockCategoryWithServices = {
  slug: string;
  name: string;
  services: MockCategoryService[];
};

/** Geçici mock: sonra DB'den country + category + service ile değişecek */
export function getMockCountryCategories(countryName: string): MockCategoryWithServices[] {
  return [
    {
      slug: "turistik-vizeler",
      name: "Turistik Vizeler",
      services: [
        {
          slug: "turistik-vize",
          name: `${countryName} Turistik Vize`,
          shortDescription: "Kısa süreli turistik seyahatler için C tipi vize.",
          processingTime: "10–15 iş günü",
        },
        {
          slug: "cok-girisli-turistik",
          name: `${countryName} Çok Girişli Turistik Vize`,
          shortDescription: "Sık seyahat edenler için çok girişli Schengen vizesi.",
          processingTime: "10–15 iş günü",
        },
      ],
    },
    {
      slug: "ticari-vizeler",
      name: "Ticari Vizeler",
      services: [
        {
          slug: "ticari-vize",
          name: `${countryName} Ticari Vize`,
          shortDescription: "İş görüşmeleri ve ticari ziyaretler.",
          processingTime: "10–15 iş günü",
        },
        {
          slug: "fuar-vizesi",
          name: `${countryName} Fuar Vizesi`,
          shortDescription: "Fuar ve ticari etkinlik ziyaretleri.",
          processingTime: "10–15 iş günü",
        },
      ],
    },
    {
      slug: "aile-vizeleri",
      name: "Aile Vizeleri",
      services: [
        {
          slug: "aile-ziyareti",
          name: `${countryName} Aile Ziyareti Vizesi`,
          shortDescription: "Aile ve yakınlar ziyareti amaçlı başvurular.",
          processingTime: "10–20 iş günü",
        },
      ],
    },
    {
      slug: "transit-vizeler",
      name: "Transit Vizeler",
      services: [
        {
          slug: "transit-vize",
          name: `${countryName} Transit Vize`,
          shortDescription: "Havalimanı transit geçişleri.",
          processingTime: "5–10 iş günü",
        },
      ],
    },
    {
      slug: "diger-vizeler",
      name: "Diğer Vizeler",
      services: [],
    },
    {
      slug: "oturma-izni",
      name: "Oturma İzni",
      services: [
        {
          slug: "uzun-sureli-oturum",
          name: `${countryName} Uzun Süreli Oturum`,
          shortDescription: "Uzun süreli ikamet ve oturum izni başvuruları.",
          processingTime: "Süreçe bağlı",
        },
        {
          slug: "ogrenci-oturumu",
          name: `${countryName} Öğrenci Oturumu`,
          shortDescription: "Eğitim amaçlı oturum izni.",
          processingTime: "Süreçe bağlı",
        },
      ],
    },
    {
      slug: "calisma-izni",
      name: "Çalışma İzni",
      services: [
        {
          slug: "calisma-izni",
          name: `${countryName} Çalışma İzni`,
          shortDescription: "İstihdam ve çalışma amaçlı izin başvuruları.",
          processingTime: "Süreçe bağlı",
        },
        {
          slug: "mavi-kart",
          name: `${countryName} Mavi Kart`,
          shortDescription: "Nitelikli çalışanlar için AB mavi kart başvurusu.",
          processingTime: "Süreçe bağlı",
        },
      ],
    },
    {
      slug: "vatandaslik",
      name: "Vatandaşlık",
      services: [
        {
          slug: "vatandaslik-basvurusu",
          name: `${countryName} Vatandaşlık Başvurusu`,
          shortDescription: "Doğalizasyon ve vatandaşlık süreçleri.",
          processingTime: "Süreçe bağlı",
        },
      ],
    },
  ];
}
