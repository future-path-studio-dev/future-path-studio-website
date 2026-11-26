"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ServiceCard from "@/components/services/ServiceCard";
import {
  getCategory,
  serviceCategories,
  services,
  type ServiceCategorySlug,
} from "@/features/services/services";

type CategoryFilter = ServiceCategorySlug | "all";

const filters = [
  { slug: "all", label: "All", href: "/services" },
  ...serviceCategories.map(({ slug, label }) => ({
    slug,
    label,
    href: `/services?category=${slug}`,
  })),
] as const;

// Reads ?category= so each Figma category frame (667:3302, 667:3416,
// 667:3530) has a shareable URL.
export function ServicesExplorer() {
  const category = useSearchParams().get("category");
  return <Explorer category={category && getCategory(category) ? (category as ServiceCategorySlug) : "all"} />;
}

// Prerendered in place of ServicesExplorer until search params are known.
export function ServicesExplorerFallback() {
  return <Explorer category="all" />;
}

function Explorer({ category }: { category: CategoryFilter }) {
  const [query, setQuery] = useState("");
  const normalisedQuery = query.trim().toLowerCase();

  const visibleServices = services.filter(
    (service) =>
      (category === "all" || service.category === category) &&
      (normalisedQuery === "" ||
        [service.name, service.summary, getCategory(service.category)?.label ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(normalisedQuery)),
  );

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <label className="flex h-11 w-full items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 text-muted focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-brand-primary min-[600px]:w-[280px]">
          <span aria-hidden="true" className="text-[15px]/[normal]">
            ⌕
          </span>
          <span className="sr-only">Search services</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services…"
            className="min-w-0 flex-1 bg-transparent text-sm/[normal] text-foreground outline-none placeholder:text-muted"
          />
        </label>

        <ul aria-label="Filter by category" className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <li key={filter.slug}>
              <Link
                href={filter.href}
                scroll={false}
                replace
                aria-current={category === filter.slug ? "true" : undefined}
                className="flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm/[normal] font-medium whitespace-nowrap text-muted not-aria-current:hover:border-brand-secondary not-aria-current:hover:text-brand-secondary aria-current:border-brand-secondary aria-current:bg-brand-secondary aria-current:text-white"
              >
                {filter.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section aria-label="Services" className="pt-10 pb-10">
        <p aria-live="polite" className="sr-only">
          {visibleServices.length} {visibleServices.length === 1 ? "service" : "services"} shown
        </p>
        {visibleServices.length > 0 ? (
          <div className="grid items-start gap-6 min-[700px]:grid-cols-2 min-[1024px]:grid-cols-3">
            {visibleServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-surface p-6 text-sm/[22px] text-muted">
            No services match your search. Try a different term or{" "}
            <Link href="/contact" className="fps-link">
              contact us
            </Link>{" "}
            to discuss what you need.
          </p>
        )}
      </section>
    </>
  );
}
