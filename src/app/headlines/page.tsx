import type { Metadata } from "next";

import { NewsListView } from "@/features/news/components/NewsListView";
import { loadNewsListPage } from "@/features/news/news.list-page";

export const metadata: Metadata = {
  title: "Headlines",
  description: "Latest market headlines and stories.",
};

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ limit?: string }>;
};

export default async function HeadlinesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { articles, hasMore, loadMoreHref, error } = await loadNewsListPage("news", sp);

  return (
    <NewsListView
      variant="news"
      articles={articles}
      hasMore={hasMore}
      loadMoreHref={loadMoreHref}
      error={error}
    />
  );
}
