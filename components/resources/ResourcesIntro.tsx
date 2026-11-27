import ResourcesBreadcrumb from "@/components/resources/ResourcesBreadcrumb";
import { resources } from "@/features/resources/resources";

// Figma "Resources Intro" 500:2037 (desktop) and 524:2999 (mobile).
export default function ResourcesIntro() {
  return (
    <div className="fps-container flex flex-col gap-2.5 pt-[26px] pb-5 min-[900px]:gap-5 min-[900px]:pt-10 min-[900px]:pb-8">
      <ResourcesBreadcrumb
        className="hidden min-[900px]:block"
        items={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "Resources & Tools" }]}
      />
      <p className="text-[11px]/[normal] font-semibold tracking-[0.8px] text-brand-secondary min-[900px]:hidden">
        RESOURCES &amp; TOOLS
      </p>
      <div className="flex flex-col gap-2.5 min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-6">
        <div className="flex flex-col gap-2.5 min-[900px]:gap-3">
          <h1 className="text-[26px]/[normal] font-bold text-foreground min-[900px]:text-[40px]/[normal]">
            Resources &amp; Tools
          </h1>
          <p className="max-w-[760px] text-sm/[22px] text-muted min-[900px]:text-lg/7">
            Practical resources and tools designed to support RTO compliance, training and
            assessment, learner support and staff capability.
          </p>
        </div>
        <p className="shrink-0 text-xs/[normal] text-[#9aa7b4] min-[900px]:text-sm/[normal] min-[900px]:text-muted">
          {resources.length} resources available
        </p>
      </div>
      <hr className="hidden border-border min-[900px]:block" />
    </div>
  );
}
