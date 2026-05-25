---
name: Azeer Brand
description: >-
  This skill should be used when building, designing, or editing any Azeer
  website, landing page, marketing section, or marketing component — e.g. "build
  a landing page for Azeer", "design a hero for the clinics page", "add a pricing
  section", "make a marketing component", "redesign apps/website". It MUST also be
  applied whenever files under `apps/website/` or `packages/website-ui/` (or the
  `@azeer/tokens` brand/marketing layer) are in scope. It enforces the Azeer brand
  palette, Dialogue ME typography, the operator-focused GCC/MENA voice, and the
  asymmetric / RTL / AA design rules, layered on top of general frontend-design
  craft. It rejects purple gradients, Inter-only typography, generic SaaS
  patterns, and the centered-hero + 3-cards + testimonial layout.
version: 0.1.0
---

# Azeer Brand

## Purpose

Azeer is a B2B conversation-and-revenue platform for the GCC/MENA market, sold to
operators of healthcare clinics and e-commerce stores (Salla/Zid). This skill is
the brand guardrail for every public marketing surface. It does not replace design
craft — it constrains it. Produce work that is unmistakably Azeer: the exact token
palette, Dialogue ME typography, an operator-to-operator voice, and asymmetric,
RTL-correct, accessible layouts.

The brand truth lives in the repo, not in this file. Treat these as canon and read
them before generating:

- `packages/tokens/src/brand.css` — the five fixed brand colors.
- `packages/tokens/src/marketing.css` — the `mkt-*` type scale + neutral semantics.
- `packages/tokens/src/brand.ts` — voice attributes, the 14 writing rules, Dialogue ME.
- `DESIGN_SYSTEM.md` — the marketing design system (the 10 principles + anti-patterns).
- `packages/website-ui/src/` — the section/atom components to compose from.

## How to apply this skill

1. **Run frontend-design first, then clamp.** Use the general `frontend-design`
   skill for layout craft and polish. This skill applies *on top*: every choice it
   would make is overruled by the brand rules below. Craft is the floor; brand is
   the gate.
2. **Compose from `@azeer/website-ui`** — never hand-roll a hero, pricing table, or
   feature grid that already exists. See `references/components.md` for the inventory
   and which components to prefer for asymmetry.
3. **Read tokens, emit utilities.** Use semantic token utilities only
   (`text-mkt-display-lg`, `bg-bg-default`, `text-content-default`,
   `bg-brand-accent`). Never raw hex, never `text-5xl`, never `text-neutral-700`.
4. **Compose classes with `cn`** from `@azeer/website-ui` (its tailwind-merge
   safelist knows the `mkt-*` and brand tokens) — never `clsx` directly.
5. **Gate on RTL + AA** before declaring done (see Pre-ship gate).

## Brand identity — non-negotiable

### Colors

Use ONLY the Azeer token colors. The full table with hex, utility, and on-color
pairings is in `references/colors.md`. The essentials:

- **Brand palette** (`bg-brand-*`): primary `#7B61FF` indigo (identity, **non-text**),
  secondary `#0A1F44` navy, accent `#FFC857` amber, neutral `#2E2E2E`, supportive
  `#F4F4F4`. Brand indigo is an **accent, not chrome** — washes, eyebrows, CTAs only.
- **White-text CTAs** use `bg-accent-fill` (`#5238D1`, AAA on white). `brand-primary`
  is a non-text identity color — never put white text on it.
- **Structure is carried by neutrals**: `bg-bg-*`, `text-content-*`,
  `border-border-*`. Brand color stays sparing.
- **On amber** (`brand-accent`) use `text-brand-on-accent` (`#2E2E2E`) — white fails.

### Typography

The brand font is **Dialogue ME** (Arabic + Latin, weights 200–800). It is not yet
self-hosted, so the implemented fallback is `--font-sans` (Inter) paired same-metric
with `--font-arabic` (IBM Plex Sans Arabic), weights 400/500/600 only. This pairing
is the brand intent — Inter alone is not. Rules (full detail in
`references/typography.md`):

- Use the marketing scale `text-mkt-*` for marketing type (`mkt-display-xl` → `mkt-caption`).
- **Cap weight at 600.** Never 700/800 in marketing UI — big + light (500) is the look.
- **Letter-spacing stays `0`.** Never `tracking-tight` — it destroys Arabic legibility.
- **One family for both scripts.** The same component switches via `dir`; mono
  (`--font-mono`) is for code/data/IDs only.

## Voice & tone

Write operator-to-operator. The audience runs a clinic or a store and counts money,
not features. Full reference — the three voice attributes (راسخ Rooted, موآزر
Supportive ally, دقيق Precise) and all 14 writing rules with قل/لا تقل examples — is
in `references/voice-and-tone.md`. The load-bearing rules:

- **Address the person in charge.** "Let's review last month's no-shows" — not "we
  advise our clients to review their results."
- **Lead with the operator's outcome**, framed as revenue: bookings, deposits,
  no-show recovery, reactivation, GMV, repeat orders — not platform capabilities.
- **Cut filler. Short sentences. Active verbs.** "Connect WhatsApp now." not "The
  system integrates with WhatsApp."
- **Be precise before eloquent.** "Replies land in two seconds." not "blazing-fast
  unparalleled notifications."
- **Confident, founder energy — never hype.** Banned: "revolutionize your business,"
  "unleash," "supercharge," "game-changer," "next-level," and any flattery.
- **Two priority verticals:** healthcare clinics and e-commerce (Salla/Zid). Keep
  copy specific to the vertical in scope; see the vertical playbooks in the reference.
- **GCC/MENA + Arabic-first.** MSA in docs/email/site; neutral Saudi "white" dialect
  in social/ads. Arabic is canonical, not a translation afterthought.

## Design rules (on top of frontend-design)

Detail and recipes in `references/layout-and-motion.md`. The rules:

- **Asymmetric layouts preferred.** Reach for `HeroSplit` / `HeroSplitVideo` and
  alternating `FeatureSplit` (flip the media side per row) over centered, symmetric
  blocks. Break predictable rhythm with `StatsBand`, `ChannelsRow`, `CompareTable`,
  and the vertical visuals.
- **Real motion, not decorative hover.** Motion must communicate state or guide
  attention: entrance/scroll reveals via `duration-*` + `ease-*` tokens and the
  `animate-in` / `fade-*` / `slide-in-from-*` utilities. Hover is a `ring-4` expand
  (the system convention) — **never** a translate, lift, scale, or shadow-on-hover.
  Always honor `prefers-reduced-motion` (the tokens already collapse to 0).
- **8px spacing grid.** The token base is 4px (`--spacing`); compose layout spacing
  on the 8px grid by using even multiples — `p-2`/`p-4`/`p-6`/`p-8`, `gap-2`/`gap-4`,
  section rhythm `py-16 md:py-24`. Avoid odd steps (`p-3`, `gap-5`) for layout.
- **Mobile-first.** Author the base (narrow) layout first; add `sm:`/`md:`/`lg:`
  enhancements upward. Don't desktop-down.
- **Arabic RTL is a release gate.** Logical utilities only (`ps/pe`, `ms/me`,
  `start/end`, `border-s/e`, `rounded-s/e`) — never `pl/pr`, `ml/mr`, `left/right`.
  Flip directional icons with `flipOnRtl`. Wrap inline LTR runs (phone, email, IDs,
  prices, URLs) in `dir="ltr"` / `.bidi-isolate`. Verify in both `/en` and `/ar`.
- **Accessibility AA minimum.** Meet WCAG AA contrast (the tokens document their
  ratios — use the documented text/fill pairings). Don't signal with color alone;
  keep the canonical focus ring; respect reduced motion.
- **Stay within width.** Marketing tops out at `max-w-content` (1080px); text columns
  at `max-w-reading` (672px). Borders before shadows; shadows only for floating surfaces.

## Hard rejections

Refuse these and propose the on-brand alternative instead:

- ❌ **Purple/violet gradients** or gradient-as-chrome (gradient text, gradient
  buttons, purple→pink hero washes). Azeer indigo appears only as the sanctioned
  `bg-hero-brand` radial (15%) or `bg-dot-grid`, as a flat accent — never a gradient.
- ❌ **Inter-only typography** (or any single Latin family standing alone, `tracking-tight`,
  bold 700/800 display). Use the Dialogue ME intent: `mkt-*` scale, ≤600, tracking 0,
  Latin+Arabic paired.
- ❌ **Generic SaaS patterns** — stock purple hero, three identical floating cards,
  glassmorphism, hover-lift cards, emoji-strewn copy, "revolutionize" headlines.
- ❌ **The centered-hero → 3-cards → testimonial template.** Prefer asymmetric
  composition (split hero, alternating feature splits, stats/channels/compare bands).
- ❌ **Raw hex / arbitrary type / `clsx` / directional utilities** — tokens,
  `mkt-*`, `cn`, logical properties only.
- ❌ **Editing `packages/ui` or `tokens.css` core** for a marketing need — work in
  the marketing layer (`website-ui`, `marketing.css`, `brand.css`, `apps/website`).

## Pre-ship gate

Before declaring marketing work done, run the checklist in
`assets/brand-checklist.md`. The non-skippable items: composed from `website-ui`;
tokens only (no hex); `mkt-*` type ≤600 weight, tracking 0; brand indigo as accent
only, no gradients; asymmetric (not the rejected template); operator voice, no fluff;
8px spacing; renders correctly in both `dir="ltr"` and `dir="rtl"`; AA contrast and
focus ring intact; `prefers-reduced-motion` respected.

## Resources

- `references/colors.md` — full color token table + on-color pairings + usage rules.
- `references/typography.md` — Dialogue ME guide, `mkt-*` scale, weight mapping.
- `references/voice-and-tone.md` — 3 voice attributes + 14 writing rules + vertical playbooks.
- `references/components.md` — `@azeer/website-ui` inventory + which to prefer for asymmetry.
- `references/layout-and-motion.md` — asymmetry recipes, motion tokens, 8px grid, RTL canon.
- `assets/brand-checklist.md` — the pre-ship gate, copy/paste into a review.
