# DottedCanvas

Background canvas with subtle brand-tinted dots, used behind hero workflows and open layouts to add depth without visual noise.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content rendered on top of the canvas (required). |
| `className` | `string` | — | Extra classes on the root. |
| `density` | `'tight' \| 'normal' \| 'loose'` | `'normal'` | Dot grid spacing: 16 / 20 / 24px. |
| `intensity` | `number` | `10` | Dot opacity as a % of brand indigo (≈5–20). |
| `fade` | `boolean` | `true` | Radial mask fading dots out toward the edges. |
| `fadeStart` | `number` | `20` | Where the edge fade begins, % from center (0–50). |
| `parallax` | `boolean` | `true` | Pin the dot layer to the viewport (`background-attachment: fixed`). |
| `height` | `string` | — | Optional fixed height (e.g. `"600px"`); content can fill it (`h-full`). |
| `rounded` | `boolean` | `false` | Round corners and clip the pattern. |

## Usage

### Standalone

```tsx
<DottedCanvas>
  <Hero … />
</DottedCanvas>
```

### Inside SectionRails (the composition pattern)

```tsx
<SectionRails id="hero">
  <DottedCanvas rounded height="420px">
    <div className="flex h-full items-center justify-center">…</div>
  </DottedCanvas>
</SectionRails>
```

### Stronger visual presence

```tsx
<DottedCanvas intensity={20} density="tight">…</DottedCanvas>
```

## Notes & design decisions

- **Dynamic values use inline `style` (not Tailwind classes).** The dot color/size and fade percentage come from props at runtime, and Tailwind v4's JIT can only generate classes it sees statically in source — so interpolated `bg-[radial-gradient(…)]` / `bg-size-[…]` would silently produce **no styles**. Inline `style` is the correct approach here; do not "clean it up" into arbitrary Tailwind classes.
- **`isolate` on the root is required.** The dot grid (`-z-[2]`) and fade overlay (`-z-[1]`) use negative z-index; `isolate` creates a fresh stacking context so they stay contained. Without it they can escape and render behind ancestor backgrounds (the "dots disappear" bug). Do not remove `isolate`.
- **Parallax (`bg-fixed`):** the dot layer uses `background-attachment: fixed` for a scroll-parallax feel. Disable with `parallax={false}` if it causes layout shift on iOS, or when the canvas sits inside an ancestor with a `transform`/`filter` (which breaks fixed attachment).
- **Fade color / surface:** DottedCanvas assumes the **default surface background** — the edge fade dissolves into `bg-bg-default`. If used on tinted backgrounds, the edge fade will mismatch. This will be addressed in Stage 2B if needed (a `fadeColor` prop), per the `TODO(stage-2b)` in the source.
- **`height` → centered content:** when `height` is set, the content wrapper becomes `h-full` so children can vertically center; when unset, content flows at its natural height.
- **RTL:** fully symmetric — works unchanged in `dir="rtl"`.

## Reference

Adapted from Orion's `src/components/blocks/hero-section/hero-section.tsx` (lines ~214–218) — the radial-dot grid + radial-mask fade technique.
