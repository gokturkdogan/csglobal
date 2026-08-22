/**
 * Generates full RU/FA body JSON files from current locales + translation overrides.
 * Run: node prisma/scripts/generate-full-bodies.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { ruOverrides, faOverrides } from "./generate-full-bodies-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "../data/fc-batch6-translations");

const ruCur = (await import(pathToFileURL(path.join(DATA, "calisma-izni-ru.mjs")).href))
  .sections;
const faCur = (await import(pathToFileURL(path.join(DATA, "calisma-izni-fa.mjs")).href))
  .sections;
const partialRu = JSON.parse(
  fs.readFileSync(path.join(DATA, "calisma-izni-ru-bodies.json"), "utf8"),
);

const ru = ruCur.map((s) => s.content);
const fa = faCur.map((s) => s.content);

for (const [i, body] of Object.entries(ruOverrides)) {
  ru[Number(i)] = body;
}
if (partialRu[3]) ru[3] = partialRu[3];
if (partialRu[4]) ru[4] = partialRu[4];

for (const [i, body] of Object.entries(faOverrides)) {
  fa[Number(i)] = body;
}

// FA sections 3, 4, 5 from ar-derived translations in data file part 2
const data2 = await import("./generate-full-bodies-data-fa-long.mjs").catch(() => null);
if (data2?.faLongOverrides) {
  for (const [i, body] of Object.entries(data2.faLongOverrides)) {
    fa[Number(i)] = body;
  }
}

fs.writeFileSync(path.join(DATA, "calisma-izni-ru-bodies-full.json"), JSON.stringify(ru));
fs.writeFileSync(path.join(DATA, "calisma-izni-fa-bodies-full.json"), JSON.stringify(fa));
console.log("Generated full body JSON files");
