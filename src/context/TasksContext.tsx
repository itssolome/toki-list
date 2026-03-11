import React from "react"
import { TasksContext } from "@/context/tasks-context"
import { useTasks } from "@/hooks/useTasks"

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const tasksState = useTasks()

  return (
    <TasksContext.Provider value={tasksState}>{children}</TasksContext.Provider>
  )
}
