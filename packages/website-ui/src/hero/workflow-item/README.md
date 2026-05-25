# WorkflowItem

The floating workflow card component for hero visualizations. Chains with [ConnectorArrow](../../motion/connector-arrow) to create workflow diagrams. Composed from [MotionPreset](../../motion/motion-preset) (entrance) and optional [BorderBeam](../../motion/border-beam) (premium frame).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'input' \| 'action' \| 'output' \| 'pending'` | — | Step kind — drives the tinted tab + icon (required). |
| `title` | `string` | — | Card heading (required). |
| `description` | `string` | — | Supporting line under the title. |
| `icon` | `ReactNode` | — | Leading icon (a Lucide element). |
| `time` | `string` | — | Time/status label (kebab → bottom badge; no-menu → inline). |
| `hasMenu` | `boolean` | `true` | Show the kebab dropdown. |
| `menuItems` | `string[]` | `['Share','Update','Refresh']` | Kebab items. |
| `aiAssisted` | `boolean` | `false` | Show a token-only "AI" badge (Sparkles + accent) in the footer. |
| `children` | `ReactNode` | — | Extra content between body and bottom row. |
| `delay` | `number` | `0` | Entrance animation delay (s). |
| `showBeam` | `boolean` | `false` | Frame the card with an animated BorderBeam. |
| `className` | `string` | — | Positioning classes from the parent. |
| `id` | `string` | — | Anchor id (applied to the card body). |
| `inView` | `boolean` | `true` | MotionPreset trigger mode. |

## Type → color (Azeer intent tokens)

| Type | Tab tokens | Icon |
|---|---|---|
| `input` | `bg-bg-info` / `text-content-info` | PencilLine |
| `action` | `bg-bg-attention` / `text-content-attention` | CirclePlay |
| `output` | `bg-bg-success` / `text-content-success` | CircleCheck |
| `pending` | `bg-bg-error` / `text-content-error` | TriangleAlert |

## Usage

### Standalone

```tsx
<WorkflowItem type="input" icon={<ShoppingCart />} title="Cart abandoned" time="0.0 sec" />
```

### Three cards chained with ConnectorArrow (the common pattern)

```tsx
<div className="flex items-center gap-4">
  <WorkflowItem type="input" … />
  <ConnectorArrow direction="right" delay={0.3} />
  <WorkflowItem type="action" aiAssisted … />
  <ConnectorArrow direction="right" delay={0.7} />
  <WorkflowItem type="output" … />
</div>
```

### AI-assisted action (token-only AI badge)

```tsx
<WorkflowItem
  type="action"
  title="WhatsApp reminder sent"
  description="Personalized message with a 10% off code."
  time="12 sec"
  aiAssisted
/>
```

### Premium feel (BorderBeam)

```tsx
<WorkflowItem type="action" title="WhatsApp reminder sent" showBeam />
```

### Custom inner content

```tsx
<WorkflowItem type="action" title="Lead scored">
  <div className="rounded-lg bg-bg-muted p-3">…</div>
</WorkflowItem>
```

## Notes

- **Entrance:** the card is wrapped in `MotionPreset fade` (`delay`, `inView` pass through). Under `prefers-reduced-motion`, MotionPreset renders the card immediately.
- **Path C overrides (website-only):** the card uses an elevation shadow (`shadow-elev-2`, floating) and each type carries its own accent color — multiple accents on one surface is intentional here.
- **Colors:** type tabs use the Azeer marketing **intent** tokens (info/attention/success/error), not raw `sky/amber/green` palette colors (which don't exist in `@azeer/tokens`). These intent tints are currently fixed (not dark-adaptive) — a dark-adaptive variant is deferred to Stage 2B.
- **AI badge:** `aiAssisted` renders `Badge variant="accent"` + a Sparkles icon — the canonical Azeer "AI" look (token-only, brand-safe; replaces Orion's hardcoded GPT-4 image badge).
- **RTL:** logical properties throughout; the type tab anchors to the start corner.

## Reference

Adapted from Orion's `src/components/blocks/hero-section/workflow-item.tsx` (composed in `lead-qualifier.tsx`). The GPT-4 image badge from Orion's `action` variant was replaced by the token-only `aiAssisted` badge.
