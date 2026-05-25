import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * `cn` for the marketing layer — a SUPERSET of the @azeer/ui safelist.
 *
 * The marketing site introduces extra token utilities (the `mkt-*` type scale
 * and the neutral semantic `bg-*` / `content-*` / `border-*` colors) that the
 * product `@azeer/ui` `cn` doesn't know about. tailwind-merge silently drops a
 * class when it can't tell two utilities apart (the `text-heading-lg` bug) — so
 * a marketing `cn` MUST recognize both layers.
 *
 * Scope rule: this work stays in the marketing layer, so we don't edit
 * `packages/ui`. The product groups below MIRROR `@azeer/ui/src/lib/cn.ts`
 * (which doesn't export its arrays) and must be kept in sync with it; the
 * marketing additions are clearly fenced.
 */

/* ── Product font-size tokens (mirror @azeer/ui) ─────────────────────────── */
const productFontSizeTokens = [
  "label-xs",
  "label-sm",
  "label-md",
  "body-xs",
  "body-sm",
  "body-md",
  "heading-sm",
  "heading-md",
  "heading-lg",
  "heading-xl",
  "display",
];

/* ── Marketing font-size tokens (this layer) ─────────────────────────────── */
const marketingFontSizeTokens = [
  "mkt-display-xl",
  "mkt-display-lg",
  "mkt-display-md",
  "mkt-heading-lg",
  "mkt-heading-md",
  "mkt-heading-sm",
  "mkt-heading-xs",
  "mkt-body-lg",
  "mkt-body",
  "mkt-body-sm",
  "mkt-caption",
];

const fontSizeTokens = [...productFontSizeTokens, ...marketingFontSizeTokens];

/* ── Product + brand color tokens (mirror @azeer/ui) ─────────────────────── */
const productColorTokens = [
  // surface
  "canvas",
  "surface",
  "surface-sunken",
  "surface-overlay",
  "surface-inverse",
  "backdrop-overlay",
  // foreground
  "fg-default",
  "fg-muted",
  "fg-subtle",
  "fg-disabled",
  "fg-on-accent",
  "fg-on-inverse",
  "fg-on-success",
  "fg-on-danger",
  "fg-on-info",
  "fg-on-warning",
  "fg-on-canvas",
  // border
  "border-default",
  "border-strong",
  "border-focus",
  "border-accent",
  "border-divider",
  // accent
  "accent-brand",
  "accent-fill",
  "accent-fill-hover",
  "accent-fill-active",
  "accent-bg-subtle",
  "accent-border",
  "accent-text",
  // intents
  "success-fill",
  "success-fill-hover",
  "success-bg-subtle",
  "success-border",
  "success-text",
  "danger-fill",
  "danger-fill-hover",
  "danger-bg-subtle",
  "danger-border",
  "danger-text",
  "warning-fill",
  "warning-fill-hover",
  "warning-bg-subtle",
  "warning-border",
  "warning-text",
  "info-fill",
  "info-fill-hover",
  "info-bg-subtle",
  "info-border",
  "info-text",
  // AI aliases
  "ai-bg-subtle",
  "ai-border",
  "ai-text",
  "ai-icon",
  // channels
  "channel-whatsapp",
  "channel-voice",
  "channel-sms",
  "channel-email",
  "channel-instagram",
  "channel-messenger",
  "channel-telegram",
  // WhatsApp chrome
  "whatsapp-chrome-fill",
  "whatsapp-chrome-action",
  "whatsapp-chrome-canvas",
  // state overlays
  "state-hover",
  "state-active",
  "state-selected",
  "state-selected-hover",
  // link
  "text-link",
  "text-link-hover",
  "text-link-visited",
  // brand (marketing palette — brand.css)
  "brand-primary",
  "brand-secondary",
  "brand-accent",
  "brand-neutral",
  "brand-supportive",
  "brand-on-primary",
  "brand-on-secondary",
  "brand-on-accent",
];

/* ── Marketing neutral semantic color tokens (this layer — marketing.css) ── */
const marketingColorTokens = [
  // bg-* (→ bg-bg-default, …)
  "bg-default",
  "bg-muted",
  "bg-subtle",
  "bg-emphasis",
  "bg-inverted",
  "bg-info",
  "bg-success",
  "bg-attention",
  "bg-error",
  // content-* (→ text-content-default, …)
  "content-muted",
  "content-subtle",
  "content-default",
  "content-emphasis",
  "content-inverted",
  "content-info",
  "content-success",
  "content-attention",
  "content-error",
  // border-* (→ border-border-subtle, …) — default tier owned by product
  "border-muted",
  "border-subtle",
  "border-emphasis",
];

const colorTokens = [...productColorTokens, ...marketingColorTokens];

const radiusTokens = ["none", "sm", "md", "lg", "xl", "full"];

const shadowTokens = ["elev-1", "elev-2", "elev-3", "elev-ai", "control"];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSizeTokens }],
      "text-color": [{ text: colorTokens }],
      "bg-color": [{ bg: colorTokens }],
      "border-color": [{ border: colorTokens }],
      "border-color-x": [{ "border-x": colorTokens }],
      "border-color-y": [{ "border-y": colorTokens }],
      "border-color-s": [{ "border-s": colorTokens }],
      "border-color-e": [{ "border-e": colorTokens }],
      "border-color-t": [{ "border-t": colorTokens }],
      "border-color-b": [{ "border-b": colorTokens }],
      rounded: [{ rounded: radiusTokens }],
      "rounded-s": [{ "rounded-s": radiusTokens }],
      "rounded-e": [{ "rounded-e": radiusTokens }],
      "rounded-t": [{ "rounded-t": radiusTokens }],
      "rounded-b": [{ "rounded-b": radiusTokens }],
      shadow: [{ shadow: shadowTokens }],
      "ring-color": [{ ring: colorTokens }],
      "outline-color": [{ outline: colorTokens }],
    },
  },
});

/**
 * `cn` — marketing-layer className composer. Same contract as the product `cn`
 * (clsx flatten + tailwind-merge conflict resolution), with the marketing
 * token groups added. Always use this in `@azeer/website-ui`; never reach for
 * `clsx` directly.
 */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
