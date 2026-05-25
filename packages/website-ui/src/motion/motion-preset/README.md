# MotionPreset

Entrance fade/blur reveal for marketing sections — RTL-safe, scroll-triggered, and `prefers-reduced-motion` aware.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to reveal (required). |
| `fade` | `boolean` | `true` | Fade opacity 0 → 1. |
| `blur` | `boolean` | `false` | Blur 10px → 0, alongside the fade. |
| `delay` | `number` | `0` | Extra delay (s), added on top of `transition.delay`. |
| `duration` | `number` | `0.5` | Animation duration (s). |
| `inView` | `boolean` | `true` | Animate when scrolled into view (once). `false` = animate on mount. |
| `className` | `string` | — | Classes for the wrapper (composed with `cn`). |
| `transition` | `Transition` | — | Escape hatch, merged over the default duration/ease. |

## Usage

### Basic entrance fade

```tsx
<MotionPreset>
  <FeatureCard icon={MessageSquare} title="Unified inbox" description="…" />
</MotionPreset>
```

### Stagger (multiple children with increasing delays)

```tsx
{features.map((f, i) => (
  <MotionPreset key={f.title} blur delay={i * 0.1}>
    <FeatureCard {...f} />
  </MotionPreset>
))}
```

### Scroll-triggered (default)

```tsx
{/* inView defaults to true → reveals once when it scrolls into the viewport */}
<MotionPreset blur inView>
  <ProductFrame>…</ProductFrame>
</MotionPreset>
```

## Reduced motion

When the OS/browser requests `prefers-reduced-motion: reduce`, MotionPreset skips animation entirely and renders its children immediately. No configuration needed.

## Reference

Adapted from Orion's `src/components/ui/motion-preset.tsx` (slide/zoom/polymorphic-component options removed; reduced-motion fallback added; strict-typed).
