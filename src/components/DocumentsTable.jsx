import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'
import { SkeletonCard } from './SkeletonCard'

export function DocumentsTable({ data, isLoading, onDownload }) {
  if (isLoading) {
    return <SkeletonCard className="h-80" />
  }

  const rows = Array.isArray(data) ? data : []

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Comprovantes</h2>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] table-auto">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Empresa</th>
              <th className="px-3 py-2">Categoria</th>
              <th className="px-3 py-2">Valor</th>
              <th className="px-3 py-2">Data</th>
              <th className="px-3 py-2">Arquivo</th>
              <th className="px-3 py-2">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => {
              const fileName = row.file || row.arquivo || row.name || ''
              return (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-sm text-slate-700">
                    {row.empresa ?? row.company ?? '-'}
                  </td>
                  <td className="px-3 py-2 text-sm text-slate-700">
                    {row.categoria ?? row.category ?? '-'}
                  </td>
                  <td className="px-3 py-2 text-sm font-semibold text-slate-900">
                    {formatCurrency(row.valor ?? row.value ?? 0)}
                  </td>
                  <td className="px-3 py-2 text-sm text-slate-700">
                    {formatDate(row.data || row.date)}
                  </td>
                  <td className="px-3 py-2 text-sm text-slate-700">{fileName}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="rounded-md bg-brand-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!fileName}
                      onClick={() => onDownload(fileName)}
                    >
                      Baixar
                    </button>
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-sm text-slate-500">
                  Nenhum comprovante encontrado
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
