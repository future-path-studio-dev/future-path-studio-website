import Link from "next/link";

// Figma "Final CTA" 2:16. Content spans 80px–1360px at 1440px, wider than the
// standard 1240px container.
export default function HomeCta() {
  return (
    <section
      aria-labelledby="home-cta-heading"
      className="bg-brand-primary py-[50px] [--fps-focus-color:var(--fps-color-brand-accent)]"
    >
      <div className="mx-auto flex w-[min(calc(100%-2.5rem),1280px)] flex-col items-start gap-8 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
        <div className="flex max-w-[760px] flex-col gap-3.5 text-white">
          <h2 id="home-cta-heading" className="text-[32px]/[40px] font-bold min-[900px]:text-[40px]/[48px]">
            Ready to strengthen your training and compliance systems?
          </h2>
          <p className="text-lg/7">
            Talk to The Future Path Studio about the support your organisation needs.
          </p>
        </div>
        <Link
          href="/contact"
          className="flex h-[52px] w-[190px] shrink-0 items-center justify-center rounded-fps-medium border border-brand-accent bg-brand-accent text-base/6 font-semibold text-brand-dark hover:brightness-95"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
