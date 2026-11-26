# Homepage implementation notes

Phase 2 homepage work on `feature/w2-binaya-homepage-sections`. Figma file `lagZ6ViqHTzVpszZMTW9u4`, frame "Homepage – Desktop 1440" `2:8`. Figma has no mobile homepage frame, so the mobile and tablet layouts follow the patterns used on the Services pages.

## Ownership

| Section | Figma | Owner | Status |
| --- | --- | --- | --- |
| Navbar | `211:231` | Shared layout (PR #8) | Done |
| Hero | `83:2` | Utsab, W1.2 (issue #5, `feature/w1-utsab-navbar-hero`) | Not in this branch |
| Benefit Strip | `2:11` | Utsab, W1.2 (issue #5) | Not in this branch |
| Our Services | `2:12` | This branch | `components/home/HomeServices.tsx` |
| About | `2:13` | This branch | `components/home/HomeAbout.tsx` |
| How We Work | `2:14` | This branch | `components/home/HomeHowWeWork.tsx` |
| Client Feedback | `2:15` | This branch | `components/home/HomeTestimonials.tsx` |
| Final CTA | `2:16` | This branch | `components/home/HomeCta.tsx` |
| Footer | `211:273` | Shared layout (PR #8) | Done |

Until the Hero lands, `app/(public)/page.tsx` has a visually hidden `<h1>`. When adding the Hero and Benefit Strip, put them above `HomeServices` and move the `<h1>` into the Hero.

All homepage copy lives in `features/home/home.ts`. Service names and links come from `features/services/services.ts`. The homepage keeps its own card order and its own summaries for RTO Compliance Consulting and Professional Development, because Figma uses slightly different wording on the homepage than on the Services overview.

The earlier `components/home/ServicesPreview.tsx` on `feature/w2-binaya-homepage` (based on `develop`) is replaced by `HomeServices.tsx`. That branch has not been changed.

## Assets

- `public/images/home/homepage-about.png` is the 1040×820 illustration from Figma `258:124`. Figma shows it at 2× inside a 520×410 frame, offset by (-260, -214). The page reproduces that crop with CSS, so the asset itself is unedited.
- The service-card icons are solid teal squares, as in Figma (`Icon Placeholder`).

## Pending client approval

- **Testimonials.** Figma `2:15` shows placeholder text only. The page renders that placeholder text unchanged. Replace each entry in `homeTestimonials` with a client-supplied, client-approved testimonial and set `approved: true`.
- **Service-card icons.** Figma uses placeholder squares. Confirm whether final icons are planned.
