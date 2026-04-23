import type { User, UserRole } from '@/entities/user/model/types'

export interface AuthSession {
  user: User | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  companyName: string
  workspaceTitle: string
  role: UserRole
  locale: User['locale']
}

export interface PasswordResetPayload {
  email: string
}

export interface AuthActionResult {
  ok: boolean
  message?: string
}
