import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'adflow-theme'
const themeState = ref<ThemeMode>('light')

function resolveTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme
}

export function getTheme(): ThemeMode {
  return themeState.value
}

export function initializeTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  themeState.value = storedTheme === 'dark' ? 'dark' : 'light'
  resolveTheme(themeState.value)
}

export function setTheme(theme: ThemeMode) {
  themeState.value = theme
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  resolveTheme(theme)
}

export function toggleStoredTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}
