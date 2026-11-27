# FAQ implementation notes

Phase 2 FAQ work on `feature/w2-binaya-faq`, based on `develop` (which includes the shared public layout, Services and Homepage from PRs #8–#10). Figma file `lagZ6ViqHTzVpszZMTW9u4`.

## Figma references

| Part | Figma |
| --- | --- |
| Desktop page | "FAQ - Desktop 1440" `277:124` |
| Mobile page | "FAQ – Mobile 390" `411:805` |
| Information panel | `277:127` (desktop), `411:812` (mobile) |
| Illustration | `277:131` frame, `277:132` image |
| Accordion panel | `277:135` (desktop), `411:817` (mobile) |
| FAQ Accordion component | `398:617`: Closed `398:609`, Open `398:616` |

## Files

- `app/(public)/faq/page.tsx`: the page (replaces the "Coming Soon" stub).
- `components/faq/FaqAccordion.tsx`: client accordion that matches the Figma FAQ Accordion component.
- `features/faq/faq.ts`: questions, answers and benefits copy.
- `public/images/faq/faq-illustration.png`: 824×680 illustration from Figma `277:132`. Figma draws it at 2× inside the 412×340 frame, offset by (-206, -179). The page reproduces that crop with CSS, so the asset itself is unedited.

## Behaviour

- **Accordion:** each question is a `<button>` inside an `<h3>`, with `aria-expanded` and `aria-controls`. Each answer is a `role="region"` labelled by its button and hidden while closed.
- **Toggling:** items open and close independently. Opening one pushes the following items down, as the Figma component description says.
- **Keyboard:** Tab moves between questions. Enter and Space toggle the focused question. Focus uses the global outline style.
- **States:** closed shows a "+" on a tinted circle; open shows a "−" on a solid teal circle with the answer in 15/24 muted text.
- **Links:** **Contact Us** and "Still have questions? Get in touch with our team." both go to `/contact`.
- **Desktop (1200 px and up):** two panels as in `277:124`.
- **Below 1200 px:** follows the mobile frame `411:805`. The information panel becomes a full-width band, and the illustration, benefits and duplicate panel heading are hidden. The accordion sits in a rounded card with **Contact Us** below it. The two desktop panels need 1140 px, which is why the breakpoint is 1200 px.

## Pending client approval

Every item in Figma is closed. The only answer text in Figma is the example in the open accordion variant (`398:615`), and it is used for the first question. The other five answers are draft copy. Each shows "Draft answer – pending client approval" in the UI and has `approved: false` in `features/faq/faq.ts`:

1. Who does The Future Path Studio work with?
2. Can you support new and emerging RTOs?
3. Do you provide TAS development and assessment review support?
4. What LLND support is available?
5. Can you provide ongoing compliance and capability support?

The first answer was written for the component's sample question "What services do you offer?", and the page question is "What services does The Future Path Studio provide?". The client should confirm that answer too.

## Known differences from Figma

- The footer is the shared Phase 1 footer. Figma's placeholder "Email / Phone / Social links" line and the compact mobile footer from `411:890` are not part of this page.

## Coordination

- `ServicesFaq` (`components/services/`, merged in PR #9) is a separate accordion with the Services FAQ styling. The two could share one accordion primitive in a follow-up.
- **For later review:** `public/images/faq/faq-illustration.png` is byte-identical to `public/images/auth/register-illustration.png` (both 824×680 Figma exports). Both are kept unchanged for now. Confirm with the client whether the two pages should share one illustration file or use different artwork.
- The About, FAQ and Contact pages were previously assigned to Shahim. No branch or commits from Shahim existed when this work started.
