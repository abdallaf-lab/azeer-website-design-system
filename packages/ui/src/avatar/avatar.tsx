import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../lib/cn";
import {
  avatarVariants,
  presenceVariants,
  type AvatarVariantProps,
  type PresenceVariantProps,
} from "./avatar.variants";

export type AvatarShape = NonNullable<AvatarVariantProps["shape"]>;
export type AvatarSize = NonNullable<AvatarVariantProps["size"]>;
export type PresenceStatus = NonNullable<PresenceVariantProps["status"]>;

const presenceLabel: Record<PresenceStatus, string> = {
  online: "Status: Online",
  away: "Status: Away",
  busy: "Status: Busy",
  offline: "Status: Offline",
};

export interface AvatarProps extends AvatarVariantProps {
  /** Image URL. When omitted (or load fails), initials fallback renders. */
  src?: string;
  /** Accessible name — also used to derive initials unless `name` is provided. */
  alt: string;
  /** Override the source for initials computation. */
  name?: string;
  /** Overlay status indicator on the bottom-end corner. */
  presence?: PresenceStatus;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === "") return "?";
  if (parts.length === 1) return (parts[0][0] ?? "?").toUpperCase();
  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return (first + last).toUpperCase();
}

/**
 * Azeer Avatar — built on @radix-ui/react-avatar.
 *
 * Radix handles the image-load handshake (delay before fallback shows,
 * recovery if the image loads after fallback rendered). Initials are
 * derived from `name ?? alt`; a single word uses its first char, multiple
 * words use first + last. All caps via the type token's uppercase transform.
 */
export function Avatar({
  src,
  alt,
  name,
  shape = "circle",
  size = "md",
  presence,
  className,
}: AvatarProps) {
  const initials = getInitials(name ?? alt);
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ shape, size }), className)}>
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback
        delayMs={src ? 600 : 0}
        className="flex h-full w-full items-center justify-center"
      >
        <span aria-label={alt}>{initials}</span>
      </AvatarPrimitive.Fallback>
      {presence ? (
        <span
          role="img"
          aria-label={presenceLabel[presence]}
          className={presenceVariants({ size, status: presence })}
        />
      ) : null}
    </AvatarPrimitive.Root>
  );
}
