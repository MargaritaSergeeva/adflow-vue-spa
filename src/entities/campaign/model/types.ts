export type CampaignStatus = 'active' | 'paused' | 'draft'

export interface Campaign {
  id: string
  name: string
  channel: 'search' | 'social' | 'programmatic'
  status: CampaignStatus
  budget: number
  spent: number
  ctr: number
  conversions: number
  owner: string
  startDate: string
  endDate: string
}
