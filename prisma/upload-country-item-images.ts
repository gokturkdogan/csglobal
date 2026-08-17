/**
 * assets/country-heroes/{slug}.png dosyalarını Cloudinary'e yükler
 * ve ilgili ülkenin itemImage alanını günceller.
 *
 * Kullanım:
 *   npm run db:upload-country-item-images
 *   npm run db:upload-country-item-images -- --slug avusturya
 *   npm run db:upload-country-item-images -- --dir assets/country-heroes
 *   npm run db:upload-country-item-images -- --also-hero
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { uploadHomeImageToCloudinary } from "../src/lib/cloudinary";
import { buildCountryImagePublicId } from "../src/lib/cloudinary/countries-folder";
import { eagvsCountries } from "./data/eagvs-countries";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const DEFAULT_DIR = path.join(process.cwd(), "assets/country-heroes");

function parseArgs(argv: string[]) {
  const dirIdx = argv.indexOf("--dir");
  const slugIdx = argv.indexOf("--slug");
  const dir = dirIdx >= 0 ? path.resolve(argv[dirIdx + 1]) : DEFAULT_DIR;
  const onlySlug = slugIdx >= 0 ? argv[slugIdx + 1] : undefined;
  const alsoHero = argv.includes("--also-hero");
  return { dir, onlySlug, alsoHero };
}

function listImageFiles(dir: string, onlySlug?: string): string[] {
  if (!fs.existsSync(dir)) {
    throw new Error(`Klasör bulunamadı: ${dir}`);
  }

  const validSlugs = new Set(eagvsCountries.map((c) => c.slug));
  const files = fs
    .readdirSync(dir)
    .filter((name) => {
      const lower = name.toLowerCase();
      if (!lower.endsWith(".png") && !lower.endsWith(".jpg") && !lower.endsWith(".webp")) {
        return false;
      }
      const slug = path.basename(name, path.extname(name));
      if (!validSlugs.has(slug)) return false;
      if (onlySlug && slug !== onlySlug) return false;
      return true;
    })
    .map((name) => path.join(dir, name));

  return files.sort();
}

function mimeFromPath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

async function uploadCountryItemImage(
  slug: string,
  filePath: string,
  alsoHero: boolean,
): Promise<void> {
  const country = await prisma.country.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true },
  });

  if (!country) {
    console.warn(`[skip] DB'de ülke yok: ${slug}`);
    return;
  }

  const buffer = fs.readFileSync(filePath);
  const mime = mimeFromPath(filePath);
  const itemPublicId = buildCountryImagePublicId(slug, "item");

  console.log(`[upload] ${country.name} (${slug}) → ${itemPublicId}`);

  const itemResult = await uploadHomeImageToCloudinary(buffer, itemPublicId, mime);

  const data: { itemImage: string; heroImage?: string } = {
    itemImage: itemResult.secureUrl,
  };

  if (alsoHero) {
    const heroPublicId = buildCountryImagePublicId(slug, "hero");
    const heroResult = await uploadHomeImageToCloudinary(buffer, heroPublicId, mime);
    data.heroImage = heroResult.secureUrl;
    console.log(`[hero] ${heroResult.secureUrl}`);
  }

  await prisma.country.update({
    where: { id: country.id },
    data,
  });

  console.log(`[ok] itemImage → ${itemResult.secureUrl}`);
}

async function main() {
  const { dir, onlySlug, alsoHero } = parseArgs(process.argv.slice(2));
  const files = listImageFiles(dir, onlySlug);

  if (files.length === 0) {
    console.log(
      `Yüklenecek görsel yok. Dosyaları ${dir}/{slug}.png olarak koyun (ör. avusturya.png).`,
    );
    return;
  }

  console.log(`${files.length} görsel yüklenecek (${dir})`);
  let ok = 0;
  let failed = 0;

  for (const filePath of files) {
    const slug = path.basename(filePath, path.extname(filePath));
    try {
      await uploadCountryItemImage(slug, filePath, alsoHero);
      ok += 1;
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : "Bilinmeyen hata";
      console.error(`[fail] ${slug}: ${message}`);
    }
  }

  console.log(`Bitti: ${ok} başarılı, ${failed} hata.`);
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
