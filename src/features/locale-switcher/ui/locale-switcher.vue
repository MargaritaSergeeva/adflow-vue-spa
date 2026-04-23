<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/shared/ui/app-button.vue'

const { locale } = useI18n()

function setLocale(nextLocale: 'ru' | 'en') {
  locale.value = nextLocale
  localStorage.setItem('adflow-locale', nextLocale)
}
</script>

<template>
  <div class="flex items-center gap-2 rounded-full bg-(--color-surface-alt) p-1">
    <AppButton
      size="sm"
      :variant="locale === 'ru' ? 'primary' : 'ghost'"
      @click="setLocale('ru')"
    >
      RU
    </AppButton>
    <AppButton
      size="sm"
      :variant="locale === 'en' ? 'primary' : 'ghost'"
      @click="setLocale('en')"
    >
      EN
    </AppButton>
  </div>
</template>
