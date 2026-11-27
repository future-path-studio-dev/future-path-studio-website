import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetail from "@/components/resources/ResourceDetail";
import { getResource, resources } from "@/features/resources/resources";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return { title: "Resource not found | The Future Path Studio" };
  return { title: `${resource.title} | The Future Path Studio`, description: resource.summary };
}

export default async function ResourceDetailPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  return <ResourceDetail resource={resource} />;
}
