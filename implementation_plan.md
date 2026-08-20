# Research Section 3D Carousel Redesign

This plan covers adapting the provided high-performance 3D cylinder carousel prompt to replace the current `ResearchSection`.

## User Review Required

> [!IMPORTANT]
> The provided code is designed for a full-screen `App.tsx` experience. To seamlessly integrate it into the V2 portfolio without breaking the unified overlapping layout, I will wrap the carousel inside the existing stacked section style (`rounded-t-[40px]`, `-mt-14`, `z-40`). 
> 
> Also, the provided code uses hardcoded credit card details (`CARD_DETAILS` array). Since you requested to "adapt my research", I will dynamically map your real research data into these 3D cards.

## Open Questions

> [!WARNING]
> 1. **Data Mapping:** I plan to map your 2 publications and 4 certifications (6 items total) into the 3D cards. On the back of the card, I will replace the credit card "number" with the **Title**, the "name" with the **Journal/Issuer**, and the "cvv" with the **Date/Level**. Does this mapping work for you?
> 2. **Videos:** I will use the exact 7 CloudFront video URLs you provided in the prompt for the card backgrounds. Let me know if you want to use different assets.
> 3. **Height:** Since this is a scrolling section rather than a standalone app, I will set the section height to `min-h-[800px]` or `100vh` so the carousel has room to render without covering the entire page forever. Does `100vh` (full screen height) sound good for this specific section?

## Proposed Changes

### src/components/v2/ResearchSection.tsx

#### [MODIFY] [ResearchSection.tsx](file:///c:/Users/SARAN%20J%20THILAK/New%20projects/saran-portfolio/src/components/v2/ResearchSection.tsx)
- Replace the current grid layout with the provided 3D `requestAnimationFrame` render loop.
- Use the exact provided math for perspective, smoothstep interpolation, and inertia-damped mouse parallax.
- Map the `publications` and `certifications` arrays from `portfolio.ts` into the cards.
- Wrap the `<div className="absolute inset-0">` with a relative wrapper that maintains the `rounded-t-[40px] -mt-14 z-40` classes to keep the V2 stacking effect.

## Verification Plan

### Manual Verification
- Run `npm run dev` and scroll to the Research section.
- Verify the 3D cylinder carousel renders at 60fps.
- Verify mouse hover causes the cards to tilt with inertia.
- Verify the cards display your actual publications and certifications on their back faces.
- Verify the section overlaps correctly over the Projects section and under the Contact section.
