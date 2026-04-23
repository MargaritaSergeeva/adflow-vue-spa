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
        'rounded-[28px] border border-[rgb(229_241_255_/_85%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,251,255,0.98)_100%)] shadow-[0_12px_34px_rgb(0_59_193_/_6%),inset_0_1px_0_rgb(255_255_255_/_80%)] backdrop-blur-[10px]',
        $props.class,
      )
    "
  >
    <slot />
  </section>
</template>
