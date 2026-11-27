import Link from "next/link";

// Figma 471:1118.
export default function ServicesCta() {
  return (
    <section
      aria-labelledby="services-cta-heading"
      className="bg-brand-primary py-12 min-[900px]:py-14 [--fps-focus-color:var(--fps-color-brand-accent)]"
    >
      <div className="fps-container flex flex-col items-center gap-4 text-center">
        <h2
          id="services-cta-heading"
          className="max-w-[880px] text-[32px]/[normal] font-bold text-balance text-white"
        >
          Not sure which support your organisation needs?
        </h2>
        <p className="max-w-[640px] text-lg/[normal] text-[#b8cdd9]">
          Talk to The Future Path Studio about the support your organisation needs.
        </p>
        <Link
          href="/contact"
          className="rounded-lg bg-brand-accent px-8 py-3.5 text-sm/[normal] font-bold text-brand-dark hover:brightness-95"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
