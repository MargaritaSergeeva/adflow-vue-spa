<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

import AppBadge from '@/shared/ui/app-badge.vue'
import AppCard from '@/shared/ui/app-card.vue'
import DashboardKpis from '@/widgets/dashboard-kpis/dashboard-kpis.vue'
import DashboardTrends from '@/widgets/dashboard-trends/dashboard-trends.vue'

const { t, tm } = useI18n()
</script>

<template>
  <div class="page-shell">
    <div class="page-heading">
      <div class="space-y-2">
        <AppBadge tone="info">
          <Sparkles :size="12" />
          {{ t('dashboard.badge') }}
        </AppBadge>
        <h1 class="text-3xl font-semibold md:text-4xl">{{ t('dashboard.title') }}</h1>
        <p class="max-w-2xl text-sm text-(--color-text-secondary) md:text-base">
          {{ t('dashboard.subtitle') }}
        </p>
      </div>
    </div>

    <DashboardKpis />

    <div class="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
      <DashboardTrends />

      <AppCard class="flex flex-col gap-5 p-5">
        <div>
          <p class="text-sm text-(--color-text-secondary)">{{ t('dashboard.insights') }}</p>
          <h2 class="mt-2 text-xl font-semibold">{{ t('dashboard.nextActions') }}</h2>
        </div>

        <div class="grid gap-3">
          <div
            v-for="item in tm('dashboard.actions')"
            :key="String(item)"
            class="rounded-3xl border border-(--color-border) bg-(--color-surface-alt) px-4 py-4 text-sm font-medium"
          >
            {{ item }}
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>
