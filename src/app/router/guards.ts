import type { NavigationGuardWithThis } from 'vue-router'

import { useAuthStore } from '@/features/auth/model/auth.store'

export const beforeEachGuard: NavigationGuardWithThis<undefined> = (to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return {
      name: 'dashboard',
    }
  }

  const allowedRoles = to.meta.roles as string[] | undefined

  if (allowedRoles && !allowedRoles.includes(authStore.user.role)) {
    return {
      name: 'forbidden',
    }
  }

  return true
}
