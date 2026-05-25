import type * as React from "react";
import {
  buttonVariants,
  Icon,
  type ButtonVariantProps,
  type IconProps,
} from "@azeer/ui";
import { cn } from "./cn";

/**
 * @azeer/website-ui — shared composition helpers (JSX).
 *
 * The section shell (`Section` band + `Container` column + `SectionHeading`
 * triad) and the `CtaButton` anchor live here so every marketing section reads
 * as one system. Re-exported through `../lib`.
 */

/**
 * The icon component type accepted by the system `<Icon />` wrapper. Re-exported
 * here so section prop types (`icon: SectionIcon`) don't have to reach into
 * `lucide-react` themselves — consumers pass any Lucide icon component.
 */
export type SectionIcon = IconProps["icon"];

/**
 * A call-to-action link. Rendered as an `<a>` styled with `buttonVariants`
 * (an anchor, not a `<button>`, so it stays a Server Component and is a real
 * navigable link). Shared across heroes, CTA banners, and feature splits.
 */
export interface CtaAction {
  label: string;
  href: string;
  /** Optional trailing icon (e.g. an arrow). Pass a Lucide icon component. */
  icon?: SectionIcon;
}

/** Background tone for a marketing section band. Maps to surface tokens only. */
export type SectionTone = "canvas" | "surface" | "sunken" | "inverse" | "accent";

const sectionTone: Record<SectionTone, string> = {
  canvas: "bg-canvas text-fg-default",
  surface: "bg-surface text-fg-default",
  sunken: "bg-surface-sunken text-fg-default",
  inverse: "bg-surface-inverse text-fg-on-inverse",
  accent: "bg-accent-bg-subtle text-fg-default",
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface band the section sits on. Default `canvas`. */
  tone?: SectionTone;
  ref?: React.Ref<HTMLElement>;
}

/**
 * Section — the vertical rhythm + surface band wrapper every marketing
 * section shares. Keeps the 64/96 px stacking and tone tokens in one place so
 * a page of stacked sections reads as one system.
 */
export function Section({ tone = "canvas", className, ref, ...rest }: SectionProps) {
  return (
    <section
      ref={ref}
      className={cn("w-full py-16 md:py-24", sectionTone[tone], className)}
      {...rest}
    />
  );
}

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Container — centered max-width content column with responsive gutters.
 * Pairs with `Section` (band) to form the standard section shell.
 */
export function Container({ className, ref, ...rest }: ContainerProps) {
  return (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...rest}
    />
  );
}

export interface CtaButtonProps {
  action: CtaAction;
  /** Button look — defaults to `primary`. */
  variant?: ButtonVariantProps["variant"];
  /** Control size — defaults to `lg` (hero/CTA scale). */
  size?: ButtonVariantProps["size"];
  className?: string;
}

/**
 * CtaButton — renders a `CtaAction` as an anchor styled with `buttonVariants`.
 * An `<a>`, never a `<button>`, so it's a real link and stays RSC-safe. A
 * trailing icon (arrow) flips under RTL via the system `<Icon flipOnRtl />`.
 */
export function CtaButton({
  action,
  variant = "primary",
  size = "lg",
  className,
}: CtaButtonProps) {
  return (
    <a
      href={action.href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {action.label}
      {action.icon ? (
        <Icon icon={action.icon} size={16} flipOnRtl aria-hidden="true" />
      ) : null}
    </a>
  );
}

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small uppercase eyebrow above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Center the heading block. Default `false` (start-aligned). */
  centered?: boolean;
  /**
   * Use the larger, lighter marketing display scale (Dub rhythm:
   * `mkt-display-md` title + `mkt-body-lg` subhead) instead of the default app
   * heading ramp. Opt-in, so existing sections are unchanged.
   */
  display?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * SectionHeading — eyebrow / title / description triad reused at the top of
 * most sections. Default ramp is the app scale (`label-xs` → `heading-xl` →
 * `body-md`); `display` switches to the marketing scale (`caption` →
 * `mkt-display-md` → `mkt-body-lg`).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  display = false,
  className,
  ref,
  ...rest
}: SectionHeadingProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3",
        centered && "items-center text-center",
        className,
      )}
      {...rest}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-accent-text",
            display ? "text-mkt-caption uppercase" : "text-label-xs",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-balance text-fg-default",
          display ? "text-mkt-display-md" : "text-heading-xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-fg-muted text-pretty",
            display ? "text-mkt-body-lg" : "text-body-md",
            centered && "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
