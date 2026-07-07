## Skills → Neural Constellation

Full redesign of the Skills section. The three category cards are replaced by a single wide "neural network" canvas where every skill is a glowing node connected by animated synapse lines to one of three hubs (AI/ML, Backend, Cloud/DevOps).

### What the user sees

```text
       LLMs •─────────●                              ●─────• Airflow
                 \    │                              │    /
     RAG •────────●───┤  ● AI/ML   ● Backend   ● Cloud/DevOps  ├───●───• AWS
                 /    │                              │    \
   LangChain • ●      ●                              ●      ● Docker
```

- Dark starfield background with a faint animated grid.
- Three hub nodes pulse gently in cyan / indigo / fuchsia (matches existing palette).
- Each skill is a small node; size + glow scale with proficiency; color inherits its category.
- Synapse lines connect every skill to its hub with a slow flowing signal (moving dash) — reads as data traveling.
- Nodes drift subtly (organic floating), never chaotic.
- Hover a node → HUD tooltip with skill name + level, its synapse brightens, unrelated nodes dim to ~25%.
- Hover a hub → isolate only that category's constellation.
- Legend chip row (All / AI & ML / Backend / Cloud & DevOps) below the canvas to persist isolation.
- Reduced-motion users get the constellation static (no drift, no traveling signals).

### Layout

- Full-width section, single SVG canvas (no 3-column card grid).
- Canvas ~720px tall on desktop, ~560px on tablet.
- Mobile (< 768px): canvas collapses to a stacked list of category groups with the same node visual language (glowing dots + connectors + proficiency bar), keeps touch-friendly.
- Section heading stays; add a one-line subtitle: "Hover a node to inspect. Click a hub to isolate a domain."

### Interactions

- Hover node → tooltip + focus dim + brighter synapse.
- Hover hub → isolate category.
- Click chip → persist isolation until "All" clicked.
- Idle → slow drift + traveling signal pulses.
- Scroll-in → nodes fade in from hub outward (stagger by distance), lines draw last.

### Technical details

- New component: `src/components/skills/NeuralSkillsNetwork.tsx` (SVG + framer-motion, no WebGL/Three.js — light + battery friendly).
- New mobile fallback: `src/components/skills/SkillsStackFallback.tsx` (reuses existing proficiency-bar visual).
- Graph data + layout: `src/data/skills-graph.ts`. Deterministic layout — hubs at x = 260/600/940 (viewBox 1200×680); satellites on two concentric rings around each hub using the golden angle so nothing overlaps.
- Drift = per-node framer-motion `animate` with sinusoidal x/y offsets, seeded params.
- Synapse signal = SVG `<path>` with animated `strokeDashoffset` (GPU-friendly).
- Focus dim = local React state `hoveredId | isolatedHub`; nodes and links derive opacity from it (no re-layout).
- Tooltip = HUD-style chip using existing cyber palette.
- `useReducedMotion()` disables drift, traveling signals, entry stagger.
- `useIsMobile()` (already in project) swaps to fallback.
- No new dependencies.

### Files touched

- Rewrite: `src/components/sections/SkillsSection.tsx` (thin wrapper: heading + desktop/mobile switch)
- New: `src/components/skills/NeuralSkillsNetwork.tsx`
- New: `src/components/skills/SkillsStackFallback.tsx`
- New: `src/data/skills-graph.ts` (hubs, layout, proficiency levels)
- Optional: add 1 keyframe (`synapse-flow`) to `src/index.css`

### Out of scope

- No WebGL / Three.js.
- No new dependencies.
- Other sections untouched.
