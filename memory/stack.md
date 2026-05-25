---
name: Stack
description: Production stack for Azeer Design System and the consuming app
type: project
---

Azeer Design System and the consuming app are built on:

- **React 19** (with the new compiler — no manual `forwardRef`)
- **Vite 8**
- **TypeScript**
- **Tailwind CSS v4** (use `@theme` directive — tokens live in CSS, not `tailwind.config.ts`)
- **shadcn** primitives (CVA + Radix) — copied into the repo, not installed as a package
- **shadcn Studio Premium** — used to source variants in Figma, NOT to import wholesale
- **lucide-react** — only icon library allowed
- **IBM Plex Sans Arabic** — single font family for Latin + Arabic, self-hosted via Fontsource
- **IBM Plex Mono** — numerics and code

**Why:** locked 2026-05-08 — this is the team's standard.

**How to apply:** when scaffolding new files, default to these. Don't propose alternatives (styled-components, MUI, Heroicons) without an explicit ask.
