<script setup lang="ts">
import { Bell, ChevronDown, LogOut, Search, ShieldCheck } from 'lucide-vue-next'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth/model/auth.store'
import LocaleSwitcher from '@/features/locale-switcher/ui/locale-switcher.vue'
import ThemeSwitcher from '@/features/theme-switcher/ui/theme-switcher.vue'
import { currentWorkspace } from '@/shared/mocks/data/session'
import AppAvatar from '@/shared/ui/app-avatar.vue'
import AppInput from '@/shared/ui/app-input.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

async function handleLogout() {
  authStore.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <header
    class="rounded-[32px] border border-(--color-border) bg-(--color-surface) px-4 py-4 shadow-[var(--shadow-card)] md:px-6"
  >
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-medium text-(--color-text-secondary)">{{ t('topbar.workspace') }}</p>
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-2xl font-semibold">{{ currentWorkspace.title }}</h1>
          <span
            class="rounded-full bg-(--color-accent-soft) px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-accent)"
          >
            {{ t(`roles.${authStore.user.role}`) }}
          </span>
        </div>
        <p class="text-sm text-(--color-text-secondary)">
          {{ authStore.user.name }} · {{ authStore.user.email }}
        </p>
      </div>

      <div class="flex flex-col gap-3 md:flex-row md:items-center">
        <AppInput
          model-value=""
          class="min-w-[280px]"
          :label="t('campaigns.search')"
          :placeholder="t('topbar.search')"
          :icon="Search"
        />

        <div class="flex items-center gap-3">
          <button
            class="rounded-full border border-(--color-border) bg-(--color-surface-alt) p-3 text-(--color-text-secondary)"
          >
            <Bell :size="18" />
          </button>
          <LocaleSwitcher />
          <ThemeSwitcher />

          <DropdownMenuRoot>
            <DropdownMenuTrigger as-child>
              <button
                class="flex items-center gap-3 rounded-full border border-(--color-border) bg-(--color-surface-alt) px-2.5 py-2 text-left transition hover:bg-(--color-surface-elevated)"
              >
                <AppAvatar :name="authStore.user.name" size="sm" />
                <div class="hidden min-w-0 sm:block">
                  <p class="max-w-36 truncate text-sm font-semibold text-(--color-text-primary)">
                    {{ authStore.user.name }}
                  </p>
                  <p class="text-xs text-(--color-text-secondary)">
                    {{ t(`roles.${authStore.user.role}`) }}
                  </p>
                </div>
                <ChevronDown :size="16" class="text-(--color-text-secondary)" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
              <DropdownMenuContent
                :side-offset="10"
                align="end"
                class="z-50 min-w-64 rounded-[24px] border border-(--color-border) bg-(--color-surface) p-2 shadow-[var(--shadow-soft)] outline-none"
              >
                <DropdownMenuLabel class="rounded-[18px] bg-(--color-surface-alt) px-4 py-3">
                  <div class="flex items-center gap-3">
                    <AppAvatar :name="authStore.user.name" />
                    <div class="min-w-0">
                      <p class="truncate text-sm font-semibold text-(--color-text-primary)">
                        {{ authStore.user.name }}
                      </p>
                      <p class="truncate text-xs text-(--color-text-secondary)">
                        {{ authStore.user.email }}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator class="my-2 h-px bg-(--color-border)" />

                <DropdownMenuItem
                  class="flex cursor-default items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-(--color-text-primary) outline-none transition data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)"
                >
                  <ShieldCheck :size="16" />
                  {{ t('auth.roleSummary', { role: t(`roles.${authStore.user.role}`) }) }}
                </DropdownMenuItem>

                <DropdownMenuItem
                  class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-(--color-danger) outline-none transition data-[highlighted]:bg-[color:rgb(216_58_50_/_8%)]"
                  @select="handleLogout"
                >
                  <LogOut :size="16" />
                  {{ t('auth.signOut') }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenuRoot>
        </div>
      </div>
    </div>
  </header>
</template>
