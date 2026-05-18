import * as React from "react";
import { cn } from "../lib/cn";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
}

/**
 * Keyboard shortcut hint — renders a real `<kbd>` element.
 *
 * Always LTR (`dir="ltr"` is set on the element) so modifier-key sequences
 * read the same in Arabic prose as in English. Modifier conventions:
 * `⌘` for Command, sentence-case words for `Ctrl` / `Shift` / `Alt` /
 * `Esc` / `Enter` / `Tab`. Combine with `+` between keys.
 *
 * Mostly used inside Tooltip / DropdownMenu / Command palette. Inline use
 * inside body prose works too — `inline-flex` keeps it baseline-aligned.
 */
export function Kbd({ className, children, ref, ...rest }: KbdProps) {
  return (
    <kbd
      ref={ref}
      dir="ltr"
      className={cn(
        "inline-flex items-center justify-center",
        "h-5 min-w-5 px-1.5",
        "rounded-sm border border-border-default",
        "bg-surface-sunken text-fg-muted",
        "font-mono text-body-xs",
        "select-none",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
