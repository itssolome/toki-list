import type { Task } from "@/types.ts"
import { TaskCard } from "./TaskCard"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="flex h-[40%] w-[80%] max-w-[80%] flex-col items-center justify-center gap-2 space-y-2">
      {tasks.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No To-Dos yet. Add one!
        </p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}
