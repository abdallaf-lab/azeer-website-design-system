# azeer-brand

A Claude Code plugin that enforces Azeer's brand identity on every public marketing
surface. It is a **guardrail**, applied on top of the general `frontend-design`
skill: craft is the floor, brand is the gate.

## What it does

Ships one skill — **Azeer Brand** — that auto-applies when you build or edit any
Azeer website, landing page, marketing section, or component, and whenever files
under `apps/website/` or `packages/website-ui/` (or the `@azeer/tokens`
brand/marketing layer) are in scope. It clamps work to:

- **Colors** — only the Azeer token palette (`brand-*`, `bg-*`/`content-*`/`border-*`).
- **Typography** — the Dialogue ME intent and the `text-mkt-*` scale (≤600, tracking 0).
- **Voice** — operator-focused, GCC/MENA, no marketing fluff; clinics + Salla/Zid e-commerce.
- **Design** — asymmetric layouts, purposeful motion, 8px grid, mobile-first,
  Arabic RTL, WCAG AA.

It rejects: purple gradients, Inter-only typography, generic SaaS patterns, and the
centered-hero + 3-cards + testimonial template.

## Structure

```
azeer-brand/
├── .claude-plugin/plugin.json
└── skills/azeer-brand/
    ├── SKILL.md
    ├── references/   colors · typography · voice-and-tone · components · layout-and-motion
    └── assets/       brand-checklist.md  (pre-ship gate)
```

The skill reads the repo's own source of truth (`packages/tokens/src/*`,
`DESIGN_SYSTEM.md`, `packages/website-ui/src/`) — the reference files summarize and
point at it, they don't fork it.

## Install (project scope)

Enabled at project scope via the repo's `.claude/settings.json`, which registers the
local `plugins/` directory as the `azeer` marketplace and enables
`azeer-brand@azeer`. After pulling, restart Claude Code (or `/plugin`) so it loads.
