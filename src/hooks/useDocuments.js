import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchDocuments } from '../api/documentsApi'
import { useDebounce } from './useDebounce'

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

export function useDocuments({ filters, refresh } = {}) {
  const normalizedFilters = useMemo(() => cleanFilters(filters), [filters])
  const debouncedFilters = useDebounce(normalizedFilters, 350)

  return useQuery({
    queryKey: ['documents', debouncedFilters, refresh],
    queryFn: () =>
      fetchDocuments({
        filters: normalizedFilters,
        refresh,
      }),
    staleTime: CACHE_TIME,
    cacheTime: CACHE_TIME,
    retry: 2,
    keepPreviousData: true,
  })
}
