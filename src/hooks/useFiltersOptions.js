import { useQuery } from '@tanstack/react-query'
import { fetchFilterOptions } from '../api/filtersApi'

const CACHE_TIME = 1000 * 60 * 5

export function useFiltersOptions() {
  return useQuery({
    queryKey: ['filtersOptions'],
    queryFn: fetchFilterOptions,
    staleTime: CACHE_TIME,
    cacheTime: CACHE_TIME,
    retry: 2,
  })
}
