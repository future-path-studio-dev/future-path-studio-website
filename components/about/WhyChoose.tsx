import { whyChooseCards } from "@/features/about/about";

// Figma "Why Choose" 458:945.
export default function WhyChoose() {
  return (
    <section aria-labelledby="why-choose-heading" className="bg-surface py-10 min-[1024px]:py-[60px]">
      <div className="fps-container flex flex-col gap-3.5">
        <h2
          id="why-choose-heading"
          className="text-[30px]/[normal] font-bold text-foreground min-[900px]:text-[40px]/[normal]"
        >
          Why Choose The Future Path Studio?
        </h2>
        <p className="text-lg/[normal] text-muted">
          Support built around how training organisations actually operate.
        </p>
        <ul className="grid items-start gap-3 pt-2 min-[600px]:grid-cols-2 min-[600px]:gap-10 min-[1024px]:grid-cols-4 min-[1024px]:pt-[26px]">
          {whyChooseCards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col gap-3.5 rounded-fps-medium border border-border bg-surface p-7"
            >
              <span aria-hidden="true" className="h-1 w-10 rounded-full bg-brand-accent" />
              <h3 className="text-[22px]/[normal] font-semibold text-foreground">{card.title}</h3>
              <p className="text-base/[26px] text-muted">{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
