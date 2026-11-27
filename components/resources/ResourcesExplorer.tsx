"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ResourceCard from "@/components/resources/ResourceCard";
import {
  filterResources,
  getResourceCategory,
  resourceCategories,
  resultsLabel,
} from "@/features/resources/resources";

// Figma "Search + Filters Band" 500:2064 and "Resource Grid" 502:2042, with the
// category (675:3202 / 3290 / 3390 / 3490), search (675:3715) and no-results
// (675:3813) states. The category comes from ?category= and the search from ?q=,
// so every state has a shareable URL.
export function ResourcesExplorer() {
  const searchParams = useSearchParams();
  const categorySlug = getResourceCategory(searchParams.get("category"))?.slug ?? null;
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function updateQuery(value: string) {
    setQuery(value);
    // Keep ?q= in the URL without a navigation; Next.js syncs useSearchParams with history.
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) params.set("q", value);
    else params.delete("q");
    const search = params.toString();
    window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
  }

  return (
    <ExplorerView
      categorySlug={categorySlug}
      query={query}
      onQueryChange={updateQuery}
      onClear={() => setQuery("")}
    />
  );
}

// Rendered while search params are unknown during prerendering: the "All" view.
export function ResourcesExplorerFallback() {
  return <ExplorerView categorySlug={null} query="" />;
}

function categoryHref(slug: string | null, query: string) {
  const params = new URLSearchParams();
  if (slug) params.set("category", slug);
  if (query.trim()) params.set("q", query);
  const search = params.toString();
  return search ? `/resources?${search}` : "/resources";
}

function ExplorerView({
  categorySlug,
  query,
  onQueryChange,
  onClear,
}: {
  categorySlug: string | null;
  query: string;
  onQueryChange?: (value: string) => void;
  onClear?: () => void;
}) {
  const results = filterResources(categorySlug, query);
  const category = getResourceCategory(categorySlug);
  const chips = [{ slug: null, label: "All" }, ...resourceCategories];
  const searching = query.trim().length > 0;

  return (
    <section aria-labelledby="resources-list-heading">
      <h2 id="resources-list-heading" className="sr-only">
        Browse resources
      </h2>
      <div className="fps-container flex flex-col gap-3 pb-2 min-[900px]:gap-4">
        <div className="flex flex-col gap-3 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between min-[1200px]:gap-4">
          <label
            className={`flex h-11 w-full items-center gap-2.5 rounded-fps-medium border bg-surface px-3.5 min-[600px]:w-[320px] min-[600px]:shrink-0 has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-(--fps-focus-color) ${
              searching ? "border-2 border-brand-secondary px-[13px]" : "border-border"
            }`}
          >
            <span aria-hidden="true" className="text-[15px]/[normal] text-muted min-[900px]:text-base/[normal]">
              ⌕
            </span>
            <span className="sr-only">Search resources</span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange?.(event.target.value)}
              placeholder="Search resources..."
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-sm/[normal] text-foreground outline-none placeholder:text-[#9aa7b4] [&::-webkit-search-cancel-button]:cursor-pointer"
            />
          </label>

          <nav aria-label="Resource categories" className="-mx-5 overflow-x-auto px-5 min-[600px]:mx-0 min-[600px]:overflow-visible min-[600px]:px-0">
            <ul className="flex w-max gap-2 min-[600px]:w-auto min-[600px]:flex-wrap">
              {chips.map((chip) => {
                const active = chip.slug === categorySlug;
                return (
                  <li key={chip.label} className="shrink-0">
                    <Link
                      href={categoryHref(chip.slug, query)}
                      scroll={false}
                      replace
                      aria-current={active ? "true" : undefined}
                      className="flex items-center justify-center rounded-fps-medium border px-4 py-2.5 text-sm/[normal] font-medium whitespace-nowrap aria-current:border-brand-secondary aria-current:bg-brand-secondary aria-current:text-white not-aria-current:border-border not-aria-current:bg-surface not-aria-current:text-muted not-aria-current:hover:border-brand-secondary not-aria-current:hover:text-brand-secondary"
                    >
                      {chip.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <p role="status" className="text-[13px]/[normal] text-[#9aa7b4] min-[900px]:text-sm/[normal] min-[900px]:text-muted">
          {resultsLabel(results.length, categorySlug, query)}
        </p>
      </div>

      <div className="fps-container pt-2 pb-6 min-[900px]:pb-12">
        {results.length > 0 ? (
          <ul className="grid gap-3.5 min-[600px]:grid-cols-2 min-[900px]:gap-6 min-[1200px]:grid-cols-3">
            {results.map((resource) => (
              <li key={resource.slug}>
                <ResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2.5 rounded-fps-large border border-border bg-surface px-6 py-16 text-center">
            <p className="text-base/[normal] text-muted">
              {searching ? `No resources match "${query.trim()}".` : "No resources in this category yet."}
            </p>
            {!searching && category?.emptyHint && (
              <p className="text-sm/[normal] text-[#9aa7b4]">{category.emptyHint}</p>
            )}
            <Link
              href="/resources"
              scroll={false}
              replace
              onClick={onClear}
              className="rounded-fps-medium border border-brand-secondary bg-surface px-6 py-[11px] text-sm/[normal] font-semibold text-brand-secondary hover:bg-alternate"
            >
              Clear filters
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
