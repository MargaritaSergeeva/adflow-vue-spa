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

async function wait(delay = 280) {
  await new Promise((resolve) => window.setTimeout(resolve, delay))
}

export async function loginRequest(payload: LoginPayload) {
  await wait()
  return authenticateUser(payload)
}

export async function registerRequest(payload: RegisterPayload) {
  await wait()
  return registerUser(payload)
}

export async function requestPasswordResetRequest(payload: PasswordResetPayload) {
  await wait()
  return requestPasswordReset(payload)
}
