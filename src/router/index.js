import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog/',
      name: 'index',
      component: () => import('../views/BlogIndex.vue')
    },
    {
      path: '/blog/:pathMatch(.*)*',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    }
  ]
})

export default router