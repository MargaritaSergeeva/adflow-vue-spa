import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { router } from '@/app/router'
import '@/app/styles/main.css'
import { queryClient } from '@/shared/api/query-client'
import { i18n } from '@/shared/config/i18n'
import { initializeTheme } from '@/shared/config/theme'

initializeTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
