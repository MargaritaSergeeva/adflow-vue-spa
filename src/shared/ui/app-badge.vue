<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/cn'

const props = withDefaults(
  defineProps<{
    tone?: 'neutral' | 'info' | 'success'
  }>(),
  {
    tone: 'neutral',
  },
)

const toneClass = computed(() =>
  ({
    neutral: 'bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]',
    info: 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
    success: 'bg-[rgb(15_159_105_/_12%)] text-[var(--color-success)]',
  })[props.tone],
)
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em]',
        toneClass,
      )
    "
  >
    <slot />
  </span>
</template>
