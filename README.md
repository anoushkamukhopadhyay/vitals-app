# Vitals

A working React prototype for **Vitals** — a strategic companion app for pre-med
students that turns scattered experience (research, clinical/shadowing, service,
coursework, leadership) into a prioritized, reactive picture of where to focus next.

This is a real, running front-end (not a click-through prototype): all state lives
in React (`useReducer` + Context) for the lifetime of the browser tab — no backend,
no localStorage. Every screen recomputes live from whatever you've logged.

## What's implemented

- **Onboarding** — year in school + a starting-context check-in
- **Dashboard** — category balance meters + the 1–2 next actions you're furthest behind on
- **Log an experience** — add hours/description per category; updates everywhere immediately
- **Matched schools** — school matches with a rationale computed from your actual logged
  hours (e.g. "shown because your profile is research-heavy — 62% of your logged hours…")
- **Four-year roadmap** — static milestones per category, with your current year highlighted

## Design system

Colors, type ramp, spacing, and card patterns were pulled directly from the Vitals
Figma file and reproduced as CSS custom properties in `src/styles/tokens.css` —
navy `#0C263D`, warm off-white `#F4F2EC`, coral accent `#D85A30` (used sparingly,
only for flagged "needs attention" states), warm gray `#5F5E5A`, and Inter
(weights 400/500 only) via `@fontsource/inter`.

## Running locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm run preview
```
