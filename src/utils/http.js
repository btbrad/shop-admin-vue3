import axios from 'axios'
import { toast } from '@/utils/utils'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://localhost:2333/',
  withCredentials: true,
  timeout: 5000,
})

service.interceptors.request.use(function(config) {
  const token = getToken()
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
  console.log('error', error)
  toast(error.response.data.message || '请求失败','error')
  return Promise.reject(error)
})

export default service
