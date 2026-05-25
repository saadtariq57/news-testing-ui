import type { Metadata } from "next";

import { PressReleasesListView } from "@/features/press-releases/components/PressReleasesListView";
import { loadPressReleasesListPage } from "@/features/press-releases/press-releases.list-page";

export const metadata: Metadata = {
  title: "Press releases",
  description: "Corporate announcements and disclosures.",
};

export const revalidate = 60;

type PageProps = {
  searchParams: Promise<{ limit?: string }>;
};

export default async function PressReleasesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { items, hasMore, loadMoreHref, error } = await loadPressReleasesListPage(sp);

  return (
    <PressReleasesListView
      items={items}
      hasMore={hasMore}
      loadMoreHref={loadMoreHref}
      error={error}
    />
  );
}
