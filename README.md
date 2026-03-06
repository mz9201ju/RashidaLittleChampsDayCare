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
- CSS modules by concern (shared, desktop, mobile)
- Tailwind directives remain available globally via `src/index.css`

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
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Lint:
   ```bash
   npm run lint
   ```
