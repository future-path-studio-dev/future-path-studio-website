// Server-side only: imported solely by the "use server" actions in authService.ts.
// Authentication boundary. The Server Actions in authService.ts only talk to
// this interface, so connecting Supabase Auth (or another provider) means
// implementing AuthProvider and returning it from getAuthProvider(). Nothing in
// the pages or forms needs to change.
//
// No provider is configured yet (Supabase setup is tracked in issue #6), so
// getAuthProvider() returns null and every valid submission reports
// "unavailable". There are no fake users, sessions or cookies.

export type SignInOutcome = "success" | "invalid_credentials";
export type RegisterOutcome = "success" | "email_in_use";

export interface AuthProvider {
  /** Verify credentials and start a session (set the session cookies). */
  signIn(input: { email: string; password: string; remember: boolean }): Promise<SignInOutcome>;
  /** Create the client account; email confirmation may be required before sign-in. */
  register(input: { firstName: string; lastName: string; email: string; password: string }): Promise<RegisterOutcome>;
  /** Send a reset link. Must not reveal whether the email belongs to an account. */
  requestPasswordReset(input: { email: string }): Promise<void>;
}

export function getAuthProvider(): AuthProvider | null {
  return null;
}
