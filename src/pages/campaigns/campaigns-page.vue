<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { campaigns } from '@/shared/mocks/data/campaigns'
import AppBadge from '@/shared/ui/app-badge.vue'
import AppButton from '@/shared/ui/app-button.vue'
import AppCard from '@/shared/ui/app-card.vue'
import AppInput from '@/shared/ui/app-input.vue'
import CampaignsTable from '@/widgets/campaigns-table/campaigns-table.vue'

const { t } = useI18n()
const query = ref('')

const filteredCampaigns = computed(() =>
  campaigns.filter((campaign) => campaign.name.toLowerCase().includes(query.value.toLowerCase())),
)
</script>

<template>
  <div class="page-shell">
    <div class="page-heading">
      <div class="space-y-2">
        <AppBadge tone="info">{{ t('campaigns.badge') }}</AppBadge>
        <h1 class="text-3xl font-extrabold">{{ t('campaigns.title') }}</h1>
        <p class="max-w-2xl text-sm text-[var(--color-text-secondary)] md:text-base">
          {{ t('campaigns.subtitle') }}
        </p>
      </div>

      <AppButton>{{ t('campaigns.create') }}</AppButton>
    </div>

    <AppCard class="p-5">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <AppInput
          v-model="query"
          class="max-w-sm"
          :label="t('campaigns.search')"
          :icon="Search"
          :placeholder="t('campaigns.searchPlaceholder')"
        />
      </div>

      <CampaignsTable :campaigns="filteredCampaigns" />
    </AppCard>
  </div>
</template>
