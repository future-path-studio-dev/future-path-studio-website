import Link from "next/link";
import { aboutServices } from "@/features/about/about";

// Figma "What We Do" 456:937.
export default function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do-heading" className="bg-surface py-10 min-[1024px]:py-[60px]">
      <div className="fps-container flex flex-col gap-3.5">
        <h2
          id="what-we-do-heading"
          className="text-[30px]/[normal] font-bold text-foreground min-[900px]:text-[40px]/[normal]"
        >
          What We Do
        </h2>
        <p className="text-lg/[normal] text-muted">
          Six service areas covering compliance, training systems, resources, advisory and staff
          capability.
        </p>
        <ul className="grid gap-x-10 gap-y-6 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-3">
          {aboutServices.map((service) => (
            <li key={service.slug} className="flex">
              <Link
                href={`/services/${service.slug}`}
                className="group flex w-full flex-col items-start gap-4 rounded-fps-medium border border-border bg-surface p-7 transition-shadow hover:shadow-[0_6px_18px_rgba(15,36,56,0.1)] focus-visible:outline-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="grid size-[54px] shrink-0 place-items-center rounded-[10px] bg-brand-secondary text-[22px]/[normal]"
                >
                  {service.icon}
                </span>
                <h3 className="text-[22px]/[normal] font-semibold text-foreground">{service.name}</h3>
                <p className="text-base/[26px] text-muted">{service.summary}</p>
                <span className="text-sm/[normal] font-semibold whitespace-pre text-brand-secondary group-hover:underline">
                  {"Learn more  →"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
