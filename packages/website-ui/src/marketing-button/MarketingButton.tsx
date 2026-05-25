import { Icon } from "@azeer/ui";
import { cn, type CtaAction } from "../lib";

export interface MarketingButtonProps {
  action: CtaAction;
  className?: string;
}

/*
 * Marketing CTA buttons — the Dub anatomy: Dialogue/Inter Medium (500),
 * `rounded-lg`, `px-5 py-2.5`, `text-sm`, on a 44px `min-h-11` floor so the
 * primary touch target clears the WCAG 2.5.5 / mobile minimum. The signature
 * interaction is a **ring expand on hover** (`ring-4`), never a translate/lift,
 * kept on the 150ms `cubic-bezier(.4,0,.2,1)` Tailwind default `transition`.
 *
 * Rendered as `<a>` (a real link, RSC-safe). The global `:focus-visible` ring
 * from tokens.css §7 handles keyboard focus; the hover ring is purely visual.
 * Trailing icon flips under RTL via `flipOnRtl`.
 */
const base = cn(
  "inline-flex min-h-11 items-center justify-center gap-2",
  "rounded-lg px-5 py-2.5 text-mkt-body-sm font-medium",
  "transition",
);

/**
 * PrimaryButton — accent CTA. Uses the brand-derived accessible fill
 * (`accent-fill` #5238D1, AAA on white) rather than the raw brand identity
 * indigo, so white label text stays legible. Ring expands in the brand tint.
 */
export function PrimaryButton({ action, className }: MarketingButtonProps) {
  return (
    <a
      href={action.href}
      className={cn(
        base,
        "bg-accent-fill text-fg-on-accent",
        "hover:bg-accent-fill-hover hover:ring-4 hover:ring-accent-fill/20",
        className,
      )}
    >
      {action.label}
      {action.icon ? (
        <Icon icon={action.icon} size={16} flipOnRtl aria-hidden="true" />
      ) : null}
    </a>
  );
}

/**
 * SecondaryButton — neutral CTA. White surface, subtle border, neutral text;
 * the ring expands in the subtle neutral on hover.
 */
export function SecondaryButton({ action, className }: MarketingButtonProps) {
  return (
    <a
      href={action.href}
      className={cn(
        base,
        "border border-border-subtle bg-bg-default text-content-emphasis",
        "hover:border-border-emphasis hover:ring-4 hover:ring-border-subtle",
        className,
      )}
    >
      {action.label}
      {action.icon ? (
        <Icon icon={action.icon} size={16} flipOnRtl aria-hidden="true" />
      ) : null}
    </a>
  );
}
