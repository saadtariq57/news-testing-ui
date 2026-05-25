import type { AxiosError } from "axios";

import { pressReleasesApi } from "@/lib/press-releases-api";

import { pressReleasesEndpoints as ep } from "./press-releases.endpoints";
import { parsePressReleasesListResponse } from "./press-releases.parse";
import type {
  PressRelease,
  PressReleasesListParams,
  PressReleasesListResult,
} from "./press-releases.types";

export class PressReleasesApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "PressReleasesApiError";
    this.status = status;
  }
}

function wrap(err: unknown, fallback: string): PressReleasesApiError {
  const status = (err as AxiosError)?.response?.status;
  const data = (err as AxiosError)?.response?.data;
  if (typeof data === "string" && data.trim()) return new PressReleasesApiError(data, status);
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const m =
      (typeof o.detail === "string" && o.detail) ||
      (typeof o.message === "string" && o.message) ||
      "";
    if (m) return new PressReleasesApiError(m, status);
  }
  if (err instanceof Error && err.message) return new PressReleasesApiError(err.message, status);
  return new PressReleasesApiError(fallback, status);
}

export async function getPressReleases(
  params?: PressReleasesListParams
): Promise<PressReleasesListResult> {
  try {
    const res = await pressReleasesApi.get(ep.list, { params });
    return parsePressReleasesListResponse(res.data);
  } catch (err) {
    throw wrap(err, "Failed to load press releases.");
  }
}

/**
 * No dedicated detail route, and backend ignores `offset`.
 * Grow `limit` until the id is found or we've seen the full list.
 */
export async function getPressRelease(id: number): Promise<PressRelease | null> {
  if (!Number.isFinite(id) || id < 1) return null;
  const steps = [100, 500, 2000];
  try {
    let lastSeenCount = -1;
    for (const limit of steps) {
      const page = await getPressReleases({ limit });
      const hit = page.items.find((p) => p.id === id);
      if (hit) return hit;
      if (page.items.length < limit) return null;
      if (page.items.length === lastSeenCount) return null;
      lastSeenCount = page.items.length;
    }
    return null;
  } catch {
    return null;
  }
}
