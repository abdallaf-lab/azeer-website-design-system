# FeaturesBentoGrid

The "what you get" section below the hero — a SectionHeader-labeled, 5-cell bento grid that pairs a visual with a heading + description per capability. Composes `SectionRails` + `SectionHeader` + 5 visual sub-components.

> **TODO (end of Stage 2B):** see [`../../layout/section-header/README.md`](../../layout/section-header/README.md) — the `SectionHeader` / `SectionHeading` naming pair will likely rename to `SectionLabel` for clarity.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `features` | `FeatureCell[]` | (5 Azeer defaults) | Override the cells. Each cell: `{ title, description, visual, gridSpan?, id? }`. |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | Azeer copy + defaults | Override the SectionHeader. Forwards every SectionHeader prop (Rule #15). |
| `id` | `string` | `"features"` | Section id (anchor link). |
| `className` | `string` | — | Extra classes on the section. |

## Default cells

1. **Channel Unification** — WhatsApp / Voice / SMS / email into one inbox.
2. **AI Agents** — bilingual FAQ handling and lead qualification.
3. **Workflow Automation** — abandoned-cart recovery, appointment confirmations.
4. **Multi-Vertical Templates** *(wide)* — Salla, Zid, clinics, dental chains.
5. **Compliance & Trust** — GDPR, HIPAA, SOC 2 ready.

## Layout

Grid: `cols-1 / sm:cols-2 / lg:cols-3`. Cell 4 is `sm:col-span-2`. Cells 3 and 5 reorder under `sm:max-lg` so the 2-column layout reads naturally `(1,2)(4 wide)(3,5)`. Cell separators use logical `border-s`/`border-e` for RTL.

## Examples

### E-commerce-focused header

```tsx
<FeaturesBentoGrid
  sectionHeader={{
    title: "Built for Salla & Zid",
    description: "Cart recovery, order updates, and post-purchase journeys in one click.",
  }}
/>
```

### Disable the section-header canvas

```tsx
<FeaturesBentoGrid sectionHeader={{ showCanvas: false }} />
```

### Custom feature set (any count)

```tsx
<FeaturesBentoGrid
  features={[
    { title: "Inbox", description: "…", visual: <ChannelsVisual /> },
    { title: "AI", description: "…", visual: <AIAgentsVisual /> },
    { title: "Reports", description: "…", visual: <WorkflowVisual /> },
  ]}
/>
```

## Notes

- **Server Component** (Rule #13). Only the inner `SectionHeader` is `"use client"` (canvas).
- **Calm B2B-premium visuals** (Rule #16) — no continuous animations inside cells.
- **Forwards SectionHeader props** (Rule #15) so callers control the canvas without bypassing the section.

## Reference

Adapted from Orion's `src/components/blocks/features-bento-grid/` (5-cell layout preserved, content + visuals re-authored for Azeer).
