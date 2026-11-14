import { parseCountryDetailSectionsJson } from "@/lib/country-detail";
import {
  type FeatureMediaLegacyFields,
  mergeInterleavedSectionAndMediaBlocks,
  type InterleavedContentSection,
  type InterleavedDetailBlock,
} from "@/lib/service-detail-blocks";
import { normalizePageSortOrder } from "@/lib/service-constants";

export function countrySectionDomId(index: number): string {
  return `country-section-${index}`;
}

export function buildInterleavedCountryDetailBlocks(
  detailSectionsJson: string | null | undefined,
  legacyMedia: FeatureMediaLegacyFields,
): InterleavedDetailBlock[] {
  const parsed = parseCountryDetailSectionsJson(detailSectionsJson);
  const indexed = parsed.map((section, index) => ({ section, index }));

  indexed.sort(
    (a, b) =>
      (a.section.sortOrder ?? 0) - (b.section.sortOrder ?? 0) || a.index - b.index,
  );

  const ordered: InterleavedContentSection[] = indexed.map(({ section }, displayIndex) => ({
    title: section.title,
    content: section.content,
    sortOrder: normalizePageSortOrder(section.sortOrder, displayIndex + 1),
    slug: countrySectionDomId(displayIndex),
    isMarkdown: false,
  }));

  return mergeInterleavedSectionAndMediaBlocks(ordered, legacyMedia);
}