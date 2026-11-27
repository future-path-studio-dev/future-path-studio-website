import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqBenefits, faqs } from "@/features/faq/faq";
import faqIllustration from "@/public/images/faq/faq-illustration.png";

export const metadata: Metadata = {
  title: "FAQ | The Future Path Studio",
  description:
    "Find answers to common questions about how The Future Path Studio supports RTOs and training organisations.",
};

// Figma "FAQ - Desktop 1440" 277:124 and "FAQ – Mobile 390" 411:805.
// Below 1200px the page follows the mobile frame: the information panel becomes
// a full-width band and the illustration, benefits and duplicate panel heading
// are hidden.
export default function FaqPage() {
  return (
    <main className="bg-background min-[1200px]:py-20">
      <div className="flex flex-col min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-center min-[1200px]:gap-20">
        {/* FAQ Information Panel 277:127 / 411:812 */}
        <section
          aria-labelledby="faq-heading"
          className="flex flex-col gap-2.5 bg-brand-primary px-5 py-[26px] min-[1200px]:min-h-[880px] min-[1200px]:w-[500px] min-[1200px]:shrink-0 min-[1200px]:gap-6 min-[1200px]:border min-[1200px]:border-brand-primary min-[1200px]:p-11"
        >
          <p className="text-[11px] font-semibold text-brand-accent min-[1200px]:text-[13px]/[18px]">
            THE FUTURE PATH STUDIO
          </p>
          <h1
            id="faq-heading"
            className="text-[26px] font-bold text-white min-[1200px]:text-[40px]/[48px]"
          >
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#c9d6e2] min-[1200px]:text-lg/7 min-[1200px]:text-white">
            Find answers to common questions about how The Future Path Studio supports RTOs and
            training organisations.
          </p>

          {/* FAQ Illustration 277:131: the 824×680 image (277:132) is drawn at 2×
              and offset by (-206, -179), so only its centre shows. */}
          <div className="relative hidden h-[340px] w-[412px] overflow-hidden bg-brand-dark after:pointer-events-none after:absolute after:inset-0 after:border after:border-brand-accent min-[1200px]:block">
            <Image
              src={faqIllustration}
              alt="Laptop, notebook and signpost illustration representing guidance for training organisations"
              sizes="824px"
              className="absolute top-[-52.647%] left-[-50%] h-[200%] w-[200%] max-w-none"
            />
          </div>

          <ul className="hidden text-base/[26px] whitespace-pre-wrap text-white min-[1200px]:block">
            {faqBenefits.map((benefit, index) => (
              <li key={benefit} className="inline">
                {`•\u00a0${benefit}${index < faqBenefits.length - 1 ? "  " : ""}`}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Body 411:816 / FAQ Accordion Panel 277:135 */}
        <section
          aria-label="Questions and answers"
          className="mx-auto flex w-full max-w-[760px] flex-col gap-4 px-5 pt-6 pb-7 min-[1200px]:mx-0 min-[1200px]:w-[560px] min-[1200px]:max-w-none min-[1200px]:shrink-0 min-[1200px]:gap-3.5 min-[1200px]:rounded-fps-medium min-[1200px]:border min-[1200px]:border-border min-[1200px]:bg-surface min-[1200px]:px-[50px] min-[1200px]:py-9 min-[1200px]:shadow-[0_6px_18px_rgba(15,36,56,0.1)]"
        >
          <h2 className="hidden text-[40px]/[48px] font-bold text-foreground min-[1200px]:block">
            Frequently Asked Questions
          </h2>
          <p className="hidden text-base/[26px] text-muted min-[1200px]:block">
            Find quick answers to common questions.
          </p>

          <div className="rounded-fps-large border border-border bg-surface p-5 shadow-[0_6px_18px_rgba(15,36,56,0.1)] min-[1200px]:contents">
            <FaqAccordion items={faqs} />
          </div>

          <Link
            href="/contact"
            className="flex h-[52px] w-full items-center justify-center rounded-fps-medium bg-brand-primary text-base font-semibold text-white hover:bg-brand-hover min-[1200px]:h-[54px]"
          >
            Contact Us
          </Link>
          <Link
            href="/contact"
            className="hidden text-sm/[22px] text-muted hover:underline min-[1200px]:block"
          >
            Still have questions? Get in touch with our team.
          </Link>
        </section>
      </div>
    </main>
  );
}
