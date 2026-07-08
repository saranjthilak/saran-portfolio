## About Section — Futuristic HUD Redesign

### Goal
Replace the current two-column card layout with a high-tech "System Profile" interface that matches the neural-constellation Skills section and HUD-framed Experience timeline.

### What we'll build

#### 1. Restructure as a HUD dashboard
- **Left panel — Boot Log / System Profile**
  - Wrap in `HudFrame` with `scan` + `variant="cyan"`
  - Render the 3 professional-background paragraphs as a terminal-style boot sequence
  - Use monospace font, subtle line numbers, a blinking cursor on the last line, and a slow vertical scanline shimmer
  - Paragraphs appear staggered on scroll entry (already supported by `Reveal`)

- **Right panel — Performance Telemetry**
  - Wrap in `HudFrame` with `scan` + `variant="fuchsia"`
  - Convert the 4 achievement items into metric readouts with animated horizontal progress bars
  - Each bar uses the existing gradient colors (green→emerald, blue→cyan, purple→pink, pink→yellow) and fills from 0 to the metric value on scroll entry
  - Metrics: 40% RAG Boost, 30% Accuracy Gain, 25% Vector DB Efficiency, 2× IEEE Publications (converted to a maxed "Research Output" bar)
  - Each item keeps its icon but displayed inside a small glowing hexagon badge

#### 2. Animations & motion
- Entry: `Reveal` with `direction="wipe-right"` on left panel, `direction="wipe"` on right panel
- Progress bars: CSS `@keyframes` or Framer Motion `animate` filling bars over 1.2s after entering viewport
- Blinking cursor: CSS `hud-blink` keyframe already exists
- Scanlines: reuse `HudFrame scan` prop (already implemented)
- `useReducedMotion()` will disable bar-fill animations and blink cursor

#### 3. Responsive
- Stack vertically on mobile: Boot Log first, then Telemetry
- Bars remain readable at full width

#### 4. Files changed
- `src/components/sections/AboutSection.tsx` — full rewrite of layout, reuse `HudFrame`, `Reveal`, `SectionHeading`
- `src/index.css` — add one `@keyframes bar-fill` animation for telemetry bars (kept lightweight, GPU-friendly)

### What stays the same
- All text content from `achievements` and the 3 biography paragraphs (no copy edits)
- Existing color palette and design tokens
- No new npm dependencies