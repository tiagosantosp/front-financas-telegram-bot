import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SkeletonCard } from './SkeletonCard'

const COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f97316',
  '#a855f7',
  '#f43f5e',
  '#0ea5e9',
  '#f59e0b',
  '#14b8a6',
]

function buildSeries(data = []) {
  const months = new Map()
  const categories = new Set()

  data.forEach((catData) => {
    const category = catData.categoria || catData.category || 'Sem categoria'
    categories.add(category)

    if (Array.isArray(catData.series)) {
      catData.series.forEach((item) => {
        const month = item.mes || item.month
        const value = Number(item.valor ?? item.value ?? 0)

        if (!month) return

        const existing = months.get(month) ?? { month }
        existing[category] = (existing[category] ?? 0) + value
        months.set(month, existing)
      })
    }
  })

  const sorted = Array.from(months.values()).sort((a, b) => (a.month > b.month ? 1 : -1))
  return { series: sorted, categories: Array.from(categories) }
}

export function MonthlyEvolutionChart({ data, isLoading }) {
  if (isLoading) {
    return <SkeletonCard className="h-72" />
  }

  const { series, categories } = buildSeries(data)

  return (
    <div className="rounded-2xl card-bg border border-slate-800 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Evolução Mensal por Categoria
        </h2>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
            <Legend />
            {categories.map((category, index) => (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                stroke={COLORS[index % COLORS.length]}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
