import Link from "next/link";

// Figma "CTA Band" 502:2197 (desktop) and 524:3179 (mobile). Mobile lists
// Create account first.
export default function ResourcesCta() {
  return (
    <section aria-labelledby="resources-cta-heading" className="fps-container pt-0 pb-7 min-[900px]:pt-2 min-[900px]:pb-[72px]">
      <div className="flex flex-col gap-2.5 rounded-fps-large border border-border bg-surface px-5 py-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-8 min-[900px]:p-10">
        <div className="flex flex-col gap-2.5 min-[900px]:gap-2">
          <h2 id="resources-cta-heading" className="text-lg/[normal] font-semibold text-foreground min-[900px]:text-2xl/[normal]">
            Want tailored support for your RTO?
          </h2>
          <p className="max-w-[520px] text-sm/[21px] text-muted min-[900px]:text-[15px]/6">
            Create a client account to save resources, track service requests and stay connected
            with our team.
          </p>
        </div>
        <div className="flex flex-col-reverse gap-2.5 min-[900px]:shrink-0 min-[900px]:flex-row min-[900px]:gap-3">
          <Link
            href="/services"
            className="flex items-center justify-center rounded-fps-medium border border-brand-primary bg-surface px-7 py-[13px] text-sm/[normal] font-semibold text-brand-primary hover:bg-alternate"
          >
            Learn more
          </Link>
          <Link
            href="/register"
            className="flex items-center justify-center rounded-fps-medium border border-brand-primary bg-brand-primary px-7 py-[13px] text-sm/[normal] font-semibold text-white hover:bg-brand-hover"
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
