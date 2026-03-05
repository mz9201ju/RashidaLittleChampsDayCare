# Rashida Little Champs Daycare Storybook

A kids-friendly daycare website built as an interactive storybook.

## Vision
- A highly realistic 3D flipbook experience where pages turn with physical depth and smooth animation.
- Warm cartoon background with sun, clouds, hills, trees, toys, and floating sparkles.
- Subtle mouse-driven parallax on background elements.
- Clear structure so the project stays easy to maintain and debug.

## Tech Stack
- React + Vite
- `react-pageflip` for the book page-turn interaction (CSS 3D transforms, drag, touch swipe)
- `gsap` for the book entrance animation and physics easing
- Web Audio API for synthesised paper-flip sound (no audio files required)
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
	- `src/website/ToyLayer.jsx` (decorative background + sparkles)
	- `src/website/Book.jsx` (flipbook + page navigation + GSAP entrance)
	- `src/website/components/Sparkles.jsx` (canvas-based floating sparkles)
- **Styles**:
	- Shared tokens/layout in `src/website/styles/base.css`
	- Desktop overrides in `src/website/styles/desktop.css`
	- Mobile overrides in `src/website/styles/mobile.css`

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

## Quality Guardrails
- Global project agent rules are in `AGENT.md`.
- Global Copilot instructions are in `.github/copilot-instructions.md`.
- Together they enforce no duplication, clear separation of concerns, and isolated mobile/desktop styling.
