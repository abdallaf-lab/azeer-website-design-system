# Azeer Design System 4.0

The Azeer workspace's design system — tokens, primitives, Storybook docs, and a production-grade playground that exercises every primitive in real screens. Built on **Tailwind v4 + Radix + Shadcn**, wired through a strict CSS-variable token layer, and shipped as a `pnpm` + Turborepo monorepo.

---

## What's in the repo

```
.
├── apps/
│   ├── playground/        # Reference screens (Contacts · WhatsApp Flow) built only from DS primitives
│   └── storybook/         # Component documentation + foundation specs (typography, color, motion, RTL)
└── packages/
    ├── tokens/            # @azeer/tokens — CSS-variable + @theme inline token layer
    ├── ui/                # @azeer/ui — every primitive + tailwind-merge safelist
    ├── config-eslint/     # Shared ESLint configs
    └── config-tsconfig/   # Shared tsconfigs (base / react-app / react-library)
```

### Packages

| Package | Description |
|---|---|
| `@azeer/tokens` | Token CSS — color (semantic + raw palettes + brand-WhatsApp chrome), typography (`text-label-xs` → `text-display`), spacing, radius, elevation, motion, z-index. Tailwind v4 reads them via `@theme inline`. |
| `@azeer/ui` | All component primitives: `AppShell`, `PrimaryRail` (hover-overlay + pin), `Sidebar`, `DataTable`, `Dialog` / `Sheet` / `Popover` / `Select` (with `container` override for safe modal nesting), `Combobox`, `Banner`, `Card`, `Badge`, `Button`, `FormField`, `Input` / `Textarea`, `Switch` / `Checkbox` / `Radio`, `DatePicker` / `TimePicker`, `ConfirmDialog`, `Toaster`, `Tooltip`, `EmptyState`, `Pagination`, `Toggle` / `ToggleGroup`, plus `lib/cn` (custom tailwind-merge safelist for token classes). |

### Apps

| App | Description |
|---|---|
| `@azeer/storybook` | Stories + MDX docs for every primitive and the foundation tier. The source of truth for visual contracts. |
| `@azeer/playground` | Two production-grade screens built exclusively from DS primitives — **Contacts** (`SCR-CT-001`: list / segments / import / add-contact sheet) and **WhatsApp Flow** (`SCR-WAF-001` list + plan-cap UX, `SCR-WAF-003` builder modal with 14 block types + live WhatsApp-style preview). EN + AR locales with date-fns `arSA` and bidi-isolated IDs. |

---

## Prerequisites

- **Node** `>= 20.11.0`
- **pnpm** `>= 9.0.0` (the repo pins `pnpm@9.15.4` via `packageManager`)

```bash
# If you don't have pnpm yet
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

## Install

From the repo root:

```bash
pnpm install
```

This installs every workspace dependency in one pass.

---

## Run the apps

Both apps are driven through Turborepo, so you can run them from the repo root.

### Playground (`apps/playground`)

```bash
pnpm playground
```

Equivalent to `turbo run dev --filter=@azeer/playground`. Vite dev server starts on **http://localhost:5173** (or the next free port).

What you'll see:
- **Contacts** screen by default — list view with quick filters, segments, import flow, RTL toggle in the rail footer.
- Click the **Ecommerce-Apps** rail item to switch to the **WhatsApp Flow** screen, which exercises the full SCR-WAF-001 brief: 8 lifecycle states (DRAFT / IN_REVIEW / APPROVED / PUBLISHED / REJECTED / THROTTLED / BLOCKED / ARCHIVED), plan-cap UX, builder modal (SCR-WAF-003) with all 14 content-block types and a live WhatsApp-styled preview.

### Storybook (`apps/storybook`)

```bash
pnpm storybook
```

Equivalent to `turbo run storybook --filter=@azeer/storybook`. Starts on **http://localhost:6006**.

The sidebar is grouped into:
- **Foundation** — Introduction, Colors, Typography, Spacing, Radius, Motion, Elevation, Z-Index, Control Sizes, Theming, RTL.
- **Primitives** — every component in `@azeer/ui`, each with stories + an MDX doc page.

---

## Other workspace scripts

All run from the repo root, all driven through Turborepo:

| Command | What it does |
|---|---|
| `pnpm build` | Production build for every package + app. |
| `pnpm typecheck` | `tsc --noEmit` across every workspace in parallel. |
| `pnpm lint` | ESLint across every workspace. |
| `pnpm format` | Prettier write across the whole repo (respects `.gitignore`). |
| `pnpm format:check` | Prettier check only (CI-friendly). |
| `pnpm clean` | Removes `node_modules` and per-app build outputs. |

### Running one workspace

Anything you'd run at the root, you can scope to one workspace with `pnpm --filter`:

```bash
pnpm --filter @azeer/playground typecheck
pnpm --filter @azeer/ui lint
pnpm --filter @azeer/storybook build
```

---

## Architecture conventions

A few non-obvious patterns that aren't visible from the file tree alone:

- **Tokens are CSS variables first.** `packages/tokens/src/tokens.css` defines the raw palette, then maps it into the semantic `@theme inline { … }` block that Tailwind v4 consumes. New tokens require a **two-place** change: tokens.css + the safelist in `packages/ui/src/lib/cn.ts` (so `tailwind-merge` resolves conflicts correctly).
- **No hardcoded colors or font sizes** in playground / storybook code — everything flows through tokens (`text-body-md`, `bg-surface`, `text-fg-default`, `bg-whatsapp-chrome-fill`, etc.).
- **RTL is a release gate.** Logical Tailwind utilities (`ms-*` / `me-*` / `start-*` / `end-*`) are used throughout; directional icons take `flipOnRtl`; IDs and code use `dir="ltr"` to stay LTR inside RTL prose.
- **Select / Popover inside Dialog or Sheet** uses the `container` prop on the content (`<SelectContent container={contentRef.current}>`) to portal *inside* the modal rather than into `<body>`. Avoids Radix's focus-trap intercepting the trigger pointer event ([primitives#3344](https://github.com/radix-ui/primitives/issues/3344)). See `apps/playground/src/whatsapp-flow/builder/PortalContext.tsx`.
- **AppShell L1 (PrimaryRail)** auto-collapses to 56 px and expands as a **floating overlay** on hover (196 px), with a pin button next to the brand logo. Pin click moves the rail into layout flow (workspace shifts right). The behavior is uncontrolled by default; pass `collapsed` to override.

---

## Troubleshooting

- **`Cannot find module 'lucide-react'`** during a Storybook typecheck: pre-existing across several stories — does not block dev or build. Production typecheck is clean for `@azeer/playground` and `@azeer/tokens`.
- **Select dropdown doesn't open inside a Dialog/Sheet:** make sure you're passing `container={contentRef.current}` on the `<SelectContent>` (and on `<PopoverContent>` for popovers). See the architecture note above.
- **Port 5173 / 6006 in use:** Vite + Storybook each fall through to the next free port; check the terminal for the actual URL.
