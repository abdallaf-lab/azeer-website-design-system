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
import { alertVariants, type AlertVariant } from "./alert.variants";

const variantIcon: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  destructive: AlertCircle,
  ai: Sparkles,
};

const variantIconColor: Record<AlertVariant, string> = {
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  destructive: "text-danger-text",
  ai: "text-ai-icon",
};

/**
 * Per the toast canon (Toast.md §accessibility): destructive → role="alert"
 * (announce immediately), everything else → role="status" (polite). AI is
 * status — never alarming.
 */
function alertRole(variant: AlertVariant): "alert" | "status" {
  return variant === "destructive" ? "alert" : "status";
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role" | "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  /** `aria-label` for the dismiss control. Default `"Dismiss"`. */
  dismissLabel?: string;
}

/**
 * Block-level callout — five intents (info / success / warning / destructive
 * / ai). Use for content-level signaling. For ephemeral action feedback use
 * a Toast; for persistent shell-level state use a Banner; for inline form
 * validation use FormField error.
 */
export function Alert({
  variant = "info",
  title,
  dismissible,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  children,
  ...rest
}: AlertProps) {
  const IconComponent = variantIcon[variant];
  return (
    <div
      role={alertRole(variant)}
      className={cn(alertVariants({ variant }), className)}
      {...rest}
    >
      <Icon
        icon={IconComponent}
        size={20}
        aria-hidden="true"
        className={cn("shrink-0 mt-0.5", variantIconColor[variant])}
      />
      <div className="flex-1 min-w-0">
        {title ? (
          <div className="text-label-md text-fg-default">{title}</div>
        ) : null}
        {children ? (
          <div className={cn("text-body-sm text-fg-default", title && "mt-1")}>
            {children}
          </div>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className={cn(
            "shrink-0 -me-1 -mt-1",
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
