import { annulmentResidence, faqLawyer, faqTitles } from "../batch1-shared.mjs";
import { buildOturmaIzniSections } from "../batch1-residence-blocks.mjs";

const meta = {
  en: { name: "How to Obtain a Residence Permit (İkamet İzni)?", excerpt: "How to Obtain a Residence Permit (İkamet İzni)?", heroTitle: "How to Obtain a Residence Permit (İkamet İzni)?" },
  ar: { name: "كيفية الحصول على تصريح إقامة (إkamet izni)؟", excerpt: "كيفية الحصول على تصريح إقامة (إkamet izni)؟", heroTitle: "كيفية الحصول على تصريح إقامة (إkamet izni)؟" },
  ru: { name: "Как получить вид на жительство (ikamet izni)?", excerpt: "Как получить вид на жительство (ikamet izni)?", heroTitle: "Как получить вид на жительство (ikamet izni)?" },
  fa: { name: "چگونه مجوز اقامت (ikamet izni) بگیریم؟", excerpt: "چگونه مجوز اقامت (ikamet izni) بگیریم؟", heroTitle: "چگونه مجوز اقامت (ikamet izni) بگیریم؟" },
};

const permitLabel = { en: "residence permit", ar: "تصريح الإقامة", ru: "виде на жительство", fa: "مجوز اقامت" };
const deps = { annulmentResidence, faqLawyer, faqTitles, permitLabel };

export default {
  en: { ...meta.en, sections: buildOturmaIzniSections("en", deps) },
  ar: { ...meta.ar, sections: buildOturmaIzniSections("ar", deps) },
  ru: { ...meta.ru, sections: buildOturmaIzniSections("ru", deps) },
  fa: { ...meta.fa, sections: buildOturmaIzniSections("fa", deps) },
};
