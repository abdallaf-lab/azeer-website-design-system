# FAQSection

Two-column FAQ section with category grouping. Reduces conversion friction by addressing common buyer concerns before the final CTA. Closes Stage 2B Phase 2.

> **Naming note (parked):** lives in the same `./faq` module as the existing simpler `FAQ` component. The new type is **`FAQSectionItem`** to avoid colliding with `FAQItem` from `FAQ.tsx`. Both coexist; the end-of-Stage-2B naming audit will harmonize the `FAQ`/`FAQSection` pair (along with `SectionHeader`/`SectionHeading`, `PricingPlan`/`PricingSectionPlan`, `CTABanner`/`CTASection`, `testimonial`/`testimonials`).

> **When to use:**
> - **`FAQSection`** (this) — big featured FAQ block with hero copy, dual CTAs, and two category columns. Page-level section.
> - **`FAQ`** (sibling) — simpler single-column FAQ for compact contexts (in-app help, sidebar, doc pages).

## Props — FAQSection

| Prop | Type | Default | Description |
|---|---|---|---|
| `faqs` | `FAQSectionItem[]` | — | 4–12 items (required). |
| `sectionHeader` | `{ title?, description?, showCanvas?, canvasIntensity? }` | Azeer defaults | Forwarded to SectionHeader when shown (Rule #15). |
| `showSectionHeader` | `boolean` | `true` | Render the SectionHeader label. |
| `heroTitle` | `ReactNode` | `"Got questions? We've got answers."` | Hero heading above the columns. |
| `heroDescription` | `ReactNode` | Azeer copy | Sub-headline. |
| `categories` | `{ left, right? }` | (auto-detect) | Pin specific category names to columns; otherwise auto-detect first 2. |
| `showCTAs` | `boolean` | `true` | Render the Docs + Contact CTAs. |
| `primaryCTA` | `CtaAction` | `Docs → /docs` | Primary CTA. |
| `secondaryCTA` | `CtaAction \| null` | `Contact us → /contact` | Secondary CTA. Pass `null` to omit. |
| `id` | `string` | `"faq"` | Anchor id. |
| `className` | `string` | — | Extra classes. |

## `FAQSectionItem`

```ts
{
  id: string;
  question: string;
  answer: string | ReactNode;   // strings render as text; ReactNode for lists/links/paragraphs
  category: string;             // groups items into columns
}
```

## Category detection

Items are bucketed by their `category` field while preserving **source order** of category names (via a `Map`):

- **1 unique category** → single-column layout (no grid split).
- **2 unique categories** → left = first-seen, right = second-seen.
- **3+ unique categories** → **only the first two render. Extra categories' items are not displayed.** No console warning (the behavior is documented in this README + TypeScript types; there's no runtime overhead for hypothetical misuse).

If you need more than 2 categories: either split into multiple `FAQSection` instances OR consolidate categories at the data layer.

Override the detection by passing `categories={{ left: "Product & Setup", right: "Pricing & Plans" }}` — useful when source order doesn't match the intended column order, or when you want to filter to specific category names.

## Auto-expand pattern

The first item in each column is open by default (Radix `defaultValue`). This gives the reader an immediate signal that questions get real answers — not just collapsed headers. Other items are click-to-open with `type="single" collapsible` (one open per column at a time, all can be closed).

## Heading hierarchy (Stage-2B locked-in convention)

| `showSectionHeader` | SectionHeader | `heroTitle` | Category labels | Question (in trigger) |
|---|---|---|---|---|
| `true` (default) | `<h2>` | `<h3>` | `<p>` (visual, not heading) | inside a `<button>` |
| `false` | (not rendered) | `<h2>` | `<p>` (visual, not heading) | inside a `<button>` |

Mirrors the polymorphic `const Heading = showSectionHeader ? "h3" : "h2"` pattern from CTASection (Turn 3) and UseCasesSection (Turn 4). Three sections now use it — predictable behavior across composites.

Category labels render as styled `<p>` rather than headings to keep the document outline clean (no skipped levels). The visual treatment (`text-mkt-heading-sm text-accent-text`) carries the group semantics — Rule #11 sub-rule from Turn 5: HTML semantics match content type, not visual prominence.

## Accordion icon — ChevronDown, not Plus (DS preference)

Orion uses an inline `PlusIcon` with a CSS morph trick (rotating + line-opacity) so the plus visually becomes a minus on open. To preserve that in Azeer, we'd need to:

- Import `@radix-ui/react-accordion` directly into `website-ui` (phantom dependency), AND
- Bypass the DS `AccordionTrigger` (which has `<ChevronDown>` baked in).

Two rules conflict with this: Rule #4 (don't modify DS primitives, use as-is) + "don't install new deps". **We use the DS Accordion as-is**, with ChevronDown rotating 180° on open. This matches the sibling `FAQ` component and keeps the FAQ pattern consistent across the system.

**Rule #4 sub-rule:** when Orion uses a custom icon/treatment for a behavior the DS already handles, prefer the DS treatment. Consistency compounds across the design system.

## Reduced motion

The DS Accordion's height transition (`accordion-down`/`accordion-up`) plays regardless of `prefers-reduced-motion`. This is **INTERACTION motion** — it tells the user "content is appearing/disappearing" — not decorative. The DS made that call; we respect it.

**Rule #3 sub-rule:** marketing composites should NOT override DS reduced-motion decisions on primitives they use. If the DS shipped it with motion enabled under reduce, the DS team decided it's functional, not decorative.

## Customization examples

### Vertical-focused (healthcare)

```tsx
<FAQSection
  sectionHeader={{ title: "Clinic FAQ" }}
  heroTitle="Common questions from clinic operators"
  faqs={healthcareFaqs}
  categories={{ left: "Setup & compliance", right: "Pricing" }}
/>
```

### Partner / white-label

```tsx
<FAQSection
  primaryCTA={{ label: "Acme docs", href: "/partners/acme/docs" }}
  secondaryCTA={{ label: "Talk to Acme team", href: "/partners/acme/contact" }}
  faqs={partnerFaqs}
/>
```

### Single-column (one category)

```tsx
<FAQSection faqs={faqsAllInOneCategory} />
{/* Auto-collapses to single-column layout */}
```

### No CTAs (compact)

```tsx
<FAQSection faqs={faqs} showCTAs={false} />
```

## Component boundaries (Rule #13 / #17)

- **`FAQSection`** is `"use client"` (Radix Accordion needs the directive — DOM hooks for keyboard navigation, focus management, animation state).
- The `FAQColumn` helper renders client-side under the same boundary.

## Accessibility

The DS `Accordion` (Radix-backed) provides full accessibility:

- **Keyboard nav:** Tab/Shift+Tab between triggers; Space/Enter to toggle; Home/End jumps to first/last.
- **Screen readers:** triggers are `<button>` with `aria-expanded` + `aria-controls`; content uses `aria-labelledby` linked to the trigger.
- **Focus visible:** the DS sets the global `:focus-visible` ring on triggers.

## RTL

- **Two-column grid** content is symmetric (FAQs in both columns) — Rule #19 doesn't apply; columns flow in source order.
- **ChevronDown** sits at the end side via flex `justify-between` in the DS Trigger — auto-positions correctly in both LTR and RTL.
- **Category label** is `text-start` (logical) so it aligns to the reading-start edge in both directions.
- **No `text-balance`** anywhere (Rule #20).

## Reference

Adapted from Orion's `src/components/blocks/faq-section/faq-section.tsx`. Dropped: numeric prefixes (`1.`, `2.` — cleaner; FAQs are self-contained, not sequential), plus-icon morph technique (Rule #4 sub-rule — DS ChevronDown used instead). Tokens re-mapped throughout.
