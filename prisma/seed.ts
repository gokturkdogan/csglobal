import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import {
  PrismaClient,
  AdminRole,
  SectionType,
  FeeType,
  SeoEntityType,
} from "../src/generated/prisma/client";

// Image URLs — keep in sync with src/lib/media.ts
const IMG = {
  hero: "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786551822/banner-1.png",
  about: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format",
  cta: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format",
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format",
  germany: "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?w=800&q=80&auto=format",
  france: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format",
  conference: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format",
};

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function upsertCategory(
  countryId: string,
  data: {
    slug: string;
    name: string;
    parentId?: string | null;
    sortOrder?: number;
    categoryType?: string;
    shortDescription?: string;
  },
) {
  const parentId = data.parentId ?? null;
  const existing = await prisma.category.findFirst({
    where: { countryId, parentId, slug: data.slug },
  });
  if (existing) {
    return prisma.category.update({
      where: { id: existing.id },
      data: { name: data.name, isActive: true },
    });
  }
  return prisma.category.create({
    data: {
      countryId,
      parentId,
      slug: data.slug,
      name: data.name,
      sortOrder: data.sortOrder ?? 0,
      categoryType: data.categoryType,
      shortDescription: data.shortDescription,
      isActive: true,
    },
  });
}

async function createService(
  countryId: string,
  categoryId: string,
  data: {
    slug: string;
    name: string;
    shortDescription?: string;
    processingTime?: string;
    isFeatured?: boolean;
    heroImage?: string;
    sections?: Array<{ slug: string; title: string; content: string; type?: SectionType }>;
    fees?: Array<{ name: string; amount: number; currency?: string; feeType?: FeeType }>;
  },
) {
  const service = await prisma.service.upsert({
    where: { countryId_slug: { countryId, slug: data.slug } },
    create: {
      countryId,
      categoryId,
      slug: data.slug,
      name: data.name,
      shortDescription: data.shortDescription,
      processingTime: data.processingTime,
      heroImage: data.heroImage,
      isFeatured: data.isFeatured ?? false,
      isActive: true,
      requiresAppointment: true,
    },
    update: {
      name: data.name,
      categoryId,
      heroImage: data.heroImage,
      isFeatured: data.isFeatured ?? false,
      processingTime: data.processingTime,
      isActive: true,
    },
  });

  if (data.sections) {
    for (const [i, sec] of data.sections.entries()) {
      await prisma.serviceSection.upsert({
        where: { serviceId_slug: { serviceId: service.id, slug: sec.slug } },
        create: {
          serviceId: service.id,
          slug: sec.slug,
          title: sec.title,
          content: sec.content,
          sectionType: sec.type ?? SectionType.CUSTOM,
          sortOrder: i,
          isActive: true,
        },
        update: { title: sec.title, content: sec.content, sortOrder: i },
      });
    }
  }

  if (data.fees) {
    await prisma.fee.deleteMany({ where: { serviceId: service.id } });
    for (const fee of data.fees) {
      await prisma.fee.create({
        data: {
          serviceId: service.id,
          name: fee.name,
          amount: fee.amount,
          currency: fee.currency ?? "EUR",
          feeType: fee.feeType ?? FeeType.CONSULAR,
          isActive: true,
        },
      });
    }
  }

  return service;
}

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@csglobal.com" },
    create: {
      email: "admin@csglobal.com",
      passwordHash,
      name: "Admin",
      role: AdminRole.SUPER_ADMIN,
    },
    update: {},
  });

  const settings = [
    { key: "siteName", value: "CSGLOBAL" },
    {
      key: "siteDescription",
      value: "Vize, oturum, çalışma izni ve vatandaşlık danışmanlığı.",
    },
    { key: "whatsappNumber", value: "902129635014" },
    {
      key: "whatsappMessage",
      value:
        "Merhaba, CSGLOBAL web sitesinden ulaşıyorum. Vize işlemlerim konusunda profesyonel destek almak istiyorum.",
    },
    { key: "contactPhone", value: "+90 212 963 03 43" },
    { key: "contactEmail", value: "info@csglobal.com" },
    { key: "address", value: "Beşiktaş, İstanbul, Türkiye" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      create: s,
      update: { value: s.value },
    });
  }

  const homepageSettings = [
    { key: "homeHeroImage", value: IMG.hero },
    { key: "homeAboutImage", value: IMG.about },
    { key: "homeCtaBannerImage", value: IMG.cta },
    {
      key: "homeAboutText",
      value:
        "CSGLOBAL, vize ve göçmenlik süreçlerinde kurumsal danışmanlık sunar. Her ülkenin kategori yapısı admin panelden yönetilir; evrak, ücret ve süre bilgileri şeffaf şekilde paylaşılır. Online başvuru yok — uzman ekibimizle doğrudan iletişim kurarsınız.",
    },
  ];
  for (const s of homepageSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      create: s,
      update: { value: s.value },
    });
  }

  await prisma.sitePage.upsert({
    where: { slug: "hakkimizda" },
    create: {
      slug: "hakkimizda",
      title: "Hakkımızda",
      content:
        "## CSGLOBAL\n\nProfesyonel vize ve göçmenlik danışmanlığı. Tüm içerikler ülke bazlı dinamik olarak yönetilir.",
      isActive: true,
    },
    update: {},
  });

  await prisma.sitePage.upsert({
    where: { slug: "iletisim" },
    create: {
      slug: "iletisim",
      title: "İletişim",
      content: "Vize danışmanlığı için telefon, e-posta veya WhatsApp ile ulaşın.",
      isActive: true,
    },
    update: {},
  });

  const guideCat = await prisma.articleCategory.upsert({
    where: { slug: "ulke-rehberleri" },
    create: { slug: "ulke-rehberleri", name: "Ülke Rehberleri" },
    update: {},
  });

  const profiles = [
    { slug: "calisan", name: "Çalışan" },
    { slug: "ogrenci", name: "Öğrenci" },
    { slug: "isveren", name: "İşveren" },
  ];
  for (const p of profiles) {
    await prisma.applicantProfile.upsert({
      where: { slug: p.slug },
      create: p,
      update: {},
    });
  }

  const docs = [
    { slug: "pasaport", name: "Pasaport", documentType: "identity" },
    { slug: "biyometrik-fotograf", name: "Biyometrik fotoğraf", documentType: "identity" },
    { slug: "banka-hesap", name: "Banka hesap özeti", documentType: "financial" },
    { slug: "isveren-yazisi", name: "İşveren yazısı", documentType: "employment" },
    { slug: "ogrenci-belgesi", name: "Öğrenci belgesi", documentType: "education" },
  ];
  for (const d of docs) {
    await prisma.document.upsert({
      where: { slug: d.slug },
      create: { ...d, isActive: true },
      update: {},
    });
  }

  // Germany
  const germany = await prisma.country.upsert({
    where: { slug: "almanya" },
    create: {
      name: "Almanya",
      slug: "almanya",
      iso2: "DE",
      iso3: "DEU",
      flag: "DE",
      shortDescription: "Vize, oturum, çalışma izni ve vatandaşlık hizmetleri.",
      description:
        "Almanya Schengen kapsamındadır. Bordo pasaport sahipleri vizeye tabidir.",
      heroImage: IMG.germany,
      isActive: true,
      sortOrder: 1,
    },
    update: {},
  });

  const vizeler = await upsertCategory(germany.id, {
    slug: "vizeler",
    name: "Vizeler",
    categoryType: "visa",
    sortOrder: 1,
  });
  const oturma = await upsertCategory(germany.id, {
    slug: "oturma-izni",
    name: "Oturma İzni",
    categoryType: "residence",
    sortOrder: 2,
  });
  const calisma = await upsertCategory(germany.id, {
    slug: "calisma-izni",
    name: "Çalışma İzni",
    categoryType: "work",
    sortOrder: 3,
  });
  const vatandaslik = await upsertCategory(germany.id, {
    slug: "vatandaslik",
    name: "Vatandaşlık",
    categoryType: "citizenship",
    sortOrder: 4,
  });

  const turistik = await upsertCategory(germany.id, {
    slug: "turistik-vize",
    name: "Turistik Vize",
    parentId: vizeler.id,
    sortOrder: 1,
  });
  const ticari = await upsertCategory(germany.id, {
    slug: "ticari-vize",
    name: "Ticari Vize",
    parentId: vizeler.id,
    sortOrder: 2,
  });
  const transit = await upsertCategory(germany.id, {
    slug: "transit-vize",
    name: "Transit Vize",
    parentId: vizeler.id,
    sortOrder: 3,
  });

  const fuar = await upsertCategory(germany.id, {
    slug: "fuar-vizesi",
    name: "Fuar Vizesi",
    parentId: ticari.id,
    sortOrder: 1,
  });
  const isSeyahat = await upsertCategory(germany.id, {
    slug: "is-seyahati-vizesi",
    name: "İş Seyahati Vizesi",
    parentId: ticari.id,
    sortOrder: 2,
  });

  const turistikSvc = await createService(germany.id, turistik.id, {
    slug: "turistik-vizesi",
    name: "Almanya Turistik Vizesi",
    shortDescription: "90 güne kadar turistik Schengen vizesi.",
    processingTime: "Ortalama 15 iş günü",
    isFeatured: true,
    heroImage: IMG.travel,
    sections: [
      {
        slug: "genel-bilgi",
        title: "Genel Bilgi",
        content: "Almanya turistik vize, kısa süreli Schengen seyahatleri için verilir.",
        type: SectionType.GENERAL,
      },
      {
        slug: "gerekli-evraklar",
        title: "Gerekli Evraklar",
        content: "Pasaport, form, sigorta ve mali belgeler gereklidir.",
        type: SectionType.DOCUMENTS,
      },
    ],
    fees: [
      { name: "Konsolosluk harcı", amount: 90, feeType: FeeType.CONSULAR },
      { name: "Başvuru merkezi", amount: 35, currency: "EUR", feeType: FeeType.APPLICATION_CENTER },
    ],
  });

  const pasaport = await prisma.document.findUnique({ where: { slug: "pasaport" } });
  const foto = await prisma.document.findUnique({ where: { slug: "biyometrik-fotograf" } });
  const calisan = await prisma.applicantProfile.findUnique({ where: { slug: "calisan" } });
  if (pasaport && foto) {
    await prisma.serviceDocument.createMany({
      data: [
        { serviceId: turistikSvc.id, documentId: pasaport.id, isRequired: true, sortOrder: 0 },
        { serviceId: turistikSvc.id, documentId: foto.id, isRequired: true, sortOrder: 1 },
      ],
      skipDuplicates: true,
    });
  }

  await createService(germany.id, fuar.id, {
    slug: "fuar-vizesi",
    name: "Almanya Fuar Vizesi",
    shortDescription: "Ticari fuar ve etkinlik ziyaretleri.",
    processingTime: "10-15 iş günü",
    isFeatured: true,
    heroImage: IMG.conference,
  });

  await createService(germany.id, isSeyahat.id, {
    slug: "is-seyahati-vizesi",
    name: "Almanya İş Seyahati Vizesi",
    processingTime: "10-15 iş günü",
    isFeatured: true,
    heroImage: IMG.travel,
  });

  await createService(germany.id, transit.id, {
    slug: "transit-vizesi",
    name: "Havalimanı Transit Vizesi",
    isFeatured: true,
  });

  const aileOturum = await upsertCategory(germany.id, {
    slug: "aile-birlesimi",
    name: "Aile Birleşimi",
    parentId: oturma.id,
    sortOrder: 1,
  });
  await createService(germany.id, aileOturum.id, {
    slug: "aile-birlesimi-oturumu",
    name: "Aile Birleşimi Oturumu",
    isFeatured: true,
  });

  const maviKart = await upsertCategory(germany.id, {
    slug: "mavi-kart",
    name: "Mavi Kart",
    parentId: calisma.id,
    sortOrder: 1,
  });
  await createService(germany.id, maviKart.id, {
    slug: "mavi-kart",
    name: "Almanya Mavi Kart",
    isFeatured: true,
    processingTime: "4-8 hafta",
    heroImage: IMG.office,
  });

  await createService(germany.id, vatandaslik.id, {
    slug: "almanya-vatandasligi",
    name: "Almanya Vatandaşlığı",
    isFeatured: true,
  });

  await prisma.seoMetadata.upsert({
    where: { entityType_entityId: { entityType: SeoEntityType.COUNTRY, entityId: germany.id } },
    create: {
      entityType: SeoEntityType.COUNTRY,
      entityId: germany.id,
      metaTitle: "Almanya Vize ve Göçmenlik | CSGLOBAL",
      metaDescription: "Almanya vize, oturum ve çalışma izni danışmanlığı.",
    },
    update: {},
  });

  // France - different structure: only Vizeler + Vatandaşlık
  const france = await prisma.country.upsert({
    where: { slug: "fransa" },
    create: {
      name: "Fransa",
      slug: "fransa",
      iso2: "FR",
      iso3: "FRA",
      flag: "FR",
      shortDescription: "Fransa vize ve vatandaşlık bilgileri.",
      heroImage: IMG.france,
      isActive: true,
      sortOrder: 2,
    },
    update: {},
  });

  const frVizeler = await upsertCategory(france.id, {
    slug: "vizeler",
    name: "Vizeler",
    categoryType: "visa",
    sortOrder: 1,
  });
  const frVatandaslik = await upsertCategory(france.id, {
    slug: "vatandaslik",
    name: "Vatandaşlık",
    categoryType: "citizenship",
    sortOrder: 2,
  });

  const frTuristik = await upsertCategory(france.id, {
    slug: "turistik-vize",
    name: "Turistik Vize",
    parentId: frVizeler.id,
    sortOrder: 1,
  });

  await createService(france.id, frTuristik.id, {
    slug: "fransa-turistik-vizesi",
    name: "Fransa Turistik Vizesi",
    processingTime: "7-20 iş günü",
    isFeatured: true,
    heroImage: IMG.france,
  });

  await createService(france.id, frVatandaslik.id, {
    slug: "fransa-vatandasligi",
    name: "Fransa Vatandaşlığı",
  });

  await prisma.article.upsert({
    where: { slug: "almanya-vize-rehberi" },
    create: {
      slug: "almanya-vize-rehberi",
      title: "Almanya Vize Başvuru Rehberi",
      excerpt: "Almanya vizesi için temel adımlar.",
      content: "## Almanya vizesi\n\nEvrak hazırlığı ve randevu süreci ülkeye özeldir.",
      coverImage: IMG.germany,
      articleCategoryId: guideCat.id,
      countryId: germany.id,
      isPublished: true,
      publishedAt: new Date(),
    },
    update: {},
  });

  await prisma.faq.create({
    data: {
      serviceId: turistikSvc.id,
      question: "Almanya turistik vize ne kadar sürede çıkar?",
      answer: "Ortalama 15 iş günü; yoğun dönemlerde uzayabilir.",
      isActive: true,
      sortOrder: 0,
    },
  });

  const homeFaqs = [
    {
      question: "Online başvuru yapabilir miyim?",
      answer:
        "Hayır. CSGLOBAL üzerinden online başvuru veya belge yükleme yapılmaz. Sürecinizi WhatsApp veya telefon ile uzman danışmanlarımızla yönetirsiniz.",
      sortOrder: 1,
    },
    {
      question: "Hangi ülkeler için hizmet veriyorsunuz?",
      answer:
        "Sitemizdeki ülke listesi dinamik olarak güncellenir. Her ülkenin vize, oturum ve çalışma izni kategorileri farklı olabilir.",
      sortOrder: 2,
    },
    {
      question: "Evrak listesi ve ücretler güncel mi?",
      answer:
        "Evrak, ücret ve süre bilgileri admin panelden yönetilir. Detay sayfalarında ülkeye özel kalemler listelenir.",
      sortOrder: 3,
    },
    {
      question: "Schengen vizesi ile hangi ülkelere gidebilirim?",
      answer:
        "Geçerli Schengen vizesi ile Schengen bölgesindeki ülkelere seyahat edebilirsiniz. Vize türü ve süresi başvuru şartlarına bağlıdır.",
      sortOrder: 4,
    },
    {
      question: "Danışmanlık ücreti nasıl belirlenir?",
      answer:
        "Danışmanlık kapsamı ülke ve hizmet türüne göre değişir. İletişim kanallarımızdan ücretsiz ön bilgi alabilirsiniz.",
      sortOrder: 5,
    },
  ];
  for (const f of homeFaqs) {
    await prisma.faq.create({ data: { ...f, isActive: true } });
  }

  console.log("Seed tamamlandı: Almanya (tam ağaç) + Fransa (farklı yapı)");
  console.log("Admin: admin@csglobal.com / admin123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
