import Link from "next/link";
import ImageSlot from "@/components/resources/ImageSlot";
import ResourcesBreadcrumb from "@/components/resources/ResourcesBreadcrumb";
import { getResourceCategory, howToAccess, type Resource } from "@/features/resources/resources";

// Figma detail frames 509:2595 and 511:2625 (desktop), 678:3594 and 678:3669 (mobile).
// Only two resources have a designed detail frame. The others reuse the same template
// with the card copy and the shared "How to access it" section, and no invented detail.
export default function ResourceDetail({ resource }: { resource: Resource }) {
  const category = getResourceCategory(resource.category);
  const sections = resource.sections ?? [howToAccess];
  const backLink = "←  Back to Resources";

  return (
    <main className="bg-background">
      <div className="fps-container pt-5 min-[900px]:pt-8">
        <ResourcesBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: resource.title }]}
        />
      </div>
      <div className="fps-container flex justify-center pt-4 pb-7 min-[900px]:pt-7 min-[900px]:pb-[72px]">
        <article className="flex w-full max-w-[860px] flex-col items-start gap-3.5 rounded-fps-large border border-border bg-surface px-5 py-7 min-[900px]:gap-[18px] min-[900px]:px-[72px] min-[900px]:py-14">
          <Link href="/resources" className="text-sm/[normal] font-medium whitespace-pre text-brand-secondary hover:underline">
            {backLink}
          </Link>
          <p className="text-xs/[normal] font-semibold tracking-[1px] text-brand-secondary uppercase">
            Resource · {category?.label}
          </p>
          <h1 className="text-[26px]/8 font-bold text-foreground min-[900px]:text-[40px]/[normal]">{resource.title}</h1>
          <p className="text-[15px]/[23px] text-muted min-[900px]:text-lg/7">{resource.summary}</p>

          {resource.previewSlot ? (
            <ImageSlot label="RESOURCE PREVIEW" meta="Resources & Tools" className="h-[170px] w-full min-[900px]:h-[260px]" />
          ) : (
            <hr className="w-full border-border" />
          )}

          {sections.map((section) => (
            <section key={section.heading} className="contents">
              <h2 className="text-lg/[26px] font-semibold text-foreground min-[900px]:text-xl/7">{section.heading}</h2>
              {"bullets" in section ? (
                <ul className="flex w-full flex-col gap-3.5 min-[900px]:gap-[18px]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[15px]/[25px] text-[#374151] min-[900px]:text-base/[26px]">
                      <span aria-hidden="true">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px]/[25px] text-[#374151] min-[900px]:text-base/7">{section.body}</p>
              )}
            </section>
          ))}

          <div aria-hidden="true" className="h-5" />
          <hr className="w-full border-border" />
          <div className="flex w-full flex-col items-start gap-3 pt-3 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
            <Link
              href="/resources"
              className="rounded-fps-medium border border-brand-primary bg-surface px-6 py-[13px] text-sm/[normal] font-semibold whitespace-pre text-brand-primary hover:bg-alternate"
            >
              {backLink}
            </Link>
            <p className="text-[13px]/[normal] text-muted">Resources &amp; Tools · The Future Path Studio</p>
          </div>
        </article>
      </div>
    </main>
  );
}
