import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PressReleaseNotFound } from "@/features/press-releases/components/PressReleaseNotFound";
import { PressReleaseView } from "@/features/press-releases/components/PressReleaseView";
import { getPressRelease } from "@/features/press-releases/press-releases.api";

type PageProps = {
  params: Promise<{ id: string }>;
};

function parsePressReleaseId(raw: string): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1 || !Number.isInteger(n)) return null;
  return n;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const releaseId = parsePressReleaseId(id);
  if (releaseId == null) return { title: "Press release" };
  const item = await getPressRelease(releaseId);
  if (!item) return { title: "Press release" };
  return {
    title: item.headline,
    description: item.headline,
  };
}

export default async function PressReleasePage({ params }: PageProps) {
  const { id } = await params;
  const releaseId = parsePressReleaseId(id);
  if (releaseId == null) notFound();

  const item = await getPressRelease(releaseId);
  if (!item) return <PressReleaseNotFound />;

  return <PressReleaseView item={item} />;
}
