import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fetchAllOfficialProvincialOffices } from "./lib/goc-official-fetch";

async function main() {
  const offices = await fetchAllOfficialProvincialOffices();
  const fetchedAt = new Date().toISOString().slice(0, 10);

  const fileBody = `/** Bu dosya otomatik üretilir. Elle düzenlemeyin. */
/** Komut: npm run db:fetch-immigration-offices */
/** Kaynak: https://www.goc.gov.tr/il-mudurlukleri */
/** Son çekim: ${fetchedAt} */

export type ImmigrationOfficeSeedRecord = {
  institutionName: string;
  slug: string;
  city: string;
  district: string | null;
  address: string;
  phone: string | null;
  workingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string | null;
  shortDescription: string | null;
  notes: string;
  isActive: boolean;
  sortOrder: number;
};

export const immigrationOfficesSeedMeta = {
  sourceUrl: "https://www.goc.gov.tr/il-mudurlukleri",
  fetchedAt: "${fetchedAt}",
  recordCount: ${offices.length},
};

export const immigrationOfficesSeed: ImmigrationOfficeSeedRecord[] = ${JSON.stringify(
    offices.map((office) => ({
      ...office,
      workingHours: null,
      isActive: true,
    })),
    null,
    2,
  )};
`;

  const target = resolve(__dirname, "data/immigration-offices.ts");
  writeFileSync(target, fileBody, "utf8");
  console.log(`Yazıldı: ${target} (${offices.length} kayıt)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
