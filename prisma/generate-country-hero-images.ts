/**
 * Bangladeş referans konseptinden tüm ülkeler için 6:4 hero görsel üretir.
 *
 * Gereksinim: OPENAI_API_KEY ortam değişkeni
 *
 * Kullanım:
 *   npm run db:generate-country-heroes
 *   npm run db:generate-country-heroes -- --slug avusturya
 *   npm run db:generate-country-heroes -- --from 50 --limit 10
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import OpenAI, { toFile } from "openai";
import { eagvsCountries } from "./data/eagvs-countries";
import {
  buildCountryHeroImagePrompt,
  COUNTRY_HERO_OUTPUT_SIZE,
} from "../src/lib/country-hero-image-prompt";

const ROOT = process.cwd();
const REFERENCE_PATH = path.join(
  ROOT,
  "assets/country-heroes/_reference/banglades-concept.png",
);
const OUTPUT_DIR = path.join(ROOT, "assets/country-heroes");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

type ManifestEntry = {
  slug: string;
  name: string;
  file: string;
  status: "done" | "failed" | "skipped";
  error?: string;
  generatedAt?: string;
};

type Manifest = {
  reference: string;
  aspectRatio: string;
  outputSize: { width: number; height: number };
  countries: ManifestEntry[];
};

function parseArgs(argv: string[]) {
  const fromIdx = argv.indexOf("--from");
  const limitIdx = argv.indexOf("--limit");
  const slugFlag = argv.indexOf("--slug");
  const onlySlug = slugFlag >= 0 ? argv[slugFlag + 1] : undefined;
  const from = fromIdx >= 0 ? Number(argv[fromIdx + 1]) : 0;
  const limit = limitIdx >= 0 ? Number(argv[limitIdx + 1]) : Infinity;
  return { onlySlug, from, limit };
}

async function prepareReferenceSquare(): Promise<Buffer> {
  const meta = await sharp(REFERENCE_PATH).metadata();
  const size = Math.max(meta.width ?? 1024, meta.height ?? 1024);
  return sharp(REFERENCE_PATH)
    .resize(size, size, { fit: "contain", background: "#1a1a1a" })
    .png()
    .toBuffer();
}

async function cropToSixFour(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .resize(COUNTRY_HERO_OUTPUT_SIZE.width, COUNTRY_HERO_OUTPUT_SIZE.height, {
      fit: "cover",
      position: "centre",
    })
    .png()
    .toBuffer();
}

function loadManifest(): Manifest {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return {
      reference: "assets/country-heroes/_reference/banglades-concept.png",
      aspectRatio: "6:4",
      outputSize: COUNTRY_HERO_OUTPUT_SIZE,
      countries: [],
    };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
}

function saveManifest(manifest: Manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function upsertManifestEntry(manifest: Manifest, entry: ManifestEntry) {
  const idx = manifest.countries.findIndex((row) => row.slug === entry.slug);
  if (idx >= 0) manifest.countries[idx] = entry;
  else manifest.countries.push(entry);
}

async function generateOne(
  client: OpenAI,
  referenceSquare: Buffer,
  country: { name: string; slug: string; iso2?: string },
): Promise<void> {
  const outFile = `${country.slug}.png`;
  const outPath = path.join(OUTPUT_DIR, outFile);

  if (fs.existsSync(outPath)) {
    console.log(`[skip] ${country.slug} zaten var`);
    return;
  }

  const prompt = buildCountryHeroImagePrompt(country);
  console.log(`[gen] ${country.name} (${country.slug})...`);

  const response = await client.images.edit({
    model: "dall-e-2",
    image: await toFile(referenceSquare, "reference.png", { type: "image/png" }),
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("OpenAI görsel yanıtı boş");
  }

  const raw = Buffer.from(b64, "base64");
  const final = await cropToSixFour(raw);
  fs.writeFileSync(outPath, final);
  console.log(`[ok] ${outPath}`);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      "OPENAI_API_KEY tanımlı değil. .env dosyasına ekleyin veya export OPENAI_API_KEY=...",
    );
    process.exit(1);
  }

  if (!fs.existsSync(REFERENCE_PATH)) {
    console.error(`Referans bulunamadı: ${REFERENCE_PATH}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const { onlySlug, from, limit } = parseArgs(process.argv.slice(2));
  let countries = [...eagvsCountries];
  if (onlySlug) {
    countries = countries.filter((c) => c.slug === onlySlug);
    if (countries.length === 0) {
      console.error(`Ülke bulunamadı: ${onlySlug}`);
      process.exit(1);
    }
  } else {
    countries = countries.slice(from, from + limit);
  }

  const client = new OpenAI();
  const referenceSquare = await prepareReferenceSquare();
  const manifest = loadManifest();

  let ok = 0;
  let failed = 0;

  for (const country of countries) {
    try {
      await generateOne(client, referenceSquare, country);
      upsertManifestEntry(manifest, {
        slug: country.slug,
        name: country.name,
        file: `${country.slug}.png`,
        status: "done",
        generatedAt: new Date().toISOString(),
      });
      ok += 1;
      saveManifest(manifest);
      await new Promise((r) => setTimeout(r, 1500));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Bilinmeyen hata";
      console.error(`[fail] ${country.slug}: ${message}`);
      upsertManifestEntry(manifest, {
        slug: country.slug,
        name: country.name,
        file: `${country.slug}.png`,
        status: "failed",
        error: message,
      });
      failed += 1;
      saveManifest(manifest);
    }
  }

  console.log(`Bitti: ${ok} başarılı, ${failed} hata, ${countries.length} işlendi.`);
  console.log(`Çıktı klasörü: ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
