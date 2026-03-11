import { useTasksContext } from "@/hooks/useTasksContext"
import { TasksProvider } from "@/context/TasksContext"
import { TaskList } from "@/components/TaskList"
import { AddTaskDialog } from "@/components/dialogs/AddTaskDialog"
import { EditTaskDialog } from "@/components/dialogs/EditTaskDialog"
import { DeleteConfirmDialog } from "@/components/dialogs/DeleteConfirmDialog"
import { Navbar } from "./components/Navbar"

function AppContent() {
  const {
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
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    addTask,
    openDeleteConfirmation,
    confirmDelete,
    openEditDialog,
    saveEditedTask,
    closeAddDialog,
  } = useTasksContext()

  return (
    <div className="m-auto flex min-h-svh w-[50%] flex-col items-center justify-center p-6">
      <Navbar />
      <TaskList
        tasks={tasks}
        onEdit={openEditDialog}
        onDelete={openDeleteConfirmation}
      />

      <AddTaskDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionChange={setDescription}
        date={date}
        onDateChange={setDate}
        importance={importance}
        onImportanceChange={setImportance}
        onAdd={addTask}
        onCancel={closeAddDialog}
      />

      <EditTaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={editingTask}
        onTaskChange={setEditingTask}
        onSave={saveEditedTask}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export function App() {
  return (
    <TasksProvider>
      <AppContent />
    </TasksProvider>
  )
}

export default App
