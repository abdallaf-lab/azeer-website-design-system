# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Table of contents

1. [Commands](#commands)
2. [Repo topology](#repo-topology)
3. [Token system (the foundation everything stands on)](#token-system)
4. [Tailwind v4 setup](#tailwind-v4-setup)
5. [`cn()` and the tailwind-merge safelist](#cn-and-tailwind-merge-safelist)
6. [Primitive tier system](#primitive-tier-system)
7. [Anatomy of a primitive](#anatomy-of-a-primitive)
8. [Locked component contracts](#locked-component-contracts)
9. [AppShell + navigation chrome](#appshell-and-navigation-chrome)
10. [Modal-portaled content (Select/Popover inside Dialog/Sheet)](#modal-portaled-content)
11. [Forms](#forms)
12. [Feedback surfaces: Toast / Banner / Alert / Dialog](#feedback-surfaces)
13. [Icons](#icons)
14. [RTL canon](#rtl-canon)
15. [Density](#density)
16. [Storybook structure](#storybook-structure)
17. [Peer-dependency strategy](#peer-dependency-strategy)
18. [Tooling notes (Vite 8, ESLint 9, tsconfig)](#tooling-notes)
19. [Non-obvious conventions](#non-obvious-conventions)
20. [Production constraints (will break silently if ignored)](#production-constraints)

---

## Commands

```bash
pnpm install                              # install all workspaces
pnpm storybook                            # storybook for apps/storybook       → localhost:6006
pnpm build                                # turbo run build (every workspace)
pnpm typecheck                            # tsc --noEmit across all workspaces
pnpm lint                                 # ESLint across all workspaces
pnpm format                               # prettier write
pnpm format:check                         # prettier check (CI)
pnpm clean                                # remove node_modules + build outputs

# Scope to one workspace
pnpm --filter @azeer/ui lint
pnpm --filter @azeer/storybook build
```

There is no test runner configured. Verification is by `typecheck` + Storybook visual review.

Requirements: Node ≥ 20.11, pnpm ≥ 9. `packageManager` is pinned to `pnpm@9.15.4` via the root `package.json`.

---

## Repo topology

```
packages/tokens          @azeer/tokens — CSS variables + Tailwind v4 @theme inline
packages/ui              @azeer/ui — ~52 primitives, consumed as source (no build step)
packages/config-eslint   shared ESLint flat configs (base + react)
packages/config-tsconfig shared tsconfigs (base / react-app / react-library)
apps/storybook           docs surface — every primitive has stories + an MDX doc
```

`@azeer/ui` is **never built** — it's consumed as TS source by downstream Vite/Storybook builders via workspace symlinks. `sideEffects: false` + tree-shaking handles unused primitives. Consumers that import from `@azeer/ui` resolve directly to `packages/ui/src/index.ts`.

---

## Token system

The foundation everything else stands on. **Every hex / px / time / weight literal exists exactly once, in `packages/tokens/src/tokens.css`.** There are no hex values in any component file.

### Architecture (7 sections of tokens.css, in order)

| § | Section | What it is |
|---|---|---|
| 1 | `@import "tailwindcss"` + `@import "tw-animate-css"` + `@source` directives | Tailwind v4 entry. `@source` paths are relative to this file and cover `packages/ui` + every `apps/*` workspace. |
| 2 | Primitive layer (`:root`) | Raw palette — indigo, neutrals, intent palettes (green/red/amber/blue), channel hues, WhatsApp chrome, chart colors. **Never consumed by components directly.** |
| 3 | Semantic layer (`@theme inline { … }`) | Tailwind v4 reads this. Generates utilities (`bg-fg-default`, `text-accent-text`, `h-ctrl-md`, `duration-fast`, `animate-accordion-down`, etc.) and exposes the vars to component CSS. `inline` keeps utilities as `var()` references so `[data-theme]` / `[data-density]` swaps cascade without a rebuild. |
| 4 | Non-Tailwind tokens (`:root`) | Motion shorthands, alpha scale, focus ring, control-size primitives (`--control-h-{sm,md,lg}`), elevation aliases, z-index aliases. |
| 5 | Theming-axis scaffolds | `[data-theme="dark"]` and `[data-theme="high-contrast"]` are empty scaffolds (v1.5+). `[data-density="compact"]` is **shipped** — overrides `--control-h-*` and `--row-h`. |
| 6 | Reduced motion | `prefers-reduced-motion: reduce` collapses all durations to 0 and pins `animation-iteration-count: 1`. Components never branch on this. |
| 7 | Globals | `::selection`, the **single canonical `:focus-visible` ring** (components never re-roll it), `.bidi-isolate` utility, scrollbar styling. |

### Color intent palette (semantic layer)

| Token group | Members | Use |
|---|---|---|
| Surface | `canvas` (page bg, lavender), `surface` (white island), `surface-sunken` (nested), `surface-overlay` (popover/menu surface), `surface-inverse` (dark indigo) | Backgrounds for the layout system |
| Foreground | `fg-default` (AAA), `fg-muted` (AA), `fg-subtle` (decorative only), `fg-disabled` (WCAG-exempt), `fg-on-{accent,inverse,success,danger,info,warning,canvas}` | Text + icons |
| Border | `border-default`, `border-strong`, `border-focus` (indigo-500), `border-accent`, `border-divider` | Outlined surfaces + dividers |
| Accent (brand) | `accent-brand` (identity, non-text), `accent-fill` (functional, pairs with white), `accent-fill-hover/active`, `accent-bg-subtle`, `accent-border`, `accent-text` | Brand-tinted UI |
| Intents | `success-*`, `danger-*`, `warning-*`, `info-*` — each has `fill`, `fill-hover`, `bg-subtle`, `border`, `text` | Semantic state communication |
| AI | `ai-bg-subtle`, `ai-border`, `ai-text`, `ai-icon` — **resolve to accent** (aliases) | AI-flavored surfaces. Components MUST read `--color-ai-*`, never reach into accent directly. |
| Channel | `channel-{whatsapp,voice,sms,email,instagram,messenger,telegram}` | Icon/badge use only. **Never page background.** |
| WhatsApp chrome | `whatsapp-chrome-{fill,action,canvas}` | Meta-fixed values for in-app WhatsApp-UI mockups. Do not retune. |
| State overlays | `state-{hover,active,selected,selected-hover}` | Interaction overlays (rgba black, NOT solid) |
| Link | `text-link`, `text-link-hover`, `text-link-visited` | Inline anchors |
| Scrollbar | `scrollbar-{track,thumb,thumb-hover,thumb-active}` | Applied globally on `*` |
| Code/syntax | `code-{bg,fg,border}` + `syntax-{keyword,string,number,comment,function,type,property,punctuation}` | MDX code blocks |
| Chart | `chart-{1..6}` categorical, `chart-seq-{1..5}` sequential indigo ramp, `chart-{neg,neutral,pos}` divergent | Charts only |

### Typography scale

| Token | Px / line / weight / tracking | Intended use |
|---|---|---|
| `text-label-xs` | 11 / 14 / 600 / +0.05em UPPER | Uppercase eyebrows — inspector section titles, sidebar group labels |
| `text-label-sm` | 13 / 16 / 500 | Form labels |
| `text-label-md` | 14 / 16 / 600 | Button labels (all sizes), emphasized form labels |
| `text-body-xs` | 12 / 16 / 400 / +0.01em | Metadata, captions, timestamps, footnotes only — **not** general body |
| `text-body-sm` | 13 / 20 / 400 / +0.005em | Compact body, dense rows |
| `text-body-md` ★ | 14 / 20 / 400 | **DEFAULT** body, default control text |
| `text-heading-sm` | 16 / 22 / 600 / -0.01em | Card title, list-column title |
| `text-heading-md` | 18 / 24 / 600 / -0.015em | Sub-nav / panel title |
| `text-heading-lg` | 20 / 28 / 600 / -0.018em | Page header, module title |
| `text-heading-xl` | 24 / 32 / 600 / -0.022em | Hero in app (dashboard title, settings landing) |
| `text-display` | 32 / 40 / 700 / -0.03em | True display tier — empty-state heroes, marketing |

Three font weights only: 400 / 500 / 600 (display is 700, exceptional). Three font families: `--font-sans` (Inter), `--font-arabic` (IBM Plex Sans Arabic), `--font-mono` (JetBrains Mono). Same-metric pairing between Inter ↔ IBM Plex Arabic.

Sidebar items and buttons (sm/md/lg) both use `text-label-md` (14 px), so type is unified between L1 rail and L2 sidebar. The size variants distinguish only height + padding.

### Spacing

`--spacing: 4px` is the Tailwind v4 base. All Tailwind spacing utilities derive: `p-1 = 4`, `p-2 = 8`, `p-3 = 12`, `p-4 = 16`, `p-5 = 20`, `p-6 = 24`.

Locked per-surface defaults (used inside primitives):

| Surface | Padding | Inter-section gap |
|---|---|---|
| Card (default) | p-5 (20) | gap-3 (12) ★ canonical |
| Card (compact) | p-4 (16) | gap-2 (8) |
| Dialog body | px-6 + py-2 | gap-4 (16) at section level |
| Sheet body | px-5 + pt-5 + pb-4 (header), p-5 (body) | gap-1.5 (6) for title↔description |
| Banner | px-5 + py-3 (height 48 fixed) | gap-3 (12) for icon↔content |
| Sidebar | p-2 (8) | gap-1 (4) between items |
| PrimaryRail | py-3 (12), px-2 inside | gap-3 (12) between zones, gap-1 between items |

### Radius

| Token | Px | Use |
|---|---|---|
| `radius-none` | 0 | Hard edges |
| `radius-sm` | 4 | Chips, badge dots, checkboxes |
| `radius-md` ★ | 6 | **DEFAULT** — buttons, inputs, list items |
| `radius-lg` | 8 | Menus, popovers, tooltips, inner cards |
| `radius-xl` | 12 | Ceiling — cards, modals, sheets |
| `radius-full` | 9999 | Avatars, switches, pills, primary buttons |

### Control sizes (density-flippable)

The single dimension density flips. Components consume these as `h-ctrl-sm`, `w-ctrl-md`, `px-pad-md`, `h-row` utilities — never as hardcoded heights.

| Density | sm | md (★ default) | lg | Row (table) |
|---|---|---|---|---|
| Comfortable | 32 / px 12 | 40 / px 16 | 48 / px 20 | 56 |
| Compact | 28 / px 10 | 32 / px 12 | 40 / px 16 | 40 |

### Z-index ladder

Locked tiers in `tokens.css §3` — components must use the named utilities (`z-modal`, `z-popover`), never raw values:

```
base       0       Default flow
raised     1       Hovered table row, focused card
sticky    10       Sticky table header
nav       20       PrimaryRail, Sidebar
banner    35       Workspace banner (content-level, not viewport-fixed)
bubble    60       HelpBubble (corner FAB)
popover  100       Tooltip, Popover, DropdownMenu, Select, Combobox content
tooltip  200       (Tooltip's tier — above popover, below modals)
modal-bd 1200      Dialog/Sheet overlay backdrop
modal    1300      Dialog/Sheet content
toast    1600      Sonner toaster
call-bar 1700      Active call surface (always-on-top product chrome)
```

### Elevation (borders-first philosophy)

Borders carry hierarchy; shadows are reserved for **floating** surfaces only.

| Token | Composition | Use |
|---|---|---|
| `elev-1` | 1px border only | Cards, inputs, sunken surfaces |
| `elev-2` | 1px border + soft 4/8 shadow | Popovers, dropdowns, floating panels |
| `elev-3` | 1px border + deeper 16/32 shadow | Dialogs, sheets, toasts |
| `elev-ai` | AI border + indigo-tinted glow | AI-flavored elevation |
| `shadow-control` | 1px y-offset shadow | Subtle control depth (buttons, inputs) |

Components NEVER apply shadow to a Card (that's elev-1 territory only).

### Motion

| Duration | Value | Use |
|---|---|---|
| `duration-fast` | 120ms | Hover swaps, color transitions, exit motion |
| `duration-base` ★ | 200ms | **Default** — most enter motion |
| `duration-slow` | 280ms | Larger movements (sheet slide-in) |

| Easing | Curve | Use |
|---|---|---|
| `ease-out` | (0.16, 1, 0.3, 1) | Enter motion |
| `ease-in` | (0.4, 0, 1, 1) | Exit motion |
| `ease-standard` | (0.4, 0, 0.2, 1) | Most transitions (color, transform) |
| `ease-emphasized` | (0.34, 1.56, 0.64, 1) | **AI opt-in only** — bouncy |

Composed shorthands (consumed via CSS, not Tailwind): `--transition-fast`, `--transition-base`, `--transition-slow`, `--transition-enter`, `--transition-exit`.

### Adding a token — TWO-PLACE CHANGE

1. Add to `packages/tokens/src/tokens.css` (§2 primitive + §3 semantic pair).
2. Add to the safelist arrays in `packages/ui/src/lib/cn.ts` — anything that generates a Tailwind utility belongs in `colorTokens` / `fontSizeTokens` / `radiusTokens` / `shadowTokens`.

If you skip step 2, `tailwind-merge` won't know the class is a token utility and may silently drop it during conflict resolution. **This was the cause of the `text-heading-lg` bug discovered in the November audit.**

---

## Tailwind v4 setup

- **No `tailwind.config.{js,ts}` file.** Tailwind v4 is CSS-first; all configuration lives in `tokens.css`.
- `@import "tailwindcss"` is at the top of `tokens.css`. Consumer CSS entries import tokens.css and get Tailwind for free.
- `@source` directives at the top of `tokens.css` declare scan paths. They are relative to `tokens.css` so workspace topology is self-describing.
- `@theme inline { … }` blocks generate Tailwind utilities from CSS variables. The `inline` modifier is critical — it keeps the utility values as `var(--color-x)` so `[data-density="compact"]` re-defining the underlying primitive cascades without a Tailwind rebuild.
- Animations registered via `@theme inline` (`--animate-accordion-down`) get `animate-{name}` utilities.
- `tw-animate-css` provides `animate-in / animate-out / fade-* / zoom-* / slide-in-from-*` utilities used by Radix overlay enter/exit transitions on `data-[state=…]`.

Bundling: Vite consumers use the `@tailwindcss/vite` plugin. Storybook uses the same plugin via its Vite builder. Neither workspace declares its own Tailwind config.

---

## `cn()` and tailwind-merge safelist

`packages/ui/src/lib/cn.ts` exports the canonical `cn()` function that every primitive uses to compose class strings. It extends `tailwind-merge` with our custom token safelists so the merge function recognizes our utilities and resolves conflicts correctly.

**Hard rule:** never reach for `clsx` directly. Always use `cn()`. Direct `clsx` skips the tailwind-merge safelist and consumer overrides will silently fail to resolve in specific edge cases (arbitrary values, breakpoint variants).

The safelist has four token arrays:

| Array | What it indexes |
|---|---|
| `fontSizeTokens` | `label-xs`, `label-sm`, `label-md`, `body-xs`, `body-sm`, `body-md`, `heading-sm`, `heading-md`, `heading-lg`, `heading-xl`, `display` |
| `colorTokens` | Every semantic color: surfaces, foregrounds, borders, accent, intents, AI aliases, channels, WhatsApp chrome, state overlays, links |
| `radiusTokens` | `none`, `sm`, `md`, `lg`, `xl`, `full` |
| `shadowTokens` | `elev-1`, `elev-2`, `elev-3`, `elev-ai`, `control` |

These feed into `extendTailwindMerge` via `classGroups` covering: `text-{token}` (color + font-size), `bg-{token}`, `border-{token}`, `border-{x,y,s,e,t,b}-{token}`, `rounded(-s/e/t/b)-{token}`, `shadow-{token}`, `ring-{token}`, `outline-{token}`.

---

## Primitive tier system

Primitives fall into five tiers. The tier affects sourcing strategy, future maintenance, and what's allowed to vary.

| Tier | Description | Primitives |
|---|---|---|
| 1 | **Radix-shaped** — derived from Shadcn, retokenized. Keep diff minimal to ease future Shadcn syncs. | Dialog, Sheet, Popover, Select, DropdownMenu, Tabs, Accordion, Switch, Checkbox, RadioGroup, Tooltip, ScrollArea, Avatar, Toggle, ToggleGroup |
| 2 | **Form** — Shadcn leaves with our `FormField` composition on top | Input, Textarea, Label, FormField, Combobox |
| 3 | **Identity-bearing** — authored from scratch on Radix base because variant taxonomy is brand-specific (intent palette, size scale) | Button, Badge, Card, Banner, Alert |
| 4 | **Workspace chrome** — entirely custom, no Shadcn analogue. Encodes product DNA. | AppShell, ShellPanel, PrimaryRail, PrimaryRailItem, Sidebar, SidebarItem, ModuleHeader, HelpBubble, EmptyState |
| 5 | **Composed on libs** — built on a curated underlying library | DataTable (TanStack v8), MultiSelect (cmdk + Popover), DatePicker (react-day-picker), Carousel (Embla), CommandPalette (cmdk), Toast (Sonner), PhoneInput (libphonenumber-js), TimePicker (custom), NumberInput, FileInput, PinInput, InlineEdit, CopyButton, SearchInput, FieldGroup, Pagination, Progress, Spinner, Skeleton, ChannelIcon, Separator, Kbd |

**Tier-1 rule:** don't author from scratch. The a11y/keyboard wiring is non-trivial and falls behind Shadcn updates fast.

**Decision rule:** "Start from Shadcn whenever the delta between Shadcn-retokenized and what we need is under ~20%. Author from scratch when the delta exceeds ~50%. The fuzzy middle (20–50%) is decided by a11y risk."

---

## Anatomy of a primitive

A typical primitive folder under `packages/ui/src/<name>/` has:

```
<name>.tsx           # the component(s)
<name>.variants.ts   # CVA variants + exported VariantProps type (if variants exist)
index.ts             # public re-exports
```

11 primitives have a `.variants.ts` file. Variant patterns:

- **`cva()` first argument** = base class string applied to every variant.
- **`variants` object** = enum of styles per axis (variant, size, intent).
- **`defaultVariants`** declares fallbacks; props are optional in the public API.
- **`compoundVariants`** for intersection rules.
- **Exported `<Name>VariantProps` type** consumed by the component's prop interface via `interface XProps extends … VariantProps {}`.

Components use **React 19 ref-as-prop**, not `React.forwardRef`. Pattern:

```tsx
export interface ButtonProps extends … {
  ref?: React.Ref<HTMLButtonElement>;
}
export function Button({ ref, … }: ButtonProps) {
  return <button ref={ref} {…} />;
}
```

No `displayName`, no `React.forwardRef`. Lean.

---

## Locked component contracts

Several primitives have **locked anatomy** documented in their JSDoc + MDX. Locked means: width/height/padding/intent vocabulary cannot be overridden by consumers. The DS encodes them in the primitive.

| Primitive | What's locked |
|---|---|
| `Button` | sm/md/lg sizes (32/40/48 px heights); 4 variants (primary/secondary/ghost/destructive); primary + destructive use `rounded-full`, secondary + ghost use `rounded-md` |
| `Badge` | sm/md heights (20/24 px); 7 variants (info/success/warning/destructive/accent/neutral/outline); accent + intent variants use `*-bg-subtle` tints, NOT solid fills |
| `Banner` | 48 px height; content-level placement (NOT viewport-fixed); sits above the body row, NOT spanning L1; 5 intents (info/success/warning/destructive/accent); icon + intent color, NOT bg |
| `Card` | `rounded-xl`, border-only resting elevation (elev-1); padding default p-5 / gap-3, compact p-4 / gap-2, or none; never gets a shadow |
| `Sheet` | Sides start/end/bottom (no top); start/end max-w-md and full height; bottom max-h-80vh and full width |
| `Dialog` | sm 480 / md 640 (default) / lg 800 widths; centered via translate, mirrored under RTL |
| `Tooltip` | 500ms open / 100ms close; max-width 240 px |
| `PrimaryRail` | 196 px expanded / 56 px collapsed; chromeless (canvas inherit, no border, no shadow); single instance per AppShell |
| `Sidebar` | 230 px wide; rounded-xl white island, 1px border-default; padding p-2; item height 32 px |
| `ShellPanel` | 200 (folders) / 280 (list) / 320 (details) widths — only objectDetail variant |
| `AppShell` | Two variants only: `standard` (L1+L2+Main) and `objectDetail` (L1+Folders+List+Main+Details); 4 px gutter between every panel; Banner sits above the body row, NOT spanning L1 |

### Active-state pattern (3-signal rule)

Per `States.md §nav-item`, every active nav item signals selection THREE ways:

1. `bg-accent-bg-subtle` (background)
2. 2px start-edge bar in `bg-accent-fill` (via positioned `<span>`)
3. `text-accent-text` (label color)

This is intentional WCAG 1.4.1 compliance — color alone is never the only signal. PrimaryRailItem and SidebarItem both implement this.

### Focus ring

A single canonical `:focus-visible` ring is defined in `tokens.css §7` via `:where(button, a, [role=...]) { outline: var(--focus-ring); … }`. **Components never re-roll the focus ring.** Outlined form controls (Input, Textarea, SelectTrigger) intentionally exclude themselves — they tint their 1px border to `border-focus` instead (avoids "double border").

---

## AppShell and navigation chrome

### Two variants only

```
standard (3-zone):     [L1] [L2] [Main]                       ← Knowledge / Reports / Contacts / Settings / etc.
objectDetail (5-zone): [L1] [Folders] [List] [Main] [Details]  ← Inbox only
```

**Don't invent a 4-zone variant.** The DS bans it.

### Banner placement

Banner sits **above the body row, NOT spanning L1**. The rail stays visible regardless of banner state. AppShell wires this; consumers pass `banner={<Banner …/>}` as a prop, not as a child.

### PrimaryRail behavior

L1 rail (`packages/ui/src/app-shell/primary-rail.tsx`) has three states:

| State | Layout | Width |
|---|---|---|
| Collapsed | In flow | 56 px |
| Hover-expanded | **Overlay** (floats over content) | 196 px |
| Pinned | In flow | 196 px |

- Hover-expand never shifts the workspace — the panel stays `position: absolute` whenever the rail manages its own state AND isn't pinned. Pin click toggles in-flow vs floating; workspace shifts only when pinned.
- The pin button lives in the top header next to the logo (`justify-between` layout when expanded).
- Items render inside a fixed 40×40 icon container so the icon position is identical across collapsed/expanded states — no horizontal jitter during width animation.
- `<PrimaryRail>` exposes its state via `PrimaryRailContext`. `PrimaryRailItem` reads `collapsed` from context automatically. Footer-slot consumers (language switchers, avatar buttons) call `usePrimaryRail()` to read it manually.
- `badge` prop on `PrimaryRailItem` shows as a corner overlay when collapsed and an inline accent Badge when expanded — used for notification counts that must survive the collapsed state. The generic `trailing` prop hides when collapsed.
- Legacy controlled mode (`collapsed` prop passed) disables hover/pin behavior entirely; consumer owns the state.

### Sidebar (L2)

230 px wide white island, rounded-xl border, p-2 padding. Item height 32 px (`h-ctrl-sm`). `text-body-md` (14 px) on labels — matches PrimaryRailItem for L1↔L2 visual rhythm.

---

## Modal-portaled content

**Known issue:** Radix Dialog/Sheet `modal={true}` (the default) wraps content in a focus-trap. Anything portaled to `<body>` from inside the modal — Select, Popover, DropdownMenu content — gets its trigger's pointer events intercepted by the focus-trap. The dropdown trigger appears to do nothing on click. ([primitives#3344](https://github.com/radix-ui/primitives/issues/3344))

**Fix:** the DS-extended `SelectContent` and `PopoverContent` accept a `container` prop that's forwarded to the underlying Radix Portal. Pass the dialog/sheet's content `ref` to it so the dropdown portals INSIDE the modal, not outside it.

```tsx
// 1. In your Dialog/Sheet content component, capture the content element via a
//    callback ref + React.useState, then provide it through a React Context so
//    descendants can read it without prop drilling:
const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null);

<DialogContent ref={setContentEl}>
  <PortalContainerProvider value={contentEl}>
    {/* contents — nested Selects can call usePortalContainer() */}
  </PortalContainerProvider>
</DialogContent>

// 2. In nested Select/Popover:
const container = usePortalContainer();
<SelectContent container={container}>…</SelectContent>
```

The pattern is small enough that consumers typically own their own `PortalContainerProvider` + `usePortalContainer()` Context — a single file is enough. The DS exposes only the `container` prop on the primitive.

**Don't use `modal={false}` as a workaround** — it makes clicks pass through to underlying content. Tested and rejected.

---

## Forms

### FormField anatomy (4 slots)

`FormField` in `packages/ui/src/form-field/form-field.tsx` is the canonical form-control wrapper. Every form control goes inside one. Slots:

1. **Label** (top-aligned, `text-label-sm`, optional `*` for required)
2. **Control** (Input / Textarea / Select / Combobox / etc. — exactly one child)
3a. **Helper text** (`text-body-xs text-fg-muted`) — replaced by error when present
3b. **Error message** (`text-body-xs text-danger-text`)

It auto-wires accessibility:
- `htmlFor` ↔ child `id` (auto via `React.useId` if not provided)
- `aria-describedby` → helper-or-error message id
- `aria-invalid="true"` when `error` is present
- `aria-required="true"` when `required` is set

**Important:** `FormField` uses `React.Children.only(children)` + `React.cloneElement(child, {id, aria-*})`. This works perfectly for DOM-element controls (Input, Textarea) but adds `id`/`aria-*` props to Radix context-provider roots (Select.Root) where they're silently ignored — that's fine. Just don't expect them to land on the trigger.

### Required vs optional marking

Pick ONE convention per form. `FormField` accepts either `required` (renders `*`) or `optional` (renders `(optional)`). Mixing is forbidden by `Forms.md §required-vs-optional`.

---

## Feedback surfaces

Choose by message lifetime and blocking-ness:

| Surface | When to use | Where it renders |
|---|---|---|
| **Toast** | Ephemeral action feedback (saved, copied, sent). 3.5s auto-dismiss. | Top-end corner (auto-mirrors RTL). `<Toaster />` singleton at app root. |
| **Banner** | System-wide condition that must remain visible until resolved or dismissed (trial expiring, maintenance, plan-cap). | Above the body row inside AppShell. `AppShell.banner` prop. Features never render their own. |
| **Alert** | Inline content callout within a body of text. | Inline, where written. Not a chrome surface. |
| **Dialog** | Blocking decision requiring user input. | Centered modal. |
| **ConfirmDialog** | Yes/no destructive confirmation. | Same as Dialog. **Conditionally mount** (`{pending ? <ConfirmDialog … /> : null}`) — never always-mounted with `open={false}`. The always-mounted pattern has caused freezes in past work. |
| **HelpBubble** | Bottom-end FAB for help/chat. | Fixed viewport corner. `AppShell.helpBubble` prop. |

### Toaster locked defaults

Per `Toast.md`:
- Position: top-end (auto-mirrors RTL — top-right LTR / top-left RTL via `useDocumentDir` MutationObserver)
- Max stack: 3 (older auto-dismiss; 4th pushes oldest out)
- Viewport offset: 16 px
- Gap between toasts: 8 px
- Close button: always visible
- Uniform surface: `bg-surface` + 1 px border + `elev-3`
- Intent signal: icon + icon color (NOT background) per anatomy

Mount once near the consumer's app root. Sonner under the hood. Storybook's global decorator already mounts one.

---

## Icons

All icons go through `<Icon icon={LucideIcon} size={N} />` from `packages/ui/src/lib/icon.tsx`:

- Locks `strokeWidth` to 1.5 (DS canon — Foundation §6).
- Restricts `size` to the 12 / 14 / 16 / 20 / 24 px scale.
- Adds `flipOnRtl` prop for directional icons (chevrons, arrows, send, reply, indent/outdent).
- Accessibility: pass `aria-label` when the icon is the only label (icon-only Button); pass `aria-hidden="true"` when a sibling text label is present so screen readers don't double-announce.

**ESLint forbids importing `lucide-react` directly outside `@azeer/ui`** — components reach for `<Icon icon={X} />`. Enforced via `no-restricted-imports`.

---

## RTL canon

RTL is a **release gate**, not optional polish.

### Rules

1. **Logical Tailwind utilities only** — `ms-*` / `me-*` / `start-*` / `end-*` / `border-s` / `border-e` / `rounded-s` / `rounded-e` / `ps-*` / `pe-*`. **Never** `ml-*` / `mr-*` / `left-*` / `right-*`.
2. **Directional icons take `flipOnRtl`** — chevrons, arrows, send, reply, panel-open/close, indent/outdent. Other icons (settings cog, eye, home) do NOT flip.
3. **Inline LTR content inside RTL prose** — phone numbers, emails, IDs, code, URLs, hex, kbd, ISO timestamps, flow IDs — wrap in `<span dir="ltr">` or `.bidi-isolate` class.
4. **The Toaster watches `<html dir>`** via MutationObserver and repositions; consumers don't coordinate.
5. **Radix primitives inherit `dir` from the document** — no Radix `<DirectionProvider>` needed.
6. **Test by toggling `<html dir="rtl">`** — the entire surface should mirror.

---

## Density

`[data-density="compact"]` on `<html>` (or any ancestor) flips the control-height primitives. Components themselves NEVER branch on density. They consume `h-ctrl-sm` / `px-pad-md` / `h-row` utilities that resolve via `var()` chains to whichever density's primitives are currently active.

Adding density support to a component:
- Use `h-ctrl-{sm,md,lg}` for control height (not raw `h-8` / `h-10` / `h-12`).
- Use `px-pad-{sm,md,lg}` for control inline padding (not raw `px-3` / `px-4` / `px-5`).
- Use `h-row` for table row height.

The density flip happens with zero JS and zero rebuild.

---

## Storybook structure

`apps/storybook/stories/` has two top-level groups:

### Foundation (`stories/foundation/*.mdx`)

Tier docs — typography, color, motion, spacing, etc. — that ALL primitives reference. These ARE the spec; primitive comments cite them.

```
01-Introduction
02-Colors           — full intent palette + AAA/AA contrast notes
03-Typography       — text-* tokens with metrics and use cases
04-Spacing          — 4px base + per-surface defaults
05-Radius           — locked scale + use cases
06-Motion           — durations + easings + reduced-motion behavior
07-Elevation        — borders-first philosophy + 4-tier scale
08-ZIndex           — full ladder with use per tier
09-ControlSizes     — sm/md/lg + density compact
10-Theming          — current axes + dark-mode scaffold
12-RTL              — canon + bidi-isolate + flipOnRtl rules
```

`_specimens.tsx` provides shared rendering helpers for the foundation MDX pages.

### Primitives (`stories/primitives/<Name>.{stories.tsx,mdx}`)

Every primitive has a stories file + an MDX doc. The MDX is the canonical "how to use" reference; stories are the live demos.

Each MDX page typically contains:
- `<Primary />` live demo
- `<Controls />` for the args table
- `<Stories includePrimary={false} />` for all variants
- Locked-anatomy table
- API table (props + types + defaults + notes)
- Tokens-used table
- A11y notes
- RTL behavior
- Forbidden list

When adding a primitive: write both files. The MDX is not optional.

---

## Peer-dependency strategy

`@azeer/ui` externalizes shared deps via `peerDependencies`. Consuming apps MUST declare these in their own `dependencies`:

| Peer | Range in ui | Why |
|---|---|---|
| `react` / `react-dom` | `^19.0.0` (wider than dev pin `^19.2.6`) | React's API is exceptionally stable within a major. Honest compat claim. |
| `date-fns` | `^4.1.0` (matches dev pin) | Utility lib. v4 reshaped APIs; minor drift can break. Conservative pin. |
| `libphonenumber-js` | `^1.13.2` (matches dev pin) | Heavy utility. Patch releases have shifted behavior. Conservative pin. |

Same range in peer and dev for utility libs. Wider peer than dev for framework-stable libs (React).

pnpm + lockfile guarantee single-version resolution → single bundle copy.

---

## Tooling notes

### Vite 8 (consumer builders)

- Vite 8 swapped its dep scanner to **rolldown**, which has a stricter tsconfig resolver than TypeScript. `tsconfig.json` `extends` MUST use **relative paths**, not workspace package names. Every tsconfig in the repo follows this.
- If you see `[TSCONFIG_ERROR] Tsconfig not found` from a Vite consumer, the `extends` path is the problem.

### Tsconfig structure

```
packages/config-tsconfig/base.json           — strict + ESM
packages/config-tsconfig/react-library.json  — extends base + jsx
packages/config-tsconfig/react-app.json      — extends base + jsx + lib + vite/client types
```

Workspaces extend these via **relative paths**:

```jsonc
// packages/ui/tsconfig.json
{ "extends": "../config-tsconfig/react-library.json" }

// apps/storybook/tsconfig.json
{ "extends": "../../packages/config-tsconfig/react-app.json" }
```

### ESLint 9

Flat config (`eslint.config.js`). Currently pinned to `eslint@^9.39.4` (latest 9) because two plugins haven't shipped eslint-10-compatible releases yet: `eslint-plugin-jsx-a11y` (caps at eslint 9) and `eslint-plugin-react` (caps at eslint 9.7). When those plugins ship eslint-10 support, `pnpm update -r --latest` will pick up eslint 10 cleanly. Check with:
```bash
npm view eslint-plugin-jsx-a11y peerDependencies.eslint
npm view eslint-plugin-react   peerDependencies.eslint
```

Custom rules in `packages/config-eslint/`:
- `no-restricted-imports` blocks `lucide-react` outside `@azeer/ui` — use `<Icon icon={…} />`.

---

## Non-obvious conventions

- **No hardcoded colors or font sizes** anywhere in `packages/ui` or `apps/storybook`. Verified by:
  ```bash
  grep -rE "(#[0-9a-fA-F]{3,8}\b|bg-\[#|text-\[#|border-\[#|text-\[[0-9]|\btext-white\b|\bbg-white\b|font-\[[0-9])" packages/ui/src apps/storybook/stories --include='*.tsx' --include='*.ts'
  ```
  Should return zero. UI-shape arbitrary values like `w-[280px]` are acceptable in primitives that encode physical geometry (a phone-frame width, a popover max-width), not semantic design.

- **Conditionally mount `ConfirmDialog`** (`{pending ? <ConfirmDialog open … /> : null}`) instead of always mounting with `open={false}` — the latter caused freezes in past work.

- **Don't reset `rowSelection` in a useEffect on every keystroke** in TanStack tables — caused freeze regressions. Reset only on explicit user actions.

- **Button sizes are visually distinct (32/40/48 px height) but share `text-label-md` (14 px)** — type is unified across sizes; only height/padding distinguishes them.

- **Sidebar items use `text-body-md`** (14 px) — matches PrimaryRailItem for visual rhythm between L1 and L2.

- **Phone numbers, IDs, code, hex, ISO timestamps inside RTL prose** — always wrap in `dir="ltr"` or `.bidi-isolate`.

- **`@source` paths inside `tokens.css`** are relative to that file — workspace topology is self-describing. Consumers don't need their own `@source` directives unless they have source outside the standard `apps/*/src` / `apps/*/stories` / `apps/*/.storybook` globs.

- **Provenance comment on tier-1 primitives** — Shadcn-derived primitives (Dialog, Sheet, Popover, etc.) should carry a comment like `// derived from shadcn-ui — keep diff minimal to ease future syncs`. Greppable, audit-friendly. (Not yet uniformly applied; add when you touch a tier-1 file.)

---

## Production constraints

These will break silently if ignored. They are not "best practices"; they are **load-bearing rules** for this codebase.

1. **Token additions require BOTH `tokens.css` AND `cn.ts`.** Single-place changes pass typecheck but silently break `tailwind-merge` conflict resolution at runtime. The `text-heading-lg` bug discovered in the November audit was exactly this.

2. **Tier-1 primitives** (Radix-shaped) should not be authored from scratch without an explicit decision record. The a11y/keyboard wiring is non-trivial and gets stale fast.

3. **`@radix-ui/*` versions must stay aligned across the workspace.** If a transitive dep pins an older `@radix-ui/react-X`, add a `pnpm.overrides` entry in root `package.json` to force a single version — otherwise the bundle ships two copies.

4. **Don't bypass `cn()`** when composing classes. Direct `clsx` skips the tailwind-merge safelist and consumer overrides can silently fail.

5. **Don't use `modal={false}` on Dialog/Sheet** as a workaround for Select-not-opening. Use the `container` prop pattern. Tested and rejected — `modal={false}` makes clicks pass through to underlying content.

6. **Don't render `Toaster` more than once per app tree.** Sonner doesn't support multiple toasters cleanly. Mount once at app root.

7. **Don't override the focus ring.** It's defined globally in `tokens.css §7`. Outlined controls intentionally exclude themselves; everything else uses the canonical ring. Re-rolling it inside a component silently breaks WCAG 2.4.7 compliance.

8. **Don't apply shadow to a Card.** Cards are elev-1 territory (borders-first). Floating surfaces (popovers, dialogs) are the only ones that get a shadow.

9. **Don't invent a 4-zone AppShell variant.** Only `standard` (3-zone) and `objectDetail` (5-zone) exist. The DS bans intermediates.

10. **Workspace tsconfig `extends` MUST use relative paths.** Vite 8's rolldown scanner can't resolve workspace-package extends.
