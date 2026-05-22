# @azeer/website-ui — compose, don't hand-roll

Source of truth: `packages/website-ui/src/index.ts` (public surface) and
`packages/website-ui/src/lib/section.tsx` (shell + CTA). Marketing pages are
**assembled** from these — never hand-roll a hero, pricing table, or feature grid
that already exists. All components read tokens and use logical (RTL-safe) utilities.

## The section shell (every page is built on this)

```tsx
import { Section, Container, SectionHeading, CtaButton } from "@azeer/website-ui";

<Section tone="surface">              {/* tone: canvas | surface | sunken | inverse | accent */}
  <Container>                          {/* centered max-w-7xl column, responsive gutters */}
    <SectionHeading
      display                          {/* opt into the mkt-* scale: mkt-display-md + mkt-body-lg */}
      eyebrow={<Eyebrow icon={Sparkles}>Why Azeer</Eyebrow>}
      title="…"
      description="…"
    />
  </Container>
</Section>
```

- `<Section>` owns vertical rhythm (`py-16 md:py-24`) + surface tone. Don't re-roll spacing.
- `<SectionHeading>` defaults to **start-aligned** (`centered={false}`) — keep it that
  way for asymmetry; only center sparingly.
- `<CtaButton action={{label, href, icon}} variant size />` renders an `<a>` (RSC-safe,
  real link); its trailing icon flips under RTL automatically.

## Atoms

`PromoPill` · `Eyebrow` (icon + label, `pill` variant) · `ProductFrame` (screenshot
container) · `MarketingButton` / `PrimaryButton` / `SecondaryButton` (ring-expand CTAs)
· `FeatureCard` · `TrustBadges` (tone `light | dark`).

## Sections (by job)

- **Chrome:** `Navbar` (sticky, **no backdrop-blur**), `Footer`, `LandingNav`/`SiteNavbar`/`SiteFooter` (app-local).
- **Heroes:** `MarketingHero` (always mkt-scale, brand wash, pill slot) · `HeroSplit`
  · `HeroSplitVideo` · `HeroCentered`.
- **Content / capability:** `FeatureGrid` · `FeatureSplit` · `VerticalSwitcher` ·
  `CompareTable` · `FAQ`.
- **Social proof / trust:** `StatsBand` · `TestimonialGrid` / `TestimonialQuote` ·
  `LogoCloud` · `ComplianceBand` · `IntegrationsRow` · `ChannelsRow`.
- **Conversion:** `PricingCards` · `PricingCalculator` · `CTABanner` · `DarkCTA`
  (closing dark panel, `badges` slot) · `NewsletterSignup`.
- **Blog:** `BlogCard`.
- **Brand identity:** `AzeerLogo` · `AzeerMark` · `BrandPattern`
  (`variant: waves | topographic | grid | layers`).

## Prefer-for-asymmetry map

| Avoid (symmetric / generic) | Prefer (asymmetric / Azeer) |
|---|---|
| `HeroCentered` | `HeroSplit` / `HeroSplitVideo` (text one side, product/visual the other) |
| A row of 3 identical `FeatureCard`s | Alternating `FeatureSplit` rows — **flip the media side each row** |
| Centered testimonial under the hero | `StatsBand` / `ChannelsRow` / `CompareTable` to break rhythm; testimonials later |
| Generic feature grid as the whole page | Mix `FeatureGrid` with `FeatureSplit` + a `CompareTable` + vertical visuals |

`FeatureSplit`, `FeatureGrid`, and `TestimonialQuote` take a `marketing` prop and
`SectionHeading` a `display` prop that switch them to the `mkt-*` scale + neutral
semantics. `MarketingHero` is always on the marketing scale.

## Opt-in marketing scale example

```tsx
<DarkCTA
  title="Ready to fill more chairs?"
  description="Connect WhatsApp and start booking — live in days."
  primaryCta={{ label: "Start free trial", href: "/signup", icon: ArrowRight }}
  secondaryCta={{ label: "Talk to sales", href: "/contact-sales" }}
  badges={closingBadges}
/>
```

## Rules

1. **Compose first.** If a section exists, use it. New atoms only when nothing fits.
2. **`cn` from `@azeer/website-ui`** for class composition — its tailwind-merge
   safelist knows `mkt-*` and brand tokens. Never `clsx`.
3. **Icons via the system `<Icon icon={…} />`** (strokeWidth locked 1.5; `flipOnRtl`
   for directional). Don't import `lucide-react` directly.
4. **No `backdrop-blur` on the nav.** Borders before shadows everywhere.
5. A live reference renders at `/[locale]/styleguide` (`/en/styleguide`,
   `/ar/styleguide`) — check it before inventing.
