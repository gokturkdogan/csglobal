import { GuideDetailContent } from "@/components/domain/GuideDetailContent";

type Props = {
  sectionsJson: string | null | undefined;
};

/** Konsolosluk içerik bölümleri (rehber ile aynı JSON yapısı). */
export function ConsulateDetailContent({ sectionsJson }: Props) {
  return (
    <GuideDetailContent
      sectionsJson={sectionsJson}
      featureImage={null}
      featureImageTitle={null}
      featureImageText={null}
    />
  );
}
