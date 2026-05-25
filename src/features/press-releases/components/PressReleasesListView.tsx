import Link from "next/link";
import { Clock, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { excerptFromBody, formatRelativePublishedAt } from "../press-releases.format";
import type { PressRelease } from "../press-releases.types";

function PressReleaseRow({ item }: { item: PressRelease }) {
  const tickers = item.tickers.slice(0, 4);
  const extraTickers = Math.max(0, item.tickers.length - tickers.length);

  return (
    <article className="group px-4 py-4 hover:bg-muted/15 transition-colors">
      <Link href={`/press-releases/${item.id}`} className="block">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {formatRelativePublishedAt(item.publishedAt)}
        </div>

        <h3 className="mt-2 text-sm sm:text-base font-semibold tracking-tight leading-snug group-hover:underline">
          {item.headline}
        </h3>

        {item.body ? (
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {excerptFromBody(item.body, 220)}
          </p>
        ) : null}

        {tickers.length > 0 ? (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Tag className="size-3 text-muted-foreground" aria-hidden />
            {tickers.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-foreground/80"
              >
                {t}
              </span>
            ))}
            {extraTickers > 0 ? (
              <span className="text-[10px] text-muted-foreground">+{extraTickers}</span>
            ) : null}
          </div>
        ) : null}
      </Link>
    </article>
  );
}

export type PressReleasesListViewProps = {
  items: PressRelease[];
  hasMore: boolean;
  loadMoreHref: string | null;
  error?: string | null;
};

export function PressReleasesListView({
  items,
  hasMore,
  loadMoreHref,
  error,
}: PressReleasesListViewProps) {
  return (
    <div className="min-h-[calc(100vh-0)] bg-background text-foreground">
      <main className="px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Press releases</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Corporate announcements and disclosures
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/headlines">Headlines</Link>
              </Button>
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
                <p className="text-sm font-medium">Could not load press releases</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                <Button className="mt-4" variant="outline" size="sm" asChild>
                  <Link href="/press-releases">Retry</Link>
                </Button>
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-sm text-muted-foreground">
                No press releases published yet.
              </div>
            ) : (
              <>
                <div className="divide-y divide-border/60">
                  {items.map((item) => (
                    <PressReleaseRow key={item.id} item={item} />
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
