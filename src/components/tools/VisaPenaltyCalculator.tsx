"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateVisaPenalty,
  DEFAULT_USD_TRY_RATE,
  formatTl,
  formatUsd,
  VISA_PENALTY_COUNTRIES,
  type VisaFeeGroupId,
  type VisaPenaltyResult,
} from "@/lib/visa-penalty-calculator";
import { TOOLS_LIST_PATH } from "@/lib/tools";

const QUESTION_STEPS = 5;

type FormState = {
  countryName: string;
  groupId: VisaFeeGroupId;
  entryDate: string;
  enteredWithVisa: boolean | null;
  hadResidencePermit: boolean | null;
  legalStayEndDate: string;
  exitDate: string;
};

type RateState = {
  value: number;
  source: string | null;
  asOf: string | null;
  fallback: boolean;
  loading: boolean;
  error: string | null;
};

const initialForm: FormState = {
  countryName: "",
  groupId: "standard",
  entryDate: "",
  enteredWithVisa: null,
  hadResidencePermit: null,
  legalStayEndDate: "",
  exitDate: "",
};

const initialRate: RateState = {
  value: DEFAULT_USD_TRY_RATE,
  source: null,
  asOf: null,
  fallback: true,
  loading: true,
  error: null,
};

function OptionCard({
  selected,
  onClick,
  title,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[4.5rem] cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-4 text-center text-base font-semibold transition ${
        selected
          ? "border-csg-blue bg-csg-blue/5 text-csg-blue"
          : "border-slate-200 bg-white text-slate-900 hover:border-csg-blue/40"
      }`}
    >
      {title}
    </button>
  );
}

function inputClassName() {
  return "mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-csg-blue focus:ring-2 focus:ring-csg-blue/20";
}

export function VisaPenaltyCalculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VisaPenaltyResult | null>(null);
  const [rate, setRate] = useState<RateState>(initialRate);

  const progressPercent =
    result !== null ? 100 : Math.round(((step - 1) / QUESTION_STEPS) * 100);

  const countryOptions = useMemo(() => VISA_PENALTY_COUNTRIES, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRate() {
      setRate((current) => ({ ...current, loading: true, error: null }));
      try {
        const response = await fetch("/api/exchange-rate/usd-try", {
          cache: "no-store",
        });
        const data = (await response.json()) as {
          rate?: number | null;
          source?: string | null;
          asOf?: string | null;
          fallback?: boolean;
          message?: string;
        };

        if (cancelled) return;

        if (
          !response.ok ||
          typeof data.rate !== "number" ||
          !Number.isFinite(data.rate) ||
          data.rate <= 0
        ) {
          setRate({
            value: DEFAULT_USD_TRY_RATE,
            source: "Varsayılan",
            asOf: null,
            fallback: true,
            loading: false,
            error: data.message ?? "Güncel kur alınamadı, varsayılan kur kullanılıyor.",
          });
          return;
        }

        setRate({
          value: data.rate,
          source: data.source ?? "Kur servisi",
          asOf: data.asOf ?? null,
          fallback: Boolean(data.fallback),
          loading: false,
          error: null,
        });
      } catch {
        if (cancelled) return;
        setRate({
          value: DEFAULT_USD_TRY_RATE,
          source: "Varsayılan",
          asOf: null,
          fallback: true,
          loading: false,
          error: "Güncel kur alınamadı, varsayılan kur kullanılıyor.",
        });
      }
    }

    void loadRate();
    return () => {
      cancelled = true;
    };
  }, []);

  function validateCurrentStep(): boolean {
    switch (step) {
      case 1:
        if (!form.countryName.trim()) {
          setError("Lütfen ülke seçin.");
          return false;
        }
        break;
      case 2:
        if (!form.entryDate) {
          setError("Lütfen Türkiye'ye giriş tarihini girin.");
          return false;
        }
        break;
      case 3:
        if (form.enteredWithVisa === null) {
          setError("Lütfen vize ile giriş durumunu seçin.");
          return false;
        }
        break;
      case 4:
        if (form.hadResidencePermit === null) {
          setError("Lütfen ikamet izni durumunu seçin.");
          return false;
        }
        break;
      case 5:
        if (!form.legalStayEndDate) {
          setError("Lütfen yasal kalış bitiş tarihini girin.");
          return false;
        }
        if (!form.exitDate) {
          setError("Lütfen çıkış tarihini girin.");
          return false;
        }
        if (form.exitDate < form.entryDate) {
          setError("Çıkış tarihi giriş tarihinden önce olamaz.");
          return false;
        }
        if (form.legalStayEndDate < form.entryDate) {
          setError("Yasal kalış bitiş tarihi giriş tarihinden önce olamaz.");
          return false;
        }
        break;
      default:
        break;
    }
    setError(null);
    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) return;

    if (step < QUESTION_STEPS) {
      setStep((current) => current + 1);
      return;
    }

    try {
      const calculated = calculateVisaPenalty({
        countryName: form.countryName,
        groupId: form.groupId,
        entryDate: form.entryDate,
        exitDate: form.exitDate,
        legalStayEndDate: form.legalStayEndDate,
        enteredWithVisa: form.enteredWithVisa === true,
        hadResidencePermit: form.hadResidencePermit === true,
        usdTryRate: rate.value > 0 ? rate.value : DEFAULT_USD_TRY_RATE,
      });
      setResult(calculated);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hesaplama yapılamadı.");
    }
  }

  function goBack() {
    setError(null);
    if (result) {
      setResult(null);
      return;
    }
    setStep((current) => Math.max(1, current - 1));
  }

  function resetAll() {
    setForm(initialForm);
    setStep(1);
    setResult(null);
    setError(null);
  }

  function applySuggestedLegalEnd() {
    if (!form.entryDate) return;
    const [y, m, d] = form.entryDate.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 89);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setForm((current) => ({ ...current, legalStayEndDate: iso }));
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-csg-blue">
          Hesaplama aracı
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
          Vize Cezası Hesaplama
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          2026 ikamet harç tarifesine göre tahmini idari para cezası.
        </p>
      </div>

      <div className="mt-8 flex gap-2">
        {Array.from({ length: QUESTION_STEPS }, (_, index) => {
          const active = result ? true : index < step;
          return (
            <span
              key={index}
              className={`h-2 flex-1 rounded-full transition ${
                active ? "bg-csg-blue" : "bg-slate-200"
              }`}
            />
          );
        })}
      </div>
      <div className="sr-only" aria-live="polite">
        İlerleme %{progressPercent}
      </div>

      {result ? (
        <div className="mt-10">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Hesaplama sonucu
            </p>
            {!result.hasOverstay ? (
              <p className="mt-3 text-2xl font-semibold text-emerald-700">
                İhlal süresi oluşmamış görünüyor
              </p>
            ) : (
              <p className="mt-3 text-3xl font-semibold text-csg-blue">
                {formatTl(result.totalTl)} ₺
              </p>
            )}
            <p className="mt-2 text-sm text-slate-600">
              Yaklaşık {formatUsd(result.totalUsdApprox)} USD (kur:{" "}
              {result.usdTryRate.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              )
            </p>
          </div>

          <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Ülke</span>
              <span className="font-medium text-right">{result.countryName}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Tarife grubu</span>
              <span className="font-medium text-right">{result.groupLabel}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">İhlal süresi</span>
              <span className="font-medium text-right">
                {result.overstayDays} gün ({result.billedMonths} ay faturalandırılır)
              </span>
            </div>
            <hr className="border-slate-200" />
            {result.breakdown.length === 0 ? (
              <p className="text-slate-600">Ek harç kalemi oluşmadı.</p>
            ) : (
              result.breakdown.map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-medium text-right">
                    {formatTl(item.amountTl)} ₺
                    {item.amountUsd != null ? (
                      <span className="block text-xs text-slate-400">
                        {formatUsd(item.amountUsd)} USD
                      </span>
                    ) : null}
                  </span>
                </div>
              ))
            )}
            <hr className="border-slate-200" />
            <div className="flex justify-between gap-4 text-base">
              <span className="font-semibold text-slate-900">Tahmini toplam</span>
              <span className="font-bold text-csg-blue">{formatTl(result.totalTl)} ₺</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-csg-red bg-slate-50 px-4 py-3 text-sm italic leading-relaxed text-slate-600">
            Bu araç bilgilendirme amaçlıdır. Harç tutarları ülke karşılıklılığı,
            güncel kur ve sınır uygulamasına göre değişebilir. Kesin tutar çıkış
            kapısındaki Vize İhlal Ofisi tarafından hesaplanır.
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetAll}
              className="cursor-pointer rounded-lg bg-csg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-csg-blue-dark"
            >
              Yeniden hesapla
            </button>
            <Link
              href={TOOLS_LIST_PATH}
              className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Tüm araçlara dön
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
            Adım {step} / {QUESTION_STEPS}
          </p>

          {step === 1 ? (
            <div className="mt-4">
              <label className="block text-lg font-semibold text-slate-900">
                Vatandaşı olduğunuz ülke
              </label>
              <select
                value={form.countryName}
                onChange={(event) => {
                  const name = event.target.value;
                  const match = countryOptions.find((item) => item.name === name);
                  setForm((current) => ({
                    ...current,
                    countryName: name,
                    groupId: match?.groupId ?? "standard",
                  }));
                }}
                className={inputClassName()}
              >
                <option value="">Ülke seçin</option>
                {countryOptions.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="mt-4">
              <label className="block text-lg font-semibold text-slate-900">
                Türkiye&apos;ye giriş tarihi
              </label>
              <input
                type="date"
                value={form.entryDate}
                onChange={(event) =>
                  setForm((current) => ({ ...current, entryDate: event.target.value }))
                }
                className={inputClassName()}
              />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-4">
              <p className="text-lg font-semibold text-slate-900">
                Vize ile mi giriş yaptınız?
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Vizesiz girişlerde genellikle tek giriş vize harcı da eklenir.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <OptionCard
                  selected={form.enteredWithVisa === true}
                  onClick={() =>
                    setForm((current) => ({ ...current, enteredWithVisa: true }))
                  }
                  title="Evet"
                />
                <OptionCard
                  selected={form.enteredWithVisa === false}
                  onClick={() =>
                    setForm((current) => ({ ...current, enteredWithVisa: false }))
                  }
                  title="Hayır"
                />
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="mt-4">
              <p className="text-lg font-semibold text-slate-900">
                İkamet izni aldınız mı?
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Hiç ikamet almadıysanız kart / belge bedeli eklenir.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <OptionCard
                  selected={form.hadResidencePermit === true}
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      hadResidencePermit: true,
                    }))
                  }
                  title="Evet"
                />
                <OptionCard
                  selected={form.hadResidencePermit === false}
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      hadResidencePermit: false,
                    }))
                  }
                  title="Hayır"
                />
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="mt-4 space-y-6">
              <div>
                <label className="block text-lg font-semibold text-slate-900">
                  Yasal kalış bitiş tarihi
                </label>
                <p className="mt-1 text-sm text-slate-500">
                  Vize veya ikamet son günü. Vizesiz 90 gün kuralı için öneriyi
                  kullanabilirsiniz.
                </p>
                <input
                  type="date"
                  value={form.legalStayEndDate}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      legalStayEndDate: event.target.value,
                    }))
                  }
                  className={inputClassName()}
                />
                <button
                  type="button"
                  onClick={applySuggestedLegalEnd}
                  className="mt-2 cursor-pointer text-sm font-semibold text-csg-blue hover:underline"
                >
                  Girişten 90 gün öner (vizesiz)
                </button>
              </div>

              <div>
                <label className="block text-lg font-semibold text-slate-900">
                  Çıkış tarihi
                </label>
                <input
                  type="date"
                  value={form.exitDate}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, exitDate: event.target.value }))
                  }
                  className={inputClassName()}
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <p className="font-medium text-slate-800">Güncel USD / TRY kuru</p>
                {rate.loading ? (
                  <p className="mt-1">Kur yükleniyor...</p>
                ) : (
                  <>
                    <p className="mt-1 text-base font-semibold text-csg-blue">
                      1 USD ={" "}
                      {rate.value.toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}{" "}
                      TRY
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Kaynak: {rate.source ?? "Bilinmiyor"}
                      {rate.asOf ? ` · ${rate.asOf}` : ""}
                      {rate.fallback ? " · yedek kur" : ""}
                    </p>
                    {rate.error ? (
                      <p className="mt-1 text-xs text-amber-700">{rate.error}</p>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mt-6 text-center text-sm font-medium text-csg-red" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Geri
            </button>
            <button
              type="button"
              onClick={goNext}
              className="cursor-pointer rounded-lg bg-csg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-csg-blue-dark"
            >
              {step === QUESTION_STEPS ? "Hesapla" : "Devam et"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
