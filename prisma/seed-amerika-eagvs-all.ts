import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { uploadHomeImageToCloudinary } from "../src/lib/cloudinary";
import { buildServiceImagePublicId } from "../src/lib/cloudinary/services-folder";
import {
  serializeServiceSections,
  type ServiceContentSection,
} from "../src/lib/service-page";
import { serializeGuideSections, type GuideSection } from "../src/lib/guide";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const HERO_ASSET_CANDIDATES = [
  path.resolve(
    process.cwd(),
    ".cursor/projects/Users-gokturk-dogan-Desktop-Projects-csglobal/assets/image-66b5cefe-a9ea-490b-8599-6d10888329e2.png",
  ),
  path.resolve(
    process.env.HOME ?? "",
    ".cursor/projects/Users-gokturk-dogan-Desktop-Projects-csglobal/assets/image-66b5cefe-a9ea-490b-8599-6d10888329e2.png",
  ),
];

function resolveHeroAssetPath(): string | null {
  for (const candidate of HERO_ASSET_CANDIDATES) {
    if (candidate && fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function loadSections(slug: string): ServiceContentSection[] {
  const filePath = path.join(process.cwd(), "prisma/eagvs-content", `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`İçerik dosyası bulunamadı: ${filePath}. Önce npm run db:scrape-eagvs çalıştırın.`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as ServiceContentSection[];
}

type ServiceSeed = {
  slug: string;
  name: string;
  shortDescription: string;
  categorySlug: string;
  sortOrder: number;
  heroTitle?: string;
};

const STUDENT_SERVICES: ServiceSeed[] = [
  {
    slug: "amerika-f2-m2-ogrenci-ailesi-vizesi",
    name: "Amerika F2 / M2 Öğrenci Ailesi Vizesi",
    shortDescription:
      "F1 veya M1 öğrenci vizesi sahibinin eşi ve 21 yaş altı çocukları için aile vizesi.",
    categorySlug: "amerika-ogrenci-vizesi-kategori",
    sortOrder: 2,
    heroTitle: "Amerika F2 / M2 Öğrenci Ailesi Vizesi",
  },
  {
    slug: "j1-amerika-degisim-programi-vizesi",
    name: "J1 Amerika Değişim Programı Vizesi",
    shortDescription:
      "ABD onaylı değişim programlarına katılacak kişiler için J1 vizesi başvuru rehberi.",
    categorySlug: "amerika-ogrenci-vizesi-kategori",
    sortOrder: 3,
    heroTitle: "J1 Amerika Değişim Programı Vizesi",
  },
  {
    slug: "j2-amerika-degisim-programi-aile-vizesi",
    name: "J2 Amerika Değişim Programı Aile Vizesi",
    shortDescription:
      "J1 vizesi sahibinin eşi ve uygun çocukları için değişim programı aile vizesi.",
    categorySlug: "amerika-ogrenci-vizesi-kategori",
    sortOrder: 4,
    heroTitle: "J2 Amerika Değişim Programı Aile Vizesi",
  },
];

const GREEN_CARD_SERVICES: ServiceSeed[] = [
  {
    slug: "green-card-basvurusu",
    name: "Green Card Başvurusu",
    shortDescription: "Amerika Green Card çekilişi ve daimi oturum kartı başvuru rehberi.",
    categorySlug: "green-card-kategori",
    sortOrder: 1,
    heroTitle: "Amerika Green Card Başvurusu",
  },
  {
    slug: "calisma-yoluyla-green-card",
    name: "Çalışma Yoluyla Green Card",
    shortDescription: "İş ve çalışma yoluyla Amerika Green Card başvuru süreci.",
    categorySlug: "green-card-kategori",
    sortOrder: 2,
    heroTitle: "Amerika Çalışma Yoluyla Green Card",
  },
  {
    slug: "nisanlilik-yoluyla-green-card-k-1-vizesi",
    name: "Nişanlılık Yoluyla Green Card (K-1 Vizesi)",
    shortDescription: "K-1 nişanlılık vizesi ile Green Card süreci.",
    categorySlug: "green-card-kategori",
    sortOrder: 3,
    heroTitle: "Amerika Nişanlılık Yoluyla Green Card",
  },
  {
    slug: "akrabalik-yoluyla-green-card",
    name: "Akrabalık Yoluyla Green Card",
    shortDescription: "Akrabalık bağı üzerinden Green Card başvuru rehberi.",
    categorySlug: "green-card-kategori",
    sortOrder: 4,
    heroTitle: "Amerika Akrabalık Yoluyla Green Card",
  },
  {
    slug: "gocmen-yatirimci-yoluyla-green-card-e-5-vizesi",
    name: "Göçmen Yatırımcı Yoluyla Green Card (E-5 Vizesi)",
    shortDescription: "E-5 yatırımcı vizesi ile Green Card başvuru süreci.",
    categorySlug: "green-card-kategori",
    sortOrder: 5,
    heroTitle: "Amerika Göçmen Yatırımcı Yoluyla Green Card (E-5 Vizesi)",
  },
];

const CALISMA_SERVICES: ServiceSeed[] = [
  {
    slug: "amerika-o-vizesi",
    name: "Amerika O Vizesi",
    shortDescription: "Olağanüstü yetenek ve başarıya sahip bireyler için O vizesi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 1,
    heroTitle: "Amerika O Vizesi",
  },
  {
    slug: "e2-amerika-yatirimci-vizesi",
    name: "E2 Amerika Yatırımcı Vizesi",
    shortDescription: "Amerika'ya yatırım yapacak girişimciler için E2 vizesi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 2,
    heroTitle: "E2 Amerika Yatırımcı Vizesi",
  },
  {
    slug: "amerika-i-vizesi",
    name: "Amerika I Vizesi",
    shortDescription: "Basın mensubu ve gazeteciler için I vizesi başvuru rehberi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 3,
    heroTitle: "Amerika I Vizesi",
  },
  {
    slug: "amerika-p-vizesi",
    name: "Amerika P Vizesi",
    shortDescription: "Sporcular, sanatçılar ve gösteri grubu üyeleri için P vizesi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 4,
    heroTitle: "Amerika P Vizesi",
  },
  {
    slug: "amerika-q-1-kulturel-degisim-programi-vizesi",
    name: "Amerika Q-1 Kültürel Değişim Programı Vizesi",
    shortDescription: "Kültürel değişim programı katılımcıları için Q-1 vizesi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 5,
    heroTitle: "Amerika Q-1 Kültürel Değişim Programı Vizesi",
  },
  {
    slug: "amerika-r-vizesi",
    name: "Amerika R Vizesi",
    shortDescription: "Din görevlileri için R vizesi başvuru süreci ve evraklar.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 6,
    heroTitle: "Amerika R Vizesi",
  },
  {
    slug: "amerika-l-1-sirket-ici-transfer-vizesi",
    name: "Amerika L-1 Şirket İçi Transfer Vizesi",
    shortDescription: "Şirket içi transfer ile ABD'de çalışma için L-1 vizesi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 7,
    heroTitle: "Amerika L-1 Şirket İçi Transfer Vizesi",
  },
  {
    slug: "h-1b-h-2a-h-2b-ve-h3-gecici-calisma-vizesi",
    name: "H-1B, H-2A, H-2B ve H3 Geçici Çalışma Vizesi",
    shortDescription: "Geçici çalışma ve mesleki vize kategorileri için başvuru rehberi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 8,
    heroTitle: "H-1B, H-2A, H-2B ve H3 Geçici Çalışma Vizesi",
  },
  {
    slug: "e1-amerika-tuccar-vizesi",
    name: "E1 Amerika Tüccar Vizesi",
    shortDescription: "Ticari faaliyetler için E1 tüccar vizesi başvuru rehberi.",
    categorySlug: "amerika-calisma-vizesi",
    sortOrder: 9,
    heroTitle: "E1 Amerika Tüccar Vizesi",
  },
];

const ARTICLE_YENILEME = {
  slug: "amerika-vize-yenileme",
  title: "Amerika Vize Yenileme",
  excerpt: "Amerika vize yenileme işlemleri, ücretler ve başvuru şartları.",
  categorySlug: "amerika-vize-yenileme-kategori",
  heroTitle: "Amerika Vize Yenileme",
};

async function uploadSharedHero(): Promise<string> {
  const heroAsset = resolveHeroAssetPath();
  if (!heroAsset) {
    console.warn("Hero dosyası bulunamadı, mevcut hero korunacak.");
    return "";
  }

  const buffer = fs.readFileSync(heroAsset);
  const publicId = buildServiceImagePublicId("amerika-visa-hero", "hero");
  const result = await uploadHomeImageToCloudinary(buffer, publicId, "image/png");
  console.log("Hero yüklendi:", result.secureUrl);
  return result.secureUrl;
}

async function resolveCategoryId(slug: string): Promise<string> {
  const category = await prisma.category.findFirst({
    where: { slug },
    select: { id: true },
  });
  if (!category) {
    throw new Error(`Kategori bulunamadı: ${slug}`);
  }
  return category.id;
}

async function upsertCountryImages(countryId: string, imageUrl: string): Promise<void> {
  await prisma.country.update({
    where: { id: countryId },
    data: {
      heroImage: imageUrl,
      itemImage: imageUrl,
    },
  });
}

async function upsertService(countryId: string, service: ServiceSeed): Promise<void> {
  const categoryId = await resolveCategoryId(service.categorySlug);
  const sections = loadSections(service.slug);
  const sectionsJson = serializeServiceSections(sections);
  const savedCount = JSON.parse(sectionsJson).length;
  console.log(`${service.slug}: ${sections.length} kaynak, ${savedCount} kaydedilen bölüm`);

  await prisma.service.upsert({
    where: { countryId_slug: { countryId, slug: service.slug } },
    create: {
      countryId,
      categoryId,
      name: service.name,
      slug: service.slug,
      shortDescription: service.shortDescription,
      heroTitle: service.heroTitle ?? service.name,
      sectionsJson,
      isActive: true,
      sortOrder: service.sortOrder,
    },
    update: {
      categoryId,
      name: service.name,
      shortDescription: service.shortDescription,
      heroTitle: service.heroTitle ?? service.name,
      sectionsJson,
      isActive: true,
      sortOrder: service.sortOrder,
    },
  });

  console.log(`Hizmet kaydedildi: ${service.name}`);
}

async function upsertYenilemeArticle(countryId: string): Promise<void> {
  const sections = loadSections(ARTICLE_YENILEME.slug) as GuideSection[];
  const sectionsJson = serializeGuideSections(sections);
  const categoryId = await resolveCategoryId(ARTICLE_YENILEME.categorySlug);

  const article = await prisma.article.upsert({
    where: { slug: ARTICLE_YENILEME.slug },
    create: {
      countryId,
      title: ARTICLE_YENILEME.title,
      slug: ARTICLE_YENILEME.slug,
      excerpt: ARTICLE_YENILEME.excerpt,
      content: "",
      heroTitle: ARTICLE_YENILEME.heroTitle,
      sectionsJson,
      isPublished: true,
      publishedAt: new Date(),
      showInCategoryPanel: true,
    },
    update: {
      countryId,
      title: ARTICLE_YENILEME.title,
      excerpt: ARTICLE_YENILEME.excerpt,
      heroTitle: ARTICLE_YENILEME.heroTitle,
      sectionsJson,
      isPublished: true,
      publishedAt: new Date(),
      showInCategoryPanel: true,
    },
  });

  await prisma.articleCategoryLink.deleteMany({ where: { articleId: article.id } });
  await prisma.articleCategoryLink.create({
    data: { articleId: article.id, categoryId },
  });

  console.log(`Rehber kaydedildi: ${ARTICLE_YENILEME.title} (${sections.length} bölüm)`);
}

async function main() {
  const country = await prisma.country.findFirst({
    where: { slug: "amerika" },
    select: { id: true },
  });
  if (!country) {
    throw new Error("Amerika ülke kaydı bulunamadı.");
  }

  const heroImageUrl = await uploadSharedHero();
  await upsertCountryImages(country.id, heroImageUrl);
  const allServices = [
    ...STUDENT_SERVICES,
    ...GREEN_CARD_SERVICES,
    ...CALISMA_SERVICES,
  ];

  for (const service of allServices) {
    await upsertService(country.id, service);
  }

  await upsertYenilemeArticle(country.id);

  console.log("Amerika EAGVS içerik aktarımı tamamlandı.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
