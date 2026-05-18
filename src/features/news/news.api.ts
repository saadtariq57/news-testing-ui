import type { AxiosError } from "axios";

import { newsApi } from "@/lib/news-api";

import { newsEndpoints as ep } from "./news.endpoints";
import { parseNewsArticle, parseNewsListResponse } from "./news.parse";
import type { NewsArticle, NewsListParams, NewsListResult } from "./news.types";

export class NewsApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "NewsApiError";
    this.status = status;
  }
}

function wrap(err: unknown, fallback: string): NewsApiError {
  const status = (err as AxiosError)?.response?.status;
  const data = (err as AxiosError)?.response?.data;
  if (typeof data === "string" && data.trim()) return new NewsApiError(data, status);
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const m =
      (typeof o.detail === "string" && o.detail) ||
      (typeof o.message === "string" && o.message) ||
      "";
    if (m) return new NewsApiError(m, status);
  }
  if (err instanceof Error && err.message) return new NewsApiError(err.message, status);
  return new NewsApiError(fallback, status);
}

export async function getNews(params?: NewsListParams): Promise<NewsListResult> {
  try {
    const res = await newsApi.get(ep.list, { params });
    return parseNewsListResponse(res.data);
  } catch (err) {
    throw wrap(err, "Failed to load news.");
  }
}

export async function getNewsArchive(params?: NewsListParams): Promise<NewsListResult> {
  try {
    const res = await newsApi.get(ep.archive, { params });
    return parseNewsListResponse(res.data);
  } catch (err) {
    throw wrap(err, "Failed to load news archive.");
  }
}

async function findInPages(
  fetchPage: (params: NewsListParams) => Promise<NewsListResult>,
  id: number
): Promise<NewsArticle | null> {
  const pageSize = 50;
  let offset = 0;
  for (;;) {
    const page = await fetchPage({ limit: pageSize, offset });
    const hit = page.items.find((a) => a.id === id);
    if (hit) return hit;
    if (page.items.length < pageSize) break;
    offset += pageSize;
  }
  return null;
}

/** No dedicated detail route yet — scan list + archive pages. */
export async function getNewsArticle(id: number): Promise<NewsArticle | null> {
  if (!Number.isFinite(id)) return null;
  try {
    const fromNews = await findInPages(getNews, id);
    if (fromNews) return fromNews;
    return findInPages(getNewsArchive, id);
  } catch {
    return null;
  }
}
