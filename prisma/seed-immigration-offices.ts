import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import {
  immigrationOfficesSeed,
  immigrationOfficesSeedMeta,
} from "./data/immigration-offices";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const removedDev = await prisma.immigrationOffice.deleteMany({
    where: {
      OR: [
        { id: { startsWith: "dev_test_" } },
        { slug: { startsWith: "dev-test-" } },
        { institutionName: { startsWith: "[DEV TEST]" } },
      ],
    },
  });

  let created = 0;
  let updated = 0;

  for (const office of immigrationOfficesSeed) {
    const existing = await prisma.immigrationOffice.findUnique({
      where: { slug: office.slug },
    });

    await prisma.immigrationOffice.upsert({
      where: { slug: office.slug },
      create: {
        institutionName: office.institutionName,
        slug: office.slug,
        city: office.city,
        district: office.district,
        address: office.address,
        phone: office.phone,
        workingHours: office.workingHours,
        latitude: office.latitude,
        longitude: office.longitude,
        mapsUrl: office.mapsUrl,
        shortDescription: office.shortDescription,
        notes: `${office.notes}. Seed meta: ${immigrationOfficesSeedMeta.fetchedAt}.`,
        isActive: office.isActive,
        sortOrder: office.sortOrder,
      },
      update: {
        institutionName: office.institutionName,
        city: office.city,
        district: office.district,
        address: office.address,
        phone: office.phone,
        workingHours: office.workingHours,
        latitude: office.latitude,
        longitude: office.longitude,
        mapsUrl: office.mapsUrl,
        shortDescription: office.shortDescription,
        notes: `${office.notes}. Seed meta: ${immigrationOfficesSeedMeta.fetchedAt}.`,
        isActive: office.isActive,
        sortOrder: office.sortOrder,
      },
    });

    if (existing) updated += 1;
    else created += 1;
  }

  console.log(
    `Göç İdaresi seed tamamlandı: ${immigrationOfficesSeed.length} kayıt (${created} yeni, ${updated} güncellendi).`,
  );
  console.log(`Kaynak: ${immigrationOfficesSeedMeta.sourceUrl} (${immigrationOfficesSeedMeta.fetchedAt})`);
  if (removedDev.count > 0) {
    console.log(`Silinen DEV TEST kayıt: ${removedDev.count}`);
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
