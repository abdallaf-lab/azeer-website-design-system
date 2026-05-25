import { cn } from "@/lib/utils";

/* Azeer mark — recreated from assets/logo-mark-purple.svg (chat bubble) */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
      role="img"
    >
      <rect x="2" y="2" width="40" height="40" rx="12" fill="#7C64FE" />
      <rect x="12" y="13" width="20" height="16" rx="6" fill="#FFFFFF" />
      <circle cx="18" cy="21" r="1.7" fill="#7C64FE" />
      <circle cx="22" cy="21" r="1.7" fill="#7C64FE" />
      <circle cx="26" cy="21" r="1.7" fill="#7C64FE" />
      <path d="M14 29 L14 34 L18 29 Z" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({
  className,
  wordmarkClassName,
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-7 w-7" />
      <span
        className={cn(
          "text-[20px] font-semibold tracking-[-0.02em] text-zinc-900",
          wordmarkClassName
        )}
      >
        Azeer
      </span>
    </span>
  );
}
