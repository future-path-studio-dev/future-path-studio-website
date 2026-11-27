import type { Metadata } from "next";
import { Suspense } from "react";
import FeaturedResource from "@/components/resources/FeaturedResource";
import ResourcesCta from "@/components/resources/ResourcesCta";
import { ResourcesExplorer, ResourcesExplorerFallback } from "@/components/resources/ResourcesExplorer";
import ResourcesIntro from "@/components/resources/ResourcesIntro";

export const metadata: Metadata = {
  title: "Resources | The Future Path Studio",
  description:
    "Practical resources and tools designed to support RTO compliance, training and assessment, learner support and staff capability.",
};

// Figma "Resources – Overview" 500:2023.
export default function ResourcesPage() {
  return (
    <main className="bg-background">
      <ResourcesIntro />
      <FeaturedResource />
      <Suspense fallback={<ResourcesExplorerFallback />}>
        <ResourcesExplorer />
      </Suspense>
      <ResourcesCta />
    </main>
  );
}
