"use client";

import { useId, useState } from "react";
import type { Faq } from "@/features/faq/faq";

// Figma component "FAQ Accordion" 398:617 (Closed 398:609 / Open 398:616).
// Each item toggles independently; opening an answer pushes later items down.
export default function FaqAccordion({ items }: { items: readonly Faq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <ul className="flex w-full flex-col gap-1 min-[1200px]:gap-3.5">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <li
            key={item.question}
            className="flex flex-col gap-3 border-b border-border py-[18px] data-[open=false]:gap-0"
            data-open={isOpen}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center gap-4 text-left"
              >
                <span className="min-w-0 flex-1 text-base/[normal] font-semibold text-foreground">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-[26px] shrink-0 place-items-center rounded-full text-base/5 font-bold ${
                    isOpen ? "bg-brand-secondary text-white" : "bg-brand-secondary/12 text-brand-secondary"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              {!item.approved && (
                <p className="mb-1 text-xs/[18px] font-semibold text-warning">
                  Draft answer – pending client approval
                </p>
              )}
              <p className="text-[15px]/6 text-muted">{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
