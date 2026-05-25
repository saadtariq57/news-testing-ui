import { getPressReleases } from "./press-releases.api";
import { PRESS_RELEASES_FETCH_LIMIT, type PressRelease } from "./press-releases.types";

export type PressReleasesListPageData = {
  items: PressRelease[];
  error: string | null;
};

export async function loadPressReleasesListPage(): Promise<PressReleasesListPageData> {
  try {
    const result = await getPressReleases({ limit: PRESS_RELEASES_FETCH_LIMIT });
    return { items: result.items, error: null };
  } catch (err) {
    return {
      items: [],
      error: err instanceof Error ? err.message : "Failed to load press releases.",
    };
  }
}
