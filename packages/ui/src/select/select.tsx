import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import {
  selectTriggerVariants,
  type SelectTriggerVariantProps,
} from "./select.variants";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
      "size"
    >,
    SelectTriggerVariantProps {
  /** Locked sm/md/lg per Sizes.md control scale. Named `size` in the public API. */
  size?: SelectTriggerVariantProps["selectSize"];
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Trigger>>;
}

/**
 * SelectTrigger — visually identical to an Input + end-side chevron. Wired
 * to the same state matrix (focus → border-focus tint, disabled → opacity
 * 0.5 + sunken bg, aria-invalid → danger border).
 */
export function SelectTrigger({
  size,
  className,
  children,
  ref,
  ...rest
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ selectSize: size }), className)}
      {...rest}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon icon={ChevronDown} size={16} aria-hidden="true" className="text-fg-muted" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Content>>;
  /**
   * Portal container override. Defaults to `document.body`.
   *
   * Pass a DialogContent / SheetContent DOM ref when nesting a Select
   * inside a modal — Radix Dialog's focus-trap treats anything portaled to
   * `<body>` as "outside" and intercepts the Select trigger's pointer event
   * before the dropdown can open. Portaling into the modal's own DOM puts
   * the dropdown back inside the trap. See Radix issue:
   *   https://github.com/radix-ui/primitives/issues/3344
   */
  container?: HTMLElement | null;
}

/**
 * SelectContent — shares the popover-style surface with DropdownMenu /
 * Popover / Combobox. `position="popper"` so it floats relative to the
 * trigger rather than centering over it.
 */
export function SelectContent({
  className,
  position = "popper",
  sideOffset = 4,
  container,
  children,
  ref,
  ...rest
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal container={container ?? undefined}>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "z-popover",
          "min-w-[8rem] max-h-[var(--radix-select-content-available-height)]",
          "p-1",
          "rounded-lg",
          "bg-surface-overlay text-fg-default",
          "shadow-elev-2",
          "outline-none",
          // Match the trigger width when position=popper
          position === "popper" && "w-[var(--radix-select-trigger-width)]",
          // Enter / exit animations matching Popover / DropdownMenu
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-0">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectScrollUpButton() {
  return (
    <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 cursor-default text-fg-muted">
      <Icon icon={ChevronUp} size={14} aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton() {
  return (
    <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 cursor-default text-fg-muted">
      <Icon icon={ChevronDown} size={14} aria-hidden="true" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Item>>;
}

/**
 * SelectItem — reuses the DropdownMenu highlight pattern (accent-bg-subtle
 * + accent-text on data-[highlighted]). Selected state is signaled by the
 * end-side check icon (rendered by `<SelectPrimitive.ItemIndicator>`).
 */
export function SelectItem({ className, children, ref, ...rest }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex select-none items-center gap-2",
        "px-2 py-1.5 pe-8",
        "rounded-sm",
        "text-body-sm text-fg-default",
        "cursor-pointer outline-none",
        "data-[highlighted]:bg-accent-bg-subtle data-[highlighted]:text-accent-text",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...rest}
    >
      <span className="absolute end-2 inline-flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon icon={Check} size={14} aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Label>>;
}) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-label-xs text-fg-muted", className)}
      {...rest}
    />
  );
}

export function SelectSeparator({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Separator>>;
}) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border-divider", className)}
      {...rest}
    />
  );
}
