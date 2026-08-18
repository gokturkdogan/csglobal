export const DEFAULT_ADMIN_PAGE_SIZE = 25;

export function resolveAdminPagination(
  searchParams: { page?: string; pageSize?: string },
  options?: { defaultPageSize?: number },
) {
  const defaultPageSize = options?.defaultPageSize ?? DEFAULT_ADMIN_PAGE_SIZE;
  const pageSize = Math.min(
    100,
    Math.max(1, Number(searchParams.pageSize) || defaultPageSize),
  );
  const page = Math.max(1, Number(searchParams.page) || 1);
  const skip = (page - 1) * pageSize;

  return { page, pageSize, skip, take: pageSize };
}

export function buildAdminPageUrl(
  basePath: string,
  page: number,
  pageSize: number,
  filters?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      const trimmed = value?.trim();
      if (trimmed) params.set(key, trimmed);
    }
  }
  if (page > 1) params.set("page", String(page));
  if (pageSize !== DEFAULT_ADMIN_PAGE_SIZE) {
    params.set("pageSize", String(pageSize));
  }
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function logAdminListPerf(label: string, startMs: number, rowCount: number) {
  if (process.env.NODE_ENV !== "development") return;
  const elapsed = Math.round(performance.now() - startMs);
  console.info(`[perf] ${label} ${elapsed}ms, ${rowCount} rows`);
}
