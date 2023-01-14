import http from '@/utils/http.js'

export const getStatistics1 = () => {
  return http.get('/statistics1')
}
