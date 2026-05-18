import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { DialogOverlay } from "../dialog/dialog";
import {
  sheetContentVariants,
  type SheetContentVariantProps,
} from "./sheet.variants";

/**
 * Sheet — edge-anchored panel. Built on the same Radix Dialog primitive as
 * `Dialog`, with side-anchored positioning + slide animations. Use when you
 * need a context surface alongside the page (filters, settings, secondary
 * details) without taking over the screen the way Dialog does.
 *
 * For mobile bottom-sheet patterns (Vaul-style) wait for `MobileSheet` —
 * deferred to v1.2 per Components.md.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    SheetContentVariantProps {
  hideCloseButton?: boolean;
  closeLabel?: string;
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>;
}

export function SheetContent({
  side,
  hideCloseButton,
  closeLabel = "Close",
  className,
  children,
  ref,
  ...rest
}: SheetContentProps) {
  return (
    <SheetPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(sheetContentVariants({ side }), className)}
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
    </SheetPortal>
  );
}

export function SheetHeader({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-5 pt-5 pb-4 text-start", className)}
      {...rest}
    />
  );
}

export function SheetTitle({
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

export function SheetDescription({
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

export function SheetBody({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        "px-5 py-2",
        "text-body-md text-fg-default",
        className,
      )}
      {...rest}
    />
  );
}

export function SheetFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2",
        "px-5 pt-4 pb-5",
        className,
      )}
      {...rest}
    />
  );
}
