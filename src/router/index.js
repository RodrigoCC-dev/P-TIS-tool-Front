import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/Inicio.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/estudiante',
    name: 'Estudiante',
    component: () => import(/* webpackChunkName: "estudiante" */ '../views/Estudiante.vue')
  },
  {
    path: '/profesor',
    name: 'Profesor',
    component: () => import(/* webpackChunkName: "profesor" */ '../views/Profesor.vue')
  },
  {
    path: '/coordinador',
    name: 'Coordinador',
    component: () => import(/* webpackChunkName: "coordinador" */ '../views/Coordinador.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
