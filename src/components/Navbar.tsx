import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTasksContext } from "@/hooks/useTasksContext"

export const Navbar = () => {
  const { setIsAddDialogOpen } = useTasksContext()

  const GoTokiList = () => {
    window.open("https://tokilist.vercel.app", "_blank")
  }

  return (
    <div className="fixed top-0 z-40 h-11 w-[50%] bg-transparent">
      <Button
        className="group absolute top-1 left-1 z-50 flex h-9 w-auto items-center gap-2 rounded-full bg-transparent p-0 hover:cursor-pointer hover:bg-transparent"
        onClick={GoTokiList}
      >
        <Avatar className="h-8 w-8 rounded-full border-2 border-gray-200">
          <AvatarImage src="/img/logo.jpg" />
          <AvatarFallback>Toki List Icon</AvatarFallback>
        </Avatar>
        <p className="text-white transition-colors duration-200">Toki List</p>
      </Button>
      <Button
        onClick={() => setIsAddDialogOpen(true)}
        size="lg"
        variant="outline"
        className="group absolute top-1 right-1 z-50 w-auto transition duration-300 hover:cursor-pointer hover:bg-gray-500"
      >
        Add To-Do
      </Button>
    </div>
  )
}
