"use client";

import { useState } from "react";
import Link from "next/link";
import {
  calculateDeportationBan,
  VIOLATION_BAND_OPTIONS,
  type DeportCalculatorResult,
  type ExitType,
  type FinePaid,
  type ViolationBand,
} from "@/lib/deport-calculator";
import { TOOLS_LIST_PATH } from "@/lib/tools";

const QUESTION_STEPS = 4;

type FormState = {
  exitType: ExitType | null;
  violationBand: ViolationBand | null;
  finePaid: FinePaid | null;
  specialCode: string;
};

const initialForm: FormState = {
  exitType: null,
  violationBand: null,
  finePaid: null,
  specialCode: "",
};

function OptionCard({
  selected,
  onClick,
  title,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[5.5rem] cursor-pointer flex-col items-center justify-center rounded-xl border-2 px-4 py-5 text-center transition ${
        selected
          ? "border-csg-blue bg-csg-blue/5 shadow-sm"
          : "border-slate-200 bg-white hover:border-csg-blue/40 hover:shadow-sm"
      }`}
    >
      <span className="text-base font-semibold text-slate-900">{title}</span>
      {hint ? <span className="mt-1 text-xs text-slate-500">{hint}</span> : null}
    </button>
  );
}

export function DeportCalculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DeportCalculatorResult | null>(null);

  const progressPercent =
    result !== null ? 100 : Math.round(((step - 1) / QUESTION_STEPS) * 100);

  function validateCurrentStep(): boolean {
    switch (step) {
      case 1:
        if (!form.exitType) {
          setError("Lütfen çıkış şeklinizi seçin.");
          return false;
        }
        break;
      case 2:
        if (!form.violationBand) {
          setError("Lütfen ihlal süresini seçin.");
          return false;
        }
        break;
      case 3:
        if (form.exitType === "voluntary" && !form.finePaid) {
          setError("Lütfen idari para cezası ödeme durumunu seçin.");
          return false;
        }
        break;
      case 4:
        break;
      default:
        break;
    }
    setError(null);
    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) return;

    if (step === 3 && form.exitType === "deported") {
      setForm((current) => ({ ...current, finePaid: null }));
    }

    if (step < QUESTION_STEPS) {
      setStep((current) => current + 1);
      return;
    }

    if (!form.exitType || !form.violationBand) {
      setError("Eksik bilgi var. Lütfen adımları kontrol edin.");
      return;
    }

    const calculated = calculateDeportationBan({
      exitType: form.exitType,
      violationBand: form.violationBand,
      finePaid: form.exitType === "voluntary" ? form.finePaid : "no",
      specialCode: form.specialCode,
    });
    setResult(calculated);
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

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-csg-blue">
          Hesaplama aracı
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
          Giriş Yasağı Süresi Hesaplama
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Göç İdaresi Başkanlığı genel kurallarına göre tahmini süre hesaplanır.
        </p>
      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-csg-blue transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {result ? (
        <div className="mt-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Hesaplama sonucu
          </p>
          <p className="mt-3 text-3xl font-semibold text-csg-blue">
            {result.periodLabel}
          </p>
          <p className="mt-3 text-base font-medium text-slate-800">
            {result.restrictionNote}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{result.summary}</p>

          <div className="mt-8 rounded-xl border-l-4 border-csg-red bg-slate-50 px-4 py-3 text-left text-sm italic leading-relaxed text-slate-600">
            Hesaplanan süreler genel mevzuat kurallarına göredir. Kişiye özel
            istisnai durumlar (V-71, G-87 ve benzeri tahdit kodları) sonucu
            değiştirebilir. Kesin bilgi için dosyanızın incelenmesi gerekir.
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
            Soru {step} / {QUESTION_STEPS}
          </p>

          {step === 1 ? (
            <div className="mt-4">
              <p className="text-center text-lg font-medium text-slate-900 md:text-xl">
                Türkiye&apos;den kendi rızanız ile mi çıkış yaptınız?
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <OptionCard
                  selected={form.exitType === "voluntary"}
                  onClick={() =>
                    setForm((current) => ({ ...current, exitType: "voluntary" }))
                  }
                  title="Evet, gönüllü çıktım"
                />
                <OptionCard
                  selected={form.exitType === "deported"}
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      exitType: "deported",
                      finePaid: null,
                    }))
                  }
                  title="Hayır, sınır dışı edildim"
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="mt-4">
              <p className="text-center text-lg font-medium text-slate-900 md:text-xl">
                Yasal kalış hakkı ihlali süreniz ne kadardı?
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {VIOLATION_BAND_OPTIONS.map((option) => (
                  <OptionCard
                    key={option.value}
                    selected={form.violationBand === option.value}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        violationBand: option.value,
                      }))
                    }
                    title={option.label}
                    hint={option.hint || undefined}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-4">
              {form.exitType === "voluntary" ? (
                <>
                  <p className="text-center text-lg font-medium text-slate-900 md:text-xl">
                    Çıkış sırasında idari para cezasını ödediniz mi?
                  </p>
                  <p className="mt-2 text-center text-sm text-slate-500">
                    Ödenmemiş cezalar genellikle daha ağır giriş yasağı tablosuna
                    yol açar.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <OptionCard
                      selected={form.finePaid === "yes"}
                      onClick={() =>
                        setForm((current) => ({ ...current, finePaid: "yes" }))
                      }
                      title="Evet, ödedim"
                    />
                    <OptionCard
                      selected={form.finePaid === "no"}
                      onClick={() =>
                        setForm((current) => ({ ...current, finePaid: "no" }))
                      }
                      title="Hayır, ödemedim"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-center text-lg font-medium text-slate-900 md:text-xl">
                    Sınır dışı edilme durumunda ağır tablo uygulanır
                  </p>
                  <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                    Yakalanarak veya sınır dışı kararıyla çıkışlarda giriş yasağı,
                    ihlal süresine göre 3 aydan 5 yıla kadar hesaplanır. İleri
                    diyerek devam edin.
                  </p>
                </>
              )}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="mt-4">
              <p className="text-center text-lg font-medium text-slate-900 md:text-xl">
                Bilinen bir tahdit / özel durum kodunuz var mı?
              </p>
              <p className="mt-2 text-center text-sm text-slate-500">
                Örn. V-71, G-87. Yoksa boş bırakabilirsiniz.
              </p>
              <input
                type="text"
                value={form.specialCode}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    specialCode: event.target.value,
                  }))
                }
                placeholder="Kodunuzu girin (isteğe bağlı)"
                className="mt-8 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-csg-blue focus:ring-2 focus:ring-csg-blue/20"
              />
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
              {step === QUESTION_STEPS ? "Hesapla" : "İleri"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
