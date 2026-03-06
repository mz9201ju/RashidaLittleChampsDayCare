# Rashida Little Champs Daycare Website

A warm, playful daycare website built with React and browser routing.

## Features
- Multi-page routed experience with `BrowserRouter`
- Pages:
  - Home
  - About
  - Services
  - Contact
  - FAQ
- Shared site layout with animated, child-friendly background
- Responsive design with separate desktop and mobile style files

## Tech Stack
- React + Vite
- React Router (`react-router-dom`)
- CSS by concern (shared, desktop, mobile)
- Vanilla CSS animation system (no Tailwind runtime dependency)

## Maintenance Updates (Mar 2026)
- Removed dead Tailwind-related setup and packages:
  - Deleted `tailwind.config.js`
  - Removed `@tailwind` directives from `src/index.css`
  - Removed unused dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`
- Removed unused type-only dev dependencies in this JS-only project: `@types/react`, `@types/react-dom`
- Removed dead kite-wire CSS rules no longer referenced by markup.
- Minor render optimization: precomputed night-star indexes in `src/website/SiteLayout.jsx` to avoid rebuilding the array each render.

## Project Structure
```
src/
  App.jsx
  main.jsx
  index.css
  website/
    SiteLayout.jsx
    data/
      siteContent.js
    pages/
      HomePage.jsx
      AboutPage.jsx
      ServicesPage.jsx
      ContactPage.jsx
      FaqPage.jsx
    styles/
      base.css
      desktop.css
      mobile.css
```

## Separation of Concerns
- Content and text: `src/website/data/siteContent.js`
- Layout shell and navigation: `src/website/SiteLayout.jsx`
- Route views: `src/website/pages/*`
- Shared and responsive styling:
  - `src/website/styles/base.css`
  - `src/website/styles/desktop.css`
  - `src/website/styles/mobile.css`

## Routing
Routes are configured in `src/App.jsx`:
- `/` -> Home
- `/about` -> About
- `/services` -> Services
- `/contact` -> Contact
- `/faq` -> FAQ
- `*` -> Redirect to `/`

## Run Locally
1. Install dependencies:
   ```bash
  npm.cmd install
   ```
2. Start the dev server:
   ```bash
  npm.cmd run dev
   ```
3. Validate (lint + build in one sequence):
   ```bash
  npm.cmd run lint; npm.cmd run build
   ```
4. Preview production build:
   ```bash
  npm.cmd run preview
   ```
