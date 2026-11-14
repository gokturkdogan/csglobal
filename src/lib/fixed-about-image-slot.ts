import { buildAboutImagePublicId } from "@/lib/cloudinary/about-folder";

export const fixedAboutPortraitImageSlot = {
  publicId: buildAboutImagePublicId("fixed-profile"),
  label: "Sabit hakkımda görseli",
  aspectRatio: 3 / 4,
  cropHint: "Portre fotoğrafı (3:4). Yüz ve omuzlar görünür olacak şekilde kırpın.",
};

export const fixedAboutPortraitClassName = "object-cover object-[center_20%]";