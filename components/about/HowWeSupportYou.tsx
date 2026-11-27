"use client";

import { useState } from "react";
import { supportSteps } from "@/features/about/about";

// Figma "How We Support You" 458:893 with the "Process Step" component
// (454:908): "Click to reveal the supporting detail." One step is open at a time.
export default function HowWeSupportYou() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="how-we-support-heading" className="bg-background py-10 min-[1024px]:py-[60px]">
      <div className="fps-container flex flex-col gap-[22px]">
        <h2
          id="how-we-support-heading"
          className="text-[30px]/[normal] font-bold text-foreground min-[900px]:text-[40px]/[normal]"
        >
          How We Support You
        </h2>
        <p className="text-lg/[normal] text-muted">Select a step to see what it involves.</p>
        <ol className="grid items-start gap-3 pt-2 min-[600px]:grid-cols-2 min-[600px]:gap-7 min-[1024px]:grid-cols-4">
          {supportSteps.map((step, index) => {
            const open = openIndex === index;
            const number = String(index + 1).padStart(2, "0");
            const panelId = `support-step-${number}`;
            return (
              <li key={step.title} className="border border-border bg-background">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full cursor-pointer flex-col items-start gap-3.5 p-6 text-left focus-visible:-outline-offset-4"
                >
                  <span className="flex w-full items-center gap-3">
                    <span className="flex-1 text-[22px]/[normal] font-semibold text-brand-secondary">
                      <span className="sr-only">Step </span>
                      {number}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-[15px]/[normal] font-bold ${
                        open ? "bg-brand-secondary text-white" : "bg-brand-secondary/12 text-brand-secondary"
                      }`}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </span>
                  <span className="text-base/[normal] font-semibold text-foreground">{step.title}</span>
                </button>
                <div id={panelId} hidden={!open} className="-mt-2 px-6 pb-6">
                  {step.detail ? (
                    <p className="text-sm/[22px] text-muted">{step.detail}</p>
                  ) : (
                    <p className="text-sm/[22px] text-muted italic">
                      Step detail pending client approval.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
