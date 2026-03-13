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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Filtros</h2>
        <button
          type="button"
          disabled={isLoading}
          onClick={onRefresh}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Atualizar dados
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Empresa</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
          <label className="text-sm font-medium text-slate-700">Categoria</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
          <label className="text-sm font-medium text-slate-700">Mês</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
          <label className="text-sm font-medium text-slate-700">Texto</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Descrição ou observação"
            value={filters.texto ?? ''}
            onChange={onInputChange('texto')}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Valor mínimo</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            value={filters.valorMin ?? ''}
            onChange={onInputChange('valorMin')}
            placeholder="0"
            min="0"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Valor máximo</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            value={filters.valorMax ?? ''}
            onChange={onInputChange('valorMax')}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="text-sm font-medium text-slate-700">Período</label>
          <div className="mt-1 flex flex-wrap gap-3">
            <input
              type="date"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              value={filters.from ?? ''}
              onChange={onInputChange('from')}
              placeholder="De"
            />
            <input
              type="date"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
