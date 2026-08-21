export type ExitType = "voluntary" | "deported";

export type ViolationBand =
  | "under_3_months"
  | "3_to_6_months"
  | "6_months_to_1_year"
  | "1_to_2_years"
  | "2_to_3_years"
  | "over_3_years";

export type FinePaid = "yes" | "no";

export type DeportCalculatorInput = {
  exitType: ExitType;
  violationBand: ViolationBand;
  finePaid: FinePaid | null;
  specialCode: string;
};

export type DeportCalculatorResult = {
  periodLabel: string;
  restrictionNote: string;
  appliesBan: boolean;
  summary: string;
  usedHeavyTable: boolean;
};

export const VIOLATION_BAND_OPTIONS: Array<{
  value: ViolationBand;
  label: string;
  hint: string;
}> = [
  {
    value: "under_3_months",
    label: "3 aya kadar",
    hint: "3 ay dahil değil",
  },
  {
    value: "3_to_6_months",
    label: "3 ay - 6 ay",
    hint: "3 ay dahil",
  },
  {
    value: "6_months_to_1_year",
    label: "6 ay - 1 yıl",
    hint: "",
  },
  {
    value: "1_to_2_years",
    label: "1 yıl - 2 yıl",
    hint: "",
  },
  {
    value: "2_to_3_years",
    label: "2 yıl - 3 yıl",
    hint: "",
  },
  {
    value: "over_3_years",
    label: "3 yıldan fazla",
    hint: "Sınır dışı tablosunda 2 yıldan fazla ile aynı üst dilim",
  },
];

/**
 * Göç İdaresi Başkanlığı açıklamasına göre tahmini giriş yasağı süresi.
 * Kaynak: goc.gov.tr yasal kalış hakkı ihlali giriş yasakları açıklaması.
 */
export function calculateDeportationBan(
  input: DeportCalculatorInput,
): DeportCalculatorResult {
  const specialCode = input.specialCode.trim().toUpperCase();
  const hasSpecialCode = specialCode.length > 0;

  const useHeavyTable =
    input.exitType === "deported" ||
    input.finePaid === "no" ||
    (input.exitType === "voluntary" && input.finePaid !== "yes");

  let periodLabel: string;
  let appliesBan: boolean;
  let restrictionNote: string;

  if (!useHeavyTable) {
    // Gönüllü çıkış + para cezası ödenmiş
    switch (input.violationBand) {
      case "under_3_months":
        periodLabel = "Giriş yasağı uygulanmayabilir";
        appliesBan = false;
        restrictionNote = "Genel kurala göre süreli giriş yasağı oluşmayabilir";
        break;
      case "3_to_6_months":
        periodLabel = "1 ay";
        appliesBan = true;
        restrictionNote = "Tahmini süreli giriş yasağı";
        break;
      case "6_months_to_1_year":
        periodLabel = "3 ay";
        appliesBan = true;
        restrictionNote = "Tahmini süreli giriş yasağı";
        break;
      case "1_to_2_years":
        periodLabel = "1 yıl";
        appliesBan = true;
        restrictionNote = "Tahmini süreli giriş yasağı";
        break;
      case "2_to_3_years":
        periodLabel = "2 yıl";
        appliesBan = true;
        restrictionNote = "Tahmini süreli giriş yasağı";
        break;
      case "over_3_years":
        periodLabel = "5 yıl";
        appliesBan = true;
        restrictionNote = "Tahmini süreli giriş yasağı";
        break;
    }
  } else {
    // Sınır dışı / para cezası ödenmemiş / ağır tablo
    switch (input.violationBand) {
      case "under_3_months":
        periodLabel = "3 ay";
        appliesBan = true;
        restrictionNote = "Ağır tablo: tahmini süreli giriş yasağı";
        break;
      case "3_to_6_months":
        periodLabel = "6 ay";
        appliesBan = true;
        restrictionNote = "Ağır tablo: tahmini süreli giriş yasağı";
        break;
      case "6_months_to_1_year":
        periodLabel = "1 yıl";
        appliesBan = true;
        restrictionNote = "Ağır tablo: tahmini süreli giriş yasağı";
        break;
      case "1_to_2_years":
        periodLabel = "2 yıl";
        appliesBan = true;
        restrictionNote = "Ağır tablo: tahmini süreli giriş yasağı";
        break;
      case "2_to_3_years":
      case "over_3_years":
        periodLabel = "5 yıl";
        appliesBan = true;
        restrictionNote = "Ağır tablo: tahmini süreli giriş yasağı";
        break;
    }
  }

  if (hasSpecialCode) {
    restrictionNote = `Özel durum kodu: ${specialCode}. Tahdit / yasak süresi kişiye özel değişebilir.`;
  }

  const exitLabel =
    input.exitType === "voluntary" ? "gönüllü çıkış" : "sınır dışı edilme";
  const fineLabel =
    input.finePaid === "yes"
      ? "idari para cezası ödendi"
      : input.finePaid === "no"
        ? "idari para cezası ödenmedi"
        : "para cezası durumu belirtilmedi";

  const summary = appliesBan
    ? `${exitLabel} ve ${fineLabel} koşullarına göre tahmini giriş yasağı süresi ${periodLabel} olarak hesaplandı.`
    : `${exitLabel} ve ${fineLabel} koşullarına göre genel kuralda süreli giriş yasağı oluşmayabilir.`;

  return {
    periodLabel,
    restrictionNote,
    appliesBan,
    summary,
    usedHeavyTable: useHeavyTable,
  };
}
