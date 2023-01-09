import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/layouts/admin.vue'
import Index from '@/pages/index.vue'
const About = () => import('@/pages/about.vue')
const NotFound = () => import('@/pages/404.vue')
const Login = () => import('@/pages/Login.vue')

// const routes = [
//   {
//     path: '/',
//     component: Admin,
//     redirect: '/home',
//     children: [
//       {
//         path: '/home',
//         component: Index,
//         meta: {
//           title: '首页'
//         }
//       }, 
//       {
//         path: '/goods/list',
//         component: () => import('@/pages/goods/list.vue'),
//         meta: {
//           title: '商品列表'
//         }
//       }
//     ]
//   },
//   {
//     path: '/login',
//     component: Login,
//     meta: {
//       title: '登录'
//     }
//   }, 
//   {
//     path: '/about',
//     component: About,
//     meta: {
//       title: '关于'
//     }
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     component: NotFound,
//     meta: {
//       title: '404'
//     }
//   }
// ]

// 默认路由 所有用户都能访问
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Admin,
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, 
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]

// 动态路由
const asyncRoutes = [
  {
    path: '/home',
    name: '/home',
    component: Index,
    meta: {
      title: '首页'
    }
  }, 
  {
    path: '/goods/list',
    name: '/goods/list',
    component: () => import('@/pages/goods/list.vue'),
    meta: {
      title: '商品列表'
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export const addRoutes = (menus) => {
  /**
   * 新增加的路由与当前位置相匹配，就需要你用 router.push() 或 router.replace() 来手动导航.
   */
  // 是否有新路由
  let hasNewRoute = false
  const addSubRoutes = (arr) => {
    arr.forEach(val => {
      let item = asyncRoutes.find(v => v.path === val.frontpath)
      if (item && !router.hasRoute(item.path)) {
        router.addRoute('admin', item)
        hasNewRoute = true
      }
      if (val.children && val.children.length) {
        addSubRoutes(val.children)
      }
    } )
  }
  addSubRoutes(menus)
  console.log(router.getRoutes())
  return hasNewRoute
}

