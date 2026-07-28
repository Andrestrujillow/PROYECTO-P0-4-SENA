export function StatCardSkeleton() {
  return (
    <div className="card p-3 sm:p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-border" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-16 bg-border rounded" />
          <div className="h-5 w-20 bg-border rounded" />
        </div>
      </div>
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="card p-4 sm:p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-border" />
        <div className="space-y-1">
          <div className="h-3 w-32 bg-border rounded" />
          <div className="h-2.5 w-20 bg-border rounded" />
        </div>
      </div>
      <div className="h-[260px] bg-border/50 rounded-lg" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="card p-4 sm:p-5 animate-pulse space-y-3">
      <div className="h-4 w-40 bg-border rounded" />
      <div className="h-10 bg-border/50 rounded-lg" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-8 bg-border/30 rounded" />
      ))}
    </div>
  );
}
