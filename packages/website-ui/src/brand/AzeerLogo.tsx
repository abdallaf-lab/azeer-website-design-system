import type * as React from "react";
import { cn } from "../lib";
import { AzeerMark } from "./AzeerMark";

/** Lockup shape. `mark` = symbol only; others pair it with the wordmark. */
export type AzeerLogoVariant = "horizontal" | "stacked" | "mark";

/**
 * Color treatment, mirroring the brand book's approved logo variations.
 * - `color`   → indigo mark + navy wordmark (default, for light surfaces)
 * - `inverse` → all white (for `bg-brand-secondary` / dark surfaces)
 * - `mono`    → all `currentColor` (caller sets the color)
 * - `black`   → all near-black neutral
 */
export type AzeerLogoTone = "color" | "inverse" | "mono" | "black";

/** Which wordmark scripts to show. Ignored for `variant="mark"`. */
export type AzeerLogoWordmark = "both" | "ar" | "en";

export interface AzeerLogoProps {
  variant?: AzeerLogoVariant;
  tone?: AzeerLogoTone;
  wordmark?: AzeerLogoWordmark;
  /** Accessible name for the whole lockup. Default "Azeer". */
  title?: string;
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
}

const toneMark: Record<AzeerLogoTone, string> = {
  color: "text-brand-primary",
  inverse: "text-brand-on-secondary",
  mono: "", // inherits currentColor
  black: "text-brand-neutral",
};

const toneText: Record<AzeerLogoTone, string> = {
  color: "text-brand-secondary",
  inverse: "text-brand-on-secondary",
  mono: "",
  black: "text-brand-neutral",
};

function Wordmark({ wordmark, align }: { wordmark: AzeerLogoWordmark; align: "start" | "center" }) {
  return (
    <span className={cn("flex flex-col leading-none", align === "center" && "items-center")}>
      {wordmark !== "en" ? (
        <span dir="rtl" className="font-arabic text-[1.5em] font-semibold leading-none">
          أزير
        </span>
      ) : null}
      {wordmark !== "ar" ? (
        <span className="font-sans text-[0.95em] font-semibold tracking-tight leading-none">
          Azeer
        </span>
      ) : null}
    </span>
  );
}

/**
 * AzeerLogo — the master logo lockup (mark + wordmark) in the brand book's
 * approved variants and color treatments. Sized via `font-size` on `className`
 * (the mark and wordmark scale together with `em` units); e.g. `text-2xl`.
 *
 * @example
 * <AzeerLogo />                                  // horizontal, color, AR+EN
 * <AzeerLogo variant="mark" tone="color" />      // symbol only
 * <AzeerLogo tone="inverse" className="text-3xl" /> // on a dark band
 */
export function AzeerLogo({
  variant = "horizontal",
  tone = "color",
  wordmark = "both",
  title = "Azeer",
  className,
  ref,
}: AzeerLogoProps) {
  if (variant === "mark") {
    return (
      <span ref={ref} className={cn("inline-flex text-2xl", toneMark[tone], className)}>
        <AzeerMark title={title} className="h-[1.2em]" />
      </span>
    );
  }

  const stacked = variant === "stacked";

  return (
    <span
      ref={ref}
      role="img"
      aria-label={title}
      className={cn(
        "inline-flex text-2xl",
        stacked ? "flex-col items-center gap-2" : "flex-row-reverse items-center gap-2.5",
        className,
      )}
    >
      <AzeerMark aria-hidden className={cn("h-[1.4em] shrink-0", toneMark[tone])} />
      <span className={toneText[tone]} aria-hidden>
        <Wordmark wordmark={wordmark} align={stacked ? "center" : "start"} />
      </span>
    </span>
  );
}
