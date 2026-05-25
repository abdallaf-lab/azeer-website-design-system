---
name: azeer-design
description: Use this skill to generate well-branded interfaces and assets for Azeer, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Trigger this when designing, auditing, fixing, or building any screen, component, or flow for Azeer — Agent Console (Profile A), Consumer Booking (Profile B), WhatsApp/Voice comms, RTL/Arabic, dark mode, tenant theming.
user-invocable: true
---

# Azeer Design System — Agent Skill

Read the **README.md** file within this skill first — it contains the
company context, the two Surface Profiles (Agent Console vs Consumer
Booking), content fundamentals, visual foundations, and iconography
rules.

Then load the files you need for your task:

- **`colors_and_type.css`** — drop this into any HTML artifact and
  every Azeer color/type/spacing/motion token is available as a
  CSS variable.
- **`tokens.yaml`** — machine-readable registry. Cite values from
  here, never invent.
- **`themes/Azeer-theme-Light.json` + `themes/Azeer-theme-Dark.json`** —
  shadcn Studio-importable when working in a React + shadcn codebase.
- **`AI-PROMPT-BLOCK.md`** — the locked contract to paste at the top
  of any other AI tool's prompt (Cursor, v0, Lovable, Figma Make).
- **`ui_kits/agent_console/`** — Profile A reference recreation (inbox,
  thread, composer, call bar, dark + RTL toggles). Open `index.html`
  for the interactive version; lift `*.jsx` components as-is.
- **`ui_kits/booking/`** — Profile B reference recreation (tenant-
  branded booking stepper). Try the brand swatches in the top-right.
- **`preview/`** — one-off HTML cards per token family. Useful as
  copy-paste starting points for design-system documentation.
- **`assets/`** — Azeer wordmark + mark (placeholders — replace with
  real artwork when you have it).

## Non-negotiable rules

1. **Every value binds to a token.** No raw hex, no raw integer
   spacing, no off-scale font sizes. If a value isn't in the system,
   ask; don't invent.
2. **Surface Profile awareness.** Every component is tagged
   `Used in: [A] / [B] / [A+B]`. Never mix Profile A density into
   Profile B. Never render tenant theming in Profile A.
3. **Seven states per component:** default, hover, focus, disabled,
   loading, empty, error. Offline is an app-level banner, except for
   real-time comms components where it's required per-component.
4. **RTL is not optional.** Every component works LTR and RTL via
   logical properties (`padding-inline-start`, not `padding-left`).
   Mirror layout, never data — phone numbers, URLs, emails, IBANs,
   order IDs stay LTR inside RTL.

## How to respond

### If creating a visual artifact (slides, mocks, throwaway prototypes)
1. Ask what surface: Profile A (Agent Console) or Profile B (Booking).
2. Import `colors_and_type.css` into the artifact; use CSS variables
   for every color and spacing value.
3. Copy the relevant UI-kit components from `ui_kits/<profile>/*.jsx`
   as starting points — they're already token-bound and RTL-safe.
4. Pull icons from Lucide (load via `unpkg` for prototypes, native
   sizes 14/16/20/24/32).
5. Output a static HTML file the user can view.

### If working on production code
1. Copy the tokens + themes into the repo.
2. Follow the locked stack from `AI-PROMPT-BLOCK.md`: shadcn/ui +
   shadcn Studio, Lucide, Motion, Fontsource, TanStack Table, Recharts,
   React Hook Form + Zod, date-fns, Sonner, FullCalendar, Ably,
   LiveKit, Tiptap, Clerk. Never substitute.
3. Audit before shipping: hard-coded values · typography scale ·
   spacing scale · icon sizes · profile match · token match.

### If the user invokes this skill with no brief
Ask what they want to build or design. Typical next questions:
- **Profile:** Agent Console or Booking page?
- **Surface:** which screen or flow?
- **Language/direction:** Arabic (RTL), English (LTR), or bilingual?
- **Mode:** light, dark, or both?
- **Fidelity:** hi-fi mock, clickable prototype, or production code?
- **Tenant brand override:** standard Azeer purple, or a specific
  tenant color?

Then act as an expert designer and output either static HTML artifacts
(for mocks) or production React + shadcn + Tailwind code, depending on
the need.

## Red flags — STOP and ask

- You need a color outside the semantic token list
- You need a spacing value outside `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`
- You need a font size outside `11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 48, 64, 72`
- You need a radius outside the scale
- shadcn/Radix doesn't have a matching primitive
- The design can't meet WCAG AA without compromising aesthetic
- RTL treatment isn't obvious

---

**Source of truth hierarchy:** this skill → the token files here
(`tokens.yaml` + themes) → the Figma file `Mo6TnlpEQeFyiEx1GoDfVR` →
implementation code. When they disagree, update the **lower** layer to
match the higher.
