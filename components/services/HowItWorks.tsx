import { howItWorksSteps } from "@/features/services/services";

// Figma 471:1042.
export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="bg-alternate py-[60px]">
      <div className="fps-container flex flex-col gap-9">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2 id="how-it-works-heading" className="text-[32px]/[normal] font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-base/[normal] text-muted">
            Four steps to get the support your organisation needs.
          </p>
        </div>

        <ol className="grid items-start gap-6 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-6"
            >
              <span aria-hidden="true" className="text-[30px]/[normal] font-bold text-brand-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base/[normal] font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm/[22px] text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
