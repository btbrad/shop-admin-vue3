import router from '@/router/index'
import { getToken } from '@/utils/auth.js'
import { mainStore } from '@/store/index'
import { showLoadingBar, hideLoadingBar } from '@/utils/utils'

router.beforeEach(async(to, from, next) => {
  showLoadingBar()
  const title = to.meta.title
  document.title = title
  const token = getToken()
  if (!token) {
    if (to.path !== '/login') {
      return next({path: '/login', query: { redirect: to.path }})
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      return next({ path: from.path ? from.path : '/' })
    } else {
      const store = mainStore()
      if (Object.keys(store.user).length <= 0) {
        await store.getUserInfo()
      }
      next()
    }
  }

})

router.afterEach((to, from) => {
  hideLoadingBar()
})
