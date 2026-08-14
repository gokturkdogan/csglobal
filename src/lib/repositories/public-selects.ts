/** Ülke paneli ve liste kartları için hizmet alanları (kaldırılan hero_image dahil değil). */
export const serviceCountryPanelSelect = {
  slug: true,
  name: true,
  shortDescription: true,
  processingTime: true,
} as const;

/** Rehber detay ve metadata için makale alanları. */
export const articlePublicDetailSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  heroTitle: true,
  heroSubtitle: true,
  sectionsJson: true,
  featureImage: true,
  featureImageTitle: true,
  featureImageText: true,
  publishedAt: true,
  countryId: true,
  country: {
    select: {
      name: true,
      slug: true,
      heroImage: true,
      itemImage: true,
    },
  },
  linkedCategories: {
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
  },
} as const;

/** Hizmet detay sayfası için alanlar. */
export const servicePublicDetailSelect = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  heroTitle: true,
  heroSubtitle: true,
  sectionsJson: true,
  featureImage1: true,
  featureImage1Title: true,
  featureImage1Text: true,
  featureImage2: true,
  featureImage2Title: true,
  featureImage2Text: true,
  processingTime: true,
  requiresAppointment: true,
  country: {
    select: {
      id: true,
      name: true,
      slug: true,
      heroImage: true,
      itemImage: true,
    },
  },
  category: { select: { name: true, slug: true } },
  sections: {
    where: { isActive: true },
    orderBy: { sortOrder: "asc" as const },
  },
  fees: { where: { isActive: true } },
  faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" as const } },
  serviceDocuments: {
    orderBy: { sortOrder: "asc" as const },
    include: {
      document: true,
      applicantProfile: true,
    },
  },
} as const;

export const consulatePublicListSelect = {
  name: true,
  slug: true,
} as const;

export const consulatePublicDetailSelect = {
  id: true,
  name: true,
  slug: true,
  heroTitle: true,
  sectionsJson: true,
  mapEmbedUrl: true,
  mapAddress: true,
  country: {
    select: {
      name: true,
      slug: true,
      heroImage: true,
      itemImage: true,
    },
  },
} as const;
