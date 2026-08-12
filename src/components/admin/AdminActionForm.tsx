"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  type FormHTMLAttributes,
  type ReactNode,
} from "react";
import { useFormStatus } from "react-dom";
import type { AdminActionResult } from "@/lib/admin-action-result";
import { useAdminToast } from "./AdminToast";

const AdminFormPendingContext = createContext(false);

export function useAdminFormPending() {
  return useContext(AdminFormPendingContext);
}

function AdminSpinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

type AdminActionFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "action"> & {
  action: (formData: FormData) => Promise<AdminActionResult>;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (result: AdminActionResult) => void;
};

export function AdminActionForm({
  action,
  children,
  className,
  successMessage,
  errorMessage,
  onSuccess,
  ...props
}: AdminActionFormProps) {
  const router = useRouter();
  const toast = useAdminToast();
  const [pending, setPending] = useState(false);

  async function handleAction(formData: FormData) {
    setPending(true);
    try {
      const result = await action(formData);
      if (result.ok) {
        toast.show({
          variant: "success",
          message: successMessage ?? result.message,
        });
        onSuccess?.(result);
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
        router.refresh();
      } else {
        toast.show({
          variant: "error",
          message: result.message || errorMessage || "İşlem başarısız oldu.",
        });
      }
    } catch {
      toast.show({
        variant: "error",
        message: errorMessage ?? "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <AdminFormPendingContext.Provider value={pending}>
      <form action={handleAction} className={className} {...props}>
        {children}
      </form>
    </AdminFormPendingContext.Provider>
  );
}

export function AdminSubmitButton({
  children = "Kaydet",
  className = "",
  loadingLabel = "Kaydediliyor…",
  disabled,
}: {
  children?: ReactNode;
  className?: string;
  loadingLabel?: string;
  disabled?: boolean;
}) {
  const contextPending = useAdminFormPending();
  const { pending: formStatusPending } = useFormStatus();
  const pending = contextPending || formStatusPending;
  const isDisabled = disabled || pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-csg-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-csg-blue-dark focus:outline-none focus:ring-2 focus:ring-csg-blue/30 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <>
          <AdminSpinner />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function AdminLoadingButton({
  children,
  loadingLabel = "Kaydediliyor…",
  pending,
  onClick,
  className = "",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  loadingLabel?: string;
  pending: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const isDisabled = disabled || pending;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-csg-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-csg-blue-dark disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? (
        <>
          <AdminSpinner />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
