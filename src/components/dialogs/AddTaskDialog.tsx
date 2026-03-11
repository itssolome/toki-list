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

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onTitleChange: (value: string) => void
  description: string
  onDescriptionChange: (value: string) => void
  date: string
  onDateChange: (value: string) => void
  importance: Task["importance"]
  onImportanceChange: (value: Task["importance"]) => void
  onAdd: () => void
  onCancel: () => void
}

export function AddTaskDialog({
  open,
  onOpenChange,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  date,
  onDateChange,
  importance,
  onImportanceChange,
  onAdd,
  onCancel,
}: AddTaskDialogProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New To-Do</DialogTitle>
          <DialogDescription>
            Fill in the details of your new To-Do.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title *</label>
            <Input
              placeholder="Title of the task..."
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              Description (Optional)
            </label>
            <Input
              placeholder="Add a description..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Date (Optional)</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Priority (Optional)</label>
            <Select value={importance} onValueChange={onImportanceChange}>
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
            <Button
              variant="outline"
              onClick={onCancel}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button onClick={onAdd} className="cursor-pointer">
              Add To-Do
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
