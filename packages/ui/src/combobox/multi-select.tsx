import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Badge } from "../badge";
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
import type { ComboboxOption } from "./combobox";

export interface MultiSelectProps<T extends string = string> {
  options: ReadonlyArray<ComboboxOption<T>>;
  value?: T[];
  defaultValue?: T[];
  onValueChange?: (value: T[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: React.ReactNode;
  size?: ComboboxSize;
  disabled?: boolean;
  /** Maximum number of selected items shown inline before collapsing to `+N more`. Default 4. */
  maxVisible?: number;
  id?: string;
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
 * MultiSelect — searchable multi-select.
 *
 * Same Popover + Command composition as `Combobox`, but the trigger shows
 * selected values as outline `Badge`s (with X-remove). Each Command item
 * has a left-side custom checkbox indicator (filled accent when selected,
 * empty border otherwise). Clicking an item toggles its inclusion.
 *
 * Trigger uses `min-h-*` (not `h-*`) so it grows vertically when many
 * values are selected. Beyond `maxVisible` (default 4), remaining selections
 * collapse to a `+N more` badge.
 */
export function MultiSelect<T extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results.",
  size = "md",
  disabled,
  maxVisible = 4,
  id,
  className,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  "aria-describedby": ariaDescribedBy,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<T[]>(
    defaultValue ?? [],
  );
  const currentValue = value !== undefined ? value : internalValue;
  const selectedOptions = options.filter((o) =>
    currentValue.includes(o.value),
  );
  const groups = buildGroups(options);

  const setValue = (next: T[]) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const toggle = (optionValue: T) => {
    if (currentValue.includes(optionValue)) {
      setValue(currentValue.filter((v) => v !== optionValue));
    } else {
      setValue([...currentValue, optionValue]);
    }
  };

  const visible = selectedOptions.slice(0, maxVisible);
  const overflow = selectedOptions.length - visible.length;

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
            "items-start",
            className,
          )}
        >
          <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0">
            {selectedOptions.length === 0 ? (
              <span className="text-fg-subtle">{placeholder}</span>
            ) : (
              <>
                {visible.map((option) => (
                  <Badge
                    key={option.value}
                    variant="outline"
                    size="sm"
                    removable
                    removeLabel={`Remove ${typeof option.label === "string" ? option.label : option.value}`}
                    onRemove={() => toggle(option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
                {overflow > 0 ? (
                  <Badge variant="neutral" size="sm">
                    +{overflow} more
                  </Badge>
                ) : null}
              </>
            )}
          </div>
          <Icon
            icon={ChevronsUpDown}
            size={14}
            className="text-fg-muted shrink-0 mt-1"
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
                {items.map((option) => {
                  const checked = currentValue.includes(option.value);
                  return (
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
                      onSelect={() => toggle(option.value)}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-flex items-center justify-center",
                          "h-4 w-4 shrink-0 rounded-sm border",
                          "transition-colors duration-fast ease-standard",
                          checked
                            ? "bg-accent-fill border-accent-fill text-fg-on-accent"
                            : "bg-surface border-border-strong",
                        )}
                      >
                        {checked ? (
                          <Icon
                            icon={Check}
                            size={12}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        ) : null}
                      </span>
                      <span className="flex-1">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
