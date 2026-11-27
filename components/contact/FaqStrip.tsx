import Link from "next/link";

// Figma "FAQ Strip" 403:690 (desktop) and 411:958 (mobile).
export default function FaqStrip() {
  return (
    <div className="fps-container pb-7 min-[600px]:pb-14">
      <section
        aria-labelledby="faq-strip-heading"
        className="flex flex-col items-start gap-3 rounded-fps-large bg-alternate p-5 min-[600px]:flex-row min-[600px]:items-center min-[600px]:gap-5 min-[600px]:px-8 min-[600px]:py-6"
      >
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-primary text-lg/[normal] font-bold text-white max-[599px]:hidden"
        >
          ?
        </span>
        <div className="flex flex-1 flex-col gap-3 min-[600px]:gap-[3px]">
          <h2
            id="faq-strip-heading"
            className="text-[17px]/[normal] font-semibold text-foreground min-[600px]:text-lg/[normal]"
          >
            Need quick answers?
          </h2>
          <p className="text-[13px]/[normal] text-muted min-[600px]:text-sm/[normal]">
            Visit our FAQ page for common questions.
          </p>
        </div>
        <Link
          href="/faq"
          className="flex w-full items-center justify-center rounded-fps-medium border border-brand-primary bg-surface px-[22px] py-[11px] text-[15px]/[normal] font-semibold text-brand-primary hover:bg-alternate min-[600px]:w-auto min-[600px]:px-[26px] min-[600px]:py-3"
        >
          View FAQ
        </Link>
      </section>
    </div>
  );
}
