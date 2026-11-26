import { homeSteps } from "@/features/home/home";

// Figma "How It Works" 2:14.
export default function HomeHowWeWork() {
  return (
    <section aria-labelledby="home-how-heading" className="bg-surface py-[42px]">
      <div className="fps-container flex flex-col gap-[22px]">
        <h2
          id="home-how-heading"
          className="text-[32px]/[40px] font-bold text-foreground min-[900px]:text-[40px]/[48px]"
        >
          How We Work
        </h2>
        <ol className="grid gap-7 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-4 min-[1024px]:pb-5">
          {homeSteps.map((step, index) => (
            <li
              key={step}
              className="flex flex-col gap-4 border border-border bg-background p-6 font-semibold min-[600px]:min-h-40"
            >
              <span aria-hidden="true" className="text-[22px]/[30px] text-brand-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base/6 text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
