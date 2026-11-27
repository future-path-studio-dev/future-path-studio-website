# Resources implementation notes

Phase 2 Resources work on `feature/w2-binaya-resources`, based on `develop` (which includes the shared public layout, Services and Homepage from PRs #8–#10). Figma file `lagZ6ViqHTzVpszZMTW9u4`, section "Resources" `491:2020`.

## Routes and Figma frames

| Route or state | Figma frame |
| --- | --- |
| `/resources` | Resources – Overview `500:2023`; mobile `524:2993` |
| `/resources?category=compliance` | `675:3202` |
| `/resources?category=llnd` | `675:3290` |
| `/resources?category=tas-assessment` | `675:3390` |
| `/resources?category=staff-capability` | `675:3490` |
| `/resources?category=validation-moderation` (empty) | No Results `675:3813` |
| `/resources?q=TAS` | Search State `675:3715` |
| Enquiry dialog | Enquiry Confirmation `677:3129` (modal `677:3193`); mobile `678:3755` |
| Enquiry sent (only after a real save) | Enquiry Sent `677:3203` (modal `677:3267`); mobile `678:3822` |
| `/resources/compliance-starter-kits-for-new-rtos` | `509:2595`; mobile `678:3594` |
| `/resources/tae-tutor-support-program` | `511:2625`; mobile `678:3669` |

Shared components: Type Chip `494:2036`, Save Toggle `494:2043`, Resource Card `494:2057`, Category Chip `469:982`. The Figma scope note `527:3808` was followed: no prices, page counts, file sizes, download counts or availability claims.

All content lives in `features/resources/resources.ts`.

## Behaviour

- **Category filter.** Chips are links to `?category=<slug>`, so each category view has its own URL, works without JavaScript, and survives a reload. Unknown categories fall back to All. "All" lists the six non-featured resources (Figma "6 resources"); a category view includes every resource in that category, so Compliance shows the featured starter kit (Figma "1 resource in Compliance").
- **Search.** Filters as you type on the title, summary and category label, case-insensitively. The query is kept in `?q=` with `history.replaceState`, so it does not trigger navigation and can be shared. Search and category combine.
- **Results count.** Matches the Figma copy: "6 resources", "1 resource in Compliance", "2 resources matching "TAS"". The combined case ("… matching "TAS" in LLND") follows the same pattern.
- **No results.** The empty Validation & Moderation category shows the Figma copy and "Clear filters". A search with no matches shows `No resources match "<query>".` with "Clear filters". Figma has no search-specific no-results copy, so this short message is derived from the category version.
- **useSearchParams** is inside a `<Suspense>` boundary (required with Cache Components). The fallback renders the All view.
- **Detail pages** are prerendered with `generateStaticParams`; unknown slugs call `notFound()`. Like `/services/<unknown>`, they render the 404 page with `noindex` but return status 200 under Cache Components (see `docs/SERVICES_IMPLEMENTATION.md`).

## Decisions

- **Detail pages for undesigned resources.** Figma designs detail pages for two resources only. Every card in Figma has a "View Resource →" link, so the other five resources also get a detail page, built from the same Figma template but containing only what Figma provides: the category eyebrow, title, the card summary, and the "How to access it" section that both designed frames share word for word. No "What it covers" or "Who it is for" content is invented. The client should supply that content.
- **Save.** Per the Figma scope note, the public Save control links to `/login`. Its accessible name says "log in required". Saving needs accounts and a backend.
- **Enquire About This Resource** opens the Figma enquiry dialog (native `<dialog>`: focus moves in, Escape and the backdrop close it, focus returns to the button). "Send Enquiry" calls the `requestResourceEnquiry` Server Action.
- **CTA band.** "Create account" goes to `/register`. Figma gives "Learn more" no destination; it goes to `/services`, the overview of tailored support.
- **Image slots.** Figma's featured preview (`500:2062`) and TAE resource preview (`511:2652`) are dashed placeholder slots with no image. They are reproduced as designed and hidden from assistive technology.

## Backend dependency: no fake success

There is no backend yet (Supabase is issue #6). `getResourceEnquiryStore()` in `features/resources/enquiryStore.ts` returns `null`, so `requestResourceEnquiry` returns `unavailable`. The dialog then shows "ENQUIRY NOT SENT – Your enquiry has not been sent", asks the visitor to email hello@futurepathstudio.com (the address on the Figma Contact page) or use the contact form, and links to `/contact`. The Figma "Enquiry Sent" view only renders when the action reports a genuine save.

To make enquiries real:

1. Implement `ResourceEnquiryStore.save()` (for example, insert into an `enquiries` table with `source = 'resource'` and the resource slug) and return it from `getResourceEnquiryStore()`.
2. Decide who the enquiry is from. The Figma dialog collects no contact details, so it assumes a signed-in client, or the store must be paired with a contact step. With auth, read the user from the session inside the action. Do not trust client input for identity.
3. Add rate limiting or spam protection, and a notification email to the team.

Saving resources needs authentication and a saved-resources table for the client portal (Phase 4).

## Pending client approval

- Detail content for the five resources without a designed detail page.
- Real preview images for the featured resource and the TAE program.
- Where "Learn more" in the CTA band should go.
- Confirmation of the enquiry email address.

## Known differences from Figma

- Footer: the shared PR #8 footer is used. Figma's resource frames show the placeholder "Email / Phone / Social links" line and, on mobile, a compact footer.
- CSS borders take up space where Figma strokes don't, so bordered boxes are 2px larger in places (featured card 286px tall against 284px; mobile Enquire button 308px against 310px).
- The "not sent" dialog and the search no-results message are not in Figma (see above).
