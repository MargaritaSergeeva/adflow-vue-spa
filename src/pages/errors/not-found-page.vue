<script setup lang="ts">
import { Compass } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="grid min-h-[60vh] place-items-center">
    <div class="max-w-md text-center">
      <span class="mx-auto inline-flex rounded-3xl bg-[var(--color-accent-soft)] p-4 text-[var(--color-accent)]">
        <Compass :size="32" />
      </span>
      <h1 class="mt-6 text-4xl font-bold">404</h1>
      <p class="mt-3 text-[var(--color-text-secondary)]">
        The route could not be found. Return to the main control center.
      </p>
      <RouterLink
        to="/dashboard"
        class="mt-6 inline-flex rounded-full bg-[var(--color-accent)] px-5 py-3 font-semibold text-white no-underline transition hover:bg-[var(--color-accent-strong)]"
      >
        Back to dashboard
      </RouterLink>
    </div>
  </div>
</template>
