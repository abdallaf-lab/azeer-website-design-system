import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  comboboxTriggerVariants,
  type ComboboxSize,
} from "./combobox.variants";

export interface ComboboxOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  /** Optional plain-text label used for fuzzy filtering. Defaults to `value` if `label` isn't a string. */
  keywords?: string;
  /** Optional group heading — all options sharing the same group land under that section. */
  group?: string;
  disabled?: boolean;
}

export interface ComboboxProps<T extends string = string> {
  options: ReadonlyArray<ComboboxOption<T>>;
  /** Controlled value. */
  value?: T;
  defaultValue?: T;
  /** Called with the new value, or `undefined` if the active option was deselected. */
  onValueChange?: (value: T | undefined) => void;
  /** Trigger placeholder when no value is selected. */
  placeholder?: string;
  /** Search-input placeholder inside the popover. */
  searchPlaceholder?: string;
  /** Body shown when no items match the current query. */
  emptyMessage?: React.ReactNode;
  size?: ComboboxSize;
  disabled?: boolean;
  /** `id` forwarded onto the trigger button — pairs with `FormField`. */
  id?: string;
  /** `aria-invalid` / `aria-required` flow through `FormField` automatically. */
  "aria-invalid"?: boolean | "true" | "false";
  "aria-required"?: boolean | "true" | "false";
  "aria-describedby"?: string;
  className?: string;
}

function buildGroups<T extends string>(
  options: ReadonlyArray<ComboboxOption<T>>,
): Array<[string, ComboboxOption<T>[]]> {
  const map = new Map<string, ComboboxOption<T>[]>();
  for (const option of options) {
    const key = option.group ?? "";
    const bucket = map.get(key);
    if (bucket) bucket.push(option);
    else map.set(key, [option]);
  }
  return Array.from(map.entries());
}

/**
 * Combobox — searchable single-select. Use above 7 options (per
 * Components.md, `Select` covers ≤ 7 static options).
 *
 * Composition under the hood: `Popover` wraps `Command`. cmdk owns search
 * + filter + keyboard nav; we provide DS chrome. The trigger looks like an
 * Input + end-side ChevronsUpDown — focus border tints, aria-invalid tints
 * to danger, same state matrix as Input + Select.
 */
export function Combobox<T extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results.",
  size = "md",
  disabled,
  id,
  className,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  "aria-describedby": ariaDescribedBy,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<T | undefined>(
    defaultValue,
  );
  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((o) => o.value === currentValue);
  const groups = buildGroups(options);

  const setValue = (next: T | undefined) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={ariaInvalid}
          aria-required={ariaRequired}
          aria-describedby={ariaDescribedBy}
          disabled={disabled}
          className={cn(
            comboboxTriggerVariants({ comboboxSize: size }),
            className,
          )}
        >
          <span
            className={cn(
              "flex-1 truncate text-start",
              !selectedOption && "text-fg-subtle",
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon
            icon={ChevronsUpDown}
            size={14}
            className="text-fg-muted shrink-0"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)]"
        align="start"
        sideOffset={4}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {groups.map(([groupName, items]) => (
              <CommandGroup
                key={groupName || "_default"}
                heading={groupName || undefined}
              >
                {items.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={
                      option.keywords
                        ? [option.keywords]
                        : typeof option.label === "string"
                          ? [option.label]
                          : undefined
                    }
                    disabled={option.disabled}
                    onSelect={(next) => {
                      setValue(next === currentValue ? undefined : (next as T));
                      setOpen(false);
                    }}
                  >
                    <span className="flex-1">{option.label}</span>
                    {currentValue === option.value ? (
                      <Icon
                        icon={Check}
                        size={14}
                        className="ms-auto text-accent-text"
                        aria-hidden="true"
                      />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
