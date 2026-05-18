/**
 * @azeer/tokens — typed token metadata.
 *
 * Read-only constants for tooling, docs, and tests. NEVER consume at runtime
 * from a component — components consume tokens through Tailwind utilities
 * (`bg-surface`, `text-fg-default`, `rounded-md`) or CSS variables
 * (`var(--color-…)`). These structures exist so MDX docs, design audits, and
 * scripts can introspect the surface without re-parsing the CSS.
 *
 * The CSS in `./tokens.css` is the source of truth. Anything below mirrors
 * what's defined there and must be kept in sync (one place each, one PR).
 */

/* ─────────────────────────────────────────────────────────────────────── */
/*  Colors                                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

export type ColorTokenMeta = {
  readonly cssVar: `--color-${string}`;
  readonly value: string;
  readonly description: string;
  readonly contrast?: string;
};

export const COLOR_SURFACE = {
  canvas: {
    cssVar: "--color-canvas",
    value: "#F4F3FB",
    description: "App page background (lavender tint) — shows through panel gutters",
  },
  surface: {
    cssVar: "--color-surface",
    value: "#FFFFFF",
    description: "Card / panel / module surface — the white islands",
  },
  "surface-sunken": {
    cssVar: "--color-surface-sunken",
    value: "#F7F7F4",
    description: "Nested area inside a surface (inspector rows, code block bg)",
  },
  "surface-overlay": {
    cssVar: "--color-surface-overlay",
    value: "#FCFCFB",
    description: "Popover / dropdown / modal surface — slight tint vs base surface",
  },
  "surface-inverse": {
    cssVar: "--color-surface-inverse",
    value: "#1F1450",
    description: "Dark surface for tooltips, command palette, code-block alt",
  },
  "backdrop-overlay": {
    cssVar: "--color-backdrop-overlay",
    value: "rgba(20, 20, 20, 0.40)",
    description: "Modal / sheet scrim",
  },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_FOREGROUND = {
  "fg-default": {
    cssVar: "--color-fg-default",
    value: "#2A2A29",
    description: "Primary body, headings, default content",
    contrast: "15.5:1 on surface — AAA",
  },
  "fg-muted": {
    cssVar: "--color-fg-muted",
    value: "#646462",
    description: "Secondary text, captions, helper, meta",
    contrast: "6.0:1 on surface — AA",
  },
  "fg-subtle": {
    cssVar: "--color-fg-subtle",
    value: "#81817E",
    description: "Placeholders, captions ≥16px, decorative",
    contrast: "3.9:1 on surface — AA-large only",
  },
  "fg-disabled": {
    cssVar: "--color-fg-disabled",
    value: "#B8B8B3",
    description: "Disabled controls only — WCAG-exempt",
    contrast: "1.9:1 on surface — exempt per WCAG 1.4.3",
  },
  "fg-on-accent": {
    cssVar: "--color-fg-on-accent",
    value: "#FFFFFF",
    description: "Text on --color-accent-fill",
    contrast: "7.3:1 on accent-fill — AAA",
  },
  "fg-on-inverse": {
    cssVar: "--color-fg-on-inverse",
    value: "#FFFFFF",
    description: "Text on --color-surface-inverse",
    contrast: "17.2:1 on surface-inverse — AAA",
  },
  "fg-on-success": {
    cssVar: "--color-fg-on-success",
    value: "#FFFFFF",
    description: "Text on --color-success-fill",
    contrast: "5.4:1 on success-fill — AA",
  },
  "fg-on-danger": {
    cssVar: "--color-fg-on-danger",
    value: "#FFFFFF",
    description: "Text on --color-danger-fill",
    contrast: "4.6:1 on danger-fill — AA",
  },
  "fg-on-info": {
    cssVar: "--color-fg-on-info",
    value: "#FFFFFF",
    description: "Text on --color-info-fill",
    contrast: "5.9:1 on info-fill — AA",
  },
  "fg-on-warning": {
    cssVar: "--color-fg-on-warning",
    value: "#5C3A09",
    description: "Dark text on --color-warning-fill (white text fails 2.0:1)",
    contrast: "6.4:1 on warning-fill — AA",
  },
  "fg-on-canvas": {
    cssVar: "--color-fg-on-canvas",
    value: "#2A2A29",
    description: "Alias of fg-default for canvas surfaces — semantic clarity",
    contrast: "14.6:1 on canvas — AAA",
  },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_BORDER = {
  "border-default": {
    cssVar: "--color-border-default",
    value: "#E9EAE6",
    description: "Panel borders, card borders, separators",
    contrast: "1.2:1 (decorative — exempt)",
  },
  "border-strong": {
    cssVar: "--color-border-strong",
    value: "#D2D3CE",
    description: "Input borders, form-field outlines",
    contrast: "1.5:1 (decorative — exempt)",
  },
  "border-focus": {
    cssVar: "--color-border-focus",
    value: "#7B61FF",
    description: "Focus ring (2px outline, :focus-visible)",
    contrast: "4.14:1 — non-text UI ✓",
  },
  "border-accent": {
    cssVar: "--color-border-accent",
    value: "#B19BFC",
    description: "Indigo-tinted borders on bg-subtle",
    contrast: "2.5:1 — non-text UI (paired with text)",
  },
  "border-divider": {
    cssVar: "--color-border-divider",
    value: "#EFEFEC",
    description: "Light internal divider inside a card",
  },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_ACCENT = {
  "accent-brand": {
    cssVar: "--color-accent-brand",
    value: "#7B61FF",
    description: "Brand identity — focus ring, logo, illustrations, AI Sparkles",
    contrast: "4.14:1 vs white — non-text UI ✓",
  },
  "accent-fill": {
    cssVar: "--color-accent-fill",
    value: "#5238D1",
    description: "Primary button bg, selected nav indicator, switch on-state",
    contrast: "7.3:1 with white text — AAA",
  },
  "accent-fill-hover": {
    cssVar: "--color-accent-fill-hover",
    value: "#3F2BA8",
    description: "Primary button hover",
    contrast: "10.2:1 with white text — AAA",
  },
  "accent-fill-active": {
    cssVar: "--color-accent-fill-active",
    value: "#2E1F7A",
    description: "Primary button pressed",
    contrast: "12.6:1 with white text — AAA",
  },
  "accent-bg-subtle": {
    cssVar: "--color-accent-bg-subtle",
    value: "#E7E0FE",
    description: "Selected row, badge bg, sidebar active item",
    contrast: "9.5:1 with accent-text — AAA",
  },
  "accent-border": {
    cssVar: "--color-accent-border",
    value: "#B19BFC",
    description: "Indigo-tinted borders",
  },
  "accent-text": {
    cssVar: "--color-accent-text",
    value: "#2E1F7A",
    description: "Indigo text on neutral; active sidebar label",
    contrast: "12.6:1 on white — AAA",
  },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_INTENT_SUCCESS = {
  "success-fill": { cssVar: "--color-success-fill", value: "#158613", description: "Solid success fill", contrast: "5.4:1 with white — AA" },
  "success-fill-hover": { cssVar: "--color-success-fill-hover", value: "#117010", description: "Success hover", contrast: "6.7:1 with white" },
  "success-bg-subtle": { cssVar: "--color-success-bg-subtle", value: "#C7F1C6", description: "Success badge / alert bg", contrast: "5.1:1 with success-text — AA" },
  "success-border": { cssVar: "--color-success-border", value: "#69CC66", description: "Success outline" },
  "success-text": { cssVar: "--color-success-text", value: "#117010", description: "Success body text", contrast: "6.7:1 on white — AA" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_INTENT_DANGER = {
  "danger-fill": { cssVar: "--color-danger-fill", value: "#DF2020", description: "Solid danger fill", contrast: "4.6:1 with white — AA" },
  "danger-fill-hover": { cssVar: "--color-danger-fill-hover", value: "#B21A1A", description: "Danger hover" },
  "danger-bg-subtle": { cssVar: "--color-danger-bg-subtle", value: "#FFDBDB", description: "Danger badge / alert bg", contrast: "5.4:1 with danger-text — AA" },
  "danger-border": { cssVar: "--color-danger-border", value: "#F98686", description: "Danger outline (paired with text + aria-invalid)" },
  "danger-text": { cssVar: "--color-danger-text", value: "#C41C1C", description: "Danger body text", contrast: "5.6:1 on white — AA" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_INTENT_WARNING = {
  "warning-fill": { cssVar: "--color-warning-fill", value: "#F2B232", description: "Solid warning fill — NEVER white text on this (2.0:1)" },
  "warning-fill-hover": { cssVar: "--color-warning-fill-hover", value: "#D9941F", description: "Warning hover" },
  "warning-bg-subtle": { cssVar: "--color-warning-bg-subtle", value: "#FEECAF", description: "Warning badge / alert bg", contrast: "5.8:1 with warning-text — AA" },
  "warning-border": { cssVar: "--color-warning-border", value: "#F7D669", description: "Warning outline (paired with icon + text)" },
  "warning-text": { cssVar: "--color-warning-text", value: "#8A570D", description: "Warning body text", contrast: "6.6:1 on white — AA" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_INTENT_INFO = {
  "info-fill": { cssVar: "--color-info-fill", value: "#165FC6", description: "Solid info fill", contrast: "5.9:1 with white — AA" },
  "info-fill-hover": { cssVar: "--color-info-fill-hover", value: "#0F4DA6", description: "Info hover", contrast: "7.4:1 with white — AAA" },
  "info-bg-subtle": { cssVar: "--color-info-bg-subtle", value: "#D7E7FE", description: "Info badge / alert bg", contrast: "8.1:1 with info-text — AAA" },
  "info-border": { cssVar: "--color-info-border", value: "#89B6F6", description: "Info outline" },
  "info-text": { cssVar: "--color-info-text", value: "#0F4DA6", description: "Info body text", contrast: "7.4:1 on white — AAA" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_AI = {
  "ai-bg-subtle": { cssVar: "--color-ai-bg-subtle", value: "#E7E0FE", description: "Alias → accent-bg-subtle" },
  "ai-border":    { cssVar: "--color-ai-border",    value: "#B19BFC", description: "Alias → accent-border" },
  "ai-text":      { cssVar: "--color-ai-text",      value: "#2E1F7A", description: "Alias → accent-text" },
  "ai-icon":      { cssVar: "--color-ai-icon",      value: "#7B61FF", description: "Alias → accent-brand — Sparkles is rendered in this" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_CHANNEL = {
  "channel-whatsapp":  { cssVar: "--color-channel-whatsapp",  value: "#25D366", description: "WhatsApp — icon / badge bg only, never with white text" },
  "channel-voice":     { cssVar: "--color-channel-voice",     value: "#7B61FF", description: "Voice — brand indigo (Voice IS Azeer)" },
  "channel-sms":       { cssVar: "--color-channel-sms",       value: "#5B8DEF", description: "SMS — icon / badge with darker text" },
  "channel-email":     { cssVar: "--color-channel-email",     value: "#6B7280", description: "Email — passes AA with white at 4.7:1" },
  "channel-instagram": { cssVar: "--color-channel-instagram", value: "#E1306C", description: "Instagram — icon only" },
  "channel-messenger": { cssVar: "--color-channel-messenger", value: "#0084FF", description: "Messenger — icon only" },
  "channel-telegram":  { cssVar: "--color-channel-telegram",  value: "#229ED9", description: "Telegram — icon only" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_STATE = {
  "state-hover":          { cssVar: "--color-state-hover",          value: "rgba(20, 20, 20, 0.04)", description: "Hover overlay on ghost / row / list-item / menu" },
  "state-active":         { cssVar: "--color-state-active",         value: "rgba(20, 20, 20, 0.08)", description: "Active (pressed) overlay" },
  "state-selected":       { cssVar: "--color-state-selected",       value: "#E7E0FE",                description: "Selected row / nav item — alias of accent-bg-subtle" },
  "state-selected-hover": { cssVar: "--color-state-selected-hover", value: "#E7E0FE",                description: "Layered: state-selected + state-hover overlay at use site" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_LINK = {
  "text-link":         { cssVar: "--color-text-link",         value: "#2E1F7A", description: "Inline link in body prose (= accent-text)", contrast: "12.6:1 on surface — AAA" },
  "text-link-hover":   { cssVar: "--color-text-link-hover",   value: "#1F1450", description: "Link hover (darken)", contrast: "15.8:1 on surface — AAA" },
  "text-link-visited": { cssVar: "--color-text-link-visited", value: "#2E1F7A", description: "Visited — same as default in product UI" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_CHART_CATEGORICAL = {
  "chart-1": { cssVar: "--color-chart-1", value: "#5238D1", description: "Primary series — brand indigo (= accent-fill)" },
  "chart-2": { cssVar: "--color-chart-2", value: "#F2B232", description: "Amber (intentional reuse of warning-fill)" },
  "chart-3": { cssVar: "--color-chart-3", value: "#16A085", description: "Teal" },
  "chart-4": { cssVar: "--color-chart-4", value: "#DB2777", description: "Rose" },
  "chart-5": { cssVar: "--color-chart-5", value: "#0EA5E9", description: "Sky" },
  "chart-6": { cssVar: "--color-chart-6", value: "#6B7280", description: "Slate (= fg-muted)" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_CHART_SEQUENTIAL = {
  "chart-seq-1": { cssVar: "--color-chart-seq-1", value: "#E7E0FE", description: "Indigo gradient — low" },
  "chart-seq-2": { cssVar: "--color-chart-seq-2", value: "#B19BFC", description: "Indigo gradient" },
  "chart-seq-3": { cssVar: "--color-chart-seq-3", value: "#957EFA", description: "Indigo gradient" },
  "chart-seq-4": { cssVar: "--color-chart-seq-4", value: "#7B61FF", description: "Indigo gradient" },
  "chart-seq-5": { cssVar: "--color-chart-seq-5", value: "#5238D1", description: "Indigo gradient — high" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_CHART_DIVERGING = {
  "chart-neg":     { cssVar: "--color-chart-neg",     value: "#C41C1C", description: "Negative delta, decline" },
  "chart-neutral": { cssVar: "--color-chart-neutral", value: "#6B7280", description: "Zero / neutral" },
  "chart-pos":     { cssVar: "--color-chart-pos",     value: "#117010", description: "Positive delta, growth" },
} as const satisfies Record<string, ColorTokenMeta>;

export const COLOR_SYNTAX = {
  "syntax-keyword":     { cssVar: "--color-syntax-keyword",     value: "#5238D1", description: "if, return, const, function — indigo" },
  "syntax-string":      { cssVar: "--color-syntax-string",      value: "#117010", description: '"text" — green' },
  "syntax-number":      { cssVar: "--color-syntax-number",      value: "#C41C1C", description: "42, 3.14 — red" },
  "syntax-comment":     { cssVar: "--color-syntax-comment",     value: "#81817E", description: "// comment — muted gray" },
  "syntax-function":    { cssVar: "--color-syntax-function",    value: "#0F4DA6", description: "fn() — blue" },
  "syntax-type":        { cssVar: "--color-syntax-type",        value: "#8A570D", description: "Type names — amber" },
  "syntax-property":    { cssVar: "--color-syntax-property",    value: "#2E1F7A", description: ".prop, obj.key — deep indigo" },
  "syntax-punctuation": { cssVar: "--color-syntax-punctuation", value: "#646462", description: "(){}[] — muted" },
} as const satisfies Record<string, ColorTokenMeta>;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Typography                                                             */
/* ─────────────────────────────────────────────────────────────────────── */

export type TypeTokenMeta = {
  readonly cssVar: `--text-${string}`;
  readonly size: string;
  readonly lineHeight: string;
  readonly weight: 400 | 500 | 600;
  readonly tracking: string;
  readonly transform?: "uppercase";
  readonly use: string;
};

export const TYPE_TOKENS = {
  "label-xs": { cssVar: "--text-label-xs", size: "11px", lineHeight: "14px", weight: 600, tracking: "0.05em",  transform: "uppercase", use: "UPPERCASE eyebrows (Inspector section titles, sidebar group labels)" },
  "label-sm": { cssVar: "--text-label-sm", size: "13px", lineHeight: "16px", weight: 500, tracking: "0",                                use: "Form labels, button sm labels" },
  "label-md": { cssVar: "--text-label-md", size: "14px", lineHeight: "16px", weight: 600, tracking: "0",                                use: "Button md/lg labels, emphasized form labels" },
  "body-xs":  { cssVar: "--text-body-xs",  size: "12px", lineHeight: "16px", weight: 400, tracking: "0.01em",                           use: "Metadata, captions, timestamps, footnotes only — NOT general body" },
  "body-sm":  { cssVar: "--text-body-sm",  size: "13px", lineHeight: "20px", weight: 400, tracking: "0.005em",                          use: "Sidebar items, compact body, dense rows" },
  "body-md":  { cssVar: "--text-body-md",  size: "14px", lineHeight: "20px", weight: 400, tracking: "0",                                use: "★ DEFAULT body / control text" },
  "heading-sm": { cssVar: "--text-heading-sm", size: "16px", lineHeight: "22px", weight: 600, tracking: "-0.01em",                       use: "Card title, list-column title" },
  "heading-md": { cssVar: "--text-heading-md", size: "18px", lineHeight: "24px", weight: 600, tracking: "-0.015em",                      use: "Sub-nav / panel title" },
  "heading-lg": { cssVar: "--text-heading-lg", size: "20px", lineHeight: "28px", weight: 600, tracking: "-0.018em",                      use: "Page header, module title" },
  "heading-xl": { cssVar: "--text-heading-xl", size: "24px", lineHeight: "32px", weight: 600, tracking: "-0.022em",                      use: "Hero in app (dashboard title, settings landing)" },
  "display":    { cssVar: "--text-display",    size: "32px", lineHeight: "40px", weight: 700, tracking: "-0.03em",                       use: "True display tier — empty-state heroes, marketing surfaces" },
} as const satisfies Record<string, TypeTokenMeta>;

export const FONT_FAMILIES = {
  sans:   { cssVar: "--font-sans",   description: "Inter — all UI text in EN locales" },
  arabic: { cssVar: "--font-arabic", description: "IBM Plex Sans Arabic — all UI text in AR locales" },
  mono:   { cssVar: "--font-mono",   description: "JetBrains Mono — IDs, keys, code, phone numbers" },
} as const;

export const FONT_WEIGHTS = {
  regular:  { cssVar: "--font-weight-regular",  value: 400, use: "Body, paragraphs" },
  medium:   { cssVar: "--font-weight-medium",   value: 500, use: "Form labels, sm button labels, subtle emphasis" },
  semibold: { cssVar: "--font-weight-semibold", value: 600, use: "Headings, default button labels, eyebrows" },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Spacing                                                                */
/* ─────────────────────────────────────────────────────────────────────── */

export const SPACING_SCALE = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64] as const;
export const SPACING_BANNED = [14, 18, 22, 26, 28, 36, 44, 52, 56, 60] as const;

export const SPACING_RHYTHM = {
  tight:     { range: "2–6 px",  use: "Inside elements — icon-label gaps, badge padding, shell gutters" },
  moderate:  { range: "8–16 px", use: "Between elements — form field gaps, row padding, card internal padding" },
  generous:  { range: "20+ px",  use: "Between sections — card outer padding, section breaks, page rhythm" },
} as const;

export const SPACING_SURFACE_DEFAULTS = {
  Card:                            { padding: "p-5 (20)",   gap: "gap-3 (12)" },
  "Card — compact":                { padding: "p-4 (16)",   gap: "gap-2 (8)" },
  "Dialog content body":           { padding: "p-6 (24)",   gap: "gap-4 (16)" },
  "Sheet content body":            { padding: "p-5 (20)",   gap: "gap-4 (16)" },
  "Inspector section":             { padding: "py-3 (12) per row", gap: "gap-2 (8) inside / gap-6 (24) between sections" },
  "Conversation list row":         { padding: "px-3 py-3 (12)",    gap: "gap-3 (12)" },
  "Sidebar nav item":              { padding: "px-3 (12)",         gap: "gap-2 (8)" },
  "Table cell":                    { padding: "px-3 py-3 (12)" },
  "Dense table":                   { padding: "px-3 py-2 (8)" },
  "Form — field-to-field gap":     { gap: "gap-4 (16)" },
  "Form — label-to-control gap":   { gap: "gap-1.5 (6)" },
  "Form — control-to-helper gap":  { gap: "gap-1.5 (6)" },
  "Form section divider":          { gap: "gap-8 (32) between sections" },
  "Toolbar (composer, header)":    { padding: "px-2 (8)",          gap: "gap-1 (4)" },
  "Filter chip row":               { gap: "gap-2 (8)" },
  "Page header":                   { padding: "px-6 py-5 (24/20)" },
  "Module header":                 { padding: "px-5 py-4 (20/16)", gap: "gap-3 (12)" },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Radius                                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

export type RadiusTokenMeta = {
  readonly cssVar: `--radius-${string}`;
  readonly value: string;
  readonly use: string;
};

export const RADIUS_TOKENS = {
  none: { cssVar: "--radius-none", value: "0",      use: "Sharp corners (rare)" },
  sm:   { cssVar: "--radius-sm",   value: "4px",    use: "Chips, badge dots, checkboxes, tiny indicators" },
  md:   { cssVar: "--radius-md",   value: "6px",    use: "★ DEFAULT — buttons, inputs, list items" },
  lg:   { cssVar: "--radius-lg",   value: "8px",    use: "Dropdowns, popovers, tooltips, inner cards" },
  xl:   { cssVar: "--radius-xl",   value: "12px",   use: "CEILING — cards, modals, sheets, shell panels" },
  full: { cssVar: "--radius-full", value: "9999px", use: "Avatars, switches, pill tags, status dots" },
} as const satisfies Record<string, RadiusTokenMeta>;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Motion                                                                 */
/* ─────────────────────────────────────────────────────────────────────── */

export const MOTION_DURATIONS = {
  fast: { cssVar: "--duration-fast", value: "120ms", use: "Hover, focus, state flips, button press" },
  base: { cssVar: "--duration-base", value: "200ms", use: "Popover / dropdown / modal enter — default" },
  slow: { cssVar: "--duration-slow", value: "280ms", use: "Sheet slide, drawer slide, large layout shifts" },
} as const;

export const MOTION_EASINGS = {
  out:        { cssVar: "--ease-out",        value: "cubic-bezier(0.16, 1, 0.3, 1)",    use: "Enter — decelerate into place" },
  in:         { cssVar: "--ease-in",         value: "cubic-bezier(0.4, 0, 1, 1)",       use: "Exit — accelerate away" },
  standard:   { cssVar: "--ease-standard",   value: "cubic-bezier(0.4, 0, 0.2, 1)",     use: "General movement" },
  emphasized: { cssVar: "--ease-emphasized", value: "cubic-bezier(0.34, 1.56, 0.64, 1)", use: "AI celebration only — opt-in" },
} as const;

export const MOTION_TRANSITIONS = {
  fast:  { cssVar: "--transition-fast",  composed: "var(--duration-fast) var(--ease-standard)" },
  base:  { cssVar: "--transition-base",  composed: "var(--duration-base) var(--ease-standard)" },
  slow:  { cssVar: "--transition-slow",  composed: "var(--duration-slow) var(--ease-standard)" },
  enter: { cssVar: "--transition-enter", composed: "var(--duration-base) var(--ease-out)" },
  exit:  { cssVar: "--transition-exit",  composed: "var(--duration-fast) var(--ease-in)" },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Elevation, alpha, focus ring                                           */
/* ─────────────────────────────────────────────────────────────────────── */

export const ELEVATION = {
  "elev-1":         { cssVar: "--elev-1",         use: "Resting — cards, shell panels, list rows. Border only." },
  "elev-2":         { cssVar: "--elev-2",         use: "Floating short-lived — popovers, dropdowns, tooltips, hovercards" },
  "elev-3":         { cssVar: "--elev-3",         use: "Floating modal — dialogs, sheets, toasts" },
  "elev-ai":        { cssVar: "--elev-ai",        use: "AI hover only — AI Summary card. Single brand-tinted shadow in the system." },
  "shadow-control": { cssVar: "--shadow-control", use: "Tactile control — switch thumb, slider thumb" },
} as const;

export const ALPHA = {
  hover:    { cssVar: "--alpha-hover",    value: 0.04, use: "Hover overlay — ghost / row / list-item / menu" },
  active:   { cssVar: "--alpha-active",   value: 0.08, use: "Active (pressed) overlay" },
  divider:  { cssVar: "--alpha-divider",  value: 0.06, use: "Inline divider inside dense surfaces" },
  backdrop: { cssVar: "--alpha-backdrop", value: 0.40, use: "Modal / sheet scrim" },
  "tint-ai": { cssVar: "--alpha-tint-ai", value: 0.18, use: "Indigo glow inside --elev-ai" },
} as const;

export const FOCUS_RING = {
  width:     { cssVar: "--focus-ring-width",  value: "2px" },
  offset:    { cssVar: "--focus-ring-offset", value: "2px" },
  color:     { cssVar: "--focus-ring-color",  value: "var(--color-border-focus)" },
  shorthand: { cssVar: "--focus-ring",        value: "var(--focus-ring-width) solid var(--focus-ring-color)" },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Z-index                                                                */
/* ─────────────────────────────────────────────────────────────────────── */

export const Z_INDEX = {
  base:        { cssVar: "--z-base",      tailwind: "z-base",      value: 0,    use: "Default flow" },
  raised:      { cssVar: "--z-raised",    tailwind: "z-raised",    value: 1,    use: "Slightly raised in flow — hover" },
  sticky:      { cssVar: "--z-sticky",    tailwind: "z-sticky",    value: 10,   use: "Sticky table header, sticky filters" },
  nav:         { cssVar: "--z-nav",       tailwind: "z-nav",       value: 20,   use: "L1 rail, L2 sub-nav" },
  banner:      { cssVar: "--z-banner",    tailwind: "z-banner",    value: 35,   use: "Trial / system banner" },
  bubble:      { cssVar: "--z-bubble",    tailwind: "z-bubble",    value: 60,   use: "HelpBubble (fixed bottom-end)" },
  popover:     { cssVar: "--z-popover",   tailwind: "z-popover",   value: 100,  use: "DropdownMenu, ContextMenu, Combobox, Popover, HoverCard" },
  tooltip:     { cssVar: "--z-tooltip",   tailwind: "z-tooltip",   value: 200,  use: "Tooltip — always above popovers" },
  "modal-bd":  { cssVar: "--z-modal-bd",  tailwind: "z-modal-bd",  value: 1200, use: "Modal backdrop scrim" },
  modal:       { cssVar: "--z-modal",     tailwind: "z-modal",     value: 1300, use: "Dialog, Sheet content" },
  toast:       { cssVar: "--z-toast",     tailwind: "z-toast",     value: 1600, use: "Toast — above modals" },
  "call-bar":  { cssVar: "--z-call-bar",  tailwind: "z-call-bar",  value: 1700, use: "Active call bar — above everything" },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Control sizes                                                          */
/* ─────────────────────────────────────────────────────────────────────── */

export const CONTROL_SIZES = {
  sm: {
    cssVars: { height: "--control-h-sm", paddingX: "--control-px-sm" },
    height: "32px",
    paddingX: "12px",
    textToken: "label-sm",
    iconSize: "14px",
    use: "Dense product UI — toolbars, table-row actions, inline filters, list-row controls, composer toolbar",
  },
  md: {
    cssVars: { height: "--control-h-md", paddingX: "--control-px-md" },
    height: "40px",
    paddingX: "16px",
    textToken: "label-md",
    iconSize: "16px",
    use: "★ DEFAULT — form inputs, primary page CTAs, modal action buttons",
  },
  lg: {
    cssVars: { height: "--control-h-lg", paddingX: "--control-px-lg" },
    height: "48px",
    paddingX: "20px",
    textToken: "label-md",
    iconSize: "20px",
    use: "Hero CTAs — auth pages, onboarding, mobile-first primary actions",
  },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Theming axes                                                           */
/* ─────────────────────────────────────────────────────────────────────── */

export const THEMING_AXES = {
  theme: {
    attribute: "data-theme",
    target: "<html>",
    v1: ["light"] as const,
    future: ["dark", "high-contrast", "brand-{tenant}"] as const,
    plannedIn: "v1.5+",
    mechanism: "Re-define the primitive layer; the semantic layer references primitives so every component switches automatically.",
  },
  density: {
    attribute: "data-density",
    target: "<html>",
    v1: ["comfortable", "compact"] as const,
    future: [] as const,
    plannedIn: "shipped in v1.2",
    mechanism: "Override --control-h-* / --control-px-* / --row-h primitives; the @theme inline layer exposes them as h-ctrl-*, w-ctrl-*, px-pad-*, h-row utilities so components cascade automatically. No component branching, no JS, no rebuild.",
  },
  direction: {
    attribute: "dir",
    target: "<html>",
    v1: ["ltr", "rtl"] as const,
    future: [] as const,
    plannedIn: "shipped in v1",
    mechanism: "Native HTML dir attribute + Tailwind v4 logical utilities. Radix primitives auto-mirror.",
  },
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Re-exports — grouped for MDX iteration                                 */
/* ─────────────────────────────────────────────────────────────────────── */

export const COLOR_GROUPS = {
  Surface: COLOR_SURFACE,
  Foreground: COLOR_FOREGROUND,
  Border: COLOR_BORDER,
  Accent: COLOR_ACCENT,
  "Intent — Success": COLOR_INTENT_SUCCESS,
  "Intent — Danger":  COLOR_INTENT_DANGER,
  "Intent — Warning": COLOR_INTENT_WARNING,
  "Intent — Info":    COLOR_INTENT_INFO,
  AI: COLOR_AI,
  Channel: COLOR_CHANNEL,
  State: COLOR_STATE,
  Link: COLOR_LINK,
  "Chart — Categorical": COLOR_CHART_CATEGORICAL,
  "Chart — Sequential":  COLOR_CHART_SEQUENTIAL,
  "Chart — Diverging":   COLOR_CHART_DIVERGING,
  Syntax: COLOR_SYNTAX,
} as const;
