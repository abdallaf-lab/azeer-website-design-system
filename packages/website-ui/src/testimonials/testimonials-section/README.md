# TestimonialsSection

Single-centerpiece testimonial carousel with company-logo navigation. Different from `UseCasesSection`'s testimonial stack — this is the **featured-voice** pattern (one prominent quote at a time), not the supporting-proof stack (multiple visible at once).

> **When to use this vs `UseCasesSection`'s stack:**
> - **`TestimonialsSection`** (this): a featured-voice moment, one prominently shown, big pull-quote typography, full-width section.
> - **`UseCasesSection` stack:** supporting voices stacked inside a vertical-specific tab; multiple visible at once with scale/opacity fade.

> **Naming note (parked):** the new module is `./testimonials` (plural — "the section that displays multiple testimonials"); the existing `./testimonial` (singular) module remains untouched (Rule #4). Both coexist; queued for the end-of-Stage-2B naming audit alongside `SectionHeader`/`SectionHeading`, `PricingPlan`/`PricingSectionPlan`, and `CTABanner`/`CTASection`.

## Props — TestimonialsSection

| Prop | Type | Default | Description |
|---|---|---|---|
| `testimonials` | `TestimonialItem[]` | — | 3–6 testimonials (required). |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | Azeer defaults | Forwarded to SectionHeader when shown (Rule #15). |
| `showSectionHeader` | `boolean` | `true` | Render the SectionHeader label. |
| `autoRotateInterval` | `number` | `5000` | Rotation in ms. Set to `0` to disable (manual logo clicks only). Minimum 5s (Rule #16). |
| `pauseOnInteraction` | `boolean` | `true` | Pause auto-rotation after a logo click. |
| `pauseDuration` | `number` | `10000` | How long to pause after a click (ms). |
| `id` | `string` | `"testimonials"` | Anchor id. |
| `className` | `string` | — | Extra classes. |

## `TestimonialItem`

```ts
{
  id: string;
  quote: string;
  author: {
    name: string;
    role: string;                      // combined title + company conventionally
    avatar?: ReactNode | string;       // URL, custom ReactNode, or undefined → initials
  };
  company: {
    name: string;                      // alt text + tab label
    logo: ReactNode | string;          // production: pass a currentColor SVG
  };
}
```

## Auto-rotation behavior

- Defaults to **5000ms** (Rule #16; never below 5s).
- **Hover does NOT pause** — this section is always-on advertising; pause-on-hover would feel twitchy. (Distinct from `UseCasesSection` tabs, where hover-pause makes sense because users actively read tab content.)
- **Click pauses** for `pauseDuration` ms (default 10s), then resumes from the clicked position. The 10s pause gives readers time to absorb the chosen quote before motion resumes.
- **Disabled under `prefers-reduced-motion: reduce`** — manual logo clicks only.
- Set `autoRotateInterval={0}` to disable globally.

## Progress bar

- A thin (`h-0.5`) bar sits at the top of the active logo cell, scaling from logical start to full over `autoRotateInterval`.
- Implemented as a **CSS scale transform** with `origin-left rtl:origin-right` — RTL-aware (Rule #19), grows from the reading-start side in both directions.
- Restarts on every active-cell change (the bar unmounts when its cell deactivates and remounts in the new active cell with fresh state — no explicit reset effect needed).
- Hidden when paused or under reduced motion.

## Semantic HTML

The centerpiece is a **`<blockquote><p>`**, not a heading. "Big text" ≠ "must be a heading" — the quote is quoted content, not a section title. SectionHeader's `<h2>` (when shown) carries the section's heading role.

The author block uses `<cite>` (semantic source attribution) with `not-italic` to suppress the default italic so it sits cleanly under the avatar.

## Logos — production guidance

The `company.logo` prop accepts **any** `ReactNode` (or a URL string). Storybook ships token-only placeholders so the layout is reviewable without external assets. Production should pass real logos:

```tsx
// Best: currentColor SVG adapts to light/dark theme automatically
company: {
  name: "Bayt Al-Sweet",
  logo: <BaytAlSweetLogoSvg className="h-8 fill-current" />,
}

// OK: fixed-color SVG (works in both themes if color is theme-neutral)
company: { name: "…", logo: <FixedLogoSvg className="h-8" /> }

// Legacy fallback: URL string → rendered as <img>
company: { name: "…", logo: "/logos/legacy.png" }
```

**Dark-mode handling:** ship a single SVG that uses `fill="currentColor"` / `stroke="currentColor"`. It inherits color from CSS — adapts to themes via the page's text color tokens. Orion's dual-image (`logo` + `darkLogo`) trick is dropped — single source of truth, smaller bundle.

## Layout — variable-count logos (Rule #21)

The logo strip uses **CSS Grid auto-fit**: `grid-cols-[repeat(auto-fit,minmax(140px,1fr))]`. This handles 3 / 4 / 5 / 6+ logos cleanly:

- Few logos → distribute across the row evenly.
- Many logos → wrap to a second row only when each cell would shrink below 140px.
- No JS, no media-query branches, no hardcoded `basis-1/N`.

## Component boundaries (Rule #13 / #17)

- **`TestimonialsSection`** is `"use client"` (state + `setTimeout` rotation + `useRef`-tracked pause timer).
- **`CompanyLogoStrip`** is `"use client"` (click handlers + progress bar `useEffect`).
- The quote area + Avatar bundle client-side here but stay server-compatible if reused elsewhere.

## RTL handling

- **Cell separators** in the logo strip use logical `[&:not(:last-child)]:border-e` (Rule #19) — correct in both directions.
- **Progress bar** uses `origin-left rtl:origin-right` so it grows from logical start (left in LTR, right in RTL) — matches reading direction.
- **Quote** is `text-center` — symmetric.
- **No `text-balance`** anywhere (Rule #20).

## Reference

Adapted from Orion's `src/components/blocks/testimonials-section/testimonials-section.tsx`. Dropped: JS-interval progress bar (CSS scale transform is smoother + RTL-aware), dual-image `darkLogo` (currentColor SVG is the source of truth). Tokens re-mapped throughout.
