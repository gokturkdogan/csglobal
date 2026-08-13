import { notFound } from "next/navigation";
import { saveArticleAction } from "@/lib/admin-actions";
import { GuideCountryServicesField } from "@/components/admin/guide/GuideCountryServicesField";
import { GuideFeatureBlock } from "@/components/admin/guide/GuideFeatureBlock";
import { GuideHeroBlock } from "@/components/admin/guide/GuideHeroBlock";
import { GuideSectionsEditor } from "@/components/admin/guide/GuideSectionsEditor";
import {
  VisualSlugField,
  VisualSlugProvider,
} from "@/components/admin/VisualSlugProvider";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import {
  findArticleForAdmin,
  listServicesForGuideAdmin,
} from "@/lib/repositories/article.repository";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const article = isNew ? null : await findArticleForAdmin(id);
  if (!isNew && !article) notFound();

  const countries = await prisma.country.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const services = await listServicesForGuideAdmin();
  const serviceOptions = services.map((service) => ({
    id: service.id,
    name: service.name,
    countryId: service.countryId,
    categoryName: service.category.name,
  }));

  const selectedServiceIds =
    article?.linkedServices.map((link) => link.serviceId) ?? [];

  const defaultCountryId = article?.countryId ?? countries[0]?.id ?? "";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={article ? article.title : "Yeni Rehber"}
        description="Ülkeye bağlı rehber içeriği, hero görseli ve hizmet ilişkileri."
      />

      <AdminActionForm action={saveArticleAction} className="max-w-3xl space-y-6">
        {article && <input type="hidden" name="id" value={article.id} />}

        <VisualSlugProvider initialSlug={article?.slug ?? ""}>
          <AdminFormSection title="Genel">
            <AdminField label="Başlık" name="title" value={article?.title} required />
            <VisualSlugField
              cloudinaryPrefix="Guides"
              placeholder="almanya-vize-rehberi"
            />
            <AdminField
              label="Liste özeti (kart / SEO)"
              name="excerpt"
              value={article?.excerpt}
              hint="Rehber listesinde ve arama sonuçlarında görünür."
            />
            <GuideCountryServicesField
              countries={countries}
              services={serviceOptions}
              initialCountryId={defaultCountryId}
              initialServiceIds={selectedServiceIds}
            />
          </AdminFormSection>

          <AdminFormSection
            title="Hero"
            description="Banner görseli ve üzerindeki metinler birlikte düzenlenir."
          >
            <GuideHeroBlock
              heroImage={article?.heroImage ?? ""}
              heroTitle={article?.heroTitle}
              heroSubtitle={article?.heroSubtitle}
              defaultTitle={article?.title}
              defaultSubtitle={article?.excerpt}
            />
          </AdminFormSection>

          <AdminFormSection
            title="İçerik bölümleri"
            description="Blog tarzında başlık ve zengin metin blokları."
          >
            <GuideSectionsEditor initialJson={article?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection
            title="Öne çıkan görsel alanı"
            description="Görsel, başlık ve metin aynı bölümde; sitede bölümlerden sonra gösterilir."
          >
            <GuideFeatureBlock
              featureImage={article?.featureImage ?? ""}
              featureImageTitle={article?.featureImageTitle}
              featureImageText={article?.featureImageText}
            />
          </AdminFormSection>
        </VisualSlugProvider>

        <AdminFormSection title="Yayın">
          <AdminCheckbox
            label="Yayınla"
            name="isPublished"
            defaultChecked={article?.isPublished ?? false}
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
