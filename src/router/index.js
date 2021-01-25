import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/ten_days',
    name: 'TenDays',
    component: () => import('@/views/TenDays')
  },
  {
    path: '/month',
    name: 'Month',
    component: () => import('@/views/Month')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/Favorites')
  },
  {
    path: '/regions',
    name: 'Regions',
    component: () => import('@/views/Regions')
  },
  {
    path: '/city/:name',
    name: 'City',
    component: () => import('@/views/City')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const PAGE_TITLE = {
  'Home': 'Погода в вашем городе',
  'TenDays': 'Прогноз на 10 дней',
  'Month': 'Прогноз на месяц',
  'Favorites': 'Избранные города',
  'Regions': 'Мой регион',
  'City': 'Погода в городе',
};

router.afterEach((toRoute, fromRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name];
})

export default router
