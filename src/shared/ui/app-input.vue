<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'
import { computed, ref, useAttrs } from 'vue'

import { cn } from '@/shared/lib/cn'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: string
  label?: string
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
const isPasswordVisible = ref(false)
const isPasswordField = computed(() => props.type === 'password')
const inputType = computed(() =>
  isPasswordField.value ? (isPasswordVisible.value ? 'text' : 'password') : (props.type ?? 'text'),
)
const passwordToggleLabel = computed(() =>
  isPasswordVisible.value ? 'Скрыть пароль' : 'Показать пароль',
)
</script>

<template>
  <label
    :class="cn('flex w-full flex-col text-sm font-medium', label ? 'gap-2' : 'gap-0', $props.class)"
  >
    <span v-if="label" class="text-sm font-medium text-(--color-text-primary)">{{ label }}</span>
    <span
      :class="
        cn(
          'flex items-center gap-3 rounded-[16px] border bg-(--color-surface-alt) px-4 py-3.5 transition focus-within:border-(--color-accent)',
          error ? 'border-(--color-danger)' : 'border-(--color-border)',
        )
      "
    >
      <component :is="icon" v-if="icon" :size="16" class="text-(--color-text-secondary)" />
      <input
        v-bind="attrs"
        :type="inputType"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full border-none bg-transparent text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary)"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="isPasswordField"
        type="button"
        :aria-label="passwordToggleLabel"
        class="cursor-pointer text-(--color-text-secondary) transition hover:text-(--color-text-primary)"
        @click="isPasswordVisible = !isPasswordVisible"
      >
        <Eye v-if="isPasswordVisible" :size="16" />
        <EyeOff v-else :size="16" />
      </button>
    </span>
    <span v-if="error" class="text-xs font-semibold text-(--color-danger)">{{ error }}</span>
    <span v-else-if="hint" class="text-xs text-(--color-text-secondary)">{{ hint }}</span>
  </label>
</template>
