import { annulmentResidence, faqLawyer, faqTitles } from "../batch1-shared.mjs";
import { buildAileSections } from "../batch1-aile-i18n.mjs";

const meta = {
  en: { name: "How to Obtain a Family Residence Permit (İkamet İzni)?", excerpt: "How to Obtain a Family Residence Permit (İkamet İzni)?", heroTitle: "How to Obtain a Family Residence Permit (İkamet İzni)?" },
  ar: { name: "كيفية الحصول على تصريح إقامة عائلي (إkamet izni)؟", excerpt: "كيفية الحصول على تصريح إقامة عائلي (إkamet izni)؟", heroTitle: "كيفية الحصول على تصريح إقامة عائلي (إkamet izni)؟" },
  ru: { name: "Как получить семейный вид на жительство (ikamet izni)?", excerpt: "Как получить семейный вид на жительство (ikamet izni)?", heroTitle: "Как получить семейный вид на жительство (ikamet izni)?" },
  fa: { name: "چگونه مجوز اقامت خانوادگی (ikamet izni) بگیریم؟", excerpt: "چگونه مجوز اقامت خانوادگی (ikamet izni) بگیریم؟", heroTitle: "چگونه مجوز اقامت خانوادگی (ikamet izni) بگیریم؟" },
};

const permitLabel = { en: "family residence permit", ar: "تصريح الإقامة العائلي", ru: "семейном виде на жительство", fa: "مجوز اقامت خانوادگی" };
const deps = { annulmentResidence, faqLawyer, faqTitles, permitLabel };

export default {
  en: { ...meta.en, sections: buildAileSections("en", deps) },
  ar: { ...meta.ar, sections: buildAileSections("ar", deps) },
  ru: { ...meta.ru, sections: buildAileSections("ru", deps) },
  fa: { ...meta.fa, sections: buildAileSections("fa", deps) },
};
