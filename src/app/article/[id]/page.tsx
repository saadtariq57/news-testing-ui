import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsArticleNotFound } from "@/features/news/components/NewsArticleNotFound";
import { NewsArticleView } from "@/features/news/components/NewsArticleView";
import { getNewsArticle } from "@/features/news/news.api";

type PageProps = {
  params: Promise<{ id: string }>;
};

function parseArticleId(raw: string): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1 || !Number.isInteger(n)) return null;
  return n;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const articleId = parseArticleId(id);
  if (articleId == null) return { title: "Article" };
  const article = await getNewsArticle(articleId);
  if (!article) return { title: "Article" };
  return {
    title: article.title,
    description: article.title,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const articleId = parseArticleId(id);
  if (articleId == null) notFound();

  const article = await getNewsArticle(articleId);
  if (!article) return <NewsArticleNotFound />;

  return <NewsArticleView article={article} />;
}
