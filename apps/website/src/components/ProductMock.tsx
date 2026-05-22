import { cn } from "@azeer/ui";

/**
 * ProductMock — a token-only faux product screenshot for hero/feature media
 * slots. No image assets, no hooks → Server Component. Built entirely from DS
 * surface/border/accent tokens so it tracks the theme.
 */
export function ProductMock({
  label = "Azeer · Inbox",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border border-border-default bg-surface shadow-elev-2",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 50% 0%, var(--color-accent-bg-subtle), transparent 70%)",
        }}
      />
      {/* Window chrome */}
      <div className="relative flex items-center gap-1.5 border-b border-border-divider bg-surface-sunken px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="ms-2 text-body-xs text-fg-muted">{label}</span>
      </div>
      {/* Faux app body: conversation list + thread */}
      <div className="relative grid grid-cols-[1.1fr_2fr] gap-4 p-4">
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-7 w-7 shrink-0 rounded-full bg-surface-sunken" />
              <span className="flex flex-1 flex-col gap-1.5">
                <span className="h-2 w-2/3 rounded-full bg-surface-sunken" />
                <span className="h-2 w-1/2 rounded-full bg-surface-sunken" />
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border-divider bg-surface p-4">
          <span className="h-2.5 w-1/3 rounded-full bg-accent-bg-subtle" />
          <span className="h-2.5 w-full rounded-full bg-surface-sunken" />
          <span className="h-2.5 w-5/6 rounded-full bg-surface-sunken" />
          <span className="h-2.5 w-2/3 rounded-full bg-surface-sunken" />
          <span className="mt-3 h-8 w-28 self-end rounded-full bg-accent-fill" />
        </div>
      </div>
    </div>
  );
}
