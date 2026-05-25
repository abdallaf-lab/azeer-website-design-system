import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { bannerVariants, type BannerIntent } from "./banner.variants";

const variantIcon: Record<BannerIntent, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  destructive: AlertCircle,
  accent: Sparkles,
};

const variantIconColor: Record<BannerIntent, string> = {
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  destructive: "text-danger-text",
  accent: "text-accent-text",
};

/** Match the toast canon: destructive announces immediately. */
function bannerRole(intent: BannerIntent): "alert" | "status" {
  return intent === "destructive" ? "alert" : "status";
}

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "role"> {
  intent?: BannerIntent;
  /** Bold title text. Pair with `children` for a "title + body" layout. */
  title?: React.ReactNode;
  /** Optional override for the variant's default icon. */
  icon?: LucideIcon;
  /** Trailing action — typically `<Button size="sm">Upgrade now</Button>`. */
  action?: React.ReactNode;
  /** Shows the trailing X dismiss button. */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** `aria-label` for the dismiss button. Default `"Dismiss"`. */
  dismissLabel?: string;
}

/**
 * Banner — shell-level workspace message.
 *
 * Locked anatomy per Shell.md / Errors.md Rule 3:
 *   - 48 px height
 *   - Content-level placement (NOT viewport-fixed) — sits above the module
 *     body row, not spanning L1 rail
 *   - `--z-banner` (35) — content tier; modals fully cover it when open
 *   - Always renders by `AppShell.banner` prop; features never render their own
 *
 * Use Banner when a **system-wide condition** must remain visible until
 * resolved or dismissed (trial expiring, maintenance, billing past due,
 * feature announcement). For ephemeral action feedback use `Toast`; for
 * blocking decisions use `Dialog`; for inline content callouts use `Alert`.
 */
export function Banner({
  intent = "accent",
  title,
  icon,
  action,
  dismissible,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  children,
  ...rest
}: BannerProps) {
  const IconComponent = icon ?? variantIcon[intent];
  return (
    <div
      role={bannerRole(intent)}
      className={cn(bannerVariants({ intent }), className)}
      {...rest}
    >
      <Icon
        icon={IconComponent}
        size={16}
        aria-hidden="true"
        className={cn("shrink-0", variantIconColor[intent])}
      />
      <div className="flex-1 min-w-0 text-body-md flex items-baseline gap-2 truncate">
        {title ? <strong className="font-medium">{title}</strong> : null}
        {children ? (
          <span className="text-fg-default truncate">{children}</span>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className={cn(
            "shrink-0",
            "inline-flex items-center justify-center",
            "h-6 w-6 rounded-sm",
            "bg-transparent text-fg-muted",
            "hover:bg-state-hover active:bg-state-active",
            "transition-colors duration-fast ease-standard",
            "cursor-pointer",
          )}
        >
          <Icon icon={X} size={14} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
