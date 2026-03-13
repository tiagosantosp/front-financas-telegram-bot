import { useMemo, useState } from 'react'
import { useDocuments } from '../hooks/useDocuments'
import { useFiltersOptions } from '../hooks/useFiltersOptions'
import { downloadDocument } from '../api/documentsApi'
import { Alert } from '../components/Alert'
import { DocumentsTable } from '../components/DocumentsTable'
import { FiltersPanel } from '../components/FiltersPanel'

const INITIAL_FILTERS = {
  empresa: '',
  categoria: '',
  mes: '',
  texto: '',
  valorMin: '',
  valorMax: '',
  from: '',
  to: '',
}

export function DocumentsPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [refreshKey, setRefreshKey] = useState(0)

  const { data: options, isLoading: isLoadingOptions, error: optionsError } =
    useFiltersOptions()

  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    error: documentsError,
  } = useDocuments({
    filters: useMemo(() => filters, [filters]),
    refresh: refreshKey,
  })

  const errorMessage = optionsError?.message || documentsError?.message

  const handleRefresh = () => {
    setRefreshKey((key) => key + 1)
  }

  const handleDownload = async (fileName) => {
    if (!fileName) return
    try {
      const url = await downloadDocument(fileName)
      if (url) {
        window.open(url, '_blank')
      }
    } catch (error) {
      console.error('Falha ao baixar o arquivo', error)
    }
  }

  const documents = documentsData?.documents ?? []

  return (
    <div className="space-y-6">
      <FiltersPanel
        filters={filters}
        onChange={setFilters}
        onRefresh={handleRefresh}
        options={options}
        isLoading={isLoadingOptions || isLoadingDocuments}
      />

      {errorMessage ? <Alert title="Erro ao carregar comprovantes" message={errorMessage} /> : null}

      <DocumentsTable
        data={documents}
        isLoading={isLoadingDocuments}
        onDownload={handleDownload}
      />
    </div>
  )
}
