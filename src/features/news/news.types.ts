export type NewsArticle = {
  id: number;
  title: string;
  slug: string;
  body: string;
  publishedAt: string;
};

export const NEWS_PAGE_SIZE = 20;

export type NewsListParams = {
  limit?: number;
  offset?: number;
};

export type NewsListResult = {
  items: NewsArticle[];
  limit: number;
  offset: number;
};
