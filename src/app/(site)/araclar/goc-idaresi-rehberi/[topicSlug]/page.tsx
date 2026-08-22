import { notFound } from "next/navigation";
import { GocIdaresiContent } from "@/components/tools/goc-idaresi/GocIdaresiContent";
import {
  buildGocIdaresiTopicPath,
  getGocIdaresiTopicBySlug,
  GOC_IDARESI_GUIDE_PATH,
  gocIdaresiGuideMeta,
  gocIdaresiTopics,
} from "@/lib/goc-idaresi-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ topicSlug: string }> };

export async function generateStaticParams() {
  return gocIdaresiTopics.map((topic) => ({ topicSlug: topic.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { topicSlug } = await params;
  const topic = getGocIdaresiTopicBySlug(topicSlug);
  if (!topic) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: `araclar-goc-idaresi-rehberi-${topic.slug}`,
    path: buildGocIdaresiTopicPath(topic.slug),
    fallbackTitle: `${topic.title} | ${gocIdaresiGuideMeta.title}`,
    fallbackDescription: topic.shortDescription,
  });
}

export default async function GocIdaresiTopicPage({ params }: Props) {
  const { topicSlug } = await params;
  const topic = getGocIdaresiTopicBySlug(topicSlug);
  if (!topic) notFound();

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    { name: gocIdaresiGuideMeta.title, url: `${siteUrl}${GOC_IDARESI_GUIDE_PATH}` },
    { name: topic.title, url: `${siteUrl}${buildGocIdaresiTopicPath(topic.slug)}` },
  ]);

  return (
    <>
      <GocIdaresiContent topic={topic} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
