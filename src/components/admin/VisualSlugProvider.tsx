"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { isValidSlug, slugFromTitle } from "@/lib/slug";

type SlugContextValue = {
  title: string;
  setTitle: (title: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
  slugReady: boolean;
};

const SlugContext = createContext<SlugContextValue | null>(null);

function initialSlugManuallyEdited(initialTitle: string, initialSlug: string): boolean {
  const trimmedSlug = initialSlug.trim();
  if (!trimmedSlug) return false;
  return trimmedSlug !== slugFromTitle(initialTitle);
}

export function VisualSlugProvider({
  initialSlug,
  initialTitle = "",
  children,
}: {
  initialSlug: string;
  initialTitle?: string;
  children: ReactNode;
}) {
  const [title, setTitleState] = useState(initialTitle.trim());
  const [slug, setSlugState] = useState(initialSlug.trim());
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(() =>
    initialSlugManuallyEdited(initialTitle, initialSlug),
  );

  const setTitle = (value: string) => {
    setTitleState(value);
    if (!slugManuallyEdited) {
      setSlugState(slugFromTitle(value));
    }
  };

  const setSlug = (value: string) => {
    setSlugManuallyEdited(true);
    setSlugState(value.trim().toLowerCase());
  };

  const slugReady = isValidSlug(slug);

  return (
    <SlugContext.Provider value={{ title, setTitle, slug, setSlug, slugReady }}>
      {children}
    </SlugContext.Provider>
  );
}

export function useVisualSlug() {
  const ctx = useContext(SlugContext);
  if (!ctx) {
    throw new Error("useVisualSlug must be used within VisualSlugProvider");
  }
  return ctx;
}

const fieldInputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function VisualTitleField({
  label,
  name = "name",
  required,
  placeholder,
  hint,
}: {
  label: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  const { title, setTitle } = useVisualSlug();

  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="text"
        name={name}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={fieldInputClass}
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function VisualSlugField({
  name = "slug",
  cloudinaryPrefix,
  placeholder,
  label = "Slug (görsel yolu)",
}: {
  name?: string;
  cloudinaryPrefix: string;
  placeholder?: string;
  label?: string;
}) {
  const { slug, setSlug, slugReady } = useVisualSlug();

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <input
          type="text"
          name={name}
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={placeholder}
          className={fieldInputClass}
        />
        <p className="mt-1 text-xs text-slate-500">
          Cloudinary: <code className="text-csg-blue">{cloudinaryPrefix}/{slug || "slug"}/…</code>
        </p>
      </label>
      {!slugReady && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
          Görsel yüklemek için geçerli slug girin (küçük harf, tire ile).
        </p>
      )}
    </div>
  );
}

export function VisualSlugGate({
  children,
}: {
  children: (slug: string) => ReactNode;
}) {
  const { slug, slugReady } = useVisualSlug();
  if (!slugReady) return null;
  return <>{children(slug)}</>;
}
