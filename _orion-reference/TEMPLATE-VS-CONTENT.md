# Azeer Marketing Components — Template vs Content Architecture

**Critical principle:** Everything in `@azeer/website-ui` is a **template, not content.**

This document explains how to think about, use, and reuse the Stage 2A + 2B
marketing components built during the Path C Orion integration.

---

## The Core Distinction

```
┌──────────────────────────┐         ┌──────────────────────────┐
│  TEMPLATE (component)    │    +    │  CONTENT (data)          │
│                          │         │                          │
│  - Layout                │         │  - Headlines             │
│  - Responsive behavior   │         │  - Descriptions          │
│  - RTL handling          │         │  - CTAs                  │
│  - Brand tokens          │         │  - Plan prices           │
│  - Animations            │         │  - Feature lists         │
│  - Accessibility         │         │  - Visuals (icons/refs)  │
│  - Composition rules     │         │  - URLs                  │
└──────────────────────────┘         └──────────────────────────┘
              │                                  │
              └──────────────┬───────────────────┘
                             ▼
                    ┌─────────────────┐
                    │   RENDERED PAGE │
                    │   (consumer)    │
                    └─────────────────┘
```

**Templates are reusable across infinite contexts.**
**Content is provided at usage time by the consumer.**

---

## Why This Matters

### Speed of execution

- Launch a new vertical landing page in 30 minutes, not 3 weeks
- A/B test copy variants in minutes, not sprints
- Add a new language without engineering involvement
- White-label for partners by swapping content data

### Brand consistency

- One component update propagates everywhere
- No "copy-paste-modify" drift across pages
- RTL, dark mode, reduced motion handled once, applied everywhere
- Token changes ripple instantly across all consumer pages

### Marketing autonomy

- Marketing team owns content (data structures)
- Engineering team owns templates (components)
- Neither blocks the other
- Content changes never require code review

---

## How Each Component Implements This Pattern

### HeroWithWorkflow (Stage 2A)

**Template knows:**
- Hero composition (badge + headline + description + CTAs + workflow)
- SectionRails + DottedCanvas + entrance animations
- Responsive stacking + RTL

**Content the consumer provides:**
- `eyebrowBadge: { icon, label, accent }` — the small badge above title
- `title: string | ReactNode` — main headline
- `description: string | ReactNode` — supporting paragraph
- `primaryCTA: { label, href, icon }` — main button
- `secondaryCTA?: { label, href, icon }` — optional secondary button
- `workflow: WorkflowItemProps[]` — the cards below the hero

**Reuse examples already in stories:**
- Default = e-commerce cart recovery
- Healthcare = no-show prevention
- RTL = Arabic version
- NoSecondaryCTA = focused conversion variant

---

### FeaturesBentoGrid (Stage 2B Turn 1)

**Template knows:**
- 5-cell bento grid layout
- SectionRails + SectionHeader composition
- Responsive: cols-1 / cols-2 / cols-3
- Cell 4 spans 2 cols at sm+
- Architectural borders between cells

**Content the consumer provides:**
- `features: FeatureCell[]` — array of feature cells
  - `title: string` — cell heading
  - `description: string` — cell paragraph
  - `visual: ReactNode` — the visual block at top
  - `gridSpan?: 'normal' | 'wide'` — for the wide cell
- `sectionHeader: { title?, description?, showCanvas?, canvasIntensity? }`

**Reuse examples already in stories:**
- Default = Azeer's 5 core capabilities
- Custom features (3 cells) = different count
- E-commerce focused = same component, e-com narrative
- Healthcare focused = same component, healthcare narrative
- RTL = Arabic content

---

### Pattern for Future Sections

Every Stage 2B section follows the same template-content pattern:

```typescript
interface SectionProps {
  // Content the consumer provides:
  data: SectionSpecificData[]
  sectionHeader?: SectionHeaderProps
  // Template configuration:
  variant?: string
  className?: string
}
```

---

## How to Use Templates in Production

### Scenario A — Standard Azeer marketing page

Use the components with their default content (which is shipped via Storybook
stories as reference data):

```typescript
// app/page.tsx
import { HeroWithWorkflow, FeaturesBentoGrid } from '@azeer/website-ui'
import { defaultHeroContent, defaultFeatures } from '@/content/marketing'

export default function Home() {
  return (
    <>
      <HeroWithWorkflow {...defaultHeroContent} />
      <FeaturesBentoGrid features={defaultFeatures} />
    </>
  )
}
```

### Scenario B — Vertical-specific landing page

Same templates, different content data:

```typescript
// app/healthcare/page.tsx
import { HeroWithWorkflow, FeaturesBentoGrid } from '@azeer/website-ui'
import { healthcareHero, healthcareFeatures } from '@/content/healthcare'

export default function Healthcare() {
  return (
    <>
      <HeroWithWorkflow {...healthcareHero} />
      <FeaturesBentoGrid features={healthcareFeatures} />
    </>
  )
}
```

### Scenario C — Partner white-label

Same templates, partner-branded content:

```typescript
// app/partners/salla/page.tsx
import { HeroWithWorkflow, FeaturesBentoGrid } from '@azeer/website-ui'
import { sallaContent } from '@/content/partners/salla'

export default function SallaPartnerPage() {
  return (
    <>
      <HeroWithWorkflow {...sallaContent.hero} />
      <FeaturesBentoGrid features={sallaContent.features} />
    </>
  )
}
```

---

## Content Organization Recommendation

Once Stage 2B is complete, structure content data like this:

```
/content
  /marketing
    hero.ts                 ← default homepage content
    features.ts
    pricing.ts
    testimonials.ts
    faq.ts
  /healthcare
    hero.ts                 ← healthcare landing content
    features.ts
    testimonials.ts
  /e-commerce
    hero.ts                 ← e-commerce landing content
    features.ts
    testimonials.ts
  /partners
    /salla
      hero.ts
      features.ts
    /zid
      hero.ts
      features.ts
  /locales
    /ar
      hero.ts               ← Arabic content
      features.ts
    /en
      ...
```

**Engineering team:** Owns components in `packages/website-ui/`
**Marketing team:** Owns content in `/content/` (could even be a CMS)

---

## The Storybook Stories ARE Documentation

Every story in Storybook is two things at once:

1. **A test** — proves the component works in a specific scenario
2. **A content template** — shows how content data should look

When marketing team needs to write content for a new page, they look at the
Storybook stories for that section and use the structure as a template.

For example, the `RTL` story for FeaturesBentoGrid shows exactly how to
structure Arabic content for any marketing component.

---

## What This Means for Future Work

### Stage 2B remaining sections (5 more)

Each one will follow this pattern:
- Build the template (component)
- Document the content interface (TypeScript types)
- Create stories that double as content reference (Default, Healthcare,
  E-commerce, RTL, edge cases)

### After Stage 2B

Two parallel workstreams become possible:
- **Engineering:** Polish components, add new ones as needed, improve a11y,
  optimize performance
- **Marketing:** Write content for additional pages (verticals, partners,
  localized markets), A/B test variants, refine copy — without engineering
  involvement

This is what a real design system enables. You're not building a website;
you're building a marketing platform.

---

## Decision Authority

| What | Who owns it |
|------|-------------|
| Component layout, animations, RTL, a11y | Engineering |
| Token values, brand colors, typography | Design |
| Content data (titles, copy, prices, CTAs) | Marketing |
| Which template to use on which page | Marketing + Engineering |
| New template needed (no existing one fits) | Engineering builds it |

---

## Last Word

The 7 components delivered in Stage 2A + Stage 2B Turn 1 are templates.
The content shown in their default stories is reference data, not the
"only correct content."

When you look at Storybook, you're not looking at the Azeer homepage.
You're looking at the *building blocks* that can compose ANY Azeer page,
ANY partner page, ANY vertical page, in ANY language.

That's the value being created. Hold onto this distinction as Stage 2B
continues.
