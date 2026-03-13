import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-night-900 to-indigo-950">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <div className="space-y-6">
            <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Painel de Comprovantes</h1>
                <p className="mt-1 text-sm text-slate-300">Análise e download de comprovantes em um só lugar</p>
              </div>
            </header>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
