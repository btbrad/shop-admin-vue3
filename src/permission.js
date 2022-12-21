import router from '@/router/index'
import { getToken } from '@/utils/auth.js'

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.path !== '/login') {
    return next({ path: '/login' })
  }
  if (token && to.path === '/login') {
    return next({ path: from.path ? from.path : '/' })
  } else {
    next()
  }
})
