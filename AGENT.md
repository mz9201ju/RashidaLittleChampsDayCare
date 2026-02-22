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
