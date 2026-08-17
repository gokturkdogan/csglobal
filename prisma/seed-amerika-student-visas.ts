import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { uploadHomeImageToCloudinary } from "../src/lib/cloudinary";
import { buildServiceImagePublicId } from "../src/lib/cloudinary/services-folder";
import { serializeServiceSections, type ServiceContentSection } from "../src/lib/service-page";

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

function loadEagvsSections(slug: string): ServiceContentSection[] {
  const filePath = path.join(process.cwd(), "prisma/eagvs-content", `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`EAGVS içerik dosyası bulunamadı: ${filePath}`);
  }
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as ServiceContentSection[];
  return parsed;
}

const SERVICES = [
  {
    slug: "amerika-f2-m2-ogrenci-ailesi-vizesi",
    name: "Amerika F2 / M2 Öğrenci Ailesi Vizesi",
    shortDescription:
      "F1 veya M1 öğrenci vizesi sahibinin eşi ve 21 yaş altı çocukları için aile vizesi.",
    sortOrder: 2,
    heroTitle: "Amerika F2 / M2 Öğrenci Ailesi Vizesi",
  },
  {
    slug: "j1-amerika-degisim-programi-vizesi",
    name: "J1 Amerika Değişim Programı Vizesi",
    shortDescription:
      "ABD onaylı değişim programlarına katılacak kişiler için J1 vizesi başvuru rehberi.",
    sortOrder: 3,
    heroTitle: "J1 Amerika Değişim Programı Vizesi",
  },
  {
    slug: "j2-amerika-degisim-programi-aile-vizesi",
    name: "J2 Amerika Değişim Programı Aile Vizesi",
    shortDescription:
      "J1 vizesi sahibinin eşi ve uygun çocukları için değişim programı aile vizesi.",
    sortOrder: 4,
    heroTitle: "J2 Amerika Değişim Programı Aile Vizesi",
  },
];

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

async function resolveCategoryId(): Promise<string> {
  const bySlug = await prisma.category.findFirst({
    where: { slug: "amerika-ogrenci-vizesi" },
    select: { id: true },
  });
  if (bySlug) return bySlug.id;

  const byName = await prisma.category.findFirst({
    where: { name: { contains: "Öğrenci Vizesi", mode: "insensitive" } },
    select: { id: true },
  });
  if (byName) return byName.id;

  const created = await prisma.category.create({
    data: {
      name: "Amerika Öğrenci Vizesi",
      slug: "amerika-ogrenci-vizesi",
      categoryType: "visa_student",
      shortDescription: "Amerika öğrenci ve değişim programı vizeleri.",
      sortOrder: 20,
      isActive: true,
    },
  });
  console.log("Kategori oluşturuldu: Amerika Öğrenci Vizesi");
  return created.id;
}

async function main() {
  const country = await prisma.country.findFirst({
    where: { slug: "amerika" },
    select: { id: true, name: true },
  });
  if (!country) {
    throw new Error("Amerika ülke kaydı bulunamadı.");
  }

  const categoryId = await resolveCategoryId();
  const heroImageUrl = await uploadSharedHero();

  await prisma.country.update({
    where: { id: country.id },
    data: {
      heroImage: heroImageUrl,
      itemImage: heroImageUrl,
    },
  });

  for (const service of SERVICES) {
    const sections = loadEagvsSections(service.slug);
    const sectionsJson = serializeServiceSections(sections);
    const parsedCount = JSON.parse(sectionsJson).length;
    console.log(`${service.slug}: ${sections.length} bölüm kaynak, ${parsedCount} bölüm kaydedildi`);

    const program = await prisma.visaProgram.upsert({
      where: {
        countryId_slug: { countryId: country.id, slug: service.slug },
      },
      create: {
        countryId: country.id,
        categoryId,
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        heroTitle: service.heroTitle,
        sectionsJson,
        isActive: true,
        showInCategoryPanel: true,
        sortOrder: service.sortOrder,
      },
      update: {
        categoryId,
        name: service.name,
        shortDescription: service.shortDescription,
        heroTitle: service.heroTitle,
        sectionsJson,
        isActive: true,
        showInCategoryPanel: true,
        sortOrder: service.sortOrder,
      },
    });

    await prisma.visaProgramCategoryLink.upsert({
      where: {
        visaProgramId_categoryId: {
          visaProgramId: program.id,
          categoryId,
        },
      },
      create: { visaProgramId: program.id, categoryId },
      update: {},
    });

    console.log(`Hizmet kaydedildi: ${service.name}`);
  }

  console.log("Amerika öğrenci/değişim hizmetleri tamamlandı.");
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
