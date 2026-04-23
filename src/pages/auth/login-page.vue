<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useLocalStorage } from '@vueuse/core'
import { ArrowRight, KeyRound, Mail } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

import { useAuthStore } from '@/features/auth/model/auth.store'
import AuthShell from '@/features/auth/ui/auth-shell.vue'
import { loginRequest } from '@/shared/api/auth'
import AppButton from '@/shared/ui/app-button.vue'
import AppCheckbox from '@/shared/ui/app-checkbox.vue'
import AppInput from '@/shared/ui/app-input.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t, locale } = useI18n()

const rememberedEmail = useLocalStorage('adflow-remembered-email', '')
const rememberMe = useLocalStorage('adflow-remember-me', true)
const submitError = ref('')

const schema = toTypedSchema(
  z.object({
    email: z.string().trim().email({ message: 'auth.validation.email' }),
    password: z
      .string()
      .min(8, { message: 'auth.validation.passwordLength' })
      .regex(/[A-Z]/, { message: 'auth.validation.passwordUppercase' })
      .regex(/[0-9]/, { message: 'auth.validation.passwordNumber' }),
  }),
)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: rememberedEmail.value,
    password: '',
  },
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const loginMutation = useMutation({
  mutationFn: loginRequest,
})

const submit = handleSubmit(async (values) => {
  submitError.value = ''

  const result = await loginMutation.mutateAsync(values)

  if (!result.ok || !result.user) {
    submitError.value = t(result.message ?? 'auth.errors.invalidCredentials')
    return
  }

  authStore.setUser(result.user)
  rememberedEmail.value = rememberMe.value ? values.email : ''
  locale.value = result.user.locale
  localStorage.setItem('adflow-locale', result.user.locale)

  await router.replace((route.query.redirect as string | undefined) ?? '/dashboard')
})
</script>

<template>
  <AuthShell
    :eyebrow="t('auth.eyebrow')"
    :title="t('auth.heroTitle')"
    :description="t('auth.heroText')"
    :panel-title="t('auth.signIn')"
    :panel-subtitle="t('auth.welcomeBack')"
    :footer-prompt="t('auth.noAccount')"
    :footer-action-label="t('auth.createAccount')"
    footer-action-to="/register"
    :footer-secondary-label="t('auth.forgotPassword')"
    footer-secondary-to="/forgot-password"
  >
    <form class="space-y-5" @submit.prevent="submit">
      <AppInput
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        autocomplete="email"
        :label="t('auth.email')"
        :placeholder="t('auth.placeholders.email')"
        :icon="Mail"
        :error="errors.email ? t(errors.email) : ''"
      />

      <AppInput
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        autocomplete="current-password"
        :label="t('auth.password')"
        :placeholder="t('auth.placeholders.password')"
        :icon="KeyRound"
        :error="errors.password ? t(errors.password) : ''"
        :hint="t('auth.passwordHint')"
      />

      <div class="flex items-center gap-4">
        <AppCheckbox
          v-model="rememberMe"
          :label="t('auth.rememberMe')"
          :description="t('auth.rememberMeHint')"
        />
      </div>

      <div
        v-if="submitError"
        class="rounded-[24px] border border-[color:rgb(216_58_50_/_18%)] bg-[color:rgb(216_58_50_/_8%)] px-4 py-3 text-sm font-medium text-(--color-danger)"
      >
        {{ submitError }}
      </div>

      <AppButton
        type="submit"
        :disabled="loginMutation.isPending.value"
        class="w-full justify-center gap-2"
      >
        {{ loginMutation.isPending.value ? '...' : t('auth.enterWorkspace') }}
        <ArrowRight :size="16" />
      </AppButton>
    </form>
  </AuthShell>
</template>
