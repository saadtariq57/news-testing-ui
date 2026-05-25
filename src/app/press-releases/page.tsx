import type { Metadata } from "next";

import { PressReleasesListView } from "@/features/press-releases/components/PressReleasesListView";
import { loadPressReleasesListPage } from "@/features/press-releases/press-releases.list-page";

export const metadata: Metadata = {
  title: "Press releases",
  description: "Corporate announcements and disclosures.",
};

export const revalidate = 60;

export default async function PressReleasesPage() {
  const { items, error } = await loadPressReleasesListPage();

  return <PressReleasesListView items={items} error={error} />;
}
