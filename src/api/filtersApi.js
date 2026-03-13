import apiClient from './apiClient'

export const fetchFilterOptions = async () => {
  const { data } = await apiClient.get('/filters/options')
  return data
}
