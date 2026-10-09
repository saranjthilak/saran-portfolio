# Project Architecture Rules

- The Expertise section uses a single interactive architecture canvas rather than independent flip cards, because the portfolio should communicate how production systems connect end to end.
- Expertise visual states use semantic CSS/Tailwind tokens instead of component-level color literals, so the section remains themeable and consistent with the portfolio design system.

- Below the desktop breakpoint, Expertise uses full-width domain selectors with adjacent selected details and tappable directional connections; desktop retains its horizontal topology so touch navigation stays readable without altering the desktop experience.
