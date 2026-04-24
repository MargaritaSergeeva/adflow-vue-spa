<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ShieldCheck } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import 'swiper/css'
import 'swiper/css/effect-fade'

import slideControl from '@/assets/auth-slide-control.webp'
import slideScale from '@/assets/auth-slide-scale.webp'
import slideSecurity from '@/assets/auth-slide-security.webp'
import slideTeam from '@/assets/auth-slide-team.webp'
import LocaleSwitcher from '@/features/locale-switcher/ui/locale-switcher.vue'
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
const activeSlide = ref(0)
const slider = ref<SwiperInstance | null>(null)
const sliderModules = [Autoplay, EffectFade]

const slides = computed(() => [
  {
    image: slideControl,
    kicker: t('auth.slider.slides.0.kicker'),
    title: t('auth.slider.slides.0.title'),
    description: t('auth.slider.slides.0.description'),
  },
  {
    image: slideScale,
    kicker: t('auth.slider.slides.1.kicker'),
    title: t('auth.slider.slides.1.title'),
    description: t('auth.slider.slides.1.description'),
  },
  {
    image: slideSecurity,
    kicker: t('auth.slider.slides.2.kicker'),
    title: t('auth.slider.slides.2.title'),
    description: t('auth.slider.slides.2.description'),
  },
  {
    image: slideTeam,
    kicker: t('auth.slider.slides.3.kicker'),
    title: t('auth.slider.slides.3.title'),
    description: t('auth.slider.slides.3.description'),
  },
])

function handleSwiper(instance: SwiperInstance) {
  slider.value = instance
}

function handleSlideChange(instance: SwiperInstance) {
  activeSlide.value = instance.realIndex
}

function pauseAutoplay() {
  slider.value?.autoplay?.pause()
}

function resumeAutoplay() {
  slider.value?.autoplay?.resume()
}

function setSlide(index: number) {
  slider.value?.slideToLoop(index)
}
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-(--color-bg) px-4 py-10">
    <div class="w-full max-w-7xl">
      <div class="grid gap-6 lg:grid-cols-2">
        <AppCard
          class="relative hidden min-h-[420px] overflow-hidden rounded-[36px] border-(--color-border) p-0 shadow-[0_20px_52px_rgb(3_11_28_/_18%)] lg:block lg:min-h-[760px]"
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
        >
          <Swiper
            :modules="sliderModules"
            :loop="true"
            :speed="900"
            effect="fade"
            class="relative z-0 h-full"
            :autoplay="{
              delay: 5200,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }"
            @swiper="handleSwiper"
            @slide-change="handleSlideChange"
          >
            <SwiperSlide v-for="slide in slides" :key="slide.title" class="h-full">
              <div class="relative h-full min-h-[420px] lg:min-h-[760px]">
                <img :src="slide.image" :alt="slide.title" class="h-full w-full object-cover" />
                <div
                  class="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,28,0.12)_0%,rgba(4,11,28,0.36)_36%,rgba(4,11,28,0.82)_100%)]"
                />
                <div
                  class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,178,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(104,232,255,0.18),transparent_34%)]"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          <div
            class="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-8 text-white md:p-10"
          >
            <div class="flex items-start justify-between gap-4">
              <span
                class="inline-flex w-fit rounded-full border border-white/14 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/88 backdrop-blur-md"
              >
                {{ t('auth.slider.badge') }}
              </span>
              <span
                class="rounded-full border border-white/12 bg-black/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md"
              >
                {{ String(activeSlide + 1).padStart(2, '0') }}/{{ String(slides.length).padStart(2, '0') }}
              </span>
            </div>

            <div class="space-y-8">
              <div class="max-w-xl space-y-4 pr-6">
                <div class="space-y-2">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">
                    {{ slides[activeSlide]?.kicker }}
                  </p>
                  <h1 class="max-w-xl text-4xl font-semibold leading-tight text-white">
                    {{ slides[activeSlide]?.title }}
                  </h1>
                </div>
                <p class="max-w-lg text-base leading-7 text-white/80 md:text-lg">
                  {{ slides[activeSlide]?.description }}
                </p>
              </div>

              <div class="pointer-events-auto flex items-center gap-2">
                <button
                  v-for="(slide, index) in slides"
                  :key="slide.title"
                  type="button"
                  :class="
                    index === activeSlide
                      ? 'w-10 bg-white'
                      : 'w-2.5 bg-white/40 hover:bg-white/64'
                  "
                  class="h-2.5 rounded-full transition-all duration-300"
                  :aria-label="slide.title"
                  @click="setSlide(index)"
                />
              </div>
            </div>
          </div>
        </AppCard>

        <AppCard class="relative mx-auto flex w-full max-w-none flex-col overflow-hidden p-8 lg:min-h-[760px] md:p-10">
          <LocaleSwitcher class="absolute top-8 right-8 z-10 md:top-10 md:right-10" />

          <div class="flex flex-1 flex-col justify-center">
            <div class="mx-auto w-full max-w-[480px]">
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
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>
