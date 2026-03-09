import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
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
import { Trash2, Edit2 } from "lucide-react"

interface Task {
  id: string
  title: string
  date: string
  importance: "none" | "low" | "medium" | "high"
}

const importanceColors = {
  none: "border-border",
  low: "border-blue-500",
  medium: "border-yellow-500",
  high: "border-red-500",
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const addTask = () => {
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        date,
        importance: "none",
      }
      setTasks([...tasks, newTask])
      setTitle("")
      setDate("")
    }
  }

  const openDeleteConfirmation = (id: string) => {
    setTaskToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete))
      setIsDeleteDialogOpen(false)
      setTaskToDelete(null)
    }
  }

  const openEditDialog = (task: Task) => {
    setEditingTask({ ...task })
    setIsDialogOpen(true)
  }

  const saveEditedTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
      )
      setIsDialogOpen(false)
      setEditingTask(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Mis Tareas</h1>

        <div className="mb-6 space-y-3">
          <Input
            placeholder="Agregar nueva tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={addTask} className="w-full">
            Agregar Tarea
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No hay tareas. ¡Agrega una!
            </p>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                className={`border-t border-r border-b border-l-4 ${importanceColors[task.importance]} p-4`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="word-wrap font-medium break-words">
                      {task.title}
                    </p>
                    {task.date && (
                      <p className="text-xs text-muted-foreground">
                        📅 {new Date(task.date).toLocaleDateString("es-ES")}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Prioridad:{" "}
                      {task.importance === "none"
                        ? "Sin asignar"
                        : task.importance === "low"
                          ? "Baja"
                          : task.importance === "medium"
                            ? "Media"
                            : "Alta"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(task)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDeleteConfirmation(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            ¿Estás seguro de que deseas eliminar esta tarea?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Fecha</label>
                <Input
                  type="date"
                  value={editingTask.date}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Importancia</label>
                <Select
                  value={editingTask.importance}
                  onValueChange={(value) =>
                    setEditingTask({
                      ...editingTask,
                      importance: value as Task["importance"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin asignar</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={saveEditedTask}>Guardar</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
