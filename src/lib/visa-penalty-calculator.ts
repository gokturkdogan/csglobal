/** 2026 yılı yaklaşık ikamet/vize ihlali harç tarifesi (bilgilendirme amaçlı). */

export type VisaFeeGroupId =
  | "standard"
  | "group_b"
  | "group_c"
  | "group_d"
  | "group_e"
  | "tl_tariff"
  | "exempt";

export type VisaFeeGroup = {
  id: VisaFeeGroupId;
  label: string;
  firstMonthUsd: number;
  extraMonthUsd: number;
  useTlTariff?: boolean;
};

export const VISA_FEE_GROUPS: Record<VisaFeeGroupId, VisaFeeGroup> = {
  standard: {
    id: "standard",
    label: "Standart tarife",
    firstMonthUsd: 25,
    extraMonthUsd: 5,
  },
  group_b: {
    id: "group_b",
    label: "B grubu (karşılıklılık)",
    firstMonthUsd: 28,
    extraMonthUsd: 7,
  },
  group_c: {
    id: "group_c",
    label: "C grubu (karşılıklılık)",
    firstMonthUsd: 18,
    extraMonthUsd: 5,
  },
  group_d: {
    id: "group_d",
    label: "D grubu (karşılıklılık)",
    firstMonthUsd: 14,
    extraMonthUsd: 3,
  },
  group_e: {
    id: "group_e",
    label: "E grubu (karşılıklılık)",
    firstMonthUsd: 10,
    extraMonthUsd: 1,
  },
  tl_tariff: {
    id: "tl_tariff",
    label: "TL tarifesi",
    firstMonthUsd: 0,
    extraMonthUsd: 0,
    useTlTariff: true,
  },
  exempt: {
    id: "exempt",
    label: "Harçtan muaf",
    firstMonthUsd: 0,
    extraMonthUsd: 0,
  },
};

/** 2026 belge bedeli (ikamet kartı). */
export const RESIDENCE_CARD_FEE_TL = 964;

/** 2026 tek giriş vize harcı (yaklaşık). */
export const SINGLE_ENTRY_VISA_FEE_TL = 9376.4;

/** TL tarifesi (grup dışı ülkeler) 2026. */
export const TL_FIRST_MONTH_MAX = 3359.9;
export const TL_EXTRA_MONTH = 2232.3;

/** Yaklaşık USD/TRY kuru (güncel kur ile değişir). */
export const DEFAULT_USD_TRY_RATE = 42;

export type VisaPenaltyCountry = {
  name: string;
  groupId: VisaFeeGroupId;
};

/** Sık kullanılan ülkeler ve yayınlanan karşılıklılık grupları. */
export const VISA_PENALTY_COUNTRIES: VisaPenaltyCountry[] = (
  [
  { name: "Almanya", groupId: "standard" },
  { name: "Amerika Birleşik Devletleri", groupId: "standard" },
  { name: "İngiltere", groupId: "standard" },
  { name: "Fransa", groupId: "standard" },
  { name: "Hollanda", groupId: "standard" },
  { name: "İtalya", groupId: "standard" },
  { name: "Avusturya", groupId: "standard" },
  { name: "İsviçre", groupId: "standard" },
  { name: "İsveç", groupId: "standard" },
  { name: "Polonya", groupId: "standard" },
  { name: "Romanya", groupId: "standard" },
  { name: "Bulgaristan", groupId: "standard" },
  { name: "Yunanistan", groupId: "standard" },
  { name: "Ukrayna", groupId: "standard" },
  { name: "Azerbaycan", groupId: "standard" },
  { name: "Kazakistan", groupId: "standard" },
  { name: "Özbekistan", groupId: "standard" },
  { name: "İran", groupId: "standard" },
  { name: "Çin", groupId: "standard" },
  { name: "Pakistan", groupId: "standard" },
  { name: "Hindistan", groupId: "standard" },
  { name: "Afganistan", groupId: "standard" },
  { name: "Kanada", groupId: "standard" },
  { name: "Avustralya", groupId: "standard" },
  { name: "Yeni Zelanda", groupId: "standard" },
  { name: "Gürcistan", groupId: "standard" },
  { name: "Japonya", groupId: "group_b" },
  { name: "İsrail", groupId: "group_b" },
  { name: "Filipinler", groupId: "group_b" },
  { name: "Arnavutluk", groupId: "group_b" },
  { name: "Kuzey Makedonya", groupId: "group_b" },
  { name: "Umman", groupId: "group_b" },
  { name: "Tacikistan", groupId: "group_b" },
  { name: "İspanya", groupId: "group_c" },
  { name: "Belçika", groupId: "group_c" },
  { name: "Singapur", groupId: "group_c" },
  { name: "Tayvan", groupId: "group_c" },
  { name: "Kuveyt", groupId: "group_c" },
  { name: "Ürdün", groupId: "group_c" },
  { name: "Lüksemburg", groupId: "group_c" },
  { name: "Malta", groupId: "group_c" },
  { name: "Cezayir", groupId: "group_c" },
  { name: "Belarus", groupId: "group_c" },
  { name: "Rusya", groupId: "group_d" },
  { name: "Güney Kore", groupId: "group_d" },
  { name: "Hong Kong", groupId: "group_d" },
  { name: "Etiyopya", groupId: "group_d" },
  { name: "Mısır", groupId: "group_e" },
  { name: "Irak", groupId: "group_e" },
  { name: "Fas", groupId: "group_e" },
  { name: "Tunus", groupId: "group_e" },
  { name: "Karadağ", groupId: "group_e" },
  { name: "Fildişi Sahili", groupId: "group_e" },
  { name: "Norveç", groupId: "tl_tariff" },
  { name: "Sırbistan", groupId: "tl_tariff" },
  { name: "Çekya", groupId: "exempt" },
  { name: "Danimarka", groupId: "exempt" },
  { name: "İrlanda", groupId: "exempt" },
  { name: "Kosova", groupId: "exempt" },
  { name: "Nepal", groupId: "exempt" },
  { name: "Sri Lanka", groupId: "exempt" },
  { name: "Suriye", groupId: "exempt" },
  { name: "Türkmenistan", groupId: "exempt" },
  { name: "KKTC", groupId: "exempt" },
  { name: "Filistin", groupId: "exempt" },
  { name: "Diğer / listede yok", groupId: "standard" },
  ] as const satisfies readonly VisaPenaltyCountry[]
).slice().sort((a, b) => a.name.localeCompare(b.name, "tr"));

export type VisaPenaltyInput = {
  countryName: string;
  groupId: VisaFeeGroupId;
  entryDate: string;
  exitDate: string;
  legalStayEndDate: string;
  enteredWithVisa: boolean;
  hadResidencePermit: boolean;
  usdTryRate?: number;
};

export type VisaPenaltyBreakdown = {
  label: string;
  amountTl: number;
  amountUsd?: number;
};

export type VisaPenaltyResult = {
  overstayDays: number;
  billedMonths: number;
  hasOverstay: boolean;
  residenceFeeTl: number;
  residenceFeeUsd: number;
  cardFeeTl: number;
  visaFeeTl: number;
  totalTl: number;
  totalUsdApprox: number;
  usdTryRate: number;
  breakdown: VisaPenaltyBreakdown[];
  countryName: string;
  groupLabel: string;
};

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

/** İki tarih arası gün farkı (çıkış - başlangıç), negatifse 0. */
export function calendarDaysBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

/**
 * Yasal bitiş gününden sonraki ilk günden çıkış gününe kadar ihlal.
 * Başlamış her ay tam ay sayılır (30 gün dilimleri).
 */
export function countOverstayMonths(legalEnd: Date, exit: Date): {
  days: number;
  months: number;
} {
  if (exit.getTime() <= legalEnd.getTime()) {
    return { days: 0, months: 0 };
  }

  const overstayStart = new Date(legalEnd);
  overstayStart.setDate(overstayStart.getDate() + 1);

  const days = calendarDaysBetween(overstayStart, exit) + 1;
  const months = Math.max(1, Math.ceil(days / 30));
  return { days, months };
}

export function calculateVisaPenalty(input: VisaPenaltyInput): VisaPenaltyResult {
  const group = VISA_FEE_GROUPS[input.groupId] ?? VISA_FEE_GROUPS.standard;
  const rate = input.usdTryRate && input.usdTryRate > 0
    ? input.usdTryRate
    : DEFAULT_USD_TRY_RATE;

  const entry = parseDateOnly(input.entryDate);
  const exit = parseDateOnly(input.exitDate);
  const legalEnd = parseDateOnly(input.legalStayEndDate);

  if (!entry || !exit || !legalEnd) {
    throw new Error("Tarih alanları geçersiz.");
  }
  if (exit.getTime() < entry.getTime()) {
    throw new Error("Çıkış tarihi giriş tarihinden önce olamaz.");
  }
  if (legalEnd.getTime() < entry.getTime()) {
    throw new Error("Yasal kalış bitiş tarihi giriş tarihinden önce olamaz.");
  }

  const { days, months } = countOverstayMonths(legalEnd, exit);
  const breakdown: VisaPenaltyBreakdown[] = [];

  let residenceFeeUsd = 0;
  let residenceFeeTl = 0;

  if (months > 0) {
    if (group.useTlTariff) {
      residenceFeeTl = TL_FIRST_MONTH_MAX + (months - 1) * TL_EXTRA_MONTH;
      residenceFeeUsd = residenceFeeTl / rate;
      breakdown.push({
        label: `İkamet harcı (${months} ay, TL tarifesi)`,
        amountTl: residenceFeeTl,
      });
    } else if (group.id === "exempt") {
      residenceFeeTl = 0;
      residenceFeeUsd = 0;
    } else {
      residenceFeeUsd =
        group.firstMonthUsd + (months - 1) * group.extraMonthUsd;
      residenceFeeTl = residenceFeeUsd * rate;
      breakdown.push({
        label: `İkamet harcı (${months} ay)`,
        amountTl: residenceFeeTl,
        amountUsd: residenceFeeUsd,
      });
    }
  }

  const cardFeeTl = input.hadResidencePermit ? 0 : RESIDENCE_CARD_FEE_TL;
  if (cardFeeTl > 0) {
    breakdown.push({
      label: "İkamet belgesi / kart bedeli",
      amountTl: cardFeeTl,
    });
  }

  const visaFeeTl = input.enteredWithVisa ? 0 : SINGLE_ENTRY_VISA_FEE_TL;
  if (visaFeeTl > 0) {
    breakdown.push({
      label: "Tek giriş vize harcı (vizesiz giriş)",
      amountTl: visaFeeTl,
    });
  }

  const totalTl = residenceFeeTl + cardFeeTl + visaFeeTl;
  const totalUsdApprox = totalTl / rate;

  return {
    overstayDays: days,
    billedMonths: months,
    hasOverstay: months > 0,
    residenceFeeTl,
    residenceFeeUsd,
    cardFeeTl,
    visaFeeTl,
    totalTl,
    totalUsdApprox,
    usdTryRate: rate,
    breakdown,
    countryName: input.countryName,
    groupLabel: group.label,
  };
}

export function formatTl(amount: number): string {
  return amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatUsd(amount: number): string {
  return amount.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
