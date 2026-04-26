export default function ProjectsLoading() {
  return (
    <div className="section-wrap">
      <section className="space-y-5">
        <div className="h-10 w-52 animate-pulse rounded-xl bg-[var(--glass-bg)]" />
        <div className="h-4 w-[420px] max-w-full animate-pulse rounded bg-[var(--glass-bg)]" />
        <div className="grid md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-[var(--card-border)]">
              <div className="aspect-[16/10] animate-pulse bg-[var(--glass-bg)]" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-[var(--glass-bg)]" />
                <div className="h-4 w-full animate-pulse rounded bg-[var(--glass-bg)]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--glass-bg)]" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-6 animate-pulse rounded bg-[var(--glass-bg)]" />
                  <div className="h-6 animate-pulse rounded bg-[var(--glass-bg)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
