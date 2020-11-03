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
    component: () => import(/* webpackChunkName: "estudiante" */ '../views/Estudiante.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/profesor',
    name: 'Profesor',
    component: () => import(/* webpackChunkName: "profesor" */ '../views/Profesor.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/coordinador',
    name: 'Coordinador',
    component: () => import(/* webpackChunkName: "coordinador" */ '../views/Coordinador.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/cliente',
    name: 'Stakeholder',
    component: () => import(/* webpackChunkName: "coordinador" */ '../views/Stakeholder.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/estudiante/minuta',
    name: 'Minuta',
    component: () => import(/* webpackChunkName: "coordinador" */ '../views/Minuta.vue'),
    meta: { requireAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
