import type { PressRelease, PressReleasesListResult } from "./press-releases.types";

function toFiniteNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function toStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const item of v) {
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed) out.push(trimmed);
    }
  }
  return out;
}

export function parsePressRelease(raw: unknown): PressRelease | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = toFiniteNumber(o.id);
  if (id == null) return null;
  const guid = typeof o.guid === "string" ? o.guid.trim() : "";
  const provider = typeof o.provider === "string" ? o.provider.trim() : "";
  const headline = typeof o.headline === "string" ? o.headline.trim() : "";
  const body = typeof o.body === "string" ? o.body : "";
  const publishedAt =
    (typeof o.published_at === "string" && o.published_at) ||
    (typeof o.publishedAt === "string" && o.publishedAt) ||
    "";
  if (!headline || !publishedAt) return null;
  return {
    id,
    guid,
    provider,
    headline,
    body,
    organizations: toStringArray(o.organizations),
    tickers: toStringArray(o.tickers),
    publishedAt,
  };
}

export function parsePressReleasesListResponse(data: unknown): PressReleasesListResult {
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
    .map(parsePressRelease)
    .filter((x): x is PressRelease => x != null);
  const limit = toFiniteNumber(o.limit) ?? items.length;
  const offset = toFiniteNumber(o.offset) ?? 0;
  return { items, limit, offset };
}
