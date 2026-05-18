import type { NewsArticle, NewsListResult } from "./news.types";

function toFiniteNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

export function parseNewsArticle(raw: unknown): NewsArticle | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = toFiniteNumber(o.id);
  if (id == null) return null;
  const title = typeof o.title === "string" ? o.title.trim() : "";
  const slug = typeof o.slug === "string" ? o.slug.trim() : "";
  const body = typeof o.body === "string" ? o.body : "";
  const publishedAt =
    (typeof o.published_at === "string" && o.published_at) ||
    (typeof o.publishedAt === "string" && o.publishedAt) ||
    "";
  if (!title || !publishedAt) return null;
  return { id, title, slug, body, publishedAt };
}

export function parseNewsListResponse(data: unknown): NewsListResult {
  if (!data || typeof data !== "object") {
    return { items: [], limit: 0, offset: 0 };
  }
  const o = data as Record<string, unknown>;
  const rawItems = Array.isArray(o.items)
    ? o.items
    : Array.isArray(o.data)
      ? o.data
      : Array.isArray(data)
        ? (data as unknown[])
        : [];
  const items = rawItems
    .map(parseNewsArticle)
    .filter((x): x is NewsArticle => x != null);
  const limit = toFiniteNumber(o.limit) ?? items.length;
  const offset = toFiniteNumber(o.offset) ?? 0;
  return { items, limit, offset };
}
