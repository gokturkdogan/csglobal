import "dotenv/config";
import { execSync } from "node:child_process";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  reseedVisaStructureForAllCountries,
  seedVisaDataOnly,
  wipeServicesAndCategories,
} from "./lib/visa-structure-seed";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const root = new URL(".", import.meta.url).pathname.replace(/\/prisma\/?$/, "");

async function main() {
  const seedOnly = process.argv.includes("--seed-only");

  if (!seedOnly) {
    console.log("Hizmet ve kategori verileri temizleniyor…");
    await wipeServicesAndCategories(prisma);
    await prisma.$disconnect();
    await pool.end();

    console.log("Şema güncelleniyor (global kategoriler)…");
    execSync("npx prisma db push --accept-data-loss", {
      cwd: root,
      stdio: "inherit",
    });
    execSync("npx prisma generate", { cwd: root, stdio: "inherit" });

    console.log("Veriler yeniden yükleniyor…");
    execSync("tsx prisma/reseed-visa-structure.ts --seed-only", {
      cwd: root,
      stdio: "inherit",
    });
    return;
  }

  const pool2 = new Pool({ connectionString: process.env.DATABASE_URL! });
  const prisma2 = new PrismaClient({ adapter: new PrismaPg(pool2) });

  const result = await seedVisaDataOnly(prisma2);
  console.log(
    `Vize yapısı: ${result.globalCategories} global kategori, ${result.totalServices} hizmet.`,
  );

  await prisma2.$disconnect();
  await pool2.end();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
