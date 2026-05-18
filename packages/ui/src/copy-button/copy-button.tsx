import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Button, type ButtonProps } from "../button";
import { toast } from "../toast";

export interface CopyButtonProps
  extends Omit<ButtonProps, "onClick" | "children"> {
  /** Text to write to the clipboard. */
  value: string;
  /**
   * Toast title shown on success. Default `"Copied"`. Pass something more
   * specific when the surface has multiple copy buttons (e.g. `"API key copied"`).
   */
  successMessage?: string;
  /** Toast title shown when the clipboard write fails. Default `"Couldn't copy"`. */
  errorMessage?: string;
  /** Toast description for success. Useful for echoing the copied value (truncated). */
  successDescription?: string;
  /** Optional label rendered next to the icon (turns the button into an icon + text variant). */
  children?: React.ReactNode;
  /** `aria-label` for icon-only usage. Default `"Copy"`. */
  ariaLabel?: string;
}

/**
 * CopyButton — clipboard write + Toast feedback.
 *
 * Default look: icon-only ghost button. The `Copy` icon flips to `Check`
 * for ~2 seconds after a successful write, then resets. The visible
 * feedback pairs with a `toast.success` (3 s auto-dismiss per DS canon)
 * so users get both inline and ambient confirmation.
 *
 * Used in the Inspector for IDs, API keys, phone numbers, webhook URLs —
 * anywhere a value is meant to be copied into another tool.
 */
export function CopyButton({
  value,
  successMessage = "Copied",
  errorMessage = "Couldn't copy",
  successDescription,
  variant = "ghost",
  size = "icon-sm",
  className,
  ariaLabel = "Copy",
  children,
  ...rest
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(successMessage, successDescription ? { description: successDescription } : undefined);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(errorMessage);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      aria-label={children ? undefined : ariaLabel}
      className={cn(className)}
      {...rest}
    >
      <Icon
        icon={copied ? Check : Copy}
        size={size === "icon-sm" || size === "sm" ? 14 : 16}
        aria-hidden="true"
      />
      {children}
    </Button>
  );
}
