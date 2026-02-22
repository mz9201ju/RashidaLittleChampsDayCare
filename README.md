# Rashida Little Champs Daycare Storybook

A kids-friendly daycare website built as an interactive storybook.

## Vision
- A 3D flipbook experience where pages turn left/right naturally.
- Warm cartoon background with sun, clouds, hills, trees, and toys.
- Clear structure so the project stays easy to maintain and debug.

## Tech Stack
- React + Vite
- `react-pageflip` for the book page-turn interaction
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
		data/
			storyPages.js
		hooks/
			useBookSize.js
		styles/
			base.css
			desktop.css
			mobile.css
```

## Separation of Concerns
- **Data only**: `src/website/data/storyPages.js`
- **Behavior only**: `src/website/hooks/useBookSize.js`
- **UI composition**:
	- `src/website/StoryBookSite.jsx` (scene shell)
	- `src/website/ToyLayer.jsx` (decorative background)
	- `src/website/Book.jsx` (flipbook + page navigation)
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
