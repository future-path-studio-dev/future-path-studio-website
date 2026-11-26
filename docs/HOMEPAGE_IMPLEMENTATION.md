# Homepage implementation notes

Phase 2 homepage work on `feature/w2-binaya-homepage-sections`. Figma file `lagZ6ViqHTzVpszZMTW9u4`, frame "Homepage – Desktop 1440" `2:8`. Figma has no mobile homepage frame, so the mobile and tablet layouts follow the patterns used on the Services pages.

## Ownership

| Section | Figma | Owner | Status |
| --- | --- | --- | --- |
| Navbar | `211:231` | Shared layout (PR #8) | Done |
| Hero | `83:2` | Assigned to Utsab (W1.2, issue #5); implemented here with the project lead's authorisation | `components/home/HomeHero.tsx` |
| Benefit Strip | `2:11` | Assigned to Utsab (W1.2, issue #5); implemented here with the project lead's authorisation | `components/home/HomeBenefits.tsx` |
| Our Services | `2:12` | This branch | `components/home/HomeServices.tsx` |
| About | `2:13` | This branch | `components/home/HomeAbout.tsx` |
| How We Work | `2:14` | This branch | `components/home/HomeHowWeWork.tsx` |
| Client Feedback | `2:15` | This branch | `components/home/HomeTestimonials.tsx` |
| Final CTA | `2:16` | This branch | `components/home/HomeCta.tsx` |
| Footer | `211:273` | Shared layout (PR #8) | Done |

The Hero headline is the page `<h1>`. The temporary visually hidden heading has been removed.

**Possible duplication.** When this branch was prepared, `feature/w1-utsab-navbar-hero` had no commits beyond the initial commit, and no other Hero or Benefit Strip code existed on GitHub. If Utsab has unpushed local work, compare it with `HomeHero.tsx` and `HomeBenefits.tsx` before either is merged, and close issue #5's Hero and Benefit Strip tasks once one version is chosen.

All homepage copy lives in `features/home/home.ts`. Service names and links come from `features/services/services.ts`. The homepage keeps its own card order and its own summaries for RTO Compliance Consulting and Professional Development, because Figma uses slightly different wording on the homepage than on the Services overview.

The earlier `components/home/ServicesPreview.tsx` on `feature/w2-binaya-homepage` (based on `develop`) is replaced by `HomeServices.tsx`. That branch has not been changed.

## Assets

- `public/images/home/homepage-hero.jpg` is the 756×360 logo image from Figma `690:2858` (the file Figma serves is a JPEG). Figma shows it at 682×324.76, the same aspect ratio, so no crop is needed. At 1440 px it extends 82 px past the 1240 px content column, as in Figma. Below 1024 px it stacks under the copy, capped at 682 px wide.
- The Benefit Strip icons are solid accent squares, as in Figma (`Icon Placeholder`).
- `public/images/home/homepage-about.png` is the 1040×820 illustration from Figma `258:124`. Figma shows it at 2× inside a 520×410 frame, offset by (-260, -214). The page reproduces that crop with CSS, so the asset itself is unedited.
- The service-card icons are solid teal squares, as in Figma (`Icon Placeholder`).

## Pending client approval

- **Testimonials.** Figma `2:15` shows placeholder text only. The page renders that placeholder text unchanged. Replace each entry in `homeTestimonials` with a client-supplied, client-approved testimonial and set `approved: true`.
- **Service-card and Benefit Strip icons.** Figma uses placeholder squares. Confirm whether final icons are planned.
