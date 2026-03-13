export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/60 shadow-card border border-slate-200 p-4 ${className}`}
    >
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-3 h-10 rounded bg-slate-200" />
    </div>
  )
}
