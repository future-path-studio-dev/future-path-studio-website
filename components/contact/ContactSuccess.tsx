"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Figma "Contact Form Card" in 405:953 ("Contact Us – Success"). Rendered only
// after submitEnquiry returns { status: "success" }, i.e. the enquiry store
// confirmed the message was saved.
export default function ContactSuccess() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section
      aria-labelledby="contact-success-heading"
      className="flex flex-col items-center gap-[18px] rounded-fps-large border border-border bg-surface px-5 py-10 text-center shadow-[0_6px_18px_rgba(15,36,56,0.1)] min-[600px]:px-9 min-[600px]:py-[52px]"
    >
      <span
        aria-hidden="true"
        className="grid size-[76px] place-items-center rounded-full bg-brand-secondary text-[34px]/[normal] font-bold text-white"
      >
        ✓
      </span>
      <p className="text-[13px]/[normal] font-semibold tracking-[1px] text-brand-accent">MESSAGE SENT</p>
      <h2
        id="contact-success-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-[26px]/[normal] font-bold text-foreground outline-none min-[600px]:text-[32px]/[normal]"
      >
        Thank you for contacting us
      </h2>
      <p className="max-w-[520px] text-[17px]/[normal] text-muted">
        Your message has been sent successfully. We’ll review your enquiry and get back to you
        soon.
      </p>
      {/* Figma clips this panel to 10px high (405:1037); it is shown at full height here. */}
      <div className="flex w-full max-w-[560px] flex-col gap-2 rounded-[10px] bg-alternate px-6 py-[18px] text-left">
        <h3 className="text-[15px]/[normal] font-semibold text-foreground">What happens next?</h3>
        <p className="text-sm/[normal] text-muted">
          We will review your enquiry and respond using the email address you provided.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3.5">
        <Link
          href="/"
          className="flex h-[52px] w-[200px] items-center justify-center rounded-fps-medium bg-brand-primary text-base/[normal] font-semibold text-white hover:bg-brand-hover"
        >
          Return Home
        </Link>
        <Link
          href="/services"
          className="flex items-center rounded-fps-medium border border-brand-primary bg-surface px-[26px] py-[14px] text-base/[normal] font-semibold text-brand-primary hover:bg-alternate"
        >
          Explore Services
        </Link>
      </div>
    </section>
  );
}
