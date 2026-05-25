# Azeer AI Prompt Block V1 (2026-04-22)

> [!important] USAGE
> Copy the code block below and paste it at the **TOP** of any prompt to Claude, Claude Code, Cursor, v0, Lovable, Figma Make, or any other AI coding tool when building Azeer UI. It forces the tool to stay inside Azeer's locked design system. No substitutions, no alternative libraries, no invented tokens.

---

## Copy-paste block

```
You are building a component/screen/feature for the Azeer product.
You MUST follow the Azeer Design System V1 Contract exactly.
Do NOT substitute libraries, colors, fonts, or invent tokens.

=== LOCKED STACK (use these exactly — never alternatives) ===

UI Core: shadcn/ui + shadcn Studio (RTL-native; product IS RTL-first)
Icons: Lucide React — sizes 14 (list-drag only) / 16 / 20 / 24 / 32
Animation: Motion (framer-motion) — fast 100ms / base 200ms / slow 400ms
Curves: ease-out-quint / ease-in-quint / ease-in-out-quint (exactly 3)
Fonts:
  - Product: IBM Plex Sans (Latin) + IBM Plex Sans Arabic (Arabic), via Fontsource self-hosted
  - Brand: Dialogue ME — NEVER used in product
Tables: TanStack Table
Charts: Recharts via shadcn Chart
Forms: React Hook Form + Zod
Dates: date-fns + date-fns-tz; picker = shadcn Calendar
Toasts: Sonner
Calendar (bookings): FullCalendar
Payments: Stripe Elements
Real-time: Ably (+ Ably Presence); chat UI is custom shadcn, NOT a third-party chat lib
Emoji: emoji-mart
Voice/Video: LiveKit; audio viz: wavesurfer.js
PDF viewing: react-pdf
Rich text: Tiptap
E-signature: react-signature-canvas
Auth: Clerk (themed with shadcn)

NEVER USE: MUI, Chakra, Mantine, Ant Design, Radix unstyled, GSAP, React Spring,
Font Awesome, Heroicons, Tabler, Phosphor, Google Fonts CDN, Formik, Yup, Moment,
Chart.js, Victory, Nivo, Socket.io, Pusher, PubNub, Agora, Twilio Video,
react-big-calendar, Auth.js, NextAuth, Supabase Auth, Quill, Slate, Draft.js,
Lexical, inline hex colors, new custom CSS files per component, raw spacing integers.

=== COLORS (use CSS variables, never raw hex in components) ===

LIGHT MODE:
  --background: #FFFFFF
  --foreground: #2E2E2E
  --card: #FFFFFF
  --popover: #FFFFFF
  --primary: #7C64FE
  --primary-foreground: #F5F5F5
  --secondary: #0D2043 (NAVY — authoritative surfaces, sidebar)
  --secondary-foreground: #F5F5F5
  --muted: #F5F5F5
  --muted-foreground: #4D4D4D
  --accent: #F2F0FF (lavender — hover/selected chrome)
  --accent-foreground: #7C64FE
  --destructive: #E60006
  --success: #12BFA5
  --warning: #FEB343
  --info: #00BCFF
  --border: #E4E4E4
  --input: #E4E4E4
  --ring: #CDDAFD

DARK MODE (Section A fixes applied — do NOT use shadcn defaults):
  --background: #090909
  --foreground: #FCFCFC
  --card: #161616
  --popover: #161616
  --primary: #9B85FF (LIFTED purple — NOT #E4E4E4; WCAG AA pass)
  --primary-foreground: #0A0A0A
  --secondary: #0D2043 (NAVY — same in both modes, brand anchor)
  --secondary-foreground: #F5F5F5
  --muted: #1A1A1A
  --muted-foreground: #A1A1A1
  --accent: #1F1A3A (DESATURATED dark purple — NOT grey #262626)
  --accent-foreground: #C7B8FF
  --destructive: #FF6366
  --success: #00BC7C
  --warning: #FC9A0D
  --info: #00ACF1
  --border: rgba(255,255,255,0.10)
  --input: rgba(255,255,255,0.15)
  --ring: #9B85FF

SIDEBAR (navy in BOTH modes):
  --sidebar: #0D2043
  --sidebar-foreground: #F5F5F5
  --sidebar-primary: (Light #7C64FE / Dark #9B85FF)
  --sidebar-accent: #1B2F53
  --sidebar-border: #1B2F53

CHARTS:
  --chart-1: Light #7C64FE / Dark #9B85FF (purple — primary series)
  --chart-2: #00BCFF (cyan)
  --chart-3: #FEB343 (amber)
  --chart-4: #FF655A (coral)
  --chart-5: #12BFA5 (teal)

VOICE TOKENS (required for any voice component):
  --recording: Light #E5484D / Dark #FF6366 (apply PULSE motion)
  --on-call: Light #12BFA5 / Dark #00BC7C
  --ringing: Light #FEB343 / Dark #FC9A0D (apply PULSE motion)

CHANNEL TOKENS:
  --channel-whatsapp: #25D366
  --channel-voice: #7C64FE
  --channel-sms: #8A8F98
  --channel-email: #EA4335
  --channel-instagram: #E1306C
  --channel-messenger: #0084FF
  --channel-telegram: #229ED9
  --channel-webchat: #0F1011
  --channel-rcs: #1A73E8

=== TYPOGRAPHY ===

Scale (EN + AR, size/lineHeight/weight):
  Display-XL    72/72 Medium
  Display-L     64/64 Medium
  Display        48/48 Medium
  H1             32/36 Medium
  H2             24/32 Medium
  H3             20/27 SemiBold
  Body-L         18/29 Regular
  Body           16/24 Regular
  Body-M         16/24 Medium
  Body-S         15/24 Regular
  Tabular-Small  13/20 Regular + tnum (Latin only)
  UI/Small       14/21 Medium
  UI/Caption     13/20 Regular
  UI/Label       12/17 Medium
  UI/Micro       11/15 Medium

Pairing: bilingual strings use stack
  ['IBM Plex Sans:<weight>', 'IBM Plex Sans Arabic:<weight>', sans-serif]

DELETED styles (do NOT use): Mono/Mono-Body, Mono/Mono-Small, Mono/Mono-Label.

=== SPACING (px, never raw integers) ===

0, 1 (4), 2 (8), 3 (12), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64), 20 (80), 24 (96)

=== RADIUS ===

Default "Azeer radius" = 0.625rem (10px) — Buttons, inputs, cards, dialogs, sheets, toasts
Scale: xs (2), sm (4), md (6), lg (8), xl (12), 2xl (16), 3xl (22), full (9999)
Pills/avatars/status dots → full. Dense list rows → md. Hero cards → 2xl.

=== MOTION ===

Durations: fast 100ms / base 200ms / slow 400ms (NEVER 120, 300 — those are deprecated)

Curves:
  ease-out-quint: cubic-bezier(0.16, 1, 0.3, 1) — ENTER
  ease-in-quint: cubic-bezier(0.7, 0, 0.84, 0) — EXIT
  ease-in-out-quint: cubic-bezier(0.87, 0, 0.13, 1) — STATE CHANGE

Presets:
  enter — slow + ease-out-quint (modal, drawer, toast)
  exit — base + ease-in-quint
  state-change — fast + ease-in-out-quint (tab, hover, focus)
  pulse — 1.5s infinite, ease-in-out-quint, opacity 0.6 → 1.0 (recording, ringing)

ALWAYS respect `prefers-reduced-motion` — all presets collapse to 0ms.

=== REQUIRED STATES (per component) ===

7 REQUIRED: default, hover, focus, disabled, loading (Skeleton), empty (custom per context), error

APP-LEVEL (NOT per-component): offline banner + reconnecting banner

SELECTIVE OFFLINE VARIANT REQUIRED (only for comms components):
  Call Bar, Dialpad, Chat Composer, Voice Recording Input, Incoming Call Toast, Recording Player

=== SURFACE PROFILES (CHECK BEFORE BUILDING) ===

Profile A — Agent Console (dashboard, inbox, admin):
  Users: agents 8+hrs/day. Density, keyboard-first, Azeer brand (navy sidebar, purple CTAs).
  Motion: fast dominant.

Profile B — Consumer-Facing (booking page, patient flows):
  Users: patients 2-5min sessions. Comfort, TENANT BRAND takes over (tenant-primary, tenant-logo),
  Azeer footer attribution per tier.
  Motion: base/slow dominant.

Profile C — System (auth, billing) — NOT IN V1.

Every component is tagged Used in: [A] / [B] / [A+B]. Never mix Profile A density
into Profile B, never render tenant theming in Profile A.

=== TENANT THEMING (Profile B only) ===

OVERRIDABLE (tenant controls these on booking pages):
  tenant-primary, tenant-primary-foreground (auto-derived WCAG AA),
  tenant-logo, tenant-favicon, tenant-name, tenant-hero-image

LOCKED (never tenant-overridable):
  destructive, success, warning, info, foreground, background, muted, border, ring,
  all spacing, all radius, all motion, all typography

=== BREAKPOINTS ===

sm 640px — single column, stacked nav
md 768px — two column, side drawer
lg 1024px — full dashboard layout
xl 1280px — wide layout, expanded panels

Mobile-only: dialpad, bottom nav, simplified call bar, Agenda calendar view
Desktop-only: multi-panel inbox, analytics dashboard, Resource calendar view

=== RTL (Arabic) ===

Product IS RTL-first. Use LOGICAL properties:
  padding-inline-start (NOT padding-left)
  margin-inline-end (NOT margin-right)
  inset-inline-start, text-align: start
  Tailwind: ps-*, pe-*, ms-*, me-*, start-*, end-*

Mirror LAYOUT, never DATA: phone numbers, URLs, emails, IBANs, code stay LTR inside RTL.

Chat bubbles: outbound right / inbound left in LTR → flips in RTL.

=== DELIVERABLE ===

shadcn + Tailwind + Motion + the locked libs above — nothing else.

If a requirement CANNOT be met inside this stack:
  STOP, do not substitute, and ask the founder before proceeding.

Before you output code, verify:
  [ ] Every color is a CSS variable, never raw hex
  [ ] Every spacing uses the scale (raw 4/8/12/16/20/24/32/40/48/64 only)
  [ ] Radius is 0.625rem for buttons/inputs/cards, full for pills, or from the scale
  [ ] Every text uses IBM Plex Sans (+ Arabic sibling), from the 15-style scale
  [ ] Icons are Lucide, at 14/16/20/24/32 native
  [ ] Motion uses one of 4 presets
  [ ] Component has all 7 required states
  [ ] Profile tag is declared (A, B, or A+B)
  [ ] Works in both Light AND Dark mode via CSS variables
  [ ] Works in both LTR AND RTL via logical properties

If ANY box unchecked, STOP and fix before delivering.
```

---

## When to use this block

| Tool | How to use |
|---|---|
| Claude (web/desktop) | Paste at top of your prompt before describing the task |
| Claude Code (CLI) | Add to CLAUDE.md at the top of the repo, or paste each session |
| Cursor | Add to `.cursorrules` or paste in prompt |
| v0 by Vercel | Paste at top of prompt |
| Lovable | Paste at top of prompt |
| Figma Make / shadcn Studio AI | Paste at top of prompt |
| GitHub Copilot | Add to `.github/copilot-instructions.md` |

---

## What happens if you skip the block

The AI tool will default to:
- shadcn/ui default theme (not Azeer's)
- Light mode only (no dark mode)
- Generic colors (not Azeer purple/navy)
- Inter or system fonts (not IBM Plex)
- LTR only (breaks RTL)
- Random radius values (breaks consistency)
- Invented "similar" tokens

Result: 4-6 hours of cleanup per screen. **Always paste the block.**

---

## Verification test

If an AI tool returns code using `#5145CD` (old purple), `#E4E4E4` as primary in dark mode, Inter, Moment.js, Chart.js, or raw `padding: 10px` — it ignored this block. Reject and re-prompt.

---

## Changelog

- **2026-04-22** — V1 locked. Replaces Contract §7. Includes Dark mode fixes (Section A), two-font system (B), Surface Profiles (C), tenant theming (D), voice tokens and `pulse` motion (E).
