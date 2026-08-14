<script setup lang="ts">
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <button 
    @click="themeStore.toggleTheme"
    class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer text-xs font-semibold flex items-center gap-2 shadow-xs"
  >
    <span v-if="themeStore.isDark">🌙 Dark Mode</span>
    <span v-else>☀️ Light Mode</span>
  </button>
</template>