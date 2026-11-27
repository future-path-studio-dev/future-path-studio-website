// Figma "Contact Hero" 403:625 (desktop) and 411:904 (mobile).
export default function ContactHero() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="fps-container flex flex-col items-center gap-2 pt-[26px] pb-5 text-center min-[600px]:gap-3.5 min-[600px]:pt-14 min-[600px]:pb-12"
    >
      <p className="text-[11px]/[normal] font-semibold text-brand-accent min-[600px]:text-[13px]/[normal] min-[600px]:tracking-[1px]">
        CONTACT US
      </p>
      <h1
        id="contact-heading"
        className="text-[26px]/[normal] font-bold text-balance text-foreground min-[600px]:text-[40px]/[normal]"
      >
        Talk to us about your RTO or training needs
      </h1>
      <p className="max-w-[720px] text-sm/[normal] text-muted min-[600px]:text-lg/[normal]">
        <span className="min-[600px]:hidden">
          Get in touch and we’ll help you find your next step.
        </span>
        <span className="max-[599px]:hidden">
          Tell us what support your organisation requires and The Future Path Studio can help
          identify the appropriate next step.
        </span>
      </p>
    </section>
  );
}
