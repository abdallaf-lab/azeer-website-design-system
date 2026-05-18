/**
 * WhatsApp Flow Builder — internal types + Meta Flow JSON v5 serializer.
 *
 * The 14 block types listed in [[SCR-WAF-001 — WhatsApp Flow Manager (v2 brief)]]
 * §14 QA checklist and locked-in by [[WhatsApp Flow Manager — Product Gaps]] §3
 * (Block types row). They map 1:1 to Meta Flow JSON v5 component types.
 *
 * Source of truth for the Meta-side shape:
 *   https://developers.facebook.com/docs/whatsapp/flows/reference/components
 */

import type { FlowCategory } from "../data";

/** All 14 block kinds carried in a Flow's screens. Order here = palette order. */
export type BlockKind =
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "text-input"
  | "text-area"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "date-picker"
  | "opt-in"
  | "image"
  | "embedded-link"
  | "button";

interface BlockBase {
  id: string;
  kind: BlockKind;
}

export interface TextBlock extends BlockBase {
  kind: "heading" | "subheading" | "body" | "caption";
  text: string;
}

export interface TextInputBlock extends BlockBase {
  kind: "text-input" | "text-area";
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  value: string;
}
export interface ChoiceBlock extends BlockBase {
  kind: "dropdown" | "radio" | "checkbox";
  label: string;
  name: string;
  options: ChoiceOption[];
  required?: boolean;
}

export interface DatePickerBlock extends BlockBase {
  kind: "date-picker";
  label: string;
  name: string;
  required?: boolean;
}

export interface OptInBlock extends BlockBase {
  kind: "opt-in";
  label: string;
  name: string;
  required?: boolean;
}

export interface ImageBlock extends BlockBase {
  kind: "image";
  src: string;
  alt: string;
}

export interface EmbeddedLinkBlock extends BlockBase {
  kind: "embedded-link";
  label: string;
  url: string;
}

export interface ButtonBlock extends BlockBase {
  kind: "button";
  label: string;
  action: "next" | "submit";
}

export type Block =
  | TextBlock
  | TextInputBlock
  | ChoiceBlock
  | DatePickerBlock
  | OptInBlock
  | ImageBlock
  | EmbeddedLinkBlock
  | ButtonBlock;

export interface FlowScreen {
  /** SCREEN_ID per Meta spec: [A-Z0-9_]{1,32}. Auto-uppercased on edit. */
  id: string;
  /** Localized screen title shown in WhatsApp header. */
  title: string;
  blocks: Block[];
}

export interface FlowDraft {
  /** Stable client-side id; the published flow_id is assigned by Meta. */
  draftId: string;
  name: string;
  category: FlowCategory;
  withEndpoint: boolean;
  endpointUrl?: string;
  screens: FlowScreen[];
  /** Originating flow when editing/duplicating an existing flow. */
  originId?: string;
}

/* ─────── Palette grouping for the block picker ─────────────────────────── */

export interface BlockGroup {
  /** i18n key for the group heading (e.g. "waf.builder.palette.text"). */
  groupKey: string;
  kinds: BlockKind[];
}
export const PALETTE_GROUPS: BlockGroup[] = [
  { groupKey: "waf.builder.palette.text",   kinds: ["heading", "subheading", "body", "caption"] },
  { groupKey: "waf.builder.palette.inputs", kinds: ["text-input", "text-area", "date-picker"] },
  { groupKey: "waf.builder.palette.choice", kinds: ["dropdown", "radio", "checkbox", "opt-in"] },
  { groupKey: "waf.builder.palette.media",  kinds: ["image", "embedded-link"] },
  { groupKey: "waf.builder.palette.cta",    kinds: ["button"] },
];

/* ─────── Defaults / factory ────────────────────────────────────────────── */

let _seq = 0;
const nextId = (prefix: string) => {
  _seq += 1;
  return `${prefix}_${Date.now().toString(36)}${_seq.toString(36)}`;
};

export function newScreenId(existing: string[]): string {
  let n = existing.length + 1;
  let candidate = `SCREEN_${n}`;
  while (existing.includes(candidate)) {
    n += 1;
    candidate = `SCREEN_${n}`;
  }
  return candidate;
}

export function sanitizeScreenId(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9_]/g, "_").slice(0, 32);
}

/** Auto-derive a stable `name` for an input from its label. */
export function fieldNameFromLabel(label: string): string {
  return (
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 32) || "field"
  );
}

export function makeBlock(kind: BlockKind): Block {
  switch (kind) {
    case "heading":
    case "subheading":
    case "body":
    case "caption":
      return { id: nextId("blk"), kind, text: defaultTextFor(kind) };
    case "text-input":
      return { id: nextId("blk"), kind, label: "Full name", name: "full_name", placeholder: "Jane Doe" };
    case "text-area":
      return { id: nextId("blk"), kind, label: "Notes", name: "notes", placeholder: "Tell us more…" };
    case "dropdown":
      return {
        id: nextId("blk"), kind, label: "Country", name: "country",
        options: [
          { id: nextId("opt"), label: "Egypt", value: "EG" },
          { id: nextId("opt"), label: "Saudi Arabia", value: "SA" },
          { id: nextId("opt"), label: "United Arab Emirates", value: "AE" },
        ],
      };
    case "radio":
      return {
        id: nextId("blk"), kind, label: "Preferred contact", name: "contact_pref",
        options: [
          { id: nextId("opt"), label: "Email", value: "email" },
          { id: nextId("opt"), label: "Phone", value: "phone" },
        ],
      };
    case "checkbox":
      return {
        id: nextId("blk"), kind, label: "Topics of interest", name: "topics",
        options: [
          { id: nextId("opt"), label: "Product updates", value: "product" },
          { id: nextId("opt"), label: "Offers", value: "offers" },
          { id: nextId("opt"), label: "Events", value: "events" },
        ],
      };
    case "date-picker":
      return { id: nextId("blk"), kind, label: "Preferred date", name: "preferred_date" };
    case "opt-in":
      return { id: nextId("blk"), kind, label: "I agree to the Terms & Privacy Policy", name: "terms_optin" };
    case "image":
      return {
        id: nextId("blk"), kind,
        src: "https://placehold.co/600x300/png?text=Image",
        alt: "Sample image",
      };
    case "embedded-link":
      return { id: nextId("blk"), kind, label: "View our pricing", url: "https://example.com/pricing" };
    case "button":
      return { id: nextId("blk"), kind, label: "Continue", action: "next" };
  }
}

function defaultTextFor(kind: TextBlock["kind"]): string {
  switch (kind) {
    case "heading":    return "Welcome";
    case "subheading": return "Tell us about yourself";
    case "body":       return "We use this information to personalize your experience.";
    case "caption":    return "Your data is encrypted and stored securely.";
  }
}

export function makeBlankScreen(existing: string[]): FlowScreen {
  return { id: newScreenId(existing), title: "Untitled screen", blocks: [] };
}

export function makeBlankDraft(seed?: Partial<FlowDraft>): FlowDraft {
  const screens = seed?.screens ?? [makeBlankScreen([])];
  return {
    draftId: nextId("draft"),
    name: seed?.name ?? "",
    category: seed?.category ?? "service",
    withEndpoint: seed?.withEndpoint ?? false,
    endpointUrl: seed?.endpointUrl,
    screens,
    originId: seed?.originId,
  };
}

/* ─────── Meta Flow JSON v5.0 serializer ────────────────────────────────────
 * Produces a Meta-compatible Flow JSON. Real submission would also include
 * version, data_api_version, routing_model, plus screen-level `terminal` and
 * `data` fields. We emit the user-visible structure faithfully; details that
 * depend on backend state (`data_api_version` ↔ webhook contract) are stubbed.
 *
 * Routing model: each screen's last button with action="next" routes to the
 * next screen by index; "submit" terminates. Matches the implementation default
 * declared in [[WhatsApp Flow Manager — Product Gaps]] §3 (Routing model row).
 */

export interface MetaFlowJSON {
  version: string;
  data_api_version: string;
  routing_model: Record<string, string[]>;
  screens: MetaScreen[];
}
interface MetaScreen {
  id: string;
  title: string;
  terminal: boolean;
  layout: { type: "SingleColumnLayout"; children: MetaComponent[] };
}
type MetaComponent = Record<string, unknown>;

export function toMetaFlowJSON(draft: FlowDraft): MetaFlowJSON {
  const routing: Record<string, string[]> = {};
  draft.screens.forEach((scr, idx) => {
    const next = draft.screens[idx + 1];
    routing[scr.id] = next ? [next.id] : [];
  });
  return {
    version: "5.0",
    data_api_version: draft.withEndpoint ? "3.0" : "",
    routing_model: routing,
    screens: draft.screens.map((scr, idx) => ({
      id: scr.id,
      title: scr.title,
      terminal: idx === draft.screens.length - 1,
      layout: {
        type: "SingleColumnLayout",
        children: scr.blocks.map((b) => blockToMeta(b, draft.screens[idx + 1]?.id)),
      },
    })),
  };
}

function blockToMeta(b: Block, nextScreenId: string | undefined): MetaComponent {
  switch (b.kind) {
    case "heading":      return { type: "TextHeading",    text: b.text };
    case "subheading":   return { type: "TextSubheading", text: b.text };
    case "body":         return { type: "TextBody",       text: b.text };
    case "caption":      return { type: "TextCaption",    text: b.text };
    case "text-input":
      return {
        type: "TextInput",
        label: b.label,
        name: b.name,
        ...(b.placeholder ? { "helper-text": b.placeholder } : {}),
        ...(b.required ? { required: true } : {}),
      };
    case "text-area":
      return {
        type: "TextArea",
        label: b.label,
        name: b.name,
        ...(b.required ? { required: true } : {}),
      };
    case "dropdown":
      return {
        type: "Dropdown", label: b.label, name: b.name,
        "data-source": b.options.map((o) => ({ id: o.value, title: o.label })),
        ...(b.required ? { required: true } : {}),
      };
    case "radio":
      return {
        type: "RadioButtonsGroup", label: b.label, name: b.name,
        "data-source": b.options.map((o) => ({ id: o.value, title: o.label })),
        ...(b.required ? { required: true } : {}),
      };
    case "checkbox":
      return {
        type: "CheckboxGroup", label: b.label, name: b.name,
        "data-source": b.options.map((o) => ({ id: o.value, title: o.label })),
        ...(b.required ? { required: true } : {}),
      };
    case "date-picker":
      return {
        type: "DatePicker", label: b.label, name: b.name,
        ...(b.required ? { required: true } : {}),
      };
    case "opt-in":
      return {
        type: "OptIn", label: b.label, name: b.name,
        ...(b.required ? { required: true } : {}),
      };
    case "image":
      return { type: "Image", src: b.src, alt: b.alt };
    case "embedded-link":
      return { type: "EmbeddedLink", text: b.label, "on-click-action": { name: "open_url", url: b.url } };
    case "button":
      if (b.action === "submit" || !nextScreenId) {
        return {
          type: "Footer", label: b.label,
          "on-click-action": { name: "complete", payload: {} },
        };
      }
      return {
        type: "Footer", label: b.label,
        "on-click-action": { name: "navigate", next: { type: "screen", name: nextScreenId } },
      };
  }
}
