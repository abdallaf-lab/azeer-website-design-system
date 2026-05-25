# BorderBeam

A decorative light that travels around an element's border — premium accent for badges and cards, brand-indigo by default.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `50` | Diameter of the traveling beam (px). |
| `duration` | `number` | `6` | Seconds for one full traverse of the perimeter. |
| `delay` | `number` | `0` | Negative seed into the loop (s), for phase-offsetting multiple beams. |
| `colorFrom` | `string` | `var(--brand-primary)` | Leading edge color. |
| `colorTo` | `string` | `var(--brand-primary)` | Trailing edge color — differ from `colorFrom` for a gradient. |
| `transition` | `Transition` | — | Escape hatch, merged over the infinite/linear loop. |
| `reverse` | `boolean` | `false` | Travel counter-clockwise. |
| `initialOffset` | `number` | `0` | Starting position along the perimeter (0–100%). |
| `borderWidth` | `number` | `1` | Border thickness the beam rides on (px). |
| `className` | `string` | — | Extra classes on the beam element. |
| `style` | `CSSProperties` | — | Extra inline styles on the beam element. |

## Usage

> The host element must be `position: relative` and rounded (the beam inherits its radius). Add `overflow-hidden` to clip the comet to the shape.

### On a badge ("New" / "Beta" pill)

```tsx
<span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-3 py-1">
  <Sparkles size={14} aria-hidden="true" /> New · AI agents
  <BorderBeam size={35} />
</span>
```

### On a card (subtle premium accent)

```tsx
<div className="relative overflow-hidden rounded-2xl border p-6">
  …card content…
  <BorderBeam size={100} duration={12} />
</div>
```

### With custom gradient colors

```tsx
<BorderBeam colorFrom="var(--brand-primary)" colorTo="var(--brand-secondary)" />
```

## Reduced motion

BorderBeam is purely decorative. When the OS/browser requests `prefers-reduced-motion: reduce`, the component **renders `null`** — the host keeps its own static border and no beam is shown.

## Reference

Adapted from Orion's `src/components/ui/border-beam.tsx` (brand-indigo defaults; reduced-motion renders null; strict-typed).
