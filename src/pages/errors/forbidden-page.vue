<script setup lang="ts">
import { LockKeyhole } from 'lucide-vue-next'
</script>

<template>
  <div class="grid min-h-[60vh] place-items-center">
    <div class="max-w-md text-center">
      <span class="mx-auto inline-flex rounded-3xl bg-[var(--color-accent-soft)] p-4 text-[var(--color-accent)]">
        <LockKeyhole :size="32" />
      </span>
      <h1 class="mt-6 text-4xl font-bold">403</h1>
      <p class="mt-3 text-[var(--color-text-secondary)]">
        You do not have access to this area yet.
      </p>
    </div>
  </div>
</template>
