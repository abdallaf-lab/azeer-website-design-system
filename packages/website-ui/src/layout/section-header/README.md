# SectionHeader

Uppercase section label over a soft brand-tinted flickering canvas, framed by horizontal hairlines. Used above every Stage-2B section (Features, Pricing, FAQ, Testimonials, …) for consistent page rhythm.

> **Distinct from `SectionHeading`** (in `../lib/section.tsx`) — that one is an eyebrow+h2+description **inside** a section. SectionHeader sits **above** content as the label/divider.
>
> **TODO (end of Stage 2B):** the `SectionHeader` / `SectionHeading` naming pair is easy to confuse. Plan a rename to `SectionLabel` (or `MarketingSectionHeader`) once Stage 2B settles.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Section label (rendered uppercase). |
| `description` | `ReactNode` | — | Supporting paragraph below the label. |
| `id` | `string` | — | Anchor id (applied to the outer element). |
| `className` | `string` | — | Extra classes on the wrapper. |
| `showCanvas` | `boolean` | `true` | Render the flickering brand-tinted canvas. |
| `canvasIntensity` | `'subtle' \| 'normal'` | `'subtle'` | Canvas density (0.05/0.06 vs 0.08/0.08). |

## Behavior

- **Canvas color:** light mode = brand indigo `rgb(123, 97, 255)` at low alpha; dark mode = white at low alpha. Theme is sniffed per frame via `document.documentElement.getAttribute('data-theme')`.
- **Reduced motion (Rule #3, decorative):** the canvas is omitted entirely. The border-y + uppercase label + description remain.
- **RTL (Rule #14):** `tracking-wider` is applied via `ltr:tracking-wider` — Arabic labels render with natural letter connection.
- **Sits inside SectionRails** by design — `border-y` spans the rails' padded inner width, not the viewport. This is the Azeer framed-canvas philosophy (deliberate adaptation from Orion's edge-to-edge Separators).

## Reference

Adapted from Orion's `src/components/blocks/section-header.tsx` — `Separator` → `border-y border-border-subtle`, canvas re-tinted to the Azeer brand, theme sniffed via `data-theme`, intensity dialed down (0.15 → 0.05/0.08).
