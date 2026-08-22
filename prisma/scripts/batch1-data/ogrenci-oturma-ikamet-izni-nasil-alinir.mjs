import { annulmentResidence, faqLawyer, faqTitles } from "../batch1-shared.mjs";
import { buildOgrenciSections } from "../batch1-ogrenci-i18n.mjs";

const meta = {
  en: { name: "How to Obtain a Student Residence Permit (İkamet İzni) ?", excerpt: "How to Obtain a Student Residence Permit (İkamet İzni) ?", heroTitle: "How to Obtain a Student Residence Permit (İkamet İzni) ?" },
  ar: { name: "كيفية الحصول على تصريح إقامة طالب (إkamet izni) ?", excerpt: "كيفية الحصول على تصريح إقامة طالب (إkamet izni) ?", heroTitle: "كيفية الحصول على تصريح إقامة طالب (إkamet izni) ?" },
  ru: { name: "Как получить студенческий вид на жительство (ikamet izni) ?", excerpt: "Как получить студенческий вид на жительство (ikamet izni) ?", heroTitle: "Как получить студенческий вид на жительство (ikamet izni) ?" },
  fa: { name: "چگونه مجوز اقامت دانشجویی (ikamet izni) بگیریم ?", excerpt: "چگونه مجوز اقامت دانشجویی (ikamet izni) بگیریم ?", heroTitle: "چگونه مجوز اقامت دانشجویی (ikamet izni) بگیریم ?" },
};

const permitLabel = { en: "student residence permit", ar: "تصريح إقامة الطالب", ru: "студенческом виде на жительство", fa: "مجوز اقامت دانشجویی" };
const deps = { annulmentResidence, faqLawyer, faqTitles, permitLabel };

export default {
  en: { ...meta.en, sections: buildOgrenciSections("en", deps) },
  ar: { ...meta.ar, sections: buildOgrenciSections("ar", deps) },
  ru: { ...meta.ru, sections: buildOgrenciSections("ru", deps) },
  fa: { ...meta.fa, sections: buildOgrenciSections("fa", deps) },
};
