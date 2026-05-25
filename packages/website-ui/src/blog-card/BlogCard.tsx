import type * as React from "react";
import { Badge, Card } from "@azeer/ui";
import { cn } from "../lib";

export interface BlogCardProps {
  title: React.ReactNode;
  href: string;
  excerpt?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** Category/topic chip. */
  category?: string;
  /** Pre-formatted publish date (caller formats — locale/RTL aware). */
  date?: string;
  /** e.g. "5 min read". */
  readingTime?: string;
  authorName?: string;
  authorAvatarSrc?: string;
  className?: string;
}

/**
 * BlogCard — a single article preview: cover, category, title, excerpt, and a
 * meta row (author · date · reading time). The whole card is one link.
 * Presentational → Server Component. Render several inside your own grid.
 */
export function BlogCard({
  title,
  href,
  excerpt,
  imageSrc,
  imageAlt = "",
  category,
  date,
  readingTime,
  authorName,
  authorAvatarSrc,
  className,
}: BlogCardProps) {
  const meta = [date, readingTime].filter(Boolean).join(" · ");
  return (
    <a href={href} className={cn("group block h-full", className)}>
      <Card
        padding="none"
        className="h-full overflow-hidden transition-colors duration-fast ease-standard group-hover:border-border-strong"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-video w-full object-cover"
          />
        ) : null}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {category ? (
            <Badge variant="neutral" size="sm" className="self-start">
              {category}
            </Badge>
          ) : null}
          <h3 className="text-heading-sm text-balance text-fg-default group-hover:text-accent-text">
            {title}
          </h3>
          {excerpt ? (
            <p className="line-clamp-3 text-body-sm text-fg-muted">{excerpt}</p>
          ) : null}
          {authorName || meta ? (
            <div className="mt-auto flex items-center gap-2 pt-2 text-body-xs text-fg-muted">
              {authorAvatarSrc ? (
                <img
                  src={authorAvatarSrc}
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : null}
              {authorName ? (
                <span className="text-fg-default">{authorName}</span>
              ) : null}
              {authorName && meta ? <span aria-hidden="true">·</span> : null}
              {meta ? <span>{meta}</span> : null}
            </div>
          ) : null}
        </div>
      </Card>
    </a>
  );
}
