import type { Task } from "@/types.ts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2 } from "lucide-react"
import { importanceColors, importanceLabels } from "@/constants"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card
      className={`border-t border-r border-b border-l ${importanceColors[task.importance]} w-[70%] p-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="word-wrap text-2xl font-medium wrap-break-word">
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              Description: {task.description}
            </p>
          )}
          {task.date && (
            <p className="text-xs text-muted-foreground">
              Date: {new Date(task.date).toLocaleDateString("es-ES")}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Priority: {importanceLabels[task.importance]}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => onEdit(task)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="hover:cursor-pointer hover:text-red-500"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
