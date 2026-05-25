# Azeer Design System — V1 (LOCKED, 2026-04-22)

> Single source of truth for designing, building, and auditing any Azeer
> screen, component, or flow. If a value is not in this system, **ask — don't
> invent.**

Azeer is a **B2B SaaS platform for MENA/GCC businesses** — WhatsApp-led
customer communication + voice infrastructure orchestrating revenue and
operations. Two priority verticals drive the product roadmap:

- **Healthcare** — clinics, polyclinics, dental groups
- **E-commerce** — Salla/Zid merchants, D2C brands

The product speaks **Arabic (RTL) as a first-class language**, with English
as a secondary bilingual partner. Every component, every layout, every
icon, every copy string must work in both directions.

---

## Two surfaces — pick the right profile

Every piece of UI belongs to **Profile A** or **Profile B** (or both). The
profile decides density, motion personality, and who owns the color.

### Profile A — Agent Console `[A]`
- **Who:** Clinic staff, agents, admins
- **Usage:** 8+ hours/day, keyboard-heavy, dense
- **Color authority:** Azeer brand — navy sidebar, purple CTAs
- **Motion default:** `fast` dominant (100ms state changes)
- **Dark mode:** supported and encouraged
- **Surfaces:** Dashboard, Agent Inbox, Admin, Campaign Composer,
  Analytics, Dashboard Calendar (Month / Week / Day / Agenda / Resource),
  Call Bar, Dialpad, Voicemail, IVR Builder, Queue Monitor

### Profile B — Consumer-Facing `[B]`
- **Who:** Patients, booking customers, e-commerce shoppers
- **Usage:** 2–5 minute sessions, one-shot task flows
- **Color authority:** **Tenant brand** — clinic logo + `tenant-primary`;
  Azeer is footer attribution only (Starter/Growth unclosable, Business
  closable, Enterprise hidden)
- **Motion default:** `base`/`slow` dominant (200–400ms)
- **Dark mode:** not supported (light-only by default)
- **Surfaces:** Booking page (stepper), Booking calendar (Week/Day only),
  Confirmation, Payment, patient-facing emails

Profile C (Auth, billing, onboarding) is **deferred to V1.1** and is not
in this system.

---

## Sources we were given

| File | Purpose |
|---|---|
| `uploads/AI-PROMPT-BLOCK.md` | Copy-paste prompt header for external AI tools. Also at `AI-PROMPT-BLOCK.md` in root. |
| `uploads/Azeer-theme-Light.json` | shadcn Studio-importable light theme. Mirrored to `themes/`. |
| `uploads/Azeer-theme-Dark.json` | shadcn Studio-importable dark theme (with Section-A fixes). Mirrored to `themes/`. |
| `uploads/SKILL.md` | Original skill prompt (now reinterpreted as `SKILL.md` in root). |
| `uploads/tokens.yaml` | Full machine-readable token registry. Mirrored to `tokens.yaml`. |

**Figma file of record:** `Mo6TnlpEQeFyiEx1GoDfVR` (we were not given
access — all numbers in this system come from the uploaded JSON + YAML,
which the source-of-truth hierarchy says win over Figma anyway).

**Codebase:** not attached. If you want hi-fidelity UI kits that mirror
production, re-import the repo via the **Import** menu and I will update
the kits against it.

---

## Index — what lives in this project

```
/
├── README.md                      ← you are here
├── SKILL.md                       ← Agent Skill entry (Claude Code compatible)
├── AI-PROMPT-BLOCK.md             ← paste at top of external AI prompts
├── colors_and_type.css            ← CSS variables + type scale + motion presets
├── tokens.yaml                    ← machine-readable token registry
│
├── themes/
│   ├── Azeer-theme-Light.json     ← shadcn Studio importable
│   └── Azeer-theme-Dark.json      ← shadcn Studio importable (with fixes)
│
├── assets/
│   ├── logo-mark.svg              ← 44×44 navy mark (primary)
│   ├── logo-mark-purple.svg       ← 44×44 purple mark (on navy)
│   ├── logo-wordmark.svg          ← light-surface wordmark
│   └── logo-wordmark-dark.svg     ← dark-surface wordmark
│
├── preview/                       ← Design System tab cards (palette, type,
│                                     spacing, components — each registered)
│
├── ui_kits/
│   ├── agent_console/             ← Profile A recreation (inbox, call bar, …)
│   └── booking/                   ← Profile B recreation (booking stepper)
│
└── uploads/                       ← original files as given
```

---

## CONTENT FUNDAMENTALS

### Voice
- **Operator, not marketer.** Azeer is a tool agents sit inside for eight
  hours — the writing is quiet, declarative, and moves out of the way.
  "Send reply" not "✨ Ready to delight your customers?".
- **Second-person, direct.** "You" for the agent, "the customer" for the
  end-user. Never "we" in-product except for system responses
  (e.g. "We couldn't reach the WhatsApp gateway").
- **Bilingual parity.** Every visible string has an Arabic sibling.
  English copy is written so the Arabic translation stays natural — no
  puns, no metaphor-heavy idioms, no wordplay that breaks on translation.

### Casing
- **Sentence case** everywhere — headings, buttons, menu items, toasts.
  "Send broadcast" not "Send Broadcast". Exceptions: proper nouns
  (WhatsApp, Salla, Stripe, Clerk), acronyms (IVR, SMS, RCS), and tenant
  brand names.

### Numbers, dates, data
- Phone numbers, URLs, emails, IBANs, and order IDs stay **LTR inside
  RTL** — mirror the layout, never mirror the data.
- Dates: `date-fns` + `date-fns-tz`; show the tenant's local timezone with
  an offset badge on any cross-timezone row.
- Numeric columns use the **Tabular-Small** style (`tnum`, Latin only).

### Emoji & unicode
- **No decorative emoji** in product chrome (sidebars, buttons, settings).
- Emoji **are allowed in message content** (chat bubbles, message
  composer) — that's where customers write to clinics. The composer uses
  `emoji-mart`.
- Channel indicators are the brand's own SVG marks (WhatsApp green check,
  Instagram gradient, etc.) — never a `📱` stand-in.

### Example strings

| Do | Don't |
|---|---|
| "Send reply" | "✨ Send Reply Now!" |
| "You're offline — messages will queue" | "Oops! Something went wrong 😬" |
| "Dr Khaled has 3 open threads" | "Dr Khaled is crushing it with 3 chats! 🔥" |
| "Appointment confirmed for Tuesday, 10:30" | "Boom! You're booked. 🎉" |
| "Failed to send — retry?" | "Uh-oh! Try again." |

### Product vs marketing voice
- **Product UI:** Inter (Latin) + Vazirmatn (Arabic) — metrics-matched, quiet, operational.
- **Marketing / landing / decks:** the brand font **Dialogue ME** is
  allowed and encouraged. Never inside the product.

---

## VISUAL FOUNDATIONS

### Palette personality
- **Navy `#0D2043` is the anchor.** The sidebar is navy in **both light
  and dark mode** — it's the one thing a user sees every hour and it's
  the flag. Don't tint it, don't gradient it, don't replace it per
  tenant.
- **Purple `#7C64FE` is the action.** Every primary CTA, every active
  nav item, every selected chip. In dark mode the purple lifts to
  `#9B85FF` for WCAG AA on `#090909`.
- **Lavender `#F2F0FF` is the whisper.** Hover and selected chrome in
  light mode — never a CTA background. In dark mode the whisper becomes
  `#1F1A3A` (desaturated purple, not Radix grey).
- **Five chart colors, period.** Purple, cyan, amber, coral, teal.
  Don't invent a sixth.

### Type
- **Inter (Latin) + Vazirmatn (Arabic)** for every product surface.
  Inter renders Latin glyphs; the browser falls through to Vazirmatn
  for Arabic codepoints. Both ship 9 weights (100–900). Vazirmatn is
  metrics-matched (size-adjust + ascent/descent overrides) so bilingual
  lines share a baseline.
  Stack: `font-family: 'Inter', 'Vazirmatn', sans-serif;`
- **Dialogue ME** is brand-only — landing, decks, hero sections on
- **Dialogue ME** is brand-only — landing, decks, hero sections on
  marketing sites. The product never renders it.
- Sizes snap to the scale: `11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 48, 64, 72`.
  Nothing else. If you need `17px` you are making a mistake.

### Spacing
- Strict scale: `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`.
- Agent Console rows sit on `28–32px` min-heights with `8–12px`
  vertical rhythm. Consumer pages breathe at `40–64px` section rhythm.

### Backgrounds
- **No hand-drawn illustrations.** Azeer is infrastructure — the UI is
  the illustration.
- **No repeating textures, no grain, no photographic heroes inside the
  product.** Booking pages are allowed a single tenant-uploaded hero
  photo at the top of the stepper; anything else is flat color.
- **Gradients:** used **only** on charts (bar/area fills, 12–18% opacity
  tail) and the Celebration surface (purple → lavender, one-time).
  Never on buttons, cards, sidebars, or section backgrounds.
- **Full-bleed imagery:** only on Profile B hero strip (tenant's single
  photo) and marketing pages. Profile A is flat navy/white surfaces
  exclusively.

### Corner radii & cards
- **Default radius = 10px (`0.625rem`).** Buttons, inputs, cards,
  dialogs, sheets, toasts.
- **Dense list rows = 6px.** Popover internals = 6px.
- **Hero cards = 16px (`2xl`).**
- **Pills / status dots / avatars = `full`.**
- Cards have **1px solid `var(--border)`** plus a **very soft shadow**
  — see below. No colored left-border accents. No double borders. No
  gradient borders.

### Shadow system
- **`shadow-xs`** `0 1px 2px 0 rgba(13, 32, 67, 0.05)` — default card
  rest. Enough to lift, not enough to compete.
- **`shadow-sm`** `0 1px 3px 0 rgba(13, 32, 67, 0.08), 0 1px 2px -1px rgba(13, 32, 67, 0.06)`
  — popovers, menus, dropdowns.
- **`shadow-md`** `0 4px 6px -1px rgba(13, 32, 67, 0.10), 0 2px 4px -2px rgba(13, 32, 67, 0.08)`
  — toasts, floating call bar.
- **`shadow-lg`** `0 10px 15px -3px rgba(13, 32, 67, 0.10), 0 4px 6px -4px rgba(13, 32, 67, 0.10)`
  — modals, drawers.
- No inner shadows. No neumorphism. No glow.
- In dark mode, shadow is barely perceptible — elevation is communicated
  by **surface color** (`--card` `#161616` on `--background` `#090909`).

### Borders
- Every divider and card edge uses `var(--border)` (light `#E4E4E4`, dark
  `rgba(255,255,255,0.10)`). No custom alphas, no on-hover border-color
  changes — hover uses `--accent` as a surface tint instead.

### Transparency & blur
- **Frosted blur is reserved for one place:** the sticky call-bar strip
  at the top of the Agent Console when a call is in progress.
  `backdrop-filter: blur(16px) saturate(180%)` over a `92%`-alpha navy.
- Everywhere else — flat opaque surfaces.

### Animation
- **Three durations: `100ms` / `200ms` / `400ms`.** Nothing else.
- **Three curves:** `ease-out-quint` (enter), `ease-in-quint` (exit),
  `ease-in-out-quint` (state change). No springs, no bounces.
- **Four presets:** `enter`, `exit`, `state-change`, `pulse`. The
  `pulse` preset is scoped to voice — recording dot, ringing badge,
  live waveform. Nothing else pulses.
- `prefers-reduced-motion` collapses every duration to 0ms. Required,
  not optional.

### Hover / press / focus
- **Hover (surface):** swap surface to `var(--accent)`. Never change
  text color on hover. Never darken buttons — the hover is a tint
  underneath.
- **Hover (button, filled):** 92% opacity of the base color, `fast`
  state-change.
- **Press:** scale `0.98` for 100ms, then spring back on release.
  Buttons only; list rows don't scale.
- **Focus:** `outline: 2px solid var(--ring)` with `outline-offset: 2px`.
  Unified across every interactive primitive. Never `box-shadow` rings
  — they clip inside scroll containers.
- **Selected (list row):** background `var(--accent)`, inline-start
  border `3px solid var(--primary)`.

### Protection gradients vs capsules
- Overlaid text on imagery uses a **capsule** (`background: rgba(13,32,67,0.72)`,
  `radius: full`, `backdrop-filter: blur(8px)`) — never a top/bottom
  protection gradient. Capsules localize legibility and keep the photo
  readable behind them.

### Layout rules
- **Agent Console:** fixed navy sidebar `240px`, fixed top bar `56px`,
  content fills remaining viewport. Panels inside are resizable via drag
  handle, but min-widths snap to the spacing scale (`320px`, `480px`,
  `640px`).
- **Booking page:** single column, max-width `640px`, `40px` section
  rhythm, sticky footer CTA on mobile only.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Mobile-only surfaces: dialpad, bottom nav, simplified call bar,
  Agenda calendar view.
- Desktop-only surfaces: multi-panel inbox, analytics dashboard,
  Resource calendar view.

### Iconography — at a glance
Full section below. Short version: **Lucide React only**, sizes `14 / 16
/ 20 / 24 / 32`, icons are **native at their display size** (never a
scaled-down 24→16). Arrows/chevrons/back-forward flip in RTL; logos,
media controls, checkmarks, and numbers never flip.

### Imagery tone
- Photos (rare — only on Profile B tenant heroes) should read **warm and
  natural** — daylit clinic shots, product-in-use, real people. No stock
  photography with visible watermarks. No b&w. No heavy grain. No
  duotone filters.

---

## ICONOGRAPHY

### Library
- **Lucide React** is the only icon library. Not Font Awesome, not
  Heroicons, not Tabler, not Phosphor, not emoji.
- Load from CDN for prototypes:
  `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>`
  and call `lucide.createIcons()` after render. In production use
  `lucide-react`.

### Sizes (native at display size)
| Size | When |
|---|---|
| **14** | Drag handles in list rows only (`grip-vertical`, `grip-horizontal`) |
| **16** | **Default** — inline icons in buttons, menu items, form fields |
| **20** | Section headers, row actions |
| **24** | Page-header icons, empty-state badges |
| **32** | Hero/feature tiles only |

A 16×16 icon is a **16×16 component**, not a scaled-down 24×24. Lucide
strokes are `1.5` at all sizes — never scale a 24 to fit a 16 slot.

### Channel icons (single-mode, never themed)
The customer-communication channels have their own brand marks that
live alongside Lucide. Copy them from Lucide where they exist (Lucide
ships `MessageCircle` variants), otherwise use the official brand SVG:
- WhatsApp → `#25D366`
- Voice → `#7C64FE` (Azeer's own purple — voice **is** Azeer)
- SMS → `#8A8F98`
- Email → `#EA4335`
- Instagram → `#E1306C`
- Messenger → `#0084FF`
- Telegram → `#229ED9`
- Webchat → `#0F1011`
- RCS → `#1A73E8`

### RTL flip list
- **Flip in RTL:** `arrow-left`, `arrow-right`, `chevron-left`,
  `chevron-right`, `corner-up-left`, `corner-up-right`, `undo`, `redo`,
  any `reply`/`forward`/`share` arrow.
- **Never flip in RTL:** logos, channel brand marks, media-control
  icons (`play`, `pause`, `skip-forward`, `skip-back` — these are
  physical tape metaphors), checkmarks, Xs, numbers, user avatars,
  status dots.

### Emoji
- Not allowed in product chrome.
- Allowed in message content (chat bubbles) via `emoji-mart`.

### Unicode as icon
- Not used. If you see `→` or `×` in UI, replace with Lucide
  `arrow-right` / `x`.

### Assets included here
Only the Azeer wordmark + mark. Channel brand marks are not bundled —
pull them from Lucide or the channel's brand site. **If you have the
official Azeer logo files, please attach them — the marks in `assets/`
are placeholders built to brand colors.**

---

## Font substitution flag

**Inter** is self-hosted from `/fonts/Inter-VariableFont.ttf` — one variable
file covers Latin + Arabic + all 9 weights (100–900). No Google Fonts
fallback for the product family.

**IBM Plex Mono** is still loaded from Google Fonts in `colors_and_type.css`
for code/numerics in this prototyping environment. The locked stack
requires **Fontsource (self-hosted)** in production — see
`AI-PROMPT-BLOCK.md`. To install for production:

```bash
pnpm add @fontsource-variable/inter @fontsource/ibm-plex-mono
```

**Dialogue ME (brand font)** is **not included**. If you want brand
surfaces (landing, decks, hero) to render correctly, please attach
Dialogue ME's woff2 files and I'll wire them into `assets/fonts/`.

---

## Changelog

- **2026-04-22 · V1 LOCKED** — initial design-system project. Tokens,
  type, motion, iconography, and two UI kits (Agent Console + Booking).

## Caveats

- Figma file `Mo6TnlpEQeFyiEx1GoDfVR` was not accessible — numbers come
  from the uploaded JSON + YAML (which the source-of-truth hierarchy
  says win anyway).
- No codebase was attached. UI kits are hi-fidelity recreations from the
  locked token system + surface descriptions — not pixel-copies of the
  production React.
- Logos in `assets/` are placeholder marks built from brand colors.
  Attach real artwork to replace.
- Dialogue ME (brand font) is not bundled.
