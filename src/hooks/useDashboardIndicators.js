import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDashboardIndicators } from '../api/dashboardApi'

const CACHE_TIME = 1000 * 60 * 5

const cleanFilters = (filters = {}) => {
  const cleaned = {}
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value != null) {
      cleaned[key] = value
    }
  })
  return cleaned
}

export function useDashboardIndicators({ filters, refresh } = {}) {
  const normalizedFilters = useMemo(() => cleanFilters(filters), [filters])

  return useQuery({
    queryKey: ['dashboardIndicators', normalizedFilters, refresh],
    queryFn: () => fetchDashboardIndicators({ filters: normalizedFilters, refresh }),
    staleTime: CACHE_TIME,
    cacheTime: CACHE_TIME,
    retry: 2,
    keepPreviousData: true,
  })
}
