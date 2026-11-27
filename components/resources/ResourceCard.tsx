import Link from "next/link";
import TypeChip from "@/components/resources/TypeChip";
import { getResourceCategory, type Resource } from "@/features/resources/resources";

// Figma "Resource Card" 494:2057. Per the Figma scope note (527:3808), the public
// Save control links to Login; saving itself needs an account and a backend.
export default function ResourceCard({ resource }: { resource: Resource }) {
  const category = getResourceCategory(resource.category);
  return (
    <article className="flex h-full flex-col items-start gap-2.5 rounded-fps-medium border border-border bg-surface p-6">
      <div className="flex w-full items-center justify-between gap-3">
        <TypeChip type={resource.type} />
        <p className="text-[13px]/[normal] text-muted">{resource.meta}</p>
      </div>
      <p className="text-xs/[normal] font-semibold tracking-[0.6px] text-brand-secondary uppercase">
        {category?.label}
      </p>
      <h3 className="text-lg/[normal] font-semibold text-foreground">{resource.title}</h3>
      <p className="text-sm/[21px] text-muted">{resource.summary}</p>
      <div className="mt-1 flex w-full items-center justify-between gap-3">
        <Link
          href={`/resources/${resource.slug}`}
          aria-label={`View resource: ${resource.title}`}
          className="text-sm/[normal] font-semibold text-brand-secondary hover:underline"
        >
          View Resource →
        </Link>
        <Link
          href="/login"
          aria-label={`Save ${resource.title} (log in required)`}
          className="rounded-fps-medium border border-border bg-surface px-3 py-[7px] text-[13px]/[normal] font-medium whitespace-pre text-muted hover:border-brand-secondary hover:text-brand-secondary"
        >
          {"♡  Save"}
        </Link>
      </div>
    </article>
  );
}
