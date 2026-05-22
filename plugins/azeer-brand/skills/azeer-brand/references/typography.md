# Azeer typography (marketing)

Source of truth: `packages/tokens/src/marketing.css` (the `mkt-*` scale) and
`packages/tokens/src/brand.ts` (`BRAND_TYPOGRAPHY` — the Dialogue ME guide).

## The brand font: Dialogue ME

- **Family:** Dialogue ME — one family for **both Arabic and Latin**.
- **Weights:** Extralight 200, Light 300, Regular 400, Medium 500, Demibold 600,
  Bold 700, Extrabold 800.
- **Tagline:** "محادثات تحقق طموحات" / "Conversations that Achieve Ambition."
- **Why:** modern + renewed while keeping authenticity; clear in digital and print;
  a local Arabic personality.

### Implemented fallback (current state)

Dialogue ME is **not yet self-hosted** in this repo. Until the licensed `.woff2`
files land in `apps/website/public/fonts/`, the marketing scale renders on the
product fonts: `--font-sans` (**Inter**, Latin) paired same-metric with
`--font-arabic` (**IBM Plex Sans Arabic**), and only weights **400/500/600** are
loaded.

This pairing is the brand intent — it is NOT "use Inter." Inter standing alone, or
any single Latin family with no Arabic counterpart, is off-brand. When the brand
files arrive, wire them with `next/font/local` + `@font-face` and point
`--font-sans` / `--font-arabic` at them; no component changes are needed.

## Marketing type scale — `text-mkt-*`

Namespaced `mkt-` so it never collides with the product scale. Letter-spacing is
`0` on **every** tier. Weights are capped at 600.

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

## Weight mapping (Dialogue ME guide)

| Use case | Weight |
|---|---|
| Display H1/H2 (48px), article H1 (36px) | **500 Medium** |
| Section H2 (24px), card title (20px), footer headers | **600 Demibold** |
| Body text, hero subhead | **400 Regular** |
| UI labels, button text, eyebrow/caption | **500 Medium** |

## Rules

1. **Big + light.** Display tiers are Medium (500), not bold. Light at large sizes
   is the airy Azeer aesthetic.
2. **Cap at 600.** Never Bold (700) / Extrabold (800) in marketing UI — reserve for
   rare editorial moments only.
3. **Letter-spacing `0` on every tier.** Never `tracking-tight` — tight tracking
   destroys Arabic legibility.
4. **One family, both scripts.** The same component renders Arabic under `dir="rtl"`
   and Latin under `dir="ltr"`; weight rendering follows automatically.
5. **Mono is for code/data only** (`--font-mono`, JetBrains Mono today) — IDs, keys,
   phone numbers, code blocks.
6. **Hierarchy from weight + size**, never from mixing families.
7. Use `text-mkt-*`, never `text-5xl` / arbitrary sizes / raw `font-[700]`.

## Anti-patterns (reject)

- ❌ Inter alone, or any single Latin family with no Arabic pairing.
- ❌ `tracking-tight` / negative letter-spacing on any tier.
- ❌ Bold/Extrabold display headings.
- ❌ Mixing typefaces for hierarchy (one family for visual UI; mono only for code).
- ❌ `text-5xl`, `text-neutral-700`, arbitrary `font-[…]` — use the scale.
