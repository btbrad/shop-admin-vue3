import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/layouts/admin.vue'
import Index from '@/pages/index.vue'
const About = () => import('@/pages/about.vue')
const NotFound = () => import('@/pages/404.vue')
const Login = () => import('@/pages/Login.vue')

const routes = [
  {
    path: '/',
    component: Admin,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Index,
        meta: {
          title: '首页'
        }
      }, 
      {
        path: '/goods/list',
        component: () => import('@/pages/goods/list.vue'),
        meta: {
          title: '商品列表'
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, 
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
