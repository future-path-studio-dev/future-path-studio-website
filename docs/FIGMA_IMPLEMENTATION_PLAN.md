# Figma implementation plan

The [approved Figma file](https://www.figma.com/design/lagZ6ViqHTzVpszZMTW9u4/The-Future-Path-Studio-%E2%80%93-Homepage-Wireframe?node-id=0-1) contains a single canvas with the public website, authentication states, both portals and the UI Design Kit. Frame IDs below refer to that file.

| Phase | Figma references | Implementation and verification |
| --- | --- | --- |
| 1. Shared layouts | Kit `576:3416`, colours `577:3441`, typography `577:3523`, Navigation `579:3418`, Footer `588:3595` | Verify the shared components and route shells. Compare the 1440 px desktop and 390 px mobile references and exercise an intermediate tablet width. |
| 2. Public pages | Homepage `2:8`, About `456:881` / `462:931`, Services `471:955`, FAQ `277:124` / `411:805`, Contact `403:610` / `411:897` | Build the route content with approved assets and text. Include the three Services category frames `667:3302`, `667:3416`, `667:3530` and the six detail frames `475:1050`, `475:1156`, `475:1262`, `475:1368`, `475:1474`, `475:1580`. Connect FAQ accordions and Contact form states. Coordinate the existing homepage preview component before editing the homepage. |
| 3. Resources and requests | Resources `491:2020` and Services & Booking `469:953` | Match the resource list, resource details, filters, search and empty states. Implement service requests, consultation forms, validation and confirmations. |
| 4. Auth and client portal | Login `10:2`, Register `10:26`, prototype states `142:285`, client portal `296:169` | Implement auth and recovery, dashboard, requests, enquiries, saved resources and account management. Verify session handling and access controls. |
| 5. Admin portal | Admin portal `296:170` | Implement admin login, dashboard, enquiries, resource and service management, users, insights and settings. Verify authorization at the data and route boundaries. |
| 6. Integration and deployment | All applicable references | Verify Supabase workflows end to end, compare responsive layouts and interactive states, check accessibility and prepare the Vercel deployment. |

At each phase boundary, run `npm run lint`, `npx tsc --noEmit` and `npm run build`, record browser and Figma verification, and stop for review. Continue on feature branches only. Coordinate the base for Phase 2 after review of PR #8 and the CI overlap in PR #7.
