"use client";

import { useEffect, useState } from "react";
import { formatPublicSitePath } from "@/lib/site-url";
import { isValidSlug } from "@/lib/slug";
import { useVisualSlug } from "@/components/admin/VisualSlugProvider";

export function AdminPublicUrlDisplay({ path }: { path: string | null | undefined }) {
  if (!path?.trim()) return null;

  return (
    <code
      className="mt-2 block break-all rounded-md bg-slate-100 px-2.5 py-1.5 text-sm text-slate-700 select-all"
    >
      {formatPublicSitePath(path)}
    </code>
  );
}

function AdminPublicUrlPending({ message }: { message: string }) {
  return <p className="mt-2 text-sm text-slate-500">{message}</p>;
}

/** VisualSlugProvider içinde: /rehber/{slug} gibi yollar. */
export function AdminSlugPublicUrl({
  prefix,
  initialPath,
}: {
  prefix: string;
  initialPath?: string | null;
}) {
  const { slug, slugReady } = useVisualSlug();
  const base = prefix.replace(/\/$/, "");
  const livePath = slugReady ? `${base}/${slug}` : null;
  const path = livePath ?? initialPath;

  if (!path) {
    return (
      <AdminPublicUrlPending
        message="Site yolu: geçerli slug girildiğinde görünür."
      />
    );
  }

  return <AdminPublicUrlDisplay path={path} />;
}

type CountryOption = { id: string; slug: string };

/** Hizmet: /{ülke-slug}/{hizmet-slug} */
export function AdminServicePublicUrl({
  countries,
  defaultCountryId,
  initialPath,
}: {
  countries: CountryOption[];
  defaultCountryId: string;
  initialPath?: string | null;
}) {
  const { slug, slugReady } = useVisualSlug();
  const [countrySlug, setCountrySlug] = useState(
    () => countries.find((c) => c.id === defaultCountryId)?.slug ?? "",
  );

  useEffect(() => {
    const select = document.querySelector(
      "select[name='countryId']",
    ) as HTMLSelectElement | null;
    if (!select) return;

    const sync = () => {
      const match = countries.find((c) => c.id === select.value);
      setCountrySlug(match?.slug ?? "");
    };

    sync();
    select.addEventListener("change", sync);
    return () => select.removeEventListener("change", sync);
  }, [countries]);

  const livePath =
    countrySlug && slugReady ? `/${countrySlug}/${slug}` : null;
  const path = livePath ?? initialPath;

  if (!path) {
    if (!countrySlug) {
      return (
        <AdminPublicUrlPending message="Site yolu: ülke seçildiğinde görünür." />
      );
    }
    return (
      <AdminPublicUrlPending
        message="Site yolu: geçerli slug girildiğinde görünür."
      />
    );
  }

  return <AdminPublicUrlDisplay path={path} />;
}

/** Slug input alanını izler (ülke, kategori vb.). */
export function AdminFormSlugPublicUrl({
  fieldName,
  pathPrefix = "",
  initialSlug = "",
  initialPath,
}: {
  fieldName: string;
  pathPrefix?: string;
  initialSlug?: string;
  initialPath?: string | null;
}) {
  const [slug, setSlug] = useState(initialSlug);

  useEffect(() => {
    const input = document.querySelector(
      `input[name="${fieldName}"]`,
    ) as HTMLInputElement | null;
    if (!input) return;

    const sync = () => setSlug(input.value);
    sync();
    input.addEventListener("input", sync);
    return () => input.removeEventListener("input", sync);
  }, [fieldName]);

  const trimmed = slug.trim();
  const prefix = pathPrefix.replace(/\/$/, "");
  const livePath = isValidSlug(trimmed)
    ? prefix
      ? `${prefix}/${trimmed}`
      : `/${trimmed}`
    : null;
  const path = livePath ?? initialPath;

  if (!path) {
    return (
      <AdminPublicUrlPending
        message="Site yolu: geçerli slug girildiğinde görünür."
      />
    );
  }

  return <AdminPublicUrlDisplay path={path} />;
}
