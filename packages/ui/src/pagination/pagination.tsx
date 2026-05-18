import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../lib/icon";

export interface PaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Fires with the new page number. */
  onPageChange: (page: number) => void;
  /** How many sibling pages to show on each side of `page`. Default 1. */
  siblingCount?: number;
  /** Disables all controls. */
  disabled?: boolean;
  /** `aria-label` for the nav region. Default `"Pagination"`. */
  ariaLabel?: string;
  className?: string;
}

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

/**
 * Build the page-button array. Always shows page 1 + page `pageCount`;
 * fills sibling pages around `current`; inserts ellipses when there's a gap.
 *
 *   1 … 4 5 [6] 7 8 … 20
 */
function buildPages(
  current: number,
  pageCount: number,
  siblingCount: number,
): PaginationItem[] {
  // Show all when total is small enough to fit
  const totalSlots = siblingCount * 2 + 5; // first + last + current + (sibs * 2) + 2 ellipses
  if (pageCount <= totalSlots) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - siblingCount);
  const right = Math.min(pageCount - 1, current + siblingCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < pageCount - 1;

  const pages: PaginationItem[] = [1];
  if (showLeftEllipsis) pages.push("ellipsis-start");
  for (let i = left; i <= right; i++) pages.push(i);
  if (showRightEllipsis) pages.push("ellipsis-end");
  pages.push(pageCount);
  return pages;
}

/**
 * Pagination — Intercom-style. Prev / page buttons / Next.
 *
 * **No jump-to-page input** per Components.md canon. Ellipses collapse
 * page ranges that are too far from the current page.
 *
 * Direction-aware: chevrons use Lucide's left/right which we flip via
 * `flipOnRtl` so the visual direction tracks the document direction.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  disabled,
  ariaLabel = "Pagination",
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = buildPages(page, pageCount, siblingCount);
  const isFirst = page <= 1;
  const isLast = page >= pageCount;

  return (
    <nav
      aria-label={ariaLabel}
      className={cn("inline-flex items-center gap-1", className)}
    >
      <PaginationButton
        aria-label="Previous page"
        disabled={disabled || isFirst}
        onClick={() => onPageChange(page - 1)}
      >
        <Icon icon={ChevronLeft} size={14} flipOnRtl aria-hidden="true" />
      </PaginationButton>

      {pages.map((p, i) =>
        p === "ellipsis-start" || p === "ellipsis-end" ? (
          <span
            key={`${p}-${i}`}
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center text-fg-muted"
          >
            …
          </span>
        ) : (
          <PaginationButton
            key={p}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            isActive={p === page}
            disabled={disabled}
            onClick={() => onPageChange(p)}
          >
            {p}
          </PaginationButton>
        ),
      )}

      <PaginationButton
        aria-label="Next page"
        disabled={disabled || isLast}
        onClick={() => onPageChange(page + 1)}
      >
        <Icon icon={ChevronRight} size={14} flipOnRtl aria-hidden="true" />
      </PaginationButton>
    </nav>
  );
}

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function PaginationButton({
  isActive,
  className,
  children,
  ...rest
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center px-2",
        "rounded-md text-label-sm",
        "transition-colors duration-fast ease-standard",
        "cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isActive
          ? "bg-accent-bg-subtle text-accent-text border border-accent-border"
          : "border border-transparent text-fg-default hover:bg-state-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
