import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { wipeVisaProgramsOnly } from "./lib/visa-structure-seed";
import { resolvePgConnectionString } from "../src/lib/pg-connection";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const { deleted } = await wipeVisaProgramsOnly(prisma);
  console.log(`Vize programları tablosu temizlendi: ${deleted} kayıt silindi.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
