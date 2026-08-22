"use client";

import { useEffect, useMemo, useState } from "react";
import type { ImmigrationOfficesApiResponse } from "@/app/api/immigration-offices/route";
import { ImmigrationOfficeEmptyState } from "@/components/tools/immigration-office/ImmigrationOfficeEmptyState";
import { ImmigrationOfficeFilters } from "@/components/tools/immigration-office/ImmigrationOfficeFilters";
import { ImmigrationOfficeList } from "@/components/tools/immigration-office/ImmigrationOfficeList";
import { ImmigrationOfficeListSkeleton } from "@/components/tools/immigration-office/ImmigrationOfficeListSkeleton";

type Props = {
  cities: string[];
};

export function ImmigrationOfficeFinder({ cities }: Props) {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offices, setOffices] = useState<ImmigrationOfficesApiResponse["offices"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (debouncedSearch) params.set("search", debouncedSearch);
    return params.toString();
  }, [city, debouncedSearch]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadOffices() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/immigration-offices${queryString ? `?${queryString}` : ""}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Kayıtlar yüklenemedi.");
        }

        const data = (await response.json()) as ImmigrationOfficesApiResponse;
        if (!cancelled) {
          setOffices(data.offices);
        }
      } catch (fetchError) {
        if (cancelled || (fetchError instanceof DOMException && fetchError.name === "AbortError")) {
          return;
        }
        setError("Göç İdaresi kayıtları yüklenirken bir hata oluştu.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOffices();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [queryString]);

  return (
    <div className="space-y-6">
      <ImmigrationOfficeFilters
        city={city}
        search={search}
        cities={cities}
        onCityChange={setCity}
        onSearchChange={setSearch}
      />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? <ImmigrationOfficeListSkeleton /> : null}

      {!loading && !error && offices.length === 0 ? <ImmigrationOfficeEmptyState /> : null}

      {!loading && !error && offices.length > 0 ? (
        <ImmigrationOfficeList offices={offices} />
      ) : null}
    </div>
  );
}
