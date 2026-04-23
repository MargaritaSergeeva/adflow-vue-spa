<script setup lang="ts">
import { ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@/features/auth/model/auth.store'
import AppButton from '@/shared/ui/app-button.vue'
import AppCard from '@/shared/ui/app-card.vue'
import AppInput from '@/shared/ui/app-input.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

const form = reactive({
  email: 'margarita@adflow.test',
  password: 'AdFlow123!',
})

function submit() {
  if (!form.email || !form.password) return

  authStore.login()
  router.push((route.query.redirect as string | undefined) ?? '/dashboard')
}
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-[var(--color-bg)] px-4 py-10">
    <div class="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <AppCard
        class="overflow-hidden bg-[linear-gradient(135deg,#0b1730_0%,#18439e_45%,#2da8ff_100%)] text-white"
      >
        <div class="flex h-full flex-col justify-between gap-10 p-8 md:p-10">
          <div class="space-y-4">
            <span
              class="inline-flex w-fit rounded-full bg-white/14 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/82"
            >
              AdFlow
            </span>
            <h1 class="max-w-xl text-4xl font-extrabold leading-tight md:text-6xl">
              {{ t('auth.heroTitle') }}
            </h1>
            <p class="max-w-lg text-base leading-7 text-white/76 md:text-lg">
              {{ t('auth.heroText') }}
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur-md">
              <p class="text-sm text-white/60">CTR uplift</p>
              <p class="mt-2 text-3xl font-bold">+18.4%</p>
            </div>
            <div class="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur-md">
              <p class="text-sm text-white/60">Active campaigns</p>
              <p class="mt-2 text-3xl font-bold">126</p>
            </div>
            <div class="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur-md">
              <p class="text-sm text-white/60">Daily spend</p>
              <p class="mt-2 text-3xl font-bold">$24.8k</p>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard class="mx-auto flex w-full max-w-xl flex-col justify-center p-8 md:p-10">
        <div class="mb-8 flex items-center gap-3">
          <span class="rounded-2xl bg-[var(--color-accent-soft)] p-3 text-[var(--color-accent)]">
            <ShieldCheck :size="20" />
          </span>
          <div>
            <p class="text-sm text-[var(--color-text-secondary)]">{{ t('auth.welcomeBack') }}</p>
            <h2 class="text-2xl font-bold">{{ t('auth.signIn') }}</h2>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <AppInput v-model="form.email" type="email" :label="t('auth.email')" />
          <AppInput v-model="form.password" type="password" :label="t('auth.password')" />

          <AppButton type="submit" class="w-full justify-center gap-2">
            {{ t('auth.enterWorkspace') }}
            <ArrowRight :size="16" />
          </AppButton>
        </form>
      </AppCard>
    </div>
  </div>
</template>
