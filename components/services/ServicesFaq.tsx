"use client";

import { useId, useState } from "react";
import { servicesFaqs } from "@/features/services/services";

// Figma 471:1063, using the "FAQ Accordion" component states 398:609 / 398:616.
export default function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section aria-labelledby="services-faq-heading" className="py-[60px]">
      <div className="fps-container flex flex-col gap-[30px]">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2 id="services-faq-heading" className="text-[32px]/[normal] font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-base/[normal] text-muted">
            Common questions about how we work with RTOs and training organisations.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-1">
          {servicesFaqs.map((faq, index) => {
            const open = openIndex === index;
            const buttonId = `${baseId}-question-${index}`;
            const panelId = `${baseId}-answer-${index}`;

            return (
              <div key={faq.question} className="border-b border-border">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full cursor-pointer items-center gap-4 py-[18px] text-left focus-visible:-outline-offset-2"
                  >
                    <span className="flex-1 text-base/[normal] font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-[26px] shrink-0 place-items-center rounded-full text-base/[normal] font-bold ${open ? "bg-brand-secondary text-white" : "bg-brand-secondary/12 text-brand-secondary"}`}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="-mt-1.5 pb-[18px] text-[15px]/6 text-muted"
                >
                  <p>{faq.answer}</p>
                  {!faq.approved && (
                    <p className="mt-2 text-xs/[18px] font-semibold tracking-[0.6px] text-warning uppercase">
                      Draft answer – pending client approval
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
