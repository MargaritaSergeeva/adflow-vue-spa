import type { UserRole } from '@/entities/user/model/types'
import type { LucideIcon } from 'lucide-vue-next'
import { BarChart3, LayoutDashboard, Settings2 } from 'lucide-vue-next'

export interface NavigationItem {
  key: 'dashboard' | 'campaigns' | 'reports' | 'settings'
  icon: LucideIcon
  to: string
  roles?: UserRole[]
}

export const navigationItems: NavigationItem[] = [
  {
    key: 'dashboard',
    icon: LayoutDashboard,
    to: '/dashboard',
  },
  {
    key: 'campaigns',
    icon: BarChart3,
    to: '/campaigns',
    roles: ['admin', 'manager'],
  },
  {
    key: 'reports',
    icon: BarChart3,
    to: '/reports',
  },
  {
    key: 'settings',
    icon: Settings2,
    to: '/404',
  },
]
