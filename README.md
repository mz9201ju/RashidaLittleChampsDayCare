# Rashida Little Champs Daycare Storybook

A kids-friendly daycare website built as an interactive storybook with enhanced 3D rendering and immersive environment.

## Vision
- A highly realistic 3D flipbook experience where pages turn with physical depth and smooth animation.
- Warm cartoon background with sun, light rings, clouds, birds, butterfly, hills, trees, toys, ground mist, and floating sparkles.
- Subtle mouse-driven parallax on background elements.
- PBR-style cover material with cloth/fabric texture hint, sheen, and embossed title typography.
- Multi-layer paper grain texture on inside pages with accurate horizontal rule lines.
- Clear structure so the project stays easy to maintain and debug.

## Tech Stack
- React + Vite
- `react-pageflip` for the book page-turn interaction (CSS 3D transforms, drag, touch swipe)
- `gsap` for the book entrance animation with subtle 3D rotation easing
- Web Audio API for synthesised paper-flip sound (no audio files required)
- Canvas 2D API for the floating sparkle particles
- CSS animations for birds, butterfly, sun-ring pulses, cloud drift
- Tailwind available (global directives kept), with custom feature CSS

## Project Structure
```
src/
	App.jsx
	index.css
	website/
		StoryBookSite.jsx
		Book.jsx
		ToyLayer.jsx
		components/
			Sparkles.jsx
		data/
			storyPages.js
		hooks/
			useBookSize.js
			usePageSound.js
		styles/
			base.css
			desktop.css
			mobile.css
```

## Separation of Concerns
- **Data only**: `src/website/data/storyPages.js`
- **Behavior only**: `src/website/hooks/useBookSize.js`, `src/website/hooks/usePageSound.js`
- **UI composition**:
	- `src/website/StoryBookSite.jsx` (scene shell + parallax listener)
	- `src/website/ToyLayer.jsx` (decorative background: birds, butterfly, mist, sparkles)
	- `src/website/Book.jsx` (flipbook + page navigation + GSAP entrance)
	- `src/website/components/Sparkles.jsx` (canvas-based floating sparkles)
- **Styles**:
	- Shared tokens/layout/animations in `src/website/styles/base.css`
	- Desktop-only overrides in `src/website/styles/desktop.css`
	- Mobile-only overrides in `src/website/styles/mobile.css`

## Rendering Architecture

### Book 3D Depth
- `perspective: 2800px` on `.book-shell` for a realistic vanishing point
- Multi-layer `box-shadow` on `.daycare-book` simulating real object depth
- Ambient occlusion on inner page edges via `inset` box-shadows (stronger on desktop)
- Enhanced spine with multi-stop gradient and wider spread shadow
- Ground-contact drop shadow (blurred ellipse beneath the book)

### Cover Material
- Triple-layer background: diagonal cloth-weave pattern over warm gradient
- Top sheen highlight via `linear-gradient` overlay
- Embossed title text using layered `text-shadow`
- Inset `box-shadow` for physical border depth

### Paper Texture
- Dual-axis repeating-linear-gradient: horizontal rule lines + subtle vertical grain
- Separate `::before` pseudo-element on `.book-page-content` for rule alignment
- Left/right ambient occlusion deepens towards the spine

### Environment
- **Sun**: radial gradient body + two `sun-ring` children with pulsing scale+opacity animation
- **Birds**: 3 CSS-drawn seagull silhouettes (wing arcs via `::before`/`::after`) flying at staggered speeds/sizes
- **Butterfly**: two semi-circular wings with independent flap animation
- **Ground mist**: gradient overlay at the scene bottom for atmospheric depth
- **Sparkles**: Canvas 2D 4-pointed star particles floating upward

### Performance
- Birds and butterfly hidden on mobile (`display: none`) to save GPU budget
- Sun-ring elements hidden on mobile
- All animations respect `prefers-reduced-motion`
- Canvas sparkles exit cleanly (animation frame cancellation + resize cleanup)
- `will-change: transform` on the backdrop for compositor promotion

## Run Locally
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Start development server:
	 ```bash
	 npm run dev
	 ```
3. Build production bundle:
	 ```bash
	 npm run build
	 ```
4. Lint:
	 ```bash
	 npm run lint
	 ```

## Quality Guardrails
- Global project agent rules are in `AGENT.md`.
- Global Copilot instructions are in `.github/copilot-instructions.md`.
- Together they enforce no duplication, clear separation of concerns, and isolated mobile/desktop styling.
