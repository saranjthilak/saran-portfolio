# Fix readability of the "Selected Work" section

## Problem
The projects section uses a sticky card-stacking animation: each card sticks to the top and scales down (by up to ~12%) as the next card covers it. Combined with very small text (labels at 0.48–0.6rem, body at 0.6–0.72rem) and the card scaling, the Problem / Approach / Result content is hard to read — especially while scrolling.

## Change
Replace the sticky-stacking scale animation in `src/components/v2/ProjectsSection.tsx` with a simpler, readable scroll-reveal layout:

1. **Remove the sticky + scale stack** — cards become normal, full-size blocks stacked vertically with generous spacing between them.
2. **New animation: scroll-triggered reveal** — each card fades up and slides in once when it enters the viewport (using the existing `FadeIn`/`framer-motion` pattern already used across the site), with a slight stagger between the card's header, case-study strip, and image.
3. **Improve readability of the case-study strip:**
   - Raise label text from ~0.48rem to ~0.7rem minimum.
   - Raise body text from ~0.6rem to ~0.85rem minimum.
   - Increase contrast of body text (white/55 → white/75).
4. **Keep everything else unchanged** — same blueprint styling, same content, same card structure (number, source, title, links, Problem/Approach/Result strip, hero image), same section order.

## Technical details
- Edit only `src/components/v2/ProjectsSection.tsx`.
- Remove `useScroll`/`useTransform` scale logic and sticky positioning; keep a subtle hover scan (existing `blueprint-cell`) effect.
- Verify with the production build and a live preview check of `#projects` at desktop and mobile widths.

## Out of scope
- No changes to other sections, data in `portfolio.ts`, or the overall page structure.
