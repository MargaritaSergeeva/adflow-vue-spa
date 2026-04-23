<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/features/auth/model/auth.store'
import { navigationItems } from '@/shared/constants/navigation'
import { cn } from '@/shared/lib/cn'

const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()

const visibleItems = computed(() =>
  navigationItems.filter((item) => !item.roles || item.roles.includes(authStore.user.role)),
)
</script>

<template>
  <aside
    class="sticky top-4 hidden h-[calc(100vh-2rem)] w-[var(--sidebar-width)] flex-col rounded-[32px] border border-(--color-border) bg-(--color-surface) p-5 shadow-[var(--shadow-soft)] lg:flex"
  >
    <div class="space-y-2 border-b border-(--color-border) pb-5">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
        AdFlow
      </p>
      <h2 class="text-2xl font-semibold">Console</h2>
      <p class="text-sm text-(--color-text-secondary)">
        Bilingual adtech workspace foundation
      </p>
    </div>

    <nav class="mt-6 flex flex-1 flex-col gap-2">
      <RouterLink
        v-for="item in visibleItems"
        :key="item.key"
        :to="item.to"
        :class="
          cn(
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
            route.path === item.to
              ? 'bg-(--color-accent-soft) text-(--color-accent)'
              : 'text-(--color-text-secondary) hover:bg-(--color-surface-alt)',
          )
        "
      >
        <component :is="item.icon" :size="18" />
        {{ t(`navigation.${item.key}`) }}
      </RouterLink>
    </nav>

    <div class="rounded-[28px] bg-(--color-surface-alt) p-4">
      <p class="text-sm font-semibold">{{ authStore.user.name }}</p>
      <p class="mt-2 text-sm leading-6 text-(--color-text-secondary)">
        {{ t('auth.roleSummary', { role: t(`roles.${authStore.user.role}`) }) }}
      </p>
    </div>
  </aside>
</template>
