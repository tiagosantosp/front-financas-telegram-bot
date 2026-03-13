import { useMemo } from 'react'

export function FiltersPanel({
  filters,
  onChange,
  onRefresh,
  options,
  isLoading,
}) {
  const { empresas = [], categorias = [], meses = [] } = options ?? {}

  const onInputChange = (key) => (event) => {
    const value = event.target.value
    onChange({ ...filters, [key]: value })
  }

  const monthOptions = useMemo(() => {
    return meses.map((m) => ({ label: m, value: m }))
  }, [meses])

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-soft backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Filtros</h2>
        <button
          type="button"
          disabled={isLoading}
          onClick={onRefresh}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Atualizar dados
        </button>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="text-sm font-medium text-slate-200">Empresa</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            value={filters.empresa ?? ''}
            onChange={onInputChange('empresa')}
          >
            <option value="">Todas</option>
            {empresas.map((empresa) => (
              <option key={empresa} value={empresa}>
                {empresa}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-200">Categoria</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            value={filters.categoria ?? ''}
            onChange={onInputChange('categoria')}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-200">Mês</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            value={filters.mes ?? ''}
            onChange={onInputChange('mes')}
          >
            <option value="">Todos</option>
            {monthOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-200">Texto</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            placeholder="Descrição ou observação"
            value={filters.texto ?? ''}
            onChange={onInputChange('texto')}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-200">Valor mínimo</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            value={filters.valorMin ?? ''}
            onChange={onInputChange('valorMin')}
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-200">Valor máximo</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            value={filters.valorMax ?? ''}
            onChange={onInputChange('valorMax')}
            placeholder="0"
            min="0"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-200">Período</label>
          <div className="mt-1 flex flex-col gap-3">
            <input
              type="date"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
              value={filters.from ?? ''}
              onChange={onInputChange('from')}
              placeholder="De"
            />
            <input
              type="date"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
              value={filters.to ?? ''}
              onChange={onInputChange('to')}
              placeholder="Até"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
