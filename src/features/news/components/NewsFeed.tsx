"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { excerptFromBody, formatRelativePublishedAt } from "../news.format";
import type { NewsArticle } from "../news.types";

function imageTone(id: number) {
  const tones = [
    "from-emerald-500/30 via-sky-500/15 to-transparent",
    "from-amber-500/25 via-rose-500/10 to-transparent",
    "from-sky-500/25 via-violet-500/10 to-transparent",
    "from-violet-500/30 via-cyan-500/10 to-transparent",
    "from-emerald-500/20 via-amber-500/10 to-transparent",
    "from-rose-500/30 via-amber-500/10 to-transparent",
  ];
  return tones[id % tones.length];
}

function MetaLine({ article, compact }: { article: NewsArticle; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", compact && "gap-1.5")}>
      <span
        className={cn(
          "text-xs text-muted-foreground inline-flex items-center gap-1",
          compact && "text-[10px]"
        )}
      >
        <Clock className={cn("size-3.5", compact && "size-3")} />
        {formatRelativePublishedAt(article.publishedAt)}
      </span>
    </div>
  );
}

function ArticleLink({
  article,
  className,
  children,
}: {
  article: NewsArticle;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={`/article/${article.id}`} className={className}>
      {children}
    </Link>
  );
}

type NewsFeedProps = {
  articles: NewsArticle[];
};

export function NewsFeed({ articles }: NewsFeedProps) {
  const list = articles;
  const featured = list[0];
  const sideA = list[1];
  const sideB = list[2];
  const latest = list.filter(
    (n) => ![featured?.id, sideA?.id, sideB?.id].includes(n.id)
  );

  return (
    <section className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-[0_1px_2px_oklch(0_0_0/0.06),0_4px_14px_oklch(0_0_0/0.05)] dark:bg-card/20 dark:backdrop-blur dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_80px_rgba(0,0,0,0.25)]">
      <header className="px-4 py-3 border-b border-border/60 bg-card dark:bg-background/20">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight">News</div>
            <div className="text-xs text-muted-foreground truncate">
              Top stories and latest news
            </div>
          </div>

          <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/headlines">View all</Link>
          </Button>
        </div>
      </header>

      <div className="p-4">
        {list.length === 0 ? (
          <div className="p-2">
            <div className="text-sm font-semibold">No news yet</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Check back soon for the latest stories.
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {featured ? (
              <section className="grid gap-4 lg:grid-cols-[1.65fr_1fr]">
                <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 sm:p-5 shadow-sm lg:h-full dark:bg-card/30 dark:shadow-none">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 dark:opacity-100",
                      imageTone(featured.id)
                    )}
                    aria-hidden
                  />
                  <div className="relative">
                    <MetaLine article={featured} />
                    <ArticleLink article={featured} className="block">
                      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight leading-tight group-hover:underline decoration-border/80 underline-offset-4">
                        {featured.title}
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {excerptFromBody(featured.body)}
                      </p>
                    </ArticleLink>

                    <div className="mt-5 flex items-center gap-3">
                      <Button variant="outline" asChild>
                        <Link href={`/article/${featured.id}`}>Read story</Link>
                      </Button>
                      <div className="text-xs text-muted-foreground">Featured</div>
                    </div>
                  </div>
                </article>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:h-full">
                  {[sideA, sideB].filter((n): n is NewsArticle => n != null).map((n) => (
                    <article
                      key={n.id}
                      className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:bg-muted/15 transition-colors lg:h-full dark:bg-card/30 dark:shadow-none"
                    >
                      <ArticleLink article={n} className="block p-3 sm:p-4">
                        <MetaLine article={n} compact />
                        <h3 className="mt-2 text-sm sm:text-base font-semibold tracking-tight leading-snug line-clamp-2 group-hover:underline">
                          {n.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {excerptFromBody(n.body, 120)}
                        </p>
                      </ArticleLink>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden dark:bg-background/15 dark:shadow-none">
              <div className="px-4 py-3 border-b border-border/60 bg-card flex items-center justify-between gap-3 dark:bg-background/20">
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight">Latest</div>
                  <div className="text-xs text-muted-foreground truncate">
                    Fresh stories as they publish
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href="/headlines">See more</Link>
                </Button>
              </div>

              <div className="divide-y divide-border/60">
                {latest.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground">You’re all caught up.</div>
                ) : (
                  latest.map((n) => (
                    <article
                      key={n.id}
                      className="group px-4 py-4 hover:bg-muted/15 transition-colors"
                    >
                      <ArticleLink article={n} className="block">
                        <MetaLine article={n} />
                        <h3 className="mt-2 text-sm sm:text-base font-semibold tracking-tight leading-snug group-hover:underline">
                          {n.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {excerptFromBody(n.body, 160)}
                        </p>
                      </ArticleLink>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
