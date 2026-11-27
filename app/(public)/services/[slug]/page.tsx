import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { getService, services } from "@/features/services/services";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);

  return service
    ? { title: `${service.name} | The Future Path Studio`, description: service.summary }
    : {};
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
