# Azeer color tokens (marketing)

Source of truth: `packages/tokens/src/brand.css` (brand palette) and
`packages/tokens/src/marketing.css` (neutral semantics). Hex literals live there
and ONLY there. Emit utilities; never write hex in a component.

## Brand palette — fixed, never change

From the brand book (`brand.css`). Five colors, each with a documented role.

| Token | Utility | Hex | Role / use |
|---|---|---|---|
| Primary | `bg-brand-primary` / `text-brand-primary` | `#7B61FF` | Identity indigo. **Non-text** — washes, eyebrows, illustration, accent. Carries Saudi-culture heritage. |
| Secondary | `bg-brand-secondary` | `#0A1F44` | Deep navy. Trust, stability — serious B2B base. |
| Accent | `bg-brand-accent` | `#FFC857` | Optimistic amber. Draws attention to CTAs / campaign messages. |
| Neutral | `bg-brand-neutral` | `#2E2E2E` | Near-black. Calm organized base. |
| Supportive | `bg-brand-supportive` | `#F4F4F4` | Light gray. Breathing room, content-first backgrounds. |

On-color text pairings:

| On background | Use text token | Hex | Note |
|---|---|---|---|
| `brand-primary` (indigo) | `text-brand-on-primary` | `#FFFFFF` | identity surfaces only |
| `brand-secondary` (navy) | `text-brand-on-secondary` | `#FFFFFF` | |
| `brand-accent` (amber) | `text-brand-on-accent` | `#2E2E2E` | **white fails contrast on amber** |

RGB triplets exist for composition (`--brand-primary-rgb` etc.) — used by
`bg-hero-brand` (radial wash at 15%). Do not invent new gradients from them.

## The white-text CTA rule

`brand-primary` (`#7B61FF`) is a **non-text identity color** — putting white text on
it fails contrast. For a filled CTA with white text use the product-derived
**`bg-accent-fill`** (`#5238D1`, AAA on white). This is the single most-missed rule.

- White-text primary CTA → `bg-accent-fill` + `text-fg-on-accent`.
- Indigo as identity (icon tint, wash, eyebrow, border) → `brand-primary` / `accent-brand`.

## Neutral semantic ramp (structure)

From `marketing.css`. Backgrounds (`bg-*`), text/icons (`content-*`), borders
(`border-*`). The namespace doubles in the utility: `bg-bg-default`,
`text-content-subtle`, `border-border-subtle`.

| Background | Border | Content (text) |
|---|---|---|
| `bg-bg-default` `#fff` | `border-border-muted` `#f5f5f5` | `text-content-muted` `#a3a3a3` |
| `bg-bg-muted` `#fafafa` | `border-border-subtle` `#e5e5e5` | `text-content-subtle` `#737373` |
| `bg-bg-subtle` `#f5f5f5` | `border-border-emphasis` `#a3a3a3` | `text-content-default` `#404040` |
| `bg-bg-emphasis` `#e5e5e5` | — | `text-content-emphasis` `#171717` |
| `bg-bg-inverted` `#171717` | — | `text-content-inverted` `#fff` |

Neutrals carry the structural work. Brand color is sprinkled on top.

## Intent neutrals (Dub-style soft)

`bg-bg-{info,success,attention,error}` paired with
`text-content-{info,success,attention,error}`. Soft background + readable text. Use
for status pills/callouts, not page chrome.

## Sanctioned visual effects (the ONLY brand "washes")

| Utility | Effect |
|---|---|
| `bg-dot-grid` | 24px neutral dot grid (`--mkt-border-subtle`) |
| `bg-hero-brand` | Top radial wash in brand primary at **15%** — flat, single-hue, not a gradient ramp |

Anything beyond these two is off-brand. No multi-stop gradients, no gradient text,
no gradient buttons, no purple→pink hero.

## Color usage rules

1. Brand indigo is an **accent, not chrome** (DESIGN_SYSTEM principle 6). Neutral
   surfaces + neutral text do the structural work.
2. Never raw hex, never `text-neutral-700` / `text-white` / `bg-[#…]`. Tokens only.
3. Never color-only signaling (WCAG 1.4.1) — pair color with icon/text/shape.
4. Product semantic tokens (`accent-fill`, `fg-on-accent`, `success-text`, etc.)
   from `tokens.css` are available and AA/AAA-rated; prefer them for text-on-fill.
5. Channel hues (`channel-whatsapp`, etc.) are for icons/badges only — never a page
   background.
