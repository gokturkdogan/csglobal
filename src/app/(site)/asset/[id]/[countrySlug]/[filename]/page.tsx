import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findSiteAssetForPublicView } from "@/lib/repositories/site-asset.repository";
import {
  buildSiteAssetViewApiUrl,
} from "@/lib/site-asset";
import { SiteAssetViewer } from "@/components/domain/SiteAssetViewer";

type PageProps = {
  params: Promise<{ id: string; countrySlug: string; filename: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, countrySlug, filename } = await params;
  const assetId = Number.parseInt(id, 10);
  if (!Number.isFinite(assetId)) {
    return { title: "Döküman" };
  }

  const asset = await findSiteAssetForPublicView(assetId, countrySlug, filename);
  if (!asset) {
    return { title: "Döküman" };
  }

  return {
    title: asset.fileName,
    description: `${asset.country.name} dökümanı: ${asset.fileName}`,
  };
}

export default async function SiteAssetPage({ params }: PageProps) {
  const { id, countrySlug, filename } = await params;
  const assetId = Number.parseInt(id, 10);
  if (!Number.isFinite(assetId)) notFound();

  const asset = await findSiteAssetForPublicView(assetId, countrySlug, filename);
  if (!asset) notFound();

  const viewUrl = buildSiteAssetViewApiUrl(
    asset.id,
    asset.country.slug,
    asset.fileName,
  );

  return (
    <SiteAssetViewer
      fileName={asset.fileName}
      countryName={asset.country.name}
      countrySlug={asset.country.slug}
      mimeType={asset.mimeType}
      viewUrl={viewUrl}
    />
  );
}
