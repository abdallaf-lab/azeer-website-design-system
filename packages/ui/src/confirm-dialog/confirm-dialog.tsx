import * as React from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

export interface ConfirmDialogProps {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Dialog title — sentence case + `?` for questions per Casing.md.
   * Examples: "Delete conversation?" / "Discard unsaved changes?"
   */
  title: React.ReactNode;
  /** Body sentence describing the consequence. Period at end. */
  description?: React.ReactNode;
  /** Confirm-button label. Use the verb (e.g. "Delete", "Discard"). Default `"Confirm"`. */
  confirmLabel?: string;
  /** Cancel-button label. Default `"Cancel"`. */
  cancelLabel?: string;
  /**
   * When true, renders the Confirm button as `variant="destructive"`. Use
   * for irreversible actions (Delete, Remove, End call). Otherwise renders
   * as `primary`.
   */
  destructive?: boolean;
  /** Called when the user clicks Confirm. */
  onConfirm: () => void | Promise<void>;
  /** Optional trigger node. Wrapped in `DialogTrigger asChild`. */
  trigger?: React.ReactNode;
}

/**
 * ConfirmDialog — locked destructive / irreversible confirmation pattern.
 *
 * Composed from `Dialog` primitives. The canon (Errors.md Rule 2): use
 * Dialog when the user must make a decision before continuing. This wrapper
 * fixes the structure — `sm` size, title, optional description, Cancel +
 * Confirm — so every confirmation in the product looks the same.
 *
 * Examples:
 *   - "Delete conversation?" (destructive)
 *   - "Discard unsaved changes?" (destructive)
 *   - "Confirm payment" (primary, non-destructive)
 */
export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive,
  onConfirm,
  trigger,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant={destructive ? "destructive" : "primary"}
            size="sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
