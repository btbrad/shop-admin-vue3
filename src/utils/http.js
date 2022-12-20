import axios from 'axios'
import { ElNotification } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'

const service = axios.create({
  baseURL: 'http://localhost:2333/',
  withCredentials: true,
  timeout: 5000,
})

service.interceptors.request.use(function(config) {
  const cookie = useCookies()
  const token = cookie.get("token")
  if (token) {
    config.headers["token"] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

service.interceptors.response.use(function(response) {
  return response
}, function(error) {
  ElNotification({
    message: error.response.data.message || '请求失败',
    type: 'error',
    duration: 3000
  })
  return Promise.reject(error)
})

export default service
