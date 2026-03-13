import { useMemo } from 'react'
import { useDocuments } from '../hooks/useDocuments'
import { downloadDocument } from '../api/documentsApi'
import { Alert } from '../components/Alert'
import { DocumentsTable } from '../components/DocumentsTable'
import { useFiltersContext } from '../contexts/FiltersContext'

export function DocumentsPage() {
  const { filters, refreshKey } = useFiltersContext()

  const filtersForApi = useMemo(() => {
    const clean = { ...filters }
    Object.keys(clean).forEach((key) => {
      if (clean[key] === '') delete clean[key]
    })
    return clean
  }, [filters])

  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    error: documentsError,
  } = useDocuments({
    filters: filtersForApi,
    refresh: refreshKey,
  })

  const documents = documentsData?.documents ?? []

  return (
    <div className="space-y-6">
      {documentsError ? (
        <Alert title="Erro ao carregar comprovantes" message={documentsError.message} />
      ) : null}

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-soft backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-white">Comprovantes</h2>
            <p className="text-sm text-slate-300">Resultados filtrados e download de comprovantes</p>
          </div>
          <p className="text-xs text-slate-400">{documents.length} registros</p>
        </div>
        <DocumentsTable
          data={documents}
          isLoading={isLoadingDocuments}
          onDownload={async (fileName) => {
            if (!fileName) return
            const url = await downloadDocument(fileName)
            if (url) window.open(url, '_blank')
          }}
        />
      </div>
    </div>
  )
}
