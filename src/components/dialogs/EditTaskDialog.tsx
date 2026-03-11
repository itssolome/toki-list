import type { Task } from "@/types.ts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onTaskChange: (task: Task) => void
  onSave: () => void
}

export function EditTaskDialog({
  open,
  onOpenChange,
  task,
  onTaskChange,
  onSave,
}: EditTaskDialogProps) {
  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit To-Do</DialogTitle>
          <DialogDescription>Update your task's details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={task.title}
              onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              Description (Optional)
            </label>
            <Input
              placeholder="Add a description..."
              value={task.description || ""}
              onChange={(e) =>
                onTaskChange({
                  ...task,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={task.date}
              onChange={(e) => onTaskChange({ ...task, date: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Importance</label>
            <Select
              value={task.importance}
              onValueChange={(value) =>
                onTaskChange({
                  ...task,
                  importance: value as Task["importance"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not assigned</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
