"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BlogTopicCategory, SeoEntityType } from "@/generated/prisma/client";
import { isBlogTopicCategory } from "@/lib/blog-topic-categories";
import { upsertSeoFromForm } from "@/lib/admin-seo";
import { revalidateSitemap } from "@/lib/sitemap-revalidate";
import {
  adminErrorMessage,
  adminFailure,
  adminSuccess,
  type AdminActionResult,
} from "@/lib/admin-action-result";
import {
  COUNTRY_FAQ_MAX,
  COUNTRY_NOTES_MAX,
  COUNTRY_SHORT_DESCRIPTION_MAX,
  normalizeCountryShortDescription,
  normalizeMultilineText,
  parseCountryDetailSectionsJson,
} from "@/lib/country-detail";
import {
  serializeAboutPageEditable,
  textToParagraphs,
  type AboutPageEditable,
} from "@/lib/about";
import { serializeHomepageToSettings, type HomepageContent } from "@/lib/homepage";
import { normalizeLinkUrl } from "@/lib/rich-text";
import {
  normalizeGuideFeatureImageText,
  normalizeGuideFeatureImageTitle,
} from "@/lib/guide";
import {
  normalizeServiceFeatureText,
  normalizeServiceFeatureTitle,
} from "@/lib/service-page";
import {
  buildBlogListPath,
  buildBlogPath,
  buildConsulatePath,
} from "@/lib/paths";
import { AdminRole } from "@/generated/prisma/client";

async function upsertSiteSettingsBatch(
  entries: Array<{ key: string; value: string }>,
) {
  if (entries.length === 0) return;

  await prisma.$transaction(
    entries.map(({ key, value }) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      }),
    ),
  );
}

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

export async function updateSettingsAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const keys = [
    "siteName",
    "siteDescription",
    "headerLogoUrl",
    "facebookUrl",
    "instagramUrl",
    "twitterUrl",
  ] as const;

  try {
    const entries = keys
      .map((key) => {
        const value = formData.get(key) as string | null;
        return value !== null ? { key, value } : null;
      })
      .filter((entry): entry is { key: typeof keys[number]; value: string } => entry !== null);

    await upsertSiteSettingsBatch(entries);
    revalidatePath("/");
    revalidatePath("/iletisim");
    revalidatePath("/hakkimizda");
    return adminSuccess("Site ayarları kaydedildi.");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Site ayarları kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
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

export async function updateHomepageAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();

  try {
    const entries = homepageKeys
      .map((key) => {
        const value = formData.get(key) as string | null;
        return value !== null ? { key, value } : null;
      })
      .filter(
        (entry): entry is { key: typeof homepageKeys[number]; value: string } =>
          entry !== null,
      );

    await upsertSiteSettingsBatch(entries);
    revalidatePath("/");
    return adminSuccess("Anasayfa ayarları kaydedildi.");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Anasayfa ayarları kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function updateHomepageEditorAction(
  contentJson: string,
): Promise<AdminActionResult> {
  await requireAdmin();

  let content: HomepageContent;
  try {
    content = JSON.parse(contentJson) as HomepageContent;
  } catch {
    return adminFailure("Geçersiz anasayfa verisi.");
  }

  try {
    const settings = serializeHomepageToSettings(content);
    const entries = homepageKeys
      .map((key) => {
        const value = settings[key];
        return value !== undefined ? { key, value } : null;
      })
      .filter(
        (entry): entry is { key: typeof homepageKeys[number]; value: string } =>
          entry !== null,
      );

    await upsertSiteSettingsBatch(entries);
    revalidatePath("/");
    return adminSuccess("Anasayfa başarıyla güncellendi.");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Anasayfa kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
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
  const { parseAboutImagePublicId } = await import("@/lib/cloudinary/about-folder");
  const { parseGuidesImagePublicId } = await import("@/lib/cloudinary/guides-folder");
  const { parseServiceImagePublicId } = await import("@/lib/cloudinary/services-folder");
  const { parseHomeImagePublicId } = await import("@/lib/cloudinary/home-folder");
  const { parseHerosImagePublicId } = await import("@/lib/cloudinary/heros-folder");

  if (publicId.startsWith("Heros/")) {
    parseHerosImagePublicId(publicId);
  } else if (publicId.startsWith("About/")) {
    parseAboutImagePublicId(publicId);
  } else if (publicId.startsWith("Guides/")) {
    parseGuidesImagePublicId(publicId);
  } else if (publicId.startsWith("Services/")) {
    parseServiceImagePublicId(publicId);
  } else if (publicId.startsWith("Consulates/")) {
    const { parseConsulateImagePublicId } = await import(
      "@/lib/cloudinary/consulates-folder"
    );
    parseConsulateImagePublicId(publicId);
  } else if (publicId.startsWith("Countries/")) {
    const { parseCountryImagePublicId } = await import(
      "@/lib/cloudinary/countries-folder"
    );
    parseCountryImagePublicId(publicId);
  } else {
    parseHomeImagePublicId(publicId);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadHomeImageToCloudinary(buffer, publicId, file.type);

  return result;
}

export async function saveCountryAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const iso2Raw = ((formData.get("iso2") as string) || "").trim().toUpperCase() || null;

  const importantNotes: string[] = [];
  for (let i = 0; i < COUNTRY_NOTES_MAX; i++) {
    const note = ((formData.get(`importantNote${i}`) as string) || "").trim();
    if (note) importantNotes.push(note);
  }

  const shortDescriptionRaw = (formData.get("shortDescription") as string) || "";
  if (shortDescriptionRaw.trim().length > COUNTRY_SHORT_DESCRIPTION_MAX) {
    return adminFailure(
      `Kısa açıklama en fazla ${COUNTRY_SHORT_DESCRIPTION_MAX} karakter olabilir.`,
    );
  }

  const data = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    iso2: iso2Raw,
    flag: iso2Raw,
    shortDescription: normalizeCountryShortDescription(shortDescriptionRaw),
    description: (formData.get("description") as string) || null,
    heroImage: ((formData.get("heroImage") as string) || "").trim() || null,
    itemImage: ((formData.get("itemImage") as string) || "").trim() || null,
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

  try {
    if (id) {
      await prisma.$transaction(async (tx) => {
        await tx.country.update({ where: { id }, data });
        await tx.faq.deleteMany({
          where: { countryId: id, visaProgramId: null, categoryId: null },
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
      revalidateSitemap();
      return adminSuccess("Ülke başarıyla güncellendi.", `/admin/countries/${id}`);
    }

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
    revalidateSitemap();
    return adminSuccess(
      "Ülke başarıyla oluşturuldu.",
      `/admin/countries/${country.id}`,
    );
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Ülke kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveCategoryAction(formData: FormData): Promise<AdminActionResult> {
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

  try {
    if (id) {
      await prisma.category.update({ where: { id }, data });
      revalidatePath("/");
      revalidateSitemap();
      return adminSuccess("Kategori başarıyla güncellendi.", `/admin/categories/${id}`);
    }

    const category = await prisma.category.create({ data });
    revalidatePath("/");
    revalidateSitemap();
    return adminSuccess(
      "Kategori başarıyla oluşturuldu.",
      `/admin/categories/${category.id}`,
    );
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Kategori kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveVisaProgramAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const sectionsRaw = (formData.get("sectionsJson") as string) || "";
  const countryId = (formData.get("countryId") as string)?.trim();
  const isActive = formData.get("isActive") === "on";

  if (!countryId) {
    return adminFailure("Ülke seçimi zorunludur.");
  }

  const categoryIds = formData
    .getAll("categoryIds")
    .map((value) => String(value).trim())
    .filter(Boolean);

  if (categoryIds.length === 0) {
    return adminFailure("En az bir program kategorisi seçin.");
  }

  const primaryCategoryId = categoryIds[0];

  const data = {
    countryId,
    categoryId: primaryCategoryId,
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    excerpt: (formData.get("excerpt") as string) || null,
    content: (formData.get("content") as string) || "",
    shortDescription: (formData.get("shortDescription") as string) || null,
    processingTime: (formData.get("processingTime") as string) || null,
    heroTitle: (formData.get("heroTitle") as string) || null,
    heroSubtitle: (formData.get("heroSubtitle") as string) || null,
    sectionsJson: sectionsRaw.trim() || null,
    featureImage1: (formData.get("featureImage1") as string) || null,
    featureImage1Title: normalizeServiceFeatureTitle(
      formData.get("featureImage1Title") as string,
    ),
    featureImage1Text: normalizeServiceFeatureText(
      formData.get("featureImage1Text") as string,
    ),
    featureImage2: (formData.get("featureImage2") as string) || null,
    featureImage2Title: normalizeServiceFeatureTitle(
      formData.get("featureImage2Title") as string,
    ),
    featureImage2Text: normalizeServiceFeatureText(
      formData.get("featureImage2Text") as string,
    ),
    requiresAppointment: formData.get("requiresAppointment") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isActive,
    showInCategoryPanel: formData.get("showInCategoryPanel") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
    publishedAt: isActive ? new Date() : null,
  };

  const syncCategoryLinks = async (
    tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
    programId: string,
  ) => {
    await tx.visaProgramCategoryLink.deleteMany({ where: { visaProgramId: programId } });
    if (categoryIds.length > 0) {
      await tx.visaProgramCategoryLink.createMany({
        data: categoryIds.map((categoryId) => ({
          visaProgramId: programId,
          categoryId,
        })),
        skipDuplicates: true,
      });
    }
  };

  try {
    if (id) {
      const existing = await prisma.visaProgram.findUnique({
        where: { id },
        select: { publishedAt: true, isActive: true },
      });

      const program = await prisma.$transaction(async (tx) => {
        const updated = await tx.visaProgram.update({
          where: { id },
          data: {
            ...data,
            publishedAt: isActive ? (existing?.publishedAt ?? new Date()) : null,
          },
          include: { country: { select: { slug: true } } },
        });
        await syncCategoryLinks(tx, id);
        return updated;
      });

      await upsertSeoFromForm(formData, SeoEntityType.VISA_PROGRAM, id);
      revalidatePath("/");
      revalidatePath(`/${program.country.slug}/${program.slug}`);
      revalidatePath("/admin/vize-programlari");
      revalidatePath(`/${program.country.slug}`);
      revalidateSitemap();
      return adminSuccess(
        "Vize programı başarıyla güncellendi.",
        `/admin/vize-programlari/${id}`,
      );
    }

    const program = await prisma.$transaction(async (tx) => {
      const created = await tx.visaProgram.create({
        data: {
          ...data,
          publishedAt: isActive ? new Date() : null,
        },
        include: { country: { select: { slug: true } } },
      });
      await syncCategoryLinks(tx, created.id);
      return created;
    });

    await upsertSeoFromForm(formData, SeoEntityType.VISA_PROGRAM, program.id);
    revalidatePath("/");
    revalidatePath(`/${program.country.slug}/${program.slug}`);
    revalidatePath("/admin/vize-programlari");
    revalidatePath(`/${program.country.slug}`);
    revalidateSitemap();
    return adminSuccess(
      "Vize programı başarıyla oluşturuldu.",
      `/admin/vize-programlari/${program.id}`,
    );
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Vize programı kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveBlogPostAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const sectionsRaw = (formData.get("sectionsJson") as string) || "";
  const countryIdRaw = (formData.get("countryId") as string)?.trim();
  const countryId = countryIdRaw || null;
  const topicCategoryRaw = (formData.get("topicCategory") as string)?.trim();
  const isActive = formData.get("isActive") === "on";

  let topicCategory: BlogTopicCategory | null = null;
  if (countryId) {
    topicCategory = null;
  } else if (!topicCategoryRaw || !isBlogTopicCategory(topicCategoryRaw)) {
    return adminFailure("Ülke seçilmediğinde kategori zorunludur.");
  } else {
    topicCategory = topicCategoryRaw as BlogTopicCategory;
  }

  const data = {
    title: (formData.get("title") as string)?.trim(),
    slug: (formData.get("slug") as string)?.trim(),
    excerpt: ((formData.get("excerpt") as string) || "").trim() || null,
    content: (formData.get("content") as string) || "",
    heroTitle: ((formData.get("heroTitle") as string) || "").trim() || null,
    heroSubtitle: ((formData.get("heroSubtitle") as string) || "").trim() || null,
    sectionsJson: sectionsRaw.trim() || null,
    coverImage: null,
    featureImage1: ((formData.get("featureImage1") as string) || "").trim() || null,
    featureImage1Title: normalizeServiceFeatureTitle(
      formData.get("featureImage1Title") as string,
    ),
    featureImage1Text: normalizeServiceFeatureText(
      formData.get("featureImage1Text") as string,
    ),
    featureImage2: ((formData.get("featureImage2") as string) || "").trim() || null,
    featureImage2Title: normalizeServiceFeatureTitle(
      formData.get("featureImage2Title") as string,
    ),
    featureImage2Text: normalizeServiceFeatureText(
      formData.get("featureImage2Text") as string,
    ),
    countryId,
    topicCategory,
    isFeatured: formData.get("isFeatured") === "on",
    isActive,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  if (!data.title || !data.slug) {
    return adminFailure("Başlık ve slug zorunludur.");
  }

  try {
    if (id) {
      const existing = await prisma.blogPost.findUnique({
        where: { id },
        select: { publishedAt: true },
      });

      const post = await prisma.blogPost.update({
        where: { id },
        data: {
          ...data,
          publishedAt: isActive ? (existing?.publishedAt ?? new Date()) : null,
        },
      });

      await upsertSeoFromForm(formData, SeoEntityType.BLOG_POST, id);
      revalidatePath(buildBlogListPath());
      revalidatePath(buildBlogPath(post.slug));
      revalidatePath("/admin/bloglar");
      if (post.countryId) {
        const country = await prisma.country.findUnique({
          where: { id: post.countryId },
          select: { slug: true },
        });
        if (country) revalidatePath(`/${country.slug}`);
      }
      revalidateSitemap();
      return adminSuccess("Blog başarıyla güncellendi.", `/admin/bloglar/${id}`);
    }

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt: isActive ? new Date() : null,
      },
    });

    await upsertSeoFromForm(formData, SeoEntityType.BLOG_POST, post.id);
    revalidatePath(buildBlogListPath());
    revalidatePath(buildBlogPath(post.slug));
    revalidatePath("/admin/bloglar");
    if (post.countryId) {
      const country = await prisma.country.findUnique({
        where: { id: post.countryId },
        select: { slug: true },
      });
      if (country) revalidatePath(`/${country.slug}`);
    }
    revalidateSitemap();
    return adminSuccess("Blog başarıyla oluşturuldu.", `/admin/bloglar/${post.id}`);
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Blog kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveVisaProgramSectionAction(
  formData: FormData,
): Promise<AdminActionResult> {
  await requireAdmin();
  const visaProgramId = formData.get("visaProgramId") as string;
  const id = formData.get("id") as string | null;

  const data = {
    visaProgramId,
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content: formData.get("content") as string,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: true,
  };

  try {
    if (id) {
      await prisma.visaProgramSection.update({ where: { id }, data });
      revalidatePath("/");
      revalidateSitemap();
      return adminSuccess(
        "Program bölümü güncellendi.",
        `/admin/vize-programlari/${visaProgramId}`,
      );
    }

    await prisma.visaProgramSection.create({ data });
    revalidatePath("/");
    revalidateSitemap();
    return adminSuccess(
      "Program bölümü eklendi.",
      `/admin/vize-programlari/${visaProgramId}`,
    );
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Program bölümü kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}


export async function saveConsulateAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = (formData.get("countryId") as string)?.trim();

  if (!countryId) {
    return adminFailure("Ülke seçimi zorunludur.");
  }

  const sectionsRaw = (formData.get("sectionsJson") as string) || "";
  const data = {
    countryId,
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    heroTitle: (formData.get("heroTitle") as string) || null,
    sectionsJson: sectionsRaw.trim() || null,
    mapEmbedUrl: (formData.get("mapEmbedUrl") as string) || null,
    mapAddress: (formData.get("mapAddress") as string) || null,
    isActive: formData.get("isActive") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  try {
    if (id) {
      const consulate = await prisma.consulate.update({
        where: { id },
        data,
        include: { country: { select: { slug: true } } },
      });
      revalidatePath("/admin/consulates");
      revalidatePath(`/${consulate.country.slug}`);
      revalidatePath(buildConsulatePath(consulate.country.slug, consulate.slug));
      revalidateSitemap();
      return adminSuccess(
        "Konsolosluk başarıyla güncellendi.",
        `/admin/consulates/${id}`,
      );
    }

    const consulate = await prisma.consulate.create({
      data,
      include: { country: { select: { slug: true } } },
    });
    revalidatePath("/admin/consulates");
    revalidatePath(`/${consulate.country.slug}`);
    revalidatePath(buildConsulatePath(consulate.country.slug, consulate.slug));
    revalidateSitemap();
    return adminSuccess(
      "Konsolosluk başarıyla oluşturuldu.",
      `/admin/consulates/${consulate.id}`,
    );
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Konsolosluk kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function createAdminUserAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });
  if (user?.role !== AdminRole.SUPER_ADMIN) {
    return adminFailure("Bu işlem için yetkiniz yok.");
  }

  try {
    const passwordHash = await bcrypt.hash(formData.get("password") as string, 12);
    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        passwordHash,
        name: formData.get("name") as string,
        role: (formData.get("role") as AdminRole) || AdminRole.EDITOR,
      },
    });
    return adminSuccess("Admin kullanıcı oluşturuldu.");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Kullanıcı oluşturulamadı. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveAboutPageAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string;

  const valuesItems = Array.from({ length: 4 }, (_, i) => ({
    title: (formData.get(`valuesItem${i}Title`) as string) || "",
    description: (formData.get(`valuesItem${i}Description`) as string) || "",
  }));

  const editable: AboutPageEditable = {
    heroBadge: formData.get("heroBadge") as string,
    heroTitle: formData.get("heroTitle") as string,
    heroSubtitle: formData.get("heroSubtitle") as string,
    heroImage: (formData.get("heroImage") as string) || "",
    whoWeAreTitle: formData.get("whoWeAreTitle") as string,
    whoWeAreLead: formData.get("whoWeAreLead") as string,
    whoWeAreParagraphs: textToParagraphs((formData.get("whoWeAreBody") as string) || ""),
    whoWeAreImage: (formData.get("whoWeAreImage") as string) || "",
    visionTitle: formData.get("visionTitle") as string,
    visionText: formData.get("visionText") as string,
    missionTitle: formData.get("missionTitle") as string,
    missionText: formData.get("missionText") as string,
    valuesTitle: formData.get("valuesTitle") as string,
    valuesSubtitle: formData.get("valuesSubtitle") as string,
    valuesSectionImage: (formData.get("valuesSectionImage") as string) || "",
    valuesItems,
  };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.sitePage.update({
        where: { id },
        data: {
          title: editable.heroTitle,
          isActive: formData.get("isActive") === "on",
        },
      });

      await tx.siteSetting.upsert({
        where: { key: "aboutPageJson" },
        create: { key: "aboutPageJson", value: serializeAboutPageEditable(editable) },
        update: { value: serializeAboutPageEditable(editable) },
      });
    });

    revalidatePath("/hakkimizda");
    return adminSuccess("Hakkımızda sayfası güncellendi.", "/admin/hakkimizda");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Hakkımızda sayfası kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveContactPageAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string;

  const settingKeys = [
    "whatsappNumber",
    "whatsappMessage",
    "contactPhone",
    "contactEmail",
    "address",
    "contactHeroImage",
    "contactMapEmbedUrl",
  ] as const;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.sitePage.update({
        where: { id },
        data: {
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          isActive: formData.get("isActive") === "on",
        },
      });

      for (const key of settingKeys) {
        const value = formData.get(key) as string | null;
        if (value !== null) {
          await tx.siteSetting.upsert({
            where: { key },
            create: { key, value },
            update: { value },
          });
        }
      }
    });

    revalidatePath("/iletisim");
    return adminSuccess("İletişim sayfası güncellendi.", "/admin/iletisim");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "İletişim sayfası kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveGuidesListPageAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string;

  const editable = {
    heroBadge: (formData.get("heroBadge") as string) || "",
    heroTitle: (formData.get("heroTitle") as string) || "",
    heroSubtitle: (formData.get("heroSubtitle") as string) || "",
    heroImage: (formData.get("heroImage") as string) || "",
    listIntro: (formData.get("listIntro") as string) || "",
    ctaTitle: (formData.get("ctaTitle") as string) || "",
    ctaSubtitle: (formData.get("ctaSubtitle") as string) || "",
    ctaPrimaryLabel: (formData.get("ctaPrimaryLabel") as string) || "",
    ctaSecondaryLabel: (formData.get("ctaSecondaryLabel") as string) || "",
    ctaSecondaryHref: normalizeLinkUrl((formData.get("ctaSecondaryHref") as string) || ""),
  };

  const { serializeGuidesListPageEditable } = await import("@/lib/guides-list-page");

  try {
    await prisma.$transaction(async (tx) => {
      const existing = await tx.sitePage.findUnique({
        where: { id },
        select: { slug: true },
      });

      await tx.sitePage.update({
        where: { id },
        data: {
          ...(existing?.slug === "rehber" ? { slug: "bloglar" } : {}),
          title: editable.heroTitle,
          isActive: formData.get("isActive") === "on",
        },
      });

      await tx.siteSetting.upsert({
        where: { key: "guidesListPageJson" },
        create: {
          key: "guidesListPageJson",
          value: serializeGuidesListPageEditable(editable),
        },
        update: { value: serializeGuidesListPageEditable(editable) },
      });
    });

    revalidatePath("/bloglar");
    revalidatePath("/admin/bloglarimiz");
    revalidateSitemap();
    return adminSuccess("Bloglarımız sayfası güncellendi.", "/admin/bloglarimiz");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(
        error,
        "Bloglarımız sayfası kaydedilemedi. Lütfen tekrar deneyin.",
      ),
    );
  }
}

export async function uploadSiteAssetAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();

  const countryId = (formData.get("countryId") as string)?.trim();
  const showInMenu = formData.get("showInMenu") === "on";
  const rawFiles = formData.getAll("files");
  const files = rawFiles.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0,
  );

  if (!countryId) {
    return adminFailure("Ülke seçin.");
  }
  if (files.length === 0) {
    return adminFailure("Dosya seçin.");
  }

  const {
    SITE_ASSET_MAX_BYTES,
    SITE_ASSET_MAX_BATCH,
    sanitizeSiteAssetFileName,
    buildSiteAssetPath,
    buildSiteAssetPublicUrl,
    resolveSiteAssetMimeType,
  } = await import("@/lib/site-asset");

  if (files.length > SITE_ASSET_MAX_BATCH) {
    return adminFailure(`Tek seferde en fazla ${SITE_ASSET_MAX_BATCH} dosya yükleyebilirsiniz.`);
  }

  try {
    const country = await prisma.country.findUnique({
      where: { id: countryId },
      select: { slug: true },
    });
    if (!country) {
      return adminFailure("Ülke bulunamadı.");
    }

    const uploaded: string[] = [];
    const failed: string[] = [];
    const pathsToRevalidate = new Set<string>();

    for (const file of files) {
      if (file.size > SITE_ASSET_MAX_BYTES) {
        failed.push(`${file.name}: 10MB sınırını aşıyor`);
        continue;
      }

      const mimeType = resolveSiteAssetMimeType(file.name, file.type);
      if (!mimeType) {
        failed.push(`${file.name}: desteklenmeyen dosya türü`);
        continue;
      }

      try {
        const fileName = sanitizeSiteAssetFileName(file.name);
        const buffer = Buffer.from(await file.arrayBuffer());

        const asset = await prisma.siteAsset.upsert({
          where: {
            countryId_fileName: { countryId, fileName },
          },
          create: {
            countryId,
            fileName,
            cloudinaryPublicId: null,
            fileUrl: "",
            fileData: buffer,
            mimeType,
            byteSize: file.size,
            showInMenu,
          },
          update: {
            cloudinaryPublicId: null,
            fileData: buffer,
            mimeType,
            byteSize: file.size,
            showInMenu,
          },
        });

        const path = buildSiteAssetPath(asset.id, country.slug, fileName);
        const publicUrl = buildSiteAssetPublicUrl(asset.id, country.slug, fileName);

        await prisma.siteAsset.update({
          where: { id: asset.id },
          data: { fileUrl: publicUrl },
        });

        pathsToRevalidate.add(path);
        uploaded.push(fileName);
      } catch (error) {
        const detail = adminErrorMessage(error, "");
        failed.push(
          detail ? `${file.name}: ${detail}` : `${file.name}: yüklenemedi`,
        );
      }
    }

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }
    revalidatePath("/admin/dokumanlar");
    revalidatePath(`/${country.slug}`);

    if (uploaded.length === 0) {
      return adminFailure(
        failed.length > 0
          ? `Hiçbir dosya yüklenemedi. ${failed.join("; ")}`
          : "Döküman yüklenemedi. Lütfen tekrar deneyin.",
      );
    }

    const menuNote = showInMenu ? " Sol menüde göster işaretli." : "";
    const failNote =
      failed.length > 0 ? ` ${failed.length} dosya yüklenemedi: ${failed.join("; ")}` : "";

    return adminSuccess(
      `${uploaded.length} döküman yüklendi.${menuNote}${failNote}`,
      "/admin/dokumanlar",
    );
  } catch (error) {
    const detail = adminErrorMessage(error, "");
    const message = detail
      ? `Döküman yüklenemedi: ${detail}`
      : "Döküman yüklenemedi. Lütfen tekrar deneyin.";
    return adminFailure(message);
  }
}

export async function updateSiteAssetShowInMenuAction(
  formData: FormData,
): Promise<AdminActionResult> {
  await requireAdmin();

  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) {
    return adminFailure("Geçersiz döküman.");
  }

  const showInMenu = formData.get("showInMenu") === "on";

  try {
    const asset = await prisma.siteAsset.update({
      where: { id },
      data: { showInMenu },
      include: { country: { select: { slug: true } } },
    });

    revalidatePath("/admin/dokumanlar");
    revalidatePath(`/${asset.country.slug}`);
    return adminSuccess(
      showInMenu
        ? "Döküman sol menüde gösterilecek."
        : "Döküman sol menüden kaldırıldı.",
    );
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Menü ayarı güncellenemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function deleteSiteAssetAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) {
    return adminFailure("Geçersiz döküman.");
  }

  try {
    const asset = await prisma.siteAsset.delete({
      where: { id },
      include: { country: { select: { slug: true } } },
    });

    revalidatePath("/admin/dokumanlar");
    revalidatePath(`/${asset.country.slug}`);
    revalidatePath(
      `/asset/${asset.id}/${asset.country.slug}/${asset.fileName}`,
    );
    return adminSuccess("Döküman silindi.", "/admin/dokumanlar");
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Döküman silinemedi. Lütfen tekrar deneyin."),
    );
  }
}

export async function saveSitePageAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const id = formData.get("id") as string;

  try {
    const page = await prisma.sitePage.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        content: formData.get("content") as string,
        isActive: formData.get("isActive") === "on",
      },
    });

    revalidatePath(`/${page.slug}`);
    return adminSuccess("Sayfa başarıyla güncellendi.", `/admin/site-pages/${id}`);
  } catch (error) {
    return adminFailure(
      adminErrorMessage(error, "Sayfa kaydedilemedi. Lütfen tekrar deneyin."),
    );
  }
}
