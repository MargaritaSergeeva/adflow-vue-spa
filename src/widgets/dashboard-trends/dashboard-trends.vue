<script setup lang="ts">
import { computed } from 'vue'

import { trends } from '@/shared/mocks/data/dashboard'
import AppCard from '@/shared/ui/app-card.vue'

const maxSpend = computed(() => Math.max(...trends.map((point) => point.spend)))
</script>

<template>
  <AppCard class="p-5">
    <div class="mb-6 flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-(--color-text-secondary)">Spend trend</p>
        <h2 class="mt-2 text-xl font-semibold">Weekly campaign pulse</h2>
      </div>
      <span
        class="rounded-full bg-(--color-accent-soft) px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-accent)"
      >
        Mock data
      </span>
    </div>

    <div class="grid grid-cols-7 items-end gap-3 rounded-[28px] bg-(--color-surface-alt) p-5">
      <div v-for="point in trends" :key="point.day" class="flex flex-col items-center gap-3">
        <div class="flex h-56 items-end">
          <div
            class="w-10 rounded-t-[18px] bg-[linear-gradient(180deg,var(--color-accent)_0%,rgb(37_112_255_/_25%)_100%)]"
            :style="{ height: `${(point.spend / maxSpend) * 100}%` }"
          />
        </div>
        <div class="text-center">
          <p class="text-sm font-semibold">{{ point.day }}</p>
          <p class="text-xs text-(--color-text-secondary)">${{ point.spend }}k</p>
        </div>
      </div>
    </div>
  </AppCard>
</template>
