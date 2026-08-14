<script setup lang="ts">
import type { Task } from '../types'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [task: Task]
  delete: [id: number]
}>()
</script>

<template>
  <div 
    :class="[
      'flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm transition-all',
      task.completed ? 'border-slate-200 bg-slate-50/70 opacity-60' : 'border-slate-200 hover:border-slate-300'
    ]"
  >
    <div class="flex items-center gap-3">
      <input 
        type="checkbox" 
        :checked="task.completed" 
        @change="emit('toggle', task)"
        class="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
      />
      <span :class="['text-sm font-medium', task.completed ? 'line-through text-slate-400' : 'text-slate-800']">
        {{ task.title }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
        {{ task.category }}
      </span>

      <span 
        :class="[
          'px-2.5 py-1 rounded-lg text-xs font-semibold',
          task.priority === 'High' ? 'bg-red-100 text-red-700' : '',
          task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : '',
          task.priority === 'Low' ? 'bg-emerald-100 text-emerald-700' : ''
        ]"
      >
        {{ task.priority }}
      </span>

      <button 
        @click="emit('delete', task.id)" 
        class="p-1 text-slate-400 hover:text-red-500 transition cursor-pointer text-sm font-bold ml-1"
        title="Delete Task"
      >
        ✕
      </button>
    </div>
  </div>
</template>