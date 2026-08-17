/** Ülke paneli ve liste kartları için program alanları. */
export const visaProgramCountryPanelSelect = {
  slug: true,
  name: true,
  shortDescription: true,
  processingTime: true,
} as const;

/** Vize programı detay ve metadata için alanlar. */
export const visaProgramPublicDetailSelect = {
  id: true,
  name: true,
  slug: true,
  excerpt: true,
  shortDescription: true,
  heroTitle: true,
  heroSubtitle: true,
  sectionsJson: true,
  content: true,
  featureImage1: true,
  featureImage1Title: true,
  featureImage1Text: true,
  featureImage2: true,
  featureImage2Title: true,
  featureImage2Text: true,
  processingTime: true,
  requiresAppointment: true,
  publishedAt: true,
  countryId: true,
  country: {
    select: {
      id: true,
      name: true,
      slug: true,
      heroImage: true,
      itemImage: true,
    },
  },
  category: { select: { id: true, name: true, slug: true } },
  categoryLinks: {
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
  },
  sections: {
    where: { isActive: true },
    orderBy: { sortOrder: "asc" as const },
  },
  fees: { where: { isActive: true } },
  faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" as const } },
  programDocuments: {
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
  countryId: true,
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
