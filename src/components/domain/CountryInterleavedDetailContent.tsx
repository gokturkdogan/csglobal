import { InterleavedDetailBlocksView } from "@/components/domain/InterleavedDetailBlocksView";
import { buildInterleavedCountryDetailBlocks } from "@/lib/country-detail-blocks";

type Props = {
  detailSectionsJson: string | null | undefined;
  featureMediaJson?: string | null;
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
};

export function CountryInterleavedDetailContent({
  detailSectionsJson,
  featureMediaJson,
  featureImage1,
  featureImage1Title,
  featureImage1Text,
  featureImage2,
  featureImage2Title,
  featureImage2Text,
}: Props) {
  const blocks = buildInterleavedCountryDetailBlocks(detailSectionsJson, {
    featureMediaJson,
    featureImage1,
    featureImage1Title,
    featureImage1Text,
    featureImage2,
    featureImage2Title,
    featureImage2Text,
  });

  return <InterleavedDetailBlocksView blocks={blocks} />;
}