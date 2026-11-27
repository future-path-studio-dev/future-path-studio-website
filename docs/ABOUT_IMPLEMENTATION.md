# About Us implementation notes

Phase 2 About Us work on `feature/w2-binaya-about`, based on `develop` (which includes the shared public layout, Services and Homepage from PRs #8–#10). Figma file `lagZ6ViqHTzVpszZMTW9u4`, frame "About Us – Desktop 1440" `456:881`.

## Ownership

About Us was assigned to Shahim. When this branch was prepared, GitHub had no Shahim branch or About code, and the route was the "Coming Soon" stub. The project lead authorised this implementation. If Shahim has unpushed About work, compare it with this branch before either is merged.

## Sections and Figma frames

| Section | Figma | Component |
| --- | --- | --- |
| About Hero | `456:895` (photo `466:981`) | `components/about/AboutHero.tsx` |
| Benefit Strip | `456:907` | `components/about/AboutBenefitStrip.tsx` |
| Who We Are | `456:920` (photo `466:982`) | `components/about/WhoWeAre.tsx` |
| Who We Support | `669:3281` | `components/about/WhoWeSupport.tsx` |
| What We Do | `456:937` | `components/about/WhatWeDo.tsx` |
| How We Support You | `458:893`, component "Process Step" `454:908` (Closed `454:899`, Open `454:907`) | `components/about/HowWeSupportYou.tsx` (client component) |
| Why Choose | `458:945` | `components/about/WhyChoose.tsx` |
| Final CTA | `458:961` | `components/about/AboutCta.tsx` |

All copy lives in `features/about/about.ts`. The page metadata title is "About Us | The Future Path Studio".

## Assets

All three assets are unedited Figma exports.
- `public/images/about/about-hero.jpg` (900×600, `466:981`): drawn at (-88, -127) inside a 560×400 frame with 12px radius. The crop uses percentage offsets, so it scales with the frame.
- `public/images/about/about-who-we-are.jpg` (900×700, `466:982`): drawn at (-154, -162) inside a 520×410 frame with 12px radius.
- `public/images/about/bullet-ellipse.svg`: the 8px teal bullet from `456:927`.

## Decisions

- **Mobile.** The mobile frame `462:931` is an earlier wireframe. It has outdated copy, such as "Get Started" and three generic service cards. Only its layout is used: full-width buttons, a 2×2 benefit strip, stacked sections. All copy comes from the desktop frame.
- **How We Support You.** The Process Step component says "Click to reveal the supporting detail." Each step is a disclosure button with `aria-expanded` and `aria-controls`. One step is open at a time. Enter, Space or a click toggles a step. The open state uses the Figma Open variant: a filled teal icon with "−" and 14/22 muted detail text.
- **Our Story.** Figma draws it as a button with no destination, and there is no Our Story page. It links to the next section on the page, `#who-we-support`. Confirm the intended destination with the client.
- **Service links.** The What We Do cards use `services` from `features/services/services.ts`, because their names, icons, summaries and order match the Services overview exactly. Each card links to its `/services/<slug>` detail page.

## Visual differences from Figma (1440px)

- The page is 3925px tall, against Figma's 3909px.
- Step 02's label ("Review systems and resources") wraps to two lines at the 289px card width. Figma fits it on one line.

## Pending client approval

- **Process Step detail text.** Figma only has step 01's detail, which is the Open variant's default text: "We start by understanding your background, goals and constraints." Its wording reads like generic template text, so confirm it. Steps 02–04 have no detail copy in Figma, so they show "Step detail pending client approval." Add the approved text to `supportSteps` in `features/about/about.ts`.
- **Our Story destination.**
- **Photography.** The two photos are the images placed in Figma, with file names like "WhatsApp Image 2026-09-06…". Confirm they are approved for publication.
