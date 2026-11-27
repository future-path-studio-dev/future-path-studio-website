import Link from "next/link";

// Figma "Final CTA" 458:961.
export default function AboutCta() {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="bg-brand-primary py-7 min-[900px]:py-[50px] [--fps-focus-color:var(--fps-color-brand-accent)]"
    >
      <div className="fps-container flex flex-col items-start gap-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-10">
        <div className="flex flex-1 flex-col gap-3.5 text-white">
          <h2
            id="about-cta-heading"
            className="text-[28px]/[normal] font-bold min-[900px]:text-[40px]/[normal]"
          >
            Ready to strengthen your training and compliance systems?
          </h2>
          <p className="text-lg/[normal]">
            Talk to The Future Path Studio about the support your organisation needs.
          </p>
        </div>
        <Link
          href="/contact"
          className="flex h-[52px] w-full shrink-0 items-center justify-center rounded-fps-medium bg-brand-accent px-6 text-base/[normal] font-semibold text-brand-dark hover:brightness-95 min-[600px]:w-[190px]"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
