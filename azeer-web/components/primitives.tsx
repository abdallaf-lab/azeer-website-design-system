import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Button — ghost is default; solid brand reserved for the primary CTA       */
/* -------------------------------------------------------------------------- */
type Variant = "brand" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  brand:
    "bg-brand text-white hover:bg-brand-hover active:bg-brand-active shadow-[0_1px_2px_rgba(124,100,254,0.25)]",
  secondary:
    "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50",
  ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100",
  inverse:
    "bg-white text-navy hover:bg-zinc-100",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-[15px] [&_svg]:size-[18px]",
  lg: "h-12 px-6 text-[15px] [&_svg]:size-5",
};

export function buttonClasses(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { variant = "secondary", size = "md", className } = opts ?? {};
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  )
);
Button.displayName = "Button";

/* -------------------------------------------------------------------------- */
/*  Container                                                                 */
/* -------------------------------------------------------------------------- */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow — small uppercase brand label                                     */
/* -------------------------------------------------------------------------- */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-brand",
        className
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading block                                                     */
/* -------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-[28px] leading-[1.15] sm:text-[36px] font-semibold text-zinc-900",
          align === "center" && "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-[17px] leading-relaxed text-zinc-500",
            align === "center" && "max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
