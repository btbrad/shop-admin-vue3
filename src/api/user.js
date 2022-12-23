import http from '@/utils/http.js'

export const login = (username, password) => {
  return http.post('/login', {
    username,
    password
  })
}

export const getCurrentInfo = () => {
  return http.get('/currentUser')
}

export const logout = () => {
  return http.get('/logout')
}