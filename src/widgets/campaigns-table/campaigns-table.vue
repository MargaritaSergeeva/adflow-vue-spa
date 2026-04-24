<script setup lang="ts">
import type { Campaign } from '@/entities/campaign/model/types'

import { formatCompactNumber } from '@/shared/lib/format'
import AppBadge from '@/shared/ui/app-badge.vue'

defineProps<{
  campaigns: Campaign[]
}>()

function resolveTone(status: Campaign['status']) {
  if (status === 'active') return 'success'
  if (status === 'paused') return 'info'

  return 'neutral'
}
</script>

<template>
  <div class="overflow-hidden rounded-[24px] border border-(--color-border)">
    <table class="min-w-full border-collapse">
      <thead
        class="bg-(--color-surface-alt) text-left text-xs uppercase tracking-[0.12em] text-(--color-text-secondary)"
      >
        <tr>
          <th class="px-4 py-3">Name</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Channel</th>
          <th class="px-4 py-3">Budget</th>
          <th class="px-4 py-3">Spent</th>
          <th class="px-4 py-3">CTR</th>
          <th class="px-4 py-3">Conversions</th>
          <th class="px-4 py-3">Owner</th>
        </tr>
      </thead>
      <tbody class="bg-(--color-surface)">
        <tr
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="border-t border-(--color-border)"
        >
          <td class="px-4 py-4 font-semibold">{{ campaign.name }}</td>
          <td class="px-4 py-4">
            <AppBadge :tone="resolveTone(campaign.status)">{{ campaign.status }}</AppBadge>
          </td>
          <td class="px-4 py-4 capitalize text-(--color-text-secondary)">
            {{ campaign.channel }}
          </td>
          <td class="px-4 py-4">${{ formatCompactNumber(campaign.budget) }}</td>
          <td class="px-4 py-4">${{ formatCompactNumber(campaign.spent) }}</td>
          <td class="px-4 py-4">{{ campaign.ctr }}%</td>
          <td class="px-4 py-4">{{ formatCompactNumber(campaign.conversions) }}</td>
          <td class="px-4 py-4 text-(--color-text-secondary)">{{ campaign.owner }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
