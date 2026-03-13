import { formatCurrency } from '../utils/formatCurrency'
import { SkeletonCard } from './SkeletonCard'

export function TopCompaniesTable({ data, isLoading }) {
  if (isLoading) {
    return <SkeletonCard className="h-72" />
  }

  const rows = Array.isArray(data) ? data : []

  return (
    <div className="rounded-2xl card-bg border border-slate-800 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Top Empresas</h2>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[380px] table-auto">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
              <th className="px-3 py-2">Empresa</th>
              <th className="px-3 py-2">Valor total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800">
                <td className="px-3 py-2 text-sm text-slate-200">
                  {row.empresa ?? row.company ?? '-'}
                </td>
                <td className="px-3 py-2 text-sm font-semibold text-white">
                  {formatCurrency(row.valor ?? row.total ?? 0)}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-3 py-6 text-center text-sm text-slate-300">
                  Nenhuma empresa encontrada
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
