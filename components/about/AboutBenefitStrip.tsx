import { aboutBenefits } from "@/features/about/about";

// Figma "Benefit Strip" 456:907 (mobile layout from 462:949).
export default function AboutBenefitStrip() {
  return (
    <section aria-label="Our approach" className="bg-brand-primary py-5">
      <ul className="fps-container grid grid-cols-2 gap-x-3.5 gap-y-3.5 min-[1024px]:grid-cols-4 min-[1024px]:gap-[30px]">
        {aboutBenefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-center gap-2 text-sm/[normal] font-semibold text-white min-[1024px]:gap-2.5 min-[1024px]:py-3.5 min-[1024px]:text-base/[normal]"
          >
            <span
              aria-hidden="true"
              className="size-4 shrink-0 rounded-fps-small bg-brand-accent min-[1024px]:size-5"
            />
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
}
