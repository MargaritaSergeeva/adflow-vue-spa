<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppSidebar from '@/widgets/app-sidebar/app-sidebar.vue'
import AppTopbar from '@/widgets/app-topbar/app-topbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
    <div class="mx-auto flex min-h-screen max-w-[1600px] gap-4 px-4 py-4 md:px-6">
      <AppSidebar />

      <div class="flex min-w-0 flex-1 flex-col gap-4">
        <AppTopbar />

        <main
          class="flex-1 rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)] md:p-6"
        >
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
