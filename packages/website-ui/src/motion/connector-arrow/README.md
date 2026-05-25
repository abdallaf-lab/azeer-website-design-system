# ConnectorArrow

A self-drawing SVG arrow that visually connects workflow cards (input → action → output). Combines Orion's horizontal + vertical arrows into one `direction`-driven component.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `'right' \| 'left' \| 'down' \| 'up'` | `'right'` | Visual (LTR) direction the arrow points. |
| `delay` | `number` | `0` | When the draw animation starts (s). |
| `className` | `string` | — | Positioning/sizing from the parent (e.g. `absolute …`). |
| `strokeWidth` | `number` | `2` | Line/arrowhead thickness. |
| `color` | `string` | `var(--color-border-strong)` | Color override (theme-aware token by default). |
| `duration` | `number` | `0.4` | Main line/diamond draw duration (s). |
| `showDiamond` | `boolean` | `true` | Render the starting diamond marker. |

## Animation sequence

1. **Diamond** fades in at `delay`.
2. **Line** draws (`pathLength`) at `delay + 0.24`.
3. **Arrowhead** draws + fades at `delay + 0.64`.

## Usage

### Between cards (horizontal flow)

```tsx
<div className="flex items-center gap-4">
  <Card>Input</Card>
  <ConnectorArrow direction="right" delay={0.3} />
  <Card>Action</Card>
</div>
```

### Vertical flow (stacked cards)

```tsx
<ConnectorArrow direction="down" />
```

### Custom color

```tsx
<ConnectorArrow color="var(--brand-primary)" strokeWidth={2} />
```

## Positioning

The component renders only the sized SVG — **placement is the parent's job.** Pass absolute classes via `className`, e.g. `className="absolute start-full top-1/2 -translate-y-1/2"`.

## Reduced motion

ConnectorArrow is **functional** (it shows the connection between cards), so under `prefers-reduced-motion: reduce` it renders **fully drawn, statically** — never hidden.

## RTL

**Horizontal arrows follow text reading direction. Vertical arrows always follow visual top-to-bottom, regardless of script.**

- Horizontal arrows auto-mirror inside a `dir="rtl"` context (`rtl:-scale-x-100` on the wrapper): `direction="right"` points **leftward** (along Arabic reading flow); `direction="left"` points **rightward**.
- Direction reversal (`left`/`up`) is applied on the SVG itself, so it composes predictably with the RTL mirror.
- Vertical arrows (`up`/`down`) are unaffected by RTL.

## Reference

Combines Orion's `src/components/blocks/hero-section/arrow-right.tsx` and `arrow-bottom.tsx` (same draw-on-mount technique, horizontal + vertical) into one component.
