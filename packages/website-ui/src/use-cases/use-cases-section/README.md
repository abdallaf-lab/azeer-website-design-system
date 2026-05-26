# UseCasesSection

Tabbed showcase of vertical-specific use cases. Each tab pairs a title + description + Learn-more link with a visual (passed by the caller) and an optional testimonial stack overlay. Tabs auto-rotate every 5s by default, pause on hover, and respect `prefers-reduced-motion`.

## Props — UseCasesSection

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `UseCaseTab[]` | — | 2–5 tabs (required). |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | Azeer defaults | Forwarded to SectionHeader when shown (Rule #15). |
| `showSectionHeader` | `boolean` | `true` | Render the SectionHeader label. When `false`, the hero is the section's primary heading. |
| `heroTitle` | `ReactNode` | `"See how Azeer powers every customer-facing team"` | Hero above the tabs. Heading level adapts to `showSectionHeader`. |
| `autoRotateInterval` | `number` | `5000` | Tab rotation in ms. Set to `0` to disable. Paused while the section is hovered. |
| `showTestimonials` | `boolean` | `true` | Render the TestimonialStack overlay. |
| `id` | `string` | `"use-cases"` | Anchor id. |
| `className` | `string` | — | Extra classes. |

## `UseCaseTab`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable id (also the tab `value`). |
| `name` | `string` | Trigger label. |
| `icon` | `ReactNode` | A Lucide icon JSX element (e.g. `<ShoppingCart />`). |
| `title` | `string` | Active-tab heading (h3). |
| `description` | `string` | Active-tab body. |
| `learnMoreLink` | `{ label?, href }` | Default label `"Learn more"`. |
| `visual` | `ReactNode` | Right-column visual (see "Visuals — production guidance" below). |
| `testimonials` | `TestimonialCard[]?` | 2–5 testimonials for the stack. |

## `TestimonialCard`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable key. |
| `quote` | `string` | The testimonial text (rendered with smart quotes). |
| `author` | `string?` | Attribution name. |
| `role` | `string?` | Role + company (appended after `author`). |

## Visuals — production guidance

The `visual` prop accepts **any** `ReactNode`. Storybook ships a token-only placeholder (brand-tinted radial glow + icon card + caption) so the layout is reviewable without external assets, but **production should pass real product screenshots, demo videos, or custom components**:

```tsx
visual: <img src="/use-cases/ecommerce.webp" alt="…" className="size-full object-cover" />
// or
visual: <video src="/use-cases/healthcare.mp4" autoPlay muted loop playsInline />
// or any composed Server Component
```

This is the template-vs-content separation: the component knows about layout; the content data provides the visual.

## Heading hierarchy

| `showSectionHeader` | SectionHeader | `heroTitle` | Tab title |
|---|---|---|---|
| `true` (default) | `<h2>` "Use Cases" | `<h3>` | `<h3>` |
| `false` | (not rendered) | `<h2>` | `<h3>` |

This is the established Stage-2B convention (introduced in CTASection) — composites with both a SectionHeader and a hero headline switch the hero's level based on whether the SectionHeader is shown. Always a clean document outline.

## Auto-rotation

- Defaults to **5000ms** per Rule #16 calibration. Orion's 2000ms was anxiety-inducing; 5s feels intentional.
- **Pauses on hover** (mouse enter/leave on the section wrapper) — never switches a tab out from under a reader.
- **Disabled when `prefers-reduced-motion: reduce`** — users navigate manually.
- Set `autoRotateInterval={0}` to disable globally.

## TestimonialStack — Rule #16 calibration

The stack rotates every **5000ms**, not Orion's 2s. Continuous motion below ~3s reads as twitchy/promotional and conflicts with Azeer's calm B2B aesthetic. 5s matches the parent tab rotation rhythm.

Under reduced motion, the stack renders the three cards at their initial scale/opacity positions (no rotation), preserving the "many reviews" visual without animation.

**Reset on tab change:** `TestimonialStack` rotates internal state and does **not** sync prop changes back to state (avoids `setState`-in-effect anti-pattern). Reset happens via **remount**: Radix `Tabs.Content` unmounts inactive content by default, so each tab activation mounts a fresh `TestimonialStack` instance starting at index 0 — the new tab's first testimonial always appears on top. If you use `TestimonialStack` outside Tabs and want to reset when the array changes, pass a `key` that changes with the data.

## Tabs styling — DS no-pill rule interpretation

The Azeer DS `Tabs` primitive is **underline-only** by default; DS Variants.md says *"pill tabs are banned"*. That rule targets:

- **Shape** — no `rounded-full` containers around individual triggers (no "buttons floating in a container").

It does **not** prohibit:

- A filled active state (`data-[state=active]:bg-bg-muted` on a rectangular cell).
- Rectangular cells with shared `divide-x` borders.

This section's tabs use **rectangular cells with shared borders + a filled active state**, which is DS-compliant. The default underline (`border-b-2` + `border-accent-fill` on active) is removed via `border-b-0` because the architectural border layout (border-t above, divide-x between) carries the structure visually.

## Tab trigger sizing — `flex-1` over `basis-1/N`

Orion uses a hard-coded `basis-1/3` that overshrinks for any other tab count. We use **`flex-1`**, which distributes available space equally regardless of count. Works for 2 tabs, 3 tabs, 5 tabs — without per-N CSS branches.

## Component boundaries (Rule #13 / #17)

- **`UseCasesSection`** is `"use client"` (useState + useEffect for tab rotation, mouse handlers for pause-on-hover).
- **`TestimonialStack`** is `"use client"` (motion).
- Tab content children (the `visual` and the body inside `MotionPreset`) bundle client-side here because the parent is client, but stay server-compatible if reused elsewhere.

## RTL handling

- **Grid columns auto-mirror** (the `max-lg:hidden` right column becomes left in RTL).
- **Column separator** uses logical `border-s` — correct in both directions.
- **Tab triggers** stay in source order; their cells fill equally in either direction via `flex-1`.
- **Learn-more arrow** uses `rtl:rotate-180` for the decorative inline icon **paired with `rtl:group-hover:-translate-x-0.5`** to flip the hover slide. This is the Rule #12 refinement (decorative arrow, not in a button → Rule #18's `flipOnRtl` doesn't apply); the paired transform + translate flip preserves "arrow slides toward where it points" in both LTR and RTL.

## Customization examples

### Vertical-focused

```tsx
<UseCasesSection
  sectionHeader={{ title: "For e-commerce brands" }}
  heroTitle="Built for Salla, Zid, and direct-to-consumer brands"
  tabs={ecommerceTabs}
/>
```

### Partner / white-label

```tsx
<UseCasesSection
  tabs={partnerTabs.map((t) => ({
    ...t,
    learnMoreLink: { href: `/partners/acme${t.learnMoreLink.href}` },
  }))}
/>
```

### Manual navigation only

```tsx
<UseCasesSection tabs={tabs} autoRotateInterval={0} />
```

## Reference

Adapted from Orion's `src/components/blocks/use-cases-section/{use-cases-section,testimonial-stack}.tsx`. Dropped: decorative gray-word headline (accessibility + brand fit), 2s testimonial rotation (Rule #16). Tabs re-styled to filled rectangular cells (DS-compliant); tokens re-mapped throughout.
