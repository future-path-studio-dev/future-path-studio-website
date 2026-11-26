import { homeBenefits } from "@/features/home/home";

// Figma "Benefit Strip" 2:11. The accent squares are Figma's icon placeholders.
export default function HomeBenefits() {
  return (
    <section aria-label="Why work with us" className="bg-brand-primary py-5">
      <ul className="fps-container grid grid-cols-1 gap-x-6 gap-y-1 min-[600px]:grid-cols-2 min-[1024px]:flex min-[1024px]:justify-between">
        {homeBenefits.map((benefit) => (
          <li
            key={benefit}
            className="flex h-[52px] items-center gap-2.5 text-base/6 font-semibold text-white min-[1024px]:w-[260px]"
          >
            <span aria-hidden="true" className="size-5 shrink-0 bg-brand-accent" />
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
}
