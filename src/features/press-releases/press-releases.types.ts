export type PressRelease = {
  id: number;
  guid: string;
  provider: string;
  headline: string;
  body: string;
  organizations: string[];
  tickers: string[];
  publishedAt: string;
};

export const PRESS_RELEASES_FETCH_LIMIT = 100;

export type PressReleasesListParams = {
  limit?: number;
  offset?: number;
};

export type PressReleasesListResult = {
  items: PressRelease[];
  limit: number;
  offset: number;
};
