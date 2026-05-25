import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* Rating stars are content (the CSAT data itself), so amber/gold is allowed
   here per the brand "charts are content" exception — never as chrome. */
export function Stars({
  value,
  size = 16,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${value} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.5}
            className={filled ? "text-amber" : "text-zinc-300"}
            fill={filled ? "#FFC857" : "none"}
          />
        );
      })}
    </span>
  );
}
