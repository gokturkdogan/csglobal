/** EAGVS senkronunda mevcut kayıtlarla eşleştirme için normalize anahtar. */
export function normalizeEagvsContentKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\[.*?\]/g, " ")
    .replace(/\.(pdf|doc|docx|xls|xlsx)$/i, "")
    .replace(/-/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export type EagvsProgramRef = {
  id: string;
  slug: string;
  name: string;
};

export type EagvsDocumentRef = {
  id: number;
  fileName: string;
};

function collectProgramKeys(program: EagvsProgramRef): string[] {
  const keys = [
    normalizeEagvsContentKey(program.name),
    normalizeEagvsContentKey(program.slug.replace(/-/g, " ")),
  ];
  return [...new Set(keys.filter((key) => key.length > 0))];
}

function collectCandidateKeys(candidates: {
  slug?: string;
  label?: string;
  title?: string;
}): string[] {
  const keys: string[] = [];
  if (candidates.slug) {
    keys.push(normalizeEagvsContentKey(candidates.slug.replace(/-/g, " ")));
  }
  if (candidates.label) {
    keys.push(normalizeEagvsContentKey(candidates.label));
  }
  if (candidates.title) {
    keys.push(normalizeEagvsContentKey(candidates.title));
  }
  return [...new Set(keys.filter((key) => key.length > 0))];
}

export function findExistingProgramMatch(
  existing: EagvsProgramRef[],
  candidates: { slug?: string; label?: string; title?: string },
): EagvsProgramRef | null {
  if (candidates.slug) {
    const bySlug = existing.find((program) => program.slug === candidates.slug);
    if (bySlug) return bySlug;
  }

  const candidateKeys = collectCandidateKeys(candidates);
  if (candidateKeys.length === 0) return null;

  for (const program of existing) {
    const programKeys = collectProgramKeys(program);
    if (programKeys.some((programKey) => candidateKeys.includes(programKey))) {
      return program;
    }
  }

  return null;
}

function collectDocumentKeys(fileName: string, label?: string): string[] {
  const keys = [normalizeEagvsContentKey(fileName)];
  if (label) {
    keys.push(normalizeEagvsContentKey(label));
  }
  return [...new Set(keys.filter((key) => key.length > 0))];
}

export function findExistingDocumentMatch(
  existing: EagvsDocumentRef[],
  fileName: string,
  label?: string,
): EagvsDocumentRef | null {
  const byFileName = existing.find((asset) => asset.fileName === fileName);
  if (byFileName) return byFileName;

  const candidateKeys = collectDocumentKeys(fileName, label);
  if (candidateKeys.length === 0) return null;

  for (const asset of existing) {
    const assetKeys = collectDocumentKeys(asset.fileName);
    if (assetKeys.some((assetKey) => candidateKeys.includes(assetKey))) {
      return asset;
    }
  }

  return null;
}
