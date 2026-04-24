import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/entities/user/model/types'
import type {
  LoginPayload,
  PasswordResetPayload,
  RegisterPayload,
} from '@/features/auth/model/types'
import {
  authenticateUser,
  requestPasswordReset,
  registerUser,
} from '@/shared/mocks/data/auth'
import { currentUser } from '@/shared/mocks/data/session'

const guestUser: User = {
  ...currentUser,
  id: '',
}

const SESSION_STORAGE_KEY = 'adflow-auth-session'

export const useAuthStore = defineStore('auth', () => {
  const storedUser = useLocalStorage<User>(SESSION_STORAGE_KEY, guestUser)
  const user = computed({
    get: () => (storedUser.value.id ? storedUser.value : guestUser),
    set: (nextUser: User) => {
      storedUser.value = nextUser
    },
  })
  const isAuthenticated = computed(() => Boolean(user.value.id))
  const resetEmail = ref('')

  function setUser(nextUser: User) {
    user.value = nextUser
  }

  function login(payload: LoginPayload) {
    const result = authenticateUser(payload)

    if (!result.ok || !result.user) {
      return result
    }

    user.value = result.user
    return result
  }

  function register(payload: RegisterPayload) {
    const result = registerUser(payload)

    if (!result.ok || !result.user) {
      return result
    }

    user.value = result.user
    return result
  }

  function sendPasswordReset(payload: PasswordResetPayload) {
    const result = requestPasswordReset(payload)

    if (result.ok) {
      resetEmail.value = payload.email.trim().toLowerCase()
    }

    return result
  }

  function logout() {
    user.value = guestUser
    resetEmail.value = ''
  }

  return {
    isAuthenticated,
    login,
    logout,
    register,
    resetEmail,
    sendPasswordReset,
    setUser,
    user,
  }
})
