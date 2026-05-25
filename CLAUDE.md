# Intercom Feel — Azeer DS V1 Operating Rules

## Visual restraint rules (mandatory)
- NO global top header. Persistent navigation lives in left sidebar only.
- NO gradients on UI surfaces. Solid fills only.
- NO drop shadows on cards. Use 1px border `border-zinc-200 dark:border-zinc-800` instead.
- NO decorative illustrations on dashboards. Icons only.
- NO more than ONE accent color per screen. Brand: `#7C64FE` (Surface A) / `#9B85FF` (Surface B).
- Backgrounds are zinc-50 / zinc-900. Cards are white / zinc-950.
- Typography: IBM Plex Sans + IBM Plex Sans Arabic. Weights: 400, 500, 600 only.
- Border radius scale: 6px (inputs), 8px (cards), 12px (modals). No 16px+.

## Layout rules (mandatory)
- App shell = Primary sidebar (icon rail + labels) + Secondary nav panel + Content area.
- Primary sidebar collapses to icon-only at <1280px viewport.
- Secondary nav supports pin/unpin per user.
- Page header is PART OF CONTENT, not the shell. Lives inside route.
- Page header structure: Breadcrumb · Title · Owner · {right-aligned: Date range, Filters, Share, Edit}.
- Optional `<SystemBanner />` thin strip ABOVE page header only for trial / billing / downtime alerts. Single instance, no nesting.

## Component rules (mandatory)
- Buttons: ghost variant is the default. Solid only for primary CTA per page.
- Date range picker: pill-shaped, ghost-styled, opens calendar popover.
- Filters: "Add filter" button opens dropdown with checkboxes + search.
- Empty states: ALWAYS present when data is absent. Format: icon (zinc-400) + 1-line title + 1-line helper. No CTAs unless action is the obvious next step.
- KPI tiles: label (sm, zinc-500) · number (3xl, zinc-900) · delta (sm, green/red) · optional sparkline. Border 1px, no shadow.
- Charts: max 5 chart types allowed (bar, line, donut, sparkline, heatmap). Recharts only. Brand color for primary series, zinc-400 for secondary.
- Modals: max-width 600px (default), 800px (advanced). Header + body + footer, footer right-aligned actions.

## IA rules (mandatory — from Intercom's 4 principles)
1. **Bring similar things together** — never fork related features into 2 nav items.
2. **Home for AI & Automation** — all AI lives in one section.
3. **Reduce noise** — secondary actions go into row menus or settings, not main nav.
4. **Streamline personal settings** — one Personal section, accessed via avatar menu only.

## Anti-patterns (auto-reject in PR review)
- Adding a global top toolbar
- Cards with shadow + border (pick one — use border)
- More than one accent color per screen
- Loading spinners with brand color (use zinc-400)
- "Welcome back, {name}!" style headers — too informal for operator UI
- Floating action buttons (FAB) — wrong pattern for desktop SaaS
- Multi-step wizards when single-page progressive disclosure works
- Empty states without helper copy

## When generating new components, ask:
1. Would this fit in Intercom's UI without looking out of place?
2. Is there visual restraint? (1 accent, 1 weight emphasis, 1 elevation level)
3. Does it follow the 7 Intercom DNA traits?
If any answer is no — redesign before merging.
