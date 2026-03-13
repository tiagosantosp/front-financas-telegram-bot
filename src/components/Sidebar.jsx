import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/documents', label: 'Comprovantes' },
]

export function Sidebar() {
  return (
    <aside className="h-full w-full max-w-[260px] shrink-0 border-r border-slate-200 bg-white px-4 py-6">
      <div className="mb-10">
        <h1 className="text-xl font-semibold text-slate-900">Finanças</h1>
        <p className="mt-1 text-sm text-slate-600">Dashboard de comprovantes</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 text-xs text-slate-500">
        <p>API base:</p>
        <p className="mt-1 break-words">{import.meta.env.VITE_API_BASE_URL ?? 'N/A'}</p>
      </div>
    </aside>
  )
}
