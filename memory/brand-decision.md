---
name: Brand decision
description: Marketing vs product palette split, locked 2026-05-08, with the amber discipline rule
type: project
---

Azeer adopts a marketing-vs-product palette split, the way Apple/Stripe/Intercom do.

**Marketing palette (brand book — locked):**
- Primary `#7B61FF` (bright purple)
- Secondary `#0A1F44` (navy)
- Accent `#FFC857` (amber)
- Neutral `#2E2E2E` · Supportive `#F4F4F4`

**Product palette (derived from marketing):**
- `--primary` = `#5B47D9` (deeper indigo derived from #7B61FF — calmer for buttons/active states)
- `--secondary` = `#0A1F44` (unchanged)
- `--accent` = `#FFC857` (unchanged but RARE — see Amber Rule)
- `--background` = `#FAFAFA` · `--surface` = `#FFFFFF`
- `--border` = `rgba(10, 31, 68, 0.08)` (whisper border, derived from navy)

**The Amber Rule:**
`#FFC857` never fills a button, never colors an active state, never marks a warning. It exists only at brand moments — empty states, onboarding, Pro tier badge, "what's new" lozenge, chart series 3, pricing. Anywhere else and the brand's most valuable currency gets spent on rent.

**Warning is `#EA580C` orange, NOT amber.** This is non-negotiable — if warning = amber, the brand thesis collapses.

**Voice = `--primary` indigo.** The single point where channel and brand merge. Voice IS Azeer.

**Why:** locked 2026-05-08 after analysis of brand book + Intercom methodology. The amber accent is the differentiator vs other B2B SaaS palettes — preserving it requires discipline.

**How to apply:** when generating any product UI, draw from `tokens.json` and `BRAND.md` in the project root. Marketing-volume colors only inside marketing surfaces. If a generated component uses amber as a button fill or warning, fix it before declaring done.
