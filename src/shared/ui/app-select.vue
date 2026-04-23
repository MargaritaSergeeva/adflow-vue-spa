<script setup lang="ts">
import { Check, ChevronDown } from 'lucide-vue-next'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

import { cn } from '@/shared/lib/cn'

export interface AppSelectOption {
  label: string
  value: string
}

defineProps<{
  modelValue?: string
  label: string
  options: AppSelectOption[]
  placeholder?: string
  error?: string
  hint?: string
  class?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label :class="cn('flex w-full flex-col gap-2 text-sm font-medium', $props.class)">
    <span>{{ label }}</span>
    <SelectRoot
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', String($event))"
    >
      <SelectTrigger
        :class="
          cn(
            'flex h-[50px] w-full items-center justify-between rounded-[10px] border bg-(--color-surface-alt) px-4 text-left text-sm text-(--color-text-primary) outline-none transition data-[placeholder]:text-(--color-text-secondary)',
            error
              ? 'border-(--color-danger)'
              : 'border-(--color-border) focus:border-(--color-accent)',
          )
        "
        aria-label="Select"
      >
        <SelectValue :placeholder="placeholder" />
        <ChevronDown :size="16" class="text-(--color-text-secondary)" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="10"
          class="z-50 overflow-hidden rounded-[10px] border border-(--color-border) bg-(--color-surface) p-2 shadow-(--shadow-soft)"
        >
          <SelectViewport class="grid gap-1">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              class="relative flex cursor-default select-none items-center rounded-xl px-4 py-3 text-sm font-medium text-(--color-text-primary) outline-none transition data-highlighted:bg-(--color-accent-soft) data-highlighted:text-(--color-accent)"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
              <span class="ml-auto flex h-4 w-4 items-center justify-center">
                <SelectItemIndicator>
                  <Check :size="14" />
                </SelectItemIndicator>
              </span>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
    <span v-if="error" class="text-xs font-semibold text-(--color-danger)">{{ error }}</span>
    <span v-else-if="hint" class="text-xs text-(--color-text-secondary)">{{ hint }}</span>
  </label>
</template>
