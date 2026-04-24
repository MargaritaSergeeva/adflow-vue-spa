<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { RouterView } from 'vue-router'

import AppSidebar from '@/widgets/app-sidebar/app-sidebar.vue'
import AppTopbar from '@/widgets/app-topbar/app-topbar.vue'

const isSidebarCollapsed = useLocalStorage('adflow-sidebar-collapsed', false)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="min-h-screen bg-(--color-bg) text-(--color-text-primary)">
    <div class="mx-auto flex min-h-screen max-w-[1600px] gap-4 px-4 py-4 md:px-6">
      <div
        class="relative hidden shrink-0 transition-[width] duration-300 ease-out lg:block"
        :class="isSidebarCollapsed ? 'w-[84px]' : 'w-[var(--sidebar-width)]'"
      >
        <AppSidebar :collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      </div>

      <div class="flex min-w-0 flex-1 flex-col gap-4">
        <AppTopbar />

        <main
          class="flex-1 rounded-[32px] border border-(--color-border) bg-(--color-surface) p-4 shadow-[var(--shadow-soft)] md:p-6"
        >
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
