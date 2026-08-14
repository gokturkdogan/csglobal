import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { eagvsCountries } from "./data/eagvs-countries";
import { resolvePgConnectionString } from "../src/lib/pg-connection";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const DEFAULT_SHORT =
  "Vize, oturum, çalışma izni ve göçmenlik süreçleri için ülkeye özel bilgi ve danışmanlık.";

const COUNTRY_ITEM_COVER =
  "https://res.cloudinary.com/ulnb2wjo/image/upload/v1786556725/country-item-cover.png";

async function main() {
  let created = 0;
  let updated = 0;

  for (let i = 0; i < eagvsCountries.length; i++) {
    const country = eagvsCountries[i];
    const flag = country.iso2 ?? null;

    const existing = await prisma.country.findUnique({ where: { slug: country.slug } });

    await prisma.country.upsert({
      where: { slug: country.slug },
      create: {
        name: country.name,
        slug: country.slug,
        iso2: country.iso2 ?? null,
        flag,
        shortDescription: DEFAULT_SHORT,
        heroImage: COUNTRY_ITEM_COVER,
        itemImage: COUNTRY_ITEM_COVER,
        isActive: true,
        sortOrder: i + 1,
      },
      update: {
        name: country.name,
        iso2: country.iso2 ?? null,
        flag,
        heroImage: COUNTRY_ITEM_COVER,
        itemImage: COUNTRY_ITEM_COVER,
        isActive: true,
        sortOrder: i + 1,
      },
    });

    if (existing) updated++;
    else created++;
  }

  const total = await prisma.country.count();
  console.log(
    `EAGVS ülkeleri: ${eagvsCountries.length} kayıt işlendi (${created} yeni, ${updated} güncellendi). Toplam ülke: ${total}`,
  );
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
