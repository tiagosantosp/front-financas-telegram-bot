import { useMemo, useState } from 'react'
import { useDashboardBreakdowns } from '../hooks/useDashboardBreakdowns'
import { useDashboardIndicators } from '../hooks/useDashboardIndicators'
import { useFiltersOptions } from '../hooks/useFiltersOptions'
import { Alert } from '../components/Alert'
import { CategoryBreakdownChart } from '../components/CategoryBreakdownChart'
import { DashboardIndicators } from '../components/DashboardIndicators'
import { FiltersPanel } from '../components/FiltersPanel'
import { MonthlyComparisonTable } from '../components/MonthlyComparisonTable'
import { MonthlyEvolutionChart } from '../components/MonthlyEvolutionChart'
import { TopCompaniesTable } from '../components/TopCompaniesTable'

const INITIAL_FILTERS = {
  referenceDate: new Date().toLocaleDateString('pt-BR'),
  empresa: '',
  categoria: '',
  texto: '',
  valorMin: '',
  valorMax: '',
}

export function DashboardPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [refreshKey, setRefreshKey] = useState(0)

  const { data: options, isLoading: isLoadingOptions, error: optionsError } =
    useFiltersOptions()

  const filtersForApi = useMemo(() => {
    const clean = { ...filters }
    // avoid sending empty strings
    Object.keys(clean).forEach((k) => {
      if (clean[k] === '') delete clean[k]
    })
    return clean
  }, [filters])

  const { data: indicatorsData, isLoading: isLoadingIndicators, error: indicatorsError } =
    useDashboardIndicators({ filters: filtersForApi, refresh: refreshKey })

  const { data: breakdownsData, isLoading: isLoadingBreakdowns, error: breakdownsError } =
    useDashboardBreakdowns({ filters: filtersForApi, refresh: refreshKey })

  const isLoading = isLoadingOptions || isLoadingIndicators || isLoadingBreakdowns

  const errorMessage = optionsError?.message || indicatorsError?.message || breakdownsError?.message

  const handleRefresh = () => {
    setRefreshKey((key) => key + 1)
  }

  return (
    <div className="space-y-6">
      <FiltersPanel
        filters={filters}
        onChange={setFilters}
        onRefresh={handleRefresh}
        options={options}
        isLoading={isLoading}
      />

      {errorMessage ? <Alert title="Erro ao carregar dados" message={errorMessage} /> : null}

      <section className="space-y-6">
        <DashboardIndicators data={indicatorsData} isLoading={isLoadingIndicators} />

        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryBreakdownChart data={breakdownsData?.porCategoria} isLoading={isLoadingBreakdowns} />
          <MonthlyEvolutionChart data={breakdownsData?.evolucaoMensalPorCategoria} isLoading={isLoadingBreakdowns} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TopCompaniesTable data={breakdownsData?.topEmpresas} isLoading={isLoadingBreakdowns} />
          <MonthlyComparisonTable
            data={breakdownsData?.comparativoMesAtualVsAnteriorPorCategoria}
            isLoading={isLoadingBreakdowns}
          />
        </div>
      </section>
    </div>
  )
}
