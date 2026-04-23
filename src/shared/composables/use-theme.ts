import { computed } from 'vue'

import { getTheme, setTheme, toggleStoredTheme } from '@/shared/config/theme'

export function useTheme() {
  const isDark = computed(() => getTheme() === 'dark')

  return {
    isDark,
    setTheme,
    toggleTheme: toggleStoredTheme,
  }
}
