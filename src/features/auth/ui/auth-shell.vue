<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

import { authDemoCredentials } from '@/shared/mocks/data/auth'
import AppCard from '@/shared/ui/app-card.vue'

defineProps<{
  eyebrow: string
  title: string
  description: string
  panelTitle: string
  panelSubtitle: string
  footerPrompt: string
  footerActionLabel: string
  footerActionTo: string
  footerSecondaryLabel?: string
  footerSecondaryTo?: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-(--color-bg) px-4 py-10">
    <div class="grid w-full max-w-7xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <AppCard
        class="overflow-hidden border-[rgb(201_221_248_/_72%)] bg-[radial-gradient(circle_at_top_right,rgba(102,175,255,0.5),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,122,255,0.5),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#edf4ff_100%)] text-[#101828] shadow-[0_18px_40px_rgb(102_175_255_/_12%),inset_0_1px_0_rgb(255_255_255_/_82%)]"
      >
        <div class="flex h-full flex-col justify-between gap-10 p-8 md:p-10">
          <div class="space-y-5">
            <span
              class="inline-flex w-fit rounded-full border border-[rgb(178_215_255_/_70%)] bg-[rgb(229_241_255_/_74%)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#344054]"
            >
              {{ eyebrow }}
            </span>
            <div class="space-y-4">
              <h1 class="max-w-2xl text-4xl font-semibold leading-tight">
                {{ title }}
              </h1>
              <p class="max-w-2xl text-base leading-7 text-[#5d6780] md:text-lg">
                {{ description }}
              </p>
            </div>
          </div>

          <div class="rounded-[30px] border border-[rgb(191_219_254_/_78%)] bg-[rgb(255_255_255_/_72%)] p-5 shadow-[inset_0_1px_0_rgb(255_255_255_/_90%)] backdrop-blur-md">
            <p class="text-sm font-semibold uppercase tracking-[0.14em] text-[#5d6780]">
              {{ t('auth.demoAccess') }}
            </p>
            <div class="mt-4 space-y-3">
              <div
                v-for="account in authDemoCredentials"
                :key="account.email"
                class="rounded-2xl border border-[rgb(216_226_240_/_92%)] bg-[rgb(255_255_255_/_82%)] p-4 shadow-[0_10px_24px_rgb(0_122_255_/_5%)]"
              >
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="font-semibold text-[#101828]">{{ account.name }}</p>
                    <p class="mt-1 text-sm text-[#5d6780]">{{ account.email }}</p>
                  </div>
                  <span
                    class="rounded-full bg-[rgb(229_241_255_/_90%)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#344054]"
                  >
                    {{ t(`roles.${account.role}`) }}
                  </span>
                </div>
                <p class="mt-3 text-sm text-[#5d6780]">
                  {{ t('auth.demoPassword', { password: account.password }) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard class="mx-auto flex w-full max-w-xl flex-col justify-center p-8 md:p-10">
        <div class="mb-8 flex items-center gap-3">
          <span class="rounded-2xl bg-(--color-accent-soft) p-3 text-(--color-accent)">
            <ShieldCheck :size="20" />
          </span>
          <div>
            <p class="text-sm text-(--color-text-secondary)">{{ panelSubtitle }}</p>
            <h2 class="text-2xl font-semibold">{{ panelTitle }}</h2>
          </div>
        </div>

        <slot />

        <div
          class="mt-8 flex flex-wrap items-center gap-3 border-t border-(--color-border) pt-6 text-sm text-(--color-text-secondary)"
        >
          <div>
            {{ footerPrompt }}
            <RouterLink
              :to="footerActionTo"
              class="ml-1 font-semibold text-(--color-accent) transition hover:text-(--color-accent-strong)"
            >
              {{ footerActionLabel }}
            </RouterLink>
          </div>
          <template v-if="footerSecondaryLabel && footerSecondaryTo">
            <RouterLink
              :to="footerSecondaryTo"
              class="ml-auto font-semibold text-(--color-accent) transition hover:text-(--color-accent-strong)"
            >
              {{ footerSecondaryLabel }}
            </RouterLink>
          </template>
        </div>
      </AppCard>
    </div>
  </div>
</template>
