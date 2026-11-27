import { supportedGroups } from "@/features/about/about";

// Figma "Who We Support" 669:3281.
export default function WhoWeSupport() {
  return (
    <section
      id="who-we-support"
      aria-labelledby="who-we-support-heading"
      className="scroll-mt-24 bg-alternate py-10 min-[1024px]:py-[60px]"
    >
      <div className="fps-container flex flex-col gap-7">
        <div className="flex flex-col gap-2.5">
          <h2
            id="who-we-support-heading"
            className="text-[28px]/[normal] font-bold text-foreground min-[900px]:text-[32px]/[normal]"
          >
            Who We Support
          </h2>
          <p className="text-base/[normal] text-muted">
            The Future Path Studio works with training organisations of every size and stage.
          </p>
        </div>
        <ul className="grid items-start gap-4 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-[repeat(3,minmax(0,378px))]">
          {supportedGroups.map((group) => (
            <li
              key={group}
              className="flex items-center gap-3 rounded-fps-medium border border-border bg-surface px-5 py-[18px]"
            >
              <span aria-hidden="true" className="text-sm/[normal] font-bold text-brand-secondary">
                ✓
              </span>
              <span className="text-[15px]/[normal] font-medium text-foreground">{group}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
