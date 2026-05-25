"use client";

import type { ReactNode } from "react";
import {
  CircleCheck,
  CirclePlay,
  Clock8,
  EllipsisVertical,
  PencilLine,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@azeer/ui";

import { cn } from "../../lib";
import { MotionPreset } from "../../motion/motion-preset";
import { BorderBeam } from "../../motion/border-beam";

type WorkflowItemType = "input" | "action" | "output" | "pending";

export interface WorkflowItemProps {
  /** Step kind — drives the tinted tab + icon. */
  type: WorkflowItemType;
  /** Card heading. */
  title: string;
  /** Supporting line under the title. */
  description?: string;
  /** Leading icon (a Lucide element). */
  icon?: ReactNode;
  /** Time/status label (kebab → bottom badge; no-menu → inline). */
  time?: string;
  /** Show the kebab dropdown. Default true. */
  hasMenu?: boolean;
  /** Items in the kebab dropdown. */
  menuItems?: string[];
  /** Show a token-only "AI" badge (Sparkles + accent) in the footer. Default false. */
  aiAssisted?: boolean;
  /** Extra card content (rendered between body and bottom row). */
  children?: ReactNode;
  /** Entrance animation delay (s). Default 0. */
  delay?: number;
  /** Frame the card with an animated BorderBeam. Default false. */
  showBeam?: boolean;
  /** Positioning classes from the parent (e.g. absolute placement). */
  className?: string;
  /** Anchor id (applied to the card body). */
  id?: string;
  /** MotionPreset trigger mode. Default true (reveal in view). */
  inView?: boolean;
}

/**
 * Tinted type tabs — Azeer marketing intent tokens
 * (input=info, action=attention, output=success, pending=error).
 */
const TYPE_TAB: Record<WorkflowItemType, string> = {
  input: "bg-bg-info text-content-info",
  action: "bg-bg-attention text-content-attention",
  output: "bg-bg-success text-content-success",
  pending: "bg-bg-error text-content-error",
};

const TYPE_ICON: Record<WorkflowItemType, ReactNode> = {
  input: <PencilLine className="size-4" />,
  action: <CirclePlay className="size-4" />,
  output: <CircleCheck className="size-4" />,
  pending: <TriangleAlert className="size-4" />,
};

/**
 * WorkflowItem — the floating workflow card for hero visualizations: a tinted
 * type tab (input/action/output/pending), a card body with icon + title +
 * description, an optional kebab menu, and a footer with an optional time badge,
 * an optional "AI" badge, or (for `pending`) an Approve action. Chain several
 * with `ConnectorArrow` to build a workflow diagram.
 *
 * Composite: wrapped in `MotionPreset` for the entrance fade, optionally framed
 * by `BorderBeam`. Client component (its primitives use the motion library).
 *
 * Path C overrides (website-only): the card carries an elevation shadow
 * (floating) and each type uses its own accent color (multiple accents OK on a
 * marketing surface).
 *
 * RTL-safe: logical properties throughout; the type tab anchors to the start
 * corner (`start-0`).
 *
 * Adapted from Orion's `hero-section/workflow-item.tsx` (composed in
 * `lead-qualifier.tsx`).
 */
export function WorkflowItem({
  type,
  title,
  description,
  icon,
  time,
  hasMenu = true,
  menuItems = ["Share", "Update", "Refresh"],
  aiAssisted = false,
  children,
  delay = 0,
  showBeam = false,
  className,
  id,
  inView = true,
}: WorkflowItemProps) {
  const showBottomRow = (hasMenu && Boolean(time)) || aiAssisted || type === "pending";

  return (
    <MotionPreset
      fade
      delay={delay}
      inView={inView}
      className={cn("relative isolate w-full pt-7.5 max-md:max-w-sm md:w-82.5", className)}
    >
      {/* Type tab — peeks above the card (sits behind it via -z-[1]) */}
      <div
        className={cn(
          "absolute top-0 start-0 -z-[1] flex items-center gap-2.5 rounded-t-xl p-4 pt-1.5 capitalize",
          TYPE_TAB[type],
        )}
      >
        {TYPE_ICON[type]}
        <span className="text-mkt-caption font-medium">{type}</span>
      </div>

      {/* Card body */}
      <div
        id={id}
        className={cn(
          "flex flex-col gap-3.5 rounded-xl border border-border-subtle bg-bg-default p-4 text-content-default shadow-elev-2",
          showBeam && "relative overflow-hidden",
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center gap-2.5">
            {icon ? <span className="[&>svg]:size-5">{icon}</span> : null}
            <div className="grow text-mkt-body font-medium text-content-emphasis">{title}</div>
            {hasMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full text-fg-muted"
                    aria-label="Open menu"
                  >
                    <EllipsisVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    {menuItems.map((item) => (
                      <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : time ? (
              <span className="text-mkt-caption text-content-muted">{time}</span>
            ) : null}
          </div>
          {description ? (
            <p className="text-mkt-body-sm text-content-subtle">{description}</p>
          ) : null}
        </div>

        {children}

        {showBottomRow ? (
          <div className="flex items-center justify-end gap-2.5">
            {aiAssisted ? (
              <Badge variant="accent" size="sm">
                <Sparkles className="size-3.5" />
                AI
              </Badge>
            ) : null}
            {hasMenu && time ? (
              <Badge variant="outline" size="sm" className="text-content-muted">
                <Clock8 className="size-3.5" />
                {time}
              </Badge>
            ) : null}
            {type === "pending" ? <Button size="sm">Approve</Button> : null}
          </div>
        ) : null}

        {showBeam ? <BorderBeam size={50} duration={8} /> : null}
      </div>
    </MotionPreset>
  );
}
