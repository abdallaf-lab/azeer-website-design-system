import * as React from "react";
import { cn } from "../lib/cn";
import { Command } from "../command";
import { Dialog, DialogContent } from "../dialog";

export interface CommandPaletteProps {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Enable the global `⌘K` / `Ctrl+K` listener that toggles the palette.
   * Default `true`. Set to `false` to wire your own shortcut (e.g. via the
   * `useCommandPaletteShortcut` hook below).
   */
  enableGlobalShortcut?: boolean;
  /** Maximum width of the palette Dialog. Default `"md"` (640 px). */
  size?: "sm" | "md" | "lg";
  /** Composition — typically `<CommandInput>`, `<CommandList>`, `<CommandGroup>`, etc. */
  children: React.ReactNode;
  className?: string;
}

/**
 * CommandPalette — `cmdk` inside a `Dialog`.
 *
 * The canonical global-action surface (search, navigation, common
 * commands). DS-locked global shortcut `⌘K` / `Ctrl+K` per
 * Accessibility.md §locked-keyboard-shortcuts. The palette mounts a
 * `keydown` listener at the document level by default.
 *
 * Compose with the existing `Command` primitives:
 *
 *   <CommandPalette>
 *     <CommandInput placeholder="Type a command or search…" />
 *     <CommandList>
 *       <CommandEmpty>No results.</CommandEmpty>
 *       <CommandGroup heading="Actions">
 *         <CommandItem onSelect={…}>Star conversation</CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </CommandPalette>
 */
export function CommandPalette({
  open,
  defaultOpen,
  onOpenChange,
  enableGlobalShortcut = true,
  size = "md",
  children,
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useCommandPaletteShortcut(
    React.useCallback(() => setOpen(!isOpen), [isOpen, setOpen]),
    enableGlobalShortcut,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        size={size}
        hideCloseButton
        className={cn("p-0 overflow-hidden", className)}
      >
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

/**
 * useCommandPaletteShortcut — wires the global `⌘K` / `Ctrl+K` keydown
 * handler. Exported separately so consumers can mount the listener at
 * their own root when not using the `CommandPalette` component directly.
 */
export function useCommandPaletteShortcut(
  onToggle: () => void,
  enabled: boolean = true,
) {
  React.useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        // Skip when the user is typing in an input / textarea / contenteditable
        const target = e.target as HTMLElement | null;
        const isEditing =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable;
        if (isEditing && !((e.metaKey || e.ctrlKey) && e.key === "k")) {
          // Allow the shortcut even inside inputs — common UX for command palettes
        }
        e.preventDefault();
        onToggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onToggle, enabled]);
}
