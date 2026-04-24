<script setup lang="ts">
import { Check, Globe } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { cn } from '@/shared/lib/cn'

const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {
    class: '',
  },
)

const { locale, t } = useI18n()

function setLocale(nextLocale: 'ru' | 'en') {
  locale.value = nextLocale
  localStorage.setItem('adflow-locale', nextLocale)
}

const currentLocaleLabel = computed(() => (locale.value === 'en' ? 'En' : 'Ru'))
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <button
        :class="
          cn(
            'inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-(--color-text-secondary) outline-none transition hover:text-(--color-text-primary) focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2',
            props.class,
          )
        "
        type="button"
        aria-label="Change language"
      >
        <Globe :size="16" />
        <span>{{ currentLocaleLabel }}</span>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :side-offset="10"
        align="end"
        class="z-50 min-w-32 rounded-[18px] border border-(--color-border) bg-(--color-surface) p-2 shadow-[var(--shadow-soft)] outline-none"
      >
        <DropdownMenuItem
          class="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium text-(--color-text-primary) outline-none transition data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)"
          @select="setLocale('ru')"
        >
          <span class="w-5 text-xs font-semibold uppercase text-(--color-text-secondary)">Ru</span>
          <span class="flex-1">{{ t('auth.languages.ru') }}</span>
          <Check v-if="locale === 'ru'" :size="14" class="text-(--color-accent)" />
        </DropdownMenuItem>

        <DropdownMenuItem
          class="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium text-(--color-text-primary) outline-none transition data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)"
          @select="setLocale('en')"
        >
          <span class="w-5 text-xs font-semibold uppercase text-(--color-text-secondary)">En</span>
          <span class="flex-1">{{ t('auth.languages.en') }}</span>
          <Check v-if="locale === 'en'" :size="14" class="text-(--color-accent)" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
