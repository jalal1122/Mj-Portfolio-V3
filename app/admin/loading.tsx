export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="section-wrap">
        <div className="h-4 w-28 animate-pulse rounded bg-[var(--glass-bg)]" />
        <div className="mt-3 h-10 w-[420px] max-w-full animate-pulse rounded bg-[var(--glass-bg)]" />
        <div className="mt-3 h-4 w-[560px] max-w-full animate-pulse rounded bg-[var(--glass-bg)]" />
      </div>
      <div className="section-wrap grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-[var(--card-border)] p-4 space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-9 animate-pulse rounded-xl bg-[var(--glass-bg)]" />
          ))}
        </div>
        <div className="rounded-2xl border border-[var(--card-border)] p-5 space-y-4">
          <div className="h-6 w-44 animate-pulse rounded bg-[var(--glass-bg)]" />
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-xl bg-[var(--glass-bg)]" />
          ))}
        </div>
      </div>
    </div>
  );
}
