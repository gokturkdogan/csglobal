import { notFound } from "next/navigation";
import { saveBlogPostAction } from "@/lib/admin-actions";
import { ServiceFeatureBlock } from "@/components/admin/service/ServiceFeatureBlock";
import { ServiceHeroBlock } from "@/components/admin/service/ServiceHeroBlock";
import { ServiceSectionsEditor } from "@/components/admin/service/ServiceSectionsEditor";
import { AdminBlogPlacementFields } from "@/components/admin/blog/AdminBlogPlacementFields";
import {
  VisualSlugField,
  VisualSlugProvider,
  VisualTitleField,
} from "@/components/admin/VisualSlugProvider";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminSlugPublicUrl } from "@/components/admin/AdminPublicUrl";
import { findBlogPostById } from "@/lib/repositories/blog.repository";
import { SeoMetadataBlock } from "@/components/admin/SeoMetadataBlock";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { SeoEntityType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { buildBlogPath } from "@/lib/paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  let post: Awaited<ReturnType<typeof findBlogPostById>> = null;
  if (!isNew) {
    try {
      post = await findBlogPostById(id);
    } catch (error) {
      console.error("[admin/bloglar/edit] load failed:", error);
      throw error;
    }
    if (!post) notFound();
  }

  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  const seo = post
    ? await (async () => {
        try {
          return await findSeoMetadata(SeoEntityType.BLOG_POST, post.id);
        } catch {
          return null;
        }
      })()
    : null;
  const initialPath = post ? buildBlogPath(post.slug) : null;

  return (
    <div className="space-y-6">
      <VisualSlugProvider initialSlug={post?.slug ?? ""} initialTitle={post?.title ?? ""}>
        <AdminPageHeader
          title={post ? `${post.title} Düzenle` : "Yeni Blog"}
          description="Banner, içerik bölümleri ve görselli alanlar."
          publicUrl={
            <AdminSlugPublicUrl prefix="/bloglar" initialPath={initialPath} />
          }
        />

        <AdminActionForm action={saveBlogPostAction} className="max-w-3xl space-y-6">
          {post && <input type="hidden" name="id" value={post.id} />}

          <AdminFormSection title="Konum">
            <AdminBlogPlacementFields
              countries={countries}
              initialCountryId={post?.countryId}
              initialTopicCategory={post?.topicCategory}
            />
          </AdminFormSection>

          <AdminFormSection title="Blog bilgileri">
            <VisualTitleField label="Başlık" name="title" required />
            <VisualSlugField cloudinaryPrefix="Blog" placeholder="almanya-vize-rehberi" />
            <AdminField
              label="Liste özeti (kart / SEO)"
              name="excerpt"
              value={post?.excerpt}
              hint="Blog listesinde ve arama sonuçlarında görünür."
            />
            <AdminField
              label="Sıra"
              name="sortOrder"
              type="number"
              value={post?.sortOrder ?? 0}
            />
            <AdminCheckbox
              label="Öne çıkan"
              name="isFeatured"
              defaultChecked={post?.isFeatured ?? false}
            />
            <AdminCheckbox
              label="Yayında (aktif)"
              name="isActive"
              defaultChecked={post?.isActive ?? true}
            />
          </AdminFormSection>

          <AdminFormSection
            title="Banner"
            description="Banner metinleri. Görsel bağlı ülkenin hero görselinden gelir; ülke yoksa site varsayılanı kullanılır."
          >
            <ServiceHeroBlock
              heroTitle={post?.heroTitle}
              heroSubtitle={post?.heroSubtitle}
              defaultTitle={post?.title}
              defaultSubtitle={post?.excerpt}
            />
          </AdminFormSection>

          <AdminFormSection
            title="İçerik bölümleri"
            description="Başlık ve zengin metin blokları. İstediğiniz kadar bölüm ekleyebilirsiniz."
          >
            <ServiceSectionsEditor initialJson={post?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection
            title="Görsel alan 1"
            description="Görsel, başlık ve metin birlikte; sitede görsel solda."
          >
            <ServiceFeatureBlock
              index={1}
              featureImage={post?.featureImage1 ?? ""}
              featureImageTitle={post?.featureImage1Title}
              featureImageText={post?.featureImage1Text}
            />
          </AdminFormSection>

          <AdminFormSection
            title="Görsel alan 2"
            description="Görsel, başlık ve metin birlikte; sitede görsel sağda."
          >
            <ServiceFeatureBlock
              index={2}
              featureImage={post?.featureImage2 ?? ""}
              featureImageTitle={post?.featureImage2Title}
              featureImageText={post?.featureImage2Text}
            />
          </AdminFormSection>

          <SeoMetadataBlock seo={seo} />

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>
      </VisualSlugProvider>
    </div>
  );
}
