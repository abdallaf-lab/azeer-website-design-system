# Azeer marketing pre-ship checklist

Run before declaring any website / landing / marketing work done. Every box must be
checked or have a stated, justified exception.

## Composition
- [ ] Built from `@azeer/website-ui` sections/atoms — nothing hand-rolled that exists.
- [ ] Class names composed with `cn` from `@azeer/website-ui` (not `clsx`).
- [ ] Icons via the system `<Icon icon={…} />` (not direct `lucide-react`).

## Color
- [ ] Token utilities only — zero raw hex, zero `text-white`/`bg-white`/`text-neutral-*`.
- [ ] Brand indigo used as **accent only** (wash/eyebrow/CTA/border), not chrome.
- [ ] White-text CTAs use `bg-accent-fill` (#5238D1), never `brand-primary`.
- [ ] Text on amber uses `text-brand-on-accent` (#2E2E2E).
- [ ] No gradients of any kind (no purple→pink, no gradient text/buttons). Only
      `bg-hero-brand` (15% radial) / `bg-dot-grid` for washes.

## Typography
- [ ] Marketing type uses the `text-mkt-*` scale (no `text-5xl` / arbitrary sizes).
- [ ] Weight ≤ 600 everywhere (no 700/800 display).
- [ ] Letter-spacing 0 — no `tracking-tight` on any tier.
- [ ] Latin + Arabic paired (the Dialogue ME intent), not Inter standing alone.

## Voice
- [ ] Addresses the operator (the person in charge), peer-to-peer.
- [ ] Leads with a concrete, revenue-framed outcome — not a capability list.
- [ ] No fluff: no "revolutionize," "supercharge," "game-changer," flattery, emoji spam.
- [ ] Short sentences, active verbs, precise before eloquent.
- [ ] Copy is specific to the vertical in scope (clinics or Salla/Zid e-commerce).
- [ ] Arabic reads as canonical, not a literal translation.

## Layout & motion
- [ ] Asymmetric composition — NOT centered-hero + 3 cards + testimonial.
- [ ] Split hero / alternating feature splits (media side flips per row).
- [ ] Spacing on the 8px grid (even multiples; `py-16 md:py-24` rhythm).
- [ ] Mobile-first (base layout authored narrow, enhanced upward).
- [ ] Motion is purposeful (entrance/scroll/state) with `duration-*`/`ease-*` tokens.
- [ ] Hover is `ring-4` expand only — no lift/scale/translate/shadow-on-hover.
- [ ] Stays within `max-w-content` (1080); text in `max-w-reading`/`max-w-prose`.

## RTL & accessibility
- [ ] Logical utilities only (`ps/pe`, `ms/me`, `start/end`) — no `pl/pr`, `ml/mr`, `left/right`.
- [ ] Directional icons use `flipOnRtl`; inline LTR runs wrapped (`dir="ltr"`/`.bidi-isolate`).
- [ ] Renders correctly in BOTH `/en` (LTR) and `/ar` (RTL).
- [ ] WCAG AA contrast met; no color-only signaling.
- [ ] Canonical focus ring intact (not re-rolled).
- [ ] `prefers-reduced-motion` respected.

## Scope hygiene
- [ ] No edits to `packages/ui` or `tokens.css` core for a marketing need — changes
      stay in the marketing layer (`website-ui`, `marketing.css`, `brand.css`, `apps/website`).
