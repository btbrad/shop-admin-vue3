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
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: () => import('@/pages/category/list.vue'),
    meta: {
      title: '分类列表'
    }
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: () => import('@/pages/comment/list.vue'),
    meta: {
      title: '评价列表'
    }
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: () => import('@/pages/coupon/list.vue'),
    meta: {
      title: '优惠券列表'
    }
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: () => import('@/pages/notice/list.vue'),
    meta: {
      title: '公告列表'
    }
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: () => import('@/pages/order/list.vue'),
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/picture/list',
    name: '/picture/list',
    component: () => import('@/pages/picture/list.vue'),
    meta: {
      title: '图库'
    }
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: () => import('@/pages/setting/base.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: () => import('@/pages/user/list.vue'),
    meta: {
      title: '用户列表'
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

