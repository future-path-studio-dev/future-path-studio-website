# Contact page implementation notes

Phase 2 Contact work on `feature/w2-binaya-contact`, based on `develop` (which includes the shared public layout, Services and Homepage from PRs #8–#10). Figma file `lagZ6ViqHTzVpszZMTW9u4`.

## Figma frames

| State | Figma frame | Implementation |
| --- | --- | --- |
| Default (desktop 1440) | `403:610` | `app/(public)/contact/page.tsx` |
| Default (mobile 390) | `411:897` | Same components, below 600 px |
| Validation errors | `405:652` (card `405:687`) | `components/contact/ContactForm.tsx` |
| Filled | `405:755` (card `405:790`) | Controlled inputs in `ContactForm.tsx` |
| Submitting | `405:853` (card `405:888`) | Disabled button reading "Submitting…" |
| Success | `405:953` (card `405:988`) | `components/contact/ContactSuccess.tsx` |

Sections:
- Contact Hero: `components/contact/ContactHero.tsx`
- Get In Touch: `components/contact/GetInTouch.tsx`
- Form card: `components/contact/ContactForm.tsx`, inside `ContactMain.tsx`
- FAQ strip, with View FAQ linking to `/faq`: `components/contact/FaqStrip.tsx`

## Behaviour

- **Validation runs in two places with the same rules** (`features/enquiries/validation.ts`):
  - in the browser, for instant feedback
  - in the `submitEnquiry` Server Action, which is the check that counts
- **Required fields:** all five fields are required, and whitespace-only values are rejected. Email needs a basic `name@domain.tld` shape.
- **Error copy:** the empty and invalid messages come from `405:652`. The maximum-length messages (100 / 100 / 254 / 150 / 5000 characters) are not in Figma.
- **Error display:**
  - Errors appear after the first submit attempt, then update as the user types.
  - Invalid fields get a 1.5px `#c0392b` border, `aria-invalid="true"`, and `aria-describedby` pointing to their error text.
  - Focus moves to the first invalid field.
  - A screen-reader-only live region announces how many fields need fixing, and announces "Sending your message." while submitting.
- **Submitting:** the button is disabled and reads "Submitting…", using the Figma colours (`rgba(36,74,104,0.45)` with 85% white text). The form also gets `aria-busy`.
- **Success:** the two cards are replaced by the full-width success card, and focus moves to its heading. This only happens when the Server Action returns `{ status: "success" }`, which requires a configured enquiry store that has actually saved the message.
- **No backend (current state):** the action returns `{ status: "unavailable" }`.
  - The form shows: "Your message has not been sent. Online enquiries are not available yet. Please email us at hello@futurepathstudio.com." The email address comes from Figma.
  - The entered values are kept.
  - This message is not in Figma.
- **Save failure:** if the store throws, the form shows a similar "has not been sent" message with a retry suggestion.

## Making real submissions work

The integration boundary is `features/enquiries/store.ts`. `getEnquiryStore()` currently returns `null`. Nothing else needs to change in the page or the action. The Supabase foundation is owned by Prokash (W1.3, issue #6). Real submissions need the following.

1. **Table**, for example `public.enquiries`, created through a versioned migration:

   | Column | Type | Notes |
   | --- | --- | --- |
   | `id` | `uuid` | Primary key, `default gen_random_uuid()` |
   | `first_name` | `text` | Not null, ≤ 100 characters |
   | `last_name` | `text` | Not null, ≤ 100 characters |
   | `email` | `text` | Not null, ≤ 254 characters |
   | `subject` | `text` | Not null, ≤ 150 characters |
   | `message` | `text` | Not null, ≤ 5000 characters |
   | `source` | `text` | Not null, `'contact-page'` |
   | `status` | `text` | Not null, default `'new'` (for the admin enquiries view in Phase 5) |
   | `created_at` | `timestamptz` | Not null, `default now()` |

   Add `check` constraints that match the lengths in `validation.ts`.

2. **Environment variables**, set in Vercel and `.env.local` but never committed:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` for a server-only insert. Use the anon key instead if you go with the RLS insert policy below.

   `getEnquiryStore()` should return the Supabase store only when these are present.

3. **Row Level Security:**
   - Enable RLS on `enquiries`.
   - If inserts use the anon key, add an `insert` policy for `anon` with `with check (true)` and no `select`, `update` or `delete` for `anon`.
   - Restrict reads to authenticated admin users.
   - The Server Action runs only on the server, so a service-role insert also works. Either way, the key must never be exposed to the client.

4. **Spam protection:** none is implemented yet. Before going live, add at least one of these, enforced in `submitEnquiry` before the store is called:
   - a hidden honeypot field
   - per-IP rate limiting (for example Vercel KV or Upstash)
   - a CAPTCHA such as Cloudflare Turnstile

5. **Notification email:** decide whether the studio should be emailed for each enquiry, for example through Resend, Postmark or a Supabase database webhook. Also decide on the recipient address. The success copy promises a reply "using the email address you provided", so someone has to monitor enquiries.

6. **Privacy:** the form collects personal information. Link a privacy policy before launch. The footer's "Privacy Policy" link is still a placeholder.

## Differences from Figma

- **"What happens next?" panel:** Figma clips it to 10px high (`405:1037`), so it shows as a thin bar. It is shown at full height here so the approved copy is readable.
- **Message placeholder:** it sits at the top-left of the textarea and wraps, as a real multi-line field does. Figma draws it vertically centred on one clipped line.
- **Mobile heading:** at 390 px it wraps onto two lines. Figma lets it overflow the 390 px frame.
- **Not in Figma:**
  - the "not sent" message
  - the maximum-length errors
  - a visible teal focus ring (Figma only specifies a "Focus (teal border)" state)
- **Social icons:** they stay inert, as Figma notes ("Prototype only — social links are not connected."). No profile URLs have been approved.
- **Email address:** it is a `mailto:` link. Figma shows it as plain text.
- **Icon glyphs** (✉ ✆ ◎ ✓) are text characters, as in Figma, so their exact shape depends on the system font.
- **Footer:** the shared footer does not show Figma's placeholder line "Email / Phone / Social links". That belongs to the shared layout (PR #8).

## Pending client or team decisions

- Phone number (Figma: "Available on request").
- Social media profile URLs.
- Whether `hello@futurepathstudio.com` is the real enquiry address.
- Notification recipient and spam-protection approach.
- Privacy policy content and URL.
