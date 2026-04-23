import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/entities/user/model/types'
import { currentUser } from '@/shared/mocks/data/session'

const guestUser: User = {
  ...currentUser,
  id: '',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>(guestUser)
  const isAuthenticated = computed(() => Boolean(user.value.id))

  function login() {
    user.value = currentUser
  }

  function logout() {
    user.value = guestUser
  }

  return {
    isAuthenticated,
    login,
    logout,
    user,
  }
})
