import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatPublishedAt } from "../press-releases.format";
import type { PressRelease } from "../press-releases.types";
import { PressReleaseBody } from "./PressReleaseBody";

type PressReleaseViewProps = {
  item: PressRelease;
};

export function PressReleaseView({ item }: PressReleaseViewProps) {
  return (
    <div className="min-h-[calc(100vh-0)] bg-background text-foreground">
      <main className="px-6 py-8">
        <article className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/press-releases">
                <ArrowLeft className="size-4" />
                Back to press releases
              </Link>
            </Button>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              {formatPublishedAt(item.publishedAt)}
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {item.headline}
            </h1>

            {item.tickers.length > 0 ? (
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <Tag className="size-3.5 text-muted-foreground" aria-hidden />
                {item.tickers.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm dark:bg-card/20">
            <PressReleaseBody body={item.body} />
          </div>

          {item.organizations.length > 0 ? (
            <div className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Organizations: </span>
              {item.organizations.join(", ")}
            </div>
          ) : null}
        </article>
      </main>
    </div>
  );
}
