"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { requestPasswordReset } from "@/features/auth/authService";
import { unavailableMessage } from "@/features/auth/content";
import { idleResult, type ForgotResult } from "@/features/auth/types";
import { validateEmail, validateForgot, type ForgotField, type ForgotValues } from "@/features/auth/validation";
import AuthField from "./AuthField";
import AuthNotice from "./AuthNotice";
import { primaryButtonClass } from "./styles";
import { useAuthForm } from "./useAuthForm";

const fields: readonly ForgotField[] = ["email"];

// Figma "Forgot Password" 136:236 (form card 136:259). Figma has no confirmation
// state; after a genuine provider success the form shows a neutral confirmation
// that does not reveal whether the email has an account.
export default function ForgotPasswordForm() {
  const [result, formAction, pending] = useActionState<ForgotResult, FormData>(requestPasswordReset, idleResult);
  const form = useAuthForm<ForgotValues, ForgotField>({
    initial: { email: "" },
    fields,
    result,
    action: formAction,
    validate: validateForgot,
    validateField: (_field, values) => validateEmail(values.email),
  });
  const sent = !pending && result.status === "success";
  const sentRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  const status = pending
    ? "Sending reset link…"
    : form.errorCount > 0
      ? "Please correct 1 error in the form."
      : result.status === "unavailable"
        ? `${unavailableMessage.title} ${unavailableMessage.body}`
        : result.status === "error"
          ? "Something went wrong. Please try again."
          : "";

  return (
    <>
      {sent ? (
        <>
          <h1 ref={sentRef} tabIndex={-1} className="text-[32px]/[40px] font-bold text-foreground outline-none min-[600px]:text-[40px]/[48px]">
            Check your email
          </h1>
          <p className="text-base/[26px] text-muted">
            If an account exists for that email address, we&apos;ve sent a link to reset your password.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-[32px]/[40px] font-bold text-foreground min-[600px]:text-[40px]/[48px]">Forgot password?</h1>
          <p className="text-base/[26px] text-muted">Enter your email address and we&apos;ll send you a reset link.</p>

          <p role="status" aria-live="polite" className="sr-only">
            {status}
          </p>
          {!pending && result.status === "error" ? <AuthNotice tone="error" title="Something went wrong. Please try again." /> : null}
          {!pending && result.status === "unavailable" ? (
            <AuthNotice tone="info" title={unavailableMessage.title}>
              {unavailableMessage.body}
            </AuthNotice>
          ) : null}

          <form action={formAction} onSubmit={form.onSubmit} noValidate className="contents">
            <AuthField
              id="forgot-email"
              name="email"
              type="email"
              label="Email address"
              placeholder="name@example.com"
              autoComplete="email"
              maxLength={254}
              value={form.values.email}
              onChange={(event) => form.setValue("email", event.target.value)}
              error={form.errors.email}
              inputRef={form.register("email")}
            />
            <button type="submit" disabled={pending} className={primaryButtonClass}>
              {pending ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        </>
      )}

      <Link href="/login" className="text-sm/[22px] font-semibold whitespace-pre-wrap text-brand-secondary hover:underline">
        {"←  Back to Login"}
      </Link>
    </>
  );
}
