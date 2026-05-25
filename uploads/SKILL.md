---
name: azeer-design-system
version: v1.0
status: LOCKED
last_updated: 2026-04-22
description: Use this skill whenever designing, auditing, fixing, or building any screen, component, or flow in the Azeer product. Triggers include: creating a new screen, fixing a screen, auditing tokens/typography/spacing/icons, working in Figma file Mo6TnlpEQeFyiEx1GoDfVR, writing React + shadcn + Tailwind code for Azeer, adding voice components (Call Bar, Dialpad, Voice Message), booking page work (stepper), calendar work (Dashboard Resource view or Booking Day/Week view), agent inbox work, tenant theming, dark mode work, RTL/Arabic work. This is the single source of truth — Tier 1 (this file + sibling files) wins over Figma when they diverge.
audience: [Claude, Cursor, v0, shadcn Studio, Figma MCP, design team, frontend team]
---

# Azeer Design System — AI Agent Entry Point (V1)

> **You are about to design, build, or modify something in Azeer. STOP and read this entire file first. Then load the specific reference files needed for your task from the list at the bottom. Do NOT improvise. Do NOT invent tokens, colors, spacings, or components. If a value isn't in the system, the design is wrong.**

---

## 30-second orientation

- **Azeer** is a B2B SaaS for MENA/GCC — clinics, polyclinics, e-commerce brands
- Customer-communication orchestration: WhatsApp + Voice + Email + SMS + Instagram + Messenger
- Product is **RTL-first** (Arabic primary) and bilingual (English secondary)
- Stack: **React + TypeScript + Vite + Tailwind + shadcn/ui + shadcn Studio**
- Figma file: `Mo6TnlpEQeFyiEx1GoDfVR`

---

## The 4 non-negotiable rules

If any of these is broken, the work is wrong — regardless of how it looks.

### Rule 1 — Every visual value is a token
No raw hex fills. No raw spacing integers. No ad-hoc radii. No off-scale font sizes. Every color, every spacing, every radius, every duration, every text style binds to a token. If a value isn't in the system, **ask, don't invent.**

### Rule 2 — Surface Profile awareness
Every component belongs to **Profile A (Agent Console)** or **Profile B (Consumer-Facing)** or both. Never mix Profile A density in Profile B surfaces. Never render tenant theming in Profile A. See `07-Profiles/profiles.md`.

### Rule 3 — Seven states per component
Every primitive and composition must have: **default · hover · focus · disabled · loading · empty · error**. Offline and reconnecting are app-level banners, NOT per-component states — except for real-time comms components (Call Bar, Dialpad, Chat Composer, Recording Input) where offline is required.

### Rule 4 — RTL is not optional
Every component works in both LTR and RTL. Use logical properties (`padding-inline-start`, not `padding-left`). Mirror layout, never mirror data (phone numbers, URLs, emails, IBANs stay LTR inside RTL).

---

## The 5 locked foundations

### 5.1 — Color (both modes defined — use tokens, never raw hex)

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#FFFFFF` | `#090909` | Page bg |
| `foreground` | `#2E2E2E` | `#FCFCFC` | Primary text |
| `card` | `#FFFFFF` | `#161616` | Elevated surfaces |
| `popover` | `#FFFFFF` | `#161616` | Popover bg |
| `primary` | `#7C64FE` | `#9B85FF` | CTAs, active states |
| `primary-foreground` | `#F5F5F5` | `#0A0A0A` | Text on primary |
| `secondary` | `#0D2043` | `#0D2043` | Navy — authoritative surfaces (same both modes) |
| `secondary-foreground` | `#F5F5F5` | `#F5F5F5` | Text on navy |
| `muted` | `#F5F5F5` | `#1A1A1A` | Quiet surfaces |
| `muted-foreground` | `#4D4D4D` | `#A1A1A1` | Secondary text |
| `accent` | `#F2F0FF` | `#1F1A3A` | Hover/selected tint |
| `accent-foreground` | `#7C64FE` | `#C7B8FF` | Text on accent |
| `destructive` | `#E60006` | `#FF6366` | Delete, irreversible |
| `success` | `#12BFA5` | `#00BC7C` | Confirmed, successful |
| `warning` | `#FEB343` | `#FC9A0D` | Pending, caution |
| `info` | `#00BCFF` | `#00ACF1` | Info indicators |
| `border` | `#E4E4E4` | `#FFFFFF1A` | Dividers, borders |
| `input` | `#E4E4E4` | `#FFFFFF26` | Form field borders |
| `ring` | `#CDDAFD` | `#9B85FF` | Focus ring |

**Sidebar (navy in both modes):**
- `sidebar` = `#0D2043` · `sidebar-foreground` = `#F5F5F5`
- `sidebar-primary` = Light `#7C64FE` / Dark `#9B85FF`
- `sidebar-accent` = `#1B2F53` · `sidebar-border` = `#1B2F53`

**Charts (aligned across modes):**
- `chart-1` = Light `#7C64FE` / Dark `#9B85FF` (purple)
- `chart-2` = `#00BCFF` (cyan) · `chart-3` = `#FEB343` (amber)
- `chart-4` = `#FF655A` (coral) · `chart-5` = `#12BFA5` (teal)

**Voice tokens:**
- `recording` = Light `#E5484D` / Dark `#FF6366` (with `pulse` motion)
- `on-call` = Light `#12BFA5` / Dark `#00BC7C`
- `ringing` = Light `#FEB343` / Dark `#FC9A0D` (with `pulse` motion)

**Channel tokens:**
- `channel/whatsapp` `#25D366` · `channel/voice` `#7C64FE` · `channel/sms` `#8A8F98`
- `channel/email` `#EA4335` · `channel/instagram` `#E1306C` · `channel/messenger` `#0084FF`
- `channel/telegram` `#229ED9` · `channel/webchat` `#0F1011` · `channel/rcs` `#1A73E8`

### 5.2 — Typography (two-font system)

- **Brand** (marketing, decks, campaigns): **Dialogue ME** — NEVER used in product
- **Product** (web app, dashboards, booking pages, emails): **IBM Plex Sans + IBM Plex Sans Arabic** — Latin uses Sans, Arabic uses Sans Arabic

| Style | Size/LH | Weight |
|---|---|---|
| Display-XL / L / M | 72 / 64 / 48 | Medium |
| H1 | 32 / 36 | Medium |
| H2 | 24 / 32 | Medium |
| H3 | 20 / 27 | SemiBold |
| Body-L | 18 / 29 | Regular |
| Body | 16 / 24 | Regular |
| Body-M | 16 / 24 | Medium |
| Body-S | 15 / 24 | Regular |
| Tabular-Small | 13 / 20 | Regular + `tnum` (Latin only) |
| UI/Small | 14 / 21 | Medium |
| UI/Caption | 13 / 20 | Regular |
| UI/Label | 12 / 17 | Medium |
| UI/Micro | 11 / 15 | Medium |

**Pairing:** bilingual strings use font stack `['IBM Plex Sans:<weight>', 'IBM Plex Sans Arabic:<weight>', sans-serif]`.
**DELETED:** Mono/* aliases. Repoint to Body/Body, Body/Body-S, UI/Label.

### 5.3 — Spacing + Radius

**Spacing (px):** `0, 1 (4), 2 (8), 3 (12), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64), 20 (80), 24 (96)`

**Radius:**
- **Azeer default** (`0.625rem` / 10px) — Buttons, inputs, cards, dialogs, sheets, toasts
- `xs` (2) — tiny chips, xs checkboxes
- `sm` (4) — small chips, tags, checkboxes
- `md` (6) — dense list rows, popover internals
- `lg` (8) — legacy large cards
- `xl` (12) / `2xl` (16) — hero cards only
- `3xl` (22) — rare feature surfaces
- `full` — status pills, channel pills, count pills, avatars, dots

### 5.4 — Motion

**Durations (3 only):** `fast 100ms · base 200ms · slow 400ms`

**Curves (3 only):**
- `ease-out-quint` = `cubic-bezier(0.16, 1, 0.3, 1)` — enter
- `ease-in-quint` = `cubic-bezier(0.7, 0, 0.84, 0)` — exit
- `ease-in-out-quint` = `cubic-bezier(0.87, 0, 0.13, 1)` — state changes

**Presets (4):**
- `enter` — slow + ease-out-quint (modal, drawer, toast in)
- `exit` — base + ease-in-quint (modal close, toast out)
- `state-change` — fast + ease-in-out-quint (tab, hover, focus)
- `pulse` — 1.5s infinite, ease-in-out-quint, opacity 0.6 → 1.0 (recording, ringing, active waveforms)

Respect `prefers-reduced-motion` — all presets collapse to 0ms.

### 5.5 — Icons

**Library:** Lucide React only. NEVER Font Awesome, Heroicons, Tabler, Phosphor.
**Sizes:** 14 (list-drag only: grip-vertical/horizontal) · 16 · 20 · 24 · 32.
**Rule:** Icons must be NATIVE at their display size. A 16×16 icon is a 16×16 component, NOT a scaled-down 24×24.

---

## Surface Profiles

### Profile A — Agent Console
- Users: Clinic staff, agents, admins. Usage: 8+ hrs/day.
- Needs: Density, keyboard efficiency, visual calm, signal layering.
- Color authority: Azeer brand (navy sidebar, purple CTAs).
- Motion default: `fast` dominant.
- Surfaces: Dashboard, Agent Inbox, Admin, Campaign Composer, Analytics, Dashboard Calendar (Month/Week/Day/Agenda/Resource), Call Bar, Dialpad, Voicemail, IVR Builder, Queue Monitor.

### Profile B — Consumer-Facing
- Users: Patients, booking customers. Usage: 2-5 min sessions.
- Needs: Comfort, clarity, trust.
- Color authority: **Tenant brand** (clinic logo + tenant-primary color) with Azeer footer attribution per tier.
- Motion default: `base`/`slow` dominant.
- Surfaces: Booking page (stepper), Booking calendar (Week/Day only), Confirmation page, Payment page, patient-facing emails.

### Profile C — System (V1.1 — not in V1)
Auth, billing, onboarding. Deferred.

**Every component in this design system is tagged `Used in: [A] / [B] / [A+B]` — check before using.**

---

## Locked stack (never substitute)

| Role | Library | Never use |
|---|---|---|
| UI Core | shadcn/ui + shadcn Studio | MUI, Chakra, Mantine, Ant Design, Radix unstyled |
| Icons | Lucide React | Font Awesome, Heroicons, Tabler, Phosphor |
| Animation | Motion (framer-motion) | GSAP, React Spring, Auto-Animate |
| Fonts | Fontsource (self-hosted) | Google Fonts CDN |
| Tables | TanStack Table | ag-Grid, MUI DataGrid |
| Charts | Recharts (via shadcn Chart) | Chart.js, Victory, Nivo |
| Forms | React Hook Form | Formik, Final Form |
| Validation | Zod | Yup, Joi, Valibot |
| Dates | date-fns + date-fns-tz | Moment, Luxon, Day.js |
| Date picker | shadcn Calendar | react-datepicker, airbnb |
| Toasts | Sonner | react-hot-toast, notistack |
| Calendar | FullCalendar | react-big-calendar, Tui |
| Payments | Stripe Elements | — |
| Real-time | Ably | Socket.io, Pusher, PubNub |
| Voice/Video | LiveKit | Agora, Twilio Video, Jitsi |
| Audio viz | wavesurfer.js | — |
| PDF viewing | react-pdf | PDF.js direct, pdf-lib |
| Rich text | Tiptap | Quill, Slate, Draft.js, Lexical |
| E-signature | react-signature-canvas | — |
| Auth | Clerk | Auth.js, NextAuth, Supabase Auth |

---

## Workflow for any task

1. **Load this file + the specific references needed** (see map below)
2. **Identify the Profile** (A, B, or A+B) — affects density, motion, color authority
3. **Search for existing components** before creating new ones — reuse beats recreate
4. **Build with auto-layout only** — no free-positioned layers
5. **Bind every value as you go** — never "set hex then bind later"
6. **Validate with the 7-state matrix** — default/hover/focus/disabled/loading/empty/error
7. **Run audits** from `08-Audits/` — hard-coded values, typography scale, spacing scale, icon sizes, profile match, token match
8. **If stuck, STOP and ask** — never silently improvise

---

## Red flags — STOP and escalate

If any of these is true, stop designing and ask:

- You need a color outside the 19 semantic tokens
- You need a spacing value outside the scale
- You need a font size outside {11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 48, 64, 72}
- You need a radius outside the scale
- A pattern isn't covered by `03-Compositions/`
- The design can't meet WCAG AA without compromising aesthetic
- RTL treatment isn't obvious
- shadcn/Radix doesn't have a matching primitive

---

## Reference file map — load what you need

**Always load (Core):**
- `00-Core/SKILL.md` (this file)
- `00-Core/AI-PROMPT-BLOCK.md` (copy-paste into external AI tools)

**Foundations (reference often):**
- `01-Foundations/tokens.md` — full token registry with Figma variable IDs + both modes
- `01-Foundations/typography.md` — full type scale EN + AR
- `01-Foundations/motion.md` — curves, durations, presets
- `01-Foundations/spacing-radius.md` — scales + usage rules
- `01-Foundations/icons.md` — sizing contract + RTL flip list
- `01-Foundations/rtl-arabic.md` — logical properties + bilingual rules
- `01-Foundations/accessibility.md` — WCAG AA targets

**Profiles:**
- `07-Profiles/profiles.md` — A/B/C definitions + component tagging
- `07-Profiles/tenant-theming.md` — Profile B tenant overrides (locked vs overridable)

**Components (load the specific one you're working on):**
- `02-Primitives/` — shadcn-based primitives (Button, Input, Select, etc.)
- `03-Compositions/` — Azeer-specific patterns (Sidebar, Toolbar, Data Table, Row Action Menu, ⌘K palette, Celebration)
- `04-Voice/` — 29 voice components (Call Bar, Dialpad, Voice Message, Voicemail, IVR)
- `05-Calendar-Booking/` — Dashboard Calendar + Booking Page components

**AI Artifacts (machine-readable):**
- `06-AI-Artifacts/components.json` — queryable component registry
- `06-AI-Artifacts/Azeer-theme-Light.json` — shadcn Studio re-importable (Light)
- `06-AI-Artifacts/Azeer-theme-Dark.json` — shadcn Studio re-importable (Dark — with Section A fixes)
- `06-AI-Artifacts/tokens.yaml` — full machine-readable token registry

**Audits (run after every write):**
- `08-Audits/hard-coded-values.md` — returns 0 on clean screens
- `08-Audits/typography-scale.md` — returns 0
- `08-Audits/spacing-scale.md` — returns 0
- `08-Audits/icon-sizes.md` — returns 0 mismatches
- `08-Audits/profile-match.md` — verifies component Profile tags match usage
- `08-Audits/token-match.md` — verifies color tokens match locked V1 palette

**Test plan:**
- `09-Test-Plan/test-plan.md` — 3 test screens to validate V1
- `09-Test-Plan/rebuild-figma-checklist.md` — tomorrow's Figma update sequence

---

## Source of truth hierarchy

If any file or surface disagrees with another:

1. **This file (`SKILL.md`) wins** over everything else
2. **Tier 1 foundation files** (`01-Foundations/`) win over Figma
3. **Figma file** (`Mo6TnlpEQeFyiEx1GoDfVR`) wins over implemented code
4. **Implemented code** wins over docs in `99-Archive/`

When divergence is found, update the LOWER file to match the HIGHER, never the reverse.

---

## Versioning

- **V1** (2026-04-22) — Locked. Dark mode fixed, voice added, Surface Profiles formalized, tenant theming scoped.
- **V1.1** (planned) — Profile C (System), IVR tree builder, advanced routing, celebration Tier 3 full-screen.
- **V2** (future) — TBD.

---

## Changelog

- **2026-04-22** — V1 locked. Replaces all prior Tier 1/2/3/4 content. Previous files moved to `99-Archive/`.
