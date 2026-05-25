# SectionRails

The architectural section wrapper for every Azeer marketing page. Creates the Linear/Vercel-grade vertical rails + bottom-border treatment by composing two divs.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Section content (required), rendered in the centered railed column. |
| `className` | `string` | — | Extra classes, merged onto the outer (full-bleed) element. |
| `density` | `'compact' \| 'normal' \| 'spacious'` | `'normal'` | Inner vertical rhythm. |
| `showBottomBorder` | `boolean` | `true` | Render the dividing bottom hairline. Set `false` on the last section. |
| `id` | `string` | — | Anchor id for in-page links (e.g. `"hero"`, `"pricing"`, `"faq"`). |
| `as` | `'section' \| 'div' \| 'article'` | `'section'` | Semantic element for the outer wrapper. |

### Density → padding

| Density | Padding (mobile → sm → lg) |
|---|---|
| `compact` | `py-8 sm:py-12 lg:py-16` |
| `normal` | `py-8 sm:py-16 lg:py-24` |
| `spacious` | `py-12 sm:py-20 lg:py-32` |

## Usage

### Single section

```tsx
<SectionRails id="hero">
  <MarketingHero … />
</SectionRails>
```

### Multiple stacked sections (the page rhythm)

```tsx
<SectionRails id="hero">…</SectionRails>
<SectionRails id="features" density="compact">…</SectionRails>
<SectionRails id="cta" showBottomBorder={false}>…</SectionRails>
```

The inner `border-x` rails line up across stacked sections into two continuous vertical guides; each `border-b` divides the sections.

### With a semantic tag (e.g. blog posts)

```tsx
<SectionRails as="article" id="post">
  <ArticleBody />
</SectionRails>
```

## Notes

- **Content max-width:** Marketing sections use `max-w-7xl` (1280px), wider than the product ceiling (`max-w-content`, 1080px). This is intentional and matches modern SaaS marketing conventions (Linear, Vercel, Stripe). The product UI in `@azeer/ui` keeps its 1080px ceiling — unchanged.
- **Responsive padding:** horizontal gutters `px-4 sm:px-6 lg:px-8` on both wrappers; vertical via `density` (normal = `py-8 sm:py-16 lg:py-24`).
- **Rail color:** `border-border-subtle` (≈#e5e5e5) — the structural-rail weight, deliberately visible (not a whisper).
- **Marketing-only:** this is a public-site layout treatment; the product app shell owns its own chrome and does not use rails.
- **RTL:** rails and gutters are symmetric — works unchanged in `dir="rtl"`.

## Reference

Adapted from Orion's `src/components/blocks/hero-section/hero-section.tsx` (lines 120–121) — the two-wrapper rails pattern, generalized into a reusable wrapper.
