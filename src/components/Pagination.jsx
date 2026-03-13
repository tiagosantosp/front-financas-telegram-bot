export function Pagination({ currentPage, totalPages, onChangePage }) {
  if (!totalPages || totalPages <= 1) return null

  const safePage = Math.max(1, Math.min(currentPage, totalPages))

  return (
    <div className="mt-4 flex items-center justify-end space-x-2">
      <button
        type="button"
        disabled={safePage === 1}
        onClick={() => onChangePage(safePage - 1)}
        className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-sm text-slate-600">
        Página {safePage} de {totalPages}
      </span>
      <button
        type="button"
        disabled={safePage === totalPages}
        onClick={() => onChangePage(safePage + 1)}
        className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  )
}
