<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { dashboardSummary } from '@/shared/mocks/data/dashboard'
import { formatCompactNumber } from '@/shared/lib/format'
import AppBadge from '@/shared/ui/app-badge.vue'
import AppCard from '@/shared/ui/app-card.vue'

const { t } = useI18n()

const metrics = [
  { label: 'Spend', value: `$${formatCompactNumber(dashboardSummary.spend)}` },
  { label: 'Impressions', value: formatCompactNumber(dashboardSummary.impressions) },
  { label: 'CTR', value: `${dashboardSummary.ctr}%` },
  { label: 'Conversions', value: formatCompactNumber(dashboardSummary.conversions) },
]
</script>

<template>
  <div class="page-shell">
    <div class="page-heading">
      <div class="space-y-2">
        <AppBadge tone="success">{{ t('reports.badge') }}</AppBadge>
        <h1 class="text-3xl font-extrabold">{{ t('reports.title') }}</h1>
        <p class="max-w-2xl text-sm text-[var(--color-text-secondary)] md:text-base">
          {{ t('reports.subtitle') }}
        </p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AppCard v-for="metric in metrics" :key="metric.label" class="flex flex-col gap-4 p-5">
        <p class="text-sm text-[var(--color-text-secondary)]">{{ metric.label }}</p>
        <p class="text-3xl font-bold">{{ metric.value }}</p>
      </AppCard>
    </div>

    <AppCard class="p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-xl font-bold">{{ t('reports.exportTitle') }}</h2>
          <p class="mt-2 text-sm text-[var(--color-text-secondary)]">
            {{ t('reports.exportText') }}
          </p>
        </div>
        <button class="rounded-full bg-[var(--color-accent)] px-5 py-3 font-semibold text-white">
          {{ t('reports.export') }}
        </button>
      </div>
    </AppCard>
  </div>
</template>
