import type { ReactNode } from "react";

// Figma "Get In Touch" 403:630 (desktop) and 411:909 (mobile).
const socialPlatforms = [
  { label: "Facebook", mark: "f" },
  { label: "LinkedIn", mark: "in" },
  { label: "Instagram", mark: "◉" },
] as const;

function ContactItem({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 min-[600px]:gap-4">
      <span
        aria-hidden="true"
        className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-[rgba(47,125,122,0.14)] text-[15px]/[normal] text-brand-secondary min-[600px]:size-11 min-[600px]:rounded-[10px] min-[600px]:text-[17px]/[normal]"
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 min-[600px]:gap-[3px]">
        <h3 className="text-[15px]/[normal] font-semibold text-foreground min-[600px]:text-base/[normal]">
          {label}
        </h3>
        <div className="text-[13px]/[normal] break-words text-muted min-[600px]:text-sm/[normal]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function GetInTouch() {
  return (
    <section
      aria-labelledby="get-in-touch-heading"
      className="flex flex-col items-start gap-4 rounded-fps-large border border-border bg-surface p-5 shadow-[0_6px_18px_rgba(15,36,56,0.1)] min-[600px]:gap-6 min-[600px]:p-8"
    >
      <h2
        id="get-in-touch-heading"
        className="text-xl/[normal] font-semibold text-foreground min-[600px]:text-[26px]/[normal]"
      >
        Get in touch
      </h2>
      <div className="flex w-full flex-col gap-4 min-[600px]:gap-6">
        <ContactItem icon="✉" label="Email">
          <a href="mailto:hello@futurepathstudio.com" className="hover:text-brand-secondary hover:underline">
            hello@futurepathstudio.com
          </a>
        </ContactItem>
        <ContactItem icon="✆" label="Phone">
          Available on request
        </ContactItem>
        <ContactItem icon="◎" label="Social Media">
          <span className="min-[600px]:hidden">Follow us for updates.</span>
          <span className="max-[599px]:hidden">Follow us for updates and practical resources.</span>
        </ContactItem>
      </div>
      {/* Figma shows these as inert prototype icons; no real profiles are linked yet. */}
      <ul aria-label="Social media profiles (not yet connected)" className="flex gap-3 max-[599px]:hidden">
        {socialPlatforms.map((platform) => (
          <li key={platform.label}>
            <span
              role="img"
              aria-label={platform.label}
              className="grid size-10 place-items-center rounded-full bg-brand-primary text-[13px]/[normal] font-bold text-white"
            >
              <span aria-hidden="true">{platform.mark}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs/[normal] text-muted max-[599px]:hidden">
        Prototype only — social links are not connected.
      </p>
    </section>
  );
}
