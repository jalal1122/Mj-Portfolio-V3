export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--card-border)]/70 bg-[var(--glass-bg)]/55 backdrop-blur-md">
      <div className="section-wrap py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Muhammad Jalal</h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Junior MERN Stack Developer building scalable web products.</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Navigation</p>
          <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
            <p>Home</p>
            <p>Journey</p>
            <p>Work</p>
            <p>Contact</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Education</p>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">BSIT - Agriculture University Peshawar</p>
          <p className="mt-6 text-xs text-[var(--muted)]">© {new Date().getFullYear()} Muhammad Jalal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
