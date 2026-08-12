"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  COUNTRY_FAQ_MAX,
  COUNTRY_NOTES_MAX,
  normalizeMultilineText,
  parseCountryDetailSectionsJson,
} from "@/lib/country-detail";
import { serializeHomepageToSettings, type HomepageContent } from "@/lib/homepage";
import { AdminRole } from "@/generated/prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
  await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirectTo: "/admin",
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin();
  const keys = [
    "siteName",
    "siteDescription",
    "whatsappNumber",
    "whatsappMessage",
    "contactPhone",
    "contactEmail",
    "address",
    "headerLogoUrl",
  ] as const;

  for (const key of keys) {
    const value = formData.get(key) as string | null;
    if (value !== null) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }
  }
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

const homepageKeys = [
  "homeHeroBadge",
  "homeHeroTitle",
  "homeHeroSubtitle",
  "homeHeroImage",
  "homeHeroCtaPrimary",
  "homeHeroCtaSecondary",
  "homeAboutTitle",
  "homeAboutText",
  "homeAboutImage",
  "homeStatsJson",
  "homeWhyUsTitle",
  "homeWhyUsJson",
  "homeProcessTitle",
  "homeProcessJson",
  "homeServicesTitle",
  "homeServicesSubtitle",
  "homeCountriesTitle",
  "homeArticlesTitle",
  "homeCtaBannerTitle",
  "homeCtaBannerSubtitle",
  "homeCtaBannerImage",
  "homeSeoTitle",
  "homeSeoDescription",
  "homeSeoIntroTitle",
  "homeSeoIntroJson",
  "homeSeoBlocksTitle",
  "homeSeoBlocksJson",
  "homeServiceAreasTitle",
  "homeServiceAreasSubtitle",
  "homeServiceAreasJson",
  "homeFaqTitle",
  "homeFaqSubtitle",
  "homeFaqJson",
] as const;

export async function updateHomepageAction(formData: FormData) {
  await requireAdmin();

  for (const key of homepageKeys) {
    const value = formData.get(key) as string | null;
    if (value !== null) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }
  }

  revalidatePath("/", "layout");
  redirect("/admin/homepage?saved=1");
}

export async function updateHomepageEditorAction(contentJson: string) {
  await requireAdmin();

  let content: HomepageContent;
  try {
    content = JSON.parse(contentJson) as HomepageContent;
  } catch {
    throw new Error("Geçersiz anasayfa verisi");
  }

  const settings = serializeHomepageToSettings(content);

  for (const key of homepageKeys) {
    const value = settings[key];
    if (value !== undefined) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }
  }

  revalidatePath("/", "layout");
  return { ok: true as const };
}

export async function listCloudinaryHomeImagesAction() {
  await requireAdmin();
  const { listHomeImagesFromCloudinary } = await import("@/lib/cloudinary");
  const resources = await listHomeImagesFromCloudinary();
  return resources.map((r) => ({
    publicId: r.public_id,
    secureUrl: r.secure_url,
    format: r.format,
    width: r.width,
    height: r.height,
  }));
}

export async function uploadCloudinaryHomeImageAction(formData: FormData) {
  await requireAdmin();

  const publicId = formData.get("publicId") as string | null;
  const file = formData.get("file") as File | null;

  if (!publicId || !file) {
    throw new Error("Dosya veya hedef eksik");
  }

  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("Dosya 10MB sınırını aşıyor");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    throw new Error("Yalnızca JPEG, PNG, WebP veya GIF yüklenebilir");
  }

  const { uploadHomeImageToCloudinary } = await import("@/lib/cloudinary");
  const { parseHomeImagePublicId } = await import("@/lib/cloudinary/home-folder");

  parseHomeImagePublicId(publicId);

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadHomeImageToCloudinary(buffer, publicId, file.type);

  return result;
}

export async function saveCountryAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const iso2Raw = ((formData.get("iso2") as string) || "").trim().toUpperCase() || null;

  const importantNotes: string[] = [];
  for (let i = 0; i < COUNTRY_NOTES_MAX; i++) {
    const note = ((formData.get(`importantNote${i}`) as string) || "").trim();
    if (note) importantNotes.push(note);
  }

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    iso2: iso2Raw,
    flag: iso2Raw,
    shortDescription: (formData.get("shortDescription") as string) || null,
    description: (formData.get("description") as string) || null,
    visaRegion: ((formData.get("visaRegion") as string) || "").trim() || null,
    requiresAppointment: formData.get("requiresAppointment") === "on",
    averageProcessingTime:
      ((formData.get("averageProcessingTime") as string) || "").trim() || null,
    detailParagraph1: normalizeMultilineText(formData.get("detailParagraph1") as string),
    detailParagraph2: normalizeMultilineText(formData.get("detailParagraph2") as string),
    importantNotesJson:
      importantNotes.length > 0 ? JSON.stringify(importantNotes) : null,
    detailSectionsJson: (() => {
      const raw = (formData.get("detailSectionsJson") as string) || "";
      const sections = parseCountryDetailSectionsJson(raw);
      return sections.length > 0 ? JSON.stringify(sections) : null;
    })(),
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "on",
  };

  const faqItems: { question: string; answer: string; sortOrder: number }[] = [];
  for (let i = 0; i < COUNTRY_FAQ_MAX; i++) {
    const question = ((formData.get(`faqQuestion${i}`) as string) || "").trim();
    const answer = ((formData.get(`faqAnswer${i}`) as string) || "").trim();
    if (question && answer) {
      faqItems.push({ question, answer, sortOrder: i + 1 });
    }
  }

  if (id) {
    await prisma.$transaction(async (tx) => {
      await tx.country.update({ where: { id }, data });
      await tx.faq.deleteMany({
        where: { countryId: id, serviceId: null, categoryId: null },
      });
      if (faqItems.length > 0) {
        await tx.faq.createMany({
          data: faqItems.map((f) => ({
            countryId: id,
            question: f.question,
            answer: f.answer,
            sortOrder: f.sortOrder,
            isActive: true,
          })),
        });
      }
    });
    revalidatePath("/");
    revalidatePath(`/${data.slug}`);
    redirect(`/admin/countries/${id}`);
  } else {
    const country = await prisma.$transaction(async (tx) => {
      const created = await tx.country.create({ data });
      if (faqItems.length > 0) {
        await tx.faq.createMany({
          data: faqItems.map((f) => ({
            countryId: created.id,
            question: f.question,
            answer: f.answer,
            sortOrder: f.sortOrder,
            isActive: true,
          })),
        });
      }
      return created;
    });
    revalidatePath("/");
    revalidatePath(`/${country.slug}`);
    redirect(`/admin/countries/${country.id}`);
  }
}

export async function saveCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    categoryType: (formData.get("categoryType") as string) || null,
    shortDescription: (formData.get("shortDescription") as string) || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "on",
  };

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const data = {
    countryId: formData.get("countryId") as string,
    categoryId: formData.get("categoryId") as string,
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    shortDescription: (formData.get("shortDescription") as string) || null,
    processingTime: (formData.get("processingTime") as string) || null,
    heroImage: (formData.get("heroImage") as string) || null,
    requiresAppointment: formData.get("requiresAppointment") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
    revalidatePath("/");
    redirect(`/admin/services/${id}`);
  } else {
    const service = await prisma.service.create({ data });
    revalidatePath("/");
    redirect(`/admin/services/${service.id}`);
  }
}

export async function saveServiceSectionAction(formData: FormData) {
  await requireAdmin();
  const serviceId = formData.get("serviceId") as string;
  const id = formData.get("id") as string | null;

  const data = {
    serviceId,
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: true,
  };

  if (id) {
    await prisma.serviceSection.update({ where: { id }, data });
  } else {
    await prisma.serviceSection.create({ data });
  }
  revalidatePath("/");
  redirect(`/admin/services/${serviceId}`);
}

export async function saveArticleAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const isPublished = formData.get("isPublished") === "on";

  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || null,
    content: formData.get("content") as string,
    coverImage: (formData.get("coverImage") as string) || null,
    articleCategoryId: formData.get("articleCategoryId") as string,
    countryId: (formData.get("countryId") as string) || null,
    isPublished,
    publishedAt: isPublished ? new Date() : null,
  };

  if (id) {
    await prisma.article.update({ where: { id }, data });
    redirect(`/admin/articles/${id}`);
  } else {
    const article = await prisma.article.create({ data });
    redirect(`/admin/articles/${article.id}`);
  }
}

export async function createAdminUserAction(formData: FormData) {
  await requireAdmin();
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });
  if (user?.role !== AdminRole.SUPER_ADMIN) {
    redirect("/admin");
  }

  const passwordHash = await bcrypt.hash(formData.get("password") as string, 12);
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      passwordHash,
      name: formData.get("name") as string,
      role: (formData.get("role") as AdminRole) || AdminRole.EDITOR,
    },
  });
  redirect("/admin/users");
}

export async function saveSitePageAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  await prisma.sitePage.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      content: formData.get("content") as string,
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect(`/admin/site-pages/${id}?saved=1`);
}
