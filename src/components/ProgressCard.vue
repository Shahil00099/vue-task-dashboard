<script setup lang="ts">
defineProps<{
  completedCount: number
  totalTasks: number
  progressPercentage: number
}>()
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
    <div class="flex justify-between items-center mb-2 text-sm font-medium text-slate-700">
      <span>Progress: <strong class="text-slate-900">{{ completedCount }} / {{ totalTasks }} Tasks Completed</strong></span>
      <span class="text-emerald-600 font-bold">{{ progressPercentage }}%</span>
    </div>
    <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
      <div 
        class="h-full bg-emerald-500 transition-all duration-300 ease-out" 
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
  </div>
</template>