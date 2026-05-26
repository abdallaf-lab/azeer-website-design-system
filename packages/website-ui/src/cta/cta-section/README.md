# CTASection

Final-conversion section with dual CTAs and supporting proof stats. Template accepting any title, description, CTAs, and stats array — reusable across verticals, partner pages, and A/B tests.

> **Naming note (parked):** the existing `CTABanner` (`../CTABanner.tsx`) is a single-CTA accent banner; this `CTASection` is the full two-column final-push section. The two coexist (Rule #4). Audit at end of Stage 2B alongside `SectionHeader`/`SectionHeading` and `PricingPlan`/`PricingSectionPlan`.

## Props — CTASection

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | `"Ready to turn conversations into revenue?"` | Headline (renders as `<h2>` when standalone; `<h3>` when `showSectionHeader` is on). |
| `description` | `ReactNode` | Azeer 14-day-trial copy | Sub-headline. |
| `primaryCTA` | `CtaAction` | `"Start free trial" → /signup` | Accent CTA. |
| `secondaryCTA` | `CtaAction \| null` | — | Neutral CTA. Pass `null` to omit. |
| `stats` | `CTAStat[]` | — | 2–4 supporting stats (required). |
| `showSectionHeader` | `boolean` | `false` | Show a label SectionHeader above the CTA. Default **off** — the section IS the call-to-action. |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | — | Forwarded to SectionHeader when shown (Rule #15). |
| `id` | `string` | `"get-started"` | Anchor id (customer-facing, not engineer-speak). |
| `className` | `string` | — | Extra classes on the section. |

## `CTAStat`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key. |
| `value` | `string` | Full value as a string — covers `"38%"`, `"2.4x"`, `"100K+"`, `"<2 min"`, ranges, custom labels. |
| `description` | `string` | Supporting line. |

**Why a single string for `value`:** Orion split this into `number` + `pointNumber` + `suffix` to feed `NumberTicker`. Without that animation (Rule #16), the split provides no value — a single string is simpler, handles every shape, and matches the calm static rendering.

## Heading hierarchy

| `showSectionHeader` | SectionHeader | This section's headline |
|---|---|---|
| `false` (default) | (not rendered) | `<h2>` |
| `true` | `<h2>` ("Get started") | `<h3>` |

This preserves a proper document outline whether or not the section is labeled.

## Numerals — Western digits in both languages

Stat values use **Western digits (0–9) in both Arabic and English copy**. This is a deliberate brand choice: most Saudi B2B audiences use Western digits, and consistency across locales avoids per-language data branches. The surrounding Arabic prose is naturally translated; only the figures stay Western.

## Component boundaries (Rule #13 / #17)

Both `CTASection` and `StatItem` are **Server Components** — no hooks, no event handlers, no `"use client"`. Marketing pages should ship the smallest possible JS bundle, especially at the bottom of the page where the user is closest to converting.

## Visual calibration — CTA = the quietest section (Rule #16 sub-rule)

CTA / conversion sections should be the **quietest** sections visually:

- **No** background patterns, decorative SVGs, or canvas animations behind the CTAs.
- **The button itself is the focal point** — everything else recedes.
- **Generous whitespace > decorative fills.** Symmetric `md:pe-8 lg:pe-12` (CTA card) + `md:ps-8 lg:ps-12` (stats column) around the `md:border-s` divider gives 64px+ horizontal breathing room on desktop.

This is conversion UX 101: when you want users to click, remove distractions.

## Customization examples

### E-commerce default

```tsx
<CTASection
  stats={[
    { id: "recovery", value: "38%", description: "average increase in cart recovery" },
    { id: "agent",    value: "2.4x", description: "more conversations per agent with AI" },
    { id: "response", value: "<2 min", description: "average response time across channels" },
  ]}
/>
```

### Healthcare vertical

```tsx
<CTASection
  title="Ready to fill your clinic's calendar?"
  description="HIPAA-ready in days, with bilingual reminders out of the box."
  primaryCTA={{ label: "Book a demo", href: "/demo", icon: ArrowUpRight }}
  stats={healthcareStats}
/>
```

### Partner / white-label

```tsx
<CTASection
  primaryCTA={{ label: "Start with Acme", href: "/partners/acme/signup" }}
  secondaryCTA={{ label: "Talk to Acme team", href: "/partners/acme/contact" }}
  stats={partnerStats}
/>
```

### Labeled variant (with SectionHeader)

```tsx
<CTASection
  showSectionHeader
  sectionHeader={{ title: "Get started" }}
  stats={stats}
/>
```

## RTL handling

- **Column separator** uses logical `md:border-s` + symmetric `md:pe-* / md:ps-*` padding — correct in both directions.
- **CTA arrow icons** (e.g. `ArrowUpRight`) flip automatically via `<Icon flipOnRtl>` inside `PrimaryButton` / `SecondaryButton` (**Rule #18**). The marketing buttons handle this — consumers don't need to think about it. **No manual `rtl:rotate-*`** — and `rtl:rotate-90` on a diagonal arrow like `ArrowUpRight` would point it wrong (right-down instead of up-left). Always use the platform's icon-mirror mechanism (`flipOnRtl`), never a rotation transform on directional icons.
- **Stat numerals** stay Western (see "Numerals" above).

## Reference

Adapted from Orion's `src/components/blocks/cta-section/cta-section.tsx`. Dropped: decorative `<Grill />` SVG + `<Card>` wrapper (Rule #16 + calm aesthetic), `<NumberTicker>` (Rule #16). Re-tokenized throughout; heading hierarchy made conditional on `showSectionHeader`.
