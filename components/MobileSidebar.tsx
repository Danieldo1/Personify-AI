import { Menu } from "lucide-react"
import { Sheet,SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "./Sidebar"

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4">
            <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-2 bg-secondary pt-10 w-32">
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar