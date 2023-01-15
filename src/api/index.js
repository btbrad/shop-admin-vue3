import http from '@/utils/http.js'

export const getStatistics1 = () => {
  return http.get('/statistics1')
}

export const getStatistics3 = (type) => {
  return http.get(`/statistics3?type=${type}`)
}
