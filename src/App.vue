<script setup lang="ts">
import { ref } from 'vue'
import ProgressCard from './components/ProgressCard.vue'
import TaskItem from './components/TaskItem.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { useThemeStore } from './stores/theme'
import { useTaskStore } from './stores/tasks'

// Initialize Stores
useThemeStore()
const taskStore = useTaskStore()

// Local Form Inputs (UI State)
const newTaskTitle = ref('')
const newTaskPriority = ref<'High' | 'Medium' | 'Low'>('Medium')
const newTaskCategory = ref<'Work' | 'Study' | 'Personal'>('Work')

const handleAddTask = () => {
  if (!newTaskTitle.value.trim()) return
  taskStore.addTask(newTaskTitle.value, newTaskPriority.value, newTaskCategory.value)
  newTaskTitle.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
    <div class="max-w-2xl mx-auto">
      
      <!-- Header with Theme Toggle -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">🚀 Task Dashboard</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Vue 3 + TypeScript + Tailwind CSS</p>
        </div>
        <ThemeToggle />
      </header>

      <!-- Progress Component -->
      <ProgressCard 
        :completed-count="taskStore.completedCount" 
        :total-tasks="taskStore.totalTasks" 
        :progress-percentage="taskStore.progressPercentage" 
      />

      <!-- Add Form -->
      <form @submit.prevent="handleAddTask" class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-6 shadow-sm space-y-3">
        <input 
          v-model="newTaskTitle" 
          type="text" 
          placeholder="What needs to be done?" 
          required
          class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select v-model="newTaskPriority" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm">
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>

          <select v-model="newTaskCategory" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm">
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Personal">🏠 Personal</option>
          </select>

          <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition cursor-pointer">
            Add Task
          </button>
        </div>
      </form>

      <!-- Filter Buttons -->
      <div class="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button 
          v-for="filter in (['all', 'active', 'completed'] as const)" 
          :key="filter"
          @click="taskStore.setFilter(filter)"
          :class="[
            'px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition cursor-pointer',
            taskStore.currentFilter === filter ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          ]"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Task List -->
      <div class="space-y-3">
        <TaskItem 
          v-for="task in taskStore.filteredTasks" 
          :key="task.id" 
          :task="task" 
          @toggle="taskStore.toggleTask" 
          @delete="taskStore.deleteTask" 
        />

        <div v-if="taskStore.filteredTasks.length === 0" class="text-center py-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 text-sm">
          No tasks found in this view!
        </div>
      </div>

    </div>
  </div>
</template>