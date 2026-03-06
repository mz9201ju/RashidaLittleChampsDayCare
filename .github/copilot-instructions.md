# Copilot Instructions for Rashida Little Champs Daycare

## Product Vision
Build and maintain a kids-friendly storybook website for a daycare.
The centerpiece is a 3D page-flip book with smooth forward/backward interaction and a warm cartoon environment (sun, trees, playful elements).

## Global Engineering Rules
- Never duplicate logic, content, styles, or hardcoded constants across files.
- Keep strict separation of concerns:
  - Content/data in `src/website/data`
  - Reusable logic/hooks in `src/website/hooks`
  - UI components in `src/website`
  - Styles in `src/website/styles`
- Keep mobile and desktop styles isolated:
  - Desktop-only rules in `src/website/styles/desktop.css`
  - Mobile-only rules in `src/website/styles/mobile.css`
  - Shared rules in `src/website/styles/base.css`
- Keep the current vanilla CSS approach. Do not introduce Tailwind tooling unless explicitly requested.
- Do not place mobile and desktop overrides in the same file unless absolutely required.
- Keep component files focused on rendering and event handling only.
- Keep feature flow readable: scene shell → decorative background → interactive flipbook.

## UI/UX Constraints
- Preserve the storybook feel and child-friendly visuals.
- Keep the book interaction predictable:
  - users can click or drag corners to flip both directions
  - navigation arrows work on desktop
  - swipe/touch works on mobile
- Do not add extra pages, modals, or unrelated features unless requested.

## Code Quality Expectations
- Prefer small reusable functions over repeated inline logic.
- Keep naming explicit and domain-oriented (`StoryBookSite`, `useBookSize`, `BOOK_PAGES`).
- Avoid dead code and unused imports.
- Keep files short and understandable.

## Documentation
When changing architecture, folder structure, or behavior, update `README.md` in the same change set.

## Windows Command Execution
- In Windows PowerShell, prefer `npm.cmd` for npm commands (for example: `npm.cmd run lint`, `npm.cmd run build`).
- Use `.cmd` variants for related Node tooling as needed (for example: `npx.cmd`).
- If plain `npm` is required, run `powershell -ExecutionPolicy Bypass` before executing npm commands in that terminal session.
- For validation, run lint and build together in one command sequence: `npm.cmd run lint; npm.cmd run build`.
