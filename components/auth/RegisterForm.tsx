"use client";

import Link from "next/link";
import { useActionState, type ChangeEvent } from "react";
import { register } from "@/features/auth/authService";
import { unavailableMessage } from "@/features/auth/content";
import { idleResult, type RegisterResult } from "@/features/auth/types";
import {
  registerFields,
  validateRegister,
  validateRegisterField,
  type RegisterField,
  type RegisterValues,
} from "@/features/auth/validation";
import AuthCheckbox from "./AuthCheckbox";
import AuthField from "./AuthField";
import AuthNotice from "./AuthNotice";
import AuthSuccess from "./AuthSuccess";
import { primaryButtonClass } from "./styles";
import { useAuthForm } from "./useAuthForm";

// Figma Register form card: default 12:9, filled (terms unchecked) 142:23,
// ready (terms accepted) 142:88, validation error 142:162, success 142:229.
// "Terms + Register" 207:41: the Register button stays disabled until the terms
// box is ticked.
export default function RegisterForm() {
  const [result, formAction, pending] = useActionState<RegisterResult, FormData>(register, idleResult);
  const form = useAuthForm<RegisterValues, RegisterField>({
    initial: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", terms: false },
    fields: registerFields,
    result,
    action: formAction,
    validate: validateRegister,
    validateField: validateRegisterField,
    dependents: { password: ["confirmPassword"] },
  });

  if (!pending && result.status === "success") {
    return (
      <AuthSuccess
        heading="Registration complete"
        body="Your account has been created successfully."
        action={{ label: "Continue to Login", href: "/login" }}
      />
    );
  }

  const status = pending
    ? "Registering…"
    : form.errorCount > 0
      ? `Please correct ${form.errorCount === 1 ? "1 error" : `${form.errorCount} errors`} in the form.`
      : result.status === "unavailable"
        ? `${unavailableMessage.title} ${unavailableMessage.body}`
        : result.status === "rejected"
          ? "We could not create an account with these details."
          : result.status === "error"
            ? "Something went wrong. Please try again."
            : "";

  const text = (field: Exclude<RegisterField, "terms">) => ({
    value: form.values[field],
    onChange: (event: ChangeEvent<HTMLInputElement>) => form.setValue(field, event.target.value),
    error: form.errors[field],
    inputRef: form.register(field),
    height: 52 as const,
  });

  return (
    <>
      <h1 className="text-[32px]/[40px] font-bold text-foreground min-[600px]:text-[40px]/[48px]">Create an account</h1>
      <p className="text-base/[26px] text-muted">Enter your details to get started.</p>

      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
      {!pending && result.status === "rejected" ? (
        <AuthNotice tone="error" title="We could not create an account with these details. If you already have an account, try logging in." />
      ) : null}
      {!pending && result.status === "error" ? <AuthNotice tone="error" title="Something went wrong. Please try again." /> : null}
      {!pending && result.status === "unavailable" ? (
        <AuthNotice tone="info" title={unavailableMessage.title}>
          {unavailableMessage.body}
        </AuthNotice>
      ) : null}

      <form action={formAction} onSubmit={form.onSubmit} noValidate className="contents">
        <AuthField id="register-first-name" name="firstName" label="First name" placeholder="Your first name" autoComplete="given-name" maxLength={80} {...text("firstName")} />
        <AuthField id="register-last-name" name="lastName" label="Last name" placeholder="Your last name" autoComplete="family-name" maxLength={80} {...text("lastName")} />
        <AuthField id="register-email" name="email" type="email" label="Email address" placeholder="name@example.com" autoComplete="email" maxLength={254} {...text("email")} />
        <AuthField id="register-password" name="password" type="password" label="Password" placeholder="Create a password" autoComplete="new-password" describedBy="register-password-hint" {...text("password")} />
        <p id="register-password-hint" className="sr-only">
          Use at least 8 characters.
        </p>
        <AuthField id="register-confirm-password" name="confirmPassword" type="password" label="Confirm password" placeholder="Re-enter your password" autoComplete="new-password" {...text("confirmPassword")} />

        <div className="flex w-full flex-col gap-3.5">
          <AuthCheckbox
            id="register-terms"
            name="terms"
            label="I agree to the Terms and Privacy Policy."
            className="min-h-[42px]"
            checked={form.values.terms}
            onChange={(event) => form.setValue("terms", event.target.checked)}
            invalid={Boolean(form.errors.terms)}
            describedBy={form.errors.terms ? "register-terms-error" : undefined}
            inputRef={form.register("terms")}
          />
          {form.errors.terms ? (
            <p id="register-terms-error" className="-mt-2 text-[13px]/[normal] text-[#c0392b]">
              {form.errors.terms}
            </p>
          ) : null}
          <button type="submit" disabled={pending || !form.values.terms} className={primaryButtonClass}>
            {pending ? "Registering…" : "Register"}
          </button>
        </div>
      </form>

      <p className="w-full text-sm/[22px] whitespace-pre-wrap text-muted">
        {"Already have an account?  "}
        <Link href="/login" className="underline-offset-2 hover:text-foreground hover:underline">
          Login
        </Link>
      </p>
    </>
  );
}
