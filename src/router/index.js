import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
const About = () => import('@/pages/about.vue')
const NotFound = () => import('@/pages/404.vue')

const routes = [
  {
    path: '/',
    component: Index
  }, 
  {
    path: '/about',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
