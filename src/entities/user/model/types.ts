export type UserRole = 'admin' | 'manager' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  locale: 'ru' | 'en'
  timezone: string
}
