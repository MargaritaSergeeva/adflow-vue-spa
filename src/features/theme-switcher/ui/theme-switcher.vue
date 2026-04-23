<script setup lang="ts">
import { MoonStar, SunMedium } from 'lucide-vue-next'

import { useTheme } from '@/shared/composables/use-theme'
import AppButton from '@/shared/ui/app-button.vue'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <AppButton variant="secondary" size="sm" class="gap-2" @click="toggleTheme">
    <SunMedium v-if="!isDark" :size="16" />
    <MoonStar v-else :size="16" />
    {{ isDark ? 'Light' : 'Dark' }}
  </AppButton>
</template>
