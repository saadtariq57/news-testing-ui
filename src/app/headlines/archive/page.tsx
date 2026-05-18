import type { Metadata } from "next";

import { NewsListView } from "@/features/news/components/NewsListView";
import { loadNewsListPage } from "@/features/news/news.list-page";

export const metadata: Metadata = {
  title: "Headlines archive",
  description: "Archived headline stories.",
};

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ limit?: string }>;
};

export default async function HeadlinesArchivePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { articles, hasMore, loadMoreHref, error } = await loadNewsListPage("archive", sp);

  return (
    <NewsListView
      variant="archive"
      articles={articles}
      hasMore={hasMore}
      loadMoreHref={loadMoreHref}
      error={error}
    />
  );
}
