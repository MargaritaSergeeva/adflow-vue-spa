<script setup lang="ts">
import { Label } from 'reka-ui'
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'
import { useAttrs } from 'vue'

import { cn } from '@/shared/lib/cn'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  modelValue?: string
  label: string
  placeholder?: string
  type?: string
  class?: string
  error?: string
  hint?: string
  autocomplete?: string
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()
</script>

<template>
  <label :class="cn('flex w-full flex-col gap-2 text-sm font-medium', $props.class)">
    <Label class="text-sm font-medium text-(--color-text-primary)">{{ label }}</Label>
    <span
      :class="
        cn(
          'flex items-center gap-3 rounded-[10px] border bg-(--color-surface-alt) px-4 py-3.5 transition focus-within:border-(--color-accent)',
          error ? 'border-(--color-danger)' : 'border-(--color-border)',
        )
      "
    >
      <component :is="icon" v-if="icon" :size="16" class="text-(--color-text-secondary)" />
      <input
        v-bind="attrs"
        :type="type ?? 'text'"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full border-none bg-transparent text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary)"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </span>
    <span v-if="error" class="text-xs font-semibold text-(--color-danger)">{{ error }}</span>
    <span v-else-if="hint" class="text-xs text-(--color-text-secondary)">{{ hint }}</span>
  </label>
</template>
