import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Task } from '../types'

export const useTaskStore = defineStore('tasks', () => {
  // --- State ---
  const savedTasks = localStorage.getItem('vue_dashboard_tasks')
  const tasks = ref<Task[]>(
    savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, title: 'Set up Vue 3 + Tailwind environment', priority: 'High', category: 'Study', completed: true },
          { id: 2, title: 'Build a dashboard with TypeScript', priority: 'High', category: 'Work', completed: false },
          { id: 3, title: 'Master Vue Router and Pinia', priority: 'Medium', category: 'Study', completed: false }
        ]
  )

  const currentFilter = ref<'all' | 'active' | 'completed'>('all')

  // --- Persistence ---
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('vue_dashboard_tasks', JSON.stringify(newTasks))
    },
    { deep: true }
  )

  // --- Actions (CRUD) ---
  const addTask = (title: string, priority: 'High' | 'Medium' | 'Low', category: 'Work' | 'Study' | 'Personal') => {
    if (!title.trim()) return
    tasks.value.unshift({
      id: Date.now(),
      title: title.trim(),
      priority,
      category,
      completed: false
    })
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  const toggleTask = (taskOrId: Task | number) => {
    const id = typeof taskOrId === 'number' ? taskOrId : taskOrId.id
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    currentFilter.value = filter
  }

  // --- Getters / Computeds ---
  const filteredTasks = computed(() => {
    if (currentFilter.value === 'active') return tasks.value.filter((t) => !t.completed)
    if (currentFilter.value === 'completed') return tasks.value.filter((t) => t.completed)
    return tasks.value
  })

  const totalTasks = computed(() => tasks.value.length)
  const completedCount = computed(() => tasks.value.filter((t) => t.completed).length)
  const progressPercentage = computed(() => {
    if (totalTasks.value === 0) return 0
    return Math.round((completedCount.value / totalTasks.value) * 100)
  })

  return {
    tasks,
    currentFilter,
    filteredTasks,
    totalTasks,
    completedCount,
    progressPercentage,
    addTask,
    deleteTask,
    toggleTask,
    setFilter
  }
})