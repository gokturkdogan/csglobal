"use client";

import { ServiceFeatureMediaEditor } from "@/components/admin/service/ServiceFeatureMediaEditor";

type LegacyProps = {
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
};

type Props = {
  initialJson?: string | null;
  legacy?: LegacyProps;
};

export function ForeignConsultancyFeatureMediaSection({ initialJson, legacy }: Props) {
  return (
    <ServiceFeatureMediaEditor
      initialJson={initialJson}
      legacy={legacy}
      fcMediaI18n
    />
  );
}