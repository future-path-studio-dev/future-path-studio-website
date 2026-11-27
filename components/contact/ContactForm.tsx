"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { submitEnquiry } from "@/features/enquiries/submitEnquiry";
import { initialEnquiryResult, type EnquiryResult } from "@/features/enquiries/types";
import {
  emptyEnquiry,
  enquiryFields,
  enquiryMaxLength,
  validateEnquiry,
  validateEnquiryField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@/features/enquiries/validation";

// Figma "Contact Form Card": default 403:658, validation errors 405:687,
// filled 405:790, submitting 405:888, mobile 411:929.

type FieldConfig = {
  label: string;
  placeholder: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
};

const fieldConfig: Record<EnquiryField, FieldConfig> = {
  firstName: { label: "First name", placeholder: "Your first name", autoComplete: "given-name" },
  lastName: { label: "Last name", placeholder: "Your last name", autoComplete: "family-name" },
  email: { label: "Email address", placeholder: "name@example.com", type: "email", autoComplete: "email" },
  subject: { label: "Subject", placeholder: "e.g. TAS development enquiry" },
  message: {
    label: "Message",
    placeholder: "e.g. We would like support reviewing and updating our Training and Assessment Strategy.",
    multiline: true,
  },
};

const controlClass =
  "w-full rounded-fps-medium border border-border bg-surface px-[15px] text-base/[normal] text-foreground placeholder:text-muted outline-none transition-colors focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary aria-invalid:border-[1.5px] aria-invalid:border-[#c0392b] aria-invalid:px-[14.5px] aria-invalid:focus:ring-[#c0392b]";

type FormControl = HTMLInputElement | HTMLTextAreaElement;

export default function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [result, formAction, pending] = useActionState<EnquiryResult, FormData>(
    submitEnquiry,
    initialEnquiryResult,
  );
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [handledResult, setHandledResult] = useState<EnquiryResult>(result);
  const [focusRequest, setFocusRequest] = useState(0);
  const controls = useRef<Partial<Record<EnquiryField, FormControl | null>>>({});

  // Apply a new server result once (server-side validation can still reject input).
  if (result !== handledResult) {
    setHandledResult(result);
    if (result.status === "invalid") {
      setErrors(result.errors);
      setAttempted(true);
      setFocusRequest((n) => n + 1);
    }
  }

  useEffect(() => {
    if (result.status === "success") onSuccess();
  }, [result, onSuccess]);

  useEffect(() => {
    if (focusRequest === 0) return;
    const first = enquiryFields.find((field) => errors[field]);
    if (first) controls.current[first]?.focus();
    // Only run when a new focus request is made.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest]);

  function handleChange(event: ChangeEvent<FormControl>) {
    const field = event.target.name as EnquiryField;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (attempted) {
      setErrors((current) => ({ ...current, [field]: validateEnquiryField(field, value) }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const nextErrors = validateEnquiry(values);
    setAttempted(true);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setFocusRequest((n) => n + 1);
    }
  }

  const errorCount = enquiryFields.filter((field) => errors[field]).length;
  const showUnavailable = !pending && result.status === "unavailable";
  const showFailure = !pending && result.status === "error";

  function renderField(field: EnquiryField) {
    const config = fieldConfig[field];
    const error = errors[field];
    const id = `contact-${field}`;
    const shared = {
      id,
      name: field,
      value: values[field],
      onChange: handleChange,
      placeholder: config.placeholder,
      maxLength: enquiryMaxLength[field],
      "aria-required": true,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${id}-error` : undefined,
    } as const;

    return (
      <div key={field} className="flex min-w-0 flex-1 flex-col gap-[7px] min-[600px]:gap-2">
        <label htmlFor={id} className="text-[13px]/[normal] font-semibold text-foreground min-[600px]:text-sm/[normal]">
          {config.label}
        </label>
        {config.multiline ? (
          <textarea
            {...shared}
            ref={(element) => {
              controls.current[field] = element;
            }}
            rows={4}
            className={`${controlClass} h-[110px] resize-y py-3.5 min-[600px]:h-[120px]`}
          />
        ) : (
          <input
            {...shared}
            ref={(element) => {
              controls.current[field] = element;
            }}
            type={config.type ?? "text"}
            autoComplete={config.autoComplete}
            className={`${controlClass} h-14`}
          />
        )}
        {error ? (
          <p id={`${id}-error`} className="text-[13px]/[normal] text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="flex flex-col items-start gap-4 rounded-fps-large border border-border bg-surface p-5 shadow-[0_6px_18px_rgba(15,36,56,0.1)] min-[600px]:gap-5 min-[600px]:p-9"
    >
      <h2
        id="contact-form-heading"
        className="text-xl/[normal] font-semibold text-foreground min-[600px]:text-[26px]/[normal]"
      >
        Send us a message
      </h2>
      <form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        aria-busy={pending}
        className="flex w-full flex-col gap-4 min-[600px]:gap-5"
      >
        <div className="flex flex-col gap-4 min-[600px]:flex-row min-[600px]:gap-[18px]">
          {renderField("firstName")}
          {renderField("lastName")}
        </div>
        {renderField("email")}
        {renderField("subject")}
        {renderField("message")}

        <button
          type="submit"
          disabled={pending}
          className="flex h-[52px] w-full items-center justify-center rounded-fps-medium bg-brand-primary text-base/[normal] font-semibold text-white hover:bg-brand-hover disabled:cursor-wait disabled:bg-[rgba(36,74,104,0.45)] disabled:text-[rgba(255,255,255,0.85)] min-[600px]:h-[54px]"
        >
          {pending ? "Submitting…" : "Send Message"}
        </button>

        {/* Screen-reader announcements; absolutely positioned so they add no layout gap. */}
        <div id="contact-status-sr" role="status" className="sr-only">
          {pending ? "Sending your message." : null}
          {!pending && attempted && errorCount > 0
            ? `Your message was not sent. Please correct the ${errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`}.`
            : null}
        </div>

        {/* Visible send result. Not in Figma: shown only when a send did not succeed. */}
        <div id="contact-status" aria-live="polite" className="empty:hidden">
          {showUnavailable ? (
            <p className="rounded-fps-medium border border-[#c0392b] bg-[#fdf3f2] px-4 py-3 text-sm/[22px] text-foreground">
              <strong className="font-semibold">Your message has not been sent.</strong> Online
              enquiries are not available yet. Please email us at{" "}
              <a href="mailto:hello@futurepathstudio.com" className="font-semibold text-brand-primary underline">
                hello@futurepathstudio.com
              </a>
              .
            </p>
          ) : null}
          {showFailure ? (
            <p className="rounded-fps-medium border border-[#c0392b] bg-[#fdf3f2] px-4 py-3 text-sm/[22px] text-foreground">
              <strong className="font-semibold">Your message has not been sent.</strong> Something
              went wrong. Please try again, or email us at{" "}
              <a href="mailto:hello@futurepathstudio.com" className="font-semibold text-brand-primary underline">
                hello@futurepathstudio.com
              </a>
              .
            </p>
          ) : null}
        </div>

        <p className="text-[13px]/[normal] text-muted max-[599px]:hidden">
          We look forward to hearing from you.
        </p>
      </form>
    </section>
  );
}
