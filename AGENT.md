# Global Agent Rules

This file defines the default engineering guardrails for this project.
All contributors and AI agents should follow these rules for every change.

## 1) No Duplication
- Do not duplicate logic, UI structure, content, constants, or styles.
- If behavior is reused, extract it into a shared utility, hook, or component.
- Keep a single source of truth for story content in `src/website/data`.

## 2) Separation of Concerns
- Keep rendering/UI in components under `src/website`.
- Keep reusable behavior in hooks under `src/website/hooks`.
- Keep static content/config in `src/website/data`.
- Keep styling rules in `src/website/styles`.
- Do not mix business logic directly inside styling files.
- Keep the project on the current vanilla CSS pipeline; do not reintroduce Tailwind tooling unless explicitly requested.

## 3) Mobile/Desktop CSS Isolation
- Shared styles only in `src/website/styles/base.css`.
- Desktop-only overrides only in `src/website/styles/desktop.css`.
- Mobile-only overrides only in `src/website/styles/mobile.css`.
- Avoid placing mobile and desktop overrides in the same file.

## 4) Clear Debuggable Structure
- Keep a clear feature flow:
  - Scene shell (`StoryBookSite`)
  - Decorative background (`ToyLayer`)
  - Interactive flipbook (`Book`)
- Keep files focused and easy to scan.
- Use explicit names such as `BOOK_PAGES`, `useBookSize`, and `StoryBookSite`.

## 5) Pull Request / Change Checklist
Before finishing any change, verify:
- No duplicated logic/style/content was introduced.
- Concern boundaries are preserved (data/hooks/ui/styles).
- Mobile and desktop rules remain separated.
- New/changed structure is documented in `README.md`.
- Build and lint pass successfully.

## 6) Windows Command Execution
- In Windows PowerShell, use `npm.cmd` for all npm commands (for example: `npm.cmd run lint`, `npm.cmd run build`).
- Apply the same `.cmd` approach to related Node tooling when needed (for example: `npx.cmd`).
- If plain `npm` must be used, run `powershell -ExecutionPolicy Bypass` first in that terminal session.
- For validation, run lint and build together in one command sequence: `npm.cmd run lint; npm.cmd run build`.
