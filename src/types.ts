export interface Task {
  id: string
  title: string
  description?: string
  date: string
  importance: "none" | "low" | "medium" | "high"
}
