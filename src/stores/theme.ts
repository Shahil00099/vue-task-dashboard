import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Check local storage or system preference on startup
  const savedTheme = localStorage.getItem('vue_dashboard_theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const isDark = ref<boolean>(
    savedTheme ? savedTheme === 'dark' : prefersDark
  )

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('vue_dashboard_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('vue_dashboard_theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  // Apply theme immediately when store initializes
  applyTheme()

  return { isDark, toggleTheme }
})