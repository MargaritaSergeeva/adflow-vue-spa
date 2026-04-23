<script setup lang="ts">
import { Bell, Search } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

import LocaleSwitcher from '@/features/locale-switcher/ui/locale-switcher.vue'
import ThemeSwitcher from '@/features/theme-switcher/ui/theme-switcher.vue'
import { currentWorkspace } from '@/shared/mocks/data/session'
import AppInput from '@/shared/ui/app-input.vue'

const { t } = useI18n()
</script>

<template>
  <header
    class="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-[var(--shadow-card)] md:px-6"
  >
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-medium text-[var(--color-text-secondary)]">{{ t('topbar.workspace') }}</p>
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-2xl font-extrabold">{{ currentWorkspace.title }}</h1>
          <span
            class="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]"
          >
            {{ t('topbar.role') }}
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-3 md:flex-row md:items-center">
        <AppInput
          model-value=""
          class="min-w-[280px]"
          :label="t('campaigns.search')"
          :placeholder="t('topbar.search')"
          :icon="Search"
        />
        <div class="flex items-center gap-3">
          <button
            class="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3 text-[var(--color-text-secondary)]"
          >
            <Bell :size="18" />
          </button>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>
