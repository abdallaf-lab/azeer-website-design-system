import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import {
  dialogContentVariants,
  type DialogContentVariantProps,
} from "./dialog.variants";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>>;
}

/**
 * DialogOverlay — backdrop scrim. `--color-backdrop-overlay` is
 * rgba(20,20,20,0.40), per the alpha-backdrop token. Pinned to
 * `--z-modal-bd` (1200) — one tier under the modal content.
 */
export function DialogOverlay({
  className,
  ref,
  ...rest
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0",
        "z-modal-bd",
        "bg-backdrop-overlay",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className,
      )}
      {...rest}
    />
  );
}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    DialogContentVariantProps {
  /** Hide the default X close button in the corner. Use when you provide a custom close affordance. */
  hideCloseButton?: boolean;
  /** `aria-label` for the default close button. Default `"Close"`. */
  closeLabel?: string;
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>;
}

/**
 * DialogContent — the modal surface itself.
 *
 *   sm = 480px · md = 640px (default) · lg = 800px
 *
 * Centered via `start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`. Under
 * `dir="rtl"`, the X translate is mirrored (`rtl:translate-x-1/2`) so the
 * center math holds — `start` is `right` in RTL.
 *
 * Default X close button sits at the end-side corner (logical, mirrors RTL).
 * Suppress with `hideCloseButton` if you provide your own close affordance.
 */
export function DialogContent({
  size,
  hideCloseButton,
  closeLabel = "Close",
  className,
  children,
  ref,
  ...rest
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        {...rest}
      >
        {children}
        {!hideCloseButton ? (
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className={cn(
              "absolute end-4 top-4",
              "inline-flex items-center justify-center",
              "h-6 w-6 rounded-sm",
              "text-fg-muted",
              "hover:bg-state-hover active:bg-state-active",
              "transition-colors duration-fast ease-standard",
              "cursor-pointer",
            )}
          >
            <Icon icon={X} size={14} aria-hidden="true" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * DialogHeader — title + description block. p-6 (24 px) on top + sides,
 * pb-4 (16 px) so the gap below sits between header and body per Spacing
 * §locked-defaults for Dialog.
 */
export function DialogHeader({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        "px-6 pt-6 pb-4",
        "text-start",
        className,
      )}
      {...rest}
    />
  );
}

export function DialogTitle({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Title>>;
}) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-heading-sm text-fg-default", className)}
      {...rest}
    />
  );
}

export function DialogDescription({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Description>>;
}) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-body-sm text-fg-muted", className)}
      {...rest}
    />
  );
}

/**
 * DialogBody — scrollable main content. py-0 px-6 by default. Vertical
 * overflow scrolls; consumer manages content rhythm via `gap-*` on this slot
 * or its children.
 */
export function DialogBody({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        "px-6 py-2",
        "text-body-md text-fg-default",
        className,
      )}
      {...rest}
    />
  );
}

/**
 * DialogFooter — action row, end-aligned by default. p-6 (24 px) + pt-4.
 * Primary action goes last (the logical end side).
 */
export function DialogFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2",
        "px-6 pt-4 pb-6",
        className,
      )}
      {...rest}
    />
  );
}
