import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WebFormView from '../views/WebFormView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/webform',
      name: 'webform',
      component: WebFormView,
      meta: { title: 'Website Request | Denis Januzi' },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const title =
    (to.meta.title as string) ||
    'Denis Januzi - Web Developer | Portfolio'
  document.title = title
})

export default router
