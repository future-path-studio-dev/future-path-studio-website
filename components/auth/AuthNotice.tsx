import type { ReactNode } from "react";

type AuthNoticeProps = {
  id?: string;
  tone: "error" | "info";
  title: string;
  children?: ReactNode;
};

// "error" is the Figma Login error banner (136:175). "info" is not in Figma; it
// tells people that account access is not available yet instead of faking success.
export default function AuthNotice({ id, tone, title, children }: AuthNoticeProps) {
  if (tone === "error") {
    return (
      <div id={id} className="flex min-h-12 w-full items-center rounded-lg border border-[rgba(192,57,43,0.35)] bg-[#fbece9] px-4 py-[13px]">
        <p className="text-sm/[normal] font-semibold text-[#c0392b]">{title}</p>
      </div>
    );
  }
  return (
    <div id={id} className="flex w-full flex-col gap-1 rounded-lg border border-border bg-alternate px-4 py-[13px]">
      <p className="text-sm/[normal] font-semibold text-foreground">{title}</p>
      {children ? <p className="text-sm/[22px] text-muted">{children}</p> : null}
    </div>
  );
}
