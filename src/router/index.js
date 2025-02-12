import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import metadata from '@/meta/metadata.json'

function getMeta(route) {
  if (metadata[route.path]) {
    return metadata[route.path]
  }
  return {}
}

function shouldRedirect(to) {
  const draftRoute = to.path.includes('/draft/')
  const prod = process.env.NODE_ENV != 'development'
  const meta = metadata[to.path]
  return (draftRoute && prod) || !meta
}

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
      component: () => import('../views/BlogView.vue'),
      beforeEnter: (to, _, next) => {
        if (shouldRedirect(to)) {
          next('/blog')
        } else {
          next()
        }
      },
      props: route => ({
        markdownFilePath: '/content' + `${route.path}.md`,
        metadata: getMeta(route),
      })
    }
  ]
})

export default router