"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  requestResourceEnquiry,
  type ResourceEnquiryResult,
} from "@/features/resources/requestResourceEnquiry";

type Props = { resourceSlug: string; resourceTitle: string; triggerClassName?: string };

// Figma "Resources – Enquiry Confirmation" 677:3129 (Modal / Resource Enquiry 677:3193)
// and "Enquiry Sent" 677:3203 (677:3267). The sent view only renders after the
// server reports a genuine save; with no backend it shows an honest "not sent" view.
export default function EnquiryDialog({ resourceSlug, resourceTitle, triggerClassName = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);

  function open() {
    setSession((value) => value + 1);
    dialog.current?.showModal();
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={triggerClassName}>
        Enquire About This Resource
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="resource-enquiry-title"
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes it, like the Figma overlay link.
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(460px,calc(100%-40px))] rounded-fps-large border border-border bg-surface p-0 text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop:bg-[rgba(15,36,56,0.45)]"
      >
        {session > 0 && (
          <EnquiryBody
            key={session}
            resourceSlug={resourceSlug}
            resourceTitle={resourceTitle}
            onClose={close}
          />
        )}
      </dialog>
    </>
  );
}

function EnquiryBody({
  resourceSlug,
  resourceTitle,
  onClose,
}: {
  resourceSlug: string;
  resourceTitle: string;
  onClose: () => void;
}) {
  const [result, formAction, pending] = useActionState<ResourceEnquiryResult, FormData>(
    requestResourceEnquiry,
    { status: "idle" },
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const sendButton = useRef<HTMLButtonElement>(null);

  // The dialog opens before this body mounts, so move focus in once it renders,
  // and to the result heading when the server responds.
  useEffect(() => {
    if (result.status === "idle") sendButton.current?.focus();
    else heading.current?.focus();
  }, [result.status]);

  const buttonBase =
    "flex flex-1 items-center justify-center rounded-fps-medium border px-5 py-[13px] text-sm/[normal] font-semibold";

  if (result.status === "success") {
    return (
      <div className="flex flex-col items-start gap-2.5 p-6 min-[600px]:p-10">
        <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-[#e9f3ea] text-xl/[normal] font-bold text-success">
          ✓
        </span>
        <p className="mt-1 text-xs/[normal] font-semibold tracking-[1px] text-success">ENQUIRY SENT</p>
        <h2 id="resource-enquiry-title" ref={heading} tabIndex={-1} className="text-xl/[normal] font-semibold outline-none">
          Thanks — your enquiry has been sent
        </h2>
        <p className="text-[15px]/6 text-muted">
          We have received your enquiry about {result.resourceTitle} and will be in touch.
        </p>
        <div className="mt-3.5 flex w-full">
          <button type="button" onClick={onClose} className={`${buttonBase} border-brand-primary bg-brand-primary text-white hover:bg-brand-hover`}>
            Done
          </button>
        </div>
      </div>
    );
  }

  if (result.status === "unavailable" || result.status === "error") {
    return (
      <div role="alert" className="flex flex-col items-start gap-2.5 p-6 min-[600px]:p-10">
        <p className="text-xs/[normal] font-semibold tracking-[1px] text-warning">ENQUIRY NOT SENT</p>
        <h2 id="resource-enquiry-title" ref={heading} tabIndex={-1} className="text-xl/[normal] font-semibold outline-none">
          Your enquiry has not been sent
        </h2>
        <p className="text-[15px]/6 text-muted">
          {result.status === "unavailable"
            ? "Online enquiries are not available yet. "
            : "Something went wrong and your enquiry was not sent. "}
          Please email us at{" "}
          <a href="mailto:hello@futurepathstudio.com" className="font-medium text-brand-secondary underline">
            hello@futurepathstudio.com
          </a>{" "}
          or use the contact form.
        </p>
        <div className="mt-3.5 flex w-full flex-col gap-3 min-[600px]:flex-row">
          <Link href="/contact" className={`${buttonBase} border-brand-primary bg-brand-primary text-white hover:bg-brand-hover`}>
            Go to Contact
          </Link>
          <button type="button" onClick={onClose} className={`${buttonBase} border-border bg-surface text-muted hover:bg-alternate`}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col items-start gap-2.5 p-6 min-[600px]:p-10">
      <input type="hidden" name="resourceSlug" value={resourceSlug} />
      <p className="text-xs/[normal] font-semibold tracking-[1px] text-brand-secondary">RESOURCE ENQUIRY</p>
      <h2 id="resource-enquiry-title" className="text-xl/[normal] font-semibold">
        {resourceTitle}
      </h2>
      <p className="text-[15px]/6 text-muted">
        Send an enquiry about this resource and we will be in touch to discuss scope and what would
        suit your organisation.
      </p>
      <div className="mt-3.5 flex w-full flex-col gap-3 min-[600px]:flex-row">
        <button
          ref={sendButton}
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className={`${buttonBase} cursor-pointer border-brand-primary bg-brand-primary text-white hover:bg-brand-hover disabled:cursor-wait disabled:opacity-70`}
        >
          {pending ? "Sending…" : "Send Enquiry"}
        </button>
        <button type="button" onClick={onClose} className={`${buttonBase} cursor-pointer border-border bg-surface text-muted hover:bg-alternate`}>
          Cancel
        </button>
      </div>
    </form>
  );
}
