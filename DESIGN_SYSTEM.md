# Azeer Marketing Design System

Dub-grade marketing **patterns** adapted onto the Azeer brand. This document
covers the public marketing layer — `@azeer/website-ui` (sections + primitives),
`apps/website` (the Next.js site), and the brand/marketing token files in
`@azeer/tokens`. The product-UI design system (the ~52 primitives in
`@azeer/ui`) is documented separately in the root `CLAUDE.md` and is **not**
changed by this layer.

> **What this is:** Dub's scale, rhythm, elevation, motion, effects, and
> component anatomy — re-expressed in Azeer's colors and fonts.
> **What this is not:** a re-skin of Dub. We adopt patterns, never screens, and
> never Dub's palette or type.

---

## 1. Ten principles

1. **One typeface, weight-driven hierarchy.** Azeer uses a single family for all
   visual UI — the brand font is **Dialogue ME** (Arabic + Latin). Hierarchy
   comes from weight + size, not from mixing families. Code/data uses the mono
   family only.
2. **Light at large sizes.** Display tiers are **Medium (500)**, not bold. Big +
   light = the airy aesthetic. Reserve heavy weights for rare editorial moments.
3. **Letter-spacing stays at `0`.** Never `tracking-tight`. Tight tracking
   destroys Arabic legibility; the marketing scale ships `letter-spacing: 0` on
   every tier.
4. **Borders before shadows.** Hierarchy is carried by 1px borders and surface
   tone. Shadows are reserved for genuinely floating things (`shadow-sm` on a
   product frame), never a hover lift.
5. **Hover = ring expand, never lift.** Interactive emphasis is a `ring-4`
   expansion on the 150ms `cubic-bezier(.4,0,.2,1)` curve — no translate.
6. **Brand color is an accent, not chrome.** Neutral surfaces + neutral text do
   the structural work; the brand indigo (`#7B61FF`) appears in washes, eyebrows,
   and CTAs — sparingly.
7. **Airy, capped width.** Marketing content tops out at `max-w-content`
   (1080px); text columns read at `max-w-reading` (672px).
8. **RTL is a release gate.** Logical properties only (`ps/pe/ms/me/start/end`);
   directional icons flip via `flipOnRtl`. Every component works in `dir="ltr"`
   and `dir="rtl"`.
9. **Compose from the system.** Marketing pages are assembled from
   `@azeer/website-ui` sections + primitives and the token scale — not ad-hoc
   utilities.
10. **Tokens are the source of truth.** Use semantic token utilities
    (`text-content-default`, `text-mkt-display-lg`), never raw values
    (`text-neutral-700`, `text-5xl`, `#…`).

---

## 2. Token reference

The marketing tokens live in `packages/tokens/src/marketing.css` (a Tailwind v4
`@theme` layer imported by `brand.css`). The brand palette lives in `brand.css`.
The product tokens live in `tokens.css`. **There is no `tailwind.config.ts`** —
this repo is Tailwind v4, CSS-first.

### 2.1 Brand colors (preserved — never change)

| Token | Utility | Hex | Role |
|---|---|---|---|
| Primary | `bg-brand-primary` | `#7B61FF` | Identity indigo (non-text) |
| Secondary | `bg-brand-secondary` | `#0A1F44` | Deep navy, trust |
| Accent | `bg-brand-accent` | `#FFC857` | Optimistic amber (pair w/ `brand-on-accent`) |
| Neutral | `bg-brand-neutral` | `#2E2E2E` | Near-black base |
| Supportive | `bg-brand-supportive` | `#F4F4F4` | Light breathing room |

For **white-text CTAs** use the accessible brand-derived fill `bg-accent-fill`
(`#5238D1`, AAA on white) — `brand-primary` is a non-text identity color.

### 2.2 Neutral semantic tokens (Dub architecture)

`bg-*` (backgrounds) · `content-*` (text/icons) · `border-*` (borders). Utilities
double the namespace, e.g. `bg-bg-default`, `text-content-subtle`,
`border-border-subtle`.

| Background | Border | Content (text) |
|---|---|---|
| `bg-bg-default` `#fff` | `border-border-muted` `#f5f5f5` | `text-content-muted` `#a3a3a3` |
| `bg-bg-muted` `#fafafa` | `border-border-subtle` `#e5e5e5` | `text-content-subtle` `#737373` |
| `bg-bg-subtle` `#f5f5f5` | `border-border-emphasis` `#a3a3a3` | `text-content-default` `#404040` |
| `bg-bg-emphasis` `#e5e5e5` | — | `text-content-emphasis` `#171717` |
| `bg-bg-inverted` `#171717` | — | `text-content-inverted` `#fff` |

Intent neutrals: `bg-bg-{info,success,attention,error}` paired with
`text-content-{info,success,attention,error}`. The default border tier
(`border-border-default`) is owned by the product layer; marketing uses
muted/subtle/emphasis.

### 2.3 Typography scale (marketing) — `text-mkt-*`

Namespaced `mkt-` so it never collides with the product scale. Letter-spacing is
`0` on every tier. Weights map to the Dialogue ME guide (§4), capped at 600.

| Token | Size | Line | Weight | Use |
|---|---|---|---|---|
| `text-mkt-display-xl` | 48px | 1.15 | 500 | Hero H1 |
| `text-mkt-display-lg` | 48px | 1.0 | 500 | Section display |
| `text-mkt-display-md` | 36px | 1.25 | 500 | Article H1 / section heading |
| `text-mkt-heading-lg` | 24px | 2rem | 600 | Section H2 |
| `text-mkt-heading-md` | 24px | 2rem | 600 | Heading |
| `text-mkt-heading-sm` | 20px | 2rem | 600 | Card title |
| `text-mkt-heading-xs` | 18px | 1.75rem | 600 | Sub-heading |
| `text-mkt-body-lg` | 20px | 1.5 | 400 | Hero subhead |
| `text-mkt-body` | 16px | 1.75 | 400 | Body |
| `text-mkt-body-sm` | 14px | 1.43 | 400 | UI / links / feature body |
| `text-mkt-caption` | 12px | 1.33 | 500 | Eyebrow / caption |

### 2.4 Spacing & content rhythm

4px base (Tailwind `--spacing`). Section vertical rhythm: `py-16 md:py-24` (via
`<Section>`). Content max-widths:

| Utility | Width | Use |
|---|---|---|
| `max-w-content` | 1080px | Marketing content ceiling |
| `max-w-prose` | 800px | Long-form column |
| `max-w-reading` | 672px | Hero / heading text column |

### 2.5 Radius

Tailwind v4 defaults (already at Dub values) plus the product scale.

| Utility | Px | Use |
|---|---|---|
| `rounded-lg` | 8 | Buttons |
| `rounded-xl` | 12 | Inner cards |
| `rounded-2xl` | 16 | Feature cards, product frames |
| `rounded-3xl` | 24 | Hero frames, dark CTA |

### 2.6 Shadow (borders-first)

Tailwind v4 defaults map to Dub's scale exactly — no custom tokens.

| Utility | Use |
|---|---|
| `shadow-xs` | Pills, faint lift |
| `shadow-sm` | Product frames, floating cards |
| `shadow-md` / `shadow-lg` | Larger floating surfaces (sparingly) |

Never apply shadow to a flat card; never use shadow for hover.

### 2.7 Motion

The Tailwind default `transition` is already **150ms** + **`cubic-bezier(.4,0,.2,1)`**
— use it directly (`transition`, `transition-colors`). Hover interactions expand
a ring (`hover:ring-4`), they do not move the element.

### 2.8 Visual effects

| Utility | Effect |
|---|---|
| `bg-dot-grid` | 24px neutral dot grid (`--mkt-border-subtle`) |
| `bg-hero-brand` | Top radial wash in **our** brand primary at 15% |

---

## 3. Component inventory

All components come from `@azeer/website-ui`. New atoms are marked ★.

### Atoms

```tsx
import { PromoPill, Eyebrow, ProductFrame, PrimaryButton, SecondaryButton } from "@azeer/website-ui";

// ★ PromoPill — top eyebrow pill
<PromoPill><Sparkles className="h-4 w-4" aria-hidden /> New · AI Agents</PromoPill>

// ★ Eyebrow — icon + label (inline, or pill)
<Eyebrow icon={Sparkles}>Why Azeer</Eyebrow>
<Eyebrow icon={Sparkles} pill>What's new</Eyebrow>

// ★ ProductFrame — screenshot container (rounded-2xl, border, shadow-sm)
<ProductFrame><ProductMock label="Azeer · Shared inbox" /></ProductFrame>

// ★ PrimaryButton / SecondaryButton — ring-expand CTAs (rounded-lg, px-5 py-2)
<PrimaryButton action={{ label: "Start free trial", href: "/signup", icon: ArrowRight }} />
<SecondaryButton action={{ label: "Book a demo", href: "/demo" }} />

// ★ FeatureCard — capability card on the marketing scale (icon + title + body)
<FeatureCard icon={Clock} title="Smart timing" description="Sends at high-open-rate windows." />

// ★ TrustBadges — compliance/partner pill row (tone "light" | "dark")
<TrustBadges items={[{ icon: BadgeCheck, label: "SOC 2 Type II" }, { icon: ShieldCheck, label: "HIPAA-aligned" }]} />
```

### Heading shell

```tsx
import { Section, Container, SectionHeading } from "@azeer/website-ui";

<Section tone="surface">
  <Container>
    {/* `display` opts into the marketing scale: mkt-display-md + mkt-body-lg */}
    <SectionHeading
      display
      centered
      eyebrow={<Eyebrow icon={Sparkles}>Anatomy</Eyebrow>}
      title="Display scale, lightly weighted"
      description="Light at large sizes — the Dub way."
    />
  </Container>
</Section>
```

### Sections

`Navbar` (sticky, no backdrop-blur; items take `active` for the current section) ·
`Footer` · ★ `MarketingHero` (brand wash + `mkt` scale + pill slot) · `HeroSplit` /
`HeroCentered` / `HeroSplitVideo` · `FeatureGrid` / `FeatureSplit` · `LogoCloud` ·
`TestimonialGrid` / `TestimonialQuote` · `StatsBand` · `CompareTable` ·
`PricingCards` / `PricingCalculator` · `FAQ` · `CTABanner` · ★ `DarkCTA` (with a
`badges` slot) · `NewsletterSignup` · `IntegrationsRow` · `ChannelsRow` ·
`ComplianceBand` · `VerticalSwitcher` · `BlogCard` · brand: `AzeerLogo` /
`AzeerMark` / `BrandPattern`.

**Opt-in marketing scale:** `FeatureSplit`, `FeatureGrid`, and `TestimonialQuote`
take a `marketing` prop (and `SectionHeading` a `display` prop) that switches them
to the `mkt-*` scale + neutral semantic colors — non-breaking, so existing pages
stay on the app scale. `MarketingHero` is always on the marketing scale.

```tsx
// ★ DarkCTA — closing dark panel, brand wash, white pill + outline secondary
<DarkCTA
  title="Ready to unify your conversations?"
  description="Start free in minutes — no credit card required."
  primaryCta={{ label: "Start free trial", href: "/signup", icon: ArrowRight }}
  secondaryCta={{ label: "Talk to sales", href: "/contact-sales" }}
/>
```

A live reference renders at `/[locale]/styleguide` (`/en/styleguide`,
`/ar/styleguide`).

---

## 4. Dialogue ME usage guide

**Dialogue ME is the brand font** (Arabic + Latin, 7 weights: Extralight 200 →
Extrabold 800). It is documented in `packages/tokens/src/brand.ts`.

> **Current status:** Dialogue ME is **not yet self-hosted** in this repo. Until
> the licensed `.woff2` files are added to `apps/website/public/fonts/`, the
> marketing scale renders on the product fonts — **Inter** (Latin, `--font-sans`)
> and **IBM Plex Sans Arabic** (Arabic, `--font-arabic`), which are same-metric
> paired. Only weights 400/500/600 are loaded today. When the brand files land,
> wire them with `next/font/local` + `@font-face` and point `--font-sans` /
> `--font-arabic` at them — no component changes required.

### Weight mapping

| Use case | Weight |
|---|---|
| Display H1/H2 (48px), article H1 (36px) | **500 Medium** |
| Section H2 (24px), card title (20px), footer headers | **600 Demibold** |
| Body text, hero subhead | **400 Regular** |
| UI labels, button text, eyebrow/caption | **500 Medium** |

### Rules

- **Never** use Bold (700) / Extrabold (800) in marketing UI — reserve for rare
  editorial headlines. The marketing scale caps at 600.
- **Letter-spacing stays `0`** on every tier (Arabic legibility). Never
  `tracking-tight` on Dialogue ME.
- **One family for both scripts** — the same component switches Arabic/Latin via
  `dir`; weight rendering follows automatically.
- **Mono (`--font-mono`, JetBrains Mono today) is for code/data only.**

---

## 5. Anti-patterns

- ❌ Tight letter-spacing (`tracking-tight`) — breaks Arabic.
- ❌ `backdrop-blur` on the nav.
- ❌ Heavy shadows, or a `translate`/lift on hover (use `ring-4`).
- ❌ Mixing fonts — one family for visual UI; mono only for code.
- ❌ Exceeding `max-w-content` (1080px) on marketing.
- ❌ Brand color as chrome — it's an accent (washes, eyebrows, CTAs).
- ❌ Directional utilities (`ml-*`/`mr-*`/`pl-*`/`pr-*`, `left-*`/`right-*`) —
  always logical (`ms/me/ps/pe`, `start/end`).
- ❌ Pixel-copying Dub layouts — adopt patterns, not screens.
- ❌ Bold/Extrabold at display sizes — breaks the airy aesthetic.
- ❌ Bare hex / `text-5xl` / `text-neutral-700` — use tokens.
- ❌ Editing `packages/ui` or `tokens.css` core for marketing needs — work in
  the marketing layer (`website-ui`, `marketing.css`, `apps/website`).

---

## 6. How AI should generate marketing pages

When generating or editing marketing pages (`apps/website`):

1. **Compose from `@azeer/website-ui`** sections + atoms — don't hand-roll
   structures that already exist.
2. **Use semantic token utilities** — `text-content-default` (not
   `text-neutral-700`), `bg-bg-default`, `border-border-subtle`.
3. **Use the typography scale** — `text-mkt-display-lg` (not `text-5xl`); pick
   the weight from §4 (Medium at display).
4. **Use logical properties** — `ps/pe`, `ms/me`, `start/end`,
   `text-start/text-end`. Flip directional icons with `flipOnRtl`.
5. **Apply the default 150ms transition** and **ring-expand** for hover.
6. **Keep brand color to accents**; neutrals carry structure.
7. **Stay within `max-w-content`**; text in `max-w-reading`.
8. **Test in both `dir="ltr"` and `dir="rtl"`** (the site already serves
   `/en` and `/ar`) before declaring done.
9. **Compose className with `cn`** from `@azeer/website-ui` (its safelist knows
   the `mkt-*` and neutral-semantic tokens) — never `clsx` directly.
10. **Never** change brand colors, the brand font, the logo, or business copy.
