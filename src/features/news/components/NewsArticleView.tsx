import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatPublishedAt } from "../news.format";
import type { NewsArticle } from "../news.types";
import { NewsArticleBody } from "./NewsArticleBody";

type NewsArticleViewProps = {
  article: NewsArticle;
};

export function NewsArticleView({ article }: NewsArticleViewProps) {
  return (
    <div className="min-h-[calc(100vh-0)] bg-background text-foreground">
      <main className="px-6 py-8">
        <article className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/headlines">
                <ArrowLeft className="size-4" />
                Back to headlines
              </Link>
            </Button>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              {formatPublishedAt(article.publishedAt)}
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {article.title}
            </h1>
          </header>

          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm dark:bg-card/20">
            <NewsArticleBody body={article.body} />
          </div>
        </article>
      </main>
    </div>
  );
}
