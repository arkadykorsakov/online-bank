import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/HelpView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/requests/:id',
    name: 'Request',
    component: () => import('@/views/RequestView'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const jwtToken = store.getters['auth/token']

  if (requireAuth && jwtToken) {
    next()
  } else if (requireAuth && !jwtToken) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
