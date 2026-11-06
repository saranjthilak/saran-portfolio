# Project Architecture Rules

- The Expertise section uses a single interactive architecture canvas rather than independent flip cards, because the portfolio should communicate how production systems connect end to end.
- The About section's 3D wireframe globe runs on react-three-fiber v9 (Next's App Router bundles React 19 internally, so v8 crashes the page) via a `ssr:false` dynamic import (`AboutGlobe.tsx`); never render its Canvas on the server, keep reduced-motion users on a static globe, and reuse the `--accent` token for its color.
- Expertise visual states use semantic CSS/Tailwind tokens instead of component-level color literals, so the section remains themeable and consistent with the portfolio design system.

- Below the desktop breakpoint, Expertise uses full-width domain selectors with adjacent selected details and tappable directional connections; desktop retains its horizontal topology so touch navigation stays readable without altering the desktop experience.

- Expertise motion has one shared pause state covering CSS effects, domain simulation, inspector transitions, and cursor tilt while keeping navigation available; reduced-motion preferences default it to paused for accessible exploration.

- Domain detail panels stay mounted when hidden so per-domain exploration state survives selection changes; related project examples resolve from the canonical portfolio data instead of duplicating project content.

- Route-specific SEO metadata uses the Next.js App Router metadata exports so canonical URLs and social metadata are rendered server-side for crawlers.
