import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge defaults assume Tailwind's stock palette. Without telling it
 * about our custom tokens it groups every `text-*` utility together — and
 * silently drops `text-fg-on-accent` when a sibling `text-label-md` is also
 * present (same root, "last one wins"). Same hazard for our custom
 * `bg-*` / `border-*` / `font-*` token names. The override below preserves
 * the right conflict groups so token classes don't shadow each other.
 *
 * Keep this list in sync with @azeer/tokens — anything that generates a
 * Tailwind utility belongs here. Adding a token is a two-place change
 * (tokens.css + this file); a future codegen step can collapse it to one.
 */

const fontSizeTokens = [
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

const colorTokens = [
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
  // border (note: also valid as `border-{name}` color utility)
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
  // AI (aliases — included so tw-merge resolves overrides between AI and accent classes correctly)
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
  // WhatsApp chrome (in-app preview surfaces)
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
];

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
      "shadow": [{ shadow: shadowTokens }],
      "ring-color": [{ ring: colorTokens }],
      "outline-color": [{ outline: colorTokens }],
    },
  },
});

/**
 * `cn` — Azeer's canonical className composer.
 *
 * - `clsx` flattens nested arrays / objects / falsy values.
 * - extended `tailwind-merge` resolves conflicts between Tailwind utilities
 *   while preserving the distinction between our custom token utilities
 *   (font-size vs text-color, bg-color vs etc).
 *
 * Used wherever a component combines its own variant classes with consumer
 * `className` props. Never reach for `clsx` directly — always go through `cn`
 * so overrides actually win.
 */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
