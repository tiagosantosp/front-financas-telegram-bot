import { useMemo } from 'react'
import { useDashboardBreakdowns } from '../hooks/useDashboardBreakdowns'
import { useDashboardIndicators } from '../hooks/useDashboardIndicators'
import { Alert } from '../components/Alert'
import { CategoryBreakdownChart } from '../components/CategoryBreakdownChart'
import { DashboardIndicators } from '../components/DashboardIndicators'
import { MonthlyComparisonTable } from '../components/MonthlyComparisonTable'
import { MonthlyEvolutionChart } from '../components/MonthlyEvolutionChart'
import { TopCompaniesTable } from '../components/TopCompaniesTable'
import { useFiltersContext } from '../contexts/FiltersContext'

export function DashboardPage() {
  const { filters, refreshKey } = useFiltersContext()

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

  const errorMessage = indicatorsError?.message || breakdownsError?.message

  return (
    <div className="space-y-6">
      {errorMessage ? <Alert title="Erro ao carregar dados" message={errorMessage} /> : null}

      <DashboardIndicators data={indicatorsData} isLoading={isLoadingIndicators} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryBreakdownChart
          data={breakdownsData?.porCategoria}
          isLoading={isLoadingBreakdowns}
        />
        <MonthlyEvolutionChart
          data={breakdownsData?.evolucaoMensalPorCategoria}
          isLoading={isLoadingBreakdowns}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopCompaniesTable data={breakdownsData?.topEmpresas} isLoading={isLoadingBreakdowns} />
        <MonthlyComparisonTable
          data={breakdownsData?.comparativoMesAtualVsAnteriorPorCategoria}
          isLoading={isLoadingBreakdowns}
        />
      </div>
    </div>
  )
}
