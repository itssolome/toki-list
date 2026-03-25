import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTasksContext } from "@/hooks/useTasksContext"
import { CirclePlus } from "lucide-react"

export const Navbar = () => {
  const { setIsAddDialogOpen } = useTasksContext()

  const GoTokiList = () => {
    window.open("https://tokilist.vercel.app", "_blank")
  }

  return (
    <div className="mt-4 flex h-12 w-full flex-row items-center justify-between p-1">
      <Button
        className="group z-50 flex h-9 w-auto items-center gap-2 rounded-full bg-transparent p-0 hover:cursor-pointer hover:bg-transparent"
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
        className="group z-50 size-4.5 w-auto bg-transparent text-gray-500 transition duration-300 hover:cursor-pointer hover:bg-transparent hover:text-white"
      >
        <CirclePlus className="size-4.5" />
      </Button>
    </div>
  )
}
