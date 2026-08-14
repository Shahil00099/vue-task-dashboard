export interface Task {
  id: number
  title: string
  priority: 'High' | 'Medium' | 'Low'
  category: 'Work' | 'Study' | 'Personal'
  completed: boolean
}