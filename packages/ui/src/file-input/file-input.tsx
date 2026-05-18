import * as React from "react";
import { File as FileIcon, Upload, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";

export interface FileInputProps {
  /** Comma-separated MIME types or extensions (`"image/*,.pdf"`). */
  accept?: string;
  /** Currently selected file. Pass `null` to clear. */
  value?: File | null;
  /** Fires when the user picks or drops a file, or clears. */
  onValueChange?: (file: File | null) => void;
  /** Maximum allowed size in bytes. Files larger than this set `error`. */
  maxSize?: number;
  /** Optional helper text shown in the empty state below the prompt. */
  helper?: React.ReactNode;
  disabled?: boolean;
  /** Required `id` when paired with a `FormField` `htmlFor`. */
  id?: string;
  className?: string;
  /** `aria-label` if rendered without a `FormField` label. */
  "aria-label"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * FileInput — basic single-file picker with drag-and-drop.
 *
 * Multi-file is the v1.2 fork per Components.md — this Phase 4 version
 * handles one file at a time. Drop zone uses `border-dashed` + 2 px
 * transparent border that tints to `border-accent-fill` + `accent-bg-subtle`
 * during a drag.
 *
 * Internally renders a visually-hidden native `<input type="file">` so
 * keyboard / click access works the same as any form control. The visible
 * drop zone is just a styled `<div>` wrapper.
 */
export function FileInput({
  accept,
  value,
  onValueChange,
  maxSize,
  helper,
  disabled,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: FileInputProps) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const sizeError =
    maxSize !== undefined && value && value.size > maxSize
      ? `Maximum ${formatBytes(maxSize)} — this file is ${formatBytes(value.size)}.`
      : null;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    onValueChange?.(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const open = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel ?? (value ? `Selected file: ${value.name}` : "Upload a file")}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || undefined}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        onDragEnter={(e) => {
          if (disabled) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          "min-h-32 px-4 py-6",
          "rounded-lg border-2 border-dashed",
          "transition-colors duration-fast ease-standard",
          "cursor-pointer outline-none",
          dragging
            ? "border-accent-fill bg-accent-bg-subtle"
            : "border-border-strong bg-surface hover:bg-surface-sunken",
          (disabled || sizeError) && !dragging && "cursor-not-allowed",
          disabled && "opacity-50",
          sizeError && "border-danger-border",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {value ? (
          <div className="flex items-center gap-3 max-w-full">
            <Icon icon={FileIcon} size={20} aria-hidden="true" className="text-fg-muted shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-body-sm font-medium text-fg-default truncate">
                {value.name}
              </span>
              <span className="text-body-xs text-fg-muted">
                {formatBytes(value.size)}
                {accept ? ` · ${value.type || "unknown type"}` : null}
              </span>
            </div>
            <button
              type="button"
              aria-label="Remove file"
              onClick={(e) => {
                e.stopPropagation();
                onValueChange?.(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className={cn(
                "shrink-0 ms-2",
                "inline-flex items-center justify-center",
                "h-6 w-6 rounded-sm",
                "text-fg-muted hover:bg-state-hover",
                "transition-colors duration-fast ease-standard",
                "cursor-pointer",
              )}
            >
              <Icon icon={X} size={14} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <Icon icon={Upload} size={20} aria-hidden="true" className="text-fg-muted" />
            <div className="text-center">
              <span className="text-body-sm text-fg-default">
                Drop a file here, or{" "}
                <span className="text-accent-text underline underline-offset-4">
                  browse
                </span>
              </span>
              {helper ? (
                <div className="text-body-xs text-fg-muted mt-1">{helper}</div>
              ) : null}
            </div>
          </>
        )}
      </div>
      {sizeError ? (
        <p className="text-body-xs text-danger-text">{sizeError}</p>
      ) : null}
    </div>
  );
}
