export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl card-bg border border-slate-800 p-5 shadow-soft ${className}`}
    >
      <div className="h-4 w-1/3 rounded bg-slate-700" />
      <div className="mt-3 h-10 rounded bg-slate-700" />
    </div>
  )
}
