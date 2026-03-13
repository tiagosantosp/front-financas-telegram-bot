import apiClient from './apiClient'

export const fetchDashboardIndicators = async ({ filters, refresh } = {}) => {
  const params = {
    ...(filters ?? {}),
    ...(refresh ? { refresh: 1 } : {}),
  }
  const { data } = await apiClient.get('/dashboard/indicators', { params })
  return data.indicators
}

export const fetchDashboardBreakdowns = async ({ filters, refresh } = {}) => {
  const params = {
    ...(filters ?? {}),
    ...(refresh ? { refresh: 1 } : {}),
  }
  const { data } = await apiClient.get('/dashboard/breakdowns', { params })
  return data.breakdowns
}
