<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/cn'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    class?: string
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    class: '',
  },
)

const classes = computed(() =>
  cn(
    'inline-flex items-center rounded-full border font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
    props.size === 'sm' ? 'px-3.5 py-2 text-sm' : 'px-5 py-3 text-sm',
    {
      'border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]':
        props.variant === 'primary',
      'border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]':
        props.variant === 'secondary',
      'border-transparent bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]':
        props.variant === 'ghost',
      'border-[var(--color-danger)] bg-[var(--color-danger)] text-white':
        props.variant === 'danger',
    },
    props.class,
  ),
)
</script>

<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>
