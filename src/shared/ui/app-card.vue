<script setup lang="ts">
import { cn } from '@/shared/lib/cn'

defineProps<{
  class?: string
}>()
</script>

<template>
  <section
    :class="
      cn(
        'rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]',
        $props.class,
      )
    "
  >
    <slot />
  </section>
</template>
