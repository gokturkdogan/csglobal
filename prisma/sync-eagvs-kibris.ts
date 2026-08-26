import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { importEagvsCountryHub } from "../src/lib/eagvs-country-sync";

const EAGVS_URL = "https://www.eagvs.com/kibris/";
const COUNTRY_SLUG = "kibris";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const country = await prisma.country.findFirst({
    where: {
      OR: [{ slug: COUNTRY_SLUG }, { slug: "guney-kibris" }, { iso2: "CY" }],
    },
    select: { id: true, name: true, slug: true },
  });

  if (!country) {
    throw new Error("Güney Kıbrıs Cumhuriyeti bulunamadı.");
  }

  if (country.slug !== COUNTRY_SLUG) {
    await prisma.country.update({
      where: { id: country.id },
      data: { slug: COUNTRY_SLUG, name: "Güney Kıbrıs Cumhuriyeti", isActive: true },
    });
    console.log(`Slug güncellendi: ${country.slug} -> ${COUNTRY_SLUG}`);
  }

  console.log(`Senkron başlıyor: ${country.name} (${EAGVS_URL})`);

  const result = await importEagvsCountryHub({
    url: EAGVS_URL,
    countryId: country.id,
  });

  console.log("Senkron tamamlandı:");
  console.log(`  Detay bölümleri: ${result.detailSectionCount}`);
  console.log(`  Sol panel linkleri: ${result.sidebarLinkCount}`);
  console.log(`  Yeni programlar: ${result.programs.length}`);
  for (const program of result.programs) {
    console.log(`    + ${program.title} (${program.slug})`);
  }
  console.log(`  Yeni dökümanlar: ${result.documents.length}`);
  for (const document of result.documents) {
    console.log(`    + ${document.label} (${document.fileName})`);
  }
  console.log(`  Atlanan: ${result.skipped.length}`);
  if (result.failed.length > 0) {
    console.error("Hatalar:", result.failed);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
