"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SlugContextValue = {
  slug: string;
  setSlug: (slug: string) => void;
  slugReady: boolean;
};

const SlugContext = createContext<SlugContextValue | null>(null);

export function VisualSlugProvider({
  initialSlug,
  children,
}: {
  initialSlug: string;
  children: ReactNode;
}) {
  const [slug, setSlug] = useState(initialSlug.trim());
  const slugReady = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

  return (
    <SlugContext.Provider value={{ slug, setSlug, slugReady }}>
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

const slugInputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function VisualSlugField({
  name = "slug",
  cloudinaryPrefix,
  placeholder,
}: {
  name?: string;
  cloudinaryPrefix: string;
  placeholder?: string;
}) {
  const { slug, setSlug, slugReady } = useVisualSlug();

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Slug (görsel yolu)</span>
        <input
          type="text"
          name={name}
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value.trim().toLowerCase())}
          placeholder={placeholder}
          className={slugInputClass}
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
