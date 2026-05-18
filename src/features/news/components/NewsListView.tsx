import Link from "next/link";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { excerptFromBody, formatRelativePublishedAt } from "../news.format";
import type { NewsArticle } from "../news.types";

function NewsRow({ article }: { article: NewsArticle }) {
  return (
    <article className="group px-4 py-4 hover:bg-muted/15 transition-colors">
      <Link href={`/article/${article.id}`} className="block">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {formatRelativePublishedAt(article.publishedAt)}
        </div>
        <h3 className="mt-2 text-sm sm:text-base font-semibold tracking-tight leading-snug group-hover:underline">
          {article.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {excerptFromBody(article.body, 160)}
        </p>
      </Link>
    </article>
  );
}

export type NewsListViewProps = {
  variant: "news" | "archive";
  articles: NewsArticle[];
  hasMore: boolean;
  loadMoreHref: string | null;
  error?: string | null;
};

export function NewsListView({
  variant,
  articles,
  hasMore,
  loadMoreHref,
  error,
}: NewsListViewProps) {
  const title = variant === "archive" ? "Headlines archive" : "Headlines";
  const subtitle =
    variant === "archive"
      ? "Past stories from the archive"
      : "All published stories";
  const basePath = variant === "archive" ? "/headlines/archive" : "/headlines";

  return (
    <div className="min-h-[calc(100vh-0)] bg-background text-foreground">
      <main className="px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {variant === "archive" ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/headlines">Latest headlines</Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/headlines/archive">Archive</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>

          <section
            className={cn(
              "rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden",
              "dark:bg-card/20 dark:backdrop-blur"
            )}
          >
            {error ? (
              <div className="p-8">
                <p className="text-sm font-medium">Could not load news</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                <Button className="mt-4" variant="outline" size="sm" asChild>
                  <Link href={basePath}>Retry</Link>
                </Button>
              </div>
            ) : articles.length === 0 ? (
              <div className="p-8 text-sm text-muted-foreground">
                {variant === "archive" ? "No archived stories yet." : "No stories published yet."}
              </div>
            ) : (
              <>
                <div className="divide-y divide-border/60">
                  {articles.map((article) => (
                    <NewsRow key={article.id} article={article} />
                  ))}
                </div>
                {hasMore && loadMoreHref ? (
                  <div className="p-4 border-t border-border/60 flex justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={loadMoreHref}>Load more</Link>
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
