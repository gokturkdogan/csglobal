import {
  featureMediaToDisplayItems,
  parseFeatureMediaJson,
  type ServiceFeatureMediaItem,
} from "@/lib/service-feature-media";
import { normalizePageSortOrder } from "@/lib/service-constants";
import {
  parseServiceSectionsJson,
  serviceSectionDomId,
  type ServiceDisplaySection,
} from "@/lib/service-page";

type LegacyServiceSection = {
  title: string;
  slug: string;
  content: string;
};

export type FeatureMediaLegacyFields = {
  featureMediaJson?: string | null;
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
};

export type InterleavedContentSection = {
  title: string;
  content: string;
  sortOrder: number;
  slug: string;
  isMarkdown?: boolean;
};

export type InterleavedDetailBlock =
  | {
      type: "section";
      sortOrder: number;
      section: InterleavedContentSection;
    }
  | {
      type: "media";
      sortOrder: number;
      item: ServiceFeatureMediaItem;
    };

/** @deprecated Use InterleavedDetailBlock */
export type ServiceDetailContentBlock = InterleavedDetailBlock;

function defaultMediaSortOrders(
  media: ServiceFeatureMediaItem[],
  sectionCount: number,
): ServiceFeatureMediaItem[] {
  let imageIndex = 0;
  let videoIndex = 0;
  return media.map((item) => {
    if (item.sortOrder != null) return item;
    if (item.kind === "image") {
      const sortOrder = sectionCount + 1 + imageIndex;
      imageIndex += 1;
      return { ...item, sortOrder };
    }
    const sortOrder = sectionCount + 1 + imageIndex + videoIndex;
    videoIndex += 1;
    return { ...item, sortOrder };
  });
}

function sectionBlocks(
  sectionsJson: string | null | undefined,
  legacySections: LegacyServiceSection[],
): { blocks: ServiceDetailContentBlock[]; ordered: ServiceDisplaySection[] } {
  const parsed = parseServiceSectionsJson(sectionsJson);
  const ordered: ServiceDisplaySection[] =
    parsed.length > 0
      ? parsed.map((section, index) => ({
          title: section.title,
          content: section.content,
          sortOrder: section.sortOrder,
          slug: serviceSectionDomId(index),
          isMarkdown: false,
        }))
      : legacySections.map((section, index) => ({
          title: section.title,
          content: section.content,
          slug: section.slug?.trim() || serviceSectionDomId(index),
          isMarkdown: true,
          sortOrder: index + 1,
        }));

  const withSort = ordered.map((section, index) => ({
    ...section,
    sortOrder: normalizePageSortOrder(section.sortOrder, index + 1),
  }));

  withSort.sort((a, b) => a.sortOrder - b.sortOrder);

  const blocks: ServiceDetailContentBlock[] = withSort.map((section) => ({
    type: "section",
    sortOrder: section.sortOrder!,
    section,
  }));

  return { blocks, ordered: withSort };
}

export function buildInterleavedServiceDetailBlocks(
  sectionsJson: string | null | undefined,
  legacySections: LegacyServiceSection[],
  legacyMedia: FeatureMediaLegacyFields,
): InterleavedDetailBlock[] {
  const { ordered } = sectionBlocks(sectionsJson, legacySections);
  const interleavedSections: InterleavedContentSection[] = ordered.map((section) => ({
    title: section.title,
    content: section.content,
    sortOrder: normalizePageSortOrder(section.sortOrder, section.sortOrder ?? 1),
    slug: section.slug,
    isMarkdown: section.isMarkdown,
  }));
  return mergeInterleavedSectionAndMediaBlocks(interleavedSections, legacyMedia);
}

export function mergeInterleavedSectionAndMediaBlocks(
  orderedSections: InterleavedContentSection[],
  legacyMedia: FeatureMediaLegacyFields,
): InterleavedDetailBlock[] {
  const sectionCount = orderedSections.length;
  const sectionBlocksList: InterleavedDetailBlock[] = orderedSections.map((section) => ({
    type: "section",
    sortOrder: section.sortOrder,
    section,
  }));

  const payload = parseFeatureMediaJson(legacyMedia.featureMediaJson, legacyMedia);
  const media = defaultMediaSortOrders(featureMediaToDisplayItems(payload), sectionCount);

  const mediaBlocks: InterleavedDetailBlock[] = media.map((item) => ({
    type: "media",
    sortOrder: item.sortOrder ?? normalizePageSortOrder(undefined, sectionCount + 1),
    item,
  }));

  const merged = [...sectionBlocksList, ...mediaBlocks];
  merged.sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    if (a.type !== b.type) return a.type === "section" ? -1 : 1;
    return 0;
  });

  return merged;
}

/** İçindekiler: yalnızca metin bölümleri, sıraya göre */
export function getOrderedServiceSectionNavItems(
  sectionsJson: string | null | undefined,
  legacySections: LegacyServiceSection[] = [],
) {
  const { ordered } = sectionBlocks(sectionsJson, legacySections);
  return ordered.map((section) => ({
    slug: section.slug,
    title: section.title,
  }));
}