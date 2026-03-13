import { formatCurrency } from '../utils/formatCurrency'
import { SkeletonCard } from './SkeletonCard'

export function MonthlyComparisonTable({ data, isLoading }) {
  if (isLoading) {
    return <SkeletonCard className="h-72" />
  }

  const rows = Array.isArray(data) ? data : []

  const formatPercent = (value) => {
    if (value == null || Number.isNaN(value)) return '-'
    const pct = Number(value)
    const formatted = `${pct.toFixed(2)}%`
    return pct >= 0 ? `+${formatted}` : formatted
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Comparativo mês atual vs anterior
        </h2>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[500px] table-auto">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2">Categoria</th>
              <th className="px-3 py-2">Valor mês atual</th>
              <th className="px-3 py-2">Valor mês anterior</th>
              <th className="px-3 py-2">Variação %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-3 py-2 text-sm text-slate-700">
                  {row.categoria ?? row.category ?? '-'}
                </td>
                <td className="px-3 py-2 text-sm font-semibold text-slate-900">
                  {formatCurrency(row.valorMesAtual ?? row.currentMonth ?? 0)}
                </td>
                <td className="px-3 py-2 text-sm text-slate-700">
                  {formatCurrency(row.valorMesAnterior ?? row.previousMonth ?? 0)}
                </td>
                <td className="px-3 py-2 text-sm font-semibold text-slate-900">
                  {formatPercent(row.variacaoPercentual ?? row.variationPercent ?? 0)}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-sm text-slate-500">
                  Nenhum dado disponível
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
