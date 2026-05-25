# Azeer Brand — Locked Decisions (V2.1, 2026-05-08)

> The marketing brand book is what people see once. The product is what they see every day.
> Companion files: `tokens.json` (values), `CLAUDE.md` (operating rules).
> If a value here disagrees with `tokens.json`, **`tokens.json` wins**.

---

## Quality target

**Intercom-grade discipline.** One accent per screen. Whisper borders, no shadows on cards. Restraint is the brand. Voice (the persistent call bar) is the signature surface — the most polished component in the system.

---

## The palette — locked

We use a **single purple** across marketing and product. No derived "deeper" indigo, no second accent. One color, used sparingly.

| Role | Hex (light) | Hex (dark) | Usage |
|---|---|---|---|
| **Primary** | `#7C64FE` | `#9B85FF` | Primary CTA (one per screen), active nav, focus ring, selected state, voice channel |
| **Primary hover** | `#6B53E5` | `#B19EFF` | Button + nav hover |
| **Primary muted** | `#EFEBFF` | `#1F1A3A` | Selected list rows, hover surface tint |
| **Secondary (navy)** | `#0A1F44` | `#0A1F44` | Sidebar — same in both modes, anchor never tints |
| **Accent (amber)** | `#FFC857` | `#FFC857` | The gold thread — see Amber Rule below |
| **Background** | `#FAFAFA` (zinc-50) | `#18181B` (zinc-900) | Page surface |
| **Surface** | `#FFFFFF` | `#09090B` (zinc-950) | Cards, popovers, inputs |
| **Border** | `#E4E4E7` (zinc-200) | `#27272A` (zinc-800) | Whisper border. Never a shadow on cards. |
| **Foreground** | `#18181B` (zinc-900) | `#FAFAFA` (zinc-50) | Body text |
| **Foreground muted** | `#71717A` (zinc-500) | `#A1A1AA` (zinc-400) | Helper, label, secondary text |
| **Foreground subtle** | `#A1A1AA` (zinc-400) | `#71717A` (zinc-500) | Empty-state icons, placeholders, **loading spinners** |

---

## The Amber Rule (the single most important rule in this brand)

> **Amber `#FFC857` and primary `#7C64FE` never share a screen.**
> They take turns. Daily-work screens use purple. Brand-moment screens use amber. Putting both on the same screen breaks the "one accent per screen" rule and dilutes both colors at once.

### Screens that wear AMBER (and not purple)
- Onboarding — "Welcome to Azeer", first-run setup
- Celebration moments — first reply sent, first campaign delivered, first call answered
- The "Pro" / "Enterprise" tier badge in account settings
- The "What's new" lozenge in the top of the secondary nav (when a release is announced)
- Pricing & upgrade prompts inside the product
- Empty-state illustrations (line art with amber accents)
- Marketing landing surfaces

### Screens that wear PURPLE (and not amber)
- Inbox, conversations, threads
- Calendar, dashboards, analytics
- Settings (everything except the Pro tier badge)
- Call bar, dialpad, voicemail
- Campaign composer, IVR builder, queue monitor
- All daily operator chrome

### Charts are the only exception
Chart series-3 is allowed to be amber because charts are **content**, not chrome. Reading "gold metric" doesn't conflict with the rule because no chart-3 line ever sits next to an amber CTA.

---

## Channel + voice rules

Channel marks belong to channels — not to Azeer. Brand never wears channel territory and channel colors never live in brand territory.

**One exception:** voice. Voice is uniquely Azeer's product, not a third-party channel. The voice channel mark equals `--primary` (`#7C64FE`). This is the single point in the system where brand and channel merge — and it's a deliberate signal: **voice IS Azeer.**

The persistent call bar is the most polished surface in the product. Its visual quality must exceed every other component in the inbox. It's Azeer's "Intercom messenger button" — the thing you screenshot.

---

## Semantic colors live on their own scale

| Token | Light | Dark | Note |
|---|---|---|---|
| `--success` | `#16A34A` | `#22C55E` | |
| `--warning` | `#EA580C` | `#F97316` | **Orange, not amber.** Hold this line. |
| `--destructive` | `#DC2626` | `#EF4444` | |
| `--info` | `#2563EB` | `#3B82F6` | |

If you make warning equal `#FFC857`, the amber stops being the gold thread and starts being an alert. The whole brand thesis collapses.

---

## Typography

- **Latin:** IBM Plex Sans
- **Arabic:** IBM Plex Sans Arabic
- **Mono:** IBM Plex Mono
- All self-hosted via Fontsource in production.
- **Three weights only — 400 / 500 / 600.** No 700, no 300, no 800.
- Use **size + color** for emphasis, not bold. This is the Intercom move.
- Body 14px (operator-grade density). KPI numbers 30px. H1 24px. Display 30px (marketing only).

---

## Radii — three sizes + full

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Inputs, dense list rows, small chips |
| `--radius-md` | 8px | **Cards, buttons** — the operator-grade default |
| `--radius-lg` | 12px | Modals, large dialogs |
| `--radius-full` | 9999px | Pills, avatars, status dots |

10px, 14px, 16px, 20px+ are **forbidden**. If you need "more rounded," use `--radius-lg`. If you need "less rounded," use `--radius-sm`. There are no in-between values.

---

## Mode support

| Surface | Light | Dark |
|---|---|---|
| **Profile A — Agent Console** | ✓ | ✓ — agents work 8 hours/day, dark mode reduces fatigue |
| **Profile B — Consumer Booking** | ✓ | ✗ — light only, tenant-brand owned, 2-5 min sessions |
| **Marketing site** | ✓ | ✗ — light only |

---

## The brand in one paragraph

Azeer is **trustworthy, efficient, modern, slightly warm.** Navy `#0A1F44` is the anchor — present every hour a user is in the product, identical in light and dark. Purple `#7C64FE` is the action — quietly assertive, one per screen, never loud. Amber `#FFC857` is the soul — rare, intentional, the moment that says "this product was made by people who care." Voice is the signature (the call bar is the most polished component). RTL is first-class. The aesthetic is Intercom-grade discipline applied with a MENA modern-business sensibility — calmer than consumer SaaS, warmer than Linear or Notion, more confident than any of them.

---

## Locked. Changes require:
1. PR to `tokens.json` with rationale
2. Approval from design + engineering owners
3. Version bump in `tokens.json` `$meta.version`
4. Migration note in `CHANGELOG.md`

The exceptions list is empty by design.
