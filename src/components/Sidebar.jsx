import { NavLink } from 'react-router-dom'
import { FiltersPanel } from './FiltersPanel'
import { useFiltersContext } from '../contexts/FiltersContext'
import { useFiltersOptions } from '../hooks/useFiltersOptions'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/documents', label: 'Comprovantes' },
]

export function Sidebar() {
  const { filters, setFilters, refresh } = useFiltersContext()
  const { data: options, isLoading } = useFiltersOptions()

  return (
    <aside className="h-full w-full max-w-[280px] shrink-0 border-r border-slate-800 bg-slate-950 px-5 py-8">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white">Finanças</h1>
        <p className="mt-1 text-sm text-slate-300">Dashboard de comprovantes</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-700 text-white shadow-soft'
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8">
        <FiltersPanel
          filters={filters}
          onChange={setFilters}
          onRefresh={refresh}
          options={options}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-8 text-xs text-slate-400">
        <p className="font-semibold text-slate-200">API base</p>
        <p className="mt-1 break-words text-slate-300">
          {import.meta.env.VITE_API_BASE_URL ?? 'N/A'}
        </p>
      </div>
    </aside>
  )
}
