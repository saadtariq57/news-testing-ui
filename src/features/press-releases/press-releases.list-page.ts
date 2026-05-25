import { getPressReleases } from "./press-releases.api";
import { PRESS_RELEASES_PAGE_SIZE, type PressRelease } from "./press-releases.types";

export type PressReleasesListPageData = {
  items: PressRelease[];
  hasMore: boolean;
  loadMoreHref: string | null;
  error: string | null;
};

function parseDisplayLimit(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < PRESS_RELEASES_PAGE_SIZE) return PRESS_RELEASES_PAGE_SIZE;
  return Math.floor(n);
}

export async function loadPressReleasesListPage(searchParams: {
  limit?: string;
}): Promise<PressReleasesListPageData> {
  const displayLimit = parseDisplayLimit(searchParams.limit);

  try {
    const result = await getPressReleases({ limit: displayLimit, offset: 0 });

    const hasMore = result.items.length >= displayLimit;
    const loadMoreHref = hasMore
      ? `/press-releases?limit=${displayLimit + PRESS_RELEASES_PAGE_SIZE}`
      : null;

    return {
      items: result.items,
      hasMore,
      loadMoreHref,
      error: null,
    };
  } catch (err) {
    return {
      items: [],
      hasMore: false,
      loadMoreHref: null,
      error: err instanceof Error ? err.message : "Failed to load press releases.",
    };
  }
}
