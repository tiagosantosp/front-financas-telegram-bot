export function Alert({ title, message }) {
  if (!title && !message) return null

  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
      <p className="font-semibold text-red-800">{title || 'Erro'}</p>
      {message ? <p className="mt-1 text-sm text-red-700">{message}</p> : null}
    </div>
  )
}
