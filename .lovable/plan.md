## Modernize the site — Cyber-Technical Industrial

Retire the purple-neon glassmorphism look. Rebuild the design system around a dark industrial palette with a single orange accent, mono/sans typography, hairline borders, and a dot-grid background.

## Design tokens (index.css + tailwind.config.ts)

- Background: `#0a0a0b` base, `#0f0f11` surface, `#0d0d0f` sidebar
- Borders: `slate-800` hairlines throughout
- Accent (primary): orange `#f97316` — used sparingly (badges, hover states, corner markers, active nav)
- Text: white primary, `slate-400` body, `slate-500` mono labels, `slate-600/700` deep meta
- Signal green `#22c55e` for status/positive deltas
- Fonts: Plus Jakarta Sans (display/body, replacing Space Grotesk + DM Sans), JetBrains Mono (kept for HUD/labels)
- Kill: purple/violet gradients, glass blur cards, neon glows, constellation backdrop, neural pulse blobs, gradient-mesh

## Global changes

- Swap CSS variables in `src/index.css` (primary, accent, backgrounds, gradient tokens) to the palette above
- Load Plus Jakarta Sans via `@fontsource/plus-jakarta-sans`; drop Space Grotesk + DM Sans imports; update `tailwind.config.ts` fontFamily
- Replace fixed background layers in `src/pages/Index.tsx`: remove `NeuralNetBackdrop`, `bg-gradient-mesh`, `cyber-grid`, the two blur blobs. Add a single dot-grid overlay (`radial-gradient(#fff 1px, transparent 1px)` at ~24px, `opacity-[0.03]`)
- Update `SectionDivider` variants to hairline slate rules instead of cyan/fuchsia gradients

## Hero rebuild (`HeroSection.tsx`)

Match the selected prototype:
- Two-column: left = content, right = avatar panel (`lg:w-1/3`, `border-l border-slate-800`)
- Orange badge chip: "Data Engineer & Generative AI Specialist"
- Massive `font-extrabold tracking-tighter` name on two lines: "SARAN JAYA / THILAK"
- Bio with `border-l-2 border-slate-800 pl-6` accent rail
- Buttons: primary white→orange-on-hover with arrow icon; secondary bordered "Download Resume"
- Stats footer: 4-cell grid with 1px slate-800 gaps, mono numerals, orange label on hover; keep values (99.9%, 40%, 30%, 3+)
- Avatar panel: square framed image, grayscale + contrast, orange L-corner brackets top-left/bottom-right, faint mono coordinate strings bottom-right

## Sidebar (`Sidebar.tsx`)

- Slim to ~80px, remove label chips; use small icons + vertical rotated mono text on hover/active
- Active item marked with orange accent bar/text (instead of purple gradient pill)
- Bottom shows small connect icons + a version stamp (`V.03-26`) in mono
- Content offset in `Index.tsx` changes from `ml-72` → `ml-20`

## HUD (`MicroHud.tsx`)

- Restyle to top-right slate mono pills: green pulse "SYSTEM ACTIVE", "BERLIN, DE / 52.5200° N", time in `UTC` — drop the box background, just spaced mono text

## Section styling pass

- Convert all `glass` cards (`ProjectsSection`, `SkillsSection`, `ExperienceSection`, `EducationSection`, `CertificationsSection`, `PublicationsSection`, `ContactSection`) from blurred gradient glass to flat `bg-[hsl(var(--surface))] border border-slate-800` with square/`rounded-md` corners
- Replace `text-gradient-primary` gradients with solid white; swap all primary hover colors to orange
- Badge/pill styling → mono uppercase, bordered, orange-on-hover
- Keep all copy, data, and section order unchanged

## Out of scope

- No new sections or features
- No changes to GitHub fetch logic, EmailJS, resume file, or content copy
- Ambient music/UI sound behavior untouched

## Technical notes

- Font install: `bun add @fontsource/plus-jakarta-sans`, import in `src/main.tsx`, remove Google Fonts `<link>` for Space Grotesk / DM Sans from `index.html`
- All colors go through semantic tokens — no hardcoded hex in components; add `--surface`, `--surface-2`, `--accent-orange`, `--signal-green` to `:root`
- Verify with a Playwright screenshot pass after build
