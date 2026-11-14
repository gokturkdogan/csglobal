import { notFound } from "next/navigation";
import { saveBlogPostAction } from "@/lib/admin-actions";
import { ServiceFeatureMediaEditor } from "@/components/admin/service/ServiceFeatureMediaEditor";
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
              label="Anasayfada göster"
              name="isFeatured"
              defaultChecked={post?.isFeatured ?? false}
            />
            <p className="text-sm text-slate-500">
              Öne çıkan rehberler bölümünde listelenir. Anasayfada en fazla 9 rehber gösterilebilir.
            </p>
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
            description="Her bölüme sayfa sırası verin; görsel/video alanlarıyla karışık dizilebilir."
          >
            <ServiceSectionsEditor initialJson={post?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection
            title="Görsel ve video alanları"
            description="Cloudinary ile görsel ve video. Sayfa sırası içerik bölümleriyle ortaktır; en fazla 10+10 alan."
          >
            <ServiceFeatureMediaEditor
              initialJson={post?.featureMediaJson}
              legacy={
                post
                  ? {
                      featureImage1: post.featureImage1,
                      featureImage1Title: post.featureImage1Title,
                      featureImage1Text: post.featureImage1Text,
                      featureImage2: post.featureImage2,
                      featureImage2Title: post.featureImage2Title,
                      featureImage2Text: post.featureImage2Text,
                    }
                  : undefined
              }
            />
          </AdminFormSection>

          <SeoMetadataBlock seo={seo} />

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>
      </VisualSlugProvider>
    </div>
  );
}
