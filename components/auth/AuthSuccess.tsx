"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { primaryButtonClass } from "./styles";

type AuthSuccessProps = { heading: string; body: string; action: { label: string; href: string } };

// Figma success cards: Login 136:177 and Register 142:206. Rendered only after
// the authentication provider confirms success; never while auth is unavailable.
export default function AuthSuccess({ heading, body, action }: AuthSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <>
      <span aria-hidden="true" className="grid size-16 place-items-center rounded-full bg-brand-secondary text-[30px]/[normal] font-bold text-white">
        ✓
      </span>
      <h1 ref={headingRef} tabIndex={-1} className="text-[32px]/[40px] font-bold text-foreground outline-none min-[600px]:text-[40px]/[48px]">
        {heading}
      </h1>
      <p className="text-base/[26px] text-muted">{body}</p>
      <Link href={action.href} className={primaryButtonClass}>
        {action.label}
      </Link>
    </>
  );
}
