import apiClient from './apiClient'

export const fetchDocuments = async ({ filters, page = 1, perPage = 10, refresh } = {}) => {
  const params = {
    ...(filters ?? {}),
    page,
    perPage,
    ...(refresh ? { refresh: 1 } : {}),
  }

  const { data } = await apiClient.get('/documents', { params })
  return data
}

export const downloadDocument = async (file) => {
  const { data } = await apiClient.get('/download', { params: { file } })
  return data.url
}
