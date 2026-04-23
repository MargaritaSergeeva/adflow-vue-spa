<script setup lang="ts">
import { AvatarFallback, AvatarRoot } from 'reka-ui'
import { computed } from 'vue'

import { cn } from '@/shared/lib/cn'

const props = withDefaults(
  defineProps<{
    name: string
    size?: 'sm' | 'md'
    class?: string
  }>(),
  {
    size: 'md',
    class: '',
  },
)

const initials = computed(() =>
  props.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join(''),
)
</script>

<template>
  <AvatarRoot
    :class="
      cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--color-accent)_0%,#49b0ff_100%)] font-semibold text-white shadow-[var(--shadow-card)]',
        size === 'sm' ? 'h-9 w-9 text-xs' : 'h-11 w-11 text-sm',
        $props.class,
      )
    "
  >
    <AvatarFallback :delay-ms="0">
      {{ initials }}
    </AvatarFallback>
  </AvatarRoot>
</template>
