# IntegrationsSection

Curated integration showcase for the marketing page — the **lean** variant of the Orion integration pattern. Drops Orion's search + sidebar filter (those belong on a dedicated `/integrations` directory page); keeps the card grid. Homepage visitors need to SEE that Azeer connects with what they use; they don't need to filter through a directory.

> **When to use this vs a directory page:**
> - **`IntegrationsSection`** (this): trust-signal section on the marketing page. 4–12 curated integrations. No filtering, no search. **Server Component.**
> - **`/integrations` directory** (future): full searchable/filterable list of every integration. Belongs on a dedicated route. Not built yet — Stage 2C or post-ship.

> **Naming note (parked):** new type is `IntegrationsSectionItem` to coexist with the existing `IntegrationItem` from the sibling `../integrations-row` module (Rule #4). The end-of-Stage-2B naming audit will harmonize the 6 parked plural/sectional pairs.

## Props — IntegrationsSection

| Prop | Type | Default | Description |
|---|---|---|---|
| `integrations` | `IntegrationsSectionItem[]` | — | 4–12 integrations (required). |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | Azeer defaults | Forwarded to SectionHeader when shown (Rule #15). |
| `showSectionHeader` | `boolean` | `true` | Render the SectionHeader label. |
| `heroTitle` | `ReactNode` | `"Connect Azeer to your stack"` | Hero heading above the grid. |
| `heroDescription` | `ReactNode` | Azeer copy | Sub-headline. |
| `showHeroCTA` | `boolean` | `true` | Render the hero arrow link. |
| `heroCTA` | `{ label?, href, external? }` | `"View all integrations" → /integrations` | CTA target. |
| `groupByCategory` | `boolean` | `false` | Render category groups (with `<p>` labels) instead of a single grid. |
| `id` | `string` | `"integrations"` | Anchor id. |
| `className` | `string` | — | Extra classes. |

## `IntegrationsSectionItem`

```ts
{
  id: string;
  name: string;
  logo: ReactNode | string;       // production: pass a currentColor SVG
  category: string;                // group label + per-card badge
  description: string;             // 1–2 sentences, line-clamp-3
  link: {
    label?: string;                // default "Learn more"
    href: string;
    external?: boolean;            // adds target="_blank" rel="noopener noreferrer"
  };
  featured?: boolean;              // optional accent ring for strategic partners (Rule #22)
}
```

## Server Component (Rule #13 / #17)

Both `IntegrationsSection` and `IntegrationCard` are **Server Components** — no `"use client"`, no hooks, no handlers. Pure transformation (optional `groupByCategory` bucketing) plus JSX. This means:

- **Smallest possible JS bundle** for this section — zero client-side React for the integration cards themselves.
- **Renders at request time** on the server (Next.js RSC); ships pre-rendered HTML.
- The only client JS that hydrates inside this section is the inner `SectionHeader` (canvas) — and even that is gated by `prefers-reduced-motion`.

This is the **first fully-Server Stage-2B section** (UseCases/Testimonials/FAQ all need state). Major Core Web Vitals win — better FCP, LCP, and SEO crawler friendliness.

### Why no `useMemo` for the grouping?

Plain function call. For typical 4–12 items, the bucketing cost is negligible — `useMemo` overhead would exceed the computation it's memoizing. Plain function is simpler, easier to read, and YAGNI-friendly. If a future use case grows to 50+ items, we can optimize then.

## Heading hierarchy

| `showSectionHeader` | SectionHeader | `heroTitle` | Card name |
|---|---|---|---|
| `true` (default) | `<h2>` | `<h3>` | `<h4>` |
| `false` | (not rendered) | `<h2>` | `<h3>` |

Polymorphic for both hero AND card name — clean outline either way, no skipped levels.

**Why card names are headings (vs FAQ category labels, which are `<p>`):**

- **Integration name** = an item identifier. Distinct named entities in a list. Screen readers benefit from "skip to integration X" navigation. SEO crawlers understand product/partner relationships.
- **FAQ category label** = a group label. Not a navigable item. `<p>` is the right element.

This continues the Rule #11 sub-rule (HTML semantics match content type, not visual prominence) — item identifiers carry navigational semantics; group labels don't.

## Grid layout (Rule #21)

`grid-cols-[repeat(auto-fit,minmax(280px,1fr))]` — each card minimum 280px, fills available space via 1fr, wraps when too narrow. Works for any count 4–12+ without per-N CSS.

## Group by category

When `groupByCategory={true}`:

- Items are bucketed in source order (insertion-order `Map`, same pattern as FAQSection).
- Each group renders a styled `<p>` label (not a semantic heading — keeps document outline clean).
- The per-card category badge is **hidden** in grouped mode to avoid redundancy with the group label.

When `groupByCategory={false}` (default):

- Single auto-fit grid of all integrations.
- Each card shows its category as a badge.

## Featured integrations (Rule #22)

Pass `featured: true` on an item to render a subtle `ring-1 ring-accent-border` around the card. Calm, B2B accent — **not** a BorderBeam.

**Rule #22:** featured/highlighted states on items in lists/grids use subtle treatment (ring, subtle background tint, slight scale). BorderBeam is reserved for **single-emphasis** conversion moments (pricing highlight, hero element, conversion focal points) — never scattered through grids. When in doubt, less is more on emphasis treatments.

Use sparingly (1–2 cards per section, e.g., strategic launch partners). Multiple BorderBeams across a grid = visual chaos; multiple subtle rings still register without overwhelming.

## Logos — production guidance

The `logo` prop accepts **any** `ReactNode` (or a URL string). Storybook ships lucide-icon placeholders so the layout is reviewable without external assets. Production should pass real logos in this preference order:

| Format | When to use | Notes |
|---|---|---|
| `currentColor` SVG | **Preferred** | Theme-adaptive (inherits from `text-*` color); single asset for both themes. |
| Brand-color SVG | When the partner's brand color must be exact | Fixed color regardless of theme. Test against `bg-bg-default` and `bg-bg-muted`. |
| `<img>` URL | Legacy logos (PNG, JPG) | Pass the string URL — rendered as `<img src>`. |
| Lucide icon | Placeholders / generic categories | What stories use. |

The card's logo container (size-10 rounded-md border bg-bg-muted) is DS-owned and stays consistent — consumers own only the icon/image inside.

## Customization examples

### Vertical-focused

```tsx
<IntegrationsSection
  heroTitle="Built for Salla, Zid, and more"
  integrations={ecommerceIntegrations}
/>
```

### Grouped by category

```tsx
<IntegrationsSection groupByCategory integrations={allIntegrations} />
```

### Featured partners

```tsx
<IntegrationsSection
  integrations={[
    { ...salla, featured: true },   // launch partner highlighted
    { ...zid, featured: true },
    ...others,
  ]}
/>
```

### Compact (no CTA, no SectionHeader)

```tsx
<IntegrationsSection
  showSectionHeader={false}
  showHeroCTA={false}
  integrations={items}
/>
```

## RTL

- **Grid auto-fit** is symmetric — mirrors automatically.
- **Card content** uses logical spacing; logo sits at the start of the header row.
- **Category badge** sits at the end of the header row (auto-mirrors via `justify-between`).
- **Learn-more arrow** uses `rtl:rotate-180` + sign-flipped hover translate (Rule #12 refinement + Turn-4 paired-transform sub-rule). Same for the hero CTA arrow.
- **No `text-balance`** (Rule #20).

## Reference

Adapted from Orion's `src/components/blocks/app-integration/integration-tools.tsx`. Dropped: search input, category filter sidebar, scroll-to-top behavior (all belong on a dedicated `/integrations` directory page). Auto-fit grid (Rule #21) replaces Orion's static `sm:grid-cols-2`. Tokens re-mapped throughout.
