export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-default)]">
      <div className="flex h-10 items-center gap-3 bg-[var(--color-bg-surface-sunken)] px-4">
        {[120, 100, 80, 80, 100, 120].map((w, i) => (
          <div key={i} className="skeleton h-3 rounded" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="flex h-14 items-center gap-3 border-t border-[var(--color-border-subtle)] px-4"
        >
          <div className="skeleton h-3 flex-1 rounded" />
          <div className="skeleton h-3 w-[180px] rounded" />
          <div className="skeleton h-5 w-[80px] rounded-full" />
          <div className="skeleton h-3 w-[60px] rounded" />
          <div className="skeleton h-3 w-[60px] rounded" />
          <div className="skeleton h-3 w-[120px] rounded" />
        </div>
      ))}
    </div>
  );
}
