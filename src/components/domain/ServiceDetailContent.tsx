import { InterleavedDetailBlocksView } from "@/components/domain/InterleavedDetailBlocksView";
import { buildInterleavedServiceDetailBlocks } from "@/lib/service-detail-blocks";

type LegacySection = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

type Props = {
  sectionsJson: string | null | undefined;
  legacySections?: LegacySection[];
  featureMediaJson?: string | null;
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
  featureImage1Priority?: boolean;
};

export function ServiceDetailContent({
  sectionsJson,
  legacySections = [],
  featureMediaJson,
  featureImage1,
  featureImage1Title,
  featureImage1Text,
  featureImage2,
  featureImage2Title,
  featureImage2Text,
  featureImage1Priority = false,
}: Props) {
  const blocks = buildInterleavedServiceDetailBlocks(
    sectionsJson,
    legacySections.map((section) => ({
      title: section.title,
      slug: section.slug,
      content: section.content,
    })),
    {
      featureMediaJson,
      featureImage1,
      featureImage1Title,
      featureImage1Text,
      featureImage2,
      featureImage2Title,
      featureImage2Text,
    },
  );

  return (
    <InterleavedDetailBlocksView
      blocks={blocks}
      featureImage1Priority={featureImage1Priority}
    />
  );
}