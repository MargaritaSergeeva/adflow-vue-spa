<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

import { cn } from '@/shared/lib/cn'

defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  type?: string
  class?: string
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label :class="cn('flex w-full flex-col gap-2 text-sm font-medium', $props.class)">
    <span>{{ label }}</span>
    <span
      class="flex items-center gap-3 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3.5 transition focus-within:border-[var(--color-accent)]"
    >
      <component :is="icon" v-if="icon" :size="16" class="text-[var(--color-text-secondary)]" />
      <input
        :type="type ?? 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        class="w-full border-none bg-transparent text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </span>
  </label>
</template>
