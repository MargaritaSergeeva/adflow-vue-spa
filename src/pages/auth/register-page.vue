<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowRight, BriefcaseBusiness, Globe, KeyRound, Mail, ShieldCheck, User2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { z } from 'zod'

import { useAuthStore } from '@/features/auth/model/auth.store'
import AuthShell from '@/features/auth/ui/auth-shell.vue'
import { registerRequest } from '@/shared/api/auth'
import AppButton from '@/shared/ui/app-button.vue'
import AppInput from '@/shared/ui/app-input.vue'
import AppSelect from '@/shared/ui/app-select.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t, locale } = useI18n()

const schema = toTypedSchema(
  z
    .object({
      name: z.string().trim().min(2, { message: 'auth.validation.name' }),
      email: z.string().trim().email({ message: 'auth.validation.email' }),
      password: z
        .string()
        .min(8, { message: 'auth.validation.passwordLength' })
        .regex(/[A-Z]/, { message: 'auth.validation.passwordUppercase' })
        .regex(/[0-9]/, { message: 'auth.validation.passwordNumber' }),
      confirmPassword: z.string(),
      companyName: z.string().trim().min(2, { message: 'auth.validation.companyName' }),
      workspaceTitle: z.string().trim().min(2, { message: 'auth.validation.workspaceTitle' }),
      role: z.enum(['admin', 'manager', 'viewer']),
      locale: z.enum(['ru', 'en']),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'auth.validation.passwordMismatch',
      path: ['confirmPassword'],
    }),
)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    workspaceTitle: '',
    role: 'manager',
    locale: locale.value === 'en' ? 'en' : 'ru',
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const [companyName, companyNameAttrs] = defineField('companyName')
const [workspaceTitle, workspaceTitleAttrs] = defineField('workspaceTitle')
const [role] = defineField('role')
const [localeField] = defineField('locale')

watch(
  () => locale.value,
  (nextLocale) => {
    localeField.value = nextLocale === 'en' ? 'en' : 'ru'
  },
)

const roleOptions = computed(() => [
  { value: 'admin', label: t('roles.admin') },
  { value: 'manager', label: t('roles.manager') },
  { value: 'viewer', label: t('roles.viewer') },
])

const localeOptions = computed(() => [
  { value: 'ru', label: t('auth.languages.ru') },
  { value: 'en', label: t('auth.languages.en') },
])

const registerMutation = useMutation({
  mutationFn: registerRequest,
})

const submit = handleSubmit(async (values) => {
  const result = await registerMutation.mutateAsync({
    name: values.name,
    email: values.email,
    password: values.password,
    companyName: values.companyName,
    workspaceTitle: values.workspaceTitle,
    role: values.role,
    locale: values.locale,
  })

  if (!result.ok || !result.user) {
    throw new Error(result.message ?? 'auth.errors.registerFailed')
  }

  authStore.setUser(result.user)
  locale.value = result.user.locale
  localStorage.setItem('adflow-locale', result.user.locale)

  await router.replace('/dashboard')
})

const submitError = computed(() => {
  if (!registerMutation.error.value) return ''
  return t(registerMutation.error.value.message)
})
</script>

<template>
  <AuthShell
    :eyebrow="t('auth.eyebrow')"
    :title="t('auth.registerHeroTitle')"
    :description="t('auth.registerHeroText')"
    :panel-title="t('auth.registerTitle')"
    :panel-subtitle="t('auth.registerSubtitle')"
    :footer-prompt="t('auth.hasAccount')"
    :footer-action-label="t('auth.signInShort')"
    footer-action-to="/login"
  >
    <form class="space-y-5" @submit.prevent="submit">
      <div class="grid gap-4 md:grid-cols-2">
        <AppInput
          v-model="name"
          v-bind="nameAttrs"
          autocomplete="name"
          :label="t('auth.fullName')"
          :placeholder="t('auth.placeholders.fullName')"
          :icon="User2"
          :error="errors.name ? t(errors.name) : ''"
        />
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
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <AppInput
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          autocomplete="new-password"
          :label="t('auth.password')"
          :placeholder="t('auth.placeholders.password')"
          :icon="KeyRound"
          :error="errors.password ? t(errors.password) : ''"
        />
        <AppInput
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          type="password"
          autocomplete="new-password"
          :label="t('auth.confirmPassword')"
          :placeholder="t('auth.placeholders.confirmPassword')"
          :icon="ShieldCheck"
          :error="errors.confirmPassword ? t(errors.confirmPassword) : ''"
        />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <AppInput
          v-model="companyName"
          v-bind="companyNameAttrs"
          autocomplete="organization"
          :label="t('auth.companyName')"
          :placeholder="t('auth.placeholders.companyName')"
          :icon="BriefcaseBusiness"
          :error="errors.companyName ? t(errors.companyName) : ''"
        />
        <AppInput
          v-model="workspaceTitle"
          v-bind="workspaceTitleAttrs"
          :label="t('auth.workspaceTitle')"
          :placeholder="t('auth.placeholders.workspaceTitle')"
          :icon="Globe"
          :error="errors.workspaceTitle ? t(errors.workspaceTitle) : ''"
        />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <AppSelect
          v-model="role"
          :label="t('auth.role')"
          :placeholder="t('auth.role')"
          :options="roleOptions"
          :error="errors.role ? t(errors.role) : ''"
        />
        <AppSelect
          v-model="localeField"
          :label="t('auth.interfaceLanguage')"
          :placeholder="t('auth.interfaceLanguage')"
          :options="localeOptions"
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
        :disabled="registerMutation.isPending.value"
        class="w-full justify-center gap-2 mt-7"
      >
        {{ registerMutation.isPending.value ? '...' : t('auth.createWorkspace') }}
        <ArrowRight :size="16" />
      </AppButton>
    </form>
  </AuthShell>
</template>
