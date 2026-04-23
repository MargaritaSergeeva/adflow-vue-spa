<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowRight, Mail } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { z } from 'zod'

import { useAuthStore } from '@/features/auth/model/auth.store'
import AuthShell from '@/features/auth/ui/auth-shell.vue'
import { requestPasswordResetRequest } from '@/shared/api/auth'
import AppButton from '@/shared/ui/app-button.vue'
import AppDialog from '@/shared/ui/app-dialog.vue'
import AppInput from '@/shared/ui/app-input.vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const resetDialogOpen = ref(false)
const submittedEmail = ref('')

const schema = toTypedSchema(
  z.object({
    email: z.string().trim().email({ message: 'auth.validation.email' }),
  }),
)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: authStore.resetEmail,
  },
})

const [email, emailAttrs] = defineField('email')

const recoveryMutation = useMutation({
  mutationFn: requestPasswordResetRequest,
})

async function goToLogin() {
  resetDialogOpen.value = false
  await router.replace('/login')
}

const submit = handleSubmit(async (values) => {
  const result = await recoveryMutation.mutateAsync(values)

  if (!result.ok) {
    throw new Error(result.message ?? 'auth.errors.resetFailed')
  }

  submittedEmail.value = values.email
  resetDialogOpen.value = true
})
</script>

<template>
  <AuthShell
    :eyebrow="t('auth.eyebrow')"
    :title="t('auth.recoveryHeroTitle')"
    :description="t('auth.recoveryHeroText')"
    :panel-title="t('auth.recoveryTitle')"
    :panel-subtitle="t('auth.recoverySubtitle')"
    :footer-prompt="t('auth.backToLoginPrompt')"
    :footer-action-label="t('auth.signInShort')"
    footer-action-to="/login"
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
        :hint="t('auth.recoveryHint')"
      />

      <div
        v-if="recoveryMutation.error.value"
        class="rounded-[24px] border border-[color:rgb(216_58_50_/_18%)] bg-[color:rgb(216_58_50_/_8%)] px-4 py-3 text-sm font-medium text-(--color-danger)"
      >
        {{ t(recoveryMutation.error.value.message) }}
      </div>

      <AppButton
        type="submit"
        :disabled="recoveryMutation.isPending.value"
        class="w-full justify-center gap-2"
      >
        {{ recoveryMutation.isPending.value ? '...' : t('auth.sendRecoveryLink') }}
        <ArrowRight :size="16" />
      </AppButton>
    </form>

    <AppDialog
      :title="t('auth.reset.dialogTitle')"
      :description="t('auth.reset.successDescription', { email: submittedEmail })"
      :open="resetDialogOpen"
      @update:open="resetDialogOpen = $event"
    >
      <div class="flex justify-end gap-3">
        <AppButton variant="secondary" @click="resetDialogOpen = false">
          {{ t('auth.signInShort') }}
        </AppButton>
        <AppButton class="gap-2" @click="goToLogin">
          {{ t('auth.openLogin') }}
          <ArrowRight :size="16" />
        </AppButton>
      </div>
    </AppDialog>
  </AuthShell>
</template>
