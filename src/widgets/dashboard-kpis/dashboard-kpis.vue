<script setup lang="ts">
import { ChartNoAxesColumn, Eye, MousePointer2, Wallet } from 'lucide-vue-next'
import { computed } from 'vue'

import { dashboardSummary } from '@/shared/mocks/data/dashboard'
import { formatCompactNumber } from '@/shared/lib/format'
import AppCard from '@/shared/ui/app-card.vue'

const items = computed(() => [
  {
    label: 'Spend',
    value: `$${formatCompactNumber(dashboardSummary.spend)}`,
    icon: Wallet,
  },
  {
    label: 'Impressions',
    value: formatCompactNumber(dashboardSummary.impressions),
    icon: Eye,
  },
  {
    label: 'CTR',
    value: `${dashboardSummary.ctr}%`,
    icon: MousePointer2,
  },
  {
    label: 'Conversions',
    value: formatCompactNumber(dashboardSummary.conversions),
    icon: ChartNoAxesColumn,
  },
])
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <AppCard v-for="item in items" :key="item.label" class="p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm text-(--color-text-secondary)">{{ item.label }}</p>
          <p class="mt-4 text-3xl font-semibold">{{ item.value }}</p>
        </div>
        <span class="rounded-2xl bg-(--color-accent-soft) p-3 text-(--color-accent)">
          <component :is="item.icon" :size="18" />
        </span>
      </div>
    </AppCard>
  </div>
</template>
