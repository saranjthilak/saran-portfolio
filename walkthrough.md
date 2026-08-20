# 3D Carousel Research Section

I have successfully adapted the provided high-performance 3D cylinder carousel to replace your old `ResearchSection`. 

## What Changed
- **Replaced the Grid:** The static 2-column grid displaying publications and certifications has been entirely replaced by a 60fps WebGL-style 3D cylinder carousel.
- **Data Injection:** The cards now dynamically map to your real portfolio data. We render exactly 6 cards (2 publications + 4 certifications). 
  - **Title** appears where the card number normally would.
  - **Journal/Issuer** appears where the cardholder name normally would.
  - **Date/Level** appears where the CVV normally would.
- **Unified Layout:** Instead of rendering as an isolated full-screen app, the carousel is constrained to a `100vh` scrolling block wrapped in the exact same `rounded-t-[40px] -mt-14 z-40` classes as the rest of the site, maintaining the sliding overlapped cards aesthetic!
- **Parallax Interactions:** The perspective equations, smoothstep interpolation, and inertia mouse damping logic are perfectly preserved from your prompt.

## How to Test
1. Make sure your local server is running (`npm run dev`).
2. Scroll down past the Projects section to see the new Research section slide up.
3. Observe the continuous rotation of the premium metallic cards.
4. Move your mouse around the viewport to see the inertia-damped 3D parallax tilt working in real-time.
