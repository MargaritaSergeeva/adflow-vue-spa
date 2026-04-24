import type { User } from '@/entities/user/model/types'
import type { Workspace } from '@/entities/workspace/model/types'

export const currentUser: User = {
  id: 'usr-001',
  name: 'Margarita Sergeeva',
  email: 'margarita@adflow.test',
  role: 'admin',
  locale: 'ru',
  timezone: 'Europe/Moscow',
}

export const currentWorkspace: Workspace = {
  id: 'wrk-001',
  title: 'AdFlow Core',
  companyName: 'AdFlow Labs',
  timezone: 'Europe/Moscow',
  currency: 'USD',
  brandColor: '#2570ff',
}

export const guestWorkspace: Workspace = {
  id: 'wrk-guest',
  title: 'AdFlow Console',
  companyName: 'Guest workspace',
  timezone: 'Europe/Moscow',
  currency: 'USD',
  brandColor: '#2570ff',
}
