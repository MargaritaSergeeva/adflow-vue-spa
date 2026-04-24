<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/shared/lib/cn'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    disabled?: boolean
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
    'inline-flex cursor-pointer items-center rounded-full border font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2',
    props.size === 'sm' ? 'px-3.5 py-2 text-sm' : 'px-5 py-3 text-sm',
    {
      'border-(--color-accent) bg-(--color-accent) text-white hover:bg-(--color-accent-strong)':
        props.variant === 'primary' && !props.disabled,
      'border-(--color-border) bg-(--color-surface-alt) text-(--color-text-primary) hover:bg-(--color-surface-elevated)':
        props.variant === 'secondary' && !props.disabled,
      'border-transparent bg-transparent text-(--color-text-secondary) hover:bg-(--color-surface-alt)':
        props.variant === 'ghost' && !props.disabled,
      'border-(--color-danger) bg-(--color-danger) text-white':
        props.variant === 'danger' && !props.disabled,
      'cursor-not-allowed border-(--color-border) bg-(--color-surface-alt) text-(--color-text-secondary) opacity-70':
        props.disabled,
    },
    props.class,
  ),
)
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
