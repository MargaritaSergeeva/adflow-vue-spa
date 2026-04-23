import type { DashboardSummary, TrendPoint } from '@/entities/report/model/types'

export const dashboardSummary: DashboardSummary = {
  spend: 128400,
  impressions: 3860000,
  ctr: 3.7,
  conversions: 1842,
}

export const trends: TrendPoint[] = [
  { day: 'Mon', spend: 14, clicks: 3.2, conversions: 18 },
  { day: 'Tue', spend: 18, clicks: 4.1, conversions: 23 },
  { day: 'Wed', spend: 24, clicks: 5.4, conversions: 28 },
  { day: 'Thu', spend: 22, clicks: 4.9, conversions: 25 },
  { day: 'Fri', spend: 26, clicks: 6.1, conversions: 31 },
  { day: 'Sat', spend: 19, clicks: 4.2, conversions: 19 },
  { day: 'Sun', spend: 23, clicks: 5.5, conversions: 27 },
]
