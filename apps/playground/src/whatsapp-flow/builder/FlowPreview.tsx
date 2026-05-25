import * as React from "react";
import { Calendar, ChevronDown, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Icon } from "@azeer/ui";
import { useLocale } from "../../i18n";
import type { Block, FlowScreen } from "./types";

interface FlowPreviewProps {
  screen: FlowScreen | undefined;
  screenIndex: number;
  totalScreens: number;
}

/**
 * FlowPreview — WhatsApp-style mock phone frame showing the active screen's
 * rendered blocks. Pure-presentational: re-renders on every block change so
 * "live preview updates in real-time" (brief §7) holds without any extra
 * coordination from the parent.
 *
 * Styling: imitates WhatsApp's flow chrome. The three brand colors (dark
 * teal header, action green, beige chat canvas) are tokenized as
 * `whatsapp-chrome-*` because they're Meta-fixed values that don't map to
 * any of the DS intent / channel single tokens. Everything else
 * (typography, foreground colors, surfaces, borders) flows through standard
 * DS tokens so light/dark themes still propagate.
 */
export function FlowPreview({ screen, screenIndex, totalScreens }: FlowPreviewProps) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="text-label-xs uppercase tracking-wide text-fg-muted">
        {t("waf.builder.preview.heading")}
      </div>

      {/* Phone frame. Width/height are UI-shape constants for a phone bezel;
       *  they aren't design tokens because they encode physical aspect, not
       *  semantic spacing. */}
      <div className="w-[280px] rounded-xl border border-border-strong bg-fg-default p-2 shadow-elev-2">
        <div className="rounded-lg bg-whatsapp-chrome-canvas overflow-hidden flex flex-col h-[520px]">
          {/* WhatsApp header */}
          <div className="bg-whatsapp-chrome-fill text-fg-on-success px-4 py-3 flex items-center gap-2">
            <div className="size-8 rounded-full bg-fg-on-success/20 flex items-center justify-center text-label-sm">
              {screen?.title?.slice(0, 1).toUpperCase() ?? "?"}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="text-body-sm truncate" dir="auto">
                {screen?.title || "Untitled"}
              </div>
              <div className="text-body-xs opacity-80 tabular-nums">
                {t("waf.builder.preview.screenIndex", { n: screenIndex + 1, total: totalScreens })}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="bg-surface rounded-lg shadow-elev-1 p-3 flex flex-col gap-3 text-fg-default" dir="auto">
              {!screen || screen.blocks.length === 0 ? (
                <div className="text-body-sm text-fg-muted text-center py-8">
                  {t("waf.builder.preview.empty")}
                </div>
              ) : (
                screen.blocks
                  .filter((b) => b.kind !== "button")
                  .map((b) => <PreviewBlock key={b.id} block={b} />)
              )}
            </div>
          </div>

          {/* Footer button (last "button" block, if present) */}
          <FooterButton screen={screen} />
        </div>
      </div>
    </div>
  );
}

function FooterButton({ screen }: { screen: FlowScreen | undefined }) {
  if (!screen) return null;
  const button = [...screen.blocks].reverse().find((b) => b.kind === "button");
  if (!button || button.kind !== "button") return null;
  return (
    <div className="bg-surface border-t border-border-divider p-3">
      <button
        type="button"
        disabled
        className="w-full rounded-full bg-whatsapp-chrome-action text-fg-on-success text-body-sm py-2.5 cursor-default"
      >
        {button.label || "Continue"}
      </button>
    </div>
  );
}

function PreviewBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "heading":
      return <div className="text-heading-md text-fg-default">{block.text}</div>;
    case "subheading":
      return <div className="text-heading-sm text-fg-default">{block.text}</div>;
    case "body":
      return <div className="text-body-md text-fg-default whitespace-pre-wrap">{block.text}</div>;
    case "caption":
      return <div className="text-body-xs text-fg-muted">{block.text}</div>;

    case "text-input":
      return (
        <PreviewField label={block.label} required={block.required}>
          <div className="h-9 rounded-md border border-border-default bg-surface-sunken px-2.5 flex items-center text-body-sm text-fg-subtle">
            {block.placeholder || ""}
          </div>
        </PreviewField>
      );
    case "text-area":
      return (
        <PreviewField label={block.label} required={block.required}>
          <div className="min-h-[60px] rounded-md border border-border-default bg-surface-sunken px-2.5 py-2 text-body-sm text-fg-subtle">
            {block.placeholder || ""}
          </div>
        </PreviewField>
      );

    case "dropdown":
      return (
        <PreviewField label={block.label} required={block.required}>
          <div className="h-9 rounded-md border border-border-default bg-surface px-2.5 flex items-center justify-between text-body-sm text-fg-default">
            <span>{block.options[0]?.label ?? ""}</span>
            <Icon icon={ChevronDown} size={14} aria-hidden="true" />
          </div>
        </PreviewField>
      );

    case "radio":
      return (
        <PreviewField label={block.label} required={block.required}>
          <div className="flex flex-col gap-1.5">
            {block.options.map((o, i) => (
              <div key={o.id} className="flex items-center gap-2 text-body-sm text-fg-default">
                <span
                  className={
                    i === 0
                      ? "size-4 rounded-full border-[5px] border-whatsapp-chrome-action"
                      : "size-4 rounded-full border border-border-strong"
                  }
                />
                <span>{o.label}</span>
              </div>
            ))}
          </div>
        </PreviewField>
      );

    case "checkbox":
      return (
        <PreviewField label={block.label} required={block.required}>
          <div className="flex flex-col gap-1.5">
            {block.options.map((o) => (
              <div key={o.id} className="flex items-center gap-2 text-body-sm text-fg-default">
                <span className="size-4 rounded-sm border border-border-strong" />
                <span>{o.label}</span>
              </div>
            ))}
          </div>
        </PreviewField>
      );

    case "date-picker":
      return (
        <PreviewField label={block.label} required={block.required}>
          <div className="h-9 rounded-md border border-border-default bg-surface px-2.5 flex items-center justify-between text-body-sm text-fg-subtle">
            <span>YYYY-MM-DD</span>
            <Icon icon={Calendar} size={14} aria-hidden="true" />
          </div>
        </PreviewField>
      );

    case "opt-in":
      return (
        <div className="flex items-start gap-2 text-body-sm text-fg-default">
          <span className="size-4 mt-0.5 rounded-sm border border-border-strong shrink-0" />
          <span>{block.label}</span>
        </div>
      );

    case "image":
      return (
        <div className="rounded-md overflow-hidden bg-surface-sunken aspect-video flex items-center justify-center">
          {block.src ? (
            <img
              src={block.src}
              alt={block.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <Icon icon={ImageIcon} size={24} className="text-fg-subtle" aria-hidden="true" />
          )}
        </div>
      );

    case "embedded-link":
      return (
        <div className="flex items-center gap-1 text-body-sm text-whatsapp-chrome-fill">
          <span className="truncate">{block.label}</span>
          <Icon icon={ExternalLink} size={12} aria-hidden="true" flipOnRtl />
        </div>
      );

    case "button":
      // Buttons render in the footer slot, not in the body.
      return null;
  }
}

function PreviewField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-body-xs text-fg-default">
        {label}
        {required ? <span className="text-danger-text ms-0.5">*</span> : null}
      </div>
      {children}
    </div>
  );
}
