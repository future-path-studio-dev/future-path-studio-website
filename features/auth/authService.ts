"use server";

import { getAuthProvider } from "./provider";
import type { ForgotResult, LoginResult, RegisterResult } from "./types";
import {
  readForgot,
  readLogin,
  readRegister,
  validateForgot,
  validateLogin,
  validateRegister,
} from "./validation";

// Server Actions behind the Login, Register and Forgot Password forms. Each one
// re-validates the input (browser checks are only a convenience) and reports
// success only when a real authentication provider confirms it.

export async function signIn(_previous: LoginResult, formData: FormData): Promise<LoginResult> {
  const values = readLogin(formData);
  const errors = validateLogin(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const provider = getAuthProvider();
  if (!provider) return { status: "unavailable" };

  try {
    const outcome = await provider.signIn({ email: values.email.trim(), password: values.password, remember: values.remember });
    return outcome === "success" ? { status: "success" } : { status: "rejected" };
  } catch (error) {
    console.error("Sign-in failed", error);
    return { status: "error" };
  }
}

export async function register(_previous: RegisterResult, formData: FormData): Promise<RegisterResult> {
  const values = readRegister(formData);
  const errors = validateRegister(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const provider = getAuthProvider();
  if (!provider) return { status: "unavailable" };

  try {
    const outcome = await provider.register({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
    });
    return outcome === "success" ? { status: "success" } : { status: "rejected" };
  } catch (error) {
    console.error("Registration failed", error);
    return { status: "error" };
  }
}

export async function requestPasswordReset(_previous: ForgotResult, formData: FormData): Promise<ForgotResult> {
  const values = readForgot(formData);
  const errors = validateForgot(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const provider = getAuthProvider();
  if (!provider) return { status: "unavailable" };

  try {
    await provider.requestPasswordReset({ email: values.email.trim() });
    return { status: "success" };
  } catch (error) {
    console.error("Password reset request failed", error);
    return { status: "error" };
  }
}
