import fs from "fs";
import path from "path";
import sharp from "sharp";

const CURSOR_ASSETS =
  "/Users/gokturk.dogan/.cursor/projects/Users-gokturk-dogan-Desktop-Projects-csglobal/assets";
const OUT_DIR = path.join(process.cwd(), "assets/country-heroes");

async function main() {
  const files = fs.readdirSync(CURSOR_ASSETS).filter((f) => f.endsWith(".png"));
  for (const file of files) {
    if (file === "banglades_-da693754-99f8-4a7c-a8f8-66dd74355a62.png") continue;
    const src = path.join(CURSOR_ASSETS, file);
    const dst = path.join(OUT_DIR, file);
    if (fs.existsSync(dst)) continue;
    await sharp(src)
      .resize(1200, 800, { fit: "cover", position: "centre" })
      .png()
      .toFile(dst);
    console.log("cropped", dst);
  }
}

main().catch(console.error);
