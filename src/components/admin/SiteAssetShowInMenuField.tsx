"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { updateSiteAssetShowInMenuAction } from "@/lib/admin-actions";
import { useAdminToast } from "./AdminToast";

type UploadFieldProps = {
  variant: "upload";
};

type ListFieldProps = {
  variant: "list";
  assetId: number;
  initialChecked: boolean;
};

type Props = UploadFieldProps | ListFieldProps;

export function SiteAssetShowInMenuField(props: Props) {
  if (props.variant === "upload") {
    return (
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-3">
        <input
          type="checkbox"
          name="showInMenu"
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-csg-blue focus:ring-csg-blue/30"
        />
        <span className="min-w-0">
          <span className="block text-sm font-medium text-slate-900">Menüde göster</span>
          <span className="mt-1 block text-xs leading-relaxed text-slate-500">
            İşaretliyse seçilen tüm dosyalar ülke, hizmet ve rehber sayfalarında sol
            panelde &quot;Dilekçe, Formlar ve Belgeler&quot; altında listelenir.
          </span>
        </span>
      </label>
    );
  }

  return (
    <SiteAssetShowInMenuListToggle
      assetId={props.assetId}
      initialChecked={props.initialChecked}
    />
  );
}

function SiteAssetShowInMenuListToggle({
  assetId,
  initialChecked,
}: {
  assetId: number;
  initialChecked: boolean;
}) {
  const router = useRouter();
  const toast = useAdminToast();
  const [checked, setChecked] = useState(initialChecked);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextChecked = formData.get("showInMenu") === "on";
    const previousChecked = !nextChecked;

    setPending(true);
    try {
      const result = await updateSiteAssetShowInMenuAction(formData);
      if (result.ok) {
        setChecked(nextChecked);
        toast.show({ variant: "success", message: result.message });
        router.refresh();
      } else {
        setChecked(previousChecked);
        toast.show({
          variant: "error",
          message: result.message || "Menü ayarı güncellenemedi.",
        });
      }
    } catch {
      setChecked(previousChecked);
      toast.show({
        variant: "error",
        message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="inline-flex items-center justify-center">
      <input type="hidden" name="id" value={assetId} />
      <label className="inline-flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          name="showInMenu"
          checked={checked}
          disabled={pending}
          onChange={(event) => {
            setChecked(event.target.checked);
            event.currentTarget.form?.requestSubmit();
          }}
          className="h-4 w-4 rounded border-slate-300 text-csg-blue focus:ring-csg-blue/30 disabled:opacity-50"
          aria-label="Menüde göster"
        />
        <span className="text-xs text-slate-600">Menüde</span>
      </label>
    </form>
  );
}
