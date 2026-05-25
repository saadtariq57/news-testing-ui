import Link from "next/link";
import { Megaphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewsFeed } from "@/features/news/components/NewsFeed";
import { getNews } from "@/features/news/news.api";

export const revalidate = 60;

export default async function Home() {
  let articles: Awaited<ReturnType<typeof getNews>>["items"] = [];
  try {
    const res = await getNews({ limit: 10 });
    articles = res.items;
  } catch {
    articles = [];
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-6 py-8">
        <div className="mx-auto max-w-[1400px] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">RichTV News</h1>
              <p className="text-sm text-muted-foreground">
                Market headlines and corporate announcements
              </p>
            </div>
            <Button asChild>
              <Link href="/press-releases">
                <Megaphone className="size-4" />
                Press releases
              </Link>
            </Button>
          </div>

          <NewsFeed articles={articles} />
        </div>
      </main>
    </div>
  );
}
