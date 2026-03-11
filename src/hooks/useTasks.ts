import { useState } from "react"
import type { Task } from "@/types.ts"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [importance, setImportance] = useState<Task["importance"]>("none")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const addTask = () => {
    if (title.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        date,
        importance,
      }
      setTasks([...tasks, newTask])
      resetAddForm()
      setIsAddDialogOpen(false)
    }
  }

  const resetAddForm = () => {
    setTitle("")
    setDescription("")
    setDate("")
    setImportance("none")
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

  const closeAddDialog = () => {
    setIsAddDialogOpen(false)
    resetAddForm()
  }

  return {
    // State
    tasks,
    title,
    setTitle,
    description,
    setDescription,
    date,
    setDate,
    importance,
    setImportance,
    editingTask,
    setEditingTask,
    isDialogOpen,
    setIsDialogOpen,
    isAddDialogOpen,
    setIsAddDialogOpen,
    taskToDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    // Methods
    addTask,
    resetAddForm,
    openDeleteConfirmation,
    confirmDelete,
    openEditDialog,
    saveEditedTask,
    closeAddDialog,
  }
}
