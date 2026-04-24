<script setup lang="ts">
import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth/model/auth.store'
import { navigationItems } from '@/shared/constants/navigation'
import { cn } from '@/shared/lib/cn'
import AppButton from '@/shared/ui/app-button.vue'

const props = defineProps<{
  collapsed?: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const visibleItems = computed(() =>
  navigationItems.filter((item) => !item.roles || item.roles.includes(authStore.user.role)),
)

async function handleLogout() {
  authStore.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <aside
    :class="
      cn(
        'sticky top-4 hidden h-[calc(100vh-2rem)] w-full flex-col rounded-[32px] border border-(--color-border) bg-(--color-surface) p-5 shadow-[var(--shadow-soft)] transition-[padding,border-radius] duration-300 ease-out lg:flex',
        props.collapsed ? 'items-center rounded-[28px] px-3 py-5' : 'px-5 py-5',
      )
    "
  >
    <div
      :class="
        cn(
          'w-full border-b border-(--color-border) pb-5',
          props.collapsed ? 'flex justify-center' : 'space-y-2',
        )
      "
    >
      <div
        :class="
          cn(
            'flex w-full items-start justify-between gap-3',
            props.collapsed && 'w-auto flex-col items-center justify-center',
          )
        "
      >
        <div v-if="!props.collapsed" class="space-y-2">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
            AdFlow
          </p>
          <p class="text-sm text-(--color-text-secondary)">
            Ad operations workspace
          </p>
        </div>

        <button
          type="button"
          class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-(--color-text-secondary) transition hover:bg-(--color-surface-alt) hover:text-(--color-text-primary)"
          :aria-label="props.collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="emit('toggle')"
        >
          <PanelLeftOpen v-if="props.collapsed" :size="18" />
          <PanelLeftClose v-else :size="18" />
        </button>
      </div>
    </div>

    <nav :class="cn('mt-6 flex flex-1 flex-col gap-2', props.collapsed && 'items-center')">
      <RouterLink
        v-for="item in visibleItems"
        :key="item.key"
        :to="item.to"
        :class="
          cn(
            'flex items-center rounded-2xl text-sm font-semibold transition',
            props.collapsed ? 'h-12 w-12 justify-center px-0 py-0' : 'gap-3 px-4 py-3',
            route.path === item.to
              ? 'bg-(--color-accent-soft) text-(--color-accent)'
              : 'text-(--color-text-secondary) hover:bg-(--color-surface-alt)',
          )
        "
        :title="t(`navigation.${item.key}`)"
      >
        <component :is="item.icon" :size="18" />
        <span v-if="!props.collapsed">{{ t(`navigation.${item.key}`) }}</span>
      </RouterLink>
    </nav>

    <div
      :class="
        cn(
          'w-full bg-(--color-surface-alt)',
          props.collapsed ? 'rounded-[24px] p-3' : 'rounded-[28px] p-4',
        )
      "
    >
      <template v-if="props.collapsed">
        <AppButton
          variant="ghost"
          class="h-10 w-10 justify-center px-0 py-0 text-(--color-danger) hover:bg-transparent"
          :title="t('auth.signOut')"
          @click="handleLogout"
        >
          <LogOut :size="16" />
        </AppButton>
      </template>
      <template v-else>
        <p class="text-sm font-semibold">{{ authStore.user.name }}</p>
        <p class="mt-1 text-xs text-(--color-text-secondary)">
          {{ authStore.user.email }}
        </p>
        <p class="mt-2 text-sm leading-6 text-(--color-text-secondary)">
          {{ t('auth.roleSummary', { role: t(`roles.${authStore.user.role}`) }) }}
        </p>
        <AppButton
          variant="ghost"
          class="mt-4 w-full justify-start px-0 py-0 text-(--color-danger) hover:bg-transparent"
          @click="handleLogout"
        >
          <LogOut :size="16" />
          {{ t('auth.signOut') }}
        </AppButton>
      </template>
    </div>
  </aside>
</template>
