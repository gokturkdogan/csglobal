import Link from "next/link";
import { RichContent } from "@/components/RichTextContent";
import { ContactCTA } from "@/components/domain/ContactCTA";
import {
  RejectionReasonIcon,
  RejectionSectionIcon,
} from "@/components/tools/rejection/RejectionIcons";
import {
  buildRejectionReasonPath,
  getRelatedRejectionReasons,
  rejectionGuideMeta,
  type RejectionReason,
  type RejectionSection,
} from "@/lib/rejection-guide-data";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";

type Props = {
  reason: RejectionReason;
  settings: SiteSettingsMap;
};

type SectionStyle = {
  span: "full" | "half";
  accent: "summary" | "reasons" | "examples" | "actions" | "cta";
};

function getSectionStyle(section: RejectionSection): SectionStyle {
  const title = section.title;

  if (title.includes("Son Değildir") || section.variant === "info") {
    return { span: "full", accent: "cta" };
  }
  if (title.includes("Ne Anlama")) {
    return { span: "full", accent: "summary" };
  }
  if (title.includes("Nedenler")) {
    return { span: "half", accent: "reasons" };
  }
  if (title.includes("Örnek")) {
    return { span: "half", accent: "examples" };
  }
  if (title.includes("Düzelir")) {
    return { span: "full", accent: "actions" };
  }
  if (section.variant === "warning") {
    return { span: "full", accent: "reasons" };
  }

  return { span: "half", accent: "summary" };
}

function sectionCardClass(accent: SectionStyle["accent"]) {
  switch (accent) {
    case "summary":
      return "border-slate-200 bg-gradient-to-br from-white to-slate-50";
    case "reasons":
      return "border-csg-red/20 bg-csg-red/[0.03]";
    case "examples":
      return "border-amber-200/80 bg-amber-50/50";
    case "actions":
      return "border-emerald-200/80 bg-emerald-50/40";
    case "cta":
      return "border-csg-blue/25 bg-gradient-to-br from-csg-blue/[0.08] via-white to-csg-red/[0.05]";
    default:
      return "border-slate-200 bg-white";
  }
}

function sectionIconClass(accent: SectionStyle["accent"]) {
  switch (accent) {
    case "reasons":
      return "bg-csg-red text-white";
    case "examples":
      return "bg-amber-500 text-white";
    case "actions":
      return "bg-emerald-600 text-white";
    case "cta":
      return "bg-csg-blue text-white";
    default:
      return "bg-slate-900 text-white";
  }
}

function sectionBadge(accent: SectionStyle["accent"]) {
  switch (accent) {
    case "summary":
      return "Özet";
    case "reasons":
      return "Nedenler";
    case "examples":
      return "Örnekler";
    case "actions":
      return "Çözüm";
    case "cta":
      return "Sonraki adım";
    default:
      return "Analiz";
  }
}

function AnalysisSectionCard({
  section,
  style,
}: {
  section: RejectionSection;
  style: SectionStyle;
}) {
  const isCta = style.accent === "cta";

  return (
    <section
      className={`flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm ${sectionCardClass(style.accent)} ${
        style.span === "full" ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start gap-3 border-b border-black/[0.04] px-4 py-3.5 md:px-5">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${sectionIconClass(style.accent)}`}
        >
          <RejectionSectionIcon title={section.title} className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              isCta
                ? "bg-csg-blue/10 text-csg-blue"
                : style.accent === "reasons"
                  ? "bg-csg-red/10 text-csg-red"
                  : style.accent === "examples"
                    ? "bg-amber-100 text-amber-800"
                    : style.accent === "actions"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600"
            }`}
          >
            {sectionBadge(style.accent)}
          </span>
          <h3 className="mt-1.5 text-base font-semibold text-slate-900">{section.title}</h3>
        </div>
      </div>

      <div
        className={`flex-1 px-4 py-4 md:px-5 md:py-5 ${
          style.accent === "examples"
            ? "rejection-prose-examples"
            : style.accent === "reasons"
              ? "rejection-prose-reasons"
              : style.accent === "actions"
                ? "rejection-prose-actions"
                : "rejection-prose-default"
        }`}
      >
        <RichContent content={section.contentHtml} />
      </div>
    </section>
  );
}

export function RejectionContent({ reason, settings }: Props) {
  const related = getRelatedRejectionReasons(reason);
  const mainSections = reason.sections.filter((s) => !s.title.includes("Son Değildir"));
  const ctaSection = reason.sections.find((s) => s.title.includes("Son Değildir"));

  return (
    <div className="flex min-h-[520px] flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      {/* Analiz paneli üst bar */}
      <div className="border-b border-slate-200 bg-slate-900 px-5 py-4 text-white md:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
              Analiz paneli
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-csg-red px-2.5 py-1 text-xs font-bold">
                <RejectionReasonIcon icon={reason.icon} className="h-3.5 w-3.5" />
                Madde {reason.code}
              </span>
              <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white/85">
                6458 sayılı kanun
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{reason.title}</h2>
          </div>
          <div className="hidden shrink-0 sm:flex sm:h-14 sm:w-14 sm:items-center sm:justify-center sm:rounded-2xl sm:bg-white/10 sm:text-white">
            <RejectionReasonIcon icon={reason.icon} className="h-7 w-7" />
          </div>
        </div>
      </div>

      {/* Özet bandı */}
      <div className="border-b border-csg-red/10 bg-csg-red/[0.04] px-5 py-3.5 md:px-7">
        <p className="text-sm leading-relaxed text-slate-700">{reason.shortDescription}</p>
      </div>

      {/* 2 sütun analiz grid */}
      <div className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          {mainSections.map((section) => (
            <AnalysisSectionCard
              key={section.title}
              section={section}
              style={getSectionStyle(section)}
            />
          ))}
        </div>

        {ctaSection ? (
          <div className="mt-4">
            <AnalysisSectionCard
              section={ctaSection}
              style={{ span: "full", accent: "cta" }}
            />
          </div>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 md:p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white">
                <RejectionSectionIcon title="Sık Görülen Nedenler" className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-sm font-semibold text-slate-900">İlgili maddeler</h3>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={buildRejectionReasonPath(item.slug)}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-csg-red/30 hover:bg-csg-red/[0.04]"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-csg-red/10 text-csg-red group-hover:bg-csg-red group-hover:text-white">
                      <RejectionReasonIcon icon={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wide text-csg-red">
                        Madde {item.code}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-slate-900 group-hover:text-csg-red">
                        {item.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-5">
          <ContactCTA
            settings={settings}
            title={rejectionGuideMeta.ctaTitle}
            subtitle={rejectionGuideMeta.ctaSubtitle}
            context={`${reason.title} ret gerekçesi`}
          />
        </div>
      </div>
    </div>
  );
}

export function RejectionEmptyState() {
  const previewSections = [
    { label: "Özet", title: "Bu Ne Anlama Geliyor?", accent: "bg-slate-100" },
    { label: "Nedenler", title: "Sık Görülen Nedenler", accent: "bg-csg-red/10" },
    { label: "Örnekler", title: "Örnek Vakalar", accent: "bg-amber-100/80" },
    { label: "Çözüm", title: "Nasıl Düzelir?", accent: "bg-emerald-100/80" },
  ];

  return (
    <div className="flex min-h-[520px] flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="border-b border-slate-200 bg-slate-900 px-5 py-4 text-white md:px-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
          Analiz paneli
        </p>
        <h2 className="mt-2 text-xl font-semibold md:text-2xl">Analiz İçin Madde Seçin</h2>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Belgenizde yer alan maddeyi soldaki listeden seçerek çözüm yollarını görebilirsiniz.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 md:px-8">
        <div className="w-full max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-csg-red/10 text-csg-red ring-1 ring-csg-red/15">
            <RejectionSectionIcon title="Bu Ne Anlama Geliyor?" className="h-8 w-8" />
          </div>
          <p className="mt-5 text-lg font-semibold text-slate-900">{rejectionGuideMeta.emptyTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {rejectionGuideMeta.emptyDescription}
          </p>
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Seçim sonrası analiz önizlemesi
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {previewSections.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white/80 p-4 opacity-60"
              >
                <span
                  className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 ${item.accent}`}
                >
                  {item.label}
                </span>
                <p className="mt-2 text-sm font-semibold text-slate-800">{item.title}</p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-slate-100" />
                  <div className="h-2 w-4/5 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RejectionDisclaimer() {
  return (
    <section className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white">
          <RejectionSectionIcon title="Ret Kararı Son Değildir!" className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-amber-950 md:text-base">
            {rejectionGuideMeta.disclaimerTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-950/80">
            {rejectionGuideMeta.disclaimerBody}
          </p>
        </div>
      </div>
    </section>
  );
}
