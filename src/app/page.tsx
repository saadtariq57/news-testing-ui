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
        <div className="mx-auto max-w-[1400px]">
          <NewsFeed articles={articles} />
        </div>
      </main>
    </div>
  );
}
