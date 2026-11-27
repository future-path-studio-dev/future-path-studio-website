import EnquiryDialog from "@/components/resources/EnquiryDialog";
import ImageSlot from "@/components/resources/ImageSlot";
import TypeChip from "@/components/resources/TypeChip";
import { featuredResource } from "@/features/resources/resources";

// Figma "Featured Band" 500:2050 (desktop) and 524:3004 (mobile).
export default function FeaturedResource() {
  const resource = featuredResource;
  return (
    <section aria-labelledby="featured-resource-title" className="fps-container pb-5 min-[900px]:pt-2 min-[900px]:pb-8">
      <div className="flex flex-col gap-3 rounded-fps-large border border-border bg-alternate p-5 min-[900px]:flex-row-reverse min-[900px]:items-center min-[900px]:gap-10 min-[900px]:p-8">
        <ImageSlot label="PREVIEW IMAGE" className="h-[170px] w-full shrink-0 min-[900px]:h-[220px] min-[900px]:w-[320px]" />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <p className="text-[11px]/[normal] font-semibold tracking-[0.8px] text-brand-secondary min-[900px]:text-xs/[normal]">
            FEATURED RESOURCE
          </p>
          <h2 id="featured-resource-title" className="text-lg/[normal] font-semibold text-foreground min-[900px]:text-2xl/[normal]">
            {resource.title}
          </h2>
          <p className="text-sm/[21px] text-muted min-[900px]:text-[15px]/6">{resource.summary}</p>
          <div className="flex w-full flex-col-reverse items-start gap-3 min-[900px]:mt-5 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-4">
            <EnquiryDialog
              resourceSlug={resource.slug}
              resourceTitle={resource.title}
              triggerClassName="w-full cursor-pointer rounded-fps-medium bg-brand-primary px-7 py-3.5 text-sm/[normal] font-semibold text-white hover:bg-brand-hover min-[900px]:w-auto min-[900px]:py-[13px]"
            />
            <TypeChip type={resource.type} />
          </div>
        </div>
      </div>
    </section>
  );
}
