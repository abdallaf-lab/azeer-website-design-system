# PricingSection

Complete pricing section with billing toggle and plan cards. Template that accepts any plan data structure — reusable for verticals, partners, multi-currency markets, and A/B tests.

> **Naming note (parked for end of Stage 2B):** the type is `PricingSectionPlan` to avoid colliding with the existing `PricingPlan` exported from `../PricingCards`. A naming audit (`PricingPlan` / `PricingSectionPlan` / `PricingCardsPlan`) is queued for the end-of-Stage-2B cleanup, alongside the `SectionHeader` / `SectionHeading` audit.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `plans` | `PricingSectionPlan[]` | — | 2–4 plan definitions (required). |
| `title` | `ReactNode` | `"Plans that scale with your revenue"` | Inner h3 headline. |
| `description` | `ReactNode` | Azeer revenue copy | Inner sub-headline. |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | Azeer defaults | Forwarded to SectionHeader (Rule #15). |
| `showBillingToggle` | `boolean` | `true` | Show the monthly/yearly toggle. |
| `defaultBillingPeriod` | `'monthly' \| 'yearly'` | `'monthly'` | Initial toggle state. |
| `id` | `string` | `"pricing"` | Section id (anchor). |
| `className` | `string` | — | Extra classes on the section. |

## `PricingSectionPlan` — the public API contract

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key. |
| `name`, `description` | `string` | Card heading + summary. |
| `monthlyPrice`, `yearlyPrice` | `number` | Per-period numbers (ignored when `customPriceLabel` is set). |
| `currency`, `period` | `string` | `"SAR"` / `"user/month"`. Empty strings render nothing. |
| `customPriceLabel` | `string?` | Replaces the price line (e.g. `"Contact sales"`). Same `text-mkt-display-md` size so card heights stay consistent across plans. |
| `inheritanceLabel` | `string?` | Renders **above** the bullet list as a muted paragraph (e.g. `"Everything in Growth, plus:"`). NOT a bullet — it reads as a section break, not a feature. |
| `features` | `ReactNode[]` | Bullet list (brand-indigo dot bullets). |
| `cta` | `{ label, href, variant }` | `variant: "primary" \| "secondary"`. |
| `highlighted` | `boolean?` | Adds a BorderBeam frame (brand-signature accent). |
| `badge` | `string?` | Metadata pill at the top of the card (e.g. `"Most popular"`). |

## Customization examples

### 2 plans (self-serve vs guided)

```tsx
<PricingSection
  title="Two ways to start"
  plans={[
    { id: "self", name: "Self-serve", … cta: { variant: "primary", … }, highlighted: true },
    { id: "guided", name: "Guided", customPriceLabel: "Contact sales", … },
  ]}
/>
```

### 4 plans (vertical-specific)

Pass four `PricingSectionPlan`s; the grid stays `md:grid-cols-3` so the fourth wraps below — for a strict 4-up layout, override the section's `className` with a Tailwind grid override.

### Multi-currency (SAR / USD / AED)

```tsx
<PricingSection plans={planVariants[currency]} />
```

Each plan carries its own `currency` field — swap the array per locale.

### Vertical variant (healthcare)

```tsx
<PricingSection
  sectionHeader={{
    title: "Pricing for clinics",
    description: "HIPAA-ready plans with appointment-flow templates included.",
  }}
  title="Plans that scale with your patient base"
  plans={healthcarePlans}
/>
```

### Single-billing scenario

```tsx
<PricingSection plans={plans} showBillingToggle={false} />
```

### Partner white-label (custom CTA URLs)

```tsx
<PricingSection plans={plans.map((p) => ({ ...p, cta: { ...p.cta, href: `/partners/acme${p.cta.href}` } }))} />
```

## Highlighted plan — UX rationale

Visual emphasis (BorderBeam + badge + primary CTA) drives conversion to the recommended plan. **Only ONE plan should be highlighted per pricing section** to avoid choice paralysis. The BorderBeam is calibrated for card scale: `size={80}` (≈10–15% of the card's smallest dimension) at `duration={10}` (ambient, not anxious).

## Component boundaries (Rule #17)

`"use client"` is **component-scoped, not tree-scoped**. A Client Component can render Server Component children without forcing them to be client — only the components that actually use client features (hooks, browser APIs, event handlers, refs to DOM) need the directive. The result is a smaller JS bundle and a faster initial paint.

This section applies the rule:

- **`PricingSection`** — `"use client"` (holds toggle state via `useState`).
- **`BillingToggle`** — `"use client"` (click handlers).
- **`PlanCard`** — **no `"use client"`** (pure presentation; just props → JSX).

PlanCard *bundles* client-side in this composition because its parent is client, but stays server-compatible if used elsewhere (e.g. a static partner pricing page). Don't add `"use client"` to PlanCard "just in case" — it's a real architectural choice.

## Inheritance label pattern

When a plan inherits from another (e.g. `"Everything in Growth, plus:"`), use the `inheritanceLabel` field. The label renders **above** the bullet list as a muted paragraph (no dot) — a visual separator that means *"see above + these new things"*. The bullets below are then **only the new features**, not a duplicate of the inherited plan's bullets.

```ts
{
  name: "Scale",
  inheritanceLabel: "Everything in Growth, plus:",
  features: [
    "Unlimited team members",
    "Healthcare compliance (HIPAA-ready)",
    "Custom integrations & API access",
    // …
  ],
}
```

## RTL handling

- **Currency stays before the number** in all languages for consistency — `flex flex-row` auto-reverses under `dir="rtl"`, so currency renders at the right (first read in Arabic): "ر.س ٢٩٩".
- **Cell separators** use logical `md:border-e` + `md:last:border-e-0` — correct in both directions.
- **Toggle order** Monthly→Yearly reads left-to-right in LTR and right-to-left in RTL (Monthly first in both scripts).
- **Badge position** is at the top-start of the card (logical).

## Reference

Adapted from Orion's `src/components/blocks/pricing-section/pricing-section.tsx`. `NumberTicker` dropped (Rule #16); savings badge intent flipped from destructive to success (Rule #8); tokens re-mapped throughout; `inheritanceLabel` pattern added.
