<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'

defineProps<{
  modelValue: boolean
  label: string
  description?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="flex cursor-pointer items-start gap-3 text-sm">
    <CheckboxRoot
      class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border border-(--color-border) bg-(--color-surface-alt) text-white outline-none transition data-[state=checked]:border-(--color-accent) data-[state=checked]:bg-(--color-accent)"
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', Boolean($event))"
    >
      <CheckboxIndicator>
        <Check :size="14" />
      </CheckboxIndicator>
    </CheckboxRoot>

    <span class="flex flex-col gap-1">
      <span class="font-medium text-(--color-text-primary)">{{ label }}</span>
      <span v-if="description" class="text-(--color-text-secondary)">{{ description }}</span>
    </span>
  </label>
</template>
