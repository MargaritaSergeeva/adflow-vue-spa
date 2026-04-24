<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

import LocaleSwitcher from '@/features/locale-switcher/ui/locale-switcher.vue'
import ThemeSwitcher from '@/features/theme-switcher/ui/theme-switcher.vue'
import { currentWorkspace } from '@/shared/mocks/data/session'
import AppInput from '@/shared/ui/app-input.vue'

const { t } = useI18n()
</script>

<template>
  <header
    class="rounded-[32px] border border-(--color-border) bg-(--color-surface) px-4 py-4 shadow-[var(--shadow-card)] md:px-6"
  >
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-medium text-(--color-text-secondary)">{{ t('topbar.workspace') }}</p>
        <h1 class="text-2xl font-semibold">{{ currentWorkspace.title }}</h1>
      </div>

      <div class="flex flex-col gap-3 md:flex-row md:items-center">
        <AppInput
          model-value=""
          class="min-w-[280px]"
          :placeholder="t('topbar.search')"
          :icon="Search"
        />

        <div class="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>
