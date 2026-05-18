import Link from "next/link";

import { Button } from "@/components/ui/button";

export function NewsArticleNotFound() {
  return (
    <div className="min-h-[calc(100vh-0)] bg-background text-foreground">
      <main className="px-6 py-16 mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Article not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This story may have been removed or the link is incorrect.
        </p>
        <Button className="mt-6" variant="outline" asChild>
          <Link href="/headlines">Browse headlines</Link>
        </Button>
      </main>
    </div>
  );
}
