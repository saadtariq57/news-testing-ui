"use client";

import { useQuery } from "@tanstack/react-query";

import { getNews, getNewsArchive, getNewsArticle } from "./news.api";
import type { NewsListParams } from "./news.types";

export function useNewsQuery(params: NewsListParams) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => getNews(params),
  });
}

export function useNewsArchiveQuery(params: NewsListParams) {
  return useQuery({
    queryKey: ["news", "archive", params],
    queryFn: () => getNewsArchive(params),
  });
}

export function useNewsArticleQuery(id: number) {
  return useQuery({
    queryKey: ["news", "article", id],
    queryFn: () => getNewsArticle(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
