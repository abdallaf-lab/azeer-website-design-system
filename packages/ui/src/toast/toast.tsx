import * as React from "react";
import {
  toast as sonnerToast,
  type ExternalToast as SonnerOptions,
  type ToastT,
} from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Icon } from "../lib/icon";

/**
 * Locked durations per Toast.md.
 *
 *   success   → 3000 ms  (user already saw the result; keep it brief)
 *   info      → 4000 ms  (default)
 *   warning   → 5000 ms  (needs a beat to read)
 *   error     → ∞        (persistent — enterprise users may look away)
 *   ai        → 4000 ms  (same as info — AI moments are completions, not errors)
 *
 * Loading toasts run until the consumer dismisses via id, or `toast.promise`
 * resolves them automatically. Errors are intentionally NOT auto-dismissed —
 * the user must acknowledge via the close button (always visible).
 */
const DURATION = {
  success: 3000,
  info: 4000,
  warning: 5000,
  error: Infinity,
  ai: 4000,
} as const;

export interface ToastOptions extends Omit<SonnerOptions, "icon" | "action" | "cancel"> {
  action?: { label: string; onClick: () => void };
  cancel?: { label: string; onClick?: () => void };
}

type ToastId = string | number;
type ToastMessage = React.ReactNode;

// Pre-computed icon nodes — created once at module load, reused across calls.
const ICON_SUCCESS = <Icon icon={CheckCircle2} size={16} className="text-success-text" />;
const ICON_INFO = <Icon icon={Info} size={16} className="text-info-text" />;
const ICON_WARNING = <Icon icon={TriangleAlert} size={16} className="text-warning-text" />;
const ICON_ERROR = <Icon icon={AlertCircle} size={16} className="text-danger-text" />;
const ICON_AI = <Icon icon={Sparkles} size={16} className="text-ai-icon" />;

/**
 * `toast` — the canonical helper API.
 *
 * Per Toast.md, only these helpers are public. Raw `sonner.toast(...)` is
 * banned (ESLint ban on direct `sonner` imports enforces it). Every call
 * routes through the locked durations + icons above.
 *
 *   toast.success("Message sent")
 *   toast.error("Webhook returned 502", { action: { label: "Retry", onClick: retry } })
 *   toast.warning("Approaching SMS quota (8,247 / 10,000)")
 *   toast.info("Synced in background")
 *   toast.loading("Sending broadcast…")    // returns id — dismiss manually
 *   toast.ai("AI summary ready")
 *   toast.promise(p, { loading, success, error })
 *   toast.dismiss(id)                       // or toast.dismiss() for all
 */
export const toast = {
  success(message: ToastMessage, opts?: ToastOptions): ToastId {
    return sonnerToast.success(message, {
      duration: DURATION.success,
      icon: ICON_SUCCESS,
      ...opts,
    });
  },

  info(message: ToastMessage, opts?: ToastOptions): ToastId {
    return sonnerToast.info(message, {
      duration: DURATION.info,
      icon: ICON_INFO,
      ...opts,
    });
  },

  warning(message: ToastMessage, opts?: ToastOptions): ToastId {
    return sonnerToast.warning(message, {
      duration: DURATION.warning,
      icon: ICON_WARNING,
      ...opts,
    });
  },

  error(message: ToastMessage, opts?: ToastOptions): ToastId {
    return sonnerToast.error(message, {
      duration: DURATION.error,
      icon: ICON_ERROR,
      ...opts,
    });
  },

  loading(message: ToastMessage, opts?: ToastOptions): ToastId {
    return sonnerToast.loading(message, {
      duration: Infinity,
      ...opts,
    });
  },

  /**
   * AI moment toast — Sparkles in brand indigo. Same 4s duration as `info`.
   * Use for AI completions: "AI summary ready", "AI drafted a reply".
   */
  ai(message: ToastMessage, opts?: ToastOptions): ToastId {
    return sonnerToast(message, {
      duration: DURATION.ai,
      icon: ICON_AI,
      ...opts,
    });
  },

  /**
   * Promise toast — transitions in place from loading → success / error.
   * Use this instead of manual `toast.loading()` + `toast.dismiss()` +
   * `toast.success()` chains.
   */
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    msgs: {
      loading: React.ReactNode;
      success: React.ReactNode | ((data: T) => React.ReactNode);
      error: React.ReactNode | ((err: unknown) => React.ReactNode);
    },
  ) {
    return sonnerToast.promise(promise, {
      loading: msgs.loading,
      success: msgs.success,
      error: msgs.error,
    });
  },

  /** Dismiss a specific toast by id. Omit the id to dismiss all visible toasts. */
  dismiss(id?: ToastId) {
    return sonnerToast.dismiss(id);
  },
};

export type { ToastT };
