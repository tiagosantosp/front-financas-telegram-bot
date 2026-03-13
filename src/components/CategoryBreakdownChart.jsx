import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
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

export function CategoryBreakdownChart({ data, isLoading }) {
  if (isLoading) {
    return <SkeletonCard className="h-72" />
  }

  const groupedData = Array.isArray(data)
    ? data.map((item) => ({
        name: item.categoria ?? item.category ?? 'Sem categoria',
        value: item.valor ?? item.value ?? 0,
      }))
    : []

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Gastos por Categoria</h2>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={groupedData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {groupedData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
