# Portfolio — CLI-inspired terminal site

Experimental personal portfolio built as an interactive terminal. React, TypeScript, Vite, MVVM. Nerdy, ASCII-heavy, backend-ready.

## Tech stack

- **React** + **TypeScript** + **Vite**
- **CSS Modules** (no Tailwind) — smaller bundle, scoped styles, first-class Vite support
- **ESM**, strict lint, functional components only
- **MVVM**: Model (data/types), ViewModel (state, commands), View (dumb UI)

## Run

```bash
npm install
npm run dev
```

Build: `npm run build` · Preview: `npm run preview` · Lint: `npm run lint`

## Architecture

- **`src/model/`** — Types, interfaces, commands, mock data. No React. Swap mock providers for API calls later.
- **`src/viewmodel/`** — Command engine, `useTerminalVM` (state, history, autocomplete). No JSX.
- **`src/view/`** — Components (Terminal, AsciiHeader, BootScreen, etc.) and pages (About, Projects, …). Dumb UI only.
- **`src/styles/`** — Global CSS, variables, fonts.

## Features

- **Terminal UI** — Prompt, command input, output log
- **Commands** — `help`, `about`, `projects`, `opensource`, `astra88`, `contact`, `employment` (with aliases)
- **History** — Arrow Up/Down
- **Autocomplete** — Tab (single match or cycle)
- **Boot screen** — Fake boot sequence, skippable, respects `prefers-reduced-motion`
- **ASCII headers** — Per-section, responsive
- **ASCII self-portrait** — Lazy-loaded on About
- **Easter egg** — Konami code (↑↑↓↓←→←→BA)
- **404** — Terminal-style page for unknown paths
- **Fonts** — Hanken Grotesk, JetBrains Mono (Projekt Blackbird / Melody via @font-face when self-hosting)

## Backend readiness

All content comes from `src/model/mock/`. Replace `getAbout()`, `getProjects()`, etc. with API calls (e.g. Golang backend) without changing View or ViewModel interfaces.
# shahzad.io
