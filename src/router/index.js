import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import blankLayout from '@/layouts/blankLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta:{layout:blankLayout}
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../views/SignIn.vue'),
      meta:{layout:blankLayout}
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    { path: '/add', name: 'addNote', component: () => import('../views/CreateOrUpdateNote.vue') },

    {
      path: '/notes',
      children: [
        {
          path: ':id',
          name: 'viewNote',
          component: () => import('../views/ViewNote.vue')
        },
        {
          path: 'add',
          name: 'addNote',
          component: () => import('../views/CreateOrUpdateNote.vue')
        },
        {
          path: ':id/edit',
          name: 'editNote',
          component: () => import('../views/CreateOrUpdateNote.vue')
        }
      ]
    }
  ]
})

export default router
