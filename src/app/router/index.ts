import { createRouter, createWebHistory } from 'vue-router'

import { beforeEachGuard } from '@/app/router/guards'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/login-page.vue'),
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/auth/register-page.vue'),
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/pages/auth/forgot-password-page.vue'),
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/',
      component: () => import('@/app/layouts/default-layout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/dashboard-page.vue'),
        },
        {
          path: 'campaigns',
          name: 'campaigns',
          component: () => import('@/pages/campaigns/campaigns-page.vue'),
          meta: {
            roles: ['admin', 'manager'],
          },
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/pages/reports/reports-page.vue'),
        },
      ],
    },
    {
      path: '/403',
      name: 'forbidden',
      component: () => import('@/pages/errors/forbidden-page.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/errors/not-found-page.vue'),
    },
  ],
})

router.beforeEach(beforeEachGuard)

export { router }
