import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import {
  PrismaClient,
  AdminRole,
  SeoEntityType,
} from "../src/generated/prisma/client";
import {
  wipeServicesAndCategories,
  seedGlobalVisaCategories,
} from "./lib/visa-structure-seed";
import { resolvePgConnectionString } from "../src/lib/pg-connection";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
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
        "CSGLOBAL, vize ve göçmenlik süreçlerinde kurumsal danışmanlık sunar. Her ülkenin kategori yapısı admin panelden yönetilir; evrak, ücret ve süre bilgileri şeffaf şekilde paylaşılır. Online başvuru yok; uzman ekibimizle doğrudan iletişim kurarsınız.",
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

  const germanyDetailNotes = [
    "Schengen vizesi ile Almanya'ya giriş yapılabilir; vize türü ve süresi başvuru amacına göre değişir.",
    "Turistik ve ticari kısa süreli vizeler için seyahat sigortası ve konaklama belgesi genellikle zorunludur.",
    "İşlem süreleri yoğun dönemlerde uzayabilir; seyahat tarihinize göre erken planlama önerilir.",
  ];

  const germany = await prisma.country.upsert({
    where: { slug: "almanya" },
    create: {
      name: "Almanya",
      slug: "almanya",
      iso2: "DE",
      iso3: "DEU",
      flag: "DE",
      shortDescription:
        "Almanya vize, oturum, çalışma izni ve vatandaşlık süreçlerinde uzman danışmanlık.",
      description:
        "Almanya Schengen kapsamındadır. Bordo pasaport sahipleri vizeye tabidir.",
      visaRegion: "Schengen",
      requiresAppointment: true,
      averageProcessingTime: "10–15 iş günü",
      detailParagraph1:
        "Almanya, Schengen bölgesinin en önemli ülkelerinden biri olarak turistik, ticari, aile ve uzun süreli oturum başvurularında yoğun talep görür.",
      detailParagraph2:
        "CSGLOBAL ile online başvuru veya belge yükleme yok; sürecinizi WhatsApp ve telefon üzerinden uzman danışmanlarımızla yönetirsiniz.",
      importantNotesJson: JSON.stringify(germanyDetailNotes),
      heroImage: IMG.germany,
      isActive: true,
      sortOrder: 1,
    },
    update: {
      visaRegion: "Schengen",
      requiresAppointment: true,
      averageProcessingTime: "10–15 iş günü",
      detailParagraph1:
        "Almanya, Schengen bölgesinin en önemli ülkelerinden biri olarak turistik, ticari, aile ve uzun süreli oturum başvurularında yoğun talep görür.",
      detailParagraph2:
        "CSGLOBAL ile online başvuru veya belge yükleme yok; sürecinizi WhatsApp ve telefon üzerinden uzman danışmanlarımızla yönetirsiniz.",
      importantNotesJson: JSON.stringify(germanyDetailNotes),
    },
  });

  await prisma.faq.deleteMany({
    where: { countryId: germany.id, serviceId: null, categoryId: null },
  });
  await prisma.faq.createMany({
    data: [
      {
        countryId: germany.id,
        question: "Almanya vizesi için randevu şart mı?",
        answer: "Evet. Kısa süreli vize başvuruları yetkili vize başvuru merkezleri üzerinden randevu ile yapılır.",
        sortOrder: 1,
        isActive: true,
      },
      {
        countryId: germany.id,
        question: "Almanya turistik vize ne kadar sürede çıkar?",
        answer: "Standart işlem süresi genellikle 10–15 iş günüdür. Yoğun dönemlerde süre uzayabilir.",
        sortOrder: 2,
        isActive: true,
      },
    ],
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

  await wipeServicesAndCategories(prisma);
  await seedGlobalVisaCategories(prisma);

  const guideSections = JSON.stringify([
    {
      title: "Başvuru sürecine genel bakış",
      content:
        "<p>Almanya vizesi için evrak hazırlığı, randevu planlaması ve başvuru merkezi süreçleri ülkeye özeldir.</p><ul><li><strong>Evrak listesi</strong> vize türüne göre değişir.</li><li><strong>Randevu</strong> yoğun dönemlerde erken planlama gerektirir.</li></ul>",
    },
  ]);

  await prisma.article.upsert({
    where: { slug: "almanya-vize-rehberi" },
    create: {
      slug: "almanya-vize-rehberi",
      title: "Almanya Vize Başvuru Rehberi",
      excerpt: "Almanya vizesi için temel adımlar ve evrak hazırlığı.",
      heroTitle: "Almanya Vize Başvuru Rehberi",
      heroSubtitle:
        "Evrak, randevu ve başvuru merkezi süreçlerine ülkeye özel özet.",
      content: "",
      sectionsJson: guideSections,
      featureImageTitle: "Doğru evrak, doğru zamanlama",
      featureImageText:
        "Almanya vizesi için belgelerin eksiksiz ve güncel olması sürecin en kritik adımıdır. Uzman danışmanımız profilinize uygun evrak listesini netleştirir.",
      coverImage: IMG.germany,
      heroImage: IMG.germany,
      articleCategoryId: guideCat.id,
      countryId: germany.id,
      isPublished: true,
      publishedAt: new Date(),
    },
    update: {
      countryId: germany.id,
      sectionsJson: guideSections,
      heroTitle: "Almanya Vize Başvuru Rehberi",
      heroSubtitle:
        "Evrak, randevu ve başvuru merkezi süreçlerine ülkeye özel özet.",
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

  console.log("Seed tamamlandı: Almanya + Fransa (global kategoriler, hizmetler boş)");
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
