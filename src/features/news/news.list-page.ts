import { getNews, getNewsArchive } from "./news.api";
import { NEWS_PAGE_SIZE, type NewsArticle } from "./news.types";

export type NewsListPageData = {
  articles: NewsArticle[];
  hasMore: boolean;
  loadMoreHref: string | null;
  error: string | null;
};

function parseDisplayLimit(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < NEWS_PAGE_SIZE) return NEWS_PAGE_SIZE;
  return Math.floor(n);
}

export async function loadNewsListPage(
  variant: "news" | "archive",
  searchParams: { limit?: string }
): Promise<NewsListPageData> {
  const displayLimit = parseDisplayLimit(searchParams.limit);
  const basePath = variant === "archive" ? "/headlines/archive" : "/headlines";

  try {
    const result =
      variant === "archive"
        ? await getNewsArchive({ limit: displayLimit, offset: 0 })
        : await getNews({ limit: displayLimit, offset: 0 });

    const hasMore = result.items.length >= displayLimit;
    const loadMoreHref = hasMore
      ? `${basePath}?limit=${displayLimit + NEWS_PAGE_SIZE}`
      : null;

    return {
      articles: result.items,
      hasMore,
      loadMoreHref,
      error: null,
    };
  } catch (err) {
    return {
      articles: [],
      hasMore: false,
      loadMoreHref: null,
      error: err instanceof Error ? err.message : "Failed to load news.",
    };
  }
}
