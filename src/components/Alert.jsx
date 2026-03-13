export function Alert({ title, message }) {
  if (!title && !message) return null

  return (
    <div className="rounded-xl border border-red-600/40 bg-red-600/10 px-4 py-3">
      <p className="font-semibold text-red-100">{title || 'Erro'}</p>
      {message ? <p className="mt-1 text-sm text-red-100/80">{message}</p> : null}
    </div>
  )
}
