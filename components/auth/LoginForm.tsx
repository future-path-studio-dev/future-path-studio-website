"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signIn } from "@/features/auth/authService";
import { unavailableMessage } from "@/features/auth/content";
import { idleResult, type LoginResult } from "@/features/auth/types";
import { loginFields, validateLogin, validateLoginField, type LoginField, type LoginValues } from "@/features/auth/validation";
import AuthCheckbox from "./AuthCheckbox";
import AuthField from "./AuthField";
import AuthNotice from "./AuthNotice";
import AuthSuccess from "./AuthSuccess";
import { primaryButtonClass } from "./styles";
import { useAuthForm } from "./useAuthForm";

// Figma Login form card: default 11:9, filled 136:84, error 136:141, success 136:200.
export default function LoginForm() {
  const [result, formAction, pending] = useActionState<LoginResult, FormData>(signIn, idleResult);
  const form = useAuthForm<LoginValues, LoginField>({
    initial: { email: "", password: "", remember: false },
    fields: loginFields,
    result,
    action: formAction,
    validate: validateLogin,
    validateField: validateLoginField,
  });
  const [googleNotice, setGoogleNotice] = useState(false);

  if (!pending && result.status === "success") {
    return (
      <AuthSuccess
        heading="Login successful."
        body="Welcome back! You have signed in to The Future Path Studio."
        action={{ label: "Continue", href: "/" }}
      />
    );
  }

  const rejected = !pending && result.status === "rejected";
  const status = pending
    ? "Logging in…"
    : form.errorCount > 0
      ? `Please correct ${form.errorCount === 1 ? "1 error" : `${form.errorCount} errors`} in the form.`
      : result.status === "unavailable"
        ? `${unavailableMessage.title} ${unavailableMessage.body}`
        : rejected
          ? "Incorrect email or password. Please try again."
          : result.status === "error"
            ? "Something went wrong. Please try again."
            : googleNotice
              ? "Continue with Google is not available yet."
              : "";

  return (
    <>
      <h1 className="text-[32px]/[40px] font-bold text-foreground min-[600px]:text-[40px]/[48px]">Login</h1>
      <p className="text-base/[26px] text-muted">Enter your account details to continue.</p>

      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
      {rejected ? <AuthNotice id="login-error" tone="error" title="Incorrect email or password. Please try again." /> : null}
      {!pending && result.status === "error" ? <AuthNotice tone="error" title="Something went wrong. Please try again." /> : null}
      {!pending && result.status === "unavailable" ? (
        <AuthNotice tone="info" title={unavailableMessage.title}>
          {unavailableMessage.body}
        </AuthNotice>
      ) : null}

      <form action={formAction} onSubmit={form.onSubmit} noValidate className="contents">
        <AuthField
          id="login-email"
          name="email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
          autoComplete="email"
          value={form.values.email}
          onChange={(event) => form.setValue("email", event.target.value)}
          error={form.errors.email}
          invalid={rejected}
          describedBy={rejected ? "login-error" : undefined}
          inputRef={form.register("email")}
          maxLength={254}
        />
        <AuthField
          id="login-password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={form.values.password}
          onChange={(event) => form.setValue("password", event.target.value)}
          error={form.errors.password}
          invalid={rejected}
          describedBy={rejected ? "login-error" : undefined}
          inputRef={form.register("password")}
        />

        <div className="flex min-h-7 w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <AuthCheckbox
            id="login-remember"
            name="remember"
            label="Remember me"
            checked={form.values.remember}
            onChange={(event) => form.setValue("remember", event.target.checked)}
          />
          <Link href="/forgot-password" className="text-sm/[22px] font-semibold text-brand-secondary hover:underline">
            Forgot password?
          </Link>
        </div>

        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Logging in…" : "Login"}
        </button>
      </form>

      {/* Figma divider 11:27 ("————   OR   ————", 12px medium): two 143px rules around "OR". */}
      <p className="flex w-full items-center gap-[11px] text-xs/[18px] font-medium text-muted">
        <span aria-hidden="true" className="h-px max-w-[143px] flex-1 bg-muted" />
        OR
        <span aria-hidden="true" className="h-px max-w-[143px] flex-1 bg-muted" />
      </p>

      {/* Figma note 228:198 lists "Continue with Google" as out of the prototype scope. */}
      <button
        type="button"
        onClick={() => setGoogleNotice(true)}
        aria-describedby={googleNotice ? "google-notice" : undefined}
        className="flex h-[54px] w-full shrink-0 items-center justify-center rounded-fps-medium border border-brand-secondary bg-surface px-6 text-base/6 font-semibold text-brand-secondary hover:bg-alternate"
      >
        Continue with Google
      </button>
      {googleNotice ? (
        <AuthNotice id="google-notice" tone="info" title="Continue with Google is not available yet.">
          Google sign-in has not been set up. For help, email hello@futurepathstudio.com.
        </AuthNotice>
      ) : null}

      <p className="w-full text-sm/[22px] whitespace-pre-wrap text-muted">
        {"New to The Future Path Studio?  "}
        <Link href="/register" className="underline-offset-2 hover:text-foreground hover:underline">
          Register
        </Link>
      </p>
    </>
  );
}
