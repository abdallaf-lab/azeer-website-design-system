# Layout, motion, spacing, RTL

These rules apply on top of the general `frontend-design` skill. Source of truth:
`DESIGN_SYSTEM.md` (10 principles + anti-patterns), `packages/tokens/src/tokens.css`
(motion + spacing tokens), `packages/tokens/src/marketing.css` (content widths).

## Asymmetry recipes

The default Azeer marketing page is **not** centered-hero → 3 cards → testimonial.
Build asymmetric rhythm:

1. **Split hero.** `HeroSplit` / `HeroSplitVideo`: headline + subhead + CTAs on the
   start side, product/visual on the end side. Start-aligned `SectionHeading`.
2. **Alternating feature splits.** Stack `FeatureSplit` rows and **flip the media
   side every row** (start, end, start…). Visual zig-zag carries the eye down.
3. **Break the grid.** Between feature blocks, drop a full-bleed `StatsBand`,
   `ChannelsRow`, or `CompareTable` so the page isn't a uniform card lattice.
4. **Off-center emphasis.** Let one column be wider than the other (e.g. 7/5 split),
   not always 50/50. Use the brand wash (`bg-hero-brand`) behind one zone only.
5. **Vary section tone.** Alternate `Section` tones (canvas → surface → sunken →
   inverse) so bands read distinctly without decoration.

Center sparingly — a single centered moment (a manifesto line, the closing `DarkCTA`)
has more impact when the rest is asymmetric.

## Motion — real, not decorative

Motion communicates state or guides attention. It is never a hover ornament.

- **Entrance / scroll reveal:** use `tw-animate-css` utilities (`animate-in`,
  `fade-in-*`, `zoom-in-*`, `slide-in-from-{top,bottom,start,end}-*`) with the motion
  tokens — `duration-fast` (120ms) / `duration-base` (200ms) / `duration-slow`
  (280ms) and `ease-out` (enter) / `ease-in` (exit) / `ease-standard`.
- **Hover = `ring-4` expand only.** The system convention. **Never** translate, lift,
  scale, or add a shadow on hover. (DESIGN_SYSTEM principle 5.)
- **State transitions** (open/close, tab switch, accordion) use the registered
  animations (`animate-accordion-down/up`) and `data-[state=…]` variants.
- **Respect `prefers-reduced-motion`.** The tokens already collapse all durations to
  0 under reduced-motion — don't hardcode durations that bypass this.
- **Purposeful only.** If a motion doesn't signal state or direct attention, cut it.

## Spacing — 8px grid on a 4px base

The Tailwind base is `--spacing: 4px`. Compose **layout** spacing on the 8px grid by
using even multiples; reserve odd 4px steps for fine intra-component nudges only.

- Layout padding/gap: `p-2` (8), `p-4` (16), `p-6` (24), `p-8` (32); `gap-2`, `gap-4`,
  `gap-6`, `gap-8`. Avoid `p-3` / `gap-5` for layout rhythm.
- Section vertical rhythm: `py-16 md:py-24` (via `<Section>`) — already 8px-aligned.
- Radius ceiling for marketing: `rounded-2xl` (16, feature cards/frames),
  `rounded-3xl` (24, hero frames / dark CTA); buttons `rounded-lg`.

## Mobile-first

Author the narrow base layout first; layer `sm:` / `md:` / `lg:` enhancements upward.
Breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536. Never write a
desktop layout and patch it down.

## Width discipline

| Utility | Width | Use |
|---|---|---|
| `max-w-content` | 1080px | Marketing content ceiling |
| `max-w-prose` | 800px | Long-form column |
| `max-w-reading` | 672px | Hero / heading text column |

`Container` provides a `max-w-7xl` gutter column; cap text measures with
`max-w-reading` / `max-w-prose` inside it. Never exceed `max-w-content` for marketing.

## RTL canon (release gate)

1. **Logical utilities only:** `ps/pe`, `ms/me`, `start/end`, `border-s/e`,
   `rounded-s/e`, `text-start/text-end`. **Never** `pl/pr`, `ml/mr`, `left/right`.
2. **Directional icons** (chevron, arrow, send, reply, indent) take `flipOnRtl`.
   Non-directional icons (cog, eye, home) do not flip.
3. **Inline LTR runs inside Arabic prose** — phone, email, ID, URL, code, hex,
   prices, ISO timestamps — wrap in `dir="ltr"` or `.bidi-isolate`.
4. **Test both** `dir="ltr"` and `dir="rtl"` — the site serves `/en` and `/ar`. The
   whole surface must mirror cleanly.

## Accessibility (AA minimum)

- Meet WCAG **AA** contrast; use the documented token text/fill pairings (many are
  AAA). White text only on `accent-fill` / intent fills, never on `brand-primary`.
- **Never color-only signaling** (1.4.1) — pair color with icon/text/shape.
- Keep the **canonical focus ring** (`tokens.css §7`); don't re-roll it. Outlined
  controls tint their border instead.
- Honor reduced motion; ensure interactive targets are reachable and labeled.

## Borders before shadows

Hierarchy is carried by 1px borders + surface tone. Shadows are reserved for
genuinely floating things (`shadow-sm` on a product frame), never a hover lift and
never on a flat card.
