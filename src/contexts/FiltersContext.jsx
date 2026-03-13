/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const defaultFilters = {
  referenceDate: new Date().toLocaleDateString('pt-BR'),
  empresa: '',
  categoria: '',
  texto: '',
  valorMin: '',
  valorMax: '',
  from: '',
  to: '',
  mes: '',
}

const FiltersContext = createContext(null)

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters)
  const [refreshKey, setRefreshKey] = useState(0)

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      refreshKey,
      refresh: () => setRefreshKey((prev) => prev + 1),
    }),
    [filters, refreshKey],
  )

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

export function useFiltersContext() {
  const ctx = useContext(FiltersContext)
  if (!ctx) {
    throw new Error('useFiltersContext must be used within FiltersProvider')
  }
  return ctx
}
