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
    <div className="rounded-2xl card-bg border border-slate-800 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Comparativo mês atual vs anterior
        </h2>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[500px] table-auto">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
              <th className="px-3 py-2">Categoria</th>
              <th className="px-3 py-2">Valor mês atual</th>
              <th className="px-3 py-2">Valor mês anterior</th>
              <th className="px-3 py-2">Variação %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800">
                <td className="px-3 py-2 text-sm text-slate-200">
                  {row.categoria ?? row.category ?? '-'}
                </td>
                <td className="px-3 py-2 text-sm font-semibold text-white">
                  {formatCurrency(row.valorMesAtual ?? row.currentMonth ?? 0)}
                </td>
                <td className="px-3 py-2 text-sm text-slate-200">
                  {formatCurrency(row.valorMesAnterior ?? row.previousMonth ?? 0)}
                </td>
                <td className="px-3 py-2 text-sm font-semibold text-white">
                  {formatPercent(row.variacaoPercentual ?? row.variationPercent ?? 0)}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-sm text-slate-300">
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
