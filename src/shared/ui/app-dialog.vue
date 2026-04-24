<script setup lang="ts">
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'

defineProps<{
  open: boolean
  title: string
  description?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-[#09111f]/44 backdrop-blur-[2px]" />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-(--color-border) bg-(--color-surface) p-7 shadow-[var(--shadow-soft)] outline-none"
      >
        <div class="space-y-2">
          <DialogTitle class="text-2xl font-semibold text-(--color-text-primary)">
            {{ title }}
          </DialogTitle>
          <DialogDescription
            v-if="description"
            class="text-sm leading-6 text-(--color-text-secondary)"
          >
            {{ description }}
          </DialogDescription>
        </div>

        <div class="mt-6">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
