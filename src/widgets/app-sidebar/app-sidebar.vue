<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { navigationItems } from '@/shared/constants/navigation'
import { cn } from '@/shared/lib/cn'
</script>

<template>
  <aside
    class="sticky top-4 hidden h-[calc(100vh-2rem)] w-[var(--sidebar-width)] flex-col rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)] lg:flex"
  >
    <div class="space-y-2 border-b border-[var(--color-border)] pb-5">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
        AdFlow
      </p>
      <h2 class="text-2xl font-extrabold">Console</h2>
      <p class="text-sm text-[var(--color-text-secondary)]">
        Bilingual adtech workspace foundation
      </p>
    </div>

    <nav class="mt-6 flex flex-1 flex-col gap-2">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.key"
        :to="item.to"
        :class="
          cn(
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
            useRoute().path === item.to
              ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]',
          )
        "
      >
        <component :is="item.icon" :size="18" />
        {{ useI18n().t(`navigation.${item.key}`) }}
      </RouterLink>
    </nav>

    <div class="rounded-[28px] bg-[var(--color-surface-alt)] p-4">
      <p class="text-sm font-semibold">Foundation Stage</p>
      <p class="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        Dashboard, campaigns, reports, themes, i18n, and architecture are already in place.
      </p>
    </div>
  </aside>
</template>
