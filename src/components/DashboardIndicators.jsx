import { formatCurrency } from '../utils/formatCurrency'
import { SkeletonCard } from './SkeletonCard'

const INDICATOR_LABELS = {
  totalMesAtual: 'Total gasto no mês',
  totalMesAnterior: 'Total mês anterior',
  variacaoMesAnteriorPct: 'Variação percentual',
  media3Meses: 'Média 3 meses',
  media6Meses: 'Média 6 meses',
  media12Meses: 'Média 12 meses',
  maiorGastoMes: 'Maior gasto do mês',
  quantidadeComprovantesMes: 'Quantidade de comprovantes',
}

export function DashboardIndicators({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    )
  }

  const indicators = data ?? {}

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(INDICATOR_LABELS).map(([key, label]) => {
        const value = indicators[key]
        const formatted =
          key === 'variacaoMesAnteriorPct'
            ? typeof value === 'number'
              ? `${value.toFixed(2)}%`
              : '-'
            : formatCurrency(value)

        return (
          <div
            key={key}
            className="rounded-2xl card-bg border border-slate-800 p-5 shadow-soft"
          >
            <p className="text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{formatted}</p>
          </div>
        )
      })}
    </div>
  )
}
