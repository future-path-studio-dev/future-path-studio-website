# Development progress

## 26 November 2026 · Phase 1

The working tree started clean on `feature/shared-public-layout` at `220c00a`. The public layout, Navbar, Footer, BrandMark, navigation configuration and design tokens were already implemented on that branch. The authentication routes now share the same Navbar and Footer, the homepage retains `aria-current` with the neutral Figma navigation style, and the mobile footer omits the desktop legal row.

The Figma connector returned the screen inventory and design context for the desktop homepage and login headers, the mobile header, the desktop and mobile footers, and the UI Kit colour, type, spacing and navigation references. The kit documents form fields, cards, accordion, status chips and CTA components for later phases. The repository still needs rendered comparison and keyboard interaction checks.

### Outstanding work

- Match the compact mobile footer in FAQ and Contact. The existing mobile footer follows the About composition. Desktop footer contact and social copy in Figma is placeholder text. Approved contact and social details and legal destinations are still needed.
- Confirm whether the desktop login, registration and recovery navigation states need route-specific variants beyond the shared shell.
- All public routes still display placeholder content, including Resources. The six service detail routes are missing. Login, register and password recovery are placeholders. Client and admin route directories and the Supabase integration are scaffolding.

### Dependencies and verification

- [PR #8](https://github.com/future-path-studio-dev/future-path-studio-website/pull/8) is open. Its Vercel comment reports a ready preview for the published branch.
- [PR #7](https://github.com/future-path-studio-dev/future-path-studio-website/pull/7) is open and changes `app/layout.tsx`, which overlaps PR #8. It also introduces CI and test infrastructure. This is a coordination item, and the available PR records did not document a required merge order.
- The local `feature/w2-binaya-homepage` branch has a separate ServicesPreview component based on `develop`. Review it before starting the homepage work. Phase 2 awaits the Phase 1 review boundary.
- `npm run lint`, `npx tsc --noEmit` and `git diff --check` passed. `npm run build` failed when Turbopack was denied an internal port bind. The fallback `npm run build -- --webpack` passed, and the prerendered HTML contained the shared navigation, main content and footer on all nine public and authentication routes. The local development server hit the same port restriction, so the changed branch still needs browser and interaction verification.
