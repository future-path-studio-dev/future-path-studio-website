import type { FieldErrors, ForgotField, LoginField, RegisterField } from "./validation";

// "unavailable" means no authentication provider is configured yet. The UI must
// never treat it as success. Passwords are never echoed back to the browser.
export type AuthResult<F extends string> =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors<F> }
  | { status: "unavailable" }
  | { status: "rejected" }
  | { status: "error" }
  | { status: "success" };

export type LoginResult = AuthResult<LoginField>;
export type RegisterResult = AuthResult<RegisterField>;
export type ForgotResult = AuthResult<ForgotField>;

export const idleResult = { status: "idle" } as const;
