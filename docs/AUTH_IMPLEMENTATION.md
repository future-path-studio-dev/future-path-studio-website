# Authentication UI implementation notes

Login, Register and Forgot Password on `feature/w2-binaya-auth`, based on `develop` (which includes the shared public layout, Services and Homepage from PRs #8–#10). Figma file `lagZ6ViqHTzVpszZMTW9u4`.

**Real authentication is not connected.** No Supabase package, client or environment variables exist in the repository, and the Supabase setup (issue #6) has no branch yet. The forms validate input and then report that account access is not available yet. They never show a success state, never create a user or session, never set cookies and never redirect into a protected area.

## Figma frames

| Route | Figma frame | State |
| --- | --- | --- |
| `/login` | `10:2` Login – Desktop 1440 | Default (with the real illustration `258:125`) |
| | `136:61` Login – Filled | Values entered |
| | `136:118` Login – Error | Banner "Incorrect email or password. Please try again." and both fields red. Shown only if a real provider rejects the credentials. |
| | `136:177` Login – Success | "Login successful." card. Shown only after a real provider confirms sign-in. |
| `/register` | `10:26` Register – Desktop 1440 | Default (with the real illustration `258:126`), Register disabled |
| | `142:8` Register – Filled (Terms unchecked) | Register disabled |
| | `142:73` Register – Ready (Terms accepted) | Register enabled |
| | `142:139` Register – Validation Error | "Please enter a valid email address." and "Passwords do not match." |
| | `142:206` Register – Success | "Registration complete" card. Shown only after a real provider creates the account. |
| `/forgot-password` | `136:236` Forgot Password | Default |
| Components | `132:23` Input Field, `132:14` Checkbox, `132:10` Primary Button, `207:41` Terms + Register | Default, Focus, Filled, Error, Hover, Pressed, Disabled |

The prototype-state frames show "CLIENT PORTAL/ACCOUNT ILLUSTRATION" placeholders in the illustration slot. The default frames contain the real illustrations, which are used in every state.

## Files

- `app/(auth)/login/page.tsx`, `register/page.tsx`, `forgot-password/page.tsx` replace the "Coming Soon" stubs. They render inside the existing `app/(auth)/layout.tsx`, which provides the shared Navbar and Footer.
- `components/auth/`:
  - `AuthShell.tsx`: two-panel layout and illustration crop
  - `AuthField.tsx`: input states
  - `AuthCheckbox.tsx`
  - `AuthNotice.tsx`: the Figma error banner and the "not available" notice
  - `AuthSuccess.tsx`: the Figma success cards
  - `LoginForm.tsx`, `RegisterForm.tsx`, `ForgotPasswordForm.tsx`
  - `useAuthForm.ts`: shared form state, validation and focus handling
  - `styles.ts`: Primary Button classes
- `features/auth/`:
  - `validation.ts`: one set of rules for the browser and the server
  - `types.ts`
  - `content.ts`: Figma panel copy and the "not available" message
  - `provider.ts`: the `AuthProvider` boundary, which currently returns `null`
  - `authService.ts`: the `signIn`, `register` and `requestPasswordReset` Server Actions
- `public/images/auth/login-illustration.png` (824×600) and `register-illustration.png` (824×680) are unedited Figma exports. Figma draws each at 2× inside a 412px frame, offset by (-206, -159) and (-206, -179). The pages reproduce that with CSS.

## Behaviour

- **Validation.** The same rules run in the browser and in the Server Actions.
  - Email must be present and look like `name@domain.tld` (Figma rejects `alex.taylor@email`).
  - The login password is required.
  - The registration password needs 8–128 characters, and the confirmation must match.
  - Names are required, 80 characters maximum.
  - Terms must be accepted.
- **Accessibility.**
  - Each invalid field gets `aria-invalid`, plus `aria-describedby` pointing to its message.
  - Focus moves to the first invalid field.
  - A polite live region announces the error count, the submitting state and the result.
  - Success headings receive focus.
- **Terms gate.** As Figma `207:41` specifies, Register stays disabled until the terms box is ticked.
- **Submitting state.** Figma has no dedicated loading frame. While a request runs, the button shows "Logging in…", "Registering…" or "Sending…" and uses the Figma Disabled colours.
- **Continue with Google.** The canvas note `228:198` marks this control as out of scope. It shows "Continue with Google is not available yet." instead of doing nothing.
- **Form reset.** The form keeps `action={formAction}` so it works before hydration. With JavaScript, submission is dispatched from `onSubmit` instead, which avoids React's automatic form reset clearing the ticked checkboxes.

## Not in Figma (decisions)

- **Password visibility toggle:** none is designed, so none is shown.
- **Required-field messages and the 8-character rule:** Figma only shows the invalid-email and mismatch messages. The others are in `features/auth/validation.ts`, and the minimum length should be confirmed.
- **"Account access is not available yet." notice:** appears after a valid submission while no provider is configured.
- **Forgot Password confirmation ("Check your email"):** Figma has none. It appears only after a real provider accepts the request, and does not reveal whether the email has an account.
- **Mobile and tablet layout:** Figma has no mobile auth frames. Below 1200px the layout follows the FAQ mobile frame (`411:805`): the information panel becomes a compact band, the illustration and benefits are hidden, and the form card is full width.
- **Removed spacer:** the empty 100×100 frame (`277:201`) under the Register heading isn't used in any Register state, so it is left out.
- **Login success "Continue":** goes to `/` because the client portal doesn't exist yet.
- **Terms and Privacy Policy:** plain text, because those pages don't exist yet.

## Remaining visual differences

- The shared Navbar highlights Login on `/login`. The Figma auth frames show it unhighlighted. This is Phase 1 Navbar behaviour.
- The shared footer doesn't show Figma's placeholder "Email / Phone / Social links" line. This is Phase 1 Footer scope.
- The "OR" divider is drawn as two 143px rules. Figma uses a run of em-dash characters, which wraps on narrow screens.

## What the backend developer needs to connect real authentication

1. **Packages:** `@supabase/supabase-js` and `@supabase/ssr`.
2. **Environment** (`.env.local` and Vercel; never commit real values):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the publishable key)
   - optionally `SUPABASE_SERVICE_ROLE_KEY`, server-only, for admin tasks; never expose it to the browser
3. **Clients:** a server client built with `createServerClient` that reads and writes cookies through `next/headers`, and a browser client built with `createBrowserClient` if client-side auth state is needed.
4. **Session refresh:** a root `proxy.ts` (Next 16's replacement for middleware) that refreshes the Supabase session cookies on each request. Its matcher should cover the portal routes (`/client/:path*`, `/admin/:path*`) and the auth routes. Read `node_modules/next/dist/docs/01-app/02-guides/authentication.md` first. Coordinate with the scoped `/services/:slug` proxy suggested in `docs/SERVICES_IMPLEMENTATION.md`, because there can only be one `proxy.ts`.
5. **Provider:** implement `AuthProvider` in `features/auth/provider.ts` and return it from `getAuthProvider()`:
   - `signIn` → `supabase.auth.signInWithPassword`. Map an invalid-credentials error to `"invalid_credentials"`. "Remember me" can control the session cookie lifetime.
   - `register` → `supabase.auth.signUp` with `options.data` containing `first_name` and `last_name`, and `emailRedirectTo` set to the confirmation URL.
   - `requestPasswordReset` → `supabase.auth.resetPasswordForEmail(email, { redirectTo })`. Always resolve, so the response doesn't reveal whether an account exists.
6. **Redirect URLs:** add the site URL plus `/auth/confirm` (an email-confirmation route handler that exchanges the code for a session) and `/reset-password` to the Supabase Auth allowed redirect URLs, for local, preview and production.
7. **Still to build:**
   - a `/reset-password` page that sets the new password with `supabase.auth.updateUser` after the reset link signs the user in
   - the `/auth/confirm` route handler
   - a sign-out action
8. **Roles:** store client and admin roles in a `profiles` table keyed by `auth.users.id`, or in `app_metadata`. Check the role on the server in the portal layouts and data access, not only in the proxy.
9. **Security:**
   - Enable RLS on every table. Users can read and update only their own profile; admins are checked with a role-aware policy.
   - Turn on email confirmation, Supabase's built-in rate limits and CAPTCHA (Turnstile) for sign-up and reset.
   - Update the Login success "Continue" link to the client portal once it exists.

## Pending client items

- Confirm the password rules (minimum length and any complexity).
- Provide the Terms and Privacy Policy content and pages.
- Decide whether Google sign-in is wanted (it needs a Google OAuth app and Supabase provider settings).
- Confirm the help email (hello@futurepathstudio.com, taken from the Contact design) used in the "not available" message.
- **For later review:** `public/images/auth/register-illustration.png` is byte-identical to `public/images/faq/faq-illustration.png`. Both are kept unchanged for now. Confirm whether the two pages should share one illustration file or use different artwork.
