import * as React from "react";
import { Pencil } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";
import { Button } from "../button";
import { Input, type InputProps } from "../input";

export interface InlineEditProps {
  /** Current value. */
  value: string;
  /** Fires when the user commits a new value via Save / Enter. */
  onValueChange?: (value: string) => void;
  /** Optional validator. Return a string error to block save, or `null` to commit. */
  validate?: (value: string) => string | null;
  /** Placeholder text shown in display mode when `value` is empty. */
  placeholder?: string;
  /** Placeholder inside the Input while editing. */
  inputPlaceholder?: string;
  /** Disable the click-to-edit affordance. */
  disabled?: boolean;
  /** Pass-through size to the underlying `Input`. */
  size?: InputProps["size"];
  /** `aria-label` for the edit-trigger button when the displayed text isn't itself the label. */
  ariaLabel?: string;
  /** ClassName for the display-mode trigger button (where the static text lives). */
  className?: string;
  /** ClassName for the static text element inside the trigger. */
  textClassName?: string;
  /** Optional id passed to the Input for `<label htmlFor>` pairing. */
  id?: string;
}

/**
 * InlineEdit — click-to-edit pattern.
 *
 * Display mode shows the value as text with a hover-revealed `Pencil`
 * affordance. Clicking enters edit mode — Input + Save / Cancel buttons.
 * `Enter` commits, `Esc` cancels. Optional `validate` returns an error
 * that blocks Save and renders below the input.
 *
 * Used for settings titles, contact names, conversation subjects — any
 * field where the static value is the resting state and editing is a
 * deliberate, focused interaction.
 */
export function InlineEdit({
  value,
  onValueChange,
  validate,
  placeholder = "Empty",
  inputPlaceholder,
  disabled,
  size = "md",
  ariaLabel,
  className,
  textClassName,
  id,
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const [error, setError] = React.useState<string | null>(null);

  // Re-sync draft if the controlled value changes externally while not editing.
  React.useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const startEditing = () => {
    if (disabled) return;
    setDraft(value);
    setError(null);
    setEditing(true);
  };

  const save = () => {
    const err = validate?.(draft) ?? null;
    if (err) {
      setError(err);
      return;
    }
    onValueChange?.(draft);
    setEditing(false);
    setError(null);
  };

  const cancel = () => {
    setDraft(value);
    setError(null);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <Input
            id={id}
            autoFocus
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                save();
              } else if (e.key === "Escape") {
                e.preventDefault();
                cancel();
              }
            }}
            size={size}
            placeholder={inputPlaceholder ?? placeholder}
            aria-invalid={error ? true : undefined}
            className="flex-1"
          />
          <Button size="sm" onClick={save}>
            Save
          </Button>
          <Button size="sm" variant="secondary" onClick={cancel}>
            Cancel
          </Button>
        </div>
        {error ? (
          <p className="text-body-xs text-danger-text">{error}</p>
        ) : null}
      </div>
    );
  }

  const isEmpty = value.trim() === "";

  return (
    <button
      type="button"
      onClick={startEditing}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-2",
        "rounded-sm px-1 py-0.5 -mx-1",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer text-start",
        "hover:bg-state-hover",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <span
        className={cn(
          isEmpty ? "text-fg-subtle italic" : "text-fg-default",
          textClassName,
        )}
      >
        {isEmpty ? placeholder : value}
      </span>
      <Icon
        icon={Pencil}
        size={12}
        aria-hidden="true"
        className={cn(
          "text-fg-muted shrink-0",
          "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
          "transition-opacity duration-fast ease-standard",
        )}
      />
    </button>
  );
}
