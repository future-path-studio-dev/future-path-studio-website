# Services implementation notes

Phase 2 Services work on `feature/w2-binaya-services`. Figma file `lagZ6ViqHTzVpszZMTW9u4`.

## Routes and Figma frames

| Route | Figma frame |
| --- | --- |
| `/services` | Services – Overview `471:955` |
| `/services?category=compliance-quality` | `667:3302` |
| `/services?category=training-systems-resources` | `667:3416` |
| `/services?category=capability-advisory` | `667:3530` |
| `/services/rto-compliance-consulting` | `475:1050` |
| `/services/validation-moderation-reviews` | `475:1368` |
| `/services/tas-development` | `475:1262` |
| `/services/llnd-support-resources` | `475:1156` |
| `/services/business-advisory` | `475:1474` |
| `/services/professional-development` | `475:1580` |

All content lives in `features/services/services.ts`. The detail pages share `components/services/ServiceDetail.tsx`.

## Approved design decisions

- Long service titles wrap. Figma clips them on four detail frames.
- The final CTA content (heading, description and button) is centred, with balanced heading wrapping. This intentionally differs from Figma `471:1119`, where the heading is left-aligned.
- The final CTA and the shared footer use compact vertical padding (CTA 48px mobile / 56px desktop, footer 40px desktop) instead of Figma's 70px CTA padding and 250px minimum footer height.
- "Request a Consultation" links to `/contact` until Services & Booking (`469:953`) is built. A note under the button says it opens a contact enquiry, not a confirmed booking.

## Pending client approval

- **Services FAQ answers.** Figma shows the five questions only in the closed state. The answers are draft copy, and each one is labelled "Draft answer – pending client approval" in the UI. To approve an answer, set `approved: true` on it in `servicesFaqs`.
- **Booking destination.** Confirm where "Request a Consultation" should go after Phase 3.

## Unknown service slugs return HTTP 200

**Symptom.** `/services/<unknown-slug>` renders the 404 page but responds with status `200`.

**Cause.** `cacheComponents` is enabled in `next.config.ts`. For a slug not returned by `generateStaticParams`, Next.js starts the response by sending the prerendered shell (layout, Navbar, preload headers) with `200 OK`. The page then reads `params`, and `notFound()` runs during the request-time render. By then the status code has already been sent and cannot change. This is documented in `node_modules/next/dist/docs/01-app/02-guides/streaming.md` ("The HTTP contract"). `dynamicParams = false` would normally reject unknown params, but it is not available when Cache Components is enabled.

**SEO impact: low.** Next.js injects `<meta name="robots" content="noindex">` into the streamed not-found page, so search engines do not index it. Two minor issues remain:
- Crawlers and link checkers that read only the status code treat these URLs as soft 404s.
- Monitoring based on status codes will not count them as errors.

No real service URL is affected, because all six are prerendered with `200`.

**Possible fix (not implemented).** Next.js recommends Proxy for a request-time 404. Add a root `proxy.ts` that is scoped to `/services/:slug` and returns a 404 for slugs not in `services`. The matcher keeps it off every other route, and no global config changes are needed. Two tradeoffs:
- The proxy runs before every service detail request.
- It duplicates the slug list unless it imports from `features/services/services.ts`.

Coordinate with the team before adding it, because `proxy.ts` is a project-wide file.

```ts
// proxy.ts (sketch)
import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/features/services/services";

const slugs = new Set<string>(services.map((service) => service.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
}

export const config = { matcher: "/services/:slug" };
```
